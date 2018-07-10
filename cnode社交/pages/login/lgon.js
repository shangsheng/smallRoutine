// pages/login/lgon.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    accesstoken:"",
    error:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  /**登录*/
  bindKeyInput:function(e){
    this.setData({
      accesstoken:e.detail.value
    })
  },
  isLogin:function(){
    var that = this;
    var accesstoken = that.data.accesstoken;
    var ApiUrl = Api.accesstoken;
    if(accesstoken === "") return;
    that.setData({loading:true});
    Api.fetchPost(ApiUrl,{accesstoken:accesstoken},(err,res) =>{
      if(res.success){
        var CuserInfo = {
          accesstoken: accesstoken,
          id: res.id,
          loginname:res.loginname,
          avatar_url:res.loginname
        };
        console.log(CuserInfo)
        wx.setStorageSync('CuserInfo', CuserInfo);
        setTimeout(function(){
          that.setData({loading:false});
          wx.navigateBack()
        },3000);
      }else{
        that.setData({error:res.error_msg});
        that.setData({loading:false});
        setTimeout(function(){
          that.setData({error:""});
        },2000);
      }
    })
  }
})