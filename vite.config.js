import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In dev mode: '/' so http://localhost:5173/ opens directly
  // In build mode for GitHub Pages: '/jiya-birthday/'
  base: command === 'serve' ? '/' : './',
  build: {
    chunkSizeWarningLimit: 2000,
  },
}))
