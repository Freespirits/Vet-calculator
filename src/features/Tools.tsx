import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useHashRoute, type ToolId } from '../hooks/useHashRoute';
import { SegmentedControl } from '../components/primitives';
import { DosageCalculator } from './dosage/DosageCalculator';
import { ToxinSuite } from './toxins/ToxinSuite';
import { PatientSession } from './patient/PatientSession';
import { PatientSessionProvider } from './patient/PatientSessionContext';
import { PlantLibrary } from './plants/PlantLibrary';
import { CodeBlue } from './cpr/CodeBlue';
import { EmergencySuite } from './er/EmergencySuite';
import { SyringeIcon, AlertTriangleIcon, PawIcon, FlowerIcon, HeartPulseIcon } from '../components/Icons';

/**
 * Emergency entry to Code Blue. It sits above the calculator tabs (never
 * inside them) so it is reachable in one tap from any tool, and it is
 * deep-linkable at #/cpr.
 */
function CodeBlueButton({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-current={active ? 'page' : undefined}
      className={`mx-auto mb-3 flex min-h-[56px] w-full max-w-md items-center gap-3 rounded-2xl border px-4 py-2.5 text-start transition-colors ${
        active ? 'border-rose bg-rose/25' : 'border-rose/40 bg-rose/10 hover:bg-rose/20'
      }`}
    >
      <HeartPulseIcon size={24} className="shrink-0 text-rose" />
      <span className="min-w-0">
        <span className="block text-sm font-bold text-ink">{t('cpr.open')}</span>
        <span className="block text-xs leading-snug text-muted">{t('cpr.open.hint')}</span>
      </span>
    </button>
  );
}

export function Tools() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  // Deep-linkable: #/dosage, #/patient, #/tox/<id>, #/plants/<id>, #/er/<id>, #/cpr.
  const { tool: routeTool, sub, navigate } = useHashRoute();
  const tool: ToolId = routeTool ?? 'dosage';

  // Arriving on a deep link: bring the tools into view (the URL hash has no
  // matching element id, so the browser won't have scrolled by itself).
  const landedOnDeepLink = useRef(routeTool !== null);
  useEffect(() => {
    if (!landedOnDeepLink.current) return;
    landedOnDeepLink.current = false;
    document.getElementById('tools')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <PatientSessionProvider>
    <section id="tools" className="mx-auto w-full max-w-2xl scroll-mt-20 px-4 py-10">
      <CodeBlueButton active={tool === 'cpr'} onOpen={() => navigate('cpr')} />
      <div className="mx-auto mb-6 max-w-lg">
        <SegmentedControl
          size="lg"
          ariaLabel={t('tabs.aria')}
          options={[
            { value: 'dosage', label: t('tab.dosage'), icon: <SyringeIcon size={18} /> },
            { value: 'patient', label: t('tab.patient'), icon: <PawIcon size={18} /> },
            { value: 'toxins', label: t('tab.toxins'), icon: <AlertTriangleIcon size={18} /> },
            { value: 'plants', label: t('tab.plants'), icon: <FlowerIcon size={18} /> },
            { value: 'er', label: t('tab.er'), icon: <HeartPulseIcon size={18} /> },
          ]}
          compact
          value={tool}
          onChange={(next) => navigate(next)}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tool}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {tool === 'dosage' && <DosageCalculator />}
          {tool === 'patient' && <PatientSession onAddMedication={() => navigate('dosage')} />}
          {tool === 'toxins' && (
            <ToxinSuite selectedId={sub} onSelect={(id) => navigate('toxins', id)} />
          )}
          {tool === 'plants' && (
            <PlantLibrary selectedId={sub} onSelect={(id) => navigate('plants', id)} />
          )}
          {tool === 'er' && <EmergencySuite selectedId={sub} onSelect={(id) => navigate('er', id)} />}
          {tool === 'cpr' && <CodeBlue />}
        </motion.div>
      </AnimatePresence>
    </section>
    </PatientSessionProvider>
  );
}
