import { profile } from '../data/profile'
import { NAV_ITEMS } from './Nav'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display text-xs font-bold text-ink">{profile.initials}</span>
          <span>
            © {year} {profile.name}. Built with React, TypeScript, Tailwind & Framer Motion.
          </span>
        </div>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="transition-colors hover:text-text">
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-text">
              Source
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
