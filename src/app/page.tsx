'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import ParamountLoader from './components/Loader'

const StatsCTA = dynamic(() => import('./components/StatsCTA'), { ssr: false })
const About = dynamic(() => import('./components/About'), { ssr: false })
const History = dynamic(() => import('./components/History'), { ssr: false })
const CompanyBoard = dynamic(() => import('./components/CompanyBoard'), { ssr: false })
const BusinessVerticals = dynamic(() => import('./components/BusinessVerticals'), { ssr: false })
const NationalFootprint = dynamic(() => import('./components/NationalFootprint'), { ssr: false })
const ProjectsPortfolio = dynamic(() => import('./components/ProjectsPortfolio'), { ssr: false })
const StrategicPartners = dynamic(() => import('./components/StrategicPartners'), { ssr: false })
const Contact = dynamic(() => import('./components/Contact'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a timeout to hide the loader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    // Clean up the timer
    return () => clearTimeout(timer)
  }, [])

  // Show loader while loading
  if (isLoading) {
    return <ParamountLoader />
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 to-green-50">
      {/* Fixed header */}
      <Header />

      {/* Hero / Banner */}
      <Banner />

      {/* Smooth fade-in transition for all sections */}
      <motion.div
        className="mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <StatsCTA />
        <About />
        <History />
        <CompanyBoard />
        <BusinessVerticals />
        <NationalFootprint />
        <ProjectsPortfolio />
        <StrategicPartners />
      </motion.div>
      <Contact />
      {/* Footer */}
      <Footer />
    </main>
  )
}