import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Inicio.css'
import { enviarFormularioContacto } from '../utils/enviarFormularioContacto'

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

const getMensajeError = (el) => {
  if (el.validity.valueMissing) return 'Este campo es obligatorio'
  if (el.validity.typeMismatch) return 'Introduce un email válido'
  if (el.validity.tooShort) return `Mínimo ${el.minLength} caracteres (llevas ${el.value.length})`
  return 'Comprueba este campo'
}

export const Inicio = () => {
  const [slideActual, setSlideActual] = useState({ 'Heladería Luxer': 1, 'Anita Pinturitas': 2 })
  const [modalPlanes, setModalPlanes] = useState(false)
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', prefijo: '+34', telefono: '', tipoProyecto: '', mensaje: '' })
  const [contactEnviado, setContactEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)
  const [erroresCampos, setErroresCampos] = useState({})
  const [camposAgitados, setCamposAgitados] = useState([])
  const [filasReveladas, setFilasReveladas] = useState({})
  const filasRef = useRef([])

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
      subtitulo: 'Tienda online de suplementos nutricionales para ganado',
      descripcion: 'Sitio web corporativo y tienda online desarrollado a medida para Nutrigan España, distribuidor oficial de productos veterinarios y suplementos nutricionales para ganado bovino, ovino y porcino.',
      features: [
        'Tienda online con carrito de compras y catálogo de productos',
        'Página de productos con fichas detalladas y precios',
        'Sección "Sobre nosotros" con historia y valores de la empresa',
        'Página especial para la Feria de Tineo',
        'Carrusel de imágenes en la página principal',
        'Sección de certificaciones oficiales',
        'Botón de contacto directo por WhatsApp',
        'Política de cookies, aviso legal y términos y condiciones',
        'SEO optimizado con metadatos completos',
        'Diseño responsive para todos los dispositivos',
        'Imágenes en formato WebP para mayor velocidad de carga',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Node.js, Stripe, Render',
      url: 'https://www.xn--nutriganespaa-tkb.com/',
      imagenEscritorio: '/assets/nutriganWEB_escritorio.png',
      imagenTablet: '/assets/nutriganWEB_ipad.png',
      imagenMovil: '/assets/nutriganWEB_iphone.png'
    },
    {
      nombre: 'Heladería Luxer',
      subtitulo: 'Web corporativa con carta digital',
      descripcion: 'Sitio web desarrollado a medida para Heladería Luxer, heladería de temporada ubicada en San Pedro del Pinatar, Murcia. Diseño mobile-first con enfoque en experiencia de usuario y SEO local. Destacable el sistema multiidioma desarrollado desde cero sin frameworks, adaptado a la clientela internacional de la zona costera.',
      features: [
        'Carta digital con 6 categorías — helados, granizados, batidos, bebidas, combinados y desayunos',
        'Más de 20 sabores con precios en 3 tamaños y etiquetas nutricionales',
        'Multiidioma español, inglés y francés con cambio dinámico sin recargar la página',
        'Galería responsive — grid en escritorio y carrusel deslizable en móvil',
        'Navbar que se comprime automáticamente al hacer scroll',
        'Menú hamburguesa para navegación móvil',
        'SEO local con Schema.org y geolocalización exacta del negocio',
        'Open Graph y Twitter Card para compartir en redes sociales',
        'Sitemap y robots.txt configurados',
        'Lazy loading de imágenes para máxima velocidad',
        'Banner de cookies con consentimiento',
        'Más de 100 imágenes de producto optimizadas',
        'Diseño responsive para todos los dispositivos',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Cloudflare Pages',
      url: 'https://heladerialuxer.es/',
      imagenEscritorio: '/assets/heladeriaLuxerWEB_escritorio.png',
      imagenTablet: '/assets/heladeriaLuxerWEB_ipad.png',
      imagenMovil: '/assets/heladeriaLuxerWEB_iphone.png'
    },
    {
      nombre: 'Anita Pinturitas',
      subtitulo: 'Tienda online de alta cosmética y maquillaje profesional',
      descripcion: 'Sitio web y tienda online desarrollado a medida para Ana María Ramos, experta en belleza y maquillaje con más de 20 años de experiencia, especializada en productos para piel madura (+40) y maquillaje de bodas en Asturias.',
      features: [
        'Tienda online con carrito de compras y catálogo de productos',
        'Sección de cuidado de piel y cuidado capilar',
        'Galería de clientes reales con carrusel animado',
        'Sección de maquillaje de bodas con reserva directa por WhatsApp',
        'Integración con Instagram — detección de directos en tiempo real',
        'Sección "Quién es Anita Pinturitas" con historia personal',
        'Botón de contacto directo por WhatsApp',
        'Pasarela de pago seguro — PayPal, Visa, Mastercard y Bizum',
        'SEO optimizado con metadatos completos',
        'Verificación de dominio en Facebook',
        'Política de cookies, aviso legal y términos y condiciones',
        'Diseño responsive para todos los dispositivos',
      ],
      tecnologias: 'HTML5, CSS3, JavaScript, Python 3, Stripe, Render',
      url: 'https://anitapinturitas.es/',
      imagenEscritorio: '/assets/anitapinturitasWEB_escritorio.png',
      imagenTablet: '/assets/anitapinturitasWEB_ipad.png',
      imagenMovil: '/assets/anitapinturitasWEB_iphone.png'
    }
  ];

  useEffect(() => {
    document.title = "AlexWeb | Inicio";
  }, []);

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

  return (
    <div className='inicio-container'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>Tu Presencia Digital Empieza Aquí</h1>
          <p>Diseño, desarrollo y mantenimiento. Tú te centras en tu negocio, yo me encargo del resto.</p>
          <Link to='/servicios' className='hero-btn'>Ver Planes</Link>
        </div>
      </section>

      {/* Products Section */}
      <section className='products-section'>
        <h2 className='section-title'>Servicios</h2>

        <div className='products-grid'>

          {/* Card 1 */}
          <div className='product-card'>
            <h3>Landing Page</h3>
            <span className='price'><span className='price-span'>Desde</span>350€</span>
            <p className='description'>Perfecta para mostrar tu negocio y captar clientes online.</p>
            <ul className='features'>
              <li><FeatureCheckIcon /> Landing Page</li>
              <li><FeatureCheckIcon /> Diseño Responsive</li>
              <li><FeatureCheckIcon /> Formulario de Contacto</li>
              <li><FeatureCheckIcon /> Enlaces a Redes Sociales</li>
            </ul>
            <button className='card-btn' onClick={() => setModalPlanes('landing')}>Ver planes</button>
          </div>

          {/* Card 2 */}
          <div className='product-card product-card-featured'>
            <span className='featured-badge'>Más elegido</span>
            <h3>Sitio Web</h3>
            <span className='price'><span className='price-span'>Desde</span>750€</span>
            <p className='description'>Para negocios que necesitan más que una página: múltiples secciones, blog, carrito de compras y ubicación en Google.</p>
            <ul className='features'>
              <li><FeatureCheckIcon /> Hasta 5 Páginas</li>
              <li><FeatureCheckIcon /> SEO Básico</li>
              <li><FeatureCheckIcon /> Blog Autogestionable</li>
              <li><FeatureCheckIcon /> Mapa de ubicación</li>
            </ul>
            <button className='card-btn' onClick={() => setModalPlanes('sitioweb')}>Ver planes</button>
          </div>

          {/* Card 3 */}
          <div className='product-card'>
            <h3>Mantenimiento y SEO</h3>
            <span className='price'><span className='price-span'>Desde</span>50€</span>
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

        <div className='chatbot-banner'>
          <div className='chatbot-banner-texto'>
            <span className='chatbot-banner-badge'>Nuevo</span>
            <h3>ChatBot con IA</h3>
            <p>Integra un asistente inteligente en tu web que atiende a tus clientes 24/7, responde preguntas y capta leads de forma automática.</p>
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
                            className='work-image work-image-main'
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
                    <p className='work-tech'>{proyecto.tecnologias}</p>
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
              <p className='inicio-form-nota'>Todos los campos son obligatorios.</p>
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
                <label htmlFor='ic-telefono'>Número móvil</label>
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
                    required
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
                  placeholder='Cuéntame sobre tu proyecto... (mínimo 100 caracteres)'
                  value={contactForm.mensaje}
                  onChange={handleContactChange}
                  required
                  minLength={100}
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
          <div className='modal-planes' onClick={(e) => e.stopPropagation()}>
            <button className='modal-cerrar' onClick={() => setModalPlanes(false)} aria-label='Cerrar'>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z'/>
              </svg>
            </button>

            {modalPlanes === 'sitioweb' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Sitio Web</h2>
                <p className='modal-subtitulo'>Tres niveles para cada etapa de tu negocio</p>
                <div className='modal-grid'>
                  <div className='modal-card'>
                    <h3>Starter</h3>
                    <span className='price'><span className='price-span'>Desde</span>750€</span>
                    <p className='description'>Presencia sólida online con tienda funcional desde el primer día.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />3 páginas</li>
                      <li><FeatureCheckIcon />Carrito de compras</li>
                      <li><FeatureCheckIcon />Hasta 50 productos</li>
                      <li><FeatureCheckIcon />SEO básico incluido</li>
                      <li><FeatureCheckIcon />Diseño Responsive</li>
                      <li><FeatureCheckIcon />Google Analytics incluido</li>
                      <li><FeatureCheckIcon />Entrega en 4-6 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Más elegido</span>
                    <h3>Premium</h3>
                    <span className='price'>1.500€</span>
                    <p className='description'>Mayor catálogo, mejor rendimiento y más páginas para crecer.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />5 páginas</li>
                      <li><FeatureCheckIcon />Carrito con servidor optimizado</li>
                      <li><FeatureCheckIcon />Hasta 150 productos</li>
                      <li><FeatureCheckIcon />SEO avanzado incluido</li>
                      <li><FeatureCheckIcon />Diseño Responsive</li>
                      <li><FeatureCheckIcon />Google Analytics incluido</li>
                      <li><FeatureCheckIcon gold />Panel de gestión de productos</li>
                      <li><FeatureCheckIcon gold />Blog integrado</li>
                      <li><FeatureCheckIcon gold />Chat de WhatsApp integrado</li>
                      <li><FeatureCheckIcon gold />2 rondas de revisiones incluidas</li>
                      <li><FeatureCheckIcon />Entrega en 6-8 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card'>
                    <span className='featured-badge modal-badge-elite'>Élite</span>
                    <h3>Élite</h3>
                    <span className='price'><span className='price-span'>Desde</span>2.800€</span>
                    <p className='description'>Proyecto a medida con la última tecnología. Precio a negociar según alcance.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />10 páginas</li>
                      <li><FeatureCheckIcon />+200 productos</li>
                      <li><FeatureCheckIcon />Proyecto 100% a medida</li>
                      <li><FeatureCheckIcon />SEO avanzado incluido</li>
                      <li><FeatureCheckIcon />Diseño Responsive</li>
                      <li><FeatureCheckIcon />Google Analytics incluido</li>
                      <li><FeatureCheckIcon gold />ChatBot con IA integrado</li>
                      <li><FeatureCheckIcon gold />Panel de administración personalizado</li>
                      <li><FeatureCheckIcon gold />Animaciones y efectos avanzados</li>
                      <li><FeatureCheckIcon gold />Integraciones a medida (APIs, pasarelas de pago, etc.)</li>
                      <li><FeatureCheckIcon gold />Soporte prioritario primer mes incluido</li>
                      <li><FeatureCheckIcon />Entrega en 3-4 meses</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
              </>
            ) : modalPlanes === 'mantenimiento' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Mantenimiento</h2>
                <p className='modal-subtitulo'>Mantén tu web siempre en forma, elige el nivel que necesitas</p>
                <div className='modal-grid modal-grid-2'>
                  <div className='modal-card'>
                    <h3>Básico</h3>
                    <span className='price'>50€<span className='price-mes'>/mes</span></span>
                    <p className='description'>Lo esencial para que tu web funcione sin preocupaciones.</p>
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
                    <span className='featured-badge'>Más completo</span>
                    <h3>Premium</h3>
                    <span className='price'>70€<span className='price-mes'>/mes</span></span>
                    <p className='description'>Máxima tranquilidad con soporte prioritario y disponibilidad total.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />Todo lo del plan Básico</li>
                      <li><FeatureCheckIcon gold />Soporte prioritario con respuesta en menos de 24h</li>
                      <li><FeatureCheckIcon gold />Actualizaciones constantes y mejoras continuas</li>
                      <li><FeatureCheckIcon gold />Optimización SEO mensual</li>
                      <li><FeatureCheckIcon gold />Pequeñas mejoras de diseño incluidas</li>
                      <li><FeatureCheckIcon gold />Revisión mensual de velocidad y rendimiento</li>
                      <li><FeatureCheckIcon />Sin permanencia, cancela cuando quieras</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
              </>
            ) : modalPlanes === 'landing' ? (
              <>
                <h2 className='modal-titulo'>Elige tu Landing Page</h2>
                <p className='modal-subtitulo'>Dos variantes para adaptarse a lo que necesitas</p>
                <div className='modal-grid modal-grid-2'>
                  <div className='modal-card'>
                    <h3>Starter</h3>
                    <span className='price'>350€</span>
                    <p className='description'>Ideal para tener presencia online con lo esencial bien hecho.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />1 sección larga y 3 secciones pequeñas</li>
                      <li><FeatureCheckIcon />SEO y posicionamiento básico</li>
                      <li><FeatureCheckIcon />Diseño Responsive</li>
                      <li><FeatureCheckIcon />Formulario de Contacto</li>
                      <li><FeatureCheckIcon />Entrega en 2 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Más completo</span>
                    <h3>Premium</h3>
                    <span className='price'>500€</span>
                    <p className='description'>Más secciones, más impacto y mayor personalización.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon />8 secciones personalizadas (2 grandes)</li>
                      <li><FeatureCheckIcon />SEO y posicionamiento avanzado</li>
                      <li><FeatureCheckIcon />Diseño Responsive</li>
                      <li><FeatureCheckIcon />Formulario de Contacto</li>
                      <li><FeatureCheckIcon gold />Animaciones y efectos visuales</li>
                      <li><FeatureCheckIcon gold />Integración con Google Analytics</li>
                      <li><FeatureCheckIcon gold />Galería de imágenes o vídeo de fondo</li>
                      <li><FeatureCheckIcon gold />Chat de WhatsApp integrado</li>
                      <li><FeatureCheckIcon gold />2 rondas de revisiones incluidas</li>
                      <li><FeatureCheckIcon />Entrega en 2-3 semanas</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className='modal-titulo'>Elige tu plan</h2>
                <p className='modal-subtitulo'>Selecciona el servicio que mejor se adapte a tu negocio</p>
                <div className='modal-grid'>
                  <div className='modal-card'>
                    <h3>Landing Page</h3>
                    <span className='price'><span className='price-span'>Desde</span>400€</span>
                    <p className='description'>Perfecta para mostrar tu negocio y captar clientes online.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon /> 1 sección larga y 3 secciones pequeñas</li>
                      <li><FeatureCheckIcon /> Diseño Responsive</li>
                      <li><FeatureCheckIcon /> Formulario de Contacto</li>
                      <li><FeatureCheckIcon /> SEO y posicionamiento</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card modal-card-featured'>
                    <span className='featured-badge'>Más elegido</span>
                    <h3>Sitio Web</h3>
                    <span className='price'><span className='price-span'>Desde</span>750€</span>
                    <p className='description'>Para negocios que necesitan más que una página: múltiples secciones, blog y ubicación en Google.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon /> Hasta 5 Páginas</li>
                      <li><FeatureCheckIcon /> SEO Básico</li>
                      <li><FeatureCheckIcon /> Blog Autogestionable</li>
                      <li><FeatureCheckIcon /> Mapa de ubicación</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                  <div className='modal-card'>
                    <h3>Mantenimiento y SEO</h3>
                    <span className='price'><span className='price-span'>Desde</span>50€<span className='price-mes'>/mes</span></span>
                    <p className='description'>Mantén tu web segura, actualizada y bien posicionada en Google.</p>
                    <ul className='features'>
                      <li><FeatureCheckIcon /> Actualizaciones de seguridad</li>
                      <li><FeatureCheckIcon /> Optimización SEO On-Page</li>
                      <li><FeatureCheckIcon /> Informes mensuales</li>
                      <li><FeatureCheckIcon /> Soporte técnico 24h</li>
                    </ul>
                    <Link to='/contacto' className='card-btn' onClick={() => setModalPlanes(false)}>Contactar</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
