import React, { useEffect, useState } from 'react'
import './Contacto.css'
import { FAQ } from './FAQ'
import { enviarFormularioContacto } from '../utils/enviarFormularioContacto'

const getMensajeError = (el) => {
  if (el.validity.valueMissing) return 'Este campo es obligatorio'
  if (el.validity.typeMismatch) return 'Introduce un email válido'
  if (el.validity.tooShort) return `Mínimo ${el.minLength} caracteres (llevas ${el.value.length})`
  return 'Comprueba este campo'
}

export const Contacto = () => {
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', prefijo: '+34', telefono: '', tipoProyecto: '', mensaje: '' })
  const [contactEnviado, setContactEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)
  const [erroresCampos, setErroresCampos] = useState({})
  const [camposAgitados, setCamposAgitados] = useState([])

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
    document.title = "alexweb | Contacto";
  }, []);

  return (
    <div className='contacto-container'>
      <div className='page-header'>
        <h1>Contacto</h1>
        <p>¿Tienes un proyecto en mente? ¡Hablemos!</p>
      </div>

      <div className='contact-form-container'>
        {contactEnviado ? (
          <div className='contact-success'>
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#764ba2' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
              <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
              <polyline points='22 4 12 14.01 9 11.01' />
            </svg>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarme. Te responderé en menos de 24 horas. Revisa tu correo electrónico y ¡que tengas un buen día!</p>
            <button className='submit-btn' onClick={() => setContactEnviado(false)}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} noValidate>
            <p className='form-nota'>Todos los campos son obligatorios.</p>
            <div className='form-group'>
              <label htmlFor='c-nombre'>Nombre</label>
              <input
                type='text'
                id='c-nombre'
                name='nombre'
                className={camposAgitados.includes('nombre') ? 'campo-invalido' : erroresCampos.nombre ? 'campo-error' : undefined}
                placeholder='Tu nombre'
                value={contactForm.nombre}
                onChange={handleContactChange}
                required
              />
              {erroresCampos.nombre && <span className='campo-error-msg'>{erroresCampos.nombre}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='c-email'>Email</label>
              <input
                type='email'
                id='c-email'
                name='email'
                className={camposAgitados.includes('email') ? 'campo-invalido' : erroresCampos.email ? 'campo-error' : undefined}
                placeholder='tucorreo@ejemplo.com'
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
              {erroresCampos.email && <span className='campo-error-msg'>{erroresCampos.email}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='c-telefono'>Número móvil</label>
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
                  id='c-telefono'
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

            <div className='form-group'>
              <label htmlFor='c-tipo-proyecto'>Tipo de proyecto</label>
              <select
                id='c-tipo-proyecto'
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

            <div className='form-group'>
              <label htmlFor='c-mensaje'>Mensaje</label>
              <textarea
                id='c-mensaje'
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
              <div className='form-error' role='alert'>
                Ha habido un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbeme directamente por WhatsApp.
              </div>
            )}

            <button type='submit' className='submit-btn' disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>

      <FAQ />
    </div>
  )
}
