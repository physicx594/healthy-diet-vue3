import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

AOS.init()

app.mount('#app')
