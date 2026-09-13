import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 0 | 1 // 0 = cyan, 1 = violet
}

/**
 * Lightweight canvas particle network. Particles drift slowly and connect to
 * neighbours; the pointer gently attracts nearby particles.
 */
export function ParticleField({ className = '', density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    let raf = 0
    let running = true
    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.round(Math.min(140, Math.max(35, (width * height) / 14000)) * density)
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        hue: Math.random() > 0.75 ? 1 : 0,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDist = Math.min(150, width / 7)

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (pointer.active) {
            const dx = pointer.x - p.x
            const dy = pointer.y - p.y
            const d2 = dx * dx + dy * dy
            if (d2 < 220 * 220 && d2 > 1) {
              const f = 0.012 / Math.sqrt(d2)
              p.vx += dx * f
              p.vy += dy * f
            }
          }
          // damping so pointer attraction never runs away
          p.vx *= 0.995
          p.vy *= 0.995
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.28
            ctx.strokeStyle = a.hue || b.hue ? `rgba(167, 139, 250, ${alpha})` : `rgba(34, 211, 238, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue ? 'rgba(167, 139, 250, 0.9)' : 'rgba(103, 232, 249, 0.9)'
        ctx.fill()
      }

      if (running && !reduced) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
