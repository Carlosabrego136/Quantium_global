'use client'

import { useEffect, useRef, type RefObject } from 'react'

const SPEED = 0.8

export function useDragMarquee(trackRef: RefObject<HTMLDivElement | null>) {
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
  }, [trackRef])
}

export function useMarqueeTrackRef() {
  return useRef<HTMLDivElement>(null)
}
