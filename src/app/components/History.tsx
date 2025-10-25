'use client'

import { motion, Variants } from 'framer-motion'
import { Calendar, Zap, TrendingUp, Sun, Battery, Leaf } from 'lucide-react'
import SolarBanner from './SolarBanner'
import Link from 'next/link'
import { SolarInnovation } from './patterns/SolarInnovation'

const History = () => {
  const milestones = [
    {
      year: "1987",
      title: "Paramount Power Business Inception",
      description: "Beginning of the power business journey",
      icon: Battery,
      status: "completed" as const,
      link: ""
    },
    {
      year: "2017",
      title: "Paramount Solar Ltd Established",
      description: "Founded as a dedicated solar energy company",
      icon: Sun,
      status: "completed" as const,
      link: ""
    },
    {
      year: "2018",
      title: "200MW HSD Power Plant",
      description: "Developed 200MW HSD Power Plant in Sirajgang",
      icon: Zap,
      status: "completed" as const,
      link: ""
    },
    {
      year: "2022",
      title: "30MW Solar Power Plant Operational",
      description: "30MW solar Plant in Lalmonirhat became operational",
      icon: TrendingUp,
      status: "completed" as const,
      link: "lalmonirhat-project"
    },
    {
      year: "2024",
      title: "100MW Solar Park Operational",
      description: "100MW solar park in Pabna became operational",
      icon: TrendingUp,
      status: "completed" as const,
      link: "pabna-project"
    },
    {
      year: "2025",
      title: "10MW Plant Completion",
      description: "10MW solar plant in Moulvibazar become operational",
      icon: Sun,
      status: "current" as const,
      link: "bibiana-project"
    },
    {
      year: "2026",
      title: "Proposed 25MW and 50MW Project",
      description: "25MW solar plant in Moulvibazar and 50MW solar project at Bibiana is proposed",
      icon: Calendar,
      status: "planned" as const,
      link: ""
    },
    {
      year: "2027",
      title: "Proposed 70MW and 150MW Project",
      description: "70MW and 150MW solar project in Pabna is proposed",
      icon: Calendar,
      status: "planned" as const,
      link: ""
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-solar-success"
      case "current": return "bg-solar-accent"
      case "planned": return "bg-solar-warning"
      default: return "bg-solar-secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed"
      case "current": return "In Progress"
      case "planned": return "Planned"
      default: return "Upcoming"
    }
  }

  // Properly typed variants with Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const pulseAnimation = {
    scale: [1, 1.3, 1],
    opacity: [0.7, 0.3, 0.7],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  // Fixed: Properly typed shine animation without whileHover conflict
  const shineTransition = {
    duration: 2,
    ease: "easeInOut" as const
  }

  return (
    <section id="history" className="section-padding bg-secondary relative overflow-hidden">
      <SolarInnovation/>
      <div className="container-responsive relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            OUR <span className="gradient-text-solar">JOURNEY</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-32 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto mb-6 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg text-tertiary max-w-3xl mx-auto px-4 leading-relaxed"
          >
            From pioneering power solutions to leading the <span className="text-solar-primary font-semibold">solar revolution</span> in Bangladesh
          </motion.p>
        </motion.div>

        {/* Solar Background Elements */}
        <div className="flex items-center justify-center z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-lg text-secondary font-bold tracking-wide"
          >
            <SolarBanner/>
          </motion.div>
          {/* Content Section */}
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="relative"
          >
            {/* Fixed: Enhanced Vertical Timeline Line - More visible */}
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-solar-primary backdrop-blur-2xl rounded-full shadow-lg" />
            
            {/* Animated Progress Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="absolute left-5 top-0 w-1 bg-solar-accent origin-top shadow-md"
              style={{ height: 'calc(100% - 2rem)' }}
            />

            <div className="space-y-8 pl-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon
                return (
                  <motion.div
                    key={milestone.year}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-12 top-4 z-10">
                      <motion.div
                        variants={dotVariants}
                        whileHover="hover"
                        className={`w-10 h-10 ${getStatusColor(milestone.status)} rounded-full flex items-center justify-center shadow-lg border-2 border-secondary relative`}
                      >
                        <IconComponent className="h-4 w-4 text-primary" />
                        
                        {/* Smooth pulse animation for current milestone */}
                        {milestone.status === "current" && (
                          <motion.div
                            className="absolute inset-0 border-2 border-solar-accent rounded-full"
                            animate={pulseAnimation}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <Link href={`${milestone.link == "" ? "#" : "/pages/projects/"+milestone.link}`}>
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className={`card card-glass card-interactive p-6 relative overflow-hidden ${
                        milestone.status === "current" ? 'ring-2 ring-solar-accent shadow-glow' : ''
                      }`}
                    >
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-solar-accent/10">
                            <IconComponent className="h-4 w-4 text-solar-accent" />
                          </div>
                          <span className="text-solar-accent font-bold text-base">{milestone.year}</span>
                        </div>
                        <span className={`tag ${
                          milestone.status === 'completed' ? 'tag-success' : 
                          milestone.status === 'current' ? 'tag-primary' : 'tag-warning'
                        }`}>
                          {getStatusText(milestone.status)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-primary mb-3 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-tertiary text-sm leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Fixed: Enhanced shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ 
                          x: "200%",
                          transition: shineTransition
                        }}
                      />
                    </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden sm:block relative">
          {/* Fixed: Enhanced Main Timeline Line - More visible */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-solar-primary via-solar-accent to-solar-warning h-full rounded-full shadow-xl" />
          
          {/* Animated Progress Line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            viewport={{ once: false }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-solar-accent h-full rounded-full origin-top shadow-lg"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-20"
          >
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                    <Link href={`${milestone.link == "" ? "#" : "/pages/projects/"+milestone.link}`}>
                      <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className={`card card-glass card-interactive p-8 relative overflow-hidden ${
                          milestone.status === "current" ? 'ring-2 ring-solar-accent shadow-glow' : ''
                        }`}
                      >
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-solar-accent/10">
                              <IconComponent className="h-5 w-5 text-solar-accent" />
                            </div>
                            <span className="text-solar-accent font-bold text-lg">{milestone.year}</span>
                          </div>
                          <span className={`tag tag-lg ${
                            milestone.status === 'completed' ? 'tag-success' : 
                            milestone.status === 'current' ? 'tag-primary' : 'tag-warning'
                          }`}>
                            {getStatusText(milestone.status)}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-4 leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-tertiary leading-relaxed">
                          {milestone.description}
                        </p>

                        {/* Fixed: Enhanced shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ 
                            x: "200%",
                            transition: shineTransition
                          }}
                        />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      variants={dotVariants}
                      whileHover="hover"
                      className={`w-14 h-14 ${getStatusColor(milestone.status)} rounded-full flex items-center justify-center shadow-xl border-4 border-secondary relative`}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                      
                      {/* Smooth pulse animation for current milestone */}
                      {milestone.status === "current" && (
                        <motion.div
                          className="absolute inset-0 border-4 border-solar-accent rounded-full"
                          animate={pulseAnimation}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Year Indicator */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-16' : 'pr-16'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                      className="text-center"
                    >
                      <div className={`text-5xl font-black ${
                        milestone.status === "current" 
                          ? "gradient-text-solar" 
                          : milestone.status === "completed"
                          ? "text-solar-success"
                          : "text-solar-warning"
                      } opacity-90`}>
                        {milestone.year}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                        className="text-tertiary text-sm mt-2 font-medium"
                      >
                        {getStatusText(milestone.status)}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Enhanced Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-16 pt-8 border-t border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-solar-success rounded-full shadow-md" />
            <span className="text-sm text-tertiary font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-solar-accent rounded-full relative">
              <motion.div
                className="absolute inset-0 border-2 border-solar-accent rounded-full"
                animate={pulseAnimation}
              />
            </div>
            <span className="text-sm text-tertiary font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-solar-warning rounded-full shadow-md" />
            <span className="text-sm text-tertiary font-medium">Planned</span>
          </div>
        </motion.div>

        {/* Summary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="card card-glass p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 gradient-energy opacity-10"></div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-2xl font-extrabold text-primary mb-4"
            >
              Building a <span className="gradient-text-solar">Sustainable Future</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-tertiary text-lg leading-relaxed"
            >
              From our humble beginnings in 1987 to becoming a leader in solar energy, 
              we continue to innovate and expand our renewable energy footprint across Bangladesh.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default History