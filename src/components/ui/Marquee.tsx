import type { ReactNode } from 'react'

/** Infinite horizontal scroller. Content is duplicated for a seamless loop. */
export function Marquee({ children, className = '', reverse = false, speed = 40 }: { children: ReactNode; className?: string; reverse?: boolean; speed?: number }) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div
        className="flex w-max shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
