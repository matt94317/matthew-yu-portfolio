import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, revealContainer, revealItem } from './ui/Reveal'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About me" title="Engineer first, software developer by choice." description="From data-centre cooling systems to AI-powered platforms — the constant is building things that have to work in the real world." />

        <div ref={ref} className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Photo */}
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-surface">
              <motion.div aria-hidden="true" style={{ y: reduced ? 0 : glowY }} className="absolute -inset-10 bg-[radial-gradient(50%_50%_at_50%_30%,rgba(34,211,238,0.25),transparent_70%),radial-gradient(40%_40%_at_70%_80%,rgba(139,92,246,0.3),transparent_70%)]" />
              <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
              <motion.img
                src="/images/matthew-fullbody.webp"
                alt="Matthew Yu standing in a dark suit"
                width={268}
                height={900}
                loading="lazy"
                style={{ y: reduced ? 0 : imgY }}
                className="absolute inset-x-0 bottom-[-6%] mx-auto h-[112%] w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-line bg-ink/60 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold">{profile.name}</p>
                  <p className="text-xs text-muted">{profile.title} · {profile.location}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Est. 2025</span>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <motion.div variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
              {profile.bio.map((para, i) => (
                <motion.p key={i} variants={revealItem} className={i === 0 ? 'text-text/90' : ''}>
                  {para}
                </motion.p>
              ))}
            </motion.div>

            <motion.dl
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {profile.facts.map((f) => (
                <motion.div key={f.label} variants={revealItem} className="card flex items-baseline justify-between gap-4 px-4 py-3 transition-colors hover:border-line-strong">
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-dim">{f.label}</dt>
                  <dd className="text-right text-sm font-medium text-text">{f.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  )
}
