'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sun,
  Trees,
  Factory,
  Award,
  ArrowRight,
  Calendar
} from 'lucide-react'

const CountUp = ({ target, suffix = '', duration = 1200, isInView }: { target: number, suffix?: string, duration?: number, isInView: boolean }) => {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) {
      setValue(0)
      return
    }

    let start: number | null = null

    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOutProgress * target)
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
      color: 'solar-accent'
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
        threshold: 0.2,
        rootMargin: '100px'
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

  return (
    <section id="stats" ref={sectionRef} className="section-padding bg-primary relative overflow-hidden z-20">
      <div className="container-responsive relative z-10">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 m-2 sm:m-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -4 }}
                className={`card card-interactive p-2 sm:p-4 text-center bg-transparent backdrop-blur-xs relative overflow-hidden group border border-primary/10 hover:shadow-lg transition-shadow duration-300`}
              >
                <motion.div
                  className="bg-solar-primary w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center m-2 sm:m-4 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </motion.div>

                <CountUp 
                  target={stat.target} 
                  suffix={stat.suffix} 
                  duration={1400} 
                  isInView={isInView} 
                />

                <div className="text-base sm:text-lg font-semibold text-solar-primary m-2">{stat.label}</div>
                <div className="text-xs sm:text-sm text-tertiary leading-relaxed">{stat.description}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="bg-gradient-to-r from-solar-primary to-solar-secondary rounded-2xl p-2 sm:p-4 text-primary text-center relative overflow-hidden"
        >
          {/* Static Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Ready to Power Your Future with Solar Energy?
              </h2>
              <p className="text-base sm:text-lg text-primary/90 mb-6 sm:mb-8 leading-relaxed">
                Join us in creating a sustainable future. Explore our solar solutions and discover how we can help you transition to clean, renewable energy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToAbout}
                className="btn btn-primary text-base py-3 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg transition-shadow duration-300"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="btn btn-accent text-base py-3 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg transition-shadow duration-300"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
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

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-tertiary text-sm uppercase tracking-wider mb-4 font-semibold">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-70">
            {['Government Agencies', 'Industrial Partners', 'Financial Institutions', 'International Organizations'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + index * 0.1, ease: "easeOut" }}
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