import { ImageResponse } from 'next/og'

export const alt = 'Nosotros — Quantium Global'
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
          background: '#0c0e29',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 100%, rgba(255,180,90,0.28) 0%, rgba(255,180,90,0) 55%), radial-gradient(circle at 90% 0%, rgba(90,140,255,0.22) 0%, rgba(90,140,255,0) 50%)',
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
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.1em', color: '#ffffff' }}>QUANTIUM</span>
          <span style={{ fontSize: 20, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>/ NOSOTROS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 980 }}>
          <span style={{ display: 'flex', fontSize: 58, fontWeight: 500, lineHeight: 1.15, color: '#ffffff', letterSpacing: '-0.02em' }}>
            La mayoría reacciona al mercado.
          </span>
          <span style={{ display: 'flex', fontSize: 58, fontWeight: 500, lineHeight: 1.15, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}>
            Nosotros te ayudamos a anticiparlo.
          </span>
        </div>

        <span style={{ display: 'flex', fontSize: 20, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.55)' }}>
          La historia, la misión y el equipo detrás de Quantium
        </span>
      </div>
    ),
    { ...size }
  )
}
