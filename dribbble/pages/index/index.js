//index.js
//获取应用实例
const {request,api,filterHtml,addCommas} = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    shots:[],
    pageIndex:1,
    isShowLoading:true,
    actionSheetHidden:true,
    activeMenu:{
      sort:'Popular',
      list:'Shots',
      timeframe: 'New',
    },
    activMenuValue:{
      list:'',
      timeframe:'',
      sort:''
    },
    activeMenuText:'',
    menu:{
      list: ['Debuts','Team Shots','Playoffs','Rebounds','Animated GIFs','Shots with Attachments'],
      listValue:['debuts','teams','playoffs','rebounds','animated','attachments'],
      timeframe:['Now','This Past Month','This Past Year','All Time'],
      timeframeValue:['now','month','year','ever'],
      sort:['Recent','Most Viewed','Most Commented'],
      sortValue:['recent','views','comment'],
    },
    windowHeight:'',
  },
  onLoad: function () {
    this.getShots();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      },
    });
  },
  actionSheetChange:function(e){
    let datas = {};
    datas['actionSheetHidden'] = !this.data.actionSheetHidden;
    if(e.currentTarget.dataset.name){
      datas['activeMenuText'] = e.currentTarget.dataset.name;
    }
    this.setData(datas);
  },
  changeSort:function(e){
    var name = e.currentTarget.dataset.name;
    let index = e.currentTarget.dataset.index;
    let value = e.currentTarget.dataset.value;
    let obj={
      activeMenValue:this.data.activeMenuValue,
      activeMenu:this.data.activeMenu,
    };
    obj['activeSheetHidden'] = !this.data.actionSheetHidden;
    obj['activeMenu'][name] = value;
    obj['activeMenuValue'][name] = this.data.menu[name+'Value'][index];
    obj['shots'] = [];
    obj['pageIndex'] = 1;
    this.setData(obj);
    this.getShots(this.data.activeMenuValue)
  },
  getShots:function(params,cb){
    params = params || {};
    let pageIndex = params.page || 1;
    let self = this;
    self.setData({
      isShowLoading:true
    });
    let defaultParams = {
      page:pageIndex,
      per_page:30
    };
    Object.assign(defaultParams,this.data.activeMenuValue,params);
    request({
      url:api.getShots,
      data:defaultParams
    }).then((res)=>{
      let datas = [];
      for(d of res.data){
        d.description = filterHtml(d.description);
        d.views_count = addCommas(d.views_count);
        d.likes_count = addCommas(d.likes_count);
        datas.push(d);
      }
      self.setData({
        pageIndex:pageIndex,
        shots:self.data.shots.concat(datas),
        isShowLoading:false
      })
    })
  },
  loadMore:function(e){
    this.getShots({
      page:++this.data.pageIndex
    });
  },
  onPullDownRefresh:function(){
    this.setData({
      shots:[]
    });
    this.getShots();
  }
})
