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

  return (
    <section id="projects" className="py-16 bg-primary relative overflow-hidden z-20">
      <SolarInstallation/>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
            PROJECTS <span className="text-solar-accent">PORTFOLIO</span>
          </h2>
          <p className="text-tertiary max-w-2xl mx-auto">
            Discover our growing portfolio of solar power projects driving Bangladesh&apos;s renewable energy transition
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card border border-primary/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              id={project.slug}
            >
              {/* Project Header with Gradient */}
              <div className={`bg-gradient-to-r ${project.color} p-4 text-primary`}>
                <div className="flex items-center justify-between mb-3">
                  <project.icon className="h-6 w-6" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Operational' ? 'bg-solar-success/20 text-solar-success' : 
                    project.status === 'Under Construction' ? 'bg-solar-warning/20 text-solar-warning' : 
                    'bg-solar-primary/20 text-solar-primary'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 leading-tight">{project.name}</h3>
                <div className="flex items-center gap-2 text-primary/90">
                  <Zap className="h-3 w-3" />
                  <span className="font-semibold text-sm">{project.location}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4">
                <p className="text-tertiary mb-4 text-sm leading-relaxed">{project.description}</p>
                
                {/* Project Stats */}
                <div className="space-y-2 mb-4">
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
                      {project.co2Offset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary text-sm">Timeline:</span>
                    <span className="text-sm font-medium text-primary">{project.timeline}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-tertiary mb-2">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-tertiary/20 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`h-1.5 rounded-full bg-gradient-to-r ${project.color}`}
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
          ))}
        </div>

        {/* Total Capacity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-solar-primary/10 to-solar-secondary/10 rounded-xl p-6 text-primary border border-primary/10 mb-8 backdrop-blur-sm"
        >
          <div className="text-center mb-6">
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

export default ProjectsPortfolio