// pages/components/pingjiaPage/pingjiaPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:"array",
      value : [] 
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showimg(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.urllist,
      })
    }
  }
})
