/**
 * PageShell — everything one prerendered language page renders: the providers,
 * the document head and the app.
 *
 * `page` is the route language. The root page (/, Hebrew) leaves the language
 * unpinned, so in the browser it adopts the visitor's stored or browser
 * language after hydration; every /<code>/ page is pinned to its language so
 * the static HTML and the hydrated page agree.
 *
 * It is a file of its own so that main.tsx, which exports the SSG root factory
 * rather than a component, contains no component definitions.
 */
import { StrictMode } from 'react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';
import { SeoHead } from './components/SeoHead';
import type { PageLang } from './components/seoMeta';

export function PageShell({ page }: { page: PageLang }) {
  return (
    <StrictMode>
      <LanguageProvider initial={page === 'he' ? undefined : page}>
        <AccessibilityProvider>
          <SeoHead page={page} />
          <App />
        </AccessibilityProvider>
      </LanguageProvider>
    </StrictMode>
  );
}
