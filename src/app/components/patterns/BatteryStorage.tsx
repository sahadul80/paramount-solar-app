'use client'

import { motion } from 'framer-motion'

export const BatteryStorage = () => {
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
            linear-gradient(90deg, transparent 90%, var(--solar-success) 90%),
            linear-gradient(90deg, var(--solar-success) 10%, transparent 10%)
          `,
          backgroundSize: '60px 20px',
          opacity: 0.1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 0px'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}