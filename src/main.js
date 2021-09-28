import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局css
import '@/styles/index.scss'

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 全局过滤器
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')