'use client'

import { motion } from 'framer-motion'

export const GreenEnergy = () => {
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
          backgroundColor: 'var(--bg-primary)',
          backgroundImage: `
            radial-gradient(circle at 10% 20%, var(--solar-success) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, var(--solar-primary) 0%, transparent 20%)
          `,
          backgroundSize: '300px 300px',
          opacity: 0.05
        }}
        animate={{
          backgroundPosition: ['0px 0px', '150px 150px'],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}