import Vue from 'vue'
import App from './App.vue'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'AxIYeWN22F6ZptXOkNu64KOZ'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
