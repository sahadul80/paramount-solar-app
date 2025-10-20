'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sun, Zap, Leaf, Play, Pause, Star, Sparkles } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  const slides = [
    {
      title: "Pioneering Renewable Energy",
      subtitle: "Harnessing the power of the sun for a carbon neutral future",
      icon: Sun,
      bg: "from-emerald-50/80 via-teal-100/80 to-cyan-100/80",
      gradient: "linear-gradient(135deg, rgba(209,250,229,0.8), rgba(204,251,241,0.8), rgba(207,250,254,0.8))",
      image: "🌞",
      stats: "130MW Solar Power",
      particles: 15,
      color: "text-amber-200",
      bgImage: "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.3)), url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
    },
    {
      title: "Clean Energy Solutions",
      subtitle: "Utility-scale solar power generation for Bangladesh",
      icon: Zap,
      bg: "from-blue-50/80 via-indigo-100/80 to-purple-100/80",
      gradient: "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(224,231,255,0.8), rgba(243,244,246,0.8))",
      image: "⚡",
      stats: "145K+ Tons CO₂ Offset",
      particles: 12,
      color: "text-blue-200",
      bgImage: "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.3)), url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
    },
    {
      title: "Sustainable Development",
      subtitle: "Building a greener and more resilient world",
      icon: Leaf,
      bg: "from-green-50/80 via-emerald-100/80 to-teal-100/80",
      gradient: "linear-gradient(135deg, rgba(220,252,231,0.8), rgba(209,250,229,0.8), rgba(204,251,241,0.8))",
      image: "🌍",
      stats: "Leading Solar IPP",
      particles: 18,
      color: "text-emerald-200",
      bgImage: "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.3)), url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
    }
  ]

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle window resize and initial size - only on client
  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length, isAutoPlaying, isHovering])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
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

  // Floating particles component - Fixed for SSR
  const FloatingParticles = ({ count, color }: { count: number; color: string }) => {
    // Don't render particles during SSR
    if (!isClient) {
      return null
    }

    // Generate stable particle positions that won't change between server and client
    const particles = Array.from({ length: count }).map((_, i) => {
      // Use a deterministic seed for each particle to avoid hydration mismatches
      const seed = (currentSlide * count + i) * 12345
      const pseudoRandom = (max: number) => {
        return ((seed * (i + 1)) % max)
      }
      
      return {
        id: i,
        x: pseudoRandom(windowSize.width),
        y: pseudoRandom(windowSize.height),
        scale: (pseudoRandom(50) + 50) / 100,
        size: pseudoRandom(20) + 5,
        duration: pseudoRandom(20) + 10,
        delay: pseudoRandom(5)
      }
    })

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute ${color} opacity-15`}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
            }}
            animate={{
              x: particle.x + (Math.sin(particle.id) * 200), // Deterministic movement
              y: particle.y + (Math.cos(particle.id) * 200),
              rotate: 360,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>
    )
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  }

  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 5,
        ease: "linear"
      }
    }
  }

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden pt-16 w-full min-h-screen"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Slides with Enhanced Animations */}
      <AnimatePresence mode="wait" custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.5 }
          }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg}`}
          style={{
            backgroundImage: slides[currentSlide].bgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'soft-light',
          }}
        />
      </AnimatePresence>

      {/* Floating Particles - Only rendered on client */}
      <FloatingParticles 
        count={slides[currentSlide].particles}
        color={slides[currentSlide].color}
      />

      {/* Subtle Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-center w-full"
            >
              {/* Icon with Enhanced Animation */}
              <motion.div
                className="text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 relative"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  {slides[currentSlide].image}
                </motion.div>
                
                {/* Enhanced Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-2xl opacity-40"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {slides[currentSlide].image}
                </motion.div>
              </motion.div>

              {/* Title with Character Animation */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 md:mb-6 leading-tight"
              >
                {slides[currentSlide].title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                    className="inline-block hover:scale-110 transition-transform duration-200"
                    style={{
                      textShadow: '2px 2px 4px rgba(255,255,255,0.5)'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle with Enhanced Animation */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto px-2"
                style={{
                  textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                }}
              >
                {slides[currentSlide].subtitle.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.02,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>

              {/* Stats with Enhanced Animation - Clickable */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="rounded-2xl px-8 py-6 inline-block border-2 border-white/40 mb-8 md:mb-12 relative overflow-hidden cursor-pointer shadow-2xl"
              >
                {/* Enhanced Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
                <motion.p 
                  className="text-md md:text-lg font-bold text-gray-800 relative z-10"
                >
                  {slides[currentSlide].stats}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex lex-row justify-center items-center gap-4 p-2"
        >
          <motion.button 
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToStats}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg md:text-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[60px] flex-1 max-w-sm relative overflow-hidden group"
          >
            {/* Enhanced Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.8 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.button>
          
          <motion.button 
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToContact}
            className="bg-white/90 backdrop-blur-xl border-2 border-emerald-600 text-emerald-700 rounded-2xl font-bold text-lg md:text-xl hover:bg-emerald-600 hover:text-white transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[60px] flex-1 max-w-sm relative overflow-hidden group"
          >
            {/* Enhanced Border Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400/50 via-emerald-600 to-emerald-400/50 bg-[length:200%_100%]"
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative z-10">Get Started</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Controls Section */}
        <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 py-8">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="w-80 h-2 bg-white/30 rounded-full overflow-hidden shadow-inner">
              <motion.div
                key={currentSlide}
                initial="initial"
                animate={isAutoPlaying && !isHovering ? "animate" : "initial"}
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg"
              />
            </div>
          </motion.div>

          {/* Enhanced Slide Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-4 md:space-x-6"
          >
            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white/20 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-white/30 transition-colors shadow-lg"
            >
              {isAutoPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="bg-white/20 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-white/30 transition-colors shadow-lg"
            >
              <ArrowDown className="h-5 w-5 text-white rotate-90" />
            </motion.button>

            {/* Enhanced Slide Indicators */}
            <div className="flex space-x-4 mx-4">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-4 h-4 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  {currentSlide === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="bg-white/20 backdrop-blur-lg rounded-full p-3 md:p-4 hover:bg-white/30 transition-colors shadow-lg"
            >
              <ArrowDown className="h-5 w-5 text-white -rotate-90" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Gradient Overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  )
}

export default Banner