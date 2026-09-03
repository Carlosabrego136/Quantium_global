'use client'

// Static, hand-authored geometry (no Math.random) so server/client markup always matches.

const terrainLines = [
  { y: 730, color: '#4a95ff', opacity: 0.55, dur: '15s' },
  { y: 690, color: '#54a0ff', opacity: 0.65, dur: '13s' },
  { y: 650, color: '#60aeff', opacity: 0.78, dur: '11s' },
  { y: 610, color: '#70bfff', opacity: 0.92, dur: '12s' },
]

const terrainPaths: Record<number, string> = {
  730: 'M -50,730 C 130,704 270,758 440,732 S 730,690 910,726 S 1190,762 1370,720 S 1560,696 1650,732',
  690: 'M -50,676 C 140,714 300,638 480,674 S 760,720 940,670 S 1220,626 1400,672 S 1580,706 1650,664',
  650: 'M -50,684 C 150,650 310,696 490,656 S 770,618 950,660 S 1230,700 1410,652 S 1580,620 1650,658',
  610: 'M -50,632 C 160,594 320,646 500,606 S 780,562 960,610 S 1240,652 1420,602 S 1580,568 1650,606',
  570: 'M -50,592 C 160,540 320,612 500,570 S 780,514 960,576 S 1240,620 1420,566 S 1580,526 1650,572',
  535: 'M -50,556 C 150,590 310,514 490,550 S 770,590 950,538 S 1230,496 1410,542 S 1580,574 1650,528',
  505: 'M -50,522 C 150,554 310,482 490,516 S 770,552 950,504 S 1230,466 1410,508 S 1580,538 1650,496',
  478: 'M -50,488 C 170,462 330,500 510,472 S 790,438 970,476 S 1250,502 1430,462 S 1580,438 1650,474',
}

// coarse vertical mesh connectors linking the terrain band into a net
const meshVerticalsX = [40, 160, 280, 400, 520, 640, 960, 1080, 1200, 1320, 1440, 1560]

const candles = [
  { x: 40, y: 708, h: 30, w: 4, wick: 14, color: '#ffb35a', dur: '5.5s', delay: '0s' },
  { x: 75, y: 690, h: 22, w: 4, wick: 10, color: '#38e0d8', dur: '6.2s', delay: '0.4s' },
  { x: 112, y: 668, h: 36, w: 4, wick: 16, color: '#ff8a4d', dur: '5s', delay: '0.9s' },
  { x: 150, y: 650, h: 20, w: 4, wick: 9, color: '#5fc9ff', dur: '7s', delay: '0.2s' },
  { x: 188, y: 628, h: 28, w: 4, wick: 12, color: '#38e0d8', dur: '6s', delay: '1.1s' },
  { x: 226, y: 610, h: 18, w: 3, wick: 8, color: '#ffb35a', dur: '6.7s', delay: '0.6s' },
  { x: 265, y: 590, h: 26, w: 4, wick: 11, color: '#5fc9ff', dur: '5.9s', delay: '1.4s' },
  { x: 60, y: 568, h: 20, w: 3, wick: 9, color: '#ff8a4d', dur: '6.4s', delay: '0.8s' },
  { x: 300, y: 560, h: 22, w: 4, wick: 10, color: '#38e0d8', dur: '6.1s', delay: '0.3s' },

  { x: 1560, y: 700, h: 28, w: 4, wick: 13, color: '#5fc9ff', dur: '5.8s', delay: '0.3s' },
  { x: 1525, y: 680, h: 34, w: 4, wick: 15, color: '#ff8a4d', dur: '6.5s', delay: '0.7s' },
  { x: 1488, y: 656, h: 20, w: 3, wick: 9, color: '#38e0d8', dur: '5.2s', delay: '1.3s' },
  { x: 1450, y: 638, h: 30, w: 4, wick: 13, color: '#ffb35a', dur: '6.8s', delay: '0.5s' },
  { x: 1412, y: 616, h: 18, w: 3, wick: 8, color: '#5fc9ff', dur: '5.4s', delay: '1s' },
  { x: 1374, y: 594, h: 24, w: 4, wick: 11, color: '#38e0d8', dur: '6.3s', delay: '0.2s' },
  { x: 1336, y: 576, h: 16, w: 3, wick: 7, color: '#ff8a4d', dur: '7.1s', delay: '0.9s' },
  { x: 1580, y: 562, h: 20, w: 3, wick: 9, color: '#ffb35a', dur: '5.6s', delay: '1.2s' },
  { x: 1298, y: 556, h: 22, w: 4, wick: 10, color: '#5fc9ff', dur: '6s', delay: '0.4s' },
]

const particles = [
  { cx: 200, cy: 570, r: 2.2, dur: '3.4s' },
  { cx: 480, cy: 600, r: 2, dur: '3.7s' },
  { cx: 1080, cy: 560, r: 2, dur: '3.8s' },
  { cx: 1380, cy: 550, r: 2.2, dur: '3.5s' },
  { cx: 100, cy: 650, r: 1.8, dur: '3.9s' },
  { cx: 1560, cy: 640, r: 1.9, dur: '3.6s' },
  { cx: 680, cy: 590, r: 1.6, dur: '4.1s' },
  { cx: 900, cy: 610, r: 1.7, dur: '4.4s' },
]

export function NosotrosDigitalField() {
  return (
    <div className="nz-digital-field" aria-hidden="true">
      <svg className="nz-digital-field-svg" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMax slice">
        <defs>
          <filter id="nzGlowSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nzGlowStrong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* perspective floor grid (converging toward the horizon) */}
        <g className="nz-field-grid" filter="url(#nzGlowSoft)" stroke="#7fd0ff" strokeWidth="1.3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x0 = 800 + (i - 4) * 46
            return <line key={`v${i}`} x1={x0} y1={610} x2={800 + (i - 4) * 360} y2={780} opacity={0.6} />
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5
            const y = 613 + t * 167
            const spread = 55 + t * 760
            return <line key={`h${i}`} x1={800 - spread} y1={y} x2={800 + spread} y2={y} opacity={0.44 + t * 0.3} />
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
              strokeWidth="1.5"
              opacity={line.opacity}
              style={{ animationDuration: line.dur }}
            />
          ))}
        </g>

        {/* vertical mesh connectors (turns the contour lines into a woven net) */}
        <g filter="url(#nzGlowSoft)" stroke="#8fd8ff" strokeWidth="1.2">
          {meshVerticalsX.map((x) => (
            <line key={x} x1={x} y1={610} x2={x} y2={738} opacity={0.42} />
          ))}
        </g>

        {/* candlesticks */}
        <g filter="url(#nzGlowStrong)">
          {candles.map((c, i) => (
            <g key={i} className="nz-field-candle" style={{ animationDuration: c.dur, animationDelay: c.delay }}>
              <line x1={c.x} y1={c.y - c.wick} x2={c.x} y2={c.y + c.h + c.wick} stroke={c.color} strokeWidth="0.9" opacity="0.65" />
              <rect x={c.x - c.w / 2} y={c.y} width={c.w} height={c.h} fill={c.color} opacity="0.95" rx="0.5" />
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
