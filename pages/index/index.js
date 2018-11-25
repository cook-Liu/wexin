//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    question: {},
    nowDate: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    var myDate = new Date();
    var hour = myDate.getHours();
   
    if (hour >= 3 && hour<= 5){
      this.setData({
        nowDate: '凌晨了，怎么还不睡？'
      })
    }else if ((hour >= 22 && hour<= 23) || (hour >= 0 && hour<= 2)) {
      this.setData({
        nowDate: '夜已经深了，该睡觉了？'
      })
    }else if (hour >= 5 && hour<= 8) {
      this.setData({
        nowDate: '早上好，开始新的一天吧'
      })
    }else if (hour >= 8 && hour<= 11) {
      this.setData({
        nowDate: '上午好'
      })
    }else if (hour >= 12 && hour<= 13) {
      this.setData({
        nowDate: '中午好'
      })
    }else if (hour >=14  && hour<= 18) {
      this.setData({
        nowDate: '下午好'
      })
    }else if (hour >= 19 && hour<= 22) {
      this.setData({
        nowDate: '晚上好'
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getQuestion();
  },
/**
 * 用户信息
 * @param {*} e 
 */
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
/**
 * 翻页和保存
 * @param {*} e 
 */
  changeQuestion: function(e) {
    var self = this;
    wx.showLoading({});
    
    wx.request ({
      url: "http://dxy.local/test/previous.php",
      method: "POST",
      data:{
        'qid': e.currentTarget.id,
        'type': e.target.id,
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(reg) {
        wx.hideLoading();
        self.setData({
          question : reg.data
        })
      }
    })
  },

  /**
   * 首页内容加载
   */
  getQuestion: function() {
    var self = this;
    wx.request ({
      url: "http://dxy.local/test/previous.php",
      method: "GET",
      
      success: function(reg) {
        self.setData({
          question : reg.data
        })
      }
    })
  },
  onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
