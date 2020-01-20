const fun = function (url, method, data, header){
  data = data || {}
  header = header || {}
  let sectionId = wx.getStorageSync("UserSessionId");
  if (sectionId){
	//此处处理sessionId存在
  }
 
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    
    wx.request({
      url:  url,
      header: header,
      data: data,
      method: method,
      success: resolve,
      fail: reject,
      complete: function () {
        
      }
		});
	});
return promise;
}
module.exports = {
  "get": function (url, data, header) {
    return fun(url, "GET", data, header);
  },
  "post": function (url, data, header) {
    return fun(url, "POST", data, header);
  },
  upload: function (url, name, filePath) {
    return upload(url, name, filePath);
  }
};