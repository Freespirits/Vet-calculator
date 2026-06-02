import { useI18n } from '../i18n/LanguageProvider';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, LanguagesIcon } from './Icons';

export function Header() {
  const { t, toggleLang } = useI18n();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="glass mx-auto flex max-w-3xl items-center justify-between rounded-2xl px-4 py-2.5">
        {/* Brand: TeddyVets logo on the left, animated dotLottie "face" on the right */}
        <div className="flex items-center gap-3" dir="ltr">
          <a
            href="https://teddyvets.co.il"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TeddyVets"
            className="flex items-center"
          >
            <img
              src="https://teddyvets.co.il/wp-content/uploads/2025/06/logo-teddi.svg"
              alt="TeddyVets"
              className="h-9 w-auto"
            />
          </a>
          <a href="#top" className="flex items-center" aria-label={t('brand.name')}>
            <dotlottie-player
              src="https://lottie.host/1f0f6d6a-1500-46cf-9a39-a4648defc99f/On3JNxxQmV.lottie"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: 44, height: 44 }}
            />
          </a>
        </div>

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
