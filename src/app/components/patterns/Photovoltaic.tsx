'use client'

import { motion } from 'framer-motion'

export const Photovoltaic = () => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, var(--solar-accent) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, var(--solar-warning) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}