/**
 * Heat-related illness (heatstroke) in dogs — grading by clinical signs.
 *
 * The criteria follow the revised VetCompass clinical grading tool (2026):
 * Beard S, Hall EJ, Bradbury J, et al. "Evaluation and validation of a revised
 * VetCompass clinical grading tool for heat-related illness in dogs." Sci Rep.
 * 2026;16(1):4661. doi:10.1038/s41598-025-34768-9 (open access; criteria read
 * from the paper's Figure 7, outcome figures from its Table 4).
 *
 * How grading is meant to work
 *  - Each sign belongs to one grade. The patient's grade is the highest grade
 *    among the signs present.
 *  - A mild picture that has not responded to cooling and/or fluids counts as
 *    moderate ("progression of mild grade").
 *  - A presenting body temperature of 41.0 °C or more does not change the
 *    grade; it marks a higher-risk sub-group within moderate and severe.
 *  - `cohort` reports what was OBSERVED in the paper's 2023 validation cohort
 *    (422 dogs seen at UK emergency clinics): cases and deaths in the matching
 *    group. With no temperature recorded both sub-groups are returned. These
 *    are cohort proportions, not a prediction for an individual dog.
 *
 * This is our own implementation of published criteria. It is not the
 * VetCompass chart, which the paper presents and which remains its authors'.
 */
import { L, type LocalizedText } from '../types/toxins';

export type HeatGrade = 'mild' | 'moderate' | 'severe';

export interface HeatSign {
  id: string;
  grade: HeatGrade;
  label: LocalizedText;
}

export const CRITICAL_TEMPERATURE_C = 41;

export const HEAT_SIGNS: HeatSign[] = [
  {
    id: 'continuous_panting',
    grade: 'mild',
    label: L(
      'התנשפות מתמשכת שאינה חולפת לאחר הפסקת מאמץ או הרחקה מהחום',
      'Continuous panting that does not settle after stopping exercise or leaving the heat',
    ),
  },
  { id: 'lethargy', grade: 'mild', label: L('עייפות, נוקשות או חוסר רצון לזוז', 'Lethargy, stiffness or unwillingness to move') },
  {
    id: 'episodic_collapse',
    grade: 'mild',
    label: L('התמוטטות חולפת עם התאוששות ספונטנית (ללא פגיעה בהכרה)', 'Episodic collapse with spontaneous recovery (consciousness not impaired)'),
  },
  { id: 'dyspnoea', grade: 'moderate', label: L('קוצר נשימה (מאמץ נשימתי)', 'Dyspnoea (laboured breathing)') },
  {
    id: 'gastrointestinal',
    grade: 'moderate',
    label: L('ריור יתר, שלשול ו/או הקאות (ללא דם)', 'Hypersalivation, diarrhoea and/or vomiting (no blood)'),
  },
  { id: 'single_seizure', grade: 'moderate', label: L('פרכוס בודד', 'A single seizure') },
  { id: 'ataxia', grade: 'severe', label: L('אטקסיה', 'Ataxia') },
  { id: 'multiple_seizures', grade: 'severe', label: L('שני פרכוסים או יותר', 'Two or more seizures') },
  { id: 'profound_depression', grade: 'severe', label: L('דיכאון הכרה עמוק', 'Profound depression') },
  { id: 'unresponsive_or_coma', grade: 'severe', label: L('חוסר תגובה או תרדמת', 'Unresponsive or coma') },
  { id: 'liver_or_kidney_dysfunction', grade: 'severe', label: L('פגיעה בתפקוד כבד או כליה', 'Liver or kidney dysfunction') },
  { id: 'gi_haemorrhage', grade: 'severe', label: L('דימום במערכת העיכול', 'Gastrointestinal haemorrhage') },
  { id: 'petechiae_purpura', grade: 'severe', label: L('פטכיות / פורפורה', 'Petechiae / purpura') },
];

/** One row of the paper's Table 4 (death from all causes; unassisted death). */
export interface CohortFigure {
  grade: HeatGrade;
  /** undefined = the grade has no temperature sub-group (mild). */
  criticalTemperature?: boolean;
  cases: number;
  deathsAllCauses: number;
  allCausePercent: number;
  unassistedCases: number;
  unassistedDeaths: number;
  unassistedPercent: number;
}

const COHORT_2023: CohortFigure[] = [
  { grade: 'mild', cases: 66, deathsAllCauses: 1, allCausePercent: 1.52, unassistedCases: 66, unassistedDeaths: 1, unassistedPercent: 1.52 },
  { grade: 'moderate', criticalTemperature: false, cases: 126, deathsAllCauses: 10, allCausePercent: 7.94, unassistedCases: 120, unassistedDeaths: 4, unassistedPercent: 3.33 },
  { grade: 'moderate', criticalTemperature: true, cases: 31, deathsAllCauses: 6, allCausePercent: 19.35, unassistedCases: 25, unassistedDeaths: 0, unassistedPercent: 0 },
  { grade: 'severe', criticalTemperature: false, cases: 122, deathsAllCauses: 30, allCausePercent: 24.59, unassistedCases: 100, unassistedDeaths: 8, unassistedPercent: 8 },
  { grade: 'severe', criticalTemperature: true, cases: 77, deathsAllCauses: 44, allCausePercent: 57.14, unassistedCases: 43, unassistedDeaths: 10, unassistedPercent: 23.26 },
];

export interface HeatGradingInput {
  signIds: string[];
  /** Presenting body temperature, °C; omit when not taken. */
  temperatureC?: number;
  /** A mild picture that has not responded to cooling and/or fluids. */
  notRespondingToTreatment?: boolean;
}

export interface HeatGrading {
  grade: HeatGrade | null;
  /** undefined when no temperature was given. */
  criticalTemperature?: boolean;
  cohort: CohortFigure[];
}

const GRADE_RANK: Record<HeatGrade, number> = { mild: 1, moderate: 2, severe: 3 };

function signById(signId: string): HeatSign {
  const sign = HEAT_SIGNS.find((candidate) => candidate.id === signId);
  if (!sign) {
    const known = HEAT_SIGNS.map((candidate) => candidate.id).join(', ');
    throw new Error(`Heat-illness grading: unknown sign id "${signId}". Known ids: ${known}.`);
  }
  return sign;
}

function assertPlausibleTemperature(temperatureC: number): void {
  if (!Number.isFinite(temperatureC) || temperatureC < 25 || temperatureC > 46) {
    throw new RangeError(
      `Heat-illness grading: body temperature must be between 25 and 46 °C, got ${temperatureC}.`,
    );
  }
}

function highestGrade(signs: HeatSign[]): HeatGrade | null {
  return signs.reduce<HeatGrade | null>(
    (highest, sign) => (highest === null || GRADE_RANK[sign.grade] > GRADE_RANK[highest] ? sign.grade : highest),
    null,
  );
}

function cohortFor(grade: HeatGrade | null, criticalTemperature: boolean | undefined): CohortFigure[] {
  if (grade === null) return [];
  const forGrade = COHORT_2023.filter((figure) => figure.grade === grade);
  if (grade === 'mild' || criticalTemperature === undefined) return forGrade;
  return forGrade.filter((figure) => figure.criticalTemperature === criticalTemperature);
}

export function gradeHeatIllness(input: HeatGradingInput): HeatGrading {
  const signs = input.signIds.map(signById);
  if (input.temperatureC !== undefined) assertPlausibleTemperature(input.temperatureC);
  const fromSigns = highestGrade(signs);
  const grade = fromSigns === 'mild' && input.notRespondingToTreatment ? 'moderate' : fromSigns;
  const criticalTemperature =
    input.temperatureC === undefined ? undefined : input.temperatureC >= CRITICAL_TEMPERATURE_C;
  return {
    grade,
    ...(criticalTemperature === undefined ? {} : { criticalTemperature }),
    cohort: cohortFor(grade, criticalTemperature),
  };
}
