import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';

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
    ],
    server: {
        hmr: {
            host: 'localhost'
        }
    },
    build: {
        sourcemap: "hidden",
    }
});
