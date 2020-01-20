// pages/search/index.js
var util = require('../../utils/util.js');
var bsurl = require('../../utils/api.js');
const Request = require('../../utils/request.js');
const Url = require('../../utils/searchtypelist.js');
var setTimeHidden = '',setTimeSearchKey='',setTimeSearch='';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHot:[],
    searchHistorical:[],
    serachValue:[],
    serachSuggest:null,
    searchValue:'',
    suggestHidden:true,
    windwHeight: wx.getSystemInfoSync().windowHeight - 60,
    suggestHeight: 0,
    hidden: false,
    searchList: [{ type: 1018, name: '综合' },{type:1,name:'单曲'},{type:10,name:'专辑'},{type:100,name:'歌手'},{type:1000,name:'歌单'},
{ type: 1004, name: 'MV' }, { type: 1009, name: '电台' }, { type: 1014, name: '视频' }, { type:1002,name:'用户' },],
    searchLHidden:false,
    searchWidth: wx.getSystemInfoSync().windowWidth,
    searchType:1,
    searchTWidth:0,
    serachLeft:0,
    searchSongszh:[],//综合
    searchAlbumzh:[],
    searchArtistszh:[],
    searchPlaylistzh:[],
    searchMvzh:[],
    searchDjzh:[],
    searchVideozh:[],
    searchUserzh:[],
    serachHeight: wx.getSystemInfoSync().windowHeight - 120,
    songsIndex:'',//播放第几个歌曲
    currentNumber:0,
    searchSongs:[],//单曲
    serachLimit: [{ limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }, { limit: 30, offset: 0, index: 0, count: 0 }],
    searchAlbum:[],//专辑
    searchArtists:[],//歌手
    searchPlaylist:[],//歌单
    searchMv:[],//mv
    searchDj:[],//电台
    searchVideo:[],//视频
    searchUser:[],//用户
    musicSong:[],
    hidden: true,
    songlist: false,
    hiddenBf: false,
    hiddenZt: true,
    palys: true,
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({ hidden: false });
    util.fetchGet(bsurl._secrchHotDetail,function(err,res){
      console.log(res)
      that.setData({
        searchHot:res.data
      })
      setTimeHidden = setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
    })
    console.log(wx.getStorageSync('searchHistorical') != '')
    if (wx.getStorageSync('searchHistorical') != ''){
      that.setData({
        searchHistorical: wx.getStorageSync('searchHistorical')
      })
    }
    
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
    let that = this;
    if (wx.getStorageSync('searchHistorical') != '') {
      that.setData({
        searchHistorical: wx.getStorageSync('searchHistorical')
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(setTimeSearch)
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
    clearTimeout(setTimeHidden)
    clearTimeout(setTimeSearchKey)
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
   * 搜索
   */
  bindKeySerch:function (e){
    let that = this;
    console.log(e)
   
    let values  = '';
    if (e.detail.value){
      values = e.detail.value
    }else{
      values = e.currentTarget.dataset.value
      that.setData({
        searchValue: e.currentTarget.dataset.value,
      })
    }
    if (values != ''){
      let urls = bsurl._secrch + '?keywords=' + values
      util.fetchGet(urls, function (err, res) {
        console.log(res)
        that.setData({
          searchSongszh: res.result.songs.map(function(item,i){
            item.name =  util.$searchValue(item.name, that.data.searchValue)
            item.artists.map(function(rest){
              rest.name = util.$searchValue(rest.name, that.data.searchValue)
              return rest
            })
            item.album.name = util.$searchValue(item.album.name, that.data.searchValue)
            if (i === that.data.songsIndex) {
              that.data.searchSongszh[that.data.songsIndex].play = false;
              that.data.searchSongszh[that.data.songsIndex].textHidden = true;
            } else {
              item.play = true;
              item.textHidden = false;
            }
            return item 
          }).slice(0, 10),
          searchLHidden:true,
          searchList: that.data.searchList,
         
        })
        app.globalData.playSong = that.data.searchSongszh
        setTimeSearchKey = setTimeout(() => {
          let width = 0;
          var query = wx.createSelectorQuery();
          query.selectAll('.header-li').boundingClientRect();
          query.exec(function (rect) {
            console.log(rect)
            if (rect[0] === null) return;
            let left = 0
            
            for (let i = 0; i < rect[0].length; i++) {
              width = width + rect[0][i].width
              if(i<1){
                left = left + rect[0][i].left
              }
            }
            console.log(left)
            that.setData({
              searchWidth: width,
              searchTWidth: rect[0][0].width,
              serachLeft: left
            })
          });
          clearTimeout(setTimeSearchKey)
        }, 500)
      })
      util.fetchGet(urls+'&type=10',function(err,res){
        console.log(res)
        that.setData({
          searchAlbumzh:res.result.albums.map(function(item){
            
            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.artists.map(function (rest) {
             
              rest.name = util.$searchValue(rest.name, that.data.searchValue)
              return rest
            })
            item.artist.name = util.$searchValue(item.artist.name, that.data.searchValue)
            item.publishTime = util.datePublish('Y-m-d',item.publishTime)
            return item 
          }).slice(0, 10),
          currentNumber: 0,
         
        })
      })
      util.fetchGet(urls + '&type=100', function (err, res) {
        console.log(res)
        that.setData({
          searchArtistszh: res.result.artists.map(function (item) {

            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.alias.map(function (rest) {

              rest = util.$searchValue(rest, that.data.searchValue)
              return rest
            })
            
            return item
          }).slice(0, 10),
          currentNumber: 0,
          
        })
      })
      util.fetchGet(urls + '&type=1000', function (err, res) {
        console.log(res)
        that.setData({
          searchPlaylistzh: res.result.playlists.map(function (item) {

            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.playCount = util.wyq(item.playCount);

            return item
          }).slice(0, 10),
          currentNumber: 0,
          
        })
      })
      util.fetchGet(urls + '&type=1004', function (err, res) {
        console.log(res)
        that.setData({
          searchMvzh: res.result.mvs.map(function (item) {
              item.name = util.$searchValue(util.cutString(item.name, 30), that.data.searchValue);
            item.playCount = util.wyq(item.playCount);
            item.duration = util.formatduration(item.duration)
            return item
          }).slice(0, 10),
          currentNumber: 0,
         
        })
      })
      util.fetchGet(urls + '&type=1009', function (err, res) {
        console.log(res)
        that.setData({
          searchDjzh: res.result.djRadios.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue);
            
            return item
          }).slice(0, 10),
         
        })
      })
      util.fetchGet(urls + '&type=1014', function (err, res) {
        console.log(res)
        that.setData({
          searchVideozh: res.result.videos.map(function (item) {
            item.title= util.$searchValue(util.cutString(item.title, 30), that.data.searchValue);
            item.playTime = util.wyq(item.playTime);
            item.durationms = util.formatduration(item.durationms)
            return item
          }).slice(0, 10),
         
        })
      })
      util.fetchGet(urls + '&type=1002', function (err, res) {
        console.log(res)
        that.setData({
          searchUserzh: res.result.userprofiles.map(function (item) {
            item.nickname = util.$searchValue(item.nickname, that.data.searchValue);
            
            return item
          }).slice(0, 10),
         
        })
      })
      let flog = true
      for(let i=0;i<that.data.searchHistorical.length;i++){
        if (values == that.data.searchHistorical[i]){
          flog = false
        }
      }
      if(flog){
        that.data.searchHistorical.push(values);
        wx.setStorageSync('searchHistorical', that.data.searchHistorical);
      }
      
    }
  },
  /***
   * 搜索提示
   */
  bindKeysuggest:function(e){
    console.log(e)
    let that = this;
    if(e.detail.value != ''){
      let urls = bsurl._searchSuggest + '?keywords=' + e.detail.value
      util.fetchGet(urls, function (err, res) {
        console.log(res)
      
        that.setData({
          serachSuggest:res.result,
          searchValue:e.detail.value,
          suggestHidden:false,
        
        })
        setTimeSearch = setTimeout(()=>{
         let height = 0;
         var query = wx.createSelectorQuery();
         query.selectAll('.resultName').boundingClientRect();
          query.exec(function (rect) {
            console.log(rect)
            if (rect[0] === null) return;
            
              for(let i=0;i<rect.length;i++){
                height = height + rect[i].height
              }
            that.setData({
              suggestHeight: height,
            })
          });
          clearTimeout(setTimeSearch)
       },500)
      })
    }else{
      that.setData({
        suggestHidden: true,
        searchValue:'',
        
      })
    }
    
  },
  blurInput:function(){
    this.setData({
      suggestHidden: true,

    })
  },
  focusInput:function(e){
    this.bindKeysuggest(e)
  },
  /**
   * 清空历史记录
   */
  removeHistorical:function(){
    this.setData({
      searchHistorical:[]
    })
    wx.removeStorageSync('searchHistorical')
  },
  /***
   * 切换搜索结果
   */
  tabSearch:function(e){
    console.log(e)
    let that = this;
    let current = e.currentTarget.dataset.index;
    that.setData({
      currentNumber: current
    })
    
  },
  bindchangeSwiper:function(event){
    console.log(event)
      let that = this;
      let current = event.detail.current + 1
      var query = wx.createSelectorQuery();
      query.selectAll('.header-li').boundingClientRect();
      query.exec(function (rect) {
        console.log(rect)
        if (rect[0] === null) return;
        
        that.setData({
         
          serachLeft: (current-1)*rect[0][0].width
        })
      });
      if(current>1){
        that.data.currentNumber = event.detail.current
        that.valueContent(that.data.searchValue, that.data.searchList[event.detail.current].type, that.data.serachLimit[event.detail.current - 1].limit, that.data.serachLimit[event.detail.current - 1].offset)
      }
    
  },
  /**
   * 请求加载内容
   * 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
   */
  valueContent:function(value,type,limit,offset){

    // let that = this, urls = bsurl._secrch + '?keywords=' + value + '&type=' + type + '&limit='+limit + '&offset='+offset;
    let that = this,
    urls = bsurl._secrch;
    
    that.setData({ hidden: false });
    Request.get(urls,{
      keywords:value,
      type : type,
      limit : limit,
      offset : offset
    }, { 'Content-Type': 'application/json' }).then(res=>{
      console.log(res)
      switch (type) {
        case 1:
          that.data.serachLimit[that.data.currentNumber-1].count = res.data.result.songCount;
          that.data.serachLimit[that.data.currentNumber-1].index = that.data.serachLimit[that.data.currentNumber-1].index + 1;
          that.data.serachLimit[that.data.currentNumber-1].offset = that.data.serachLimit[that.data.currentNumber-1].limit * that.data.serachLimit[that.data.currentNumber-1].index;
          res.data.result.songs.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue)
            item.artists.map(function (rest) {
              rest.name = util.$searchValue(rest.name, that.data.searchValue)
              return rest
            })
            item.album.name = util.$searchValue(item.album.name, that.data.searchValue)
            that.data.searchSongs.push(item)
            if (i === that.data.songsIndex) {
              that.data.searchSongszh[that.data.songsIndex].play = false;
              that.data.searchSongszh[that.data.songsIndex].textHidden = true;
            } else {
              item.play = true;
              item.textHidden = false;
            }
            app.globalData.playSong = that.data.searchSongs
          })
          that.setData({
            searchSongs: that.data.searchSongs,
          })
          app.gl
          break;
        case 10:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.albumCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.albums.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.artists.map(function (rest) {

              rest.name = util.$searchValue(rest.name, that.data.searchValue)
              return rest
            })
            item.artist.name = util.$searchValue(item.artist.name, that.data.searchValue)
            item.publishTime = util.datePublish('Y-m-d', item.publishTime)
            that.data.searchAlbum.push(item)
            
          })
          that.setData({
            searchAlbum: that.data.searchAlbum,
          })
          
          break;
        case 100:
          
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.artistCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.artists.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.alias.map(function (rest) {

              rest = util.$searchValue(rest, that.data.searchValue)
              return rest
            })
           
            that.data.searchArtists.push(item)
          })
          that.setData({
            searchArtists: that.data.searchArtists,
          })
          break;
        case 1000:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.playlistCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.playlists.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue);
            item.playCount = util.wyq(item.playCount);

            that.data.searchPlaylist.push(item)
          })
          that.setData({
            searchPlaylist: that.data.searchPlaylist,
          })
          break;
        case 1002:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.userprofileCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.userprofiles.map(function (item) {
            item.nickname = util.$searchValue(item.nickname, that.data.searchValue);
           
            that.data.searchUser.push(item)
          })
          that.setData({
            searchUser: that.data.searchUser,
          })
          break;
        case 1004:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.mvCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.mvs.map(function (item) {
            item.name = util.$searchValue(util.cutString(item.name, 30), that.data.searchValue);
            item.playCount = util.wyq(item.playCount);
            item.duration = util.formatduration(item.duration)

            that.data.searchMv.push(item)
          })
          that.setData({
            searchMv: that.data.searchMv,
          })
          break;
        case 1006:
          break;
        case 1009:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.djRadiosCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.djRadios.map(function (item) {
            item.name = util.$searchValue(item.name, that.data.searchValue);
            
            that.data.searchDj.push(item)
          })
          that.setData({
            searchDj: that.data.searchDj,
          })
          break;
        case 1014:
          that.data.serachLimit[that.data.currentNumber - 1].count = res.data.result.videoCount;
          that.data.serachLimit[that.data.currentNumber - 1].index = that.data.serachLimit[that.data.currentNumber - 1].index + 1;
          that.data.serachLimit[that.data.currentNumber - 1].offset = that.data.serachLimit[that.data.currentNumber - 1].limit * that.data.serachLimit[that.data.currentNumber - 1].index;
          res.data.result.videos.map(function (item) {
            item.title = util.$searchValue(util.cutString(item.title, 30), that.data.searchValue);
            item.playTime = util.wyq(item.playTime);
            item.durationms = util.formatduration(item.durationms)

            that.data.searchVideo.push(item)
          })
          that.setData({
            searchVideo: that.data.searchVideo,
          })
          break;
        case 1018:
          break;
      }
      setTimeHidden = setTimeout(function () {
        that.setData({ hidden: true })
        clearTimeout(setTimeHidden)
      }, 300);
    }).catch(res=>{
      console.log(res)
    })
   /* util.fetchGet(urls, function (err, res) {
      console.log(res)
      switch(type){
        case 1 :
          that.setData({
            searchSongs: res.result.songs.map(function (item) {
              item.name = util.$searchValue(item.name, that.data.searchValue)
              item.artists.map(function (rest) {
                rest.name = util.$searchValue(rest.name, that.data.searchValue)
                return rest
              })
              item.album.name = util.$searchValue(item.album.name, that.data.searchValue)
              return item
            }),
          })
          break;
        case 10:
          break;
        case 100:
          break;
        case 1000:
          break;
        case 1002:
          break;
        case 1004:
          break;
        case 1006:
          break;
        case 1009:
          break;
        case 1014:
          break;
        case 1018:
          break;
      }
      setTimeout(function () {
        that.setData({ hidden: true })
      }, 300);
     
    })*/
  },
  /***
   * 上拉加载
   */
  scrolltolower:function(){
    let that = this;
    let current = that.data.currentNumber;
    console.log(current)
    if(that.data.serachLimit[current - 1].offset < that.data.serachLimit[current - 1].count){
      that.valueContent(that.data.searchValue, that.data.searchList[current].type, that.data.serachLimit[current - 1].limit, that.data.serachLimit[current - 1].offset);
    }
    
  },
  /**
   * 跳转页面
   */
  serachHref:function(e){
    console.log(e)
    let that = this;
    let type = e.currentTarget.dataset.type;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    switch (type) {
      case "1":
        if(id){
          console.log(Url)
          that.setData({
            songsIndex: index,
            searchSongs: that.data.searchSongs.map(function (item, i) {
              if (i === index) {
                that.data.searchSongs[index].play = false;
                that.data.searchSongs[index].textHidden = true;
              } else {
                item.play = true;
                item.textHidden = false;
              }
              return item
            })
          })
          app.globalData.playSong = that.data.searchSongs
          that.songsUrls(e,index)
          Url.songsUrl(id,function(res){
            console.log(res)
            // res.eventChannel.emit('songsPlayIndex', { songIndex: index })
            
          })
          
        }else{
          console.log(type)
          that.setData({
            songsIndex: 0,
            searchSongs: that.data.searchSongs.map(function (item, i) {
              if (i === 0) {
                that.data.searchSongs[0].play = false;
                that.data.searchSongs[0].textHidden = true;
              } else {
                item.play = true;
                item.textHidden = false;
              }
              return item
            })
          })
          Url.songsUrl(id, function (res) {
            console.log(res)
            res.eventChannel.emit('songsPlayIndex', { songIndex: 0 })
            
          })
        }
        break;
      case "10":
        Url.albumUrl(id,function(res){
          console.log(res)
        })
        break;
      case "100":
        Url.artisUrl(id, function (res) {
          console.log(res)
        })
        break;
      case "1000":
        Url.playlistUrl(id, function (res) {
          console.log(res)
        })
        break;
      case "1002":
        Url.userUrl(id, function (res) {
          console.log(res)
        })
        break;
      case "1004":
        Url.mvUrl(id, function (res) {
          console.log(res)
        })
        break;
      
      case "1009":
        Url.djUrl(id, function (res) {
          console.log(res)
        })
        break;
      case "1014":
        Url.videoUrl(id, function (res) {
          console.log(res)
        })
        break;
      
    }
  },
  /**歌曲请求链接*/
  songsUrls: function (e, indexs, ids) {
    this.data.hidden = false;
    //更新数据与播放内容
    var _that = this;
    var id = ids ? ids : e.currentTarget.dataset.id;
    var index = indexs == 0 || indexs ? indexs : e.currentTarget.dataset.index;
    var urlSong = bsurl._musicUrl + "?id=" + id;
    console.log(urlSong)
    var searchSongs = _that.data.currentNumber == 0 ? _that.data.searchSongszh : _that.data.searchSongs;
    //获取歌曲的演唱歌手名字
    var arName = searchSongs[index].artists[0].name;
    for (var i = 0; i < searchSongs[index].artists.length - 1; i++) {

      if (_that.data.searchSongs[index].artists[i + 1]) {
        arName = arName + "/" + searchSongs[index].artists[i + 1].name;
      }
    }

    util.fetchGet(urlSong, function (err, res) {
      console.log(res);
      if (_that.data.currentNumber == 0 ){
        _that.setData({
          searchSongszh: searchSongs.map(function (item, i) {
            if (i === index) {
              searchSongs[index].play = false;
              searchSongs[index].textHidden = true;
            } else {
              item.play = true;
              item.textHidden = false;
            }
            return item
          }),
          musicSong: res.data.map(function (item) {

            // item.name = _that.data.playSong[index].name;
            item.author = arName;
            item.imgUrl = searchSongs[index].album.picUrl;
            return item
          })
        })
      }else{
        _that.setData({
          searchSongs: searchSongs.map(function (item, i) {
            if (i === index) {
              searchSongs[index].play = false;
              searchSongs[index].textHidden = true;
            } else {
              item.play = true;
              item.textHidden = false;
            }
            return item
          }),
          musicSong: res.data.map(function (item) {

            // item.name = _that.data.playSong[index].name;
            item.author = arName;
            item.imgUrl = searchSongs[index].album.picUrl;
            return item
          })
        })
      }
     

      setTimeout(function () {
        _that.setData({
          hidden: true,
          songlist: false,
          hiddenBf: false,
          hiddenZt: true,
          songsIndex: index,
          palys: true,
        })
        app.globalData.playSong = _that.data.currentNumber == 0 ? _that.data.searchSongszh : _that.data.searchSongs;
        app.globalData.hiddenBf = _that.data.hiddenBf;
        app.globalData.hiddenZt = _that.data.hiddenZt;
        app.globalData.songIndex = _that.data.songsIndex;
        app.globalData.musicSong = _that.data.musicSong;
        app.globalData.onplays = _that.onplays;
        app.musicPaly(_that.data.musicSong[0].url);
      }, 300);
    });

  }
})