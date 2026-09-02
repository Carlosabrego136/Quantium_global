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

    // smooth ease so the pulse breathes instead of ticking sinusoidally raw
    const ease = (t: number) => (Math.sin(t) + 1) / 2

    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio || 2, 3)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)

      const active = points.map((point) => ({
        ...point,
        px:
          point.x * width +
          Math.sin(frame * 0.004 * point.driftSpeed + point.phase) * 22 +
          Math.sin(frame * 0.0017 * point.driftSpeed + point.phase * 1.3) * 14,
        py:
          point.y * height +
          Math.cos(frame * 0.0032 * point.driftSpeed + point.phase) * 22 +
          Math.cos(frame * 0.0021 * point.driftSpeed + point.phase * 1.3) * 14,
      }))

      // connective lines — gold links glow brighter and pulse in sync with their node
      context.lineWidth = 0.75
      active.forEach((point, index) => {
        active.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.px - other.px, point.py - other.py)
          const threshold = Math.min(width, height) * 0.27
          if (distance < threshold) {
            const bothGold = point.isGold && other.isGold
            const eitherGold = point.isGold || other.isGold
            const [red, green, blue] = eitherGold ? GOLD : point.color
            const proximity = 1 - distance / threshold
            const basePulse = ease(frame * 0.02 * point.pulseSpeed + point.phase)
            const glowBoost = eitherGold ? 0.25 + basePulse * 0.35 : 0
            const alpha = Math.min(0.85, Math.max(0.1, proximity * (bothGold ? 0.6 : 0.4) + glowBoost * 0.3))
            context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
            if (eitherGold) {
              context.shadowColor = `rgba(255, 205, 110, ${0.4 + basePulse * 0.3})`
              context.shadowBlur = 6 + basePulse * 6
            } else {
              context.shadowBlur = 0
            }
            context.beginPath()
            context.moveTo(point.px, point.py)
            context.lineTo(other.px, other.py)
            context.stroke()
            context.shadowBlur = 0
          }
        })
      })

      // nodes — gold ones get a soft breathing halo plus a crisp bright core for an HD look
      active.forEach((point) => {
        const pulse = ease(frame * 0.02 * point.pulseSpeed + point.phase)
        const [red, green, blue] = point.color

        if (point.isGold) {
          // outer soft halo (large blur, low alpha) — the "glow"
          const haloRadius = point.radius * (2.8 + pulse * 1.6)
          const haloAlpha = 0.14 + pulse * 0.22
          const halo = context.createRadialGradient(point.px, point.py, 0, point.px, point.py, haloRadius)
          halo.addColorStop(0, `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${haloAlpha})`)
          halo.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)
          context.fillStyle = halo
          context.beginPath()
          context.arc(point.px, point.py, haloRadius, 0, Math.PI * 2)
          context.fill()

          // sharp bright core so it still reads crisp/HD, not just a blurry blob
          context.shadowColor = `rgba(255, 214, 130, ${0.75 + pulse * 0.25})`
          context.shadowBlur = 14 + pulse * 14
          context.fillStyle = `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${0.85 + pulse * 0.15})`
          context.beginPath()
          context.arc(point.px, point.py, point.radius * (0.85 + pulse * 0.25), 0, Math.PI * 2)
          context.fill()
          context.shadowBlur = 0
        } else {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.85 * (0.75 + pulse * 0.25)})`
          context.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.9)`
          context.shadowBlur = 8
          context.beginPath()
          context.arc(point.px, point.py, point.radius, 0, Math.PI * 2)
          context.fill()
          context.shadowBlur = 0
        }
      })

      frame += 1
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-network" />
}
