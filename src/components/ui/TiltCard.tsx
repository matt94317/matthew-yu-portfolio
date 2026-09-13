import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

type Props = {
  children: ReactNode
  className?: string
  /** max tilt in degrees */
  intensity?: number
  glare?: boolean
  onClick?: () => void
}

/**
 * A card that tilts in 3D towards the pointer with a moving glare highlight.
 * Falls back to a static card on touch devices and with reduced motion.
 */
export function TiltCard({ children, className = '', intensity = 8, glare = true, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const enabled = !isTouch && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 25, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 200, damping: 25, mass: 0.5 })
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glareBg = useMotionTemplate`radial-gradient(600px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 45%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={enabled ? { rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1100 } : undefined}
      className={`relative ${className}`}
    >
      {children}
      {glare && enabled && (
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glareBg }} />
      )}
    </motion.div>
  )
}
