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
import { SyringeIcon, AlertTriangleIcon, PawIcon, FlowerIcon } from '../components/Icons';

export function Tools() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  // Deep-linkable: #/dosage, #/patient, #/tox/<id>, #/plants/<id>.
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
      <div className="mx-auto mb-6 max-w-md">
        <SegmentedControl
          size="lg"
          ariaLabel={t('tabs.aria')}
          options={[
            { value: 'dosage', label: t('tab.dosage'), icon: <SyringeIcon size={18} /> },
            { value: 'patient', label: t('tab.patient'), icon: <PawIcon size={18} /> },
            { value: 'toxins', label: t('tab.toxins'), icon: <AlertTriangleIcon size={18} /> },
            { value: 'plants', label: t('tab.plants'), icon: <FlowerIcon size={18} /> },
          ]}
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
        </motion.div>
      </AnimatePresence>
    </section>
    </PatientSessionProvider>
  );
}
