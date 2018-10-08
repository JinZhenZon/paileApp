/**
 * @public
 * @author jinzhenzong
 * @description input自定义组件
 * @param { numebr } 组件总宽度
 * @param { boolean } 是否禁用组件
 * @param { placeholder } 组件默认placeholder属性
 * @todo 支持自定义宽度，自定义是否禁用,自定义placeholder，自动间隔icon和输入框的距离 支持监听键盘confirm事件，并将input内容传送到页面中(需要监听组件的confirm事件)  支持监听输入
 * @examples
 *  <Sinput bindtext = "bindText" width = "610" bindconfirm = "customSearch" placeholder = "{{normalSearch}}"/>
 */
const app = getApp()
Component({
  properties: {
      width:{
        type:"number",
        value:680,
      },
      disable:{
        type:"boolean",
        value:false
      },
      placeholder:{
        type :"string",
        value:"搜一搜商品"
      },
  },
  ready(){
  },
  data: {
    searchSize:10,
    input_text:"",
  },
  methods: {
    confirm(){
      this.triggerEvent('confirm')  
    },
    input(e){
      this.triggerEvent("text", { text: e.detail.value})
    }
  }
})
