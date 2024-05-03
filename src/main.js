import { createApp } from 'vue'
//import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from '../locales/locales'
const Vue3Mq = require('vue3-mq');

const app = createApp(App)
app.use(router)
app.use(i18n)
.component('MqResponsive', Vue3Mq.MqResponsive)
app.mount('#app')

Vue3Mq.updateBreakpoints({
    preset: "bootstrap5"
  })
