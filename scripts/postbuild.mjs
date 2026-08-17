import { copyFile, rm, access, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { paginasIndexables } from '../rutas-sitio.mjs'

const SITIO = 'https://alexweb.es'
const CLIENTE = join(process.cwd(), 'build', 'client')

/**
 * Deja el 404 donde Cloudflare Pages lo busca.
 *
 * Pages responde con estado HTTP 404 real cuando encuentra un `404.html` en la
 * raíz del directorio publicado. El prerender lo genera en `404/index.html`,
 * así que aquí solo lo movemos.
 *
 * Esto es lo que mata el soft 404: antes cualquier URL inventada devolvía 200
 * con la web vacía, y Google se lo tragaba como página válida.
 */
const colocar404 = async () => {
  const origen = join(CLIENTE, '404', 'index.html')
  const destino = join(CLIENTE, '404.html')

  try {
    await access(origen)
  } catch {
    console.error(
      `postbuild: no encuentro ${origen}. ¿Sigue RUTA_404 en la lista de prerender?`
    )
    process.exit(1)
  }

  await copyFile(origen, destino)
  // Sin esto, /404 quedaría como una URL indexable más.
  await rm(join(CLIENTE, '404'), { recursive: true, force: true })

  console.log('postbuild: 404.html colocado en la raíz del build')
}

/**
 * Escribe el sitemap a partir de rutas-sitio.mjs.
 *
 * Antes era un fichero estático en public/ que había que acordarse de editar a
 * mano. Generarlo garantiza que lo que se indexa es exactamente lo que se ha
 * construido, sin URLs muertas ni páginas nuevas que se quedan fuera.
 */
const generarSitemap = async () => {
  const paginas = paginasIndexables()

  const urls = paginas
    .map(({ ruta, actualizado, frecuencia, prioridad }) =>
      [
        '  <url>',
        `    <loc>${SITIO}${ruta}</loc>`,
        `    <lastmod>${actualizado}</lastmod>`,
        `    <changefreq>${frecuencia}</changefreq>`,
        `    <priority>${prioridad}</priority>`,
        '  </url>',
      ].join('\n')
    )
    .join('\n\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>
`

  await writeFile(join(CLIENTE, 'sitemap.xml'), xml, 'utf8')
  console.log(`postbuild: sitemap.xml generado con ${paginas.length} URLs`)
}

await colocar404()
await generarSitemap()
