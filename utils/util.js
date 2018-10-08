/**
 * @description 请求接口的公共封装
 */
/**
 * @description 服务器地址
 */
const request_domain = "http://devpay.paile8.com";
/**
 * @class Utils
 * @global
 * @public
 * @description 公共ajax类 封装请求类
 * @todo  用来请求后台接口方法封装，以及成功失败的回调
 * @param {object} argument
 *        {
 *            <string> url          M       null
 *            <object> data         O       {}
 *            <any>    header       O       { 'content-type': 'application/json' }
 *            <string> method       O       get
 *            <string> dataType     N       json
 *            <string> responseType N       text
 *            <function> success    O       return false
 *            <function> fail       O       return false
 *        }
 * @return false|function
 * @Author jinzhenzong
 */
class ajax {
  ajax(argument) {
    if (argument.showload) {
      wx.showLoading({
        title: argument.title || "加载中",
      })
    }
    wx.request({
      url: `${request_domain}/${argument.url}`,
      data: argument.data || {},
      header: argument.header || {
        'content-type': 'application/json'
      },
      method: argument.method || "get",
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        if (typeof argument["success"] == "function") {
          argument.success(result);
        } else {
          return false;
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '加载商品失败',
          image: '../../../image/error.png',
          mask: true,
        })
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
        if (typeof argument["fail"] == "function") {
          argument.fail(error);
        } else {
          return false;
        }
      },
      complete() {
        if (argument.showload) {
          wx.hideLoading()
        }
      }
    });
  }
}


class Utils extends ajax {
  constructor() {
    super()
    this.storage = {
      /**
       * @description 读取本地存储，
       * @param { string } 要读取的key
       * @param {boolean} 是否是同步
       * @todo 赌气本地存储，判断key只能是string且非纯空格 如果不是将报错，
       */
      Get: function (key, isSync = false) {
        if (typeof key != "string") {
          throw new Error("key is typeof string at Utils.storage.Get");
          return false;
        }
        if (key.Trim() == "") {
          throw new Error("key is not null at Utils.storage.Get");
          return false;
        }
        return new Promise((resolve, reject) => {
          if (isSync) {
            let result = wx.getStorageSync(key.Trim());
            if(result != ""){
              resolve(result);
            }else{
              reject("getStorage:fail data not found");
            }
          } else {
            wx.getStorage({
              key:key.Trim(),
              success: function (res) {
                let result = res.data;
                  resolve(result)
              },
              fail(error){
                reject(error.errMsg);
              }
            })
          }
        })
      },
      /**
       * @description 设置本地存储，
       * @param { string } 存储的key
       * @param { * } 存储的内容
       * @param {boolean} 是否是同步
       * @todo 设置本地存储，判断key只能是string且非纯空格 如果不是将报错，
       */
      Set: function (key, data, isSync = false) {
        if (typeof key != "string") {
          throw new Error("key is typeof string at Utils.storage.Set");
          return false;
        }
        if (key.Trim() == "") {
          throw new Error("key is not null at Utils.storage.Set");
          return false;
        }
        return new Promise((resolve, reject) => {
          if (isSync) {
            wx.setStorageSync(key.Trim(), data)
            resolve({
              errMsg: "storage okey",
            });
          } else {
            wx.setStorage({
              key:key.Trim(),
              data,
              success: function (res) {
                resolve({
                  errMsg: "storage okey",
                })
              },
            })
          }
        })
      },
      /**
       * @description 清理本地存储，
       * @param { string } 存储的key（为空将清空所有）
       * @param {boolean} 是否是同步
       * @todo 清理本地存储，如果key为空则清空所有，如果key不为空则清空指定的key
       */
      rm: function (key = "", isSync = false) {
        if (typeof key != "string") {
          throw new Error("key is typeof string at Utils.storage.rm");
          return false;
        }
        return new Promise((resolve, reject) => {
          if (key == "") {
            if (isSync) {
              wx.clearStorage({
                success() {
                  resolve({
                    errMsg: "clearStorage is okey"
                  })
                }
              })
            } else {
              wx.clearStorageSync();
              resolve({
                errMsg: "clearStorage is okey"
              })
            }
          } else {
            if (!isSync) {
              wx.removeStorage({
                key:key.Trim(),
                success() {
                  resolve({
                    errMsg: "clearStorage is okey"
                  })
                }
              })
            } else {
              wx.removeStorage(key.Trim());
              resolve({
                errMsg: "clearStorage is okey"
              })
            }
          }
        })
      }
    }
  }
}
/**
 * @public
 * @author jinzhenzong
 * @description 为string新增方法，trim为string去掉两端空格
 */
String.prototype.Trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
export {
  Utils
}