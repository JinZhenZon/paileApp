// pages/sign/sign.js
import { Utils } from "../../utils/util.js";
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utils: "",
    showLoading: true,
    addressInfo: {},
    addressNull: false,
    shop_info: {},
    price: "",
    checkimgUrl: "",
    cargoDesc: "",
    goodTitle: "",
    num: 1,
    ps_arr: ['配送', '自提'],
    ps_index: 0,
    liuyan: "",
    isIphoneX: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      utils: new Utils(),
      checkimgUrl: options.pictory,
      price: options.price,
      cargoDesc: options.cargoDesc
    })
    this.getorderInfo(options.cargoCode);
    this.getshopInfo(options.shopCode);
    this.getAddress(105)
  },
  onShow() {
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    this.setData({
      showLoading: false
    })
    wx.hideLoading();
  },
  getorderInfo(id) {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getCargoById",
      data: {
        cargoId: id,
        type: 0,
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            goodTitle: res.data.datas.name
          })
        } else {
          wx.showToast({
            title: '加载出现问题',
            image: "/image/error.png",
            duration: 1500,
            complete() {
              navigateBack({
                delta: 1,
              })
            }
          })
        }

      },
      fail(error) {
        console.log(error);
      }
    })
  },
  getshopInfo(id) {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/shopsHandler/getShopsById",
      data: {
        shopId: id,
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          _this.setData({
            shop_info: res.data.datas
          })
        }
      }
    })
  },
  getAddress(id) {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/userHandler/getAllDeliverAddress",
      data: {
        userCode: id
      },
      success(res) {
        if (parseInt(res.data.code) != 0 || res.data.datas.length == 0) {
          _this.setData({
            addressNull: true,
          })
          return false
        }

        _this.setData({
          addressInfo: res.data.datas[0]
        })
      }
    })
  },
  // 减少件数
  subtract() {
    let num = this.data.num - 1;
    this.setData({
      num: num
    })
  },
  // 增加件数
  addnum() {
    let num = this.data.num + 1;
    this.setData({
      num: num
    })
  },
  /**
   * 
   * @param {number} 配送方式代码  
   */
  bindPickerChange(e) {
    this.setData({
      ps_index: e.detail.value
    })
  },
  /**
   * @description 前往地址页面
   */
  goaddressPage() {
    wx.navigateTo({
      url: "../addressPage/addressPage"
    })
  }

})