import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],
  // base: process.env.VITE_BASE_PATH || "/Portfolio-react/",
  base: mode === "production" ? "/Portfolio-react/" : "/",
}))
