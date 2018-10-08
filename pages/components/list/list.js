/**
 * @public
 * @author jinzhenzong
 * @description 商品列表（一排两个）
 * @param { array } 商品列表
 * @todo 支持传入array生成商品列表（商品id支持cargo_id或id,缩略图URL支持img_url、cover_url、商品标题支持name、商品价格支持price、销量支持sales_count）、缩略图懒加载、加载失败图
 * 
 */
Component({
  properties: {
      list:{
        type:"array",
        value:[],
      }
  },
  methods: {
    /**
     * @description 图片加载失败显示默认图片
     */
    errorImg(e){
      let index = e.currentTarget.dataset.errorimg;
      let imgObj = "list[" + index + "].img_url";
      this.setData({
        [imgObj]: "/image/errorimg.png",
      })
    }
  }
})
