/**
 * Mascot — a little dog + cat, the brand mark. No frame; colorized
 * (warm amber dog, violet cat) so they read on any background. They
 * gently bob, blink and twitch their ears. Static under reduced-motion.
 */
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const INK = '#0B1220';
const PINK = '#F472B6';
// dog — warm amber
const DOG = '#F4A24C';
const DOG_DARK = '#E08A3C';
const DOG_SNOUT = '#FCE3BE';
// cat — violet
const CAT = '#B79CF0';
const CAT_DARK = '#8B5CF6';

export function Mascot({ size = 40, label }: { size?: number; label?: string }) {
  const reduced = useReducedMotion();

  const bob = (dur: number, delay: number) =>
    reduced
      ? {}
      : { animate: { y: [0, -1.6, 0] }, transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const, delay } };

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
      aria-label={label ?? 'Veterinary calculator'}
      style={{ overflow: 'visible' }}
    >
      {/* centred composition (no frame) */}
      <g transform="translate(0,-6)">
        {/* ---------- Dog (left), floppy ears ---------- */}
        <motion.g {...bob(2.2, 0)} style={{ transformBox: 'fill-box' }}>
          <motion.ellipse
            cx="11.5" cy="33" rx="3.5" ry="5.8" fill={DOG_DARK}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
            {...earTwitch}
          />
          <ellipse cx="24.5" cy="33" rx="3.5" ry="5.8" fill={DOG_DARK} />
          {/* head */}
          <ellipse cx="18" cy="35" rx="8.4" ry="7.8" fill={DOG} />
          {/* tongue */}
          <path d="M16.4 41 h3.2 a1.6 1.6 0 0 1 -3.2 0 z" fill={PINK} />
          {/* snout */}
          <ellipse cx="18" cy="39.3" rx="4.1" ry="3" fill={DOG_SNOUT} />
          {/* eyes */}
          <motion.ellipse cx="15" cy="34" rx="1.3" ry="1.7" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          <motion.ellipse cx="21" cy="34" rx="1.3" ry="1.7" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          {/* nose */}
          <ellipse cx="18" cy="38" rx="1.6" ry="1.2" fill={INK} />
        </motion.g>

        {/* ---------- Cat (right), pointy ears ---------- */}
        <motion.g {...bob(2.6, 0.4)} style={{ transformBox: 'fill-box' }}>
          {/* pointy ears (outer + pink inner) */}
          <motion.g style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }} {...earTwitch}>
            <path d="M27 31 L29 24.5 L33 30 Z" fill={CAT_DARK} />
            <path d="M28.4 30.4 L29.2 27 L31.2 29.8 Z" fill={PINK} />
          </motion.g>
          <path d="M40 31 L38 24.5 L34 30 Z" fill={CAT_DARK} />
          <path d="M38.6 30.4 L37.8 27 L35.8 29.8 Z" fill={PINK} />
          {/* head */}
          <circle cx="33.5" cy="36" r="7.4" fill={CAT} />
          {/* eyes */}
          <motion.ellipse cx="31" cy="35.2" rx="1.2" ry="1.7" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          <motion.ellipse cx="36" cy="35.2" rx="1.2" ry="1.7" fill={INK} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...blink} />
          {/* nose */}
          <path d="M33.5 37.6 l1.2 1 h-2.4 z" fill={PINK} />
          {/* whiskers */}
          <g stroke={INK} strokeWidth="0.5" strokeLinecap="round" opacity="0.5">
            <path d="M33 38.6 L28.4 38 M33 39.2 L28.6 39.7" />
            <path d="M34 38.6 L38.6 38 M34 39.2 L38.4 39.7" />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}
