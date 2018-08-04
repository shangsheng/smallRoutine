// pages/song/index.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendIndex: [],
    hidden: false,
    catlistAll:{},
    allTrue:true,
    hot:"hot",
    boutiqueSong:{},
    limit:30,
    limitGenre:20,
    allIndex:1,
    cat: "全部歌单"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.catlist();
    var that = this;
    if(options.cat){
      this.setData({ cat: options.cat })
      this.recommendGenre();
    }else{
      this.recommendGenre();
    }
    this.boutiqueSongList();
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
    this.lower();
    console.log('上拉刷新', new Date());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //推荐歌单
  recommendGenre: function (e) {
    var that = this;
    that.setData({ hidden: false });
    var url = api._topPlaylsit + "?limit=" + that.data.limitGenre + "&order=" + that.data.hot +"&cat="+that.data.cat;
    if (that.data.limitGenre === 20) {
      that.setData({ recommendIndex: [] });
    }
    util.fetchGet(url, function (err, res) {
      console.log(res)
      var recommedPage = that.componentPage(res.playlists, that.data.limitGenre);
      that.setData({
        recommendIndex: that.data.recommendIndex.concat(recommedPage.map(function (item) {
          item.playCount = util.wyq(item.playCount);
          return item;
        }))
      });
      setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
    })
  },
  /**
     * 滑动底部加载
     */
  lower: function () {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      limitGenre: that.data.limitGenre + 20
    });
    if (that.data.cat !== '全部歌单') {
      this.recommendGenre({ tab: that.data.cat, limitGenre: that.data.limitGenre })
    } else {
      this.recommendGenre({ limitGenre: that.data.limitGenre });
    }
  },
  /**
   * 转化成分页
   */
  componentPage:function(pageArr,indexLimit){
    if(pageArr.length>20){
      pageArr.splice(0,indexLimit-20);
      return pageArr;
    }else{
      return pageArr;
    }
  },
  /**
   * 歌单分类
   */
  catlist:function(){
    var that =this;
    that.setData({ hidden: false });
    util.fetchGet(api._playlistCatlist,function(err,res){
      console.log(res)
      that.setData({
        catlistAll:res
      })
      setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
      wx.setStorageSync("catlistAll", that.data.catlistAll);
    })
  },
  // 精品歌单
  boutiqueSongList:function(){
    var that = this;
    that.setData({ hidden: false });
    var url = api._topPlaylistHighquality + "?limit=" + that.data.limit;
    util.fetchGet(url,function(err,res){
      console.log(res)
      that.setData({
        boutiqueSong:res.playlists
      })
      setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
    })
  },
  catSong:function(e){
    console.log(e)
    var that = this;
    var catName = e.target.dataset.cat;
    this.setData({
      cat:catName,
    })
    this.recommendGenre({ cat: that.data.cat });
  }
})