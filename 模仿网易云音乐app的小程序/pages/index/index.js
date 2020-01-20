//index.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
let SystemInfoUtil = require("../../utils/utilityClass.js");
Page({
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:300,
    imgUrls:[],
    recommendIndex:[],
    newSongIndex:[],
    djprogramIndex:[],
    hidden:false,
    bannerUrls: [{ targetType: 1, path: '../music/song' },
      { targetType: 1004, path: '../mv/index' },
      { targetType: 3000, path: 'item.url' },
      { targetType: 10, path: '../album/index' },
      { targetType: 1000, path: '../playlist/index' },
      { targetType: 1005, path: '../topic/index' },
      { targetType: 1001, path: '../dj/index' }]
  },
  onLoad: function () {
    this.banner();
    this.recommend();
    this.newSong();
    this.djprogram();
    wx.setStorageSync("detail", "");
    wx.setStorageSync("musicSong", "");
    wx.setStorageSync("yirexinxi", "");
    SystemInfoUtil.init();
  },
  // banner
  banner:function(e){
    var that = this;
    let bannerUrl = "";
    if (SystemInfoUtil.platform == SystemInfoUtil.IOS && SystemInfoUtil.wxSDKVersion == 244) {
      bannerUrl = api._banner + '?type=2'
    } else if (SystemInfoUtil.platform = SystemInfoUtil.ANDROID){
      bannerUrl = api._banner + '?type=1'
    } else if (SystemInfoUtil.platform = SystemInfoUtil.PC){
      bannerUrl = api._banner + '?type=0'
    }
    
    util.fetchGet(bannerUrl,function(err,res){
      console.log(res)
       that.setData({
        imgUrls:res.banners
       })
    })
  },
  //推荐歌单
  recommend:function(e){
    var that = this;
    that.setData({ hidden: false });
    util.fetchGet(api._personalized, function (err, res) {
        that.setData({
          recommendIndex: that.data.recommendIndex.concat(res.result.map(function (item) {
            item.playCount = util.wyq(item.playCount);
            item.name = util.cutString(item.name,40)
            return item;
          })).slice(0,6)
        });
        setTimeout(function () {
          that.setData({ hidden: true })
        }, 300);
    })
  },
  // 最新音乐
  newSong:function(e){
    var that = this;
    that.setData({ hidden: false });
    util.fetchGet(api._personalizedNewsong, function (err, res) {
      console.log(res)
       that.setData({
         newSongIndex: that.data.newSongIndex.concat(res.result.map(function(item){
           item = item.song;
           item.name = util.cutString(item.name, 40)
           return item
         })).slice(0,6)
       })
       setTimeout(function () {
         that.setData({ hidden: true })
       }, 300);
    })
  },
  // 主播电台
  djprogram:function(e){
    var that=this;
    that.setData({ hidden:false})
    util.fetchGet(api._presonalizedDjprogram,function(err,res){
      console.log(res)
       that.setData({
         djprogramIndex:res.result.concat(res.result.map(function(item){
           item.name = util.cutString(item.name, 40)
         })).slice(0,6)
       })
       setTimeout(function(){
         that.setData({ hidden: true })
       },300);
    })
  },
  //点击跳转页面
  clickUrl:function(event){
    console.log(event)
    var that = this;
    var urls = '';
    console.log(this)
    for (var i = 0; i < this.data.bannerUrls.length;i++){
      
      if (this.data.bannerUrls[i].targetType == event.currentTarget.dataset.targettype && this.data.bannerUrls[i].targetType != 3000){
       
        urls = that.data.bannerUrls[i].path + '?id=' + event.currentTarget.dataset.id
        break
      }else{
        urls = event.currentTarget.dataset.url
        break
      }
      console.log(urls)
    }
    console.log(urls)
    wx.navigateTo({
      url: urls,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },

    })
  }
})
