import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1'
})

export default {
  /* 获取首页所有数据
  @params num  Number 页数 （默认为1）
  @params type String 主题分类 all ask share job good
  @params limit Number 每一页的数量 （默认为40）
  */
  getTopics (num = 1, type = 'all', limit = 40) {
    if (type === 'all') {
      return instance.get('/topics?page=' + num + '&limit=' + limit)
    }
    return instance.get('/topics?page=' + num + '&tab=' + type + '&limit=' + limit)
  },

  /* 获取页面详情
  @params id 主题id
  */
  getTopicDetail (id) {
    return instance.get('/topic/' + id)
  },

  /* 新建评论
  @params topicId 主题id
  @params token 用户token
  @params conent 评论内容
  */
  newComment (topicId, token, content) {
    return instance.post('/topic/' + topicId + '/replies', {accesstoken: token, content: content})
  },

  /* 评论点赞
  @params replyId 评论id
  @params token 用户token
  */
  upComment (replyId, token) {
    return instance.post('/reply/' + replyId + '/ups', {accesstoken: token})
  },

  /* 获取用户详情
  @params name 用户名
  */
  getUser (name) {
    return instance.get('/user/' + name)
  }
}
