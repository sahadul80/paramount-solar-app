'use client'

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import ParamountLoader from "./Loader"

export interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  locationURL: string
  query?: string
}

export default function MapModal({ isOpen, onClose, locationURL, query }: MapModalProps) {
  const [modalQuery, setModalQuery] = useState<string>(query || '')
  const [iframeSrc, setIframeSrc] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Build iframe source based on query + theme
  const buildIframeSrc = useCallback((q: string) => {
    const encoded = encodeURIComponent(q)
    return `https://www.google.com/maps?q=${encoded}&z=15&hl=en-GB&output=embed`
  }, [])

  useEffect(() => {
    if (isOpen) {
      const src = query ? buildIframeSrc(query) : locationURL
      setIframeSrc(src)
    }
  }, [isOpen, query, locationURL, buildIframeSrc])

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
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'static'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.style.position = 'static'
    }
  }, [isOpen, onClose])

  // Mock search suggestions
  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 2) {
      setSuggestions([])
      return
    }

    const mockSuggestions = [
      `${input} - Dhaka, Bangladesh`,
      `${input} - Chittagong, Bangladesh`,
      `${input} - Sylhet, Bangladesh`,
      `${input} - Rajshahi, Bangladesh`,
      `${input} - Khulna, Bangladesh`
    ].filter((_, index) => index < 5)

    await new Promise(resolve => setTimeout(resolve, 300))
    setSuggestions(mockSuggestions)
  }, [])

  // Debounced search for suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(modalQuery)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [modalQuery, fetchSuggestions])

  // Apply search query manually
  const applyMapQuery = useCallback(() => {
    const newSrc = buildIframeSrc(modalQuery)
    setIframeSrc(newSrc)
    setShowSuggestions(false)
  }, [modalQuery, buildIframeSrc])

  // Handle input key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyMapQuery()
    }
  }, [applyMapQuery])

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setModalQuery(suggestion)
    setShowSuggestions(false)
    const newSrc = buildIframeSrc(suggestion)
    setIframeSrc(newSrc)
  }, [buildIframeSrc])

  // Handle input focus
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  // Handle input blur (with delay to allow clicking on suggestions)
  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  if (!isOpen) return null

  return (
    <>
      {/* High z-index backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-overlay-strong backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal container with highest z-index */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none rounded-lg">
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] bg-secondary rounded-xl shadow-2xl pointer-events-auto rounded-lg"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut" 
          }}
          aria-modal="true"
          role="dialog"
          aria-label="Map fullscreen dialog"
        >
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-primary border-b border-primary/20 rounded-lg">
            {/* Search Input with Suggestions */}
            <div className="flex-1 w-full relative">
              <div className="flex items-center glass-effect rounded-lg shadow-md">
                <input
                  type="search"
                  value={modalQuery}
                  onChange={(e) => {
                    setModalQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyPress}
                  placeholder="Search location or address in Bangladesh..."
                  className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-tertiary px-3 py-2"
                  aria-label="Search maps"
                />
                <motion.button 
                  onClick={applyMapQuery}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm m-1"
                  aria-label="Search map"
                >
                  <Search className="h-4 w-4"/>
                  <span className="hidden sm:inline ml-1">Search</span>
                </motion.button>
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-primary border border-primary/20 rounded-lg shadow-xl z-60 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-solar-primary/20 hover:text-solar-accent transition-colors border-b border-primary/10 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-solar-accent flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-sm btn-sm glass-effect px-3 py-2"
              aria-label="Close fullscreen map"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Close</span>
            </motion.button>
          </div>

          {/* Map Container */}
          <div className="w-full h-[calc(90vh-120px)] bg-tertiary/10">
            {iframeSrc ? (
              <iframe
                key={iframeSrc}
                loading="lazy"
                src={iframeSrc}
                title="Fullscreen Map"
                className="w-full h-full border-0 rounded-lg"
                aria-label="Interactive fullscreen map"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <ParamountLoader/>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {showSuggestions && (
            <div className="absolute top-20 left-4 bg-solar-primary/90 backdrop-blur-sm rounded-lg p-3 text-xs text-primary border border-solar-accent/30 z-60">
              <p className="font-bold text-solar-accent mb-1">Search Tips:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-solar-accent">•</span>
                  <span>Type district names (Dhaka, Chittagong, Sylhet)</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-solar-accent">•</span>
                  <span>Add city areas (Gulshan, Banani, Uttara)</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-solar-accent">•</span>
                  <span>Search for landmarks or addresses</span>
                </li>
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}