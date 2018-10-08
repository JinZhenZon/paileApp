// pages/groupTrait/groupTrait.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNum: 0,
    normalArr: [],
    priceArr: [],
    goodArr: [],

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    this.setdata("normalArr")
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    switch (parseInt(this.data.currentNum)) {
      case 0:this.updata("normalArr"); break;
      case 1:this.updata("priceArr"); break;
      case 2:this.updata("goodArr"); break;
      default:console.log("default");
    }
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
      currentNum: parseInt(e.currentTarget.dataset.num),
    })
    // 默认

    switch (parseInt(num)) {
      case 0:
        if (this.data.normalArr.length == 0) {
          this.setdata("normalArr");
          break;
        }
        break;
      case 1:
        if (this.data.priceArr.length == 0) {
          this.setdata("priceArr");
          break;
        }
        break;
      case 2:
        if (this.data.goodArr.length == 0) {
          this.setdata("goodArr");
          break;
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
    var goodList = [{ "descr": "眉县绿心弥猕猴桃新鲜亚特奇异果水果陕西特产非徐香翠香5斤装包邮", "img_url": "http://image-paile.paile8.com/web/153614568533059jb.jpg", "cargo_id": 1820, "price": 19.9, "name": "眉县绿心弥猕猴桃新鲜亚特奇异果水果陕西特产非徐香翠香5斤装包邮", "group_price": 17.8, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "五合一手机镜头送万花筒 0.63x广角+198鱼眼+15x微距+2x增距+CPL", "img_url": "http://image-paile.paile8.com/web/153500463229354fd.jpg", "cargo_id": 1713, "price": 88.0, "name": "五合一手机镜头送万花筒 0.63x广角+198鱼眼+15x微距+2x增距+CPL", "group_price": 80.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "[【可改密码】复古密码本带锁日记本加厚韩国创意手账本学生记事本文具笔记本子", "img_url": "http://image-paile.paile8.com/web/153461001722327ci.JPG", "cargo_id": 1689, "price": 26.8, "name": "[【可改密码】复古密码本带锁日记本加厚韩国创意手账本学生记事本文具笔记本子", "group_price": 25.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "【可自定义密码】A5复古密码本创意学生日记本带锁笔记本日韩国加厚手账本笔记本文具", "img_url": "http://image-paile.paile8.com/web/153460947877120gb.JPG", "cargo_id": 1686, "price": 48.0, "name": "【可自定义密码】A5复古密码本创意学生日记本带锁笔记本日韩国加厚手账本笔记本文具", "group_price": 38.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "卸妆新品A.T眼唇卸妆巾 a.t卸妆巾纯植物一次性便携眼部唇部面部卸妆巾", "img_url": "http://image-paile.paile8.com/web/15342258694821oo.jpg", "cargo_id": 1620, "price": 68.0, "name": "卸妆新品A.T眼唇卸妆巾 a.t卸妆巾纯植物一次性便携眼部唇部面部卸妆巾", "group_price": 67.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "欧诗莱顿男士皮带真皮牛皮腰带平滑扣商务青年裤带男韩版潮男休闲", "img_url": "http://image-paile.paile8.com/web/153403704274715nb.jpg", "cargo_id": 1591, "price": 39.9, "name": "欧诗莱顿男士皮带真皮牛皮腰带平滑扣商务青年裤带男韩版潮男休闲", "group_price": 9.9, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "女式休闲皮鞋2018韩版时尚潮流休闲皮鞋", "img_url": "http://image-paile.paile8.com/paile8/ios/createt0RHRV88HQWR7HVAK/b20180809204813CargoImage.jpg", "cargo_id": 1554, "price": 69.0, "name": "女式休闲皮鞋2018韩版时尚潮流休闲皮鞋", "group_price": 49.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }]
    setTimeout(() => {
      this.setData({
        [arr]: goodList,
      }, function () {
        wx.hideLoading();
      })
    }, 1000)
  },
  updata(arr) {
    console.log(arr);
    wx.showLoading({
      title: "加载中"
    })
    var goodList = [{ "descr": "眉县绿心弥猕猴桃新鲜亚特奇异果水果陕西特产非徐香翠香5斤装包邮", "img_url": "http://image-paile.paile8.com/web/153614568533059jb.jpg", "cargo_id": 1820, "price": 19.9, "name": "眉县绿心弥猕猴桃新鲜亚特奇异果水果陕西特产非徐香翠香5斤装包邮", "group_price": 17.8, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "五合一手机镜头送万花筒 0.63x广角+198鱼眼+15x微距+2x增距+CPL", "img_url": "http://image-paile.paile8.com/web/153500463229354fd.jpg", "cargo_id": 1713, "price": 88.0, "name": "五合一手机镜头送万花筒 0.63x广角+198鱼眼+15x微距+2x增距+CPL", "group_price": 80.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "[【可改密码】复古密码本带锁日记本加厚韩国创意手账本学生记事本文具笔记本子", "img_url": "http://image-paile.paile8.com/web/153461001722327ci.JPG", "cargo_id": 1689, "price": 26.8, "name": "[【可改密码】复古密码本带锁日记本加厚韩国创意手账本学生记事本文具笔记本子", "group_price": 25.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "【可自定义密码】A5复古密码本创意学生日记本带锁笔记本日韩国加厚手账本笔记本文具", "img_url": "http://image-paile.paile8.com/web/153460947877120gb.JPG", "cargo_id": 1686, "price": 48.0, "name": "【可自定义密码】A5复古密码本创意学生日记本带锁笔记本日韩国加厚手账本笔记本文具", "group_price": 38.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "卸妆新品A.T眼唇卸妆巾 a.t卸妆巾纯植物一次性便携眼部唇部面部卸妆巾", "img_url": "http://image-paile.paile8.com/web/15342258694821oo.jpg", "cargo_id": 1620, "price": 68.0, "name": "卸妆新品A.T眼唇卸妆巾 a.t卸妆巾纯植物一次性便携眼部唇部面部卸妆巾", "group_price": 67.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "欧诗莱顿男士皮带真皮牛皮腰带平滑扣商务青年裤带男韩版潮男休闲", "img_url": "http://image-paile.paile8.com/web/153403704274715nb.jpg", "cargo_id": 1591, "price": 39.9, "name": "欧诗莱顿男士皮带真皮牛皮腰带平滑扣商务青年裤带男韩版潮男休闲", "group_price": 9.9, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "女式休闲皮鞋2018韩版时尚潮流休闲皮鞋", "img_url": "http://image-paile.paile8.com/paile8/ios/createt0RHRV88HQWR7HVAK/b20180809204813CargoImage.jpg", "cargo_id": 1554, "price": 69.0, "name": "女式休闲皮鞋2018韩版时尚潮流休闲皮鞋", "group_price": 49.0, "id": "", "redirect_url": "", "seq": "", "status": 1 }]
    let newArr = this.data[arr].concat(goodList);
    setTimeout(() => {
      this.setData({
        [arr]: newArr,
      }, function () {
        wx.hideLoading();
      })
    }, 1000)
  }
})