'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUp, Zap, Leaf, Users, Building2, FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from 'lucide-react'
import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const quickLinks = [
    { name: 'About Us', href: '#about', icon: Building2 },
    { name: 'Projects', href: '#projects', icon: Zap },
    { name: 'Business Verticals', href: '#business', icon: Leaf },
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
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Sitemap', href: '#sitemap' }
  ]

  const stats = [
    { value: '130MW+', label: 'Solar Capacity' },
    { value: '7+', label: 'Years Experience' },
    { value: '145K+', label: 'Tons CO₂ Reduced' },
    { value: '3+', label: 'Major Projects' }
  ]

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: TwitterIcon, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: InstagramIcon, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' }
  ]

  return (
    <footer className="bg-primary text-text-primary relative overflow-show border-t border-border-primary z-20">
      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[var(--solar-primary)] to-[var(--solar-secondary)] py-8"
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
                <div className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
                <div className="text-[var(--text-secondary)] text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <div className="flex flex-row p-3 rounded-xl mr-4">
                <Image src="/p1.png" alt="logo" width={8} height={32}/>
                <Image src="/p2.png" alt="logo" width={8} height={32}/>
                <Image src="/p3.png" alt="logo" width={8} height={32}/>
                <Image src="/p4.png" alt="logo" width={8} height={32}/>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">PARAMOUNT SOLAR LTD.</h3>
                <p className="text-[var(--solar-accent)] text-sm">Powering a Sustainable Future</p>
              </div>
            </div>
            
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              A pioneering renewable energy company dedicated to harnessing the power of the sun to generate 
              clean, reliable, and affordable electricity. Working for a carbon-neutral future in Bangladesh and beyond.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-[var(--text-secondary)] hover:text-[var(--solar-primary)] transition-colors">
                <a href="mailto:info@paramountsolar.com" className="flex flex-row">
                  <Mail className="h-5 w-5 mr-3 text-[var(--text-tertiary)]" />
                  <span>info@paramountsolar.com</span>
                </a>
              </div>
              <div className="flex items-center text-[var(--text-secondary)] hover:text-[var(--solar-primary)] transition-colors">
                <a href="tel:+880 1722 191757" className="flex flex-row">
                  <Phone className="h-5 w-5 mr-3 text-[var(--text-tertiary)]" />
                  <span>+880 1722 191757</span>
                </a>
              </div>
              <div className="flex items-center text-[var(--text-secondary)] hover:text-[var(--solar-primary)] transition-colors">
                <MapPin className="h-5 w-5 mr-3 text-[var(--text-tertiary)]" />
                <span>House#22, Road#113/A, Gulshan-2, Dhaka-1212, Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-[var(--bg-tertiary)] ${social.color} p-3 rounded-lg transition-all duration-300 border border-[var(--border-primary)]`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-[var(--text-primary)]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Services */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-2 h-2 bg-[var(--solar-accent)] rounded-full mr-3"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--solar-primary)] transition-colors flex items-center group"
                    >
                      <link.icon className="h-4 w-4 mr-3 text-[var(--text-tertiary)]" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-2 h-2 bg-[var(--solar-secondary)] rounded-full mr-3"></div>
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link 
                      href="#services" 
                      className="text-[var(--text-secondary)] hover:text-[var(--solar-primary)] transition-colors flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-[var(--solar-success)] rounded-full mr-3" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[var(--border-primary)] relative">
        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[var(--solar-primary)] to-[var(--solar-accent)] text-[var(--text-primary)] p-3 rounded-full shadow-lg border border-[var(--border-primary)]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-[var(--text-primary)] font-semibold text-sm mb-2">
                © {new Date().getFullYear()} Paramount Solar Ltd. All rights reserved.
              </p>
              <p className="text-[var(--solar-warning)] italic text-xs">
                Pioneering renewable energy solutions for a sustainable Bangladesh
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[var(--text-secondary)] font-semibold hover:text-[var(--solar-accent)] text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-[var(--solar-primary)] via-[var(--solar-accent)] to-[var(--solar-secondary)]"></div>
    </footer>
  )
}

export default Footer