<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">
      <ul>
        <li>
          <router-link to="/searchMusic">
            <img src="./assets/searchMusic.png" alt="">
            <p>发现音乐</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myMusic">
            <img src="./assets/myMusic.png" alt="">
            <p>我的音乐</p>
          </router-link>
        </li>
        <li>
          <router-link to="/friends">
            <img src="./assets/friends.png" alt="">
            <p>朋友</p>
          </router-link>
        </li>
        <li>
          <router-link to="/account">
            <img src="./assets/account.png" alt="">
            <p>账号</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
}
ul,li{
  list-style: none;
}
.footer{
  background-color: #302722;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  ul{
    display: flex;
    justify-content: center;
    li{
      font-size: 14px;
      width: 25%;
      text-align: center;
      a{
        display: inline-block;
        height: 60px;
        width: 100%;
        &.router-link-active{
          background-color: #d43b44;
        }
      }
      img{
        width: 30px;
        height: 30px;
      }
      p{
        color: #ffffff;
      }
    }
  }
}
</style>
