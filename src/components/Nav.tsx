import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((n) => n.id)] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x">
        <nav
          aria-label="Primary"
          className={`mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:mt-4 sm:px-5 ${
            scrolled || open ? 'glass shadow-card' : 'border border-transparent'
          }`}
        >
          <a href="#hero" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-ink shadow-glow transition-transform group-hover:rotate-6">
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-text' : 'text-muted hover:text-text'}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-xl bg-text px-4 py-2 text-sm font-semibold text-ink transition-all hover:bg-accent hover:shadow-glow md:inline-flex"
            >
              Let's talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl text-text transition-colors hover:bg-white/[0.06] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[76px] z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={-1} />
            <motion.ul
              className="glass relative mx-5 rounded-2xl p-2 shadow-card"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                      active === item.id ? 'bg-white/[0.06] text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="p-2 pt-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex w-full items-center justify-center rounded-xl bg-text px-4 py-3 text-sm font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  Let's talk
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
