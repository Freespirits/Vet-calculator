import { useI18n } from '../i18n/LanguageProvider';
import { LANGUAGES } from '../i18n/languages';
import { HeartPulseIcon, AccessibilityIcon } from './Icons';
import { TEDDYVETS_CLINICS_URL } from '../data/emergencyContacts';
import { useA11y } from '../a11y/AccessibilityProvider';
import { a11yStrings } from '../a11y/strings';

const languageHref = (code: string) => (code === 'he' ? '/' : `/${code}/`);

export function Footer() {
  const { t, lang } = useI18n();
  const { openStatement } = useA11y();
  const a11y = a11yStrings(lang);
  return (
    <footer className="mx-auto max-w-3xl px-5 pb-10 pt-6 text-center">
      <div className="mx-auto mb-3 flex w-fit items-center gap-2 text-teal/70">
        <HeartPulseIcon size={18} />
        <span className="text-xs font-medium">{t('footer.madeWith')}</span>
      </div>
      <p className="text-xs text-muted">
        {t('footer.partner')} ·{' '}
        <a
          href={TEDDYVETS_CLINICS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal hover:underline"
        >
          TeddyVets
        </a>
      </p>
      <nav aria-label="Language pages" className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
        {LANGUAGES.map((language) => (
          <a
            key={language.code}
            href={languageHref(language.code)}
            hrefLang={language.code}
            lang={language.code}
            className="text-xs text-muted transition-colors hover:text-teal hover:underline"
          >
            {language.native}
          </a>
        ))}
      </nav>
      <p className="mt-4 text-xs text-muted">{t('footer.text')}</p>
      <p className="mt-3 text-xs text-muted" dir="rtl">
        לדיווח על שגיאות או לפרסום · Report errors or publishing inquiries
      </p>
      <a
        href="mailto:admin@hack-tech.org"
        className="text-xs font-medium text-teal hover:underline"
      >
        admin@hack-tech.org
      </a>
      <div className="mt-4">
        <button
          type="button"
          onClick={openStatement}
          className="mx-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-teal"
        >
          <AccessibilityIcon size={15} />
          {a11y.statement}
        </button>
      </div>
    </footer>
  );
}
