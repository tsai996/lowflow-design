import { createI18n } from 'vue-i18n'
import { useNavigatorLanguage } from '@vueuse/core'
import en from './langs/en-US'
import zh from './langs/zh-CN'

export const supportedLocales = ['zh-CN', 'en-US'] as const
export type Locale = (typeof supportedLocales)[number]

export const isLocale = (value: unknown): value is Locale =>
  supportedLocales.includes(value as Locale)

const { language } = useNavigatorLanguage()

export const detectBrowserLocale = (): Locale =>
  language.value?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectBrowserLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zh,
    'en-US': en
  }
})
export default i18n
