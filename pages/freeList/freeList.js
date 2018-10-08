import { Utils } from "../../utils/util.js"
import regeneratorRuntime from '../../utils/runtime.js'
Page({
  data: {
    utils: "",
    list: [],
    islast: false,
    pageNumber: 1,
    firstRequested: false,
    modelConfig: {},
    shareInfo: {
      title: "自定义标题",
      desc: "自定义描述",
      path: "./"
    }
  },
  onLoad() {
    this.setData({
      utils: new Utils()
    })
    this.getList();
  },
  onReady() {
    wx.hideLoading();
  },
  onReachBottom() {
    if (!this.data.islast) {
      let num = this.data.pageNumber + 1;
      this.setData({
        pageNumber: num,
      })
      this.getList(num);
    }
  },
  onShareAppMessage(e){
    let good = e.target.dataset.good;
    if(e.from == "button"){
      let price = ((good.cargoPrice - good.discountPrice) * (good.quotaValue / 100) / 100 * 0.7).toFixed(2);
      return {
        title:`推荐给你一个商品,${good.title}`,
        desc:`我送你一张价值${price}的优惠券`,
        path:"/",
        imageUrl:good.icon,
      }
    }else if (e.from == "menu"){
      return {
        title:"向你推送一个很nice的小程序",
        desc :"拍乐网想你所想，急你所需",
        path:"/"
      }
    }
  },
  /**
   * @description 获取分享赚钱的列表
   * @param { number } 起始页码
   * @param { number } 每页条数
   */
  getList(pageNumber = 1, length = 15) {
    let _this = this;
    this.data.utils.ajax({
      url: "/marketing/commission/cargo/query/page/available",
      data: {
        pageNumber, length
      },
      success(res) {
        if (pageNumber >= res.data.data.totalPage) {
          _this.setData({
            islast: true,
          })
        }
        let arr = _this.data.list;
        /**
         * @description 获取列表的sharecode
         */
        let dataList = res.data.data.dataList.map((item) => {
          _this.getshareCode(item.cargoCode).then(code =>{
            item["shareCode"] = code;
          })
          return item;
        })
        arr.push(...dataList);
        _this.setData({
          list: arr,
        })
        if (!_this.data.firstRequested) {
          _this.setData({
            firstRequested: true,
          })
        }
      }
    })
  },
  getshareCode(cargoCode) {
    let sharecode = "";
    let _this = this;
    let applyData = {
      userCode: 101,
      cargoCode: cargoCode,
      shareDestination: 0
    };
    return new Promise((resolve, reject) => {
      this.data.utils.ajax({
        url: "marketing/commission/share/apply",
        method: "post",
        data: applyData,
        success(result) {
          let sharecode = result.data.data.shareCode;
          resolve(sharecode);
        },
        fail(error) {
          let sharecode = false;
          reject(sharecode)
        }
      })
    })
  },
})