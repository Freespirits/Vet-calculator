import type { TKey } from './he';

/**
 * English dictionary. Typed as Record<TKey, string> so the compiler
 * flags any key present in Hebrew but missing here.
 */
export const en: Record<TKey, string> = {
  // Brand
  'brand.name': 'Veterinary Calculator',
  'brand.tagline': 'Clinical Veterinary Calculator · Dogs & Cats',

  // Header / controls
  'ctl.language': 'עברית',
  'ctl.theme.toDark': 'Dark',
  'ctl.theme.toLight': 'Light',
  'ctl.theme.toggle': 'Toggle color theme',

  // Hero
  'hero.title': 'Veterinary Calculator',
  'hero.subtitle': 'Drug dosing & toxicity math — precise, fast, in the palm of your hand.',
  'hero.cta': 'Start calculating',
  'hero.scroll': 'Scroll',

  // Tool switcher
  'tab.dosage': 'Dosage',
  'tab.toxins': 'Toxins',
  'tab.patient': 'Patient',
  'tab.plants': 'Plants',
  'tabs.aria': 'Choose calculator',

  // Patient session (multi-medication)
  'patient.title': 'Patient Session',
  'patient.subtitle': 'Calculate several medications for one patient, then export a single report.',
  'patient.new': 'New patient',
  'patient.name': 'Patient name',
  'patient.namePlaceholder': 'e.g. Rex',
  'patient.start': 'Start session',
  'patient.active': 'Active patient',
  'patient.end': 'End session',
  'patient.meds': 'Medications',
  'patient.medsCount': 'medications added',
  'patient.addMed': "Add to patient's list",
  'patient.added': 'Added to list',
  'patient.noMeds': 'No medications added yet — calculate a dose and add it.',
  'patient.report': 'Medication report',
  'patient.shareReport': 'Share report',
  'patient.copyReport': 'Copy report',
  'patient.clearAll': 'Clear all',
  'patient.remove': 'Remove',
  'patient.draw': 'Draw',

  // Plant library
  'plants.title': 'Toxic Plant Library',
  'plants.subtitle': 'Identify plants dangerous to dogs and cats, with photos.',
  'plants.search': 'Search a plant…',
  'plants.filter.all': 'All',
  'plants.filter.deadly': 'Deadly ☠',
  'plants.filter.severe': 'Severe',
  'plants.filter.cats': 'Cats only',
  'plants.level.mild': 'Mild',
  'plants.level.moderate': 'Moderate',
  'plants.level.severe': 'Severe',
  'plants.level.deadly': 'Deadly',
  'plants.toxin': 'Toxin',
  'plants.symptoms': 'Symptoms',
  'plants.action': 'What to do',
  'plants.affected': 'At risk',
  'plants.noResults': 'No matching plants.',
  'plants.catsOnly': 'Cats',
  'plants.both': 'Dogs & cats',

  // Common
  'common.calculate': 'Calculate',
  'common.reset': 'Reset',
  'common.copy': 'Copy',
  'common.copied': 'Copied!',
  'common.share': 'Share',
  'common.close': 'Close',
  'common.sources': 'Medical Sources',
  'common.optional': 'optional',
  'common.select': 'Select',
  'common.search': 'Search',
  'common.required': 'required',
  'common.back': 'Back',
  'common.details': 'Details',
  'common.example': 'e.g.',
  'common.unit': 'Unit',

  // Species
  'species.label': 'Species',
  'species.dog': 'Dog',
  'species.cat': 'Cat',

  // Units / fields
  'field.weight': 'Body weight',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'mL',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'tablets',
  'unit.pieces': 'pieces',
  'unit.perDay': 'per day',

  // Dosage calculator
  'dose.title': 'Drug Dosage Calculator',
  'dose.subtitle': 'Volume to draw, from weight, dose and concentration.',
  'dose.drug': 'Drug name',
  'dose.drugPlaceholder': 'Search or type a drug name…',
  'dose.perKg': 'Dose per kg',
  'dose.doseUnit': 'Dose unit',
  'dose.concentration': 'Concentration',
  'dose.concUnit': 'Conc. unit',
  'dose.route': 'Route',
  'dose.rounding': 'Rounding',
  'dose.frequency': 'Frequency',
  'dose.freqPlaceholder': 'e.g. every 8 h',
  'dose.duration': 'Duration',
  'dose.durationPlaceholder': 'e.g. 7 days',
  'dose.volumeToDraw': 'Volume to draw',
  'dose.totalDose': 'Total dose',
  'dose.therapeuticRange': 'Plumb\'s reference range',
  'dose.belowRange': 'Below range',
  'dose.inRange': 'In range',
  'dose.aboveRange': 'Above range',
  'dose.plumbsRef': "Plumb's reference dose",
  'dose.plumbsRefNone': "No Plumb's dog/cat reference dose for this species",
  'dose.plumbsRefHint': 'Reference only — verify before dosing, at your own professional responsibility.',
  'dose.vetOnly':
    'For licensed veterinary use only. Clinical responsibility rests with the treating veterinarian. Plumb\'s reference doses are a guide and must be independently verified before administration — use at your own professional risk.',
  'dose.noRange': 'No reference range for this combination',
  'dose.breakdown': 'Calculation breakdown',
  'dose.bodyWeight': 'Body weight',
  'dose.doseGiven': 'Dose given',
  'dose.rawVolume': 'Raw volume',
  'dose.roundedVolume': 'Rounded volume',
  'dose.warnings': 'Warnings',
  'dose.noWarnings': 'No warnings',
  'dose.enterToCalc': 'Enter weight, dose and concentration to calculate.',

  // Routes
  'route.IV': 'Intravenous (IV)',
  'route.IM': 'Intramuscular (IM)',
  'route.SC': 'Subcutaneous (SC)',
  'route.PO': 'Oral (PO)',

  // Toxicity suite
  'tox.title': 'Toxicity Calculators',
  'tox.subtitle': 'Risk estimate from weight and amount eaten. A support tool — not a substitute for a vet.',
  'tox.choose': 'Choose a toxin',
  'tox.amount': 'Amount eaten',
  'tox.source': 'Type / source',
  'tox.riskLevel': 'Risk level',
  'tox.dosePerKg': 'Estimated dose',
  'tox.expectedSigns': 'Expected clinical signs',
  'tox.action': 'Recommended action',
  'tox.decon': 'Decontamination window',
  'tox.context': 'Clinical context',
  'tox.notForSpecies': 'This calculation does not apply to this species.',
  'tox.idiosyncratic': 'Idiosyncratic toxicity — no safe threshold',

  // Risk bands
  'risk.minimal': 'Minimal',
  'risk.mild': 'Mild',
  'risk.moderate': 'Moderate',
  'risk.severe': 'Severe',
  'risk.critical': 'Critical',
  'risk.emergency': 'Emergency',

  // Emergency
  'emergency.title': 'An emergency?',
  'emergency.text':
    "If you suspect poisoning, call your nearest TeddyVets clinic right away. Don't wait for signs — and call ahead to confirm hours and availability.",
  'emergency.network': 'TeddyVets clinic network',
  'emergency.allClinics': 'All TeddyVets clinics',
  'emergency.note': 'TeddyVets clinics operate within the hours shown. Outside those hours, or for a life-threatening case, call ahead to check availability. Israel has no dedicated pet poison-control hotline (the national poison center, Rambam 04-7771900, is for humans only).',
  'emergency.callVet': 'Call your veterinarian',

  // Disclaimer / footer
  'disclaimer.title': 'Disclaimer',
  'disclaimer.text':
    'This calculator is a clinical decision-support tool and does not replace professional veterinary judgment or poison control. Verify every calculation against drug references before treatment. Idiosyncratic toxins (grapes, lilies) never display a "safe" result.',
  'footer.text': 'Assistants for Assistants · All rights reserved',
  'footer.madeWith': 'Built with clinical care',
  'footer.partner': 'Clinical partner',
};
