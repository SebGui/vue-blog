import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '../locales/locales'
import VueCookies from 'vue-cookies'
import "./assets/globalStyle.css"

const Vue3Mq = require('vue3-mq');
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import timeago from 'vue-timeago3'

/* add icons to the library */
library.add(fas)
library.add(fab)

const app = createApp(App)
app.use(timeago)
app.use(router)
app.use(i18n)
app.use(VueCookies, { expires: '60MIN'})
.component('MqResponsive', Vue3Mq.MqResponsive)
app.component('fa-icon', FontAwesomeIcon)

app.mount('#app')

Vue3Mq.updateBreakpoints({
    preset: "bootstrap5"
  })
