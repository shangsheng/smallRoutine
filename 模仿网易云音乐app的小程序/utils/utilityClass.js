function utility () {
  this.PC = "pc";
  this.IOS = "ios";
  this.ANDROID = "android";

  /**
   * 平台 ios,andorid,pc
   */
  this.platform = '';
  /**
   * 基础库版本 已处理成数值7.0.0->700 容易比较 可以查map到微信什么版本
   */
  this.wxSDKVersion = '';
  let _this = this;
  this.init = () => {

    wx.getSystemInfo({
      success: function (res) {

        if (res.platform == "devtools") {
          _this.platform = _this.PC;
        } else if (res.platform == "ios") {
          _this.platform = _this.IOS;
        } else if (res.platform == "android") {
          _this.platform = _this.ANDROID;
        }

        let version = res.SDKVersion;
        version = version.replace(/\./g, "");
        _this.wxSDKVersion = version;
      }
    })
  }
}
let utilitys = new utility()
module.exports = utilitys