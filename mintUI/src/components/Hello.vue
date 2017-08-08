<template>
  <div class="hello">
    <mt-header fixed title="车辆信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <img src="../assets/logo.png" ref='img'>
      <div class="inputRow">
        <label>车牌号码
          <router-link to='/checkCity'>
            <a id="cityName">{{city}}</a>
          </router-link>
        </label>
        <input type="text" placeholder="请输入车牌" v-model="chepai" v-on:input="limitLen" @keyup="limitType" @focus="changeState">
      </div>
      <div class="inputRow">
        <label>车辆识别代号</label> 
        <input type="text" placeholder="请输入车辆识别代号" v-model="daihao" v-on:input="limitLen" @keyup="limitType" @focus="changeState">
      </div>
      <div class="inputRow">
        <label>发动机号码</label>
        <input type="text" placeholder="请输入发动机号码" v-model="haoma" v-on:input="limitLen" @keyup="limitType" @focus="changeState">
      </div>
      <mt-button type="danger" v-bind:disabled="canClick" ref="btn">查询</mt-button>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide><h1>silde1</h1></swiper-slide>
      <swiper-slide>silde2</swiper-slide>
      <swiper-slide>silde3</swiper-slide>
      <swiper-slide>silde4</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// import bus from '../assets/js/bus.js'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import {mapState} from 'vuex'
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'hello',
  data(){
    return{
      chepai:'',
      daihao:'',
      haoma:'',
      canClick:true,
      swiperOption: {
        autoplay:1000,
        paginationClickable:true,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction : false
      }
    }
  },
  created(){
    // bus.$on('citySelect',function(simple){
    //   console.log(simple)
    // })
    this.city=this.cityName
  },
  computed: {
    ...mapState([
      'cityName'
    ]),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    limitLen:function (){
      this.chepai=this.chepai.substr(0,5)
      this.daihao=this.daihao.substr(0,20)
      this.haoma=this.haoma.substr(0,20)
    },
    limitType:function (){
      this.chepai=this.chepai.replace(/[\W]/g,'')
      this.daihao=this.daihao.replace(/[\W]/g,'')
      this.haoma=this.haoma.replace(/[\W]/g,'')
    },
    changeState:function (){
      // this.$refs.btn.$el.disabled=""
      this.canClick=false
      this.$refs.img.style.width="20%"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("../assets/css/commen.css");
  .content{
    margin-top: 40px;
    text-align: center;
    padding: 0 10px;
  }
  .inputRow{
    height: 40px;
    border-bottom: 1px solid gray;
  }
  .inputRow label{
    float: left;
    width: 45%;
    text-align: left;
    font-size: 15px;
    line-height: 40px;
  }
  .inputRow input{
    font-size: 15px;
    display: inline-block;
    width: 55%;
    text-align: right;
    border:none;
    outline: none;
    line-height: 38px;
    background-color: #fafafa;
    text-transform: uppercase;
  }
  .content button{
    width: 90%;
    border-radius: 10px;
    margin-top: 30px;
    opacity: 1
  }
  .content button[disabled]{
    background-color: #cccccc;
    color: #ffffff;
  }
  #cityName{
    font-size: 17px;
    background-color: #E43844;
    color: white;
    background-image: url(../assets/smallTriangle.png);
    background-position: 30px center;
    background-repeat: no-repeat;
    background-size: 10px 5px;
    display: inline-block;
    width: 40px;
    height: 30px;
    line-height: 30px;
    margin-left: 3px;
    text-align: left;
    padding-left: 6px;
    border-radius: 5px;
  }
</style>
