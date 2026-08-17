import React from 'react'
import { Link } from 'react-router-dom'
import './Servicios.css'
import { FAQ } from './FAQ'

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

/* Iconos de las tarjetas de tema. SVG en línea para no depender de librerías. */
const IconoTema = ({ children }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
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

/**
 * Páginas de servicio con contenido propio. Son las mismas que aparecen en el
 * pie de página: si se añade una nueva, hay que tocar los dos sitios.
 */
const TEMAS = [
  {
    ruta: '/cuanto-cuesta-una-pagina-web',
    titulo: '¿Cuánto cuesta una página web?',
    texto: 'Precios reales en España, qué los sube o los baja y cuándo desconfiar de un presupuesto.',
    icono: (
      <IconoTema>
        <circle cx='12' cy='12' r='9' />
        <path d='M9.5 9.5A3 3 0 0 1 15 10' />
        <path d='M9.5 14.5A3 3 0 0 0 15 14' />
        <path d='M8 11h5M8 13h5' />
      </IconoTema>
    ),
  },
  {
    ruta: '/precio-tienda-online',
    titulo: 'Precio de una tienda online',
    texto: 'Lo que cuesta montar una tienda con carrito y pago seguro, gastos anuales incluidos.',
    icono: (
      <IconoTema>
        <path d='M4 5h2l1.6 9.2a2 2 0 0 0 2 1.8h6.8a2 2 0 0 0 2-1.6L20 8H7' />
        <circle cx='10' cy='19' r='1.3' />
        <circle cx='17' cy='19' r='1.3' />
      </IconoTema>
    ),
  },
  {
    ruta: '/diseno-web-economico',
    titulo: 'Diseño web económico',
    texto: 'Dónde se puede ahorrar sin que se note en el resultado. Desde 350€ y sin cuotas obligatorias.',
    icono: (
      <IconoTema>
        <path d='M20.6 13.4 12 4.8H5v7l8.6 8.6a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8Z' />
        <circle cx='8.5' cy='8.5' r='1.1' />
      </IconoTema>
    ),
  },
  {
    ruta: '/diseno-web-para-pymes',
    titulo: 'Diseño web para pymes',
    texto: 'Webs para pequeñas empresas y autónomos: precio cerrado, sin plantillas y trato directo.',
    icono: (
      <IconoTema>
        <path d='M3 21h18' />
        <path d='M5 21V7l7-4 7 4v14' />
        <path d='M9 21v-5h6v5' />
        <path d='M9 11h.01M15 11h.01' />
      </IconoTema>
    ),
  },
  {
    ruta: '/diseno-web-para-nutricionistas',
    titulo: 'Webs para nutricionistas',
    texto: 'Consultas de nutrición y dietética: cita online, pago de la sesión y SEO en tu ciudad.',
    icono: (
      <IconoTema>
        <path d='M4 20c0-8 5-13 16-14 0 11-5 15-11 15a5 5 0 0 1-5-1Z' />
        <path d='M9 15c1.5-3 4-5.5 7-7' />
      </IconoTema>
    ),
  },
]

export const Servicios = () => {

  return (
    <div className='servicios-container'>
      <div className='page-header'>
        <h1>Mis Servicios</h1>
        <p>Soluciones web integrales para impulsar tu negocio</p>
      </div>

      <section className='services-section'>

        {/* ── Fila 1: Landings ── */}
        <div className='service-group'>
          <div className='section-row-title'>Landings</div>
          <div className='service-row-grid service-row-grid-2'>

            <div className='service-card'>
              <h2>Starter</h2>
              <div className='service-price'>350€</div>
              <p className='service-description'>Ideal para tener presencia online con lo esencial bien hecho.</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon />1 sección larga y 3 secciones pequeñas</li>
                <li><FeatureCheckIcon />SEO y posicionamiento básico</li>
                <li><FeatureCheckIcon />Diseño Responsive</li>
                <li><FeatureCheckIcon />Formulario de Contacto</li>
                <li><FeatureCheckIcon />Entrega en 2 semanas</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card service-card-featured'>
              <span className='service-featured-badge'>Más completo</span>
              <h2>Premium</h2>
              <div className='service-price'>500€</div>
              <p className='service-description'>Más secciones, más impacto y mayor personalización.</p>
              <ul className='service-details'>
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
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

          </div>
        </div>

        {/* ── Fila 2: Sitios Web ── */}
        <div className='service-group'>
          <div className='section-row-title'>Sitios Web</div>
          <div className='service-row-grid service-row-grid-3'>

            {/* Mismos tres tipos que el modal de la home: el Basico va sin
                "Desde" porque su precio es cerrado, los otros dos dependen del
                catalogo o del alcance. Si cambia uno, cambiar el otro. */}
            <div className='service-card'>
              <h2>Sitio Web Básico</h2>
              <div className='service-price'>699€</div>
              <p className='service-description'>Presencia profesional para que te encuentren y te contacten. Sin tienda.</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon />3-5 páginas</li>
                <li><FeatureCheckIcon />Diseño Responsive</li>
                <li><FeatureCheckIcon />SEO básico incluido</li>
                <li><FeatureCheckIcon />Formulario de contacto</li>
                <li><FeatureCheckIcon />Google Analytics incluido</li>
                <li><FeatureCheckIcon />Entrega en 3-4 semanas</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card'>
              <h2>E-commerce / Tienda Online</h2>
              <div className='service-price'><span className='service-price-desde'>Desde</span>999€</div>
              <p className='service-description'>Vende online desde el primer día: catálogo, carrito y pago seguro. Precio según nº de productos.</p>
              <p className='features-herencia'>Todo lo del Básico, y además:</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon gold />Carrito de compras</li>
                <li><FeatureCheckIcon gold />Catálogo de productos</li>
                <li><FeatureCheckIcon gold />Pasarela de pago segura</li>
                <li><FeatureCheckIcon gold />Panel de gestión de productos</li>
                <li><FeatureCheckIcon gold />Blog integrado</li>
                <li><FeatureCheckIcon gold />SEO avanzado incluido</li>
                <li><FeatureCheckIcon />Entrega en 6-8 semanas</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card service-card-featured'>
              <span className='service-featured-badge'>Más elegido</span>
              <h2>Sitio Web a Medida</h2>
              <div className='service-price'><span className='service-price-desde'>Desde</span>1.499€</div>
              <p className='service-description'>Proyecto 100% a medida con la última tecnología. Precio a negociar según alcance.</p>
              <p className='features-herencia'>Todo lo anterior, y además:</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon gold />Páginas y funciones sin límite</li>
                <li><FeatureCheckIcon gold />Proyecto 100% a medida</li>
                <li><FeatureCheckIcon gold />ChatBot con IA integrado</li>
                <li><FeatureCheckIcon gold />Panel de administración personalizado</li>
                <li><FeatureCheckIcon gold />Integraciones a medida (APIs, pasarelas, etc.)</li>
                <li><FeatureCheckIcon gold />Animaciones y efectos avanzados</li>
                <li><FeatureCheckIcon gold />Soporte prioritario primer mes</li>
                <li><FeatureCheckIcon />Entrega según proyecto</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

          </div>
        </div>

        {/* ── Fila 3: Mantenimiento ── */}
        <div className='service-group'>
          <div className='section-row-title'>Mantenimiento</div>
          <div className='service-row-grid service-row-grid-2'>

            <div className='service-card'>
              <h2>Básico</h2>
              <div className='service-price'>50€<span className='service-price-mes'>/mes</span></div>
              <p className='service-description'>Lo esencial para que tu web funcione sin preocupaciones.</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon />Actualizaciones de seguridad</li>
                <li><FeatureCheckIcon />Copias de seguridad</li>
                <li><FeatureCheckIcon />Pequeños ajustes</li>
                <li><FeatureCheckIcon />Google Analytics incluido</li>
                <li><FeatureCheckIcon />Informe mensual de rendimiento en PDF</li>
                <li><FeatureCheckIcon />Sin permanencia, cancela cuando quieras</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card service-card-featured'>
              <span className='service-featured-badge'>Más completo</span>
              <h2>Premium</h2>
              <div className='service-price'>70€<span className='service-price-mes'>/mes</span></div>
              <p className='service-description'>Máxima tranquilidad con soporte prioritario y disponibilidad total.</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon />Todo lo del plan Básico</li>
                <li><FeatureCheckIcon gold />Soporte prioritario con respuesta en menos de 24h</li>
                <li><FeatureCheckIcon gold />Actualizaciones constantes y mejoras continuas</li>
                <li><FeatureCheckIcon gold />Optimización SEO mensual</li>
                <li><FeatureCheckIcon gold />Pequeñas mejoras de diseño incluidas</li>
                <li><FeatureCheckIcon gold />Revisión mensual de velocidad y rendimiento</li>
                <li><FeatureCheckIcon />Sin permanencia, cancela cuando quieras</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

          </div>
        </div>

        {/* ── Fila 4: ChatBot con IA ── */}
        <div className='service-group'>
          <div className='section-row-title'>ChatBot con IA</div>
          <div className='chatbot-banner'>
            <div className='chatbot-banner-texto'>
              <span className='chatbot-banner-badge'>Nuevo</span>
              <h3>ChatBot con IA</h3>
              <p>Integra un asistente inteligente en tu web que atiende a tus clientes 24/7, responde preguntas y capta leads de forma automática.</p>
            </div>
            <div className='chatbot-banner-precio'>
              <span className='chatbot-banner-desde'>Precio</span>
              <span className='chatbot-banner-valor'>A consultar</span>
              <Link to='/contacto' className='service-btn chatbot-banner-btn'>Pedir presupuesto</Link>
            </div>
          </div>
        </div>

        {/* ── Fila 5: páginas de servicio con contenido propio ── */}
        <div className='service-group'>
          <div className='section-row-title'>Más sobre mis servicios</div>
          <p className='temas-intro'>
            Si prefieres entender bien el precio antes de escribirme, o buscas algo pensado
            para tu tipo de negocio, aquí lo tienes explicado con calma.
          </p>
          <div className='temas-grid'>
            {TEMAS.map((tema) => (
              <Link key={tema.ruta} to={tema.ruta} className='tema-card'>
                <span className='tema-card-icono'>{tema.icono}</span>
                <h3>{tema.titulo}</h3>
                <p>{tema.texto}</p>
                <span className='tema-card-mas'>
                  Ver más <span aria-hidden='true'>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

      </section>

      <div id='faq'>
        <FAQ />
      </div>
    </div>
  )
}
