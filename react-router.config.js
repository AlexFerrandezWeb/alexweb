import { rutasPrerenderizadas } from './rutas-sitio.mjs'

/**
 * Configuración de React Router en modo framework.
 *
 * ssr: false + prerender = generamos un HTML estático por ruta en el build.
 * No hay servidor Node en producción: Cloudflare Pages sirve ficheros sueltos.
 * Esto es lo que hace que Google reciba título, descripción y h1 propios sin
 * tener que ejecutar JavaScript.
 *
 * La lista de URLs sale de rutas-sitio.mjs, la misma que alimenta el mapa de
 * rutas y el sitemap, para que no puedan desincronizarse.
 */
export default {
  // Mantenemos los componentes donde ya estaban en lugar de mover todo a app/.
  appDirectory: 'src',
  ssr: false,
  prerender: rutasPrerenderizadas(),
}
