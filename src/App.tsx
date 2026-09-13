import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { About } from './components/About'
import { Loader } from './components/ui/Loader'
import { CursorGlow } from './components/ui/CursorGlow'
import { BackToTop } from './components/ui/BackToTop'
import { Footer } from './components/Footer'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { usePrefersReducedMotion } from './hooks/useMediaQuery'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [loading, setLoading] = useState(!reduced)

  useEffect(() => {
    if (reduced) {
      setLoading(false)
      return
    }
    const t = window.setTimeout(() => setLoading(false), 1400)
    return () => window.clearTimeout(t)
  }, [reduced])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <CursorGlow />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
