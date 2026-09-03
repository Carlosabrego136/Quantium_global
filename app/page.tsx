'use client'

import { ArrowUpRight, Menu, Share2 } from 'lucide-react'
import { VideoBackground } from '@/components/video-background'
import { MarketNodes } from '@/components/market-nodes'
import { FadeUp } from '@/components/fade-up'

const ticker = ['SPX 5,482.10 +0.42%', 'VIX 13.86 -2.10%', 'QQQ 481.27 +0.61%', 'NVDA 138.44 +1.85%', 'TSLA 243.90 -0.77%', 'BTC 71,240 +2.14%', 'ETH 3,802 +1.02%', 'DXY 104.12 -0.18%', '10Y 4.28% +0.03', 'GAMMA FLIP 7,410']

const tools = [
  { number: '01', title: 'Flujo de Opciones', text: 'Cada trade grande, en el instante en que ocurre. Calls vs puts, primas, sweeps y whales, con el drift del flujo.', image: '/cards/flujo-opciones.jpg', icon: null, accent: 'gold' },
  { number: '02', title: 'Superficie de Gamma 3D', text: 'La exposición del dealer como paisaje: dónde el mercado se pega y dónde se suelta. Gamma, vanna y charm por strike y vencimiento.', image: '/cards/gamma-dealer.jpg', icon: null, accent: 'white' },
  { number: '03', title: 'Dark Pool', text: 'El volumen que no ves en la cinta. Prints y niveles institucionales.', image: '/cards/dark-pool.jpg', icon: null, accent: 'red' },
  { number: '04', title: 'Volatilidad', text: 'Skew, estructura temporal y superficie IV. VRP y estacionalidad.', image: '/cards/volatilidad.jpg', icon: null, accent: 'white' },
  { number: '05', title: 'Macro', text: 'Curva de bonos, crédito, Fed Watch. El régimen, de un vistazo.', image: '/cards/macro.jpg', icon: null, accent: 'gold' },
  { number: '06', title: 'Cripto', text: 'Liquidaciones, funding, gamma y bookmap de BTC / ETH.', image: '/cards/cripto.jpg', icon: null, accent: 'red' },
] as const

const moreTools = [
  ['07', 'Insider & Congreso', 'Qué compran los ejecutivos y los políticos, con su reporte y su retraso.'],
  ['08', 'Forex & Fed Watch', 'Fuerza de divisas, trades bancarios y la curva de probabilidad de la Fed.'],
  ['09', 'Niveles de Mercado', 'Gamma flip, call y put wall, max pain. Dónde están los imanes del precio.'],
  ['10', 'Equities', 'Exposición y gamma por acción. La foto del posicionamiento, sin ruido.'],
  ['11', 'Posicionamiento', 'Cómo está parado el mercado: open interest, net drift y sesgo por vencimiento.'],
]

const faqs = [
  ['¿Qué es Quantium Global?', 'Una plataforma de inteligencia financiera en tiempo real: options flow, superficies de gamma 3D, dark pool, volatilidad y macro. 77 herramientas de grado institucional en una sola pantalla.'],
  ['¿Necesito ser trader profesional?', 'No. Traducimos datos complejos a lenguaje simple. Si operas acciones, opciones, futuros o cripto y quieres ver qué hacen los grandes antes que el mercado, Quantium es para ti.'],
  ['¿De dónde vienen los datos?', 'De fuentes de grado institucional (UnusualWhales, Convex, QuantData, Yahoo Finance, FRED, Binance) procesadas en tiempo real. Sin delay.'],
  ['¿Puedo probarlo gratis?', 'Por ahora estamos en acceso anticipado, sin plan gratuito ni registro abierto. El acceso completo llega junto con el lanzamiento comercial.'],
  ['¿Funciona en el celular?', 'Sí, el tablero es responsivo. Aunque para exprimir las superficies 3D y los heatmaps, la pantalla grande vuela.'],
]

const premiumFeatures = [
  'Flujo Inusual: escáner UOA y Whale',
  'Dark Pool: bloques ocultos y sus niveles',
  'Insider & Congreso: políticos, ejecutivos y 13F',
  'Vol Surface: volatilidad implícita por activo',
  'Niveles de Mercado y JPM Collar',
  'Forex: fortaleza de divisas y trades de bancos',
  'Datos en tiempo real e histórico completo',
  'Alertas en tiempo real y soporte prioritario',
]

const heroWords = 'El flujo de opciones, la gamma del dealer y el dark pool. Todo en una sola pantalla.'.split(' ')
const statementWords = 'CADA ORDEN GRANDE, EN SU NIVEL.'.split(' ')
const servicesWords = 'TODO EL FLUJO DEL MERCADO EN UN MISMO IDIOMA.'.split(' ')

const testimonials = [
  ['Trader de opciones, acceso anticipado', 'Dejé de saltar entre cuatro pestañas. El flujo y la gamma en una sola pantalla me ahorra minutos clave cuando el mercado se mueve rápido.', 'gold'],
  ['Gestor de portafolio, acceso anticipado', 'La superficie de gamma en 3D hace obvio algo que antes tenía que reconstruir a mano con hojas de cálculo.', 'white'],
  ['Trader de cripto, acceso anticipado', 'El bookmap de BTC y ETH junto con las liquidaciones me da el mismo tipo de lectura que uso en opciones, aplicado a cripto.', 'red'],
] as const

const marketLevels = [
  ['7,090', 'SPX · dealer put floor'],
  ['7,890', 'SPX · call resistance'],
  ['7,410', 'SPX · zero gamma'],
  ['760', 'SPY · muro de calls'],
]

const navPrimary = [
  ['HERRAMIENTAS', '#herramientas'],
  ['GAMMA', '#gamma'],
  ['FAQ', '#faq'],
  ['PLANES', '#planes'],
]
const navSecondary = [
  ['ENTRAR', '#planes'],
  ['SOLICITAR ACCESO', '#planes'],
]

export default function Page() {
  return (
    <div className="site-shell">
      <VideoBackground />
      <MarketNodes />

      <header className="site-nav">
        <FadeUp as="span" delay={0} className="nav-brand">
          <a href="#top">
            <img src="/brand/logo.jpg" alt="Quantium" className="brand-mark" />
            QUANTIUM
          </a>
        </FadeUp>
        <nav className="nav-links nav-links-primary" aria-label="Navegación principal">
          {navPrimary.map(([label, href], i) => (
            <FadeUp as="span" key={label} delay={0.05 + i * 0.05}>
              <a href={href}>{label}</a>
            </FadeUp>
          ))}
        </nav>
        <nav className="nav-links nav-links-secondary" aria-label="Acciones">
          {navSecondary.map(([label, href], i) => (
            <FadeUp as="span" key={label} delay={0.3 + i * 0.05}>
              <a href={href}>{label}</a>
            </FadeUp>
          ))}
        </nav>
        <button className="menu-button" aria-label="Abrir menú">
          <Menu size={18} />
        </button>
      </header>

      <section id="top" className="section-hero">
        <div className="hero-overlay">
          <div className="hero-overlay-inner">
            <div className="hero-row">
              <div className="hero-col-left">
                <h1>
                  {heroWords.map((word, i) => (
                    <FadeUp as="span" key={`${word}-${i}`} delay={0.1 + i * 0.02} y={16}>
                      {word}{' '}
                    </FadeUp>
                  ))}
                </h1>
                <FadeUp as="span" delay={0.5} className="slide-counter">
                  001 / 005
                </FadeUp>
              </div>
              <div className="hero-col-right">
                <FadeUp as="p" delay={0.25}>
                  77 herramientas de análisis sobre opciones, volatilidad, macro y cripto. Los mismos datos que mira una mesa institucional, sin la terminal de una mesa institucional.
                </FadeUp>
                <FadeUp delay={0.4} className="hero-buttons">
                  <a className="btn-primary" href="#planes">
                    Solicitar acceso
                  </a>
                  <a className="btn-secondary" href="#herramientas">
                    Ver 77 herramientas
                  </a>
                </FadeUp>
              </div>
            </div>
            <FadeUp delay={0.55} className="hero-ticker" aria-label="Mercado en vivo">
              <div className="ticker-track">
                {ticker.concat(ticker).map((item, index) => (
                  <span key={`${item}-${index}`}>
                    {item} <b>/</b>
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
        <FadeUp as="p" delay={0.6} className="hero-bottom-text">
          Inteligencia de mercado para operadores activos.
        </FadeUp>
      </section>

      <section id="gamma" className="section-gamma">
        <FadeUp as="p" delay={0} className="eyebrow-light">
          Superficie de gamma · 3D
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="gamma-heading">
          La exposición del dealer, por strike y vencimiento.
        </FadeUp>
        <FadeUp delay={0.25} className="gamma-copy">
          <p>Dónde el mercado se pega y dónde se suelta. La gamma de los dealers convertida en relieve, en 3D.</p>
          <a className="btn-secondary btn-secondary-light" href="#herramientas">
            Ver superficies <ArrowUpRight size={14} />
          </a>
        </FadeUp>
      </section>

      <section id="cobertura" className="section-statement">
        <div className="statement-inner">
          <FadeUp as="p" delay={0.05} className="eyebrow-light">
            Flujo &amp; volumen
          </FadeUp>
          <h2 className="statement-heading">
            {statementWords.map((word, i) => (
              <FadeUp as="span" key={`${word}-${i}`} delay={0.15 + i * 0.08} y={32}>
                {word}
              </FadeUp>
            ))}
          </h2>
          <FadeUp as="p" delay={0.9} className="statement-sub">
            El volumen que mueve el precio: sweeps, bloques y dark pool, por strike y por nivel, en tres dimensiones.
          </FadeUp>
          <FadeUp delay={1.0}>
            <a className="btn-secondary btn-secondary-light" href="#herramientas" style={{ marginTop: 24 }}>
              Ver el flujo <ArrowUpRight size={14} />
            </a>
          </FadeUp>
          <FadeUp delay={1.15} className="statement-proof">
            {[
              ['77', 'herramientas de análisis'],
              ['11', 'áreas conectadas'],
              ['0s', 'delay en los datos'],
            ].map(([number, label]) => (
              <div className="proof-item-light" key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      <section id="herramientas" className="section-services">
        <FadeUp delay={0} className="services-counter">
          La plataforma
        </FadeUp>
        <div className="services-head-row">
          <h2 className="services-head-col">
            {servicesWords.map((word, i) => (
              <FadeUp as="span" key={`${word}-${i}`} delay={0.1 + i * 0.1} y={28}>
                {word}
              </FadeUp>
            ))}
          </h2>
          <FadeUp as="p" delay={0.25} className="services-head-note">
            Once áreas de análisis, conectadas entre sí y bajo la misma piel. Cada una con sus propias herramientas.
          </FadeUp>
        </div>

        <div className="cards-grid">
          {tools.map(({ number, title, text, image, icon: Icon, accent }, idx) => (
            <FadeUp key={number} delay={0.4 + idx * 0.15} className={`service-card accent-${accent}`}>
              <div className="card-media">
                {Icon ? (
                  <div className="card-media-placeholder">
                    <Icon size={34} strokeWidth={1.4} />
                  </div>
                ) : (
                  <img src={image} alt={title} loading="lazy" />
                )}
              </div>
              <div className="card-text">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="tool-list-extra">
          {moreTools.map(([number, title, text], idx) => (
            <article className={`tool-row-light accent-${['gold', 'red', 'white'][idx % 3]}`} key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight size={16} />
            </article>
          ))}
        </div>

        <div className="stat-strip-light">
          <div className="stat-strip-head-light">
            <p className="eyebrow-dark">— Niveles clave del mercado</p>
            <span className="live-dark">● actualización en vivo</span>
          </div>
          <div className="stats-grid-light">
            {marketLevels.map(([value, label], idx) => (
              <article className="stat-card-light" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
                <div className={`stat-line-light accent-${['gold', 'red', 'white', 'gold'][idx % 4]}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quienes-lo-usan" className="section-method">
        <FadeUp as="p" delay={0} className="eyebrow-dark">
          Quiénes lo usan
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="method-heading">
          Quiénes lo usan.
        </FadeUp>
        <div className="testimonial-grid">
          {testimonials.map(([role, quote, accent], i) => (
            <FadeUp key={role} delay={0.2 + i * 0.1} className={`testimonial-card accent-${accent}`}>
              <p className="testimonial-quote">“{quote}”</p>
              <p className="testimonial-role">{role}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="faq" className="section-method">
        <FadeUp as="p" delay={0} className="eyebrow-dark">
          Preguntas frecuentes
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="method-heading">
          Todo lo que quieres saber.
        </FadeUp>
        <div className="method-list-light">
          {faqs.map(([question, answer], i) => (
            <FadeUp key={question} delay={0.2 + i * 0.08} className={`faq-row accent-${['gold', 'red', 'white'][i % 3]}`}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="planes" className="section-plans">
        <FadeUp as="p" delay={0} className="eyebrow-dark">
          Precios
        </FadeUp>
        <FadeUp as="h2" delay={0.05} className="plans-heading">
          Empieza a leer el flujo.
        </FadeUp>
        <FadeUp as="p" delay={0.1} className="plans-note">
          Un plan Premium con acceso completo a la plataforma.
        </FadeUp>
        <div className="plan-single">
          <FadeUp delay={0.2} className="plan-card accent-gold">
            <div className="plan-media">
              <img src="/cards/premium.jpg" alt="Plan Premium" loading="lazy" />
            </div>
            <p className="eyebrow-dark">Plan Premium</p>
            <strong>
              Próximamente
            </strong>
            <p className="plan-desc">Acceso a las 77 herramientas, con datos en tiempo real e histórico completo.</p>
            <ul>
              {premiumFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a className="btn-primary" href="mailto:hello@quantium.global">
              Solicitar acceso anticipado <ArrowUpRight size={14} />
            </a>
          </FadeUp>
        </div>
      </section>

      <section className="section-cta">
        <FadeUp as="p" delay={0} className="eyebrow-light">
          El siguiente movimiento
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="cta-heading">
          Deja de operar con la mitad de la información.
        </FadeUp>
        <FadeUp as="p" delay={0.2} className="cta-sub">
          El posicionamiento de los dealers ya existe en el mercado. Nosotros lo ponemos en tu pantalla.
        </FadeUp>
        <FadeUp delay={0.3}>
          <a className="btn-primary" href="mailto:hello@quantium.global">
            Solicitar acceso <ArrowUpRight size={14} />
          </a>
        </FadeUp>
      </section>

      <footer className="site-footer-light">
        <div>
          <a className="wordmark-dark" href="#top">
            <img src="/brand/logo.jpg" alt="Quantium" className="brand-mark" />
            QUANTIUM
          </a>
          <p>Inteligencia de mercado para operadores activos.</p>
        </div>
        <div>
          <p className="eyebrow-dark">Disponible globalmente</p>
          <a className="footer-link-dark" href="mailto:hello@quantium.global">
            hello@quantium.global <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-dot" />
      </div>

      <button className="repost-button" type="button">
        <Share2 size={14} />
        REPOSTAR
      </button>
    </div>
  )
}
