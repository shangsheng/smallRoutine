//index.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
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
    hidden:false
  },
  onLoad: function () {
    this.banner();
    this.recommend();
    this.newSong();
    this.djprogram();
    wx.setStorageSync("detail", "");
    wx.setStorageSync("musicSong", "");
    wx.setStorageSync("yirexinxi", "");
  },
  // banner
  banner:function(e){
    var that = this;
    util.fetchGet(api._banner,function(err,res){
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
            return item;
          }))
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
           return item
         }))
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
         djprogramIndex:res.result
       })
       setTimeout(function(){
         that.setData({ hidden: true })
       },300);
    })
  }
})
