import React from 'react'
import { Link } from 'react-router-dom'
import { FAQ } from '../FAQ'
import { enlaceWhatsApp, registrarClicWhatsApp } from '../../utils/whatsapp'
import './LandingSEO.css'

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    aria-hidden='true'
    className='landing-check'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
)

// Google puede mostrar las preguntas desplegables directamente en los resultados
// si se las damos en formato FAQPage.
//
// Se exporta porque ahora lo consume el `meta` de cada ruta, que se ejecuta en
// el build: así el JSON-LD viaja en el HTML en lugar de inyectarse por JS.
export const construirJsonLd = ({ ruta, titulo, descripcion, faqs }) => {
  const grafo = [
    {
      '@type': 'WebPage',
      '@id': `https://alexweb.es${ruta}#pagina`,
      url: `https://alexweb.es${ruta}`,
      name: titulo,
      description: descripcion,
      isPartOf: { '@id': 'https://alexweb.es/#negocio' },
    },
  ]

  if (faqs?.length) {
    grafo.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ pregunta, respuesta, respuestaTexto }) => ({
        '@type': 'Question',
        name: pregunta,
        // respuestaTexto solo hace falta cuando la respuesta visible es JSX
        acceptedAnswer: { '@type': 'Answer', text: respuestaTexto ?? respuesta },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': grafo }
}

export const LandingSEO = ({ contenido }) => {
  // El SEO (título, descripción, canonical y JSON-LD) ya no se inyecta aquí:
  // lo declara el `meta` de la ruta y se renderiza en el HTML durante el build.
  const { ruta, hero, intro, bloques, precios, faqs, cierre } = contenido

  return (
    <div className='landing'>
      <section className='landing-hero'>
        <div className='landing-hero-content'>
          <span className='landing-badge'>{hero.badge}</span>
          <h1>{hero.h1}</h1>
          <p className='landing-hero-sub'>{hero.subtitulo}</p>
          <div className='landing-hero-actions'>
            <Link to='/contacto' className='landing-btn landing-btn-primary'>
              Pide presupuesto gratis
            </Link>
            <a
              href={enlaceWhatsApp(hero.mensajeWhatsApp)}
              target='_blank'
              rel='noopener noreferrer'
              className='landing-btn landing-btn-secondary'
              onClick={() => registrarClicWhatsApp(`landing_${ruta}`)}
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className='landing-intro'>
        {intro.map((parrafo, i) => (
          <p key={i}>{parrafo}</p>
        ))}
      </section>

      <section className='landing-bloques'>
        <h2>{bloques.titulo}</h2>
        <div className='landing-bloques-grid'>
          {bloques.items.map((item) => (
            <article className='landing-bloque' key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {precios && (
        <section className='landing-precios'>
          <h2>{precios.titulo}</h2>
          {precios.intro && <p className='landing-precios-intro'>{precios.intro}</p>}

          <div className='landing-precios-grid'>
            {precios.planes.map((plan) => (
              <div
                className={`landing-plan${plan.destacado ? ' landing-plan-destacado' : ''}`}
                key={plan.nombre}
              >
                {plan.destacado && <span className='landing-plan-badge'>Más elegido</span>}
                <h3>{plan.nombre}</h3>
                <span className='landing-plan-precio'>{plan.precio}</span>
                <p className='landing-plan-para'>{plan.para}</p>
                <ul>
                  {plan.incluye.map((linea) => (
                    <li key={linea}>
                      <CheckIcon />
                      {linea}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Apunte para quien llega buscando tienda pero en realidad no la
              necesita. Va como texto al margen y no como tarjeta, para no
              competir con los planes de tienda, que son los de esta pagina. */}
          {precios.alMargen && (
            <p className='landing-precios-almargen'>
              {precios.alMargen.texto}{' '}
              <Link to={precios.alMargen.enlaceA}>{precios.alMargen.enlaceTexto}</Link>.
            </p>
          )}

          {precios.nota && <p className='landing-precios-nota'>{precios.nota}</p>}
        </section>
      )}

      {faqs?.length > 0 && <FAQ preguntas={faqs} titulo={cierre.tituloFaq} />}

      <section className='landing-cierre'>
        <h2>{cierre.titulo}</h2>
        <p>{cierre.texto}</p>
        <div className='landing-hero-actions'>
          <Link to='/contacto' className='landing-btn landing-btn-primary'>
            Cuéntame tu proyecto
          </Link>
          <a
            href={enlaceWhatsApp(hero.mensajeWhatsApp)}
            target='_blank'
            rel='noopener noreferrer'
            className='landing-btn landing-btn-outline'
            onClick={() => registrarClicWhatsApp(`landing_cierre_${ruta}`)}
          >
            Escríbeme por WhatsApp
          </a>
        </div>
        <p className='landing-cierre-garantias'>
          Respuesta en menos de 24 h · Presupuesto cerrado, sin sorpresas · Sin permanencia
        </p>
      </section>
    </div>
  )
}
