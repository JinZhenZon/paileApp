// pages/groupTrait/groupTrait.js
import { Utils } from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNum: 0,


    allArr: [],
    allIndex: 1,
    allIsLast: false,

    freeingArr: [],
    freeingIndex: 1,
    freeingLast: false,

    luckArr: [],
    luckIndex: 1,
    luckLast: false,


    successArr: [],
    successIndex: 1,
    successLast: false,


    failArr: [],
    failIndex: 1,
    failLast: false,

    utils: "",

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    this.setData({
      utils: new Utils()
    })
    this.getFreeAllOrder();
  },
  /**
   * @description 获取全部订单
   */
  getFreeAllOrder(index = 1) {
    if (this.data.allIsLast) {
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: 96,
        orderType: 6,
        "includeOrderStatus[0]": 1,
        "includeOrderStatus[1]": 3,
        "includeOrderStatus[2]": 5,
        "includeOrderStatus[3]": 7,
        "includeOrderStatus[4]": 8,
        "includeOrderStatus[5]": 10,
        "includeOrderStatus[6]": 15,
        pageNumber: index,
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.allArr;
        res.data.data.dataList.map(item => {
          if (item.status == 7) {
            if (item.experienceTeam.remainingActivityTime != null) {
              if (item.experienceTeam.remainingActivityTime > 0) {
                item.experienceTeam.remainingActivityTime = item.experienceTeam.remainingActivityTime - 1;
              } else {
                item.experienceTeam.remainingActivityTime = 0;
              }
            }
          }
          if (item.status == 5) {
            if (item.experienceTeam.remainingInvitationTime != null) {
              if (item.experienceTeam.remainingInvitationTime > 0) {
                item.experienceTeam.remainingInvitationTime = item.experienceTeam.remainingInvitationTime - 1;
              } else {
                item.experienceTeam.remainingInvitationTime = 0;
              }
            }
          }
          list.push(item);
        })
        if (res.data.data.dataList.length != 15) {
          _this.setData({
            allIsLast: true,
          })
        } else {
          let index = _this.data.allIndex
          _this.setData({
            allIndex: index,
          })
        }
        _this.setData({
          allArr: list
        })
      }
    })
  },
  loadMoreAll() {
    this.getFreeAllOrder(this.data.allIndex);
  },
  /**
   * @description 获取待分享菜单
   */
  getfreeingOrder(index = 1) {
    if (this.data.freeingLast) {
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: 96,
        orderType: 6,
        "includeOrderStatus[0]": 1,
        "includeOrderStatus[1]": 5,
        pageNumber: index,
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.freeingArr;
        res.data.data.dataList.map(item => {
          if (item.status == 5) {
            if (item.experienceTeam.remainingInvitationTime != null) {
              if (item.experienceTeam.remainingInvitationTime > 0) {
                item.experienceTeam.remainingInvitationTime = item.experienceTeam.remainingInvitationTime - 1;
              } else {
                item.experienceTeam.remainingInvitationTime = 0;
              }
            }
          }
          list.push(item);
        })
        if (res.data.data.dataList.length != 15) {
          _this.setData({
            freeingLast: true,
          })
        } else {
          let index = _this.data.freeingIndex;
          index++;
          _this.setData({
            freeingIndex: index,
          })
        }
        _this.setData({
          freeingArr: list
        })
      }
    })
  },
  loadMoreFreeing() {
    this.getFreeingOrder(this.data.freeingIndex);
  },



  /**
  * @description 获取待抽奖菜单
  */
  getfreeLuckOrder(index = 1) {
    if (this.data.luckLast) {
      return false;
    }
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: 96,
        orderType: 6,
        "includeOrderStatus[0]": 7,
        pageNumber: index,
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.luckArr;
        res.data.data.dataList.map(item => {
          if (item.experienceTeam.remainingActivityTime != null) {
            if (item.experienceTeam.remainingActivityTime > 0) {
              item.experienceTeam.remainingActivityTime = item.experienceTeam.remainingActivityTime - 1;
            } else {
              item.experienceTeam.remainingActivityTime = 0;
            }
          }
          list.push(item);
        })
        if (res.data.data.dataList.length != 15) {
          _this.setData({
            luckLast: true,
          })
        } else {
          let index = _this.data.luckIndex;
          index++;
          _this.setData({
            luckIndex: index,
          })
        }
        _this.setData({
          luckArr: list
        })
      }
    })
  },
  loadMoreLuck() {
    this.getFreeingOrder(this.data.luckIndex);
  },
  /**
  * @description 获取已中奖菜单
  */
  getfreesuccessOrder(index = 1) {
    if (this.data.successLast) {
      return false;
    }
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: 96,
        orderType: 6,
        "includeOrderStatus[0]": 1,
        "includeOrderStatus[1]": 8,
        "includeOrderStatus[2]": 15,
        "includeOrderStatus[3]": 10,
        pageNumber: index,
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.successArr;
        res.data.data.dataList.map(item => {
          if (item.experienceTeam.remainingActivityTime != null) {
            if (item.experienceTeam.remainingActivityTime > 0) {
              item.experienceTeam.remainingActivityTime = item.experienceTeam.remainingActivityTime - 1;
            } else {
              item.experienceTeam.remainingActivityTime = 0;
            }
          }
          list.push(item);
        })
        console.log(res)
        if (res.data.data.dataList.length != 15) {
          _this.setData({
            successLast: true,
          })
        } else {
          let index = _this.data.successIndex;
          index++;
          _this.setData({
            successIndex: index,
          })
        }
        _this.setData({
          successArr: list
        })
      }
    })
  },
  loadMoreSuccess() {
    this.getfreesuccessOrder(this.data.successIndex);
  },
  /**
   * @description 获取申请失败菜单
   */
  getfreeFailOrder(index = 1) {
    if (this.data.failLast) {
      return false;
    }
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: 96,
        orderType: 6,
        "includeOrderStatus[0]": 3,
        pageNumber: index,
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.failArr;
        list.push(...res.data.data.dataList)
        if (res.data.data.dataList.length != 15) {
          _this.setData({
            failLast: true,
          })
        } else {
          let index = _this.data.successIndex;
          index++;
          _this.setData({
            failIndex: index,
          })
        }
        _this.setData({
          failArr: list
        })
      }
    })
  },
  loadMoreFail() {
    this.getfreefailOrder(this.data.failIndex);
  },

  /**
   * 用户点击右上角分享
   */
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
      currentNum: e.currentTarget.dataset.num,
    })
    switch (parseInt(this.data.currentNum)) {
      case 1:
        if (this.data.freeingArr.length == 0) {
          this.getfreeingOrder(this.data.freeingIndex);
        }
        break;
      case 2:
        if (this.data.luckArr.length == 0) {
          this.getfreeLuckOrder(this.data.luckIndex);
        }
        break;
      case 3:
        if (this.data.successArr.length == 0) {
          this.getfreesuccessOrder(this.data.successIndex);
        }
        break;
      case 4:
        if (this.data.failArr.length == 0) {
          this.getfreeFailOrder(this.data.failIndex);
        }
        break;
    }
    // 默认
  },
  swiperChange(e) {
    this.setData({
      currentNum: e.detail.current,
    })
    switch (parseInt(this.data.currentNum)) {
      case 1:
        if (this.data.freeingArr.length == 0) {
          this.getfreeingOrder(this.data.freeingIndex);
        }
        break;
      case 2:
        if (this.data.luckArr.length == 0) {
          this.getfreeLuckOrder(this.data.luckIndex);
        }
        break;
      case 3:
        if (this.data.successArr.length == 0) {
          this.getfreesuccessOrder(this.data.successIndex);
        }
        break;
      case 4:
        if (this.data.failArr.length == 0) {
          this.getfreeFailOrder(this.data.failIndex);
        }
        break;
    }
  },
  /**
   * @desc 设置data
   * @params {arr}
   */
  setdata(arr) {
    wx.showLoading({
      title: "加载中"
    })
  },
  updata() {
    console.log(123);
  },

})