'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NosotrosVideoBackground } from '@/components/nosotros-video-background'
import { FadeUp } from '@/components/fade-up'
import './nosotros.css'

const navLinks = [
  ['Inicio', '/'],
  ['Equipo', '#equipo'],
  ['Principios', '#principios'],
  ['Contacto', 'mailto:hello@quantium.global'],
]

const principles = [
  { title: 'Los datos van primero', text: 'Para cuando un titular llega a las noticias, los grandes inversores ya tienen su posición armada. Te mostramos las señales que preceden a la noticia: movimientos masivos, compras del Congreso, acumulación en cripto, para que no seas el último en enterarte.', accent: 'gold' },
  { title: 'Lo que vale una empresa, no lo que cuesta', text: 'Los gráficos muestran el pasado. Los fundamentos dicen cuánto vale realmente un negocio hoy. Analizamos cada empresa desde adentro: ingresos, deudas, flujo de caja y ventajas competitivas, como lo hacen los analistas profesionales.', accent: 'white' },
  { title: 'Pensar antes de actuar', text: 'No te damos señales para copiar a ciegas. Te damos el contexto para que entiendas por qué algo importa. El objetivo es que cada herramienta te ayude a tomar mejores decisiones por ti mismo, con criterio propio y datos reales.', accent: 'red' },
  { title: 'Solo lo que importa', text: 'Los medios financieros publican para que hagas clic. Nosotros publicamos para que tomes mejores decisiones. Sin exageración, sin predicciones vacías, sin ruido. Si no está respaldado por datos, no entra en una herramienta de Quantium.', accent: 'gold' },
]

const team = [
  { name: 'Hunab Villanueva', role: 'CEO · Fundador', text: 'Construyó Quantium sobre la convicción de que los inversores independientes fracasan no por falta de talento, sino porque nunca tuvieron acceso a la misma información que los grandes fondos.', accent: 'gold' },
  { name: 'Victor Valiente', role: 'CMO · Co-fundador', text: 'Lidera la estrategia de marca y crecimiento de Quantium. Enfocado en construir una comunidad de inversores que exigen información real, no titulares, para tomar sus decisiones.', accent: 'white' },
  { name: 'Leonardo Rodriguez', role: 'Analista · Ingeniero Financiero', text: 'Especializado en análisis cuantitativo e interpretación de flujo de opciones. Aplica modelos rigurosos para traducir señales complejas en conclusiones claras y accionables.', accent: 'red' },
  { name: 'Edwin Fernández', role: 'Analista · Ingeniero Financiero', text: 'Especializado en derivados y análisis de flujo institucional. Transforma los movimientos más complejos del mercado en inteligencia clara que cualquier inversor puede usar.', accent: 'gold' },
  { name: 'Hugo De La Fuente', role: 'Analista · Economista', text: 'Economista especializado en macroeconomía, política de bancos centrales y divisas. Aporta el contexto global detrás de cada movimiento de mercado que analizamos.', accent: 'white' },
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
          <a className="nz-logo" href="/">
            <img src="/brand/logo.jpg" alt="Quantium" />
            (QUANTIUM)
          </a>
          <nav>
            <ul className="nz-navbar-links">
              {navLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="nz-btn nz-btn--primary nz-navbar-cta" href="/#planes">
            Solicitar acceso
          </a>
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
        <a className="nz-btn nz-btn--primary nz-mobile-menu-cta" href="/#planes" onClick={() => setMenuOpen(false)}>
          Solicitar acceso
        </a>
      </div>

      <NosotrosVideoBackground />

      {/* ===== HERO ===== */}
      <section className="nz-hero">
        <div className="nz-hero-content">
          <FadeUp as="p" delay={0} className="nz-eyebrow">
            Nuestra historia
          </FadeUp>
          <FadeUp as="h1" delay={0.1}>
            La mayoría reacciona al mercado. Nosotros te ayudamos a anticiparlo.
          </FadeUp>
          <FadeUp as="p" delay={0.2}>
            Hunab Villanueva y Victor Valiente fundaron Quantium con una convicción simple: los inversores no pierden por falta de talento. Pierden porque nadie les enseñó a usar la misma información que usan los grandes.
          </FadeUp>
          <FadeUp delay={0.3}>
            <a className="nz-btn nz-btn--primary" href="#equipo">
              Conoce al equipo
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
          Hunab Villanueva — Fundador, Quantium
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
              <h3>{member.name}</h3>
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
