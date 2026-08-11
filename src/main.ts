import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/languages'
import pinia from '@/stores'
import { useLanguageStore } from '@/stores/language'
import 'virtual:svg-icons-register'
import 'uno.css'
import '@/styles/index.scss'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import 'element-plus/theme-chalk/el-input-number.css'

const app = createApp(App)

import * as Icons from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}
app.use(pinia).use(router).use(i18n)

const languageStore = useLanguageStore(pinia)
watch(
  () => languageStore.locale,
  (locale) => {
    i18n.global.locale.value = locale
    document.documentElement.lang = locale
  },
  { immediate: true }
)

app.mount('#app')
