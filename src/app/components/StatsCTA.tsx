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

/**
 * CountUp component
 * - target: numeric target to count to (e.g., 145)
 * - suffix: string appended to the number (e.g., 'K+','MW')
 * - trigger: change this value to restart the animation
 * - duration: ms for the animation
 */
const CountUp = ({ target, suffix = '', trigger = 0, duration = 1200 }: { target: number, suffix?: string, trigger?: number, duration?: number }) => {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
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

    // reset and start
    setValue(0)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, target, duration])

  return (
    <span className="text-3xl font-bold text-gray-800 mb-1">
      {value}
      {suffix}
    </span>
  )
}

const StatsCTA = () => {
  // Use numeric targets and suffixes so we can animate reliably
  const stats = [
    {
      icon: Sun,
      target: 130,
      suffix: 'MW',
      label: 'Solar Capacity',
      description: 'Total commissioned solar power capacity'
    },
    {
      icon: Trees,
      target: 145,
      suffix: 'K+',
      label: 'CO₂ Offset',
      description: 'Tons of carbon dioxide offset annually'
    },
    {
      icon: Factory,
      target: 3,
      suffix: '+',
      label: 'Major Projects',
      description: 'Large-scale solar power plants'
    },
    {
      icon: Award,
      target: 7,
      suffix: '+',
      label: 'Years Experience',
      description: 'In renewable energy sector'
    }
  ]

  const sectionRef = useRef<HTMLElement | null>(null)
  // incrementing number used to retrigger CountUp components
  const [triggerCount, setTriggerCount] = useState(0)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // increment to retrigger child CountUp animations
            setTriggerCount((t) => t + 1)
          }
        })
      },
      {
        threshold: 0.25 // moderately visible before triggering
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
    <section id="stats" ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* CountUp uses triggerCount so it restarts every time section intersects */}
                <CountUp target={stat.target} suffix={stat.suffix} trigger={triggerCount} duration={1100} />

                <div className="text-lg font-semibold text-green-600 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Power Your Future with Solar Energy?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join us in creating a sustainable future. Explore our solar solutions and discover how we can help you transition to clean, renewable energy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToAbout}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Our Solutions
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={scrollToContact}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                Get Free Consultation
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-green-100"
            >
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                <span>20+ Years Power Purchase Agreement</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                <span>Utility-scale Solar Projects</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                <span>Proven Track Record</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Government Agencies', 'Industrial Partners', 'Financial Institutions', 'International Organizations'].map((partner) => (
              <div key={partner} className="text-gray-400 font-medium">
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsCTA