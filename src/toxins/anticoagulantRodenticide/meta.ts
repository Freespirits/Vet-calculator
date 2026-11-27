/**
 * Display metadata for the Anticoagulant rodenticide toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { AlertOctagonIcon } from '../../components/Icons';

export const anticoagulantMeta: ToxinMeta = {
  id: 'anticoagulant_rodenticide',
  name: L('רעל עכברים נוגד קרישה', 'Anticoagulant rodenticide'),
  blurb: L('ברודיפקום, ברומדיולון ועוד', 'Brodifacoum, bromadiolone & others'),
  about: L(
    'פתיונות הדברה נגד מכרסמים מהסוג נוגד־הקרישה (ברודיפקום, ברומדיולון, דיפתיאלון ועוד) חוסמים את מחזור ויטמין K ומונעים קרישת דם. הדימום מתחיל בשקט רק 3–5 ימים אחרי אכילת הפיתיון — אבל קיים אנטידוט יעיל כשמטפלים בזמן.',
    'Anticoagulant rat and mouse baits (brodifacoum, bromadiolone, difethialone and others) block the vitamin-K cycle and stop blood from clotting. Bleeding starts silently only 3–5 days after the bait is eaten — but an effective antidote exists when treated in time.',
  ),
  species: ['dog', 'cat'],
  accent: '#DC2626',
  Icon: AlertOctagonIcon,
};
