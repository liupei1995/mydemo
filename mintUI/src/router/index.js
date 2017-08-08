import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import checkCity from '@/components/checkCity'
import money from '@/components/money'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/Hello'
    },
    {
    	path: '/checkCity',
    	name: 'checkCity',
    	component: money
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
