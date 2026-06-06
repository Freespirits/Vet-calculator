/**
 * Toxic Plant Library (web).
 *
 * Searchable, filterable catalogue of plants dangerous to dogs and cats, with
 * photos. Mirrors the mobile app's Plants tab (minus the native camera scanner,
 * which has no browser equivalent). Grid → detail, same Aurora design language
 * as the toxin suite.
 */
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/LanguageProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TOXIC_PLANTS, PLANT_LEVEL_COLOR, type ToxicPlant, type PlantToxicityLevel } from '../../data/toxicPlants';
import { tr } from '../../types/toxins';
import { EmergencyBanner } from '../../components/feedback';
import { DogIcon, CatIcon, SearchIcon, ChevronDownIcon, AlertTriangleIcon, FlowerIcon } from '../../components/Icons';

type Filter = 'all' | 'deadly' | 'severe' | 'cats';

/**
 * Plant photo with a graceful fallback. Not every catalogued plant has a
 * staged photo in public/plants/<imageKey>.webp; when the image is missing we
 * render a tinted placeholder keyed to the toxicity colour instead of a broken
 * image.
 */
function PlantImage({ plant, alt, className }: { plant: ToxicPlant; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const color = PLANT_LEVEL_COLOR[plant.toxicityLevel];

  if (failed) {
    return (
      <div
        className={`grid place-items-center ${className ?? ''}`}
        style={{ background: `linear-gradient(135deg, ${color}33, ${color}14)` }}
        aria-label={alt}
        role="img"
      >
        <FlowerIcon size={44} className="opacity-70" style={{ color }} />
      </div>
    );
  }

  return (
    <img
      src={`/plants/${plant.imageKey}.webp`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

const FILTERS: Filter[] = ['all', 'deadly', 'severe', 'cats'];

function isCatOnly(p: ToxicPlant): boolean {
  return p.affectedSpecies.includes('cat') && !p.affectedSpecies.includes('dog') && !p.affectedSpecies.includes('both');
}

function matchesFilter(p: ToxicPlant, f: Filter): boolean {
  switch (f) {
    case 'deadly':
      return p.toxicityLevel === 'deadly';
    case 'severe':
      return p.toxicityLevel === 'severe';
    case 'cats':
      return isCatOnly(p);
    default:
      return true;
  }
}

function LevelBadge({ level, label }: { level: PlantToxicityLevel; label: string }) {
  const color = PLANT_LEVEL_COLOR[level];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold"
      style={{ background: `${color}24`, color }}
    >
      {(level === 'deadly' || level === 'severe') && <AlertTriangleIcon size={12} />}
      {label}
    </span>
  );
}

function SpeciesTag({ plant }: { plant: ToxicPlant }) {
  const { t } = useI18n();
  if (isCatOnly(plant)) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted">
        <CatIcon size={15} />
        {t('plants.catsOnly')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <DogIcon size={15} />
      <CatIcon size={15} />
      {t('plants.both')}
    </span>
  );
}

export function PlantLibrary() {
  const { t, lang, dir } = useI18n();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = TOXIC_PLANTS.find((p) => p.id === selectedId) ?? null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOXIC_PLANTS.filter((p) => {
      if (!matchesFilter(p, filter)) return false;
      if (!q) return true;
      return (
        p.name.en.toLowerCase().includes(q) ||
        p.name.he.includes(query.trim()) ||
        p.latinName.toLowerCase().includes(q)
      );
    });
  }, [query, filter, lang]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ink">{t('plants.title')}</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">{t('plants.subtitle')}</p>
      </div>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="grid"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {/* search */}
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-muted">
                <SearchIcon size={18} />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('plants.search')}
                aria-label={t('common.search')}
                className="glass-input ps-11"
              />
            </div>

            {/* filter chips */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                      active ? 'bg-teal text-[#04221d]' : 'glass text-muted hover:text-ink'
                    }`}
                  >
                    {t(`plants.filter.${f}`)}
                  </button>
                );
              })}
            </div>

            {results.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted">{t('plants.noResults')}</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {results.map((p, i) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : i * 0.03, duration: 0.35 }}
                    whileHover={reduced ? undefined : { y: -3 }}
                    whileTap={reduced ? undefined : { scale: 0.98 }}
                    className="glass group overflow-hidden rounded-4xl text-start"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg2">
                      <PlantImage
                        plant={p}
                        alt={tr(p.name, lang)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute end-2 top-2">
                        <LevelBadge level={p.toxicityLevel} label={t(`plants.level.${p.toxicityLevel}`)} />
                      </span>
                    </div>
                    <div className="p-3">
                      <span className="block truncate text-sm font-semibold text-ink">{tr(p.name, lang)}</span>
                      <span className="block truncate text-xs italic text-muted">{p.latinName}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`detail-${selected.id}`}
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

            <div className="glass overflow-hidden rounded-4xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg2">
                <PlantImage
                  plant={selected}
                  alt={tr(selected.name, lang)}
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-white">{tr(selected.name, lang)}</h3>
                    <p className="truncate text-xs italic text-white/80">{selected.latinName}</p>
                  </div>
                  <LevelBadge level={selected.toxicityLevel} label={t(`plants.level.${selected.toxicityLevel}`)} />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">{t('plants.affected')}</span>
                  <SpeciesTag plant={selected} />
                </div>

                <div>
                  <div className="mb-1 text-sm font-semibold text-teal">{t('plants.toxin')}</div>
                  <p className="text-sm text-ink/90">{tr(selected.toxin, lang)}</p>
                </div>
                <div>
                  <div className="mb-1 text-sm font-semibold text-teal">{t('plants.symptoms')}</div>
                  <p className="text-sm text-ink/90">{tr(selected.symptoms, lang)}</p>
                </div>
                <div>
                  <div className="mb-1 text-sm font-semibold text-teal">{t('plants.action')}</div>
                  <p className="text-sm text-ink/90">{tr(selected.action, lang)}</p>
                </div>
              </div>
            </div>

            {(selected.toxicityLevel === 'deadly' || selected.toxicityLevel === 'severe') && (
              <div className="mt-4">
                <EmergencyBanner compact />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && <EmergencyBanner compact />}
    </div>
  );
}
