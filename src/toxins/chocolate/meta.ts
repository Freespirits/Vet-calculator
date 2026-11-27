/**
 * Display metadata for the Chocolate / Methylxanthine toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { ChocolateIcon } from '../../components/Icons';

export const chocolateMeta: ToxinMeta = {
  id: 'chocolate',
  name: L('שוקולד / מתילקסנטינים', 'Chocolate / Methylxanthine'),
  blurb: L('תאוברומין וקפאין לפי סוג וכמות', 'Theobromine & caffeine by type and amount'),
  about: L(
    'שוקולד מכיל תאוברומין וקפאין — חומרים מעוררים שכלבים וחתולים מפרקים לאט מאוד. ככל שהשוקולד כהה ומריר יותר, כך הוא רעיל יותר לגרם. בחרו סוג והזינו כמות כדי להעריך את המינון שנבלע ואת רמת הסיכון.',
    'Chocolate contains theobromine and caffeine — stimulants that dogs and cats metabolize very slowly. The darker the chocolate, the more toxic it is per gram. Pick the type and amount eaten to estimate the ingested dose and its risk level.',
  ),
  species: ['dog', 'cat'],
  accent: '#A87B4F',
  Icon: ChocolateIcon,
};
