import { motion } from 'framer-motion'
import { profile } from '../../data/profile'

/** Short intro overlay shown while the page settles. Removed by AnimatePresence in App. */
export function Loader() {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      aria-hidden="true"
    >
      <div className="relative">
        <motion.span
          className="font-display text-5xl font-semibold tracking-tight gradient-text sm:text-6xl"
          initial={{ opacity: 0, y: 12, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.initials}
        </motion.span>
        <motion.span
          className="absolute -inset-6 -z-10 rounded-full bg-accent/10 blur-2xl"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-2"
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}
