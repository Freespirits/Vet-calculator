/**
 * וט-חולים — Veterinary Calculator
 * Aurora-Clinic shell: sticky header, WebGL hero, tool switcher
 * (drug dosage ⇄ toxicity suite), disclaimer and footer.
 *
 * Accessibility (IS 5568 / WCAG 2.0 AA): a skip link leads to <main>, the
 * page content lives in #app-content so the accessibility menu can scope
 * display modes to it, and the floating accessibility widget + statement
 * modal are mounted as siblings (kept outside any CSS filter).
 */
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Tools } from './features/Tools';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { useI18n } from './i18n/LanguageProvider';
import { a11yStrings } from './a11y/strings';
import { AccessibilityWidget } from './a11y/AccessibilityWidget';
import { AccessibilityStatement } from './a11y/AccessibilityStatement';

export default function App() {
  const { lang } = useI18n();
  const a11y = a11yStrings(lang);

  return (
    <>
      <a href="#main" className="skip-link">
        {a11y.skip}
      </a>
      <div id="app-content" className="relative flex min-h-[100dvh] flex-col">
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Hero />
          <Tools />
          <div className="mx-auto max-w-2xl px-4 pb-4">
            <Disclaimer />
          </div>
        </main>
        <Footer />
        <Analytics />
      </div>
      <AccessibilityWidget />
      <AccessibilityStatement />
    </>
  );
}
