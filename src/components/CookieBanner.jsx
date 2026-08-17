import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

const activarGA = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })
  }
}

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consentimiento = localStorage.getItem('cookie_consent')
    if (!consentimiento) {
      setVisible(true)
    } else if (consentimiento === 'all') {
      activarGA()
    }
  }, [])

  const aceptarTodas = () => {
    localStorage.setItem('cookie_consent', 'all')
    activarGA()
    setVisible(false)
  }

  const soloNecesarias = () => {
    localStorage.setItem('cookie_consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className='cookie-banner' role='dialog' aria-label='Aviso de cookies'>
      <div className='cookie-banner-inner'>
        <p className='cookie-banner-text'>
          Usamos cookies propias y de terceros (Google Analytics) para mejorar tu experiencia y analizar el tráfico.{' '}
          <Link to='/politica-cookies' className='cookie-banner-link'>Más información</Link>
        </p>
        <div className='cookie-banner-actions'>
          <button className='cookie-btn cookie-btn-secondary' onClick={soloNecesarias}>
            Solo necesarias
          </button>
          <button className='cookie-btn cookie-btn-primary' onClick={aceptarTodas}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
