import type { TKey } from './he';

/** Polish dictionary. UI chrome only; clinical data falls back to English. */
export const pl: Record<TKey, string> = {
  // Brand
  'brand.name': 'Kalkulator Weterynaryjny',
  'brand.tagline': 'Kliniczny kalkulator weterynaryjny · Psy i koty',

  // Header / controls
  'ctl.language': 'Język',
  'ctl.language.select': 'Wybierz język',
  'ctl.theme.toDark': 'Ciemny',
  'ctl.theme.toLight': 'Jasny',
  'ctl.theme.toggle': 'Przełącz motyw kolorów',

  // Hero
  'hero.title': 'Kalkulator Weterynaryjny',
  'hero.subtitle': 'Dawkowanie leków i obliczenia toksyczności — precyzyjnie, szybko, w zasięgu ręki.',
  'hero.cta': 'Zacznij obliczać',
  'hero.scroll': 'Przewiń',

  // Tool switcher
  'tab.dosage': 'Dawka',
  'tab.toxins': 'Toksyny',
  'tab.patient': 'Pacjent',
  'tab.plants': 'Rośliny',
  'tabs.aria': 'Wybierz kalkulator',

  // Patient session
  'patient.title': 'Sesja pacjenta',
  'patient.subtitle': 'Oblicz kilka leków dla jednego pacjenta, a następnie wyeksportuj jeden raport.',
  'patient.new': 'Nowy pacjent',
  'patient.name': 'Imię pacjenta',
  'patient.namePlaceholder': 'np. Rex',
  'patient.start': 'Rozpocznij sesję',
  'patient.active': 'Aktywny pacjent',
  'patient.end': 'Zakończ sesję',
  'patient.meds': 'Leki',
  'patient.medsCount': 'dodanych leków',
  'patient.addMed': 'Dodaj do listy pacjenta',
  'patient.addMedCta': 'Dodaj lek',
  'patient.added': 'Dodano do listy',
  'patient.noMeds': 'Nie dodano jeszcze leków — oblicz dawkę i dodaj.',
  'patient.report': 'Raport leków',
  'patient.shareReport': 'Udostępnij raport',
  'patient.copyReport': 'Kopiuj raport',
  'patient.clearAll': 'Wyczyść wszystko',
  'patient.remove': 'Usuń',
  'patient.draw': 'Pobranie',

  // Plant library
  'plants.title': 'Biblioteka roślin toksycznych',
  'plants.subtitle': 'Rozpoznawaj rośliny niebezpieczne dla psów i kotów, ze zdjęciami.',
  'plants.search': 'Szukaj rośliny…',
  'plants.filter.all': 'Wszystkie',
  'plants.filter.deadly': 'Śmiertelne ☠',
  'plants.filter.severe': 'Ciężkie',
  'plants.filter.cats': 'Tylko koty',
  'plants.level.mild': 'Łagodna',
  'plants.level.moderate': 'Umiarkowana',
  'plants.level.severe': 'Ciężka',
  'plants.level.deadly': 'Śmiertelna',
  'plants.toxin': 'Toksyna',
  'plants.symptoms': 'Objawy',
  'plants.action': 'Co robić',
  'plants.affected': 'Zagrożone',
  'plants.noResults': 'Brak pasujących roślin.',
  'plants.catsOnly': 'Koty',
  'plants.both': 'Psy i koty',

  // Common
  'common.calculate': 'Oblicz',
  'common.reset': 'Resetuj',
  'common.copy': 'Kopiuj',
  'common.copied': 'Skopiowano!',
  'common.share': 'Udostępnij',
  'common.close': 'Zamknij',
  'common.sources': 'Źródła medyczne',
  'common.optional': 'opcjonalne',
  'common.select': 'Wybierz',
  'common.search': 'Szukaj',
  'common.required': 'wymagane',
  'common.back': 'Wstecz',
  'common.details': 'Szczegóły',
  'common.example': 'np.',
  'common.unit': 'Jednostka',

  // Species
  'species.label': 'Gatunek',
  'species.dog': 'Pies',
  'species.cat': 'Kot',

  // Units / fields
  'field.weight': 'Masa ciała',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'ml',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'tabletki',
  'unit.pieces': 'sztuki',
  'unit.perDay': 'na dobę',

  // Dosage calculator
  'dose.title': 'Kalkulator dawki leku',
  'dose.subtitle': 'Objętość do pobrania na podstawie masy, dawki i stężenia.',
  'dose.drug': 'Nazwa leku',
  'dose.drugPlaceholder': 'Wyszukaj lub wpisz nazwę leku…',
  'dose.perKg': 'Dawka na kg',
  'dose.doseUnit': 'Jednostka dawki',
  'dose.concentration': 'Stężenie',
  'dose.concUnit': 'Jedn. stężenia',
  'dose.route': 'Droga podania',
  'dose.rounding': 'Zaokrąglanie',
  'dose.frequency': 'Częstotliwość',
  'dose.freqPlaceholder': 'np. co 8 godz.',
  'dose.duration': 'Czas trwania',
  'dose.durationPlaceholder': 'np. 7 dni',
  'dose.volumeToDraw': 'Objętość do pobrania',
  'dose.totalDose': 'Dawka całkowita',
  'dose.therapeuticRange': 'Zakres referencyjny Plumb\'s',
  'dose.belowRange': 'Poniżej zakresu',
  'dose.inRange': 'W zakresie',
  'dose.aboveRange': 'Powyżej zakresu',
  'dose.plumbsRef': 'Dawka referencyjna Plumb\'s',
  'dose.plumbsRefNone': 'Brak dawki referencyjnej Plumb\'s dla tego gatunku',
  'dose.plumbsRefHint': 'Wyłącznie referencyjnie — zweryfikuj przed podaniem, na własną odpowiedzialność zawodową.',
  'dose.vetOnly':
    'Wyłącznie do licencjonowanego użytku weterynaryjnego. Odpowiedzialność kliniczna spoczywa na leczącym lekarzu weterynarii. Dawki referencyjne Plumb\'s mają charakter orientacyjny i muszą zostać niezależnie zweryfikowane przed podaniem — użycie na własną odpowiedzialność zawodową.',
  'dose.noRange': 'Brak zakresu referencyjnego dla tej kombinacji',
  'dose.breakdown': 'Szczegóły obliczeń',
  'dose.bodyWeight': 'Masa ciała',
  'dose.doseGiven': 'Podana dawka',
  'dose.rawVolume': 'Objętość przed zaokrągleniem',
  'dose.roundedVolume': 'Objętość zaokrąglona',
  'dose.warnings': 'Ostrzeżenia',
  'dose.noWarnings': 'Brak ostrzeżeń',
  'dose.enterToCalc': 'Wprowadź masę, dawkę i stężenie, aby obliczyć.',

  // Routes
  'route.IV': 'Dożylnie (IV)',
  'route.IM': 'Domięśniowo (IM)',
  'route.SC': 'Podskórnie (SC)',
  'route.PO': 'Doustnie (PO)',

  // Toxicity suite
  'tox.title': 'Kalkulatory toksyczności',
  'tox.subtitle': 'Szacowanie ryzyka na podstawie masy i zjedzonej ilości. Narzędzie pomocnicze — nie zastępuje lekarza weterynarii.',
  'tox.choose': 'Wybierz toksynę',
  'tox.amount': 'Zjedzona ilość',
  'tox.source': 'Rodzaj / źródło',
  'tox.riskLevel': 'Poziom ryzyka',
  'tox.dosePerKg': 'Szacowana dawka',
  'tox.expectedSigns': 'Spodziewane objawy kliniczne',
  'tox.action': 'Zalecane działanie',
  'tox.decon': 'Okno dekontaminacji',
  'tox.context': 'Kontekst kliniczny',
  'tox.notForSpecies': 'To obliczenie nie dotyczy tego gatunku.',
  'tox.idiosyncratic': 'Toksyczność idiosynkratyczna — brak bezpiecznego progu',

  // Risk bands
  'risk.minimal': 'Minimalne',
  'risk.mild': 'Łagodne',
  'risk.moderate': 'Umiarkowane',
  'risk.severe': 'Ciężkie',
  'risk.critical': 'Krytyczne',
  'risk.emergency': 'Nagłe',

  // Emergency
  'emergency.title': 'Nagły wypadek?',
  'emergency.text':
    'Jeśli podejrzewasz zatrucie, natychmiast zadzwoń do najbliższej kliniki. Nie czekaj na objawy — i zadzwoń wcześniej, aby potwierdzić godziny i dostępność.',
  'emergency.network': 'Sieć klinik TeddyVets',
  'emergency.allClinics': 'Wszystkie kliniki TeddyVets',
  'emergency.note': 'Kliniki działają w podanych godzinach. Poza tymi godzinami lub w przypadku zagrożenia życia zadzwoń wcześniej, aby sprawdzić dostępność.',
  'emergency.callVet': 'Zadzwoń do swojego weterynarza',
  'emergency.generic.title': 'Nagły wypadek?',
  'emergency.generic.text':
    'Jeśli podejrzewasz zatrucie, natychmiast skontaktuj się z najbliższą kliniką weterynaryjną lub pogotowiem. Nie czekaj na objawy — i zadzwoń wcześniej, aby potwierdzić dostępność.',
  'emergency.submit.title': 'Prowadzisz weterynaryjną klinikę ratunkową?',
  'emergency.submit.text':
    'Rozszerzamy nasz katalog klinik ratunkowych dla Twojego regionu. Aby dodać swoją klinikę, wyślij nam jej nazwę, obszar, telefon i godziny otwarcia.',
  'emergency.submit.cta': 'Napisz do nas',

  // Disclaimer / footer
  'disclaimer.title': 'Zastrzeżenie',
  'disclaimer.text':
    'Ten kalkulator jest narzędziem wspomagającym decyzje kliniczne i nie zastępuje profesjonalnej oceny weterynaryjnej ani ośrodka kontroli zatruć. Przed leczeniem zweryfikuj każde obliczenie z źródłami farmakologicznymi. Toksyny idiosynkratyczne (winogrona, lilie) nigdy nie pokazują „bezpiecznego” wyniku.',
  'footer.text': 'Asystenci dla asystentów · Wszelkie prawa zastrzeżone',
  'footer.madeWith': 'Stworzono z kliniczną starannością',
  'footer.partner': 'Partner kliniczny',
};
