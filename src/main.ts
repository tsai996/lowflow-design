import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
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
app.use(router).use(createPinia())
app.mount('#app')
