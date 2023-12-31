// vite.config.ts
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  base: '/',
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['pyraminxolver'],
  },
})