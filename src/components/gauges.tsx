/**
 * Animated SVG gauges.
 *  - RiskGauge: semicircular banded arc + needle for toxicity severity.
 *  - RangeGauge: linear therapeutic-range bar for drug dosing.
 * Both expose ARIA meter semantics and respect reduced-motion.
 */
import { motion } from 'framer-motion';
import { AlertTriangleIcon } from './Icons';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type RiskLevel = 'minimal' | 'mild' | 'moderate' | 'severe' | 'critical' | 'emergency';

export const RISK_COLOR: Record<RiskLevel, string> = {
  minimal: '#10B981',
  mild: '#2DD4BF',
  moderate: '#F59E0B',
  severe: '#FB923C',
  critical: '#F43F5E',
  emergency: '#F43F5E',
};

const CX = 100;
const CY = 104;
const R = 84;
const ARC_LEN = Math.PI * R;

function RiskGauge({
  level,
  fraction,
  valueLabel,
  bandLabel,
  idiosyncratic = false,
}: {
  level: RiskLevel;
  /** 0..1 position along the arc; omitted/undefined for idiosyncratic */
  fraction?: number;
  valueLabel?: string;
  bandLabel: string;
  idiosyncratic?: boolean;
}) {
  const reduced = useReducedMotion();
  const color = RISK_COLOR[level];
  const f = Math.max(0, Math.min(1, fraction ?? (idiosyncratic ? 1 : 0)));
  const track = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
  const dashOffset = idiosyncratic ? 0 : ARC_LEN * (1 - f);

  // Needle tip: polar angle 180° (left) at f=0 → 0° (right) at f=1.
  const NEEDLE = R - 12;
  const theta = ((180 - 180 * f) * Math.PI) / 180;
  const tipX = CX + NEEDLE * Math.cos(theta);
  const tipY = CY - NEEDLE * Math.sin(theta);

  return (
    <div
      className="relative mx-auto w-full max-w-[280px]"
      role="meter"
      aria-valuenow={Math.round(f * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${bandLabel}${valueLabel ? ` — ${valueLabel}` : ''}`}
    >
      <svg viewBox="0 0 200 130" className="w-full">
        <defs>
          <linearGradient id="riskramp" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#10B981" />
            <stop offset="0.45" stopColor="#F59E0B" />
            <stop offset="0.75" stopColor="#FB923C" />
            <stop offset="1" stopColor="#F43F5E" />
          </linearGradient>
        </defs>

        {/* base track */}
        <path d={track} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="14" strokeLinecap="round" />

        {/* colored fill */}
        <motion.path
          d={track}
          fill="none"
          stroke={idiosyncratic ? '#F43F5E' : 'url(#riskramp)'}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          initial={{ strokeDashoffset: ARC_LEN }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={reduced ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.25))' }}
        />

        {/* needle */}
        {!idiosyncratic && (
          <>
            <motion.line
              x1={CX}
              y1={CY}
              stroke={color}
              strokeWidth={3.5}
              strokeLinecap="round"
              initial={{ x2: CX - NEEDLE, y2: CY }}
              animate={{ x2: tipX, y2: tipY }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 14 }}
            />
            <circle cx={CX} cy={CY} r="7" fill={color} />
            <circle cx={CX} cy={CY} r="3" fill="#070B14" />
          </>
        )}
      </svg>

      {/* center readout */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center">
        {idiosyncratic ? (
          <AlertTriangleIcon size={28} className="mb-1 text-rose animate-pulse" />
        ) : (
          valueLabel && <div className="tnum text-2xl font-bold text-ink">{valueLabel}</div>
        )}
        <div className="text-sm font-semibold" style={{ color }}>
          {bandLabel}
        </div>
      </div>
    </div>
  );
}

function RangeGauge({
  min,
  max,
  value,
  unit,
  labelBelow,
  labelIn,
  labelAbove,
}: {
  min: number;
  max: number;
  value: number;
  unit: string;
  labelBelow: string;
  labelIn: string;
  labelAbove: string;
}) {
  const reduced = useReducedMotion();
  const domainMax = Math.max(max * 1.5, value * 1.08, max + 1e-6);
  const pct = (n: number) => `${Math.max(0, Math.min(100, (n / domainMax) * 100))}%`;
  const status = value < min ? 'below' : value > max ? 'above' : 'in';
  const statusColor = status === 'in' ? '#10B981' : status === 'below' ? '#F59E0B' : '#F43F5E';
  const statusLabel = status === 'in' ? labelIn : status === 'below' ? labelBelow : labelAbove;

  return (
    <div className="w-full" dir="ltr">
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span>0</span>
        <span className="font-semibold" style={{ color: statusColor }}>
          {statusLabel}
        </span>
        <span className="tnum">
          {domainMax.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
        </span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-white/8">
        {/* in-range zone */}
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: pct(min),
            width: `calc(${pct(max)} - ${pct(min)})`,
            background: 'linear-gradient(90deg, rgba(16,185,129,0.5), rgba(45,212,191,0.7))',
          }}
        />
        {/* value marker */}
        <motion.div
          className="absolute top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-full"
          style={{ background: statusColor, boxShadow: `0 0 10px ${statusColor}` }}
          initial={{ left: '0%' }}
          animate={{ left: pct(value) }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span className="tnum">
          {min} {unit}
        </span>
        <span className="tnum">
          {max} {unit}
        </span>
      </div>
    </div>
  );
}

export { RiskGauge, RangeGauge };
