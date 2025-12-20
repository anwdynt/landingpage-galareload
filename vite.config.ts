import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import webpConverterPlugin from './plugins/webpConverter';

export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),
        tsconfigPaths(),
        ViteImageOptimizer({
            png: {
                quality: 85,
            },
            jpg: {
                quality: 80,
            },
            svg: {
                multipass: true,
            },
        }),
        webpConverterPlugin({
            inputDirs: ['public/images', 'public/icons'],
            outputBase: 'build/client',
            quality: 80,
            deleteOriginal: false,
        }),
    ],
});
