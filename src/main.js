import { createApp } from 'vue'
//import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from '../locales/locales'
import "./assets/globalStyle.css"

const Vue3Mq = require('vue3-mq');
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
//import { all } from '@awesome.me/kit-KIT_CODE/icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas)
library.add(fab)

const app = createApp(App)
app.use(router)
app.use(i18n)
.component('MqResponsive', Vue3Mq.MqResponsive)
app.component('fa-icon', FontAwesomeIcon)

app.mount('#app')

Vue3Mq.updateBreakpoints({
    preset: "bootstrap5"
  })
