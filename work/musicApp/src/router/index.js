import Vue from 'vue'
import Router from 'vue-router'
import searchMusic from '@/components/searchMusic'
import myMusic from '@/components/myMusic'
import friends from '@/components/friends'
import account from '@/components/account'
import songListDetail from '@/components/songListDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/searchMusic'
    },
    {
      path: '/searchMusic',
      name: 'searchMusic',
      component: searchMusic
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: myMusic
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/songListDetail/:id',
      name: 'songListDetail',
      component: songListDetail
    }
  ]
})
