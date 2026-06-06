# Multi-language UI + Knowledge-Base Expansion — Design

**Date:** 2026-06-06
**Branch:** claude/vet-dosage-calculator-hxo4f

## Goal

Translate the web app's UI into 12 additional languages (14 total), add a
submit-a-clinic email CTA for regions without a TeddyVets presence, and grow the
clinical knowledge base (toxins, plants, drugs, clinics).

## Decisions (locked with user)

- **Translation depth:** UI chrome only. Clinical reference data (drug dose
  notes, toxicity signs, plant symptoms) falls back to English for new
  languages. Rationale: machine-translating clinical instructions across 12
  languages is a medical-safety risk and out of scope.
- **Languages added:** `ar es fr de ru pt it zh hi ja tr pl` (Arabic is RTL).
  Existing: `he` (RTL, default), `en`.
- **Emergency CTA:** keep TeddyVets clinics for `he`; for all other languages
  show a "submit your emergency vet clinic" block with `mailto:admin@hack-tech.org`.
- **KB growth:** ~6 toxin calculators, ~15 plants, ~30 drugs, extra clinics —
  all with verifiable, cited figures. No fabricated doses.

## Key architectural insight

Clinical content is resolved everywhere as `lang === 'he' ? hebrew : english`.
Therefore any new language automatically renders English clinical data with **no
data-layer changes**. The refactor is confined to the UI-string layer.

## Components

### i18n core (`src/i18n/`)
- `Lang` widened to the 14-code union.
- `LANGUAGES`: ordered metadata `{ code, native, english, dir }` for the picker.
- `DIR_BY_LANG`: RTL for `he`, `ar`; LTR otherwise.
- `t()` fallback chain: `dict[lang][key] ?? en[key] ?? key`.
- `readInitialLang()`: validate stored value against the full set; optional
  `navigator.language` seed.
- 12 new dictionary files, each a complete `Record<TKey, string>`.

### Language picker (`Header.tsx`)
- Replace the 2-way toggle with a dropdown of all 14 languages by native name.

### Emergency CTA (`feedback.tsx` + `emergencyContacts.ts`)
- `SUBMIT_CLINIC_EMAIL = 'admin@hack-tech.org'`.
- `EmergencyBanner`: `he` → TeddyVets list (unchanged); else → submit-a-clinic
  block + mailto. New i18n keys: `emergency.submit.*`.

### Knowledge base
- **Toxins:** new modules under `src/toxins/<id>/` (calc.ts + Calculator.tsx +
  test), registered in `registry.ts`. Targets: ethylene glycol, anticoagulant
  rodenticide, cholecalciferol, THC/cannabis, caffeine, zinc.
- **Plants:** append to `TOXIC_PLANTS`; `PlantLibrary` renders a CSS/emoji
  placeholder when a staged `public/plants/<imageKey>.webp` is absent.
- **Drugs:** append curated entries to `DRUG_DATABASE` with `nameHe`, dosing,
  `warnings`/`warningsHe`.
- **Clinics:** append confirmed TeddyVets branches.

## Testing

- Existing vitest suite stays green (calc + toxin + drug-DB tests).
- New toxin modules ship with calc tests.
- `tsc -b` and `vite build` must pass.
- A dictionary-completeness guard: new dicts are typed `Record<TKey, string>` so
  the compiler flags any missing key.

## Out of scope

- Translating clinical reference data.
- Generating new plant photographs (placeholder fallback instead).
- Mobile app (separate repo).
