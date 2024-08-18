import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://172.20.0.3:3060'
      }
    },
    port:5173,
    strictPort: true,
    host: true,
  }
})
