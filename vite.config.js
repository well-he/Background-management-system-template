import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        // proxy: {
        //     '/api': {
        //         // target: 'http://localhost:3001',
        //         target: 'http://localhost:8080',
        //     },
        // },
    },
    plugins: [vue()],
});
