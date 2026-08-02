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
  'hero.subtitle':
    'Obliczenia dawek i toksyczności dla psów i kotów: ponad 130 referencyjnych zakresów dawek, 14 udokumentowanych kalkulatorów toksyczności i ilustrowana biblioteka roślin trujących. Za darmo i również offline.',
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
  'plants.photoCredit': 'Źródło zdjęć: Wikimedia Commons',
  'treat.title': 'Lecz teraz — dawki weterynaryjne',
  'treat.emesis': 'Wywołanie wymiotów',
  'treat.charcoal': 'Węgiel aktywowany',
  'treat.monitoring': 'Monitorowanie',
  'treat.status.indicated': 'Wskazane',
  'treat.status.caution': 'Ostrożnie',
  'treat.status.no': 'Niezalecane',
  'treat.disclaimer': 'Dawki dla lekarzy weterynarii — przed podaniem zweryfikuj z cytowanym źródłem.',

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

  // About / FAQ — server-rendered SEO content
  'about.title': 'O tym kalkulatorze weterynaryjnym',
  'about.lead':
    'Vet-Holim to bezpłatne narzędzie wspomagania decyzji klinicznych dla lekarzy weterynarii, pielęgniarek i techników leczących psy i koty. Łączy cztery rzeczy na jednej stronie: kalkulator dawki zwracający objętość do nabrania, zestaw udokumentowanych kalkulatorów toksyczności, ilustrowaną bibliotekę roślin trujących oraz sesję pacjenta z wieloma lekami, którą można wyeksportować jako jeden raport. Wszystko działa w przeglądarce — bez konta, bez wysyłania danych, dane pacjenta nie opuszczają urządzenia.',
  'about.dosage.title': 'Kalkulator dawek leków',
  'about.dosage.body':
    "Podaj gatunek, masę ciała, dawkę na kilogram i stężenie preparatu, a kalkulator zwróci dokładną objętość do nabrania, zaokrągloną do wybranej dokładności strzykawki (0,01, 0,05 lub 0,1 ml). Obejmuje ponad 130 leków z zakresami referencyjnymi z Plumb's Veterinary Drug Handbook, oznacza dawki spoza opublikowanego zakresu i obsługuje mg/kg, mcg/kg, j.m./kg i ml/kg oraz drogi IV, IM, SC i PO.",
  'about.toxins.title': 'Kalkulatory toksyczności',
  'about.toxins.body':
    'Czternaście udokumentowanych narzędzi szacuje ryzyko na podstawie masy ciała i zjedzonej ilości: czekolada i inne metyloksantyny, winogrona i rodzynki, ksylitol, cebula i czosnek, orzechy makadamia, ibuprofen, paracetamol, permetryna, lilie, rodentycydy, glikol etylenowy, konopie, alkohol i kofeina. Każdy wynik podaje poziom ryzyka, spodziewane objawy kliniczne, okno dekontaminacji i zalecane postępowanie. Toksyny idiosynkratyczne nigdy nie dają werdyktu bezpiecznego.',
  'about.plants.title': 'Biblioteka roślin trujących',
  'about.plants.body':
    'Przeszukiwalna, ilustrowana zdjęciami biblioteka roślin domowych i ogrodowych niebezpiecznych dla psów i kotów, z filtrem według ciężkości — od łagodnych po śmiertelne. Każdy wpis podaje substancję toksyczną, części rośliny, spodziewane objawy kliniczne i pilność wizyty u lekarza.',
  'about.patient.title': 'Sesja pacjenta',
  'about.patient.body':
    'Przypadek z kilkoma lekami? Rozpocznij sesję pacjenta, dodawaj każdą obliczoną dawkę do listy, a następnie skopiuj lub udostępnij jeden zbiorczy raport leków z nazwami, dawkami, objętościami do nabrania, drogami i częstotliwością podania — przydatne przy przekazaniu dyżuru, karcie leczenia i zaleceniach dla właściciela.',
  'about.who.title': 'Dla kogo jest to narzędzie',
  'about.who.body':
    'Stworzone dla uprawnionych profesjonalistów weterynaryjnych i studentów. Odpowiedzialność kliniczna zawsze spoczywa na lekarzu prowadzącym: przed podaniem sprawdź każdą wartość we własnych źródłach farmakologicznych. Właściciele podejrzewający zatrucie powinni natychmiast skontaktować się z lecznicą weterynaryjną lub pogotowiem, a nie działać na podstawie obliczenia.',
  'faq.title': 'Najczęstsze pytania',
  'faq.q1': 'Czy kalkulator weterynaryjny jest darmowy?',
  'faq.a1':
    'Tak. Wszystkie kalkulatory, biblioteka roślin i sesja pacjenta są bezpłatne, bez konta i bez rejestracji.',
  'faq.q2': 'Jakie zwierzęta obejmuje?',
  'faq.a2':
    'Psy i koty. Zakresy dawek, progi toksyczności i objawy kliniczne różnią się między gatunkami, dlatego najpierw wybierz gatunek — część obliczeń toksyczności dotyczy tylko jednego z nich i wyraźnie to zaznacza.',
  'faq.q3': 'Skąd pochodzą zakresy dawek?',
  'faq.a3':
    "Referencyjne zakresy dawek pochodzą z Plumb's Veterinary Drug Handbook, a progi toksyczności z opublikowanych źródeł toksykologii weterynaryjnej cytowanych w każdym narzędziu. Mają charakter wyłącznie orientacyjny i przed leczeniem należy je samodzielnie zweryfikować.",
  'faq.q4': 'Czy mogę używać offline?',
  'faq.a4':
    'Tak. Strona jest instalowalną progresywną aplikacją webową: dodaj ją raz do ekranu głównego, a kalkulatory będą działać także bez połączenia z siecią.',
  'faq.q5': 'Czy dane pacjenta są gdzieś przechowywane?',
  'faq.a5':
    'Nie. Wszystkie obliczenia wykonują się lokalnie w przeglądarce i nic nie jest wysyłane na serwer. Sesja pacjenta istnieje wyłącznie w bieżącej karcie.',
  'faq.q6': 'Co zrobić przy podejrzeniu zatrucia?',
  'faq.a6':
    'Natychmiast skontaktuj się ze swoim lekarzem weterynarii lub najbliższą lecznicą całodobową, zanim pojawią się objawy. Kalkulatora toksyczności używaj do oszacowania ekspozycji i wsparcia tej rozmowy — nigdy do rezygnacji z wizyty.',
};
