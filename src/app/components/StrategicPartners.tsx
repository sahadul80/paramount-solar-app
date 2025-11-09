'use client'

import { motion } from 'framer-motion'
import { Handshake, Users, Globe, ExternalLink } from 'lucide-react'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PartnerImage {
  src: string
  link: string
  name: string
}

const StrategicPartners = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const partnerTypes = [
    { icon: Users, title: "Government Partnerships", description: "Collaborating with government agencies for sustainable energy development" },
    { icon: Globe, title: "International Collaborations", description: "Working with global technology partners and financial institutions" },
    { icon: Handshake, title: "Industry Alliances", description: "Strategic partnerships with industry leaders and technology providers" }
  ]

  const partnerImages: PartnerImage[] = [
    { src: "/images/spl1.png", link: "/partners/siemens", name: "Siemens Energy" },
    { src: "/images/spl2.png", link: "/partners/jinko", name: "Jinko Solar" },
    { src: "/images/spl3.png", link: "/partners/first-solar", name: "First Solar" },
    { src: "/images/spl4.png", link: "/partners/schneider", name: "Schneider Electric" },
    { src: "/images/spl5.png", link: "/partners/abb", name: "ABB Group" },
    { src: "/images/spl7.png", link: "/partners/longi", name: "LONGi Solar" },
    { src: "/images/spl8.png", link: "/partners/sungrow", name: "Sungrow" },
    { src: "/images/spl9.png", link: "/partners/sma", name: "SMA Solar" },
    { src: "/images/spl10.png", link: "/partners/trina", name: "Trina Solar" }
  ]

  // Use 2 sets for smoother looping
  const duplicatedPartners = [...partnerImages, ...partnerImages]

  // Handle container hover
  const handleContainerHover = useCallback((hovering: boolean) => {
    setIsPaused(hovering)
  }, [])

  // Handle individual partner hover
  const handlePartnerHover = useCallback((partnerName: string) => {
    setHoveredImage(partnerName)
  }, [])

  const handlePartnerLeave = useCallback(() => {
    setHoveredImage(null)
  }, [])

  return (
    <section id="strategic-partners" className="bg-primary relative overflow-hidden p-2 sm;p-4 z-20">
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-2 sm:p-4"
        >
          <h2 className="sm:text-4xl lg:text-5xl font-extrabold text-primary p-2">
            OUR <span className="gradient-text-solar">STRATEGIC PARTNERS</span>
          </h2>
          <p className="text-tertiary max-w-2xl mx-auto p-2">
            Building strong relationships with key stakeholders to drive renewable energy adoption
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="m-2 sm:m-4">
          <div 
            className="relative overflow-show space-y-10"
            onMouseEnter={() => handleContainerHover(true)}
            onMouseLeave={() => handleContainerHover(false)}
          >
            {/* Tooltip */}
            {hoveredImage && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-secondary border border-primary/20 rounded-lg shadow-lg z-30 p-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-primary font-semibold whitespace-nowrap">{hoveredImage}</span>
                  <ExternalLink className="h-3 w-3 text-solar-accent flex-shrink-0" />
                </div>
                <div className="text-xs text-tertiary text-center">Click to visit partner</div>
              </div>
            )}

            {/* Pause Indicator */}
            {isPaused && (
              <div className="absolute -bottom-8 right-2 bg-solar-accent/10 text-solar-accent text-xs p-1 rounded-full border border-solar-accent/20 z-20">
                Paused
              </div>
            )}

            {/* Marquee */}
            <div className="relative overflow-hidden">
              <div 
                className={`flex gap-4 sm:gap-6 items-center py-10 ${
                  isPaused ? 'marquee-paused' : 'marquee-animate'
                }`}
              >
                {duplicatedPartners.map((partner, idx) => (
                  <div
                    key={`${partner.src}-${idx}`}
                    className="flex-shrink-0"
                    onMouseEnter={() => handlePartnerHover(partner.name)}
                    onMouseLeave={handlePartnerLeave}
                  >
                    <Link 
                      href={partner.link} 
                      className="block rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group hover:cursor-pointer"
                    >
                      <div
                        className="w-30 h-15 sm:w-50 sm:h-25 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-2xl rounded-lg p-2"
                        style={{ 
                          filter: 'grayscale(0)',
                          opacity: 1
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0)'
                        }}
                      >
                        <Image 
                          src={partner.src} 
                          alt={partner.name} 
                          width={window.innerWidth < 768 ? 60: 100}
                          height={window.innerWidth < 768 ?30 : 50}
                          className="object-contain transition-all duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partnerTypes.map((type, index) => (
            <motion.div 
              key={type.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 card border border-primary/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="bg-solar-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <type.icon className="h-5 w-5 text-solar-accent" />
              </div>
              <h3 className="text-base font-semibold text-primary mb-2">{type.title}</h3>
              <p className="text-tertiary text-sm">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partnership Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card p-6 border border-primary/10 bg-white/5 backdrop-blur-sm mb-12"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-6">Parent Company Strength</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="card bg-solar-primary/5 p-4 border border-solar-primary/20 rounded-lg">
                <h4 className="text-base font-bold text-primary mb-2">Paramount Textile PLC</h4>
                <p className="text-solar-accent font-semibold text-sm mb-2">Market Capitalization</p>
                <p className="text-lg font-bold text-solar-primary">BDT 8239.37 Million</p>
              </div>
              <div className="card bg-solar-success/5 p-4 border border-solar-success/20 rounded-lg">
                <h4 className="text-base font-bold text-primary mb-2">Proven Track Record</h4>
                <p className="text-solar-accent font-semibold text-sm mb-2">Successful Project Delivery</p>
                <p className="text-base font-bold text-solar-success">Multiple Large-scale Projects</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-primary mb-3">Interested in Partnership?</h3>
          <p className="text-tertiary mb-6 max-w-2xl mx-auto text-sm">
            Join us in our mission to create a carbon-neutral future through innovative solar energy solutions.
          </p>
          <Link href="#contact" className="btn btn-primary px-6 py-2 text-sm">
            Contact Our Partnership Team
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default StrategicPartners