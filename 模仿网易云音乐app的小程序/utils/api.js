const _Http = 'http://localhost:3000';//路径
// 手机登录
const _Phone        = _Http +'/login/cellphone';
//邮箱登录
const _Email        = _Http + '/login';
//刷新登录
const _login        = _Http + '/login/refresh';
//获取用户详情
const _userDetail   = _Http + '/user/detail';
//获取用户信息, 歌单，收藏，mv, dj 数量
const _userSubcount = _Http + '/user/subcount';
//获取用户歌单
const _userPlaylist = _Http + '/user/playlist';
//更新歌单
const _playlistUpdate = _Http + '/playlist/update';
//发送私信
const _sendText = _Http + '/send/text';
//发送私信(带歌单)
const _sendPlaylist = _Http + '/send/playlist';
//获取用户电台
const _userDj = _Http + '/user/dj';
//获取用户关注列表
const _userFollows = _Http + '/user/follows';
//获取用户粉丝列表
const _userfolloweds = _Http + '/user/followeds';
//获取用户动态
const _userEvent = _Http + '/user/event';
//获取用户播放记录
const _userRecord = _Http + '/user/record';
// 对歌单添加或删除歌曲
const _playlistTracks = _Http + '/playlist/tracks';
// 给评论点赞
const _commentLike = _Http + '/comment/like';
//获取每日推荐歌单
const _recommendResource = _Http + '/recommend/resource';
// 获取每日推荐歌曲
const _recommendSongs = _Http + '/recommend/songs';
// 私人 FM
const _personalFm = _Http + '/personal_fm';
// 签到
const _dailySignin = _Http + '/daily_signin';
// 云盘
const _userCloud = _Http + '/user/cloud';
//电台 - 推荐
const _djRecommend = _Http + '/dj/recommend';
// 电台 - 分类
const _djCatelist = _Http + '/dj/catelist';
// 电台 - 分类推荐
const _djRecommendType = _Http + '/dj/recommend/type';
// 电台 - 订阅
const _djSub = _Http + '/dj/sub';
// 电台的订阅列表
const _djSublist = _Http + '/dj/sublist';
// 电台 - 详情
const _djDetail = _Http + '/dj/detail';
// 电台 - 节目
const _djProgram = _Http + '/dj/program';
// 以上是登录后的接口
//获取动态消息
const _event = _Http + '/event';
//歌手分类列表
const _artistList = _Http + '/artist/list';
//收藏歌手
const _artistSub = _Http + '/artist/sub';
//取消收藏歌手
const _artistUnsub = _Http + '/artist/unsub';
//收藏的歌手列表
const _artistSublist = _Http + '/artist/sublist';
//歌单分类
const _playlistCatlist = _Http + '/playlist/catlist';
//热门歌单分类
const _playlistHot = _Http + '/playlist/hot';
//歌单(网友精选碟)
const _topPlaylsit = _Http + '/top/playlist';
//获取精品歌单
const _topPlaylistHighquality = _Http + '/top/playlist/highquality';
// 获取歌单详情
const _playlistDetail = _Http + '/playlist/detail';
// 获取音乐 url
const _musicUrl = _Http + '/song/url';
// 搜索
const _secrch = _Http + '/search';
//热搜
const _secrchHot = _Http + '/search/hot';
//热搜列表(详细)
const _secrchHotDetail = _Http + '/search/hot/detail';
//搜索建议
const _searchSuggest = _Http + '/search/suggest';
//搜索多重匹配
const _searchMultimatch = _Http + '/search/multimatch';
//新建歌单
const _playlistCreate = _Http + '/playlist/create';
//收藏 / 取消收藏歌单
const _playlistSubscribe = _Http + '/playlist/subscribe';
//获取歌词
const _lyric = _Http + '/lyric';
//歌曲评论
const _commentMusic = _Http + '/comment/music';
//专辑评论
const _commentAlbum = _Http + '/comment/album';
//歌单评论
const _commentPlaylist = _Http + '/comment/playlist';
//mv 评论
const _commentMv = _Http + '/comment/mv';
//电台节目评论
const _commentDj = _Http + '/comment/dj';
//banner
const _banner = _Http + '/banner';
// 获取歌曲详情
const _songDetail = _Http + '/song/detail';
// 获取专辑内容
const _album = _Http + '/album';
// 获取歌手单曲
const _artists = _Http + '/artists';
//获取歌手 mv
const _artistsMv = _Http + '/artist/mv';
// 获取歌手专辑
const _artistAlbum = _Http + '/artist/album';
//获取歌手描述
const _artistDesc = _Http + '/artist/desc';
//获取相似歌手
const _simiArtist = _Http + '/simi/artist';
//获取相似歌单
const _simiPlaylist = _Http + '/simi/playlist';
//相似 mv
const _simiMv = _Http + '/simi/mv';
//获取相似音乐
const _simiSong = _Http + '/simi/song';
//获取最近 5 个听了这首歌的用户
const _simiUser = _Http + '/simi/user';
// 喜欢音乐
const _like = _Http + '/like';
//垃圾桶
const _fmTrash = _Http + '/fm_trash';
//新碟上架
const _topAlbum = _Http + '/top/album';
// 热门歌手
const _topArtists = _Http + '/top/artists';
//最新 mv
const _mvFirst = _Http + '/mv/first';
//推荐 mv
const _personalizedMv = _Http + '/personalized/mv';
// 推荐歌单
const _personalized = _Http + '/personalized';
//推荐新音乐
const _personalizedNewsong = _Http + '/personalized/newsong';
//推荐电台
const _presonalizedDjprogram = _Http + '/personalized/djprogram';
//推荐节目
const _programRecommend = _Http + '/program/recommend';
// 独家放送
const _personalizedPrivatecontent = _Http + '/personalized/privatecontent';
// mv 排行
const _topMv = _Http + 'top/mv';
// 获取 mv 数据
const _mv = _Http + '/mv';
// 播放 mv
const _mvUrl = _Http + '/mv/url';
//排行榜
const _topList = _Http + '/top/list';
// 歌手榜
const _toplistArtist = _Http + '/toplist/artist';

module.exports = {
  _Phone: _Phone,
  _Email: _Email,
  _login: _login,
  _userDetail: _userDetail,
  _userSubcount: _userSubcount,
  _userPlaylist: _userPlaylist,
  _playlistUpdate: _playlistUpdate,
  _sendText: _sendText,
  _sendPlaylist: _sendPlaylist,
  _userDj: _userDj,
  _userFollows: _userFollows,
  _userfolloweds: _userfolloweds,
  _userEvent: _userEvent,
  _userRecord: _userRecord,
  _playlistTracks: _playlistTracks,
  _commentLike: _commentLike,
  _recommendResource: _recommendResource,
  _recommendSongs: _recommendSongs,
  _personalFm: _personalFm,
  _dailySignin: _dailySignin,
  _userCloud: _userCloud,
  _djRecommend: _djRecommend,
  _djCatelist: _djCatelist,
  _djRecommendType: _djRecommendType,
  _djSub: _djSub,
  _djSublist: _djSublist,
  _djDetail: _djDetail,
  _djProgram: _djProgram,
  _event: _event,
  _artistList: _artistList,
  _artistSub: _artistSub,
  _artistUnsub: _artistUnsub,
  _artistSublist: _artistSublist,
  _playlistCatlist: _playlistCatlist,
  _playlistHot: _playlistHot,
  _topPlaylsit: _topPlaylsit,
  _topPlaylistHighquality: _topPlaylistHighquality,
  _playlistDetail: _playlistDetail,
  _musicUrl: _musicUrl,
  _secrch: _secrch,
  _secrchHot: _secrchHot,
  _searchSuggest: _searchSuggest,
  _searchMultimatch: _searchMultimatch,
  _playlistCreate: _playlistCreate,
  _playlistSubscribe: _playlistSubscribe,
  _lyric: _lyric,
  _commentMusic: _commentMusic,
  _commentAlbum: _commentAlbum,
  _commentPlaylist: _commentPlaylist,
  _commentMv: _commentMv,
  _commentDj: _commentDj,
  _banner: _banner,
  _songDetail: _songDetail,
  _album: _album,
  _artists: _artists,
  _artistsMv: _artistsMv,
  _artistAlbum: _artistAlbum,
  _artistDesc: _artistDesc,
  _simiArtist: _simiArtist,
  _simiPlaylist: _simiPlaylist,
  _simiMv: _simiMv,
  _simiSong: _simiSong,
  _simiUser: _simiUser,
  _like: _like,
  _fmTrash: _fmTrash,
  _topAlbum: _topAlbum,
  _topArtists: _topArtists,
  _mvFirst: _mvFirst,
  _personalizedMv: _personalizedMv,
  _personalized: _personalized,
  _personalizedNewsong: _personalizedNewsong,
  _presonalizedDjprogram: _presonalizedDjprogram,
  _programRecommend: _programRecommend,
  _personalizedPrivatecontent: _personalizedPrivatecontent,
  _topMv: _topMv,
  _mv: _mv,
  _mvUrl: _mvUrl,
  _topList: _topList,
  _toplistArtist: _toplistArtist,
  _secrchHotDetail: _secrchHotDetail
}