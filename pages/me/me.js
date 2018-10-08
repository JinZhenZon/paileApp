// pages/me/me.js
import { Utils } from "../../utils/util.js"
wx.showLoading({
  title: "加载中",
  mask: true,
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utils: "",
    userInfo: {},
    goodList: [
      {
        "descr": "2018新款儿童蕾丝公主裙女童装春装中大童春款韩版洋气潮连衣裙子",
        "img_url": "http://image-paile.test.upcdn.net/web/152393576097086hn.jpg",
        "cargo_id": 6,
        "price": 59,
        "name": "2018新款儿童蕾丝公主裙女童装春装中大童春款韩版洋气潮连衣裙子",
        "sales_count": 1158,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "护腰靠枕",
        "img_url": "http://image-paile.test.upcdn.net/web/152394899450188hm.png",
        "cargo_id": 8,
        "price": 35,
        "name": "护腰靠枕",
        "sales_count": 1457,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "格力电风扇 转页扇迷你扇小台式学生宿舍鸿运扇 静音家用",
        "img_url": "http://image-paile.test.upcdn.net/web/152395054538127bb.jpg",
        "cargo_id": 9,
        "price": 88,
        "name": "格力电风扇 转页扇迷你扇小台式学生宿舍鸿运扇 静音家用",
        "sales_count": 868,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "波斯顿男士面膜美白补水控油祛痘印祛斑淡斑提亮肤色收缩毛孔",
        "img_url": "http://image-paile.test.upcdn.net/web/152395129195362fh.jpg",
        "cargo_id": 10,
        "price": 99,
        "name": "波斯顿男士面膜美白补水控油祛痘印祛斑淡斑提亮肤色收缩毛孔",
        "sales_count": 1917,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "欧洲站男鞋真皮韩版潮鞋百搭春季运动鞋男士休闲鞋皮鞋透气白色鞋",
        "img_url": "http://image-paile.test.upcdn.net/web/152395150815765oj.jpg",
        "cargo_id": 11,
        "price": 298,
        "name": "欧洲站男鞋真皮韩版潮鞋百搭春季运动鞋男士休闲鞋皮鞋透气白色鞋",
        "sales_count": 1224,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "小心恶犬玩具 夹骨头的狗玩具 恶狗咬人偷骨头咬人狗整蛊吓人玩具",
        "img_url": "http://image-paile.test.upcdn.net/web/152395170548557oh.jpg",
        "cargo_id": 12,
        "price": 59,
        "name": "小心恶犬玩具 夹骨头的狗玩具 恶狗咬人偷骨头咬人狗整蛊吓人玩具",
        "sales_count": 1324,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "夏装男士短袖T恤夏季V领2018早春新款",
        "img_url": "http://image-paile.paile8.com/web/152395720123379jc.jpg",
        "cargo_id": 15,
        "price": 79,
        "name": "夏装男士短袖T恤夏季V领2018早春新款",
        "sales_count": 2042,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "手推式扫地拖地一体机家用无线电动机器人",
        "img_url": "http://image-paile.paile8.com/web/152395812289462bd.jpg",
        "cargo_id": 17,
        "price": 189,
        "name": "手推式扫地拖地一体机家用无线电动机器人",
        "sales_count": 1980,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "午憩宝折叠床单人床家用成人午休床午睡躺椅",
        "img_url": "http://image-paile.paile8.com/web/152395834732964gc.jpg",
        "cargo_id": 19,
        "price": 94,
        "name": "午憩宝折叠床单人床家用成人午休床午睡躺椅",
        "sales_count": 1642,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      },
      {
        "descr": "LiLiA眼霜去淡化黑眼圈眼袋细纹脂肪粒紧致补水保湿提拉学生男女",
        "img_url": "http://image-paile.paile8.com/web/152397038968418bd.jpg",
        "cargo_id": 37,
        "price": 69.9,
        "name": "LiLiA眼霜去淡化黑眼圈眼袋细纹脂肪粒紧致补水保湿提拉学生男女",
        "sales_count": 184,
        "id": "",
        "redirect_url": "",
        "seq": "",
        "status": 1
      }
    ],
    isLogin: false,
  },
  onLoad: function (options) {
    wx.hideLoading();
    this.setData({
      utils: new Utils,
    })
    this.getuserLogin();
  },
  onReady: function () {
  },
  onReachBottom: function () {

  },
  getuserLogin() {
    this.data.utils.storage.Get("paileUser").then(res => {
      console.log(res);
      this.setData({
        isLogin: true,
        userInfo: res
      })
    }).catch(error => {
    })
  },
  /**
   * @description 调用wx-login获取code 通过code获取用户信息
   * 
   */
  login(e) {
    let _this = this;
    console.log(e)
    wx.login({
      timeout: 10000,
      success: (result) => {
        this.data.utils.ajax({
          url: "login/wechat",
          method: "post",
          data: {
            source: "miniapp",
            code: result.code
          },
          success(res) {
            console.log(res);
          },
          fail(error) {
            console.log(2)
          }
        })
      },
      fail: (error) => {
        console.log(error);
      },
      complete: () => { }
    });
  }
})