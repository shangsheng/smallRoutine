// pages/playlist/detail.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
// 固定不变的logo
var logo = { t: "../../images/p0.png", i:"../../images/cm2_list_detail_icn_infor@2x.png"}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:"话题详情",
      collectText: '收藏',
      detail: {},
      hidden: false,
      modalHidden: true,
      logo: logo
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
   fetChGet:function(id){
      var that = this;
       var ApiUrl = api._playlistDetail+"?id="+id;
      util.fetchGet(ApiUrl,function(err,res){
          console.log(res)
          res.playlist.playCount = Math.ceil(res.playlist.playCount/10000);
          that.setData({
            detail:res.playlist
          })
      })
   }
})