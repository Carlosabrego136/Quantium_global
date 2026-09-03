'use client'

// Static, hand-authored geometry (no Math.random) so server/client markup always matches.

const terrainLines = [
  { y: 620, amp: 34, color: '#1f6fff', opacity: 0.28, dur: '14s' },
  { y: 560, amp: 46, color: '#2f8bff', opacity: 0.4, dur: '11s' },
  { y: 500, amp: 58, color: '#3fa9ff', opacity: 0.55, dur: '9s' },
  { y: 445, amp: 42, color: '#5fc9ff', opacity: 0.7, dur: '13s' },
  { y: 400, amp: 26, color: '#8fe3ff', opacity: 0.85, dur: '10s' },
]

const terrainPaths: Record<number, string> = {
  620: 'M -50,620 C 120,586 260,654 430,624 S 720,566 900,616 S 1180,662 1360,610 S 1560,580 1650,624',
  560: 'M -50,566 C 140,606 300,520 480,562 S 760,614 940,556 S 1220,504 1400,558 S 1580,600 1650,552',
  500: 'M -50,528 C 160,468 320,548 500,502 S 780,438 960,506 S 1240,556 1420,498 S 1580,452 1650,504',
  445: 'M -50,458 C 150,494 310,412 490,452 S 770,494 950,438 S 1230,394 1410,444 S 1580,478 1650,430',
  400: 'M -50,416 C 170,388 330,428 510,398 S 790,362 970,402 S 1250,430 1430,388 S 1580,362 1650,400',
}

const candles = [
  { x: 60, y: 610, h: 46, w: 8, wick: 20, color: '#ffb35a', dur: '5.5s', delay: '0s' },
  { x: 110, y: 592, h: 30, w: 7, wick: 14, color: '#38e0d8', dur: '6.2s', delay: '0.4s' },
  { x: 165, y: 560, h: 54, w: 8, wick: 24, color: '#ff8a4d', dur: '5s', delay: '0.9s' },
  { x: 225, y: 545, h: 26, w: 7, wick: 12, color: '#5fc9ff', dur: '7s', delay: '0.2s' },
  { x: 285, y: 520, h: 40, w: 7, wick: 16, color: '#38e0d8', dur: '6s', delay: '1.1s' },
  { x: 1320, y: 600, h: 38, w: 8, wick: 18, color: '#5fc9ff', dur: '5.8s', delay: '0.3s' },
  { x: 1375, y: 578, h: 50, w: 8, wick: 22, color: '#ff8a4d', dur: '6.5s', delay: '0.7s' },
  { x: 1430, y: 555, h: 28, w: 7, wick: 12, color: '#38e0d8', dur: '5.2s', delay: '1.3s' },
  { x: 1485, y: 530, h: 44, w: 8, wick: 20, color: '#ffb35a', dur: '6.8s', delay: '0.5s' },
  { x: 1540, y: 510, h: 24, w: 6, wick: 10, color: '#5fc9ff', dur: '5.4s', delay: '1s' },
]

const particles = [
  { cx: 200, cy: 480, r: 2.2, dur: '3.4s' },
  { cx: 340, cy: 420, r: 1.6, dur: '4.1s' },
  { cx: 480, cy: 510, r: 2, dur: '3.7s' },
  { cx: 620, cy: 380, r: 1.4, dur: '4.6s' },
  { cx: 780, cy: 440, r: 2.4, dur: '3.2s' },
  { cx: 940, cy: 400, r: 1.6, dur: '4.3s' },
  { cx: 1080, cy: 470, r: 2, dur: '3.8s' },
  { cx: 1220, cy: 410, r: 1.5, dur: '4.4s' },
  { cx: 1380, cy: 460, r: 2.2, dur: '3.5s' },
  { cx: 1500, cy: 400, r: 1.7, dur: '4s' },
  { cx: 100, cy: 560, r: 1.8, dur: '3.9s' },
  { cx: 1560, cy: 550, r: 1.9, dur: '3.6s' },
]

export function NosotrosDigitalField() {
  return (
    <div className="nz-digital-field" aria-hidden="true">
      <svg className="nz-digital-field-svg" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice">
        <defs>
          <filter id="nzGlowSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nzGlowStrong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* perspective floor grid */}
        <g className="nz-field-grid" filter="url(#nzGlowSoft)" stroke="#3fa9ff" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x0 = 800 + (i - 4) * 46
            return <line key={`v${i}`} x1={x0} y1={430} x2={800 + (i - 4) * 340} y2={700} opacity={0.22} />
          })}
          {[0, 1, 2, 3, 4].map((i) => {
            const t = i / 4
            const y = 460 + t * 220
            const spread = 60 + t * 700
            return <line key={`h${i}`} x1={800 - spread} y1={y} x2={800 + spread} y2={y} opacity={0.15 + t * 0.15} />
          })}
        </g>

        {/* wireframe terrain contour lines */}
        <g filter="url(#nzGlowSoft)">
          {terrainLines.map((line) => (
            <path
              key={line.y}
              className="nz-field-terrain-line"
              d={terrainPaths[line.y]}
              fill="none"
              stroke={line.color}
              strokeWidth="1.4"
              opacity={line.opacity}
              style={{ animationDuration: line.dur }}
            />
          ))}
        </g>

        {/* candlesticks */}
        <g filter="url(#nzGlowStrong)">
          {candles.map((c, i) => (
            <g key={i} className="nz-field-candle" style={{ animationDuration: c.dur, animationDelay: c.delay }}>
              <line x1={c.x} y1={c.y - c.wick} x2={c.x} y2={c.y + c.h + c.wick} stroke={c.color} strokeWidth="1" opacity="0.6" />
              <rect x={c.x - c.w / 2} y={c.y} width={c.w} height={c.h} fill={c.color} opacity="0.85" rx="0.5" />
            </g>
          ))}
        </g>

        {/* particles */}
        <g filter="url(#nzGlowSoft)">
          {particles.map((p, i) => (
            <circle
              key={i}
              className="nz-field-particle"
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="#bfefff"
              style={{ animationDuration: p.dur }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
