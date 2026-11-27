/**
 * MDR1 (P-glycoprotein) check, shown in the dosage calculator under the drug
 * reference whenever the selected drug has species-specific published MDR1
 * evidence (see `data/mdr1.ts`). For any other drug it renders nothing.
 *
 * The card asks for two optional facts — breed (dogs only) and MDR1 genotype —
 * and then shows, in this order: a headline coloured by level, what was
 * observed, the kind of evidence, what the published review recommends, the
 * breed's published mutation frequency, and the sources. A percentage dose
 * reduction appears only for a tested dog; nothing is inferred from breed.
 *
 * Breed and genotype are remembered on the active patient session, so they
 * follow the patient across drugs; without a session they live only while the
 * calculator is open.
 */
import { useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type LocalizedText } from '../../types/toxins';
import type { Lang } from '../../i18n/languages';
import type { Species } from '../../types';
import { SelectField } from '../../components/forms';
import { SourceList } from '../../components/feedback';
import { ShieldIcon } from '../../components/Icons';
import { usePatientSessionContext } from '../patient/PatientSessionContext';
import { assessMdr1, type Mdr1Assessment, type Mdr1Level } from '../../lib/mdr1';
import {
  FELINE_MUTATION_FREQUENCY_TEXT,
  MDR1_BREEDS,
  type Mdr1Genotype,
  type Mdr1Guidance,
} from '../../data/mdr1';

const TEXT = {
  title: L('בדיקת MDR1 (P-glycoprotein)', 'MDR1 (P-glycoprotein) check'),
  breed: L('גזע', 'Breed'),
  breedNone: L('לא צוין / לא ברשימה', 'Not specified / not on the list'),
  genotype: L('גנוטיפ MDR1', 'MDR1 genotype'),
  evidence: L('סוג הראיות', 'Evidence'),
  footer: L(
    'סיכום של מחקרים שפורסמו, לאנשי מקצוע וטרינריים. אינו מחליף בדיקת גנוטיפ או שיקול דעת קליני.',
    'A summary of published studies for veterinary professionals. It does not replace a genotype test or clinical judgment.',
  ),
  normalNote: L(
    'חסר תפקודי של P-glycoprotein עדיין יכול להיווצר כששתי תרופות שהן סובסטרט ניתנות יחד.',
    'P-glycoprotein dysfunction can still be acquired when two substrate drugs are given together.',
  ),
  unknownNoBreed: L(
    'הגנוטיפ אינו ידוע. המוטציה אינה מוגבלת לגזעי רועים — היא נמצאת בכ-5% מהכלבים המעורבים.',
    'Genotype not known. The mutation is not limited to herding breeds — it is found in about 5% of mixed-breed dogs.',
  ),
  unknownCat: L(
    `המוטציה החתולית מוערכת ב-${FELINE_MUTATION_FREQUENCY_TEXT} מהחתולים; לא ידועה נטייה גזעית.`,
    `The feline mutation is estimated in ${FELINE_MUTATION_FREQUENCY_TEXT} of cats; no breed predilection is known.`,
  ),
  testSettles: L('בדיקת גנוטיפ מכריעה את השאלה.', 'A genotype test settles the question.'),
};

const GENOTYPE_LABEL: Record<Mdr1Genotype, LocalizedText> = {
  unknown: L('לא נבדק / לא ידוע', 'Not tested / unknown'),
  normal: L('תקין / תקין', 'Normal / normal'),
  'one-copy': L('מוטנט / תקין (עותק אחד)', 'Mutant / normal (one copy)'),
  'two-copies': L('מוטנט / מוטנט (שני עותקים)', 'Mutant / mutant (two copies)'),
};

const HEADLINE: Record<Mdr1Level, LocalizedText> = {
  danger: L('MDR1: סיכון גבוה עם תרופה זו', 'MDR1: high risk with this drug'),
  warning: L('MDR1: נדרשת זהירות עם תרופה זו', 'MDR1: caution with this drug'),
  info: L('MDR1: קיימות ראיות שפורסמו לתרופה זו', 'MDR1: published evidence exists for this drug'),
  none: L('MDR1: גנוטיפ תקין — אין שינוי הקשור ל-MDR1', 'MDR1: genotype normal — no MDR1-related change'),
};

const RECOMMENDATION: Record<Exclude<Mdr1Guidance, 'reduce' | 'studied-safe'>, LocalizedText> = {
  avoid: L(
    'לכלבים עם המוטציה אין נתונים התומכים במינון מופחת בטוח; הסקירה ממליצה להשתמש בתרופה חלופית.',
    'For dogs with the mutation there are no data supporting a safe reduced dose; the review advises using an alternative drug.',
  ),
  'dose-dependent': L(
    'מינוני התווית למניעת תולעת הלב נמצאו בטוחים גם בשני עותקים. אין לתת מינונים חוץ-תוויתיים גבוהים לכלב עם המוטציה או שמצבו אינו ידוע — יש לבחור חלופה.',
    'Heartworm-prevention label doses were safe even with two copies. High extra-label doses should not be given to a dog with the mutation or of unknown status — choose an alternative.',
  ),
  monitor: L(
    'לא פורסמה הנחיית מינון ייעודית. יש לנטר בקפידה להשפעה מוגברת או ממושכת.',
    'No drug-specific dose guidance is published. Monitor closely for exaggerated or prolonged effects.',
  ),
};

const LEVEL_STYLE: Record<Mdr1Level, string> = {
  danger: 'border-rose/45 bg-rose/10 text-rose',
  warning: 'border-amber/45 bg-amber/10 text-amber',
  info: 'border-teal/30 bg-teal/[0.08] text-teal',
  none: 'border-emerald/30 bg-emerald/[0.08] text-emerald',
};

function reduceText(assessment: Mdr1Assessment, lang: Lang): string {
  const percent = assessment.reductionPercent;
  if (percent === undefined) {
    return tr(
      L(
        'אם הכלב נושא את המוטציה, נקודת הפתיחה הכללית בסקירה היא הפחתה של 25% בעותק אחד ושל 50% בשני עותקים.',
        'If the dog carries the mutation, the review’s general starting point is a 25% reduction with one copy and 50% with two.',
      ),
      lang,
    );
  }
  return tr(
    L(
      `נקודת הפתיחה הכללית בסקירה: להפחית את המינון ב-${percent}%, ולהעלות בצעדים של 10% רק אם יש צורך והמנה הקודמת נסבלה היטב.`,
      `The review’s general starting point: reduce the dose by ${percent}%, then increase in 10% steps only if needed and the previous dose was well tolerated.`,
    ),
    lang,
  );
}

function recommendationText(assessment: Mdr1Assessment, lang: Lang): string | null {
  const { guidance } = assessment.rule;
  if (guidance === 'studied-safe') return null;
  if (assessment.genotype === 'normal') return tr(TEXT.normalNote, lang);
  return guidance === 'reduce' ? reduceText(assessment, lang) : tr(RECOMMENDATION[guidance], lang);
}

/**
 * Wraps a left-to-right fragment (e.g. "<5%") in Unicode isolate marks so that
 * right-to-left text cannot mirror its "<" into ">" or reorder it.
 */
function isolateLtr(text: string): string {
  return `\u2066${text}\u2069`;
}

function breedText(assessment: Mdr1Assessment, lang: Lang): string {
  const { breed } = assessment;
  if (!breed) return tr(TEXT.unknownNoBreed, lang);
  const frequency = isolateLtr(breed.frequencyText);
  const israel =
    breed.israelAllelePercent === undefined
      ? ''
      : tr(
          L(
            ` ישראל, שכיחות האלל המוטנטי: ${breed.israelAllelePercent}% (Dekel ועמיתים 2017).`,
            ` Israel, mutant-allele frequency: ${breed.israelAllelePercent}% (Dekel et al. 2017).`,
          ),
          lang,
        );
  const lead = tr(
    L(
      `הגנוטיפ אינו ידוע. שכיחות המוטציה שפורסמה ל${breed.name.he}: ${frequency} (Mealey ועמיתים 2023).`,
      `Genotype not known. Published frequency of the mutation in the ${breed.name.en}: ${frequency} (Mealey et al. 2023).`,
    ),
    lang,
  );
  return `${lead}${israel} ${tr(TEXT.testSettles, lang)}`;
}

/** Extra line shown only while the genotype is unknown. */
function unknownGenotypeText(assessment: Mdr1Assessment, species: Species, lang: Lang): string | null {
  if (assessment.genotype !== 'unknown' || assessment.rule.guidance === 'studied-safe') return null;
  return species === 'cat' ? tr(TEXT.unknownCat, lang) : breedText(assessment, lang);
}

interface Mdr1Profile {
  breedId: string | null;
  genotype: Mdr1Genotype;
}

function knownBreedId(breedId: string | null | undefined): string | null {
  if (!breedId) return null;
  if (MDR1_BREEDS.some((breed) => breed.id === breedId)) return breedId;
  console.warn(`MDR1 check: saved breed id "${breedId}" is not on the published list; ignoring it.`);
  return null;
}

/** Breed + genotype, stored on the active patient when there is one, otherwise in the card. */
function useMdr1Profile(): Mdr1Profile & { update: (changes: Partial<Mdr1Profile>) => void } {
  const { session, updatePatient } = usePatientSessionContext();
  const [local, setLocal] = useState<Mdr1Profile>({ breedId: null, genotype: 'unknown' });
  if (!session) {
    return { ...local, update: (changes) => setLocal((previous) => ({ ...previous, ...changes })) };
  }
  const update = (changes: Partial<Mdr1Profile>) =>
    updatePatient({
      ...('breedId' in changes ? { breedId: changes.breedId } : {}),
      ...('genotype' in changes ? { mdr1Genotype: changes.genotype } : {}),
    });
  return {
    breedId: knownBreedId(session.patient.breedId),
    genotype: session.patient.mdr1Genotype ?? 'unknown',
    update,
  };
}

function ProfileFields({ species, profile }: { species: Species; profile: ReturnType<typeof useMdr1Profile> }) {
  const { lang } = useI18n();
  const breedOptions = [
    { value: '', label: tr(TEXT.breedNone, lang) },
    ...MDR1_BREEDS.map((breed) => ({ value: breed.id, label: tr(breed.name, lang) })),
  ];
  const genotypeOptions = (Object.keys(GENOTYPE_LABEL) as Mdr1Genotype[]).map((value) => ({
    value,
    label: tr(GENOTYPE_LABEL[value], lang),
  }));
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {species === 'dog' && (
        <SelectField
          label={tr(TEXT.breed, lang)}
          value={profile.breedId ?? ''}
          onChange={(value) => profile.update({ breedId: value === '' ? null : value })}
          options={breedOptions}
        />
      )}
      <SelectField
        label={tr(TEXT.genotype, lang)}
        value={profile.genotype}
        onChange={(value) => profile.update({ genotype: value as Mdr1Genotype })}
        options={genotypeOptions}
      />
    </div>
  );
}

function AssessmentBody({ assessment, species }: { assessment: Mdr1Assessment; species: Species }) {
  const { lang } = useI18n();
  const recommendation = recommendationText(assessment, lang);
  const unknownLine = unknownGenotypeText(assessment, species, lang);
  return (
    <div className="flex flex-col gap-1.5 text-sm leading-relaxed text-ink/90">
      <p>{tr(assessment.rule.finding, lang)}</p>
      <p className="text-xs text-muted">
        {tr(TEXT.evidence, lang)}: {tr(assessment.rule.evidence, lang)}
      </p>
      {recommendation && <p className="font-medium text-ink">{recommendation}</p>}
      {unknownLine && <p className="text-xs text-muted">{unknownLine}</p>}
    </div>
  );
}

export function Mdr1Card({ species, drugId }: { species: Species; drugId: string | null }) {
  const { lang } = useI18n();
  const profile = useMdr1Profile();
  const breedId = species === 'dog' ? profile.breedId : null;
  const assessment = assessMdr1({ species, drugId, breedId, genotype: profile.genotype });
  if (!assessment) return null;
  const tone = LEVEL_STYLE[assessment.level];
  return (
    <section aria-label={tr(TEXT.title, lang)} className={`flex flex-col gap-3 rounded-2xl border p-3.5 ${tone}`}>
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <ShieldIcon size={16} className="shrink-0" />
        {tr(HEADLINE[assessment.level], lang)}
      </h3>
      <ProfileFields species={species} profile={profile} />
      <AssessmentBody assessment={assessment} species={species} />
      <SourceList sources={assessment.rule.sources} />
      <p className="text-[11px] leading-relaxed text-muted">{tr(TEXT.footer, lang)}</p>
    </section>
  );
}
