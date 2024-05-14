import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { join } from 'path'
import tailwindcss from 'tailwindcss'
import vitePluginImp from 'vite-plugin-imp'
import autoprefixer from 'autoprefixer'
import svgr from 'vite-plugin-svgr'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
    base: './',
    build: {
        target: 'esnext',
        outDir: 'dist',
        assetsDir: 'static',
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                assetFileNames: 'assets/[name].[hash].[ext]',
                chunkFileNames: 'chunks/[name].[hash].js',
                entryFileNames: '[name].js',
            },
            input: {
                main: path.resolve(__dirname, 'index.html')
            },
        },
    },
    plugins: [
        react(),
        svgr(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
        }),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/es/${name}/style`,
                },
            ],
        }),
    ],
    server: {
        host: 'localhost',
        open: '/',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, 'http://localhost:3001')
            },
            '/socket.io': {
                target: 'ws://localhost:3001',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/~\/socket.io/, 'ws://localhost:3001'),
            },
        },
    },
    resolve: {
        alias: {
            '@': join(__dirname, './src'),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer],
        }
    }
});
