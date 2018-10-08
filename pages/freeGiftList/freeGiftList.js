// pages/freeGiftList/freeGiftList.js
import { Utils } from "../../utils/util.js";
Page({
  data: {
    utils:"",
    list:[],
    animationData: {},
    tipHide:false,
    islast : false,
    pageNumber : 1,
    pageSize : 15,
    firstRequested:false,
  },
  onLoad: function (options) {
    this.setData({
      utils:new Utils()
    })
    wx.hideLoading();
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0',
    });
    this.getlist();
    
  },
  onReachBottom: function () {
    if(!this.data.islast){
        let num = this.data.pageNumber + 1 ;
        this.setData({
          pageNumber : num
        })
        this.getlist(this.data.pageNumber,this.data.pageSize);
    }
  },
  /**
   * @description 移除顶部提示
   */
  hiddenTip(e) {
    this.animation.opacity(0).scaleY(0).step();
    this.setData({
      animationData: this.animation
    })
    setTimeout(()=>{
      this.setData({
        tipHide: true
      })
    },400)
  },
  /**
   * @function 
   * @description 获取免费试用的列表
   * @param {number} 当前页数
   * @param {number} 每一页条数
   */
  getlist(pageNumber = 1,pageSize = 15){
    if(pageNumber < 1 )return false;
    let _this = this;
    this.data.utils.ajax({
      url:"/experience/rule/query/page/available",
      data:{
        pageNumber,
        pageSize,
      },
      success(res){
        
        let arr = _this.data.list;
        arr.push(...res.data.data.dataList);
        if(pageNumber >= res.data.data.totalPage){
          _this.setData({
            islast : true,
          })
        }
        _this.setData({
          list:arr,
        });
        // 判断是不是第一次请求 如果是的话 返回第一次请求结束
        if(!_this.data.firstRequested){
          _this.setData({
            firstRequested: true,
          })
        }
      }
    })
  }
})