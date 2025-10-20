'use client'

import { motion } from 'framer-motion'
import { Handshake, Users, Globe } from 'lucide-react'

const StrategicPartners = () => {
  const partnerTypes = [
    {
      icon: Users,
      title: "Government Partnerships",
      description: "Collaborating with government agencies for sustainable energy development"
    },
    {
      icon: Globe,
      title: "International Collaborations",
      description: "Working with global technology partners and financial institutions"
    },
    {
      icon: Handshake,
      title: "Industry Alliances",
      description: "Strategic partnerships with industry leaders and technology providers"
    }
  ]

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">OUR STRATEGIC PARTNERS</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Building strong relationships with key stakeholders to drive renewable energy adoption
          </p>
        </motion.div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <type.icon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partnership Highlights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Parent Company Strength</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Paramount Textile PLC</h4>
                  <p className="text-green-600 font-semibold">Market Capitalization</p>
                  <p className="text-2xl font-bold text-gray-800">BDT 8239.37 Million</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Proven Track Record</h4>
                  <p className="text-green-600 font-semibold">Successful Project Delivery</p>
                  <p className="text-xl font-bold text-gray-800">Multiple Large-scale Projects</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Interested in Partnership?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in our mission to create a carbon-neutral future through innovative solar energy solutions.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Contact Our Partnership Team
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default StrategicPartners