// Regenerate public/sitemap.xml from the supported language list: one URL per
// language page, each carrying the full bidirectional hreflang mesh.
// Run manually after adding a language: node scripts/gen-sitemap.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://vet-holim.work";
// Keep in sync with SUPPORTED_LANGS in src/i18n/languages.ts (he first = root).
const LANGS = ["he", "en", "ar", "es", "fr", "de", "ru", "pt", "it", "zh", "hi", "ja", "tr", "pl"];
const urlFor = (l) => (l === "he" ? `${ORIGIN}/` : `${ORIGIN}/${l}/`);
const lastmod = new Date().toISOString().slice(0, 10);

const links = LANGS.map(
  (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`,
).join("\n") + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`;

const urls = LANGS.map(
  (l) => `  <url>\n    <loc>${urlFor(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
fs.writeFileSync(out, xml, "utf8");
console.log(`sitemap.xml: ${LANGS.length} URLs, lastmod ${lastmod}`);
