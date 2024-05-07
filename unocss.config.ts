import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  // 自定义组合样式
  shortcuts: {
    bgc: 'flex red',
    'flex-col-center': 'flex-center flex-col',
    'flex-col': 'flex flex-col',
    'flex-items-center': 'flex items-center',
    'flex-center': 'flex-items-center justify-center',
    'flex-between': 'flex-items-center justify-between',
    'flex-space': 'flex-items-center flex-justify-between',
    'wh-full': 'w-full h-full',
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ]
})
