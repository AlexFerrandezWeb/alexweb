import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './GuiaPlan.css'

/**
 * Guia de tres preguntas que lleva al visitante hasta un plan concreto.
 *
 * Va ANTES de las tablas de precios, no en su lugar: quien llega buscando
 * "cuanto cuesta una pagina web" tiene que seguir viendo el numero sin
 * contestar nada, que es la mayor ventaja que tiene esta web frente a la
 * competencia. Esto es para el que no sabe elegir, y se salta solo.
 *
 * Las respuestas van revelando la siguiente pregunta debajo, en vez de pasar
 * por pantallas: en el movil se lee como una conversacion que baja y no hace
 * falta ni barra de progreso ni botones de atras.
 *
 * Los precios y los textos son copia de las tarjetas de Servicios.jsx. Si
 * cambia un precio alli, cambiarlo aqui: si los dos sitios dicen cosas
 * distintas, el que pierde la confianza es el visitante.
 */

// El 'tipo' de cada resultado es el valor que entiende el desplegable "Tipo de
// proyecto" del formulario, para llegar ya elegido. Ver Contacto.jsx.
const RESULTADOS = {
  landingStarter: {
    nombre: 'Landing Page — Starter',
    precio: 'Desde 350€',
    iva: '+ IVA',
    porque: 'Ofreces un servicio concreto y lo que quieres es que te escriban. Una sola página, directa, sin que el cliente se pierda por el camino.',
    incluye: [
      '1 sección larga y 3 secciones pequeñas',
      'SEO y posicionamiento local',
      'Formulario de contacto y botones de WhatsApp',
      'Entrega en 2-3 semanas',
    ],
    tipo: 'landing',
  },
  landingPremium: {
    nombre: 'Landing Page — Premium',
    precio: 'Desde 499€',
    iva: '+ IVA',
    porque: 'Tienes varias cosas que contar y quieres que la página luzca, no solo que exista.',
    incluye: [
      '8 secciones personalizadas, 2 de ellas grandes',
      'SEO y posicionamiento local o nacional',
      'Formulario, botones flotantes y chat',
      'Google Analytics y Search Console, para saber quién entra',
    ],
    tipo: 'landing',
  },
  sitioBasico: {
    nombre: 'Sitio Web Básico',
    precio: '699€',
    iva: '+ IVA',
    porque: 'Tienes varios servicios que enseñar y quieres que te encuentren en Google. Tu negocio entero en internet, no solo una tarjeta de visita.',
    incluye: [
      'Hasta 5 páginas',
      'SEO básico incluido',
      'Formulario de contacto y Google Analytics',
      'Entrega en 3-4 semanas',
    ],
    tipo: 'sitioweb',
  },
  sitioBasicoPanel: {
    nombre: 'Sitio Web Básico + panel',
    // Se da el total, no "699€ + 290€ + IVA", que con dos sumas seguidas no se
    // sabe si el IVA va sobre una o sobre las dos. El desglose va en la primera
    // linea de lo que incluye, que es donde se puede leer con calma.
    precio: '989€',
    iva: '+ IVA',
    porque: 'Cambias precios, fotos u ofertas a menudo. Con el panel los cambias tú en el momento, un domingo o en agosto, sin esperar a que yo los vea.',
    incluye: [
      'El Sitio Web Básico (699€) más el panel (290€)',
      'Panel para editar textos e imágenes tú mismo',
      'Sin depender de nadie para los cambios del día a día',
      'Entrega en 3-4 semanas',
    ],
    tipo: 'sitioweb',
  },
  ecommerce: {
    nombre: 'E-commerce / Tienda Online',
    precio: 'Desde 999€',
    iva: '+ IVA',
    porque: 'Vas a cobrar por internet. El precio final depende de cuántos productos tengas que cargar.',
    incluye: [
      'Catálogo, carrito y pasarela de pago segura',
      'Panel de gestión de productos y stock',
      'Blog integrado y SEO avanzado',
      'Entrega en 6-8 semanas',
    ],
    tipo: 'sitioweb',
  },
  medida: {
    nombre: 'Proyecto a Medida',
    precio: 'Desde 1.499€',
    iva: '+ IVA',
    porque: 'Lo que necesitas no sale de una lista: hay que construirlo. El precio se cierra contigo según lo que haya que hacer.',
    incluye: [
      'Páginas y funciones sin límite',
      'Agenda de varios profesionales con Google Calendar',
      'Área privada de clientes y panel a medida',
      'Sincronización con tu proveedor o tu programa de gestión',
    ],
    tipo: 'sitioweb',
  },
}

const MANTENIMIENTOS = {
  basico: {
    nombre: 'Mantenimiento Básico',
    precio: '50€/mes',
    detalle: 'Los cambios que pidas, en 2-3 días. Tu web encendida, segura y con copias.',
  },
  premium: {
    nombre: 'Mantenimiento Premium',
    precio: 'Desde 70€/mes',
    detalle: 'Los cambios el mismo día, una llamada al mes y prioridad si algo se cae.',
  },
}

// Cada opcion lleva o un 'resultado' (termina el camino) o un 'siguiente' (abre
// otra pregunta). Asi el arbol se lee entero aqui, sin buscarlo por el render.
const PREGUNTA_1 = {
  titulo: '¿Qué quieres que haga tu web?',
  ayuda: 'Piensa en lo que quieres que pase cuando alguien entre.',
  opciones: [
    {
      valor: 'contacto',
      texto: 'Que me llamen o me escriban',
      matiz: 'Ofrezco un servicio concreto y quiero clientes',
      siguiente: 'landing',
    },
    {
      valor: 'ensenar',
      texto: 'Enseñar todo lo que hago',
      matiz: 'Varios servicios, mis trabajos, mi historia',
      siguiente: 'sitio',
    },
    {
      valor: 'vender',
      texto: 'Vender y cobrar por internet',
      matiz: 'Tengo productos y quiero una tienda',
      resultado: 'ecommerce',
    },
    {
      valor: 'medida',
      texto: 'Algo que no está en esta lista',
      matiz: 'Reservas, citas, área de clientes, conectar con mi programa',
      resultado: 'medida',
    },
  ],
}

const PREGUNTA_2 = {
  landing: {
    titulo: '¿Cuánto tienes que contar?',
    ayuda: 'No hay respuesta mala: es cuánto texto y cuántas fotos tienes.',
    opciones: [
      {
        valor: 'poco',
        texto: 'Poco y al grano',
        matiz: 'Un servicio, mis datos y que me contacten',
        resultado: 'landingStarter',
      },
      {
        valor: 'bastante',
        texto: 'Bastante, y quiero que luzca',
        matiz: 'Varias cosas que explicar y buenas fotos',
        resultado: 'landingPremium',
      },
    ],
  },
  sitio: {
    titulo: '¿Vas a cambiar cosas tú, a menudo?',
    ayuda: 'Precios, fotos, horarios, ofertas.',
    opciones: [
      {
        valor: 'poco',
        texto: 'Casi nunca',
        matiz: 'Un par de veces al año, y ya te lo pido a ti',
        resultado: 'sitioBasico',
      },
      {
        valor: 'mucho',
        texto: 'Cada poco tiempo',
        matiz: 'Cambio precios u ofertas y no quiero esperar a nadie',
        resultado: 'sitioBasicoPanel',
      },
    ],
  },
}

const PREGUNTA_3 = {
  titulo: 'Una última: cuando pidas un cambio, ¿cuánto puedes esperar?',
  ayuda: 'Los 3 primeros meses son gratis en todos los planes. Esto es a partir del cuarto, y lo dejas cuando quieras.',
  opciones: [
    {
      valor: 'basico',
      texto: 'Dos o tres días me valen',
      matiz: 'Mi web no cambia casi nunca',
    },
    {
      valor: 'premium',
      texto: 'Lo necesito el mismo día',
      matiz: 'Vendo online o cambio precios a menudo',
    },
  ],
}

// Chevron del boton de abrir: gira 180 grados cuando la guia esta desplegada.
const Chevron = () => (
  <svg
    className='guia-abrir-chevron'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.4'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='m6 9 6 6 6-6' />
  </svg>
)

const FlechaAbajo = () => (
  <svg
    className='guia-flecha'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M12 5v14' />
    <path d='m19 12-7 7-7-7' />
  </svg>
)

const Opciones = ({ opciones, elegida, onElegir }) => (
  <div className='guia-opciones'>
    {opciones.map((opcion) => (
      <button
        type='button'
        key={opcion.valor}
        className={`guia-opcion${elegida === opcion.valor ? ' is-elegida' : ''}`}
        onClick={() => onElegir(opcion)}
        aria-pressed={elegida === opcion.valor}
      >
        <span className='guia-opcion-texto'>{opcion.texto}</span>
        <span className='guia-opcion-matiz'>{opcion.matiz}</span>
      </button>
    ))}
  </div>
)

export const GuiaPlan = () => {
  // La guia nace cerrada. Quien llega a /servicios viene a por el precio, y el
  // comentario de Servicios.jsx ya decia que no se le puede obligar a pasar por
  // encima de tres preguntas para llegar a las tablas.
  const [abierta, setAbierta] = useState(false)
  const [rama, setRama] = useState(null)       // 'landing' | 'sitio' | null
  const [paso1, setPaso1] = useState(null)
  const [paso2, setPaso2] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [mantenimiento, setMantenimiento] = useState(null)

  // Se lleva a la vista lo ultimo que ha aparecido, que es lo que convierte
  // esto en las flechas del suelo del Ikea: contestas y lo siguiente esta
  // delante. Sin esto, en el movil la pregunta nueva nace fuera de pantalla y
  // parece que el boton no ha hecho nada.
  const ultimoRef = useRef(null)
  const hayQueBajar = useRef(false)

  useEffect(() => {
    if (!hayQueBajar.current || !ultimoRef.current) return
    hayQueBajar.current = false
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ultimoRef.current.scrollIntoView({
      behavior: quieto ? 'auto' : 'smooth',
      block: 'center',
    })
  }, [rama, resultado, mantenimiento])

  const elegirPaso1 = (opcion) => {
    hayQueBajar.current = true
    setPaso1(opcion.valor)
    setPaso2(null)
    setMantenimiento(null)
    setRama(opcion.siguiente ?? null)
    setResultado(opcion.resultado ?? null)
  }

  const elegirPaso2 = (opcion) => {
    hayQueBajar.current = true
    setPaso2(opcion.valor)
    setMantenimiento(null)
    setResultado(opcion.resultado)
  }

  const elegirMantenimiento = (opcion) => {
    hayQueBajar.current = true
    setMantenimiento(opcion.valor)
  }

  const empezarDeNuevo = () => {
    setRama(null)
    setPaso1(null)
    setPaso2(null)
    setResultado(null)
    setMantenimiento(null)
  }

  const plan = resultado ? RESULTADOS[resultado] : null
  const planMantenimiento = mantenimiento ? MANTENIMIENTOS[mantenimiento] : null

  return (
    <section className='guia' id='guia'>
      <div className='guia-cabecera'>
        <span className='guia-etiqueta'>Guía rápida · 3 preguntas</span>
        <h2 className='guia-titulo'>¿No sabes qué web necesita tu negocio?</h2>
        <p className='guia-intro'>
          Contéstame tres preguntas, ninguna técnica, y te digo cuál es la tuya.
          Si ya lo tienes claro, baja y están todos los precios con su letra
          pequeña.
        </p>

        <button
          type='button'
          className={`guia-abrir${abierta ? ' is-abierta' : ''}`}
          onClick={() => setAbierta(a => !a)}
          aria-expanded={abierta}
          aria-controls='guia-pasos'
        >
          {abierta ? 'Ocultar las preguntas' : 'Contestar las 3 preguntas'}
          <Chevron />
        </button>
      </div>

      {abierta && (
        <div className='guia-pasos' id='guia-pasos'>

          <div className='guia-paso'>
            <span className='guia-paso-num'>1</span>
            <h3 className='guia-paso-titulo'>{PREGUNTA_1.titulo}</h3>
            <p className='guia-paso-ayuda'>{PREGUNTA_1.ayuda}</p>
            <Opciones opciones={PREGUNTA_1.opciones} elegida={paso1} onElegir={elegirPaso1} />
          </div>

          {rama && (
            <>
              <FlechaAbajo />
              <div className='guia-paso' ref={!resultado || !paso2 ? ultimoRef : null}>
                <span className='guia-paso-num'>2</span>
                <h3 className='guia-paso-titulo'>{PREGUNTA_2[rama].titulo}</h3>
                <p className='guia-paso-ayuda'>{PREGUNTA_2[rama].ayuda}</p>
                <Opciones opciones={PREGUNTA_2[rama].opciones} elegida={paso2} onElegir={elegirPaso2} />
              </div>
            </>
          )}

          {plan && (
            <>
              <FlechaAbajo />
              <div className='guia-paso' ref={!mantenimiento ? ultimoRef : null}>
                <span className='guia-paso-num'>{rama ? 3 : 2}</span>
                <h3 className='guia-paso-titulo'>{PREGUNTA_3.titulo}</h3>
                <p className='guia-paso-ayuda'>{PREGUNTA_3.ayuda}</p>
                <Opciones opciones={PREGUNTA_3.opciones} elegida={mantenimiento} onElegir={elegirMantenimiento} />
              </div>
            </>
          )}

          {plan && planMantenimiento && (
            <>
              <FlechaAbajo />
              <div className='guia-resultado' ref={ultimoRef}>
                <span className='guia-resultado-etiqueta'>Lo tuyo es</span>
                <h3 className='guia-resultado-nombre'>{plan.nombre}</h3>
                <p className='guia-resultado-precio'>
                  {plan.precio}
                  <span className='guia-resultado-iva'> {plan.iva}</span>
                </p>
                <p className='guia-resultado-porque'>{plan.porque}</p>

                <ul className='guia-resultado-incluye'>
                  {plan.incluye.map((linea) => (
                    <li key={linea}>{linea}</li>
                  ))}
                </ul>

                <div className='guia-resultado-mantenimiento'>
                  <span className='guia-resultado-mantenimiento-titulo'>
                    Y después: {planMantenimiento.nombre}, {planMantenimiento.precio}
                  </span>
                  <span className='guia-resultado-mantenimiento-detalle'>
                    {planMantenimiento.detalle} Los 3 primeros meses van dentro del
                    precio de la web, y no hay permanencia.
                  </span>
                </div>

                <div className='guia-resultado-acciones'>
                  {/* El tipo viaja en la URL para que el formulario llegue ya
                      elegido: el visitante no tiene que decidir dos veces lo
                      mismo, y el aviso llega con el tipo puesto. */}
                  <Link to={`/contacto?tipo=${plan.tipo}`} className='guia-btn-principal'>
                    Pedir presupuesto para esto
                  </Link>
                  <a href='#precios-completos' className='guia-btn-secundario'>
                    Ver todos los planes y su letra pequeña
                  </a>
                </div>

                <button type='button' className='guia-reiniciar' onClick={empezarDeNuevo}>
                  Empezar de nuevo
                </button>
              </div>
            </>
          )}

        </div>
      )}
    </section>
  )
}
