import Vue from 'vue'
import fetch from 'the-fetch'
import App from './App.vue'
import router from './router'

fetch.defaults.base = 'http://localhost:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
