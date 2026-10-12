import React from 'react'
import './ComoEmpezamos.css'

/**
 * Los tres pasos que van debajo de las dos tarjetas de precio, en Inicio y en
 * Servicios. Vive aparte para que las dos paginas cuenten lo mismo sin tener
 * que copiar el texto en dos sitios.
 */
const PASOS = [
  { titulo: 'Me escribes y hablamos', texto: 'Sin compromiso, por WhatsApp, llamada o email.' },
  { titulo: 'Te paso un precio cerrado', texto: 'Sabrás exactamente qué incluye antes de empezar.' },
  { titulo: 'Tu web online, y yo contigo', texto: 'Cada mes, pendiente de tu negocio.' },
]

export const ComoEmpezamos = () => (
  <div className='como-empezamos'>
    <h3 className='como-empezamos-titulo'>Cómo empezamos</h3>
    <ol className='como-empezamos-pasos'>
      {PASOS.map((paso, i) => (
        <li className='como-empezamos-paso' key={paso.titulo}>
          <span className='como-empezamos-num' aria-hidden='true'>{i + 1}</span>
          <h4>{paso.titulo}</h4>
          <p>{paso.texto}</p>
        </li>
      ))}
    </ol>
  </div>
)
