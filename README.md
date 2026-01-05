# וט-חולים | Veterinary Drug Dosage Calculator

מחשבון מינון תרופות וטרינרי - חישוב מדויק של נפח מזרק

A Hebrew veterinary drug dosage calculator webapp that calculates the exact volume (mL) to withdraw from a vial based on weight, dosage, and drug concentration.

## Features

### Core Functionality
- **Species Support**: Dog, Cat, Other
- **Weight Input**: Decimal support in kg
- **Drug Database**: Searchable drug list with Hebrew and English names
- **Dose Units**: mg/kg, mcg/kg, IU/kg, mL/kg
- **Concentration Units**: mg/mL, mcg/mL, IU/mL
- **Routes**: IV, IM, SC, PO
- **Configurable Rounding**: 0.01, 0.05, 0.1 mL precision

### Calculation Logic
```
total_dose = weight_kg × dose_per_kg
volume_mL = total_dose / concentration
```

### Safety Guardrails
- Maximum dose alerts
- High-risk medication flagging
- Volume warnings (too small/large)
- Species weight validation
- Route-specific volume limits
- Medical disclaimer

### UI/UX
- Mobile-first responsive design
- RTL Hebrew support
- Dark mode toggle
- One-screen calculation flow
- Large numeric outputs
- Copy/share results

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with RTL support
- **Testing**: Vitest
- **Font**: Heebo (Hebrew)

## Project Structure

```
src/
├── components/          # React UI components
│   ├── CalculatorForm   # Main input form
│   ├── ResultDisplay    # Volume output display
│   ├── DrugSearch       # Searchable drug input
│   ├── SpeciesSelector  # Animal species selection
│   ├── RouteSelector    # Administration route
│   └── ...
├── lib/
│   ├── calculationEngine.ts  # Pure calculation functions
│   └── safetyRules.ts        # Validation & warnings
├── data/
│   └── drugDatabase.ts       # Sample drug database
├── hooks/
│   ├── useCalculator.ts      # Calculator state management
│   └── useTheme.ts           # Dark mode management
├── types/
│   └── index.ts              # TypeScript definitions
└── utils/
    └── translations.ts       # Hebrew UI text
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Sample Drugs Included

The app includes a sample database of 15 common veterinary drugs:
- Meloxicam, Metoclopramide, Maropitant (Cerenia)
- Cefazolin, Enrofloxacin (Baytril)
- Morphine, Buprenorphine (high-risk)
- Ketamine, Dexmedetomidine (high-risk)
- Atropine, Furosemide, Famotidine
- Ondansetron, Diphenhydramine
- Regular Insulin (high-risk)

## Testing

54 unit tests covering:
- Unit normalization
- Dose calculations
- Volume calculations
- Rounding behavior
- Edge cases
- Validation rules
- Safety warnings

```bash
npm run test:run
```

## Clinical Disclaimer

⚠️ מחשבון זה הוא כלי תמיכה קלינית ואינו מחליף שיקול דעת וטרינרי מקצועי. יש לאמת את החישובים ולעיין בהפניות תרופתיות לפני מתן התרופה.

This calculator is a clinical decision support tool and does not replace professional veterinary judgment. Always verify calculations and consult drug references before administration.

## License

MIT
