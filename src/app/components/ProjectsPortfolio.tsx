'use client'

import { motion } from 'framer-motion'
import { Factory, Construction, PanelBottomIcon } from 'lucide-react'

const ProjectsPortfolio = () => {
  const projects = [
    {
      name: "30MW SOLAR POWER PLANT",
      location: "Lalmonirhat",
      status: "Operational",
      icon: PanelBottomIcon,
      description: "Successfully commissioned solar power plant contributing to the national grid",
      capacity: "30MW",
      type: "Solar IPP",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "100MW SOLAR PARK",
      location: "Pabna",
      status: "Operational",
      icon: Factory,
      description: "Large-scale solar park with 20-year Power Purchase Agreement",
      capacity: "100MW",
      type: "Solar Park",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "10MW SOLAR POWER PLANT",
      location: "Moulvibazar",
      status: "Under Construction",
      icon: Construction,
      description: "New solar power plant nearing commissioning phase",
      capacity: "10MW",
      type: "Solar IPP",
      color: "from-orange-500 to-yellow-500"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">PROJECTS PORTFOLIO</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Project Header */}
              <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <project.icon className="h-8 w-8" />
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    project.status === 'Operational' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-blue-100 font-semibold">{project.location}</p>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-bold text-gray-800">{project.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-semibold text-green-600">{project.type}</span>
                  </div>
                </div>

                {/* Capacity Visual */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Capacity</span>
                    <span>{project.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${project.color}`}
                      style={{
                        width: project.capacity === '30MW' ? '30%' : 
                               project.capacity === '100MW' ? '100%' : '10%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Capacity Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Total Operational Portfolio</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2">130MW</p>
              <p className="text-green-100">Commissioned Solar Capacity</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">10MW</p>
              <p className="text-green-100">Under Construction</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">145K+</p>
              <p className="text-green-100">Tons CO₂ Offset Annually</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsPortfolio