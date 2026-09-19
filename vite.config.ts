import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // Development stays on the root; production builds into the GitHub Pages subpath.
  // Keep in sync with the live URL: https://fridayevening.github.io/yanfei-portfolio/
  base: command === 'build' ? '/yanfei-portfolio/' : '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
}))
