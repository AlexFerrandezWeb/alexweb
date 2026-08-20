import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FAQ } from '../FAQ'
import { enlaceWhatsApp, registrarClicWhatsApp } from '../../utils/whatsapp'
import './LandingNutricionistas.css'

export const RUTA = '/diseno-web-para-nutricionistas'

export const SEO = {
  titulo: 'Diseño web para nutricionistas y dietistas | alexweb',
  descripcion:
    'Páginas web para nutricionistas y dietistas: cita online, pago de sesión y SEO local para que te encuentren en tu ciudad. Desde 350€, con cita y pago online desde 999€.',
}

const MENSAJE_WHATSAPP =
  'Hola Alex, soy nutricionista y me interesa una web para mi consulta. ¿Podemos hablar?'

/* ---------- Iconos (SVG en línea: sin dependencias y sin líos de codificación) ---------- */

const Svg = ({ children, size = 26 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {children}
  </svg>
)

const IconoChat = (p) => (
  <Svg {...p}>
    <path d='M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4.1-.9L3 20l1.1-4.1A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z' />
  </Svg>
)

const IconoLupa = (p) => (
  <Svg {...p}>
    <circle cx='11' cy='11' r='7' />
    <path d='m20 20-3.5-3.5' />
  </Svg>
)

const IconoMovil = (p) => (
  <Svg {...p}>
    <rect x='6' y='2' width='12' height='20' rx='2.5' />
    <path d='M11 18.5h2' />
  </Svg>
)

const IconoPiezas = (p) => (
  <Svg {...p}>
    <path d='M9 3h6v3.2a2 2 0 0 0 2 2h3v6.6h-3a2 2 0 0 0-2 2V21H9v-4.2a2 2 0 0 0-2-2H4V8.2h3a2 2 0 0 0 2-2Z' />
  </Svg>
)

const IconoCalendario = (p) => (
  <Svg {...p}>
    <rect x='3' y='5' width='18' height='16' rx='2.5' />
    <path d='M3 10h18M8 3v4M16 3v4' />
    <path d='M8.5 14.5h2v2h-2z' fill='currentColor' stroke='none' />
  </Svg>
)

const IconoTarjeta = (p) => (
  <Svg {...p}>
    <rect x='2.5' y='5' width='19' height='14' rx='2.5' />
    <path d='M2.5 10h19M6 15h3' />
  </Svg>
)

const IconoUbicacion = (p) => (
  <Svg {...p}>
    <path d='M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z' />
    <circle cx='12' cy='10' r='2.6' />
  </Svg>
)

const IconoEstrella = (p) => (
  <Svg {...p}>
    <path d='m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5Z' />
  </Svg>
)

const IconoLapiz = (p) => (
  <Svg {...p}>
    <path d='M4 20h4l10.5-10.5a2.1 2.1 0 0 0 0-3l-1-1a2.1 2.1 0 0 0-3 0L4 16v4Z' />
    <path d='m13.5 6.5 4 4' />
  </Svg>
)

const IconoPantalla = (p) => (
  <Svg {...p}>
    <rect x='7' y='2.5' width='10' height='19' rx='2.5' />
    <path d='M10 5.5h4M11 18.5h2' />
  </Svg>
)

const Check = () => (
  <svg width='18' height='18' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
    <circle cx='10' cy='10' r='10' fill='#e8f2ee' />
    <path
      d='M6 10.5l2.5 2.5L14 7.5'
      stroke='#3f7d6e'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const Flecha = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path
      d='M5 12h13m0 0-5-5m5 5-5 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

/* ---------- Contenido ---------- */

const DATOS = [
  { num: '24/7', texto: 'Tus pacientes reservan aunque tú estés en consulta' },
  { num: '0', texto: 'Comisiones de plataformas externas por cada cita' },
  { num: '100%', texto: 'Tu marca, tu método y tu web, sin alquilar nada' },
  { num: '2-4', texto: 'Semanas desde la primera llamada hasta publicarla' },
]

const DOLORES = [
  {
    Icono: IconoChat,
    titulo: 'Cierras cada cita a mano por mensajes',
    texto:
      'Respondes DMs a las 23h para cuadrar un hueco. Cada reserva te roba un tiempo que deberías estar dedicando a tus pacientes.',
    fix: 'Cita online que se gestiona sola',
  },
  {
    Icono: IconoLupa,
    titulo: 'No apareces cuando te buscan',
    texto:
      'Alguien de tu ciudad busca "nutricionista" en Google y salen otros. Tu mejor paciente te está buscando y encuentra a la competencia.',
    fix: 'SEO local trabajado para tu zona',
  },
  {
    Icono: IconoMovil,
    titulo: 'Todo tu escaparate es un Linktree',
    texto:
      'Trabajas el Instagram cada día, pero el enlace de tu bio lleva a una página que no transmite ni la mitad de lo profesional que eres.',
    fix: 'Una web a la altura de tu trabajo',
  },
  {
    Icono: IconoPiezas,
    titulo: 'Tu web podría ser de cualquier sector',
    texto:
      'Una plantilla genérica no habla de primera visita, de seguimiento ni de adherencia. No conecta con quien está buscando ayuda de verdad.',
    fix: 'Pensada para tu profesión',
  },
]

const INCLUYE = [
  {
    Icono: IconoCalendario,
    titulo: 'Cita online',
    texto:
      'Tus pacientes reservan primera visita o seguimiento desde la web, con tus horarios reales. Tú recibes el aviso; ellos, la confirmación.',
  },
  {
    Icono: IconoTarjeta,
    titulo: 'Pago de la sesión',
    texto:
      'Cobra la consulta o la reserva por adelantado con Stripe. Menos ausencias de última hora y menos huecos vacíos en tu agenda.',
  },
  {
    Icono: IconoUbicacion,
    titulo: 'SEO local',
    texto:
      'Preparada para competir en las búsquedas de nutricionista en tu ciudad, con tu ficha de Google bien montada y enlazada.',
  },
  {
    Icono: IconoEstrella,
    titulo: 'Reseñas de pacientes',
    texto:
      'Los testimonios reales son lo que más convence antes de una primera visita. Se muestran de forma clara y creíble, sin parecer inventados.',
  },
  {
    Icono: IconoLapiz,
    titulo: 'Blog que posiciona',
    texto:
      'Un espacio para tus artículos que te coloca como referente en tu especialidad y te trae visitas desde Google mes a mes.',
  },
  {
    Icono: IconoPantalla,
    titulo: 'Móvil primero',
    texto:
      'La mayoría de tus pacientes te va a ver desde el teléfono. La web se diseña primero para ahí, que es donde de verdad se juega.',
  },
]

// Mismos precios que /servicios: no puede haber dos tarifas distintas en el mismo dominio.
const PLANES = [
  {
    nombre: 'Web de consulta',
    precio: 'desde 350€',
    desc: 'Tu presencia profesional online, lista para transmitir confianza.',
    incluye: [
      'Diseño a medida de tu marca',
      'Tus servicios y tu método explicados',
      'Sección de testimonios de pacientes',
      'Contacto y WhatsApp directo',
      'Textos legales y cookies (RGPD)',
    ],
    cta: 'Me interesa',
  },
  {
    nombre: 'Web con cita online',
    // Cobrar la sesion online es funcionalmente un E-commerce (pasarela de
    // pago), asi que va al nivel E-commerce del modelo, no al Basico.
    precio: 'desde 999€',
    destacado: true,
    desc: 'La consulta que se llena sola: te encuentran, reservan y pagan.',
    incluye: [
      'Todo lo de Web de consulta',
      'Reserva de cita desde la web',
      'Pago de la sesión con Stripe',
      'SEO avanzado + blog autogestionable',
      'Ficha de Google optimizada',
    ],
    cta: 'Cuéntame tu caso',
  },
  {
    nombre: 'Cuidado mensual',
    precio: 'desde 50€',
    periodo: '/mes',
    desc: 'Que tu web siga rápida, segura y subiendo en Google cada mes.',
    incluye: [
      'Actualizaciones y seguridad',
      'Copias de seguridad',
      'Pequeños cambios incluidos',
      'Informe mensual claro',
      'Con panel de gestión: plan de 70€',
      'Sin permanencia',
    ],
    cta: 'Me interesa',
  },
]

const DIFERENCIALES = [
  {
    tag: 'Hablamos el mismo idioma',
    titulo: 'Sé lo que es la adherencia, no solo lo que es una landing',
    parrafos: [
      'Entreno, controlo mis macros y mi suplementación. Cuando me cuentas cómo trabajas con un paciente no tengo que fingir que lo entiendo: lo entiendo.',
      'Eso se nota en la web. En cómo explico tus servicios, en las palabras que uso y en lo que pongo primero. Una plantilla genérica no sabe la diferencia entre una primera visita y un seguimiento. Yo sí.',
    ],
    mock: 'texto',
  },
  {
    tag: 'Tu web, tus reglas',
    titulo: 'Cero comisiones de plataformas que se comen tu margen',
    parrafos: [
      'Los directorios de profesionales te cobran por cita o te dejan atado a su plataforma. Tu web es tuya: los pacientes reservan y pagan directamente, sin intermediarios que se lleven un pellizco.',
      'Es la diferencia entre construir sobre terreno alquilado o sobre el tuyo. Todo lo que inviertes suma a tu marca, no a la de otro.',
    ],
    mock: 'calendario',
    invertido: true,
  },
  {
    tag: 'Trato directo',
    titulo: 'Hablas conmigo, no con un chatbot ni con una agencia enorme',
    parrafos: [
      'Nada de tickets eternos ni de que te pasen de un comercial a otro. Trabajas directamente con quien programa tu web, de tú a tú y con respuestas de verdad.',
      'Cuando necesites un cambio o tengas una duda, me escribes a mí. Así de simple.',
    ],
    mock: 'whatsapp',
  },
]

const FAQS = [
  {
    pregunta: '¿Cuánto tarda en estar lista mi web?',
    respuesta:
      'Una web de consulta suele estar lista en 2-3 semanas; con cita online, alrededor de 3-4. Depende bastante de lo rápido que me pases textos y fotos, pero te doy un plazo concreto antes de empezar y trabajamos por hitos para que veas avances.',
  },
  {
    pregunta: 'No tengo textos ni sé qué poner, ¿es un problema?',
    respuesta:
      'Es lo más habitual y no, no lo es. Te paso un guion con las preguntas que necesito, tú me cuentas cómo trabajas y yo lo convierto en los textos de la web. Con las fotos te oriento sobre qué necesitas y, mientras tanto, usamos imágenes de calidad con licencia.',
  },
  {
    pregunta: '¿La cita online sustituye a mi software de consulta?',
    respuesta:
      'No, y no pretende hacerlo. La web gestiona la reserva y el cobro de la cita. Si ya usas un programa de historias clínicas o de dietas, la web convive con él sin problema; si más adelante quieres integrar más cosas, lo vemos por módulos.',
  },
  {
    pregunta: '¿Por qué te centras en nutricionistas?',
    respuesta:
      'Porque conocer un sector me hace mejor trabajando para él: sé qué secciones funcionan, qué dudas tiene un paciente antes de pedir cita y qué hay que poner primero. Trabajo también con otros negocios, pero en nutrición no parto de cero cada vez y eso lo notas en el resultado y en el plazo.',
  },
  {
    pregunta: '¿Los precios que veo son los finales?',
    respuesta:
      'Los precios que ves llevan el IVA incluido y son el punto de partida; el presupuesto que te paso es cerrado: lo que firmamos es lo que pagas. Aparte solo tendrías el dominio y el alojamiento, que son unos pocos euros al mes y te los explico con transparencia. La reserva y el pago online se ajustan según lo que necesites, y te lo digo antes de empezar.',
  },
  {
    pregunta: '¿Trabajas con clientes de toda España?',
    respuesta:
      'Sí, en remoto y con cualquier provincia. Nos organizamos por videollamada, teléfono o WhatsApp. Lo que sí trabajo es el SEO local de tu ciudad, estés donde estés, porque tus pacientes sí son de tu zona.',
  },
]

/* ---------- Mockups decorativos ---------- */

const Mockup = ({ tipo }) => (
  <div className='nutri-mockup'>
    <div className='nutri-mockup-bar'>
      <span />
      <span />
      <span />
    </div>
    <div className='nutri-mockup-body'>
      {tipo === 'calendario' ? (
        <>
          <div className='nutri-mock-line nutri-short' />
          <div className='nutri-mock-cal'>
            <div />
            <div />
            <div className='nutri-on'>8</div>
            <div />
            <div className='nutri-on'>10</div>
            <div />
            <div />
            <div />
            <div className='nutri-on'>15</div>
            <div />
            <div />
            <div className='nutri-on'>18</div>
            <div />
            <div />
          </div>
        </>
      ) : (
        <>
          <div className='nutri-mock-line nutri-med' />
          <div className='nutri-mock-line' />
          <div className='nutri-mock-line nutri-short' />
          <div className='nutri-mock-btn'>
            {tipo === 'whatsapp' ? 'Escríbeme por WhatsApp' : 'Reservar primera visita'}
          </div>
        </>
      )}
    </div>
  </div>
)

/* ---------- Utilidades ---------- */

// Las tipografías de esta landing solo se cargan cuando alguien entra aquí:
// meterlas en index.html penalizaría la carga de todas las demás páginas.
const cargarTipografias = () => {
  const ID = 'nutri-fonts'
  if (document.getElementById(ID)) return

  const preconnect = document.createElement('link')
  preconnect.rel = 'preconnect'
  preconnect.href = 'https://fonts.gstatic.com'
  preconnect.crossOrigin = 'anonymous'
  document.head.appendChild(preconnect)

  const fuentes = document.createElement('link')
  fuentes.id = ID
  fuentes.rel = 'stylesheet'
  fuentes.href =
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
  document.head.appendChild(fuentes)
}

const useRevelarAlScroll = () => {
  useEffect(() => {
    const elementos = document.querySelectorAll('.nutri-reveal')

    if (!('IntersectionObserver' in window)) {
      elementos.forEach((el) => el.classList.add('nutri-in'))
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return
          entrada.target.classList.add('nutri-in')
          observador.unobserve(entrada.target)
        })
      },
      { threshold: 0.12 }
    )

    elementos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [])
}

/* ---------- Componente ---------- */

// Lo consume el `meta` de la ruta, que corre en el build: así el JSON-LD acaba
// en el HTML servido en vez de inyectarse desde el navegador.
export const jsonLdNutricionistas = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `https://alexweb.es${RUTA}#pagina`,
      url: `https://alexweb.es${RUTA}`,
      name: SEO.titulo,
      description: SEO.descripcion,
      isPartOf: { '@id': 'https://alexweb.es/#negocio' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ pregunta, respuesta }) => ({
        '@type': 'Question',
        name: pregunta,
        acceptedAnswer: { '@type': 'Answer', text: respuesta },
      })),
    },
  ],
}

export const LandingNutricionistas = () => {
  useRevelarAlScroll()
  useEffect(cargarTipografias, [])

  const botonWhatsApp = (clase, texto, origen) => (
    <a
      href={enlaceWhatsApp(MENSAJE_WHATSAPP)}
      target='_blank'
      rel='noopener noreferrer'
      className={`nutri-btn ${clase}`}
      onClick={() => registrarClicWhatsApp(origen)}
    >
      {texto}
    </a>
  )

  return (
    <div className='nutri'>
      {/* ===== HERO ===== */}
      <header className='nutri-hero'>
        <div className='nutri-wrap'>
          <span className='nutri-eyebrow'>
            <span className='nutri-dot' />
            Diseño web especializado en nutrición y dietética
          </span>
          <h1>
            Diseño web para nutricionistas que llena tu <em>agenda de pacientes</em>
          </h1>
          <p className='nutri-lead'>
            Webs pensadas para dietistas y nutricionistas: con cita online, tu método y tu marca.
            Tú te centras en tus pacientes; yo me encargo de que te encuentren y reserven.
          </p>
          <div className='nutri-actions'>
            <Link to='/contacto' className='nutri-btn nutri-btn-primary'>
              Pide presupuesto gratis <Flecha />
            </Link>
            <a href='#planes' className='nutri-btn nutri-btn-ghost'>
              Ver planes y precios
            </a>
          </div>
          <div className='nutri-trust'>
            <div className='nutri-avatars'>
              <span>N</span>
              <span>D</span>
              <span>M</span>
              <span>+</span>
            </div>
            <div>
              Webs a medida para profesionales de la nutrición de <strong>toda España</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ===== DATOS ===== */}
      <div className='nutri-strip'>
        <div className='nutri-wrap nutri-strip-in'>
          {DATOS.map(({ num, texto }) => (
            <div className='nutri-strip-item' key={num}>
              <span className='nutri-strip-num'>{num}</span>
              <span className='nutri-strip-lbl'>{texto}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DOLORES ===== */}
      <section className='nutri-section nutri-pain' id='dolores'>
        <div className='nutri-wrap'>
          <div className='nutri-section-head nutri-reveal'>
            <span className='nutri-section-eyebrow'>Te suena, ¿verdad?</span>
            <h2>Trabajas la consulta, pero la web no trabaja para ti</h2>
            <p>
              Lo que me encuentro una y otra vez en profesionales de la nutrición que vienen de una
              web genérica o de no tener ninguna.
            </p>
          </div>
          <div className='nutri-pain-grid'>
            {DOLORES.map(({ Icono, titulo, texto, fix }) => (
              <div className='nutri-pain-card nutri-reveal' key={titulo}>
                <div className='nutri-pain-ico'>
                  <Icono />
                </div>
                <div>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                  <span className='nutri-fix'>
                    <Flecha /> {fix}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUÉ INCLUYE ===== */}
      <section className='nutri-section' id='incluye'>
        <div className='nutri-wrap'>
          <div className='nutri-section-head nutri-reveal'>
            <span className='nutri-section-eyebrow'>Qué incluye</span>
            <h2>Todo lo que tu consulta necesita online</h2>
            <p>
              No es una web más. Es lo que convierte a quien te encuentra en un paciente sentado en
              tu consulta.
            </p>
          </div>
          <div className='nutri-feat-grid'>
            {INCLUYE.map(({ Icono, titulo, texto }) => (
              <div className='nutri-feat nutri-reveal' key={titulo}>
                <div className='nutri-feat-ico'>
                  <Icono size={24} />
                </div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANES ===== */}
      <section className='nutri-section nutri-packages' id='planes'>
        <div className='nutri-wrap'>
          <div className='nutri-section-head nutri-reveal'>
            <span className='nutri-section-eyebrow'>Planes</span>
            <h2>Elige por dónde empezar</h2>
            <p>
              Los mismos precios que le paso a cualquiera que me escribe. El presupuesto que te doy
              es el que pagas.
            </p>
          </div>
          <div className='nutri-pkg-grid'>
            {PLANES.map((plan) => (
              <div
                className={`nutri-pkg nutri-reveal${plan.destacado ? ' nutri-pkg-destacado' : ''}`}
                key={plan.nombre}
              >
                {plan.destacado && <span className='nutri-pkg-badge'>Más elegido</span>}
                <div className='nutri-pkg-name'>{plan.nombre}</div>
                <p className='nutri-pkg-desc'>{plan.desc}</p>
                <div className='nutri-pkg-price'>
                  <span className='nutri-pkg-amt'>{plan.precio}</span>
                  {plan.periodo && <span className='nutri-pkg-per'>{plan.periodo}</span>}
                  <span className='nutri-pkg-iva'>IVA incluido</span>
                </div>
                <ul>
                  {plan.incluye.map((linea) => (
                    <li key={linea}>
                      <Check />
                      {linea}
                    </li>
                  ))}
                </ul>
                <Link
                  to='/contacto'
                  className={`nutri-btn ${
                    plan.destacado ? 'nutri-btn-primary' : 'nutri-btn-ghost'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className='nutri-pkg-note'>
            ¿No sabes cuál te encaja? Me lo cuentas y lo vemos juntos, sin compromiso. Todo lleva
            factura, así que puedes desgravarlo como autónomo.
          </p>
        </div>
      </section>

      {/* ===== DIFERENCIALES ===== */}
      <section className='nutri-section' id='ventajas'>
        <div className='nutri-wrap'>
          <div className='nutri-section-head nutri-reveal'>
            <span className='nutri-section-eyebrow'>Por qué yo y no una plantilla</span>
            <h2>La diferencia de trabajar con alguien que entiende tu mundo</h2>
          </div>

          {DIFERENCIALES.map(({ tag, titulo, parrafos, mock, invertido }) => (
            <div
              className={`nutri-diff-row nutri-reveal${invertido ? ' nutri-rev' : ''}`}
              key={tag}
            >
              <div className='nutri-diff-txt'>
                <span className='nutri-tag'>{tag}</span>
                <h3>{titulo}</h3>
                {parrafos.map((parrafo) => (
                  <p key={parrafo.slice(0, 30)}>{parrafo}</p>
                ))}
              </div>
              <div className='nutri-diff-visual'>
                <Mockup tipo={mock} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BANNER CTA ===== */}
      <section className='nutri-section' style={{ paddingTop: 0 }}>
        <div className='nutri-wrap'>
          <div className='nutri-cta-banner nutri-reveal'>
            <h2>Tu consulta merece una web a su altura</h2>
            <p>
              Cuéntame cómo trabajas y te digo qué haría, qué te costaría y cuánto tardaría. Sin
              compromiso y sin tecnicismos.
            </p>
            <Link to='/contacto' className='nutri-btn nutri-btn-primary'>
              Pide presupuesto gratis <Flecha />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <div className='nutri-faq' id='faq'>
        <FAQ preguntas={FAQS} titulo='Dudas frecuentes sobre webs para nutricionistas' />
      </div>

      {/* ===== CIERRE ===== */}
      <section className='nutri-section nutri-final' id='contacto'>
        <div className='nutri-wrap'>
          <div className='nutri-reveal'>
            <span className='nutri-section-eyebrow'>Empieza aquí</span>
            <h2>Cuéntame cómo es tu consulta</h2>
            <p>
              Escríbeme y te respondo yo, en persona, normalmente el mismo día. Si creo que no soy
              la mejor opción para ti, también te lo digo.
            </p>
            <div className='nutri-actions'>
              <Link to='/contacto' className='nutri-btn nutri-btn-primary'>
                Cuéntame tu proyecto <Flecha />
              </Link>
              {botonWhatsApp('nutri-btn-ghost', 'Escríbeme por WhatsApp', 'landing_nutricionistas')}
            </div>
            <p className='nutri-garantias'>
              Respuesta en menos de 24 h · Presupuesto cerrado, sin sorpresas · Sin permanencia
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
