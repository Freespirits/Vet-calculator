import { Suspense, lazy, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowDownIcon } from './Icons';
import { Mascot } from './Mascot';

// Lazy: Three.js never blocks first paint; the CSS gradient shows instantly.
const AuroraBackground = lazy(() => import('../webgl/AuroraBackground'));

export function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Pause the WebGL loop once the hero scrolls out of view.
  const inView = useInView(ref, { margin: '0px 0px -40% 0px' });

  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      {reduced ? (
        // Reduced motion: skip the WebGL field (and the Three.js download)
        // entirely — the static gradient stands in.
        <div className="absolute inset-0 aurora-fallback" aria-hidden="true" />
      ) : (
        <Suspense fallback={<div className="absolute inset-0 aurora-fallback" aria-hidden="true" />}>
          <AuroraBackground active={inView} className="absolute inset-0" />
        </Suspense>
      )}

      {/* readability scrim — darkens edges/top/bottom so the title pops */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(72% 50% at 50% 46%, transparent, rgb(var(--bg-0) / 0.62) 100%), linear-gradient(to bottom, rgb(var(--bg-0) / 0.40), transparent 30% 60%, rgb(var(--bg-0) / 0.82))',
        }}
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <motion.span
          {...stagger(0)}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-teal"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          {t('brand.tagline')}
        </motion.span>

        <motion.div {...stagger(1)} className="relative my-3 grid place-items-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.5), rgba(139,92,246,0.28) 45%, transparent 70%)',
            }}
          />
          <Mascot size={172} label={t('brand.name')} />
        </motion.div>

        {/* The page's single h1 — crawlers had no heading to anchor on. */}
        <motion.h1
          {...stagger(2)}
          className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl text-balance"
        >
          {t('brand.name')}
        </motion.h1>

        <motion.p
          {...stagger(3)}
          className="mt-4 max-w-md text-lg text-ink/75 text-balance"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.a {...stagger(4)} href="#tools" className="btn-primary mt-9 px-8 text-lg">
          {t('hero.cta')}
        </motion.a>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#tools"
        aria-label={t('hero.scroll')}
        className="absolute bottom-7 z-10 flex flex-col items-center gap-1 text-muted"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={reduced ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-wide">{t('hero.scroll')}</span>
        <ArrowDownIcon size={20} />
      </motion.a>
    </section>
  );
}
