'use client'

type Node = {
  label: string
  top: string
  left: string
  accent: 'gold' | 'red' | 'white'
  duration: number
  delay: number
}

const nodes: Node[] = [
  { label: 'SPX', top: '20%', left: '44%', accent: 'gold', duration: 6.5, delay: 0 },
  { label: 'TSLA', top: '32%', left: '61%', accent: 'white', duration: 7.2, delay: 0.8 },
  { label: 'NVDA', top: '50%', left: '35%', accent: 'red', duration: 6.8, delay: 1.4 },
  { label: 'BTC', top: '41%', left: '68%', accent: 'gold', duration: 7.6, delay: 0.4 },
  { label: 'ETH', top: '59%', left: '53%', accent: 'white', duration: 6.2, delay: 2.0 },
  { label: 'QQQ', top: '27%', left: '29%', accent: 'red', duration: 7.0, delay: 1.1 },
  { label: 'VIX', top: '66%', left: '33%', accent: 'gold', duration: 6.6, delay: 1.8 },
  { label: 'DXY', top: '48%', left: '76%', accent: 'white', duration: 7.4, delay: 0.6 },
]

export function MarketNodes() {
  return (
    <div className="market-nodes" aria-hidden="true">
      {nodes.map((node) => (
        <div
          key={node.label}
          className={`market-node accent-${node.accent}`}
          style={{
            top: node.top,
            left: node.left,
            animationDuration: `${node.duration}s`,
            animationDelay: `${node.delay}s`,
          }}
        >
          <span className="market-node-dot" style={{ animationDuration: `${node.duration * 0.5}s`, animationDelay: `${node.delay}s` }} />
          <span className="market-node-label">{node.label}</span>
        </div>
      ))}
    </div>
  )
}
