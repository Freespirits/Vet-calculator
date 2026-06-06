import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/LanguageProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TOXIN_REGISTRY } from '../../toxins/registry';
import { tr } from '../../types/toxins';
import { EmergencyBanner } from '../../components/feedback';
import { ToxinArt } from '../../components/ToxinArt';
import { DogIcon, CatIcon, ChevronDownIcon } from '../../components/Icons';

export function ToxinSuite() {
  const { t, lang, dir } = useI18n();
  const reduced = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = TOXIN_REGISTRY.find((e) => e.meta.id === selectedId);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ink">{t('tox.title')}</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">{t('tox.subtitle')}</p>
      </div>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="grid"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {TOXIN_REGISTRY.map((entry, i) => {
              const { meta } = entry;
              return (
                <motion.button
                  key={meta.id}
                  type="button"
                  onClick={() => setSelectedId(meta.id)}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : i * 0.04, duration: 0.4 }}
                  whileHover={reduced ? undefined : { y: -3 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  className="glass group flex items-center gap-3.5 rounded-4xl p-4 text-start"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-transform group-hover:scale-105"
                    style={{ background: `${meta.accent}1F` }}
                  >
                    <ToxinArt id={meta.id} size={40} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-ink">{tr(meta.name, lang)}</span>
                    <span className="block truncate text-xs text-muted">{tr(meta.blurb, lang)}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-muted/70">
                    {meta.species.includes('dog') && <DogIcon size={16} />}
                    {meta.species.includes('cat') && <CatIcon size={16} />}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={`detail-${selected.meta.id}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <ChevronDownIcon size={18} className={dir === 'rtl' ? '-rotate-90' : 'rotate-90'} />
              {t('common.back')}
            </button>
            <selected.Component />
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && <EmergencyBanner compact />}
    </div>
  );
}
