import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { awards, timeline } from '../data/experience'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal, revealContainer, revealItem } from './ui/Reveal'

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[500px] bg-[radial-gradient(50%_50%_at_20%_80%,rgba(139,92,246,0.12),transparent_70%)]" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading index="04" eyebrow="Experience & education" title="The path from hardware to software." description="Two years engineering data-centre cooling for Azure, then a deliberate pivot into building software full-time." />

        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.9fr]">
          {/* Timeline */}
          <ol ref={ref} className="relative space-y-10 pl-8 sm:pl-10">
            <div className="absolute bottom-2 left-[11px] top-2 w-px bg-line sm:left-[15px]" aria-hidden="true" />
            <motion.div
              className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-[15px]"
              style={{ scaleY: lineScale, height: 'calc(100% - 16px)' }}
              aria-hidden="true"
            />
            {timeline.map((item) => {
              const Icon = item.kind === 'work' ? Briefcase : GraduationCap
              return (
                <Reveal as="li" key={`${item.org}-${item.title}`} className="relative">
                  <span className={`absolute -left-8 top-1 grid h-6 w-6 place-items-center rounded-full border sm:-left-10 sm:h-8 sm:w-8 ${item.kind === 'work' ? 'border-accent/50 bg-ink text-accent shadow-glow' : 'border-accent-2/50 bg-ink text-accent-2 shadow-glow-violet'}`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                  </span>
                  <div className="card p-5 transition-colors hover:border-line-strong sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                        <p className="text-sm font-medium text-accent">{item.org}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-mono text-xs text-text/80">{item.period}</p>
                        <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-dim">
                          <MapPin className="h-3 w-3" aria-hidden="true" /> {item.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                    {item.bullets && (
                      <ul className="mt-3 space-y-2">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.tags && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <li key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ol>

          {/* Awards */}
          <div className="lg:pt-2">
            <Reveal>
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-text">
                <Award className="h-5 w-5 text-amber-300" aria-hidden="true" />
                Awards
              </h3>
            </Reveal>
            <motion.ul variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} className="space-y-3">
              {awards.map((a, i) => (
                <motion.li key={a.title} variants={revealItem} className={`card relative overflow-hidden p-5 ${i === 0 ? 'shine border-amber-300/30' : ''}`}>
                  {i === 0 && <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-300/15 blur-2xl" aria-hidden="true" />}
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-text">{a.title}</p>
                    <span className="shrink-0 font-mono text-xs text-dim">{a.year}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{a.detail}</p>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal delay={0.2} className="mt-8">
              <div className="card p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-dim">Languages</p>
                <div className="mt-3 space-y-2.5">
                  {[
                    ['Mandarin Chinese', 'Native', 100],
                    ['English', 'Professional working proficiency', 85],
                  ].map(([lang, level, pct]) => (
                    <div key={String(lang)}>
                      <div className="flex justify-between text-sm">
                        <span className="text-text">{lang}</span>
                        <span className="text-muted">{level}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
