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
  { id: 'spx', label: 'SPX', x: 800, y: 312, r: 7, accent: 'gold', dur: 6.5, delay: 0 },
  { id: 'tsla', label: 'TSLA', x: 873, y: 244, r: 6, accent: 'white', dur: 7.2, delay: 0.8 },
  { id: 'nvda', label: 'NVDA', x: 990, y: 311, r: 6, accent: 'red', dur: 6.8, delay: 1.4 },
  { id: 'btc', label: 'BTC', x: 1035, y: 420, r: 6, accent: 'gold', dur: 7.6, delay: 0.4 },
  { id: 'eth', label: 'ETH', x: 917, y: 366, r: 7, accent: 'white', dur: 6.2, delay: 2.0 },
  { id: 'qqq', label: 'QQQ', x: 990, y: 529, r: 6, accent: 'red', dur: 7.0, delay: 1.1 },
  { id: 'vix', label: 'VIX', x: 873, y: 596, r: 6, accent: 'gold', dur: 6.6, delay: 1.8 },
  { id: 'dxy', label: 'DXY', x: 857, y: 169, r: 6, accent: 'white', dur: 7.4, delay: 0.6 },

  { id: 'aapl', label: 'AAPL', x: 727, y: 596, r: 5, accent: 'white', dur: 7.1, delay: 0.9 },
  { id: 'meta', label: 'META', x: 610, y: 529, r: 5, accent: 'red', dur: 6.9, delay: 1.6 },
  { id: 'marketmakers', label: 'MARKET MAKERS', x: 917, y: 474, r: 7, accent: 'gold', dur: 7.8, delay: 0.3 },
  { id: 'dealergamma', label: 'DEALER GAMMA', x: 800, y: 420, r: 9, accent: 'gold', dur: 8.2, delay: 0 },
  { id: 'optionsflow', label: 'OPTIONS FLOW', x: 800, y: 528, r: 6, accent: 'white', dur: 7.3, delay: 1.2 },
  { id: 'vanna', label: 'VANNA', x: 565, y: 420, r: 5, accent: 'red', dur: 6.4, delay: 2.1 },
  { id: 'skew', label: 'SKEW', x: 683, y: 474, r: 5, accent: 'white', dur: 7.5, delay: 0.5 },
  { id: 'hedging', label: 'HEDGING', x: 683, y: 366, r: 6, accent: 'gold', dur: 6.7, delay: 1.7 },
  { id: 'openinterest', label: 'OPEN INTEREST', x: 610, y: 311, r: 6, accent: 'white', dur: 7.9, delay: 0.7 },
  { id: 'liquidez', label: 'LIQUIDEZ', x: 1053, y: 256, r: 5, accent: 'red', dur: 6.3, delay: 1.3 },
  { id: 'volatility', label: 'VOLATILITY', x: 727, y: 244, r: 5, accent: 'gold', dur: 7.6, delay: 2.2 },
  { id: 'putwall', label: 'PUT WALL', x: 1130, y: 420, r: 5, accent: 'white', dur: 6.1, delay: 0.4 },
  { id: 'callwall', label: 'CALL WALL', x: 1053, y: 584, r: 5, accent: 'red', dur: 7.0, delay: 1.9 },
  { id: 'spy', label: 'SPY', x: 857, y: 671, r: 6, accent: 'gold', dur: 6.6, delay: 0.2 },
  { id: 'gammaflip', label: 'GAMMA FLIP', x: 635, y: 641, r: 5, accent: 'white', dur: 7.4, delay: 1.5 },
  { id: 'darkpool', label: 'DARK POOL', x: 490, y: 507, r: 5, accent: 'red', dur: 6.9, delay: 0.6 },
  { id: 'whales', label: 'WHALES', x: 490, y: 333, r: 5, accent: 'gold', dur: 7.7, delay: 1.0 },
  { id: '10y', label: '10Y', x: 635, y: 199, r: 5, accent: 'white', dur: 6.5, delay: 2.3 },
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
          <linearGradient id="mnEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8fc9ff" />
            <stop offset="50%" stopColor="#dff0ff" />
            <stop offset="100%" stopColor="#5a9bdb" />
          </linearGradient>
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
