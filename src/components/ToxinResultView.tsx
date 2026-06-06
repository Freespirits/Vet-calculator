/**
 * Renders a ToxinResult into the shared result layout:
 * animated risk gauge + clinical sections + stats + emergency + sources.
 */
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { tr, type ToxinResult, type LocalizedText } from '../types/toxins';
import type { RiskLevel } from './gauges';
import { RiskGauge } from './gauges';
import { EmergencyBanner, SourceList, StatPill } from './feedback';
import { HeartPulseIcon, SyringeIcon, ShieldIcon, InfoIcon } from './Icons';

function Section({
  title,
  icon,
  text,
  tone = 'default',
}: {
  title: string;
  icon: React.ReactNode;
  text: string;
  tone?: 'default' | 'action';
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={
        tone === 'action'
          ? { background: 'rgba(45,212,191,0.10)' }
          : { background: 'rgba(255,255,255,0.04)' }
      }
    >
      <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink/80">
        <span className={tone === 'action' ? 'text-teal' : 'text-muted'}>{icon}</span>
        {title}
      </div>
      <p className="whitespace-pre-line text-sm leading-relaxed text-ink/85">{text}</p>
    </div>
  );
}

export function ToxinResultView({ result }: { result: ToxinResult }) {
  const { t, lang } = useI18n();
  const pick = (l: LocalizedText) => tr(l, lang);
  const bandLabel = result.bandLabel
    ? pick(result.bandLabel)
    : t(`risk.${result.level}` as `risk.${RiskLevel}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="glass mt-4 rounded-4xl p-5 sm:p-6"
    >
      <RiskGauge
        level={result.level}
        fraction={result.fraction}
        valueLabel={result.doseLabel}
        bandLabel={bandLabel}
        idiosyncratic={result.idiosyncratic}
      />

      {result.doseSubLabel && (
        <p className="mt-1 text-center text-xs text-muted">{pick(result.doseSubLabel)}</p>
      )}

      {result.stats && result.stats.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {result.stats.map((s, i) => (
            <StatPill key={i} label={pick(s.label)} value={s.value} />
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3">
        <Section title={t('tox.expectedSigns')} icon={<HeartPulseIcon size={16} />} text={pick(result.signs)} />
        <Section title={t('tox.action')} icon={<SyringeIcon size={16} />} text={pick(result.action)} tone="action" />
        {result.decon && (
          <Section title={t('tox.decon')} icon={<ShieldIcon size={16} />} text={pick(result.decon)} />
        )}
        {result.context && (
          <Section title={t('tox.context')} icon={<InfoIcon size={16} />} text={pick(result.context)} />
        )}
      </div>

      {result.emergency && (
        <div className="mt-4">
          <EmergencyBanner compact />
        </div>
      )}

      <div className="mt-4">
        <SourceList sources={result.sources} />
      </div>
    </motion.div>
  );
}
