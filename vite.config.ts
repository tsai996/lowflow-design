import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {viteMockServe} from "vite-plugin-mock";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Unocss from 'unocss/vite'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/lowflow-design',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3200,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8084',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        Unocss(),
        VueSetupExtend(),
        viteMockServe({
            mockPath: './src/mock',
            localEnabled: true,
            prodEnabled: true,
            injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `,
        }),
        Components({
            extensions: ['vue', 'tsx', 'md'],
            globs: ['src/components/*/*.vue', 'src/components/*/*.tsx'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.[tj]sx?$/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/typings/components.d.ts'
        }),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()],
            dts: 'src/typings/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json'
            }
        }),
        // svg 图标
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]'
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // 打包分类
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                // 打包后的文件夹名称生成规则-->解决部分静态服务器无法正常返回_plugin-vue_export-helper文件
                sanitizeFileName(name) {
                    const match = /^[a-z]:/i.exec(name)
                    const driveLetter = match ? match[0] : ''
                    return (
                        driveLetter +
                        // eslint-disable-next-line no-control-regex
                        name.substring(driveLetter.length).replace(/[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g, '')
                    )
                }
            }
        }
    }
})
