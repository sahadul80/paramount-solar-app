'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sun, Zap, Leaf, Play, Pause, Sparkles, CircuitBoard } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import SolarBanner from './SolarBanner'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const slides = [
    {
      title: "Pioneering Renewable Energy",
      subtitle: "Harnessing the power of the sun for a carbon neutral future",
      icon: Sun,
      bg: "from-solar-primary/10 via-solar-accent/5 to-solar-secondary/10",
      image: "☀️",
      stats: "130MW Solar Power",
      particles: 8,
      color: "text-solar-accent/30",
      bgImage: "/images/b5.png"
    },
    {
      title: "Clean Energy Solutions",
      subtitle: "Utility-scale solar power generation for Bangladesh",
      icon: Zap,
      bg: "from-solar-secondary/10 via-solar-primary/5 to-solar-accent/10",
      image: "⚡",
      stats: "145K+ Tons CO₂ Offset",
      particles: 6,
      color: "text-solar-secondary/30",
      bgImage: "/images/b2.png"
    },
    {
      title: "Sustainable Development",
      subtitle: "Building a greener and more resilient world",
      icon: Leaf,
      bg: "from-solar-accent/10 via-solar-secondary/5 to-solar-primary/10",
      image: "🌍",
      stats: "Leading Solar IPP",
      particles: 10,
      color: "text-solar-primary/30",
      bgImage: "/images/b1.png"
    }
  ]

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length, isAutoPlaying, isHovering])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStats = () => {
    scrollToSection('national-footprint')
  }

  const scrollToContact = () => {
    scrollToSection('contact')
  }

  const scrollToProjects = () => {
    scrollToSection('projects')
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        case ' ':
          e.preventDefault()
          setIsAutoPlaying(prev => !prev)
          break
        case 'Escape':
          setIsAutoPlaying(true)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide])

  // Smooth Floating Particles with continuous flow
  const FloatingParticles = ({ count, color }: { count: number; color: string }) => {
    if (!isClient) return null

    const particles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 15 + 8,
      duration: Math.random() * 20 + 20, // Longer duration for smoother movement
      delay: Math.random() * 10
    }))

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute ${color} opacity-20`}
            initial={{
              x: 0,
              y: 0,
              scale: 0.8,
              rotate: 0,
            }}
            animate={{
              x: [0, 30, 0, -20, 0],
              y: [0, -20, 10, -10, 0],
              scale: [0.8, 1.1, 0.9, 1.2, 0.8],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
              repeatType: "loop",
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
          >
            <CircuitBoard/>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden w-full max-h-screen min-h-screen bg-primary p-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <FloatingParticles count={100} color={"gray-400"} />
      {/* Background Slides with Next.js Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.6
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-10">
              <Image
                src={slides[currentSlide].bgImage}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                quality={90}
                sizes="100vw"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Solar Banner with 3D Text Effect */}
      <div className='flex flex-col items-center'>
        <div className="items-center justify-center z-10 text-center m-6 mt-24">
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
        <div className="flex justify-center w-full md:max-w-xl lg:max-w-3xl h-full max-h-xl rounded-lg glass-effect z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-between text-center m-4"
            >
              {/* Icon */}
              <motion.div className="text-6xl md:text-8xl lg:text-9xl text-center">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                >
                  {slides[currentSlide].image}
                </motion.div>
              </motion.div>

              <motion.div className="flex flex-col justify-between">
                {/* Title */}
                <motion.h1 className="text-2xl sm:text-xl font-bold text-primary leading-tight p-2">
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p className="text-md sm:text-lg lg:text-xl text-secondary leading-relaxed max-w-3xl">
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Stats */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProjects}
                  className="card card-interactive bg-secondary/50 border border-primary/20 rounded-xl p-2 inline-block cursor-pointer hover-glow"
                >
                  <motion.p 
                    className="text-base sm:text-lg font-bold text-solar-accent"
                    animate={{
                      color: ["#f59e0b", "#10b981", "#0ea5e9", "#f59e0b"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {slides[currentSlide].stats}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-6xl mx-auto p-4">

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-row gap-4 justify-center items-center w-full max-w-md m-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToStats}
            className="btn btn-primary btn-lg flex items-center gap-2 group w-full sm:w-auto"
          >
            <span>Explorek</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="btn btn-accent btn-lg w-full sm:w-auto"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Controls Section */}
        <div className="w-full max-w-2xl mx-auto m-4 p-4">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center mb-4"
          >
            <div className="w-80 h-2 bg-primary/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                key={`progress-${currentSlide}-${isAutoPlaying}`}
                initial={{ width: "0%" }}
                animate={isAutoPlaying && !isHovering ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-solar-accent rounded-full"
              />
            </div>
          </motion.div>

          {/* Slide Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center space-x-4 md:space-x-6"
          >
            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="card bg-secondary/50 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-secondary/70 transition-all duration-300 border border-primary/10"
            >
              {isAutoPlaying ? (
                <Pause className="h-5 w-5 text-primary" />
              ) : (
                <Play className="h-5 w-5 text-primary" />
              )}
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="card bg-secondary/50 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-secondary/70 transition-all duration-300 border border-primary/10"
            >
              <ArrowDown className="h-5 w-5 text-primary rotate-90" />
            </motion.button>

            {/* Slide Indicators */}
            <div className="flex space-x-3 mx-4">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1)
                    setCurrentSlide(index)
                  }}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-solar-accent shadow-lg' 
                      : 'bg-primary/50 hover:bg-primary/70'
                  }`}
                >
                  {currentSlide === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full bg-solar-accent"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="card bg-secondary/50 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-secondary/70 transition-all duration-300 border border-primary/10"
            >
              <ArrowDown className="h-5 w-5 text-primary -rotate-90" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />
    </section>
  )
}

export default Banner