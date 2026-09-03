'use client'

import { useEffect, useRef } from 'react'

const SPEED = 0.8

export type MarqueeSlide = {
  key: string
  image: string
  title: string
}

export function ToolsMarquee({ slides }: { slides: MarqueeSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let offset = 0
    let velocity = 0
    let dragging = false
    let dragStartX = 0
    let dragStartOffset = 0
    let lastX = 0
    let lastT = 0
    let rafId = 0

    function apply() {
      if (!track) return
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    function tick() {
      rafId = requestAnimationFrame(tick)
      if (!track) return

      const halfWidth = track.scrollWidth / 2
      if (!dragging) {
        if (Math.abs(velocity) > 0.1) {
          offset += velocity
          velocity *= 0.95
        } else {
          velocity = 0
          offset -= SPEED
        }
      }

      if (halfWidth > 0) {
        if (offset <= -halfWidth) offset += halfWidth
        if (offset > 0) offset -= halfWidth
      }

      apply()
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true
      velocity = 0
      dragStartX = e.clientX
      dragStartOffset = offset
      lastX = e.clientX
      lastT = performance.now()
      track?.setPointerCapture(e.pointerId)
      track?.classList.add('nz-marquee-grabbing')
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return
      const now = performance.now()
      const dt = Math.max(now - lastT, 1)
      const dx = e.clientX - lastX
      velocity = (dx / dt) * 16
      offset = dragStartOffset + (e.clientX - dragStartX)
      lastX = e.clientX
      lastT = now
    }

    function onPointerUp(e: PointerEvent) {
      dragging = false
      track?.releasePointerCapture(e.pointerId)
      track?.classList.remove('nz-marquee-grabbing')
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', onPointerUp)
    track.addEventListener('pointercancel', onPointerUp)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  const doubled = [...slides, ...slides]

  return (
    <div className="nz-marquee-section">
      <div className="nz-marquee-mask nz-marquee-mask-top" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" />
        </svg>
      </div>

      <div ref={trackRef} className="nz-marquee-track">
        {doubled.map((slide, i) => (
          <div className="nz-marquee-slide" key={`${slide.key}-${i}`}>
            <img src={slide.image} alt={slide.title} loading="lazy" draggable={false} />
            <span className="nz-marquee-caption">{slide.title}</span>
          </div>
        ))}
      </div>

      <div className="nz-marquee-mask nz-marquee-mask-bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" />
        </svg>
      </div>
    </div>
  )
}
