/**
 * Code Blue — CPR aid for trained veterinary teams.
 *
 * What the screen does, top to bottom:
 *  1. Acknowledgment gate (first use on a device): states that this is a
 *     timekeeping/calculation aid, that the attending veterinarian stays
 *     responsible, and that the tool is independent of The RECOVER Initiative.
 *     Nothing else is shown until it is accepted.
 *  2. Patient bar: species + weight (pre-filled from the active patient).
 *  3. Code clock: total time, 2-minute cycle countdown, pause timer with the
 *     10-second limit, time since the last vasopressor, compression metronome.
 *  4. Dose sheet: every cited intervention × the patient's weight. Volumes
 *     appear only for vial strengths the clinic entered in the crash cart.
 *  5. Defibrillation energies, crash-cart setup, event log with a copyable
 *     record, cited reference figures and the source attribution.
 *
 * The screen records what the team does; it never chooses or prompts a
 * treatment. All figures come from `src/cpr/recoverGuideline.ts`.
 */
import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import type { Species } from '../../types';
import { GlassCard, SegmentedControl } from '../../components/primitives';
import { NumberField } from '../../components/forms';
import { DogIcon, CatIcon, ScaleIcon, ShieldIcon, HeartPulseIcon } from '../../components/Icons';
import { usePatientSessionContext } from '../patient/PatientSessionContext';
import { buildCprSheet, defibrillationEnergies } from '../../cpr/cprSheet';
import { CPR_TEXT } from './strings';
import { CodeBlueGate, useAcknowledgment } from './CodeBlueGate';
import { CodeClockPanel, useCodeClock } from './CodeClockPanel';
import { CprDoseSheet } from './CprDoseSheet';
import { DefibrillationPanel } from './DefibrillationPanel';
import { CrashCartSetup, useCrashCart } from './CrashCartSetup';
import { CodeLogPanel } from './CodeLogPanel';
import { CprReference } from './CprReference';

function parsePositiveNumber(text: string): number | null {
  const value = Number(text);
  return text.trim() !== '' && Number.isFinite(value) && value > 0 ? value : null;
}

/** Species + weight for the code, seeded from the active patient session when there is one. */
function useCprPatient() {
  const { session } = usePatientSessionContext();
  const [species, setSpecies] = useState<Species>(session?.patient.species ?? 'dog');
  const [weightText, setWeightText] = useState(session ? String(session.patient.weightKg) : '');
  return {
    species,
    setSpecies,
    weightText,
    setWeightText,
    weightKg: parsePositiveNumber(weightText),
    name: session?.patient.name,
  };
}

type CprPatientState = ReturnType<typeof useCprPatient>;

function CodeBlueHeader() {
  const { lang } = useI18n();
  return (
    <header className="text-center">
      <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-ink">
        <HeartPulseIcon size={22} className="text-rose" />
        {tr(CPR_TEXT.title, lang)}
      </h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">{tr(CPR_TEXT.subtitle, lang)}</p>
    </header>
  );
}

function StandingNotice() {
  const { lang } = useI18n();
  return (
    <p className="flex items-start gap-2 rounded-2xl bg-amber/10 px-3.5 py-2.5 text-xs leading-relaxed text-ink/90">
      <ShieldIcon size={16} className="mt-0.5 shrink-0 text-amber" />
      {tr(CPR_TEXT.standingNotice, lang)}
    </p>
  );
}

function PatientBar({ patient }: { patient: CprPatientState }) {
  const { t, lang } = useI18n();
  const speciesOptions = [
    { value: 'dog' as Species, label: t('species.dog'), icon: <DogIcon size={20} /> },
    { value: 'cat' as Species, label: t('species.cat'), icon: <CatIcon size={20} /> },
  ];
  return (
    <GlassCard className="grid gap-3 p-4 sm:grid-cols-2">
      <SegmentedControl
        ariaLabel={t('species.label')}
        options={speciesOptions}
        value={patient.species}
        onChange={patient.setSpecies}
      />
      <NumberField
        label={t('field.weight')}
        icon={<ScaleIcon size={16} />}
        value={patient.weightText}
        onChange={patient.setWeightText}
        suffix={t('unit.kg')}
        placeholder="0.0"
      />
      {patient.name && (
        <p className="text-xs text-muted sm:col-span-2">
          {tr(CPR_TEXT.patientFromSession, lang)}: {patient.name}
        </p>
      )}
    </GlassCard>
  );
}

function CodeBlueWorkspace() {
  const { lang } = useI18n();
  const patient = useCprPatient();
  const { cart, setStrength } = useCrashCart();
  const code = useCodeClock();
  const { species, weightKg } = patient;
  const rows = useMemo(
    () => (weightKg === null ? null : buildCprSheet({ species, weightKg }, cart)),
    [species, weightKg, cart],
  );
  const energies = useMemo(() => (weightKg === null ? null : defibrillationEnergies(weightKg)), [weightKg]);

  return (
    <>
      <StandingNotice />
      <PatientBar patient={patient} />
      <CodeClockPanel code={code} />
      {rows && energies ? (
        <>
          <CprDoseSheet rows={rows} species={species} code={code} />
          <DefibrillationPanel energies={energies} code={code} />
        </>
      ) : (
        <p className="rounded-2xl bg-white/4 px-4 py-3 text-center text-sm text-muted">
          {tr(CPR_TEXT.weightNeeded, lang)}
        </p>
      )}
      <CrashCartSetup cart={cart} onStrength={setStrength} />
      <CodeLogPanel code={code} patient={{ name: patient.name, species, weightKg }} />
      <CprReference />
    </>
  );
}

export function CodeBlue() {
  const { lang } = useI18n();
  const { acknowledged, acknowledge } = useAcknowledgment();
  return (
    <section aria-label={tr(CPR_TEXT.title, lang)} className="flex flex-col gap-4">
      <CodeBlueHeader />
      {acknowledged ? <CodeBlueWorkspace /> : <CodeBlueGate onAccept={acknowledge} />}
    </section>
  );
}
