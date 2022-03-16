import Vue from 'vue'
import App from './App.vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import nelielUI from 'neliel-ui'
import './http'

Vue.use(elementUI)
Vue.use(nelielUI)

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
