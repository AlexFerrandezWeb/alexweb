import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export const AvisoLegal = () => {
  useEffect(() => {
    document.title = 'alexweb | Aviso Legal'
  }, [])

  return (
    <div className='legal-container'>
      <div className='page-header'>
        <h1>Aviso Legal</h1>
        <p>Información legal sobre el titular del sitio</p>
      </div>

      <div className='legal-content'>
        <p className='legal-updated'>Última actualización: mayo de 2025</p>

        <section className='legal-section'>
          <h2>Datos del titular</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios
            de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se
            facilitan los siguientes datos de identificación:
          </p>
          <ul className='legal-list legal-list-plain'>
            <li><strong>Titular:</strong> Alejandro Ferrández</li>
            <li><strong>DNI:</strong> 48735060S</li>
            <li><strong>Domicilio:</strong> Murcia, España</li>
            <li><strong>Correo electrónico:</strong> alejandroferrandezjuarez@gmail.com</li>
            <li><strong>Actividad:</strong> Desarrollo web freelance</li>
          </ul>
        </section>

        <section className='legal-section'>
          <h2>Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el uso del sitio web accesible en este dominio
            (en adelante, «el Sitio»), titularidad de Alejandro Ferrández. El acceso al
            Sitio implica la aceptación de las condiciones aquí recogidas. Si no estás de
            acuerdo con ellas, te pedimos que abandones el Sitio.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del Sitio —textos, imágenes, diseño, código fuente,
            logotipos y demás elementos— son propiedad de Alejandro Ferrández o se
            utilizan con la debida autorización. Están protegidos por la legislación
            española e internacional sobre propiedad intelectual e industrial.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, transformación o comunicación
            pública de cualquier contenido del Sitio sin autorización expresa y por escrito
            del titular.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Condiciones de uso</h2>
          <p>El usuario se compromete a:</p>
          <ul className='legal-list'>
            <li>Hacer un uso lícito del Sitio conforme a la ley y al presente Aviso Legal.</li>
            <li>No introducir virus ni realizar acciones que puedan dañar el Sitio.</li>
            <li>No intentar acceder de forma no autorizada a secciones restringidas del Sitio.</li>
            <li>
              No utilizar el Sitio con fines comerciales sin autorización expresa del titular.
            </li>
          </ul>
        </section>

        <section className='legal-section'>
          <h2>Exclusión de responsabilidad</h2>
          <p>
            El titular no garantiza la disponibilidad o continuidad del Sitio ni la
            ausencia de errores en sus contenidos. No será responsable de los daños y
            perjuicios que pudieran derivarse de la utilización del Sitio o de la
            imposibilidad de acceso al mismo.
          </p>
          <p>
            El Sitio puede contener enlaces a sitios web de terceros. El titular no se
            responsabiliza del contenido de dichos sitios ni de cualquier daño que pudiera
            derivarse de su acceso.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Ley aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para la
            resolución de cualquier controversia derivada del acceso o uso del Sitio,
            las partes se someten a los Juzgados y Tribunales de Murcia, salvo que la
            normativa aplicable establezca otro fuero.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Privacidad y cookies</h2>
          <p>
            El tratamiento de los datos personales facilitados a través del Sitio se rige
            por la{' '}
            <Link to='/politica-privacidad' className='legal-link'>Política de Privacidad</Link>.
            El uso de cookies está regulado en la{' '}
            <Link to='/politica-cookies' className='legal-link'>Política de Cookies</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
