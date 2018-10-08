/**
 * 
 * @description 页面公共顶部
 * @param {string} 页面标题
 * @todo 兼容iphonex的自定义公共头部
 */

let app = getApp();
Component({
  properties: {
    title: {
      type: "string",
      value: "拍乐网",
    }
  },
  data: {
    isIphoneX: false,
  },
  ready: function () {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },
})