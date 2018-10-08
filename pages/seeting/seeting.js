// const Upyun = require('../../utils/upyun-wxapp-sdk')
// const upyun = new Upyun({
//   bucket: 'sdkimg',
//   operator: 'tester',
//   getSignatureUrl: 'http://localhost:8080'
// })
import { Utils } from "../../utils/util.js"
Page({
  onLoad: function () {
    wx.hideLoading();
    this.setData({
      utils:new Utils()
    })
  },
  data: {
    userhead: "http://image-paile.paile8.com/paile8vx/15356177600960eh",
    nickname : "金振宗111",
    sex:2,
    change:true,
    isFocus:false,
    utils:""
  },
  changeIcon() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
      //   const imageSrc = result.tempFilePaths[0]
      //   upyun.upload({
      //     localPath: imageSrc,
      //     remotePath: '/wxapp/demo',
      //     success: function (res) {
      //       console.log('uploadImage success, res is:', res)
      //       wx.showToast({
      //         title: '上传成功',
      //         icon: 'success',
      //         duration: 1000
      //       })
      //       self.setData({
      //         imageSrc
      //       })
      //     },
      //     fail: function (err) {
      //       console.log(err)
      //     }
      //   })
          this.setData({
            userhead: result.tempFilePaths[0],
          })
      },
    });
  },
  changeSex(){
   
    let _this = this;
    wx.showActionSheet({
      itemList: ["男", "女"],
      success: (res)=> {
        wx.showLoading({
          title: '修改中',
        })
        _this.data.utils.ajax({
          url:"user/change/sex",
          method:"post",
          data:{
            userCode:105,
            sex: res.tapIndex + 1
          },
          success(result){
            console.log(result)
            if (parseInt(result.data.code) == 0){
              _this.setData({
                sex: res.tapIndex + 1
              })
            }
            wx.hideLoading();
          },
          fail(error){
            wx.hideLoading()
          }
        })
        
      }
    })
  },
  /**
   * @description 修改昵称
   */
  changenick(){
    this.setData({
      change:false,
      isFocus:true,
    })
  },
  /**
   * @description 确认修改
   */
  confirm(event){
    if(event.detail.value!=""){
      wx.showLoading({
        title: '修改中',
      })
      let _this = this ;
      this.data.utils.ajax({
        url:"user/change/nickname",
        data:{
          userCode:105,
          nickname: event.detail.value,
        },
        method:"post",
        success(res){
            console.log(res);
            if(parseInt(res.data.code) == 0){
              _this.setData({
                nickname: event.detail.value,
                change: true,
                isFocus: false,
              })
            }
            wx.hideLoading();
        }
      })
     
    }else{
      this.setData({
        change: true,
        isFocus: false,
      })
    }
  },
  /**
   * @description 查看头像
   */
  look(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  }
})
