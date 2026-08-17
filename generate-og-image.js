const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Imagen de previsualización que se muestra al compartir el enlace en
// WhatsApp, LinkedIn, Facebook o X. 1200x630 es el tamaño estándar.
const ANCHO = 1200;
const ALTO = 630;

const logoBuffer = fs.readFileSync(path.join(__dirname, 'public', 'assets', 'logo-alexweb.png'));

const fondo = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="fondo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c3e50"/>
      <stop offset="100%" stop-color="#1a252f"/>
    </linearGradient>
    <linearGradient id="marca" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
  </defs>

  <rect width="${ANCHO}" height="${ALTO}" fill="url(#fondo)"/>

  <!-- Halos suaves de marca, como en el hero de la web -->
  <circle cx="1010" cy="120" r="260" fill="#764ba2" opacity="0.28"/>
  <circle cx="170" cy="560" r="230" fill="#667eea" opacity="0.22"/>

  <!-- Franja inferior con el degradado de marca -->
  <rect x="0" y="${ALTO - 10}" width="${ANCHO}" height="10" fill="url(#marca)"/>

  <text x="600" y="392" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="40" font-weight="600" fill="#ffffff">
    Páginas web para autónomos y negocios locales
  </text>

  <text x="600" y="452" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="30" font-weight="400" fill="#b9a4e0">
    Murcia · Diseño a medida, sin plantillas
  </text>
</svg>`;

async function main() {
  const logo = await sharp(logoBuffer).resize({ width: 620 }).png().toBuffer();
  const { height: altoLogo } = await sharp(logo).metadata();

  const salida = path.join(__dirname, 'public', 'assets', 'og-image.png');

  await sharp(Buffer.from(fondo))
    .composite([{ input: logo, top: Math.round(250 - altoLogo), left: Math.round((ANCHO - 620) / 2) }])
    .png()
    .toFile(salida);

  console.log('og-image.png generada (1200x630)');
}

main().catch(err => { console.error(err); process.exit(1); });
