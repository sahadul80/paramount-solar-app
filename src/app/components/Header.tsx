'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Sun, Leaf, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fixed: Wrap navItems in useMemo to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    {
      name: 'HOME',
      href: '#home'
    },
    {
      name: 'ABOUT',
      href: '#about',
      dropdown: [
        { name: 'COMPANY', href: '#company' },
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
        { name: 'INTRACO SOLAR POWER LTD', href: '#lalmonirhat-project' },
        { name: 'DYNAMIC SUN ENERGY POWER LTD', href: '#pabna-project' },
        { name: 'MOULVIBAZAR SOLAR POWER LTD', href: '#bibiana-project' }
      ]
    },
    {
      name: 'CONTACT US',
      href: '#contact'
    }
  ], [])

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
  }, [navItems]) // Now this dependency is stable due to useMemo

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
    <header>
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary shadow-xl p-2' 
          : 'glass-effect'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      ref={dropdownRef}
    >
      <div className="container-responsive">
        <div className="flex-between">
          {/* Logo */}
          <div className="flex-center space-x-3">
            <div className="bg-solar-accent p-2 rounded-full shadow-lg hover-lift">
              <Sun className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <Link href="/" className="hover-lift">
              <h1 className="text-lg md:text-xl font-extrabold text-primary tracking-tight">
                PARAMOUNT <span className="text-solar-accent">SOLAR</span>
              </h1>
              <p className="text-solar-accent font-semibold text-xs hidden sm:flex items-center">
                <Leaf className="h-3 w-3 mr-1" />
                CARBON NEUTRAL FUTURE
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 hover:text-solar-accent hover:bg-tertiary">
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
                      className={`flex items-center p-4 rounded-lg font-semibold text-sm transition-all duration-300 hover-lift ${
                        isActive(item.href) || item.dropdown?.some(d => isActive(d.href))
                          ? 'text-solar-accent bg-solar-accent/10 shadow-inner'
                          : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                      }`}
                    >
                      <span className="relative">
                        {item.name}
                        {(isActive(item.href) || item.dropdown?.some(d => isActive(d.href))) && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                        )}
                      </span>
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 group-hover:text-solar-accent ${
                        activeDropdown === item.name ? 'rotate-180 text-solar-accent' : 'text-secondary'
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          className="absolute top-full left-0 w-64 bg-primary rounded-xl shadow-2xl border border-tertiary py-2"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavClick(subItem.href)
                              }}
                              className={`block p-4 text-sm font-medium transition-all duration-300 hover-lift group relative ${
                                isActive(subItem.href)
                                  ? 'text-solar-accent bg-solar-accent/20'
                                  : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                              }`}
                            >
                              <span className="relative">
                                {subItem.name}
                                {isActive(subItem.href) && (
                                  <span className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-solar-accent rounded-full"></span>
                                )}
                              </span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular Items */
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`p-4 rounded-lg font-semibold text-sm transition-all duration-300 hover-lift group relative ${
                      isActive(item.href)
                        ? 'text-solar-accent bg-solar-accent/10 shadow-inner'
                        : 'text-secondary'
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      {isActive(item.href) && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                      )}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-secondary hover:bg-tertiary transition-all duration-300 hover-lift"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="lg:hidden bg-primary mt-4 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      /* Mobile Dropdown Items */
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex-between w-full px-6 py-4 text-left font-semibold transition-all duration-300 hover-lift group ${
                            isActive(item.href) || item.dropdown?.some(d => isActive(d.href))
                              ? 'text-solar-accent bg-solar-accent/10'
                              : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                          }`}
                        >
                          <span className="relative">
                            {item.name}
                            {(isActive(item.href) || item.dropdown?.some(d => isActive(d.href))) && (
                              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                            )}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 group-hover:text-solar-accent ${
                            activeDropdown === item.name ? 'rotate-180 text-solar-accent' : 'text-secondary'
                          }`} />
                        </button>

                        {/* Mobile Dropdown Content */}
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="bg-tertiary/30"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleNavClick(subItem.href)
                                  }}
                                  className={`block px-10 py-3 text-sm font-medium transition-all duration-300 hover-lift group relative ${
                                    isActive(subItem.href)
                                      ? 'text-solar-accent bg-solar-accent/10'
                                      : 'text-secondary hover:text-solar-accent hover:bg-tertiary/50'
                                  }`}
                                >
                                  <span className="relative">
                                    {subItem.name}
                                    {isActive(subItem.href) && (
                                      <span className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-solar-accent rounded-full"></span>
                                    )}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Mobile Regular Items */
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        className={`block px-6 py-4 font-semibold transition-all duration-300 hover-lift group relative ${
                          isActive(item.href)
                            ? 'text-solar-accent bg-solar-accent/10'
                            : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                        }`}
                      >
                        <span className="relative">
                          {item.name}
                          {isActive(item.href) && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                          )}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Contact CTA */}
              <div className="border-t border-tertiary p-4 bg-secondary">
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="block w-full btn-accent text-center font-bold py-3 px-4 rounded-lg hover-glow"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
    </header>
  )
}