/**
 * ToxinArt — colorful, filled illustrations for each toxin so users
 * recognize them at a glance (clearer than a thin line icon). Keyed by
 * the toxin's registry id. Static, decorative (aria-hidden).
 */
type Props = { id: string; size?: number };

function Svg({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function ToxinArt({ id, size = 44 }: Props) {
  switch (id) {
    case 'chocolate':
      return (
        <Svg size={size}>
          <rect x="11" y="12" width="26" height="24" rx="3" fill="#6B4226" />
          <g fill="#8E5C36">
            <rect x="13.5" y="14.5" width="6.3" height="6.3" rx="1" />
            <rect x="20.85" y="14.5" width="6.3" height="6.3" rx="1" />
            <rect x="28.2" y="14.5" width="6.3" height="6.3" rx="1" />
            <rect x="13.5" y="21.85" width="6.3" height="6.3" rx="1" />
            <rect x="20.85" y="21.85" width="6.3" height="6.3" rx="1" />
            <rect x="28.2" y="21.85" width="6.3" height="6.3" rx="1" />
            <rect x="13.5" y="29.2" width="6.3" height="4.8" rx="1" />
            <rect x="20.85" y="29.2" width="6.3" height="4.8" rx="1" />
            <rect x="28.2" y="29.2" width="6.3" height="4.8" rx="1" />
          </g>
          <rect x="11" y="12" width="26" height="4" rx="2" fill="#fff" opacity="0.12" />
        </Svg>
      );

    case 'grapes':
      return (
        <Svg size={size}>
          <path d="M24 21 v-4" stroke="#7C5C3B" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 17 q6 -4 10 0 q-4 5 -10 1 z" fill="#34D399" />
          <g fill="#7C3AED">
            <circle cx="20" cy="24" r="4" />
            <circle cx="28" cy="24" r="4" />
            <circle cx="16" cy="30" r="4" />
            <circle cx="24" cy="30" r="4" />
            <circle cx="32" cy="30" r="4" />
            <circle cx="20" cy="36" r="4" />
            <circle cx="28" cy="36" r="4" />
          </g>
          <g fill="#A78BFA" opacity="0.8">
            <circle cx="18.5" cy="22.5" r="1.2" />
            <circle cx="22.5" cy="28.5" r="1.2" />
            <circle cx="18.5" cy="34.5" r="1.2" />
          </g>
        </Svg>
      );

    case 'xylitol':
      return (
        <Svg size={size}>
          {/* gum / sweetener pellets */}
          <rect x="12" y="20" width="16" height="13" rx="6.5" fill="#F1F5F9" />
          <rect x="12" y="20" width="16" height="13" rx="6.5" fill="none" stroke="#67E8F9" strokeWidth="1.5" />
          <rect x="24" y="26" width="13" height="10" rx="5" fill="#E0F2FE" />
          <rect x="24" y="26" width="13" height="10" rx="5" fill="none" stroke="#22D3EE" strokeWidth="1.3" />
          {/* sparkle */}
          <path d="M32 14 l1.3 3 3 1.3 -3 1.3 -1.3 3 -1.3 -3 -3 -1.3 3 -1.3 z" fill="#67E8F9" />
        </Svg>
      );

    case 'allium':
      return (
        <Svg size={size}>
          {/* green shoots */}
          <path d="M24 19 C24 13 22 11 20.5 9.5 M24 19 C24 13 26 11 27.5 10" stroke="#34D399" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* bulb */}
          <path d="M24 18 C15.5 18 13.5 27 16 33 C18 39 22 40.5 24 40.5 C26 40.5 30 39 32 33 C34.5 27 32.5 18 24 18 Z" fill="#EDE9FE" />
          <path d="M24 18 C20 25 20 34 24 40.5 M24 18 C28 25 28 34 24 40.5 M18.5 21 C16 27 16.5 34 19 39 M29.5 21 C32 27 31.5 34 29 39" stroke="#C4B5FD" strokeWidth="1.4" fill="none" />
        </Svg>
      );

    case 'macadamia':
      return (
        <Svg size={size}>
          <circle cx="24" cy="25" r="13" fill="#D9A066" />
          <path d="M24 12 a13 13 0 0 1 0 26 z" fill="#C68642" />
          <path d="M24 12 v26" stroke="#A9743F" strokeWidth="1.4" />
          <ellipse cx="18.5" cy="19.5" rx="3.2" ry="1.8" fill="#fff" opacity="0.3" />
        </Svg>
      );

    case 'lily':
      return (
        <Svg size={size}>
          <path d="M24 30 v8" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 34 q5 -1 7 -4 q-5 0 -7 4 z" fill="#34D399" />
          <g fill="#F9A8D4">
            <ellipse cx="24" cy="18" rx="3.4" ry="7" />
            <ellipse cx="24" cy="18" rx="3.4" ry="7" transform="rotate(72 24 25)" />
            <ellipse cx="24" cy="18" rx="3.4" ry="7" transform="rotate(144 24 25)" />
            <ellipse cx="24" cy="18" rx="3.4" ry="7" transform="rotate(216 24 25)" />
            <ellipse cx="24" cy="18" rx="3.4" ry="7" transform="rotate(288 24 25)" />
          </g>
          <circle cx="24" cy="25" r="3.6" fill="#FBBF24" />
        </Svg>
      );

    case 'acetaminophen':
      return (
        <Svg size={size}>
          <g transform="rotate(-35 24 25)">
            <rect x="10" y="20" width="28" height="10" rx="5" fill="#F1F5F9" />
            <path d="M24 20 H33 a5 5 0 0 1 5 5 a5 5 0 0 1 -5 5 H24 Z" fill="#EF4444" />
            <rect x="10" y="20" width="28" height="10" rx="5" fill="none" stroke="#CBD5E1" strokeWidth="0.6" />
            <ellipse cx="17" cy="23" rx="3" ry="1.3" fill="#fff" opacity="0.7" />
          </g>
        </Svg>
      );

    case 'ibuprofen':
      return (
        <Svg size={size}>
          <circle cx="24" cy="24" r="13" fill="#FB923C" />
          <circle cx="24" cy="24" r="13" fill="none" stroke="#EA7C2B" strokeWidth="1.5" />
          <path d="M24 11.5 v25" stroke="#EA7C2B" strokeWidth="1.4" />
          <ellipse cx="19" cy="19" rx="3.6" ry="2" fill="#fff" opacity="0.35" />
        </Svg>
      );

    default:
      return null;
  }
}
