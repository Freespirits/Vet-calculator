# וט-חולים · Vet-Holim — Veterinary Calculator

מחשבון וטרינרי קליני: מינון תרופות וחישובי רעילות לכלבים וחתולים.

An award-grade, **mobile-first**, **bilingual (Hebrew RTL / English LTR)** veterinary
calculator: a professional drug-dosage tool plus a cited **toxicity suite**, fronted by a
WebGL aurora hero. "Aurora Clinic" dark theme with an optional light mode.

## Features

### Drug dosage calculator
- Species (dog / cat / other), weight, drug search, dose & concentration units, route, rounding.
- Animated **volume-to-draw** result, **therapeutic-range gauge**, total dose, safety warnings,
  calculation breakdown, copy/share.
- `total_dose = weight_kg × dose_per_kg`, `volume_mL = total_dose / concentration`.

### Toxicity suite (every threshold cited)
Each calculator takes species + body weight + amount and returns an animated **risk gauge**,
expected clinical signs, recommended action, decontamination window, sources, and emergency
hotlines. Idiosyncratic toxins **never** display a "safe" result.

| Calculator | Basis |
|---|---|
| 🍫 Chocolate / methylxanthine | VIN monograph (Galles & Gwaltney-Brant 2023) — total-methylxanthine content table, theobromine/caffeine split, dog/cat bands |
| 🍇 Grapes / raisins | Idiosyncratic AKI (Merck/ASPCA 2024; Wegenast 2021) — exposure/decontamination guidance |
| 🦷 Xylitol | Hypoglycemia >100, hepatic failure >500 mg/kg (Merck; Murphy & Coleman 2019) |
| 🧅 Onion / garlic | Onion-equivalent g/kg with garlic/powder potency (Merck 2024) |
| 🥜 Macadamia | Signs ≥2.4 g/kg (Merck 2024; Hansen 2002) |
| 🌸 Lily (cats) | Plant-identity based; true lilies = emergency (Fitzgerald 2010; Bates 2025) |
| 💊 Acetaminophen | Dog >100/>200; cat no-safe-dose floor ~10 mg/kg (Villar 1998; Richardson 2000) |
| 💊 Ibuprofen | Dog 25/175/400/600; cats ≈ ½ (Dunayer 2004; Villar 1998) |

### Experience
- WebGL **aurora-plasma + particle** hero: pointer-reactive, DPR-clamped, RAF-paused
  off-screen, lazy-loaded, with a CSS gradient fallback for context-loss / reduced-motion.
- Framer Motion throughout (count-ups, animated SVG gauges, shared-layout transitions),
  all gated by `prefers-reduced-motion`.
- Full RTL↔LTR mirroring; instant He/En switch; WCAG-minded contrast, focus rings, 44px targets.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Three.js / @react-three/fiber · Framer Motion ·
self-hosted Inter + Heebo (@fontsource) · Vitest.

## Project structure

```
src/
├── i18n/              LanguageProvider + he/en dictionaries (typed)
├── webgl/             AuroraBackground (lazy R3F hero)
├── components/        icons, primitives, forms, gauges, feedback, layout, ToxinScaffold
├── features/
│   ├── dosage/        DosageCalculator
│   └── toxins/        ToxinSuite (grid + detail)
├── toxins/            registry + <toxin>/{calc.ts, Calculator.tsx, calc.test.ts}
├── lib/               calculationEngine.ts, safetyRules.ts
├── data/              drugDatabase.ts
├── hooks/             useTheme, useCalculator, useReducedMotion
└── types/             index.ts, toxins.ts
```

## Getting started

```bash
npm install
npm run dev        # dev server
npm run test:run   # 69 unit tests
npm run build      # production build (Three.js code-split)
```

## Clinical disclaimer

⚠️ כלי תמיכה בקבלת החלטות קליניות בלבד — אינו מחליף שיקול דעת וטרינרי מקצועי או פנייה למוקד רעלים.

This is a clinical decision-support / triage tool only. It does not replace professional
veterinary judgment or poison control. Verify every calculation before treatment. Poison
lines: ASPCA APCC 888-426-4435 · Pet Poison Helpline 855-764-7661.

## License

אסיסטנטים למען אסיסטנטים · כל הזכויות שמורות
