import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    laravel({
      input: [
        'resources/sass/app.scss',
        'resources/js/app.js',
        'resources/views/index.tsx',
      ],
      refresh: true,
    }),
    tsconfigPaths(),
  ],
  server: {
    hmr: {
      host: 'localhost',
    },
    port: 3000,
  },
  build: {
    sourcemap: 'hidden',
  },
})
