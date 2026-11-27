/**
 * Titles, one-line descriptions and tile colours of the bedside calculators.
 * Kept apart from the components so the suite's grid can list a calculator
 * without loading its screen code.
 */
import { L, type LocalizedText } from '../../types/toxins';

export type BedsideToolId = 'shock-index' | 'feline-grimace' | 'transfusion' | 'infusion';

export interface BedsideMeta {
  id: BedsideToolId;
  name: LocalizedText;
  blurb: LocalizedText;
  accent: string;
}

export const BEDSIDE_META: Record<BedsideToolId, BedsideMeta> = {
  'shock-index': {
    id: 'shock-index',
    name: L('מדד הלם (כלבים)', 'Shock index (dogs)'),
    blurb: L('דופק חלקי לחץ סיסטולי, מול סף 1.0', 'Heart rate over systolic pressure, against a cut-off of 1.0'),
    accent: '#F43F5E',
  },
  'feline-grimace': {
    id: 'feline-grimace',
    name: L('סולם העוויות הפנים לחתולים (Feline Grimace Scale)', 'Feline Grimace Scale'),
    blurb: L('הערכת כאב חריף בחתול מחמישה מאפייני פנים', 'Acute pain in cats from five facial features'),
    accent: '#2DD4BF',
  },
  transfusion: {
    id: 'transfusion',
    name: L('נפח עירוי דם', 'Transfusion volume'),
    blurb: L('נפח לעליית המטוקריט רצויה, לפי הנוסחה שנבדקה למין', 'Volume for a desired PCV rise, by the formula tested for the species'),
    accent: '#FB923C',
  },
  infusion: {
    id: 'infusion',
    name: L('קצב עירוי מתמשך (CRI)', 'Infusion rate (CRI)'),
    blurb: L('ממינון ומריכוז לקצב משאבה — חשבון יחידות בלבד', 'From dose rate and concentration to pump rate — unit arithmetic only'),
    accent: '#8B5CF6',
  },
};

export const BEDSIDE_TOOL_IDS = Object.keys(BEDSIDE_META) as BedsideToolId[];
