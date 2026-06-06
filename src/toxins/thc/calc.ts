/**
 * Cannabis / THC toxicosis — canine & feline (dogs far more commonly).
 * Δ9-THC acts on CB1 receptors. The classic picture is non-fatal intoxication;
 * dogs are exquisitely sensitive to behavioural signs but the lethal dose is
 * extremely high (oral MLD > 3 g/kg), so deaths are rare and usually involve
 * concentrated edibles (often with chocolate or xylitol co-toxicity).
 *
 * Signs typically begin around 0.5–2 mg/kg of THC.
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

const SOURCES = [
  'Brutlag A, Hommerding H. Cannabis (Marijuana) Toxicosis in Animals. Merck/MSD Veterinary Manual, 2024.',
  'Meola SD, et al. Evaluation of trends in marijuana toxicosis in dogs (2005–2010). J Vet Emerg Crit Care. 2012;22(6):690–696.',
  'ASPCA Animal Poison Control Center. Marijuana (THC) ingestion in pets.',
];

export interface ThcInput {
  species: ToxSpecies;
  weightKg: number;
  /** Total Δ9-THC ingested, mg. */
  mgThc: number;
}

export function computeThc(input: ThcInput): ToxinResult {
  const mgPerKg = input.mgThc / input.weightKg;

  let level: RiskLevel;
  if (mgPerKg < 0.5) level = 'minimal';
  else if (mgPerKg < 2) level = 'mild';
  else if (mgPerKg < 9) level = 'moderate';
  else level = 'severe';

  const emergency = level === 'severe';
  const fraction = Math.min(1, mgPerKg / 12);

  const signs =
    level === 'minimal'
      ? L('מתחת לסף הסימנים הצפוי; נטר/י.', 'Below the expected sign threshold; monitor.')
      : level === 'mild'
        ? L('דיכאון/ישנוניות, אטקסיה, דליפת שתן, רגישות-יתר לרעש/מגע, אישונים מורחבים.', 'Depression/drowsiness, ataxia, urine dribbling, hyperesthesia to noise/touch, dilated pupils.')
        : level === 'moderate'
          ? L('אטקסיה בולטת, רעד, ברדיקרדיה, היפותרמיה, "התכווצות-הרפיה" אופיינית, לעיתים הקאות.', 'Marked ataxia, tremors, bradycardia, hypothermia, the classic startle-and-sway, sometimes vomiting.')
          : L('דיכאון/תרדמת עמוקים, פרכוסים אפשריים, צניחת חום גוף — נדיר אך מתואר.', 'Profound depression/coma, possible seizures, falling body temperature — rare but reported.');

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(1)} mg/kg`,
    doseSubLabel: L('‎THC למשקל גוף', 'THC per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L('נטר/י בבית; פנה/י לרופא וטרינר אם מופיעים סימנים או אם נאכלו מאפי קנאביס (סיכון נוסף).', 'Monitor at home; contact a vet if signs develop or if a cannabis edible was eaten (added risk).')
        : L(
            'פנה/י לרופא וטרינר. טיפול תומך: שמירה על חום גוף, נוזלי IV, ניטור. הקאה לרוב לא מומלצת לאחר הופעת דיכאון (סיכון שאיפה). שקול/י אינטרליפיד במקרים חמורים.',
            'Contact a vet. Supportive care: keep warm, IV fluids, monitor. Emesis is usually avoided once depressed (aspiration risk). Consider intravenous lipid emulsion in severe cases.',
          ),
    decon: L(
      'הקאה יזומה רק אם נאכל ממש לאחרונה ובעל החיים ערני; פחם פעיל. סימנים נמשכים בדרך כלל 12–24 שעות, לעיתים עד 72 שעות.',
      'Induce emesis only if very recent and the animal is alert; activated charcoal. Signs usually last 12–24 h, occasionally up to 72 h.',
    ),
    context: L(
      'סימנים מתחילים סביב 0.5–2 מ"ג/ק"ג. מינון קטלני מינימלי אוראלי גבוה מאוד (>3 גרם/ק"ג), ולכן מוות נדיר. סכנה עיקרית: מאפים מרוכזים, ובמיוחד שילוב עם שוקולד או קסיליטול.',
      'Signs begin around 0.5–2 mg/kg. The oral minimum lethal dose is very high (>3 g/kg), so death is rare. The main danger is concentrated edibles — especially combined with chocolate or xylitol.',
    ),
    emergency,
    stats: [
      { label: L('סך THC', 'Total THC'), value: `${input.mgThc.toFixed(0)} mg` },
      { label: L('‎THC/ק"ג', 'THC/kg'), value: `${mgPerKg.toFixed(1)} mg/kg` },
    ],
    sources: SOURCES,
  };
}
