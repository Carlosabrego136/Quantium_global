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
    let lastFrameTime = 0
    const GOLD: [number, number, number] = [255, 200, 87]
    const GOLD_BRIGHT: [number, number, number] = [255, 224, 150]
    const BLUE: [number, number, number] = [120, 184, 226]
    const SILVER: [number, number, number] = [224, 230, 235]
    // Paleta de líneas: dorado, azul, blanco y negro metálico (gris oscuro con
    // un ligero tinte azulado, para que lea "metálico" y no un negro plano)
    const LINE_GOLD: [number, number, number] = [214, 168, 82]
    const LINE_BLUE: [number, number, number] = [90, 150, 210]
    const LINE_WHITE: [number, number, number] = [232, 236, 240]
    const LINE_METAL_BLACK: [number, number, number] = [30, 32, 38]
    const LINE_PALETTE: [number, number, number][] = [LINE_GOLD, LINE_BLUE, LINE_WHITE, LINE_METAL_BLACK]

    const points = Array.from({ length: 94 }, (_, index) => {
      const isGold = index % 11 === 0
      const isBlue = !isGold && index % 3 === 0

      // Desplazamiento orgánico: varias ondas seno/coseno de distinta frecuencia
      // se suman a la posición base para romper la cuadrícula uniforme y generar
      // "picos" altos y bajos — zonas densas y huecos, como una red fragmentándose.
      const warpX =
        Math.sin(index * 0.9 + 0.4) * 0.075 +
        Math.sin(index * 2.7 + 1.8) * 0.04 +
        Math.sin(index * 5.3 + 0.9) * 0.018
      const warpY =
        Math.cos(index * 1.3 + 1.1) * 0.075 +
        Math.cos(index * 3.1 + 0.6) * 0.04 +
        Math.cos(index * 6.1 + 2.2) * 0.018

      const baseX = 0.03 + ((index * 0.137) % 0.94)
      const baseY = 0.05 + ((index * 0.239) % 0.9)

      return {
        x: Math.min(0.985, Math.max(0.015, baseX + warpX)),
        y: Math.min(0.97, Math.max(0.03, baseY + warpY)),
        phase: index * 1.7,
        pulseSpeed: 0.8 + ((index * 0.382) % 1) * 0.6,
        radius: isGold ? 4.6 : index % 4 === 0 ? 2.6 : 1.5,
        isGold,
        color: isGold ? GOLD : isBlue ? BLUE : SILVER,
        lineColor: LINE_PALETTE[index % LINE_PALETTE.length],
      }
    })
    const pointCount = points.length

    // smooth ease so the pulse breathes instead of ticking sinusoidally raw
    const ease = (t: number) => (Math.sin(t) + 1) / 2

    const MOBILE_BREAKPOINT = 760
    let isMobile = window.innerWidth <= MOBILE_BREAKPOINT

    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0

    // The network no longer drifts/jitters/breathes — every node sits at a fixed
    // spot relative to the others, so its screen position only needs to be
    // computed once per resize instead of on every animation frame. On desktop
    // we additionally spin the whole network as a rigid body around its center,
    // so we keep each node's offset from the center to rotate cheaply per frame.
    const activeX = new Float32Array(pointCount)
    const activeY = new Float32Array(pointCount)
    const offsetX = new Float32Array(pointCount)
    const offsetY = new Float32Array(pointCount)
    // radianes por frame — una vuelta completa cada ~140s a 60fps, giro lento y fluido
    const ROTATION_SPEED = (Math.PI * 2) / (140 * 60)

    // Precomputed connections. Because positions are now static between resizes,
    // the O(n²) distance pass that used to run 60x/sec now runs once per resize —
    // this is what removes the scroll jank on mobile.
    type Line = { i: number; j: number; baseAlpha: number }
    let lines: Line[] = []
    const hubAlpha = new Float32Array(pointCount)

    const computeLayout = () => {
      for (let i = 0; i < pointCount; i++) {
        activeX[i] = points[i].x * width
        activeY[i] = points[i].y * height
        offsetX[i] = activeX[i] - centerX
        offsetY[i] = activeY[i] - centerY
      }

      const threshold = Math.min(width, height) * 0.36
      const thresholdSq = threshold * threshold
      const next: Line[] = []
      const maxHubDist = Math.sqrt(centerX * centerX + centerY * centerY) || 1

      for (let i = 0; i < pointCount; i++) {
        const px = activeX[i]
        const py = activeY[i]

        // distance to the central hub — used to fade its connecting lines
        const hdx = px - centerX
        const hdy = py - centerY
        const hubDist = Math.sqrt(hdx * hdx + hdy * hdy)
        hubAlpha[i] = 0.16 + (1 - Math.min(1, hubDist / maxHubDist)) * 0.22

        for (let j = i + 1; j < pointCount; j++) {
          const dx = px - activeX[j]
          const dy = py - activeY[j]
          const distanceSq = dx * dx + dy * dy
          // squared-distance pre-filter avoids a sqrt() call for the many pairs
          // that are already too far apart to be drawn
          if (distanceSq >= thresholdSq) continue

          const distance = Math.sqrt(distanceSq)
          const proximity = 1 - distance / threshold
          const baseAlpha = Math.min(0.9, Math.max(0.22, proximity * 0.75))
          next.push({ i, j, baseAlpha })
        }
      }

      lines = next
    }

    const resize = () => {
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      // Slightly lower DPR cap on mobile — fewer physical pixels to paint on
      // every frame, which matters more for scroll smoothness than crispness there.
      const ratio = Math.min(window.devicePixelRatio || 2, isMobile ? 2 : 3)
      width = window.innerWidth
      height = window.innerHeight
      centerX = width / 2
      centerY = height / 2
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      computeLayout()
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (timestamp: number) => {
      animationFrame = requestAnimationFrame(draw)

      // Cap to ~30fps on mobile — halves the per-second main-thread work so the
      // canvas never fights the browser for frames while the page is scrolling.
      if (isMobile) {
        if (timestamp - lastFrameTime < 33) return
        lastFrameTime = timestamp
      }

      // Solo en computadora: gira la red completa como un sólido rígido alrededor
      // del centro — como una red neuronal 3D rotando lentamente. Las distancias
      // entre nodos no cambian con una rotación rígida, así que las líneas
      // (topología) y el hubAlpha precalculados siguen siendo válidos.
      if (!isMobile) {
        const angle = frame * ROTATION_SPEED
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        for (let i = 0; i < pointCount; i++) {
          const ox = offsetX[i]
          const oy = offsetY[i]
          activeX[i] = centerX + ox * cos - oy * sin
          activeY[i] = centerY + ox * sin + oy * cos
        }
      }

      context.clearRect(0, 0, width, height)

      // central hub — thin static lines out to every node in the network,
      // cada una tiñendo hacia dorado, azul, blanco o negro metálico
      context.lineWidth = 1
      for (let i = 0; i < pointCount; i++) {
        const px = activeX[i]
        const py = activeY[i]
        const alpha = hubAlpha[i]
        const [lr, lg, lb] = points[i].lineColor

        const grad = context.createLinearGradient(centerX, centerY, px, py)
        grad.addColorStop(0, `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${Math.min(0.55, alpha + 0.2)})`)
        grad.addColorStop(1, `rgba(${lr}, ${lg}, ${lb}, ${alpha})`)
        context.strokeStyle = grad
        context.beginPath()
        context.moveTo(centerX, centerY)
        context.lineTo(px, py)
        context.stroke()
      }

      // connective lines — black, with a bright glint that travels along each line
      context.lineWidth = 1.1
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        const px = activeX[line.i]
        const py = activeY[line.i]
        const ox = activeX[line.j]
        const oy = activeY[line.j]
        const phaseI = points[line.i].phase
        const baseAlpha = line.baseAlpha
        // el color base de la línea alterna entre el nodo de origen y el de
        // destino, así el mismo trazo puede leer dorado en un extremo y azul
        // o blanco en el otro
        const [lr1, lg1, lb1] = points[line.i].lineColor
        const [lr2, lg2, lb2] = points[line.j].lineColor

        // a bright glint travels back and forth along each line at its own pace
        const glintPos = (Math.sin(frame * 0.012 + line.i * 0.63 + phaseI * 0.2) + 1) / 2
        const band = 0.22
        const s0 = Math.max(0, glintPos - band)
        const s2 = Math.min(1, glintPos + band)

        const grad = context.createLinearGradient(px, py, ox, oy)
        grad.addColorStop(0, `rgba(${lr1}, ${lg1}, ${lb1}, ${baseAlpha})`)
        grad.addColorStop(s0, `rgba(${lr1}, ${lg1}, ${lb1}, ${baseAlpha})`)
        grad.addColorStop(glintPos, `rgba(255, 255, 255, ${Math.min(1, baseAlpha + 0.55)})`)
        grad.addColorStop(s2, `rgba(${lr2}, ${lg2}, ${lb2}, ${baseAlpha})`)
        grad.addColorStop(1, `rgba(${lr2}, ${lg2}, ${lb2}, ${baseAlpha})`)

        context.strokeStyle = grad
        if (!isMobile) {
          context.shadowColor = `rgba(${lr1}, ${lg1}, ${lb1}, ${baseAlpha * 0.6})`
          context.shadowBlur = 3
        }
        context.beginPath()
        context.moveTo(px, py)
        context.lineTo(ox, oy)
        context.stroke()
        context.shadowBlur = 0
      }

      // central hub node — bright core with a breathing halo, same treatment as a gold node
      {
        const pulse = ease(frame * 0.02 * 0.95)
        const haloRadius = 6.6 * (2.8 + pulse * 1.6)
        const haloAlpha = 0.16 + pulse * 0.24
        const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, haloRadius)
        halo.addColorStop(0, `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${haloAlpha})`)
        halo.addColorStop(1, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0)`)
        context.fillStyle = halo
        context.beginPath()
        context.arc(centerX, centerY, haloRadius, 0, Math.PI * 2)
        context.fill()

        context.shadowColor = `rgba(255, 214, 130, ${0.75 + pulse * 0.25})`
        context.shadowBlur = 16 + pulse * 14
        context.fillStyle = `rgba(${GOLD_BRIGHT[0]}, ${GOLD_BRIGHT[1]}, ${GOLD_BRIGHT[2]}, ${0.9 + pulse * 0.1})`
        context.beginPath()
        context.arc(centerX, centerY, 6.6 * (0.85 + pulse * 0.25), 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0
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
    }

    animationFrame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-network" />
}
