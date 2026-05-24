import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './SobreMi.css'

const valores = [
  {
    num: '01',
    titulo: 'Diseño 100% a medida',
    desc: 'Cero plantillas. Cada web nace de una página en blanco, pensada para reflejar exactamente lo que eres y lo que vendes.',
  },
  {
    num: '02',
    titulo: 'Enfocado en tu negocio',
    desc: 'Antes de escribir código, entiendo tu cliente ideal, tu propuesta de valor y tus objetivos. La web es el resultado, no el punto de partida.',
  },
  {
    num: '03',
    titulo: 'Sin tecnicismos',
    desc: 'Te hablo claro. Sabrás exactamente qué hacemos en cada paso y por qué, sin jerga ni sorpresas.',
  },
  {
    num: '04',
    titulo: 'Contigo a largo plazo',
    desc: 'Cuando la web está online, el trabajo no acaba. Mantenimiento, mejoras y soporte siempre que lo necesites.',
  },
]

const servicios = [
  { icon: '⚡', titulo: 'Landing Pages', desc: 'Páginas optimizadas para captar clientes y comunicar tu valor con claridad y rapidez.' },
  { icon: '🌐', titulo: 'Sitios Web Completos', desc: 'Webs corporativas y tiendas online con catálogo, blog y SEO desde el primer día.' },
  { icon: '🔧', titulo: 'Mantenimiento y SEO', desc: 'Tu web siempre actualizada, segura y bien posicionada en Google.' },
  { icon: '🤖', titulo: 'ChatBot con IA', desc: 'Asistentes inteligentes que atienden a tus clientes 24/7 y captan leads mientras duermes.' },
]

const stack = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Python', 'SQL', 'APIs REST', 'GitHub', 'Stripe', 'EmailJS', 'Cloudflare', 'SEO']

export const SobreMi = () => {
  const refs = useRef([])

  useEffect(() => {
    document.title = 'alexweb | Sobre Mí'

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
          <p className='sm-hero-label'>Desarrollador web freelance · Murcia, España</p>
          <h1 className='sm-hero-title'>
            Hola,<br />soy <span className='sm-hero-gradient'>Alex.</span>
          </h1>
          <p className='sm-hero-sub'>
            Construyo webs que convierten visitas en clientes.
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
          No trabajo con plantillas.<br />
          Cada web que sale de mi escritorio<br />
          se concibe desde <em>cero.</em>
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
      <section className='sm-stats' ref={ref(5)}>
        <div className='sm-stat'>
          <span className='sm-stat-num'>0</span>
          <p className='sm-stat-label'>Plantillas usadas. Siempre desde cero</p>
        </div>
        <div className='sm-stat-divider' />
        <div className='sm-stat'>
          <span className='sm-stat-num'>&lt;24h</span>
          <p className='sm-stat-label'>Tiempo de respuesta garantizado</p>
        </div>
        <div className='sm-stat-divider' />
        <div className='sm-stat'>
          <span className='sm-stat-num'>1:1</span>
          <p className='sm-stat-label'>Trato directo, sin intermediarios</p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className='sm-section'>
        <div className='sm-section-inner'>
          <p className='sm-section-label'>Lo que hago</p>
          <h2 className='sm-section-title'>Servicios pensados<br />para tu negocio</h2>
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

      {/* STACK */}
      <section className='sm-section sm-dark' ref={ref(10)}>
        <div className='sm-section-inner sm-stack-wrap'>
          <p className='sm-section-label'>Tecnología</p>
          <h2 className='sm-section-title'>Las herramientas<br />con las que trabajo</h2>
          <div className='sm-stack-pills'>
            {stack.map((t, i) => (
              <span className='sm-pill' key={i}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='sm-cta' ref={ref(11)}>
        <p className='sm-cta-label'>¿Empezamos?</p>
        <h2 className='sm-cta-title'>Tu negocio merece<br />una web que lo represente.</h2>
        <p className='sm-cta-sub'>Cuéntame tu idea. Preparo presupuestos sin compromiso y adaptados a lo que realmente necesitas.</p>
        <Link to='/contacto' className='sm-cta-btn'>Contactar ahora</Link>
      </section>

    </div>
  )
}
