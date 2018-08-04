// pages/catlistAll/catlistAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catlistAll:[],
    categories:{},
    storageCatlist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storagecatlistAll = wx.getStorageSync("catlistAllIndex");
    var storageCatlist = wx.getStorageSync("catlistAll");
    var categories = storageCatlist.categories;
    if(storagecatlistAll == ""){
      storageCatlist.all.borderHidden = true;
      var catlist0 = [], catlist1 = [], catlist2 = [], catlist3 = [], catlist4 = [], catlist = [];
      for (var i = 1; i < storageCatlist.sub.length; i++) {
        storageCatlist.sub[i].borderHidden = false
        if (storageCatlist.sub[i].category == 0) {
          catlist0.push(storageCatlist.sub[i])
        } else if (storageCatlist.sub[i].category == 1) {
          catlist1.push(storageCatlist.sub[i])
        } else if (storageCatlist.sub[i].category == 2) {
          catlist2.push(storageCatlist.sub[i])
        } else if (storageCatlist.sub[i].category == 3) {
          catlist3.push(storageCatlist.sub[i])
        } else if (storageCatlist.sub[i].category == 4) {
          catlist4.push(storageCatlist.sub[i])
        }
      }
      catlist.push(catlist0);
      catlist.push(catlist1);
      catlist.push(catlist2);
      catlist.push(catlist3);
      this.setData({
        categories: categories,
        catlistAll: catlist,
        storageCatlist: storageCatlist
      })
    }else{
      storageCatlist.all.borderHidden = false;
      this.setData({
        categories: categories,
        catlistAll: storagecatlistAll,
        storageCatlist: storageCatlist
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this)
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
   * 改变分类
   */
  catilstCat:function(e){
    let pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var cat = e.target.dataset.cat;
    var catListAll = this.data.catlistAll;
    var storageCatlist = this.data.storageCatlist;
    if (cat === storageCatlist.all.name){
      storageCatlist.all.borderHidden = true;
      for (var i = 0; i < catListAll.length; i++) {
        for (var j = 0; j < catListAll[i].length; j++) {
            catListAll[i][j].borderHidden = false;
        }
      }
    }else{
      storageCatlist.all.borderHidden = false;
      for (var i = 0; i < catListAll.length; i++) {
        for (var j = 0; j < catListAll[i].length; j++) {
          if (catListAll[i][j].name === cat) {
            catListAll[i][j].borderHidden = true;
          } else {
            catListAll[i][j].borderHidden = false;
          }
        }
      }
      prevPage.data.allTrue = false;
      for(var h=0;h<prevPage.data.catlistAll.sub.length;h++){
        if (prevPage.data.catlistAll.sub[h].name === cat){
          prevPage.data.allIndex = h;
        }
      }
    }
    this.setData({
      catlistAll: catListAll,
      storageCatlist: storageCatlist
    })
    wx.setStorageSync("catlistAllIndex", catListAll);
    wx.redirectTo({
      url: "/"+prevPage.route+"?cat="+cat,
    })
    console.log(prevPage)
  }
})