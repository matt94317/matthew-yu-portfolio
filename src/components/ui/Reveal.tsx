import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span' | 'p'
}

/** Fades + slides children in when they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28, once = true, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, filter: reduced ? 'none' : 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }
  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once, margin: '-10% 0px -10% 0px' }}>
      {children}
    </Tag>
  )
}

/** Staggers direct children (each child should be a motion element using `revealItem`). */
export const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
