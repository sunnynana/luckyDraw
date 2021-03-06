// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.config.productionTip = false

// TODO laji daima

import Swiper from "../static/js/swiper.js"
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

/*公共方法*/
var GetRequest = function(key){
    var url = "?" + location.href.split("?")[1]; //获取url中"?"符后的字串
    var theRequest = new Object();
    var strs = [];
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);//openid=123456
      if(str.indexOf("&")!=-1){
        strs = str.split("&")
      }else{
        strs[0] = str;
      }
      for(var i = 0; i < strs.length; i ++) {
        //theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest[key];
};
/*获取到url后面的参数，并保存到全局*/
window.$nickName = decodeURI(GetRequest('nickname'));
window.$userToken = (GetRequest('userToken') == undefined ? "asdfasdf": GetRequest('userToken'));
window.$gameId = GetRequest('gameId');
window.$sourceUserToken = GetRequest('sourceUserToken');
console.log(window.$nickName+"---"+window.$userToken+"---"+window.$gameId+"---"+window.$sourceUserToken)

// TODO youmeiyou rizhi zujian lai kongzhi



// /*调用接口得到签名*/
var pageShareData = function(){
  var a =  {
    'title':'家有萌宝征集大赛',
    'desc':'晒萌娃赢好礼，大家快来帮我家宝贝投一票吧！',
    'link':"http://"+window.location.host+"/game-app/weiXin/index?gameId=1" + "&userToken=" + window.$userToken +"&detailId="+window.$detailId + "&sourceUserToken="+ window.$sourceUserToken,
    'imgUrl':"http://marketactivity.oss-cn-shanghai.aliyuncs.com/61/201705/5baf0233061f4e9686e1028a53d0a86aH5share.jpg",
  }
  // alert(JSON.stringify(a));
  return a;
}



var getSignParam = {
    'shareUrl': window.location.href,
    'userToken':GetRequest('userToken'),
    'gameId':GetRequest('gameId'),
};
var getSignUrl = '/weiXin/getSign';
var isDebug = false;

window.getWxJsToken = function () {  // 获取微信签名验证，得到config
    var saveData = JSON.stringify(getSignParam);
    $.ajax({
        url: "/game-app"+ getSignUrl,
        type: "post",
        data: saveData,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (data) {
            console.log(data);
            if (data.code == "000000") {
                var dataConf = data.weiXinJsSign;
                wxConfig(dataConf);
            }
        }
    })
};
var wxConfig = function (conf) {
    wx.config({
        debug: isDebug,
        appId: conf.appId, //公众号的唯一标识
        timestamp: conf.timestamp, //生成签名的时间戳
        nonceStr: conf.nonceStr, //生成签名的随机串
        signature: conf.signature, //签名
        jsApiList: ['getLocalImgData',"chooseImage", "previewImage", "uploadImage", "downloadImage",'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
    });

    wx.ready(function () {
      //分享给朋友
      wx.onMenuShareAppMessage({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().link, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
              //SaveShareType(1);分享成功后执行的回调
          },
          cancel: function () {

          }
      });
      //分享给朋友圈
      wx.onMenuShareTimeline({
          title: "六一儿童节，晒萌娃赢好礼", // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().link, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          success: function () {

          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });

      //分享到QQ
      wx.onMenuShareQQ({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().link, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          success: function () {

          },
          cancel: function () {

          }
      });

      //分享到腾讯微博
      wx.onMenuShareWeibo({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().link, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          success: function () {

          },
          cancel: function () {

          }
      });
      //分享到QQ空间
      wx.onMenuShareQZone({
          title: pageShareData().title, // 分享标题
          desc: pageShareData().desc, // 分享描述
          link: pageShareData().link, // 分享链接
          imgUrl: pageShareData().imgUrl, // 分享图标
          success: function () {

          },
          cancel: function () {

          }
      });
    });

    wx.error(function(res){
        console.log('error',res);
    });
}
// window.onload = function(){
//     getWxJsToken();
// }
/*提供一个全局方法，用来开启摄像头*/
/*pageShareData().getPhoto = function(){
    alert("调用摄像头开始");
    wx.chooseImage({
       count: 1, // 默认9
       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {

           var localIds = res.localIds[0].toString(); //
           localIds = res.localIds;
           alert("返回图片本地IDlocalIds===!!!" + localIds);
           wx.uploadImage({
               localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
               isShowProgressTips: 1, // 默认为1，显示进度提示
               success: function (res) {
                   var serverId = res.serverId; // 返回图片的服务器端ID
                   alert("返回在服务器上的地址serverId===" + serverId);



               },
               fail: function(error){
                   alert(error);
                   alert(JSON.stringify(error));
               }
           });
       }
    });
}*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
