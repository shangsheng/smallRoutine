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
          recommendIndex: res.result
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
       that.setData({
         newSongIndex: that.data.newSongIndex.concat(that.map(res.result))
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
  },
  // 遍历
  map:function(newSongArr){
    var newArr=[];
    switch (newSongArr.length % 3){
      case 0: for (var i = 0; i < newSongArr.length; i++) {
                newArr.push(newSongArr[i].song)
              }  
              break;
      case 1: for (var i = 0; i < newSongArr.length - 1; i++) {
                newArr.push(newSongArr[i].song)
              }
              break;
      default: for (var i = 0; i < newSongArr.length - 2; i++) {
                newArr.push(newSongArr[i].song)
              }
    }
    return newArr;
  }
})
