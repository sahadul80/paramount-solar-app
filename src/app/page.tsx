'use client'

import { motion } from 'framer-motion'
import Header from './components/Header'
import Banner from './components/Banner'
import StatsCTA from './components/StatsCTA'
import About from './components/About'
import History from './components/History'
import CompanyBoard from './components/CompanyBoard'
import BusinessVerticals from './components/BusinessVerticals'
import NationalFootprint from './components/NationalFootprint'
import ProjectsPortfolio from './components/ProjectsPortfolio'
import StrategicPartners from './components/StrategicPartners'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="max-h-screen max-w-screen overflow-auto bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      <Banner />
      <StatsCTA />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <About />
        <History />
        <CompanyBoard />
        <BusinessVerticals />
        <NationalFootprint />
        <ProjectsPortfolio />
        <StrategicPartners />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  )
}