import { ImageResponse } from 'next/og'

export const alt = 'Quantium — Inteligencia de mercado para operadores activos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 78% 18%, rgba(184,146,90,0.35) 0%, rgba(184,146,90,0) 55%), radial-gradient(circle at 8% 92%, rgba(154,59,46,0.25) 0%, rgba(154,59,46,0) 50%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #b8925a 0%, #efe3c6 100%)',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '0.14em', color: '#ffffff' }}>QUANTIUM</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 980 }}>
          <span
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: '0.08em',
              color: '#b8925a',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Inteligencia de mercado en tiempo real
          </span>
          <span style={{ display: 'flex', fontSize: 58, fontWeight: 700, lineHeight: 1.12, color: '#ffffff', letterSpacing: '-0.02em' }}>
            El flujo de opciones, la gamma del dealer y el dark pool.
          </span>
          <span style={{ display: 'flex', fontSize: 58, fontWeight: 700, lineHeight: 1.12, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
            Todo en una sola pantalla.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          {[
            ['77', 'HERRAMIENTAS'],
            ['11', 'ÁREAS'],
            ['0s', 'DELAY'],
          ].map(([n, l]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 34, fontWeight: 700, color: '#ffffff' }}>{n}</span>
              <span style={{ fontSize: 14, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
