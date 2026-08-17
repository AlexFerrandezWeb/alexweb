import React from 'react'
import { Link } from 'react-router-dom'

import { Video } from './Video'
import { enlaceWhatsApp, registrarClicWhatsApp } from '../../utils/whatsapp'
import './Blog.css'

/**
 * Un artículo del blog.
 *
 * Igual que LandingSEO: el SEO no se inyecta aquí, lo declara el `meta` de la
 * ruta y se renderiza en el HTML durante el build. Este componente solo pinta.
 */

/** 2026-08-16 -> "16 de agosto de 2026" */
export const formatearFecha = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export const Articulo = ({ articulo }) => {
  const {
    titulo,
    etiqueta,
    resumen,
    publicado,
    actualizado,
    minutos,
    secciones,
    cierre,
  } = articulo

  return (
    <article className='blog-articulo'>
      <header className='blog-articulo-cabecera'>
        <Link to='/blog' className='blog-volver'>
          ← Todos los artículos
        </Link>

        {etiqueta && <span className='blog-etiqueta'>{etiqueta}</span>}
        <h1>{titulo}</h1>
        <p className='blog-articulo-resumen'>{resumen}</p>

        <p className='blog-articulo-datos'>
          <time dateTime={publicado}>{formatearFecha(publicado)}</time>
          <span aria-hidden='true'> · </span>
          <span>{minutos} min de lectura</span>
          {actualizado && actualizado !== publicado && (
            <>
              <span aria-hidden='true'> · </span>
              <span>Revisado el {formatearFecha(actualizado)}</span>
            </>
          )}
        </p>
      </header>

      <div className='blog-articulo-cuerpo'>
        {secciones.map((seccion) => (
          <section key={seccion.titulo}>
            <h2>{seccion.titulo}</h2>

            {seccion.parrafos.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}

            {seccion.lista && (
              <ul className='blog-lista'>
                {seccion.lista.map((punto, i) => (
                  <li key={i}>{punto}</li>
                ))}
              </ul>
            )}

            {seccion.video && <Video video={seccion.video} />}
          </section>
        ))}
      </div>

      <footer className='blog-cierre'>
        <h2>{cierre.titulo}</h2>
        <p>{cierre.texto}</p>

        <div className='blog-cierre-acciones'>
          <Link to='/contacto' className='blog-btn blog-btn-primario'>
            Cuéntame tu caso
          </Link>
          <a
            href={enlaceWhatsApp(cierre.mensajeWhatsApp)}
            target='_blank'
            rel='noopener noreferrer'
            className='blog-btn blog-btn-secundario'
            onClick={() => registrarClicWhatsApp(`blog_${articulo.slug}`)}
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </footer>
    </article>
  )
}
