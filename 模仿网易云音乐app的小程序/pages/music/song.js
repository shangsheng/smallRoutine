// pages/music/song.js
var util = require('../../utils/util.js');
var bsurl = require('../../utils/api.js');
let app = getApp();
let seek = 0;
var timeset;
var modeArr = [
  { "title": "单曲循环", "modeUrl": "/images/a_y.png", "id": 0, "modeUrl9":"/images/a_y9.png" },
  { "title": "列表播放", "modeUrl": "/images/a_p.png", "id": 1, "modeUrl9":"/images/a_p9.png" },
  { "title": "随机播放", "modeUrl": "/images/aa9.png", "id": 2, "modeUrl9":"/images/aa99.png" },
];
let defaultdata ={
  ar:false,
  at:true,
  ai:false,
  ak:true,
  ae:false,
  af:true,
  playtime: '00:00',
  durationTime: "00:00",
  songIndex:0,
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
  disable: true,//歌词是否显示
  music:{},
  detail:{},
  playSong:[],
  privileges:[],
  lrc:[],
  lrcindex: 0,
  showlrc: false,
  disable: false,
  downloadPercent:0,//下载个数
  commentscount:0,//相似列表
  innerAudioContext:{},//全局的播放器
  timeWidth: 0,
  tiems : 0,
  prevPage:{},
  actionListHidden:true,
  mode: {},
  modeIndex:0,
  actionSheetHidden:true,
  moreSpecial:{} 
}
// const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: defaultdata,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var s = 0;
    var m = 0;
    var item;
    var Time = (function () {
      m = Math.floor(app.globalData.duration / 60);
      s = Math.ceil(app.globalData.duration - m * 60);
      if (m > 9) {
        m = m;
      } else {
        m = "0" + m;
      }
      if (s > 9) {
        s = s;
      } else {
        s = "0" + s;
      }
      item = m + ":" + s;
      return item;
    })();
   
    this.setData({
      hiddenBf: app.globalData.hiddenBf,
      hiddenZt: app.globalData.hiddenZt,
      music: app.globalData.musicSong,
      playSong: app.globalData.playSong,
      privileges: app.globalData.privileges,
      detail: app.globalData.detail,
      palys: app.globalData.palys,
      radius:app.globalData.palys,
      songIndex: app.globalData.songIndex,
      durationTime:Time
    })
    wx.setNavigationBarTitle({
      title: that.data.music[0].name
    })
    this.gclycri(options.id)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app)
    var that = this;
    let pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    this.data.prevPage = prevPage;
    var urlRoute = ".." + prevPage.route.substring(5);
    console.log(this)
    this.onPalyMusic();
    // this.musicTime();
    app.globalData.onPalyMusic = this.onPalyMusic;
    // app.globalData.albumTrue = this.data.albumTrue;
    // wx.navigateTo({
    //   url: urlRoute,
    // })
    this.setData({
      mode: modeArr[1],
      modeIndex: 2
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var s = 0;
    var m = 0;
    var item;
    var Time = (function () {
      m = Math.floor(app.globalData.duration / 60);
      s = Math.ceil(app.globalData.duration - m * 60);
      if (m > 9) {
        m = m;
      } else {
        m = "0" + m;
      }
      if (s > 9) {
        s = s;
      } else {
        s = "0" + s;
      }
      item = m + ":" + s;
      return item;
    })();
    seek = setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        complete: function (res) {
          var time = 0, lrcindex = that.data.lrcindex, playing = false;
          if (res.status != 2 && that.data.lrc.lrc) {
           
            if (that.data.showlrc && !that.data.lrc.lrc.scroll) {
              for (let i in that.data.lrc.lrc.now_lrc) {
                var se = that.data.lrc.lrc.now_lrc[i];
                if (se.lrc_sec <= res.currentPosition) {
                  lrcindex = i
                }
              }
            };

          }else{
            //  that.data.lrc.lrc=true;
          } if (res.status == 1) {
            playing = true;
          }
          that.setData({
            
            lrcindex: lrcindex,
         
          })
        }
      });
    },1000)
    this.setData({
      hiddenBf: app.globalData.hiddenBf,
      hiddenZt: app.globalData.hiddenZt,
      music: app.globalData.musicSong,
      playSong: app.globalData.playSong,
      privileges: app.globalData.privileges,
      detail: app.globalData.detail,
      palys: app.globalData.palys,
      radius: app.globalData.palys,
      songIndex: app.globalData.songIndex,
      durationTime: Time
    })
    app.globalData.onPalyMusic = this.onPalyMusic;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(seek)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(seek)
    app.globalData.onPalyMusic="";
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
   * 相似音乐列表
   */
  palyMusic:function(id){
    var that = this;
    wx.request({
      url: bsurl._simiSong + '?id=' + id,
      success: function (res) {
        app.globalData.curplay = res.data.songs[0];
        if (!res.data.songs[0].mp3Url) {
          console.log("歌曲链接不存在，歌曲下架了");
          that.setData({
            disable: true
          })
        } else {
          wx.playBackgroundAudio({
            dataUrl: res.data.songs[0].mp3Url,
            title: res.data.songs[0].name,
            success: function (res) {
              app.globalData.globalStop = false;
              app.globalData.playtype = 1
            }
          });
          wx.setNavigationBarTitle({ title: app.globalData.curplay.name + "-" + app.globalData.curplay.artists[0].name });
          common.loadrec(0, 0, res.data.songs[0].commentThreadId, function (res) {
            that.setData({
              commentscount: res.total
            })
          })
        }
      }
    });
  },
  /**
   * 监听音乐是否播放完了，进行数据更新
   */
  onPalyMusic:function(){
    let that = this;
    app.globalData.backgroundAudioManager.onEnded(()=>{
      console.log(app)
        if(that.data.modeIndex ==2){
          that.data.songIndex = app.globalData.songIndex + 1;
          that.publicMusic(that.data.songIndex);
        }else if(that.data.modeIndex == 0){
          that.data.songIndex = Math.round(Math.random() * that.data.playSong.length);
          that.publicMusic(that.data.songIndex);
        }else if(that.data.modeIndex == 1){
          app.musicPaly(that.data.music[0].url);
        }
        that.data.songIndex=0;
        that.gclycri(that.data.playSong[that.data.songIndex].privilege.id);
    })
    app.globalData.backgroundAudioManager.onWaiting(function () {
      that.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true,
        radius:true
      })
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      that.data.prevPage.setData({
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
        palys: true,
        radius:true
      })
      that.data.prevPage.setData({
        hiddenBf: false,
        hiddenZt: true,
        palys: true,
      })
      console.log("开始播放")
      console.log(that)
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
      wx.setNavigationBarTitle({
        title: that.data.music[0].name
      })
    });
    // app.globalData.backgroundAudioManager.onEnded(function () {
    //   var pavIndex = that.data.songIndex + 1;
    //   that.publicMusic(pavIndex)
    // });
    app.globalData.backgroundAudioManager.onTimeUpdate(function () {
      app.globalData.currentTime = app.globalData.backgroundAudioManager.currentTime;
      app.globalData.duration = app.globalData.backgroundAudioManager.duration;
      that.musicTime();
     
    });
    app.globalData.backgroundAudioManager.onError(function (err) {
      console.log(err)
    })
    app.globalData.backgroundAudioManager.onPause(function () {
      that.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false,
        radius:false
      })
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false,
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
        palys: false,
        radius:false
      })
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        palys: false,
      })
      console.log("停止")
      app.globalData.hiddenBf = that.data.hiddenBf;
      app.globalData.hiddenZt = that.data.hiddenZt;
      app.globalData.palys = that.data.palys;
    })
  },
  // 获取歌词
  gclycri:function(id){
    var that = this;
    var lycriUrl = bsurl._lyric + "?id=" + id;
    var lrcindex = that.data.lrcindex;
    util.fetchGet(lycriUrl,function(err,res){
      console.log(res)
      if(res.lrc){
        res.lrc = util.parse_lrc(res.lrc.lyric)
        that.setData({
          lrc:res
        })
      }else{
        that.setData({
          lrc:res
        })
      }
    })
  },
  /***
   * 时间显示
   */
  musicTime:function(){
    var that = this;
    var times, ps, pm, dtimes;
    // console.log(Time())
    var that = this;
    var s = 0;
    var m = 0;
    var item;
    var Time = (function () {
      m = Math.floor(app.globalData.duration / 60);
      s = Math.ceil(app.globalData.duration - m * 60);
      if (m > 9) {
        m = m;
      } else {
        m = "0" + m;
      }
      if (s > 9) {
        s = s;
      } else {
        s = "0" + s;
      }
      item = m + ":" + s;
      return item;
    })();

    if (that.data.palys){
      // app.globalData.backgroundAudioManager.onTimeUpdate(function(){
        // console.log(app.globalData.duration)
        that.data.tiems = app.globalData.currentTime;
        pm = Math.floor(that.data.tiems / 60);
        ps = Math.ceil(that.data.tiems - pm * 60);
        if (pm > 9) {
          pm = pm;
        } else {
          pm = "0" + pm;
        }
        if (ps > 9) {
          ps = ps;
        } else {
          ps = "0" + ps;
        }
        times = pm + ":" + ps;
        that.setData({
          playtime: times,
          timeWidth: (that.data.tiems / app.globalData.duration) * 100,
          durationTime: Time
        })
      // })   
     }
  },
  /**
   * 暂停
   */
  songBf:function(){
    const that = this;
    app.globalData.backgroundAudioManager.pause();
    that.setData({
      hiddenBf: true,
      hiddenZt: false,
      palys: false,
      radius: false
    })
    that.data.prevPage.setData({
      hiddenBf: true,
      hiddenZt: false,
      palys: false,
    })
    app.globalData.hiddenBf = that.data.hiddenBf;
    app.globalData.hiddenZt = that.data.hiddenZt;
    app.globalData.palys = that.data.palys;
  },
  /**
   * 播放
   */
  songZt: function () {
    const that = this;
   
    app.globalData.backgroundAudioManager.play();
    that.setData({
      hiddenBf: false,
      hiddenZt: true,
      palys: true,
      radius:true
    })
    that.data.prevPage.setData({
      hiddenBf: false,
      hiddenZt: true,
      palys: true,
    })
    app.globalData.hiddenBf = that.data.hiddenBf;
    app.globalData.hiddenZt = that.data.hiddenZt;
    app.globalData.palys = that.data.palys;
    
  },
  /***
     * 公共的请求音乐类
     */
  publicMusic: function (pavIndex) {
    var that = this;
    console.log(pavIndex)
    console.log(this)
    if(pavIndex === this.data.playSong.length){
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
      that.gclycri(that.data.playSong[0].privilege.id);
    }else{
    var id = that.data.playSong[pavIndex].privilege.id;
    var urlSong = bsurl._musicUrl + "?id=" + id;
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
        music: res.data.map(function (item) {
         
          item.name = that.data.playSong[pavIndex].name;
          item.author = arName;
          item.imgUrl = that.data.playSong[pavIndex].al.picUrl;
          return item;
        })
      })
      // setTimeout(function () {
        that.setData({
          hiddenBf: true,
          hiddenZt: false,
          songIndex: pavIndex,
          palys: true,
          playtime: "00:00",
          moreSpecial: that.DataUpdate(),
          songIndex:0
        })
      that.data.prevPage.setData({
        hiddenBf: true,
        hiddenZt: false,
        songIndex: pavIndex,
        palys: true,
        musicSong:that.data.music,
        playSong: that.data.playSong
      })
        app.globalData.musicSong = that.data.music;
        app.globalData.hiddenBf = that.data.hiddenBf;
        app.globalData.hiddenZt = that.data.hiddenZt;
        app.globalData.palys = that.data.palys;
        app.globalData.songIndex = that.data.songIndex;
        app.globalData.playSong = that.data.playSong;
        app.musicPaly(that.data.music[0].url);
      // }, 300)
      // console.log(that)
      that.gclycri(that.data.playSong[pavIndex].privilege.id);
    });
    }
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
  // 列表
  actionSheetChange:function(){
    this.setData({
      actionListHidden: true
    })
  },
  actionLie:function(){
    var that = this;
    var newsPlaySong = wx.getStorageSync('playSong');
    if(newsPlaySong !=""){
      this.setData({
        actionListHidden: false,
        playSong: newsPlaySong.map(function (item) {
          item.deleteImg = "/images/a7o.png"
          console.log(that.data.music[0].id === item.privilege.id)
          if (that.data.music[0].id === item.privilege.id) {
            item.play = false;
            item.textHidden = true;
          } else {
            item.play = true;
            item.textHidden = false;
          }
          return item
        }),
      })
    }else{
      this.setData({
        actionListHidden: false,
        playSong: that.data.playSong.map(function (item) {
          item.deleteImg = "/images/a7o.png";
          return item
        }),
      })
    }
  },
  privilegeVebo:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    //更新数据与播放内容
    var _that = this;
    var index = e.currentTarget.dataset.index;
    console.log(_that.data.playSong[index])
    var urlSong = bsurl._musicUrl + "?id=" + id;
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
        music: res.data.map(function (item) {

          item.name = _that.data.playSong[index].name;
          item.author = arName;
          item.imgUrl = _that.data.playSong[index].al.picUrl;
          // item.hiddenBf = app.globalData.hiddenBf;
          // item.hiddenZt = app.globalData.hiddenZt;
          return item
        })
      })
      console.log(_that.data.music[0])
      setTimeout(function () {
        _that.setData({ songIndex: index, songIndex:0 })
        app.globalData.onplays = _that.onplays;
        app.globalData.songIndex = index;
        app.globalData.musicSong = _that.data.music;
        app.globalData.playSong = _that.data.playSong;
        app.musicPaly(_that.data.music[0].url);
        _that.data.prevPage.setData({
          hiddenBf: false,
          hiddenZt: true,
          songIndex: index,
          palys: true,
          musicSong: _that.data.music,
          playSong: _that.data.playSong
        })
        _that.gclycri(_that.data.playSong[index].privilege.id);
      }, 300);
    });
    
  },
  /***
   * 删除
   */
  deleteSong:function(e){
    var index = e.currentTarget.dataset.index;
    var newsPlaySong = wx.getStorageSync('playSong');
    var playSong = this.data.playSong;
    if(newsPlaySong !=""){
      if (this.data.music[0].id == newsPlaySong[index].privilege.id && this.data.playSong.length - 1 > index) {
        this.publicMusic(index + 1);
        console.log(index + 1);
      } else if (this.data.playSong.length - 1 == index) {
        this.publicMusic(0);
      }
    }else{
      if (this.data.music[0].id == this.data.playSong[index].privilege.id && this.data.playSong.length - 1 > index) {
        this.publicMusic(index + 1);
        console.log(index + 1);
      } else if (this.data.playSong.length - 1 == index) {
        this.publicMusic(0);
      }
    }
    playSong.splice(index,1)
    
    this.setData({
      playSong: playSong
    })
    wx.setStorageSync("playSong", playSong);
  },
  /**
   * 
   */
  playMode:function(e){
    console.log(this)
    var  id = e.currentTarget.dataset.id;
    var index = this.data.songIndex;
    var _that = this;
    if(id==0){
      //单曲循环
      var musicUrl = wx.getStorageSync("musicSong");
      this.setData({
        music:musicUrl,
        hiddenBf: false,
        hiddenZt: true,
        songIndex: index,
        palys: true,
        mode: modeArr[0],
        modeIndex:1,
        lbs:false
      })
      _that.data.prevPage.setData({
        hiddenBf: false,
        hiddenZt: true,
        songIndex: index,
        palys: true,
        musicSong: _that.data.music,
      })
      setTimeout(function () {
        _that.setData({
          lbs: true
        })
      },3000)
      // app.musicPaly(_that.data.music[0].url);
    }else if(id==1){
      //列表播放
      // this.publicMusic(index)
      this.setData({
        modeIndex:2,
        mode: modeArr[1],
        lbs:false
      })
      setTimeout(function () {
        _that.setData({
          lbs: true
        })
      },3000)
    }else if(id==2){
      //随机播放
      this.setData({
        lbs:false,
        modeIndex: 0,
        mode: modeArr[2],
      })
      setTimeout(function(){
        _that.setData({
          lbs:true
        })
      },3000)
    }
  },
  /**
   * 更多操作
   * */ 
  moreOperations:function(){
    var that = this;
    this.setData({
      actionSheetHidden:false,
      moreSpecial: that.DataUpdate()
    })
  },
  actionspecialChange:function(){
    this.setData({
      actionSheetHidden: true
    })
  },
/**
 * 数据更新函数
 */
DataUpdate:function(){
  var that = this;
  var specialArr = {};
  for (var i = 0; i < this.data.playSong.length; i++) {
    if (that.data.music[0].id === this.data.playSong[i].id) {
      specialArr = this.data.playSong[i];
    }
  }
  return specialArr;
},
/**
 * 隐藏歌词和显示歌词
 * */ 
 loadlrc:function(){
   this.setData({
     showlrc:false
   })
 },
 loadlrcTrue:function(){
   this.setData({
     showlrc: true
   })
 },
 /**
  * 跳转页面
  */
  authorPaver:function(e){
    console.log(e)
    var id = e.currentTarget.id;
    var limit = e.currentTarget.dataset.limit;
    console.log(limit)
    if (!limit){
      wx.redirectTo({
        url: "/pages/author/authorSpecial?id="+id,
      })
    }else{
      wx.redirectTo({
        url: '/pages/artist/album?id='+id+"&limit="+limit,
      })
    }
  }
})