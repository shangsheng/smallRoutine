# smallRoutine
小程序
## 第一步:搭建项目
### 项目结构
		<pre>
			│  .gitattributes
			│  .gitignore
			│  app.js                # 小程序逻辑
			│  app.json              # 小程序公共设置（页面路径、窗口表现、设置网络超时时间、设置多tab）
			│  app.wxss              # 小程序公共样式表
			│  README.md             # 小程序项目说明
			│  
			├─image                  # 小程序图片资源
			|
			├─pages                  # 小程序文件
			│  ├─common     
			│  ├─detail
			│  ├─index        
			│  │    index.js      # 页面逻辑
			│  │    index.wxml    # 页面渲染层
			│  │    index.wxss    # 页面样式
			│  ├─login
			|  ├─logs
			│  └─topics
			│          
			└─utils                  # 小程序公用方法模块
			    api.js       
		    util.js    
		</pre>

### 开发环境

	下载地址：[开发环境](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
	
### 开发过程
##### 1.配置默认启动页面
		在app.json文件修改注册页面的顺序，把"pages/topics/topics"放在第一位，就会自动把topics.wxml显示默认启动页面
		<pre>
			{
				"pages":[
					"pages/topics/topics",
					"pages/detail/detail",
					"pages/login/login",
					"pages/index/index",
					"pages/logs/logs"
				]
			}
		</pre>
##### 2.配置tabBar 
		tabBar 是一个数组，只能配置最少2个、最多5个 tab,tab按数组的顺序排序。
		<pre>
			"tabBar":{
				"color":"#444",
				"selectedColor":"#80bd01",
				"backgroundColor":"#fff",
				"borderStyle":"white",
				"list":[{
					"pagePath":"pages/topics/topics",
					"text":"首页",
					"iconPath":"images/bar/CNode.png",
					"selectedIconPath":"images/bar/CNodeHL.png"
				},{
					"pagePath":	"pages/index/index",
					"text":"我的",
					"iconPath":"images/bar/ME.png",
					"selectedIconPath":"images/barMEHL.png"
				}]
			}
		</pre>
##### 3.window 设置
		具体看文档: [windwo设置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html?t=1475052056717)
##### 4.简单封装wx.request(OBJECT)
	```bash
		<pre>
			//get请求方法
			function fetchGet(url,callback){
				wx.request({
					url:url,
					header:{'Content-Type':'application/json'},
					success(res){
						callback(null,res.data)
					},
					fail(e){
						console.error(e);
						callback(e)
					}
				})
			}
			//post请求方式
			function fetchPost(url,data,callback){
				wx.request({
					method:'POST',
					url:url,
					data:data,
					success(res){
						callback(null,res.data)
					},
					fail(e){
						console.error(e)
						callback(e)
					}
				})
			}
		</pre>
		
		module.exports = {
			//method
			fetchGet:fetchGet,
			fetchPost:fetchPost
		}
	```
##### 5.滚动底部加载下一页
		使用了小程序自带的scroll-view组件
		```bash
		<!-- 列表list组件 -->
		 <template name="list">
	      <scroll-view class="scroll-posts-list" style="height:100%" scroll-y="true" bindscrolltolower="lower">
	        <view class="postslist">
	          <block wx:for="{{postsList}}">
	            <view class="posts-list">
	              <navigator url="/pages/detail/detail?id={{item.id}}">
	                <view class="posts-list-info" index="{{index}}">
	                    <image class="userimg" src="{{item.author.avatar_url}}" />
	                    <view class="item-box">
	                      <view class="userinfo">
	                        <text class="username">{{item.author.loginname}}</text>
	                        <text class="time">{{item.last_reply_at}}</text>
	                      </view>
	                      <view class="posts-title">
	                        <view class="posts-tag hot" wx:if="{{item.top === true}}">置顶</view>
	                        <view class="posts-tag" wx:if="{{item.good === true}}">精华</view>
	                        <text>{{item.title}}</text>
	                      </view>
	                    </view>
	                </view>
	                <view class="bar-info">
	                  <view class="bar-info-item">
	                    <image class="bar-info-item-icon" src="/images/icon/reply.png"></image>
	                    <view class="bar-info-item-number">{{item.reply_count}}</view>
	                  </view>
	                  <view class="bar-info-item">
	                    <image class="bar-info-item-icon" src="/images/icon/visit.png"></image>
	                    <view class="bar-info-item-number">{{item.visit_count}}</view>
	                  </view>
	
	                  <view class="bar-info-item2"  wx:if="{{item.tab === 'good'}}">
	                    <image class="bar-info-item-icon" src="/images/icon/type.png"></image>
	                    <view class="bar-info-item-number">精华</view>
	                  </view>
	                  <view class="bar-info-item2"  wx:if="{{item.tab === 'share'}}">
	                    <image class="bar-info-item-icon" src="/images/icon/type.png"></image>
	                    <view class="bar-info-item-number">分享</view>
	                  </view>
	                  <view class="bar-info-item2"  wx:if="{{item.tab === 'ask'}}">
	                    <image class="bar-info-item-icon" src="/images/icon/type.png"></image>
	                    <view class="bar-info-item-number">问答</view>
	                  </view>
	                  <view class="bar-info-item2"  wx:if="{{item.tab === 'job'}}">
	                    <image class="bar-info-item-icon" src="/images/icon/type.png"></image>
	                    <view class="bar-info-item-number">招聘</view>
	                  </view>
	                </view>
	            </navigator>
	            </view>
	          </block>
	        </view>
	      </scroll-view>

      <loading class="loading" hidden="{{hidden}}">
        <text class="loading-font">加载中...</text>
      </loading>
    </template>
  ```
  	公共部分头部和底部
  ```bash
  	<!-- topics.wxml -->
  	<import src="../common/header.wxml"/>
	<import src="../common/list.wxml"/>
	
	<view class="page topics">
	  <template is="header" data="{{ navList, activeIndex }}"/>
	  <template is="list" data="{{ postsList, hidden }}"/>
	</view>
  ```
  滚动区的最大的父级层要设置height: 100%; 不然无法检测滚动事件
  ```bash
  	//滑动底部加载
  	lower:function(){
  		var that = this;
  		that.setData({
  			page:that.data.page+1
  		});
  		if(that.data.tab !=='all'){
  			this.getData({tab:that.data.tab,page:that.data.page});
  		}else{
  			this.getData({page:that.data.page});
  		}
  	}
  ```
  用法
  ```bash
  	<scroll-view class="scroll-posts-list" style="height:100%" scroll-y="true" bindscrolltolower="lower"></scroll-view>
  ```
##### 文本解析模板
	  在detail.wxml中返回的是htmln内容，所以需要使用文本解析模板
	  ```bash
	  	<!--pages/detail/detail.wxml-->
		<!-- 富文本解析模板 -->
		<import src="../../wxParse/wxParse.wxml"/>
		<!-- 评论模板 -->
		<import src="../../wxParseCriticism/wxParse.wxml"/>
		 <view class='detail1'>
		  <view class='detail-content'>
		    <view class='content-top clearfix'>
		      <view class='pull-left'>
		        <view class='detailImg'>
		          <image mode="scaleToFill" src='{{detail.author.avatar_url}}'></image>
		        </view>
		      </view>
		      <view class='pull-left'>
		        <view class='detailMilden'>
		          <view class='detail-name'>
		            <text>{{detail.author.loginname}}</text>
		            <view class="detail-type-item">
		              <view class="detail-type-item-font" wx:if="{{detail.tab === 'good'}}">#精华#</view>
		            </view>
		             <view class="detail-type-item"  wx:if="{{detail.tab === 'share'}}">
		              <view class="detail-type-item-font">#分享#</view>
		            </view>
		            <view class="detail-type-item"  wx:if="{{detail.tab === 'ask'}}">
		              <view class="detail-type-item-font">#问答#</view>
		            </view>
		            <view class="detail-type-item"  wx:if="{{detail.tab === 'job'}}">
		              <view class="detail-type-item-font">#招聘#</view>
		            </view> 
		          </view>
		          <view class='detail-post-time'>楼主发表于{{ detail.create_at }}</view>
		        </view>
		      </view>
		      <view class='pull-right'>
		        <view class='detail-collect-item' id='detail.id' catchtap="collect" wx:if="{{detail.is_collect == false}}">收藏</view>
		        <view class='detail-collect-item' id='detail.id' catchtap="collect" wx:if="{{detail.is_collect == true}}">取消收藏</view> 
		      </view>
		    </view>
		    <view class='detail-Bottom'>
		      <view class="detail-post-title">
		        <view class="detail-posts-tag hot" wx:if="{{detail.top === true}}">置顶</view>
		         <view class="detail-posts-tag" wx:if="{{detail.good === true}}">精华</view> 
		        {{detail.title}}
		      </view>
		      <view class='detail-post-content'>
		      <!-- {{detail.content}} -->
		      <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
		      </view>
		      <!-- 评论 -->
		      <view class='detail-post-criticism'>
		        <view class='detail-post-criticism-top'>评论</view>
		        <block wx:for="{{ detail.replies }}" wx:if="{{detail.replies.length > 0}}" wx:key="">
		        <view class='content-top clearfix' index="{{index}}" id="{{item.id}}">
		          <view class='pull-left'>
		            <view class='detailImg'>
		              <image mode="scaleToFill" src="{{ item.author.avatar_url }}"></image>
		            </view>
		          </view>
		          <view class='pull-left' style='width:70%'>
		            <view class='detailMilden'>
		              <view class='detail-name'>
		                <text>{{ item.author.loginname }}</text>
		              </view>
		              <view class='detail-post-time'>{{index + 2}}楼 发表于{{ item.create_at }}</view>
		              <view class='detail-criticism-content'>
		              <!-- {{ item.content }} -->
		                <template is="wxParseCriticism" data="{{wxParseData:item.transData.criticism.nodes}}"/>  
		              </view>
		            </view>
		          </view>
		          <view class='pull-right'>
		            <view class='detail-criticism-item' id="{{item.id}}" data-index="{{index}}" catchtap="reply">
		              <image src='../../images/icon/zan.png'></image>
		              <text class="detail-post-zan-num" wx:if="{{item.zanNum > 0}}">{{item.zanNum}}</text>
		            </view>
		            <!-- <view class='detail-criticism-item' id="{{item.id}}" data-index="{{index}}" catchtap="reply">
		              <image src='../../images/icon/zanhl.png'></image>
		            </view>   -->
		          </view>
		        </view>
		        </block>
		        <block wx:if="{{detail.replies.length <= 0}}">
		          <view class="detail-post-comment-null">
		            <image class="imgnull" mode="scaleToFill" src="/images/icon/null.png"></image>
		            <text class="textnull">暂无收录评论 </text>
		          </view>
		        </block>
		      </view>
		    </view>
		  </view>
		</view>
		  <modal title="消息" confirm-text="确认" cancel-text="关闭" hidden="{{modalHidden}}" bindconfirm="confirmChange" bindcancel="cancelChange">
		    您还没未登录conde，是否前往认证登录？
		  </modal>
		<loading class="loading" hidden="{{hidden}}">
		  <text class="loading-font">加载中...</text>
		</loading>
	  ```
	  文件夹wxParse是文本解析模板

### 特别感谢
	感谢 coolfish 的项目案例
	
	coolfish的github: https://github.com/coolfishstudio
