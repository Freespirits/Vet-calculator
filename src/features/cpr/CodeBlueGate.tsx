/**
 * Professional-use acknowledgment shown the first time Code Blue is opened on
 * a device. It must be accepted (checkbox + button) before any dose or clock
 * appears. Acceptance is remembered in localStorage under a versioned key, so
 * a returning team is not slowed down mid-emergency; bump the version to ask
 * everyone again after the wording changes.
 */
import { useCallback, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { ShieldIcon } from '../../components/Icons';
import { CPR_TEXT } from './strings';

const ACKNOWLEDGMENT_KEY = 'vh.cpr.acknowledged.v1';

function readAcknowledged(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(ACKNOWLEDGMENT_KEY) === 'yes';
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAcknowledgment() {
  const [acknowledged, setAcknowledged] = useState(readAcknowledged);
  const acknowledge = useCallback(() => {
    window.localStorage.setItem(ACKNOWLEDGMENT_KEY, 'yes');
    setAcknowledged(true);
  }, []);
  return { acknowledged, acknowledge };
}

export function CodeBlueGate({ onAccept }: { onAccept: () => void }) {
  const { lang } = useI18n();
  const [checked, setChecked] = useState(false);
  return (
    <GlassCard className="flex flex-col gap-4 p-5">
      <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
        <ShieldIcon size={20} className="shrink-0 text-amber" />
        {tr(CPR_TEXT.gateTitle, lang)}
      </h3>
      <ul className="flex list-disc flex-col gap-2 ps-5 text-sm leading-relaxed text-ink/90">
        {CPR_TEXT.gatePoints.map((point) => (
          <li key={point.en}>{tr(point, lang)}</li>
        ))}
      </ul>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/4 p-3.5 text-sm font-medium text-ink">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-teal"
        />
        {tr(CPR_TEXT.gateCheckbox, lang)}
      </label>
      <button
        type="button"
        disabled={!checked}
        onClick={onAccept}
        className="min-h-[52px] rounded-2xl bg-rose px-5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {tr(CPR_TEXT.gateContinue, lang)}
      </button>
    </GlassCard>
  );
}
