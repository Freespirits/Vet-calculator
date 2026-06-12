# Vet-Holim · Roadmap

A forward plan that builds on what the site already does well — cited clinical
calculators, a 14-language bilingual-first UI, and the Aurora-Clinic WebGL
identity — rather than bolting on unrelated features. Phases are ordered by
(impact ÷ effort) and each item names the existing content it extends.

## Phase 0 — shipped with this roadmap

- **WebGL2 hero v2** — shaders ported to GLSL ES 3.00 (true WebGL2), shooting
  stars over the aurora, soft round twinkling particle sprites (no more square
  points), a tap/click luminous ripple, a WebGL2 capability gate, and a real
  `prefers-reduced-motion` gate that skips the Three.js download entirely.
- **Share loop on every toxin result** — all 14 toxicity calculators now end
  with a Share/Copy action (native share sheet on mobile) that carries the
  result + site link. Reuses the existing `common.share`/`common.copied` keys,
  so it is already translated in all 14 languages.
- **Social cards + SEO** — Open Graph / Twitter meta, canonical URL, JSON-LD
  `WebApplication` structured data, and a branded 1200×630 OG image
  (`public/og.png`, source `public/og.svg`) so shared links unfurl beautifully.

## Phase 0.5 — shipped (WebGL2 v3 + content + platform)

- **WebGL2 hero v3** — raw-three.js engine (react-three-fiber dropped from the
  bundle): GPGPU curl-noise particle flow field (positions live in ping-pong
  RGBA16F targets, advected on-GPU along the aurora field, pointer vortex +
  tap shockwave), selective bloom (bright-pass → separable blur → filmic
  composite), a "Clinic Day" light-theme aurora variant, and an adaptive
  quality ladder (lux → flow → classic) that degrades on weak GPUs and
  missing float-buffer support.
- **Toxic-plant photo set complete (35/35)** — 15 missing species staged from
  Wikimedia Commons (botanically verified, recognizable cultivars), licenses
  recorded in `docs/PLANT_PHOTO_CREDITS.md`, credit link in the plant detail
  view. `scripts/fetch-plant-images.mjs` re-stages everything.
- **"What is it" explainers on every toxin** — `ToxinMeta.about` (he/en) shown
  inside each calculator; grid blurbs no longer truncate to nothing.
- **Per-tool deep links** — `#/dosage`, `#/patient`, `#/tox/<id>`,
  `#/plants/<id>` (Phase 1 item 5, done early to multiply the share loop).
- **PWA / offline** — installable, full clinical core precached (Phase 2
  item 2, done early: poison emergencies happen where signal doesn't).
- **Risk-gauge shimmer** — critical/emergency results glow and breathe
  (Phase 3 item 4); reduced-motion safe.

## Phase 1 — content depth (extends the cited clinical core)

1. **Permethrin toxicity (cats)** — the highest-value missing calculator:
   common, species-specific, life-threatening; fits the existing
   `toxins/<id>/{calc.ts, Calculator.tsx, calc.test.ts}` pattern exactly.
2. **More household toxins** — metaldehyde (slug bait), raw bread dough /
   ethanol, salt / play-dough, hops, naproxen (the ibuprofen module's sibling).
   Same cited-threshold discipline as the current 14.
3. **Plant library 20 → 50+** — add severity filter chips and a search box to
   `PlantLibrary`; the data shape and photo-fallback already support it.
4. **CRI & fluid-rate calculators** — natural siblings of the dosage tool:
   constant-rate infusion (mL/h from mg/kg/h), maintenance + dehydration
   fluid plan, and a per-weight emergency (CPR) drug sheet driven by the
   existing `drugDatabase`.
5. **Per-tool deep links** — hash- or path-based routes (`/#/tox/chocolate`)
   so every calculator is individually linkable/shareable and indexable;
   prerender per-route titles/descriptions for SEO. This multiplies the value
   of the new share button.

## Phase 2 — viral & retention loops

1. **Result-card image export** — render a branded card (canvas, Aurora-Clinic
   style, RTL-aware) from any toxin/dosage result for WhatsApp / Instagram
   sharing; far more clickable than plain text.
2. **PWA / offline** — installable app with cached drug DB and toxin
   calculators: poison emergencies happen where signal doesn't. Also unlocks
   the "add to home screen" retention loop and aligns with the VetCalc mobile
   apps mentioned in the privacy policy.
3. **Clinic QR poster** — a print-ready A4 page (per-language) with a QR code
   for waiting rooms; leverages the existing submit-a-clinic CTA pipeline.
4. **Embeddable widget** — a one-line `<iframe>` snippet so vet-clinic sites
   can embed the chocolate calculator; every embed links back.
5. **Share analytics** — Vercel Analytics custom events on share/copy so the
   loops above can be measured and tuned.

## Phase 3 — WebGL2 maximization (identity, not gimmick)

1. **Aurora accent theming** — drive the shader palette from the active toxin's
   `meta.accent` when a calculator is open (already plumbed per-toxin), and a
   light-theme aurora variant.
2. **GPGPU particle flow field** — move particles to a texture-based
   position/velocity sim (WebGL2 float FBOs) so they drift along the aurora's
   curl noise and swirl around the pointer; thousands of particles, zero CPU.
3. **Selective bloom** — a cheap two-pass blur on a half-res target so aurora
   ribbons and shooting stars glow; gated by DPR/device class.
4. **Risk-gauge shimmer** — a small shared shader for the result gauges
   (severe results pulse, subtle) reusing the hero's palette; respects
   `prefers-reduced-motion` like everything else.

## Phase 4 — platform

- Patient-session sync across devices (account-optional, e.g. Supabase).
- Public clinic directory grown from submit-a-clinic submissions.
- Versioned clinical-content review log (who verified which threshold, when).

## Non-goals

- No diagnosis features, no AI dosing advice — this stays a *cited* clinical
  decision-support tool.
- No dark-pattern growth mechanics; virality comes from genuinely shareable,
  life-saving results.
