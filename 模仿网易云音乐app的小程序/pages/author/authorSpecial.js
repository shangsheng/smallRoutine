// pages/author/authorSpecial.js
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
let app = getApp();
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
    playSong:[],
    special:[],
    visualFrequency:[],
    dataile:{},
    play:true,
    textHidden:false,
    logo:logo,
    musicSong: [],
    hiddenBf: true,
    hiddenZt: false,
    songIndex: 0,
    currentTab:0,
    winHeight: "",//窗口高度
    id:"",
    yirexinxi:{},
    conform:[],
    songlist:true,
    hidden:false,
    prevPage:{},
    prevPage2:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newDetail = wx.getStorageSync("detail")
    var that = this;
    let pages = getCurrentPages();
    console.log(pages)
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var prevPage2 = pages[pages.length-3];   //上上一个页面 
    this.data.prevPage = prevPage;
    this.data.prevPage2 = prevPage2;
    if (newDetail != ""&& parseInt(options.id) === newDetail.id) {
      this.onSpecial(options.id);
      this.setData({
        hiddenBf: app.globalData.hiddenBf,
        hiddenZt: app.globalData.hiddenZt,
        musicSong: app.globalData.musicSong,
        // playSong: app.globalData.playSong,
        play: app.globalData.palys,
        hidden: true,
        songlist: false,
      })
    } else {
      this.onSpecial(options.id);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onplaySpecial();
    app.globalData.onplaySpecial = this.onplaySpecial;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var newDetail = wx.getStorageSync("detail")
    var that = this;
    if (newDetail != "" ) {
      this.setData({
        hiddenBf: app.globalData.hiddenBf,
        hiddenZt: app.globalData.hiddenZt,
        musicSong: app.globalData.musicSong,
        // playSong: app.globalData.playSong,
        play: app.globalData.palys,
        hidden: true,
        songlist: false,
      })
    }
    app.globalData.onplaySpecial = this.onplaySpecial;
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
    app.globalData.onplaySpecial="";
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
  /***
   * 数据请求
   */
  onSpecial:function(id){
    var url = api._artists + "?id="+ id;
    this.hosSong(url)
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor(e.detail.current);
  },
  // 点击标题切换当前页时改变样式
  songPrs: function (e) {
    console.log(e)
    var cur = e.target.dataset.content;
    console.log(this)
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      // this.checkCor(cur);
    }
  },
  checkCor:function(current){
    var that = this;
    console.log(current)
    if(current==0){
      this.setData({
        playSong: that.data.playSong
      })
    }else if(current == 1){
      that.data.hidden = false;
      var url = api._artistAlbum + "?id=" + this.data.id;
      if(this.data.special.length != 0){
        this.setData({
          special:that.data.special
        })
      }else{
        util.fetchGet(url, function (err, res) {
          console.log(res)
          that.setData({
            special: that.data.special.concat(res.hotAlbums.map(function (item) {
              item.publishTime = util.formatTime(item.publishTime, 3);
              return item;
            }))
          })
          setTimeout(function () {
            that.setData({
              hidden: true
            })
          }, 300)
        })
      }
    }else if(current == 2){
      if(this.data.visualFrequency.length != 0){
        this.setData({
          visualFrequency:that.data.visualFrequency
        })
      }else{
        that.data.hidden = false;
        var url = api._artistsMv + "?id=" + this.data.id;
        util.fetchGet(url, function (err, res) {
          console.log(res)
          if(res.code == 200){
            that.setData({
              visualFrequency: that.data.visualFrequency.concat(res.mvs.map((item) => {
                item.playCount = util.wyq(item.playCount);
                return item;
              }))
            })
          }else{
            console.log(err)
          }
          setTimeout(function () {
            that.setData({
              hidden: true
            })
          }, 300)
        })
      }
    }else if(current == 3){
      that.data.hidden = false;
      var url1 = api._simiArtist + "?id=" + this.data.id;
      var setYirexin = wx.getStorageSync("yirexinxi");
      if (setYirexin != ""){
        this.setData({
          yirexinxi: setYirexin,
          conform:that.data.conform
        })
        console.log(this)
      }else{
        var url = api._artistDesc + "?id=" + this.data.id;
        util.fetchGet(url, function (err, res) {
          console.log(res)
          if(res.code == 200){
            res.readCount = util.wyq(res.readCount);
            res.name = that.data.dataile.name;
            res.absImgUrl = that.data.dataile.img1v1Url;
            that.setData({
              yirexinxi: res
            })
          }else{
            console.log(err)
          }
          wx.setStorageSync("yirexinxi", res)
        })
        util.fetchGet(url1, function (err, res) {
          console.log(res)
          that.setData({
            conform: res
          })
          setTimeout(function () {
            that.setData({
              hidden: true
            })
          }, 300)
        })

      }
    }
  },
  /**
   * 热门歌曲请求
   */
  hosSong:function(url){
    var that = this;
    util.fetchGet(url, function (err, res) {
      console.log(res)
      that.setData({
        dataile: res.artist,
        playSong: that.data.playSong.concat(res.hotSongs.map(function (item) {
          var arName = item.ar[0].name;
          item.playUrl = item.al.picUrl;
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
      wx.setNavigationBarTitle({
        title: res.artist.name,
      })
      //  高度自适应
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR - 190;
          that.setData({
            winHeight: calc,
            id: that.options.id
          });
        }
      });
      setTimeout(function(){
        that.setData({
          hidden: true
        })
      },300)
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
          hidden: true, songlist: false, songIndex: index })
        app.globalData.onplays = "";
        app.globalData.onplaySpecial = ""
        app.globalData.songIndex = index;
        app.globalData.musicSong = _that.data.musicSong;
        app.globalData.playSong = _that.data.playSong;
        app.musicPaly(_that.data.musicSong[0].url);
        // wx.setStorageSync("detail", _that.data.detail);
        _that.data.prevPage.setData({
          hidden:true,
          songlist:false,
          songIndex:index,
          musicSong:_that.data.musicSong,
          playSong : _that.data.playSong
        })
        _that.data.prevPage2.setData({
          hidden: true,
          songlist: false,
          songIndex: index,
          musicSong: _that.data.musicSong,
          playSong: _that.data.playSong
        })
        _that.data.dataile.briefDesc = "";
        _that.data.dataile.publishTime = util.formatTime(_that.data.dataile.publishTime, 3)
        wx.setStorageSync("detail", _that.data.dataile);
        wx.redirectTo({
          url: "/pages/music/song" + "?id=" + id,
        })

      }, 300);
    });
    console.log(app)
  },
  /***
   * 监听播放顺序
   */
  onplaySpecial: function () {
    var that = this;
    app.globalData.backgroundAudioManager.onWaiting(function () {
      that.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true
      })
      that.data.prevPage.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true,
      })
      that.data.prevPage2.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true,
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
      that.data.prevPage.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true
      })
      that.data.prevPage2.setData({
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
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      that.data.prevPage2.setData({
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
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      that.data.prevPage2.setData({
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
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false
      })
      that.data.prevPage2.setData({
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
      that.data.prevPage2.setData({
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
          that.data.prevPage.setData({
            hiddenBf: true,
            hiddenZt: false,
            songIndex: pavIndex,
            palys: true,
            playtime: 0
          })
          that.data.prevPage2.setData({
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
    that.data.prevPage.setData({
      hiddenBf: true,
      hiddenZt: false,
      palys: false
    })
    that.data.prevPage2.setData({
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
    that.data.prevPage.setData({
      hiddenBf: false,
      hiddenZt: true,
      palys: true
    })
    that.data.prevPage2.setData({
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
    if (pavIndex == this.data.playSong.length){
      pavIndex=0;
    }else{
      that.publicMusic(pavIndex);
    }

  },
})