import React, { useState } from 'react'
import './FAQ.css'

const faqs = [
  {
    pregunta: '¿Cuánto tarda en estar lista mi web?',
    respuesta: (
      <>
        <p className='faq-respuesta'>Depende del tipo de proyecto. Una Landing Page está lista en 2-3 semanas. Un sitio web completo puede tardar entre 3-6 semanas o más dependiendo lo grande que sea. Siempre te daré una estimación concreta antes de empezar.</p>
        <p className='faq-respuesta'>Para que el proceso sea transparente, trabajo por hitos:</p>
        <ul className='faq-hitos'>
          <li>Semana 2 — te presento el diseño inicial</li>
          <li>Semana 4 — web funcional para que la revises</li>
          <li>Semana 6 — entrega final con todos los ajustes</li>
        </ul>
        <p className='faq-respuesta'>Los plazos pueden variar si hay retraso en la entrega de materiales (textos, imágenes, logo) por parte del cliente.</p>
      </>
    )
  },
  {
    pregunta: '¿Tengo que pagar algo por adelantado?',
    respuesta: 'Para Landing Pages no se requiere pago inicial. Para sitios web completos se solicita una señal para reservar tu fecha de inicio. El resto se abona al entregar el proyecto.'
  },
  {
    pregunta: '¿Emites factura?',
    respuesta: 'Sí, emito factura por todos los servicios.'
  },
  {
    pregunta: '¿Puedo desgravarme la factura como autónomo o empresa?',
    respuesta: 'Sí, al ser un servicio profesional con factura puedes desgravarlo en tu declaración. Consulta con tu gestor para más detalles.'
  },
  {
    pregunta: '¿El mantenimiento es obligatorio?',
    respuesta: 'No es obligatorio, pero sí muy recomendado. Sin mantenimiento tu web puede quedarse desactualizada o volverse vulnerable. Es la mejor forma de proteger tu inversión.'
  },
  {
    pregunta: '¿Se puede pagar a plazos?',
    respuesta: 'Sí, hay flexibilidad en los pagos. Hablamos y encontramos una forma que se adapte a ti.'
  },
  {
    pregunta: '¿Hay permanencia en el mantenimiento?',
    respuesta: 'No. Puedes cancelar cuando quieras sin penalización.'
  },
  {
    pregunta: '¿Estás disponible los fines de semana?',
    respuesta: 'Sí, también estoy disponible sábados y domingos para consultas y soporte.'
  }
]

export const FAQ = () => {
  const [abierto, setAbierto] = useState(null)

  const toggle = (index) => {
    setAbierto(prev => prev === index ? null : index)
  }

  return (
    <section className='faq-section'>
      <h2 className='faq-titulo'>Preguntas frecuentes</h2>

      <div className='faq-list'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${abierto === index ? 'faq-item--open' : ''}`}
          >
            <button
              className='faq-pregunta'
              onClick={() => toggle(index)}
              aria-expanded={abierto === index}
            >
              <span>{faq.pregunta}</span>
              <svg
                className='faq-icono'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <path stroke='currentColor' strokeWidth='2' strokeLinecap='round' d='M12 5v14' className='faq-icono-v' />
                <path stroke='currentColor' strokeWidth='2' strokeLinecap='round' d='M5 12h14' className='faq-icono-h' />
              </svg>
            </button>

            <div className='faq-respuesta-wrapper'>
              <div className='faq-respuesta-inner'>
                {typeof faq.respuesta === 'string'
                  ? <p className='faq-respuesta'>{faq.respuesta}</p>
                  : faq.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
