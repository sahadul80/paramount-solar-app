'use client'

import { motion } from 'framer-motion'
import { Calendar, Zap, TrendingUp, Sun, Battery } from 'lucide-react'
import SolarBanner from './SolarBanner'
import Link from 'next/link'

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

  return (
    <section id="history" className="bg-primary relative overflow-hidden p-4 z-20">
      <div className="container mx-auto p-2 sm:p-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-center m-2 sm:m-4"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">
            OUR <span className="text-solar-accent">JOURNEY</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto mb-4 rounded-full" />
          <p className="text-tertiary max-w-2xl mx-auto">
            From pioneering power solutions to leading the <span className="text-solar-primary font-semibold">solar revolution</span> in Bangladesh
          </p>
        </motion.div>

        {/* Solar Banner */}
        <div className="flex items-center justify-center m-2 sm:m-4">
          <SolarBanner/>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-solar-primary/50 rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute left-6 top-0 w-0.5 bg-solar-accent origin-top"
              style={{ height: 'calc(100% - 2rem)' }}
            />

            <div className="space-y-6 pl-10">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-8 top-4 z-10">
                      <div className={`w-8 h-8 ${getStatusColor(milestone.status)} rounded-full flex items-center justify-center shadow-md border border-secondary relative`}>
                        <IconComponent className="h-3 w-3 text-primary" />
                        
                        {/* Pulse animation for current milestone */}
                        {milestone.status === "current" && (
                          <motion.div
                            className="absolute inset-0 border border-solar-accent rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Link href={milestone.link ? `/pages/projects/${milestone.link}` : "#"}>
                      <div className={`card p-4 relative overflow-hidden border ${
                        milestone.status === "current" ? 'border-solar-accent shadow-md' : 'border-primary/10'
                      }`}>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-solar-accent/10">
                              <IconComponent className="h-3 w-3 text-solar-accent" />
                            </div>
                            <span className="text-solar-accent font-semibold text-sm">{milestone.year}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            milestone.status === 'completed' ? 'bg-solar-success/20 text-solar-success' : 
                            milestone.status === 'current' ? 'bg-solar-accent/20 text-solar-accent' : 'bg-solar-warning/20 text-solar-warning'
                          }`}>
                            {getStatusText(milestone.status)}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-primary mb-2 leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-tertiary text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-solar-primary via-solar-accent to-solar-warning h-full rounded-full" />
          
          {/* Animated Progress Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-solar-accent h-full rounded-full origin-top"
          />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Link href={milestone.link ? `/pages/projects/${milestone.link}` : "#"}>
                      <div className={`card p-6 relative overflow-hidden border ${
                        milestone.status === "current" ? 'border-solar-accent shadow-md' : 'border-primary/10'
                      }`}>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-solar-accent/10">
                              <IconComponent className="h-4 w-4 text-solar-accent" />
                            </div>
                            <span className="text-solar-accent font-semibold">{milestone.year}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            milestone.status === 'completed' ? 'bg-solar-success/20 text-solar-success' : 
                            milestone.status === 'current' ? 'bg-solar-accent/20 text-solar-accent' : 'bg-solar-warning/20 text-solar-warning'
                          }`}>
                            {getStatusText(milestone.status)}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-primary mb-3 leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-tertiary text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-10 h-10 ${getStatusColor(milestone.status)} rounded-full flex items-center justify-center shadow-md border-2 border-secondary relative`}>
                      <IconComponent className="h-4 w-4 text-primary" />
                      
                      {/* Pulse animation for current milestone */}
                      {milestone.status === "current" && (
                        <motion.div
                          className="absolute inset-0 border-2 border-solar-accent rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Year Indicator */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        milestone.status === "current" ? "text-solar-accent" : 
                        milestone.status === "completed" ? "text-solar-success" : "text-solar-warning"
                      }`}>
                        {milestone.year}
                      </div>
                      <div className="text-tertiary text-xs mt-1">
                        {getStatusText(milestone.status)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12 pt-6 border-t border-primary/20"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-solar-success rounded-full" />
            <span className="text-xs text-tertiary">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-solar-accent rounded-full" />
            <span className="text-xs text-tertiary">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-solar-warning rounded-full" />
            <span className="text-xs text-tertiary">Planned</span>
          </div>
        </motion.div>

        {/* Summary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="card p-6 max-w-2xl mx-auto border border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-3">
              Building a <span className="text-solar-accent">Sustainable Future</span>
            </h3>
            <p className="text-tertiary">
              From our humble beginnings in 1987 to becoming a leader in solar energy, 
              we continue to innovate and expand our renewable energy footprint across Bangladesh.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default History