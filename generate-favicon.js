const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function main() {
  // Generate PNGs at sizes needed for ICO (16, 32, 48) and apple-touch-icon (180)
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(svgBuffer).resize(size, size).png().toBuffer()
    )
  );

  // Create ICO from PNGs
  const ico = await toIco(pngBuffers);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), ico);
  console.log(`favicon.ico generated: ${ico.length} bytes`);

  // Generate apple-touch-icon (180x180 is Apple's recommended size)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png generated (180x180)');

  // Generate a 192x192 PNG for manifest / PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo192.png'));
  console.log('logo192.png generated (192x192)');
}

main().catch(err => { console.error(err); process.exit(1); });
