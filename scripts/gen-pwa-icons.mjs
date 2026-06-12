/**
 * Generate the PWA / store icon set from public/favicon.svg:
 *   pwa-192.png, pwa-512.png          (transparent rounded corners ok)
 *   maskable-512.png                  (full-bleed bg, icon in the 80% safe zone)
 *   apple-touch-icon.png (180)        (flattened — iOS dislikes transparency)
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const BG = '#070B14';

const svg = await readFile(path.join(PUB, 'favicon.svg'));

const render = (size) => sharp(svg, { density: (72 * size) / 64 }).resize(size, size);

await render(192).png().toFile(path.join(PUB, 'pwa-192.png'));
await render(512).png().toFile(path.join(PUB, 'pwa-512.png'));

// maskable: solid square, icon scaled into the safe zone
const inner = await render(408).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: BG } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(path.join(PUB, 'maskable-512.png'));

// apple-touch: flattened on brand background
const apple = await render(180).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: BG } })
  .composite([{ input: apple }])
  .flatten({ background: BG })
  .png()
  .toFile(path.join(PUB, 'apple-touch-icon.png'));

console.log('icons written to public/');
