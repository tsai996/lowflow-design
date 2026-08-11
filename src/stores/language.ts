import { defineStore } from 'pinia'
import { detectBrowserLocale, isLocale, type Locale } from '@/languages'

export const useLanguageStore = defineStore(
  'language',
  () => {
    const locale = shallowRef<Locale>(detectBrowserLocale())

    const setLocale = (value: Locale) => {
      locale.value = value
    }

    const toggleLocale = () => {
      setLocale(locale.value === 'zh-CN' ? 'en-US' : 'zh-CN')
    }

    return { locale, setLocale, toggleLocale }
  },
  {
    persist: {
      key: 'lowflow.locale',
      pick: ['locale'],
      afterHydrate: ({ store }) => {
        if (!isLocale(store.locale)) store.locale = detectBrowserLocale()
      }
    }
  }
)
