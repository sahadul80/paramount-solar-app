'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sun,
  Trees,
  Factory,
  Award,
  ArrowRight,
  Calendar,
  Zap,
  Leaf,
  TrendingUp,
  Users
} from 'lucide-react'
import { SolarFarm } from './patterns/SolarFarm'

const CountUp = ({ target, suffix = '', duration = 1200, isInView }: { target: number, suffix?: string, duration?: number, isInView: boolean }) => {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) {
      setValue(0) // Reset when out of view
      return
    }

    let start: number | null = null

    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(progress * target)
      setValue(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }

    setValue(0)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, isInView])

  return (
    <span className="text-2xl sm:text-3xl font-bold text-primary mb-1">
      {value}
      {suffix}
    </span>
  )
}

const StatsCTA = () => {
  const stats = [
    {
      icon: Sun,
      target: 130,
      suffix: 'MW',
      label: 'Solar Capacity',
      description: 'Total commissioned solar power capacity',
      color: 'from-solar-primary/20 to-solar-primary/10'
    },
    {
      icon: Trees,
      target: 145,
      suffix: 'K+',
      label: 'CO₂ Offset',
      description: 'Tons of carbon dioxide offset annually',
      color: 'from-solar-success/20 to-solar-success/10'
    },
    {
      icon: Factory,
      target: 3,
      suffix: '+',
      label: 'Major Projects',
      description: 'Large-scale solar power plants',
      color: 'from-solar-accent/20 to-solar-accent/10'
    },
    {
      icon: Award,
      target: 7,
      suffix: '+',
      label: 'Years Experience',
      description: 'In renewable energy sector',
      color: 'from-solar-secondary/20 to-solar-secondary/10'
    }
  ]

  const sectionRef = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut" as const
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="stats" ref={sectionRef} className="section-padding bg-secondary relative overflow-hidden">
      <SolarFarm/>
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-16 h-16 bg-solar-secondary rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-solar-accent rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-responsive relative z-10">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover="hover"
                className={`card card-interactive p-4 sm:p-6 text-center bg-gradient-to-br ${stat.color} relative overflow-hidden group border border-primary/10`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                <motion.div
                  className="bg-solar-primary w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </motion.div>

                <CountUp 
                  target={stat.target} 
                  suffix={stat.suffix} 
                  duration={1400} 
                  isInView={isInView} 
                />

                <div className="text-base sm:text-lg font-semibold text-solar-primary mb-2">{stat.label}</div>
                <div className="text-xs sm:text-sm text-tertiary leading-relaxed">{stat.description}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="bg-gradient-to-r from-solar-primary to-solar-secondary rounded-2xl p-6 sm:p-8 md:p-12 text-primary text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] bg-[length:40px_40px]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <motion.div
                animate={isInView ? {
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Calendar className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Ready to Power Your Future with Solar Energy?
              </h2>
              <p className="text-base sm:text-lg text-primary/90 mb-6 sm:mb-8 leading-relaxed">
                Join us in creating a sustainable future. Explore our solar solutions and discover how we can help you transition to clean, renewable energy.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAbout}
                className="btn btn-primary text-base py-3 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn btn-accent text-base py-3 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 group"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Enhanced Additional Info */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-primary/90"
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-solar-success rounded-full flex-shrink-0" />
                <span>20+ Years Power Purchase Agreement</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-solar-success rounded-full flex-shrink-0" />
                <span>Utility-scale Solar Projects</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-solar-success rounded-full flex-shrink-0" />
                <span>Proven Track Record</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-tertiary text-sm uppercase tracking-wider mb-4 font-semibold">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-70">
            {['Government Agencies', 'Industrial Partners', 'Financial Institutions', 'International Organizations'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                className="text-tertiary font-medium text-sm flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-solar-accent rounded-full" />
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsCTA