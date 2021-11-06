import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import * as path from "path";

export default defineConfig({
    define: {
        'process.env': {}
    },
    plugins: [vue()],
    server: {
        port: 3000
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            }
        ]
    },
    build: {
        chunkSizeWarningLimit: 800,
        sourcemap: true,
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    }
})
