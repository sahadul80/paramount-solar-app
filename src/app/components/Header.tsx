'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Sun, Leaf, Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Navigation structure
  const navItems = [
    {
      name: 'ABOUT',
      href: '#about',
      dropdown: [
        { name: 'COMPANY', href: '#company' },
        { name: 'PROFILE', href: '#profile' },
        { name: 'WHO WE ARE', href: '#who-we-are' },
        { name: 'COMPANY BACKGROUND', href: '#company-background' },
        { name: 'OUR GOAL', href: '#our-goal' },
        { name: 'VISION', href: '#vision' }
      ]
    },
    {
      name: 'HISTORY',
      href: '#history'
    },
    {
      name: 'BUSINESS',
      href: '#business',
      dropdown: [
        { name: 'IPP PROJECTS', href: '#ipp-projects' },
        { name: 'SOLAR EPC', href: '#solar-epc' },
        { name: 'SOLAR ROOFTOP', href: '#solar-rooftop' },
        { name: 'PARTNERS', href: '#strategic-partners' }
      ]
    },
    {
      name: 'NATIONAL FOOTPRINT',
      href: '#national-footprint'
    },
    {
      name: 'PROJECTS',
      href: '#projects',
      dropdown: [
        { name: 'SOLAR POWER PLANT LALMONIRHAT', href: '#lalmonirhat' },
        { name: 'PABNA SOLAR PARK', href: '#pabna' },
        { name: 'MOULVIBAZAR SOLAR POWER PLANT', href: '#moulvibazar' }
      ]
    },
    {
      name: 'CONTACT US',
      href: '#contact'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.flatMap(item => 
        item.dropdown 
          ? [{ href: item.href }, ...item.dropdown.map(d => ({ href: d.href }))]
          : [{ href: item.href }]
      ).filter(item => item.href);

      const currentSection = sections.find(section => {
        const element = document.querySelector(section.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.href);
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const isActive = (href: string) => activeSection === href

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm py-3 border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      ref={dropdownRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Shortened for mobile */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-full shadow-lg">
              <Sun className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <Link href="/">
              <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight">
                PARAMOUNT <span className="text-green-600">SOLAR</span>
              </h1>
              <p className="text-green-600 font-semibold text-xs hidden sm:flex items-center">
                <Leaf className="h-3 w-3 mr-1" />
                CARBON NEUTRAL FUTURE
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  /* Dropdown Items */
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        isActive(item.href) || item.dropdown?.some(d => isActive(d.href))
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 backdrop-blur-md"
                        >
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavClick(subItem.href)
                              }}
                              className={`block px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${
                                isActive(subItem.href)
                                  ? 'text-green-600 bg-green-50 border-green-500'
                                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50 border-transparent hover:border-green-300'
                              }`}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular Items */
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md mt-4 rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      /* Mobile Dropdown Items */
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex items-center justify-between w-full px-4 py-3 text-left font-semibold transition-all duration-200 ${
                            isActive(item.href) || item.dropdown?.some(d => isActive(d.href))
                              ? 'text-green-600 bg-green-50'
                              : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {item.name}
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Mobile Dropdown Content */}
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gray-50/80"
                            >
                              {item.dropdown.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleNavClick(subItem.href)
                                  }}
                                  className={`block px-8 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${
                                    isActive(subItem.href)
                                      ? 'text-green-600 bg-green-100 border-green-500'
                                      : 'text-gray-600 hover:text-green-600 hover:bg-green-100 border-transparent'
                                  }`}
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Mobile Regular Items */
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        className={`block px-4 py-3 font-semibold transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Contact CTA */}
              <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-green-50 to-blue-50">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  GET IN TOUCH
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}