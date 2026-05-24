import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export const PoliticaCookies = () => {
  useEffect(() => {
    document.title = 'AlexWeb | Política de Cookies'
  }, [])

  return (
    <div className='legal-container'>
      <div className='page-header'>
        <h1>Política de Cookies</h1>
        <p>Qué son, cuáles usamos y cómo gestionarlas</p>
      </div>

      <div className='legal-content'>
        <p className='legal-updated'>Última actualización: mayo de 2025</p>

        <section className='legal-section'>
          <h2>¿Qué es una cookie?</h2>
          <p>
            Una cookie es un pequeño archivo de texto que un sitio web guarda en tu navegador
            cuando lo visitas. Sirve para que el sitio recuerde información sobre tu visita,
            como el idioma que prefieres o si ya has aceptado el aviso de cookies.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Cookies que utilizamos</h2>

          <h3>1. Cookies técnicas o necesarias (propias)</h3>
          <p>
            Son imprescindibles para el correcto funcionamiento del sitio. Sin ellas, el
            sitio no podría operar con normalidad.
          </p>
          <div className='legal-table-wrap'>
            <table className='legal-table'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cookie_consent</code></td>
                  <td>Guarda tu preferencia de cookies para no volver a mostrarte el aviso</td>
                  <td>1 año</td>
                  <td>Propia</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Cookies analíticas (terceros — Google Analytics)</h3>
          <p>
            Solo se activan si aceptas todas las cookies. Permiten conocer cómo los
            usuarios navegan por el sitio: páginas visitadas, tiempo de permanencia,
            procedencia del tráfico, etc. Los datos son anónimos y se usan únicamente
            para mejorar el sitio.
          </p>
          <div className='legal-table-wrap'>
            <table className='legal-table'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_ga</code></td>
                  <td>Identifica sesiones únicas de usuario (anonimizado)</td>
                  <td>2 años</td>
                  <td>Google Analytics</td>
                </tr>
                <tr>
                  <td><code>_ga_*</code></td>
                  <td>Mantiene el estado de la sesión en GA4</td>
                  <td>2 años</td>
                  <td>Google Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Puedes consultar la política de privacidad de Google Analytics en{' '}
            <a
              href='https://policies.google.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='legal-link'
            >
              policies.google.com/privacy
            </a>.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Cómo gestionar las cookies</h2>
          <p>
            Puedes cambiar tu preferencia en cualquier momento borrando las cookies de tu
            navegador: la próxima vez que visites el sitio, volverá a aparecer el aviso.
          </p>
          <p>También puedes desactivar las cookies directamente desde tu navegador:</p>
          <ul className='legal-list'>
            <li>
              <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y
              otros datos de sitios
            </li>
            <li>
              <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos
              del sitio
            </li>
            <li>
              <strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web
            </li>
            <li>
              <strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies
            </li>
          </ul>
          <p>
            Ten en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento
            del sitio.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Más información</h2>
          <p>
            Si tienes alguna duda sobre el uso de cookies en este sitio, puedes ponerte en
            contacto a través de la{' '}
            <Link to='/contacto' className='legal-link'>página de contacto</Link> o
            consultando nuestra{' '}
            <Link to='/politica-privacidad' className='legal-link'>Política de Privacidad</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
