// pages/components/recommendedList/recommendedList.js
import { Utils } from "../../../utils/util.js";
Component({
  /**
   * 组件的初始数据
   */
  data: {
    goodList:[],
    utils:""
  },
  /**
   * 组件准备就绪
   */ 
  ready(){
    setTimeout(()=>{
      this.setData({
        utils: new Utils(),
      })
      for (let i = 0; i < 10; i++) {
        this.getGoodList(i);
      }
    },60)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * @method
      * @desc   底部推荐商品
      * */
    getGoodList(type) {
      let _this = this;
      this.data.utils.ajax({
        url:"paile-service/api/cargoHandler/getCargoesByType",
        data: {
          type,
          index:1,
          length:3,
          orderType: 3,
          descType: 1
        },
        success(res){
          let dataList = res.data.datas;
          if (dataList.length > 0) {
            let arr = _this.data.goodList;
            arr.push(...dataList);
            _this.setData({
              goodList:arr,
            })
          }
        }
      })
    }
  }
})
