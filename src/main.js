import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios相关
import axios from 'axios'
import VueAxios from 'vue-axios'
// 导入mock模拟数据
import "./mock/index"
//引入echarts
import *as echarts from 'echarts'
Vue.prototype.$echarts =echarts

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)
Vue.use(VueAxios,axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
