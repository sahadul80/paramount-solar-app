'use client'

import { motion } from 'framer-motion'

export const SolarInstallation = () => {
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
            linear-gradient(30deg, var(--border-primary) 12%, transparent 12.5%, transparent 87%, var(--border-primary) 87.5%, var(--border-primary)),
            linear-gradient(150deg, var(--border-primary) 12%, transparent 12.5%, transparent 87%, var(--border-primary) 87.5%, var(--border-primary)),
            linear-gradient(30deg, var(--border-primary) 12%, transparent 12.5%, transparent 87%, var(--border-primary) 87.5%, var(--border-primary)),
            linear-gradient(150deg, var(--border-primary) 12%, transparent 12.5%, transparent 87%, var(--border-primary) 87.5%, var(--border-primary)),
            linear-gradient(60deg, var(--border-tertiary) 25%, transparent 25.5%, transparent 75%, var(--border-tertiary) 75%, var(--border-tertiary)),
            linear-gradient(60deg, var(--border-tertiary) 25%, transparent 25.5%, transparent 75%, var(--border-tertiary) 75%, var(--border-tertiary))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          opacity: 0.1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 140px'],
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