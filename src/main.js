import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 导入antd
import Antd from 'ant-design-vue'
// 导入antd样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
// 使用注册antd
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
