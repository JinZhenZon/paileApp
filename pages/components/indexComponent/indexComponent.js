// pages/components/index/index.js
import { Utils } from "../../../utils/util.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  ready() {
    this.setData({
      utils: new Utils()
    })
    // 品质优选
    this.getAllQuality();
    // banner
    this.getAllBanner();
    // 免费试用banner
    // this.getAllActivity();
    // 品质团购
    this.getAllGroup();
    // 获取爆款
    this.getAllHotModel();
  },
  /**
   * 组件的初始数据
   */
  data: {
    utils: "",
    startIndex: 0,
    bannerList: [],
    bannerImg: "http://paile8.com/images/activity/1.png",
    goodList: [],
    hotList: [],
    groupList:[],
    islast:false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @description 获取轮播图
     */
    getAllBanner() {
      let _this = this
      this.data.utils.ajax({
        url: "paile-service/api/homePageManage/getAllBanner",
        data: {
          type: 1,
        },
        success(res) {
          _this.setData({
            bannerList: res.data.datas
          })
        },
      })
    },
    /**
     * @description 获取免费试用banner
     */
    getAllActivity(){
      let _this = this;
      this.data.utils.ajax({
        url:"paile-service/api/homePageManage/getAllActivity",
        success(res){
          _this.setData({
            bannerImg: res.data.datas[0].img_url
          })
        }
      })
    },
    /**
     * @description 获取品质爆款
     */
    getAllHotModel(){
      let _this = this;
      this.data.utils.ajax({
        url: "paile-service/api/homePageManage/getAllHotModel",
        data: {
          startIndex: 0,
          length: 8,
        },
        success(res) {
          console.log(res);
          _this.setData({
            hotList: res.data.datas.datas
          })
        }
      })
    },
    /**
     * @description 获取品质团购
     */
    getAllGroup() {
      let _this = this;
      this.data.utils.ajax({
        url:"paile-service/api/homePageManage/getAllGroup",
        data:{
          startIndex:0,
          length:8,
        },
        success(res){
          _this.setData({
            groupList:res.data.datas.datas
          })
        }
      })
    },
    /**
     * @description 获取品质优选商品信息
     */
    getAllQuality() {
      if (this.data.islast){
        return false;
      }
      let _this = this
      // 通用库方法
      this.data.utils.ajax({
        url: "paile-service/api/homePageManage/getAllQuality",
        data: {
          startIndex: this.data.startIndex,
          length: 16,
          orderType: 0,
          descType: 1,
        },
        success(request) {
          // 请求到的数据
          let request_arr = request.data.datas.datas;
          // 已有数据
          let arr = _this.data.goodList;
          // 追加到已有数据
          arr.push(...request_arr)
          let start = "";
          // 判断是否到最后了
          if (request_arr.length < 16) {
            _this.setData({
              islast:true,
            })

          } else {
            start = this.data.startIndex + 16;
          }
          // 赋值data
          _this.setData({
            goodList: arr,
            startIndex: start
          })
        },
        /**
         * 失败回调
         */
        fail(error) {
          console.log(error);
        }
      });
    },
  }
})
