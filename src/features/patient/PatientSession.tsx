/**
 * Patient Session tab (web).
 *
 * Build a patient, collect the doses calculated for them on the Dosage tab,
 * then export a single bilingual medication report. Mirrors the mobile app's
 * multi-medication session.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/LanguageProvider';
import { usePatientSessionContext } from './PatientSessionContext';
import type { Patient } from '../../hooks/usePatientSession';
import type { Species } from '../../types';
import { GlassCard, SegmentedControl } from '../../components/primitives';
import { TextField, NumberField } from '../../components/forms';
import { StatPill } from '../../components/feedback';
import {
  PawIcon,
  ScaleIcon,
  DogIcon,
  CatIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
  RefreshIcon,
  SyringeIcon,
} from '../../components/Icons';

function makePatientId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `pat_${Date.now().toString(36)}`;
}

function NewPatientForm({ onStart }: { onStart: (p: Patient) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>('dog');
  const [weight, setWeight] = useState('');

  const weightKg = parseFloat(weight);
  const valid = name.trim().length > 0 && weightKg > 0;

  const speciesOpts = [
    { value: 'dog' as Species, label: t('species.dog'), icon: <DogIcon size={20} /> },
    { value: 'cat' as Species, label: t('species.cat'), icon: <CatIcon size={20} /> },
  ];

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/15 text-teal">
          <PawIcon size={22} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-ink">{t('patient.title')}</h2>
          <p className="text-sm text-muted">{t('patient.subtitle')}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          onStart({ id: makePatientId(), name: name.trim(), species, weightKg });
        }}
        className="flex flex-col gap-4"
      >
        <TextField
          label={t('patient.name')}
          icon={<PawIcon size={16} />}
          value={name}
          onChange={setName}
          placeholder={t('patient.namePlaceholder')}
        />

        <div>
          <span className="mb-1.5 block text-sm font-medium text-muted">{t('species.label')}</span>
          <SegmentedControl
            ariaLabel={t('species.label')}
            options={speciesOpts}
            value={species}
            onChange={setSpecies}
          />
        </div>

        <NumberField
          label={t('field.weight')}
          icon={<ScaleIcon size={16} />}
          value={weight}
          onChange={setWeight}
          suffix={t('unit.kg')}
          placeholder="0.0"
        />

        <button type="submit" disabled={!valid} className="btn-primary mt-1">
          {t('patient.start')}
        </button>
      </form>
    </GlassCard>
  );
}

export function PatientSession({ onAddMedication }: { onAddMedication?: () => void }) {
  const { t, lang } = useI18n();
  const { session, startSession, endSession, removeMedication, clearMedications, exportReport } =
    usePatientSessionContext();
  const [shared, setShared] = useState(false);

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <NewPatientForm onStart={startSession} />
      </div>
    );
  }

  const { patient, medications } = session;
  const speciesLabel = patient.species === 'cat' ? t('species.cat') : t('species.dog');

  const handleExport = async () => {
    await exportReport(lang);
    if (!canShare) {
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Active patient banner */}
      <GlassCard className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/15 text-teal">
              {patient.species === 'cat' ? <CatIcon size={22} /> : <DogIcon size={22} />}
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted">
                {t('patient.active')}
              </div>
              <h2 className="text-lg font-bold text-ink">{patient.name}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={endSession}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-rose"
          >
            <XIcon size={16} />
            {t('patient.end')}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatPill label={t('species.label')} value={speciesLabel} />
          <StatPill label={t('field.weight')} value={`${patient.weightKg} ${t('unit.kg')}`} />
        </div>
      </GlassCard>

      {/* Medications */}
      <GlassCard className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-ink">{t('patient.meds')}</h3>
          <span className="text-sm text-muted">
            {medications.length} {t('patient.medsCount')}
          </span>
        </div>

        {medications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/4 px-4 py-7 text-center">
            <p className="text-sm text-muted">{t('patient.noMeds')}</p>
            {onAddMedication && (
              <button type="button" onClick={onAddMedication} className="btn-primary">
                <SyringeIcon size={18} />
                {t('patient.addMedCta')}
              </button>
            )}
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            <AnimatePresence initial={false}>
              {medications.map((m) => (
                <motion.li
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-white/4 p-3.5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold text-ink">{m.drugName}</span>
                      <span className="text-xs font-medium text-muted">{m.route}</span>
                    </div>
                    <div className="mt-0.5 text-sm text-muted">
                      <span className="tnum">{m.dosePerKg}</span> {m.doseUnit}
                      {m.volumeMl > 0 && (
                        <>
                          {' · '}
                          {t('patient.draw')} <span className="tnum text-ink">{m.volumeMl.toFixed(2)}</span> {t('unit.ml')}
                        </>
                      )}
                    </div>
                    {m.frequency && <div className="mt-0.5 text-xs text-muted">{m.frequency}</div>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedication(m.id)}
                    aria-label={t('patient.remove')}
                    className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-rose/15 hover:text-rose"
                  >
                    <XIcon size={18} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {medications.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {onAddMedication && (
              <button type="button" onClick={onAddMedication} className="btn-ghost w-full">
                <SyringeIcon size={18} />
                {t('patient.addMedCta')}
              </button>
            )}
            <div className="flex gap-3">
              <button onClick={handleExport} className="btn-primary flex-1">
                {shared ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                {shared ? t('common.copied') : canShare ? t('patient.shareReport') : t('patient.copyReport')}
              </button>
              <button
                type="button"
                onClick={clearMedications}
                className="btn-ghost !px-4"
                aria-label={t('patient.clearAll')}
              >
                <RefreshIcon size={20} />
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
