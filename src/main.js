// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './script/common.js'
// import {MP} from './script/map.js'
import './assets/css/global.css'
import './assets/css/style.css'
import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios
// vuex 导入 store
import store from "@/store/index.js"
// import  "@/store/module/golbal.js"
import AwesomePicker from 'vue-awesome-picker';

// import 'lib-flexible'
Vue.use(AwesomePicker);

Vue.config.productionTip = false
/* eslint-disable no-new */
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
// 日历插件
// import dateTime from 'vue-date-time-m';
// Vue.component('data-time', dateTime);
// 压缩图片
import common from './script/compress.js'
Vue.prototype.common = common//挂载到Vue实例上面
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',

})





