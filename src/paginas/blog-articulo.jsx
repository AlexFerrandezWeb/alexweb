import { Link, useParams } from 'react-router-dom'

import { Articulo } from '../components/blog/Articulo'
import { construirJsonLdArticulo } from '../components/blog/jsonLd'
import { buscarArticulo, rutaArticulo } from '../contenido/blog.mjs'
import { construirMeta } from '../utils/construirMeta'

/**
 * Módulo único para todos los artículos.
 *
 * `meta` recibe el slug en `params`, y como cada URL se prerenderiza por
 * separado, cada artículo acaba con su propio título, descripción, canonical y
 * JSON-LD escritos en su HTML. Compartir módulo no cuesta SEO.
 */
export const meta = ({ params }) => {
  const articulo = buscarArticulo(params.slug)

  // Solo pasa si alguien inventa una URL: las reales vienen de blog.mjs y están
  // todas prerenderizadas. Se marca noindex para no regalarle a Google una
  // página vacía.
  if (!articulo) {
    return [
      { title: 'Artículo no encontrado | alexweb' },
      { name: 'robots', content: 'noindex' },
    ]
  }

  const ruta = rutaArticulo(articulo.slug)

  return construirMeta({
    titulo: articulo.seo.titulo,
    descripcion: articulo.seo.descripcion,
    ruta,
    articulo: {
      publicado: articulo.publicado,
      actualizado: articulo.actualizado,
    },
    jsonLd: construirJsonLdArticulo({
      ruta,
      titulo: articulo.titulo,
      descripcion: articulo.seo.descripcion,
      publicado: articulo.publicado,
      actualizado: articulo.actualizado,
    }),
  })
}

export default function PaginaArticulo() {
  const { slug } = useParams()
  const articulo = buscarArticulo(slug)

  if (!articulo) {
    return (
      <div className='blog-articulo'>
        <h1>Ese artículo no existe</h1>
        <p>
          Puede que lo haya retirado o que el enlace esté mal escrito. Echa un
          vistazo a <Link to='/blog'>los que hay publicados</Link>.
        </p>
      </div>
    )
  }

  return <Articulo articulo={articulo} />
}
