function albumUrl(id, callback){
  wx.navigateTo({
    url: '/pages/album/album?id='+id,
    success:function(res){
      callback(res)
    },
  })
}
function artisUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/artist/album?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function playlistUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/playlist/detail?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function mvUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/mv/mv?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function djUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/dj/index?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function userUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/user/index?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function videoUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/video/index?id=' + id,
    success: function (res) {
      callback(res)
    },
  })
}
function songsUrl(id, callback) {
  wx.navigateTo({
    url: '/pages/music/song?id=' + id,
    success: function (res) {
      callback(res)
    },
   
  })
}
module.exports={
  albumUrl: albumUrl,
  artisUrl: artisUrl,
  playlistUrl: playlistUrl,
  mvUrl: mvUrl,
  djUrl: djUrl,
  userUrl: userUrl,
  videoUrl: videoUrl,
  songsUrl: songsUrl
}
