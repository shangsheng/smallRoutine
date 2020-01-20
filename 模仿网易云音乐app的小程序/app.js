//app.js
const backgroundAudioManager = wx.createInnerAudioContext();
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /***
   * 音乐播放
   */
  musicPaly:function(url){
    var that = this;
    // console.log(this)
    if (backgroundAudioManager.src == "null") { that.globalData.songIndex = that.globalData.songIndex+1 }else{
      backgroundAudioManager.src = url;
    }
      //本地存储播放的音乐
      wx.setStorageSync("musicSong", this.globalData.musicSong);
      backgroundAudioManager.play();
    console.log(this.globalData.musicSong)
      // backgroundAudioManager.title = this.globalData.musicSong[0].name;
      // backgroundAudioManager.singer = this.globalData.musicSong[0].author;
      // backgroundAudioManager.coverImgUrl = this.globalData.musicSong[0].imgUrl;
      // console.log(typeof this.globalData.onplays)
      if (typeof this.globalData.onplays == "function" && typeof this.globalData.onPalyMusic != "function") {
        this.globalData.onplays();
        console.log(1)
      } else if (typeof this.globalData.onPalyMusic == "function" && typeof this.globalData.onplaySpecial != "function") {
        this.globalData.onPalyMusic();
        // this.globalData.onplays();
        console.log(2)
      } else if (typeof this.globalData.onplaySpecial == "function"){
        this.globalData.onplaySpecial();
        console.log(3)
      }
  },
  globalData: {
    userInfo: null,
    detail:{},
    playSong:[],
    musicSong:[],
    privileges:[],
    hiddenBf: true,
    hiddenZt: false,
    palys:false,
    songIndex:0,
    backgroundAudioManager: backgroundAudioManager,
    onplays: "",
    duration:"00:00",
    currentTime:"00:00",
    onPalyMusic:"",
    onplaySpecial:"",
  }
})