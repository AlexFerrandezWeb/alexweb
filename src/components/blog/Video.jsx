import React, { useState } from 'react'

/**
 * Vídeo dentro de un artículo, con el origen como dato.
 *
 * La decisión de si un vídeo va a YouTube o a Instagram se toma artículo a
 * artículo, no aquí. Por eso el componente acepta los dos y se pueden mezclar
 * en la misma página.
 */

/**
 * YouTube con fachada: se pinta la miniatura y el iframe no existe hasta que
 * el visitante hace clic.
 *
 * Dos motivos, y el segundo es el importante:
 *   1. El reproductor de YouTube son cerca de 1 MB de JavaScript. Cargarlo en
 *      cada visita hunde el rendimiento en móvil aunque nadie le dé al play.
 *   2. El iframe planta cookies de Google nada más cargarse, es decir, antes de
 *      que el visitante haya aceptado nada en el banner. Con la fachada, esas
 *      cookies solo aparecen si hay un clic deliberado, que es lo que pide el
 *      RGPD. Además usamos youtube-nocookie.com, que reduce el seguimiento.
 *
 * La miniatura se sirve desde i.ytimg.com, que no identifica al usuario.
 */
const VideoYouTube = ({ id, titulo }) => {
  const [activo, setActivo] = useState(false)

  if (activo) {
    return (
      <div className='blog-video-marco'>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          loading='lazy'
        />
      </div>
    )
  }

  return (
    <button
      type='button'
      className='blog-video-marco blog-video-fachada'
      onClick={() => setActivo(true)}
      aria-label={`Reproducir el vídeo: ${titulo}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=''
        loading='lazy'
        decoding='async'
      />
      <span className='blog-video-play' aria-hidden='true'>
        <svg viewBox='0 0 68 48' width='68' height='48'>
          <path
            d='M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.5C4 2.3 2.3 4.8 1.5 7.7 0 13 0 24 0 24s0 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.5c2.9-.8 4.6-3.3 5.4-6.2C68 35 68 24 68 24s0-11-1.5-16.3z'
            fill='#f00'
          />
          <path d='M27 34V14l18 10-18 10z' fill='#fff' />
        </svg>
      </span>
      <span className='blog-video-pie'>{titulo}</span>
    </button>
  )
}

/**
 * Reel de Instagram: tarjeta que enlaza, no incrustación.
 *
 * El embed oficial obliga a cargar el JavaScript de Meta, pesa mucho más que
 * el propio reel y deja de funcionar si el reel se borra o la cuenta pasa a
 * privada, dejando un hueco en blanco en el artículo. Enlazar es más robusto y
 * de paso manda visitas al perfil en lugar de quedárselas la página.
 */
const VideoInstagram = ({ url, titulo, descripcion }) => (
  <a
    className='blog-video-instagram'
    href={url}
    target='_blank'
    rel='noopener noreferrer'
  >
    <span className='blog-video-instagram-icono' aria-hidden='true'>
      <svg viewBox='0 0 24 24' width='28' height='28' fill='currentColor'>
        <path d='M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12a5.9 5.9 0 0 0 2.12 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38a5.9 5.9 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z' />
        <path d='M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z' />
        <circle cx='18.41' cy='5.59' r='1.44' />
      </svg>
    </span>
    <span className='blog-video-instagram-texto'>
      <strong>{titulo}</strong>
      {descripcion && <span>{descripcion}</span>}
      <span className='blog-video-instagram-cta'>Ver el reel en Instagram →</span>
    </span>
  </a>
)

export const Video = ({ video }) => {
  if (!video) return null

  if (video.tipo === 'youtube') {
    return <VideoYouTube id={video.id} titulo={video.titulo} />
  }

  if (video.tipo === 'instagram') {
    return (
      <VideoInstagram
        url={video.url}
        titulo={video.titulo}
        descripcion={video.descripcion}
      />
    )
  }

  // Un tipo desconocido es una errata en el contenido. Mejor no pintar nada que
  // romper el artículo entero.
  return null
}
