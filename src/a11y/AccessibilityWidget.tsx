/**
 * AccessibilityWidget — the floating IS 5568 accessibility menu.
 *
 * A fixed toggle button (universal-access symbol) in the bottom corner opens a
 * panel of display adjustments. Everything is keyboard-operable: Escape and
 * outside-click close it, focus moves into the panel on open and returns to the
 * trigger on close, and Tab is trapped inside while open. All controls are real
 * <button>s with aria-pressed / aria-label.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useI18n } from '../i18n/LanguageProvider';
import { a11yStrings } from './strings';
import { useA11y, type A11yToggleKey } from './AccessibilityProvider';
import {
  AccessibilityIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
  TextSizeIcon,
  ContrastIcon,
  GrayscaleIcon,
  LinkChainIcon,
  HeadingIcon,
  BookOpenIcon,
  PointerIcon,
  PauseIcon,
  RefreshIcon,
  InfoIcon,
} from '../components/Icons';

const FOCUSABLE =
  'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';

export function AccessibilityWidget() {
  const { lang, dir } = useI18n();
  const s = a11yStrings(lang);
  const {
    settings,
    toggle,
    increaseFont,
    decreaseFont,
    fontPercent,
    canIncrease,
    canDecrease,
    reset,
    isPristine,
    openStatement,
  } = useA11y();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the trigger for keyboard users.
    triggerRef.current?.focus();
  }, []);

  // Escape to close, outside-click to close, Tab trapped inside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      } else if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, close]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  return (
    <div className="a11y-root" dir={dir}>
      <button
        ref={triggerRef}
        type="button"
        className="a11y-fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={open ? s.close : s.open}
        onClick={() => setOpen((o) => !o)}
      >
        <AccessibilityIcon size={26} />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label={s.menuTitle}
          className="a11y-panel glass"
        >
          <div className="a11y-panel-head">
            <span className="a11y-panel-title">
              <AccessibilityIcon size={20} />
              {s.menuTitle}
            </span>
            <button
              type="button"
              className="a11y-icon-btn"
              aria-label={s.close}
              onClick={close}
            >
              <XIcon size={18} />
            </button>
          </div>

          {/* Text size stepper */}
          <div className="a11y-section-label">{s.adjustments}</div>
          <div className="a11y-fontrow">
            <span className="a11y-fontrow-label">
              <TextSizeIcon size={18} />
              {s.textSize}
            </span>
            <span className="a11y-stepper">
              <button
                type="button"
                className="a11y-icon-btn"
                aria-label={s.decrease}
                onClick={decreaseFont}
                disabled={!canDecrease}
              >
                <MinusIcon size={16} />
              </button>
              <span className="a11y-fontval tnum" aria-live="polite">
                {fontPercent}%
              </span>
              <button
                type="button"
                className="a11y-icon-btn"
                aria-label={s.increase}
                onClick={increaseFont}
                disabled={!canIncrease}
              >
                <PlusIcon size={16} />
              </button>
            </span>
          </div>

          {/* Toggle grid */}
          <div className="a11y-grid">
            <ToggleTile k="contrast" label={s.contrast} on={settings.contrast} onToggle={toggle} onText={s.on} offText={s.off}>
              <ContrastIcon size={20} />
            </ToggleTile>
            <ToggleTile k="grayscale" label={s.grayscale} on={settings.grayscale} onToggle={toggle} onText={s.on} offText={s.off}>
              <GrayscaleIcon size={20} />
            </ToggleTile>
            <ToggleTile k="highlightLinks" label={s.links} on={settings.highlightLinks} onToggle={toggle} onText={s.on} offText={s.off}>
              <LinkChainIcon size={20} />
            </ToggleTile>
            <ToggleTile k="highlightHeadings" label={s.headings} on={settings.highlightHeadings} onToggle={toggle} onText={s.on} offText={s.off}>
              <HeadingIcon size={20} />
            </ToggleTile>
            <ToggleTile k="readableFont" label={s.readable} on={settings.readableFont} onToggle={toggle} onText={s.on} offText={s.off}>
              <BookOpenIcon size={20} />
            </ToggleTile>
            <ToggleTile k="bigCursor" label={s.bigCursor} on={settings.bigCursor} onToggle={toggle} onText={s.on} offText={s.off}>
              <PointerIcon size={20} />
            </ToggleTile>
            <ToggleTile k="reduceMotion" label={s.stopMotion} on={settings.reduceMotion} onToggle={toggle} onText={s.on} offText={s.off}>
              <PauseIcon size={20} />
            </ToggleTile>
          </div>

          <div className="a11y-foot">
            <button
              type="button"
              className="a11y-foot-btn"
              onClick={reset}
              disabled={isPristine}
            >
              <RefreshIcon size={16} />
              {s.reset}
            </button>
            <button
              type="button"
              className="a11y-foot-btn a11y-foot-btn--statement"
              onClick={() => {
                close();
                openStatement();
              }}
            >
              <InfoIcon size={16} />
              {s.statement}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleTile({
  k,
  label,
  on,
  onToggle,
  onText,
  offText,
  children,
}: {
  k: A11yToggleKey;
  label: string;
  on: boolean;
  onToggle: (key: A11yToggleKey) => void;
  onText: string;
  offText: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`a11y-tile${on ? ' is-on' : ''}`}
      aria-pressed={on}
      onClick={() => onToggle(k)}
    >
      <span className="a11y-tile-icon" aria-hidden="true">
        {children}
      </span>
      <span className="a11y-tile-label">{label}</span>
      {/* Decorative: the on/off state is already conveyed by aria-pressed. */}
      <span className="a11y-tile-state" aria-hidden="true">
        {on ? onText : offText}
      </span>
    </button>
  );
}
