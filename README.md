# dribbble
小程序
由于证书问题报401错无法访问到dribble服务器，无法显示数据。但是里面的小程序搭建步骤是正确的，证书问题后续会解决，如有解决的方式可以留言。
###步骤
1.项目结构
```bash
  <pre>
      │  app.js                # 小程序逻辑
      │  app.json              # 小程序公共设置（页面路径、窗口表现、设置网络超时时间、设置多tab）
      │  app.wxss              # 小程序公共样式表
      │  README.md             # 小程序项目说明
      |
      ├─components             # 公共页面逻辑
      |   ├─comment.wxml       # 列表详情公共部分
      |   ├─designer.wxml      # 设计师的介绍公共部分
      |   ├─loading.wxml       # 加载中页面
      |   ├─shot.wxml          # 列表页面
      |
      ├─image                  # 小程序图片资源
      |
      ├─pages                  # 小程序文件
      │  ├─designers     
      │  ├─index        
      │  │    index.js      # 页面逻辑
      │  │    index.wxml    # 页面渲染层
      │  │    index.wxss    # 页面样式
      |  ├─logs
      |  ├─me
      |  ├─shots
      │  └─teams
      │          
      └─utils                  # 小程序公用方法模块
	  api.js               # 路径封装
          dateFormat.js        # 时间封装
          util.js              # git请求封装
  </pre>
  ```
 2.配置启动页面
 ```bash
    "pages":[
      "pages/index/index",
      "pages/logs/logs",
      "pages/shots/shots",
      "pages/designers/designers",
      "pages/teams/teams",
      "pages/me/index"
    ]
  ```
  3.配置tabBar
  ```bash
    "tabBar": {
      "color": "#fff",
      "selectedColor": "#fff",
      "backgroundColor": "#333",
      "borderStyle": "#333",
      "list": [{
        "pagePath": "pages/index/index",
        "text": "Popular",
        "iconPath": "./images/tabbar-icon-popular-normal.png",
        "selectedIconPath": "./images/tabbar-icon-popular-active.png"
      },{
        "pagePath":"pages/designers/designers",
        "text":"Designers",
        "iconPath":"./images/tabbar-icon-designers-normal.png",
        "selectedIconPath":"./images/tabbar-icon-designers-active.png"
      },{
        "pagePath":"pages/teams/teams",
        "text":"Teams",
        "iconPath":"./images/tabbar-icon-teams-normal.png",
        "selectedIconPath":"./images/tabbar-icon-teams-active.png"
      },{
        "pagePath":"pages/me/index",
        "text":"Me",
        "iconPath":"./images/tabbar-icon-me-normal.png",
        "selectedIconPath":"./images/tabbar-icon-me-active.png"
      }]
    }
   ```
 4.git请求封装
 ```bash
     function request(params){
      return new Promise (function(resolve,reject){
        if(!params){
          reject(new Error(params));
        }
        params.data = params.data || {};
        params.data['access_token'] = TOKEN;
        wx.request({
          url:params.url,
          method:params.method || "GET",
          data: params.data,
          success: function(res){
            if(res.statusCode === 200 || res.statusCode === 201){
                resolve(res);
            }else{
              console.log('[error]:',res);
              reject(res);
            }
          },
          fail:function(res){
            reject(res);
          }
        })
      })
    }
  ```
