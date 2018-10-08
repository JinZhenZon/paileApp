import { Utils } from "../../utils/util.js";
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page({
  data: {
    utils: "",
    addressList: [],
    region: ['广东省', '广州市', '海珠区'],
    address: "",
    address_name: "",
    address_phone: "",
    qqmapsdk: "",
    boxList: [],
    addressBox: false,
    boxType: 0,
    modelConfig: {},
    boxShow: false,
    address_id: 0,
  },
  onLoad() {
    /**
     * 赋值qqmap
     */
    this.setData({
      qqmapsdk: new QQMapWX({
        key: 'KT4BZ-3X7CP-GKBDS-VHI7N-Q5VSS-QMBTW',
      })
    })

    wx.hideLoading();
    this.setData({
      utils: new Utils()
    })
    this.getAddressList(105)

  },
  getAddressList(id) {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/userHandler/getAllDeliverAddress",
      data: {
        userCode: id
      },
      success(res) {
        // if (parseInt(res.data.code) != 0 || res.data.datas.length == 0) {
        //   _this.setData({
        //     addressNull: true,
        //   })
        //   return false
        // }
        if (parseInt(res.data.code) == 0) {
          _this.setData({
            addressList: res.data.datas
          })
        } else {
          console.log("获取数据失败")
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  /**
   * @description 设为默认地址
   */
  setfirst(e) {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/userHandler/setFirstAddress",
      data: {
        addressId: e.currentTarget.dataset.id,
        userCode: 105,
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          let array = _this.data.addressList;
          let index = e.currentTarget.dataset.index;
          let t_item = _this.data.addressList[index];
          array.map((item, n) => {
            if (n != index) {
              item.isfirst = 0
            } else {
              item.isfirst = 1
            }
          })
          array.splice(index, 1)
          array.unshift(t_item);
          _this.setData({
            addressList: array,
            modelConfig: {
              iconClass: "icon-duihao",
              title: "设置成功",
            }
          })
          _this.selectComponent("#model").showModel()
        } else {
          _this.setData({
            modelConfig: {
              iconClass: "icon-cuowu",
              title: "设置失败",
            }
          })
          _this.selectComponent("#model").showModel()
        }
      }
    })
  },
  /**
   * @description 微信添加地址
   */
  openwxAdd() {
    wx.getSetting({
      success(res) {
        // 检测是否有访问通讯录地址权限,没有的话提示是否前往设置打开
        if (typeof res.authSetting["scope.address"] != "undefined" && !res.authSetting['scope.address']) {
          wx.showModal({
            title: '拍乐网提示',
            content: '检测到您没有打开访问通讯录地址的权限，若不打开该权限将无法获取通讯录地址，是否前往设置打开？',
            confirmText: "确定",
            cancelText: "取消",
            success(res) {
              // 从设置返回来的函数，提示用户重新获取地址
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    wx.showModal({
                      showCancel: false,
                      content: '如果您已打开通讯录地址的权限，请重新获取地址',
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
    let _this = this;
    wx.chooseAddress({
      success(result) {
        console.log(result);
        _this.data.utils.ajax({
          url: "paile-service/api/userHandler/addDeliverAddress",
          data: {
            userCode: 105,
            name: result.userName,
            phone: result.telNumber,
            city: result.provinceName + " " + result.cityName + " " + result.countyName,
            address: result.detailInfo,
          },
          success(res) {
            if (parseInt(res.data.code) == 0) {
              let result = res.data.datas;
              let obj = result;
              let arr = _this.data.addressList;
              arr.push(obj);
              _this.setData({
                modelConfig: {
                  iconClass: "icon-duihao",
                  title: "新建成功",
                },
                addressList: arr,
              })
              _this.selectComponent("#model").showModel()
            } else {
              _this.setData({
                modelConfig: {
                  iconClass: "icon-cuowu",
                  title: "新建失败",
                }
              })
              _this.selectComponent("#model").showModel()
            }

          }
        })
      },
    });

  },
  /**
   * @description 展示添加或修改地址的box
   */
  boxShow() {
    this.setData({
      boxShow: true,
      boxType: 0,
    })
  },
  /**
   * @description 隐藏添加或修改地址的box
   */
  hideditBox() {
    console.log(1);
    this.setData({
      region: ["广东省", "广州市", "海珠区"],
      address_name: "",
      address_phone: "",
      address: "",
      boxShow: false,
    })
  },
  /**
   * @description 修改地区
   */
  changCity(e) {
    this.setData({
      region: e.detail.value,
      address: "",
    })
  },
  /**
   * @description 为input实现双向绑定
   */
  setValue(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value,
    })
  },
  /**
   * @description 获取当前位置经纬度 通过qqmap转换经纬度为名字
   */
  getCurrentAddress() {
    let _this = this;

    wx.getSetting({
      success(res) {
        // 检测是否有地址权限,没有的话提示是否前往设置打开
        // 2018/10/6 新增判断是否为undefined(是否是第一次授权)
        if (typeof res.authSetting['scope.userLocation'] != 'undefined' && !res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '拍乐网提示',
            content: '检测到您没有打开拍乐网的位置权限，若不打开该权限将无法获取地理位置，是否前往设置打开？',
            confirmText: "确定",
            cancelText: "取消",
            success(res) {
              // 从设置返回来的函数，提示用户重新获取地址
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    wx.showModal({
                      showCancel: false,
                      content: '如果您已打开位置权限，请重新获取地址',
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
    wx.getLocation({
      success(res) {
        _this.data.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          coord_type: 1,
          get_poi: 1,
          poi_options: 'policy=2;radius=500;page_size=10;page_index=1',
          success(res) {
            _this.setData({
              addressBox: true,
              boxList: res.result.pois
            })
          },
          fail: function (res) {
            console.log(res);
          },

        })
      },
      fail() {

      }
    })


  },
  
  clickAddress(e) {
    let address = e.currentTarget.dataset.address;
    this.setData({
      region: [address.ad_info.province, address.ad_info.city, address.ad_info.district],
      address: address.title,
      addressBox: false,
      boxList: [],
    })
  },
  /**
   * @description 新增收货地址
   */
  addNewAddress() {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/userHandler/addDeliverAddress",
      data: {
        userCode: 105,
        name: _this.data.address_name,
        phone: _this.data.address_phone,
        city: _this.data.region[0] + " " + _this.data.region[1] + " " + _this.data.region[2],
        address: _this.data.address
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          let result = res.data.datas;
          let obj = result;
          let arr = _this.data.addressList;
          arr.push(obj);
          _this.setData({
            modelConfig: {
              iconClass: "icon-duihao",
              title: "新建成功",
            },
            addressList: arr,
          })
          _this.selectComponent("#model").showModel()
        } else {
          _this.setData({
            modelConfig: {
              iconClass: "icon-cuowu",
              title: "新建失败",
            }
          })
          _this.selectComponent("#model").showModel()
        }
        _this.hideditBox();
      }
    })
  },
  // 修改收货地址
  edit(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    this.setData({
      boxType: 1,
      boxShow: true,
      address_name: item.name,
      address_phone: item.phone,
      address: item.address,
      region: item.city.split(" "),
      address_id: item.id,
      address_index: index
    })
  },
  /**
   * @description 提交编辑的地址
   */
  editAddress() {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/userHandler/updateDeliverAddress",
      data: {
        id: _this.data.address_id,
        name: _this.data.address_name,
        phone: _this.data.address_phone,
        city: _this.data.region[0] + " " + _this.data.region[1] + " " + _this.data.region[2],
        address: _this.data.address
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          let list = _this.data.addressList;
          list[_this.data.address_index] = res.data.datas;
          _this.setData({
            modelConfig: {
              iconClass: "icon-duihao",
              title: "修改成功",
            },
            addressList: list,
          })
          _this.selectComponent("#model").showModel()
        } else {
          _this.setData({
            modelConfig: {
              iconClass: "icon-cuowu",
              title: "修改失败",
            }
          })
          _this.selectComponent("#model").showModel()
        }
        _this.hideditBox();
      }
    })
  },
  /**
   * @description 删除收货地址
   */
  remove(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let _this = this;
    wx.showModal({
      content: '确定删除该地址么',
      confirmText: "删除",
      confirmColor: "#f55",
      success(res) {
        if (res.confirm) {
          _this.data.utils.ajax({
            url: "paile-service/api/userHandler/deleteDeliverAddress",
            data: {
              id
            },
            success(res) {
              if (parseInt(res.data.code) == 0) {
                let list = _this.data.addressList;
                list.splice(index, 1);
                _this.setData({
                  modelConfig: {
                    iconClass: "icon-duihao",
                    title: "删除成功",
                  },
                  addressList: list,
                })
                _this.selectComponent("#model").showModel()
              } else {
                _this.setData({
                  modelConfig: {
                    iconClass: "icon-cuowu",
                    title: "删除失败",
                  }
                })
                _this.selectComponent("#model").showModel()
              }
            }
          })
        }
      }
    })
  },
  hidbox() {
    this.setData({
      addressBox: false,
      boxList: [],
    })
  },
  /**
   * @descript 判断上一页如果是结算页面 则设置上一页的地址
   */
  setAddress(e) {
    console.log(1)
    var pages = getCurrentPages();
    var pre = pages[pages.length - 2];
    if (pre.is == "pages/sign/sign") {
      pre.setData({
        addressInfo: e.currentTarget.dataset.item,
      })
      this.gopre();
    }
  },
  /**
   * @description 返回上一页
   */
  gopre() {
    wx.navigateBack({
      delta: 1,
    })
  }
})