import React from 'react'
import './Testimonios.css'

/*
 * IMPORTANTE — PENDIENTE DE RELLENAR
 *
 * Pide a cada cliente una o dos frases por WhatsApp. Algo tan simple como:
 *   "Hola! Estoy poniendo opiniones en mi web. ¿Te importaría escribirme en dos
 *    líneas qué tal fue trabajar conmigo y qué te ha aportado la web?"
 *
 * Pega la respuesta literal en 'texto'. La sección solo muestra los testimonios
 * que tienen texto, así que hasta que no rellenes ninguno no aparecerá nada en
 * la web. No inventes frases: si un cliente lo ve, pierdes toda la credibilidad.
 */
export const testimonios = [
  {
    texto: '',
    autor: '',
    cargo: 'Nutrigan España',
    web: 'https://www.xn--nutriganespaa-tkb.com/',
  },
  {
    texto: '',
    autor: '',
    cargo: 'Heladería Luxer — San Pedro del Pinatar',
    web: 'https://heladerialuxer.es/',
  },
  {
    texto: '',
    autor: 'Ana María Ramos',
    cargo: 'Anita Pinturitas',
    web: 'https://anitapinturitas.es/',
  },
]

const ComillasIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    aria-hidden='true'
    className='testimonio-comillas'
  >
    <path
      fill='currentColor'
      d='M7.17 5A5.17 5.17 0 0 0 2 10.17a5.1 5.1 0 0 0 5.1 5.1c.3 0 .6-.03.88-.09-.6 1.9-2.2 3.3-4.15 3.62L4.2 21c4.6-.7 8-4.7 8-9.53V10.1A5.1 5.1 0 0 0 7.17 5Zm11.66 0a5.17 5.17 0 0 0-5.17 5.17 5.1 5.1 0 0 0 5.1 5.1c.3 0 .6-.03.88-.09-.6 1.9-2.2 3.3-4.15 3.62l.37 2.2c4.6-.7 8-4.7 8-9.53V10.1A5.1 5.1 0 0 0 18.83 5Z'
    />
  </svg>
)

export const Testimonios = () => {
  const visibles = testimonios.filter((t) => t.texto.trim() !== '')

  if (visibles.length === 0) return null

  return (
    <section className='testimonios-section'>
      <h2 className='section-title'>Lo que dicen mis clientes</h2>
      <p className='testimonios-subtitulo'>Negocios reales que ya tienen su web funcionando</p>

      <div className='testimonios-grid'>
        {visibles.map((testimonio) => (
          <figure className='testimonio-card' key={testimonio.cargo}>
            <ComillasIcon />
            <blockquote>{testimonio.texto}</blockquote>
            <figcaption>
              {testimonio.autor && <span className='testimonio-autor'>{testimonio.autor}</span>}
              {testimonio.web ? (
                <a
                  className='testimonio-cargo'
                  href={testimonio.web}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {testimonio.cargo}
                </a>
              ) : (
                <span className='testimonio-cargo'>{testimonio.cargo}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
