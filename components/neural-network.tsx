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
    const points = Array.from({ length: 94 }, (_, index) => ({
      x: 0.18 + ((index * 0.137) % 0.64),
      y: 0.18 + ((index * 0.239) % 0.64),
      phase: index * 1.7,
      radius: index % 11 === 0 ? 4.2 : index % 4 === 0 ? 2.6 : 1.5,
      color: index % 11 === 0 ? [239, 194, 92] : index % 3 === 0 ? [120, 184, 226] : [224, 230, 235],
    }))

    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      const active = points.map((point) => ({
        ...point,
        px: point.x * width + Math.sin(frame * 0.004 + point.phase) * 7,
        py: point.y * height + Math.cos(frame * 0.003 + point.phase) * 7,
      }))

      context.lineWidth = 0.65
      active.forEach((point, index) => {
        active.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.px - other.px, point.py - other.py)
          if (distance < Math.min(width, height) * 0.24) {
            const [red, green, blue] = point.color
            const alpha = Math.max(0.045, 0.2 - distance / (width * 2.1))
            context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
            context.beginPath()
            context.moveTo(point.px, point.py)
            context.lineTo(other.px, other.py)
            context.stroke()
          }
        })
      })

      active.forEach((point, index) => {
        const pulse = 0.7 + Math.sin(frame * 0.014 + point.phase) * 0.2
        const [red, green, blue] = point.color
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${index % 11 === 0 ? 0.98 : 0.58 * pulse})`
        context.shadowColor = `rgba(${red}, ${green}, ${blue}, .85)`
        context.shadowBlur = index % 11 === 0 ? 22 : 7
        context.beginPath()
        context.arc(point.px, point.py, point.radius, 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0
      })
      frame += 1
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-network" />
}
