'use client'

import { useEffect, useRef, useState } from 'react'

const MAX_FRAMES = 120
const MAX_FRAME_WIDTH = 1280

export function ScrollVideo({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLVideoElement>(null)
  const [framesReady, setFramesReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let frames: ImageBitmap[] = []
    let targetProgress = 0
    let smoothed = 0
    let lastFrameIndex = -1
    let videoSeeking = false
    let rafId = 0
    let objectUrl: string | null = null

    const canvas = canvasRef.current
    const fallbackVideo = fallbackRef.current
    if (!canvas || !fallbackVideo) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resizeCanvas() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      lastFrameIndex = -1
    }

    function drawCover(frame: ImageBitmap) {
      if (!canvas || !ctx) return
      const cw = canvas.width
      const ch = canvas.height
      const s = Math.max(cw / frame.width, ch / frame.height)
      const dw = frame.width * s
      const dh = frame.height * s
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      targetProgress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0
    }

    function onSeeked() {
      videoSeeking = false
    }

    function tick() {
      rafId = requestAnimationFrame(tick)
      smoothed += (targetProgress - smoothed) * 0.1

      if (frames.length > 1) {
        const index = Math.min(Math.round(smoothed * (frames.length - 1)), frames.length - 1)
        if (index !== lastFrameIndex) {
          lastFrameIndex = index
          drawCover(frames[index])
        }
      } else if (fallbackVideo && fallbackVideo.duration && !videoSeeking) {
        const t = smoothed * fallbackVideo.duration
        if (Math.abs(fallbackVideo.currentTime - t) > 0.001) {
          videoSeeking = true
          fallbackVideo.currentTime = t
        }
      }
    }

    async function extractFrames(url: string) {
      const video = document.createElement('video')
      video.src = url
      video.muted = true
      video.playsInline = true
      video.preload = 'auto'

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve()
        video.onerror = () => reject(new Error('video load failed'))
      })

      if (cancelled) return []

      const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth)
      const w = Math.round(video.videoWidth * scale)
      const h = Math.round(video.videoHeight * scale)
      const count = Math.min(Math.max(Math.round(video.duration * 24), 30), MAX_FRAMES)
      const result: ImageBitmap[] = []

      for (let i = 0; i < count; i++) {
        if (cancelled) break
        const time = (i / (count - 1)) * Math.max(video.duration - 0.05, 0)
        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve()
          video.currentTime = time
        })
        if (cancelled) break
        result.push(await createImageBitmap(video, { resizeWidth: w, resizeHeight: h }))
      }

      video.removeAttribute('src')
      video.load()
      return result
    }

    fallbackVideo.addEventListener('seeked', onSeeked)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    onScroll()
    rafId = requestAnimationFrame(tick)
    ;(async () => {
      try {
        const res = await fetch(src)
        if (!res.ok || cancelled) return
        const blob = await res.blob()
        objectUrl = URL.createObjectURL(blob)
        const extracted = await extractFrames(objectUrl)
        if (!cancelled && extracted.length > 1) {
          frames = extracted
          setFramesReady(true)
        }
      } catch {
        // fallback video keeps working
      }
    })()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resizeCanvas)
      fallbackVideo.removeEventListener('seeked', onSeeked)
      frames.forEach((f) => f.close())
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

  return (
    <div className="scroll-video-wrap" style={{ background: '#0a0a0a' }}>
      <video ref={fallbackRef} muted playsInline preload="auto" src={src} className="scroll-video-fallback" style={{ display: framesReady ? 'none' : 'block' }} />
      <canvas ref={canvasRef} className="scroll-video-canvas" style={{ visibility: framesReady ? 'visible' : 'hidden' }} />
      <div className="scroll-video-overlay" />
    </div>
  )
}
