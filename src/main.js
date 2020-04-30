// import Vue from 'vue'
// import Vuex from 'vuex'
// var jjjs = './fun/jweixin-1.0.0.js'

// load vuex i18n module
// import vuexI18n from 'vuex-i18n'
// import VueI18n from 'vue-i18n'

// import VueRouter from 'vue-router'
import App from "./app";
// import router from './router'
import routes from "./router";
import storeOption from "./store";
import filters from "./filters";
import Fun from "./fun";
import debug from "./fun/debug";
import Http from "./fun/http";
import VueClipboard from "vue-clipboard2";
import '@vant/touch-emulator';


// import VideoPlayer from 'vue-video-player';
// require('video.js/dist/video-js.css');
// require('vue-video-player/src/custom-theme.css');
// import 'videojs-flash';
// import 'videojs-contrib-hls';
// // import 'videojs-contrib-hls/dist/videojs-contrib-hls';
// Vue.use(VideoPlayer);

// import VueVideoPlayer from 'vue-video-player';
// import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';
// import 'videojs-flash';
// import 'videojs-contrib-hls';
// import 'videojs-contrib-hls/dist/videojs-contrib-hls';


// Vue.use(VueVideoPlayer);

// import vuefinger from 'vue-finger'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import Vant from 'vant'
// import 'vant/lib/index.css'
// import url from './utils/url';//获取url参数

// import ydui from 'vue-ydui'
// import Lrz from "lrz"
// import 'vue-ydui/dist/ydui.px.css'
// 导入ydui base.css
// import 'vue-ydui/dist/ydui.base.css'

// const R = require("ramda");

// 引入mockjs
// require("../mock/mock.js");

// ydui的弹窗组件 $yddialog
import { Confirm, Alert, Toast, Loading } from "vue-ydui/dist/lib.rem/dialog";

Vue.prototype.$yddialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  loading: Loading
};

// vant的弹窗组件 $dialog
// 按需引入vant组件
import {
  DatetimePicker, Popup, Icon, Lazyload,
  Button, Rate, Overlay, Swipe, SwipeItem, Tab, Tabs, Row, Col, Cell, CellGroup,
  Field, Uploader, Picker, Checkbox, CheckboxGroup, RadioGroup, Radio, Dialog, Notify,  Collapse, CollapseItem,
  DropdownMenu,DropdownItem,ImagePreview,NoticeBar,Search,Stepper
} from "vant";

// 使用vant组件
Vue.use(DatetimePicker).use(Cell).use(CellGroup).use(Popup).use(Icon).use(Lazyload,{lazyComponent: true,
  preLoad: 1.1, error: '/addons/yun_shop/static/app/images/img_default.png', loading: '/addons/yun_shop/static/app/images/img_loading.gif', attempt: 1})
  .use(Button).use(Field).use(Rate).use(Overlay).use(Swipe).use(SwipeItem).use(Uploader)
  .use(Tab).use(Tabs).use(Picker).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio)
  .use(Dialog).use(Notify).use(Collapse).use(CollapseItem).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(ImagePreview).use(NoticeBar).use(Search).use(Stepper);


// 过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Vue.use(MINT);
// Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(ydui);
// Vue.use(vant);
Vue.use(window.VueAwesomeSwiper);
Vue.config.productionTip = false;

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.min.css";
import base64_encode from "./utils/base64_encode";

// import VConsole from "vconsole";
// new VConsole();

// import jquery  from 'jquery';
// global.jquery = global.jQuery  = global.$ = jquery;
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: false,
    title: false,
    toolbar: false,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: false,
    keyboard: false,
    url: "src"
  }
});
Vue.use(Viewer);

// 使用剪切板
Vue.use(VueClipboard);

Vue.use(debug, { entryName: "yunzshop" });

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

// 注册全局方法
// Vue.prototype.$url=url
YDB.GetDeviceInformation("senduid");

const scrollBehavior = (to, from, savedPosition) => {
  // return 期望滚动到哪个的位置

  // return savedPosition
  console.log("savedPosition", savedPosition);
  if (to.name == "home" && from.name == "goods") {
    // if (savedPosition) {return savedPosition;}
    // 不延迟滚动的话，有商品页内容高度比较小的情况就返不回原来的位置
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y);
      }, 200);
    }
  } else {
    return { x: 0, y: 0 };
  }
};

// Vue.use(vuefinger)
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  hashbang: true,
  // mode: 'history',//去除url上的#号模式
  // mode:'abstract',
  history: true,
  hashPrefix: "!",
  linkActiveClass: "active",
  routes,
  base: "/addons/yun_shop/"
  // scrollBehavior
});

//以下是不需要登录的页面
const passRouter = ["login", "findpwd", "register", "category", "DiyForm"];

function isPassRoute(to) {
  for (let i = 0; i < passRouter.length; i++) {
    // 编程式
    if (to.name === passRouter[i]) {
      return true;
    }
  }

  return false;
}

// 可否访问前过滤方法
router.beforeEach(function(to, from, next) {
  if (!window.initUrl) {
    window.initUrl = window.location.href;
  }
  if (to.name === "BusinessCard" || to.name === "EditCard") {
    if (window.business_card !== 1) {
      window.business_card = 1;
      let script = document.createElement("script");
      script.src = "/addons/yun_shop/static/app/beta-amr.js";
      document.body.appendChild(script);
    }
  }
  window.localStorage.i = to.query.i;

  if (window.yz_bd) {
    if (!window._hmt) {
      /*百度统计*/
      var _hmt = _hmt || [];
      window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?" + window.yz_bd;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);

        _hmt.push(["_trackPageview", "/addons/yun_shop/?menu" + to.fullPath]);
      })();
      /*百度统计end*/
    } else {
      /*百度统计*/
      if (_hmt) {
        if (to.path) {
          _hmt.push(["_trackPageview", "/addons/yun_shop/?menu" + to.fullPath]);
        }
      }
      /*百度统计end*/
    }
  }

  from.query.detailid = "name";
  window.localStorage.mid = to.query.mid;

  if (to.name === "alipay") {
    next();
    return;
  }
  // let json = { url: document.location.href };

  // Http.get("home-page.get-params", json, " ")
  //   .then(response => {
  //     if (response.result === 1) {
  //       localStorage.setItem("mailLanguage", JSON.stringify(response.data.lang));
  //       localStorage.setItem("balanceLang", JSON.stringify(response.data.balance));
  //       tempInfo(response.data.home);
  //       if (response.data.home.memberinfo) {
  //         window.localStorage.uid = response.data.home.memberinfo.uid;
  //       }
  //       localStorage.setItem(
  //         "globalParameter",
  //         JSON.stringify(response.data.globalParameter)
  //       );
  //
  //       if (response.basic_info) {
  //         window.popularizeYZ = response.basic_info.popularize_page;
  //         getInvite(response.basic_info.validate_page);
  //       }

  if (window.popularizeYZ) {
    if (Fun.getTyep() == "5") {
      if (window.popularizeYZ.wap.vue_route.indexOf(to.name) >= 0) {
        if (Fun.isTextEmpty(window.popularizeYZ.wap.url)) {
          next(`/404?i=${Fun.getKeyByI()}`);
        } else {
          window.location.href = window.popularizeYZ.wap.url;
        }
      } else {
        next();
      }
    } else if (Fun.getTyep() == "1") {
      if (window.popularizeYZ.wechat.vue_route.indexOf(to.name) >= 0) {
        if (Fun.isTextEmpty(window.popularizeYZ.wechat.url)) {
          next(`/404?i=${Fun.getKeyByI()}`);
        } else {
          window.location.href = window.popularizeYZ.wechat.url;
        }
      } else {
        next();
      }
    } else if (Fun.getTyep() == "2") {
      if (window.popularizeYZ.mini.vue_route.indexOf(to.name) >= 0) {
        if (Fun.isTextEmpty(window.popularizeYZ.mini.url)) {
          //window.location.href=$popularize.mini.url;
          next(`/404?i=${Fun.getKeyByI()}`);
        } else {
          wx.miniProgram.navigateTo({
            url: window.popularizeYZ.mini.url
          });
        }
      } else {
        next();
      }
    } else if (Fun.getTyep() == "7") {
      if (window.popularizeYZ.app.vue_route.indexOf(to.name) >= 0) {
        if (Fun.isTextEmpty(window.popularizeYZ.app.url)) {
          next(`/404?i=${Fun.getKeyByI()}`);
        } else {
          window.location.href = window.popularizeYZ.app.url;
        }
      } else {
        next();
      }
    } else if (Fun.getTyep() == "8") {
      if (window.popularizeYZ.alipay.vue_route.indexOf(to.name) >= 0) {
        if (Fun.isTextEmpty(window.popularizeYZ.alipay.url)) {
          next(`/404?i=${Fun.getKeyByI()}`);
        } else {
          window.location.href = window.popularizeYZ.alipay.url;
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }

  // }
  // });
});
//跳转后赋值
router.afterEach(function(to, from) {
  if (to && to.path && to.path != "/" && to.path != "/share") {
    window.localStorage.setItem("share_path", to.path);
  }
});
window.localStorage.isWeiXin = Fun.isWeiXin();
window.localStorage.isAlipay = Fun.isAlipay();
let type = "";
window.localStorage.isWeiXin == "true" ? (type = 1) : (type = 5);
if (window.localStorage.isAlipay == "true") {
  type = 8;
}
window.localStorage.type = type;
Vue.prototype.fun = Fun;

window.$http = Http;
// window.R = R;
window.__lendApp__ = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => {
    return h(App);
  }
});

/**
 * 定义语言包方法
 * @param langname  eg: langMember.memberId
 * @returns {*}
 */
Vue.prototype.$yzt = function(langname) {
  let $lang = langname.split(".");
  if ($lang.length < 2) {
    return "";
  }

  return store.state.langService.language[$lang[0]][$lang[1]];
};

Vue.prototype.$vueIsTextEmpty = function(str1) {
  if (this.fun.isTextEmpty(str1)) {
    return true;
  }
  return false;
};

Array.prototype.removeByValue = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};

Date.prototype.Format = function(fmt) {
  // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

window.isMiniprogram = false;

function ready() {
  console.log(
    "window.__wxjs_environment",
    window.__wxjs_environment === "miniprogram"
  ); // true
  if (window.__wxjs_environment === "miniprogram") {
    window.isMiniprogram = true;
  }
}

if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
  document.addEventListener("WeixinJSBridgeReady", ready, false);
} else {
  ready();
}
