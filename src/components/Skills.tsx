import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { skillCategories, marqueeLogos, type Skill } from '../data/skills'
import { projects } from '../data/projects'
import { SectionHeading } from './ui/SectionHeading'
import { Marquee } from './ui/Marquee'
import { Reveal } from './ui/Reveal'

const projectTitle = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? slug

function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon
  const used = skill.usedIn ?? []
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div
        tabIndex={0}
        className="card flex h-full cursor-default items-center gap-3 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card focus-visible:border-accent"
        style={{ ['--skill' as string]: skill.color ?? '#22d3ee' }}
      >
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-[var(--skill)] transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-text">{skill.name}</span>
          {used.length > 0 ? (
            <span className="block truncate text-[11px] text-dim">
              Used in {used.length} project{used.length > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="block text-[11px] text-dim">Coursework & side projects</span>
          )}
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--skill) 45%, transparent), 0 0 30px -12px var(--skill)' }} />
      </div>

      {used.length > 0 && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[240px] -translate-x-1/2 translate-y-1 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs text-muted opacity-0 shadow-card transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-dim">Used in</span>
          <span className="flex flex-wrap gap-1">
            {used.map((slug) => (
              <span key={slug} className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-text">
                {projectTitle(slug)}
              </span>
            ))}
          </span>
        </div>
      )}
    </motion.li>
  )
}

export function Skills() {
  const [activeId, setActiveId] = useState<string>('all')
  const categories = skillCategories
  const visible = useMemo(() => {
    if (activeId === 'all') return categories.flatMap((c) => c.skills.map((s) => ({ ...s, key: `${c.id}-${s.name}` })))
    const cat = categories.find((c) => c.id === activeId)
    return cat ? cat.skills.map((s) => ({ ...s, key: `${cat.id}-${s.name}` })) : []
  }, [activeId, categories])
  const activeCat = categories.find((c) => c.id === activeId)

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(139,92,246,0.12),transparent_70%)]" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading index="02" eyebrow="Skills" title="A full-stack toolkit, with a bias for AI and cloud." description="Hover any skill to see where I've used it. Everything here has shipped in a real project or a graded build." />

        {/* Tabs */}
        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="mb-8 flex flex-wrap gap-2">
            {[{ id: 'all', label: 'All', icon: null }, ...categories].map((c) => {
              const isActive = activeId === c.id
              const Icon = c.icon
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(c.id)}
                  className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'border-transparent text-ink' : 'border-line text-muted hover:border-line-strong hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-2" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {c.label}
                  <span className={`font-mono text-[10px] ${isActive ? 'text-ink/70' : 'text-dim'}`}>{c.id === 'all' ? categories.reduce((n, x) => n + x.skills.length, 0) : (c as (typeof categories)[number]).skills.length}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.p key={activeId} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mb-6 text-sm text-muted">
            {activeCat ? activeCat.blurb : 'Languages, frameworks, data, AI and cloud — the whole stack I ship with.'}
          </motion.p>
        </AnimatePresence>

        <motion.ul layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((s, i) => (
              <SkillChip key={s.key} skill={s} index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Marquee */}
        <div className="mt-16">
          <Marquee speed={45}>
            {marqueeLogos.map(({ name, icon: Icon, color }) => (
              <span key={name} className="flex items-center gap-2.5 text-muted transition-colors hover:text-text">
                <Icon className="h-6 w-6" style={{ color }} aria-hidden="true" />
                <span className="text-sm font-medium">{name}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
