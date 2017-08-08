<template>
	<div class="money">
		<mt-header fixed title="支付详情">
	      <router-link to="/Hello" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>
	    </mt-header>
	    <div>
	    	<div class="list"></div>
	    </div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default{
		name:'money',
		data() {
			return {
				users:[],
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
		created(){
			$.ajax({
				url:"http://192.168.1.10:8085/im-app/account/balance/dealflow",
				type:'post',
				dataType: 'json',
				success:function(data){
					console.log(1)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
	
</style>