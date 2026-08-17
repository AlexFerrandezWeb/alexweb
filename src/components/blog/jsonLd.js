const SITIO = 'https://alexweb.es'

/**
 * Datos estructurados de un artículo.
 *
 * Con BlogPosting Google sabe que esto es un artículo con autor y fecha, no una
 * página de servicio más. Es lo que le permite mostrarlo con su fecha en los
 * resultados y atribuírselo a Alejandro y no al vacío.
 *
 * El autor apunta con @id al Person que ya declara root.jsx en todas las
 * páginas, en vez de repetir sus datos: así Google entiende que el que escribe
 * el blog y el que firma el negocio son la misma persona.
 */
export const construirJsonLdArticulo = ({
  ruta,
  titulo,
  descripcion,
  publicado,
  actualizado,
}) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${SITIO}${ruta}#articulo`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITIO}${ruta}` },
      url: `${SITIO}${ruta}`,
      headline: titulo,
      description: descripcion,
      datePublished: publicado,
      dateModified: actualizado ?? publicado,
      inLanguage: 'es-ES',
      image: `${SITIO}/assets/og-image.png`,
      author: { '@id': `${SITIO}/#alejandro` },
      publisher: { '@id': `${SITIO}/#negocio` },
      isPartOf: { '@id': `${SITIO}/blog#blog` },
    },
  ],
})

/**
 * Datos estructurados del índice.
 *
 * El Blog con su listado ayuda a que Google descubra los artículos aunque
 * llegue al índice antes que al sitemap.
 */
export const construirJsonLdIndice = ({ titulo, descripcion, articulos }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${SITIO}/blog#blog`,
      url: `${SITIO}/blog`,
      name: titulo,
      description: descripcion,
      inLanguage: 'es-ES',
      publisher: { '@id': `${SITIO}/#negocio` },
      blogPost: articulos.map(({ slug, titulo: t, resumen, publicado }) => ({
        '@type': 'BlogPosting',
        '@id': `${SITIO}/blog/${slug}#articulo`,
        url: `${SITIO}/blog/${slug}`,
        headline: t,
        description: resumen,
        datePublished: publicado,
        author: { '@id': `${SITIO}/#alejandro` },
      })),
    },
  ],
})
