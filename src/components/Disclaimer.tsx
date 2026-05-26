import { useI18n } from '../i18n/LanguageProvider';
import { ShieldIcon } from './Icons';

export function Disclaimer() {
  const { t } = useI18n();
  return (
    <div className="rounded-4xl bg-white/4 p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-muted">
          <ShieldIcon size={20} />
        </span>
        <div>
          <h4 className="mb-1 text-sm font-semibold text-ink/80">{t('disclaimer.title')}</h4>
          <p className="text-xs leading-relaxed text-muted">{t('disclaimer.text')}</p>
        </div>
      </div>
    </div>
  );
}
