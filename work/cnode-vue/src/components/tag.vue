<template>
  <div class="tag">
    <span class="tagType tagType_top" v-if="type.top">置顶</span>
    <span class="tagType tagType_good" v-else-if="type.good">精华</span>
    <span class="tagType tagType_share" v-else-if="type.tab === 'share'">分享</span>
    <span class="tagType tagType_ask" v-else-if="type.tab === 'ask'">问答</span>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {
    }
  },
  props: {
    type: Object
  }
}
</script>

<style scoped>
.tagType{
  padding: 3px;
  border-radius: 5px;
  font-size: 12px;
  margin: 0px 10px;
  color: white;
}
.tagType_top{
  background-color: #ff3c40;
}
.tagType_good{
  background-color: #409eff;
}
.tagType_share{
  background-color: #ffc340;
}
.tagType_ask{
  background-color: #51d390;
}
</style>
