/**
 * Feline Grimace Scale — acute pain assessment from five facial "action units".
 *
 * Source: Evangelista MC, Watanabe R, Leung VSY, et al. "Facial expressions of
 * pain in cats: the development and validation of a Feline Grimace Scale."
 * Sci Rep. 2019;9:19128. doi:10.1038/s41598-019-55693-8 (open access, CC BY 4.0;
 * action-unit definitions and scoring rules read from the paper's text).
 *
 * How scoring works, as the paper defines it
 *  - Each unit is scored 0 (absent), 1 (moderately present, or the observer is
 *    unsure) or 2 (obviously present), or marked "not possible to score".
 *  - Score = sum of the scored units ÷ the maximum possible for those units
 *    (a unit that cannot be scored is left out of both), giving 0 to 1.
 *  - More than two units that cannot be scored → no score is given.
 *  - A score above 0.39 was the cut-off for rescue analgesia (sensitivity
 *    90.7%, specificity 86.6% against another validated feline pain scale).
 *
 * The descriptions below are our own short wording of the published
 * definitions. The scale was validated on images of undisturbed cats; the
 * paper notes real-time use still needed study.
 */
import { L, type LocalizedText } from '../types/toxins';

export type FgsUnitId = 'ears' | 'eyes' | 'muzzle' | 'whiskers' | 'head';
/** null = not possible to score. */
export type FgsUnitScore = 0 | 1 | 2 | null;

export const FGS_CUTOFF = 0.39;
export const FGS_MAX_UNSCORABLE = 2;

export const FGS_SOURCE =
  "Evangelista MC, Watanabe R, Leung VSY, Monteiro BP, O'Toole E, Pang DSJ, Steagall PV. Facial expressions of pain in cats: the development and validation of a Feline Grimace Scale. Sci Rep. 2019;9:19128. doi:10.1038/s41598-019-55693-8 (CC BY 4.0)";

export const FGS_ACTION_UNITS: { id: FgsUnitId; name: LocalizedText; painful: LocalizedText }[] = [
  {
    id: 'ears',
    name: L('אוזניים', 'Ear position'),
    painful: L('קצות האוזניים מורחקים זה מזה ומסובבים החוצה', 'Ear tips pulled apart and rotated outwards'),
  },
  {
    id: 'eyes',
    name: L('עיניים (היצרות ארובה)', 'Orbital tightening'),
    painful: L(
      'היצרות אזור העין: גובה המפתח קטן מחצי רוחב העין, או עיניים מכווצות/סגורות',
      'Narrowed eye area: opening shorter than half the eye’s width, or squinted/closed eyes',
    ),
  },
  {
    id: 'muzzle',
    name: L('מתח בזרבובית', 'Muzzle tension'),
    painful: L('זרבובית שטוחה ומתוחה, מצורה עגולה לאליפטית', 'Muzzle flattened and stretched, from round to elliptical'),
  },
  {
    id: 'whiskers',
    name: L('שפם', 'Whiskers position'),
    painful: L('שערות השפם נעות קדימה והרחק מהפנים, זקורות', 'Whiskers moved forward and away from the face, standing on end'),
  },
  {
    id: 'head',
    name: L('תנוחת ראש', 'Head position'),
    painful: L('ראש מתחת לקו הכתפיים או מוטה מטה (סנטר אל החזה)', 'Head below the shoulder line or tilted down (chin toward the chest)'),
  },
];

export interface FgsResult {
  /** false until all five units are answered, or when too many cannot be scored. */
  scorable: boolean;
  score?: number;
  aboveCutoff?: boolean;
  unscorableCount: number;
}

export function scoreFelineGrimace(scores: Partial<Record<FgsUnitId, FgsUnitScore>>): FgsResult {
  const answers = FGS_ACTION_UNITS.map((unit) => scores[unit.id]);
  const unscorableCount = answers.filter((answer) => answer === null).length;
  const unanswered = answers.some((answer) => answer === undefined);
  if (unanswered || unscorableCount > FGS_MAX_UNSCORABLE) return { scorable: false, unscorableCount };
  const scored = answers.filter((answer): answer is 0 | 1 | 2 => typeof answer === 'number');
  const total = scored.reduce<number>((sum, answer) => sum + answer, 0);
  const score = total / (scored.length * 2);
  return { scorable: true, score, aboveCutoff: score > FGS_CUTOFF, unscorableCount };
}
