//获取应用实例
const app = getApp();
import {Utils} from "../../utils/util.js";
wx.showLoading({
  title: "加载中",
    mask: true,
})
Page({
  onPageScroll(e) {
    if(e.scrollTop>52){
      this.setData({
        fixMenu:true,
      })
    }else{
      this.setData({
        fixMenu:false,
      })
    };
    if(e.scrollTop>1000){
      this.setData({
        showScroll:true,
      })
    }else{
      this.setData({
        showScroll: false,
      })
    }
  },
  onReady(){
    this.setData({
      utils:new Utils()
    })
    this.data.utils.storage.Set("paileUser", { "id": 96, "head_icon": "http://image-paile.paile8.com/paile8vx/153585945441527mj.jpg", "nickname": "meihe", "phone": null, "address": "null null ", "sex": 1 })
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    this.setData({
      utils: new Utils()
    })
  },
  onShow() {
    wx.showTabBarRedDot({
      index: 2,
    })
    wx.hideLoading();
  },
  /**
   * @description 分享
   */
  onShareAppMessage() {
    let shareInner = {
      title: "拍乐网邀请您一起购物",
      path: "/",
      imageUrl: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
    }
    return shareInner;
  },
 
  data: {
    utils:"",
    showScroll:false,
    menuTitleList: [
      {
        text: "推荐",
        search: "-1"
      },
      {
        text: "男装",
        search: "1"
      },
      {
        text: "女装",
        search: "2"
      },
      {
        text: "居家",
        search: "3"
      },
      {
        text: "母婴",
        search: "4"
      },
      {
        text: "鞋包",
        search: "5"
      },
      {
        text: "玩具",
        search: "6"
      },
      {
        text: "美妆",
        search: "7"
      },
      {
        text: "饰品",
        search: "8"
      },
      {
        text: "数码",
        search: "9"
      }
    ],
    currentNum: 0,
    fixMenu:false,
    pageArguary:-1,
    pageTitle:"拍乐网",
    quickListArr:[],
    isIphoneX: false,
  },
  onReachBottom() {
    if(this.data.currentNum == 0){
     this.selectComponent("#indexComponent").getAllQuality()
    }else{
      this.selectComponent("#quick_" + this.data.pageArguary).getList();
    }
  },
  toggleMenu(e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    })
    this.setData({
      currentNum: e.currentTarget.dataset["key"],
      pageArguary:e.currentTarget.dataset["value"],
    })
    
    if(this.data.currentNum != 0){
      // 设置标题
      this.setData({
        pageTitle: e.currentTarget.dataset["title"]
      })
      // 判断子组件length是不是0 是的话 就加载一边数据  否的话 就不用加载一边了
      if (this.selectComponent("#quick_" + this.data.pageArguary).data.listArr.length == 0){
        this.selectComponent("#quick_" + this.data.pageArguary).getList();
      }
    }else{
      this.setData({
        pageTitle: "拍乐网"
      })
    }
  }
})
