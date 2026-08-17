import React from 'react'
import { Link } from 'react-router-dom'

import { articulosPorFecha, rutaArticulo } from '../../contenido/blog.mjs'
import { formatearFecha } from './Articulo'
import './Blog.css'

/**
 * Índice del blog.
 *
 * El título vive aquí y no en blog.mjs porque no es un artículo: es la
 * presentación de la sección, y solo la usa esta página.
 */
export const CABECERA = {
  titulo: 'Cómo aplicar la IA a tu negocio',
}

export const IndiceBlog = () => {
  const articulos = articulosPorFecha()

  return (
    <div className='blog-indice'>
      <header className='blog-indice-cabecera'>
        <h1>{CABECERA.titulo}</h1>
      </header>

      {articulos.length === 0 ? (
        <p className='blog-vacio'>
          Estoy escribiendo los primeros artículos. Vuelve en unos días.
        </p>
      ) : (
        <ul className='blog-tarjetas'>
          {articulos.map((articulo) => (
            <li key={articulo.slug}>
              <article className='blog-tarjeta'>
                {articulo.etiqueta && (
                  <span className='blog-etiqueta'>{articulo.etiqueta}</span>
                )}

                <h2>
                  {/* El enlace envuelve el título para que el área pulsable sea
                      clara y el texto del enlace le diga algo a Google. */}
                  <Link to={rutaArticulo(articulo.slug)}>{articulo.titulo}</Link>
                </h2>

                <p className='blog-tarjeta-resumen'>{articulo.resumen}</p>

                <p className='blog-tarjeta-datos'>
                  <time dateTime={articulo.publicado}>
                    {formatearFecha(articulo.publicado)}
                  </time>
                  <span aria-hidden='true'> · </span>
                  <span>{articulo.minutos} min</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
