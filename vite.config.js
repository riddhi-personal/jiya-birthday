import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jiya-birthday/',   // GitHub Pages repo name
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
