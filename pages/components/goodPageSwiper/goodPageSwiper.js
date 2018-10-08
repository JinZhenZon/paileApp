/**
 * @public
 * @author jinzhenzong
 * @description 商品页面轮播图
 * @param { array } 轮播列表
 * @todo 支持传入轮播列表生成商品页面的轮播图，轮播图支持点击预览
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl: {
      type: "array",
      value: [],
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    slideShow: function (event) {
      wx.previewImage({
        urls: event.currentTarget.dataset["list"],
      })
    }
  }
})
