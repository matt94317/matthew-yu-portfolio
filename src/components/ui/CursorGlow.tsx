import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * A soft radial glow that trails the pointer. Disabled on touch devices and
 * for users who prefer reduced motion.
 */
export function CursorGlow() {
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (isTouch || reduced) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isTouch, reduced, x, y])

  if (isTouch || reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(139,92,246,0.06) 35%, transparent 65%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
