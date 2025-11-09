'use client'

import { motion } from 'framer-motion'
import { Factory, Construction, PanelBottomIcon, Zap, Leaf, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useCallback } from 'react'

// Use the same ProjectData interface from ProjectVisualization
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

const ProjectsPortfolio = () => {
  const router = useRouter()
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({})

  // Updated projects data using ProjectData structure
  const projects: ProjectData[] = [
    {
      name: "30MW SOLAR POWER PLANT",
      location: "Lalmonirhat",
      status: "Operational",
      capacity: "30MW",
      type: "Solar IPP",
      coordinates: { lat: 25.9974, lng: 89.1524 },
      slug: "lalmonirhat-project",
      commissioningDate: "2022",
      co2Reduction: "35,000+ tons annually",
      developer: "Paramount Solar",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.123456789012!2d89.1524!3d25.9974",
      images: [
        { src: "/images/lmh.png", alt: "Lalmonirhat Solar Plant Overview" },
        { src: "/images/lmh1.png", alt: "Lalmonirhat Construction Phase" },
        { src: "/images/lmh2.png", alt: "Lalmonirhat Solar Panels" },
        { src: "/images/lmh3.png", alt: "Lalmonirhat Project Site" }
      ]
    },
    {
      name: "100MW SOLAR PARK",
      location: "Pabna",
      status: "Operational",
      capacity: "100MW",
      type: "Solar Park",
      coordinates: { lat: 23.9637, lng: 89.1584 },
      slug: "pabna-project",
      commissioningDate: "2024",
      co2Reduction: "120,000+ tons annually",
      developer: "Paramount Solar",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.123456789013!2d89.1584!3d23.9637",
      images: [
        { src: "/images/pabna.png", alt: "Pabna Solar Park Aerial View" },
        { src: "/images/pabna1.png", alt: "Pabna Construction Progress" },
        { src: "/images/pabna2.png", alt: "Pabna Installation Work" },
        { src: "/images/pabna3.png", alt: "Pabna Grid Connection" },
        { src: "/images/pabna4.png", alt: "Pabna Completed Project" }
      ]
    },
    {
      name: "10MW SOLAR POWER PLANT",
      location: "Moulvibazar",
      status: "Under Construction",
      capacity: "10MW",
      type: "Solar IPP",
      coordinates: { lat: 24.4937, lng: 91.6333 },
      slug: "bibiana-project",
      commissioningDate: "2025 (Expected)",
      co2Reduction: "12,000+ tons annually",
      developer: "Paramount Solar",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.123456789014!2d91.6333!3d24.4937",
      images: [
        { src: "/images/mun.png", alt: "Moulvibazar Site Preparation" },
        { src: "/images/mun1.png", alt: "Moulvibazar Foundation Work" },
        { src: "/images/mun2.png", alt: "Moulvibazar Construction Phase" },
        { src: "/images/mun3.png", alt: "Moulvibazar Infrastructure" },
        { src: "/images/mun4.png", alt: "Moulvibazar Progress Update" },
        { src: "/images/mun7.png", alt: "Moulvibazar Equipment Installation" },
        { src: "/images/mun9.png", alt: "Moulvibazar Project Overview" }
      ]
    }
  ]

  const handleProjectClick = (slug: string) => {
    router.push(`/pages/projects/${slug}`)
  }

  // Image carousel functions for each project
  const nextImage = useCallback((slug: string) => {
    const project = projects.find(p => p.slug === slug)
    if (!project?.images) return
    
    setCurrentImageIndices(prev => ({
      ...prev,
      [slug]: ((prev[slug] || 0) + 1) % project.images!.length
    }))
  }, [projects])

  const prevImage = useCallback((slug: string) => {
    const project = projects.find(p => p.slug === slug)
    if (!project?.images) return
    
    setCurrentImageIndices(prev => ({
      ...prev,
      [slug]: ((prev[slug] || 0) - 1 + project.images!.length) % project.images!.length
    }))
  }, [projects])

  const goToImage = useCallback((slug: string, index: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [slug]: index
    }))
  }, [])

  const getStatusColor = (status: ProjectData['status']) => {
    switch (status) {
      case 'Operational': 
        return { 
          color: 'tag-success',
          bgColor: 'bg-solar-success/10',
          gradient: 'from-solar-success to-solar-primary'
        }
      case 'Under Construction': 
        return { 
          color: 'tag-warning',
          bgColor: 'bg-solar-warning/10',
          gradient: 'from-solar-warning to-solar-accent'
        }
      case 'Pipeline': 
        return { 
          color: 'tag-primary',
          bgColor: 'bg-solar-primary/10',
          gradient: 'from-solar-primary to-solar-secondary'
        }
      case 'Planning':
      default: 
        return { 
          color: 'tag-secondary',
          bgColor: 'bg-solar-secondary/10',
          gradient: 'from-solar-secondary to-solar-tertiary'
        }
    }
  }

  const getProgress = (status: ProjectData['status']) => {
    switch (status) {
      case 'Operational': return 100
      case 'Under Construction': return 85
      case 'Pipeline': return 30
      case 'Planning': return 10
      default: return 0
    }
  }

  const getTimeline = (status: ProjectData['status'], commissioningDate?: string) => {
    if (commissioningDate) return commissioningDate
    switch (status) {
      case 'Operational': return "Completed"
      case 'Under Construction': return "Completion 2025"
      case 'Pipeline': return "Planning Phase"
      case 'Planning': return "Feasibility Study"
      default: return "In Development"
    }
  }

  return (
    <section id="projects" className="p-2 sm:p-4 bg-primary relative overflow-hidden z-20">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center m-2 sm:m-4 flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary p-2 sm:p-4">
            PROJECTS <span className="text-solar-accent">PORTFOLIO</span>
          </h2>
          <p className="text-tertiary max-w-2xl">
            Discover our growing portfolio of solar power projects driving Bangladesh&apos;s renewable energy transition
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
          {projects.map((project, index) => {
            const statusConfig = getStatusConfig(project.status)
            const currentImageIndex = currentImageIndices[project.slug] || 0
            const projectImages = project.images || []
            const progress = getProgress(project.status)
            const timeline = getTimeline(project.status, project.commissioningDate)

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card backdrop-blur-sm overflow-hidden"
                id={project.slug}
              >
                <div className="rounded-lg w-auto gap-2 sm:gap-4">
                  {/* Image Carousel */}
                  {projectImages.length > 0 && (
                    <div className="relative aspect-[16/9] bg-tertiary/20 overflow-hidden rounded-lg">
                      {projectImages.map((image, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: imgIndex === currentImageIndex ? 1 : 0,
                            scale: imgIndex === currentImageIndex ? 1 : 1.1
                          }}
                          transition={{ duration: 0.5 }}
                          className={`absolute inset-0 ${imgIndex === currentImageIndex ? 'block' : 'hidden'}`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt || `${project.name} - Image ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={imgIndex === 0}
                          />
                        </motion.div>
                      ))}

                      {/* Navigation Arrows */}
                      {projectImages.length > 1 && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => prevImage(project.slug)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-solar-primary/80 hover:bg-solar-primary text-primary p-2 rounded-full transition-all duration-200 shadow-lg z-10"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => nextImage(project.slug)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-solar-primary/80 hover:bg-solar-primary text-primary p-2 rounded-full transition-all duration-200 shadow-lg z-10"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.button>
                        </>
                      )}

                      {/* Image Counter */}
                      {projectImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                          {currentImageIndex + 1} / {projectImages.length}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thumbnail Strip */}
                  {projectImages.length > 1 && (
                    <div className="flex gap-1 p-2 overflow-x-auto custom-scrollbar">
                      {projectImages.map((image, imgIndex) => (
                        <motion.button
                          key={imgIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => goToImage(project.slug, imgIndex)}
                          className={`flex-shrink-0 relative aspect-[2/1] w-12 rounded overflow-auto border-2 transition-all duration-200 ${
                            imgIndex === currentImageIndex 
                              ? 'border-solar-accent ring-1 ring-solar-accent/20' 
                              : 'border-primary/20 hover:border-solar-primary'
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt || `Thumbnail ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="mx-auto p-2 sm:p-4">
                  {/* Project Header with Gradient */}
                  <div className={`bg-gradient-to-r ${statusConfig.gradient} p-2 sm:p-4 text-primary`}>
                    <div className="flex items-center justify-between">
                      <PanelBottomIcon className="h-6 w-6" />
                      <h3 className="text-lg font-bold mb-2 leading-tight">{project.name}</h3>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-primary/90">
                          <Zap className="h-3 w-3" />
                          <span className="font-semibold text-sm">{project.location}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === 'Operational' ? 'bg-solar-success/20 text-solar-success' : 
                          project.status === 'Under Construction' ? 'bg-solar-warning/20 text-solar-warning' : 
                          'bg-solar-primary/20 text-solar-primary'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-tertiary mb-4 text-sm leading-relaxed">
                    {project.name} located in {project.location}. {project.status === 'Operational' ? 
                    'Successfully commissioned and contributing to the national grid.' : 
                    project.status === 'Under Construction' ? 
                    'Currently under construction with advanced solar technology.' :
                    'In development phase for future renewable energy generation.'}
                  </p>
                  
                  {/* Project Stats */}
                  <div className="space-y-2 m-2 sm:m-4">
                    <div className="flex justify-between items-center">
                      <span className="text-tertiary text-sm">Capacity:</span>
                      <span className="font-bold text-primary text-sm">{project.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tertiary text-sm">Type:</span>
                      <span className="font-semibold text-solar-accent text-sm">{project.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tertiary text-sm">CO₂ Offset:</span>
                      <span className="font-semibold text-solar-success flex items-center gap-1 text-sm">
                        <Leaf className="h-3 w-3" />
                        {project.co2Reduction || "Significant reduction"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tertiary text-sm">Timeline:</span>
                      <span className="text-sm font-medium text-primary">{timeline}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-tertiary m-2 sm:m-4">
                      <span>Project Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-tertiary/20 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={`h-1.5 rounded-full bg-gradient-to-r ${statusConfig.gradient}`}
                      />
                    </div>
                  </div>

                  {/* View Details CTA */}
                  <button 
                    onClick={() => handleProjectClick(project.slug)} 
                    className="w-full mt-4 btn btn-secondary text-sm py-2"
                  >
                    View Project Details
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Total Capacity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-solar-primary/10 to-solar-secondary/10 rounded-xl p-2 sm:p-4 text-primary border border-primary/10 mb-8 backdrop-blur-sm"
        >
          <div className="text-center m-2 sm:m-4">
            <h3 className="text-xl font-bold mb-2">Total Operational Portfolio</h3>
            <p className="text-primary/80 text-sm">Powering Bangladesh&apos;s sustainable future</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-solar-success/10 rounded-lg p-4 text-center border border-solar-success/20">
              <div className="flex justify-center mb-2">
                <Zap className="h-5 w-5 text-solar-success" />
              </div>
              <p className="text-xl font-bold text-solar-success mb-1">130MW</p>
              <p className="text-solar-success/80 text-xs">Commissioned Solar Capacity</p>
            </div>

            <div className="bg-solar-warning/10 rounded-lg p-4 text-center border border-solar-warning/20">
              <div className="flex justify-center mb-2">
                <Construction className="h-5 w-5 text-solar-warning" />
              </div>
              <p className="text-xl font-bold text-solar-warning mb-1">10MW</p>
              <p className="text-solar-warning/80 text-xs">Under Construction</p>
            </div>

            <div className="bg-solar-accent/10 rounded-lg p-4 text-center border border-solar-accent/20">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-solar-accent" />
              </div>
              <p className="text-xl font-bold text-solar-accent mb-1">295MW</p>
              <p className="text-solar-accent/80 text-xs">Pipeline Projects</p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="mt-6 pt-4 border-t border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-solar-success" />
              <span className="text-solar-success font-semibold text-sm">Environmental Impact</span>
            </div>
            <p className="text-primary/80 text-sm">
              Total CO₂ Offset: <span className="font-bold text-solar-success">167,000+ tons annually</span>
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-tertiary mb-4">Interested in our solar projects?</p>
          <Link href="#national-footprint">
            <button className="btn btn-primary px-6 py-2">
              Explore All Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Helper function for status config
function getStatusConfig(status: ProjectData['status']) {
  switch (status) {
    case 'Operational': 
      return { 
        color: 'tag-success',
        bgColor: 'bg-solar-success/10',
        gradient: 'from-solar-success to-solar-primary'
      }
    case 'Under Construction': 
      return { 
        color: 'tag-warning',
        bgColor: 'bg-solar-warning/10',
        gradient: 'from-solar-warning to-solar-accent'
      }
    case 'Pipeline': 
      return { 
        color: 'tag-primary',
        bgColor: 'bg-solar-primary/10',
        gradient: 'from-solar-primary to-solar-secondary'
      }
    case 'Planning':
    default: 
      return { 
        color: 'tag-secondary',
        bgColor: 'bg-solar-secondary/10',
        gradient: 'from-solar-secondary to-solar-tertiary'
      }
  }
}

export default ProjectsPortfolio