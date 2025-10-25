'use client'

import { motion } from 'framer-motion'
import { Factory, Construction, PanelBottomIcon, Zap, Leaf, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SolarInstallation } from './patterns/SolarInstallation'

const ProjectsPortfolio = () => {
  const router = useRouter()
  const projects = [
    {
      name: "30MW SOLAR POWER PLANT",
      location: "Lalmonirhat",
      status: "Operational",
      icon: PanelBottomIcon,
      description: "Successfully commissioned solar power plant contributing to the national grid with state-of-the-art technology",
      capacity: "30MW",
      type: "Solar IPP",
      color: "from-solar-success to-solar-success/80",
      progress: 100,
      co2Offset: "35,000+ tons annually",
      timeline: "Completed 2022",
      slug: "lalmonirhat-project"
    },
    {
      name: "100MW SOLAR PARK",
      location: "Pabna",
      status: "Operational",
      icon: Factory,
      description: "Large-scale solar park with 20-year Power Purchase Agreement, featuring advanced monitoring systems",
      capacity: "100MW",
      type: "Solar Park",
      color: "from-solar-accent to-solar-accent/80",
      progress: 100,
      co2Offset: "120,000+ tons annually",
      timeline: "Completed 2024",
      slug: "pabna-project"
    },
    {
      name: "10MW SOLAR POWER PLANT",
      location: "Moulvibazar",
      status: "Under Construction",
      icon: Construction,
      description: "New solar power plant nearing commissioning phase with innovative panel technology",
      capacity: "10MW",
      type: "Solar IPP",
      color: "from-solar-warning to-solar-warning/80",
      progress: 85,
      co2Offset: "12,000+ tons annually",
      timeline: "Completion 2025",
      slug: "bibiana-project"
    }
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Operational': return 'success'
      case 'Under Construction': return 'warning'
      case 'Pipeline': return 'primary'
      default: return 'secondary'
    }
  }

  const handleProjectClick = (slug: string) => {
    router.push(`/pages/projects/${slug}`)
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
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const
      }
    }
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: {
        duration: 1.2,
        delay: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  }

  return (
    <section id="projects" className="section-padding bg-secondary">
      <SolarInstallation/>
      <div className="container-responsive flex flex-col items-between justify-between">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            PROJECTS <span className="text-solar-accent">PORTFOLIO</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-20 h-1 bg-solar-accent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-base text-tertiary max-w-2xl mx-auto px-4"
          >
            Discover our growing portfolio of solar power projects driving Bangladesh&apos;s renewable energy transition
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              whileHover="hover"
              className="card card-interactive overflow-hidden group border border-primary/10"
            >
              {/* Project Header with Gradient */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-primary relative overflow-hidden`}>
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
                </motion.div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <project.icon className="h-8 w-8" />
                  </motion.div>
                  <span className={`tag tag-${getStatusVariant(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 leading-tight">{project.name}</h3>
                <div className="flex items-center gap-2 text-primary/90">
                  <Zap className="h-4 w-4" />
                  <span className="font-semibold">{project.location}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <p className="text-tertiary mb-4 leading-relaxed">{project.description}</p>
                
                {/* Project Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary">Capacity:</span>
                    <span className="font-bold text-primary">{project.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary">Type:</span>
                    <span className="font-semibold text-solar-accent">{project.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary">CO₂ Offset:</span>
                    <span className="font-semibold text-solar-success flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      {project.co2Offset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary">Timeline:</span>
                    <span className="text-sm font-medium text-primary">{project.timeline}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-tertiary mb-2">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-tertiary/20 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      custom={project.progress}
                      initial="hidden"
                      whileInView="visible"
                      className={`h-2 rounded-full bg-gradient-to-r ${project.color}`}
                    />
                  </div>
                </div>

                {/* View Details CTA */}
                <motion.button 
                  onClick={() => handleProjectClick(project.slug)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 btn btn-secondary text-sm py-2 inline-flex items-center justify-center z-40"
                >
                  View Project Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Total Capacity Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-solar-primary to-solar-secondary rounded-2xl p-6 sm:p-8 text-primary overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:30px_30px]" />
          </div>

          <div className="text-center mb-6 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Total Operational Portfolio</h3>
            <p className="text-primary/80 text-sm">Powering Bangladesh&apos;s sustainable future</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10"
          >
            <motion.div
              variants={cardVariants}
              className="bg-solar-success/20 rounded-xl p-4 text-center card-interactive border border-solar-success/30"
            >
              <div className="flex justify-center mb-2">
                <Zap className="h-6 w-6 text-solar-success" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-solar-success mb-1">130MW</p>
              <p className="text-solar-success/80 text-sm">Commissioned Solar Capacity</p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-solar-warning/20 rounded-xl p-4 text-center card-interactive border border-solar-warning/30"
            >
              <div className="flex justify-center mb-2">
                <Construction className="h-6 w-6 text-solar-warning" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-solar-warning mb-1">10MW</p>
              <p className="text-solar-warning/80 text-sm">Under Construction</p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-solar-accent/20 rounded-xl p-4 text-center card-interactive border border-solar-accent/30"
            >
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-solar-accent" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-solar-accent mb-1">295MW</p>
              <p className="text-solar-accent/80 text-sm">Pipeline Projects</p>
            </motion.div>
          </motion.div>

          {/* Environmental Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="mt-6 pt-6 border-t border-primary/30 text-center relative z-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-solar-success" />
              <span className="text-solar-success font-semibold">Environmental Impact</span>
            </div>
            <p className="text-primary/80 text-sm">
              Total CO₂ Offset: <span className="font-bold text-solar-success">167,000+ tons annually</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <p className="text-tertiary mb-4">Interested in our solar projects?</p>

          <Link href="#national-footprint">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary px-8 py-3"
            >
              Explore All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsPortfolio