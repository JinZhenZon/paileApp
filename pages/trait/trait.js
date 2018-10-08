// pages/groupTrait/groupTrait.js
import { Utils } from "../../utils/util.js";
Page({
  data: {
    currentNum: 0,
    normalArr: [],
    priceArr: [],
    goodArr: [],
    utils: "",
    normalCurrent: 0,
    priceCurrent: 0,
    goodCurrent: 0,
    isLastNormal: false,
    isLastprice: false,
    isLastGoodArr: false,
  },
  onLoad() {
    this.setData({
      utils: new Utils()
    })
  },
  onReady: function () {
    wx.hideLoading();
    this.updataNormal()
  },
  onReachBottom: function () {
    switch (parseInt(this.data.currentNum)) {
      case 0: {
        let num = this.data.normalCurrent + 15;
        this.setData({
          normalCurrent: num,
        })
        this.updataNormal();
        break;
      }
      case 1: {
        let num = this.data.priceCurrent + 15;
        this.setData({
          priceCurrent: num,
        })
        this.updataPrice();
        break;
      }

      case 2: {
        let num = this.data.goodCurrent + 15;
        this.setData({
          goodCurrent: num,
        })
        this.updataGood();
        break;
      }
    }
  },
  onShareAppMessage: function () {
    let shareInfo = {
      title: "拍乐网",
      path: "/",
      imageUrl: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM5HzZicFK4D0SXCmhDK0gEMx58G48PceJicUG6UFiamKfvVA/64"
    };
    return shareInfo;
  },
  taggleMenu(e) {
    let num = e.currentTarget.dataset.num;
    this.setData({
      currentNum: parseInt(e.currentTarget.dataset.num),
    })
    // 默认
    switch (parseInt(num)) {
      case 0:
        if (this.data.normalArr.length == 0) {
          this.updataNormal(); break;
        }
        break;
      case 1:
        if (this.data.priceArr.length == 0) {
          this.updataPrice();
          break;
        }
        break;
      case 2:
        if (this.data.goodArr.length == 0) {
          this.updataGood();
          break;
        }
        break;
    }
  },
  /**
   * @description 获取不同排序状态下的列表(从之前传入要赋值变量和起始条数。修改为三个方法,理由：更清晰的表达每个方法的作用，方便维护/扩展)
   */
  updataNormal() {
    if (this.data.isLastNormal) {
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/homePageManage/getAllQuality",
      data: {
        startIndex: _this.data.normalCurrent,
        length: 15,
        orderType: 0,
        descType: 1
      },
      success(res) {
        let goodList = _this.data.normalArr;
        goodList.push(...res.data.datas.datas)
        _this.setData({
          normalArr: goodList,
        })
        if (res.data.datas.datas.length != 15) {
          _this.setData({
            isLastNormal: true,
          })
        }
      }
    })
  },
  updataPrice() {
    if (this.data.isLastprice) {
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/homePageManage/getAllQuality",
      data: {
        startIndex: _this.data.priceCurrent,
        length: 15,
        orderType: 1,
        descType: 1
      },
      success(res) {
        let goodList = _this.data.priceArr;
        goodList.push(...res.data.datas.datas)
        _this.setData({
          priceArr: goodList,
        })
        if (res.data.datas.datas.length != 15) {
          _this.setData({
            isLastprice: true,
          })
        }
      }
    })
  },
  updataGood(arr) {
    if (this.data.isLastGoodArr) {
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/homePageManage/getAllQuality",
      data: {
        startIndex: _this.data.goodCurrent,
        length: 15,
        orderType: 2,
        descType: 1
      },
      success(res) {
        let goodList = _this.data.goodArr;
        goodList.push(...res.data.datas.datas)
        _this.setData({
          goodArr: goodList,
        })
        if (res.data.datas.datas.length != 15) {
          _this.setData({
            isLastGoodArr: true,
          })
        }
      }
    })
  }
})