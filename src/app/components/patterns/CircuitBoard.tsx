'use client'

import { motion } from 'framer-motion'

export const CircuitBoard = () => {
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
            linear-gradient(var(--solar-success) 1px, transparent 1px),
            linear-gradient(90deg, var(--solar-success) 1px, transparent 1px),
            radial-gradient(circle, var(--solar-accent) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 25px 25px',
          backgroundPosition: '0 0, 0 0, 25px 25px',
          opacity: 0.1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}