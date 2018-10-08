/**
 * @public
 * @author jinzhenzong
 * @description 返回顶部
 * @param { boolean } 页面是否是scrollview滚动
 * @param { boolean } 是否显示该组件
 * @todo 支持scrollview和普通的页面滚动（通过参数isscrollview判断）返回到顶部
 */
Component({
  properties: {
      isScrollView:{
        type:"boolean",
        value:false,
      },
      isShow:{
        type:"boolean",
        value:false,
      }
  },
  data: {
  },
  methods: {
    /**
     * @description 返回顶部事件
     * @emits "gotop"
     * @event 触发scrollview的返回顶部
     */
    gotop(){
      // scrollview
      /**
       * 触发scrollview的函数
       */
      if(this.data.isScrollView){
        this.triggerEvent("gotop",{},{});
      }else{
        // 主要作用：page返回顶部
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
      }
    }
  }
})
