<template>
  <div class="detail">
    <div class="title">
      <h1>{{title}}</h1>
      <div>
        <img :src="avatarImg" />
        <div>
          <p>
            <span class="author">{{author}}</span>
            <tag-btn :type="{tab: type}"></tag-btn>
          </p>
          <p>
            <span>发布于{{created}}</span>
            <span>浏览&nbsp;{{visited}}</span>
            <span>回复&nbsp;{{replyCount}}</span>
          </p>
        </div>
      </div>
    </div>
		<div id="box">
    </div>
    <div class="replyBox">
      <ul>
        <li v-for="(item, index) in replies" :key="index">
          <div class="replyer_info">
            <img :src="item.author.avatar_url" />
            <div>
              <p>
                <span>{{item.author.loginname}}</span>
                <span style="color:#ff3c40;">{{index + 1}}楼</span>
              </p>
              <p style="fontSize: 12px;color: #999;marginTop:5px;">{{item.create_at}}</p>
            </div>
          </div>
          <p v-html="item.content" class="replyer_content"></p>
          <div class="likeBox">
            <img :src="normalImg" @click="addLike(item.id)" />
            <span>{{item.ups.length ? item.ups.length + '人': ''}}</span>
            <span>赞</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="editorBox">
      <quill-editor v-model="editor_content">
      </quill-editor>
      <button @click="reply()">回复</button>
    </div>
    <div id="mask">
      <div class="perviewImg">
        <img :src="magnifyImg" />
      </div>
    </div>
  </div>
</template>

<script>
import TagBtn from '@/components/tag'
import api from '@/api'
import utils from '@/utils'
export default {
  name: 'detail',
  data () {
    return {
      title: '',
      author: '',
      created: '',
      visited: 0,
      replyCount: 0,
      type: '',
      avatarImg: '',
      replies: [],
      magnifyImg: '',
      editor_content: '',
      normalImg: require('../assets/like_normal.png'),
      activeImg: require('../assets/like_active.png'),
      isUp: false,
      token: '4c091b1f-9071-4faa-bc4e-e68c66547b4c'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDetail()
    })
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      await api.getTopicDetail(this.$route.params.detailId).then(res => {
        console.log(res.data.data)
        this.title = res.data.data.title
        this.author = res.data.data.author.loginname
        this.avatarImg = res.data.data.author.avatar_url
        this.created = utils.getTime(res.data.data.create_at)
        this.visited = res.data.data.visit_count
        this.replyCount = res.data.data.reply_count
        this.type = res.data.data.tab
        res.data.data.replies.map(item => {
          item.create_at = utils.getTime(item.create_at)
        })
        this.replies = res.data.data.replies
        document.getElementById('box').innerHTML = res.data.data.content
      })
      // 防止dom还没渲染完成，使用async函数
      // 内容图片点击
      document.querySelectorAll('#box img').forEach((element, index) => {
        element.onclick = () => {
          this.magnifyImg = element.getAttribute('src')
          this.showMask()
        }
      })
      // 评论图片点击
      document.querySelectorAll('.replyer_content img').forEach((element, index) => {
        element.onclick = () => {
          this.magnifyImg = element.getAttribute('src')
          this.showMask()
        }
      })
      document.getElementById('mask').onclick = () => {
        this.hideMask()
      }
    },
    showMask () {
      document.getElementById('mask').style.display = 'block'
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    },
    hideMask () {
      document.getElementById('mask').style.display = 'none'
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    },
    reply () {
      api.newComment(this.$route.params.detailId, this.token, this.editor_content).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
      console.log(this.editor_content)
    },
    addLike (replyId) {
      let targetImg = event.target
      api.upComment(replyId, this.token).then(res => {
        targetImg.setAttribute('class', res.data.action === 'up' ? 'animated wobble' : '')
        targetImg.setAttribute('src', res.data.action === 'up' ? this.activeImg : this.normalImg)
        this.getDetail()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    TagBtn
  }
}
</script>

<style>
body,html{
	height: 100%;
}
#mask{
	width: 100%;
	height: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	z-index: 99;
	display: none;
	text-align: center;
  animation: hideIndex 0.5s;
}
#mask>div{
	overflow: auto;
	width: 90%;
	height: 90%;
	margin: 5%;
}
@keyframes hideIndex{
  0%{ opacity: 0 }
  100%{ opacity: 1 }
}
a{
	color: #08c;
	text-decoration: none;
}
ol{
	margin-left: 30px;
}
ul{
	list-style: none;
}
.title{
	background-color: white;
	border-bottom: 1px solid #e1e1e1;
	padding: 20px;
}
.title>div{
	display: flex;
	align-items: center;
	margin-top: 10px;
}
.title>div>img{
	width: 40px;
	border-radius: 20px;
	margin-right: 10px;
}
.title>div>div>p{
	display: flex;
	align-items: center;
	font-size: 14px;
}
.title>div>div>p>span.author{
	color: #08c;
}
.title>div>div>p>span{
	padding: 2px 5px;
	color: #999;
}
#box{
	background-color: white;
	padding: 20px;
	line-height: 30px;
	font-size: 15px;
}
#box>p{
	padding: 10px;
}
#box img{
	width: 100%;
}
.replyBox{
	background-color: white;
	margin-top: 50px;
	padding: 10px;
}
.replyBox>ul>li{
	padding: 10px 0px;
}
.replyBox>ul>li+li{
	border-top: 1px solid #e1e1e1;
}
.replyer_info{
	display: flex;
	align-items: center;
	font-size: 13px;
}
.replyer_info>img{
	width: 30px;
	border-radius: 15px;
	margin-right: 10px;
}
.replyer_info>p{
	margin-right: 10px;
}
.replyer_content{
	padding: 20px;
	font-size: 14px;
	overflow: hidden;
}
.likeBox{
	display: flex;
	align-items: center;
	font-size: 12px;
	color: #999;
}
.likeBox>img{
	width: 25px;
	margin-left: 20px;
	margin-right: 5px;
}
.likeBox>img:hover{
	cursor: pointer;
}

.editorBox{
	background-color: white;
	margin-top: 50px;
}
.ql-container{
	height: 200px;
}
.editorBox>button{
	padding: 10px 20px;
	margin: 10px;
	background-color: #08c;
	border: none;
	color: white;
	border-radius: 5px;
	outline: none;
}
.editorBox>button:hover{
	cursor: pointer;
}
</style>
