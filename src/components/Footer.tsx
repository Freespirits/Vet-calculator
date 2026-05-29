import { useI18n } from '../i18n/LanguageProvider';
import { HeartPulseIcon } from './Icons';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mx-auto max-w-3xl px-5 pb-10 pt-6 text-center">
      <div className="mx-auto mb-3 flex w-fit items-center gap-2 text-teal/70">
        <HeartPulseIcon size={18} />
        <span className="text-xs font-medium">{t('footer.madeWith')}</span>
      </div>
      <p className="text-xs text-muted">{t('footer.text')}</p>
      <p className="mt-3 text-xs text-muted" dir="rtl">
        לדיווח על שגיאות או לפרסום · Report errors or publishing inquiries
      </p>
      <a
        href="mailto:admin@hack-tech.org"
        className="text-xs font-medium text-teal hover:underline"
      >
        admin@hack-tech.org
      </a>
    </footer>
  );
}
