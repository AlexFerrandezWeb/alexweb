import { Link } from 'react-router-dom'
import { construirMeta } from '../utils/construirMeta'

/**
 * Página 404.
 *
 * El estado HTTP 404 real no lo pone React: lo pone Cloudflare Pages al servir
 * el fichero 404.html que genera el build. Esta ruta cubre el otro caso, el de
 * quien ya está navegando por la web y pincha un enlace roto.
 *
 * noindex para que Google no llegue a indexar la página de error.
 */
export const meta = () => [
  ...construirMeta({
    titulo: 'Página no encontrada | alexweb',
    descripcion: 'La página que buscas no existe o ha cambiado de dirección.',
    ruta: '/404',
  }),
  { name: 'robots', content: 'noindex, follow' },
]

export default function NoEncontrada() {
  return (
    <main className='pagina-404'>
      <h1>Esta página no existe</h1>
      <p>
        Puede que el enlace esté mal escrito o que la página haya cambiado de sitio.
        No te vayas con las manos vacías:
      </p>
      <ul>
        <li>
          <Link to='/'>Volver al inicio</Link>
        </li>
        <li>
          <Link to='/servicios'>Ver servicios y precios</Link>
        </li>
        <li>
          <Link to='/cuanto-cuesta-una-pagina-web'>Cuánto cuesta una página web</Link>
        </li>
        <li>
          <Link to='/contacto'>Escribirme y te ayudo</Link>
        </li>
      </ul>
    </main>
  )
}
