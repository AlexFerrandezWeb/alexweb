import React, { useEffect } from 'react'
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

export const Servicios = () => {

  useEffect(() => {
    document.title = "AlexWeb | Servicios";
  }, []);

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

            <div className='service-card'>
              <h2>Starter</h2>
              <div className='service-price'><span className='service-price-desde'>Desde</span>750€</div>
              <p className='service-description'>Presencia sólida online con tienda funcional desde el primer día.</p>
              <ul className='service-details'>
                <li><FeatureCheckIcon />3 páginas</li>
                <li><FeatureCheckIcon />Carrito de compras</li>
                <li><FeatureCheckIcon />Hasta 50 productos</li>
                <li><FeatureCheckIcon />SEO básico incluido</li>
                <li><FeatureCheckIcon />Diseño Responsive</li>
                <li><FeatureCheckIcon />Diseño Personalizado</li>
                <li><FeatureCheckIcon />Google Analytics incluido</li>
                <li><FeatureCheckIcon />Entrega en 4-6 semanas</li>
              </ul>
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card service-card-featured'>
              <span className='service-featured-badge'>Más elegido</span>
              <h2>Premium</h2>
              <div className='service-price'>1.500€</div>
              <p className='service-description'>Mayor catálogo, mejor rendimiento y más páginas para crecer.</p>
              <ul className='service-details'>
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
              <Link to='/contacto' className='service-btn'>Contactar</Link>
            </div>

            <div className='service-card service-card-elite'>
              <span className='service-featured-badge service-badge-elite'>Élite</span>
              <h2>Élite</h2>
              <div className='service-price'><span className='service-price-desde'>Desde</span>2.800€</div>
              <p className='service-description'>Proyecto a medida con la última tecnología y asistente de IA integrado.</p>
              <ul className='service-details'>
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

      </section>

      <div id='faq'>
        <FAQ />
      </div>
    </div>
  )
}
