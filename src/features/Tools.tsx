import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SegmentedControl } from '../components/primitives';
import { DosageCalculator } from './dosage/DosageCalculator';
import { ToxinSuite } from './toxins/ToxinSuite';
import { PatientSession } from './patient/PatientSession';
import { PatientSessionProvider } from './patient/PatientSessionContext';
import { PlantLibrary } from './plants/PlantLibrary';
import { SyringeIcon, AlertTriangleIcon, PawIcon, FlowerIcon } from '../components/Icons';

type Tool = 'dosage' | 'patient' | 'toxins' | 'plants';

export function Tools() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [tool, setTool] = useState<Tool>('dosage');

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
          onChange={setTool}
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
          {tool === 'patient' && <PatientSession />}
          {tool === 'toxins' && <ToxinSuite />}
          {tool === 'plants' && <PlantLibrary />}
        </motion.div>
      </AnimatePresence>
    </section>
    </PatientSessionProvider>
  );
}
