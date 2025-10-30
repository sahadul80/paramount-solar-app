'use client'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Zap, Users, TrendingUp, Shield, Leaf, Clock, AlertCircle, Construction, Download, Mail, ChevronLeft, ChevronRight, Play, Pause, Maximize, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import MapModal from './MapModal'
import { SolarPanelGrid } from './patterns/SolarPanelGrid'
import { RenewableEnergy } from './patterns/RenewableEnergy'

// Types for our project data
export interface ProjectData {
  name: string
  type: string
  status: 'Operational' | 'Under Construction' | 'Pipeline' | 'Planning'
  capacity: string
  location: string
  coordinates: { lat: number; lng: number }
  slug: string
  commissioningDate?: string
  investment?: string
  developer?: string
  annualGeneration?: string
  co2Reduction?: string
  householdsPowered?: string
  landArea?: string
  map: string
  technicalSpecs?: {
    panels?: string
    inverters?: string
    tracking?: string
    transmission?: string
    monitoring?: string
    maintenance?: string
  }
  milestones?: Array<{ date: string; event: string }>
  environmentalImpact?: Array<{ metric: string; value: string; description: string }>
  keyFeatures?: Array<{ icon: string; title: string; description: string }>
  images?: Array<{ src: string; alt?: string }>
}

interface ProjectVisualizationProps {
  projectData: ProjectData
}

const ProjectVisualization = ({ projectData }: ProjectVisualizationProps) => {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    
    // Only access window if we're in the browser
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isMobile = windowWidth < 768

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

  const mobileSidebarVariants: Variants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
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

  // Status configurations with solar theme colors
  const getStatusConfig = (status: ProjectData['status']) => {
    switch (status) {
      case 'Operational': 
        return { 
          color: 'tag-success',
          bgColor: 'bg-solar-success/10',
          icon: Zap,
          gradient: 'from-solar-success to-solar-primary'
        }
      case 'Under Construction': 
        return { 
          color: 'tag-warning',
          bgColor: 'bg-solar-warning/10',
          icon: Construction,
          gradient: 'from-solar-warning to-solar-accent'
        }
      case 'Pipeline': 
        return { 
          color: 'tag-primary',
          bgColor: 'bg-solar-primary/10',
          icon: Clock,
          gradient: 'from-solar-primary to-solar-secondary'
        }
      case 'Planning':
      default: 
        return { 
          color: 'tag-secondary',
          bgColor: 'bg-solar-secondary/10',
          icon: AlertCircle,
          gradient: 'from-solar-secondary to-solar-tertiary'
        }
    }
  }

  const statusConfig = getStatusConfig(projectData.status)
  const StatusIcon = statusConfig.icon

  // Default images if none provided
  const defaultImages = [
    { src: '/images/solar-project-1.jpg', alt: 'Solar panels installation' },
    { src: '/images/solar-project-2.jpg', alt: 'Project construction site' },
    { src: '/images/solar-project-3.jpg', alt: 'Completed solar farm' }
  ]

  const images = projectData.images && projectData.images.length > 0 
    ? projectData.images 
    : defaultImages

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying)
  }, [isAutoPlaying])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen)
  }, [isSidebarOpen])

  const openMap = useCallback(() => {
    setIsMapOpen(true)
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  const closeMap = useCallback(() => {
    setIsMapOpen(false)
  }, [])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  // Default data for missing fields
  const defaultTechnicalSpecs = {
    panels: "High-efficiency monocrystalline panels",
    inverters: "Smart grid-tie inverters",
    tracking: "Fixed tilt mounting system",
    transmission: "Grid connection",
    monitoring: "Real-time monitoring system",
    maintenance: "Automated cleaning and maintenance",
    ...projectData.technicalSpecs
  }

  const defaultKeyFeatures = projectData.keyFeatures || [
    {
      icon: 'Zap',
      title: "Advanced PV Technology",
      description: "Utilizing high-efficiency solar panels with smart grid integration"
    },
    {
      icon: 'Shield',
      title: "Grid Stability",
      description: "Integrated power management systems for reliable energy supply"
    },
    {
      icon: 'Leaf',
      title: "Environmental Impact",
      description: "Clean energy generation contributing to carbon reduction goals"
    },
    {
      icon: 'TrendingUp',
      title: "Economic Benefits",
      description: "Supporting local economy and creating sustainable energy infrastructure"
    }
  ]

  const defaultMilestones = projectData.milestones || [
    { date: "Planning Phase", event: "Project Development & Feasibility Study" },
    { date: "Construction", event: "Site Preparation & Infrastructure Development" },
    { date: "Commissioning", event: "Grid Integration & Operational Testing" }
  ]

  const defaultEnvironmentalImpact = projectData.environmentalImpact || [
    { metric: "CO2 Reduction", value: "Significant annual reduction", description: "Contributing to national climate goals" },
    { metric: "Water Savings", value: "Zero water consumption", description: "Unlike conventional thermal power plants" },
    { metric: "Air Pollution", value: "Zero emissions", description: "No harmful pollutants released" }
  ]

  // Icon mapping
  const iconMap = {
    Zap: Zap,
    Shield: Shield,
    Leaf: Leaf,
    TrendingUp: TrendingUp,
    Users: Users,
    Clock: Clock
  }

  return (
    <div className="bg-primary overflow-auto">
      {/* Fixed Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 glass-effect border-b border-primary/20 p-1 z-10 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="container-responsive backdrop-blur-lg">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="btn btn-ghost flex items-center gap-2 sm:gap-3 group p-2"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-semibold text-primary text-sm sm:text-base">Back to Projects</span>
            </motion.button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-solar-success" />
              <span className={`tag ${statusConfig.color} font-medium text-xs sm:text-sm`}>
                {projectData.status}
              </span>
              
              {/* Mobile Sidebar Toggle */}
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSidebar}
                  className="btn btn-primary btn-sm"
                >
                  <span className="text-xs">Quick Facts</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content with padding for fixed header */}
      <div className="m-2 sm:m-4"> {/* Add padding to account for fixed header */}
        {/* Hero Section */}
        <section className={`relative overflow-auto ${statusConfig.bgColor}`}>
          <div className="container-responsive">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto m-2 mt-12"
            >
              <SolarPanelGrid/>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center"
              >
                <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-primary leading-tight z-10">
                  {projectData.name}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center"
              >
                <p className="hidden sm:flex text-lg sm:text-xl md:text-2xl font-normal text-primary leading-tight z-10">
                  : {projectData.type}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-4"
              >
                <div className="flex items-center gap-2 sm:gap-3 card card-glass">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                  <span className="font-semibold text-primary text-sm sm:text-base lg:text-lg">{projectData.capacity}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 card card-glass">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                  <span className="text-tertiary text-sm sm:text-base">{projectData.location}</span>
                </div>
                {projectData.commissioningDate && (
                  <div className="flex items-center gap-2 sm:gap-3 card card-glass">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                    <span className="text-tertiary text-sm sm:text-base">Since {projectData.commissioningDate}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* Main Content */}
        <div className="p-2 sm:p-4 h-[85vh] flex flex-col relative overflow-auto">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-4">
            {/* Main Content - 2/3 width on desktop, full width on mobile */}
            <div className="flex-1 space-y-4">
              {/* Project Overview */}
              <motion.section
                variants={cardVariants}
                className="card card-glass card-interactive p-2 sm:p-4 z-10"
              >
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary m-2 sm:m-4">Project Overview</h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-tertiary leading-relaxed text-sm sm:text-base md:text-lg">
                    The {projectData.name} is a {projectData.capacity.toLowerCase()} {projectData.type.toLowerCase()} 
                    located in {projectData.location}. This project represents a significant step forward in 
                    Bangladesh&apos;s renewable energy infrastructure, contributing to the nation&apos;s sustainable 
                    development goals.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                    <div className="card card-interactive p-2 sm:p-4 relative overflow-auto group z-10">
                      <h3 className="font-bold text-primary mb-3 sm:mb-4 text-lg">Project Significance</h3>
                      <ul className="space-y-2 sm:space-y-3 text-tertiary text-sm sm:text-base">
                        {[
                          "Contributing to national renewable energy targets",
                          "Reducing dependency on fossil fuels",
                          "Creating local employment opportunities",
                          "Supporting sustainable development goals"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <div className="w-2 h-2 bg-solar-success rounded-full m-2 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-success/5 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ 
                          x: "200%",
                          transition: shineTransition
                        }}
                      />
                    </div>
                    <div className="card card-interactive p-2 sm:p-4 bg-solar-secondary/10 border-solar-secondary/20 relative overflow-auto group z-10">
                      <h3 className="font-bold text-primary mb-3 sm:mb-4 text-lg">Community Impact</h3>
                      <ul className="space-y-2 sm:space-y-3 text-tertiary text-sm sm:text-base">
                        {[
                          "Local job creation during construction and operation",
                          "Skills development and technical training",
                          "Improved regional energy security",
                          "Environmental benefits for local communities"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <div className="w-2 h-2 bg-solar-secondary rounded-full m-1 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-secondary/5 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ 
                          x: "200%",
                          transition: shineTransition
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              <RenewableEnergy/>

              {/* Image Carousel Section */}
              <motion.section
                variants={cardVariants}
                className="card card-glass card-interactive p-4 relative overflow-auto"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-primary">Project Gallery</h2>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleAutoPlay}
                      className="btn btn-ghost p-1 sm:p-2 rounded-lg"
                      title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                      {isAutoPlaying ? (
                        <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-tertiary" />
                      ) : (
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 text-tertiary" />
                      )}
                    </motion.button>
                    <span className="text-xs sm:text-sm text-tertiary">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>

                {/* Main Image Carousel */}
                <div className="relative aspect-[4/3] sm:aspect-video bg-tertiary/20 rounded-xl overflow-auto">
                  {images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: index === currentImageIndex ? 1 : 0,
                        scale: index === currentImageIndex ? 1 : 1.1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 ${index === currentImageIndex ? 'block' : 'hidden'}`}
                    >
                      <Image
                        src={"/images/"+image.src}
                        alt={image.alt || `${projectData.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  ))}

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-solar-primary/80 hover:bg-solar-primary text-primary p-2 sm:p-4 rounded-full transition-all duration-200 shadow-lg z-10"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-solar-primary/80 hover:bg-solar-primary text-primary p-2 sm:p-4 rounded-full transition-all duration-200 shadow-lg z-10"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="m-2 sm:m-4 flex gap-2 sm:gap-3 overflow-x-auto p-2 custom-scrollbar">
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 relative aspect-[4/3] w-16 sm:w-20 md:w-24 rounded-lg overflow-auto border-2 transition-all duration-200 z-10 ${
                          index === currentImageIndex 
                            ? 'border-solar-accent ring-2 ring-solar-accent/20' 
                            : 'border-primary/20 hover:border-solar-primary'
                        }`}
                      >
                        <Image
                          src={"/images/"+image.src}
                          alt={image.alt || `Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                        />
                        <div className={`absolute inset-0 ${
                          index === currentImageIndex ? 'bg-solar-accent/20' : 'bg-black/0 hover:bg-black/10'
                        } transition-colors`} />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Key Features */}
              <motion.section
                variants={cardVariants}
                className="card card-glass card-interactive p-2 sm:p-4 relative overflow-auto"
              >
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary m-2 sm:m-4">Key Features & Technology</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {defaultKeyFeatures.map((feature, index) => {
                    const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap] || Zap
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="card card-interactive p-2 sm:p-4 bg-secondary/50 border-primary/20 relative overflow-auto group z-10"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-2 sm:p-3 rounded-xl bg-solar-accent/10 flex-shrink-0"
                          >
                            <FeatureIcon className="h-5 w-5 sm:h-6 sm:w-6 text-solar-accent" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-bold text-primary mb-2 sm:mb-3 text-base sm:text-lg">{feature.title}</h3>
                            <p className="text-tertiary leading-relaxed text-sm sm:text-base">{feature.description}</p>
                          </div>
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ 
                            x: "200%",
                            transition: shineTransition
                          }}
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </motion.section>

              {/* Technical Specifications */}
              <motion.section
                variants={cardVariants}
                className="card card-glass card-interactive p-2 sm:p-4 relative overflow-auto"
              >
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary m-2 sm:m-4">Technical Specifications</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="font-bold text-primary sm:m-4 text-lg">System Components</h3>
                    <div className="p-2">
                      {Object.entries(defaultTechnicalSpecs).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-2 sm:p-3 border-b border-primary/20 gap-1 sm:gap-0"
                        >
                          <span className="font-medium text-primary text-sm sm:text-base capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-tertiary text-sm sm:text-base sm:text-right sm:ml-4">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary m-2 sm:m-4 text-lg">Performance Metrics</h3>
                    <div className="space-y-4">
                      {projectData.annualGeneration && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="card p-2 sm:p-4 bg-gradient-to-r from-solar-primary to-solar-accent text-primary rounded-xl relative overflow-auto z-10 flex flex-col items-center"
                        >
                          <div className="text-xl sm:text-2xl font-bold m-2">{projectData.annualGeneration}</div>
                          <div className="text-primary/90 text-sm sm:text-base">Annual Electricity Generation</div>
                        </motion.div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {projectData.householdsPowered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="card card-interactivep-2 p-2 text-center hover:shadow-glow transition-all"
                          >
                            <div className="text-lg sm:text-xl font-bold text-solar-success mb-1">{projectData.householdsPowered}</div>
                            <div className="text-tertiary text-xs sm:text-sm">Households Powered</div>
                          </motion.div>
                        )}
                        {projectData.co2Reduction && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="card card-interactivep-2 sm:p-4 text-center hover:shadow-glow transition-all"
                          >
                            <div className="text-lg sm:text-xl font-bold text-solar-success mb-1">{projectData.co2Reduction}</div>
                            <div className="text-tertiary text-xs sm:text-sm">CO₂ Reduction</div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar - Hidden on mobile (shown in drawer), 1/3 width on desktop */}
            {!isMobile && (
              <div className="w-full lg:w-1/3 space-y-4">
                {/* Quick Facts */}
                <motion.div
                  variants={cardVariants}
                  className="card card-glass card-interactive p-4 relative overflow-auto"
                >
                  <h3 className="text-lg sm:text-xl font-extrabold text-primary text-center">Project at a Glance</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-1 border-b border-primary/20">
                      <span className="font-medium text-primary text-sm sm:text-base">Status</span>
                      <span className={`tag ${statusConfig.color} font-medium text-xs sm:text-sm`}>
                        {projectData.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-1 border-b border-primary/20">
                      <span className="font-medium text-primary text-sm sm:text-base">Capacity</span>
                      <span className="font-bold text-solar-accent text-base sm:text-lg">{projectData.capacity}</span>
                    </div>
                    {projectData.commissioningDate && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm sm:text-base">Commissioned</span>
                        <span className="text-tertiary text-sm sm:text-base">{projectData.commissioningDate}</span>
                      </div>
                    )}
                    {projectData.investment && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm sm:text-base">Investment</span>
                        <span className="text-tertiary text-sm sm:text-base">{projectData.investment}</span>
                      </div>
                    )}
                    {projectData.landArea && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm sm:text-base">Land Area</span>
                        <span className="text-tertiary text-sm sm:text-base">{projectData.landArea}</span>
                      </div>
                    )}
                    {projectData.developer && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm sm:text-base">Developer</span>
                        <span className="text-solar-accent font-medium text-sm sm:text-base">{projectData.developer}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="m-2 sm:m-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                      <h4 className="font-bold text-primary text-sm sm:text-base">Location</h4>
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-tertiary m-2 sm:m-4">
                      <div>{projectData.location}</div>
                      <div>Coordinates: {projectData.coordinates.lat}°N, {projectData.coordinates.lng}°E</div>
                    </div>
                    <div className="aspect-[4/3] sm:aspect-video card bg-secondary/50 border-primary/20 rounded-lg">
                      <iframe
                        loading="lazy"
                        src={projectData.map}
                        title={`${projectData.name} - Location Map`}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openMap}
                        className="btn btn-ghost w-full flex items-center gap-2 p-2 text-xs sm:text-sm z-10"
                      >
                        <Maximize className="h-3 w-3 sm:h-4 sm:w-4 text-solar-accent" />
                        <span className="text-solar-accent font-medium">Open in Fullscreen</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Environmental Impact */}
                <motion.div
                  variants={cardVariants}
                  className="card card-glass card-interactive p-2 sm:p-4 bg-solar-success/10 border-solar-success/20 relative overflow-auto"
                >
                  <h3 className="text-lg sm:text-xl font-extrabold text-primary m-2 sm:m-4 text-center">Environmental Impact</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {defaultEnvironmentalImpact.map((impact, index) => (
                      <motion.div
                        key={impact.metric}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-base sm:text-lg font-bold text-solar-success m-1">{impact.value}</div>
                        <div className="font-medium text-primary text-sm sm:text-base m-1">{impact.metric}</div>
                        <div className="text-xs sm:text-sm text-tertiary">{impact.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Project Timeline */}
                <motion.div
                  variants={cardVariants}
                  className="card card-glass card-interactive p-2 sm:p-4 relative overflow-auto"
                >
                  <h3 className="text-lg sm:text-xl font-extrabold text-primary m-2 sm:m-3 text-center">Project Timeline</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {defaultMilestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.date}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-3 sm:gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-solar-accent rounded-full flex-shrink-0" />
                          {index < defaultMilestones.length - 1 && (
                            <div className="w-0.5 h-full bg-primary/20 mt-1" />
                          )}
                        </div>
                        <div className="pb-3 sm:pb-4 flex-1">
                          <div className="font-bold text-primary text-sm sm:text-base m-1">{milestone.date}</div>
                          <div className="text-tertiary text-xs sm:text-sm">{milestone.event}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 sm:mt-8 md:mt-12"
          >
            <div className="card card-glass p-2 sm:p-4 text-center relative overflow-auto">
              <div className="absolute inset-0 gradient-energy opacity-20"></div>
              <div className="relative">
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary mb-3 sm:mb-4">Interested in Learning More?</h2>
                <p className="text-tertiary mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                  Contact our project team for detailed technical specifications, investment opportunities, 
                  or partnership inquiries about the {projectData.name}.
                </p>
                <div className="flex flex-row gap-2 sm:gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary p-2 sm:p-4 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download Project Brief
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary p-2 sm:p-4 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Project Team
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-overlay-bg lg:hidden z-10"
            />
            
            {/* Sidebar Content */}
            <motion.div
              variants={mobileSidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-full max-w-[100vw] bg-secondary border-l border-primary/20 overflow-y-auto custom-scrollbar z-10"
            >
              <div className="p-2">
                {/* Header */}
                <div className="flex items-center justify-between m-2">
                  <h3 className="text-lg font-bold text-primary">Project Details</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSidebar}
                    className="btn btn-ghost p-2"
                  >
                    <X className="h-5 w-5 text-tertiary" />
                  </motion.button>
                </div>

                {/* Quick Facts */}
                <div className="card card-glass p-2">
                  <h4 className="font-bold text-primary m-2 text-center">Quick Facts</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-1 border-b border-primary/20">
                      <span className="font-medium text-primary text-sm">Status</span>
                      <span className={`tag ${statusConfig.color} font-medium text-xs`}>
                        {projectData.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-1 border-b border-primary/20">
                      <span className="font-medium text-primary text-sm">Capacity</span>
                      <span className="font-bold text-solar-accent text-sm">{projectData.capacity}</span>
                    </div>
                    {projectData.commissioningDate && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm">Commissioned</span>
                        <span className="text-tertiary text-sm">{projectData.commissioningDate}</span>
                      </div>
                    )}
                    {projectData.investment && (
                      <div className="flex justify-between items-center p-1 border-b border-primary/20">
                        <span className="font-medium text-primary text-sm">Investment</span>
                        <span className="text-tertiary text-sm">{projectData.investment}</span>
                      </div>
                    )}
                  </div>
                </div>

                  {/* Location */}
                  <div className="m-2 sm:m-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                      <h4 className="font-bold text-primary text-sm sm:text-base">Location</h4>
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-tertiary m-2 sm:m-4">
                      <div>{projectData.location}</div>
                      <div>Coordinates: {projectData.coordinates.lat}°N, {projectData.coordinates.lng}°E</div>
                    </div>
                    <div className="w-auto h-auto card bg-secondary/50 border-primary/20 rounded-lg">
                      <iframe
                        loading="lazy"
                        src={projectData.map}
                        title={`${projectData.name} - Location Map`}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openMap}
                        className="btn btn-ghost w-full flex items-center gap-2 p-2 text-xs sm:text-sm z-10"
                      >
                        <Maximize className="h-3 w-3 sm:h-4 sm:w-4 text-solar-accent" />
                        <span className="text-solar-accent font-medium">Open in Fullscreen</span>
                      </motion.button>
                    </div>
                  </div>

                {/* Environmental Impact - Alternative Structure */}
                <div className="card bg-solar-success p-2 sm:p-4 relative overflow-auto group z-10">
                  <h3 className="font-bold text-primary mb-3 sm:mb-4 text-lg">Environmental Impact<hr/></h3>
                  <ul className="space-y-2 sm:space-y-3 text-tertiary text-sm sm:text-base">
                    {defaultEnvironmentalImpact.map((impact, index) => (
                      <motion.li
                        key={`impact-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="space-y-1"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-2 h-2 bg-solar-success rounded-full m-2 flex-shrink-0" />
                          <span className="font-semibold">{impact.value}</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3 ml-4">
                          <div className="w-1.5 h-1.5 bg-solar-success/70 rounded-full m-2 flex-shrink-0" />
                          <span>{impact.metric}</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3 ml-4">
                          <div className="w-1.5 h-1.5 bg-solar-success/70 rounded-full m-2 flex-shrink-0" />
                          <span className="text-xs opacity-80">{impact.description}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-success to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ 
                      x: "200%",
                      transition: shineTransition
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen modal for the map */}
      <AnimatePresence>
        {isMapOpen && (
          <MapModal
            isOpen={isMapOpen}
            onClose={closeMap}
            locationURL={projectData.map}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectVisualization