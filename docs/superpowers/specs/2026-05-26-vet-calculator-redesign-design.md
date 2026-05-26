# וט-חולים — Veterinary Calculator Redesign

**Design Spec** · 2026-05-26 · status: awaiting approval

---

## 1. Overview & Goals

Rebuild the existing veterinary dosage calculator into an **award-winning (awwwards top-tier), mobile-first** bilingual (Hebrew/English) clinical tool that is simultaneously **"wow" to look at and genuinely usable** under clinical pressure.

Two capability pillars:

1. **Drug Dosage Calculator** — a professional upgrade of the existing engine (volume-to-draw, therapeutic-range gauge, per-day totals, warnings).
2. **Toxicity Suite** — reference-grade poison calculators (chocolate/methylxanthine, grapes/raisins, xylitol, onion/garlic, macadamia, lily, acetaminophen, ibuprofen) returning a risk readout, clinical signs, and recommended actions, with citations.

### Success criteria
- Loads fast and holds **60 fps** on a mid-range phone; WebGL never blocks first paint.
- Every clinical number is **traceable to a cited source** (see §9).
- Fully **RTL/LTR** correct in both languages; instant language switch.
- Usable one-handed on a phone; legible; accessible (WCAG AA contrast, reduced-motion support, keyboard/screen-reader friendly).
- "Jaw-drop" hero + cohesive motion language without sacrificing clarity.

### Non-goals (YAGNI)
- No backend, accounts, or persistence beyond `localStorage` (theme/language/last-used).
- No more than 2 languages.
- Not a substitute for poison control — every toxin result carries a triage disclaimer + hotline numbers.

---

## 2. Constraints & Principles

- **Mobile is the primary platform.** Design mobile-first; desktop is the enhancement.
- **Clinical safety first:** idiosyncratic toxins (grapes, lilies) must **never** display a reassuring "safe" result — they branch to exposure/decontamination guidance.
- **Atmosphere serves data:** the aurora dims/blurs behind active panels so numbers always win.
- **Keep the good foundation:** reuse `calculationEngine.ts`, `safetyRules.ts`, `drugDatabase.ts`; refactor `translations.ts` into a real i18n layer.
- **Isolation:** each calculator is a self-contained module (pure calc fn + schema + UI), independently testable.

---

## 3. Technology

| Concern | Choice |
|---|---|
| Framework | React 19 + Vite + TypeScript (existing) |
| Styling | Tailwind CSS (existing) + CSS custom properties for theme tokens |
| WebGL | `three` + `@react-three/fiber` + `@react-three/drei`, **lazy-loaded** (dynamic import) |
| UI motion | `framer-motion` |
| i18n | Custom lightweight `LanguageProvider` (He/En dictionaries + `dir` switching) — no heavy lib |
| State | React hooks + context; `localStorage` for prefs |
| Testing | Vitest (existing) — unit tests for every calc fn |
| Fonts | Hebrew: **Heebo** / **Assistant**; Latin: **Inter** (variable, self-hosted/`@fontsource`) |

New dependencies to add: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `@fontsource-variable/inter`, `@fontsource-variable/heebo` (or Assistant).

---

## 4. Design System — "Aurora Clinic"

### Color tokens
```
--bg-0      #070B14   near-black navy (page)
--bg-1      #0C1320   raised surface
--glass     rgba(18,26,42,0.55) + backdrop-blur   glass cards
--teal      #2DD4BF   primary accent / brand
--emerald   #10B981   success / safe / vital
--violet    #8B5CF6   secondary accent / aurora
--amber     #F59E0B   warning
--rose      #F43F5E   danger / severe
--text-hi   #E8EEF5   primary text
--text-lo   #93A4BD   muted text
--hairline  rgba(255,255,255,0.08)  borders
```
Severity ramp (toxicity gauges & dose ranges): emerald → teal → amber → orange `#FB923C` → rose.

Optional **light "Clinic Day"** theme = inverted neutrals (bone/white surfaces, same accents); dark is the hero/default. Theme + language persisted in `localStorage`.

### Typography
- Display: large, tight tracking, variable-weight (hero title, result numbers).
- Body: 16px base min on mobile; numerics tabular for results.
- Hebrew uses Heebo/Assistant; switches with language. Bidi-safe number/unit rendering.

### Motion language (a key factor)
- Aurora reacts to pointer/touch (lerp-smoothed, never jittery).
- Scroll-reveal staggers (Framer Motion `whileInView`).
- Shared-layout transition when switching Dosage ⇄ Toxins.
- **Count-up** animated result numbers.
- **Animated SVG arc gauges** for dose-range and toxicity risk (fill + needle spring).
- Magnetic primary CTAs; spring micro-interactions on toggles/cards; haptic `navigator.vibrate` on key mobile actions (where supported).
- **All gated by `prefers-reduced-motion`** → static, instant states.

### Layout & components
Glassmorphic cards over the aurora; generous spacing; bottom-anchored primary actions on mobile (thumb reach); sticky compact header (brand + language + theme).

---

## 5. WebGL Hero (`AuroraBackground`)

A fixed, full-viewport canvas behind all content.

- **Aurora layer:** fullscreen plane with custom GLSL fragment shader — flowing domain-warped fBm noise in the Aurora-Clinic palette (teal/emerald/violet over navy). Slow drift + pointer-influenced flow (lerped uniform).
- **Particle layer:** lightweight `Points` field (drei), gentle drift, subtle parallax toward pointer. **Count scales with device:** ~6k desktop / ~1.5k mobile.
- **Performance:** clamp `dpr` to `[1, 1.75]` (lower on mobile), `requestAnimationFrame` 60fps target, pause on tab blur and when scrolled fully past hero (IntersectionObserver).
- **Resize:** full-viewport, aspect-correct (no texture stretch); shader uses normalized UV + resolution uniform.
- **Robustness (per brief):**
  - `webglcontextlost` / `webglcontextrestored` handlers.
  - If WebGL unavailable/lost or `prefers-reduced-motion` → **CSS static-gradient fallback** (animated-free, same palette).
  - Lazy-loaded via `React.lazy` + `Suspense`; fallback gradient shows immediately so first paint never waits on Three.js.

---

## 6. Internationalization & RTL

- `LanguageProvider` exposes `t(key)`, `lang` (`he`|`en`), `setLang`, `dir`.
- Dictionaries: `src/i18n/he.ts`, `src/i18n/en.ts` (typed keys; build fails on missing key).
- `<html dir lang>` updates on switch; Tailwind logical props / `rtl:`+`ltr:` variants for mirroring.
- He is default (RTL); persisted choice overrides.
- Clinical content (drug names, signs, citations) localized where meaningful; Latin drug names kept alongside Hebrew.

---

## 7. Information Architecture (single page, scroll-driven)

1. **Header** (sticky, compact): brand וט-חולים, language toggle He/En, theme toggle.
2. **Hero**: aurora + title + tagline + animated entrance + scroll cue.
3. **Tool switcher**: animated segmented control — **מינון תרופה** (Dosage) ⇄ **רעלים** (Toxins).
4. **Dosage Calculator** (§8.1).
5. **Toxicity Suite** (§8.2): grid of toxin cards → expand into calculator.
6. **Disclaimer** + emergency hotlines.
7. **Footer**.

---

## 8. Feature Specs

### 8.1 Dosage Calculator (pro upgrade of existing engine)

Reuse `calculateDosage()` and `safetyRules`. Inputs: species (dog/cat/other, animated icon toggle), weight (kg), drug (search existing DB or manual), dose/kg + unit, concentration + unit, route, rounding precision, optional frequency/duration.

Outputs:
- **Volume to draw (mL)** — large count-up number.
- **Therapeutic-range gauge** — animated SVG arc showing where entered dose sits in the drug's min–max for that species/route (emerald→amber→rose); reads from `drugDatabase`.
- **Total dose** and **per-day total** (if frequency given).
- **Warnings** — staggered animated badges (info/warning/danger) from `safetyRules`.
- **Calculation breakdown** — collapsible.
- **Copy / share** result.

### 8.2 Toxicity Suite

Shared pattern per calculator:
- Inputs: **species** (where relevant), **body weight (kg)**, **amount** (g/oz or # items), **source/type** selector.
- Pure function computes **dose (mg/kg or g/kg)** of the active principle.
- Output: **animated risk gauge** (banded), **band label**, **expected clinical signs**, **recommended action**, **decontamination window**, **citations**, and an **emergency banner** when severe.
- Idiosyncratic toxins (grapes, lily) **bypass dose math** → exposure/decontamination guidance, never "safe."
- Every result footer: triage disclaimer + **ASPCA APCC 888-426-4435 / Pet Poison Helpline 855-764-7661** + "call your vet."

Each calculator is a module: `src/toxins/<name>/calc.ts` (pure + typed), `schema.ts` (inputs + bands + citations data), `<Name>Calculator.tsx` (UI). All `calc.ts` are unit-tested with worked examples.

#### 8.2.1 🍫 Chocolate / Methylxanthine (dog; cat = more sensitive note)
Built to VIN monograph (Galles & Gwaltney-Brant 2023). Content table (Total Methylxanthine):

| Source | TM mg/oz | TM mg/g |
|---|---|---|
| White chocolate | <1 | ~0.01 |
| Milk chocolate | 64 | 2.26 |
| Semisweet | 150 | 5.29 |
| Dark (X% cacao) | X%×400 | X%×14.1 |
| Baking/unsweetened | 400 | 14.1 |
| Chocolate liquor | ~700 | 20–30 |
| Cocoa powder (unsweetened) | 800 | 25–35 |
| Cocoa nibs | ~620 | 15–30 |
| Cacao beans | 300–1500 | 11–52 |
| Hulls/mulch | 56–900 | — |

`TM_mg = grams × TM_per_g`; `TM_per_kg = TM_mg / weightKg`; `theobromine = TM/1.1`; `caffeine = TM×0.091`. 1 oz = 28.3495 g.
**Dog bands (TM mg/kg):** <20 unlikely signs · 20–40 mild–moderate (vomiting, PU/PD, diarrhea, restlessness) · 40–50 agitation/ataxia/tachycardia/tachypnea/hypertension/hyperthermia · ≥60–80 seizures/severe arrhythmia/coma/death.
**Context shown:** theobromine LD50 dog 250–500 / cat 200; caffeine min-lethal dog 140–150 / cat 100–150; fatal case 64 mg/kg TB + 19.7 caffeine; symptomatic dogs median TB 70.8 (19.5–332). Emesis useful ≤4–6 h; t½ TB 17.5 h / caffeine 4.5 h → signs 12–72 h. **Xylitol-in-chocolate cross-warning.**

#### 8.2.2 🍇 Grapes / Raisins (dog) — IDIOSYNCRATIC
No dose-response → **no "safe" output.** Trigger: **>1 grape or raisin per 4.5 kg** → decontaminate. Show quoted toxic-dose figures as *flags only* (grapes ~20 g/kg, raisins ~3 g/kg; some cite ~3 g/kg grapes) with explicit "no reliable threshold" caveat. AKI within 72 h; dogs only (cats: GI only, no documented AKI). Sources: Merck/ASPCA 2024; Wegenast JAVMA 2021 (tartaric acid); Dijkman JSAP 2022.

#### 8.2.3 🦷 Xylitol (dog) — dose-response
`mg/kg = xylitol_mg / weightKg`. Bands: <100 mg/kg monitor · **>100 mg/kg hypoglycemia** · **>500 mg/kg hepatic failure risk.** Input by known mg or product+qty (gum 0.2–1+ g/piece — flag undisclosed/assume worst case). Note: **activated charcoal does not bind xylitol.** Cats not at risk. Sources: Merck/ASPCA; Murphy & Coleman 2019.

#### 8.2.4 🧅 Onion / Garlic / Allium (dog & cat) — dose-response
`g/kg = grams / weightKg`; garlic apply ×3–5 potency vs onion. Bands (onion): cat ≥~5 g/kg · dog ≥~15–30 g/kg. Heinz-body anemia, **delayed days** (note clinically-normal-early caveat). Cats most sensitive; dehydrated/powder concentrated. Sources: Merck 2024; Salgado; Cortinovis 2016.

#### 8.2.5 🥜 Macadamia (dog) — dose-response
`g/kg = grams / weightKg`. Decon >1–2 g/kg; signs ≥2.4 g/kg (range 2.4–62.4). Generally nonfatal neuromuscular syndrome, onset ≤12 h, resolves 12–48 h. Flag chocolate-coated / pancreatitis risk. Sources: Merck 2024; Hansen 2002.

#### 8.2.6 🌸 Lily (cat) — IDIOSYNCRATIC, classify by plant identity
**No dose math.** Two categories:
- **A — Nephrotoxic (any exposure incl. pollen/vase water = EMERGENCY):** *Lilium* spp (Easter/tiger/Asiatic/Oriental/stargazer/etc.) + *Hemerocallis* (daylily). Start IV fluid diuresis before anuria (<18 h).
- **B — Oxalate "imposters" (oral irritation only, not nephrotoxic):** peace lily, calla lily, Peruvian lily. (Flag lily-of-the-valley separately = cardiac glycoside.)
Feline-specific syndrome. Sources: Merck; Fitzgerald 2010; Bates JAVMA 2025.

#### 8.2.7 💊 Acetaminophen / Paracetamol (dog & cat)
`mg/kg = mg_ingested / weightKg`. **Dog:** hepatotox >100 · methemoglobinemia >200 · severe ~450. **Cat:** floor **~10 mg/kg** (no safe dose) — trigger here; toxicosis band 40–50 (Merck)/50–100 (Veterian Key), show range. Cats→metHb/Heinz (brown mucous membranes, facial/paw edema); dogs→liver (24–48 h). Antidote **NAC** 140 mg/kg load then 70 q6h. Tabs 325/500/650, chew 80/160, liquid 160 mg/5 mL. Sources: Merck; Sellon/Veterian Key; Richardson JVECC 2000; Villar 1998.

#### 8.2.8 💊 Ibuprofen / NSAID (dog & cat)
`mg/kg = mg_ingested / weightKg`. **Dog:** 25–125 GI · >175 renal (Merck 175–300) · >400 CNS · >600 lethal. **Cat ≈ ½ dog** (extrapolated — label as such). Multiple-dose activated charcoal (enterohepatic recirculation). Tabs 200 OTC / 400/600/800 Rx / 100 mg per 5 mL children's. **Naproxen far more toxic** (single ~35 mg/kg signs) — note. Sources: Dunayer Vet Med 2004; Villar 1998; Richardson 2000; Merck.

#### 8.2.9 ☎️ Other / Emergency card
Generic "unknown toxin" guidance + hotline numbers, always visible in the suite.

---

## 9. Clinical Sourcing & Citations

Each toxin module stores its citations as data and renders them in a "מקורות / Sources" disclosure. Canonical sources: VIN Methylxanthine monograph (Galles & Gwaltney-Brant 2023); Merck/MSD Veterinary Manual food-hazard & human-analgesics monographs (Hayes/Brutlag, ASPCA APCC, 2024–25); Wegenast JAVMA 2021; Dijkman JSAP 2022; Murphy & Coleman 2019; Salgado; Cortinovis 2016; Hansen 2002; Fitzgerald 2010; Bates JAVMA 2025; Dunayer Vet Med 2004; Villar 1998; Richardson JVECC 2000. Full numbers archived in memory `vet-calc-clinical-refs.md`.

---

## 10. Proposed File Structure

```
src/
  i18n/            LanguageProvider.tsx, he.ts, en.ts, keys.ts
  webgl/           AuroraBackground.tsx, aurora.frag, aurora.vert, Particles.tsx, useReducedMotion.ts
  components/      Header, ToolSwitcher, Hero, GlassCard, RiskGauge, RangeGauge,
                   CountUp, ResultCard, WarningBadge, EmergencyBanner, SourceList,
                   NumberInput (existing), SpeciesSelector (existing) ...
  features/
    dosage/        DosageCalculator.tsx (+ reuse lib/calculationEngine, lib/safetyRules)
  toxins/
    registry.ts                      (list/metadata for the suite grid)
    chocolate/ calc.ts schema.ts ChocolateCalculator.tsx calc.test.ts
    grapes/    ...
    xylitol/   ...
    allium/    ...
    macadamia/ ...
    lily/      ...
    acetaminophen/ ...
    ibuprofen/ ...
  lib/             calculationEngine.ts, safetyRules.ts (existing)
  data/            drugDatabase.ts (existing)
  hooks/           useTheme.ts (existing), useCalculator.ts (existing)
  types/           index.ts (extend), toxins.ts (new)
```

---

## 11. Accessibility & Performance

- WCAG AA contrast on all text over glass/aurora (validated tokens).
- `prefers-reduced-motion`: disables aurora animation + count-ups + transitions → instant states.
- Keyboard navigable; ARIA on gauges (`role="meter"` + `aria-valuenow/min/max/text`), live regions for results.
- Lazy-load WebGL; code-split toxin modules; `font-display: swap`; clamp DPR; pause RAF off-screen/blurred.
- Lighthouse targets: Performance ≥90 mobile, Accessibility ≥95.

---

## 12. Testing

- Vitest unit tests for **every** `toxins/*/calc.ts` with worked examples (e.g., 100 g 70% dark / 10 kg dog → 98.8 mg/kg TM → severe band).
- Keep/extend existing `calculationEngine.test.ts`, `safetyRules.test.ts`.
- i18n: test that every key exists in both dictionaries.
- Manual: verify the running app on a mobile viewport (per `/run` / `/verify`).

---

## 13. Disclaimer

Both languages, prominent: this tool is **clinical decision support / triage only**, not a substitute for professional veterinary judgment or poison control; always verify and contact a vet / poison line. Idiosyncratic toxins explicitly never present a "safe" reading.
