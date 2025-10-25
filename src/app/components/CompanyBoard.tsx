'use client'

import { motion, Variants } from 'framer-motion'
import { Award, Globe, Building, User, Zap, Leaf, Target, TrendingUp, Sparkles, CircuitBoard } from 'lucide-react'
import { Photovoltaic } from './patterns/Photovoltaic'
import { SolarInstallation } from './patterns/SolarInstallation'

const CompanyBoard = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
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
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const floatingAnimation = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  const shineTransition = {
    duration: 1.5,
    ease: "easeInOut" as const
  }

  const industries = [
    'Textile', 'Energy', 'Insurance', 'Ventures', 
    'Brand Building', 'Garments', 'Housing', 
    'Technology', 'Agro-based Industries'
  ]

  return (
    <section id="board" className="section-padding bg-secondary relative overflow-hidden">

      <div className="container-responsive relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Sparkles className="h-8 w-8 text-solar-accent" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              COMPANY <span className="gradient-text-solar">LEADERSHIP</span>
            </h2>
            <Sparkles className="h-8 w-8 text-solar-accent" />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-32 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto mb-8 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg text-tertiary max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Guided by visionary leadership committed to <span className="text-solar-primary font-semibold">sustainable energy</span> and <span className="text-solar-accent font-semibold">innovative solutions</span>
          </motion.p>
        </motion.div>

        {/* Main Board Member Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto "
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="card card-glass card-interactive p-2 sm:p-4 sm:m-4 relative overflow-hidden"
          >
            {/* Profile Header */}
            <div className="text-center mb-12 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mx-auto mb-6"
              >
                <div className="w-40 h-40 bg-gradient-to-br from-solar-primary to-solar-accent rounded-full p-2 shadow-2xl mx-auto">
                  <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-32 h-32 bg-gradient-to-br from-solar-primary/20 to-solar-accent/20 rounded-full flex items-center justify-center"
                    >
                      <User className="h-16 w-16 text-solar-accent" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.4, 0.8]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-solar-success rounded-full border-4 border-secondary flex items-center justify-center"
                >
                  <Zap className="h-3 w-3 text-primary" />
                </motion.div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-3xl font-extrabold text-primary mb-2"
              >
                Mr. Shadab Hossain
              </motion.h3>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="space-y-2"
              >
                <p className="text-xl font-bold gradient-text-solar">MANAGING DIRECTOR</p>
                <p className="text-tertiary text-lg font-medium">PARAMOUNT SOLAR LTD.</p>
              </motion.div>
            </div>

            {/* Content Grid */}
            <motion.div
              variants={containerVariants}
              className="grid lg:grid-cols-2 gap-4"
            >
              {/* Education & Background */}
              <motion.div
                variants={itemVariants}
                className="card card-interactive p-4 relative overflow-hidden group"
              >
                <div className="flex flex-col items-start gap-4">
                  <Photovoltaic/>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-row items-between justify-between flex-shrink-0 p-2 sm:p-4 rounded-xl"
                  >
                    <Award className="h-6 w-6 text-solar-primary" />
                    <h4 className="text-xl font-bold text-primary">Education & Background</h4>
                  </motion.div>
                  <div className="flex-1">
                    <ul className="space-y-3">
                      {[
                        "Bachelor of Science in International Economics from Suffolk University, Boston, USA",
                        "IB Diploma from the International Baccalaureate",
                        "Dynamic leadership and entrepreneurial spirit",
                        "Extensive experience across diverse industries"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 text-tertiary leading-relaxed"
                        >
                          <div className="w-2 h-2 bg-solar-accent rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ 
                    x: "200%",
                    transition: shineTransition
                  }}
                />
              </motion.div>

              {/* Expertise & Focus */}
              <motion.div
                variants={itemVariants}
                className="card card-interactive p-4 relative overflow-hidden group mb-4"
              >
                <SolarInstallation/>
                <div className="flex flex-col items-start">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-row items-between justify-between flex-shrink-0 p-2 sm:p-4 rounded-xl"
                  >
                    <Globe className="h-6 w-6 text-solar-secondary" />
                    <h4 className="text-xl font-bold text-primary mb-4">Expertise & Focus</h4>
                  </motion.div>
                  <div className="flex-1">
                    <ul className="space-y-3">
                      {[
                        "Passionate about brand building and technology integration",
                        "Environmentally friendly and sustainable business practices",
                        "Active public spokesman on contemporary issues",
                        "Prominent young business personality"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 text-tertiary leading-relaxed"
                        >
                          <div className="w-2 h-2 bg-solar-secondary rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-secondary/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ 
                    x: "200%",
                    transition: shineTransition
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Industry Experience */}
            <motion.div
              variants={itemVariants}
              className="card card-interactive p-4 relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 p-3 rounded-xl bg-solar-accent/10"
                >
                  <Building className="h-6 w-6 text-solar-accent" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary mb-4">Industry Experience</h4>
                  <div className="flex flex-wrap gap-3">
                    {industries.map((industry, index) => (
                      <motion.span
                        key={industry}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="tag tag-primary font-medium"
                      >
                        {industry}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ 
                  x: "200%",
                  transition: shineTransition
                }}
              />
            </motion.div>

            {/* Leadership Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-8 pt-8 border-t border-primary/20"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Target, value: "Visionary", desc: "Strategic Leadership" },
                  { icon: TrendingUp, value: "Innovator", desc: "Growth Mindset" },
                  { icon: Leaf, value: "Sustainable", desc: "Eco-Conscious" }
                ].map((item, index) => (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4"
                  >
                    <div className="bg-gradient-to-br from-solar-primary/10 to-solar-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-solar-accent" />
                    </div>
                    <div className="text-lg font-bold text-primary mb-1">{item.value}</div>
                    <div className="text-tertiary text-sm">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <div className="card card-glass p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 gradient-solar opacity-10"></div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-2xl font-extrabold text-primary mb-4"
            >
              Driving <span className="gradient-text-solar">Solar Innovation</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-tertiary text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Under visionary leadership, Paramount Solar continues to pioneer renewable energy solutions, 
              setting new standards for <span className="text-solar-primary font-semibold">sustainable development</span> and 
              <span className="text-solar-accent font-semibold"> technological innovation</span> in Bangladesh's energy sector.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompanyBoard