<<<<<<< HEAD
<template>
	<div class="checkCity">
		<mt-header fixed title="归属地">
	      <router-link to="/Hello" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>
	    </mt-header>
		<div class="selectCity">
			<div class="citys" v-for="area in areas">
				<p class="title">
					{{area.title}}
				</p>
				<ul>
					<li v-for="item in area.citys" v-on:click="select(item)"
					:class="{active: item.isActive}">
						<span>{{item.city}}</span> <br>
						<span>{{item.simple}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import bus from '../assets/js/bus.js'
	export default{
		name:'checkCity',
		data(){
			return {
				areas:[
						{title:'直辖市',
						citys:[
								{city:'北京',simple:'京',isActive:false},
								{city:'重庆',simple:'渝',isActive:false},
								{city:'上海',simple:'泸',isActive:false},
								{city:'天津',simple:'津',isActive:false}
							]
						},
						{title:'华东',
						citys:[
								{city:'安徽',simple:'皖',isActive:false},
								{city:'福建',simple:'闵',isActive:false},
								{city:'江西',simple:'赣',isActive:false},
								{city:'江苏',simple:'苏',isActive:false},
								{city:'山东',simple:'鲁',isActive:false},
								{city:'浙江',simple:'浙',isActive:false},
							]
						}
				]
			}
		},
		methods: {
			select (item) {
				if (item.city!=null) {
					this.$nextTick(function(){
						this.areas.forEach(function(item){
							item.citys.forEach(function(item){
								Vue.set(item,'isActive',false)
							})
						})
						Vue.set(item,'isActive',true)
						this.$store.commit('changeCity',item.simple)
						// bus.$emit('citySelect',item.simple)
					})
					var that=this
					setTimeout(()=>{
						that.$router.push('/Hello')
					},500)
					// this.$router.push('/Hello')
					// this.$store.dispatch('async')
				}
			}
		}
	}
</script>

<style scoped>
	@import url('../assets/css/commen.css');
	.selectCity{
		margin-top: 40px;
	}
	ul{
		list-style: none;
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		padding: 0;
		margin: 0;
	}
	li{
		float: left;
		width: 16%;
		text-align: center;
		height: 90%;
		padding-top: 5px;
		background-color: #FFFFFF;
	}
	li+li{
		border-left: 1px solid #d9d9d9;
	}
	li.active{
		background-color: #E43844;
	}
	.title{
		height: 30px;
		line-height: 30px;
		color: #666666;
		padding-left: 10px;
		margin: 0px;
	}
	ul li span:first-child{
		color: #1A1A1A;
		font-size: 15px;
	}
	ul li.active span:first-child{
		color: #FFFFFF;
	}
	ul li span:last-child{
		color: #666666;
		font-size: 13px;
	}
	ul li.active span:last-child{
		color: #FFFFFF;
	}
=======
<template>
	<div class="checkCity">
		<mt-header fixed title="归属地">
	      <router-link to="/Hello" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>
	    </mt-header>
		<div class="selectCity">
			<div class="citys" v-for="area in areas">
				<p class="title">
					{{area.title}}
				</p>
				<ul>
					<li v-for="item in area.citys" v-on:click="select(item)"
					:class="{active: item.isActive}">
						<span>{{item.city}}</span> <br>
						<span>{{item.simple}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import bus from '../assets/js/bus.js'
	export default{
		name:'checkCity',
		data(){
			return {
				areas:[
						{title:'直辖市',
						citys:[
								{city:'北京',simple:'京',isActive:false},
								{city:'重庆',simple:'渝',isActive:false},
								{city:'上海',simple:'泸',isActive:false},
								{city:'天津',simple:'津',isActive:false}
							]
						},
						{title:'华东',
						citys:[
								{city:'安徽',simple:'皖',isActive:false},
								{city:'福建',simple:'闵',isActive:false},
								{city:'江西',simple:'赣',isActive:false},
								{city:'江苏',simple:'苏',isActive:false},
								{city:'山东',simple:'鲁',isActive:false},
								{city:'浙江',simple:'浙',isActive:false},
							]
						}
				]
			}
		},
		methods: {
			select (item) {
				if (item.city!=null) {
					this.$nextTick(function(){
						this.areas.forEach(function(item){
							item.citys.forEach(function(item){
								Vue.set(item,'isActive',false)
							})
						})
						Vue.set(item,'isActive',true)
						this.$store.commit('changeCity',item.simple)
						// bus.$emit('citySelect',item.simple)
					})
					var that=this
					setTimeout(()=>{
						that.$router.push('/Hello')
					},500)
					// this.$router.push('/Hello')
					// this.$store.dispatch('async')
				}
			}
		}
	}
</script>

<style scoped>
	@import url('../assets/css/commen.css');
	.selectCity{
		margin-top: 40px;
	}
	ul{
		list-style: none;
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		padding: 0;
		margin: 0;
	}
	li{
		float: left;
		width: 16%;
		text-align: center;
		height: 90%;
		padding-top: 5px;
		background-color: #FFFFFF;
	}
	li+li{
		border-left: 1px solid #d9d9d9;
	}
	li.active{
		background-color: #E43844;
	}
	.title{
		height: 30px;
		line-height: 30px;
		color: #666666;
		padding-left: 10px;
		margin: 0px;
	}
	ul li span:first-child{
		color: #1A1A1A;
		font-size: 15px;
	}
	ul li.active span:first-child{
		color: #FFFFFF;
	}
	ul li span:last-child{
		color: #666666;
		font-size: 13px;
	}
	ul li.active span:last-child{
		color: #FFFFFF;
	}
>>>>>>> 0a6b562159fce228464cea5af1786cc57a593066
</style>