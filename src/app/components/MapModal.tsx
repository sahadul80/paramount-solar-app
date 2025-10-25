'use client'

import { motion } from "framer-motion"
import { Moon, Search, SunDim, X } from "lucide-react"
import { useEffect, useState } from "react"
import ParamountLoader from "./Loader"

export interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  locationURL: string
  query?: string
  theme?: 'dark' | 'light'
}

export default function MapModal({ isOpen, onClose, locationURL, query, theme }: MapModalProps) {
  const [modalQuery, setModalQuery] = useState<string>(query || '')
  const [modalTheme, setModalTheme] = useState<'dark' | 'light'>(theme || 'light')
  const [iframeSrc, setIframeSrc] = useState<string>('')

  // Build iframe source based on query + theme
  function buildIframeSrc(q: string, t: 'dark' | 'light') {
    const encoded = encodeURIComponent(q)
    if (process.env.NEXT_PUBLIC_USE_LOCAL_MAP_FRAME === 'true') {
      return `/map-frame?query=${encoded}&theme=${t}`
    }
    if (t === 'dark') {
      return `https://tiles.wmflabs.org/bw-mapnik/#15/23.8103/90.4125`
    }
    return `https://www.google.com/maps?q=${encoded}&z=15&hl=en-GB&output=embed`
  }

  // Initialize and update iframe source
  useEffect(() => {
    isOpen && !query ? (setIframeSrc(locationURL)) : (setIframeSrc(buildIframeSrc(query!, theme!)))
  }, [isOpen, modalQuery, modalTheme, iframeSrc])

  // Sync props -> state
  useEffect(() => {
    if (query) setModalQuery(query)
    if (theme) setModalTheme(theme)
  }, [query, theme])

  // Handle escape key to close modal and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Apply search query manually
  function applyMapQuery() {
    const newSrc = buildIframeSrc(modalQuery, modalTheme)
    setIframeSrc(newSrc)
  }

  // Handle input key press
  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      applyMapQuery()
    }
  }

  // Toggle theme
  function toggleTheme() {
    const newTheme = modalTheme === 'dark' ? 'light' : 'dark'
    setModalTheme(newTheme)
    // Iframe source will update via useEffect
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-strong p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-modal="true"
      role="dialog"
      aria-label="Map fullscreen dialog"
    >
      <motion.div
        className="relative w-full h-full max-w-6xl min-w-[80vw] min-h-[90vh] bg-secondary rounded-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header Controls */}
        <div className="flex items-center gap-3 p-2 bg-primary/5 border-b border-primary/20">
          {/* Search Input */}
          <div className="flex-1 flex items-center glass-effect rounded-lg shadow-md p-2">
            <input
              type="search"
              value={modalQuery}
              onChange={(e) => setModalQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search location or address..."
              className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-tertiary px-2"
              aria-label="Search maps"
            />
            <motion.button 
              onClick={applyMapQuery}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-sm ml-2"
              aria-label="Search map"
            >
                <Search/>
              <span className="hidden sm:inline">Search</span>
            </motion.button>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost glass-effect flex items-center gap-2 p-2"
            aria-pressed={modalTheme === 'dark'}
            aria-label={`Switch to ${modalTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {modalTheme === 'dark' ? (
              <>
                <Moon className="h-4 w-4 text-solar-accent" />
                <span className="text-xs font-medium text-primary hidden sm:block">Dark</span>
              </>
            ) : (
              <>
                <SunDim className="h-4 w-4 text-solar-accent" />
                <span className="hidden sm:inline text-xs font-medium text-primary hidden sm:block">Light</span>
              </>
            )}
          </motion.button>

          {/* Close Button */}
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost glass-effect p-2"
            aria-label="Close fullscreen map"
          >
            <X className="h-5 w-5 text-tertiary" />
          </motion.button>
        </div>

        {/* Map Container */}
        <div className="w-full h-full bg-tertiary/20">
          {iframeSrc ? (
            <iframe
              key={`${iframeSrc}-${modalTheme}`} // Force re-render on source/theme change
              loading="lazy"
              src={iframeSrc}
              title="Fullscreen Map"
              className="w-full h-full border-0"
              aria-label="Interactive fullscreen map"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <ParamountLoader/>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-tertiary">
          <span>Interactive Map View</span>
          <span>Use search to find specific locations</span>
        </div>
      </motion.div>
    </motion.div>
  )
}