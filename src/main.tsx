// Single-page SSG entry (vite-react-ssg): the full app is pre-rendered to
// static HTML at build time so crawlers that never execute JavaScript
// (GPTBot, ClaudeBot, PerplexityBot…) still see the real content, then the
// bundle hydrates in the browser. Everything browser-only stays inside
// effects / typeof-window guards.
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import { StrictMode } from 'react';

// Self-hosted variable fonts (no render-blocking CDN request).
import '@fontsource-variable/inter';
import '@fontsource-variable/heebo';

import './index.css';
import './a11y/a11y.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';

export const createRoot = ViteReactSSG(
  <StrictMode>
    <LanguageProvider>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </LanguageProvider>
  </StrictMode>,
);
