import { useI18n } from '../i18n/LanguageProvider';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, LanguagesIcon } from './Icons';
import { Mascot } from './Mascot';

export function Header() {
  const { t, toggleLang } = useI18n();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="glass mx-auto flex max-w-3xl items-center justify-between rounded-2xl px-4 py-2.5">
        <a href="#top" className="flex items-center gap-2.5" aria-label={t('brand.name')}>
          <Mascot size={44} label={t('brand.name')} />
        </a>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            className="flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-muted transition-colors hover:text-ink"
            aria-label={t('ctl.language')}
          >
            <LanguagesIcon size={18} />
            {t('ctl.language')}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-xl text-muted transition-colors hover:text-ink"
            aria-label={t('ctl.theme.toggle')}
          >
            {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
