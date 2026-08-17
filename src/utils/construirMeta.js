const SITIO = 'https://alexweb.es'
const IMAGEN_POR_DEFECTO = `${SITIO}/assets/og-image.png`

/**
 * Construye el bloque completo de etiquetas <head> de una ruta.
 *
 * Ojo con una particularidad de React Router: el `meta` de una ruta hija NO se
 * fusiona con el del padre, lo reemplaza entero. Por eso cada ruta tiene que
 * devolver el juego completo (título, descripción, canonical, Open Graph y
 * Twitter) y no solo lo que cambia.
 *
 * Lo devuelto aquí se renderiza en el HTML durante el build, así que llega a
 * Google y a los rastreadores de redes sociales sin ejecutar JavaScript. Esto
 * es lo que sustituye al antiguo hook useSeo, que solo corría en el navegador.
 *
 * @param {{ titulo: string, descripcion: string, ruta: string, imagen?: string, jsonLd?: object, articulo?: { publicado: string, actualizado?: string } }} config
 */
export const construirMeta = ({
  titulo,
  descripcion,
  ruta,
  imagen,
  jsonLd,
  articulo,
}) => {
  const url = `${SITIO}${ruta}`
  const imagenFinal = imagen ?? IMAGEN_POR_DEFECTO

  const etiquetas = [
    { title: titulo },
    { name: 'description', content: descripcion },
    { tagName: 'link', rel: 'canonical', href: url },

    // Los posts del blog se anuncian como 'article': es lo que hace que al
    // compartirlos salgan con fecha y autor en vez de como una web genérica.
    { property: 'og:type', content: articulo ? 'article' : 'website' },
    { property: 'og:site_name', content: 'alexweb' },
    { property: 'og:locale', content: 'es_ES' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: titulo },
    { property: 'og:description', content: descripcion },
    { property: 'og:image', content: imagenFinal },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
      property: 'og:image:alt',
      content: 'alexweb — páginas web a medida para pymes y autónomos',
    },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: titulo },
    { name: 'twitter:description', content: descripcion },
    { name: 'twitter:image', content: imagenFinal },
  ]

  if (articulo) {
    etiquetas.push(
      { property: 'article:published_time', content: articulo.publicado },
      { property: 'article:author', content: 'Alejandro Ferrández' }
    )

    // Solo si de verdad se ha revisado: repetir la fecha de publicación aquí no
    // aporta nada y ensucia lo que ve Google.
    if (articulo.actualizado && articulo.actualizado !== articulo.publicado) {
      etiquetas.push({
        property: 'article:modified_time',
        content: articulo.actualizado,
      })
    }
  }

  if (jsonLd) etiquetas.push({ 'script:ld+json': jsonLd })

  return etiquetas
}

/**
 * Atajo para las landings, que ya llevan su copy y su JSON-LD dentro del
 * objeto `contenido`. Así el texto vive en un único sitio: el de la landing.
 */
export const metaDesdeContenido = (contenido, jsonLd) =>
  construirMeta({
    titulo: contenido.seo.titulo,
    descripcion: contenido.seo.descripcion,
    ruta: contenido.ruta,
    jsonLd,
  })
