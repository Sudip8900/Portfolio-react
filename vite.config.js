import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],
  base: process.env.VITE_BASE_PATH || "/Portfolio-react/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('node_modules/three/')) {
              return 'vendor-three';
            }
            if (id.includes('gsap') || id.includes('@gsap')) {
              return 'vendor-gsap';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}))