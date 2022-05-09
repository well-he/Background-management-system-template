import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
            },
        },
    },
    base: './',
    plugins: [vue()],
});
