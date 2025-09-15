import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// thanks to https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg.
const neededKeys = [
    "NEO4J_HOST",
    "NEO4J_USERNAME",
    "NEO4J_PASSWORD"
]

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const processEnv = {}
    neededKeys.forEach(key => processEnv[key] = env[key])

    return {
        define: {
            'process.env': processEnv,
        },
        plugins: [react()],
        base: "/skeletal-growth-website/",
        server: {
            port: '7777',
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        build: {
            sourcemap: true
        },
        esbuild: {
            supported: {
                'top-level-await': true
            }
        }
    }
})

// return {
//     plugins: [react()],
//     base: "/skeletal-growth-website/",
//     server: {
//         port: '7777'
//     },
//     build: {
//         sourcemap: true
//     }
// }