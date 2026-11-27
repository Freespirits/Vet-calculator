/**
 * Display metadata for the Grapes / Raisins toxicity calculator: name, blurb,
 * the plain-language explanation, supported species, accent colour and icon.
 * Kept apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { GrapeIcon } from '../../components/Icons';

export const grapesMeta: ToxinMeta = {
  id: 'grapes',
  name: L('ענבים / צימוקים', 'Grapes / Raisins'),
  blurb: L('רעילות כלייתית אידיוסינקרטית', 'Idiosyncratic kidney toxicity'),
  about: L(
    'ענבים, צימוקים וכל מאכל שמכיל אותם עלולים לגרום לאי־ספיקת כליות חריפה בכלבים. המנגנון (כנראה חומצה טרטרית) בלתי צפוי — יש כלבים שמגיבים לענב בודד — ולכן כל בליעה נחשבת מסוכנת פוטנציאלית.',
    'Grapes, raisins, sultanas and anything containing them can cause acute kidney failure in dogs. The mechanism (likely tartaric acid) is unpredictable — some dogs react to a single grape — so any ingestion is treated as potentially serious.',
  ),
  species: ['dog'],
  accent: '#8B5CF6',
  Icon: GrapeIcon,
};
