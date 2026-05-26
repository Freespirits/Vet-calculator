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
    </footer>
  );
}
