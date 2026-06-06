import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { LANGUAGES } from '../i18n/languages';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { LanguagesIcon, ChevronDownIcon, CheckIcon } from './Icons';

/**
 * Language dropdown. Replaces the old 2-way toggle now that the app ships in
 * 14 languages. Each row shows the autonym (and the English name, for
 * discoverability); selecting one updates the document direction via the
 * LanguageProvider.
 */
export function LanguagePicker() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const current = LANGUAGES.find((l) => l.code === lang);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors ${
          open ? 'text-ink' : 'text-muted hover:text-ink'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('ctl.language.select')}
      >
        <LanguagesIcon size={18} />
        <span>{current?.native ?? t('ctl.language')}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          <ChevronDownIcon size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label={t('ctl.language.select')}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: reduced ? 0.12 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top', background: 'rgb(var(--bg-1))', borderColor: 'var(--glass-border)' }}
            className="absolute end-0 z-50 mt-2 max-h-[22rem] w-52 overflow-auto rounded-2xl border p-1.5 shadow-2xl"
          >
            {LANGUAGES.map((l, i) => {
              const active = l.code === lang;
              const showEnglish = l.native !== l.english;
              return (
                <motion.button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  dir={l.dir}
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : Math.min(i * 0.018, 0.2), duration: 0.18 }}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`relative flex w-full items-center justify-between gap-2 rounded-xl py-2 pe-3 ps-3.5 text-start transition-colors ${
                    active ? 'bg-teal/10 text-ink' : 'text-muted hover:bg-white/[0.06] hover:text-ink'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-teal" />
                  )}
                  <span className="min-w-0">
                    <span className={`block truncate text-sm ${active ? 'font-bold' : 'font-medium'}`}>
                      {l.native}
                    </span>
                    {showEnglish && (
                      <span className="block truncate text-[11px] leading-tight text-muted/70">
                        {l.english}
                      </span>
                    )}
                  </span>
                  {active && <CheckIcon size={16} className="shrink-0 text-teal" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
