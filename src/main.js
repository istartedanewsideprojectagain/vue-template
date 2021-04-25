import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AxiosService from '@/services/AxiosService';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/app.css';

Vue.config.productionTip = false;

Vue.component('fa-icon', FontAwesomeIcon);
AxiosService.init();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
