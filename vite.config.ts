import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is set for GitHub Pages project hosting (https://freespirits.github.io/Vet-calculator/).
// In dev it stays '/' so local `npm run dev` is unaffected.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Vet-calculator/' : '/',
  plugins: [react()],
}))
