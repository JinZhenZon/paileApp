/**
 * @public
 * @author jinzhenzong
 * @description 商品详情
 * @param { number|string } 商品code
 * @todo 支持传入cargocode生成商品详情，详情图片支持预览
 */
import { Utils } from "../../../utils/util.js";
Component({
  properties: {
    cargoCode:{
      type:["number","string"],
      value:0,
    }
  },
  data: {
    descArr: [],
    utils:"",
  },
  ready(){
    this.setData({
      utils:new Utils()
    })
    this.getDetail();
  },
  methods: {
    getDetail(){
      let _this = this;
      this.data.utils.ajax({
        url: "paile-service/api/cargoHandler/getCargoDetailsByCargoId",
        data: {
          cargoId: _this.data.cargoCode,
        },
        success(res){
          _this.setData({
            descArr: res.data.datas
          })
        }
      })
    },
    imageShow(e){
      let arr = e.currentTarget.dataset.list;
      let list =  arr.filter(item=>{
        if(item.type == 2){
          return item;
        }
      }).map(item=>{
        return item.img_url;
      })
      wx.previewImage({
        urls: list,
      })
    }
  }
})
