// pages/goodShow/goodShow.js
import { Utils } from "../../utils/util.js";
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    showScroll: false,
    showLoading: true,
    pugHidden: true,
    animationData: {},
    animationTag: {},
    maskHidden: true,
    isStopBodyScroll: true,
    clickArr: [],
    pugtagArr: [],
    hiddenTag: false,
    buytagHid: true,
    isIphoneX: false,
    cargoCode: 0,
    goodInfo: {},
    utils: "",
    actualPrice: 0,
    actualImgUrl: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // cargoCode: options.cargoCode,
      cargoCode:150,

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      showLoading: false
    })
    wx.hideLoading();
    // 初始化方法
    this.setData({
      utils: new Utils()
    })
    // iphonex 兼容
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    this.getGood();
  },
  /**
   * @description 获取商品基本信息
   */
  getGood() {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getCargoById",
      data: {
        cargoId: _this.data.cargoCode,
        type: 0,
      },
      success(res) {
        if(res.data.code == 0){
          _this.setData({
            goodInfo: res.data.datas
          })
        }else{
          wx.showToast({
            title: '加载出现问题',
            image:"/image/error.png",
            duration:1500,
            complete(){
              navigateBack({
                delta:1,
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
  /**
   * 监听返回顶部
   */
  Fscroll: function (e) {
    if (e.detail.scrollTop > 1000) {
      this.setData({
        showScroll: true,
      })
    } else {
      this.setData({
        showScroll: false,
      })
    }
  },
  // 返回顶部
  gotop() {
    this.setData({
      scrollTop: 0
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    let shareInner = {
      title: "商品详情页面",
      path: "../goodShow/goodShow?cargoCode=" + this.data.cargoCode,
      imageUrl: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
    }
    return shareInner;
  },
  /** 
   * @description 展示规格选择 
   */
  showPug() {
    this.setData({
      pugHidden: false,
      maskHidden: false,
      isStopBodyScroll: false,
      actualPrice: this.data.goodInfo.price,
      actualImgUrl: this.data.goodInfo.cover_url,
    })
    let list = this.data.goodInfo.cargoDescList;
    if (list.length > 0) {
      let arr = [];
      list.map(item => {
        arr.push(item.title);
        this.setData({
          pugtagArr: arr,
        })
      })
    } else {
      this.setData({
        hiddenTag: true
      })
    }
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 150,
      timingFunction: "ease",
      delay: 0
    })
    animation.translateY(-1000 / 750 * wx.getSystemInfoSync().windowWidth).step()
    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * @description 隐藏选择规格
   */
  hiddenPug() {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 150,
      timingFunction: "ease",
      delay: 0
    })
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(() => {
      this.setData({
        pugHidden: true,
        maskHidden: true,
        isStopBodyScroll: true,
        clickArr: [],
        pugTagArr: [],
        hiddenTag: false,
      })
    }, 150)
  },
  /**
   * @description 选择规格时候的点击规格的方法
   * @param {object} event
   */
  click(event) {
    let group = event.currentTarget.dataset.group;
    let index = event.currentTarget.dataset.index;
    var groupC = "clickArr[" + group + "]";
    let obj = {
      key: index,
      value: this.data.goodInfo.cargoDescList[group].descList[index].desc,
      title: this.data.goodInfo.cargoDescList[group].title
    }
    // 设置clickarr
    this.setData({
      [groupC]: obj,
    })
    // 调用请求
    this.clickCallback()
  },
  /**
   * @description click的回调
   * @callback 通过判断clickarr来判断规则是否选择完全，并且追加到clickarr中
   */
  clickCallback() {
    // 组合请求价格图片的data
    let _this = this;
    let data = {};
    data["cargoId"] = this.data.cargoCode;
    data["type"] = 0;
    this.data.clickArr.map((item, index) => {
      data["param" + (index + 1)] = item.value
    })
    /**
     * @description 请求选择规则时候的图片和文字
     */
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getCargoDescByParams",
      data: {
        ...data
      },
      success(res) {
        _this.setData({
          actualPrice: res.data.datas.price,
          actualImgUrl: res.data.datas.imgUrl,
        })
      },
      fail(error) {
        console.log(error);
      }
    })
    if (this.data.clickArr.length == this.data.goodInfo.cargoDescList.length) {
      for (let i = 0; i < this.data.clickArr.length; i++) {
        if (this.data.clickArr[i] == undefined) {
          this.setData({
            hiddenTag: false,
          })
          break;
        } else {
          this.setData({
            hiddenTag: true,
          })
        }
      }
    } else {
      this.setData({
        hiddenTag: false,
      })
    }
  },
  gobuy() {

    // 判断规格
    let option = "";
    if (this.data.hiddenTag) {
      for (let i = 0; i < this.data.clickArr.length; i++) {
        option += this.data.clickArr[i].title + ":" + this.data.clickArr[i].value + ";";
      }
      
      wx.navigateTo({
        url: `/pages/sign/sign?ordertype=1&&cargoDesc=${option}&&cargoCode=${this.data.cargoCode}&&shopCode=${this.data.goodInfo.shop_id}&&pictory=${this.data.actualImgUrl}&&price=${this.data.actualPrice}`
      })
    } else {
      this.setData({
        buytagHid: false,
      })
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.opacity(1).step();
      this.setData({
        animationTag: animation.export()
      })
      setTimeout(() => {
        animation.opacity(0).step();
        this.setData({
          animationTag: animation.export(),
          buytagHid: true,
        })
      }, 1500);
    }
  },
  callShop() {
    wx.makePhoneCall({
      phoneNumber: this.data.goodInfo.shopPhone,
    })
  }
})