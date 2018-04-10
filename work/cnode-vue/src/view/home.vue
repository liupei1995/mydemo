<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <div class="header_left">
              <img src="../assets/logo.png" alt="" width="50px">
              <el-input
                placeholder="请输入搜索内容"
                prefix-icon="el-icon-search"
                v-model="value">
              </el-input>
            </div>
          </el-col>
          <el-col :span="4" :offset="10">
            <div class="header_right">
              <span>登录</span>&nbsp;&nbsp;
              <span>注册</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="40">
          <el-col :span="colSpan" style="min-width: 700px">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-col>
          <el-col :span="6" v-show="isShow">
            <el-card>
              <div slot="header">
                <span>个人信息</span>
              </div>
              <div class="personInfo">
                <img :src="imgSrc" style="width: 40px; height: 40px; margin-right: 10px;" />
                <span>{{name}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        本网站用的vue重新构建cnode网站
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'home',
  data () {
    return {
      value: '',
      colSpan: 18,
      screenWidth: 0,
      isShow: true,
      imgSrc: '',
      name: ''
    }
  },
  created () {
    window.onresize = () => {
      this.screenWidth = document.getElementsByClassName('el-main')[0].offsetWidth
    }
    window.onload = () => {
      this.screenWidth = document.getElementsByClassName('el-main')[0].offsetWidth
    }
    api.getUser('liupei1995').then(res => {
      this.imgSrc = res.data.data.avatar_url
      this.name = res.data.data.loginname
    }).catch(error => {
      console.log(error)
    })
  },
  watch: {
    screenWidth (newVal, oldVal) {
      if (newVal < 1000) {
        this.isShow = false
        this.colSpan = 24
      } else {
        this.isShow = true
        this.colSpan = 18
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*头部*/
.el-header{
  background-color: #999;
}
.el-input{
  width: 200px;
  height: 40px;
}
.header_left{
  height: 60px;
  display: flex;
  align-items: center;
}
.header_right{
  line-height: 60px;
  color: #fff;
  text-align: center;
}

/*中部*/
.el-main{
  padding: 20px 40px;
}

.personInfo{
  display: flex;
  align-items: center;
}
/*底部*/
.el-footer{
  text-align: center;
}
</style>
