/**
 * Hebrew dictionary — the source of truth for translation keys.
 * The English dictionary is type-checked against this object's keys,
 * so a missing key is a compile error.
 *
 * Toxin-specific clinical copy (signs, actions, citations) lives in each
 * toxin's schema.ts with he/en fields — this dictionary is UI chrome +
 * shared labels only.
 */
export const he = {
  // Brand
  'brand.name': 'מחשבון וטרינרי',
  'brand.tagline': 'מחשבון וטרינרי קליני · כלבים וחתולים',

  // Header / controls
  'ctl.language': 'שפה',
  'ctl.language.select': 'בחירת שפה',
  'ctl.theme.toDark': 'מצב כהה',
  'ctl.theme.toLight': 'מצב בהיר',
  'ctl.theme.toggle': 'החלף ערכת צבעים',

  // Hero
  'hero.title': 'מחשבון וטרינרי',
  'hero.subtitle': 'מינון תרופות וחישובי רעילות — מדויק, מהיר, בכף היד.',
  'hero.cta': 'התחל חישוב',
  'hero.scroll': 'גלול',

  // Tool switcher
  'tab.dosage': 'מינון',
  'tab.toxins': 'רעלים',
  'tab.patient': 'מטופל',
  'tab.plants': 'צמחים',
  'tabs.aria': 'בחירת כלי חישוב',

  // Patient session (multi-medication)
  'patient.title': 'מצב מטופל',
  'patient.subtitle': 'חשב מספר תרופות למטופל אחד, וייצא דוח מרוכז.',
  'patient.new': 'מטופל חדש',
  'patient.name': 'שם המטופל',
  'patient.namePlaceholder': 'לדוג׳: רקס',
  'patient.start': 'פתח מעקב',
  'patient.active': 'מטופל פעיל',
  'patient.end': 'סיים מעקב',
  'patient.meds': 'תרופות',
  'patient.medsCount': 'תרופות שנוספו',
  'patient.addMed': 'הוסף לרשימת המטופל',
  'patient.addMedCta': 'הוסף תרופה',
  'patient.added': 'נוסף לרשימה',
  'patient.noMeds': 'עדיין לא נוספו תרופות — חשב מינון והוסף.',
  'patient.report': 'דוח תרופות',
  'patient.shareReport': 'שתף דוח',
  'patient.copyReport': 'העתק דוח',
  'patient.clearAll': 'נקה הכל',
  'patient.remove': 'הסר',
  'patient.draw': 'לשאוב',

  // Plant library
  'plants.title': 'ספריית צמחים רעילים',
  'plants.subtitle': 'זיהוי צמחים מסוכנים לכלבים וחתולים, עם תמונות.',
  'plants.search': 'חיפוש צמח…',
  'plants.filter.all': 'הכל',
  'plants.filter.deadly': 'קטלני ☠',
  'plants.filter.severe': 'חמור',
  'plants.filter.cats': 'חתולים בלבד',
  'plants.level.mild': 'קל',
  'plants.level.moderate': 'בינוני',
  'plants.level.severe': 'חמור',
  'plants.level.deadly': 'קטלני',
  'plants.toxin': 'הרעלן',
  'plants.symptoms': 'תסמינים',
  'plants.action': 'מה לעשות',
  'plants.affected': 'בסיכון',
  'plants.noResults': 'לא נמצאו צמחים תואמים.',
  'plants.catsOnly': 'חתולים',
  'plants.both': 'כלבים וחתולים',
  'plants.photoCredit': 'קרדיט תמונות: ויקישיתוף (Wikimedia Commons)',

  // Common
  'common.calculate': 'חשב',
  'common.reset': 'אפס',
  'common.copy': 'העתק',
  'common.copied': 'הועתק!',
  'common.share': 'שתף',
  'common.close': 'סגור',
  'common.sources': 'מקורות רפואיים',
  'common.optional': 'אופציונלי',
  'common.select': 'בחר',
  'common.search': 'חיפוש',
  'common.required': 'שדה חובה',
  'common.back': 'חזרה',
  'common.details': 'פירוט',
  'common.example': 'לדוגמה',
  'common.unit': 'יחידה',

  // Species
  'species.label': 'סוג בעל החיים',
  'species.dog': 'כלב',
  'species.cat': 'חתול',

  // Units / fields
  'field.weight': 'משקל גוף',
  'unit.kg': 'ק"ג',
  'unit.g': 'גרם',
  'unit.oz': 'אונקיה',
  'unit.mg': 'מ"ג',
  'unit.ml': 'מ"ל',
  'unit.mgkg': 'מ"ג/ק"ג',
  'unit.gkg': 'גרם/ק"ג',
  'unit.tablets': 'טבליות',
  'unit.pieces': 'יחידות',
  'unit.perDay': 'ליום',

  // Dosage calculator
  'dose.title': 'מחשבון מינון תרופה',
  'dose.subtitle': 'חישוב הנפח לשאיבה לפי משקל, מינון וריכוז.',
  'dose.drug': 'שם התרופה',
  'dose.drugPlaceholder': 'חפש או הקלד שם תרופה…',
  'dose.perKg': 'מינון לק"ג',
  'dose.doseUnit': 'יחידת מינון',
  'dose.concentration': 'ריכוז התרופה',
  'dose.concUnit': 'יחידת ריכוז',
  'dose.route': 'דרך מתן',
  'dose.rounding': 'דיוק עיגול',
  'dose.frequency': 'תדירות',
  'dose.freqPlaceholder': 'לדוג׳: כל 8 שעות',
  'dose.duration': 'משך טיפול',
  'dose.durationPlaceholder': 'לדוג׳: 7 ימים',
  'dose.volumeToDraw': 'נפח לשאיבה',
  'dose.totalDose': 'מינון כולל',
  'dose.therapeuticRange': 'טווח ייחוס לפי Plumb\'s',
  'dose.belowRange': 'מתחת לטווח',
  'dose.inRange': 'בטווח',
  'dose.aboveRange': 'מעל הטווח',
  'dose.plumbsRef': 'מינון ייחוס לפי Plumb\'s',
  'dose.plumbsRefNone': 'אין מינון ייחוס של Plumb\'s למין זה',
  'dose.plumbsRefHint': 'לייחוס בלבד — יש לאמת לפני מתן, באחריותך המקצועית.',
  'dose.vetOnly':
    'מיועד לשימוש וטרינרי מורשה בלבד. האחריות הקלינית חלה על הרופא/ה הווטרינר/ית המטפל/ת. מינוני הייחוס של Plumb\'s הם להכוונה בלבד ויש לאמתם באופן עצמאי לפני מתן הטיפול — השימוש על אחריותך המקצועית.',
  'dose.noRange': 'אין טווח ייחוס לשילוב זה',
  'dose.breakdown': 'פירוט החישוב',
  'dose.bodyWeight': 'משקל גוף',
  'dose.doseGiven': 'מינון שניתן',
  'dose.rawVolume': 'נפח לפני עיגול',
  'dose.roundedVolume': 'נפח מעוגל',
  'dose.warnings': 'אזהרות',
  'dose.noWarnings': 'אין אזהרות',
  'dose.enterToCalc': 'הזן משקל, מינון וריכוז כדי לחשב.',

  // Routes
  'route.IV': 'תוך-ורידי (IV)',
  'route.IM': 'תוך-שרירי (IM)',
  'route.SC': 'תת-עורי (SC)',
  'route.PO': 'דרך הפה (PO)',

  // Toxicity suite
  'tox.title': 'חישובי רעילות',
  'tox.subtitle': 'הערכת סיכון לפי משקל וכמות שנאכלה. כלי תמיכה — לא תחליף לרופא.',
  'tox.choose': 'בחר רעל לחישוב',
  'tox.amount': 'כמות שנאכלה',
  'tox.source': 'סוג / מקור',
  'tox.riskLevel': 'רמת סיכון',
  'tox.dosePerKg': 'מנה משוערת',
  'tox.expectedSigns': 'סימנים קליניים צפויים',
  'tox.action': 'המלצה לפעולה',
  'tox.decon': 'חלון דה-קונטמינציה',
  'tox.context': 'הקשר קליני',
  'tox.notForSpecies': 'חישוב זה אינו רלוונטי לסוג בעל חיים זה.',
  'tox.idiosyncratic': 'רעילות אידיוסינקרטית — אין סף בטוח',

  // Risk bands
  'risk.minimal': 'מינימלי',
  'risk.mild': 'קל',
  'risk.moderate': 'בינוני',
  'risk.severe': 'חמור',
  'risk.critical': 'קריטי',
  'risk.emergency': 'חירום',

  // Emergency
  'emergency.title': 'מקרה חירום?',
  'emergency.text':
    'בחשד להרעלה — התקשר/י מיד למרפאת טדי הקרובה אליך. אל תמתין/י להופעת סימנים, והתקשר/י לפני ההגעה לעדכון שעות וזמינות.',
  'emergency.network': 'רשת מרפאות טדי',
  'emergency.allClinics': 'כל המרפאות באתר טדי',
  'emergency.note': 'מרפאות טדי פועלות בשעות הפעילות המצוינות. מחוץ לשעות אלו, או במקרה מסכן חיים, התקשר/י מראש לבירור זמינות. אין בישראל מוקד רעלים ייעודי לבעלי חיים (מוקד הרעלים הארצי, רמב"ם 04-7771900, מיועד לבני אדם בלבד).',
  'emergency.callVet': 'התקשר/י לרופא/ה הווטרינר/ית שלך',
  'emergency.generic.title': 'מקרה חירום?',
  'emergency.generic.text':
    'בחשד להרעלה, פנה/י מיד למרפאה הווטרינרית או למוקד החירום הקרוב אליך. אל תמתין/י להופעת סימנים — והתקשר/י מראש לבירור זמינות.',
  'emergency.submit.title': 'מפעיל/ה מרפאת חירום וטרינרית?',
  'emergency.submit.text':
    'אנו מרחיבים את ספריית מרפאות החירום לאזורך. אם ברצונך שהמרפאה שלך תופיע, שלח/י לנו אימייל עם השם, האזור, הטלפון ושעות הפעילות.',
  'emergency.submit.cta': 'שלחו לנו אימייל',

  // Disclaimer / footer
  'disclaimer.title': 'כתב ויתור',
  'disclaimer.text':
    'מחשבון זה הוא כלי תמיכה בקבלת החלטות קליניות ואינו מחליף שיקול דעת וטרינרי מקצועי או פנייה למוקד רעלים. יש לאמת כל חישוב מול מקורות תרופתיים לפני מתן טיפול. רעלים אידיוסינקרטיים (ענבים, שושנים) לעולם אינם מציגים תוצאה "בטוחה".',
  'footer.text': 'אסיסטנטים למען אסיסטנטים · כל הזכויות שמורות',
  'footer.madeWith': 'נבנה בקפידה קלינית',
  'footer.partner': 'שותף קליני',
} as const;

export type TKey = keyof typeof he;
