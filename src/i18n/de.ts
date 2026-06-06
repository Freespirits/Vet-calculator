import type { TKey } from './he';

/** German dictionary. UI chrome only; clinical data falls back to English. */
export const de: Record<TKey, string> = {
  // Brand
  'brand.name': 'Veterinär-Rechner',
  'brand.tagline': 'Klinischer Veterinär-Rechner · Hunde & Katzen',

  // Header / controls
  'ctl.language': 'Sprache',
  'ctl.language.select': 'Sprache wählen',
  'ctl.theme.toDark': 'Dunkel',
  'ctl.theme.toLight': 'Hell',
  'ctl.theme.toggle': 'Farbschema umschalten',

  // Hero
  'hero.title': 'Veterinär-Rechner',
  'hero.subtitle': 'Medikamentendosierung & Toxizitätsberechnung – präzise, schnell, in deiner Handfläche.',
  'hero.cta': 'Berechnung starten',
  'hero.scroll': 'Scrollen',

  // Tool switcher
  'tab.dosage': 'Dosierung',
  'tab.toxins': 'Gifte',
  'tab.patient': 'Patient',
  'tab.plants': 'Pflanzen',
  'tabs.aria': 'Rechner wählen',

  // Patient session
  'patient.title': 'Patientensitzung',
  'patient.subtitle': 'Berechne mehrere Medikamente für einen Patienten und exportiere einen Bericht.',
  'patient.new': 'Neuer Patient',
  'patient.name': 'Patientenname',
  'patient.namePlaceholder': 'z. B. Rex',
  'patient.start': 'Sitzung starten',
  'patient.active': 'Aktiver Patient',
  'patient.end': 'Sitzung beenden',
  'patient.meds': 'Medikamente',
  'patient.medsCount': 'Medikamente hinzugefügt',
  'patient.addMed': 'Zur Patientenliste hinzufügen',
  'patient.addMedCta': 'Medikament hinzufügen',
  'patient.added': 'Zur Liste hinzugefügt',
  'patient.noMeds': 'Noch keine Medikamente – berechne eine Dosis und füge sie hinzu.',
  'patient.report': 'Medikamentenbericht',
  'patient.shareReport': 'Bericht teilen',
  'patient.copyReport': 'Bericht kopieren',
  'patient.clearAll': 'Alles löschen',
  'patient.remove': 'Entfernen',
  'patient.draw': 'Aufziehen',

  // Plant library
  'plants.title': 'Bibliothek giftiger Pflanzen',
  'plants.subtitle': 'Erkenne für Hunde und Katzen gefährliche Pflanzen, mit Fotos.',
  'plants.search': 'Pflanze suchen…',
  'plants.filter.all': 'Alle',
  'plants.filter.deadly': 'Tödlich ☠',
  'plants.filter.severe': 'Schwer',
  'plants.filter.cats': 'Nur Katzen',
  'plants.level.mild': 'Leicht',
  'plants.level.moderate': 'Mittel',
  'plants.level.severe': 'Schwer',
  'plants.level.deadly': 'Tödlich',
  'plants.toxin': 'Giftstoff',
  'plants.symptoms': 'Symptome',
  'plants.action': 'Was zu tun ist',
  'plants.affected': 'Gefährdet',
  'plants.noResults': 'Keine passenden Pflanzen.',
  'plants.catsOnly': 'Katzen',
  'plants.both': 'Hunde & Katzen',

  // Common
  'common.calculate': 'Berechnen',
  'common.reset': 'Zurücksetzen',
  'common.copy': 'Kopieren',
  'common.copied': 'Kopiert!',
  'common.share': 'Teilen',
  'common.close': 'Schließen',
  'common.sources': 'Medizinische Quellen',
  'common.optional': 'optional',
  'common.select': 'Auswählen',
  'common.search': 'Suchen',
  'common.required': 'erforderlich',
  'common.back': 'Zurück',
  'common.details': 'Details',
  'common.example': 'z. B.',
  'common.unit': 'Einheit',

  // Species
  'species.label': 'Tierart',
  'species.dog': 'Hund',
  'species.cat': 'Katze',

  // Units / fields
  'field.weight': 'Körpergewicht',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'ml',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'Tabletten',
  'unit.pieces': 'Stück',
  'unit.perDay': 'pro Tag',

  // Dosage calculator
  'dose.title': 'Medikamenten-Dosisrechner',
  'dose.subtitle': 'Aufzuziehendes Volumen aus Gewicht, Dosis und Konzentration.',
  'dose.drug': 'Medikamentenname',
  'dose.drugPlaceholder': 'Medikament suchen oder eingeben…',
  'dose.perKg': 'Dosis pro kg',
  'dose.doseUnit': 'Dosiseinheit',
  'dose.concentration': 'Konzentration',
  'dose.concUnit': 'Konz.-Einheit',
  'dose.route': 'Verabreichungsweg',
  'dose.rounding': 'Rundung',
  'dose.frequency': 'Häufigkeit',
  'dose.freqPlaceholder': 'z. B. alle 8 h',
  'dose.duration': 'Dauer',
  'dose.durationPlaceholder': 'z. B. 7 Tage',
  'dose.volumeToDraw': 'Aufzuziehendes Volumen',
  'dose.totalDose': 'Gesamtdosis',
  'dose.therapeuticRange': 'Plumb\'s-Referenzbereich',
  'dose.belowRange': 'Unter dem Bereich',
  'dose.inRange': 'Im Bereich',
  'dose.aboveRange': 'Über dem Bereich',
  'dose.plumbsRef': 'Plumb\'s-Referenzdosis',
  'dose.plumbsRefNone': 'Keine Plumb\'s-Referenzdosis für diese Tierart',
  'dose.plumbsRefHint': 'Nur zur Referenz – vor der Dosierung in eigener fachlicher Verantwortung prüfen.',
  'dose.vetOnly':
    'Nur für den zugelassenen veterinärmedizinischen Gebrauch. Die klinische Verantwortung liegt beim behandelnden Tierarzt. Plumb\'s-Referenzdosen dienen als Orientierung und müssen vor der Verabreichung unabhängig überprüft werden – Nutzung in eigener fachlicher Verantwortung.',
  'dose.noRange': 'Kein Referenzbereich für diese Kombination',
  'dose.breakdown': 'Berechnungsdetails',
  'dose.bodyWeight': 'Körpergewicht',
  'dose.doseGiven': 'Verabreichte Dosis',
  'dose.rawVolume': 'Volumen vor Rundung',
  'dose.roundedVolume': 'Gerundetes Volumen',
  'dose.warnings': 'Warnungen',
  'dose.noWarnings': 'Keine Warnungen',
  'dose.enterToCalc': 'Gewicht, Dosis und Konzentration eingeben, um zu berechnen.',

  // Routes
  'route.IV': 'Intravenös (IV)',
  'route.IM': 'Intramuskulär (IM)',
  'route.SC': 'Subkutan (SC)',
  'route.PO': 'Oral (PO)',

  // Toxicity suite
  'tox.title': 'Toxizitätsrechner',
  'tox.subtitle': 'Risikoabschätzung aus Gewicht und aufgenommener Menge. Ein Hilfsmittel – kein Ersatz für den Tierarzt.',
  'tox.choose': 'Giftstoff wählen',
  'tox.amount': 'Aufgenommene Menge',
  'tox.source': 'Art / Quelle',
  'tox.riskLevel': 'Risikostufe',
  'tox.dosePerKg': 'Geschätzte Dosis',
  'tox.expectedSigns': 'Erwartete klinische Anzeichen',
  'tox.action': 'Empfohlene Maßnahme',
  'tox.decon': 'Dekontaminationsfenster',
  'tox.context': 'Klinischer Kontext',
  'tox.notForSpecies': 'Diese Berechnung gilt nicht für diese Tierart.',
  'tox.idiosyncratic': 'Idiosynkratische Toxizität – kein sicherer Schwellenwert',

  // Risk bands
  'risk.minimal': 'Minimal',
  'risk.mild': 'Leicht',
  'risk.moderate': 'Mäßig',
  'risk.severe': 'Schwer',
  'risk.critical': 'Kritisch',
  'risk.emergency': 'Notfall',

  // Emergency
  'emergency.title': 'Ein Notfall?',
  'emergency.text':
    'Bei Verdacht auf Vergiftung sofort die nächste Klinik anrufen. Warte nicht auf Anzeichen – und rufe vorab an, um Öffnungszeiten und Verfügbarkeit zu bestätigen.',
  'emergency.network': 'TeddyVets-Kliniknetz',
  'emergency.allClinics': 'Alle TeddyVets-Kliniken',
  'emergency.note': 'Die Kliniken sind zu den angegebenen Zeiten geöffnet. Außerhalb dieser Zeiten oder bei lebensbedrohlichen Fällen vorab anrufen, um die Verfügbarkeit zu prüfen.',
  'emergency.callVet': 'Rufe deinen Tierarzt an',
  'emergency.generic.title': 'Ein Notfall?',
  'emergency.generic.text':
    'Bei Verdacht auf Vergiftung sofort die nächste Tierklinik oder den Notdienst kontaktieren. Warte nicht auf Anzeichen – und rufe vorab an, um die Verfügbarkeit zu bestätigen.',
  'emergency.submit.title': 'Betreibst du eine tierärztliche Notfallklinik?',
  'emergency.submit.text':
    'Wir erweitern unser Verzeichnis von Notfallkliniken für deine Region. Damit deine Klinik aufgenommen wird, sende uns Name, Gebiet, Telefon und Öffnungszeiten.',
  'emergency.submit.cta': 'Schreib uns',

  // Disclaimer / footer
  'disclaimer.title': 'Haftungsausschluss',
  'disclaimer.text':
    'Dieser Rechner ist ein Hilfsmittel zur klinischen Entscheidungsfindung und ersetzt weder das fachliche tierärztliche Urteil noch eine Giftnotrufzentrale. Prüfe jede Berechnung vor der Behandlung anhand pharmakologischer Referenzen. Idiosynkratische Gifte (Trauben, Lilien) zeigen niemals ein „sicheres“ Ergebnis.',
  'footer.text': 'Assistenten für Assistenten · Alle Rechte vorbehalten',
  'footer.madeWith': 'Mit klinischer Sorgfalt erstellt',
  'footer.partner': 'Klinischer Partner',
};
