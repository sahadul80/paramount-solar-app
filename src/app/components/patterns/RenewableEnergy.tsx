'use client'

import { motion } from 'framer-motion'

export const RenewableEnergy = () => {
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
            radial-gradient(circle at 20% 30%, var(--solar-accent) 10px, transparent 10px),
            radial-gradient(circle at 80% 70%, var(--solar-secondary) 15px, transparent 15px),
            radial-gradient(circle at 40% 80%, var(--solar-info) 12px, transparent 12px)
          `,
          backgroundSize: '200px 200px',
          opacity: 0.05
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}