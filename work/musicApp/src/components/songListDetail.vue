<template>
	<div class="songListDetail">
		<mt-header fixed :title="this.title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="desc">
      <div class="bg" :style="{backgroundImage: 'url('+this.backgroundImg+')'}">
        
      </div>
      <div class="content">
        <div class="desc_left">
          <img :src="this.$route.params.coverImgUrl">
          <span>{{this.$route.params.playCount | formatNum}}</span>
        </div>
        <div class="desc_right">
          <p>{{this.$route.params.name}}</p>
          <img :src="this.createImg">
          <span>{{this.creater}}</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="playAll">
        <div class="img">
          
        </div>
        <div class="word">
          <p>播放全部<span>(共{{songNum}}首)</span></p>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in songList">
          <div class="order">
            <p>{{index+1}}</p>
          </div>
          <div class="songDetail">
            <p class="songName">{{item.name}}</p>
            <p class="singer">{{item.ar[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>


<script>
import api from '../api'
export default {
  name: 'songListDetail',
  data () {
    return {
      songList: [],
      id: 0,
      name: '歌单标题',
      coverImgUrl: null,
      title: '歌单',
      backgroundImg: null,
      createImg: null,
      creater: null,
      songNum: 0
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      window.onscroll = () => {
        let opa = window.pageYOffset / 150
        if (opa > 0.5) {
          vm.title = vm.$route.params.name
        } else {
          vm.title = '歌单'
        }
      }
    })
  },
  created () {
    this.getSongList()
  },
  methods: {
    getSongList () {
      this.$http.get(api.getPlayListDetail(this.$route.params.id)).then((res) => {
        this.songList = res.data.playlist.tracks
        this.createImg = res.data.playlist.creator.avatarUrl
        this.creater = res.data.playlist.creator.nickname
        this.backgroundImg = res.data.playlist.creator.backgroundUrl
        this.songNum = res.data.playlist.trackCount
        // this.isloading = false
      }).catch((error) => {
        console.log('加载歌单信息出错:' + error)
      })
    }
  },
  filters: {
    formatNum (account) {
      if (account > 9999) {
        return (account / 10000).toFixed(0) + '万'
      } else {
        return account
      }
    }
  }
}
</script>

<style scoped lang="less">
  .mint-header{
    background-color: #302722;
  }
	.desc{
    width: 100%;
    color: #ffffff;
    position: relative;
    .bg{
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: -1;
      background-size: cover;
      background-repeat: no-repeat;
      filter:blur(5px);
    }
    .content{
      padding-top: 40px;
      display: flex;
      justify-content:space-around;
    }
    .desc_left{
      width: 40%;
      position: relative;
      img{
        width: 100%;
        height: 90%;
        margin-top: 5%;
      }
      span{
        font-size: 14px;
        background: url(../assets/playNum.png) left center no-repeat;
        background-size: 20px 20px;
        position: absolute;
        right: 5px;
        top: 5%;
        padding-left: 20px;
        color: #ffffff;
      }
    }
    .desc_right{
      width: 50%;
      p{
        margin-top: 20%;
        margin-bottom: 10px;
        font-size: 0.3rem;
      }
      img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.25rem;
        float: left;
      }
      span{
        font-size: 0.2rem;
        float: left;
        margin-top: 0.1rem;
        margin-left: 10px;
      }
    }
  }
  .list{
    font-size: 14px;
    position: relative;
    .playAll{
      display: flex;
      justify-content:space-between;
      height: 1rem;
      .img{
        background: url(../assets/playAll.png) center center no-repeat;
        width: 15%;
        background-size: 35px 40px;
      }
      .word{
        line-height: 1rem;
        width: 85%;
        border-bottom: 1px solid lightgrey;
        font-size: 0.3rem;
        span{
          color: gray;
          font-size: 0.2rem;
        }
      }
    }
    li{
      display: flex;
      justify-content:space-between;
      height: 1rem;
      .order{
        width: 15%;
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
        color: gray;
      }
      .songDetail{
        width: 85%;
        border-bottom: 1px solid lightgrey;
        p.songName{
          color: #000000;
          font-size: 0.3rem;
          margin-top: 0.2rem;
        }
        p.singer{
          color: gray;
          font-size: 0.2rem;
        }
      }
    }
  }
</style>