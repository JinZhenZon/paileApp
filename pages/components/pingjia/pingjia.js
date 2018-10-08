/**
 * @public
 * @author jinzhenzong
 * @description 评价组件
 * @todo 传入商品id 获取评论
 */
import { Utils } from "../../../utils/util.js";
Component({
  properties: {
    cargoCode: {
      type: ["number", "string"],
      value: 0
    }
  },
  data: {
    msg: [],
    showAll: true,
    utils: "",
  },
  ready() {
    this.setData({
      utils: new Utils()
    })
    this.getMsg();
  },
  methods: {
    seeImage(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.list,
      })
    },
    getMsg() {
      let _this = this
      this.data.utils.ajax({
        url: "forum/discussion/query/page",
        data: {
          cargoCode: this.data.cargoCode,
          pageSize: 10,
          pageNumber: 1,
        },
        success(res) {
          if (res.data.data.dataList.length > 0) {
            let list = res.data.data.dataList.filter((item) => {
              return (item.attachPictureList.length != 0 || item.subject.trim().length != 0)
            })
            if (list.length > 0) {
              _this.setData({
                "msg[0]": list[0],
              })
            } else {
              res.data.data.dataList[0].subject = "该用户没有留下任何评价"
              _this.setData({
                msg: res.data.data.dataList[0],
              })
            }
          }
        }
      })
    }
  }
})