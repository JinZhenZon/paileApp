/**
      * @description 删除订单函数
      * @param {object} orderinfo 订单基本信息
      * @param {number} usercode     用户码
      */
import { Utils } from "./util.js"
let utils = new Utils();
export let remove = (usercode,orderInfo) => {
  return new Promise((resolve,reject) => { 
    utils.ajax({
      url: "order/remove",
      method: "delete",
      data: {
        usercode,
        orderNumber: orderInfo.orderNumber,
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          resolve();
        } else {
          reject("删除失败")
        }
      },
      fail(error){
        reject("请求超时")
      }
    })
  })
}
/**
  * @description 取消订单函数
  * @param {object} orderinfo 订单基本信息
  * @param {number} usercode     用户码
  */
export let cancelOrder = (usercode, orderInfo)=>{
  return new Promise((resolve,reject)=>{
   utils.ajax({
      url: "order/cancel",
      method: "post",
      data: {
        usercode,
        orderNumber: orderInfo.orderNumber,
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          resolve();
        } else {
          reject("取消失败")
        }
      },
      fail(){
        reject("请求超时")
      }
    })
  })
}
 /**
  * @description 确认收货函数
  * @param {object} orderinfo 订单基本信息
  * @param {number} usercode  用户码
  */
export let confirm = (usercode, orderNumber) =>{
  return new Promise((resolve,reject)=>{
    utils.ajax({
      url: "order/receipt",
      method: "post",
      data: {
        usercode,
        orderNumber: orderInfo.orderNumber,
      },
      success(res) {
        if (parseInt(res.data.code) == 0) {
          resolve()
        } else {
          reject("收货失败")
        }
      },
      fail(){
        reject("请求超时");
      }
    })
  })

}
export let pany =()=>{
  return new Promise((resolve,reject)=>{
    resolve()
  })
}