// pages/music/song.js
var util = require('../../utils/util.js');
var bsurl = require('../../utils/api.js');
let app = getApp();
let seek = 0;
let defaultdata ={
  ar:false,
  at:true,
  ai:false,
  ak:true,
  ae:false,
  af:true,
  playtime: '00:00',
  duration: '00:00',
  dq:true,
  lb:false,
  sj:true,
  dqs: true,
  lbs: true,
  sjs: true,
  hiddenBf:true,
  hiddenZt:false,
  palys:false,
  radius:false,
  music:{},
  detail:{},
  playSong:[],
  privileges:[],
  lrc:[],
  downloadPercent:0,
  commentscount:0
}
Page({
  /**
   * 页面的初始数据
   */
  data: defaultdata,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hiddenBf: app.globalData.hiddenBf,
      hiddenZt: app.globalData.hiddenZt,
      music: app.globalData.musicSong,
      playSong: app.globalData.playSong,
      privileges: app.globalData.privileges,
      detail: app.globalData.detail,
      palys: app.globalData.palys,
      radius:app.globalData.palys
    })
    console.log(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app)
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
  
  }
})