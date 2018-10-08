
import { Utils } from "../../../utils/util.js"
import { remove, cancel, confirm, pany } from "../../../utils/order.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: "array",
      value: [],
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    utils: "",
    urded: false,
    modelConfig: {

    }
  },
  ready() {
    this.setData({
      utils: new Utils()
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    /**
     * @todo 商铺头像找不到替换方案
     */
    errorImgShop(e) {
      let index = e.currentTarget.dataset.errorimg;
      let imgObj = "list[" + index + "].shopIcon";
      this.setData({
        [imgObj]: "/image/errorimg.png",
      })
    },
    /**
     * @todo 商品图片找不到替换方案
     */
    errorImgCargo(e) {
      let index = e.currentTarget.dataset.errorimg;
      let imgObj = "list[" + index + "].cargoList[0].cargoPicture";
      this.setData({
        [imgObj]: "/image/errorimg.png",
      })
    },
    /**
       * @description 删除订单
       * @todo 删除订单，触发视图，小于一定数量则通知父页面加载更多条
       */
    removeOrder(e) {
      let _this = this;
      let orderInfo = e.currentTarget.dataset.orderinfo;
      let index = e.currentTarget.dataset.index;
      remove(96, orderInfo, index).then(() => {
        let list = _this.data.list;
        list.splice(index, 1);
        _this.setData({
          modelConfig: {
            title: "删除成功",
            iconClass: "icon-duihao",
          },
          list
        })
        if (list.length < 5) {
          _this.triggerEvent("GetNextPage");
        }
        _this.selectComponent("#Model").showModel(1500)
      }).catch((errorMsg) => {
        _this.setData({
          modelConfig: {
            title: errorMsg,
            iconClass: "icon-cuowu",
          }
        })
        _this.selectComponent("#Model").showModel(1500)
      })
    },
    /**
     * @description 催发货
     */
    urdeOrder() {
      this.setData({
        modelConfig: {
          title: "已通知商家",
          iconClass: "icon-duihao",
        }
      })
      this.selectComponent("#Model").showModel(1500)
    },
    /**
    * @description 取消订单
    * @todo 取消订单 更新列表 不足5条通知父页面继续加载更多
    */
    cancelOrder(e) {
      let _this = this;
      let orderInfo = e.currentTarget.dataset.orderinfo;
      let index = e.currentTarget.dataset.index;
      cancel(96, orderInfo, index).then(() => {
        let list = _this.data.list;
        list.splice(index, 1);
        _this.setData({
          modelConfig: {
            title: "取消成功",
            iconClass: "icon-duihao",
          },
          list
        })
        if (list.length < 5) {
          _this.triggerEvent("GetNextPage");
        }
        _this.selectComponent("#Model").showModel(1500)
      }).catch((errorMsg) => {
        _this.setData({
          modelConfig: {
            title: errorMsg,
            iconClass: "icon-cuowu",
          }
        })
        _this.selectComponent("#Model").showModel(1500)
      })
    },
    /**
     * @description 确认收货
     * @todo 确认收货 修改status
     */
    confirmOrder(e) {
      let _this = this;
      let orderInfo = e.currentTarget.dataset.orderinfo;
      let index = e.currentTarget.dataset.index;
      confirm(96, orderInfo).then(() => {
        let list = _this.data.list;
        list[index].status = 15;
        _this.setData({
          modelConfig: {
            title: "收货成功",
            iconClass: "icon-duihao",
          },
          list
        })
        _this.selectComponent("#Model").showModel(1500)
      }).catch(
        () => {
          _this.setData({
            modelConfig: {
              title: errorMsg,
              iconClass: "icon-cuowu",
            }
          })
          _this.selectComponent("#Model").showModel(1500)
        }
      )

    },
    /**
     * @desctiption 查看物流
     */
    logistics(e) {
      return false;
    },
    /**
     * @description 前往评价 
     */
    evalOrder(e) {
      return false
    },
    /**
     * @desctiprion 继续支付
     */
    panyOrder(e) {
      pany();
    },
    /**
     * @description 邀请好友
     * @todo 分享给微信好友
     */
    invit(e){
      let _this = this;
      let orderInfo = e.currentTarget.dataset.orderinfo;
      if (orderInfo.experienceTeam.remainingInvitationTime <= 0){
        _this.setData({
          modelConfig: {
            title: "已结束分享",
            iconClass: "icon-cuowu",
          }
        })
        _this.selectComponent("#Model").showModel(1500)
      }else{
        this.data.utils.ajax({
          url:"experience/team/share",
          method:"post",
          data:{
            shareUserCode: 96,
            experienceTeamCode: orderInfo.experienceTeam.teamCode,
            shareDestination: 0
          },
          success(res){
            console.log(res);
          }
        })
      }
    }
  }
})