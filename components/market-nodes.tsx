'use client'

import { useEffect, useRef } from 'react'

// Static, hand-authored geometry (no Math.random) so server/client markup always matches.
// Coordinate space: 1600 x 900 viewBox, scaled to the viewport.

type Node = {
  id: string
  label: string
  x: number
  y: number
  r: number
  accent: 'gold' | 'red' | 'white'
  dur: number
  delay: number
}

const nodes: Node[] = [
  { id: 'spx', label: 'SPX', x: 800, y: 327, r: 5, accent: 'gold', dur: 10.1, delay: 0 },
  { id: 'tsla', label: 'TSLA', x: 863, y: 269, r: 4, accent: 'gold', dur: 11.2, delay: 0.8 },
  { id: 'nvda', label: 'NVDA', x: 963, y: 326, r: 4, accent: 'red', dur: 10.5, delay: 1.4 },
  { id: 'btc', label: 'BTC', x: 1002, y: 420, r: 4, accent: 'gold', dur: 11.8, delay: 0.4 },
  { id: 'eth', label: 'ETH', x: 901, y: 374, r: 5, accent: 'red', dur: 9.6, delay: 2.0 },
  { id: 'qqq', label: 'QQQ', x: 963, y: 514, r: 4, accent: 'red', dur: 10.8, delay: 1.1 },
  { id: 'vix', label: 'VIX', x: 863, y: 571, r: 4, accent: 'gold', dur: 10.2, delay: 1.8 },
  { id: 'dxy', label: 'DXY', x: 849, y: 204, r: 4, accent: 'gold', dur: 11.5, delay: 0.6 },

  { id: 'aapl', label: 'AAPL', x: 737, y: 571, r: 4, accent: 'red', dur: 11.0, delay: 0.9 },
  { id: 'meta', label: 'META', x: 637, y: 514, r: 4, accent: 'red', dur: 10.7, delay: 1.6 },
  { id: 'marketmakers', label: 'MARKET MAKERS', x: 901, y: 466, r: 5, accent: 'gold', dur: 12.1, delay: 0.3 },
  { id: 'dealergamma', label: 'DEALER GAMMA', x: 800, y: 420, r: 7, accent: 'gold', dur: 12.7, delay: 0 },
  { id: 'optionsflow', label: 'OPTIONS FLOW', x: 800, y: 513, r: 4, accent: 'gold', dur: 11.3, delay: 1.2 },
  { id: 'vanna', label: 'VANNA', x: 598, y: 420, r: 4, accent: 'red', dur: 9.9, delay: 2.1 },
  { id: 'skew', label: 'SKEW', x: 699, y: 466, r: 4, accent: 'red', dur: 11.6, delay: 0.5 },
  { id: 'hedging', label: 'HEDGING', x: 699, y: 374, r: 4, accent: 'gold', dur: 10.4, delay: 1.7 },
  { id: 'openinterest', label: 'OPEN INTEREST', x: 637, y: 326, r: 4, accent: 'gold', dur: 12.2, delay: 0.7 },
  { id: 'liquidez', label: 'LIQUIDEZ', x: 1018, y: 279, r: 4, accent: 'red', dur: 9.8, delay: 1.3 },
  { id: 'volatility', label: 'VOLATILITY', x: 737, y: 269, r: 4, accent: 'gold', dur: 11.8, delay: 2.2 },
  { id: 'putwall', label: 'PUT WALL', x: 1084, y: 420, r: 4, accent: 'red', dur: 9.5, delay: 0.4 },
  { id: 'callwall', label: 'CALL WALL', x: 1018, y: 561, r: 4, accent: 'red', dur: 10.8, delay: 1.9 },
  { id: 'spy', label: 'SPY', x: 849, y: 636, r: 4, accent: 'gold', dur: 10.2, delay: 0.2 },
  { id: 'gammaflip', label: 'GAMMA FLIP', x: 658, y: 610, r: 4, accent: 'gold', dur: 11.5, delay: 1.5 },
  { id: 'darkpool', label: 'DARK POOL', x: 533, y: 495, r: 4, accent: 'red', dur: 10.7, delay: 0.6 },
  { id: 'whales', label: 'WHALES', x: 533, y: 345, r: 4, accent: 'gold', dur: 11.9, delay: 1.0 },
  { id: '10y', label: '10Y', x: 658, y: 230, r: 4, accent: 'red', dur: 10.1, delay: 2.3 },
]

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))

// A handful of pairs that get a traveling light pulse (data packet), instead of a fixed connecting line
const pulseRoutes: [string, string, number, number][] = [
  ['dealergamma', 'eth', 4.5, 0],
  ['dealergamma', 'marketmakers', 5.2, 1.1],
  ['spx', 'optionsflow', 4.8, 2.3],
  ['spx', 'vix', 5.6, 0.6],
  ['spx', 'btc', 5.0, 1.8],
  ['marketmakers', 'tsla', 6.1, 3.0],
  ['optionsflow', 'whales', 5.4, 2.6],
  ['hedging', 'gammaflip', 4.9, 1.4],
  ['putwall', 'spy', 5.8, 3.4],
  ['btc', 'dxy', 6.3, 0.9],
]

// Large, heavily-blurred foreground particles (depth-of-field bokeh)
const bokeh = [
  { cx: 560, cy: 250, r: 46, accent: 'gold', dur: 14, delay: 0 },
  { cx: 1080, cy: 620, r: 58, accent: 'red', dur: 17, delay: 3 },
  { cx: 1150, cy: 260, r: 34, accent: 'gold', dur: 12.5, delay: 1.6 },
  { cx: 480, cy: 640, r: 40, accent: 'red', dur: 15.5, delay: 4.2 },
  { cx: 800, cy: 700, r: 30, accent: 'gold', dur: 13, delay: 2.4 },
]

export function MarketNodes() {
  const rootRef = useRef<HTMLDivElement>(null)

  // #1: subtle mouse parallax across two depth layers
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onPointerMove(e: PointerEvent) {
      if (!root) return
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      root.style.setProperty('--mn-px', `${nx * 7}px`)
      root.style.setProperty('--mn-py', `${ny * 5}px`)
      root.style.setProperty('--mn-px-far', `${nx * 20}px`)
      root.style.setProperty('--mn-py-far', `${ny * 14}px`)
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div className="market-nodes" aria-hidden="true" ref={rootRef}>
      <svg className="market-nodes-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="mnGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mnBokehBlur" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <radialGradient id="mnGoldMetal" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff6e0" />
            <stop offset="35%" stopColor="#ffbd6b" />
            <stop offset="70%" stopColor="#d9892e" />
            <stop offset="100%" stopColor="#8f5a18" />
          </radialGradient>
          <radialGradient id="mnRedMetal" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffe4d0" />
            <stop offset="35%" stopColor="#ff8f5a" />
            <stop offset="70%" stopColor="#c2542e" />
            <stop offset="100%" stopColor="#7a2f16" />
          </radialGradient>
        </defs>

        {/* #2: out-of-focus bokeh particles — foreground depth layer, reacts more to parallax */}
        <g className="market-bokeh-layer">
          {bokeh.map((b, i) => (
            <circle
              key={i}
              className={`market-bokeh accent-${b.accent}`}
              cx={b.cx}
              cy={b.cy}
              r={b.r}
              filter="url(#mnBokehBlur)"
              style={{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
            />
          ))}
        </g>

        {/* #1: nodes — mid depth layer */}
        <g className="market-node-layer">
          <g className="market-orbit-group">
            {nodes.map((node) => (
              <g key={node.id} className={`market-node-svg accent-${node.accent}`} style={{ animationDuration: `${node.dur}s`, animationDelay: `${node.delay}s` }}>
                <g filter="url(#mnGlow)">
                  <circle
                    className="market-node-svg-dot"
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    style={{ animationDuration: `${node.dur * 0.5}s`, animationDelay: `${node.delay}s` }}
                  />
                </g>
                <g className="market-node-counter" style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
                  <text className="market-node-svg-label" x={node.x + node.r + 8} y={node.y + 4}>
                    {node.label}
                  </text>
                </g>
              </g>
            ))}

            {/* #3: traveling data pulses between select nodes (no fixed lines) */}
            {pulseRoutes.map(([fromId, toId, dur, delay], i) => {
              const a = nodeById[fromId]
              const b = nodeById[toId]
              if (!a || !b) return null
              return (
                <circle key={i} className="market-pulse" r={2.4} filter="url(#mnGlow)">
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    path={`M${a.x},${a.y} L${b.x},${b.y}`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${dur}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}
          </g>
        </g>
      </svg>
    </div>
  )
}
