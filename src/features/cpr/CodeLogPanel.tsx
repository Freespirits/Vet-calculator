/**
 * Event log: quick-log buttons for airway and access, the running list of
 * time-stamped events, and "Copy record" which puts the plain-text CPR record
 * (see `codeReport.ts`) on the clipboard. If the clipboard is blocked the
 * failure is reported in the console and the button simply does not confirm.
 */
import { useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import type { Species } from '../../types';
import { GlassCard } from '../../components/primitives';
import { CheckIcon, CopyIcon } from '../../components/Icons';
import { formatClock, type CodeEvent, type CodeEventKind } from '../../cpr/codeClock';
import { buildCodeReport, CODE_EVENT_LABEL } from '../../cpr/codeReport';
import { CPR_TEXT } from './strings';
import type { CodeClock } from './CodeClockPanel';

const QUICK_LOG_KINDS: CodeEventKind[] = ['intubated', 'iv-access', 'io-access'];

interface LogPatient {
  name?: string;
  species: Species;
  weightKg: number | null;
}

function eventDetail(event: CodeEvent): string {
  if (event.pauseMs !== undefined) return ` — ${Math.round(event.pauseMs / 1000)} s`;
  return event.detail ? ` — ${event.detail}` : '';
}

function EventLine({ event }: { event: CodeEvent }) {
  const { lang } = useI18n();
  return (
    <li className="flex items-baseline gap-3 text-sm">
      <span className="tnum shrink-0 text-muted" dir="ltr">
        {formatClock(event.atMs)}
      </span>
      <span className="text-ink">
        {tr(CODE_EVENT_LABEL[event.kind], lang)}
        {eventDetail(event)}
      </span>
    </li>
  );
}

function QuickLog({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  return (
    <div className="flex flex-wrap gap-2" aria-label={tr(CPR_TEXT.quickLog, lang)}>
      {QUICK_LOG_KINDS.map((kind) => (
        <button
          key={kind}
          type="button"
          onClick={() => code.log(kind)}
          className="min-h-[44px] rounded-xl bg-white/8 px-3.5 text-sm font-semibold text-ink"
        >
          {tr(CODE_EVENT_LABEL[kind], lang)}
        </button>
      ))}
    </div>
  );
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn(`Code Blue: could not copy the CPR record (${(error as Error).message}).`);
    return false;
  }
}

function CopyRecordButton({ code, patient }: { code: CodeClock; patient: LogPatient }) {
  const { lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const report = buildCodeReport({
      state: code.state,
      patient: { ...patient, weightKg: patient.weightKg ?? 0 },
      lang,
    });
    setCopied(await copyToClipboard(report));
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white/8 px-4 text-sm font-semibold text-ink"
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      {tr(copied ? CPR_TEXT.copied : CPR_TEXT.copyRecord, lang)}
    </button>
  );
}

export function CodeLogPanel({ code, patient }: { code: CodeClock; patient: LogPatient }) {
  const { lang } = useI18n();
  const { events } = code.state;
  return (
    <section aria-label={tr(CPR_TEXT.logTitle, lang)}>
      <GlassCard className="flex flex-col gap-3 p-4">
        <h3 className="text-base font-semibold text-ink">{tr(CPR_TEXT.logTitle, lang)}</h3>
        {code.running && <QuickLog code={code} />}
        {events.length === 0 ? (
          <p className="text-sm text-muted">{tr(CPR_TEXT.logEmpty, lang)}</p>
        ) : (
          <ol className="flex flex-col gap-1.5">
            {events.map((event, index) => (
              <EventLine key={`${event.atMs}-${index}`} event={event} />
            ))}
          </ol>
        )}
        {events.length > 0 && <CopyRecordButton code={code} patient={patient} />}
      </GlassCard>
    </section>
  );
}
