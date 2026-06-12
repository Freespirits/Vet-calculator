/**
 * Fetch missing toxic-plant photos from Wikipedia / Wikimedia Commons.
 *
 * For each entry below it takes the lead image of the named Wikipedia
 * article (almost always a representative, freely-licensed Commons photo),
 * downloads a ~1400px thumbnail, and emits:
 *   - public/plants/<key>.webp            (web, 1200px wide, q80)
 *   - ../Vet-calculator-mobile/assets/plants/<key>.png  (mobile, 880px wide)
 * It also queries Commons for the file's license + author and appends a
 * credits table to docs/PLANT_PHOTO_CREDITS.md so attribution ships with
 * the repo.
 *
 * Usage:  node scripts/fetch-plant-images.mjs [--only key1,key2] [--force]
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const WEB_OUT = path.join(ROOT, 'public', 'plants');
const MOBILE_OUT = path.resolve(ROOT, '..', 'Vet-calculator-mobile', 'assets', 'plants');
const CREDITS = path.join(ROOT, 'docs', 'PLANT_PHOTO_CREDITS.md');

/** imageKey -> English Wikipedia article whose lead image best identifies the plant. */
const TARGETS = {
  castor_bean: 'Ricinus',
  philodendron: 'Philodendron hederaceum',
  zz_plant: 'Zamioculcas',
  jade_plant: 'Crassula ovata',
  hydrangea: 'Hydrangea',
  chrysanthemum: 'Chrysanthemum × morifolium',
  hyacinth: 'Hyacinthus orientalis',
  amaryllis: 'Hippeastrum',
  caladium: 'Caladium bicolor',
  holly: 'Ilex aquifolium',
  mistletoe: 'Mistletoe',
  poinsettia: 'Poinsettia',
  schefflera: 'Schefflera arboricola',
  nightshade: 'Solanum dulcamara',
  rhubarb: 'Rhubarb',
};

/**
 * Exact Commons files for plants whose Wikipedia lead image is botanically
 * right but shows an atypical form (wild type instead of the cultivar people
 * actually keep at home). Recognition is the point of this library.
 */
const FILE_OVERRIDES = {
  hydrangea: 'Hydrangea macrophylla Nikko Blue 3zz.jpg',
  caladium: 'Caladium bicolor - Heart of Jesus.jpg',
  mistletoe: 'Mistletoe with berries.jpg',
};

const UA = 'VetHolimPlantLibrary/1.0 (https://vet-holim.work; toxic-plant photo staging)';

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

/**
 * Lead image of the article + its Commons license, in two calls:
 * REST summary names the file, then one imageinfo query returns a
 * width-clamped thumbnail URL (no 400s on small originals) plus
 * author/license metadata.
 */
async function leadImage(article, width = 1400, fileOverride = null) {
  let fileName = fileOverride;
  if (!fileName) {
    const data = await getJson(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`,
    );
    const thumb = data.thumbnail?.source ?? data.originalimage?.source;
    if (!thumb) throw new Error(`No lead image on article "${article}"`);
    const m = thumb.match(/\/thumb\/[^/]+\/[^/]+\/([^/]+)\//) ?? thumb.match(/\/commons\/[^/]+\/[^/]+\/([^/]+)$/);
    fileName = m ? decodeURIComponent(m[1]) : null;
    if (!fileName) throw new Error(`Could not parse Commons file name from ${thumb}`);
  }

  const info = await getJson(
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
      `&iiprop=extmetadata%7Curl&iiurlwidth=${width}&titles=` +
      encodeURIComponent(`File:${fileName}`),
  );
  const page = Object.values(info.query.pages)[0];
  const ii = page?.imageinfo?.[0];
  if (!ii) throw new Error(`No imageinfo for File:${fileName}`);
  const meta = ii.extmetadata ?? {};
  const strip = (s) => (s ?? '').replace(/<[^>]+>/g, '').trim();
  return {
    url: ii.thumburl ?? ii.url,
    article,
    license: strip(meta.LicenseShortName?.value) || 'unknown',
    author: strip(meta.Artist?.value) || 'unknown',
    page: ii.descriptionurl ?? `https://commons.wikimedia.org/wiki/File:${fileName}`,
  };
}

async function download(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${res.status} downloading ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const onlyArg = args.find((a) => a.startsWith('--only'));
  const only = onlyArg ? args[args.indexOf(onlyArg) + 1]?.split(',') ?? [] : null;

  await mkdir(WEB_OUT, { recursive: true });
  await mkdir(MOBILE_OUT, { recursive: true });

  const rows = [];
  for (const [key, article] of Object.entries(TARGETS)) {
    if (only && !only.includes(key)) continue;
    const webPath = path.join(WEB_OUT, `${key}.webp`);
    if (existsSync(webPath) && !force) {
      console.log(`skip   ${key} (exists)`);
      continue;
    }
    try {
      const img = await leadImage(article, 1400, FILE_OVERRIDES[key]);
      const buf = await download(img.url);
      const base = sharp(buf).rotate(); // honour EXIF orientation
      await base
        .clone()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webPath);
      await base
        .clone()
        .resize({ width: 880, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: false })
        .toFile(path.join(MOBILE_OUT, `${key}.png`));
      rows.push({ key, article, author: img.author, license: img.license, page: img.page });
      console.log(`ok     ${key}  <- ${article}  [${img.license}]`);
    } catch (err) {
      console.error(`FAIL   ${key}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  if (rows.length) {
    let head = '';
    if (!existsSync(CREDITS)) {
      head =
        '# Toxic-plant photo credits\n\n' +
        'Photos staged from Wikimedia Commons (lead images of the linked Wikipedia\n' +
        'articles). Each row records the Commons file page, author and license that\n' +
        'applies to the derivative files in `public/plants/` and the mobile\n' +
        '`assets/plants/`.\n\n' +
        '| key | source article | author | license | file page |\n' +
        '| --- | --- | --- | --- | --- |\n';
    }
    const body = rows
      .map((r) => `| ${r.key} | ${r.article} | ${r.author} | ${r.license} | ${r.page} |`)
      .join('\n');
    const prev = existsSync(CREDITS) ? await readFile(CREDITS, 'utf8') : '';
    await writeFile(CREDITS, prev + head + body + '\n', 'utf8');
    console.log(`\ncredits -> ${CREDITS}`);
  }
}

main();
