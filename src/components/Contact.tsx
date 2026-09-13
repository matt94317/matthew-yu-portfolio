import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { useState } from 'react'
import { profile } from '../data/profile'
import { Reveal, revealContainer, revealItem } from './ui/Reveal'
import { Magnetic } from './ui/Magnetic'
import { ParticleField } from './ui/ParticleField'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    { label: 'GitHub', value: 'github.com/matt94317', href: profile.github, Icon: FaGithub },
    { label: 'LinkedIn', value: 'matthew-yu-6653b4200', href: profile.linkedin, Icon: FaLinkedinIn },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  ]

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="card noise relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
            <ParticleField className="opacity-50" density={0.6} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.16),transparent_70%),radial-gradient(40%_40%_at_80%_100%,rgba(139,92,246,0.18),transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow mb-4 justify-center">05 · Contact</p>
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.1] sm:text-5xl">
                Let's build something <span className="gradient-text">people actually use.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
                I'm finishing my Master's at QUT in December 2026 and looking for graduate or junior software roles in Brisbane — AI systems, cloud, full-stack or mobile. If you're hiring, or just want to talk shop, my inbox is open.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-dim">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {profile.location} · GMT+10
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a href={`mailto:${profile.email}`} className="shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03]">
                    <Mail className="h-4 w-4" />
                    Say hello
                  </a>
                </Magnetic>
                <Magnetic>
                  <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3.5 text-sm font-semibold text-text backdrop-blur transition-colors hover:border-accent/60 hover:text-accent" aria-live="polite">
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                </Magnetic>
                <Magnetic>
                  <a href={profile.cvUrl} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3.5 text-sm font-semibold text-text backdrop-blur transition-colors hover:border-accent/60 hover:text-accent">
                    <Download className="h-4 w-4" />
                    CV (PDF)
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>

        <motion.ul variants={revealContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} className="mt-6 grid gap-4 sm:grid-cols-3">
          {links.map(({ label, value, href, Icon }) => (
            <motion.li key={label} variants={revealItem}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="card group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-text transition-colors group-hover:bg-accent group-hover:text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-dim">{label}</span>
                  <span className="block truncate text-sm font-medium text-text">{value}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
