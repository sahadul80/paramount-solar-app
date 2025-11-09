'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Leaf, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

// Type definitions
type NavItemType = 'route' | 'section' | 'both';

interface NavItemBase {
  name: string;
  href: string;
  type: NavItemType;
}

interface NavItemWithDropdown extends NavItemBase {
  dropdown: NavItemBase[];
}

type NavItem = NavItemBase | NavItemWithDropdown;

// Type guards
function hasDropdown(item: NavItem): item is NavItemWithDropdown {
  return 'dropdown' in item && Array.isArray(item.dropdown);
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const [windowWidth, setWindowWidth] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Track window width for responsive image sizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // Fixed: Properly typed navItems with 'both' type for items that work as both route and section
  const navItems: NavItem[] = useMemo(() => [
    {
      name: 'HOME',
      href: '/',
      type: 'route'
    },
    {
      name: 'ABOUT',
      href: '/pages/about',
      type: 'route'
    },
    {
      name: 'HISTORY',
      href: '/pages/history',
      type: 'route'
    },
    {
      name: 'NATIONAL FOOTPRINT',
      href: '/pages/national-footprint',
      type: 'both'
    },
    {
      name: 'BUSINESS',
      href: '/pages/business',
      type: 'both', // Works as both route and section
      dropdown: [
        { name: 'IPP PROJECTS', href: '/#ipp-projects', type: 'section' },
        { name: 'SOLAR EPC', href: '/#solar-epc', type: 'section' },
        { name: 'SOLAR ROOFTOP', href: '/#solar-rooftop', type: 'section' },
        { name: 'PARTNERS', href: '/#strategic-partners', type: 'section' }
      ]
    },
    {
      name: 'PROJECTS',
      href: '/pages/projects-portfolio',
      type: 'both', // Works as both route and section
      dropdown: [
        { name: 'INTRACO SOLAR POWER LTD', href: '/#lalmonirhat-project', type: 'section' },
        { name: 'DYNAMIC SUN ENERGY POWER LTD', href: '/#pabna-project', type: 'section' },
        { name: 'MOULVIBAZAR SOLAR POWER LTD', href: '/#bibiana-project', type: 'section' }
      ]
    },
    {
      name: 'CONTACT US',
      href: '/pages/contact',
      type: 'both' // Works as both route and section
    }
  ], [])

  // Handle scroll effects and section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Only update active section if we're on the home page
      if (pathname === '/') {
        const sections = navItems.flatMap(item => {
          const baseItem = { href: item.href, type: item.type };
          if (hasDropdown(item)) {
            return [baseItem, ...item.dropdown.map(d => ({ href: d.href, type: d.type }))];
          }
          return [baseItem];
        }).filter(item => item.href && item.href.startsWith('/#'));

        const currentSection = sections.find(section => {
          const element = document.querySelector(section.href.replace('/', ''));
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, pathname])

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

  // Handle navigation based on type (route, section, or both)
  const handleNavClick = (href: string, type: NavItemType) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)

    if (type === 'route') {
      // Regular page navigation
      router.push(href)
    } else if (type === 'section') {
      // Section scrolling - only works on home page
      if (pathname !== '/') {
        // If not on home page, navigate to home page first with hash
        router.push(`/${href}`)
      } else {
        // Scroll to section on current page
        const element = document.querySelector(href.replace('/', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (type === 'both') {
      // Handle items that work as both route and section
      if (href.startsWith('/#')) {
        // This is a section link
        if (pathname !== '/') {
          router.push(`/${href}`)
        } else {
          const element = document.querySelector(href.replace('/', ''))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
      } else {
        // This is a route link
        if (pathname === href) {
          // If we're already on the page, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          router.push(href)
        }
      }
    }
  }

  // Fixed mobile dropdown toggle - doesn't close the entire menu
  const toggleMobileDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  // Desktop dropdown handlers
  const handleDesktopDropdownEnter = (itemName: string) => {
    setActiveDropdown(itemName)
  }

  const handleDesktopDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const isActive = (href: string, type: NavItemType) => {
    if (type === 'route') {
      return pathname === href
    } else if (type === 'section') {
      return activeSection === href && pathname === '/'
    } else if (type === 'both') {
      // For 'both' type, check if we're on the route OR if it's the active section on home page
      if (pathname === href) return true
      if (pathname === '/' && activeSection === href) return true
      return false
    }
    return false
  }

  // Check if a nav item has active children (for dropdown highlighting)
  const hasActiveChild = (item: NavItem): boolean => {
    if (!hasDropdown(item)) return false;
    return item.dropdown.some(child => isActive(child.href, child.type));
  }

  // Check if we're on the home page
  const isHomePage = pathname === '/'

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary shadow-xl' 
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
          <Link href="/" className="flex-center hover-lift">
            <div className="flex flex-row m-2">
              <Image
                src="/p1.png"
                alt="logo"
                width={windowWidth < 768 ? 4 : 6}
                height={0}
                className="object-contain"
              />
              <Image
                src="/p2.png"
                alt="logo"
                width={windowWidth < 768 ? 4 : 6}
                height={0}
                className="object-contain"
              />
              <Image
                src="/p3.png"
                alt="logo"
                width={windowWidth < 768 ? 4 : 6}
                height={0}
                className="object-contain"
              />
              <Image
                src="/p4.png"
                alt="logo"
                width={windowWidth < 768 ? 4 : 6}
                height={0}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">
                PARAMOUNT <span className="text-solar-accent">SOLAR</span>
              </h1>
              <p className="text-solar-accent font-semibold text-xs hidden sm:flex items-center">
                <Leaf className="h-3 w-3 mr-1" />
                CARBON NEUTRAL FUTURE
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {hasDropdown(item) ? (
                  /* Dropdown Items with Enhanced Hover */
                  <div
                    className="relative"
                    onMouseEnter={() => handleDesktopDropdownEnter(item.name)}
                    onMouseLeave={handleDesktopDropdownLeave}
                  >
                    <button
                      className={`flex items-center rounded-lg font-semibold text-sm transition-all duration-300 hover-lift hover:cursor-pointer group relative overflow-hidden ${
                        isActive(item.href, item.type) || hasActiveChild(item)
                          ? 'text-solar-accent bg-solar-accent/10 shadow-inner'
                          : 'text-secondary hover:text-solar-accent'
                      }`}
                      onClick={() => handleNavClick(item.href, item.type)}
                    >
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-solar-accent/0 via-solar-accent/5 to-solar-accent/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                      
                      <span className="relative flex items-center gap-1">
                        {item.name}
                        {(isActive(item.href, item.type) || hasActiveChild(item)) && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                        )}
                      </span>
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 relative ${
                        activeDropdown === item.name ? 'rotate-180 text-solar-accent' : 'text-secondary group-hover:text-solar-accent'
                      }`} />
                    </button>

                    {/* Dropdown Menu with Enhanced Animation */}
                      {activeDropdown === item.name && (
                        <motion.div
                          className="absolute top-full left-0 w-80 bg-primary rounded-xl shadow-2xl border border-tertiary z-50"
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {item.dropdown.map((subItem, index) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleNavClick(subItem.href, subItem.type)}
                              className={`block w-full text-left p-2 text-sm font-medium transition-all duration-300 hover:cursor-pointer group relative overflow-hidden ${
                                isActive(subItem.href, subItem.type)
                                  ? 'text-solar-accent bg-solar-accent/20'
                                  : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                              }`}
                            > 
                              <span className="relative">
                                {subItem.name}
                                {isActive(subItem.href, subItem.type) && (
                                  <span className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-solar-accent rounded-full"></span>
                                )}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                  </div>
                ) : (
                  /* Regular Items with Enhanced Hover */
                  <button
                    onClick={() => handleNavClick(item.href, item.type)}
                    className={`p-4 rounded-lg font-semibold text-sm transition-all duration-300 hover-lift hover:cursor-pointer group relative overflow-hidden ${
                      isActive(item.href, item.type)
                        ? 'text-solar-accent bg-solar-accent/10 shadow-inner'
                        : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                    }`}
                  >
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-solar-accent/0 via-solar-accent/5 to-solar-accent/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    
                    <span className="relative">
                      {item.name}
                      {isActive(item.href, item.type) && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                      )}
                    </span>
                  </button>
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-primary rounded-2xl shadow-2xl overflow-hidden mt-2"
            >
              <div className="p-2 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {hasDropdown(item) ? (
                      /* Mobile Dropdown Items - Fixed Toggle */
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className={`flex-between w-full p-4 text-left font-semibold transition-all duration-300 hover-lift group relative overflow-hidden ${
                            isActive(item.href, item.type) || hasActiveChild(item)
                              ? 'text-solar-accent bg-solar-accent/10'
                              : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                          }`}
                        >
                          {/* Mobile hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-solar-accent/0 via-solar-accent/5 to-solar-accent/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                          
                          <span className="relative">
                            {item.name}
                            {(isActive(item.href, item.type) || hasActiveChild(item)) && (
                              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                            )}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 relative ${
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
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="bg-tertiary/30 overflow-hidden"
                            >
                              {item.dropdown.map((subItem, index) => (
                                <motion.button
                                  key={subItem.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                  onClick={() => handleNavClick(subItem.href, subItem.type)}
                                  className={`block w-full text-left p-4 pl-8 text-sm font-medium transition-all duration-300 hover-lift group relative overflow-hidden ${
                                    isActive(subItem.href, subItem.type)
                                      ? 'text-solar-accent bg-solar-accent/20'
                                      : 'text-secondary hover:text-solar-accent hover:bg-tertiary/50'
                                  }`}
                                >
                                  {/* Mobile submenu hover effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-solar-accent/0 via-solar-accent/5 to-solar-accent/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                  
                                  <span className="relative">
                                    {subItem.name}
                                    {isActive(subItem.href, subItem.type) && (
                                      <span className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-solar-accent rounded-full"></span>
                                    )}
                                  </span>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Mobile Regular Items */
                      <button
                        onClick={() => handleNavClick(item.href, item.type)}
                        className={`block w-full text-left p-4 font-semibold transition-all duration-300 hover-lift group relative overflow-hidden ${
                          isActive(item.href, item.type)
                            ? 'text-solar-accent bg-solar-accent/10'
                            : 'text-secondary hover:text-solar-accent hover:bg-tertiary'
                        }`}
                      >
                        {/* Mobile hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-solar-accent/0 via-solar-accent/5 to-solar-accent/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        
                        <span className="relative">
                          {item.name}
                          {isActive(item.href, item.type) && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-solar-accent rounded-full"></span>
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Contact CTA */}
              <div className="border-t border-tertiary p-4 bg-secondary">
                <button
                  onClick={() => handleNavClick('/pages/contact', 'both')}
                  className="block w-full btn-accent text-center font-bold py-3 px-4 rounded-lg hover-glow transition-all duration-300"
                >
                  GET IN TOUCH
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}