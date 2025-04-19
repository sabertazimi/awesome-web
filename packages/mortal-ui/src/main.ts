import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import locales from './locales'
import './assets/main.css'

const locale = localStorage.getItem('locale') ?? 'en'

// eslint-disable-next-line ts/no-unsafe-argument -- Safe to use.
const app = createApp(App)

app.use(createPinia())
app.use(
  createI18n({ legacy: false, locale, fallbackLocale: 'en', messages: locales }),
)
app.use(createHead())

app.mount('#app')
