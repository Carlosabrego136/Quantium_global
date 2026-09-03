'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NosotrosVideoBackground } from '@/components/nosotros-video-background'
import { NosotrosDigitalField } from '@/components/nosotros-digital-field'
import { FadeUp } from '@/components/fade-up'
import './nosotros.css'

const navLeft = [
  ['Inicio', '/'],
  ['Equipo', '#equipo'],
]
const navRight = [
  ['Principios', '#principios'],
  ['Contacto', 'mailto:hello@quantium.global'],
]
const navLinks = [...navLeft, ...navRight]

const principles = [
  { title: 'Los datos van primero', text: 'Para cuando un titular llega a las noticias, los grandes inversores ya tienen su posición armada. Te mostramos las señales que preceden a la noticia: movimientos masivos, compras del Congreso, acumulación en cripto, para que no seas el último en enterarte.', accent: 'gold' },
  { title: 'Lo que vale una empresa, no lo que cuesta', text: 'Los gráficos muestran el pasado. Los fundamentos dicen cuánto vale realmente un negocio hoy. Analizamos cada empresa desde adentro: ingresos, deudas, flujo de caja y ventajas competitivas, como lo hacen los analistas profesionales.', accent: 'white' },
  { title: 'Pensar antes de actuar', text: 'No te damos señales para copiar a ciegas. Te damos el contexto para que entiendas por qué algo importa. El objetivo es que cada herramienta te ayude a tomar mejores decisiones por ti mismo, con criterio propio y datos reales.', accent: 'red' },
  { title: 'Solo lo que importa', text: 'Los medios financieros publican para que hagas clic. Nosotros publicamos para que tomes mejores decisiones. Sin exageración, sin predicciones vacías, sin ruido. Si no está respaldado por datos, no entra en una herramienta de Quantium.', accent: 'gold' },
]

const team = [
  { name: 'Hunab Villanueva', role: 'CEO · Fundador', text: 'Construyó Quantium sobre la convicción de que los inversores independientes fracasan no por falta de talento, sino porque nunca tuvieron acceso a la misma información que los grandes fondos.', accent: 'gold', founder: true },
  { name: 'Victor Valiente', role: 'CMO · Co-fundador', text: 'Lidera la estrategia de marca y crecimiento de Quantium. Enfocado en construir una comunidad de inversores que exigen información real, no titulares, para tomar sus decisiones.', accent: 'white', founder: true },
  { name: 'Leonardo Rodriguez', role: 'Analista · Ingeniero Financiero', text: 'Especializado en análisis cuantitativo e interpretación de flujo de opciones. Aplica modelos rigurosos para traducir señales complejas en conclusiones claras y accionables.', accent: 'red', founder: false },
  { name: 'Edwin Fernández', role: 'Analista · Ingeniero Financiero', text: 'Especializado en derivados y análisis de flujo institucional. Transforma los movimientos más complejos del mercado en inteligencia clara que cualquier inversor puede usar.', accent: 'gold', founder: false },
  { name: 'Hugo De La Fuente', role: 'Analista · Economista', text: 'Economista especializado en macroeconomía, política de bancos centrales y divisas. Aporta el contexto global detrás de cada movimiento de mercado que analizamos.', accent: 'white', founder: false },
]

const sources = [
  { title: 'Datos de empresas y economía', text: 'Uno de los mayores proveedores de datos financieros del mundo. Alimenta nuestro análisis de empresas, flujos de fondos e indicadores macroeconómicos.', accent: 'gold' },
  { title: 'Movimientos grandes en opciones', text: 'La plataforma líder para rastrear compras masivas en opciones. Alimenta nuestras herramientas de flujo con los movimientos que preceden a las grandes subidas y bajadas.', accent: 'white' },
  { title: 'Inversiones del Congreso e insiders', text: 'Agregamos reportes oficiales del gobierno y la SEC sobre las inversiones de legisladores y directivos de empresas: datos públicos que nadie más analiza por ti.', accent: 'red' },
]

export default function NosotrosPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="nz-page">
      <header className="nz-navbar">
        <div className="nz-navbar-inner">
          <nav>
            <ul className="nz-navbar-links nz-left">
              {navLeft.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="nz-mark" href="/" aria-label="Inicio">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" stroke="#fff" strokeWidth="0.9" strokeLinejoin="round">
                <path d="M27.15 17.40L28.05 3.45A2.05 2.05 0 0 0 23.95 3.45L24.85 17.40Z" />
                <path d="M30.35 18.49L36.52 5.95A2.05 2.05 0 0 0 32.74 4.38L28.23 17.61Z" />
                <path d="M32.89 20.73L43.39 11.50A2.05 2.05 0 0 0 40.50 8.61L31.27 19.11Z" />
                <path d="M34.39 23.77L47.62 19.26A2.05 2.05 0 0 0 46.05 15.48L33.51 21.65Z" />
                <path d="M34.60 27.15L48.55 28.05A2.05 2.05 0 0 0 48.55 23.95L34.60 24.85Z" />
                <path d="M33.51 30.35L46.05 36.52A2.05 2.05 0 0 0 47.62 32.74L34.39 28.23Z" />
                <path d="M31.27 32.89L40.50 43.39A2.05 2.05 0 0 0 43.39 40.50L32.89 31.27Z" />
                <path d="M28.23 34.39L32.74 47.62A2.05 2.05 0 0 0 36.52 46.05L30.35 33.51Z" />
                <path d="M24.85 34.60L23.95 48.55A2.05 2.05 0 0 0 28.05 48.55L27.15 34.60Z" />
                <path d="M21.65 33.51L15.48 46.05A2.05 2.05 0 0 0 19.26 47.62L23.77 34.39Z" />
                <path d="M19.11 31.27L8.61 40.50A2.05 2.05 0 0 0 11.50 43.39L20.73 32.89Z" />
                <path d="M17.61 28.23L4.38 32.74A2.05 2.05 0 0 0 5.95 36.52L18.49 30.35Z" />
                <path d="M17.40 24.85L3.45 23.95A2.05 2.05 0 0 0 3.45 28.05L17.40 27.15Z" />
                <path d="M18.49 21.65L5.95 15.48A2.05 2.05 0 0 0 4.38 19.26L17.61 23.77Z" />
                <path d="M20.73 19.11L11.50 8.61A2.05 2.05 0 0 0 8.61 11.50L19.11 20.73Z" />
                <path d="M23.77 17.61L19.26 4.38A2.05 2.05 0 0 0 15.48 5.95L21.65 18.49Z" />
              </g>
            </svg>
          </a>

          <nav>
            <ul className="nz-navbar-links nz-right">
              {navRight.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`nz-hamburger ${menuOpen ? 'active' : ''}`}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nz-hamburger-line" />
            <span className="nz-hamburger-line" />
            <span className="nz-hamburger-line" />
          </button>
        </div>
      </header>

      <div className={`nz-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <NosotrosVideoBackground />
      <NosotrosDigitalField />

      {/* ===== HERO ===== */}
      <section className="nz-hero">
        <div className="nz-hero-content">
          <FadeUp as="p" delay={0} className="nz-eyebrow">
            Nuestra historia
          </FadeUp>
          <h1>
            <span className="l1">
              <FadeUp as="span" delay={0.15} y={40}>La mayoría reacciona al mercado.</FadeUp>
            </span>
            <span className="l2">
              <FadeUp as="span" delay={0.27} y={40}>Nosotros te ayudamos a anticiparlo.</FadeUp>
            </span>
          </h1>
          <FadeUp as="p" delay={0.45}>
            <span className="nz-name-gold">Hunab Villanueva</span> y <span className="nz-name-gold">Victor Valiente</span> fundaron Quantium con una convicción simple: los inversores no pierden por falta de talento, pierden porque nadie les enseñó a usar la misma información que usan los grandes.
          </FadeUp>
          <FadeUp delay={0.6}>
            <a className="nz-cta-view" href="#equipo">
              <span>conoce al equipo</span>
              <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ===== FILOSOFÍA / QUOTE ===== */}
      <section id="filosofia" className="nz-section">
        <FadeUp as="p" delay={0} className="nz-eyebrow">
          Nuestra filosofía — ¿Por qué construimos esto?
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="nz-quote-mark">“</p>
        </FadeUp>
        <FadeUp as="p" delay={0.2} className="nz-quote">
          Los inversores independientes no pierden por falta de talento. Pierden porque nunca tuvieron acceso a la misma información que los grandes. Quantium cambia eso.
        </FadeUp>
        <FadeUp as="p" delay={0.35} className="nz-quote-by">
          <span className="nz-name-gold">Hunab Villanueva</span> — Fundador, Quantium
        </FadeUp>
      </section>

      {/* ===== EL PROBLEMA / LO QUE HACEMOS DIFERENTE ===== */}
      <section className="nz-section">
        <FadeUp as="p" delay={0} className="nz-eyebrow">
          El problema que vimos
        </FadeUp>
        <FadeUp as="h2" delay={0.1} className="nz-heading">
          Reaccionar a un titular es llegar tarde.
        </FadeUp>
        <div className="nz-two-col">
          <FadeUp as="p" delay={0.2} className="nz-body" style={{ marginTop: 0 }}>
            El inversor común mira los precios, lee titulares y reacciona. Los grandes hacen exactamente lo opuesto: primero analizan los datos, construyen una opinión desde los fundamentos, y dejan que las noticias confirmen lo que ya saben. Esa diferencia en cómo piensan es la verdadera ventaja. Y nunca estuvo al alcance de las personas comunes.
          </FadeUp>
          <FadeUp as="p" delay={0.3} className="nz-body" style={{ marginTop: 0 }}>
            <strong style={{ color: '#fff', fontWeight: 500 }}>Lo que hacemos diferente:</strong> cuando ocurre un gran movimiento en el mercado, los datos estaban ahí semanas antes de que saliera la noticia. Grandes compras en opciones, movimientos masivos en fondos, compras del Congreso, ballenas en cripto: esas señales existen antes del titular. Quantium te las muestra en tiempo real.
          </FadeUp>
        </div>
      </section>

      {/* ===== MISIÓN Y VISIÓN ===== */}
      <section className="nz-section">
        <div className="nz-two-col" style={{ marginTop: 0 }}>
          <div>
            <FadeUp as="p" delay={0} className="nz-eyebrow">Misión</FadeUp>
            <FadeUp as="p" delay={0.1} className="nz-body" style={{ marginTop: 0, fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>
              Darle a los inversores independientes acceso a la misma información que usan los grandes fondos: explicada en lenguaje simple, en el momento que importa.
            </FadeUp>
          </div>
          <div>
            <FadeUp as="p" delay={0.15} className="nz-eyebrow">Visión</FadeUp>
            <FadeUp as="p" delay={0.25} className="nz-body" style={{ marginTop: 0, fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>
              Convertirnos en la plataforma de referencia para el inversor hispanohablante que quiere tomar decisiones con información real, no con rumores ni corazonadas.
            </FadeUp>
          </div>
        </div>
        <FadeUp as="p" delay={0.4} className="nz-eyebrow" style={{ marginTop: 56 }}>
          Dónde estamos hoy
        </FadeUp>
        <FadeUp as="p" delay={0.5} className="nz-body" style={{ marginTop: 8 }}>
          Quantium opera 77 herramientas de análisis sobre flujo de opciones, gamma, dark pool, volatilidad, macro y cripto. En el plan Premium los datos llegan en tiempo real; en el plan gratuito llegan demorados. Sin curaduría de por medio: tú ves el dato, no nuestra opinión sobre el dato.
        </FadeUp>
      </section>

      {/* ===== PRINCIPIOS ===== */}
      <section id="principios" className="nz-panel-section">
        <div className="nz-panel-head">
          <FadeUp as="p" delay={0} className="nz-eyebrow">Nuestros principios</FadeUp>
          <FadeUp as="h2" delay={0.1} className="nz-heading">¿Cómo piensan los mercados?</FadeUp>
          <FadeUp as="p" delay={0.2} className="nz-body">
            Cuatro convicciones que dan forma a cada herramienta, cada análisis y cada decisión que tomamos en Quantium.
          </FadeUp>
        </div>
        <div className="nz-grid nz-grid-2">
          {principles.map((p, i) => (
            <FadeUp key={p.title} delay={0.1 + i * 0.1} className={`nz-card nz-accent-${p.accent}`}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section id="equipo" className="nz-panel-section">
        <div className="nz-panel-head">
          <FadeUp as="p" delay={0} className="nz-eyebrow">El equipo</FadeUp>
          <FadeUp as="h2" delay={0.1} className="nz-heading">Las personas detrás de Quantium</FadeUp>
          <FadeUp as="p" delay={0.2} className="nz-body">
            Un equipo de analistas y estrategas unidos por una creencia: cualquier persona puede invertir mejor si tiene la información correcta y alguien que se la explique bien.
          </FadeUp>
        </div>
        <div className="nz-grid nz-grid-3">
          {team.map((member, i) => (
            <FadeUp key={member.name} delay={0.1 + i * 0.08} className={`nz-card nz-accent-${member.accent}`}>
              <span className="nz-card-role">{member.role}</span>
              <h3 className={member.founder ? 'nz-name-gold' : ''}>{member.name}</h3>
              <p>{member.text}</p>
              <div className="nz-card-social">
                <span>𝕏</span>
                <span>in</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ===== FUENTES DE DATOS ===== */}
      <section className="nz-panel-section">
        <div className="nz-panel-head">
          <FadeUp as="p" delay={0} className="nz-eyebrow">De dónde vienen los datos</FadeUp>
          <FadeUp as="h2" delay={0.1} className="nz-heading">Las mismas fuentes que usan los grandes fondos</FadeUp>
          <FadeUp as="p" delay={0.2} className="nz-body">
            Nos conectamos a los mismos proveedores de datos que usan los escritorios profesionales y lo traducimos en herramientas que cualquier persona puede leer y usar.
          </FadeUp>
        </div>
        <div className="nz-grid nz-grid-3">
          {sources.map((s, i) => (
            <FadeUp key={s.title} delay={0.1 + i * 0.1} className={`nz-card nz-accent-${s.accent}`}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ===== AVISO LEGAL ===== */}
      <section className="nz-legal">
        <FadeUp as="p" delay={0} className="nz-eyebrow">Aviso legal importante</FadeUp>
        <FadeUp as="p" delay={0.1}>
          Todo el contenido de Quantium es únicamente informativo. Nada de lo que publicamos es asesoría financiera ni una recomendación para comprar o vender. El rendimiento pasado no garantiza resultados futuros. Siempre investiga por tu cuenta y consulta con un profesional antes de invertir. Invertir conlleva riesgo de pérdida.
        </FadeUp>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="nz-cta">
        <FadeUp as="p" delay={0} className="nz-eyebrow">Únete a Quantium</FadeUp>
        <FadeUp as="h2" delay={0.1} className="nz-heading">
          Deja de reaccionar.
          <br />
          Empieza a anticipar.
        </FadeUp>
        <FadeUp as="p" delay={0.2} className="nz-body">
          Muy pronto vas a poder crear tu cuenta y acceder a las mismas herramientas que usan las mesas institucionales, explicadas en simple.
        </FadeUp>
        <FadeUp delay={0.3} style={{ marginTop: 28 }}>
          <a className="nz-btn nz-btn--primary" href="/#planes">
            Ver planes <ArrowUpRight size={14} />
          </a>
        </FadeUp>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="nz-footer">
        <div className="nz-footer-col" style={{ maxWidth: 320 }}>
          <div className="nz-footer-brand">
            <img src="/brand/logo.jpg" alt="Quantium" />
            QUANTIUM Global
          </div>
          <p>Herramientas de trading en tiempo real e histórico: flujo de opciones, gamma, dark pool, insiders y macro. El mercado, como lo ve una mesa institucional.</p>
        </div>
        <div className="nz-footer-col">
          <h4>Plataforma</h4>
          <a href="/#herramientas">Herramientas</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/#planes">Entrar</a>
        </div>
        <div className="nz-footer-col">
          <h4>Herramientas</h4>
          <a href="/#herramientas">Flujo de Opciones</a>
          <a href="/#herramientas">Dark Pool &amp; Gamma</a>
          <a href="/#herramientas">Insiders &amp; Congreso</a>
          <a href="/#herramientas">Macro &amp; Cripto</a>
        </div>
        <div className="nz-footer-bottom">
          © 2026 Quantium · quantium.global · Charts: Lightweight Charts™, TradingView
          <br />
          No es asesoría financiera. Todo el contenido es únicamente informativo. Los resultados pasados no garantizan resultados futuros.
        </div>
      </footer>
    </div>
  )
}
