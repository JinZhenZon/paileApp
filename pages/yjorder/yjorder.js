// pages/yjorder/yjorder.js
import { Utils } from "../../utils/util.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    utils: "",
    currentnum: 0,
    sharedGood: [],
    sharedIndex:1,
    sharedIsLast : false,
    income: [],
    IncomIndex:1,
    yjIncomed: 0,
    incomIsLast:false,
    tipConfig:{},
    shareCode:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      utils: new Utils()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
    this.getIncomed();
    this.getSharedGood();
    this.getshareCode();
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    switch (this.data.currentnum) {
      case 0:
        this.getSharedGood(this.data.sharedIndex)
      case 1:
        this.getIncomList(this.data.IncomIndex);
    }
  },
  /**
   * 页面分享事件处理
   */
  onShareAppMessage(e){
    if (e.from == "button"){
        // 判断是不是邀请人加入
        if(parseInt(e.target.dataset.type) == 1){
          return {
            title:"打开拍乐网立得10元现金，打开钱包查看！",
            imageUrl:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=136215149,553892141&fm=173&app=25&f=JPEG?w=218&h=146&s=2D65536EBC5A98D4C4C9249803005092",
            path:"../share?shareCode="+this.data.shareCode,
            success: (res) => {
              this.setData({
                tipConfig:{
                  iconClass:"icon-duihao",
                  title:"分享成功"
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
        }else{
          return {
            title:"【劵后价】"+e.target.dataset.item.title,
            imageUrl:e.target.dataset.item.icon,
            path:"../share?sharCode="+e.target.dataset.item.shareCode,
          }
        }
    }
  },


  /**
   * @description 邀请人的邀请码
   * @todo 邀请人使用
   */
  getshareCode(){
    let _this = this;
    this.data.utils.ajax({
      url:"marketing/commission/invitation/apply",
      data:{
        userCode: 105,
        shareDestination: 0
      },
      method:"post",
      success(res){
        _this.setData({
          shareCode:res.data.data.invitationCode,
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },




  /**
   * @description 获取已分享商品的列表
   * @param {number} 商品列表起始搜索页码
   * @todo 返回页面已分享商品列表（搜索当前页码）
   */
  getSharedGood(num = 1){
    if (this.data.sharedIsLast){
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url:"marketing/commission/share/query/page",
      data:{
        userCode : 105,
        pageNumber:num,
        pageSize:15
      },
      success(res){
        let list = _this.data.sharedGood;
        list.push(...res.data.data.dataList);
        if(res.data.data.dataList.length!=15){
          _this.setData({
            sharedIsLast:true,
          })
        }else{
          let snum = _this.data.sharedIndex;
          snum++;
          _this.setData({
            sharedIndex:sunm
          })
        }
        _this.setData({
          sharedGood:list
        })
      }
    })
  },
  /**
   * @description 获取已收入的佣金
   */
  getIncomed() {
    let _this = this;
    this.data.utils.ajax({
      url: "user/wallet/query",
      data: {
        userCode: 3
      },
      methods: "get",
      success(res) {
        if (parseInt(res.data.code) == 0) {
          _this.setData({
            yjIncomed: (res.data.data.balanceAmount / 100)||"0"
          })
        }
      },
      fail(error) {
        console.log(error);
      }
    })
  },
 
  /**
   * @description 切换列表
   */
  toggle(e) {
    let num = e.currentTarget.dataset.num;
    this.setData({
      currentnum: num,
    })
    if (num == 1) {
      if (this.data.income.length == 0) {
        this.getIncomList();
      }
    }
  },
  /**
   * @description 获取佣金收入列表
   * @param {number} 商品列表起始搜索页码
   * @todo 返回页面佣金收入列表（搜索当前页码）
   */
  getIncomList(num = 1) {
    if (this.data.incomIsLast){
      return false
    }
    let _this = this;
    this.data.utils.ajax({
      url:"marketing/commission/income/query/page",
      data:{
        userCode:96,
        pageNumber:num,
        pageSize : 15,
      },
      success(res){
        let data = res.data.data.dataList;

        if(data.length !=15){
          _this.setData({
            incomIsLast:true,
          })
        }else{
          let num = _this.data.IncomIndex;
          num++;
          _this.setData({
            IncomIndex:num
          })
        }
        let incomList = _this.data.income;
        incomList.push(...data);
        _this.setData({
          income: incomList
        })
      }
    })
  },

})