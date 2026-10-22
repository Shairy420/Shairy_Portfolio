import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the build works from any path, including subfolders.
  base: './',
  plugins: [react(), tailwindcss()],
})
