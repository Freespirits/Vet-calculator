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
  'hero.subtitle':
    'חישובי מינון ורעילות לכלבים ולחתולים — יותר מ-130 טווחי מינון ייחוס, 14 מחשבוני רעילות מתועדים וספריית צמחים רעילים מצולמת. חינם, ועובד גם ללא רשת.',
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
  'treat.title': 'טיפול מיידי — מינונים וטרינריים',
  'treat.emesis': 'השראת הקאה',
  'treat.charcoal': 'פחם פעיל',
  'treat.monitoring': 'ניטור',
  'treat.status.indicated': 'מומלץ',
  'treat.status.caution': 'זהירות',
  'treat.status.no': 'לא מומלץ',
  'treat.disclaimer': 'המינונים מיועדים לאנשי מקצוע וטרינריים — יש לאמת מול המקור המצוטט לפני מתן.',

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

  // About / FAQ — server-rendered SEO content
  'about.title': 'אודות המחשבון הווטרינרי',
  'about.lead':
    'וט-חולים הוא כלי חינמי לתמיכה בהחלטות קליניות, עבור רופאים וטרינרים, אחיות וטכנאים המטפלים בכלבים ובחתולים. הוא מרכז ארבעה דברים בעמוד אחד: מחשבון מינון המחזיר נפח להזרקה, מערכת מחשבוני רעילות מתועדים, ספריית צמחים רעילים מצולמת, וניהול מטופל עם כמה תרופות שניתן לייצא כדוח אחד. הכול רץ בדפדפן — בלי חשבון, בלי העלאה, ובלי שנתוני מטופל יוצאים מהמכשיר.',
  'about.dosage.title': 'מחשבון מינון תרופות',
  'about.dosage.body':
    "הזינו מין, משקל גוף, מינון לק\"ג וריכוז התכשיר, והמחשבון יחזיר את הנפח המדויק לשאיבה, מעוגל לרזולוציית המזרק שבחרתם (0.01, 0.05 או 0.1 מ\"ל). הוא מכסה יותר מ-130 תרופות עם טווחי ייחוס מתוך Plumb's Veterinary Drug Handbook, מסמן מינונים החורגים מהטווח המפורסם, ותומך ב-mg/kg, mcg/kg, IU/kg ו-mL/kg לצד מתן IV, IM, SC ו-PO.",
  'about.toxins.title': 'מחשבוני רעילות',
  'about.toxins.body':
    'ארבעה-עשר כלי רעילות מתועדים מעריכים סיכון לפי משקל הגוף והכמות שנאכלה: שוקולד ומתילקסנתינים אחרים, ענבים וצימוקים, קסיליטול, בצל ושום, אגוזי מקדמיה, איבופרופן, פרצטמול, פרמתרין, שושנים, רעלי מכרסמים, אתילן גליקול, קנביס, אלכוהול וקפאין. כל תוצאה כוללת רמת סיכון, סימנים קליניים צפויים, חלון דה-קונטמינציה והמלצה לפעולה. רעלים אידיוסינקרטיים לעולם אינם מציגים תוצאה בטוחה.',
  'about.plants.title': 'ספריית צמחים רעילים',
  'about.plants.body':
    'ספרייה מצולמת וניתנת לחיפוש של צמחי בית וגינה המסוכנים לכלבים ולחתולים, עם סינון לפי חומרה — מקל ועד קטלני. כל ערך מפרט את החומר הרעיל, את חלקי הצמח המעורבים, את הסימנים הקליניים הצפויים ואת דחיפות הפנייה לטיפול.',
  'about.patient.title': 'ניהול מטופל',
  'about.patient.body':
    'מטפלים במקרה עם כמה תרופות? פתחו סשן מטופל, הוסיפו כל מינון מחושב לרשימה, ואז העתיקו או שתפו דוח תרופות מרוכז אחד עם שמות התרופות, המינונים, הנפחים לשאיבה, דרכי המתן והתדירות — נוח למסירת משמרת, לגיליון טיפול ולהוראות לבעלים.',
  'about.who.title': 'למי זה מיועד',
  'about.who.body':
    'נבנה עבור אנשי מקצוע וטרינריים מורשים וסטודנטים. האחריות הקלינית תמיד על הרופא/ה המטפל/ת: יש לאמת כל מספר מול מקורות התרופות שלכם לפני מתן. בעלי חיה החושדים בהרעלה צריכים לפנות מיד למרפאה וטרינרית או למוקד חירום, ולא לפעול לפי חישוב.',
  'faq.title': 'שאלות נפוצות',
  'faq.q1': 'האם המחשבון הווטרינרי חינמי?',
  'faq.a1':
    'כן. כל המחשבונים, ספריית הצמחים וניהול המטופל זמינים לשימוש חופשי, ללא חשבון וללא הרשמה.',
  'faq.q2': 'אילו בעלי חיים נתמכים?',
  'faq.a2':
    'כלבים וחתולים. טווחי המינון, ספי הרעילות והסימנים הקליניים שונים בין שני המינים, לכן יש לבחור קודם את המין — חלק מחישובי הרעילות רלוונטיים רק לאחד מהם ויציינו זאת.',
  'faq.q3': 'מהם מקורות טווחי המינון?',
  'faq.a3':
    "טווחי מינון הייחוס לקוחים מ-Plumb's Veterinary Drug Handbook, וספי הרעילות ממקורות טוקסיקולוגיה וטרינרית מפורסמים המצוטטים בתוך כל כלי. אלה להכוונה בלבד ויש לאמתם באופן עצמאי לפני טיפול.",
  'faq.q4': 'אפשר להשתמש ללא אינטרנט?',
  'faq.a4':
    'כן. האתר הוא אפליקציית ווב מתקדמת הניתנת להתקנה: הוסיפו אותו פעם אחת למסך הבית והמחשבונים ימשיכו לעבוד גם ללא חיבור לרשת.',
  'faq.q5': 'האם נתוני המטופל נשמרים איפשהו?',
  'faq.a5':
    'לא. כל החישובים רצים מקומית בדפדפן ושום דבר אינו נשלח לשרת. סשן המטופל קיים רק בלשונית הנוכחית.',
  'faq.q6': 'מה לעשות בחשד להרעלה?',
  'faq.a6':
    'פנו מיד לרופא/ה הווטרינר/ית או למרפאת החירום הקרובה, עוד לפני הופעת סימנים. השתמשו במחשבון הרעילות כדי להעריך את החשיפה וכדי למסור מידע מדויק בשיחה — ולעולם לא כדי להחליט שלא לפנות לטיפול.',
} as const;

export type TKey = keyof typeof he;
