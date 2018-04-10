import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Content from '@/view/content'
import Detail from '@/view/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/content'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/content',
          name: 'contentList',
          component: Content
        },
        {
          path: '/detail/:detailId',
          name: 'detail',
          component: Detail
        }
      ]
    }
  ]
})
