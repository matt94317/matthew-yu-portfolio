import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return initial
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on devices whose primary input can't hover (phones/tablets). */
export function useIsTouch(): boolean {
  return useMediaQuery('(hover: none), (pointer: coarse)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
