import Vue from 'vue'
import Router from 'vue-router'
import AgeList from '@/views/agelist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AgeList',
      component: AgeList
    }
  ]
})
