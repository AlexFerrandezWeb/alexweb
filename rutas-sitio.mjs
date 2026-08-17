/**
 * Fuente única de verdad de las páginas del sitio.
 *
 * Antes esta lista vivía copiada en tres sitios: el mapa de rutas, la lista de
 * prerender y el sitemap.xml escrito a mano. Añadir una página obligaba a tocar
 * los tres y olvidarse de uno no rompía el build: simplemente la página no se
 * generaba, o no llegaba a Google, en silencio. Con el blog creciendo eso pasa
 * de ser improbable a ser cuestión de tiempo.
 *
 * Ahora los tres consumidores derivan de aquí:
 *   - src/routes.js              -> el mapa de rutas de React Router
 *   - react-router.config.js     -> qué URLs se prerenderizan en el build
 *   - scripts/postbuild.mjs      -> genera build/client/sitemap.xml
 *
 * Es .mjs a propósito: lo importa tanto Vite como Node "pelado" en el
 * postbuild, y el package.json no declara "type": "module".
 *
 * Campos:
 *   ruta        URL pública. Es también la clave de todo lo demás.
 *   modulo      Fichero de src/paginas que la renderiza (relativo a src/).
 *   indice      true solo en la portada, que va como index() en React Router.
 *   id          Identificador propio. Solo hace falta si dos rutas comparten
 *               módulo, porque React Router no admite ids duplicados.
 *   enSitemap   false para las URLs que no queremos indexadas.
 *   prioridad   / frecuencia -> pistas para el sitemap.
 *   actualizado Fecha del <lastmod>. Se toca a mano cuando el contenido cambia
 *               de verdad; ponerla automáticamente a hoy en cada build sería
 *               mentirle a Google y acaba restando credibilidad al sitemap.
 */

import { ARTICULOS, rutaArticulo } from './src/contenido/blog.mjs'

export const PAGINAS = [
  {
    ruta: '/',
    modulo: 'paginas/inicio.jsx',
    indice: true,
    prioridad: '1.0',
    frecuencia: 'weekly',
    actualizado: '2026-08-04',
  },

  // Alias histórico de la portada. Mismo módulo, id propio, y fuera del sitemap
  // para no ofrecerle a Google dos URLs con el mismo contenido.
  {
    ruta: '/inicio',
    modulo: 'paginas/inicio.jsx',
    id: 'inicio-alias',
    enSitemap: false,
  },

  // Páginas de aterrizaje orientadas a búsquedas concretas en Google
  {
    ruta: '/diseno-web-para-pymes',
    modulo: 'paginas/diseno-web-para-pymes.jsx',
    prioridad: '0.9',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/cuanto-cuesta-una-pagina-web',
    modulo: 'paginas/cuanto-cuesta-una-pagina-web.jsx',
    prioridad: '0.9',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/precio-tienda-online',
    modulo: 'paginas/precio-tienda-online.jsx',
    prioridad: '0.9',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/diseno-web-economico',
    modulo: 'paginas/diseno-web-economico.jsx',
    prioridad: '0.9',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },

  // Landing de nicho: se prueba un sector y, si no funciona, se retira sin
  // tocar el resto.
  {
    ruta: '/diseno-web-para-nutricionistas',
    modulo: 'paginas/diseno-web-para-nutricionistas.jsx',
    prioridad: '0.9',
    frecuencia: 'monthly',
    actualizado: '2026-08-08',
  },

  {
    ruta: '/servicios',
    modulo: 'paginas/servicios.jsx',
    prioridad: '0.8',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },

  // El índice del blog. Los artículos no se listan aquí: salen solos de
  // src/contenido/blog.mjs, más abajo.
  {
    ruta: '/blog',
    modulo: 'paginas/blog.jsx',
    prioridad: '0.8',
    frecuencia: 'weekly',
    actualizado: '2026-08-16',
  },
  {
    ruta: '/sobreMi',
    modulo: 'paginas/sobre-mi.jsx',
    prioridad: '0.7',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/contacto',
    modulo: 'paginas/contacto.jsx',
    prioridad: '0.7',
    frecuencia: 'monthly',
    actualizado: '2026-08-04',
  },

  {
    ruta: '/politica-cookies',
    modulo: 'paginas/politica-cookies.jsx',
    prioridad: '0.3',
    frecuencia: 'yearly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/politica-privacidad',
    modulo: 'paginas/politica-privacidad.jsx',
    prioridad: '0.3',
    frecuencia: 'yearly',
    actualizado: '2026-08-04',
  },
  {
    ruta: '/aviso-legal',
    modulo: 'paginas/aviso-legal.jsx',
    prioridad: '0.3',
    frecuencia: 'yearly',
    actualizado: '2026-08-04',
  },
]

/** Módulo que atiende cualquier URL que no exista. */
export const MODULO_NO_ENCONTRADA = 'paginas/no-encontrada.jsx'

/**
 * URL que solo existe para que el build genere un HTML de "no encontrada".
 * scripts/postbuild.mjs lo mueve a 404.html, que es donde Cloudflare Pages lo
 * busca para responder con un 404 de verdad. Nunca va al sitemap.
 */
export const RUTA_404 = '/404'

/**
 * Los artículos del blog comparten un único módulo con parámetro en la URL, en
 * lugar de tener un fichero por artículo. El `meta` de esa ruta recibe el slug
 * en `params` y saca de ahí su título y su descripción, así que cada artículo
 * sigue teniendo SEO propio en el HTML aunque el módulo sea el mismo.
 */
export const RUTA_ARTICULO = {
  patron: 'blog/:slug',
  modulo: 'paginas/blog-articulo.jsx',
}

/** Prioridad en el sitemap de cada artículo. Por debajo de las landings, que
 *  son las que traen clientes, y del índice del blog. */
const PRIORIDAD_ARTICULO = '0.7'

/** Las URLs reales de los artículos, que es lo que hay que prerenderizar. */
const paginasDeArticulos = () =>
  ARTICULOS.map(({ slug, publicado, actualizado }) => ({
    ruta: rutaArticulo(slug),
    prioridad: PRIORIDAD_ARTICULO,
    frecuencia: 'monthly',
    actualizado: actualizado ?? publicado,
  }))

/** Las que se prerenderizan: páginas, artículos y el 404 técnico. */
export const rutasPrerenderizadas = () => [
  ...PAGINAS.map((p) => p.ruta),
  ...paginasDeArticulos().map((a) => a.ruta),
  RUTA_404,
]

/** Las que se ofrecen a Google. */
export const paginasIndexables = () => [
  ...PAGINAS.filter((p) => p.enSitemap !== false),
  ...paginasDeArticulos(),
]
