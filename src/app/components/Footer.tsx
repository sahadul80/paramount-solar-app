'use client'

import { motion, Variants } from 'framer-motion'
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Zap, Leaf, Users, Building2 } from 'lucide-react'
import { useCallback } from 'react'
import Link from 'next/link'
import { SolarPanelGrid } from './patterns/SolarPanelGrid'
import { SunRays } from './patterns/SunRays'
import { SolarFarm } from './patterns/SolarFarm'
import { Photovoltaic } from './patterns/Photovoltaic'
import { GreenEnergy } from './patterns/GreenEnergy'
import { CleanEnergy } from './patterns/CleanEnergy'
import { EnergyFlow } from './patterns/EnergyFlow'

const Footer = () => {
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // cubic-bezier equivalent for "easeOut"
      } 
    },
  }

  const quickLinks = [
    { name: 'About Us', href: '#about', icon: Building2 },
    { name: 'Projects', href: '#projects', icon: Zap },
    { name: 'Business Verticals', href: '#verticals', icon: Leaf },
    { name: 'Our Team', href: '#team', icon: Users },
    { name: 'Careers', href: '#careers', icon: Users }
  ]

  const services = [
    'Solar IPP Development',
    'Solar EPC Services',
    'Rooftop Solar Solutions',
    'Project Financing',
    'Maintenance & Support',
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' }
  ]

  const stats = [
    { value: '130MW+', label: 'Solar Capacity' },
    { value: '7+', label: 'Years Experience' },
    { value: '145K+', label: 'Tons CO₂ Reduced' },
    { value: '3+', label: 'Major Projects' }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-primary relative overflow-hidden">
      <SolarPanelGrid/>
      <SunRays/>
      <SolarFarm/>
      <Photovoltaic/>
      <GreenEnergy/>
      <CleanEnergy/>
      <EnergyFlow/>
      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-emerald-600 to-sky-600 py-8 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-emerald-100 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="container mx-auto p-4 sm:p-6 relative">
        <div className="text-center grid lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="col-span-1 lg:col-span-2 flex flex-col items-center"
          >
            <div className="flex items-center jsutify-center m-4">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-3 rounded-xl mr-4">
                <Sun className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">PARAMOUNT SOLAR LTD.</h3>
                <p className="text-emerald-200 text-sm">Powering a Sustainable Future</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              A pioneering renewable energy company dedicated to harnessing the power of the sun to generate 
              clean, reliable, and affordable electricity. Working for a carbon-neutral future in Bangladesh and beyond.
            </p>

            <h4 className="text-xl font-bold text-primary m-2 sm:m-4 flex items-center">Contact Information</h4>
            {/* Contact Info */}
            <div className="m-4">
              <div className="flex items-center text-slate-300 hover:text-primary transition-colors group">
                <Mail className="h-5 w-5 mr-3 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                <span className="font-medium">info@paramountsolar.com</span>
              </div>
              <div className="flex items-center text-slate-300 hover:text-primary transition-colors group">
                <Phone className="h-5 w-5 mr-3 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                <span className="font-medium">+880 XXXX-XXXXXX</span>
              </div>
              <div className="flex items-center text-slate-300 hover:text-primary transition-colors group">
                <MapPin className="h-5 w-5 mr-3 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                <span className="font-medium">Corporate Office, Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-slate-700 ${social.color} p-2 rounded-xl transition-all duration-300 group`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-2 flex flex-cols-2 items-center jsutify-center mx-auto gap-4"
          >{/* Quick Links */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-xl font-bold text-primary mb-6 flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-primary transition-all duration-300 flex items-center group"
                    >
                      <link.icon className="h-4 w-4 mr-3 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                      <span className="font-medium group-hover:underline">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mr-3"></div>
                  Our Services
                </h4>
                <ul className="space-y-4">
                  {services.map((service) => (
                    <motion.li
                      key={service}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href="#services" 
                        className="text-slate-300 hover:text-primary transition-all duration-300 flex items-center group"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:bg-amber-400 transition-colors" />
                        <span className="font-medium group-hover:underline">{service}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700 relative">
        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-amber-500 text-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm mb-2">
                © {new Date().getFullYear()} Paramount Solar Ltd. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs">
                Pioneering renewable energy solutions for a sustainable Bangladesh
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-emerald-300 text-sm transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-sky-400"></div>
    </footer>
  )
}

export default Footer