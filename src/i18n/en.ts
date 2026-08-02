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
  'ctl.language': 'Language',
  'ctl.language.select': 'Select language',
  'ctl.theme.toDark': 'Dark',
  'ctl.theme.toLight': 'Light',
  'ctl.theme.toggle': 'Toggle color theme',

  // Hero
  'hero.title': 'Veterinary Calculator',
  'hero.subtitle':
    'Drug dosing and toxicity math for dogs and cats — 130+ reference dose ranges, 14 cited toxicity calculators and a photo library of toxic plants, free and offline-capable.',
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
  'patient.addMedCta': 'Add a medication',
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
  'plants.photoCredit': 'Photo credits: Wikimedia Commons',
  'treat.title': 'Treat now — veterinary doses',
  'treat.emesis': 'Induce emesis',
  'treat.charcoal': 'Activated charcoal',
  'treat.monitoring': 'Monitoring',
  'treat.status.indicated': 'Indicated',
  'treat.status.caution': 'Caution',
  'treat.status.no': 'Not recommended',
  'treat.disclaimer': 'Doses are for veterinary professionals — verify against the cited source before administering.',

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
  'emergency.generic.title': 'An emergency?',
  'emergency.generic.text':
    'If you suspect poisoning, contact your nearest veterinary clinic or emergency service right away. Don\'t wait for signs — and call ahead to confirm availability.',
  'emergency.submit.title': 'Run an emergency vet clinic?',
  'emergency.submit.text':
    'We\'re expanding our emergency-clinic directory for your region. To have your clinic listed, email us its name, area, phone and opening hours.',
  'emergency.submit.cta': 'Email us',

  // Disclaimer / footer
  'disclaimer.title': 'Disclaimer',
  'disclaimer.text':
    'This calculator is a clinical decision-support tool and does not replace professional veterinary judgment or poison control. Verify every calculation against drug references before treatment. Idiosyncratic toxins (grapes, lilies) never display a "safe" result.',
  'footer.text': 'Assistants for Assistants · All rights reserved',
  'footer.madeWith': 'Built with clinical care',
  'footer.partner': 'Clinical partner',

  // About / FAQ — server-rendered SEO content
  'about.title': 'About this veterinary calculator',
  'about.lead':
    'Vet-Holim is a free clinical decision-support tool for veterinarians, veterinary nurses and technicians treating dogs and cats. It brings four things onto one page: an injection-volume dosage calculator, a suite of cited toxicity calculators, a photo library of toxic plants, and a multi-medication patient session you can export as a single report. Everything runs in your browser — no account, no upload, no patient data leaving the device.',
  'about.dosage.title': 'Drug dosage calculator',
  'about.dosage.body':
    "Enter species, body weight, dose per kilogram and vial concentration, and the calculator returns the exact volume to draw, rounded to your chosen syringe precision (0.01, 0.05 or 0.1 mL). It covers more than 130 drugs with reference ranges from Plumb's Veterinary Drug Handbook, flags doses that fall outside the published range, and supports mg/kg, mcg/kg, IU/kg and mL/kg alongside the IV, IM, SC and PO routes.",
  'about.toxins.title': 'Toxicity calculators',
  'about.toxins.body':
    'Fourteen cited toxicity tools estimate risk from body weight and the amount ingested: chocolate and other methylxanthines, grapes and raisins, xylitol, onion and garlic, macadamia nuts, ibuprofen, paracetamol, permethrin, lilies, rodenticides, ethylene glycol, cannabis, alcohol and caffeine. Each result gives a risk band, the expected clinical signs, the decontamination window and a recommended action. Idiosyncratic toxins never return a safe verdict.',
  'about.plants.title': 'Toxic plant library',
  'about.plants.body':
    'A searchable, photo-illustrated library of house and garden plants that are dangerous to dogs and cats, filterable by severity from mild to deadly. Each entry lists the toxic principle, the parts of the plant involved, the clinical signs to expect and how urgently the animal needs to be seen.',
  'about.patient.title': 'Patient session',
  'about.patient.body':
    'Working a case with several medications? Start a patient session, add each calculated dose to the list, then copy or share one consolidated medication report with drug names, doses, volumes to draw, routes and frequencies — useful for handover, treatment sheets and owner instructions.',
  'about.who.title': 'Who it is for',
  'about.who.body':
    'Built for licensed veterinary professionals and students. Clinical responsibility always rests with the treating veterinarian: verify every number against your own drug references before administration. Owners who suspect a poisoning should contact a veterinary clinic or emergency service immediately rather than acting on a calculation.',
  'faq.title': 'Frequently asked questions',
  'faq.q1': 'Is the veterinary calculator free?',
  'faq.a1':
    'Yes. Every calculator, the plant library and the patient session are free to use, with no account and no registration.',
  'faq.q2': 'Which animals does it cover?',
  'faq.a2':
    'Dogs and cats. Dose ranges, toxicity thresholds and clinical signs differ between the two species, so choose the species first — some toxicity calculations apply to only one of them and will say so.',
  'faq.q3': 'Where do the dose ranges come from?',
  'faq.a3':
    "Reference dose ranges come from Plumb's Veterinary Drug Handbook, and toxicity thresholds are drawn from published veterinary toxicology sources cited inside each tool. They are guidance only and must be verified independently before treatment.",
  'faq.q4': 'Can I use it offline?',
  'faq.a4':
    'Yes. The site is an installable progressive web app: add it to your home screen once and the calculators keep working without a network connection.',
  'faq.q5': 'Is my patient data stored anywhere?',
  'faq.a5':
    'No. All calculations run locally in your browser and nothing is uploaded to a server. Patient sessions live only in the current tab.',
  'faq.q6': 'What should I do in a suspected poisoning?',
  'faq.a6':
    'Contact your veterinarian or nearest emergency clinic immediately, before signs appear. Use the toxicity calculator to estimate the exposure and inform that conversation — never to decide against seeking care.',
};
