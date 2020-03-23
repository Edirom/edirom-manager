import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './../public/resources/css/spectre.min.css'
import './../public/resources/css/spectre-exp.min.css'
import './../public/resources/css/spectre-icons.min.css'

// Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
