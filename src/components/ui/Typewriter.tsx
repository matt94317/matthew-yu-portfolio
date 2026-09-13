import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

type Props = {
  words: readonly string[]
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
  className?: string
}

/** Cycles through words with a typewriter effect. */
export function Typewriter({ words, typingSpeed = 55, deletingSpeed = 30, pause = 1800, className = '' }: Props) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduced ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) {
      const id = setInterval(() => setIndex((i) => (i + 1) % words.length), pause + 1200)
      return () => clearInterval(id)
    }
    const word = words[index]
    let timeout: number
    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deletingSpeed : typingSpeed,
      )
    }
    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause, reduced])

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {reduced ? words[index] : text}
      <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent align-baseline animate-blink" />
    </span>
  )
}
