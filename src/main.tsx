import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts (no render-blocking CDN request).
import '@fontsource-variable/inter';
import '@fontsource-variable/heebo';

import './index.css';
import './a11y/a11y.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </LanguageProvider>
  </StrictMode>,
);
