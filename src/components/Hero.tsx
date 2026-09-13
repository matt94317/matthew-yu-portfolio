import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, Mail, Trophy, Users, Cloud } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { ParticleField } from './ui/ParticleField'
import { Typewriter } from './ui/Typewriter'
import { Magnetic } from './ui/Magnetic'
import { useToast } from './ui/Toast'

const nameLetters = profile.name.split('')

const floatBadges = [
  {
    icon: Trophy,
    title: '1st place',
    sub: 'QUT Sport Innovation Hackathon',
    className: 'left-0 top-[12%] sm:-translate-x-1/2',
    delay: 0,
    color: 'text-amber-300',
  },
  {
    icon: Users,
    title: '20K+ users',
    sub: 'AnyWear, built solo',
    className: 'right-0 top-[38%] sm:translate-x-1/3',
    delay: 1.2,
    color: 'text-accent-3',
  },
  {
    icon: Cloud,
    title: 'AWS · Terraform',
    sub: 'Vertex cloud deployment',
    className: 'left-0 bottom-[16%] sm:-translate-x-1/3',
    delay: 2.1,
    color: 'text-accent',
  },
]

export function Hero() {
  const reduced = useReducedMotion()
  const { copyEmail } = useToast()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Introduction">
      {/* Background layers */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: reduced ? 0 : bgY }}>
        {!reduced && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.webp"
            aria-hidden="true"
          >
            <source src="/videos/hero-bg.webm" type="video/webm" />
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
        {reduced && <img src="/videos/hero-poster.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(34,211,238,0.14),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_60%,rgba(139,92,246,0.16),transparent_70%)]" />
        <div className="grid-bg absolute inset-0" />
      </motion.div>
      <ParticleField className="-z-[5] opacity-70" />

      <motion.div style={{ y: reduced ? 0 : contentY, opacity: reduced ? 1 : contentOpacity }} className="container-x relative flex flex-1 flex-col justify-center pb-16 pt-28 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-xs font-medium text-muted backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open to graduate roles · {profile.location}
            </motion.p>

            <h1 className="text-[2.75rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl" aria-label={profile.name}>
              <span className="sr-only">{profile.name}</span>
              <span aria-hidden="true" className="block">
                {nameLetters.map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className={`inline-block ${ch === ' ' ? 'w-[0.3em]' : ''}`}
                    initial={{ opacity: 0, y: 40, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ))}
              </span>
              <motion.span
                aria-hidden="true"
                className="mt-2 block text-[0.62em] font-medium leading-tight text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              >
                <Typewriter words={profile.roles} className="gradient-text font-semibold" />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="shine group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03]"
                >
                  View projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.cvUrl}
                  download={profile.cvFileName}
                  className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/50 px-5 py-3 text-sm font-semibold text-text backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Magnetic>
              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: profile.github, label: 'GitHub', Icon: FaGithub },
                  { href: profile.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
                ].map(({ href, label, Icon }) => (
                  <Magnetic key={label} strength={0.25}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-xl text-muted transition-all hover:bg-white/[0.06] hover:text-text"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                ))}
                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={() => void copyEmail()}
                    aria-label={`Copy email address ${profile.email}`}
                    title="Copy email address"
                    className="grid h-11 w-11 place-items-center rounded-xl text-muted transition-all hover:bg-white/[0.06] hover:text-text"
                  >
                    <Mail className="h-[18px] w-[18px]" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]"
          >
            <div className="relative aspect-[4/5]">
              {/* glow + ring */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-[38%_62%_58%_42%/45%_38%_62%_55%] bg-gradient-to-br from-accent/40 via-accent-2/35 to-accent-3/30 blur-3xl"
                animate={reduced ? undefined : { rotate: [0, 12, -8, 0], scale: [1, 1.06, 0.98, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[8%] rounded-full opacity-80"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0 70%, rgba(34,211,238,0.9) 85%, rgba(139,92,246,0.9) 95%, transparent 100%)',
                  mask: 'radial-gradient(circle, transparent 66%, #000 67%)',
                  WebkitMask: 'radial-gradient(circle, transparent 66%, #000 67%)',
                }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[9%] rounded-full border border-line-strong bg-surface/40 backdrop-blur-sm" aria-hidden="true" />

              <img
                src="/images/matthew-portrait.webp"
                srcSet="/images/matthew-portrait-sm.webp 550w, /images/matthew-portrait.webp 1100w"
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 80vw"
                alt="Portrait of Matthew Yu in a dark blazer and white shirt"
                width={1100}
                height={1505}
                fetchPriority="high"
                className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                style={{
                  maskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 78%, transparent 100%)',
                }}
              />

              {floatBadges.map(({ icon: Icon, title, sub, className, delay, color }) => (
                <motion.div
                  key={title}
                  className={`glass absolute flex items-center gap-3 rounded-xl px-3 py-2 shadow-card ${className}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
                  transition={reduced ? { delay: 1.3 } : { opacity: { delay: 1.3 + delay * 0.2, duration: 0.6 }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay } }}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06] ${color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-text">{title}</span>
                    <span className="block text-[11px] text-muted">{sub}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-accent sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Scroll
        <motion.span animate={reduced ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
