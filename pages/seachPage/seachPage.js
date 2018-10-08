import { Utils } from "../../utils/util.js";
import regeneratorRuntime from '../../utils/runtime.js'
Page({
  onLoad() {
    wx.hideLoading();
    this.setData({
      utils: new Utils()
    })
    wx.getStorage({
      key: 'search_history',
      success: (result) => {
        this.setData({
          history: result.data,
        })
      },
      fail: () => {
        this.setData({
          history: [],
        })
      },
      complete: () => { }
    });
  },
  onReady() {
    this.gethotList();
  },
  data: {
    utils: "",
    normalSearch: "搜索",
    hot: [],
    history: [],
    input_text:"",
  },
  /**
   * @function
   * @description 获取热门搜索列表
   */
  gethotList() {
    let _this = this;
    this.data.utils.ajax({
      url: "paile-service/api/hotSearchHandler/getHotSearch",
      success(res) {
        _this.setData({
          hot: res.data.datas,
        });
      }
    })
  },
  /**
   * @function
   * @description 热门搜索点击事件 调用gosearch方法
   */
  searchHot(e) {
    let name = e.currentTarget.dataset.name;
    this.gosearch(name);
  },
  /**
   * @description 监听input变化并且进行绑定
   */
  bindText(name){
    this.setData({
      input_text: name.detail.text,
    })
  },
  /**
   * @function
   * @desctiption 历史搜索的点击事件，调用gosearch方法
   */
  taphistory(e){
    this.gosearch(e.currentTarget.dataset.name);
  },
  /**
   * @function
   * @description 点击按钮 和键盘按钮提交
   */
  customSearch(){
    this.gosearch(this.data.input_text)
  },
  /**
   * @function
   * @description 跳转到搜索，并且追加历史
   * @param {string} name
   */
  async gosearch(name){
    // 判断是否非空
    if(name == "")
    {
      return false;
    } 
    await this.AddHistory(name);
    // 跳转
    wx.redirectTo({
      url: '/pages/searchEnd/searchEnd?search=' + name,
    })
  },
  /**
   * @function
   * @description 追加到历史记录 async
   * @param {string} name 
   */
  AddHistory(name) {
    let arr = this.data.history;
    // 去掉历史搜索中已经存在的
    let historyArr = arr.filter((item) => {
        return item!=name;
    })
    //经过上一步的过滤 返回一个不包含现在准备追加的，在重新加在开头，保证最近的搜索排在第一位
    if (historyArr.length < 10) {
      historyArr.unshift(name);
    } else {
      historyArr.pop();
      historyArr.unshift(name);
    }
    wx.setStorageSync("search_history", historyArr);
  }



})