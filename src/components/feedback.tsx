/**
 * Feedback surfaces: warning list, emergency hotline banner, source list.
 */
import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  AlertTriangleIcon,
  AlertOctagonIcon,
  InfoIcon,
  PhoneIcon,
  ChevronDownIcon,
} from './Icons';

export type Severity = 'info' | 'warning' | 'danger';

const SEV = {
  info: { color: '#2DD4BF', bg: 'rgba(45,212,191,0.12)', Icon: InfoIcon },
  warning: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', Icon: AlertTriangleIcon },
  danger: { color: '#F43F5E', bg: 'rgba(244,63,94,0.14)', Icon: AlertOctagonIcon },
} as const;

export function WarningList({
  items,
}: {
  items: { id: string; severity: Severity; message: string }[];
}) {
  const reduced = useReducedMotion();
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-col gap-2">
      {items.map((w, i) => {
        const { color, bg, Icon } = SEV[w.severity];
        return (
          <motion.li
            key={w.id}
            initial={reduced ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : i * 0.05, duration: 0.35 }}
            className="flex items-start gap-3 rounded-2xl p-3 text-sm"
            style={{ background: bg }}
          >
            <span className="mt-0.5 shrink-0" style={{ color }}>
              <Icon size={18} />
            </span>
            <span className="text-ink/90">{w.message}</span>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function EmergencyBanner({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <div
      className="rounded-4xl border p-5"
      style={{ background: 'rgba(244,63,94,0.10)', borderColor: 'rgba(244,63,94,0.3)' }}
    >
      <div className="flex items-center gap-2.5 text-rose">
        <AlertOctagonIcon size={22} />
        <h3 className="text-base font-bold">{t('emergency.title')}</h3>
      </div>
      {!compact && <p className="mt-2 text-sm text-ink/80">{t('emergency.text')}</p>}
      <div className="mt-4 flex flex-col gap-2">
        <a
          href="tel:+18884264435"
          className="btn-ghost justify-between !min-h-[48px] text-sm"
        >
          <span className="flex items-center gap-2">
            <PhoneIcon size={18} />
            {t('emergency.aspca')}
          </span>
          <span className="tnum font-semibold" dir="ltr">
            888-426-4435
          </span>
        </a>
        <a
          href="tel:+18557647661"
          className="btn-ghost justify-between !min-h-[48px] text-sm"
        >
          <span className="flex items-center gap-2">
            <PhoneIcon size={18} />
            {t('emergency.helpline')}
          </span>
          <span className="tnum font-semibold" dir="ltr">
            855-764-7661
          </span>
        </a>
      </div>
    </div>
  );
}

export function SourceList({ sources }: { sources: string[] }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  if (sources.length === 0) return null;
  return (
    <div className="rounded-2xl bg-white/4 p-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:text-ink"
      >
        <span>
          {t('common.sources')} ({sources.length})
        </span>
        <ChevronDownIcon
          size={18}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="flex list-disc flex-col gap-1.5 px-7 pb-3 pt-1 text-xs leading-relaxed text-muted">
          {sources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/4 px-4 py-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="tnum mt-0.5 text-lg font-semibold text-ink">{value}</div>
    </div>
  );
}
