/**
 * @public
 * @author jinzhenzong
 * @description 自定义组件框，使用方法：1.在目标页面引入custommodel组件 2.目标页面添加custommodel组件，并设定id 3.在需要使用使用使用this.selectComponent(id).showModel(time),time默认值：1500,需要配置信息可以声明一个config对象，并传入组件中，config完整结构如下：
 * {
 *    outWidth    <number> 外框的宽度
 *    outHeight   <number> 外框的高度
 *    outRadius   <number> 外框的弧度
 *    showIcon    <boolean> 是否显示icon
 *    iconClass   <string>  icon的class(只可以使用iconfont,也可以自定义 配置)
 *    showText    <boolean> 是否显示文字
 *    title       <string>  显示的文字内容 
 * }
 * @version 1.0.0
 * @todo 支持自定义外框宽高/位置，文字内容、icon内容、是否显示icon 是否显示文字、文字 icon的大小 行高等功能
 */
Component({
  properties: {
    config: {
      type: 'object',
      value: {
        /**@type {string} */
        title: "模框标题",
        /**@type {string} */
        iconClass: "icon-cuowu",
      }
    }
  },
  data: {
    show: false,
  },
  methods: {
    showModel(continuedTime) {
      
      this.setData({
        show: true,
      })
      setTimeout(() => {
        this.setData({
          show: false,
        })
      }, continuedTime || 1500)
    }
  }
})
