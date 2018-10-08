// pages/shop/shop.js
import { Utils } from "../../utils/util.js";
Page({
  data: {
    utils: "",
    bindnav: false,
    shopInfo: {},
    currentnum: 0,
    single: [],
    singleListStart: 0,
    group: [],
    groupListStart: 0,
    shopId: 1,
    islastSingle: false,
    islastGroup: false,
  },
  onLoad: function (options) {
    this.setData({
      utils: new Utils()
    })
    wx.hideLoading()
    // this.setData({
    //   shopId: options.shopId
    // })
  },
  onReady: function () {
    this.getshopInfo();
    this.getGoodList();
  },
  onReachBottom: function () {
    // 转换成整形 防止字符串导致失败
    switch (parseInt(this.data.currentnum)) {
      case 0: this.getGoodList(); 
      case 1: this.getGroupList();
    }
  },
  /**
   * @description 滚动距离到148 绑定子菜单
   */
  onPageScroll(e) {
    if (e.scrollTop > 148) {
      this.setData({
        bindnav: true
      })
    } else {
      this.setData({
        bindnav: false
      })
    }
  },
  onShareAppMessage: function () {

  },
  /**
   * @function
   * @description 切换商品列表的事件
   * @param { string | number } num
   */
  togglenav(e) {
    this.setData({
      currentnum: parseInt(e.currentTarget.dataset.num)
    })
    if(e.currentTarget.dataset.num == 1 && this.data.group.length == 0){
      this.getGroupList()
    }
  },
  /**
   * @function
   * @description 获取店铺信息
   */
  getshopInfo() {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/shopsHandler/getShopsById",
      data: {
        shopId: this.data.shopId,
      },
      success(res) {
        if (res.data.code == 0) {
          _this.setData({
            shopInfo: res.data.datas
          })
        } else {
          wx.showToast({
            title: '获取店铺失败',
            icon: 'none',
            image: '/image/error.png',
            duration: 1500,
            mask: false,
            complete: () => {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        }
      }
    })
  },
  /**
   * @function
   * @description 获取店铺单品列表，赋值给this.data.single
   */
  getGoodList() {
    // 判断是否到最后  到最后就不在请求了
    
    if (this.data.islastSingle) {
      return false;
    }
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getCargoesByShopId",
      data: {
        shopId: this.data.shopId,
        index: this.data.singleListStart,
        length: 15,
        orderType: 1,
        typeDesc: 1,
      },
      success(res) {
        if (res.data.code == 0) {
          // 判断到没到最后

          if (res.data.datas.length < 15) {
            // 到最后就展示已加载全部
            _this.setData({
              islastSingle: true,
            })
          } else {
            // 没到最后就在起始数追加15
            let num = _this.data.singleListStart + 15
            _this.setData({
              singleListStart: num,
            })
          }
          let arr = _this.data.single;
          arr.push(...res.data.datas)
          _this.setData({
            single: arr
          })
        }
      }
    })
  },
  /**
   * @function
   * @description 获取店铺团购商品 赋值给group
   */
  getGroupList() {
    // 判断是否到最后  到最后就不在请求了
    if (this.data.islastGroup) {
      return false;
    }
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/cargoHandler/getGroupCargoByShop",
      data: {
        shopid: this.data.shopId,
        index: this.data.groupListStart,
        length: 15,
      },
      success(res) {
        if (res.data.code == 0) {
          // 判断到没到最后
          if (res.data.datas.length < 15) {
            // 到最后就展示已加载全部
            _this.setData({
              islastGroup: true,
            })
          } else {
            // 没到最后就在起始数追加15
            let num = _this.data.groupListStart + 15
            _this.setData({
              groupListStart: num,
            })
          }
          let arr = _this.data.group;
          arr.push(...res.data.datas)
          _this.setData({
            group: arr
          })
        }
      }
    })
  },
})