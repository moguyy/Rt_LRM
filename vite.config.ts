import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow reading the sibling `project_content.md` from the parent workspace.
      allow: [path.resolve(__dirname, '..')],
    },
  },
  base: '/Rt_LRM/',
})
