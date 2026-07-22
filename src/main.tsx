// SSG entry (vite-react-ssg, routes mode): each language lives at its own
// URL — / is Hebrew (the x-default), /en is English — and both are baked to
// static HTML at build time so crawlers that never execute JavaScript
// (GPTBot, ClaudeBot, PerplexityBot…) see the full content of each language.
// Google reads language from visible text only, hence real text per URL.
// The bundle hydrates normally in the browser; tool navigation stays on the
// existing hash router inside App.
import { StrictMode } from 'react';
import { ViteReactSSG } from 'vite-react-ssg';
import type { RouteRecord } from 'vite-react-ssg';

// Self-hosted variable fonts (no render-blocking CDN request).
import '@fontsource-variable/inter';
import '@fontsource-variable/heebo';

import './index.css';
import './a11y/a11y.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';
import { SeoHead, type PageLang } from './components/SeoHead';

function Shell({ page }: { page: PageLang }) {
  return (
    <StrictMode>
      {/* / keeps the stored/browser language on the client; /en is pinned. */}
      <LanguageProvider initial={page === 'en' ? 'en' : undefined}>
        <AccessibilityProvider>
          <SeoHead page={page} />
          <App />
        </AccessibilityProvider>
      </LanguageProvider>
    </StrictMode>
  );
}

const routes: RouteRecord[] = [
  { path: '/', element: <Shell page="he" /> },
  { path: '/en', element: <Shell page="en" /> },
];

export const createRoot = ViteReactSSG({ routes });
