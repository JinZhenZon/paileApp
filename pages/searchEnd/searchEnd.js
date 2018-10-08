// pages/searchEnd/searchEnd.js
import {
  Utils
} from "../../utils/util.js"
Page({
  data: {
    utils: "",
    normalSearch: "",
    searchList: [],
    islast: false,
    index: 0,
  },
  onLoad(options) {
    wx.hideLoading();
    this.setData({
      searchList: [],
      normalSearch: options.search
    })
    this.setData({
      utils: new Utils()
    })
    this.getsearch(this.data.normalSearch);
    
  },
  onReachBottom() {
    if (!this.data.islast) {
      let index = this.data.index + 15;
      this.setData({
        index,
      })
      this.getsearch(this.data.normalSearch,index);
    }
  },
  /**
   * @function
   * @description 获取搜索列表
   * @param {string} 关键词
   * @param {number} 起始条数
   */
  getsearch(keyword, index = 0) {
    let _this = this
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getShowCargoesByName",
      data: {
        name: keyword,
        index,
        length: 15,
      },
      success(res) {
        let arr = _this.data.searchList;
        arr.push(...res.data.datas);
        if (res.data.datas.length < 15) {
          _this.setData({
            islast: true,
          })
        }
        _this.setData({
          searchList: arr,
        })
      }
    })
  }
})