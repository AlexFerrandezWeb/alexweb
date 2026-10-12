import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './SobreMi.css'

const valores = [
  {
    num: '01',
    titulo: 'Primero, tu objetivo',
    desc: 'Antes de escribir una línea de código, estudio tu negocio: a quién quieres llegar, qué te diferencia y qué quieres conseguir. La web se adapta a eso, no al revés.',
  },
  {
    num: '02',
    titulo: 'Contigo mes a mes',
    desc: 'Cuando tu web está online empieza lo importante. Cada mes la mejoro, resuelvo tus dudas y te asesoro. Es como tener a alguien de internet en tu equipo.',
  },
  {
    num: '03',
    titulo: 'Sin tecnicismos',
    desc: 'Sabrás en todo momento qué hacemos y por qué, explicado claro. Y la última palabra siempre la tienes tú.',
  },
  {
    num: '04',
    titulo: 'Tú no te rayas',
    desc: 'Hosting, dominio, seguridad y mantenimiento incluidos. Tú te ocupas de tu negocio; de internet me ocupo yo.',
  },
]

const servicios = [
  { icon: '🎯', titulo: 'Captar clientes', desc: 'Una landing o una web pensada para que quien te busca acabe llamándote, reservando o escribiéndote.' },
  { icon: '🏪', titulo: 'Mostrar lo que haces', desc: 'Que se entienda en segundos qué ofreces y por qué elegirte, y que quien entre se quede a conocer tu negocio.' },
  { icon: '🛒', titulo: 'Vender online', desc: 'Tienda con pagos seguros y gestión de productos, lista para vender.' },
  { icon: '⚙️', titulo: 'Automatizar lo repetitivo', desc: 'Reservas, respuestas automáticas, chatbot con IA... que la web trabaje por ti.' },
]

const masAlla = [
  { titulo: 'Anuncios', desc: 'Te digo si es buen momento para invertir y cómo hacerlo sin tirar el dinero.' },
  { titulo: 'Reseñas en Google', desc: 'Cómo conseguir más y mejores.' },
  { titulo: 'Google Maps y SEO local', desc: 'Que te encuentren los que están cerca.' },
  { titulo: 'Clientes que vuelven', desc: 'Ideas para fidelizar a los que ya te conocen.' },
  { titulo: 'Cambios cada mes', desc: 'Textos, fotos, precios... y lo nuevo, indexado en Google y Bing.' },
  { titulo: 'Revisión de resultados', desc: 'Cada trimestre, explicada sin rodeos.' },
]

// Las mismas URLs que usan Inicio.jsx (portfolio) y Testimonios.jsx
const negocios = [
  { nombre: 'Nutrigan España', desc: 'Tienda online de suplementos veterinarios', url: 'https://www.xn--nutriganespaa-tkb.com/' },
  { nombre: 'Anita Pinturitas', desc: 'Cosmética y maquillaje', url: 'https://anitapinturitas.es/' },
  { nombre: 'Heladería Luxer', desc: 'Heladería de temporada en Lo Pagán', url: 'https://heladerialuxer.es/' },
]

const stack = ['React', 'Vite', 'JavaScript', 'Node.js', 'Python', 'Supabase', 'SQL', 'Stripe', 'Cloudflare', 'GitHub', 'SEO']

export const SobreMi = () => {
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('sm-visible') }),
      { threshold: 0.05, rootMargin: '0px 0px 120px 0px' }
    )
    refs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ref = (i) => (el) => { refs.current[i] = el }

  return (
    <div className='sobremi-container'>

      {/* HERO */}
      <section className='sm-hero'>
        <div className='sm-hero-inner'>
          <p className='sm-hero-label'>Desarrollador web freelance · Toda España</p>
          <h1 className='sm-hero-title'>
            Hola,<br />soy <span className='sm-hero-gradient'>Alex.</span>
          </h1>
          <p className='sm-hero-sub'>
            Te ayudo a que tu negocio crezca en internet, mes a mes.
          </p>
          <Link to='/contacto' className='sm-hero-btn'>Hablemos de tu proyecto</Link>
        </div>
        <div className='sm-scroll-hint'>
          <span>scroll</span>
          <div className='sm-scroll-line' />
        </div>
      </section>

      {/* STATEMENT */}
      <section className='sm-statement' ref={ref(0)}>
        <p>
          Hoy, una web la puede hacer cualquiera.<br />
          <em>Lo difícil es todo lo que viene después.</em>
        </p>
        <p className='sm-statement-sub'>
          Anuncios, reseñas, aparecer en Google Maps, que te encuentren y que vuelvan.
          Por eso no hago tu web y desaparezco: me quedo contigo cada mes para que tu
          negocio siga creciendo.
        </p>
      </section>

      {/* VALORES */}
      <section className='sm-section sm-dark'>
        <div className='sm-section-inner'>
          <p className='sm-section-label'>Mi forma de trabajar</p>
          <h2 className='sm-section-title'>Cuatro principios que lo guían todo</h2>
          <div className='sm-valores-grid'>
            {valores.map((v, i) => (
              <div className='sm-valor' key={i} ref={ref(i + 1)}>
                <span className='sm-valor-num'>{v.num}</span>
                <h3 className='sm-valor-titulo'>{v.titulo}</h3>
                <p className='sm-valor-desc'>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      {/* IMPORTANTE: el CSS anima .sm-stat por nth-child(1), (3) y (5), asi que
          son tres bloques con dos separadores. Si se añade uno mas hay que tocar
          SobreMi.css. */}
      <section className='sm-stats' ref={ref(5)}>
        <div className='sm-stat'>
          <span className='sm-stat-num'>100%</span>
          <p className='sm-stat-label'>de mis clientes siguen conmigo mes a mes</p>
        </div>
        <div className='sm-stat-divider' />
        <div className='sm-stat'>
          <span className='sm-stat-num'>2025</span>
          <p className='sm-stat-label'>ayudando a negocios desde</p>
        </div>
        <div className='sm-stat-divider' />
        <div className='sm-stat'>
          <span className='sm-stat-num'>Mismo día</span>
          <p className='sm-stat-label'>respondo tus dudas por WhatsApp o email. Siempre hablas conmigo.</p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className='sm-section'>
        <div className='sm-section-inner'>
          <p className='sm-section-label'>Lo que hago</p>
          <h2 className='sm-section-title'>Cada negocio quiere<br />algo distinto</h2>
          <div className='sm-servicios-grid'>
            {servicios.map((s, i) => (
              <div className='sm-servicio' key={i} ref={ref(i + 6)}>
                <span className='sm-servicio-icon'>{s.icon}</span>
                <h3>{s.titulo}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAS ALLA DE LA WEB */}
      <section className='sm-section sm-dark'>
        <div className='sm-section-inner'>
          <p className='sm-section-label'>Asesoría mes a mes</p>
          <h2 className='sm-section-title sm-section-title-con-intro'>Más allá de la web</h2>
          <p className='sm-section-intro'>
            No necesitas aprender marketing digital ni pasarte horas con ello. Tú céntrate
            en tu negocio; lo de internet lo llevo yo.
          </p>
          <div className='sm-valores-grid'>
            {masAlla.map((m, i) => (
              <div className='sm-valor' key={i} ref={ref(i + 10)}>
                <h3 className='sm-valor-titulo'>{m.titulo}</h3>
                <p className='sm-valor-desc'>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEGOCIOS */}
      <section className='sm-section'>
        <div className='sm-section-inner'>
          <p className='sm-section-label'>Clientes</p>
          <h2 className='sm-section-title'>Negocios que ya<br />confían en mí</h2>
          <div className='sm-servicios-grid sm-negocios-grid'>
            {negocios.map((n, i) => (
              <a
                className='sm-servicio sm-negocio'
                key={n.nombre}
                ref={ref(i + 16)}
                href={n.url}
                target='_blank'
                rel='noopener'
              >
                <h3>{n.nombre}</h3>
                <p>{n.desc}</p>
                <span className='sm-negocio-link'>Ver su web ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className='sm-stack' ref={ref(19)}>
        <div className='sm-section-inner sm-stack-wrap'>
          <p className='sm-section-label'>Herramientas con las que trabajo</p>
          <div className='sm-stack-pills'>
            {stack.map((t, i) => (
              <span className='sm-pill' key={i}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='sm-cta' ref={ref(20)}>
        <p className='sm-cta-label'>¿Empezamos?</p>
        <h2 className='sm-cta-title'>Tu negocio en internet,<br />en buenas manos.</h2>
        <p className='sm-cta-sub'>Cuéntame qué quieres conseguir. Te preparo un presupuesto sin compromiso y te explico cómo te acompañaría mes a mes.</p>
        <Link to='/contacto' className='sm-cta-btn'>Contactar ahora</Link>
      </section>

    </div>
  )
}
