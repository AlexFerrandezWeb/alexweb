import { describe, test, expect } from 'vitest'

import * as indice from './paginas/blog'
import * as articuloPagina from './paginas/blog-articulo'
import { ARTICULOS, rutaArticulo } from './contenido/blog.mjs'
import { rutasPrerenderizadas, paginasIndexables } from '../rutas-sitio.mjs'

/**
 * El blog crece añadiendo entradas a src/contenido/blog.mjs, sin tocar rutas ni
 * sitemap. Estas pruebas vigilan justo eso: que un artículo nuevo llegue de
 * verdad a Google en lugar de quedarse a medio camino sin que nadie se entere.
 */

const buscar = (etiquetas, predicado) => etiquetas.find(predicado)

describe.each(ARTICULOS.map((a) => [a.slug, a]))('artículo %s', (slug, articulo) => {
  const etiquetas = articuloPagina.meta({ params: { slug } })

  test('declara título y descripción propios', () => {
    const titulo = buscar(etiquetas, (e) => 'title' in e)
    const descripcion = buscar(etiquetas, (e) => e.name === 'description')

    expect(titulo.title.length).toBeGreaterThan(20)
    expect(descripcion.content.length).toBeGreaterThan(50)
    // Google recorta las descripciones largas; avisamos antes de que pase.
    expect(descripcion.content.length).toBeLessThanOrEqual(175)
  })

  test('apunta su canonical a su propia URL', () => {
    const canonical = buscar(etiquetas, (e) => e.rel === 'canonical')
    expect(canonical.href).toBe(`https://alexweb.es${rutaArticulo(slug)}`)
  })

  test('se anuncia como artículo, no como web genérica', () => {
    expect(buscar(etiquetas, (e) => e.property === 'og:type').content).toBe('article')
    expect(
      buscar(etiquetas, (e) => e.property === 'article:published_time').content
    ).toBe(articulo.publicado)
  })

  test('lleva JSON-LD de BlogPosting con fecha y autor', () => {
    const bloque = buscar(etiquetas, (e) => 'script:ld+json' in e)
    const post = bloque['script:ld+json']['@graph'].find(
      (n) => n['@type'] === 'BlogPosting'
    )

    expect(post.datePublished).toBe(articulo.publicado)
    expect(post.headline).toBe(articulo.titulo)
    // El autor se referencia al Person que ya declara root.jsx.
    expect(post.author['@id']).toBe('https://alexweb.es/#alejandro')
  })

  test('el slug es apto para una URL', () => {
    // Sin mayúsculas, acentos ni espacios: cambiar una URL ya publicada cuesta
    // posiciones, así que mejor que nazca bien.
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  test('tiene contenido de verdad en todas sus secciones', () => {
    expect(articulo.secciones.length).toBeGreaterThan(0)

    articulo.secciones.forEach((seccion) => {
      expect(seccion.titulo.length).toBeGreaterThan(0)
      expect(seccion.parrafos.length).toBeGreaterThan(0)
    })
  })
})

describe('vídeos de los artículos', () => {
  const videos = ARTICULOS.flatMap((a) =>
    a.secciones.filter((s) => s.video).map((s) => s.video)
  )

  test('cada vídeo declara un tipo soportado y su título', () => {
    videos.forEach((video) => {
      expect(['youtube', 'instagram']).toContain(video.tipo)
      // El título es lo que lee un lector de pantalla: no es opcional.
      expect(video.titulo?.length).toBeGreaterThan(0)

      if (video.tipo === 'youtube') expect(video.id).toBeTruthy()
      if (video.tipo === 'instagram') expect(video.url).toMatch(/^https:\/\//)
    })
  })
})

describe('índice del blog', () => {
  const etiquetas = indice.meta()

  test('apunta su canonical a /blog', () => {
    const canonical = buscar(etiquetas, (e) => e.rel === 'canonical')
    expect(canonical.href).toBe('https://alexweb.es/blog')
  })

  test('lista en su JSON-LD todos los artículos publicados', () => {
    const bloque = buscar(etiquetas, (e) => 'script:ld+json' in e)
    const blog = bloque['script:ld+json']['@graph'].find((n) => n['@type'] === 'Blog')

    expect(blog.blogPost).toHaveLength(ARTICULOS.length)
  })
})

describe('conjunto del blog', () => {
  test('no hay slugs repetidos', () => {
    const slugs = ARTICULOS.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test('ningún título ni descripción se repite entre artículos', () => {
    const titulos = ARTICULOS.map((a) => a.seo.titulo)
    const descripciones = ARTICULOS.map((a) => a.seo.descripcion)

    expect(new Set(titulos).size).toBe(ARTICULOS.length)
    expect(new Set(descripciones).size).toBe(ARTICULOS.length)
  })
})

describe('el blog llega al build y a Google', () => {
  const prerender = rutasPrerenderizadas()
  const sitemap = paginasIndexables().map((p) => p.ruta)

  test('el índice se prerenderiza y entra en el sitemap', () => {
    expect(prerender).toContain('/blog')
    expect(sitemap).toContain('/blog')
  })

  test.each(ARTICULOS.map((a) => a.slug))(
    'el artículo %s se prerenderiza y entra en el sitemap',
    (slug) => {
      // Si esto falla, el artículo existe pero Google no lo verá nunca.
      expect(prerender).toContain(rutaArticulo(slug))
      expect(sitemap).toContain(rutaArticulo(slug))
    }
  )

  test('el sitemap no ofrece ninguna URL que no se haya construido', () => {
    sitemap.forEach((ruta) => expect(prerender).toContain(ruta))
  })
})
