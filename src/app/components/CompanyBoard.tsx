'use client'

import { motion } from 'framer-motion'
import { Award, Globe, Building, User } from 'lucide-react'

const CompanyBoard = () => {
  return (
    <section id="board" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">COMPANY BOARD</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Mr. Shadab Hossain</h3>
            <p className="text-green-600 font-semibold text-lg">MANAGING DIRECTOR</p>
            <p className="text-gray-600">PARAMOUNT SOLAR LTD.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 text-green-500 mr-2" />
                Education & Background
              </h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Bachelor of Science in International Economics from Suffolk University, Boston, USA</li>
                <li>• IB Diploma from the International Baccalaureate</li>
                <li>• Dynamic leadership and entrepreneurial spirit</li>
                <li>• Extensive experience across diverse industries</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Globe className="h-5 w-5 text-green-500 mr-2" />
                Expertise & Focus
              </h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Passionate about brand building and technology integration</li>
                <li>• Environmentally friendly and sustainable business practices</li>
                <li>• Active public spokesman on contemporary issues</li>
                <li>• Prominent young business personality</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Building className="h-5 w-5 text-green-500 mr-2" />
              Industry Experience
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Textile', 'Energy', 'Insurance', 'Ventures', 'Brand Building', 'Garments', 'Housing', 'Technology', 'Agro-based Industries'].map((industry) => (
                <span
                  key={industry}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompanyBoard