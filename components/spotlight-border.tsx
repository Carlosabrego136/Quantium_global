'use client'

import { useRef, type ReactNode } from 'react'

export function SpotlightBorder({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  function handleLeave() {
    ref.current?.style.setProperty('--spot-x', '-9999px')
    ref.current?.style.setProperty('--spot-y', '-9999px')
  }

  return (
    <div ref={ref} className={`spotlight-border ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div className="spotlight-border-ring" aria-hidden="true" />
      <div className="spotlight-border-content">{children}</div>
    </div>
  )
}
