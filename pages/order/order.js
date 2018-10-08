import { Utils } from "../../utils/util.js"
Page({
  data: {
    currentNum: 0,

    allArr: [],
    allIndex:1,
    allIsLast:false,

    pandArr: [],
    pandIndex:1,
    pandIsLast:false,

    sendArr: [],
    sendIndex: 1,
    sendIsLast: false,


    forArr: [],
    forIndex: 1,
    forIsLast: false,


    evalArr:[],
    evalIndex:1,
    evalIsLast:false,


    userCode:3,
    utils:"",
  },
  onLoad(option){
    this.setData({
      utils:new Utils()
    })
    // this.setData({
    //     userCode : option.userCode
    // })
  },
  onReady: function () {
    wx.hideLoading();
    this.getAllList();
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
    this.setData({
      currentNum: e.currentTarget.dataset.num,
    })
    this.switchCurrent();    
    // 默认
  },
  swiperChange(e){
    this.setData({
      currentNum: e.detail.current,
    })
    this.switchCurrent();
  },
  switchCurrent(){
    switch (parseInt(this.data.currentNum)) {
      case 1: {
        if (this.data.pandArr.length == 0) {
          this.getPandList();
        }
        break;
      }
      case 2: {
        if (this.data.sendArr.length == 0) {
          this.getSendList();
        }
        break;
      }
      case 3: {
        if (this.data.forArr.length == 0) {
    
          this.getForList();
        }
        break;
      }
      case 4: {
        if (this.data.evalArr.length == 0) {
          this.getEvalList();
        }
        break;
      }
    }
  },
  /**
   * @description 加载更多全部订单
   */
  addLoadAll(){
    if (this.data.allIsLast) {
      return false
    }
    let num = this.data.allIndex;
    num++;
    this.setData({
      allIndex:num
    })
    this.getAllList(this.data.allIndex);
  },
  /**
   * @description 加载更多待付款订单
   */
  addLoadPand(){
    if (this.data.pandIsLast) {
      return false
    }
    let num = this.data.pandIndex;
    num++;
    this.setData({
      pandIndex: num
    })
   
    this.getPandList(this.data.pandIndex);
  },
  /**
   * @description 加载更多待发货订单
   */
  addLoadSend() {
    if (this.data.sendIsLast) {
      return false
    }
    let num = this.data.sendIndex;
    num++;
    this.setData({
      sendIndex: num
    })
    this.getSendList(this.data.sendIndex);
  },

  /**
 * @description 加载更多待收货订单
 */
  addLoadFor() {
    if (this.data.forIsLast) {
      return false
    }
    let num = this.data.forIndex;
    num++;
    this.setData({
      forIndex: num
    })
    this.getFroList(this.data.forIndex);
  },
  /**
    * @description 加载更多待评价订单
    */
  addLoadEval() {
    if (this.data.evalIsLast) {
      return false
    }
    let num = this.data.evalIndex;
    num++;
    this.setData({
      evalIndex: num
    })
    this.getEvalList(this.data.evalIndex);
  },



  /**
   * @description 获取全部订单
   * @param {number | string} 从多少页开始
   * @todo  真正使用时候需要对usercode进行非空判断
   */
  getAllList(Num = 1){
    let _this = this;
    let includeOrderStatus = new Array(1,5,6,8,10)
    this.data.utils.ajax({
      url:"order/query/page",
      data:{
        userCode:this.data.userCode,
        "includeOrderStatus[0]": 1,
        "includeOrderStatus[1]":6,
        "includeOrderStatus[2]":8,
        "includeOrderStatus[3]":10,
        "includeOrderStatus[4]":15,
        "includeOrderStatus[5]": 5,
        orderType:1,
        pageNumber:parseInt(Num),
        pageSize:15,
      },
      success(res){
        
        let list = _this.data.allArr;
        list.push(...res.data.data.dataList);
       
        _this.setData({
          allArr:list
        })
        if (_this.data.allIndex >= res.data.data.totalPage) {
          _this.setData({
            allIsLast:true
          })
        }
      },
    })
  },

  getPandList(Num = 1){
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: this.data.userCode,
        status: 5,
        orderType: 1,
        pageNumber: parseInt(Num),
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.pandArr;
        list.push(...res.data.data.dataList);
        _this.setData({
          pandArr: list
        })
        if (_this.data.pandIndex >= res.data.data.totalPage) {
          _this.setData({
            pandIsLast: true
          })
        }
      },
    })
  }, 

  getSendList(Num = 1) {
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: this.data.userCode,
        includeOrderStatus: 8,
        orderType: 1,
        pageNumber: parseInt(Num),
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.sendArr;
        list.push(...res.data.data.dataList);
        _this.setData({
          sendArr: list
        })
        if (_this.data.sendIndex >= res.data.data.totalPage) {
          _this.setData({
            sendIsLast: true
          })
        }
      },
    })
  },
  getForList(Num = 1) {
    
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: this.data.userCode,
        includeOrderStatus: 10,
        orderType: 1,
        pageNumber: parseInt(Num),
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.forArr;
        list.push(...res.data.data.dataList);
        _this.setData({
          forArr: list
        })
        wx.showModal({
          title: _this.data.forIndex,
          content: res.data.data.totalPage,
        })
        if (_this.data.forIndex >= res.data.data.totalPage) {
          _this.setData({
            forIsLast: true
          })
        }
      },
    })
  },
  getEvalList(Num = 1) {
    let _this = this;
    this.data.utils.ajax({
      url: "order/query/page",
      data: {
        userCode: this.data.userCode,
        includeOrderStatus: 10,
        orderType: 1,
        pageNumber: parseInt(Num),
        pageSize: 15,
      },
      success(res) {
        let list = _this.data.evalArr;
        list.push(...res.data.data.dataList);
        _this.setData({
          evalArr: list
        })
        if (_this.data.evalIndex >= res.data.data.totalPage) {
          _this.setData({
            evalIsLast: true
          })
        }
      },
    })
  }
})