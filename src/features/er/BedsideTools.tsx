/**
 * Bedside calculators in the emergency & critical-care suite.
 *
 *  - ShockIndexTool      heart rate ÷ systolic pressure against the published
 *                        canine cut-off of 1.0.
 *  - FelineGrimaceTool   five facial units scored 0–2 (or "not possible to
 *                        score") → score from 0 to 1 against the 0.39 cut-off.
 *  - TransfusionTool     volume for a desired PCV rise, with the formula that
 *                        performed best for the species.
 *  - InfusionTool        pump rate from a dose rate and a concentration —
 *                        arithmetic only, no drug data.
 *
 * Each tool shows its result live, says what the cited study did and did not
 * establish, and is wrapped in TopicShell so the reference and the standing
 * notice are always present. A value the calculator rejects is explained in
 * words in place of a result.
 */
import { useState, type ReactNode } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr } from '../../types/toxins';
import type { Species } from '../../types';
import { GlassCard, SegmentedControl } from '../../components/primitives';
import { NumberField, SelectField } from '../../components/forms';
import { CatIcon, DogIcon } from '../../components/Icons';
import { formatAmount } from '../../cpr/cprSheet';
import { SHOCK_INDEX_CUTOFF, SHOCK_INDEX_SOURCE, shockIndex } from '../../critical/shockIndex';
import {
  FGS_ACTION_UNITS,
  FGS_CUTOFF,
  FGS_SOURCE,
  scoreFelineGrimace,
  type FgsUnitId,
  type FgsUnitScore,
} from '../../critical/felineGrimace';
import { TRANSFUSION_SOURCES, transfusionVolume } from '../../critical/transfusion';
import { INFUSION_DOSE_UNITS, infusionRate, type InfusionDoseUnit } from '../../critical/infusion';
import type { FactSection } from '../../emergencies/types';
import { FactSections, ResultPanel, TopicShell } from './TopicParts';
import { parseNumber } from './inputs';
import { BEDSIDE_META } from './bedsideMeta';

function Card({ children }: { children: ReactNode }) {
  return <GlassCard className="flex flex-col gap-3 p-4">{children}</GlassCard>;
}

/** Runs a calculation; a rejected input becomes an explanatory message instead of a crash. */
function attempt<T>(calculate: () => T): { value: T } | { error: string } {
  try {
    return { value: calculate() };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

const COMMON = {
  enterValues: L('הזינו את הערכים כדי לקבל תוצאה.', 'Enter the values to see a result.'),
};

/* --------------------------------------------------------- shock index --- */

const SHOCK = {
  heartRate: L('דופק (לדקה)', 'Heart rate (per minute)'),
  systolic: L('לחץ דם סיסטולי (ממ"כ)', 'Systolic blood pressure (mm Hg)'),
  above: L(`מעל הסף של ${SHOCK_INDEX_CUTOFF.toFixed(1)}`, `Above the cut-off of ${SHOCK_INDEX_CUTOFF.toFixed(1)}`),
  below: L(`מתחת לסף של ${SHOCK_INDEX_CUTOFF.toFixed(1)}`, `Below the cut-off of ${SHOCK_INDEX_CUTOFF.toFixed(1)}`),
  at: L(`בדיוק על הסף של ${SHOCK_INDEX_CUTOFF.toFixed(1)}`, `Exactly at the cut-off of ${SHOCK_INDEX_CUTOFF.toFixed(1)}`),
  limits: L(
    'המדד נבדק בכלבים בלבד, ואינו אבחנה: יש לשלב אותו עם הבדיקה הקלינית.',
    'The index was studied in dogs only and is not a diagnosis: read it together with the clinical examination.',
  ),
};

const SHOCK_FACTS: FactSection[] = [
  {
    title: L('מה נמצא במחקר', 'What the study found'),
    facts: [
      {
        text: L(
          'חציון המדד: 1.37 בכלבים שהוערכו כנמצאים בהלם, 0.73 בכלבי חירום שלא בהלם ו-0.78 בכלבים בריאים.',
          'Median index: 1.37 in dogs judged to be in shock, 0.73 in emergency dogs not in shock and 0.78 in healthy dogs.',
        ),
        cite: 'Porter 2013',
      },
      {
        text: L(
          'סף של 1.0 הבחין בין הלם לכלבים בריאים ברגישות 90% וסגוליות 89%, ובין הלם לכלבי חירום שלא בהלם ברגישות 89% וסגוליות 95%.',
          'A cut-off of 1.0 separated shock from healthy dogs with 90% sensitivity and 89% specificity, and shock from emergency dogs not in shock with 89% sensitivity and 95% specificity.',
        ),
        cite: 'Porter 2013',
      },
      {
        text: L(
          'המחקר כלל 68 כלבים בריאים ו-37 כלבי חירום במרכז אחד.',
          'The study included 68 healthy dogs and 37 emergency dogs at a single centre.',
        ),
        cite: 'Porter 2013',
      },
    ],
  },
];

export function ShockIndexTool() {
  const { lang } = useI18n();
  const [heartRateText, setHeartRateText] = useState('');
  const [systolicText, setSystolicText] = useState('');
  const heartRate = parseNumber(heartRateText);
  const systolic = parseNumber(systolicText);
  const outcome =
    heartRate === null || systolic === null
      ? null
      : attempt(() => shockIndex({ heartRatePerMinute: heartRate, systolicMmHg: systolic }));
  return (
    <TopicShell name={BEDSIDE_META['shock-index'].name} sources={[SHOCK_INDEX_SOURCE]}>
      <Card>
        <NumberField label={tr(SHOCK.heartRate, lang)} value={heartRateText} onChange={setHeartRateText} placeholder="—" />
        <NumberField label={tr(SHOCK.systolic, lang)} value={systolicText} onChange={setSystolicText} placeholder="—" />
        {outcome === null && <ResultPanel>{tr(COMMON.enterValues, lang)}</ResultPanel>}
        {outcome && 'error' in outcome && <ResultPanel tone="amber">{outcome.error}</ResultPanel>}
        {outcome && 'value' in outcome && (
          <ResultPanel tone={outcome.value.position === 'above' ? 'rose' : 'teal'}>
            <p className="tnum text-result font-bold text-ink" dir="ltr">
              {outcome.value.index.toFixed(2)}
            </p>
            <p className="font-semibold text-ink">{tr(SHOCK[outcome.value.position], lang)}</p>
            <p className="text-xs text-muted">{tr(SHOCK.limits, lang)}</p>
          </ResultPanel>
        )}
      </Card>
      <FactSections sections={SHOCK_FACTS} />
    </TopicShell>
  );
}

/* ------------------------------------------------ feline grimace scale --- */

const FGS = {
  notAnswered: L('—', '—'),
  absent: L('0 — לא קיים', '0 — absent'),
  moderate: L('1 — קיים במידה בינונית, או שיש ספק', '1 — moderately present, or unsure'),
  obvious: L('2 — קיים בבירור', '2 — obviously present'),
  unscorable: L('לא ניתן לדרג', 'Not possible to score'),
  answerAll: L('ענו על כל חמשת המאפיינים כדי לקבל ציון.', 'Answer all five units to see a score.'),
  tooMany: L(
    'יותר משני מאפיינים שלא ניתן לדרג — לפי המאמר אין לחשב ציון.',
    'More than two units could not be scored — per the paper, no score is calculated.',
  ),
  above: L(`מעל הסף של ${FGS_CUTOFF} — במחקר זה היה הסף למתן משכך כאבים.`, `Above the cut-off of ${FGS_CUTOFF} — in the study this was the threshold for rescue analgesia.`),
  notAbove: L(`לא מעל הסף של ${FGS_CUTOFF}.`, `Not above the cut-off of ${FGS_CUTOFF}.`),
  limits: L(
    'הסף הוא מדריך ולא החלטה: המחברים מציינים שניתן לבחור ערך אחר, ושהסולם תוקף על תמונות של חתולים שלא הופרעו.',
    'The cut-off is a guide, not a decision: the authors note other values can be chosen, and that the scale was validated on images of undisturbed cats.',
  ),
};

const FGS_FACTS: FactSection[] = [
  {
    title: L('תיקוף', 'Validation'),
    facts: [
      {
        text: L(
          '55 חתולים (35 בעלי כאב ו-20 ביקורת), 110 תמונות, ארבעה מדרגים: מתאם חזק מאוד עם סולם כאב מתוקף אחר (rho = 0.86) ומהימנות טובה בין מדרגים (ICC = 0.89).',
          '55 cats (35 painful, 20 controls), 110 images, four raters: very strong correlation with another validated pain scale (rho = 0.86) and good agreement between raters (ICC = 0.89).',
        ),
        cite: 'Evangelista 2019',
      },
      {
        text: L(
          'ציון מעל 0.39 הבחין בין כאב להיעדר כאב ברגישות 90.7% ובסגוליות 86.6%; הציונים ירדו לאחר מתן משכך כאבים.',
          'A score above 0.39 separated pain from no pain with 90.7% sensitivity and 86.6% specificity; scores fell after analgesia.',
        ),
        cite: 'Evangelista 2019',
      },
    ],
  },
];

type FgsAnswers = Partial<Record<FgsUnitId, FgsUnitScore>>;

function parseFgsAnswer(value: string): FgsUnitScore | undefined {
  if (value === '') return undefined;
  return value === 'x' ? null : (Number(value) as 0 | 1 | 2);
}

function fgsAnswerValue(answer: FgsUnitScore | undefined): string {
  if (answer === undefined) return '';
  return answer === null ? 'x' : String(answer);
}

function FgsResultPanel({ answers }: { answers: FgsAnswers }) {
  const { lang } = useI18n();
  const result = scoreFelineGrimace(answers);
  if (!result.scorable || result.score === undefined) {
    const tooMany = result.unscorableCount > 2;
    return <ResultPanel tone={tooMany ? 'amber' : 'neutral'}>{tr(tooMany ? FGS.tooMany : FGS.answerAll, lang)}</ResultPanel>;
  }
  return (
    <ResultPanel tone={result.aboveCutoff ? 'rose' : 'teal'}>
      <p className="tnum text-result font-bold text-ink" dir="ltr">
        {result.score.toFixed(2)}
      </p>
      <p className="font-semibold text-ink">{tr(result.aboveCutoff ? FGS.above : FGS.notAbove, lang)}</p>
      <p className="text-xs text-muted">{tr(FGS.limits, lang)}</p>
    </ResultPanel>
  );
}

export function FelineGrimaceTool() {
  const { lang } = useI18n();
  const [answers, setAnswers] = useState<FgsAnswers>({});
  const options = [
    { value: '', label: tr(FGS.notAnswered, lang) },
    { value: '0', label: tr(FGS.absent, lang) },
    { value: '1', label: tr(FGS.moderate, lang) },
    { value: '2', label: tr(FGS.obvious, lang) },
    { value: 'x', label: tr(FGS.unscorable, lang) },
  ];
  const setAnswer = (unitId: FgsUnitId, value: string) =>
    setAnswers((previous) => {
      const next = { ...previous };
      const parsed = parseFgsAnswer(value);
      if (parsed === undefined) delete next[unitId];
      else next[unitId] = parsed;
      return next;
    });
  return (
    <TopicShell name={BEDSIDE_META['feline-grimace'].name} sources={[FGS_SOURCE]}>
      <Card>
        {FGS_ACTION_UNITS.map((unit) => (
          <div key={unit.id} className="flex flex-col gap-1">
            <SelectField
              label={tr(unit.name, lang)}
              value={fgsAnswerValue(answers[unit.id])}
              onChange={(value) => setAnswer(unit.id, value)}
              options={options}
            />
            <p className="text-xs leading-relaxed text-muted">{tr(unit.painful, lang)}</p>
          </div>
        ))}
        <FgsResultPanel answers={answers} />
      </Card>
      <FactSections sections={FGS_FACTS} />
    </TopicShell>
  );
}

/* --------------------------------------------------------- transfusion --- */

const TRANSFUSION = {
  currentPcv: L('המטוקריט נוכחי (%)', 'Current PCV (%)'),
  targetPcv: L('המטוקריט רצוי (%)', 'Target PCV (%)'),
  donorPcv: L('המטוקריט מנת התורם (%) — לא חובה', 'Donor unit PCV (%) — optional'),
  dogProduct: L('כדוריות דם אדומות דחוסות', 'packed red blood cells'),
  catProduct: L('דם מלא', 'whole blood'),
  donorFormula: L('לפי נוסחת המטוקריט התורם', 'By the donor-PCV formula'),
  catCaveat: L(
    'בחתולים אף נוסחה לא הייתה מדויקת מאוד; המחברים מדגישים טווחי סמך רחבים.',
    'In cats no formula was highly accurate; the authors stress the wide confidence intervals.',
  ),
  limits: L(
    'המחשבון קובע נפח בלבד. הוא אינו עוסק בסוג דם, בהצלבה, בקצב המתן או בשאלה אם יש התוויה לעירוי.',
    'The calculator sizes a volume only. It does not cover blood typing, cross-matching, the rate of administration, or whether a transfusion is indicated.',
  ),
};

const TRANSFUSION_FACTS: FactSection[] = [
  {
    title: L('הנוסחאות', 'The formulas'),
    facts: [
      {
        text: L(
          'כלבים, 31 עירויים של כדוריות דחוסות: שתי נוסחאות חזו היטב את העלייה בפועל — 1.5 מ"ל × עליית ההמטוקריט הרצויה × ק"ג, ו-90 מ"ל × ק"ג × (רצוי פחות נוכחי) חלקי המטוקריט התורם.',
          'Dogs, 31 packed-cell transfusions: two formulas predicted the actual rise well — 1.5 mL × desired PCV rise × kg, and 90 mL × kg × (desired minus recipient) ÷ donor PCV.',
        ),
        cite: 'Short 2012',
      },
      {
        text: L(
          'חתולים, 40 עירויים של דם מלא: הנוסחה שהצליחה ביותר — עליית ההמטוקריט (%) = נפח (מ"ל) חלקי (2 × ק"ג) — אך אף נוסחה לא הייתה מדויקת מאוד.',
          'Cats, 40 whole-blood transfusions: the best-performing formula was PCV rise (%) = volume (mL) ÷ (2 × kg), but no formula was highly accurate.',
        ),
        cite: 'Reed 2014',
      },
    ],
  },
];

function TransfusionResultPanel(props: { species: Species; weightKg: number; currentPcv: number; targetPcv: number; donorPcv?: number }) {
  const { lang } = useI18n();
  const outcome = attempt(() => transfusionVolume(props));
  if ('error' in outcome) return <ResultPanel tone="amber">{outcome.error}</ResultPanel>;
  const { volumeMl, donorFormulaVolumeMl, pcvRise } = outcome.value;
  const product = tr(props.species === 'dog' ? TRANSFUSION.dogProduct : TRANSFUSION.catProduct, lang);
  return (
    <ResultPanel tone="teal">
      <p className="tnum text-result font-bold text-ink" dir="ltr">
        {`${formatAmount(volumeMl)} mL`}
      </p>
      <p className="font-medium text-ink">
        {product} · <bdi dir="ltr">{`+${formatAmount(pcvRise)}%`}</bdi>
      </p>
      {donorFormulaVolumeMl !== undefined && (
        <p className="tnum">
          {tr(TRANSFUSION.donorFormula, lang)}: <bdi dir="ltr">{`${formatAmount(donorFormulaVolumeMl)} mL`}</bdi>
        </p>
      )}
      {props.species === 'cat' && <p className="font-medium text-amber">{tr(TRANSFUSION.catCaveat, lang)}</p>}
      <p className="text-xs text-muted">{tr(TRANSFUSION.limits, lang)}</p>
    </ResultPanel>
  );
}

export function TransfusionTool() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<Species>('dog');
  const [weightText, setWeightText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [donorText, setDonorText] = useState('');
  const weightKg = parseNumber(weightText);
  const currentPcv = parseNumber(currentText);
  const targetPcv = parseNumber(targetText);
  const ready = weightKg !== null && currentPcv !== null && targetPcv !== null;
  const speciesOptions = [
    { value: 'dog' as Species, label: t('species.dog'), icon: <DogIcon size={20} /> },
    { value: 'cat' as Species, label: t('species.cat'), icon: <CatIcon size={20} /> },
  ];
  return (
    <TopicShell name={BEDSIDE_META['transfusion'].name} sources={[TRANSFUSION_SOURCES.dog, TRANSFUSION_SOURCES.cat]}>
      <Card>
        <SegmentedControl ariaLabel={t('species.label')} options={speciesOptions} value={species} onChange={setSpecies} />
        <NumberField label={t('field.weight')} value={weightText} onChange={setWeightText} suffix={t('unit.kg')} placeholder="—" />
        <NumberField label={tr(TRANSFUSION.currentPcv, lang)} value={currentText} onChange={setCurrentText} placeholder="—" />
        <NumberField label={tr(TRANSFUSION.targetPcv, lang)} value={targetText} onChange={setTargetText} placeholder="—" />
        {species === 'dog' && (
          <NumberField label={tr(TRANSFUSION.donorPcv, lang)} value={donorText} onChange={setDonorText} placeholder="—" />
        )}
        {ready ? (
          <TransfusionResultPanel
            species={species}
            weightKg={weightKg}
            currentPcv={currentPcv}
            targetPcv={targetPcv}
            donorPcv={parseNumber(donorText) ?? undefined}
          />
        ) : (
          <ResultPanel>{tr(COMMON.enterValues, lang)}</ResultPanel>
        )}
      </Card>
      <FactSections sections={TRANSFUSION_FACTS} />
    </TopicShell>
  );
}

/* ------------------------------------------------------------ infusion --- */

const INFUSION = {
  doseRate: L('מינון', 'Dose rate'),
  unit: L('יחידה', 'Unit'),
  concentration: L('ריכוז במזרק / בשקית (מ"ג/מ"ל)', 'Concentration in the syringe or bag (mg/mL)'),
  noDoses: L(
    'המחשבון אינו מכיל מינוני תרופות: המינון מגיע מהפורמולר שלכם, והריכוז הוא זה שהכנתם בפועל. הוא ממיר יחידות בלבד.',
    'This calculator contains no drug doses: the dose rate comes from your own formulary and the concentration is the one you actually prepared. It converts units only.',
  ),
  formula: L(
    'מ"ג לשעה = מינון × משקל (בהמרה למ"ג ולשעות); מ"ל לשעה = מ"ג לשעה חלקי הריכוז.',
    'mg per hour = dose rate × weight (converted to mg and hours); mL per hour = mg per hour ÷ concentration.',
  ),
};

export function InfusionTool() {
  const { t, lang } = useI18n();
  const [doseText, setDoseText] = useState('');
  const [doseUnit, setDoseUnit] = useState<InfusionDoseUnit>('µg/kg/min');
  const [weightText, setWeightText] = useState('');
  const [concentrationText, setConcentrationText] = useState('');
  const dose = parseNumber(doseText);
  const weightKg = parseNumber(weightText);
  const concentration = parseNumber(concentrationText);
  const outcome =
    dose === null || weightKg === null || concentration === null
      ? null
      : attempt(() => infusionRate({ dose, doseUnit, weightKg, concentrationMgPerMl: concentration }));
  return (
    <TopicShell name={BEDSIDE_META['infusion'].name} sources={[]}>
      <Card>
        <p className="text-sm leading-relaxed text-ink/90">{tr(INFUSION.noDoses, lang)}</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <NumberField label={tr(INFUSION.doseRate, lang)} value={doseText} onChange={setDoseText} placeholder="—" />
          </div>
          <SelectField
            label={tr(INFUSION.unit, lang)}
            value={doseUnit}
            onChange={(value) => setDoseUnit(value as InfusionDoseUnit)}
            options={INFUSION_DOSE_UNITS.map((unit) => ({ value: unit, label: unit }))}
          />
        </div>
        <NumberField label={t('field.weight')} value={weightText} onChange={setWeightText} suffix={t('unit.kg')} placeholder="—" />
        <NumberField label={tr(INFUSION.concentration, lang)} value={concentrationText} onChange={setConcentrationText} placeholder="—" />
        {outcome === null && <ResultPanel>{tr(COMMON.enterValues, lang)}</ResultPanel>}
        {outcome && 'error' in outcome && <ResultPanel tone="amber">{outcome.error}</ResultPanel>}
        {outcome && 'value' in outcome && (
          <ResultPanel tone="teal">
            <p className="tnum text-result font-bold text-ink" dir="ltr">
              {`${formatAmount(outcome.value.millilitersPerHour)} mL/h`}
            </p>
            <p className="tnum font-medium text-ink" dir="ltr">
              {`${formatAmount(outcome.value.milligramsPerHour)} mg/h`}
            </p>
            <p className="text-xs text-muted">{tr(INFUSION.formula, lang)}</p>
          </ResultPanel>
        )}
      </Card>
    </TopicShell>
  );
}
