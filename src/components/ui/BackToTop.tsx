import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

/** Scroll progress ring + back-to-top button that appears after scrolling. */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="glass fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-text shadow-card transition-colors hover:text-accent"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
