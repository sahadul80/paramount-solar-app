'use client'

import { motion } from 'framer-motion'

export const SolarFarm = () => {
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
          backgroundColor: 'var(--bg-primary)',
          backgroundImage: `
            radial-gradient(circle, var(--solar-primary) 1px, transparent 1px),
            radial-gradient(circle, var(--solar-success) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 120px 120px',
          backgroundPosition: '0 0, 30px 30px',
          opacity: 0.4
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}