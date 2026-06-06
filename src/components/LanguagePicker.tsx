import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/LanguageProvider';
import { LANGUAGES } from '../i18n/languages';
import { LanguagesIcon, ChevronDownIcon, CheckIcon } from './Icons';

/**
 * Language dropdown. Replaces the old 2-way toggle now that the app ships in
 * 14 languages. Lists each language by its autonym; selecting one updates the
 * document direction via the LanguageProvider.
 */
export function LanguagePicker() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-muted transition-colors hover:text-ink"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('ctl.language.select')}
      >
        <LanguagesIcon size={18} />
        <span>{current?.native ?? t('ctl.language')}</span>
        <ChevronDownIcon size={16} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('ctl.language.select')}
          className="glass absolute end-0 z-50 mt-2 max-h-80 w-44 overflow-auto rounded-2xl p-1.5 shadow-xl"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={active}
                dir={l.dir}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start text-sm transition-colors hover:bg-ink/5 ${
                  active ? 'font-bold text-ink' : 'font-medium text-muted'
                }`}
              >
                <span>{l.native}</span>
                {active && <CheckIcon size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
