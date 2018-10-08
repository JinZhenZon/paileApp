var JMessage = require("./jmessage-wxapplet-sdk-1.4.0.min.js");
import { hexMD5 } from "./md5.js";
class JIMOBJECT {
    // 初始化幅值
    _assignment(data) {
            this.JIM = new JMessage(data);
        }
        /* 账户初始化
         *	用于初始化JMessage 在使用之前必须要调用
         */
    _init() {
            let appkey = "674aa0ed02e1f3ab3e5b1cdc";
            let timestamp = Date.parse(new Date());
            let random_str = Math.random().toString(36).substr(2);

            this.JIM.init({
                "appkey": "674aa0ed02e1f3ab3e5b1cdc",
                "random_str": random_str,
              "signature": hexMD5(`appkey=${appkey}&timestamp=${timestamp}&random_str=${random_str}&key=53b3670bf8a27db66d0f6577`),
                "timestamp": timestamp,
                "flag": 1,
            }).onSuccess(data => {
                console.log("聊天系统初始化成功")
            }).onFail(err => {
                console.log(err)
            })
        }
        /*
         *   登录
         *	用于JMessage登录 发送消息之前必须登录
         *
         */
    login(username, password) {
            return new Promise((resolve, reject) => {
                this.JIM.login({
                    'username': username,
                    'password': password,
                }).onSuccess(function(data) {

                    resolve(data)
                }).onFail(function(data) {
                    reject(data)
                })

            })

        }
        /*
         *   注册
         *	用于JMessage注册 登录之前必须注册
         */
    register(username, password) {
            return new Promise((resolve, reject) => {

                this.JIM.register({
                    'username': username,
                    'password': password,
                }).onSuccess(function(data) {
                    resolve(data);
                }).onFail(function(data) {
                    reject(data);
                })
            })
        }
        /**
         *发送消息类
         *用于发送单消息 conten  文字消息内容 target_username 发送给的用户账号 target_nickname 发送给的用户昵称
         *appkey 不同应用之间需要填写。
         *obj.sendMsg({
         *	    content : msg,
         *	    target_username:"jinzhenzong2",
         *	    target_nickname:"",
         *	    appkey:"799d6fe3ff5b91f921b61cd2",
         *});
         *
         */
    sendMsg(sendBody) {
            return new Promise((resolve, reject) => {
                this.JIM.sendSingleMsg(sendBody).onSuccess(function(data) {
                    // do something
                    resolve(data);
                }).onFail(function(data) {
                    reject(data);
                }).onTimeout(function(data) {
                    if (data.response_timeout) {
                        // do something when response timeout
                        reject(data);
                    } else {
                        reject(data);
                    }
                }).onAck(function(data) {
                    // do something
                });
            })
        }
        /**
         * @desc 发送自定义消息
         */
        sendSingleCustom(sendBody){
          return new Promise((res,rej)=>{
            this.JIM.sendSingleCustom(sendBody).onSuccess(function(data){
              res(data);
            }).onFail(function(data){
              rej(data);
            })
          })
        }
        /*
         *解析收到的图片
         */
    getResource(id) {
            return new Promise((resolve, reject) => {
                this.JIM.getResource({
                    media_id: id
                }).onSuccess((data) => {
                    resolve(data);
                }).onFail(error => {
                    reject(error);
                })
            })
        }
        /*
         *获取会话列表
         *用于获取用户的临时会话列表 调用即成功 顺便更新一下用户信息
         */
    getConversation() {
            return new Promise((resolve, reject) => {
                this.JIM.getConversation().onSuccess((data) => {
                    resolve(data);
                })
            })

        }
        // 更新用户信息
    updateConversation(data) {
            data.conversations.map(item => {
                this.JIM.updateConversation({
                    'appkey': item.appkey,
                    'username': item.username,
                    'extras': item.extras,
                });
            })
            console.log('更新用户信息完成');
        }
        /*
         *断线监听
         *用于监听断线 断线触发回调函数
         */
    onDisconnect() {
            this.JIM.onDisconnect(function() {
                alert('聊天断线');
            })
        }
        /**
         *离线数组监听（历史记录）
         */
    onSyncConversation() {
            return new Promise((resolve, reject) => {
                this.JIM.onSyncConversation(function(data) {
                    resolve(data);
                })
            })
        }
        // 获取未读条数(如果是获取会话列表则不需要这个)
    getUnreadMsgCnt(username, appkey = "") {
            return new Promist((resolve, reject) => {
                this.JIM.getUnreadMsgCnt()
            })
        }
        // 获取初始化事件
    get isInit() {
            return this.JIM.isInit();
        }
        // 获取登录状态
    get isLogin() {
            return this.JIM.isLogin();
        }
        // 获取连接状态
    get isConnect() {
            return this.JIM.isConnect();
        }
        // 获取会话
    get msg() {
            return this.msg
        }
        // 设置会话
    set msg(msg) {
        this.msg = msg;
    }
}
let JIM = new JIMOBJECT();
export default JIM;
