import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, revealContainer, revealItem } from './ui/Reveal'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About me" title="Engineer first, software developer by choice." description="From data-centre cooling systems to AI-powered platforms — the constant is building things that have to work in the real world." />

        <div ref={ref} className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Photo */}
          <Reveal className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
              <motion.div
                aria-hidden="true"
                style={{ y: reduced ? 0 : glowY }}
                className="absolute -inset-10 bg-[radial-gradient(50%_50%_at_50%_30%,rgba(34,211,238,0.22),transparent_70%),radial-gradient(40%_40%_at_70%_80%,rgba(139,92,246,0.28),transparent_70%)]"
              />
              <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
              <motion.img
                src="/images/matthew-about.webp"
                alt="Matthew Yu standing in a white shirt"
                width={539}
                height={1200}
                loading="lazy"
                style={{ y: reduced ? 0 : imgY }}
                className="absolute inset-x-0 bottom-0 mx-auto h-[104%] w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface via-surface/70 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-ink/70 px-4 py-3 backdrop-blur">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{profile.name}</p>
                  <p className="text-xs leading-snug text-muted">
                    {profile.title} · {profile.location}
                  </p>
                </div>
                <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-widest text-accent sm:block">Est. 2025</span>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]"
          >
            {profile.bio.map((para, i) => (
              <motion.p key={i} variants={revealItem} className={i === 0 ? 'text-text/90' : ''}>
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Quick facts — full width so they sit under both columns */}
        <motion.dl
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {profile.facts.map((f) => (
            <motion.div
              key={f.label}
              variants={revealItem}
              className="card flex min-h-[84px] flex-col justify-center px-4 py-3.5 transition-colors hover:border-line-strong"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{f.label}</dt>
              <dd className="mt-1 text-[15px] font-medium leading-snug text-text">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
