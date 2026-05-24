import React from 'react'
import { Link } from 'react-router-dom'
import './FloatingContactBtn.css'

export const FloatingContactBtn = () => (
  <Link
    to='/contacto'
    className='fab-contact'
    aria-label='Escribir para pedir información o resolver dudas'
    title='Contactar'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.35em'
      height='1.35em'
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='fab-contact-icon'
    >
      <path
        fill='currentColor'
        d='M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2z'
      />
    </svg>
  </Link>
)
