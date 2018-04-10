// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.use(Mint)
Vue.config.productionTip = false

const store=new Vuex.Store({
	state:{
		cityName:'泸',
		users:[]
	},
	mutations:{
		changeCity(state,city){
			state.cityName = city
		},
		saveData(state,array){
			state.users = array
		}
	},
	actions:{
		async(){
			setTimeout(function(){
				console.log(1)
			},1000)
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
