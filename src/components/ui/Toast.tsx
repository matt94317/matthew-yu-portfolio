import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { profile } from '../../data/profile'

type ToastContextValue = {
  show: (message: string) => void
  /** Copies the site email to the clipboard and shows a confirmation toast. */
  copyEmail: (note?: string) => Promise<boolean>
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  const show = useCallback((msg: string) => {
    setMessage(msg)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 2800)
  }, [])

  const copyEmail = useCallback(
    async (note?: string) => {
      try {
        await navigator.clipboard.writeText(profile.email)
        show(note ?? `Email copied — ${profile.email}`)
        return true
      } catch {
        // Clipboard can be unavailable (insecure context / permissions): fall back to a selectable prompt-free message.
        show(`Email: ${profile.email}`)
        return false
      }
    },
    [show],
  )

  const value = useMemo(() => ({ show, copyEmail }), [show, copyEmail])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4" role="status" aria-live="polite">
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex max-w-full items-center gap-2.5 rounded-xl px-4 py-3 text-sm text-text shadow-card"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/20 text-success">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="truncate">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
