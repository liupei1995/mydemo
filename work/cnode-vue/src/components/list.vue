<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <div>
          <img :src="item.author.avatar_url" width="30px">
          <div class="count">
            <span class="replyCount">{{item.reply_count}}</span>
            <span class="visitCount">/{{item.visit_count}}</span>
          </div>
          <tag-btn :type="{top: item.top,good:item.good,tab:item.tab}"></tag-btn>
          <router-link :to="{ name: 'detail', params: { detailId: item.id } }">
            <span>{{item.title}}</span>
          </router-link>
        </div>
        <span class="last_reply_time">{{item.last_reply_at}}</span>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
      :key="title">
    </el-pagination>
  </div>
</template>

<script>
import TagBtn from '@/components/tag'
import utils from '@/utils'
export default {
  name: 'List',
  props: {
    data: Array,
    title: String
  },
  methods: {
    // 点击分页方法
    handleCurrentChange (val) {
      utils.scrollToTop()
      this.$emit('changePage', {type: this.title, total: val})
    }
  },
  components: {
    TagBtn
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
}
a:visited{
  color: #999;
}
ul,li{
  list-style: none;
  background-color: #fff;
}
li{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}
li:hover{
  background-color: #e1e1e1;
}
li+li{
  border-top: 1px solid #dbe0e6;
}
li>div{
  display: flex;
  align-items: center;
  flex: auto;
}
li>div>img{
  border-radius: 15px;
}
li>div>.tag{
  flex: none;
}
li>div>span{
  flex: auto;
}
.count{
  flex: 0 0 80px;
  text-align: center;
}
.replyCount{
  color: #51d390;
}
.visitCount{
  color: #999;
  font-size: 14px;
}
.last_reply_time{
  color: #999;
  font-size: 12px;
  flex: none;
  padding-left: 20px;
}
</style>
