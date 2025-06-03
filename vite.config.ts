import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './dist',
        rollupOptions: {
            input: './functions/kinde-webhook.ts',
            output: {
                entryFileNames: 'functions/kinde-webhook.js',
                format: 'esm',
            },
        },
    },
});