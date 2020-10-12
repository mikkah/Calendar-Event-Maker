import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import { api } from './helpers/Axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';


Vue.prototype.$axios = api;
Vue.prototype.$toastr = toastr;

export const bus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app');


