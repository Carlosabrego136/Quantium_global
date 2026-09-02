'use client'

import { ArrowUpRight, Menu, Share2 } from 'lucide-react'
import { VideoBackground } from '@/components/video-background'
import { FadeUp } from '@/components/fade-up'

const ticker = ['SPX 5,482.10 +0.42%', 'VIX 13.86 -2.10%', 'QQQ 481.27 +0.61%', 'NVDA 138.44 +1.85%', 'TSLA 243.90 -0.77%', 'BTC 71,240 +2.14%', 'ETH 3,802 +1.02%', 'DXY 104.12 -0.18%', '10Y 4.28% +0.03', 'GAMMA FLIP 7,410']

const tools = [
  ['01', 'Flujo de opciones', 'Cada orden grande, en su nivel. Sweeps, bloques y prints de dark pool clasificados por strike y vencimiento en tiempo real.', '/cards/flujo-opciones.jpg', 'gold'],
  ['02', 'Gamma del dealer', 'Dónde el mercado se pega y dónde se suelta. Exposición neta de market makers agregada por strike, con el punto de flip a la vista.', '/cards/gamma-dealer.jpg', 'white'],
  ['03', 'Dark pool', 'El volumen que no pasa por el libro público: prints fuera de bolsa agrupados por ticker, precio y tamaño de cada bloque.', '/cards/dark-pool.jpg', 'red'],
] as const

const moreTools = [
  ['04', 'Superficie de gamma 3D', 'La exposición del dealer por strike y vencimiento, convertida en relieve para encontrar los puntos de tensión.'],
  ['05', 'Skew y volatilidad', 'Cómo está pagando el mercado por protegerse: skew put-call, term structure y volatilidad implícita por vencimiento.'],
  ['06', 'Hedging y open interest', 'Cuánto tienen que cubrir los market makers y a qué velocidad, cruzando open interest vivo con la necesidad de cobertura.'],
  ['07', 'Liquidez y spreads', 'Profundidad real del libro antes de enviar una orden: spreads, tamaño disponible y costo estimado de entrada.'],
  ['08', 'Cripto y macro', 'El mismo marco de exposición aplicado a BTC y ETH, más los niveles macro que mueven todo el book.'],
]

const stats = [['7,090', 'SPX · dealer put floor'], ['7,890', 'SPX · call resistance'], ['7,410', 'SPX · zero gamma'], ['760', 'SPY · muro de calls'], ['Q3 2026', 'concentración de OI']]

const methodSteps = [
  ['01', 'Ingerimos el tape completo', 'Cada contrato de opciones del día, incluyendo bloques, sweeps y actividad fuera de bolsa, entra a nuestro pipeline en tiempo real.'],
  ['02', 'Reconstruimos la exposición', 'Cruzamos ese flujo con el open interest para estimar cuánta gamma, vanna y delta cargan los market makers en cada strike.'],
  ['03', 'Lo dejamos en tu pantalla', 'Niveles, superficies y alertas listas para usar, sin hojas de cálculo ni que tengas que programar tu propio pipeline.'],
]

const plans = [
  ['Trader', '$49', 'Para quien ya opera opciones y quiere dejar de adivinar los niveles clave.', ['Flujo de opciones en tiempo real', 'Gamma del dealer por strike', 'Niveles clave de SPX, SPY y QQQ', 'Alertas de sweeps y bloques']],
  ['Desk', '$149', 'Las 84 herramientas, cobertura completa de tickers y superficies en 3D.', ['Todo lo incluido en Trader', 'Dark pool y superficie de gamma 3D', 'Skew, volatilidad y term structure', 'Cobertura de cripto y macro', 'Acceso a la API de datos']],
  ['Firma', 'A medida', 'Para fondos y mesas propietarias que necesitan asientos y datos a la medida.', ['Todo lo incluido en Desk', 'Múltiples asientos y permisos', 'Feeds a la medida', 'Soporte directo con el equipo']],
] as const

const statementWords = 'LOS DATOS QUE MUEVEN EL PRECIO YA EXISTEN.'.split(' ')
const servicesWords = 'EXPLORE LO QUE OFRECEMOS'.split(' ')

const navPrimary = [
  ['HERRAMIENTAS', '#herramientas'],
  ['GAMMA', '#gamma'],
  ['METODOLOGÍA', '#metodo'],
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

      <header className="site-nav">
        <FadeUp as="span" delay={0} className="nav-brand">
          <a href="#top">QUANTIUM</a>
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
                <FadeUp as="h1" delay={0.1}>
                  VE EL MERCADO
                  <br />
                  COMO LO VE UN DEALER
                </FadeUp>
                <FadeUp as="span" delay={0.5} className="slide-counter">
                  001 / 005
                </FadeUp>
              </div>
              <div className="hero-col-right">
                <FadeUp as="p" delay={0.25}>
                  Flujo de opciones, gamma del dealer y actividad de dark pool, cruzados en tiempo real. 84 herramientas para leer el posicionamiento detrás del precio — sin pagar una terminal institucional.
                </FadeUp>
                <FadeUp delay={0.4} className="hero-buttons">
                  <a className="btn-primary" href="#planes">
                    Solicitar acceso
                  </a>
                  <a className="btn-secondary" href="#herramientas">
                    Ver 84 herramientas
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
          Inteligencia de mercado para operadores activos, con la misma profundidad de datos que usa una mesa institucional.
        </FadeUp>
      </section>

      <section id="cobertura" className="section-statement">
        <div className="statement-inner">
          <h2 className="statement-heading">
            {statementWords.map((word, i) => (
              <FadeUp as="span" key={`${word}-${i}`} delay={0.15 + i * 0.08} y={32}>
                {word}
              </FadeUp>
            ))}
          </h2>
          <FadeUp as="p" delay={0.9} className="statement-sub">
            Flujo de opciones en una herramienta, gamma del dealer en otra, dark pool en un tercer sitio que cobra aparte. Quantium los junta en una sola pantalla.
          </FadeUp>
          <FadeUp delay={1.05} className="statement-proof">
            {[
              ['84', 'herramientas de análisis'],
              ['12', 'clases de activos cubiertas'],
              ['<1s', 'latencia de actualización'],
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
          003 / 005
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
            Ocho módulos, un solo mapa del posicionamiento. Cada herramienta responde una pregunta concreta sobre quién está posicionado, dónde y qué tan forzados están los dealers a reaccionar.
          </FadeUp>
        </div>

        <div className="cards-grid">
          {tools.map(([number, title, text, image, accent], idx) => (
            <FadeUp key={number} delay={0.4 + idx * 0.15} className={`service-card accent-${accent}`}>
              <div className="card-media">
                <img src={image} alt={title} loading="lazy" />
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
            {stats.map(([value, label], idx) => (
              <article className="stat-card-light" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
                <div className={`stat-line-light accent-${['gold', 'red', 'white', 'gold', 'red'][idx % 5]}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gamma" className="section-gamma">
        <FadeUp as="p" delay={0} className="eyebrow-light">
          Superficie de gamma · 3D
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="gamma-heading">
          La exposición del dealer, por strike y por vencimiento.
        </FadeUp>
        <FadeUp delay={0.25} className="gamma-copy">
          <p>Dónde el mercado se pega y dónde se suelta. Convertimos la gamma agregada de los dealers en una superficie que puedes rotar e inclinar para ver dónde el precio encuentra resistencia.</p>
          <a className="btn-secondary btn-secondary-light" href="#planes">
            Ver superficies en vivo <ArrowUpRight size={14} />
          </a>
        </FadeUp>
      </section>

      <section id="metodo" className="section-method">
        <FadeUp as="p" delay={0} className="eyebrow-dark">
          Cómo funciona
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="method-heading">
          De la cinta de órdenes a una señal que puedes usar.
        </FadeUp>
        <div className="method-list-light">
          {methodSteps.map(([number, title, text], i) => (
            <FadeUp key={number} delay={0.2 + i * 0.1} className={`method-row-light accent-${['gold', 'red', 'white'][i % 3]}`}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="planes" className="section-plans">
        <FadeUp as="p" delay={0} className="eyebrow-dark">
          Acceso
        </FadeUp>
        <FadeUp as="h2" delay={0.05} className="plans-heading">
          Un plan para cada nivel de operativa.
        </FadeUp>
        <div className="plans-grid-light">
          {plans.map(([name, price, description, features], i) => (
            <FadeUp key={name} delay={0.15 + i * 0.1} className={`plan-card accent-${['white', 'gold', 'red'][i % 3]}`}>
              <p className="eyebrow-dark">{name}</p>
              <strong>
                {price}
                <small>{price !== 'A medida' ? '/mes' : ''}</small>
              </strong>
              <p className="plan-desc">{description}</p>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="btn-primary" href="mailto:hello@quantium.global">
                {name === 'Firma' ? 'Hablar con nosotros' : 'Solicitar acceso'} <ArrowUpRight size={14} />
              </a>
            </FadeUp>
          ))}
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
