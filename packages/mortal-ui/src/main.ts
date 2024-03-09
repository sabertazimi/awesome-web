import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import locales from './locales'
import './assets/main.css'

const locale = localStorage.getItem('locale') || 'en'

const app = createApp(App)

app.use(createPinia())
app.use(
  createI18n({ legacy: false, locale, fallbackLocale: 'en', messages: locales }),
)
app.use(createHead())

app.mount('#app')
