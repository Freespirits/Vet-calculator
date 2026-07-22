import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// vite-react-ssg reads this extra key from the vite config; vite's own
// UserConfig type doesn't know it, hence the widened cast on export.
interface SSGUserConfig extends UserConfig {
  ssgOptions?: { dirStyle?: 'flat' | 'nested' }
}

// https://vite.dev/config/
// base stays '/' for root-domain hosting (Vercel / vet-holim.work).
const config: SSGUserConfig = {
  // vite-react-ssg: emit en/index.html (not en.html) so /en serves
  // statically on Vercel with no rewrite config.
  ssgOptions: {
    dirStyle: 'nested',
  },
  plugins: [
    react(),
    // Installable + offline-first: the whole clinical core (drug DB, toxin
    // calculators, plant photos) is precached because poison emergencies
    // happen where signal doesn't. og.png is share-bait only — skipped.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Vet-Holim — Veterinary Calculator',
        short_name: 'Vet-Holim',
        description:
          'Drug dosing & toxicity calculators for dogs and cats — 130+ cited drugs, 14 toxicity tools, 35 toxic plants.',
        theme_color: '#070B14',
        background_color: '#070B14',
        display: 'standalone',
        start_url: '/',
        lang: 'he',
        dir: 'rtl',
        categories: ['medical', 'utilities'],
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        globIgnores: ['**/og.png', '**/node_modules/**'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: '/index.html',
        // /en has its own prerendered page — the SPA fallback must not
        // hijack it and serve the Hebrew shell (breaks hydration + SEO).
        navigateFallbackDenylist: [/^\/en/],
      },
    }),
  ],
}

export default defineConfig(config)
