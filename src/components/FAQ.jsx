import React, { useState } from 'react'
import './FAQ.css'

const faqs = [
  {
    pregunta: '¿Cuánto tarda en estar lista mi web?',
    respuesta: (
      <>
        <p className='faq-respuesta'>Depende del tipo de proyecto. Una landing suele estar lista en una semana y una tienda online en unas dos. Si el proyecto es más grande, puede tardar algo más. Siempre te daré una estimación concreta antes de empezar.</p>
        <p className='faq-respuesta'>Para que el proceso sea transparente, trabajo por hitos:</p>
        <ul className='faq-hitos'>
          <li>Primero, te presento el diseño inicial</li>
          <li>Después, la web funcionando para que la revises</li>
          <li>Por último, la entrega con todos los ajustes</li>
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
    pregunta: '¿Qué incluyen los 3 primeros meses de mantenimiento?',
    respuesta: 'Tu web incluye los 3 primeros meses de mantenimiento, sin pagar nada aparte: el alojamiento (tu web encendida, sin pagar servidor por tu cuenta), las actualizaciones de seguridad, las copias, los cambios que me pidas, y que si algo se rompe lo arregle yo. La idea es que no te quedes solo justo cuando la web acaba de salir, que es cuando suelen aparecer los ajustes.'
  },
  {
    pregunta: '¿Y cuando se acaben esos 3 meses?',
    respuesta: 'Decides tú. Si quieres continuar, desde 30€/mes más IVA, sin permanencia. Cada mes te cuento cómo va; cada tres meses, informe completo. Si no quieres seguir, el código y el dominio son tuyos y te los llevas para montar la web donde quieras: lo que pagas cada mes es el alojamiento y tenerme detrás, nunca una licencia por usar tu propia web.'
  },
  {
    pregunta: '¿El mantenimiento es obligatorio?',
    respuesta: 'No. El mantenimiento es opcional y lo decidimos juntos según lo que necesite tu negocio. Si quieres que me encargue de todo, es desde 30€/mes más IVA, con los 3 primeros meses incluidos con tu web, y sin permanencia. Eso sí, dentro va el alojamiento, así que si no lo contratas o lo dejas hay que llevar tu web a otro sitio. Te entrego el código y el dominio para que lo hagas con quien quieras, y te echo una mano con el traspaso.'
  },
  {
    pregunta: '¿El mantenimiento incluye cambiar cosas de mi web?',
    respuesta: 'Sí, los del día a día: un precio, una foto, un texto, los horarios, una oferta. Entran en el mantenimiento. Lo que no entra es el trabajo grande: cargar un catálogo entero, rediseñar secciones o añadir funciones nuevas. Eso no te lo voy a hacer a escondidas ni te lo voy a cobrar por sorpresa: te digo lo que cuesta antes y decides tú.'
  },
  {
    pregunta: '¿Para qué quiero el panel si tú me haces los cambios?',
    respuesta: 'Para no esperarme. Si me pides un cambio te lo hago yo, pero lo verás cuando yo lo vea: puede ser en un rato o al día siguiente. Con el panel lo cambias tú en el momento, a la hora que sea, un domingo o en agosto. Si tu web cambia dos veces al año, no te hace falta. Si cambias precios, fotos u ofertas a menudo, se paga solo.'
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

export const FAQ = ({ preguntas = faqs, titulo = 'Preguntas frecuentes' }) => {
  const [abierto, setAbierto] = useState(null)

  const toggle = (index) => {
    setAbierto(prev => prev === index ? null : index)
  }

  return (
    <section className='faq-section'>
      <h2 className='faq-titulo'>{titulo}</h2>

      <div className='faq-list'>
        {preguntas.map((faq, index) => (
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
