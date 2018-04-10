<template>
  <div class="contentList">
    <div class="titleBox">
      <p v-for="(title, index) in titles"
         @click="changeActive(title)"
         :key="index"
         :class="{ active: activeTitle === title }">
        {{title}}
      </p>
    </div>
    <div class="content">
      <transition-group name="slide-fade">
        <List @changePage="ClickPage"
              :data="lists.all"
              title="all"
              v-show="activeTitle === '全部'"
              key="all">
        </List>
        <List @changePage="ClickPage"
              :data="lists.good"
              title="good"
              v-show="activeTitle === '精华'"
              key="good">
        </List>
        <List @changePage="ClickPage"
              :data="lists.share"
              title="share"
              v-show="activeTitle === '分享'"
              key="share">
        </List>
        <List @changePage="ClickPage"
              :data="lists.ask"
              title="ask"
              v-show="activeTitle === '问答'"
              key="ask">
        </List>
        <List @changePage="ClickPage"
              :data="lists.job"
              title="job"
              v-show="activeTitle === '招聘'"
              key="job">
        </List>
      </transition-group>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import List from '@/components/list'
import utils from '@/utils'
export default {
  name: 'contentList',
  data () {
    return {
      titles: ['全部', '精华', '分享', '问答', '招聘'],
      dataType: ['all', 'good', 'share', 'ask', 'job'],
      activeTitle: '全部',
      lists: {
        all: [],
        good: [],
        job: [],
        ask: [],
        share: []
      }
    }
  },
  created () {
    this.dataType.map(item => {
      this.responseToData(1, item, 20).then(value => {
        this.lists[item] = value
      })
    })
  },
  methods: {
    // 改变当前的tab
    changeActive (title) {
      this.activeTitle = title
    },

    async ClickPage (msg) {
      await this.responseToData(msg.total, msg.type, 20).then(value => {
        this.lists[msg.type] = value
      })
    },

    // 异步请求的数据
    async responseToData (total, type, num) {
      let arrayList = []
      await api.getTopics(total, type, num).then(res => {
        res.data.data.map(item => {
          item.last_reply_at = utils.getDiffTime(item.last_reply_at)
        })
        arrayList = res.data.data
      }).catch(error => {
        console.log(error)
      })

      return arrayList
    }
  },
  components: {
    List
  }
}
</script>

<style>
.slide-fade-enter-active{
  transition: all .3s ease;
}
.slide-fade-leave-active{
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
.content{
  min-width: 800px;
}
.titleBox{
  display: flex;
  background-color: #999;
  color: white;
  height: 50px;
  align-items: center;
  min-width: 800px;
}
.titleBox>p{
  padding: 0 20px;
  cursor: pointer;
}
.titleBox>p.active{
  color: #51d390;
}

.el-pagination{
  text-align: center;
}
</style>
