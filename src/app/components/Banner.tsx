'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Play, Pause } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const slides = [
    {
      title: "Pioneering Renewable Energy",
      subtitle: "Harnessing the power of the sun for a carbon-neutral future",
      image: "🌞",
      stats: "130MW Solar Power",
      bgImage:
        "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80')",
      gradient: "from-emerald-100/80 via-teal-50/80 to-cyan-100/80",
    },
    {
      title: "Clean Energy Solutions",
      subtitle: "Utility-scale solar power generation for Bangladesh",
      image: "⚡",
      stats: "145K+ Tons CO₂ Offset",
      bgImage:
        "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80')",
      gradient: "from-blue-50/80 via-indigo-100/80 to-purple-100/80",
    },
    {
      title: "Sustainable Development",
      subtitle: "Building a greener and more resilient world",
      image: "🌍",
      stats: "Leading Solar IPP",
      bgImage:
        "url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80')",
      gradient: "from-green-50/80 via-emerald-100/80 to-teal-100/80",
    },
  ]

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovering, slides.length])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden pt-16 w-full min-h-screen"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background transition */}
      <AnimatePresence mode="wait" custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 250, damping: 25 },
            opacity: { duration: 0.6 },
          }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
          style={{
            backgroundImage: `${slides[currentSlide].bgImage}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'soft-light',
          }}
        />
      </AnimatePresence>

      {/* Subtle moving gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-teal-200/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 text-center">
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-6 select-none"
        >
          {slides[currentSlide].image}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 drop-shadow-lg mb-4"
        >
          {slides[currentSlide].title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-700 font-medium max-w-3xl mb-8"
        >
          {slides[currentSlide].subtitle}
        </motion.p>

        {/* Modern Glass Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Primary Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('national-footprint')}
            className="relative group flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg backdrop-blur-xl bg-gradient-to-r from-emerald-600/80 to-teal-600/80 shadow-xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Explore Projects</span>
            <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
          </motion.button>

          {/* Secondary Glass Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="relative group flex items-center justify-center px-8 py-4 rounded-2xl text-emerald-800 font-semibold text-lg backdrop-blur-2xl border border-emerald-400/60 bg-white/60 shadow-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-300/30 via-emerald-200/50 to-cyan-200/30 bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative z-10">Get in Touch</span>
          </motion.button>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-white/20 backdrop-blur-lg p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            {isAutoPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Slide indicators */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />
    </section>
  )
}

export default Banner
