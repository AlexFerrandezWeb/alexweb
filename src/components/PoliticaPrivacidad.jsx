import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export const PoliticaPrivacidad = () => {
  useEffect(() => {
    document.title = 'alexweb | Política de Privacidad'
  }, [])

  return (
    <div className='legal-container'>
      <div className='page-header'>
        <h1>Política de Privacidad</h1>
        <p>Cómo tratamos los datos que nos facilitas</p>
      </div>

      <div className='legal-content'>
        <p className='legal-updated'>Última actualización: mayo de 2025</p>

        <section className='legal-section'>
          <h2>Responsable del tratamiento</h2>
          <ul className='legal-list legal-list-plain'>
            <li><strong>Titular:</strong> Alejandro Ferrández</li>
            <li><strong>NIE:</strong> Y-4873506-S</li>
            <li><strong>Domicilio:</strong> Murcia, España</li>
            <li><strong>Correo electrónico:</strong> alejandroferrandezjuarez@gmail.com</li>
          </ul>
        </section>

        <section className='legal-section'>
          <h2>Qué datos recogemos y para qué</h2>
          <p>
            Los únicos datos personales que recogemos son los que tú mismo nos facilitas
            voluntariamente a través del formulario de contacto:
          </p>
          <ul className='legal-list'>
            <li><strong>Nombre:</strong> para dirigirnos a ti de forma personalizada.</li>
            <li><strong>Correo electrónico:</strong> para responderte a tu consulta o enviarte el presupuesto.</li>
            <li>
              <strong>Teléfono (opcional):</strong> únicamente si decides facilitarlo, para
              ponernos en contacto contigo de forma más directa.
            </li>
            <li>
              <strong>Mensaje y tipo de proyecto:</strong> para entender tu necesidad y darte
              una respuesta adecuada.
            </li>
          </ul>
        </section>

        <section className='legal-section'>
          <h2>Base legal del tratamiento</h2>
          <p>
            El tratamiento de tus datos se basa en el <strong>consentimiento</strong> que
            prestas al enviar el formulario (art. 6.1.a del RGPD). En ningún caso tus datos
            se tratarán para finalidades distintas a las indicadas sin solicitarte antes
            un nuevo consentimiento.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Plazos de conservación</h2>
          <p>
            Conservaremos tus datos durante el tiempo necesario para gestionar tu consulta
            y, como máximo, durante <strong>1 año</strong> desde el último contacto contigo.
            Transcurrido ese plazo, los datos serán eliminados de forma segura.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Destinatarios y cesión de datos</h2>
          <p>
            Tus datos <strong>no se ceden a terceros</strong> con fines comerciales. Para el
            envío del correo electrónico desde el formulario utilizamos{' '}
            <strong>EmailJS</strong> (EmailJS Ltd.), un servicio que actúa como encargado
            del tratamiento y que se compromete a tratar los datos conforme al RGPD. Puedes
            consultar su política de privacidad en{' '}
            <a
              href='https://www.emailjs.com/legal/privacy-policy/'
              target='_blank'
              rel='noopener noreferrer'
              className='legal-link'
            >
              emailjs.com/legal/privacy-policy
            </a>.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Tus derechos</h2>
          <p>
            En cualquier momento puedes ejercer los siguientes derechos sobre tus datos:
          </p>
          <ul className='legal-list'>
            <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos incorrectos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar que eliminemos tus datos.</li>
            <li><strong>Limitación:</strong> solicitar que suspendamos el tratamiento en ciertos casos.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, contáctanos a través de la{' '}
            <Link to='/contacto' className='legal-link'>página de contacto</Link> indicando
            claramente el derecho que deseas ejercer y adjuntando una copia de tu documento
            de identidad. Te responderemos en el plazo máximo de 30 días.
          </p>
          <p>
            Si consideras que el tratamiento de tus datos vulnera la normativa, también
            tienes derecho a presentar una reclamación ante la{' '}
            <a
              href='https://www.aepd.es'
              target='_blank'
              rel='noopener noreferrer'
              className='legal-link'
            >
              Agencia Española de Protección de Datos (AEPD)
            </a>.
          </p>
        </section>

        <section className='legal-section'>
          <h2>Cookies</h2>
          <p>
            Este sitio utiliza cookies propias y de terceros. Consulta nuestra{' '}
            <Link to='/politica-cookies' className='legal-link'>Política de Cookies</Link>{' '}
            para más información.
          </p>
        </section>
      </div>
    </div>
  )
}
