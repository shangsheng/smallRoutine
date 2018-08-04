// pages/playlist/detail.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var app = getApp();
console.log(app)
// 固定不变的logo
var logo = {
  t: "/images/p0.png", i: "/images/cm2_list_detail_icn_infor@2x.png", w3: "/images/w3.png", w5: "/images/w5.png",
  w7: "/images/w7.png", wd: "/images/wd.png", xz: "下载", dx: "多选", playUrl: "/images/pl-playall.png", play: "/images/aal.png",
  video: "/images/cm2_list_btn_icn_mv_new@2x.png", m: "/images/cm2_play_icn_more@2x.png", imgBgc:"/images/a6l.png"
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
    abstractArtists: {},
    abstractHidden: true,
    songlist: true,
    musicSong: [],
    songIndex: 0,
    hiddenBf: true,
    hiddenZt: false,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    var that = this;
      this.fetChGet(options.id,options.limit);
      this.setData({
        id:that.options.id
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //清楚本地存储
    wx.setStorageSync("playSong", "")
    
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
  fetChGet: function (id,limit) {
    var that = this;
    var ApiUrl = api._album + "?id=" + id+"&limit="+ limit;
    util.fetchGet(ApiUrl, function (err, res) {
      console.log(res)
      // res.playlist.subscribedCount = util.wyq(res.playlist.subscribedCount);
      res.album.artist.publishTime = util.formatTime(res.album.publishTime, 3);
      res.album.artist.briefDesc = res.album.briefDesc ? that.cutString(res.album.briefDesc, 60) : "";
      that.setData({
        detail: res.album,
        playSong: that.data.playSong.concat(res.songs.map(function (item) {
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
    //获取歌曲的演唱歌手名字
    var arName = _that.data.playSong[index].ar[0].name;
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
        }),
        musicSong: res.data.map(function (item) {

          item.name = _that.data.playSong[index].name;
          item.author = arName;
          item.imgUrl = _that.data.playSong[index].al.picUrl;
          // item.hiddenBf = app.globalData.hiddenBf;
          // item.hiddenZt = app.globalData.hiddenZt;
          return item
        })
      })
      console.log(_that.data.musicSong[0])
      setTimeout(function () {
        _that.setData({
          hidden: true, songlist: false, songIndex: index, hiddenBf: false,
          hiddenZt: true,})
        app.globalData.onplays = _that.onplays;
        app.globalData.songIndex = index;
        app.globalData.musicSong = _that.data.musicSong;
        app.globalData.playSong = _that.data.playSong;
        app.globalData.hiddenBf = _that.data.hiddenBf;
        app.globalData.hiddenZt = _that.data.hiddenZt;
        app.musicPaly(_that.data.musicSong[0].url);
        _that.data.detail.briefDesc="";
        _that.data.detail.publishTime = util.formatTime(_that.data.detail.publishTime, 3)
        wx.setStorageSync("detail", _that.data.detail);
        wx.redirectTo({
          url: "/pages/music/song" + "?id=" + id,
        })
      }, 300);
    });
    console.log(app)
  },
  /**参数说明： 
   
   * 根据长度截取先使用字符串，超长部分追加… 
   
   * str 对象字符串 
   
   * len 目标字节长度 
   
   * 返回值： 处理结果字符串 
   
   */

  cutString: function (str, len) {

    //length属性读出来的汉字长度为1 

    if (str.length * 2 <= len) {

      return str;

    }

    var strlen = 0;

    var s = "";

    for (var i = 0; i < str.length; i++) {

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
  abstracts: function (e) {
    var _that = this;
    var id = e.currentTarget.dataset.id;
    var avstractUrl = api._artistDesc + "?id=" + id;
    util.fetchGet(avstractUrl, function (err, res) {
      res.absImgUrl = _that.data.detail.picUrl;
      console.log(res)
      _that.setData({
        abstractArtists: res
      })
    })
    setTimeout(function () {
      _that.setData({ hidden: true, abstractHidden: false })
    }, 300);
  },
  /**点击关闭简介*/
  guanbi: function () {
    this.setData({ abstractHidden: true })
  },
  /***
   * 监听播放顺序
   */
  onplays: function () {
    var that = this;
    app.globalData.backgroundAudioManager.onWaiting(function () {
      that.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true
      })
      console.log("加载中")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    })
    app.globalData.backgroundAudioManager.onPlay(function () {
      that.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true
      })
      console.log("开始播放")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    });
    app.globalData.backgroundAudioManager.onEnded(function () {
      var pavIndex = that.data.songIndex + 1;
      that.publicMusic(pavIndex)
    });
    app.globalData.backgroundAudioManager.onTimeUpdate(function () {
      app.globalData.currentTime = app.globalData.backgroundAudioManager.currentTime;
      app.globalData.duration = app.globalData.backgroundAudioManager.duration;
    });
    app.globalData.backgroundAudioManager.onError(function (err) {
      console.log(err)
      that.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      console.log("暂停")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    })
    app.globalData.backgroundAudioManager.onPause(function () {
      that.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      console.log("暂停")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    })
    app.globalData.backgroundAudioManager.onStop(function () {
      that.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      console.log("停止")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    })
  },
  /***
     * 公共的请求音乐类
     */
  publicMusic: function (pavIndex) {
    var that = this;
    if (pavIndex === this.data.playSong.length) {
      that.setData({
        hiddenBf: true,
        hiddenZt: false,
        songIndex: 0,
        palys: true,
        playtime: "00:00"
      })
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        songIndex: 0,
        palys: true,
        musicSong: that.data.music,
        playSong: that.data.playSong
      })
      app.globalData.musicSong = that.data.music;
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
      app.globalData.songIndex = that.data.songIndex;
      app.globalData.playSong = that.data.playSong;
      app.publicMusic(0);
    } else {
    var id = that.data.playSong[pavIndex].privilege.id;
    var urlSong = api._musicUrl + "?id=" + id;
    //获取歌曲的演唱歌手名字
    var arName = that.data.playSong[pavIndex].ar[0].name;
    for (var i = 0; i < that.data.playSong[pavIndex].ar.length - 1; i++) {

      if (that.data.playSong[pavIndex].ar[i + 1]) {
        arName = arName + "/" + that.data.playSong[pavIndex].ar[i + 1].name;
      }
    }

    util.fetchGet(urlSong, function (err, res) {

      that.setData({
        playSong: that.data.playSong.map(function (item, i) {
          if (i === pavIndex) {
            that.data.playSong[pavIndex].play = false;
            that.data.playSong[pavIndex].textHidden = true;
          } else {
            item.play = true;
            item.textHidden = false;
          }
          return item
        }),
        musicSong: res.data.map(function (item) {

          item.name = that.data.playSong[pavIndex].name;
          item.author = arName;
          item.imgUrl = that.data.playSong[pavIndex].al.picUrl;
          return item
        })
      })
      setTimeout(function () {
        that.setData({
          hiddenBf: true,
          hiddenZt: false,
          songIndex: pavIndex,
          palys: true,
          playtime: 0
        })
        app.globalData.musicSong = that.data.musicSong;
        app.globalData.hiddenBf = that.data.hiddenBf;
        app.globalData.hiddenZt = that.data.hiddenZt;
        app.globalData.palys = that.data.palys;
        app.globalData.songIndex = that.data.songIndex;
        app.globalData.playSong = that.data.playSong;
        app.musicPaly(that.data.musicSong[0].url);
      }, 300)
    });
  }
  },
  /***
     * 暂停
     */
  songBf: function () {
    const that = this;
    app.globalData.backgroundAudioManager.pause();
    that.setData({
      hiddenBf: true,
      hiddenZt: false,
      palys: false
    })
    app.globalData.hiddenBf = that.data.hiddenBf;
    app.globalData.hiddenZt = that.data.hiddenZt;
    app.globalData.palys = that.data.palys;
  },
  /***
   * 播放
   */
  songZt: function () {
    const that = this;
    app.globalData.backgroundAudioManager.play();
    that.setData({
      hiddenBf: false,
      hiddenZt: true,
      palys: true
    })
    app.globalData.hiddenBf = that.data.hiddenBf;
    app.globalData.hiddenZt = that.data.hiddenZt;
    app.globalData.palys = that.data.palys;
  },
  /***上一首*/
  songLeft: function () {
    var pavIndex = this.data.songIndex - 1;
    var that = this;
    if (pavIndex >= 0) {
      that.publicMusic(pavIndex);
    }

  },
  /**
   * 下一首
   */
  songRight: function () {
    var pavIndex = this.data.songIndex + 1;
    var that = this;
    if (pavIndex == this.data.playSong.length) {
      pavIndex = 0;
    } else {
      that.publicMusic(pavIndex);
    }

  },
})