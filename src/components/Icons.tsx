/**
 * Icon set — single consistent stroke family (1.75px, round caps, currentColor).
 * No emoji as structural icons (per design guidelines). Decorative only.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  };
}

export const SunIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const LanguagesIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 8h7M9 5v3c0 4-2 6-5 7M7 9c0 3 3 5 6 6" />
    <path d="M14 19l3.5-8 3.5 8M15.2 16.5h4.6" />
  </svg>
);

export const PawIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="6.5" cy="10" r="1.7" />
    <circle cx="10.5" cy="6.5" r="1.7" />
    <circle cx="15" cy="6.5" r="1.7" />
    <circle cx="18" cy="10" r="1.7" />
    <path d="M8 16.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5c0 1.9-1.6 3-4 3s-4-1.1-4-3z" />
  </svg>
);

export const DogIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M10 5.5 7 4 5.5 7v4.5c0 1 .5 1.8 1.3 2.3M14 5.5 17 4l1.5 3v4.5c0 1-.5 1.8-1.3 2.3" />
    <path d="M6.8 13.8C6 15 5.5 16.4 5.5 18c0 1.4 1.2 2 3 2h7c1.8 0 3-.6 3-2 0-1.6-.5-3-1.3-4.2" />
    <path d="M9.5 16.5h.01M14.5 16.5h.01M12 18.2c.6 0 1-.3 1-.8" />
  </svg>
);

export const CatIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 9 4 4l4 2.5M19 9l1-5-4 2.5" />
    <path d="M5 9c0-.3 3-1.5 7-1.5S19 8.7 19 9c.7 1.2 1 2.6 1 4 0 3.6-3 6.5-8 6.5S4 16.6 4 13c0-1.4.3-2.8 1-4z" />
    <path d="M9.5 13h.01M14.5 13h.01M12 15v1M10.5 16.2c.4.4 1.1.4 1.5 0M12 16.2c.4.4 1.1.4 1.5 0" />
  </svg>
);

export const ScaleIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4v16M7 20h10M5 8h14l-2.5-3h-9L5 8z" />
    <path d="M5 8 2.5 14a2.5 2.5 0 0 0 5 0L5 8zM19 8l-2.5 6a2.5 2.5 0 0 0 5 0L19 8z" />
  </svg>
);

export const SyringeIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M18 3l3 3M16.5 4.5l3 3M14 7l3 3" />
    <path d="M17 8 8 17l-2 .5L4 20l-1-1 2.5-2L6 15l9-9" />
    <path d="m10 11 2 2M8 13l2 2" />
  </svg>
);

export const PillIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="8" width="18" height="8" rx="4" />
    <path d="M12 8v8" />
  </svg>
);

export const CapsuleIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-20 12 12)" />
    <path d="M9 6.7 14.5 16" />
  </svg>
);

export const ChocolateIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="5" y="4" width="14" height="16" rx="1.5" />
    <path d="M5 9h14M5 14h14M12 4v16M8.5 4v5M15.5 9v5M8.5 14v6M15.5 14v6" />
  </svg>
);

export const GrapeIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v3M12 6c1.5 0 2.5-.8 3.5-1" />
    <circle cx="9" cy="9" r="2" />
    <circle cx="15" cy="9" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="8" cy="14" r="2" />
    <circle cx="16" cy="14" r="2" />
    <circle cx="12" cy="17" r="2" />
  </svg>
);

export const DropletIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10z" />
    <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
);

export const OnionIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4c-1 1.5-2 2-2 2M12 4c1 1.5 2 2 2 2" />
    <path d="M12 6c3.3 0 6 3 6 7 0 4-2.7 7-6 7s-6-3-6-7c0-4 2.7-7 6-7z" />
    <path d="M12 6c-1.6 1.8-2.5 4.4-2.5 7s.9 5.2 2.5 7M12 6c1.6 1.8 2.5 4.4 2.5 7s-.9 5.2-2.5 7" />
  </svg>
);

export const NutIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3c4 0 7 3.2 7 7.5 0 5-3.5 10.5-7 10.5S5 15.5 5 10.5C5 6.2 8 3 12 3z" />
    <path d="M12 3c-2 2.5-3 5-3 7.5M12 3c2 2.5 3 5 3 7.5M9 10.5h6" />
  </svg>
);

export const FlowerIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="11" r="2" />
    <path d="M12 9c0-3 .8-5 0-6-.8 1 0 3 0 6M12 13c0 3-.8 5 0 6 .8-1 0-3 0-6M10 11c-3 0-5-.8-6 0 1 .8 3 0 6 0M14 11c3 0 5-.8 6 0-1 .8-3 0-6 0" />
    <path d="M10.3 9.3 7.5 6.5M13.7 9.3l2.8-2.8M10.3 12.7l-2.8 2.8M13.7 12.7l2.8 2.8" />
  </svg>
);

export const AlertTriangleIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M10.3 3.8 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const AlertOctagonIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M8 2.5h8l5.5 5.5v8L16 21.5H8L2.5 16V8L8 2.5z" />
    <path d="M12 8v5M12 16.5h.01" />
  </svg>
);

export const InfoIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 11v5M12 7.5h.01" />
  </svg>
);

export const PhoneIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 1-.8 1.8-1.8 1.7C12 22.5 1.5 12 1.8 4.8 1.8 3.8 2.6 3 3.6 3h2.9z" />
  </svg>
);

export const ClockIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ExternalLinkIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
    <path d="M18 13.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.5" />
  </svg>
);

export const CopyIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 8.5 12 15.5 19 8.5" />
  </svg>
);

export const ArrowDownIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const RefreshIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 11a9 9 0 0 1 15-5.7L21 8M21 4v4h-4M21 13a9 9 0 0 1-15 5.7L3 16M3 20v-4h4" />
  </svg>
);

export const XIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SearchIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="7.5" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const HeartPulseIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M20.8 7.5a4.6 4.6 0 0 0-8-3 4.6 4.6 0 0 0-8 3c0 4.6 5.5 8.3 8 10.5 1.2-1 3-2.3 4.5-3.9" />
    <path d="M3 12.5h3l1.5-3 2.5 6 1.8-4 1.2 2h4" />
  </svg>
);

export const ShieldIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9.5 4-1.7 7-5 7-9.5V6l-7-3z" />
    <path d="M9 11.5 11 13.5 15.5 9" />
  </svg>
);
