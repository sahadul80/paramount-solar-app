'use client'

import { motion } from "framer-motion"
import { Moon, Search, SunDim, X } from "lucide-react"
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

  // Fixed: Proper useEffect without expression and with correct dependencies
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
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Mock search suggestions (in real app, use Google Places API or similar)
  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 2) {
      setSuggestions([])
      return
    }

    // Mock data - replace with actual API call to Google Places Autocomplete
    const mockSuggestions = [
      `${input} - Dhaka, Bangladesh`,
      `${input} - Chittagong, Bangladesh`,
      `${input} - Sylhet, Bangladesh`,
      `${input} - Rajshahi, Bangladesh`,
      `${input} - Khulna, Bangladesh`,
      `${input} - Barisal, Bangladesh`,
      `${input} - Rangpur, Bangladesh`,
      `${input} - Mymensingh, Bangladesh`
    ].filter((_, index) => index < 5) // Limit to 5 suggestions

    // Simulate API delay
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
    // Auto-apply when suggestion is clicked
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
    <section className="z-40">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-overlay-bg lg:hidden z-10"
      />
      <motion.div
        className="fixed inset-0 flex items-center justify-center p-2 opacity-80 bg-primary backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-modal="true"
        role="dialog"
        aria-label="Map fullscreen dialog"
      >
        <motion.div
          className="relative w-full h-full max-w-6xl max-w-[95vw] max-h-[85vh] bg-secondary rounded-xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header Controls */}
          <div className="flex flex-row items-center gap-2 p-2 bg-primary/5 border-b border-primary/20 w-auto">
            {/* Search Input with Suggestions */}
            <div className="flex-1 relative">
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

              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-primary border border-tertiary/20 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-tertiary/20 hover:text-solar-accent transition-colors border-b border-tertiary/10 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
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
              className="btn btn-sm glass-effect p-2"
              aria-label="Close fullscreen map"
            >
              <X className="h-4 w-4 text-tertiary" />
            </motion.button>
          </div>

          {/* Map Container */}
          <div className="w-full h-full bg-tertiary/20">
            {iframeSrc ? (
              <iframe
                key={`${iframeSrc}`} // Force re-render on source/theme change
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
            <span>Use search to find specific locations in Bangladesh</span>
          </div>

          {/* Search Tips */}
          {showSuggestions && (
            <div className="absolute top-16 left-2 bg-solar-primary/80 backdrop-blur-sm rounded-lg p-3 text-xs text-secondary border border-tertiary">
              <p className="font-medium text-solar-accent mb-1">Search Tips:</p>
              <ul className="space-y-1">
                <li>• Type district names (Dhaka, Chittagong, Sylhet)</li>
                <li>• Add city areas (Gulshan, Banani, Uttara)</li>
                <li>• Search for landmarks or addresses</li>
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}