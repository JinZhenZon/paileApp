// pages/orderInsert/orderInsert.js
Page({
  onLoad(option) {
    wx.hideLoading();
    // option.orderNumber
    this.setData({
      orderNumber: "joijoisojaadasjopdopi",
    }, function () {
      let obj = { "addressBlock": "东城区", "addressCity": "北京市", "addressProvince": "北京市", "addressStreet": "软件园路泰山街道6号", "cargoAmount": 5900, "cargoList": [{ "cargoCode": 6, "cargoCount": 1, "cargoPicture": "http://image-paile.test.upcdn.net/web/152393576097086hn.jpg", "cargoSpec": "颜色:白色;尺码:120cm", "cargoTitle": "2018新款儿童蕾丝公主裙女童装春装中大童春款韩版洋气潮连衣裙子", "orderNumber": "01153637702400000000", "originalPrice": 5900, "presentPrice": 5900 }], "contactName": "金振宗", "contactPhone": "17695518131", "createTime": "2018-09-08 11:23:44", "deleteTime": null, "description": "", "discountAmount": 0, "distributionType": 1, "expressList": [], "finalAmount": 5900, "freightInsuranceAmount": 0, "freightInsuranceMode": 0, "id": 4378, "isDelete": false, "isFreightInsurance": false, "orderNumber": "01153637702400000000", "orderType": 1, "shareCode": null, "shopCode": 7, "shopIcon": "http://image-paile.test.upcdn.net/web/152393021491869al.png", "shopName": "万宝旗舰店", "status": 5, "updateTime": "2018-09-08 11:23:47", "userCode": 96 }
      this.setData({
        orderInfo: obj
      })
    })
    let good = [{ "descr": "护腰靠枕", "img_url": "http://image-paile.test.upcdn.net/web/152394899450188hm.png", "cargo_id": 8, "price": 35.0, "name": "护腰靠枕", "sales_count": 1457, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "LiLiA眼霜去淡化黑眼圈眼袋细纹脂肪粒紧致补水保湿提拉学生男女", "img_url": "http://image-paile.paile8.com/web/152397038968418bd.jpg", "cargo_id": 37, "price": 69.9, "name": "LiLiA眼霜去淡化黑眼圈眼袋细纹脂肪粒紧致补水保湿提拉学生男女", "sales_count": 184, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "滴露滋润清新沐浴露 持久留香男士女士家庭装量贩装沐浴乳", "img_url": "http://image-paile.paile8.com/web/152397110920191ld.jpg", "cargo_id": 38, "price": 31.9, "name": "滴露滋润清新沐浴露 持久留香男士女士家庭装量贩装沐浴乳", "sales_count": 161, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "小浣熊多功能学生宿舍家用火锅煮面小锅1-2人3-4迷你小电锅", "img_url": "http://image-paile.paile8.com/web/152397172480333ki.jpg", "cargo_id": 39, "price": 48.9, "name": "小浣熊多功能学生宿舍家用火锅煮面小锅1-2人3-4迷你小电锅", "sales_count": 202, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "萃植轩抑菌洗衣液瓶装内裤内衣袋装手洗补充装家庭装机洗5斤男女", "img_url": "http://image-paile.paile8.com/web/152397203120152oj.jpg", "cargo_id": 40, "price": 25.9, "name": "萃植轩抑菌洗衣液瓶装内裤内衣袋装手洗补充装家庭装机洗5斤男女", "sales_count": 223, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "老北京布鞋女平跟防滑软底春季中老年妈妈鞋低帮平底圆头软底单鞋", "img_url": "http://image-paile.paile8.com/web/152397243564337ei.jpg", "cargo_id": 41, "price": 56.0, "name": "老北京布鞋女平跟防滑软底春季中老年妈妈鞋低帮平底圆头软底单鞋", "sales_count": 171, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "COCOVEL香氛沐浴露持久留香装男女通用补水滋润保湿香水乳液", "img_url": "http://image-paile.paile8.com/web/152397296331371gc.jpg", "cargo_id": 42, "price": 15.8, "name": "COCOVEL香氛沐浴露持久留香装男女通用补水滋润保湿香水乳液", "sales_count": 447, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "圆桌骑士磨砂透明长款雨衣雨披女成人户外男式单人徒步雨衣学生", "img_url": "http://image-paile.paile8.com/web/152397341169458be.jpg", "cargo_id": 43, "price": 39.9, "name": "圆桌骑士磨砂透明长款雨衣雨披女成人户外男式单人徒步雨衣学生", "sales_count": 1416, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "【粒上皇-红松子208g】东北开口手剥松子原味休闲零食特产坚果", "img_url": "http://image-paile.paile8.com/web/152397360380910gc.jpg", "cargo_id": 44, "price": 29.9, "name": "【粒上皇-红松子208g】东北开口手剥松子原味休闲零食特产坚果", "sales_count": 1610, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "修正祛痘印淡化膏去痘痘坑痘疤修复凹洞芦荟胶霜产品前女五男士强", "img_url": "http://image-paile.paile8.com/web/152397415433562ee.jpg", "cargo_id": 45, "price": 66.9, "name": "修正祛痘印淡化膏去痘痘坑痘疤修复凹洞芦荟胶霜产品前女五男士强", "sales_count": 542, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "好肌汇去黑头收缩毛孔套装吸祛黑头导出液鼻贴粉刺撕拉式面膜男女", "img_url": "http://image-paile.paile8.com/web/152397459146645dd.jpg", "cargo_id": 46, "price": 39.9, "name": "好肌汇去黑头收缩毛孔套装吸祛黑头导出液鼻贴粉刺撕拉式面膜男女", "sales_count": 352, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "高姿护肤品套装女补水保湿乳液少女学生党男旗舰店正品水乳化妆品", "img_url": "http://image-paile.paile8.com/web/152397505825917ge.jpg", "cargo_id": 47, "price": 99.0, "name": "高姿护肤品套装女补水保湿乳液少女学生党男旗舰店正品水乳化妆品", "sales_count": 63, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "温碧泉洗面奶女男收缩毛孔学生补水保湿清洁泡沫洁面乳不紧绷正品", "img_url": "http://image-paile.paile8.com/web/152397529962377bb.jpg", "cargo_id": 48, "price": 29.9, "name": "温碧泉洗面奶女男收缩毛孔学生补水保湿清洁泡沫洁面乳不紧绷正品", "sales_count": 255, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "无线蓝牙耳机iphone迷你超小airpds苹果耳式钛美特 i6", "img_url": "http://image-paile.paile8.com/web/152401091289798ea.jpg", "cargo_id": 49, "price": 78.0, "name": "无线蓝牙耳机iphone迷你超小airpds苹果耳式钛美特 i6", "sales_count": 538, "id": "", "redirect_url": "", "seq": "", "status": 1 }, { "descr": "正宗砀山梨酥梨果园现摘孕妇水果非香梨鸭梨贡梨", "img_url": "http://image-paile.paile8.com/web/15240191562290cc.jpg", "cargo_id": 50, "price": 20.9, "name": "正宗砀山梨酥梨果园现摘孕妇水果非香梨鸭梨贡梨", "sales_count": 2024, "id": "", "redirect_url": "", "seq": "", "status": 1 }]
    setTimeout(()=>{
      this.setData({
        goodArr: good
      })
    },1500)
    

  },
  onShow() {

  },
  data:{
    orderInfo:{},
    goodArr: [],
    orderNumber: ""
    
  }


})