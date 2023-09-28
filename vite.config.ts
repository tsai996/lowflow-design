import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import {viteMockServe} from "vite-plugin-mock"

import Unocss from 'unocss/vite'
import {
    presetAttributify,
    presetIcons,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    base: '/lowflow-design',
    resolve: {
        alias: {
            '~/': `${pathSrc}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        viteMockServe({
            mockPath: './mock',
            localEnabled: true,
            prodEnabled: true,
            injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `,
        }),
        VueSetupExtend(),
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['ts'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.[tj]sx?$/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),

        // https://github.com/antfu/unocss
        // see unocss.config.ts for config
        Unocss({
            presets: [
                presetUno(),
                presetAttributify(),
                presetIcons({
                    scale: 1.2,
                    warn: true,
                }),
            ],
            rules: [
                ['flex-center', {display: 'flex', 'align-items': 'center', 'justify-content': 'center'}]
            ],
            transformers: [
                transformerDirectives(),
                transformerVariantGroup(),
            ]
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // 打包分类
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                // 分包策略
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        return id.split('/node_modules/').pop()?.split('/')[0]
                    }
                },
                // 打包后的文件夹名称生成规则-->解决部分静态服务器无法正常返回_plugin-vue_export-helper文件
                sanitizeFileName(name) {
                    const match = /^[a-z]:/i.exec(name)
                    const driveLetter = match ? match[0] : ''
                    return (
                        driveLetter +
                        name.substring(driveLetter.length).replace(/[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g, '')
                    )
                }
            }
        }
    }
})
