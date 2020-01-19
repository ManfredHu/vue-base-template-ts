import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import basePlugin from '@/plugin/basePlugin'
import Dialog from '@/plugin/Dialog'
import Confirm from '@/plugin/Confirm'
import Toast from '@/plugin/Toast'

Vue.use(basePlugin as any)
Vue.use(Dialog as any)
Vue.use(Confirm as any)
Vue.use(Toast as any)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
