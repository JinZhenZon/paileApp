// pages/groupTrait/groupTrait.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNum: 0,
    allArr: [],
    pandArr: [],
    sendArr: [],
    forArr: [],
    evalArr: [],
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    let arr =[
      {
        "addressBlock": "东城区",
        "addressCity": "北京市",
        "addressProvince": "北京市",
        "addressStreet": "软件园路泰山街道6号",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153674646200000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "金振宗",
        "contactPhone": "17695518131",
        "createTime": "2018-09-12 18:01:03",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-13 18:01:03",
          "groupbuyCode": 400182,
          "joinedCount": 1,
          "remainingTime": 23909,
          "requiredCount": 2,
          "startTime": "2018-09-12 18:01:03",
          "teamworkList": [
            {
              "userCode": 105,
              "userIcon": "http://image-paile.paile8.com/paile8vx/15356177600960eh",
              "userNickname": "金振宗111"
            }
          ],
          "userCode": 105
        },
        "id": 1282,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153674646200000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 7,
        "updateTime": "2018-09-12 18:01:10",
        "userCode": 105
      },
      {
        "addressBlock": "其它区",
        "addressCity": "乌海市",
        "addressProvince": "内蒙古",
        "addressStreet": "bxhjdjjdjf",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153674633500000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "jfh",
        "contactPhone": "11111111111",
        "createTime": "2018-09-12 17:58:56",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-13 17:58:56",
          "groupbuyCode": 400181,
          "joinedCount": 1,
          "remainingTime": 23782,
          "requiredCount": 2,
          "startTime": "2018-09-12 17:58:56",
          "teamworkList": [
            {
              "userCode": 110,
              "userIcon": "http://thirdwx.qlogo.cn/mmopen/vi_32/5TsrHiakC9v7gUqWucfQlN40JQurkGW9ZKI0icCZuqj0AMu1Y8TVa4GTbuXMpWLziaqGZOcn1oab4XaUhibLnyBm9w/132",
              "userNickname": "LD"
            }
          ],
          "userCode": 110
        },
        "id": 1281,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153674633500000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 7,
        "updateTime": "2018-09-12 17:59:02",
        "userCode": 110
      },
      {
        "addressBlock": "其它区",
        "addressCity": "乌海市",
        "addressProvince": "内蒙古",
        "addressStreet": "bxhjdjjdjf",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153672448400000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "jfh",
        "contactPhone": "11111111111",
        "createTime": "2018-09-12 11:54:45",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-13 11:54:45",
          "groupbuyCode": 400180,
          "joinedCount": 0,
          "remainingTime": 1931,
          "requiredCount": 2,
          "startTime": "2018-09-12 11:54:45",
          "teamworkList": [],
          "userCode": 110
        },
        "id": 1280,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153672448400000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 5,
        "updateTime": "2018-09-12 11:59:36",
        "userCode": 110
      },
      {
        "addressBlock": "其它区",
        "addressCity": "乌海市",
        "addressProvince": "内蒙古",
        "addressStreet": "bxhjdjjdjf",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153672400300000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "jfh",
        "contactPhone": "11111111111",
        "createTime": "2018-09-12 11:46:43",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-13 11:46:43",
          "groupbuyCode": 400179,
          "joinedCount": 1,
          "remainingTime": 1449,
          "requiredCount": 2,
          "startTime": "2018-09-12 11:46:43",
          "teamworkList": [
            {
              "userCode": 110,
              "userIcon": "http://thirdwx.qlogo.cn/mmopen/vi_32/5TsrHiakC9v7gUqWucfQlN40JQurkGW9ZKI0icCZuqj0AMu1Y8TVa4GTbuXMpWLziaqGZOcn1oab4XaUhibLnyBm9w/132",
              "userNickname": "LD"
            }
          ],
          "userCode": 110
        },
        "id": 1279,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153672400300000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 7,
        "updateTime": "2018-09-12 11:46:51",
        "userCode": 110
      },
      {
        "addressBlock": "农安县",
        "addressCity": "长春市",
        "addressProvince": "吉林省",
        "addressStreet": "少喝点好的结局",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153607507500000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "嗯哼",
        "contactPhone": "18052128472",
        "createTime": "2018-09-04 23:31:16",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-05 23:31:16",
          "groupbuyCode": 400178,
          "joinedCount": 0,
          "remainingTime": 0,
          "requiredCount": 2,
          "startTime": "2018-09-04 23:31:16",
          "teamworkList": [],
          "userCode": 106
        },
        "id": 1260,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153607507500000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 3,
        "updateTime": "2018-09-05 23:31:43",
        "userCode": 106
      },
      {
        "addressBlock": "东城区",
        "addressCity": "北京市",
        "addressProvince": "北京市",
        "addressStreet": "高出一筹同一天",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153607330200000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "啊",
        "contactPhone": "18052128472",
        "createTime": "2018-09-04 23:01:43",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-05 23:01:43",
          "groupbuyCode": 400177,
          "joinedCount": 0,
          "remainingTime": 0,
          "requiredCount": 2,
          "startTime": "2018-09-04 23:01:43",
          "teamworkList": [],
          "userCode": 106
        },
        "id": 1255,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153607330200000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 3,
        "updateTime": "2018-09-05 23:03:00",
        "userCode": 106
      },
      {
        "addressBlock": "西青区",
        "addressCity": "天津市",
        "addressProvince": "天津市",
        "addressStreet": "测试",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153602721600000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "张刚",
        "contactPhone": "18260702564",
        "createTime": "2018-09-04 10:13:36",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-05 10:13:36",
          "groupbuyCode": 400173,
          "joinedCount": 0,
          "remainingTime": 0,
          "requiredCount": 2,
          "startTime": "2018-09-04 10:13:36",
          "teamworkList": [],
          "userCode": 99
        },
        "id": 1239,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153602721600000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 3,
        "updateTime": "2018-09-05 10:13:48",
        "userCode": 99
      },
      {
        "addressBlock": "农安县",
        "addressCity": "长春市",
        "addressProvince": "吉林省",
        "addressStreet": "少喝点好的结局",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 575,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0FJGAFGZL40DRNP4/b20180821141221CargoImage.jpg",
            "cargoSpec": "颜色:黄色;尺寸:L",
            "cargoTitle": "测试",
            "orderNumber": "02153607513200000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "嗯哼",
        "contactPhone": "18052128472",
        "createTime": "2018-09-04 23:32:13",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-05 10:14:29",
          "groupbuyCode": 400174,
          "joinedCount": 2,
          "remainingTime": 0,
          "requiredCount": 2,
          "startTime": "2018-09-04 10:14:29",
          "teamworkList": [
            {
              "userCode": 99,
              "userIcon": "http://thirdwx.qlogo.cn/mmopen/vi_32/q18KPCn1muib5kdpJ4fGIsdQ0DdfxyvbaTiaf0PNElrGDt3zLibXwic3mabzHRssfRWVht1Bf7fRj3liaicjX3OQ7WsA/132",
              "userNickname": "拍乐网"
            },
            {
              "userCode": 106,
              "userIcon": "http://image-paile.paile8.com/paile8/IMG_0377.GIF",
              "userNickname": "z小志"
            }
          ],
          "userCode": 99
        },
        "id": 1262,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153607513200000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 8,
        "updateTime": "2018-09-04 23:32:19",
        "userCode": 106
      },
      {
        "addressBlock": "东城区",
        "addressCity": "北京市",
        "addressProvince": "北京市",
        "addressStreet": "软件园路泰山街道6号",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 575,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0FJGAFGZL40DRNP4/b20180821141221CargoImage.jpg",
            "cargoSpec": "颜色:黄色;尺寸:L",
            "cargoTitle": "测试",
            "orderNumber": "02153602726800000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "张刚",
        "contactPhone": "18260702564",
        "createTime": "2018-09-04 10:14:29",
        "deleteTime": null,
        "description": "",
        "discountAmount": 0,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": 1,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": {
          "endTime": "2018-09-05 10:14:29",
          "groupbuyCode": 400174,
          "joinedCount": 2,
          "remainingTime": 0,
          "requiredCount": 2,
          "startTime": "2018-09-04 10:14:29",
          "teamworkList": [
            {
              "$ref": "$.data.dataList[7].groupbuy.teamworkList[0]"
            },
            {
              "$ref": "$.data.dataList[7].groupbuy.teamworkList[1]"
            }
          ],
          "userCode": 99
        },
        "id": 1240,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153602726800000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 8,
        "updateTime": "2018-09-04 23:32:19",
        "userCode": 99
      },
      {
        "addressBlock": "农安县",
        "addressCity": "长春市",
        "addressProvince": "吉林省",
        "addressStreet": "少喝点好的结局",
        "cargoAmount": 1,
        "cargoList": [
          {
            "cargoCode": 577,
            "cargoCount": 1,
            "cargoPicture": "http://image-paile.paile8.com/paile8/ios/createt0APMSW1M1EGRQLI3/b20180831152204CargoImage.jpg",
            "cargoSpec": "颜色:黄色",
            "cargoTitle": "123321",
            "orderNumber": "02153607509600000000",
            "originalPrice": 1,
            "presentPrice": 1
          }
        ],
        "contactName": "嗯哼",
        "contactPhone": "18052128472",
        "createTime": "2018-09-04 23:31:36",
        "deleteTime": null,
        "description": "",
        "discountAmount": null,
        "distributionType": 1,
        "expressList": [],
        "finalAmount": null,
        "freightInsuranceAmount": 0,
        "freightInsuranceMode": 0,
        "groupbuy": null,
        "id": 1261,
        "isDelete": false,
        "isFreightInsurance": false,
        "orderNumber": "02153607509600000000",
        "orderType": 2,
        "shareCode": null,
        "shopCode": 84,
        "shopIcon": "http://image-paile.paile8.com/web/153179213359616hn.jpg",
        "shopName": "测试",
        "status": 3,
        "updateTime": "2018-09-04 23:31:36",
        "userCode": 106
      }
    ]
   
    setInterval(()=>{
      let list = [];
      arr.map(item => {
        if (item.status == 7) {
          if (item.groupbuy.remainingTime != null) {
            if (item.groupbuy.remainingTime > 0) {
              item.groupbuy.remainingTime = item.groupbuy.remainingTime - 1;
            } else {
              item.groupbuy.remainingTime = 0;
            }
          }
        }
        list.push(item);
      })
      this.setData({
        allArr:list
      })
    },1000)
    
    










  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
    // 默认
  },
  swiperChange(e) {
    console.log(e.detail.current);
    this.setData({
      currentNum: e.detail.current,
    })
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