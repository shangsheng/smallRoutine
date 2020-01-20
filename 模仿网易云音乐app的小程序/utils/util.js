function formatTime (date,type){
  type = type || 1;
  //type 1,完成输出年月日时分秒，2对比当前时间输出日期，或时分
  var d = new Date(date);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  if(type === 1){
    return [year,month,day].map(formatNumber).join('.')+ '' + [hour,minute,second].map(formatNumber).join(':');
  }else if(type === 2){
    var current = new Date();
    var curtimes = current.getTime();
    if((curtimes - date)<24*3600000){
      if(curtimes-date<3600000){
        return (new Date(curtimes-date).getSeconds()+"分钟前");
      }else{
        return [hour,minute].map(formatNumber).join(':');
      }
    } else if ((curtimes - date) < 48 * 3600000) {
      return "昨天：" + [hour, minute].map(formatNumber).join(":");
    }else if(year != current.getFullYear()){
      return year + "年" + month + "月" + day + "日"
    }else{
      return month + "月" + day + "日"
    }
  }else{
    return [year, month, day].map(formatNumber).join('.');
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatduration = duration =>{
  duration = new Date(duration);
  let mint = duration.getMinutes();
  let sec = duration.getSeconds();
  return formatNumber(mint) + ":" + formatNumber(sec);
}


function parse_lrc(lrc_content) {
  let now_lrc = [];
  let lrc_row = lrc_content.split("\n");
  let scroll = true;
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') == -1) && lrc_row[i]) {
      now_lrc.push({ lrc: lrc_row[i] });
    } else if (lrc_row[i] != "") {
      var tmp = lrc_row[i].split("]");
      for (let j in tmp) {
        scroll = false
        let tmp2 = tmp[j].substr(1, 8);
        tmp2 = tmp2.split(":");
        let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
        if (lrc_sec && (lrc_sec > 0)) {
          let count = tmp.length;
          let lrc = trimStr(tmp[count - 1]);
          if (lrc != "") {
            now_lrc.push({ lrc_sec: lrc_sec, lrc: lrc });
          }

        }
      }
    }
  }
  if (!scroll) {
    now_lrc.sort(function (a, b) {
      return a.lrc_sec - b.lrc_sec;
    });
  }
  return {
    now_lrc: now_lrc,
    scroll: scroll
  };
}
function trimStr(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); }

//音乐播放监听
function playAlrc(that, app) {
  if (app.globalData.globalStop) {
    that.setData({
      playtime: '00:00',
      duration: '00:00',
      percent: 0.1,
      playing: false,
      downloadPercent: 0
    });
    return;
  }
  if (that.data.music.id != app.globalData.curplay.id) {
    that.setData({
      music: app.globalData.curplay,
      lrc: [],
      showlrc: false,
      lrcindex: 0,
      duration: formatduration(app.globalData.curplay.duration)
    });
    wx.setNavigationBarTitle({ title: app.globalData.curplay.name + "-" + app.globalData.curplay.artists[0].name });
    loadrec(0, 0, that.data.music.commentThreadId, function (res) {
      that.setData({
        commentscount: res.total
      })
    })
  }
  wx.getBackgroundAudioPlayerState({
    complete: function (res) {
      var time = 0, lrcindex = that.data.lrcindex, playing = false, playtime = 0, downloadPercent = 0;
      if (res.status != 2) {
        time = res.currentPosition / res.duration * 100;
        playtime = res.currentPosition;
        downloadPercent = res.downloadPercent
        if (that.data.showlrc && !that.data.lrc.scroll) {
          for (let i in that.data.lrc.lrc) {
            var se = that.data.lrc.lrc[i];
            if (se.lrc_sec <= res.currentPosition) {
              lrcindex = i
            }
          }
        };

      } if (res.status == 1) {
        playing = true;
      }
      that.setData({
        playtime: formatduration(playtime * 1000),
        percent: time,
        playing: playing,
        lrcindex: lrcindex,
        downloadPercent: downloadPercent
      })
    }
  });
};
function loadrec(bsurl,data, cb) {
  wx.request({
    url: bsurl,
    data:data,
    header: { 'Content-Type': 'application/json' },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      var data = res.data;
      for (let i in data.hotComments) {
        data.hotComments[i].time = formatTime(data.hotComments[i].time, 2);
      }
      for (let i in data.comments) {
        data.comments[i].time = formatTime(data.comments[i].time, 2);
      };
      cb && cb(data)
    }
  })
}
//get 请求方法
function fetchGet(url, callback) {
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/json' },
    xhrFields: { withCredentials: true },
    success(res) {
      callback(null, res.data)
    },
    fail(e) {
      console.error(e)
      callback(e)
    }
  })
}
function loadlrc(that) {
  if (that.data.showlrc) {
    that.setData({
      showlrc: false
    })
    return;
  } else {
    that.setData({
      showlrc: true
    })
  }
  if (!that.data.lrc.code) {
    var lrcid = that.data.music.id;
    var that = that;
    wx.request({
      url: bsurl + 'lrc?id=' + lrcid,
      success: function (res) {
        var lrc = parse_lrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '');
        res.data.lrc = lrc.now_lrc;
        res.data.scroll = lrc.scroll ? 1 : 0
        that.setData({
          lrc: res.data
        });
      }
    })
  }
}
//万和亿和千的操作
function wyq (num){
  if(num<9999){
    return num;
  }else if(num<99999999){
    num =( Math.floor(num / 10000))+ "万";
    return num;
  }else if(num>100000000){
    num =( Math.floor(num / 100000000))+ "亿";
    return num;
  }
}
/**参数说明： 
   
   * 根据长度截取先使用字符串，超长部分追加… 
   
   * str 对象字符串 
   
   * len 目标字节长度 
   
   * 返回值： 处理结果字符串 
   
   */
function cutString (str, len) {

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

}
//替换搜索内容
const searchValue = function (value, mates) {
  if (!value) return ''
  value = value.toString()

  var str = '<span class="songs-li-color">' + mates + '</span>'

  return value.replace(new RegExp(mates, 'gm'), str)
}
//时间格式
const datePublish = (format, timestamp) => {

  var a, jsdate = ((timestamp) ? new Date(timestamp) : new Date());
  var pad = function (n, c) {
    if ((n = n + "").length < c) {
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
  var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var f = {
    // Day 
    d: function () { return pad(f.j(), 2) },
    D: function () { return f.l().substr(0, 3) },
    j: function () { return jsdate.getDate() },
    l: function () { return txt_weekdays[f.w()] },
    N: function () { return f.w() + 1 },
    S: function () { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
    w: function () { return jsdate.getDay() },
    z: function () { return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0 },

    // Week 
    W: function () {
      var a = f.z(), b = 364 + f.L() - a;
      var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
      if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
        return 1;
      } else {
        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
          nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
          return date("W", Math.round(nd2.getTime() / 1000));
        } else {
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
        }
      }
    },

    // Month 
    F: function () { return txt_months[f.n()] },
    m: function () { return pad(f.n(), 2) },
    M: function () { return f.F().substr(0, 3) },
    n: function () { return jsdate.getMonth() + 1 },
    t: function () {
      var n;
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L();
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
          return 31;
        } else {
          return 30;
        }
      }
    },

    // Year 
    L: function () { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
    //o not supported yet 
    Y: function () { return jsdate.getFullYear() },
    y: function () { return (jsdate.getFullYear() + "").slice(2) },

    // Time 
    a: function () { return jsdate.getHours() > 11 ? "pm" : "am" },
    A: function () { return f.a().toUpperCase() },
    B: function () {
      // peter paul koch: 
      var off = (jsdate.getTimezoneOffset() + 60) * 60;
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
      var beat = Math.floor(theSeconds / 86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if ((String(beat)).length == 1) beat = "00" + beat;
      if ((String(beat)).length == 2) beat = "0" + beat;
      return beat;
    },
    g: function () { return jsdate.getHours() % 12 || 12 },
    G: function () { return jsdate.getHours() },
    h: function () { return pad(f.g(), 2) },
    H: function () { return pad(jsdate.getHours(), 2) },
    i: function () { return pad(jsdate.getMinutes(), 2) },
    s: function () { return pad(jsdate.getSeconds(), 2) },
    //u not supported yet 

    // Timezone 
    //e not supported yet 
    //I not supported yet 
    O: function () {
      var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
      return t;
    },
    P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) },
    //T not supported yet 
    //Z not supported yet 

    // Full Date/Time 
    c: function () { return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P() },
    //r not supported yet 
    U: function () { return Math.round(jsdate.getTime() / 1000) }
  };
  console.log(format)
  return format.replace(/([a-zA-Z])/g, function (t, s) {
    
    let ret;
    if (t != s) {
      // escaped 
      ret = s;
    } else if (f[s]) {
      // a date function exists 
      ret = f[s]();
    } else {
      // nothing special 
      ret = s;
    }
    return ret;
  });
}
module.exports = {
  formatTime: formatTime,
  formatduration: formatduration,
  parse_lrc: parse_lrc,
  playAlrc: playAlrc,
  loadlrc: loadlrc,
  loadrec: loadrec,
  fetchGet: fetchGet,
  wyq: wyq,
  cutString: cutString,
  $searchValue:searchValue,
  datePublish: datePublish
}
