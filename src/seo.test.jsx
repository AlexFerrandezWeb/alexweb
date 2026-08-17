import { describe, test, expect } from 'vitest'

import * as pymes from './paginas/diseno-web-para-pymes'
import * as precioWeb from './paginas/cuanto-cuesta-una-pagina-web'
import * as tienda from './paginas/precio-tienda-online'
import * as economico from './paginas/diseno-web-economico'
import * as nutricionistas from './paginas/diseno-web-para-nutricionistas'
import * as noEncontrada from './paginas/no-encontrada'

/**
 * Estas pruebas vigilan el SEO donde ahora vive de verdad: en el `meta` de cada
 * ruta, que es lo que el build escribe en el HTML servido.
 *
 * La versión anterior comprobaba el DOM tras ejecutar el hook useSeo. Eso
 * validaba lo que veía el navegador, no lo que recibe Google, que era
 * justamente el problema que hemos arreglado.
 */

const landings = [
  ['pymes', pymes, '/diseno-web-para-pymes'],
  ['precio web', precioWeb, '/cuanto-cuesta-una-pagina-web'],
  ['tienda online', tienda, '/precio-tienda-online'],
  ['economico', economico, '/diseno-web-economico'],
  ['nutricionistas', nutricionistas, '/diseno-web-para-nutricionistas'],
]

const buscar = (etiquetas, predicado) => etiquetas.find(predicado)

describe.each(landings)('meta de la landing %s', (nombre, modulo, ruta) => {
  const etiquetas = modulo.meta()

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
    expect(canonical.href).toBe(`https://alexweb.es${ruta}`)
  })

  test('lleva Open Graph completo para WhatsApp y LinkedIn', () => {
    for (const propiedad of ['og:title', 'og:description', 'og:url', 'og:image']) {
      expect(buscar(etiquetas, (e) => e.property === propiedad)?.content).toBeTruthy()
    }
  })

  test('incluye JSON-LD con WebPage y FAQPage', () => {
    const bloque = buscar(etiquetas, (e) => 'script:ld+json' in e)
    const tipos = bloque['script:ld+json']['@graph'].map((n) => n['@type'])

    expect(tipos).toContain('WebPage')
    expect(tipos).toContain('FAQPage')

    const faq = bloque['script:ld+json']['@graph'].find((n) => n['@type'] === 'FAQPage')
    expect(faq.mainEntity.length).toBeGreaterThan(0)
    faq.mainEntity.forEach((pregunta) => {
      expect(typeof pregunta.acceptedAnswer.text).toBe('string')
      expect(pregunta.acceptedAnswer.text.length).toBeGreaterThan(0)
    })
  })

  test('no arrastra señal local: el posicionamiento es nacional', () => {
    expect(JSON.stringify(etiquetas)).not.toMatch(/Murcia/i)
  })
})

describe('conjunto de landings', () => {
  test('ningún título ni descripción se repite entre landings', () => {
    const titulos = landings.map(([, m]) => m.meta().find((e) => 'title' in e).title)
    const descripciones = landings.map(
      ([, m]) => m.meta().find((e) => e.name === 'description').content
    )

    expect(new Set(titulos).size).toBe(landings.length)
    expect(new Set(descripciones).size).toBe(landings.length)
  })
})

describe('página 404', () => {
  test('va marcada como noindex para que Google no la indexe', () => {
    const robots = noEncontrada.meta().find((e) => e.name === 'robots')
    expect(robots.content).toMatch(/noindex/)
  })
})
