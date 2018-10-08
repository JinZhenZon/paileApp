import { Utils } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
    utils:"",
    shareCode:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      utils:new Utils()
    })
    this.getBalance();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    this.getshareCode();
  },
  onShareAppMessage(e){
      /**
       * @description 判断是不是邀请人
       */
      if (e.from == "button") {
          return {
            title: "打开拍乐网立得10元现金，打开钱包查看！",
            imageUrl: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=136215149,553892141&fm=173&app=25&f=JPEG?w=218&h=146&s=2D65536EBC5A98D4C4C9249803005092",
            path: "../share?shareCode=" + this.data.shareCode,
            success: (res) => {
              this.setData({
                tipConfig: {
                  iconClass: "icon-duihao",
                  title: "分享成功"
                },
              })
              this.selectComponent("#tipbox").showModel(1500)
            },
            fail: (res) => {
              this.setData({
                tipConfig: {
                  iconClass: "icon-cuowu",
                  title: "分享失败"
                }
              })
              this.selectComponent("#tipbox").showModel(1500)
            }
          }
        
      }
  },
  shareGood(){
    wx.navigateTo({
      url: '../freeList/freeList',
    })
  },
  getBalance(){
    let _this = this;
    this.data.utils.ajax({
      url:"user/wallet/query",
      data:{
        userCode:105,
      },
      success(res){
        if(parseInt(res.data.code == 0)){
          _this.setData({
            balance: res.data.data.balanceAmount,
          })
        }else{
          _this.setData({
            balance: 0,
          })
        }
      }
    })
  },
  /**
  * @description 邀请人的邀请码
  * @todo 邀请人使用
  */
  getshareCode() {
    let _this = this;
    this.data.utils.ajax({
      url: "marketing/commission/invitation/apply",
      data: {
        userCode: 96,
        shareDestination: 0
      },
      method: "post",
      success(res) {
        _this.setData({
          shareCode: res.data.data.invitationCode,
        })
      },
      fail(error) {
        console.log(error);
      }
    })
  },
})