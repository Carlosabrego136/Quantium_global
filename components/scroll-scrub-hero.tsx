'use client'

import { useEffect, useRef, useState } from 'react'

const MAX_TIME = 7.5
const LERP_TAU = 8
const SNAP = 0.002

export type ScrollSection = {
  eyebrow?: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
  variant: 'primary' | 'outline'
}

export function ScrollScrubHero({ src, sections }: { src: string; sections: ScrollSection[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [overlayHidden, setOverlayHidden] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let start = 0
    let end = 0
    let span = 1
    let duration = MAX_TIME
    let target = 0
    let current = 0
    let lastTime = performance.now()
    let rafId = 0
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let seeking = false

    function measure() {
      if (!container) return
      start = container.offsetTop
      end = start + container.offsetHeight - window.innerHeight
      span = Math.max(end - start, 1)
    }

    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(measure, 100)
    }

    function onLoadedMetadata() {
      if (!video) return
      duration = Math.min(video.duration || MAX_TIME, MAX_TIME)
      video.pause()
    }
    if (video.readyState >= 1) onLoadedMetadata()
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('seeking', () => { seeking = true })
    video.addEventListener('seeked', () => { seeking = false })

    function update(now: number) {
      rafId = requestAnimationFrame(update)
      const dt = Math.min(0.1, (now - lastTime) / 1000)
      lastTime = now

      const p = Math.min(Math.max((window.scrollY - start) / span, 0), 1)
      target = p

      if (prefersReduced) {
        current = target
      } else {
        current += (target - current) * (1 - Math.exp(-dt * LERP_TAU))
        if (Math.abs(target - current) < SNAP) current = target
      }

      const t = current * Math.min(duration, MAX_TIME)
      if (video && !seeking && Math.abs(video.currentTime - t) > 0.01) {
        try {
          video.currentTime = t
        } catch {
          // ignore seek errors on unsupported browsers
        }
      }

      const idx = Math.min(sections.length - 1, Math.floor(current * sections.length))
      setActiveIndex((prev) => (prev !== idx ? idx : prev))
      setOverlayHidden(window.scrollY > end + window.innerHeight)
    }

    measure()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [sections.length])

  return (
    <>
      <div ref={containerRef} className="nz-scroll-video">
        <video ref={videoRef} className="nz-scroll-video-el" src={src} muted playsInline preload="auto" />
      </div>

      <div className="nz-content-overlay" style={{ display: overlayHidden ? 'none' : 'block' }}>
        {sections.map((section, i) => (
          <div key={section.heading} className={`nz-section-content nz-section-content--${i + 1} ${i === activeIndex ? 'active' : ''}`}>
            <div className="nz-scroll-content">
              {section.eyebrow ? <p className="nz-scroll-eyebrow">{section.eyebrow}</p> : null}
              <h1>{section.heading}</h1>
              <p>{section.body}</p>
              <a className={`nz-btn nz-btn--${section.variant}`} href={section.ctaHref}>
                {section.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
