/**
 * Display metadata for the Bromethalin (rodenticide) toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { AlertTriangleIcon } from '../../components/Icons';

export const bromethalinMeta: ToxinMeta = {
  id: 'bromethalin',
  name: L('ברומתלין (רעל עכברים)', 'Bromethalin (rodenticide)'),
  blurb: L('רעל עצבי — ללא אנטידוט', 'Neurotoxic rodenticide — no antidote'),
  about: L(
    'ברומתלין הוא רעל מכרסמים מודרני שתוקף את המוח ולא את קרישת הדם — ואין לו אנטידוט. גם מנות צנועות גורמות לבצקת מוחית, רעד ושיתוק, ולכן טיהור (הקאה/פחם) בשעות הראשונות קריטי. חשוב לא להתבלבל בינו לבין פתיונות נוגדי קרישה.',
    'Bromethalin is a modern rodent bait that attacks the brain rather than blood clotting — and it has no antidote. Even modest doses cause brain swelling, tremors and paralysis, so decontamination in the first hours is everything. Do not confuse it with anticoagulant baits.',
  ),
  species: ['dog', 'cat'],
  accent: '#7C3AED',
  Icon: AlertTriangleIcon,
};
