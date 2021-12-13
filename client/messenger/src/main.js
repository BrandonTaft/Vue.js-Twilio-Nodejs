import Vue from 'vue';
import App from './App.vue';
import Sms from './Sms.vue'
import axios from 'axios';
import "./assets/styles/main.css";
import 'animate.css';

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://localhost:3000/reminders",
});


Vue.prototype.$http = http;
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Sms),
}).$mount('#sms')
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'