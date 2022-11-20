import { defineConfig } from 'vite';
const { resolve } = require('path');
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import {viteSingleFile} from "vite-plugin-singlefile";

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
        //viteSingleFile()
    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
    resolve: {
        alias: {
            '@': resolve('./resources/js'),
        },
    },
});
