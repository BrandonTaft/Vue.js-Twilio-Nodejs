import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';


const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/todos',
});


Vue.prototype.$http = http;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'