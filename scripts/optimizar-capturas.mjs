/**
 * Convierte las capturas de los proyectos a WebP con el tamano al que de verdad
 * se ven en pantalla.
 *
 * Los originales (PNG de hasta 2640x1920 y 4 MB) viven en assets-originales/,
 * fuera de public/, para que no se suban a Cloudflare. Lo que se despliega es
 * solo el WebP que genera este script.
 *
 * El slider de la portada pinta las capturas en una caja de ~600x480 CSS px
 * (Inicio.css, .work-slider-viewport .work-image). Generamos al doble para que
 * se vean nitidas en pantallas retina y ni un pixel mas: servir 2640px de ancho
 * para pintar 540 obliga al navegador a decodificar 5 megapixeles por imagen,
 * que era justo lo que ralentizaba la pagina.
 *
 * Uso: node scripts/optimizar-capturas.mjs
 */
import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ORIGENES = 'assets-originales'
const DESTINO = path.join('public', 'assets')

// Caja maxima en pixeles fisicos: el doble de la caja CSS del slider.
const ANCHO_MAX = 1200
const ALTO_MAX = 1000
const CALIDAD = 82

const mb = (bytes) => (bytes / 1048576).toFixed(2)

await mkdir(DESTINO, { recursive: true })

const ficheros = (await readdir(ORIGENES)).filter((f) => f.endsWith('.png'))
let pesoAntes = 0
let pesoDespues = 0

for (const fichero of ficheros) {
  const origen = path.join(ORIGENES, fichero)
  const destino = path.join(DESTINO, fichero.replace(/\.png$/, '.webp'))

  const info = await sharp(origen)
    .resize({ width: ANCHO_MAX, height: ALTO_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: CALIDAD })
    .toFile(destino)

  const antes = (await stat(origen)).size
  pesoAntes += antes
  pesoDespues += info.size

  console.log(
    `${fichero.padEnd(38)} ${mb(antes)} MB -> ${mb(info.size)} MB  (${info.width}x${info.height})`
  )
}

console.log(`\nTotal: ${mb(pesoAntes)} MB -> ${mb(pesoDespues)} MB`)
