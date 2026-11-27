import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // e2e/ holds the real-browser checks, which Playwright runs (npm run test:browser).
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
