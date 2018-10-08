// pages/components/quickView/quickView.js
import {Utils} from "../../../utils/util.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listIndex: {
      type: "number",
      value: -1,
    }
  },
  ready(){
    this.setData({
      utils:new Utils()
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    listArr : [],
    utils:"",
    start:0,
    islast:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getList(){
      if (this.data.islast) {
        return false
      }
      let _this = this;
      this.data.utils.ajax({
        url:"paile-service/api/cargoHandler/getCargoesByType",
        data:{
          type: this.data.listIndex,
          index:this.data.start,
          orderType:4,
          descType:1,
          length:15,
        },
        success(res){
          let arr = _this.data.listArr;
          arr.push(...res.data.datas);
          if(res.data.datas.length == 15){
              _this.setData({
                start: this.data.start + 15
              })
          }else{
            _this.setData({
              islast: true,
            })
          }
          _this.setData({
            listArr:arr
          })
        }
      })
    }
  }
})
