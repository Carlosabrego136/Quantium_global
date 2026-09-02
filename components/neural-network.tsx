'use client'

import { useEffect, useRef } from 'react'

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let frame = 0
    let animationFrame = 0
    const GOLD: [number, number, number] = [255, 200, 87]
    const GOLD_BRIGHT: [number, number, number] = [255, 224, 150]
    const BLUE: [number, number, number] = [120, 184, 226]
    const SILVER: [number, number, number] = [224, 230, 235]

    const points = Array.from({ length: 94 }, (_, index) => {
      const isGold = index % 11 === 0
      const isBlue = !isGold && index % 3 === 0
      return {
        x: 0.03 + ((index * 0.137) % 0.94),
        y: 0.05 + ((index * 0.239) % 0.9),
        phase: index * 1.7,
        // slightly randomized speed per-point so the drift never looks mechanical/looped
        driftSpeed: 0.85 + ((index * 0.618) % 1) * 0.4,
        pulseSpeed: 0.8 + ((index * 0.382) % 1) * 0.6,
        radius: isGold ? 4.6 : index % 4 === 0 ? 2.6 : 1.5,
        isGold,
        color: isGold ? GOLD : isBlue ? BLUE : SILVER,
      }
    })
    const pointCount = points.length

    // smooth ease so the pulse breathes instead of ticking sinusoidally raw
    const ease = (t: number) => (Math.sin(t) + 1) / 2

    const MOBILE_BREAKPOINT = 760
    let isMobile = window.innerWidth <= MOBILE_BREAKPOINT

    // Canvas size + DPR are cached and only recomputed on resize — resizing a canvas
    // every animation frame (as before) forces a full reallocation + context reset
    // 60x/sec, which was the single biggest cost in this component.
    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 2, 3)
      width = window.innerWidth
      height = window.innerHeight
      centerX = width / 2
      centerY = height / 2
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT
    }
    resize()
    window.addEventListener('resize', resize)

    // Reused every frame instead of the old points.map()/.slice() pattern, which
    // allocated a brand-new array on every single frame (heavy GC churn).
    const activeX = new Float32Array(pointCount)
    const activeY = new Float32Array(pointCount)

    const draw = () => {
      context.clearRect(0, 0, width, height)

      // On mobile the layout stays put (no drift/jitter/breathing) — only the
      // traveling glints on the lines and the gold node pulse keep animating.
      const breathe = isMobile ? 1 : 1 + Math.sin(frame * 0.006) * 0.16 + Math.sin(frame * 0.0037 + 1.4) * 0.07

      for (let i = 0; i < pointCount; i++) {
        const point = points[i]
        const anchorX = point.x * width
        const anchorY = point.y * height

        if (isMobile) {
          activeX[i] = anchorX
          activeY[i] = anchorY
          continue
        }

        const dx = anchorX - centerX
        const dy = anchorY - centerY

        // chaotic, multi-directional jitter — three mismatched sine waves per axis so
        // each node wanders unpredictably instead of tracing a clean ellipse
        const jitterX =
          Math.sin(frame * 0.006 * point.driftSpeed + point.phase) * 32 +
          Math.sin(frame * 0.0021 * point.driftSpeed + point.phase * 2.1) * 22 +
          Math.sin(frame * 0.0043 * point.driftSpeed * 1.6 + point.phase * 0.6) * 16

        const jitterY =
          Math.cos(frame * 0.0048 * point.driftSpeed + point.phase * 1.4) * 32 +
          Math.cos(frame * 0.0026 * point.driftSpeed + point.phase * 0.8) * 22 +
          Math.cos(frame * 0.0039 * point.driftSpeed * 1.3 + point.phase * 2.3) * 16

        activeX[i] = centerX + dx * breathe + jitterX
        activeY[i] = centerY + dy * breathe + jitterY
      }

      // connective lines — black, with a bright glint that travels along each line
      context.lineWidth = 1.1
      const threshold = Math.min(width, height) * 0.36
      const thresholdSq = threshold * threshold

      for (let i = 0; i < pointCount; i++) {
        const px = activeX[i]
        const py = activeY[i]
        const phaseI = points[i].phase

        for (let j = i + 1; j < pointCount; j++) {
          const ox = activeX[j]
          const oy = activeY[j]
          const dx = px - ox
          const dy = py - oy
          const distanceSq = dx * dx + dy * dy
          // squared-distance pre-filter avoids a sqrt() call for the many pairs
          // that are already too far apart to be drawn
          if (distanceSq >= thresholdSq) continue

          const distance = Math.sqrt(distanceSq)
          const proximity = 1 - distance / threshold
          const baseAlpha = Math.min(0.9, Math.max(0.22, proximity * 0.75))

          // a bright glint travels back and forth along each line at its own pace
          const glintPos = (Math.sin(frame * 0.012 + i * 0.63 + phaseI * 0.2) + 1) / 2
          const band = 0.22
          const s0 = Math.max(0, glintPos - band)
          const s2 = Math.min(1, glintPos + band)

          const grad = context.createLinearGradient(px, py, ox, oy)
          grad.addColorStop(0, `rgba(8, 8, 10, ${baseAlpha})`)
          grad.addColorStop(s0, `rgba(8, 8, 10, ${baseAlpha})`)
          grad.addColorStop(glintPos, `rgba(255, 255, 255, ${Math.min(1, baseAlpha + 0.55)})`)
          grad.addColorStop(s2, `rgba(8, 8, 10, ${baseAlpha})`)
          grad.addColorStop(1, `rgba(8, 8, 10, ${baseAlpha})`)

          context.strokeStyle = grad
          context.shadowColor = `rgba(0, 0, 0, ${baseAlpha * 0.6})`
          context.shadowBlur = 3
          context.beginPath()
          context.moveTo(px, py)
          context.lineTo(ox, oy)
          context.stroke()
          context.shadowBlur = 0
        }
      }

      // nodes — gold ones get a soft breathing halo plus a crisp bright core for an HD look
      for (let i = 0; i < pointCount; i++) {
        const point = points[i]
        const px = activeX[i]
        const py = activeY[i]
        const pulse = ease(frame * 0.02 * point.pulseSpeed + point.phase)
        const [red, green, blue] = point.color

        if (point.isGold) {
          // outer soft halo (large blur, low alpha) — the "glow"
          const haloRadius = point.radius * (2.8 + pulse * 1.6)
          const haloAlpha = 0.14 + pulse * 0.22
          const halo = context.createRadialGradient(px, py, 0, px, py, haloRadius)
          halo.addColorStop(0, `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${haloAlpha})`)
          halo.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)
          context.fillStyle = halo
          context.beginPath()
          context.arc(px, py, haloRadius, 0, Math.PI * 2)
          context.fill()

          // sharp bright core so it still reads crisp/HD, not just a blurry blob
          context.shadowColor = `rgba(255, 214, 130, ${0.75 + pulse * 0.25})`
          context.shadowBlur = 14 + pulse * 14
          context.fillStyle = `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${0.85 + pulse * 0.15})`
          context.beginPath()
          context.arc(px, py, point.radius * (0.85 + pulse * 0.25), 0, Math.PI * 2)
          context.fill()
          context.shadowBlur = 0
        } else {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.85 * (0.75 + pulse * 0.25)})`
          context.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.9)`
          context.shadowBlur = 8
          context.beginPath()
          context.arc(px, py, point.radius, 0, Math.PI * 2)
          context.fill()
          context.shadowBlur = 0
        }
      }

      frame += 1
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-network" />
}
