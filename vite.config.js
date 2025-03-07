import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/skeletal-growth-website/",
    server: {
        port: '7777'
    },
    build: {
        sourcemap: true
    }
})
