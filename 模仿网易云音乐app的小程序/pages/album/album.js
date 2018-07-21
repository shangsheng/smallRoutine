// pages/playlist/detail.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
// 固定不变的logo
var logo = {
  t: "/images/p0.png", i: "/images/cm2_list_detail_icn_infor@2x.png", w3: "/images/w3.png", w5: "/images/w5.png",
  w7: "/images/w7.png", wd: "/images/wd.png", xz: "下载", dx: "多选", playUrl: "/images/pl-playall.png", play: "/images/aal.png",
  video: "/images/cm2_list_btn_icn_mv_new@2x.png", m: "/images/cm2_play_icn_more@2x.png"
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "话题详情",
    collectText: '收藏',
    detail: {},
    hidden: false,
    modalHidden: true,
    logo: logo,
    play: true,
    video: true,
    playSong: [],
    abstractArtists:{},
    abstractHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetChGet(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 数据获取
   * */
  fetChGet: function (id) {
    var that = this;
    var ApiUrl = api._artists + "?id=" + id;
    util.fetchGet(ApiUrl, function (err, res) {
      console.log(res)
      // res.playlist.subscribedCount = util.wyq(res.playlist.subscribedCount);
      res.artist.publishTime = util.formatTime(res.artist.publishTime,3);
      res.artist.briefDesc = that.cutString(res.artist.briefDesc,60)
      that.setData({
        detail: res.artist,
        playSong: that.data.playSong.concat(res.hotSongs.map(function (item) {
          var arName = item.ar[0].name;
          for (var i = 0; i < item.ar.length - 1; i++) {

            if (item.ar[i + 1]) {
              arName = arName + "/" + item.ar[i + 1].name;
            }
          }
          item.authorName = arName + " - " + item.al.name;
          item.playUrl = that.data.logo.play;
          item.videoUrl = that.data.logo.video;
          if (item.alia.length != 0) {
            item.alia = "(" + item.alia + ")";
          }
          item.play = true;
          item.textHidden = false;
          if (item.mv === 0) {
            item.video = true;
          } else {
            item.video = false;
          }

          // item.mUrl = that.data.logo.m;
          return item;
        }))
      })
      setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
    })
  },
  /**
   * 点击播放
   */
  palyClick: function (e) {
    console.log(e)
    this.data.hidden = false;
    //更新数据与播放内容
    var _that = this;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    console.log(_that.data.playSong[index])
    var urlSong = api._musicUrl + "?id=" + id;
    util.fetchGet(urlSong, function (err, res) {
      console.log(res);
      _that.setData({
        playSong: _that.data.playSong.map(function (item, i) {
          if (i === index) {
            _that.data.playSong[index].play = false;
            _that.data.playSong[index].textHidden = true;
          } else {
            item.play = true;
            item.textHidden = false;
          }
          return item
        })
      })
    });
    setTimeout(function () {
      _that.setData({ hidden: true })
    }, 300);
  },
/**参数说明： 
 
 * 根据长度截取先使用字符串，超长部分追加… 
 
 * str 对象字符串 
 
 * len 目标字节长度 
 
 * 返回值： 处理结果字符串 
 
 */
 
 cutString:function (str, len) { 
 
    //length属性读出来的汉字长度为1 

    if(str.length*2 <= len) {

      return str;

    } 
 
   var strlen = 0; 
 
    var s = ""; 
 
    for(var i = 0;i<str.length; i++) { 
 
  s = s + str.charAt(i);

  if (str.charCodeAt(i) > 128) {

    strlen = strlen + 2;

    if (strlen >= len) {

      return s.substring(0, s.length - 1) + "...";

    }

  } else {

    strlen = strlen + 1;

    if (strlen >= len) {

      return s.substring(0, s.length - 2) + "...";

    }

  }

}

return s; 
 
 },
 abstracts:function(e){
   var _that = this;
   var id = e.currentTarget.dataset.id;
   var avstractUrl = api._artistDesc + "?id=" + id;
   util.fetchGet(avstractUrl,function(err,res){
     res.absImgUrl = _that.data.detail.picUrl;
     console.log(res) 
     _that.setData({
       abstractArtists:res
     })
   })
   setTimeout(function () {
     _that.setData({ hidden: true, abstractHidden: false })
   }, 300);
 },
 /**点击关闭简介*/
 guanbi:function(){
   this.setData({abstractHidden: true })
 } 
})