import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Inicio.css'
import { enviarFormularioContacto } from '../utils/enviarFormularioContacto'
import { Testimonios } from './Testimonios'

const FeatureCheckIcon = ({ gold = false }) => (
  <span className={`feature-check${gold ? ' feature-check-gold' : ''}`} aria-hidden='true'>
    {gold ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        className='feature-check-svg'
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='20 6 9 17 4 12' />
      </svg>
    ) : (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        className='feature-check-svg'
      >
        <title>check</title>
        <path
          fill='currentColor'
          d='M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z'
        />
      </svg>
    )}
  </span>
)

/* Filas de la comparativa Landing vs Sitio Web. Compara servicios distintos,
   no los niveles de uno mismo: para eso esta el modal de cada servicio. */
const COMPARATIVA = [
  ['Para quién', 'Un servicio o producto principal', 'Varios servicios, tienda o blog'],
  ['Páginas', 'Una página', 'Las que el proyecto necesite'],
  ['Objetivo', 'Que te contacten', 'Presencia completa, vender y posicionar'],
  ['SEO', 'Básico, enfocado a una búsqueda', 'Ampliado, para muchas búsquedas'],
  ['Blog', 'No', 'Sí, autogestionable'],
  ['Tienda online', 'No', 'Sí, a partir del nivel E-commerce'],
  ['Panel para editarla tú', 'No', 'Sí, incluido desde E-commerce o por 290€ en el Básico'],
  ['Entrega', '2-3 semanas', 'Según el proyecto'],
  ['Desde, más IVA', '350€', '699€'],
  ['Elígela si…', 'Quieres algo rápido y directo', 'Quieres que tu negocio viva en internet'],
]

const getMensajeError = (el) => {
  if (el.validity.valueMissing) return 'Este campo es obligatorio'
  if (el.validity.typeMismatch) return 'Introduce un email válido'
  if (el.validity.tooShort) return `Mínimo ${el.minLength} caracteres (llevas ${el.value.length})`
  return 'Comprueba este campo'
}

export const Inicio = () => {
  const [slideActual, setSlideActual] = useState({ 'Heladería Luxer': 1, 'Anita Pinturitas': 2 })
  const [modalPlanes, setModalPlanes] = useState(false)
  const refModal = useRef(null)
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', prefijo: '+34', telefono: '', tipoProyecto: '', mensaje: '' })
  const [contactEnviado, setContactEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)
  const [erroresCampos, setErroresCampos] = useState({})
  const [camposAgitados, setCamposAgitados] = useState([])
  const [filasReveladas, setFilasReveladas] = useState({})
  const filasRef = useRef([])
  const capturasPrecargadas = useRef(new Set())
  const porqueRef = useRef(null)
  const [porqueIndice, setPorqueIndice] = useState(0)
  const porquePausaRef = useRef(null)
  const porqueGestoRef = useRef(null)
  const porqueAsentarRef = useRef(null)
  const modalGridRef = useRef(null)
  const [modalIndice, setModalIndice] = useState(0)
  const [modalTotal, setModalTotal] = useState(0)
  const [porquePausado, setPorquePausado] = useState(false)
  const [porqueVisible, setPorqueVisible] = useState(false)

  const handleContactChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'telefono') value = value.replace(/\D/g, '').slice(0, 9)
    setContactForm(prev => ({ ...prev, [e.target.name]: value }))
    setErroresCampos(prev => {
      if (!prev[e.target.name]) return prev
      const next = { ...prev }
      delete next[e.target.name]
      return next
    })
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (enviando) return

    const invalidos = {}
    for (const el of e.target.elements) {
      if (el.name && !el.checkValidity()) invalidos[el.name] = getMensajeError(el)
    }
    if (Object.keys(invalidos).length > 0) {
      setErroresCampos(invalidos)
      setCamposAgitados(Object.keys(invalidos))
      setTimeout(() => setCamposAgitados([]), 600)
      return
    }

    setErroresCampos({})
    setEnviando(true)
    setErrorEnvio(false)
    try {
      await enviarFormularioContacto(contactForm)
      setContactEnviado(true)
      setContactForm({ nombre: '', email: '', prefijo: '+34', telefono: '', tipoProyecto: '', mensaje: '' })
    } catch (error) {
      console.error('Error enviando email:', error)
      setErrorEnvio(true)
    } finally {
      setEnviando(false)
    }
  }

  useEffect(() => {
    if (!modalPlanes) return
    // Al saltar de la comparativa a un plan cambia el contenido pero el modal
    // sigue montado, asi que conservaria el scroll de la tabla y el nuevo
    // contenido apareceria empezado por la mitad.
    refModal.current?.scrollTo(0, 0)
    const cerrarConEsc = (e) => { if (e.key === 'Escape') setModalPlanes(false) }
    document.addEventListener('keydown', cerrarConEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', cerrarConEsc)
      document.body.style.overflow = ''
    }
  }, [modalPlanes])

  const proyectos = [
    {
      nombre: 'Nutrigan España',
      subtitulo: 'Tienda online',
      descripcion: 'Distribuidor de productos veterinarios y suplementos para ganado. Ahora vende su catálogo por internet, con pago con tarjeta y sin depender de llamadas.',
      features: [
        'Catálogo con fichas de producto y precios',
        'Carrito y pago con tarjeta',
        'Contacto directo por WhatsApp',
        'Se ve bien en móvil, tablet y ordenador',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Node.js, Stripe, Render',
      url: 'https://www.xn--nutriganespaa-tkb.com/',
      imagenEscritorio: '/assets/nutriganWEB_escritorio.webp',
      imagenTablet: '/assets/nutriganWEB_ipad.webp',
      imagenMovil: '/assets/nutriganWEB_iphone.webp'
    },
    {
      nombre: 'Heladería Luxer',
      subtitulo: 'Sitio web',
      descripcion: 'Heladería de temporada en San Pedro del Pinatar. Sus clientes consultan la carta y los precios desde el móvil, en tres idiomas, sin tener que entrar al local y sin depender de la carta física.',
      features: [
        'Carta digital con todos los sabores y precios',
        'Español, inglés y francés en un clic',
        'Galería de fotos del local y los productos',
        'Preparada para salir en Google en búsquedas de la zona',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Cloudflare Pages',
      url: 'https://heladerialuxer.es/',
      imagenEscritorio: '/assets/heladeriaLuxerWEB_escritorio.webp',
      imagenTablet: '/assets/heladeriaLuxerWEB_ipad.webp',
      imagenMovil: '/assets/heladeriaLuxerWEB_iphone.webp'
    },
    {
      nombre: 'Anita Pinturitas',
      subtitulo: 'Tienda online',
      descripcion: 'Experta en belleza y maquillaje con más de 20 años de oficio. Vende sus productos de cosmética por internet y recibe las reservas de bodas por WhatsApp.',
      features: [
        'Catálogo con carrito y pago seguro',
        'Tarjeta, PayPal y Bizum',
        'Reservas de maquillaje de bodas por WhatsApp',
        'Galería con clientas reales',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Python 3, Stripe, Render',
      url: 'https://anitapinturitas.es/',
      imagenEscritorio: '/assets/anitapinturitasWEB_escritorio.webp',
      imagenTablet: '/assets/anitapinturitasWEB_ipad.webp',
      imagenMovil: '/assets/anitapinturitasWEB_iphone.webp'
    }
  ];

  // ── Carrusel de "por que necesitas una web" ──────────────────────────────
  // Scroll nativo con scroll-snap, no un slider a base de transform: asi el
  // avance automatico y el deslizar a dedo son el mismo mecanismo, y el teclado
  // y el lector de pantalla siguen funcionando gratis.

  // Posicion de cada tarjeta dentro del scroll, medida en vivo: depende del
  // ancho de pantalla, que cambia con el breakpoint y al girar el movil.
  const posicionesDe = (cont) => {
    if (!cont) return []
    const izquierdaCont = cont.getBoundingClientRect().left
    return [...cont.children].map(
      (tarjeta) => cont.scrollLeft + tarjeta.getBoundingClientRect().left - izquierdaCont
    )
  }

  const irATarjetaDe = (cont, indice) => {
    if (!cont) return
    const posiciones = posicionesDe(cont)
    if (posiciones[indice] === undefined) return cont.scrollTo({ left: 0, behavior: 'smooth' })
    cont.scrollTo({ left: posiciones[indice], behavior: 'smooth' })
  }

  const indiceCercanoDe = (cont) => {
    if (!cont) return 0
    const posiciones = posicionesDe(cont)
    let cercana = 0
    posiciones.forEach((pos, i) => {
      if (Math.abs(pos - cont.scrollLeft) < Math.abs(posiciones[cercana] - cont.scrollLeft)) cercana = i
    })
    return cercana
  }

  const posicionesPorque = () => posicionesDe(porqueRef.current)

  const irATarjetaPorque = (indice) => irATarjetaDe(porqueRef.current, indice)

  const indiceCercanoPorque = () => indiceCercanoDe(porqueRef.current)

  // Un gesto, una tarjeta. scroll-snap-stop ya frena el impulso de un
  // deslizamiento rapido, pero no el arrastre largo: ahi el contenido sigue al
  // dedo y puede acabar tres tarjetas mas alla. Se apunta en que tarjeta
  // empezaba el gesto y, cuando el scroll se para, se devuelve a la de al lado
  // si se ha pasado. Solo se arma con un gesto del usuario, asi que los saltos
  // que damos nosotros (los puntos, la vuelta al principio) no se tocan.
  const empezarGestoPorque = () => {
    if (porqueGestoRef.current === null) porqueGestoRef.current = indiceCercanoPorque()
  }

  // Al tocar el carrusel se para, y vuelve a andar 6s despues de soltarlo: si
  // se reanudara al momento, daria un tiron encima del dedo del usuario.
  const pausarPorque = () => {
    clearTimeout(porquePausaRef.current)
    setPorquePausado(true)
  }

  const reanudarPorque = () => {
    clearTimeout(porquePausaRef.current)
    porquePausaRef.current = setTimeout(() => setPorquePausado(false), 6000)
  }

  // Los puntos siguen al scroll real, tanto si el salto lo ha dado el
  // temporizador como si ha sido el dedo del usuario.
  useEffect(() => {
    const cont = porqueRef.current
    if (!cont) return

    const alScroll = () => {
      setPorqueIndice(indiceCercanoPorque())

      if (porqueGestoRef.current === null) return

      // 140ms sin un solo evento de scroll = el dedo ya solto y la inercia se
      // acabo. Es el momento de corregir, no antes: durante el gesto el
      // contenido tiene que seguir al dedo o se siente agarrotado.
      clearTimeout(porqueAsentarRef.current)
      porqueAsentarRef.current = setTimeout(() => {
        const desde = porqueGestoRef.current
        porqueGestoRef.current = null
        const ahora = indiceCercanoPorque()
        if (Math.abs(ahora - desde) > 1) irATarjetaPorque(desde + Math.sign(ahora - desde))
      }, 140)
    }

    cont.addEventListener('scroll', alScroll, { passive: true })
    return () => {
      cont.removeEventListener('scroll', alScroll)
      clearTimeout(porqueAsentarRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Solo se mueve cuando la seccion esta en pantalla: fuera de vista seria
  // trabajo tirado, y ademas el usuario se perderia el movimiento.
  useEffect(() => {
    const cont = porqueRef.current
    if (!cont || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entrada]) => setPorqueVisible(entrada.isIntersecting),
      { threshold: 0.4 }
    )
    observer.observe(cont)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Arriba de 900px las cuatro tarjetas se ven de golpe en la rejilla: ahi no
    // hay carrusel que avanzar. Y si el usuario pide menos movimiento, se queda
    // quieto y se pasa a dedo.
    const esCarrusel = window.matchMedia('(max-width: 900px)')
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!esCarrusel.matches || menosMovimiento.matches) return
    if (!porqueVisible || porquePausado) return

    const temporizador = setInterval(() => {
      const cont = porqueRef.current
      if (!cont) return
      // Se cuentan tarjetas, no pixeles: detras de la ultima hay un hueco a
      // proposito para que pueda llegar al borde, asi que medir contra el final
      // del scroll daria una vuelta de mas o de menos.
      const ultima = cont.children.length - 1
      if (porqueIndice >= ultima) cont.scrollTo({ left: 0, behavior: 'smooth' })
      else irATarjetaPorque(porqueIndice + 1)
    }, 4000)

    return () => clearInterval(temporizador)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [porqueVisible, porquePausado, porqueIndice])

  useEffect(() => () => {
    clearTimeout(porquePausaRef.current)
    clearTimeout(porqueAsentarRef.current)
  }, [])

  // Los planes del modal tambien se pasan de lado en movil. Sin avance
  // automatico a proposito: aqui el usuario esta comparando precios para
  // decidir, y que la tarjeta se le mueva mientras lee es justo lo que no
  // quiere. Se re-engancha con cada modal porque cada uno monta su propia
  // rejilla, con dos o tres planes.
  useEffect(() => {
    const cont = modalGridRef.current
    setModalIndice(0)

    if (!cont) {
      setModalTotal(0)
      return
    }

    setModalTotal(cont.children.length)

    // Igual que el scrollTo(0, 0) vertical de mas arriba: el modal no se
    // desmonta al saltar de un plan a otro, asi que la rejilla conservaria el
    // desplazamiento anterior y abriria por la mitad de la segunda tarjeta.
    cont.scrollLeft = 0

    const alScroll = () => setModalIndice(indiceCercanoDe(cont))
    cont.addEventListener('scroll', alScroll, { passive: true })
    return () => cont.removeEventListener('scroll', alScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalPlanes])

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const todasReveladas = proyectos.reduce((acc, _, i) => ({ ...acc, [i]: true }), {})
      setFilasReveladas(todasReveladas)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.workIndex
            setFilasReveladas((previo) => (previo[idx] ? previo : { ...previo, [idx]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )

    filasRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cuando una fila entra en pantalla precargamos sus tres capturas. Ahora que
  // pesan ~70 KB en WebP sale a cuenta: al pulsar la flecha del slider la
  // imagen ya esta en cache y el cambio es instantaneo, en lugar de quedarse
  // el hueco en blanco mientras se descarga.
  useEffect(() => {
    Object.keys(filasReveladas).forEach((indice) => {
      const proyecto = proyectos[Number(indice)]
      if (!proyecto) return
      const capturas = [proyecto.imagenEscritorio, proyecto.imagenTablet, proyecto.imagenMovil]
      capturas.forEach((src) => {
        if (capturasPrecargadas.current.has(src)) return
        capturasPrecargadas.current.add(src)
        const img = new Image()
        img.src = src
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filasReveladas]);

  const obtenerIndiceSlide = (nombreProyecto, totalCapturas) => {
    const indice = slideActual[nombreProyecto] ?? 0
    return indice >= totalCapturas ? 0 : indice
  }

  const cambiarSlide = (nombreProyecto, totalCapturas, direccion) => {
    setSlideActual((previo) => {
      const actual = previo[nombreProyecto] ?? 0
      const siguiente = (actual + direccion + totalCapturas) % totalCapturas
      return { ...previo, [nombreProyecto]: siguiente }
    })
  }

  const seleccionarSlide = (nombreProyecto, indice) => {
    setSlideActual((previo) => ({ ...previo, [nombreProyecto]: indice }))
  }

  // Mismo bloque de puntos para los tres modales de planes. Solo se ve donde
  // hay carrusel: en escritorio la rejilla enseña los planes uno al lado del
  // otro y no hay nada que indicar.
  const puntosModal = (
    <div className='modal-dots'>
      {Array.from({ length: modalTotal }, (_, i) => (
        <button
          type='button'
          key={i}
          className={`modal-dot ${i === modalIndice ? 'is-active' : ''}`}
          onClick={() => irATarjetaDe(modalGridRef.current, i)}
          aria-label={`Ver el plan ${i + 1} de ${modalTotal}`}
        />
      ))}
    </div>
  )

  return (
    <div className='inicio-container'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-bg-blur hero-bg-blur-1' aria-hidden='true' />
        <div className='hero-bg-blur hero-bg-blur-2' aria-hidden='true' />
        <div className='hero-content'>
          <span className='hero-badge'>Diseño web para pymes y autónomos · Toda España</span>
          <h1>Tu negocio, en Google.<br />Sin complicaciones.</h1>
          <p>Creo la web de tu negocio a medida: rápida, que se vea perfecta en el móvil y que tus clientes te encuentren. Tú te centras en lo tuyo, yo me encargo del resto.</p>
          <div className='hero-actions'>
            <Link to='/contacto' className='hero-btn hero-btn-primary'>Pide presupuesto gratis</Link>
            <Link to='/servicios' className='hero-btn hero-btn-secondary'>Ver planes y precios</Link>
          </div>
          <ul className='hero-garantias'>
            <li>Respuesta en menos de 24 h</li>
            <li>Presupuesto cerrado, sin sorpresas</li>
            <li>Sin permanencia</li>
          </ul>
        </div>
      </section>

      {/* Va antes de la rejilla de precios a proposito: primero hay que
          responder "para que la necesito" y despues "cuanto cuesta". Al reves,
          el precio llega sin contexto y solo se lee como un gasto. */}
      <section className='porque-section'>
        <h2 className='section-title'>¿Por qué necesitas una página web?</h2>
        <div
          className='porque-grid'
          ref={porqueRef}
          onPointerDown={() => { pausarPorque(); empezarGestoPorque() }}
          onPointerUp={reanudarPorque}
          onPointerCancel={reanudarPorque}
          onWheel={() => { pausarPorque(); empezarGestoPorque(); reanudarPorque() }}
          onMouseEnter={pausarPorque}
          onMouseLeave={reanudarPorque}
          onFocusCapture={pausarPorque}
          onBlurCapture={reanudarPorque}
        >
          <div className='porque-item'>
            <h3>Te encuentran cuando te buscan</h3>
            <p>Cada día alguien busca en Google lo que tú ofreces. Si no apareces, contrata a otro.</p>
          </div>
          <div className='porque-item'>
            <h3>No dependes de las redes</h3>
            <p>Tu cuenta de Instagram no es tuya. Tu web sí, y nadie te la puede cerrar.</p>
          </div>
          <div className='porque-item'>
            <h3>Trabaja mientras duermes</h3>
            <p>Contesta dudas, muestra tus servicios y recoge contactos a cualquier hora.</p>
          </div>
          <div className='porque-item'>
            <h3>Transmite confianza</h3>
            <p>Un negocio sin web genera dudas. Uno con web bien hecha, no.</p>
          </div>
        </div>

        {/* Los puntos solo se ven donde hay carrusel: en escritorio la rejilla
            enseña las cuatro tarjetas y no hay nada que indicar. */}
        <div className='porque-dots'>
          {['Te encuentran cuando te buscan', 'No dependes de las redes', 'Trabaja mientras duermes', 'Transmite confianza'].map((titulo, i) => (
            <button
              type='button'
              key={titulo}
              className={`porque-dot ${i === porqueIndice ? 'is-active' : ''}`}
              onClick={() => { pausarPorque(); irATarjetaPorque(i); reanudarPorque() }}
              aria-label={`Ver "${titulo}"`}
            />
          ))}
        </div>
        {/* Ancla nativa y no <Link>: es un salto dentro de la misma pagina, el
            router no tiene que intervenir. Reusa .comparar-enlace, que ya es el
            estilo de "enlace de apoyo" de esta pagina. */}
        <a href='#precios' className='comparar-enlace porque-enlace'>Mira cuánto cuesta tu web</a>
      </section>

      {/* Products Section */}
      <section className='products-section' id='precios'>
        <h2 className='section-title'>Servicios</h2>

        <div className='products-grid'>

          {/* Card 1 */}
          <div className='product-card'>
            <h3>Landing Page</h3>
            <span className='price'><span className='price-span'>Desde </span>350€<span className='price-iva'> más IVA</span></span>
            <p className='card-para-quien'>Ideal si ofreces un servicio concreto y quieres que te contacten. Una sola página, directa y al grano — sin que el cliente se pierda.</p>
            <ul className='features'>
              <li><FeatureCheckIcon /> SEO y posicionamiento local</li>
              <li><FeatureCheckIcon /> Diseño responsive</li>
              <li><FeatureCheckIcon /> Formulario de contacto</li>
              <li><FeatureCheckIcon /> Botones flotantes de WhatsApp y chat</li>
            </ul>
            <button className='card-btn' onClick={() => setModalPlanes('landing')}>Ver planes</button>
          </div>

          {/* Card 2 */}
          <div className='product-card product-card-featured'>
            <span className='featured-badge'>Más elegido</span>
            <h3>Sitio Web</h3>
            <span className='price'><span className='price-span'>Desde </span>699€<span className='price-iva'> más IVA</span></span>
            <p className='card-para-quien'>Ideal si tienes varios servicios, quieres vender online o publicar un blog. Tu negocio entero en internet, no solo una tarjeta de visita.</p>
            {/* El precio que se ve aqui es el del nivel Basico, asi que las
                features son las suyas: la tienda y el blog llegan con los
                niveles E-commerce y Proyecto a Medida, dentro del modal. */}
            <p className='description'>Para negocios que necesitan más que una página: varias secciones y, si lo necesitas, tienda online y blog.</p>
            <ul className='features'>
              <li><FeatureCheckIcon /> Hasta 5 páginas</li>
              <li><FeatureCheckIcon /> Diseño Responsive</li>
              <li><FeatureCheckIcon /> SEO básico incluido</li>
              <li><FeatureCheckIcon /> Formulario de contacto</li>
            </ul>
            <button className='card-btn' onClick={() => setModalPlanes('sitioweb')}>Ver planes</button>
          </div>

          {/* Card 3 */}
          <div className='product-card'>
            <h3>Mantenimiento y SEO</h3>
            <span className='price'><span className='price-span'>Desde </span>50€<span className='price-iva'> más IVA</span></span>
            <p className='card-para-quien'>Para webs ya publicadas que necesitan mantenerse seguras y subir en Google mes a mes.</p>
            <p className='description'>No basta con tener una web, hay que cuidarla. Mi servicio de mantenimiento
            asegura que tu sitio esté siempre actualizado y seguro, mientras mejoro tu posicionamiento en Google.</p>
            <ul className='features'>
              <li><FeatureCheckIcon /> Actualizaciones de seguridad y copias de seguridad</li>
              <li><FeatureCheckIcon /> Optimización SEO On-Page</li>
              <li><FeatureCheckIcon /> Informes mensuales de rendimiento</li>
              <li><FeatureCheckIcon /> Soporte técnico 24h los 7 días de la semana</li>
            </ul>
            <button className='card-btn' onClick={() => setModalPlanes('mantenimiento')}>Ver planes</button>
          </div>

        </div>

        <button type='button' className='comparar-enlace' onClick={() => setModalPlanes('comparar')}>
          ¿No sabes cuál elegir? Compara Landing y Sitio Web
        </button>

        <div className='chatbot-banner'>
          <div className='chatbot-banner-texto'>
            <span className='chatbot-banner-badge'>Nuevo</span>
            <h3>ChatBot con IA</h3>
            <p>Un asistente en tu web que atiende a tus clientes las 24 horas, resuelve sus dudas y te deja su nombre y su teléfono para que puedas llamarles.</p>
          </div>
          <div className='chatbot-banner-precio'>
            <span className='chatbot-banner-desde'>Precio</span>
            <span className='chatbot-banner-valor'>A consultar</span>
            <Link to='/contacto' className='card-btn chatbot-banner-btn'>Pedir presupuesto</Link>
          </div>
        </div>
      </section>

      <section className='work-section'>
        <h2 className='section-title'>Mi trabajo</h2>
        <p className='work-subtitle'>Proyectos reales desarrollados desde cero para negocios</p>

        <div className='work-list'>
          {proyectos.map((proyecto, index) => (
            (() => {
              const capturas = [
                {
                  etiqueta: 'Escritorio',
                  src: proyecto.imagenEscritorio,
                  alt: `Vista de escritorio del proyecto ${proyecto.nombre}`
                },
                {
                  etiqueta: 'Tablet',
                  src: proyecto.imagenTablet,
                  alt: `Vista en tablet del proyecto ${proyecto.nombre}`
                },
                {
                  etiqueta: 'Movil',
                  src: proyecto.imagenMovil,
                  alt: `Vista en movil del proyecto ${proyecto.nombre}`
                }
              ]

              const indiceActual = obtenerIndiceSlide(proyecto.nombre, capturas.length)
              const capturaActual = capturas[indiceActual]
              const idGradienteFlechas = `work-arrow-grad-${index}`

              return (
                <article
                  ref={(el) => (filasRef.current[index] = el)}
                  data-work-index={index}
                  className={`work-row ${index % 2 !== 0 ? 'work-row-reverse' : ''} ${filasReveladas[index] ? 'is-revealed' : ''}`}
                  key={proyecto.nombre}
                  style={{ '--work-index': index }}
                >
                  <span className='work-index' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
                  <div className='work-media'>
                    <div className='work-slider'>
                      <div className='work-slider-track'>
                        <button
                          type='button'
                          className='work-slider-arrow work-slider-arrow-prev'
                          onClick={() => cambiarSlide(proyecto.nombre, capturas.length, -1)}
                          aria-label={`Ver captura anterior de ${proyecto.nombre}`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                            className='work-slider-arrow-icon'
                          >
                            <defs>
                              <linearGradient
                                id={idGradienteFlechas}
                                x1='0%'
                                y1='0%'
                                x2='100%'
                                y2='100%'
                              >
                                <stop offset='0%' stopColor='#667eea' />
                                <stop offset='100%' stopColor='#764ba2' />
                              </linearGradient>
                            </defs>
                            <path
                              fill={`url(#${idGradienteFlechas})`}
                              d='M16 5v2h-2V5zm-4 4V7h2v2zm-2 2V9h2v2zm0 2H8v-2h2zm2 2v-2h-2v2zm0 0h2v2h-2zm4 4v-2h-2v2z'
                            />
                          </svg>
                        </button>

                        <div className='work-slider-viewport'>
                          <img
                            key={capturaActual.src}
                            src={capturaActual.src}
                            alt={capturaActual.alt}
                            className={`work-image work-image-main work-image-${capturaActual.etiqueta.toLowerCase()}`}
                            decoding='async'
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : 'auto'}
                          />
                        </div>

                        <button
                          type='button'
                          className='work-slider-arrow work-slider-arrow-next'
                          onClick={() => cambiarSlide(proyecto.nombre, capturas.length, 1)}
                          aria-label={`Ver captura siguiente de ${proyecto.nombre}`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                            className='work-slider-arrow-icon'
                          >
                            <path
                              fill={`url(#${idGradienteFlechas})`}
                              d='M8 5v2h2V5zm4 4V7h-2v2zm2 2V9h-2v2zm0 2h2v-2h-2zm-2 2v-2h2v2zm0 0h-2v2h2zm-4 4v-2h2v2z'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className='work-slider-dots' role='tablist' aria-label={`Selector de capturas ${proyecto.nombre}`}>
                      {capturas.map((captura, indice) => (
                        <button
                          type='button'
                          key={captura.etiqueta}
                          className={`work-slider-dot ${indice === indiceActual ? 'is-active' : ''}`}
                          onClick={() => seleccionarSlide(proyecto.nombre, indice)}
                          aria-label={`Mostrar ${captura.etiqueta} de ${proyecto.nombre}`}
                        >
                          {captura.etiqueta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='work-content'>
                    <h3>{proyecto.nombre}</h3>
                    {proyecto.subtitulo && <p className='work-subtitulo'>{proyecto.subtitulo}</p>}
                    <p className='work-description'>{proyecto.descripcion}</p>
                    {proyecto.features && (
                      <ul className='work-features'>
                        {proyecto.features.map((f) => (
                          <li key={f}><FeatureCheckIcon />{f}</li>
                        ))}
                      </ul>
                    )}
                    <p className='work-tech'>
                      <span className='work-tech-lista'>{proyecto.tecnologias}</span>
                      <span className='work-tech-resumen'>¿No te suena de nada? Tranquilo: significa que tu web se ha hecho a mano, pieza a pieza, y no con una plantilla</span>
                    </p>
                    <a
                      href={proyecto.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='work-btn'
                    >
                      Visitar WEB
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                        className='work-btn-arrow'
                      >
                        <title>arrow-right</title>
                        <path
                          fill='currentColor'
                          d='M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2zm10-4h2v2h-2zm0 0h-2V5h2zm0 10h2v-2h-2zm0 0h-2v2h2z'
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              )
            })()
          ))}
        </div>
      </section>

      <Testimonios />

      {/* Contact Section */}
      <section className='inicio-contact-section'>
        <h2 className='section-title'>¿Hablamos?</h2>
        <p className='inicio-contact-subtitle'>¿Tienes un proyecto en mente? Cuéntame y te preparo un presupuesto sin compromiso.</p>

        <div className='inicio-contact-form-wrapper'>
          {contactEnviado ? (
            <div className='inicio-contact-success'>
              <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#764ba2' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <h3>¡Mensaje enviado!</h3>
              <p>Gracias por contactarme. Te responderé en menos de 24 horas. Revisa tu correo electrónico y ¡que tengas un buen día!</p>
              <button className='inicio-contact-btn' onClick={() => setContactEnviado(false)}>Enviar otro mensaje</button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} noValidate>
              <p className='inicio-form-nota'>Solo necesito tu nombre, tu email y dos líneas. Te respondo en menos de 24 h.</p>
              <div className='inicio-form-group'>
                <label htmlFor='ic-nombre'>Nombre</label>
                <input
                  type='text'
                  id='ic-nombre'
                  name='nombre'
                  className={camposAgitados.includes('nombre') ? 'campo-invalido' : erroresCampos.nombre ? 'campo-error' : undefined}
                  placeholder='Tu nombre'
                  value={contactForm.nombre}
                  onChange={handleContactChange}
                  required
                />
                {erroresCampos.nombre && <span className='campo-error-msg'>{erroresCampos.nombre}</span>}
              </div>

              <div className='inicio-form-group'>
                <label htmlFor='ic-email'>Email</label>
                <input
                  type='email'
                  id='ic-email'
                  name='email'
                  className={camposAgitados.includes('email') ? 'campo-invalido' : erroresCampos.email ? 'campo-error' : undefined}
                  placeholder='tucorreo@ejemplo.com'
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                />
                {erroresCampos.email && <span className='campo-error-msg'>{erroresCampos.email}</span>}
              </div>

              <div className='inicio-form-group'>
                <label htmlFor='ic-telefono'>Número móvil <span className='inicio-form-opcional'>(opcional)</span></label>
                <div className='telefono-wrapper'>
                  <select
                    name='prefijo'
                    className='prefijo-select'
                    value={contactForm.prefijo}
                    onChange={handleContactChange}
                    aria-label='Prefijo de país'
                  >
                    <option value='+34'>🇪🇸 +34</option>
                    <option value='+44'>🇬🇧 +44</option>
                    <option value='+33'>🇫🇷 +33</option>
                    <option value='+49'>🇩🇪 +49</option>
                    <option value='+39'>🇮🇹 +39</option>
                    <option value='+351'>🇵🇹 +351</option>
                    <option value='+31'>🇳🇱 +31</option>
                    <option value='+32'>🇧🇪 +32</option>
                    <option value='+41'>🇨🇭 +41</option>
                    <option value='+1'>🇺🇸 +1</option>
                    <option value='+52'>🇲🇽 +52</option>
                    <option value='+54'>🇦🇷 +54</option>
                    <option value='+57'>🇨🇴 +57</option>
                  </select>
                  <input
                    type='tel'
                    id='ic-telefono'
                    name='telefono'
                    className={camposAgitados.includes('telefono') ? 'campo-invalido' : erroresCampos.telefono ? 'campo-error' : undefined}
                    inputMode='numeric'
                    maxLength={9}
                    placeholder='600000000'
                    value={contactForm.telefono}
                    onChange={handleContactChange}
                  />
                </div>
                {erroresCampos.telefono && <span className='campo-error-msg'>{erroresCampos.telefono}</span>}
              </div>

              <div className='inicio-form-group'>
                <label htmlFor='ic-tipo-proyecto'>Tipo de proyecto</label>
                <select
                  id='ic-tipo-proyecto'
                  name='tipoProyecto'
                  className={camposAgitados.includes('tipoProyecto') ? 'campo-invalido' : erroresCampos.tipoProyecto ? 'campo-error' : undefined}
                  value={contactForm.tipoProyecto}
                  onChange={handleContactChange}
                  required
                >
                  <option value='' disabled>Selecciona una opción</option>
                  <option value='nolose'>Todavía no lo sé, quiero que me asesores</option>
                  <option value='landing'>Landing Page</option>
                  <option value='sitioweb'>Sitio Web</option>
                  <option value='mantenimiento'>Mantenimiento</option>
                  <option value='chatbot'>ChatBot</option>
                  <option value='otro'>Otro (especifícalo en el mensaje)</option>
                </select>
                {erroresCampos.tipoProyecto && <span className='campo-error-msg'>{erroresCampos.tipoProyecto}</span>}
              </div>

              <div className='inicio-form-group'>
                <label htmlFor='ic-mensaje'>Mensaje</label>
                <textarea
                  id='ic-mensaje'
                  name='mensaje'
                  className={camposAgitados.includes('mensaje') ? 'campo-invalido' : erroresCampos.mensaje ? 'campo-error' : undefined}
                  rows='5'
                  placeholder='Ej: "Tengo una peluquería y quiero una web sencilla. ¿Cuánto costaría?"'
                  value={contactForm.mensaje}
                  onChange={handleContactChange}
                  required
                />
                {erroresCampos.mensaje && <span className='campo-error-msg'>{erroresCampos.mensaje}</span>}
              </div>

              {errorEnvio && (
                <div className='inicio-form-error' role='alert'>
                  Ha habido un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbeme directamente por WhatsApp.
                </div>
              )}

              <button type='submit' className='inicio-contact-btn' disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>
      </section>

      {modalPlanes && (
        <div className='modal-overlay' onClick={() => setModalPlanes(false)}>
          <div className='modal-planes' ref={refModal} onClick={(e) => e.stopPropagation()}>
            <button className='modal-cerrar' onClick={() => setModalPlanes(false)} aria-label='Cerrar'>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z'/>
              </svg>
            </button>

            {modalPlanes === 'sitioweb' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Sitio Web</h2>
                <p className='modal-subtitulo'>Tres tipos de web según lo que necesites</p>
                <p className='tipos-web-intro'>Todas las webs se desarrollan desde cero, sin plantillas ni constructores.</p>
                <div className='modal-grid' ref={modalGridRef} key={modalPlanes}>
                  {/* El Basico va sin "Desde" porque su alcance esta cerrado
                      (5 paginas), y por eso lleva debajo la nota de que los
                      extras se aprueban antes de cobrarse. Los otros dos
                      dependen del catalogo o del alcance y si lo llevan.
                      Espejo de la Fila 2 de /servicios: si cambia uno,
                      cambiar el otro. */}
                  <div className='modal-card'>
                    <h3>Sitio Web Básico</h3>
                    <span className='price'>699€<span className='price-iva'> más IVA</span></span>
                    <p className='description'>Ideal si quieres presencia profesional y que te encuentren.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />Hasta 5 páginas</li>
                      <li><FeatureCheckIcon />Diseño responsive</li>
                      <li><FeatureCheckIcon />SEO básico incluido</li>
                      <li><FeatureCheckIcon />Formulario de contacto</li>
                      <li><FeatureCheckIcon />Google Analytics incluido</li>
                      <li><FeatureCheckIcon />Entrega en 3-4 semanas</li>
                    </ul>
                    <div className='card-addon'>
                      <span className='card-addon-etiqueta'>Complemento opcional</span>
                      <span className='card-addon-texto'>Panel para editar textos e imágenes tú mismo — <span className='card-addon-precio'>290€</span></span>
                    </div>
                    <p className='card-cerrado'>Precio cerrado: si a mitad quieres añadir algo que no estaba, te digo lo que cuesta y decides tú. Nada se cobra sin que lo apruebes.</p>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card'>
                    <h3>E-commerce / Tienda Online</h3>
                    <span className='price'><span className='price-span'>Desde </span>999€<span className='price-iva'> más IVA</span></span>
                    <p className='description'>Vende online desde el primer día: catálogo, carrito y pago seguro. Precio según nº de productos.</p>
                    <p className='features-herencia'>Todo lo del Básico, y además:</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon gold />Carrito de compras</li>
                      <li><FeatureCheckIcon gold />Pasarela de pago segura</li>
                      <li><FeatureCheckIcon gold />Reservas y citas online</li>
                      <li><FeatureCheckIcon gold />Panel de gestión de productos y stock incluido</li>
                      <li><FeatureCheckIcon gold />Blog integrado</li>
                      <li><FeatureCheckIcon gold />SEO avanzado incluido</li>
                      <li><FeatureCheckIcon />Entrega en 6-8 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Más elegido</span>
                    <h3>Proyecto a Medida</h3>
                    <span className='price'><span className='price-span'>Desde </span>1.499€<span className='price-iva'> más IVA</span></span>
                    <p className='description'>Cuando tu negocio necesita funciones propias. Precio a negociar según alcance.</p>
                    <p className='features-herencia'>Todo lo anterior, y además:</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon gold />Páginas y funciones sin límite</li>
                      <li><FeatureCheckIcon gold />Panel de administración personalizado</li>
                      <li><FeatureCheckIcon gold />Agenda de varios profesionales con Google Calendar</li>
                      <li><FeatureCheckIcon gold />Sincronización con proveedor o ERP</li>
                      <li><FeatureCheckIcon gold />ChatBot con IA integrado</li>
                      <li><FeatureCheckIcon gold />Área privada de clientes</li>
                      <li><FeatureCheckIcon />Entrega según proyecto</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
                {puntosModal}
                <p className='tipos-web-nota'>Todos los proyectos incluyen mantenimiento opcional <strong>desde 50€/mes</strong>. Si tu web lleva panel de gestión, el plan indicado es el de <strong>70€/mes</strong>.</p>
              </>
            ) : modalPlanes === 'mantenimiento' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Mantenimiento</h2>
                <p className='modal-subtitulo'>Mantén tu web siempre en forma, elige el nivel que necesitas</p>
                <div className='modal-grid modal-grid-2' ref={modalGridRef} key={modalPlanes}>
                  <div className='modal-card'>
                    <h3>Básico</h3>
                    <span className='price'>50€<span className='price-mes'>/mes</span><span className='price-iva'> más IVA</span></span>
                    <p className='description'>Lo esencial para que tu web funcione sin preocupaciones. Ideal si tu web no tiene panel de administración.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />Actualizaciones de seguridad</li>
                      <li><FeatureCheckIcon />Copias de seguridad</li>
                      <li><FeatureCheckIcon />Pequeños ajustes</li>
                      <li><FeatureCheckIcon />Google Analytics incluido</li>
                      <li><FeatureCheckIcon />Informe mensual de rendimiento en PDF</li>
                      <li><FeatureCheckIcon />Sin permanencia, cancela cuando quieras</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Con panel o tienda</span>
                    <h3>Premium</h3>
                    <span className='price'><span className='price-span'>Desde </span>70€<span className='price-mes'>/mes</span><span className='price-iva'> más IVA</span></span>
                    <p className='description'>Recomendado si tu web tiene panel de administración o tienda online: yo me encargo de que todo siga funcionando.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />Todo lo del plan Básico</li>
                      <li><FeatureCheckIcon gold />Mantenimiento del panel de administración</li>
                      <li><FeatureCheckIcon gold />Soporte con tu tienda: pedidos, productos y stock</li>
                      <li><FeatureCheckIcon gold />Te ayudo si te atascas usando el panel</li>
                      <li><FeatureCheckIcon gold />Soporte prioritario con respuesta en menos de 24h</li>
                      <li><FeatureCheckIcon gold />Optimización SEO mensual</li>
                      <li><FeatureCheckIcon gold />Pequeñas mejoras de diseño incluidas</li>
                      <li><FeatureCheckIcon gold />Revisión mensual de velocidad y rendimiento</li>
                      <li><FeatureCheckIcon />Sin permanencia, cancela cuando quieras</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
                {puntosModal}
              </>
            ) : modalPlanes === 'landing' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Landing Page</h2>
                <p className='modal-subtitulo'>Dos variantes para adaptarse a lo que necesitas</p>
                <p className='tipos-web-intro'>Cada landing se desarrolla desde cero y a medida para tu negocio, sin plantillas ni constructores.</p>
                <div className='modal-grid modal-grid-2' ref={modalGridRef} key={modalPlanes}>
                  <div className='modal-card'>
                    <h3>Starter</h3>
                    <span className='price'><span className='price-span'>Desde </span>350€<span className='price-iva'> más IVA</span></span>
                    <p className='description'>Ideal para tener presencia online con lo esencial bien hecho.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />1 sección larga y 3 secciones pequeñas</li>
                      <li><FeatureCheckIcon />SEO y posicionamiento local</li>
                      <li><FeatureCheckIcon />Diseño responsive, adaptado a cualquier tipo de pantalla</li>
                      <li><FeatureCheckIcon />Formulario de contacto</li>
                      <li><FeatureCheckIcon />Botones flotantes de WhatsApp y chat básico</li>
                      <li><FeatureCheckIcon />Entrega en 2 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Más completo</span>
                    <h3>Premium</h3>
                    <span className='price'><span className='price-span'>Desde </span>499€<span className='price-iva'> más IVA</span></span>
                    <p className='description'>Más secciones, más impacto y mayor personalización.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />8 secciones personalizadas, 2 de ellas grandes</li>
                      <li><FeatureCheckIcon />SEO y posicionamiento local o nacional</li>
                      <li><FeatureCheckIcon />Diseño responsive, adaptado a cualquier tipo de pantalla</li>
                      <li><FeatureCheckIcon />Formulario de contacto</li>
                      <li><FeatureCheckIcon />Botones flotantes de WhatsApp y chat básico</li>
                      <li><FeatureCheckIcon gold />Google Analytics y Search Console para ver las estadísticas de tu web</li>
                      <li><FeatureCheckIcon />Entrega en 2-3 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
                {puntosModal}
              </>
            ) : modalPlanes === 'comparar' ? (
              <>
                <h2 className='modal-titulo'>¿Landing o Sitio Web?</h2>
                <p className='modal-subtitulo'>Las diferencias que de verdad importan para elegir</p>
                {/* Los role van explicitos porque en movil el CSS pasa la tabla
                    a display:block para apilarla, y eso le quita la semantica
                    de tabla a los lectores de pantalla si no se restituye. */}
                <table className='tabla-comparativa' role='table'>
                  <thead role='rowgroup'>
                    <tr role='row'>
                      <th role='columnheader' scope='col'><span className='visualmente-oculto'>Criterio</span></th>
                      <th role='columnheader' scope='col'>Landing Page</th>
                      <th role='columnheader' scope='col'>Sitio Web</th>
                    </tr>
                  </thead>
                  <tbody role='rowgroup'>
                    {COMPARATIVA.map(([criterio, landing, sitioweb]) => (
                      <tr role='row' key={criterio}>
                        <th role='rowheader' scope='row'>{criterio}</th>
                        <td role='cell' data-etiqueta='Landing Page'>{landing}</td>
                        <td role='cell' data-etiqueta='Sitio Web'>{sitioweb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* El cliente llega aqui ya decidido: recogemos esa decision en
                    vez de obligarle a cerrar y empezar de nuevo. No abre otro
                    modal, solo cambia la rama que pinta este mismo. */}
                <div className='modal-comparar-acciones'>
                  <button type='button' className='card-btn' onClick={() => setModalPlanes('landing')}>Quiero una Landing</button>
                  <button type='button' className='card-btn' onClick={() => setModalPlanes('sitioweb')}>Quiero un Sitio Web</button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
