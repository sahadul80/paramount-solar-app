'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Handshake, Users, Globe, ExternalLink } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RenewableEnergy } from './patterns/RenewableEnergy'

interface PartnerImage {
  src: string
  link: string
  name: string
}

const StrategicPartners = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  const partnerTypes = [
    { icon: Users, title: "Government Partnerships", description: "Collaborating with government agencies for sustainable energy development" },
    { icon: Globe, title: "International Collaborations", description: "Working with global technology partners and financial institutions" },
    { icon: Handshake, title: "Industry Alliances", description: "Strategic partnerships with industry leaders and technology providers" }
  ]

  const partnerImages: PartnerImage[] = [
    { src: "/images/sp1.png", link: "/partners/siemens", name: "Siemens Energy" },
    { src: "/images/sp2.png", link: "/partners/jinko", name: "Jinko Solar" },
    { src: "/images/sp3.png", link: "/partners/first-solar", name: "First Solar" },
    { src: "/images/sp4.png", link: "/partners/schneider", name: "Schneider Electric" },
    { src: "/images/sp5.png", link: "/partners/abb", name: "ABB Group" },
    { src: "/images/sp7.png", link: "/partners/longi", name: "LONGi Solar" },
    { src: "/images/sp8.png", link: "/partners/sungrow", name: "Sungrow" },
    { src: "/images/sp9.png", link: "/partners/sma", name: "SMA Solar" },
    { src: "/images/sp10.png", link: "/partners/trina", name: "Trina Solar" },
    { src: "/images/sp11.png", link: "/partners/huawei", name: "Huawei Solar" }
  ]

  // Duplicate for seamless loop - using 3 sets for smoother transition
  const duplicatedPartners = [...partnerImages, ...partnerImages, ...partnerImages]

  // Initialize animation
  useEffect(() => {
    const initializeAnimation = () => {
      if (marqueeRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const marqueeWidth = marqueeRef.current.scrollWidth // Since we have 3 sets
        
        controls.start({
          x: [0, -marqueeWidth-containerWidth],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60, // Slower duration for better visibility
              ease: "linear"
            }
          }
        })
      }
    }

    initializeAnimation()
    
    // Re-initialize on window resize
    window.addEventListener('resize', initializeAnimation)
    return () => window.removeEventListener('resize', initializeAnimation)
  }, [controls, partnerImages])

  // Handle hover events
  const handleMouseEnter = useCallback((partnerName: string) => {
    setHoveredImage(partnerName)
    setIsPaused(true)
    controls.stop()
  }, [controls])

  const handleMouseLeave = useCallback(() => {
    setHoveredImage(null)
    setIsPaused(false)
    
    // Restart animation with smooth transition
    if (marqueeRef.current) {
      const marqueeWidth = marqueeRef.current.scrollWidth / 3
      controls.start({
        x: [null, +marqueeWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear"
          }
        }
      })
    }
  }, [controls])

  // Handle individual partner hover
  const handlePartnerHover = useCallback((partnerName: string) => {
    handleMouseEnter(partnerName)
  }, [handleMouseEnter])

  return (
    <section id="partners" className="section-padding bg-secondary">
      <RenewableEnergy/>
      <div className="container-responsive">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Strategic Partners</h2>
          <div className="w-24 h-1 bg-solar-accent mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-tertiary max-w-2xl mx-auto">
            Building strong relationships with key stakeholders to drive renewable energy adoption
          </p>
        </motion.div>

        {/* Marquee Container */}
        <motion.div className="m-6" >
          <div 
            ref={containerRef}
            className="relative overflow-show p-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 -top-12 bottom-188 left-1/3 right-1/3 bg-secondary z-20"
                >
                  <div className="flex flex-row justify-center text-sm m-4 border border-primary/20 rounded-lg shadow-lg gap-2 p-2">
                    <span className="text-center text-primary font-semibold">{hoveredImage}</span>
                    <ExternalLink className="h-4 w-4 text-solar-accent" />
                    <div className="text-xs text-tertiary text-center">Click to visit partner</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pause Indicator */}
            <AnimatePresence>
              {isPaused && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -bottom-4 right-0 bg-solar-accent/10 backdrop-blur-2xl text-solar-accent text-xs px-2 py-1 rounded-full border border-solar-accent/20 z-20"
                >
                  Paused
                </motion.div>
              )}
            </AnimatePresence>

            {/* Marquee Content */}
            <motion.div
              ref={marqueeRef}
              className="flex gap-8 sm:gap-12 md:gap-16 items-center"
              animate={controls}
              style={{ x: 0 }}
            >
              {duplicatedPartners.map((partner, idx) => (
                <motion.div
                  key={`${partner.src}-${idx}`}
                  className="flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  onHoverStart={() => handlePartnerHover(partner.name)}
                  onHoverEnd={handleMouseLeave}
                >
                  <Link 
                    href={partner.link} 
                    className="block bg-secondary rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10 p-3 sm:p-4 group"
                  >
                    <div className="w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 flex items-center justify-center overflow-hidden rounded-lg">
                      <Image 
                        src={partner.src} 
                        alt={partner.name} 
                        width={112} 
                        height={56}
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {partnerTypes.map((type, index) => (
            <motion.div 
              key={type.title} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }} 
              className="text-center p-6 card card-glass hover-lift"
            >
              <div className="bg-solar-accent/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-center mx-auto mb-4">
                <type.icon className="h-8 w-8 sm:h-10 sm:w-10 text-solar-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{type.title}</h3>
              <p className="text-tertiary text-sm sm:text-base">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partnership Highlights */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }} 
          className="card card-glass p-6 sm:p-8"
        >
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6">Parent Company Strength</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="card bg-solar-primary/10 p-4 sm:p-6 border border-solar-primary/20 rounded-xl">
                  <h4 className="text-base sm:text-lg font-bold text-primary mb-2">Paramount Textile PLC</h4>
                  <p className="text-solar-accent font-semibold text-sm sm:text-base mb-2">Market Capitalization</p>
                  <p className="text-xl sm:text-2xl font-bold text-solar-primary">BDT 8239.37 Million</p>
                </div>
              </div>
              <div className="text-center">
                <div className="card bg-solar-success/10 p-4 sm:p-6 border border-solar-success/20 rounded-xl">
                  <h4 className="text-base sm:text-lg font-bold text-primary mb-2">Proven Track Record</h4>
                  <p className="text-solar-accent font-semibold text-sm sm:text-base mb-2">Successful Project Delivery</p>
                  <p className="text-lg sm:text-xl font-bold text-solar-success">Multiple Large-scale Projects</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }} 
          className="text-center mt-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Interested in Partnership?</h3>
          <p className="text-tertiary mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Join us in our mission to create a carbon-neutral future through innovative solar energy solutions.
          </p>
          <Link href="/contact" className="btn btn-primary px-6 py-3 text-sm sm:text-base">
            Contact Our Partnership Team
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default StrategicPartners