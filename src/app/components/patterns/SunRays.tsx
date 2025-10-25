'use client'

import { motion } from 'framer-motion'

export const SunRays = () => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, var(--solar-accent) 0%, transparent 50%),
            conic-gradient(
              from 0deg at center,
              transparent 0deg,
              var(--solar-warning) 10deg,
              transparent 20deg,
              var(--solar-accent) 30deg,
              transparent 40deg
            )
          `,
          backgroundSize: '100% 100%, 200px 200px',
          opacity: 0.05
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}