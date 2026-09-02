'use client'

import { ArrowUpRight, Menu, MoveDown } from 'lucide-react'
import { NeuralNetwork } from '@/components/neural-network'

const ticker = ['SPX 5,482.10 +0.42%', 'VIX 13.86 -2.10%', 'QQQ 481.27 +0.61%', 'NVDA 138.44 +1.85%', 'TSLA 243.90 -0.77%', 'BTC 71,240 +2.14%', 'ETH 3,802 +1.02%', 'DXY 104.12 -0.18%', '10Y 4.28% +0.03', 'GAMMA FLIP 7,410']
const tools = [
  ['01', 'Flujo de opciones', 'Cada orden grande, en su nivel. Sweeps, bloques y prints de dark pool clasificados por strike y vencimiento en tiempo real.'],
  ['02', 'Gamma del dealer', 'Dónde el mercado se pega y dónde se suelta. Exposición neta de market makers agregada por strike, con el punto de flip a la vista.'],
  ['03', 'Dark pool', 'El volumen que no pasa por el libro público: prints fuera de bolsa agrupados por ticker, precio y tamaño de cada bloque.'],
  ['04', 'Superficie de gamma 3D', 'La exposición del dealer por strike y vencimiento, convertida en relieve para encontrar los puntos de tensión.'],
  ['05', 'Skew y volatilidad', 'Cómo está pagando el mercado por protegerse: skew put-call, term structure y volatilidad implícita por vencimiento.'],
  ['06', 'Hedging y open interest', 'Cuánto tienen que cubrir los market makers y a qué velocidad, cruzando open interest vivo con la necesidad de cobertura.'],
  ['07', 'Liquidez y spreads', 'Profundidad real del libro antes de enviar una orden: spreads, tamaño disponible y costo estimado de entrada.'],
  ['08', 'Cripto y macro', 'El mismo marco de exposición aplicado a BTC y ETH, más los niveles macro que mueven todo el book.'],
]
const stats = [['7,090', 'SPX · dealer put floor'], ['7,890', 'SPX · call resistance'], ['7,410', 'SPX · zero gamma'], ['760', 'SPY · muro de calls'], ['Q3 2026', 'concentración de OI']]

export default function Page() {
  return (
    <main className="site-shell">
      <NeuralNetwork />
      <header className="site-header">
        <a className="wordmark" href="#top">QUANTIUM</a>
        <nav className="desktop-nav" aria-label="Navegación principal"><a href="#herramientas">Herramientas</a><a href="#gamma">Gamma</a><a href="#metodo">Metodología</a><a href="#planes">Planes</a></nav>
        <nav className="desktop-nav" aria-label="Acciones"><a href="#planes">Entrar</a><a href="#planes">Solicitar acceso</a></nav>
        <button className="menu-button" aria-label="Abrir menú"><Menu size={18} /></button>
      </header>

      <section id="top" className="hero content-section">
        <div className="ticker-rail" aria-label="Mercado en vivo">{ticker.concat(ticker).map((item, index) => <span key={`${item}-${index}`}>{item} <b>/</b></span>)}</div>
        <p className="eyebrow">Inteligencia de mercado para operadores activos · 2026</p>
        <div className="hero-grid"><div><h1>Ve el mercado<br />como lo ve un <em>dealer.</em></h1><p className="hero-sub">Flujo de opciones, gamma del dealer y actividad de dark pool, cruzados en tiempo real. 84 herramientas para leer el posicionamiento detrás del precio — sin pagar una terminal institucional.</p><div className="hero-actions"><a className="button button-dark" href="#planes">Solicitar acceso <ArrowUpRight size={14} /></a><a className="button" href="#herramientas">Ver las 84 herramientas</a></div></div></div>
        <div className="hero-bottom"><span>PLATAFORMA DE INTELIGENCIA</span><span>MAPA DE EXPOSICIÓN EN VIVO</span><MoveDown size={18} /></div>
      </section>

      <section className="network-showcase content-section"><div className="network-showcase-foot"><p className="eyebrow"><span className="viz-dot" /> Mapa de exposición en vivo</p><div className="proof-row">{[['84', 'herramientas de análisis'], ['12', 'clases de activos cubiertas'], ['<1s', 'latencia de actualización']].map(([number, label]) => <div className="proof-item" key={label}><strong>{number}</strong><span>{label}</span></div>)}</div></div></section>

      <section className="stat-strip content-section" aria-label="Niveles clave del mercado"><div className="stat-strip-head"><p className="eyebrow">— Niveles clave del mercado</p><span className="live">● actualización en vivo</span></div><div className="stats-grid">{stats.map(([value, label]) => <article className="stat-card" key={label}><strong>{value}</strong><span>{label}</span><div className="stat-line" /></article>)}</div></section>

      <section id="metodo" className="content-section section-block"><div className="section-heading"><p className="eyebrow">El problema</p><h2>Los datos que mueven el precio existen.</h2></div><div className="prose"><p>El problema es que están repartidos en seis pestañas distintas.</p><p>Flujo de opciones en una herramienta, gamma del dealer en otra, dark pool en un tercer sitio que cobra aparte. Para cuando cruzas los tres, el nivel ya se movió.</p><p>Quantium junta el flujo, la exposición del dealer y la actividad fuera de bolsa en una sola pantalla — con la misma profundidad de datos que usa una mesa institucional.</p></div></section>

      <section id="herramientas" className="content-section tools-section section-block"><div className="section-heading"><p className="eyebrow">La plataforma</p><h2>Ocho módulos.<br />Un solo mapa del posicionamiento.</h2><p className="section-note">Cada herramienta responde una pregunta concreta sobre quién está posicionado, dónde y qué tan forzados están los dealers a reaccionar.</p></div><div className="tool-list">{tools.map(([number, title, text]) => <article className="tool-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={17} /></article>)}</div></section>

      <section id="gamma" className="content-section gamma-section section-block"><div className="section-heading"><p className="eyebrow">Superficie de gamma · 3D</p><h2>La exposición del dealer, por strike y por vencimiento.</h2></div><div className="gamma-copy"><p>Dónde el mercado se pega y dónde se suelta. Convertimos la gamma agregada de los dealers en una superficie que puedes rotar e inclinar para ver dónde el precio encuentra resistencia.</p><a className="button button-light" href="#planes">Ver superficies en vivo <ArrowUpRight size={14} /></a></div></section>

      <section id="metodologia" className="content-section method-section section-block"><div className="section-heading"><p className="eyebrow">Cómo funciona</p><h2>De la cinta de órdenes a una señal que puedes usar.</h2></div><div className="method-list">{[['01', 'Ingerimos el tape completo', 'Cada contrato de opciones del día, incluyendo bloques, sweeps y actividad fuera de bolsa, entra a nuestro pipeline en tiempo real.'], ['02', 'Reconstruimos la exposición', 'Cruzamos ese flujo con el open interest para estimar cuánta gamma, vanna y delta cargan los market makers en cada strike.'], ['03', 'Lo dejamos en tu pantalla', 'Niveles, superficies y alertas listas para usar, sin hojas de cálculo ni que tengas que programar tu propio pipeline.']].map(([number, title, text]) => <article className="method-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section id="planes" className="content-section plans-section"><div className="section-heading"><p className="eyebrow">Acceso</p><h2>Un plan para cada nivel de operativa.</h2></div><div className="plans-grid">{[['Trader', '$49', 'Para quien ya opera opciones y quiere dejar de adivinar los niveles clave.', ['Flujo de opciones en tiempo real', 'Gamma del dealer por strike', 'Niveles clave de SPX, SPY y QQQ', 'Alertas de sweeps y bloques']], ['Desk', '$149', 'Las 84 herramientas, cobertura completa de tickers y superficies en 3D.', ['Todo lo incluido en Trader', 'Dark pool y superficie de gamma 3D', 'Skew, volatilidad y term structure', 'Cobertura de cripto y macro', 'Acceso a la API de datos']], ['Firma', 'A medida', 'Para fondos y mesas propietarias que necesitan asientos y datos a la medida.', ['Todo lo incluido en Desk', 'Múltiples asientos y permisos', 'Feeds a la medida', 'Soporte directo con el equipo']]].map(([name, price, description, features]) => <article className="plan-item" key={name}><p className="eyebrow">{name}</p><strong>{price}<small>{price !== 'A medida' ? '/mes' : ''}</small></strong><p>{description}</p><ul>{(features as string[]).map((feature) => <li key={feature}>{feature}</li>)}</ul><a className="button" href="mailto:hello@quantium.global">{name === 'Firma' ? 'Hablar con nosotros' : 'Solicitar acceso'} <ArrowUpRight size={14} /></a></article>)}</div></section>

      <section className="content-section rates-section"><p className="eyebrow">El siguiente movimiento</p><h2>Deja de operar con la mitad de la información.</h2><p className="section-note">El posicionamiento de los dealers ya existe en el mercado. Nosotros lo ponemos en tu pantalla.</p><a className="button button-dark" href="mailto:hello@quantium.global">Solicitar acceso <ArrowUpRight size={14} /></a></section>

      <footer className="site-footer content-section"><div><a className="wordmark" href="#top">QUANTIUM</a><p>Inteligencia de mercado para operadores activos.</p></div><div><p className="eyebrow">Disponible globalmente</p><a className="footer-link" href="mailto:hello@quantium.global">hello@quantium.global <ArrowUpRight size={14} /></a></div></footer>
    </main>
  )
}
