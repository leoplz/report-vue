import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'
import './plugins/element.js'
import axios from 'axios'
import sysConfig from './properties.json'
import md5 from 'js-md5';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$config = sysConfig;
Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;





new Vue({
    router,
    render: h => h(App)
}).$mount('#app')