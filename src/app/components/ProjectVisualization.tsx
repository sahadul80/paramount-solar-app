'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Zap, Users, TrendingUp, Shield, Leaf, Clock, AlertCircle, Construction } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Types for our project data
export interface ProjectData {
  name: string
  type: string
  status: 'Operational' | 'Under Construction' | 'Pipeline' | 'Planning'
  capacity: string
  location: string
  coordinates: { lat: number; lng: number }
  slug: string
  // Additional enhanced fields
  commissioningDate?: string
  investment?: string
  developer?: string
  annualGeneration?: string
  co2Reduction?: string
  householdsPowered?: string
  landArea?: string
  // Technical specifications
  technicalSpecs?: {
    panels?: string
    inverters?: string
    tracking?: string
    transmission?: string
    monitoring?: string
    maintenance?: string
  }
  // Timeline
  milestones?: Array<{ date: string; event: string }>
  // Environmental impact
  environmentalImpact?: Array<{ metric: string; value: string; description: string }>
  // Key features
  keyFeatures?: Array<{ icon: string; title: string; description: string }>
}

interface ProjectVisualizationProps {
  projectData: ProjectData
}

const ProjectVisualization = ({ projectData }: ProjectVisualizationProps) => {
  const router = useRouter()

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

  // Status configurations
  const statusConfig = {
    Operational: { color: 'bg-green-100 text-green-800', icon: Zap },
    'Under Construction': { color: 'bg-blue-100 text-blue-800', icon: Construction },
    Pipeline: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    Planning: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  }

  // Capacity-based configurations
  const getCapacityConfig = (capacity: string) => {
    const mw = parseInt(capacity)
    if (mw >= 100) return { gradient: 'from-orange-600 to-red-700', size: 'large' }
    if (mw >= 50) return { gradient: 'from-blue-600 to-purple-700', size: 'medium' }
    return { gradient: 'from-green-600 to-emerald-700', size: 'small' }
  }

  const capacityConfig = getCapacityConfig(projectData.capacity)
  const StatusIcon = statusConfig[projectData.status].icon

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
    <div className="max-h-[100vh] max-w-[100vw] bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to National Footprint</span>
            </button>
            <div className="flex items-center gap-3">
              <StatusIcon className="h-5 w-5" />
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[projectData.status].color}`}>
                {projectData.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-16 bg-gradient-to-r ${capacityConfig.gradient} text-white`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{projectData.name}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">{projectData.type}</p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">{projectData.capacity}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <MapPin className="h-5 w-5" />
                <span>{projectData.location}</span>
              </div>
              {projectData.commissioningDate && (
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5" />
                  <span>Since {projectData.commissioningDate}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="text-xl leading-relaxed mb-6">
                  The {projectData.name} is a {projectData.capacity.toLowerCase()} {projectData.type.toLowerCase()} 
                  located in {projectData.location}. This project represents a significant step forward in 
                  Bangladesh's renewable energy infrastructure.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-green-800 mb-3">Project Significance</h3>
                    <ul className="space-y-2 text-green-700">
                      <li>• Contributing to national renewable energy targets</li>
                      <li>• Reducing dependency on fossil fuels</li>
                      <li>• Creating local employment opportunities</li>
                      <li>• Supporting sustainable development goals</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-3">Community Impact</h3>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Local job creation during construction and operation</li>
                      <li>• Skills development and technical training</li>
                      <li>• Improved regional energy security</li>
                      <li>• Environmental benefits for local communities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features & Technology</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {defaultKeyFeatures.map((feature, index) => {
                  const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap] || Zap
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                          <FeatureIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>

            {/* Technical Specifications */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">System Components</h3>
                  <div className="space-y-4">
                    {Object.entries(defaultTechnicalSpecs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-green-600 text-right max-w-xs">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    {projectData.annualGeneration && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl">
                        <div className="text-3xl font-bold mb-2">{projectData.annualGeneration}</div>
                        <div className="text-green-100">Annual Electricity Generation</div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {projectData.householdsPowered && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{projectData.householdsPowered}</div>
                          <div className="text-blue-700 text-sm">Households Powered</div>
                        </div>
                      )}
                      {projectData.co2Reduction && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">{projectData.co2Reduction}</div>
                          <div className="text-green-700 text-sm">CO₂ Reduction</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Project at a Glance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${statusConfig[projectData.status].color.split(' ')[1]}`}>
                    {projectData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold text-green-600">{projectData.capacity}</span>
                </div>
                {projectData.commissioningDate && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Commissioned</span>
                    <span className="font-semibold">{projectData.commissioningDate}</span>
                  </div>
                )}
                {projectData.investment && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-semibold">{projectData.investment}</span>
                  </div>
                )}
                {projectData.landArea && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Land Area</span>
                    <span className="font-semibold">{projectData.landArea}</span>
                  </div>
                )}
                {projectData.developer && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Developer</span>
                    <span className="font-semibold text-right">{projectData.developer}</span>
                  </div>
                )}
              </div>

              {/* Location Map Mini */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Location
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>{projectData.location}</div>
                  <div>Coordinates: {projectData.coordinates.lat}°N, {projectData.coordinates.lng}°E</div>
                </div>
                <div className="mt-3 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded border border-green-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-6 w-6 mx-auto mb-1 text-green-500" />
                    <span className="text-xs">{projectData.name} Location</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Environmental Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Environmental Impact</h3>
              <div className="space-y-4">
                {defaultEnvironmentalImpact.map((impact, index) => (
                  <div key={impact.metric} className="bg-white/20 p-4 rounded-lg">
                    <div className="text-lg font-semibold">{impact.value}</div>
                    <div className="text-emerald-100 font-medium">{impact.metric}</div>
                    <div className="text-emerald-200 text-sm mt-1">{impact.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Timeline</h3>
              <div className="space-y-4">
                {defaultMilestones.map((milestone, index) => (
                  <div key={milestone.date} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      {index < defaultMilestones.length - 1 && (
                        <div className="w-0.5 h-12 bg-green-200 mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="font-semibold text-green-600">{milestone.date}</div>
                      <div className="text-gray-600 text-sm">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Project Visualization</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl border-2 border-dashed border-green-200 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">
                    {item === 1 ? '📊' : item === 2 ? '🗺️' : '🌞'}
                  </div>
                  <div className="text-sm">
                    {item === 1 ? 'Performance Data' : item === 2 ? 'Location Map' : 'Solar Array'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Interested in Learning More?</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Contact our project team for detailed technical specifications, investment opportunities, 
            or partnership inquiries about the {projectData.name}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Download Project Brief
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Project Team
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ProjectVisualization