import { index, route } from '@react-router/dev/routes'

import { PAGINAS, MODULO_NO_ENCONTRADA, RUTA_ARTICULO } from '../rutas-sitio.mjs'

/**
 * Mapa de rutas del sitio, derivado de rutas-sitio.mjs.
 *
 * Cada módulo de src/paginas exporta el componente por defecto y su `meta`,
 * que es lo que acaba renderizado en el <head> del HTML durante el build.
 *
 * Para añadir una página no se toca este fichero: se añade una entrada en
 * rutas-sitio.mjs y aparece aquí, en el prerender y en el sitemap a la vez.
 */
export default [
  ...PAGINAS.map(({ ruta, modulo, indice, id }) => {
    if (indice) return index(modulo)

    // route() espera la ruta sin la barra inicial.
    const camino = ruta.slice(1)
    return id ? route(camino, modulo, { id }) : route(camino, modulo)
  }),

  // Un solo módulo para todos los artículos. Las URLs concretas se generan en
  // el prerender a partir de src/contenido/blog.mjs.
  route(RUTA_ARTICULO.patron, RUTA_ARTICULO.modulo),

  route('*', MODULO_NO_ENCONTRADA),
]
