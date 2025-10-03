import { defineConfig } from 'vite';
const { resolve } = require('path');
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
    build: {
        chunkSizeWarningLimit: 800
    },
    resolve: {
        alias: [{
            find: '@',
            replacement: resolve(__dirname, './resources/js')
        }],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.frag': 'text',
                '.vert': 'text',
            }
        }
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    }
});
