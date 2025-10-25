'use client'

import { motion } from 'framer-motion'

export const CleanEnergy = () => {
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
            radial-gradient(circle at 25% 25%, var(--solar-success) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, var(--solar-primary) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, var(--solar-accent) 0%, transparent 50%)
          `,
          backgroundSize: '200px 200px',
          backgroundColor: 'var(--bg-secondary)',
          opacity: 0.04
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
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