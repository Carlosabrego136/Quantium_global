'use client'

// Static, hand-authored geometry (no Math.random) so server/client markup always matches.

const terrainLines = [
  { y: 640, color: '#1f6fff', opacity: 0.24, dur: '15s' },
  { y: 600, color: '#276fff', opacity: 0.3, dur: '13s' },
  { y: 560, color: '#2f8bff', opacity: 0.38, dur: '11s' },
  { y: 520, color: '#3898ff', opacity: 0.46, dur: '12s' },
  { y: 480, color: '#3fa9ff', opacity: 0.55, dur: '9s' },
  { y: 445, color: '#4fb8ff', opacity: 0.65, dur: '10s' },
  { y: 415, color: '#5fc9ff', opacity: 0.75, dur: '13s' },
  { y: 388, color: '#8fe3ff', opacity: 0.85, dur: '10s' },
]

const terrainPaths: Record<number, string> = {
  640: 'M -50,640 C 130,614 270,668 440,642 S 730,600 910,636 S 1190,672 1370,630 S 1560,606 1650,642',
  600: 'M -50,586 C 140,624 300,548 480,584 S 760,630 940,580 S 1220,536 1400,582 S 1580,616 1650,574',
  560: 'M -50,594 C 150,560 310,606 490,566 S 770,528 950,570 S 1230,610 1410,562 S 1580,530 1650,568',
  520: 'M -50,542 C 160,504 320,556 500,516 S 780,472 960,520 S 1240,562 1420,512 S 1580,478 1650,516',
  480: 'M -50,502 C 160,450 320,522 500,480 S 780,424 960,486 S 1240,530 1420,476 S 1580,436 1650,482',
  445: 'M -50,466 C 150,500 310,424 490,460 S 770,500 950,448 S 1230,406 1410,452 S 1580,484 1650,438',
  415: 'M -50,432 C 150,464 310,392 490,426 S 770,462 950,414 S 1230,376 1410,418 S 1580,448 1650,406',
  388: 'M -50,398 C 170,372 330,410 510,382 S 790,348 970,386 S 1250,412 1430,372 S 1580,348 1650,384',
}

// coarse vertical mesh connectors linking the terrain band into a net
const meshVerticalsX = [40, 160, 280, 400, 520, 640, 960, 1080, 1200, 1320, 1440, 1560]

const candles = [
  { x: 40, y: 618, h: 30, w: 4, wick: 14, color: '#ffb35a', dur: '5.5s', delay: '0s' },
  { x: 75, y: 600, h: 22, w: 4, wick: 10, color: '#38e0d8', dur: '6.2s', delay: '0.4s' },
  { x: 112, y: 578, h: 36, w: 4, wick: 16, color: '#ff8a4d', dur: '5s', delay: '0.9s' },
  { x: 150, y: 560, h: 20, w: 4, wick: 9, color: '#5fc9ff', dur: '7s', delay: '0.2s' },
  { x: 188, y: 538, h: 28, w: 4, wick: 12, color: '#38e0d8', dur: '6s', delay: '1.1s' },
  { x: 226, y: 520, h: 18, w: 3, wick: 8, color: '#ffb35a', dur: '6.7s', delay: '0.6s' },
  { x: 265, y: 500, h: 26, w: 4, wick: 11, color: '#5fc9ff', dur: '5.9s', delay: '1.4s' },
  { x: 60, y: 478, h: 20, w: 3, wick: 9, color: '#ff8a4d', dur: '6.4s', delay: '0.8s' },
  { x: 300, y: 470, h: 22, w: 4, wick: 10, color: '#38e0d8', dur: '6.1s', delay: '0.3s' },

  { x: 1560, y: 610, h: 28, w: 4, wick: 13, color: '#5fc9ff', dur: '5.8s', delay: '0.3s' },
  { x: 1525, y: 590, h: 34, w: 4, wick: 15, color: '#ff8a4d', dur: '6.5s', delay: '0.7s' },
  { x: 1488, y: 566, h: 20, w: 3, wick: 9, color: '#38e0d8', dur: '5.2s', delay: '1.3s' },
  { x: 1450, y: 548, h: 30, w: 4, wick: 13, color: '#ffb35a', dur: '6.8s', delay: '0.5s' },
  { x: 1412, y: 526, h: 18, w: 3, wick: 8, color: '#5fc9ff', dur: '5.4s', delay: '1s' },
  { x: 1374, y: 504, h: 24, w: 4, wick: 11, color: '#38e0d8', dur: '6.3s', delay: '0.2s' },
  { x: 1336, y: 486, h: 16, w: 3, wick: 7, color: '#ff8a4d', dur: '7.1s', delay: '0.9s' },
  { x: 1580, y: 472, h: 20, w: 3, wick: 9, color: '#ffb35a', dur: '5.6s', delay: '1.2s' },
  { x: 1298, y: 466, h: 22, w: 4, wick: 10, color: '#5fc9ff', dur: '6s', delay: '0.4s' },
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
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nzGlowStrong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* perspective floor grid (converging toward the horizon) */}
        <g className="nz-field-grid" filter="url(#nzGlowSoft)" stroke="#4fb8ff" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x0 = 800 + (i - 4) * 46
            return <line key={`v${i}`} x1={x0} y1={388} x2={800 + (i - 4) * 360} y2={700} opacity={0.3} />
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5
            const y = 400 + t * 280
            const spread = 55 + t * 760
            return <line key={`h${i}`} x1={800 - spread} y1={y} x2={800 + spread} y2={y} opacity={0.2 + t * 0.18} />
          })}
        </g>

        {/* wireframe terrain contour lines (the horizontal weave of the mesh) */}
        <g filter="url(#nzGlowSoft)">
          {terrainLines.map((line) => (
            <path
              key={line.y}
              className="nz-field-terrain-line"
              d={terrainPaths[line.y]}
              fill="none"
              stroke={line.color}
              strokeWidth="1.3"
              opacity={line.opacity}
              style={{ animationDuration: line.dur }}
            />
          ))}
        </g>

        {/* vertical mesh connectors (turns the contour lines into a woven net) */}
        <g filter="url(#nzGlowSoft)" stroke="#5fc9ff" strokeWidth="0.9">
          {meshVerticalsX.map((x) => (
            <line key={x} x1={x} y1={388} x2={x} y2={648} opacity={0.16} />
          ))}
        </g>

        {/* candlesticks */}
        <g filter="url(#nzGlowStrong)">
          {candles.map((c, i) => (
            <g key={i} className="nz-field-candle" style={{ animationDuration: c.dur, animationDelay: c.delay }}>
              <line x1={c.x} y1={c.y - c.wick} x2={c.x} y2={c.y + c.h + c.wick} stroke={c.color} strokeWidth="0.8" opacity="0.55" />
              <rect x={c.x - c.w / 2} y={c.y} width={c.w} height={c.h} fill={c.color} opacity="0.88" rx="0.5" />
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
