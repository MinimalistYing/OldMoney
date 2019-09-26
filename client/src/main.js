import Vue from 'vue'
import fetch from 'the-fetch'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts'
import theme from './theme.json'
import App from './App.vue'
import router from './router'

echarts.registerTheme('oldmoney', theme)

fetch.defaults.base = 'http://localhost:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// register component to use
Vue.component('v-chart', ECharts)
