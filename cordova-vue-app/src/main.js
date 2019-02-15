// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons/iconfont/material-icons.css'
import './assets/style/style.css'

Vue.use(Toast)
Vue.use(MuseUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
