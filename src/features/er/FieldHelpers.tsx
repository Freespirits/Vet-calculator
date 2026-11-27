/**
 * The interactive helper shown at the top of each field-emergency topic.
 *
 *  - HeatGrader          tick the signs present (+ optional presenting
 *                        temperature) → grade under the revised VetCompass
 *                        criteria and what was observed in the paper's
 *                        validation cohort for that group.
 *  - ViperRiskChecklist  tick the factors present → a plain count of the
 *                        factors that were associated with death in the
 *                        Israeli cohort. Deliberately not a score.
 *  - CaterpillarWindow   hours since contact → time-to-flushing group and the
 *                        tongue-necrosis frequencies reported for it.
 *  - CholinergicWindow   hours since the cholinergic crisis → before / inside
 *                        / after the intermediate-syndrome window.
 *
 * Each helper states where its figures come from and that they describe a
 * study population, not the patient in front of the clinician. An input the
 * logic rejects (e.g. a temperature of 410) is shown as an inline message.
 */
import { useState, type ReactNode } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type LocalizedText } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { NumberField } from '../../components/forms';
import {
  CRITICAL_TEMPERATURE_C,
  gradeHeatIllness,
  HEAT_SIGNS,
  type CohortFigure,
  type HeatGrade,
  type HeatGrading,
} from '../../emergencies/heatIllness';
import {
  caterpillarFlushWindow,
  cholinergicTimeline,
  countViperRiskFactors,
  VIPER_MORTALITY_FACTORS,
  type CholinergicPhase,
  type FlushGroup,
} from '../../emergencies/fieldFacts';
import { CheckRow, ResultPanel } from './TopicParts';
import { parseNumber, toggleId } from './inputs';

function HelperCard({ title, children }: { title: LocalizedText; children: ReactNode }) {
  const { lang } = useI18n();
  return (
    <GlassCard className="flex flex-col gap-3 p-4">
      <h3 className="text-base font-semibold text-ink">{tr(title, lang)}</h3>
      {children}
    </GlassCard>
  );
}

/** Runs a calculation that may reject its input; a rejection becomes a message instead of a crash. */
function attempt<T>(calculate: () => T): { value: T } | { error: string } {
  try {
    return { value: calculate() };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

/* ---------------------------------------------------------------- heat --- */

const HEAT = {
  title: L('דירוג חומרה לפי סימנים', 'Severity grade from clinical signs'),
  temperature: L('חום גוף בקבלה (לא חובה)', 'Presenting body temperature (optional)'),
  notResponding: L('סימנים קלים שאינם מגיבים לקירור ו/או לנוזלים', 'Mild signs not responding to cooling and/or fluids'),
  pick: L('סמנו את הסימנים הקיימים כדי לקבל דרגה.', 'Tick the signs present to see a grade.'),
  critical: L(
    `חום בקבלה ${CRITICAL_TEMPERATURE_C}°C ומעלה — תת-קבוצה בסיכון מוגבר; הכלי קורא לקירור מהיר ודחוף.`,
    `Presenting temperature ${CRITICAL_TEMPERATURE_C} °C or above — a higher-risk sub-group; the tool calls for urgent rapid cooling.`,
  ),
  cohortLead: L(
    'בקבוצת התיקוף (422 כלבים, מרפאות חירום בבריטניה, 2023):',
    'In the validation cohort (422 dogs, UK emergency clinics, 2023):',
  ),
  notPrediction: L(
    'אלה שיעורים שנצפו בקבוצת מחקר — לא תחזית לכלב הבודד.',
    'These are proportions observed in a study group — not a prediction for an individual dog.',
  ),
  source: L(
    'קריטריונים ונתונים: Beard ועמיתים 2026 (הכלי המעודכן של VetCompass). זהו יישום עצמאי של הקריטריונים שפורסמו, ולא הטבלה המקורית.',
    'Criteria and figures: Beard et al. 2026 (the revised VetCompass tool). This is an independent implementation of the published criteria, not the original chart.',
  ),
};

const GRADE_LABEL: Record<HeatGrade, LocalizedText> = {
  mild: L('קל', 'Mild'),
  moderate: L('בינוני', 'Moderate'),
  severe: L('קשה', 'Severe'),
};

const GRADE_CARE: Record<HeatGrade, LocalizedText> = {
  mild: L(
    'לפי הכלי: קירור פעיל אם יש היפרתרמיה; ייתכן טיפול במקום; מעקב אחר התקדמות הסימנים.',
    'Per the tool: active cooling if hyperthermic; may be manageable on the scene; watch for progression.',
  ),
  moderate: L(
    'לפי הכלי: קירור פעיל אם יש היפרתרמיה; לשקול אשפוז; תמיכה נשימתית ונוזלים לפי הצורך.',
    'Per the tool: active cooling if hyperthermic; consider hospitalisation; respiratory support and fluids as needed.',
  ),
  severe: L(
    'לפי הכלי: נדרש טיפול בבית חולים; קירור פעיל אם יש היפרתרמיה; ניטור תפקודי כבד, כליה וקרישה.',
    'Per the tool: hospital care is required; active cooling if hyperthermic; monitor liver, kidney and clotting function.',
  ),
};

const GRADE_TONE: Record<HeatGrade, 'teal' | 'amber' | 'rose'> = { mild: 'teal', moderate: 'amber', severe: 'rose' };

/**
 * Temperature sub-group wording. Hebrew spells the comparison out in words:
 * a "≥" or "<" inside right-to-left text is mirrored by the browser and would
 * read as the opposite.
 */
function temperatureGroupText(criticalTemperature: boolean | undefined, lang: 'he' | 'en'): string {
  if (criticalTemperature === undefined) return '';
  const threshold = `${CRITICAL_TEMPERATURE_C}°C`;
  if (lang === 'he') return criticalTemperature ? ` (חום ${threshold} ומעלה)` : ` (חום מתחת ל-${threshold})`;
  return criticalTemperature ? ` (${threshold} or above)` : ` (below ${threshold})`;
}

function cohortLine(figure: CohortFigure, lang: 'he' | 'en'): string {
  const group = temperatureGroupText(figure.criticalTemperature, lang);
  return lang === 'he'
    ? `${figure.deathsAllCauses} מתוך ${figure.cases} מתו${group} — ${figure.allCausePercent}%; מוות ללא המתת חסד: ${figure.unassistedDeaths} מתוך ${figure.unassistedCases} (${figure.unassistedPercent}%).`
    : `${figure.deathsAllCauses} of ${figure.cases} died${group} — ${figure.allCausePercent}%; unassisted death: ${figure.unassistedDeaths} of ${figure.unassistedCases} (${figure.unassistedPercent}%).`;
}

function HeatResult({ grading }: { grading: HeatGrading }) {
  const { lang } = useI18n();
  const reportLang = lang === 'he' ? 'he' : 'en';
  if (grading.grade === null) return <ResultPanel>{tr(HEAT.pick, lang)}</ResultPanel>;
  return (
    <ResultPanel tone={GRADE_TONE[grading.grade]}>
      <p className="text-lg font-bold text-ink">{tr(GRADE_LABEL[grading.grade], lang)}</p>
      <p>{tr(GRADE_CARE[grading.grade], lang)}</p>
      {grading.criticalTemperature && grading.grade !== 'mild' && (
        <p className="font-semibold text-rose">{tr(HEAT.critical, lang)}</p>
      )}
      <p className="font-medium text-ink">{tr(HEAT.cohortLead, lang)}</p>
      {grading.cohort.map((figure) => (
        <p key={`${figure.grade}-${figure.criticalTemperature}`} className="tnum">
          {cohortLine(figure, reportLang)}
        </p>
      ))}
      <p className="text-xs text-muted">{tr(HEAT.notPrediction, lang)}</p>
      <p className="text-[11px] text-muted">{tr(HEAT.source, lang)}</p>
    </ResultPanel>
  );
}

export function HeatGrader() {
  const { lang } = useI18n();
  const [signIds, setSignIds] = useState<string[]>([]);
  const [notResponding, setNotResponding] = useState(false);
  const [temperatureText, setTemperatureText] = useState('');
  const temperatureC = parseNumber(temperatureText) ?? undefined;
  const outcome = attempt(() => gradeHeatIllness({ signIds, temperatureC, notRespondingToTreatment: notResponding }));
  return (
    <HelperCard title={HEAT.title}>
      <div className="flex flex-col gap-1.5">
        {HEAT_SIGNS.map((sign) => (
          <CheckRow
            key={sign.id}
            label={tr(sign.label, lang)}
            checked={signIds.includes(sign.id)}
            onChange={(checked) => setSignIds((ids) => toggleId(ids, sign.id, checked))}
          />
        ))}
        <CheckRow label={tr(HEAT.notResponding, lang)} checked={notResponding} onChange={setNotResponding} />
      </div>
      <NumberField label={tr(HEAT.temperature, lang)} value={temperatureText} onChange={setTemperatureText} suffix="°C" placeholder="—" />
      {'error' in outcome ? <ResultPanel tone="amber">{outcome.error}</ResultPanel> : <HeatResult grading={outcome.value} />}
    </HelperCard>
  );
}

/* --------------------------------------------------------------- snake --- */

const VIPER = {
  title: L('גורמים שנקשרו לתמותה — צפע ארץ-ישראלי', 'Factors associated with death — Vipera palaestinae'),
  protective: L('באותו מחקר, לכלבים מתחת לגיל 4 היה סיכון תמותה נמוך יותר.', 'In the same study, dogs younger than 4 years had a lower risk of death.'),
  limits: L(
    'זוהי ספירה, לא ציון: המחקר (327 כלבים, תמותה 4%) לא פרסם משקלות או כלל חיזוי, ולכן אין לתרגם את המספר לסיכוי.',
    'This is a count, not a score: the study (327 dogs, 4% mortality) published no weights or prediction rule, so the number cannot be turned into a probability.',
  ),
};

export function ViperRiskChecklist() {
  const { lang } = useI18n();
  const [presentIds, setPresentIds] = useState<string[]>([]);
  const { present, total } = countViperRiskFactors(presentIds);
  const summary = lang === 'he' ? `${present} מתוך ${total} גורמים קיימים.` : `${present} of ${total} factors present.`;
  return (
    <HelperCard title={VIPER.title}>
      <div className="flex flex-col gap-1.5">
        {VIPER_MORTALITY_FACTORS.map((factor) => (
          <CheckRow
            key={factor.id}
            label={tr(factor.label, lang)}
            checked={presentIds.includes(factor.id)}
            onChange={(checked) => setPresentIds((ids) => toggleId(ids, factor.id, checked))}
          />
        ))}
      </div>
      <ResultPanel tone={present > 0 ? 'amber' : 'neutral'}>
        <p className="tnum text-lg font-bold text-ink">{summary}</p>
        <p>{tr(VIPER.limits, lang)}</p>
        <p className="text-xs text-muted">{tr(VIPER.protective, lang)}</p>
        <p className="text-[11px] text-muted" dir="ltr">
          Segev 2004
        </p>
      </ResultPanel>
    </HelperCard>
  );
}

/* --------------------------------------------------------- caterpillar --- */

const CATERPILLAR = {
  title: L('זמן מהמגע עד שטיפת הפה הראשונה', 'Time from contact to the first oral flushing'),
  hours: L('שעות מאז המגע', 'Hours since contact'),
  enter: L('הזינו את מספר השעות.', 'Enter the number of hours.'),
  limits: L(
    'שיעורים מקבוצה של 109 כלבים בצרפת; הם מתארים את הקבוצה, לא את הכלב הבודד.',
    'Frequencies from a cohort of 109 dogs in France; they describe the group, not the individual dog.',
  ),
};

const FLUSH_GROUP_LABEL: Record<FlushGroup, LocalizedText> = {
  'under-2h': L('פחות משעתיים', 'Under 2 hours'),
  '2-to-6h': L('2 עד 6 שעות', '2 to 6 hours'),
  'over-6h': L('יותר מ-6 שעות', 'More than 6 hours'),
};

function CaterpillarResult({ hours }: { hours: number }) {
  const { lang } = useI18n();
  const window = caterpillarFlushWindow(hours);
  const body =
    lang === 'he'
      ? `נמק לשון בקבלה: ${window.necrosisAtAdmissionPercent}% מהכלבים בקבוצה זו; נמק שהתפתח במהלך האשפוז: ${window.necrosisInHospitalPercent}%.`
      : `Tongue necrosis at admission: ${window.necrosisAtAdmissionPercent}% of dogs in this group; necrosis developing during hospitalisation: ${window.necrosisInHospitalPercent}%.`;
  return (
    <ResultPanel tone={window.group === 'over-6h' ? 'rose' : 'teal'}>
      <p className="text-lg font-bold text-ink">{tr(FLUSH_GROUP_LABEL[window.group], lang)}</p>
      <p className="tnum">{body}</p>
      <p className="text-xs text-muted">{tr(CATERPILLAR.limits, lang)}</p>
      <p className="text-[11px] text-muted" dir="ltr">
        Pouzot-Nevoret 2017
      </p>
    </ResultPanel>
  );
}

export function CaterpillarWindow() {
  const { lang } = useI18n();
  const [hoursText, setHoursText] = useState('');
  const hours = parseNumber(hoursText);
  return (
    <HelperCard title={CATERPILLAR.title}>
      <NumberField label={tr(CATERPILLAR.hours, lang)} value={hoursText} onChange={setHoursText} placeholder="0" />
      {hours === null || hours < 0 ? <ResultPanel>{tr(CATERPILLAR.enter, lang)}</ResultPanel> : <CaterpillarResult hours={hours} />}
    </HelperCard>
  );
}

/* -------------------------------------------------- anticholinesterase --- */

const CHOLINERGIC = {
  title: L('חלון תסמונת הביניים', 'Intermediate-syndrome window'),
  hours: L('שעות מאז המשבר הכולינרגי', 'Hours since the cholinergic crisis'),
  enter: L('הזינו את מספר השעות.', 'Enter the number of hours.'),
  limits: L(
    'החלון מתאר מתי התסמונת מופיעה בדרך כלל; הוא אינו שולל או מאשר אותה בכלב הבודד.',
    'The window describes when the syndrome typically appears; it neither rules it in nor out for an individual dog.',
  ),
};

const PHASE_TEXT: Record<CholinergicPhase, LocalizedText> = {
  'before-window': L(
    'לפני חלון 7–96 השעות שבו תסמונת הביניים מופיעה בדרך כלל.',
    'Before the 7–96 hour window in which intermediate syndrome typically appears.',
  ),
  'in-window': L(
    'בתוך חלון 7–96 השעות: יש לעקוב אחר חולשת גפיים קרובות, צוואר ושרירי נשימה.',
    'Inside the 7–96 hour window: watch for weakness of the proximal limbs, neck and respiratory muscles.',
  ),
  'after-window': L(
    'לאחר חלון 7–96 השעות שבו תסמונת הביניים מופיעה בדרך כלל.',
    'After the 7–96 hour window in which intermediate syndrome typically appears.',
  ),
};

export function CholinergicWindow() {
  const { lang } = useI18n();
  const [hoursText, setHoursText] = useState('');
  const hours = parseNumber(hoursText);
  const phase = hours === null || hours < 0 ? null : cholinergicTimeline(hours).phase;
  return (
    <HelperCard title={CHOLINERGIC.title}>
      <NumberField label={tr(CHOLINERGIC.hours, lang)} value={hoursText} onChange={setHoursText} placeholder="0" />
      {phase === null ? (
        <ResultPanel>{tr(CHOLINERGIC.enter, lang)}</ResultPanel>
      ) : (
        <ResultPanel tone={phase === 'in-window' ? 'amber' : 'neutral'}>
          <p className="font-medium text-ink">{tr(PHASE_TEXT[phase], lang)}</p>
          <p className="text-xs text-muted">{tr(CHOLINERGIC.limits, lang)}</p>
          <p className="text-[11px] text-muted" dir="ltr">
            Klainbart 2022
          </p>
        </ResultPanel>
      )}
    </HelperCard>
  );
}
