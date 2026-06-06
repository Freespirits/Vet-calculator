import type { TKey } from './he';

/** Italian dictionary. UI chrome only; clinical data falls back to English. */
export const it: Record<TKey, string> = {
  // Brand
  'brand.name': 'Calcolatrice Veterinaria',
  'brand.tagline': 'Calcolatrice veterinaria clinica · Cani e gatti',

  // Header / controls
  'ctl.language': 'Lingua',
  'ctl.language.select': 'Seleziona la lingua',
  'ctl.theme.toDark': 'Scuro',
  'ctl.theme.toLight': 'Chiaro',
  'ctl.theme.toggle': 'Cambia tema colore',

  // Hero
  'hero.title': 'Calcolatrice Veterinaria',
  'hero.subtitle': 'Dosaggi dei farmaci e calcoli di tossicità — precisi, rapidi, nel palmo della mano.',
  'hero.cta': 'Inizia a calcolare',
  'hero.scroll': 'Scorri',

  // Tool switcher
  'tab.dosage': 'Dosaggio',
  'tab.toxins': 'Tossici',
  'tab.patient': 'Paziente',
  'tab.plants': 'Piante',
  'tabs.aria': 'Scegli la calcolatrice',

  // Patient session
  'patient.title': 'Sessione paziente',
  'patient.subtitle': 'Calcola più farmaci per un paziente, poi esporta un unico referto.',
  'patient.new': 'Nuovo paziente',
  'patient.name': 'Nome del paziente',
  'patient.namePlaceholder': 'es. Rex',
  'patient.start': 'Avvia sessione',
  'patient.active': 'Paziente attivo',
  'patient.end': 'Termina sessione',
  'patient.meds': 'Farmaci',
  'patient.medsCount': 'farmaci aggiunti',
  'patient.addMed': 'Aggiungi alla lista del paziente',
  'patient.addMedCta': 'Aggiungi un farmaco',
  'patient.added': 'Aggiunto alla lista',
  'patient.noMeds': 'Nessun farmaco aggiunto — calcola una dose e aggiungila.',
  'patient.report': 'Referto farmaci',
  'patient.shareReport': 'Condividi referto',
  'patient.copyReport': 'Copia referto',
  'patient.clearAll': 'Cancella tutto',
  'patient.remove': 'Rimuovi',
  'patient.draw': 'Prelevare',

  // Plant library
  'plants.title': 'Libreria di piante tossiche',
  'plants.subtitle': 'Identifica le piante pericolose per cani e gatti, con foto.',
  'plants.search': 'Cerca una pianta…',
  'plants.filter.all': 'Tutte',
  'plants.filter.deadly': 'Mortale ☠',
  'plants.filter.severe': 'Grave',
  'plants.filter.cats': 'Solo gatti',
  'plants.level.mild': 'Lieve',
  'plants.level.moderate': 'Moderato',
  'plants.level.severe': 'Grave',
  'plants.level.deadly': 'Mortale',
  'plants.toxin': 'Tossina',
  'plants.symptoms': 'Sintomi',
  'plants.action': 'Cosa fare',
  'plants.affected': 'A rischio',
  'plants.noResults': 'Nessuna pianta corrispondente.',
  'plants.catsOnly': 'Gatti',
  'plants.both': 'Cani e gatti',

  // Common
  'common.calculate': 'Calcola',
  'common.reset': 'Reimposta',
  'common.copy': 'Copia',
  'common.copied': 'Copiato!',
  'common.share': 'Condividi',
  'common.close': 'Chiudi',
  'common.sources': 'Fonti mediche',
  'common.optional': 'facoltativo',
  'common.select': 'Seleziona',
  'common.search': 'Cerca',
  'common.required': 'obbligatorio',
  'common.back': 'Indietro',
  'common.details': 'Dettagli',
  'common.example': 'es.',
  'common.unit': 'Unità',

  // Species
  'species.label': 'Specie',
  'species.dog': 'Cane',
  'species.cat': 'Gatto',

  // Units / fields
  'field.weight': 'Peso corporeo',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'ml',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'compresse',
  'unit.pieces': 'pezzi',
  'unit.perDay': 'al giorno',

  // Dosage calculator
  'dose.title': 'Calcolatrice del dosaggio',
  'dose.subtitle': 'Volume da prelevare in base a peso, dose e concentrazione.',
  'dose.drug': 'Nome del farmaco',
  'dose.drugPlaceholder': 'Cerca o digita un farmaco…',
  'dose.perKg': 'Dose per kg',
  'dose.doseUnit': 'Unità di dose',
  'dose.concentration': 'Concentrazione',
  'dose.concUnit': 'Unità di conc.',
  'dose.route': 'Via',
  'dose.rounding': 'Arrotondamento',
  'dose.frequency': 'Frequenza',
  'dose.freqPlaceholder': 'es. ogni 8 h',
  'dose.duration': 'Durata',
  'dose.durationPlaceholder': 'es. 7 giorni',
  'dose.volumeToDraw': 'Volume da prelevare',
  'dose.totalDose': 'Dose totale',
  'dose.therapeuticRange': 'Intervallo di riferimento Plumb\'s',
  'dose.belowRange': 'Sotto l\'intervallo',
  'dose.inRange': 'Nell\'intervallo',
  'dose.aboveRange': 'Sopra l\'intervallo',
  'dose.plumbsRef': 'Dose di riferimento Plumb\'s',
  'dose.plumbsRefNone': 'Nessuna dose di riferimento Plumb\'s per questa specie',
  'dose.plumbsRefHint': 'Solo a titolo di riferimento — verifica prima di dosare, sotto la tua responsabilità professionale.',
  'dose.vetOnly':
    'Solo per uso veterinario autorizzato. La responsabilità clinica spetta al veterinario curante. Le dosi di riferimento Plumb\'s sono una guida e devono essere verificate in modo indipendente prima della somministrazione — uso sotto la tua responsabilità professionale.',
  'dose.noRange': 'Nessun intervallo di riferimento per questa combinazione',
  'dose.breakdown': 'Dettaglio del calcolo',
  'dose.bodyWeight': 'Peso corporeo',
  'dose.doseGiven': 'Dose somministrata',
  'dose.rawVolume': 'Volume prima dell\'arrotondamento',
  'dose.roundedVolume': 'Volume arrotondato',
  'dose.warnings': 'Avvertenze',
  'dose.noWarnings': 'Nessuna avvertenza',
  'dose.enterToCalc': 'Inserisci peso, dose e concentrazione per calcolare.',

  // Routes
  'route.IV': 'Endovenosa (IV)',
  'route.IM': 'Intramuscolare (IM)',
  'route.SC': 'Sottocutanea (SC)',
  'route.PO': 'Orale (PO)',

  // Toxicity suite
  'tox.title': 'Calcolatrici di tossicità',
  'tox.subtitle': 'Stima del rischio in base a peso e quantità ingerita. Uno strumento di supporto — non sostituisce il veterinario.',
  'tox.choose': 'Scegli un tossico',
  'tox.amount': 'Quantità ingerita',
  'tox.source': 'Tipo / fonte',
  'tox.riskLevel': 'Livello di rischio',
  'tox.dosePerKg': 'Dose stimata',
  'tox.expectedSigns': 'Segni clinici attesi',
  'tox.action': 'Azione consigliata',
  'tox.decon': 'Finestra di decontaminazione',
  'tox.context': 'Contesto clinico',
  'tox.notForSpecies': 'Questo calcolo non si applica a questa specie.',
  'tox.idiosyncratic': 'Tossicità idiosincratica — nessuna soglia sicura',

  // Risk bands
  'risk.minimal': 'Minimo',
  'risk.mild': 'Lieve',
  'risk.moderate': 'Moderato',
  'risk.severe': 'Grave',
  'risk.critical': 'Critico',
  'risk.emergency': 'Emergenza',

  // Emergency
  'emergency.title': 'Un\'emergenza?',
  'emergency.text':
    'Se sospetti un avvelenamento, chiama subito la clinica più vicina. Non aspettare la comparsa dei segni — e chiama in anticipo per confermare orari e disponibilità.',
  'emergency.network': 'Rete di cliniche TeddyVets',
  'emergency.allClinics': 'Tutte le cliniche TeddyVets',
  'emergency.note': 'Le cliniche operano negli orari indicati. Al di fuori di tali orari, o in caso di pericolo di vita, chiama in anticipo per verificare la disponibilità.',
  'emergency.callVet': 'Chiama il tuo veterinario',
  'emergency.generic.title': 'Un\'emergenza?',
  'emergency.generic.text':
    'Se sospetti un avvelenamento, contatta subito la clinica veterinaria o il servizio di emergenza più vicino. Non aspettare la comparsa dei segni — e chiama in anticipo per confermare la disponibilità.',
  'emergency.submit.title': 'Gestisci una clinica veterinaria d\'emergenza?',
  'emergency.submit.text':
    'Stiamo ampliando la nostra directory di cliniche d\'emergenza per la tua regione. Per essere inserito, inviaci nome, zona, telefono e orari della tua clinica.',
  'emergency.submit.cta': 'Scrivici',

  // Disclaimer / footer
  'disclaimer.title': 'Avvertenza',
  'disclaimer.text':
    'Questa calcolatrice è uno strumento di supporto alle decisioni cliniche e non sostituisce il giudizio veterinario professionale né un centro antiveleni. Verifica ogni calcolo con riferimenti farmacologici prima del trattamento. I tossici idiosincratici (uva, gigli) non mostrano mai un risultato "sicuro".',
  'footer.text': 'Assistenti per assistenti · Tutti i diritti riservati',
  'footer.madeWith': 'Realizzato con cura clinica',
  'footer.partner': 'Partner clinico',
};
