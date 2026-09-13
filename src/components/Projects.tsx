import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Globe, Trophy, X } from 'lucide-react'
import { FaApple, FaGithub } from 'react-icons/fa6'
import { useCallback, useEffect, useRef, useState } from 'react'
import { featuredProjects, otherProjects, type Project } from '../data/projects'
import { SectionHeading } from './ui/SectionHeading'
import { TiltCard } from './ui/TiltCard'
import { Reveal, revealContainer, revealItem } from './ui/Reveal'

const accentMap = {
  cyan: { ring: 'group-hover:border-accent/50', glow: 'rgba(34,211,238,0.35)', text: 'text-accent', bg: 'bg-accent/10' },
  violet: { ring: 'group-hover:border-accent-2/50', glow: 'rgba(139,92,246,0.4)', text: 'text-accent-2', bg: 'bg-accent-2/10' },
  pink: { ring: 'group-hover:border-accent-3/50', glow: 'rgba(244,114,182,0.35)', text: 'text-accent-3', bg: 'bg-accent-3/10' },
  emerald: { ring: 'group-hover:border-success/50', glow: 'rgba(52,211,153,0.35)', text: 'text-success', bg: 'bg-success/10' },
} as const

function LinkIcon({ kind, className }: { kind?: string; className?: string }) {
  if (kind === 'appstore') return <FaApple className={className} aria-hidden="true" />
  if (kind === 'github') return <FaGithub className={className} aria-hidden="true" />
  if (kind === 'web') return <Globe className={className} aria-hidden="true" />
  return <ExternalLink className={className} aria-hidden="true" />
}

function FeaturedCard({ project, onOpen, index }: { project: Project; onOpen: (p: Project) => void; index: number }) {
  const a = accentMap[project.accent]
  return (
    <article className="h-full">
      <TiltCard className="group h-full" intensity={6}>
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open case study: ${project.title}`}
          className={`card flex h-full w-full flex-col overflow-hidden text-left transition-colors duration-300 ${a.ring} focus-visible:border-accent`}
          style={{ boxShadow: `0 30px 80px -40px ${a.glow}` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.cover}
              alt={project.coverAlt}
              loading={index < 2 ? 'eager' : 'lazy'}
              width={1280}
              height={720}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" aria-hidden="true" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur ${a.bg} ${a.text}`}>{project.category}</span>
              {project.award && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300 backdrop-blur">
                  <Trophy className="h-3 w-3" /> {project.award}
                </span>
              )}
            </div>
            <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink/60 text-text opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:rotate-0 -rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-dim">{project.period}</p>
            <h3 className="mt-2 text-xl font-semibold text-text sm:text-2xl">{project.title}</h3>
            <p className={`mt-1 text-sm font-medium ${a.text}`}>{project.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.slice(0, 6).map((t) => (
                <li key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
              {project.stack.length > 6 && <li className="px-1 py-1 font-mono text-[11px] text-dim">+{project.stack.length - 6}</li>}
            </ul>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-text/80 transition-colors group-hover:text-accent">
              Read case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </button>
        {project.links && project.links.length > 0 && (
          <div className="absolute bottom-5 right-5 flex gap-2 sm:bottom-6 sm:right-6">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on ${l.label}`}
                title={l.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/80 px-2.5 py-1.5 text-xs font-medium text-muted backdrop-blur transition-colors hover:border-accent/60 hover:text-text"
              >
                <LinkIcon kind={l.kind} className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{l.label}</span>
              </a>
            ))}
          </div>
        )}
      </TiltCard>
    </article>
  )
}

/** Horizontal, snap-scrolling rail of featured project cards. */
function ProjectRail({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const railRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [active, setActive] = useState(0)

  const step = useCallback(() => {
    const el = railRef.current
    if (!el) return 0
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return el.clientWidth
    const gap = parseFloat(getComputedStyle(el).columnGap || '24') || 24
    return first.getBoundingClientRect().width + gap
  }, [])

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
    const s = step()
    setActive(s > 0 ? Math.min(projects.length - 1, Math.round(el.scrollLeft / s)) : 0)
  }, [step, projects.length])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const go = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })

  const goTo = (i: number) => railRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })

  return (
    <div className="relative">
      {/* Controls */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          <span className="ml-3 hidden normal-case tracking-normal sm:inline">Swipe or use the arrows</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-text transition-all hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-text transition-all hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Rail */}
      <ul
        ref={railRef}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
        style={{ scrollPaddingLeft: '1.25rem' }}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="w-[84vw] max-w-[430px] shrink-0 snap-start sm:w-[400px] lg:w-[440px]">
            <FeaturedCard project={p} onOpen={onOpen} index={i} />
          </li>
        ))}
      </ul>

      {/* Progress dots */}
      <div className="mt-6 flex justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={active === i}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-accent' : 'w-4 bg-white/15 hover:bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}

function SmallCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const a = accentMap[project.accent]
  return (
    <motion.li variants={revealItem} className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details: ${project.title}`}
        className={`card group flex h-full w-full min-w-0 gap-4 overflow-hidden p-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${a.ring} focus-visible:border-accent`}
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
          <img src={project.cover} alt={project.coverAlt} loading="lazy" width={640} height={360} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="min-w-0 py-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">{project.subtitle}</p>
          <h3 className="mt-1 truncate text-base font-semibold text-text">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
          <p className="mt-2 truncate font-mono text-[11px] text-dim">{project.stack.join(' · ')}</p>
        </div>
      </button>
    </motion.li>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-sm" tabIndex={-1} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-card sm:rounded-3xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[16/8] shrink-0 overflow-hidden">
              <img src={project.cover} alt={project.coverAlt} width={1280} height={720} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" aria-hidden="true" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-text backdrop-blur transition-colors hover:bg-ink hover:text-accent"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5 sm:left-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{project.period}</p>
                <h3 id="project-title" className="mt-1 text-2xl font-semibold text-text sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
                <div className="space-y-6">
                  {[
                    ['The problem', project.problem],
                    ['What I built', project.solution],
                    ['Outcome', project.outcome],
                  ].map(([h, body]) => (
                    <div key={h}>
                      <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-dim">{h}</h4>
                      <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="sm:w-56">
                  <h4 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-dim">Role</h4>
                  <p className="text-sm text-text">{project.role}</p>
                  <h4 className="mb-2 mt-5 font-mono text-[11px] uppercase tracking-widest text-dim">Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-muted">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-line bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">Try it yourself</p>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((l, i) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                          i === 0 ? 'bg-text text-ink hover:bg-accent' : 'border border-line-strong text-text hover:border-accent/60 hover:text-accent'
                        }`}
                      >
                        <LinkIcon kind={l.kind} className="h-4 w-4" />
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-dim">Tech stack</h4>
                <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {project.stack.map((t) => (
                    <li key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_80%_20%,rgba(34,211,238,0.10),transparent_70%)]" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Projects" title="Things I've shipped, not just started." description="Real users, a real capstone and one very good hackathon weekend. Click a card for the full story." />

        <Reveal>
          <ProjectRail projects={featuredProjects} onOpen={setOpen} />
        </Reveal>

        <Reveal className="mt-16">
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-display text-lg font-semibold text-text">More builds</h3>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="font-mono text-xs text-dim">Coursework at QUT</span>
          </div>
        </Reveal>
        <motion.ul variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} className="grid gap-4 md:grid-cols-3">
          {otherProjects.map((p) => (
            <SmallCard key={p.slug} project={p} onOpen={setOpen} />
          ))}
        </motion.ul>
      </div>

      <ProjectModal project={open} onClose={close} />
    </section>
  )
}
