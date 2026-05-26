/**
 * Lily exposure — feline.
 * Classified by plant IDENTITY, not amount (idiosyncratic). True lilies
 * (Lilium spp + Hemerocallis/daylily) are nephrotoxic from ANY exposure,
 * including pollen and vase water. "Imposter" lilies (peace/calla/Peruvian)
 * cause only oral irritation from insoluble oxalate crystals.
 */
import { L, type ToxinResult } from '../../types/toxins';

export type LilyCategory = 'nephrotoxic' | 'oxalate' | 'unknown';

const SOURCES = [
  'Merck Veterinary Manual. Houseplants and Ornamentals Toxic to Animals — lily toxicosis (Lilium/Hemerocallis vs oxalate plants).',
  'Fitzgerald KT. Lily toxicity in the cat. Top Companion Anim Med. 2010;25(4):213–217.',
  'Bates N, et al. AKI and outcome in cats following lily exposure. J Am Vet Med Assoc. 2025;263(1).',
];

export function computeLily(category: LilyCategory): ToxinResult {
  if (category === 'oxalate') {
    return {
      level: 'mild',
      fraction: 0.25,
      bandLabel: L('גירוי מקומי (לא נפרוטוקסי)', 'Local irritation (not nephrotoxic)'),
      signs: L(
        'כאב ובצקת בפה, ריור יתר, גירוד/חיכוך הפה, חוסר תיאבון — בדרך כלל חולף מעצמו.',
        'Oral pain and edema, hypersalivation, pawing at the mouth, anorexia — usually self-limiting.',
      ),
      action: L(
        'שטוף/י את הפה במים, הצע/י מזון/חלב לקשירת הגבישים, ונטר/י. פנה/י לרופא וטרינר אם הסימנים נמשכים.',
        'Rinse the mouth with water, offer food/milk to bind the crystals, and monitor. See a vet if signs persist.',
      ),
      context: L(
        'שושנים "מתחזות" (חבצלת השלום, קלה, אלסטרומריה) מכילות גבישי סידן אוקסלט בלתי-מסיסים — גירוי בלבד, ללא פגיעה כלייתית.',
        '"Imposter" lilies (peace lily, calla, Peruvian lily) contain insoluble calcium-oxalate crystals — irritation only, no kidney injury.',
      ),
      emergency: false,
      sources: SOURCES,
    };
  }

  // nephrotoxic or unknown → treat as emergency
  return {
    level: 'critical',
    idiosyncratic: true,
    bandLabel: L('שושן אמיתי — חירום', 'True lily — emergency'),
    signs: L(
      'ריור, הקאות, חוסר תיאבון ורפיון תוך 1–3 שעות → ריבוי שתן והתייבשות (12–30 ש׳) → חולשה, רביצה, אי-ספיקת כליות אוליגורית/אנורית ומוות תוך 3–7 ימים ללא טיפול.',
      'Salivation, vomiting, anorexia and lethargy within 1–3 h → polyuria and dehydration (12–30 h) → weakness, recumbency, oliguric/anuric renal failure and death within 3–7 days untreated.',
    ),
    action: L(
      'חירום מיידי — פנה/י לרופא וטרינר עכשיו, בכל כמות. דה-קונטמינציה ועירוי נוזלים IV שיתחיל לפני הופעת אנוריה (אידיאלית תוך ~18 שעות); המודיאליזה יעילה אם מתחילים מוקדם.',
      'Immediate emergency — see a vet now, for any amount. Decontaminate and start IV fluid diuresis before anuria sets in (ideally within ~18 h); hemodialysis is effective if started early.',
    ),
    context: L(
      'שושנים אמיתיים (Lilium — חבצלת הפסחא, נמרית, אסיאתית, אוריינטלית) ו-Hemerocallis (שושן-יום) רעילים לכליה בכל חלק ובכל כמות — כולל אבקנים ומי-אגרטל. אפילו 2 עלים או חלק מפרח גרמו למוות. תסמונת ייחודית לחתולים.',
      'True lilies (Lilium — Easter, tiger, Asiatic, Oriental) and Hemerocallis (daylily) are nephrotoxic in any part and any amount — including pollen and vase water. Even 2 leaves or part of one flower has caused death. The syndrome is feline-specific.',
    ),
    emergency: true,
    sources: SOURCES,
  };
}
