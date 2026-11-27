/**
 * Shared motion + layout primitives.
 * All motion is gated by prefers-reduced-motion.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/* ---------- Reveal: scroll-triggered entrance ---------- */

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- CountUp: animated numeric value ---------- */

const easeOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 3);

/**
 * Counts from the previously reached number (0 at first) to `target` over
 * `durationSeconds`, one step per animation frame, and ends on exactly
 * `target`. Every number on the way lies between the two, so a count towards a
 * positive value never reads as negative. While `enabled` is false nothing is
 * animated and `target` itself is returned, so switching animations off
 * mid-count shows the final number at once.
 */
function useCountingNumber(target: number, durationSeconds: number, enabled: boolean): number {
  const [counted, setCounted] = useState(enabled ? 0 : target);
  const reachedRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const from = reachedRef.current;
    const startedAt = performance.now();
    let frame = 0;
    const step = (frameTime: number) => {
      // A frame is stamped with when it began, which can be just before `startedAt`.
      const elapsedSeconds = Math.max(0, frameTime - startedAt) / 1000;
      const progress = durationSeconds > 0 ? Math.min(1, elapsedSeconds / durationSeconds) : 1;
      setCounted(from + (target - from) * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(step);
      else reachedRef.current = target;
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationSeconds, enabled]);

  return enabled ? counted : target;
}

/**
 * A number that counts up to `value`. With reduced motion (OS setting or
 * "Stop animations" in the accessibility menu) the value is shown immediately.
 */
export function CountUp({
  value,
  decimals = 2,
  duration = 0.9,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const shown = useCountingNumber(value, duration, !reduced);

  return (
    <span className={`tnum ${className ?? ''}`}>
      {shown.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

/* ---------- GlassCard ---------- */

export function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-4xl ${className}`}>{children}</div>;
}

/* ---------- SegmentedControl ---------- */

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  compact = false,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Stack icon above a smaller label on narrow screens — for five or more options. */
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const pad = size === 'lg' ? 'py-3.5' : size === 'sm' ? 'py-2' : 'py-3';
  const buttonText = compact ? 'px-1 text-[11px] sm:px-3 sm:text-sm' : 'px-3 text-sm';
  const contentLayout = compact ? 'flex-col gap-0.5 sm:flex-row sm:gap-2' : 'gap-2';
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="glass relative flex gap-1 rounded-2xl p-1.5"
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={`relative flex-1 flex items-center justify-center gap-2 rounded-xl ${buttonText} ${pad} font-semibold transition-colors duration-200 min-h-[44px] ${
              selected ? 'text-[#04221d]' : 'text-muted hover:text-ink'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`seg-${ariaLabel ?? 'x'}`}
                className="absolute inset-0 rounded-xl"
                style={{ background: 'linear-gradient(135deg,#2DD4BF,#10B981)' }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 380, damping: 32 }
                }
              />
            )}
            <span className={`relative z-10 flex items-center ${contentLayout}`}>
              {opt.icon}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
