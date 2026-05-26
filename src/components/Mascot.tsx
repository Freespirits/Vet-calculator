/**
 * Mascot — a little dog + cat peeking out of the brand badge, gently
 * bobbing, blinking and twitching their ears. The brand mark for וט-חולים.
 * All motion is disabled under prefers-reduced-motion.
 */
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CREAM = '#F4EFE6';
const INK = '#0B1220';

export function Mascot({ size = 40 }: { size?: number }) {
  const reduced = useReducedMotion();

  // Helpers so the static (reduced-motion) and animated paths share styling.
  const bob = (dur: number, delay: number) =>
    reduced ? {} : { animate: { y: [0, -1.6, 0] }, transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const, delay } };

  const blink = reduced
    ? {}
    : {
        animate: { scaleY: [1, 1, 0.1, 1] },
        transition: { duration: 4, repeat: Infinity, times: [0, 0.86, 0.92, 0.98], ease: 'easeInOut' as const },
      };

  const earTwitch = reduced
    ? {}
    : {
        animate: { rotate: [0, -10, 0, -6, 0] },
        transition: { duration: 3.2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' as const },
      };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="וט-חולים"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="mascot-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF" />
          <stop offset="0.55" stopColor="#10B981" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <clipPath id="mascot-clip">
          <rect width="48" height="48" rx="13" />
        </clipPath>
      </defs>

      <rect width="48" height="48" rx="13" fill="url(#mascot-bg)" />

      <g clipPath="url(#mascot-clip)">
        {/* ---------- Dog (left), floppy ears ---------- */}
        <motion.g {...bob(2.2, 0)} style={{ transformBox: 'fill-box' }}>
          {/* floppy ears */}
          <motion.ellipse
            cx="11.5" cy="33" rx="3.4" ry="5.6" fill={CREAM}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
            {...earTwitch}
          />
          <ellipse cx="24.5" cy="33" rx="3.4" ry="5.6" fill={CREAM} />
          {/* head */}
          <ellipse cx="18" cy="35" rx="8.2" ry="7.6" fill={CREAM} />
          {/* tongue */}
          <path d="M16.4 41 h3.2 a1.6 1.6 0 0 1 -3.2 0 z" fill="#F472B6" />
          {/* snout */}
          <ellipse cx="18" cy="39.3" rx="4" ry="3" fill="#FFFFFF" />
          {/* eyes */}
          <motion.ellipse cx="15" cy="34" rx="1.25" ry="1.6" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          <motion.ellipse cx="21" cy="34" rx="1.25" ry="1.6" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          {/* nose */}
          <ellipse cx="18" cy="38.2" rx="1.5" ry="1.1" fill={INK} />
        </motion.g>

        {/* ---------- Cat (right), pointy ears ---------- */}
        <motion.g {...bob(2.6, 0.4)} style={{ transformBox: 'fill-box' }}>
          {/* pointy ears */}
          <motion.path
            d="M27 31 L29 25 L33 30 Z" fill={CREAM}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            {...earTwitch}
          />
          <path d="M40 31 L38 25 L34 30 Z" fill={CREAM} />
          {/* head */}
          <circle cx="33.5" cy="36" r="7.2" fill={CREAM} />
          {/* eyes */}
          <motion.ellipse cx="31" cy="35.2" rx="1.15" ry="1.6" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          <motion.ellipse cx="36" cy="35.2" rx="1.15" ry="1.6" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          {/* nose */}
          <path d="M33.5 37.4 l1.1 1 h-2.2 z" fill="#F472B6" />
          {/* whiskers */}
          <g stroke={INK} strokeWidth="0.5" strokeLinecap="round" opacity="0.55">
            <path d="M33 38.4 L28.5 37.8 M33 39 L28.7 39.4" />
            <path d="M34 38.4 L38.5 37.8 M34 39 L38.3 39.4" />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}
