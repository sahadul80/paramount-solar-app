'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Sun, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5
          }}
          className="mb-6"
        >
          <Zap className="h-16 w-16 text-solar-warning mx-auto" />
        </motion.div>

        {/* Content */}
        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-primary mb-4">Project Not Found</h2>
        <p className="text-tertiary mb-8">
          The solar project you're looking for isn't available. It might be under construction or no longer active.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="btn btn-ghost flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </motion.button>
          
          <Link href="/" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full flex items-center gap-2 justify-center"
            >
              <Home className="h-4 w-4" />
              Home Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export { NotFound }