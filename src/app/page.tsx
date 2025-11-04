'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, Suspense } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import ParamountLoader from './components/Loader'
import SolarNews from './components/SolarNews'

// Create a simple loading component for individual sections
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse flex space-x-4 w-full">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-gray-200 rounded col-span-2"></div>
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

// Individual component imports with proper loading states
const StatsCTA = dynamic(() => import('./components/StatsCTA'), {
  loading: () => <SectionLoader />
})

const BusinessVerticals = dynamic(() => import('./components/BusinessVerticals'), {
  loading: () => <SectionLoader />
})

const NationalFootprint = dynamic(() => import('./components/NationalFootprint'), {
  loading: () => <SectionLoader />
})

const ProjectsPortfolio = dynamic(() => import('./components/ProjectsPortfolio'), {
  loading: () => <SectionLoader />
})

const StrategicPartners = dynamic(() => import('./components/StrategicPartners'), {
  loading: () => <SectionLoader />
})

const Contact = dynamic(() => import('./components/Contact'), {
  loading: () => <SectionLoader />
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ParamountLoader />
  }

  return (
    <main className="min-h-screen w-full">
      <Header />
      <Banner />

      <div className="space-y-0">
        <Suspense fallback={<SectionLoader />}>
          <SolarNews />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <NationalFootprint />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BusinessVerticals />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsPortfolio />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StrategicPartners />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StatsCTA />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}