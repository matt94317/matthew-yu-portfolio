import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/profile'
import { revealContainer, revealItem } from './ui/Reveal'

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section aria-label="Highlights" className="relative">
      <div className="container-x">
        <motion.ul
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="card grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x"
        >
          {stats.map((s, i) => (
            <motion.li key={s.label} variants={revealItem} className={`flex flex-col gap-1 p-6 sm:p-8 ${i < 2 ? 'border-b md:border-b-0' : ''} ${i % 2 === 0 ? 'border-r md:border-r-0' : ''}`}>
              <span className="font-display text-3xl font-semibold text-text sm:text-4xl">
                <Counter value={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={s.suffix} />
              </span>
              <span className="text-sm leading-snug text-muted">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
