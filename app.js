//app.js
import JIMOBJECT from "./utils/JmessageClass.js";
import { Utils } from "./utils/util.js";
App({
  data: {
    utils: "",
  },
  globalData: {
    isIphoneX: false,
    JIM:"",
    
  },
  onLaunch(){
    this.data.utils = new Utils();
    this.globalData.JIM = JIMOBJECT;
    this.globalData.JIM._assignment({ debug: false });
    this.globalData.JIM._init();
    this.globalData.JIM.onSyncConversation().then(dataList =>{
      console.log(dataList);
    })
    this.getUserImInfo().then(res=>{
      if(parseInt(res.data.code) == 0){
        this.JIMLogin(res.data.datas.im_user,res.data.datas.im_passwd);
      }
    });
    let that = this;
    wx.getSystemInfo({
      success: (res) => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    });
  },
  getUserImInfo() {
    let that = this;
    return new Promise((resolve, reject) => {
        that.data.utils.ajax({
          url:"paile-service/api/userHandler/getIminfo",
          data:{
            userId:105,
            type : 2,
          },
          success(res){
            resolve(res);
          },
          fail(error){
            reject(error)
          }
        })
    });
  },
  /**
   * @description 极光登录
   * @param { string } 极光用户名
   * @param { string } 极光密码
   */
  JIMLogin(user,pass){ 
    if(this.globalData.JIM.isInit){
      this.globalData.JIM.login(user, pass)
        .then(data => {
          this.globalData.JIM.JIM.onMsgReceive(data => {
            // 实时监听
            this.receive(data);
          });
          this.globalData.JIM.getConversation().then(data => { }); //获取会话列表
        })
        .catch(error => {
          this.JIMregister(user, passwd);
        })
    }else{
      setTimeout(() => {
        this.JIMLogin(user, pass);
      }, 30);
    }
  },
  JIMregister(user,pass){
    this.globalData.JIM.register(user, passwd)
      .then(data => {
        this.JIMLogin(user, passwd);
      })
      .catch(error => {
        console.log("注册失败");
      });
  },
  receive(msgBox){
    console.log("新消息来了",msgBox);
  }
})