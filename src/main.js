/* Styles */
import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Buefy from 'buefy'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.all'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AsideMenuList from '@/components/AsideMenuList'

import App from './App.vue'

Vue.config.productionTip = false

Vue.component('AsideMenuList', AsideMenuList)

Vue.use(Buefy)

library.add([faLock, faEnvelope, faPlus])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
