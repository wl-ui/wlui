import Vue from 'vue'
import App from './App.vue'
import './plugins/install'
import '../mock/install'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
