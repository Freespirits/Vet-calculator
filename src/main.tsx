// SSG entry (vite-react-ssg, routes mode): each language lives at its own
// URL — / is Hebrew (the x-default), /en is English — and both are baked to
// static HTML at build time so crawlers that never execute JavaScript
// (GPTBot, ClaudeBot, PerplexityBot…) see the full content of each language.
// Google reads language from visible text only, hence real text per URL.
// The bundle hydrates normally in the browser; tool navigation stays on the
// existing hash router inside App.
import { ViteReactSSG } from 'vite-react-ssg';
import type { RouteRecord } from 'vite-react-ssg';

// Self-hosted variable fonts (no render-blocking CDN request).
import '@fontsource-variable/inter';
import '@fontsource-variable/heebo';

import './index.css';
import './a11y/a11y.css';
import { PageShell } from './PageShell';
import { pathFor } from './components/seoMeta';
import { SUPPORTED_LANGS } from './i18n/languages';

const routes: RouteRecord[] = SUPPORTED_LANGS.map((code) => ({
  path: pathFor(code),
  element: <PageShell page={code} />,
}));

export const createRoot = ViteReactSSG({ routes });
