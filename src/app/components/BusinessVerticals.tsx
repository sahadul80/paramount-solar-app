'use client'

import { motion } from 'framer-motion'
import { Building, Settings, Home, TrendingUp, Target, Calendar, Image } from 'lucide-react'

const BusinessVerticals = () => {
  const verticals = [
    {
      id: "ipp-projects",
      icon: Building,
      title: "DEVELOPMENT OF IPP PROJECTS",
      description: "One of the lead contributors to the country's electricity supply enhancement mission",
      image: "🏭",
      imageDescription: "Large-scale solar power plant installation",
      projects: [
        "200MW HSD Power Plant, Baghabari, Sirajganj",
        "30MW Solar Power Plant, Votmari, Kaliganj, Lalmonirhat",
        "100MW Solar Park, Hemayetpur, Pabna",
        "10MW Solar Power Plant at Moulvibazar (Under Construction)"
      ],
      methods: [
        "IPP Project Development through MPPP",
        "Unsolicited IPP Project Development through PPA & IA",
        "IPP Project Development through Open Tender Method"
      ]
    },
    {
      id: "solar-epc",
      icon: Settings,
      title: "SOLAR EPC",
      description: "Leading and successful Solar EPC (Engineering, Procurement, and Construction) company",
      image: "🔧",
      imageDescription: "Solar EPC engineering and construction",
      features: [
        "Comprehensive end-to-end solar power solutions",
        "Deep expertise in engineering",
        "Efficient procurement of high-quality components",
        "Meticulous construction management",
        "Integrated approach minimizing client risks"
      ]
    },
    {
      id: "solar-rooftop",
      icon: Home,
      title: "SOLAR ROOFTOP",
      description: "Aiming for market leadership position with innovative business models",
      image: "🏠",
      imageDescription: "Rooftop solar installation",
      businessModels: [
        {
          type: "CAPEX-BASED SOLUTION",
          desc: "End to End Turnkey EPC service under fixed price fixed time execution"
        },
        {
          type: "OPEX-BASED SOLUTION",
          desc: "Zero investment model with long term Power Purchase Agreement"
        },
        {
          type: "CAPEX-FINANCING SOLUTION",
          desc: "Financing solution for customers with minimal investment"
        }
      ],
      plans: [
        {
          year: "VISION 2025",
          capacity: "30MW",
          target: "Universities and Industrial Segment"
        },
        {
          year: "PLAN 2026",
          capacity: "50MW",
          target: "Universities and Industrial Segment"
        }
      ]
    }
  ]

  return (
    <section id="business" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">BUSINESS VERTICALS</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        <div className="space-y-8">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              id={vertical.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
                <div className="flex items-center">
                  <vertical.icon className="h-6 w-6 mr-3" />
                  <h3 className="text-xl font-bold">{vertical.title}</h3>
                </div>
                <p className="mt-1 text-green-100 text-sm">{vertical.description}</p>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Picture Section */}
                <div className="w-full lg:w-2/5 p-4">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-4">
                      {vertical.image}
                    </div>
                    <div className="flex items-center text-green-600">
                      <Image className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{vertical.imageDescription}</span>
                    </div>
                    <div className="mt-4 bg-white rounded-lg p-3 shadow-sm w-full">
                      <h4 className="font-bold text-gray-800 text-sm mb-2">Quick Facts</h4>
                      <div className="space-y-1 text-xs text-gray-600">
                        {vertical.id === "ipp-projects" && (
                          <>
                            <div>• 130MW Total Capacity</div>
                            <div>• 3 Major Projects</div>
                            <div>• 20+ Year PPAs</div>
                          </>
                        )}
                        {vertical.id === "solar-epc" && (
                          <>
                            <div>• End-to-End Solutions</div>
                            <div>• Quality Components</div>
                            <div>• Risk Management</div>
                          </>
                        )}
                        {vertical.id === "solar-rooftop" && (
                          <>
                            <div>• Multiple Business Models</div>
                            <div>• 30MW Target by 2025</div>
                            <div>• Zero Investment Options</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-3/5 p-4 space-y-4">
                  {/* IPP Projects */}
                  {vertical.projects && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                        <Target className="h-4 w-4 text-green-500 mr-2" />
                        Commissioned Projects
                      </h4>
                      <ul className="space-y-1">
                        {vertical.projects.map((project, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Development Methods */}
                  {vertical.methods && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Development Methods</h4>
                      <div className="flex flex-wrap gap-1">
                        {vertical.methods.map((method, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EPC Features */}
                  {vertical.features && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {vertical.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Models for Rooftop */}
                  {vertical.businessModels && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Business Models</h4>
                      <div className="grid md:grid-cols-3 gap-2">
                        {vertical.businessModels.map((model, idx) => (
                          <div key={idx} className="bg-green-50 p-3 rounded-lg">
                            <h5 className="font-bold text-green-700 text-sm mb-1">{model.type}</h5>
                            <p className="text-gray-600 text-xs">{model.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rooftop Plans */}
                  {vertical.plans && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                        Capacity Expansion Plans
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {vertical.plans.map((plan, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-bold text-gray-800 text-sm">{plan.year}</h5>
                              <Calendar className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="text-xl font-bold text-green-600 mb-1">{plan.capacity} Capacity</p>
                            <p className="text-gray-600 text-xs">{plan.target}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessVerticals