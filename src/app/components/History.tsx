'use client'

import { motion } from 'framer-motion'
import { Calendar, Zap } from 'lucide-react'

const History = () => {
  const milestones = [
    {
      year: "1987",
      title: "Paramount Power Business Inception",
      description: "Beginning of the power business journey"
    },
    {
      year: "2017",
      title: "Paramount Solar Ltd Established",
      description: "Founded as a dedicated solar energy company"
    },
    {
      year: "2018",
      title: "200MW HSD Power Plant",
      description: "Developed 200MW HSD Power Plant in Sirajgang"
    },
    {
      year: "2020",
      title: "30MW Solar Plant Commissioned",
      description: "Successfully commissioned 30MW solar plant in Lalmonirhat"
    },
    {
      year: "2022",
      title: "100MW Solar Park Operational",
      description: "100MW solar park in Pabna became operational"
    },
    {
      year: "2024",
      title: "10MW Plant Nearing Completion",
      description: "10MW solar plant in Moulvibazar under construction"
    }
  ]

  return (
    <section id="history" className="m-4 bg-gray-50">
      <div className="container mx-auto px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">HISTORY OF PARAMOUNT POWER BUSINESS</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-300 h-full"></div>
          
                <div className="space-y-12">
                {milestones.map((milestone, index) => (
                    <motion.div
                        key={milestone.year}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    >
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-green-600 font-bold">{milestone.year}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                            <p className="text-gray-600">{milestone.description}</p>
                        </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg">
                        <Zap className="h-6 w-6 text-white" />
                    </div>

                    {/* Year indicator */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                    <div className="text-2xl font-bold text-gray-300">{milestone.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default History