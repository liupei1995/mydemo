<template>
	<div class="money">
		<mt-header fixed title="支付详情">
	      <router-link to="/Hello" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>
	    </mt-header>
	    <div class="content">
	    	<div class="list" v-for="item in users">
	    		<div>
	    			<span class="title">{{item.tradeType}}</span>
	    			<span class="money">{{item.direction+item.tradeAmount}}</span>
	    		</div>
	    		<p>{{item.tradeDate}}</p>
	    	</div>
	    </div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import {mapState} from 'vuex'
	export default{
		name:'money',
		data() {
			return {
				users:[],
				title:null,
				head:{
					custId: "211216",
	        		requestKey: "IOS_10.3.2",
	       			token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiJxaXl1bnhpbiIsImV4cCI6MTQ5NzY2NDIwMiwiaWF0IjoxNDk3NDA1MDAyLCJyX2lkIjoiMjExMjYiLCJzdWIiOiI4OGI0MWNhYzc3ZjU0YzIxOTYzYjRjYWFhYjY4OWZlNiJ9.UKAYyQWCXibrYhXQhQcUXYj6on6i5Ia05JnVI0LRNUZdDVcits2W4gIfQAX_xHPhLGERWceC-QROpjovKoKKYkfvBiP3l-H0Kqa4j4Ds0Ao6t6Qxsyw_XoTDPMgkr_buSjImhr-e8mrHBxSXIXjjFtbtgYgvUREAEMHn_Rc5834",
	        		trxDate: "20170614155050",
	        		openId: "88b41cac77f54c21963b4c11aaab689fe6",
	        		version: "v1.1",
	        		transCode: "1005000301",
				},
				body:{
					accountNo: "201707281003005051"
				}
			}
		},
		// computed: {
		// 	...mapState([
		//       'users'
		//     ]),
		// },
		created(){
			var that=this
			$.ajax({
				url:"http://192.168.1.10:8085/im-app/account/balance/dealflow",
				type:'post',
				data:JSON.stringify(packgeMac(this.head,this.body)),
				dataType: 'json',
				success:function(data){
					// that.$store.commit('saveData',data.data)
					for (var i = 0; i < data.data.length; i++) {
						data.data[i].tradeDate=formatDate(data.data[i].tradeDate)
						if (data.data[i].direction==1) {
							data.data[i].direction='+'
						}else {
							data.data[i].direction='-'
						}
						if (data.data[i].tradeType=='1') {
							data.data[i].tradeType="收款"
						}
						if (data.data[i].tradeType=='2') {
							data.data[i].tradeType="退款"
						}
						if (data.data[i].tradeType=='5') {
							data.data[i].tradeType="提现"
						}
						if (data.data[i].tradeType=='4') {
							data.data[i].tradeType="手续费"
						}
					}
					that.users=data.data
					
				},
				error:function(error){
					console.log(error)
				}
			})
			// var qs=require('qs');
			// this.$http.post('http://192.168.1.10:8085/im-app/account/balance/dealflow',qs.stringify({
			// 	data:JSON.stringify(packgeMac(this.head,this.body))
			// })).then(function(response){
			// 	console.log(1)
			// }).catch(function(error){
			// 	console.log(2)
			// })
		},
		methods: {

		}
	}
</script>

<style>
	p{
		margin: 0;
	}
	.content{
		margin-top: 44px;
	}
	.list{
		height: 50px;
		margin-top: 10px;
		border-bottom: 1px solid red;
	}
	.list div {
		overflow: hidden;
		font-size: 14px;
	}
	
	.list .title {
		float: left;
		margin-left: 20px;
	}
	
	.list .money {
		float: right;
		margin-right: 20px;
	}
	
	.list p {
		color: black;
	}
</style>