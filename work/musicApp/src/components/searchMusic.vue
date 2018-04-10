<template>
  <div class="searchMusic">
    <div class="header">
      <input type="text" placeholder="搜索音乐、歌词、电台">
    </div>
    <div class="container">
      <mt-navbar v-model="selected">
        <mt-tab-item id="character">
          <span>个性推荐</span>
        </mt-tab-item>
        <mt-tab-item id="songList">
          <span>歌单</span>
        </mt-tab-item>
        <mt-tab-item id="anchorFM">
          <span>主播电台</span>
        </mt-tab-item>
        <mt-tab-item id="rankList">
          <span>排行榜</span>
        </mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" swipeable>
      <!-- 个性推荐页面 -->
        <mt-tab-container-item id="character">

          <!-- 轮播图 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item>
              <img src="../assets/banner1.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../assets/banner2.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../assets/banner3.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../assets/banner4.jpg">
            </mt-swipe-item>
          </mt-swipe>
          
          <!-- 三个按钮 私人FM、每日歌曲推荐、云音乐热歌榜 -->
          <div class="threeBtn">
            <div class="personFM">
              <img src="../assets/threeBtn_1.png">
              <p>私人FM</p>
            </div>
            <div class="songRecommend">
              <img src="../assets/threeBtn_2.png">
              <p>每日歌曲推荐</p>
            </div>
            <div class="hotSong">
              <img src="../assets/threeBtn_3.png">
              <p>云音乐热歌榜</p>
            </div>
          </div>

          <!-- 推荐歌单 -->
          <div class="recommedSong">
            <p class="title">推荐歌单 &nbsp;></p>
            <div class="content">
              <div class="content_item" v-for="item in playList">
                <router-link :to="{name: 'songListDetail', params:{id: item.id, name: item.name,
                    coverImgUrl: item.coverImgUrl, playCount: item.playCount}}">
                  <img :src="item.coverImgUrl">
                  <p>{{item.name}}</p>
                  <span>{{item.playCount | formatNum}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!-- 歌单页面 -->
        <mt-tab-container-item id="songList">
          <div class="songList">
            <p class="title">
              <span @click="changeType">全部歌单</span>
              <span @click="changeType">学习</span>
              <span @click="changeType">欧美</span>
              <span @click="changeType">日语</span>
            </p>
            <div>
              <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
                <li v-for="item in songList">
                  <router-link :to="{name: 'songListDetail', params:{id: item.id, name: item.name,
                    coverImgUrl: item.coverImgUrl}}">
                    <img :src="item.coverImgUrl">
                    <p>{{item.name}}</p>
                    <span>{{item.playCount | formatNum}}</span>
                  </router-link>
                </li>
              </ul>
              <div class="loading">
                <mt-spinner :type="2"></mt-spinner>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!-- 主播电台页面 -->
        <mt-tab-container-item id="anchorFM">
          <p>主播电台</p>
        </mt-tab-container-item>

        <!-- 排行榜页面 -->
        <mt-tab-container-item id="rankList">
          <p>排行榜</p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import api from '../api'
import $ from 'jquery'
export default {
  name: 'searchMusic',
  data () {
    return {
      selected: 'character',
      playList: [],
      loading: false,
      songList: [],
      offset: 0,
      filter: null,
      swipeable: true
    }
  },
  created () {
    this.get()
    this.getList()
  },
  methods: {
    get () {
      this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 6)).then((res) => {
        this.playList = res.data.playlists
      }).catch((error) => {
        console.log(error)
      })
    },
    getList () {
      this.loading = true
      this.$http.get(api.getPlayListByWhere('全部', 'hot', this.offset, true, 6)).then((res) => {
        let list = res.data.playlists
        let total = res.data.total
        for (let i = 0; i < list.length; i++) {
          // 筛选类型
          if (this.filter === null) {
            this.songList.push(list[i])
          } else {
            if (list[i].tags.indexOf(this.filter) !== -1) {
              this.songList.push(list[i])
            }
          }
        }
        this.offset = this.offset + 6
        if (this.offset > total) {
          this.offset = total
        }
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    loadMore () {
      if (this.selected === 'songList') {
        this.getList()
      }
    },
    changeType () {
      this.songList = []
      this.filter = $(event.currentTarget).context.innerText
      if (this.filter === '全部歌单') {
        this.filter = null
      }
      this.offset = 0
      this.getList()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header{
  background-color: #D43B33;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  input{
    position: absolute;
    left: 16%;
    top: 10px;
    width: 60%;
    height: 24px;
    border-radius: 20px;
    border: none;
    outline: none;
    background-image: url(../assets/search.png);
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    padding-left: 40px;
  }
}
span{
  font-size: 14px;
  padding: 13px 5px;
}
.container{
  font-size: 16px;
  margin-top: 44px;
  padding-bottom: 60px;
  .mint-navbar{
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    z-index: 10;
    .mint-tab-item{
      &.is-selected{
        color: #D43B33;
        border-bottom:none;
      }
    }
  }
  .mint-tab-container{
    overflow: inherit;
    margin-top: 88px;
    div.mint-swipe{
      height: 3rem;
      img{
        width: 100%;
      }
    } 
  }
}
.is-selected span{
  border-bottom: 3px solid #D43B33;
}
.threeBtn{
  display: flex;
  justify-content:space-around;
  text-align: center;
  font-size: 14px;
  padding: 10px 0px;
  border-bottom: 1px solid lightgrey;
  div{
    height: 1.5rem;
    width: 30%;
    img{
      width: 1rem;
    }
  }
}

.recommedSong{
  .title{
    font-size: 0.2rem;
    border-left: 2px solid #D43B33;
    margin: 10px 0px;
    padding-left: 10px;
  }
  .content{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    .content_item{
      width: 30%;
      font-size: 12px;
      position: relative;
      img{
        width: 100%;
      }
      p{
        padding: 5px;
        height: 0.5rem;
        margin-bottom: 15px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #000000;
        font-size: 0.2rem;
      }
      span{
        background: url(../assets/playNum.png) left center no-repeat;
        background-size: 20px 20px;
        position: absolute;
        right: 0;
        top: -10px;
        padding-left: 20px;
        color: #ffffff;
        font-size: 0.2rem;
      }
    }
  }
}

.songList{
  .title{
    font-size: 14px;
    border-left: 2px solid #D43B33;
    margin: 10px 0px;
    padding-left: 10px;
    span:first-child{
      
    }
  }
  ul{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    li{
      width: 49%;
      position: relative;
      font-size: 12px;
      img{
        width: 100%;
      }
      p{
        padding: 5px;
        height: 30px;
        margin-bottom: 15px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #000000;
      }
      span{
        background: url(../assets/playNum.png) left center no-repeat;
        background-size: 20px 20px;
        position: absolute;
        right: 0;
        top: -10px;
        padding-left: 20px;
        color: #ffffff;
      }
    }
  }
  .loading{
    text-align: center;
  }
}
</style>
