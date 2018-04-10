export default {
  // 获取最近一次回复距离现在的时间
  // params --- time 最近一次回复的时间
  getDiffTime (time) {
    let nowTime = new Date()
    let beforeTime = new Date(time)
    let diffTime = nowTime - beforeTime
    let minutes = Math.floor(diffTime / 1000 / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)
    let month = Math.floor(days / 30)
    let year = Math.floor(month / 12)
    if (year) {
      return year + '年前'
    } else if (month) {
      return month + '月前'
    } else if (days) {
      return days + '天前'
    } else if (hours) {
      return hours + '小时前'
    } else if (minutes) {
      return minutes + '分钟前'
    } else {
      return ''
    }
  },

  // 获取yyyy-mm-dd hh:mm:ss
  getTime (time) {
    let createTime = new Date(time)
    let year = createTime.getFullYear()
    let month = createTime.getMonth() + 1
    let days = createTime.getDate()
    let hours = createTime.getHours()
    let minutes = createTime.getMinutes()
    let seconds = createTime.getSeconds()
    month = month < 10 ? '0' + month : month
    days = days < 10 ? '0' + days : days
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return year + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds
  },

  // 滚动到顶部
  scrollToTop () {
    function fn () {
      var top = document.body.scrollTop || document.documentElement.scrollTop
      if (top > 0) {
        scrollTo(0, top - 50)
        requestAnimationFrame(fn)
      } else {
        cancelAnimationFrame(timer)
      }
    }
    var timer = requestAnimationFrame(fn)
  }
}
