'use client' // ✅ Required for window, Framer Motion, and DOM events

import { motion } from 'framer-motion'
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react'
import { useCallback } from 'react'

const Footer = () => {
  // ✅ useCallback for better performance
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // ✅ Animation variants (modern Framer Motion style)
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-2"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-2 rounded-full mr-3">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">PARAMOUNT SOLAR LTD.</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              A pioneering renewable energy company dedicated to harnessing the power of the sun to generate 
              clean, reliable, and affordable electricity. Working for a carbon-neutral future.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Projects', 'Business Verticals', 'Our Team', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                'Solar IPP Development',
                'Solar EPC Services',
                'Rooftop Solar Solutions',
                'Project Financing',
                'Maintenance & Support',
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative">
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Paramount Solar Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
