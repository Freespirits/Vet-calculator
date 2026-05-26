/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Theming is driven by [data-theme] + CSS variables (see index.css).
  // Dark "Aurora Clinic" is the default; light "Clinic Day" is opt-in.
  theme: {
    extend: {
      colors: {
        // Surfaces & text reference CSS variables so they flip with the theme.
        bg0: 'rgb(var(--bg-0) / <alpha-value>)',
        bg1: 'rgb(var(--bg-1) / <alpha-value>)',
        bg2: 'rgb(var(--bg-2) / <alpha-value>)',
        ink: 'rgb(var(--text-hi) / <alpha-value>)',
        muted: 'rgb(var(--text-lo) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        // Brand accents are constant across themes (legible on both).
        teal: '#2DD4BF',
        emerald: '#10B981',
        violet: '#8B5CF6',
        amber: '#F59E0B',
        orange: '#FB923C',
        rose: '#F43F5E',
      },
      fontFamily: {
        // Heebo carries Hebrew + Latin; Inter is the Latin display/data face.
        sans: ['"Inter Variable"', 'Inter', '"Heebo Variable"', 'Heebo', 'system-ui', 'sans-serif'],
        hebrew: ['"Heebo Variable"', 'Heebo', '"Assistant Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes for the hero / result numerals.
        'display-lg': ['clamp(2.75rem, 9vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'result': ['clamp(3rem, 12vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.06)',
        glow: '0 0 0 1px rgba(45,212,191,0.25), 0 0 32px -4px rgba(45,212,191,0.35)',
        'glow-rose': '0 0 0 1px rgba(244,63,94,0.3), 0 0 36px -4px rgba(244,63,94,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(244,63,94,0.5)' },
          '70%': { boxShadow: '0 0 0 14px rgba(244,63,94,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(244,63,94,0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
