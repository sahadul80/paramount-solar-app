'use client'

import { motion } from 'framer-motion'

export const SolarInnovation = () => {
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
            linear-gradient(45deg, var(--solar-accent) 12%, transparent 12%, transparent 88%, var(--solar-accent) 88%, var(--solar-accent)),
            linear-gradient(135deg, transparent 25%, var(--solar-primary) 25%, var(--solar-primary) 75%, transparent 75%, transparent),
            linear-gradient(45deg, transparent 25%, var(--solar-primary) 25%, var(--solar-primary) 75%, transparent 75%, transparent)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 0, 40px -40px',
          opacity: 0.1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
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