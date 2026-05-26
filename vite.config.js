import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // './' generates relative asset paths — works on any GitHub Pages URL
    // without needing to know the repo name at build time
    base: env.VITE_BASE_URL || './',
  }
})
