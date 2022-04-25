import Vue from 'vue'
import App from './App.vue'
import './styles/index.css'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import nelielUI from 'neliel-ui'
import http from './http'
import log from './utils/log'
import router from './router'

Vue.use(elementUI)
Vue.use(nelielUI)
Vue.prototype.$http = http
Vue.prototype.$log = log

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
