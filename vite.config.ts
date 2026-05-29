import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base stays '/' for root-domain hosting (Vercel / vet-holim.com).
export default defineConfig({
  plugins: [react()],
})
