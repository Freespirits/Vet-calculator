# וט־חולים · Vet-Holim

Clinical veterinary calculators for medication dosing and common toxic exposures in dogs and cats.

[Open the live application](https://vet-holim.work) · Hebrew-first, mobile-first, and available in 14 languages.

> [!WARNING]
> Vet-Holim is a clinical decision-support and triage aid. It does not replace veterinary judgment, a current formulary, or consultation with an animal poison-control service. Verify every calculation before treatment.

## What it includes

- A medication dosage calculator with weight and concentration conversion, dose-range guidance, route selection, rounding, warnings, and a transparent calculation breakdown.
- Fourteen toxin calculators: chocolate, caffeine, grapes/raisins, xylitol, allium, macadamia, lilies, THC, acetaminophen, ibuprofen, ethylene glycol, anticoagulant rodenticide, bromethalin, and cholecalciferol.
- A searchable toxic-plant library with credited plant photography.
- A reusable patient session shared across calculators.
- Cited toxin thresholds, clinical signs, suggested actions, treatment guidance, and emergency contacts.
- Fourteen localized interfaces, including full RTL layouts for Hebrew and Arabic. Clinical reference text currently falls back to English outside Hebrew.
- Accessibility controls, reduced-motion support, responsive layouts, dark/light themes, and installable PWA assets.
- Pre-rendered, language-specific pages with canonical URLs, `hreflang`, sitemap, and social metadata.

## Supported languages

Hebrew, English, Arabic, Spanish, French, German, Russian, Portuguese, Italian, Chinese, Hindi, Japanese, Turkish, and Polish.

## Technology

React 19, TypeScript, Vite, Vite React SSG, Tailwind CSS, Three.js, Framer Motion, Vitest, Testing Library, and Vercel Analytics.

## Local development

Prerequisites: a current Node.js LTS release and npm.

```bash
git clone https://github.com/Freespirits/Vet-calculator.git
cd Vet-calculator
npm ci
npm run dev
```

The development server prints its local URL after startup.

## Quality checks

```bash
npm run lint
npm run test:run
npm run build
```

The production build performs TypeScript project compilation and static-site generation. Generated output is written to `dist/` and is intentionally not committed.

## Project map

```text
src/
├── a11y/          accessibility provider, widget, statement, and tests
├── components/    shared UI, SEO, result, and treatment components
├── data/          drug, toxin-treatment, plant, and emergency-contact data
├── features/      dosage, patient-session, plant, and toxin experiences
├── i18n/          typed translations and language metadata
├── lib/           calculation engine and safety rules
├── toxins/        toxin-specific calculators and pure calculation modules
├── webgl/         progressively enhanced hero background
└── App.tsx        application shell and section routing
```

Supporting documentation lives in [`docs/`](docs/), including the [plant photo credits](docs/PLANT_PHOTO_CREDITS.md) and [roadmap](docs/ROADMAP.md).

## Calculation model

The core dosage relationship is:

```text
total dose = patient weight × prescribed dose per unit weight
volume to draw = total dose ÷ medication concentration
```

Calculations and safety rules are kept in pure TypeScript modules and covered by unit tests. Toxicology calculators cite their clinical sources in the result view; idiosyncratic exposures do not present a misleading “safe” result.

## Data and privacy

Patient details are held in the browser for the active session. The repository excludes local source PDFs, extracted formulary material, build artifacts, dependency directories, and Vercel environment state.

## Contributing

Keep clinical logic separate from presentation, add focused tests for calculation or threshold changes, and run all quality checks before opening a pull request. Clinical-data changes should include a traceable veterinary source.

## License

All rights reserved.

## Clinical scope and workflow

The interface is designed as a professional point-of-care calculation aid for veterinarians and veterinary support teams:

- Drug search accepts generic and recognized brand names from the included database. Selecting a drug can populate species-specific dose ranges, routes, and reference notes; users can still enter an independent dose and concentration.
- Dose inputs support `mg/kg`, `mcg/kg`, `IU/kg`, and `mL/kg`; concentration inputs support matching mass or activity units per mL. Results show the unrounded and rounded draw volume, total dose, route/frequency context, warnings, and the calculation steps.
- The patient workspace stores name/identifier, species, weight, and notes for reuse across tools during the browser session.
- Toxicology results combine exposure-per-weight calculations with a risk meter, expected signs, immediate action, decontamination timing, monitoring, emergency contacts, and a source-bearing “Treat now” panel. Product identity and concentration remain clinically important; the calculator does not establish a diagnosis.
- The plant library covers 35 common toxic plants with searchable names, dog/cat relevance, affected systems, signs, severity context, and image credits.
- Results can be copied or shared where the browser supports it, and toxin routes support deep links for returning to a selected calculator.
- The app is installable and caches its clinical core for offline use after a successful first load. Offline information can become stale and must still be checked against current references.

## Public clinical references

The application displays source notes with its clinical results. The following public pages and indexed publications were verified while preparing this documentation; books and subscription sources named in the interface are not reproduced in this repository.

- [Chocolate toxicosis in animals — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/food-hazards/chocolate-toxicosis-in-animals)
- [Food hazards, including grapes/raisins, xylitol, and macadamia nuts — Merck Veterinary Manual](https://www.merckvetmanual.com/special-pet-topics/poisoning/food-hazards)
- [Garlic and onion toxicosis — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/food-hazards/garlic-and-onion-allium-spp-toxicosis-in-animals)
- [Houseplants and ornamentals toxic to animals — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/poisonous-plants/houseplants-and-ornamentals-toxic-to-animals)
- [Toxicoses from human analgesics — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/toxicoses-from-human-analgesics/toxicoses-from-human-analgesics-in-animals)
- [Ethylene glycol toxicosis — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/ethylene-glycol-toxicosis/ethylene-glycol-toxicosis-in-animals)
- [Overview of rodenticide poisoning — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/rodenticide-poisoning/overview-of-rodenticide-poisoning-in-animals)
- [Bromethalin poisoning — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/rodenticide-poisoning/bromethalin-poisoning-in-animals)
- [THC toxicosis in dogs and cats — Merck Veterinary Manual](https://www.merckvetmanual.com/toxicology/toxicoses-from-human-recreational-drugs/toxicosis-in-dogs-and-cats-from-tetrahydrocannabinol-thc)
- [Murphy & Dunayer, “Xylitol Toxicosis in Dogs: An Update” — PubMed, PMID 30064708](https://pubmed.ncbi.nlm.nih.gov/30064708/)
- [Wegenast et al., tartaric acid as the proposed toxic principle in grapes and raisins — PubMed, PMID 35869755](https://pubmed.ncbi.nlm.nih.gov/35869755/)

These references support the subject matter and selected thresholds; their inclusion does not mean the authors, publishers, or institutions reviewed or endorsed Vet-Holim. The software has not been represented as a regulated medical device or independently clinically validated.

## Search and crawler visibility

The production build emits server-rendered HTML for all 14 canonical language URLs, reciprocal `hreflang` links, XML sitemap entries, structured application data, crawler directives, and crawlable language navigation. [`public/llms.txt`](public/llms.txt) provides a concise machine-readable project and reference guide. Search-engine and AI-system inclusion remains controlled by those services; publishing these files does not guarantee indexing. After deployment, the owner should submit or resubmit the sitemap in Google Search Console and request inspection of the canonical root and English URLs.

## License

All rights reserved.
