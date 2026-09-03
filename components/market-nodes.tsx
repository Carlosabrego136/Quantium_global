'use client'

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
  { id: 'spx', label: 'SPX', x: 700, y: 190, r: 7, accent: 'gold', dur: 6.5, delay: 0 },
  { id: 'tsla', label: 'TSLA', x: 990, y: 260, r: 6, accent: 'white', dur: 7.2, delay: 0.8 },
  { id: 'nvda', label: 'NVDA', x: 560, y: 400, r: 6, accent: 'red', dur: 6.8, delay: 1.4 },
  { id: 'btc', label: 'BTC', x: 1100, y: 330, r: 6, accent: 'gold', dur: 7.6, delay: 0.4 },
  { id: 'eth', label: 'ETH', x: 850, y: 470, r: 7, accent: 'white', dur: 6.2, delay: 2.0 },
  { id: 'qqq', label: 'QQQ', x: 460, y: 220, r: 6, accent: 'red', dur: 7.0, delay: 1.1 },
  { id: 'vix', label: 'VIX', x: 530, y: 540, r: 6, accent: 'gold', dur: 6.6, delay: 1.8 },
  { id: 'dxy', label: 'DXY', x: 1230, y: 380, r: 6, accent: 'white', dur: 7.4, delay: 0.6 },

  { id: 'aapl', label: 'AAPL', x: 370, y: 340, r: 5, accent: 'white', dur: 7.1, delay: 0.9 },
  { id: 'meta', label: 'META', x: 640, y: 300, r: 5, accent: 'red', dur: 6.9, delay: 1.6 },
  { id: 'marketmakers', label: 'MARKET MAKERS', x: 900, y: 150, r: 7, accent: 'gold', dur: 7.8, delay: 0.3 },
  { id: 'dealergamma', label: 'DEALER GAMMA', x: 750, y: 380, r: 9, accent: 'gold', dur: 8.2, delay: 0 },
  { id: 'optionsflow', label: 'OPTIONS FLOW', x: 470, y: 470, r: 6, accent: 'white', dur: 7.3, delay: 1.2 },
  { id: 'vanna', label: 'VANNA', x: 830, y: 220, r: 5, accent: 'red', dur: 6.4, delay: 2.1 },
  { id: 'skew', label: 'SKEW', x: 700, y: 480, r: 5, accent: 'white', dur: 7.5, delay: 0.5 },
  { id: 'hedging', label: 'HEDGING', x: 990, y: 470, r: 6, accent: 'gold', dur: 6.7, delay: 1.7 },
  { id: 'openinterest', label: 'OPEN INTEREST', x: 850, y: 180, r: 6, accent: 'white', dur: 7.9, delay: 0.7 },
  { id: 'liquidez', label: 'LIQUIDEZ', x: 1060, y: 220, r: 5, accent: 'red', dur: 6.3, delay: 1.3 },
  { id: 'volatility', label: 'VOLATILITY', x: 620, y: 570, r: 5, accent: 'gold', dur: 7.6, delay: 2.2 },
  { id: 'putwall', label: 'PUT WALL', x: 600, y: 620, r: 5, accent: 'white', dur: 6.1, delay: 0.4 },
  { id: 'callwall', label: 'CALL WALL', x: 780, y: 610, r: 5, accent: 'red', dur: 7.0, delay: 1.9 },
  { id: 'spy', label: 'SPY', x: 700, y: 650, r: 6, accent: 'gold', dur: 6.6, delay: 0.2 },
  { id: 'gammaflip', label: 'GAMMA FLIP', x: 920, y: 570, r: 5, accent: 'white', dur: 7.4, delay: 1.5 },
  { id: 'darkpool', label: 'DARK POOL', x: 1160, y: 500, r: 5, accent: 'red', dur: 6.9, delay: 0.6 },
  { id: 'whales', label: 'WHALES', x: 340, y: 470, r: 5, accent: 'gold', dur: 7.7, delay: 1.0 },
  { id: '10y', label: '10Y', x: 1210, y: 250, r: 5, accent: 'white', dur: 6.5, delay: 2.3 },
]

const edges: [string, string][] = [
  ['dealergamma', 'eth'],
  ['dealergamma', 'marketmakers'],
  ['dealergamma', 'vanna'],
  ['dealergamma', 'liquidez'],
  ['dealergamma', 'openinterest'],
  ['dealergamma', 'spx'],
  ['marketmakers', 'tsla'],
  ['marketmakers', 'aapl'],
  ['marketmakers', 'meta'],
  ['spx', 'optionsflow'],
  ['spx', 'skew'],
  ['spx', 'vix'],
  ['spx', 'volatility'],
  ['spx', 'putwall'],
  ['spx', 'callwall'],
  ['spx', 'qqq'],
  ['spx', 'btc'],
  ['spx', 'hedging'],
  ['spx', 'nvda'],
  ['optionsflow', 'aapl'],
  ['optionsflow', 'whales'],
  ['hedging', 'nvda'],
  ['hedging', 'gammaflip'],
  ['hedging', 'darkpool'],
  ['qqq', 'btc'],
  ['putwall', 'spy'],
  ['callwall', 'spy'],
  ['btc', 'dxy'],
  ['dxy', '10y'],
]

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))

export function MarketNodes() {
  return (
    <div className="market-nodes" aria-hidden="true">
      <svg className="market-nodes-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="mnGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="market-edges" filter="url(#mnGlow)">
          {edges.map(([fromId, toId], i) => {
            const a = nodeById[fromId]
            const b = nodeById[toId]
            if (!a || !b) return null
            return (
              <line
                key={`${fromId}-${toId}`}
                className="market-edge-line"
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                style={{ animationDelay: `${(i % 7) * 0.4}s` }}
              />
            )
          })}
        </g>

        <g>
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
              <text className="market-node-svg-label" x={node.x + node.r + 8} y={node.y + 4}>
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
