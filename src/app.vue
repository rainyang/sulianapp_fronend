<template>
  <div id="app">
    <div id="appMain" :class="[fun.getPhoneEnv() == 3 ? 'pcStyle' : '']">
      <keep-alive>
        <router-view
          v-if="!$route.meta.notKeepAlive && isRouterAlive"
          :key="$route.fullPath"
          @changeFoot="initFoot"
        ></router-view>
      </keep-alive>
      <router-view
        v-if="$route.meta.notKeepAlive && isRouterAlive"
        :key="$route.fullPath"
      ></router-view>
      <loading></loading>
    </div>
    <!-- 返回直播按钮 -->
    <div id="returnLiveBtn" v-if="isShowReturnLiveBtn"  @click.stop="gotoLiveRoom">
     <i class="fa fa-angle-left"></i><span class="rlbtext">返回直播<i class="iconfont icon-adsystem_icon_cancle clone_btn_style" @click.stop="clearLiveBtn"></i></span>
    </div>
    <c-foot v-if="!foot"></c-foot>
    <qrCode v-if="fun.getPhoneEnv() == 3"></qrCode>
  </div>
</template>

<script>
import cFoot from "components/foot";
import loading from "components/loading";
import qrCode from "components/qrCode";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
//import BMap from 'BMap';

let isCreated = 0;
export default {
  data() {
    return {
      invite: "",
      //记录form请求微信form请求只发送一次
      selected: false,
      foot: true,
      zone: "",
      isLocation: false,
      isRouterAlive: true,

      is_Inviter: "",
      invite_mobile: "",
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    isShowReturnLiveBtn(){
      return this.$store.state._isShowReturnLiveBtn;
    }
  },
  watch: {
    //监测路由变化
    $route(to, from) {
      if (from.path === "/") {
        if (this.fun.getKey("t")) {
          this.reload();
        }
      }
      if (this.$yzt("route." + to.name)) {
        //语言包
        this.fun.setWXTitle(this.$yzt("route." + to.name));
      } else if (to.meta.title) {
        this.fun.setWXTitle(to.meta.title);
      }
      this.foot = to.meta.foot;
    }
  },

  mounted() {
    // this.initBalanceLang();
    this.setPcStyle();
    this.fun.setWXTitle("");
    this.$store.commit("onload");
    window.homeFirst = 0;
    let that = this;
    // this.tempInfo();

    /*区分关闭和刷新，关闭清理vid  start*/
    window.onload = function() {
      if (!window.sessionStorage["tempFlag"]) {
        window.localStorage.removeItem("vid");
        window.localStorage.removeItem("uid");
        window.localStorage.removeItem("mid");

        window.localStorage.removeItem("scope");
        window.localStorage.removeItem("appid");
        window.localStorage.removeItem("mob_parent");
        window.localStorage.removeItem("mob_user");
        window.localStorage.removeItem("timetamp");
        window.localStorage.removeItem("sign");
        window.localStorage.removeItem("videoReload");
      } else {
        window.sessionStorage.removeItem("tempFlag");
      }
    };
    window.onunload = function() {
      window.sessionStorage["tempFlag"] = true;
    };
    window.onbeforeunload = function() {
      window.sessionStorage["tempFlag"] = true;
      that.delCookie("memberlogin_status");
    };
    /*区分关闭和刷新，关闭清理vid end*/
  },
  created() {
    if (isCreated === 0) {
      window.localStorage.removeItem("vid");
      window.localStorage.removeItem("uid");
      window.localStorage.removeItem("mid");

      // this.getParams();
      this.initShare();
      // this.getInvite();
    }
  },
  beforeUpdate() {
    // this.initLanguage();
    if (isCreated === 1) {
      // this.getParams();
      this.initShare();
      // this.getInvite();
    }
  },

  updated() {
    isCreated = 1;
  },

  methods: {
    gotoLiveRoom(){
      this.$router.push(this.fun.getUrl("livePage"));
    },
    clearLiveBtn(){
      this.$store.commit("setReturnLiveBtn", false);
    },
    setPcStyle() {
      //pc端浏览器网页或者pc端微信网页 样式
      if (this.fun.getPhoneEnv() == 3) {
        document.getElementById("appMain").style.width = "375px";
        document.getElementById("appMain").style.margin = "0 auto";
      }
    },
    initFoot(item) {
      this.foot = item;
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    //new
    getParams() {
      let _url = document.location.href;

      // 要用post  链接太长
      $http
        .post("home-page.get-params", { url: _url }, " ")
        .then(response => {
          if (response.result === 1) {
            this.initLanguage(response.data.lang);
            this.initBalanceLang(response.data.balance);
            // this.getInvite(response.data.page);
            if (window.homeFirst === 0) {
              this.tempInfo(response.data.home);
            }
            if (response.data.home.memberinfo) {
              window.localStorage.uid = response.data.home.memberinfo.uid;
            }
            localStorage.setItem(
              "globalParameter",
              JSON.stringify(response.data.globalParameter)
            );
          } else {
            console.log(response.msg);
          }
        })
        .catch(err => {
          console.error(err, "app");
        });
    },
    //初始化语言设置
    initLanguage(data) {
      // let that = this;
      // let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      // $http.get("setting.get-lang-setting", json).then(response => {
      //   if (response.result == 1) {
      //     console.log("lang-setting", response.data);
      localStorage.setItem("mailLanguage", JSON.stringify(data));
      // let mailLanguage = localStorage.getItem("mailLanguage");
      //   }
      // });
    },
    initBalanceLang(data) {
      // let that = this;
      // let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      // $http.get("setting.get-balance", json).then(response => {
      //   if (response.result == 1) {
      localStorage.setItem("balanceLang", JSON.stringify(data));
      this.balanceLang = localStorage.getItem("balanceLang");
      //   }
      // });
    },
    getLocation() {
      var that = this;
      var myLocation = this.$store.state.o2oLocation;

      if (!myLocation.point) {
        var mapObj = new AMap.Map("iCenter");
        mapObj.plugin("AMap.Geolocation", function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
        });

        function onComplete(obj) {
          console.log("objjjjj", obj);
          var res =
            "经纬度：" +
            obj.position +
            "\n精度范围：" +
            obj.accuracy +
            "米\n定位结果的来源：" +
            obj.location_type +
            "\n状态信息：" +
            obj.info +
            "\n地址：" +
            obj.formattedAddress +
            "\n地址信息：" +
            JSON.stringify(obj.addressComponent, null, 4);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");
          that.point = {
            lat: position[1],
            lng: position[0]
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
            ? obj.addressComponent.city
            : obj.addressComponent.province;

          var pos = {
            address: obj.formattedAddress,
            city: that.city,
            title: obj.formattedAddress,
            point: that.point
          };
          console.log("test pos", pos);
          that.$store.commit("updateLocation", pos);
          that.$store.commit("setLocation", pos);
        }

        function onError(obj) {
          Toast("定位失败,请手动切换位置");
        }
      }
    },

    tempInfo(data) {
      window.homeFirst = 1;
      var that = this;
      //
      // $http.get("home-page.index", {}, "加载中").then(response => {
      if (!data) return;
      // if (response.result === 1) {
      window.localStorage.setItem("integral", data.mailInfo.credit1);
      if (!data.default) {
        for (let j of data.item.data) {
          j.temp = "show" + j.temp;
          if (
            j.temp == "showlocation" ||
            j.temp == "showstore" ||
            j.temp == "showbusiness"
          ) {
            that.isLocation = true;
          }
        }
        // 设置的标题（装修）
        if (data.item.pageinfo) {
          data.item.janst = data.item.pageinfo.params.title;
        }
      } else {
        // 设置的标题（默认）
        data.item.janst = data.mailInfo.name;
      }

      if (that.isLocation) {
        if (window.location.href.indexOf("/home?") > 0) {
          that.getLocation();
        }
      }

      this.$store.commit("tempIndex", data);
      this.$store.commit("setPlugins", data);
      window.localStorage.setItem("tempIndex", JSON.stringify(data));
      window.localStorage.setItem("setPlugins", JSON.stringify(data));
      // } else {
      //   console.log(response.msg);
      //MessageBox.alert(response.msg)
      // }
      // },
      // response => {
      //   MessageBox.alert(response);
      // });
    },
    //是否开启邀请页面
    getInvite() {
      if (this.is_Inviter !== 1 || this.invite_mobile !== 1) {
        $http.get("member.member.isValidatePage").then(res => {
          if (res.result === 1) {
            this.is_Inviter = res.data.is_invite;
            this.invite_mobile = res.data.invite_mobile;
            if (res.data.is_bind_mobile !== 0) {
              this.bindMobile(res.data.is_bind_mobile);
            } else {
              if (res.data.is_login === 1) {
                // 登录
                if (res.data.is_invite !== 1) {
                  // 没有填写过邀请人
                  if (res.data.invite_page === 1) {
                    // 开启了邀请页面
                    if (this.$store.state.is_Inviter) {
                      // 不是第一次进入商城  点击了确认邀请人
                    } else {
                      if (
                        window.location.href.indexOf("input_visit") > 0 ||
                        window.location.href.indexOf("member/editmobile") > 0
                      ) {
                        //是在这两个页面do nothing
                      } else if (
                        window.location.href.indexOf("input_visit") < 0 ||
                        window.location.href.indexOf("member/editmobile") < 0
                      ) {
                        this.$router.push(this.fun.getUrl("Inviter"));
                      }
                    }
                  }
                } else {
                  //已经填写过邀请人
                  if (
                    res.data.invite_mobile !== 1 &&
                    res.data.invite_page === 1
                  ) {
                    //没有绑定手机而且开启了邀请页面
                    if (
                      window.location.href.indexOf("input_visit") > 0 ||
                      window.location.href.indexOf("member/editmobile") > 0
                    ) {
                    } else if (
                      window.location.href.indexOf("input_visit") < 0 ||
                      window.location.href.indexOf("member/editmobile") < 0
                    ) {
                      this.$router.push(this.fun.getUrl("Inviter"));
                    }
                  }
                }
              }
            }
          }
        });
      }
    },

    //查看用户是否需要绑定手机号
    // getIsBingMobile() {
    //   var that = this;
    //   let json = {};
    //   $http.get("home-page.bindMobile", json).then(
    //     function(response) {
    //       if (response.result == 1) {
    //         that.bindMobile(response.data.is_bind_mobile);
    //       }
    //     },
    //     function(response) {
    //       // error callback
    //     }
    //   );
    // },

    //查看用户是否需要绑定手机号
    bindMobile(e) {
      if (e == 1) {
        //跳转绑定手机页面
        //判断是否是app分享扫码进入商城
        if (window.location.href.indexOf("/member/scaneditmobile") >= 0) {
          window.localStorage.setItem("is_force_mobile", 999);
          this.$router.push(
            this.fun.getUrl("editmobile", { num: "", myparent: this })
          );
        } else {
          this.$router.push(
            this.fun.getUrl("editmobile", { num: "", myparent: this })
          );
        }
      } else if (e == 2) {
        if (
          window.location.href.indexOf("/member?") > -1 ||
          this.$route.name == "member"
        ) {
          this.$router.push(
            this.fun.getUrl("editmobile", { num: "", myparent: this })
          );
        } else {
          return;
        }
      } else if (e == 3) {
        if (
          window.location.href.indexOf("/goods/") > -1 ||
          this.$route.name == "goods"
        ) {
          this.$router.push(
            this.fun.getUrl("editmobile", { num: "", myparent: this })
          );
        } else {
          return;
        }
      } else if (
        window.location.href.indexOf("/member/extension?") > -1 ||
        e == 4
      ) {
        if (this.$route.name == "extension") {
          this.$router.push(
            this.fun.getUrl("editmobile", { num: "", myparent: this })
          );
        } else {
          return;
        }
      } else {
        return;
      }
    },

    //获取商城信息
    // getMailInfo() {
    //   let that = this;
    //   let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
    //   $http.get("setting.get", json).then(response => {
    //     if (response.result == 1) {
    //       console.log("统计代码：", response.diycode);
    //       this.$store.commit("setMailInfo", response.data);
    //     }
    //   });
    // },

    //获取用户信息
    // getMemberInfo() {
    //   var that = this;
    //   let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
    //   $http.get("member.member.getUserInfo", json, "").then(
    //     function(response) {
    //       if (response.result == 1) {
    //         that.$store.commit("savemodel", response.data);
    //       }
    //     },
    //     function(response) {
    //       // error callback
    //     }
    //   );
    // },

    //初始化分享设置
    initShare() {
      //不是微信端 不访问
      let token = this.fun.getToken();
      if (token) {
        this.wxLocationGet();
        return;
      }

      //以下是需要单独设置分享的页面链接
      let list = [
        "/picture_album",
        "/goods/",
        "/groups/",
        "/diy",
        "/homeseller",
        "/o2o/store_v2",
        "/o2o/store",
        "/o2o/home/homeseller/",
        "/share_page_detail",
        "/activity_detail",
        "/business_activity/business_activity",
        "/voice_good/",
        "/activity/task/list/",
        "/supplier_shop/"
      ];

      for (let i = 0; i < list.length; i++) {
        // 编程式
        if (window.location.href.indexOf(list[i]) > -1) {
          return;
        }
      }

      if (window.localStorage.type == 5) {
        return;
      }
      let that = this;
      let _url = document.location.href;
      let json = {
        url: _url
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result === 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    wxLocationGet() {
      let json = {
        longitude: this.fun.getLat(),
        latitude: this.fun.getLng()
      };

      //获取城市信息
      $http
        .get("geocoding.get-address-component", json)
        .then(response => {
          console.log("TAG:", json);
          if (response.result == 1) {
            //通过获取的district获取zoneId
            //this.getZoneId(response.data.district);
            //window.localStorage.setItem("nowZone", response.data.district);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //组装分享设置
    share(data) {
      let that = this;
      console.log("打印home组件app分享");
      wx.config(data.config);
      wx.ready(function() {
        let _title = "";
        //let _link = location.protocol + '//' + location.host + location.pathname + '?i=' + that.fun.getKeyByI() + "&type=" + that.fun.getTyep() + "&mid=" + data.info.uid;
        //let _link = document.location.href + "&mid=" + data.info.uid;

        let _link = document.location.href;
        _link = that.fun.isMid(_link, data.info.uid);
        // console.log(_link,"link");
        let _imgUrl = "";
        let _desc = "";

        // 分享优先级： 单页设置（例如商品，拓客活动）> 店铺装修页面设置（仅限装修页面或者设置为首页的装修页面）data.share.title > 全局设置data.shop.share.title
        if (window.location.href.indexOf("/home?") > -1) {
          if (data.share.title) {
            _title = that.fun.isTextEmpty(data.share.title)
              ? data.shop.shop.name
              : data.share.title;
            _imgUrl = that.fun.isTextEmpty(data.share.icon)
              ? data.shop.icon
              : data.share.icon;
            _desc = that.fun.isTextEmpty(data.share.desc)
              ? data.shop.shop.name
              : data.share.desc;
          } else {
            _title = that.fun.isTextEmpty(data.shop.share.title)
              ? data.shop.shop.name
              : data.shop.share.title;
            _imgUrl = that.fun.isTextEmpty(data.shop.share.icon)
              ? data.shop.icon
              : data.shop.share.icon;
            _desc = that.fun.isTextEmpty(data.shop.share.desc)
              ? data.shop.shop.name
              : data.shop.share.desc;
          }
        } else {
          _title = that.fun.isTextEmpty(data.shop.share.title)
            ? data.shop.shop.name
            : data.shop.share.title;
          _imgUrl = that.fun.isTextEmpty(data.shop.share.icon)
            ? data.shop.icon
            : data.shop.share.icon;
          _desc = that.fun.isTextEmpty(data.shop.share.desc)
            ? data.shop.shop.name
            : data.shop.share.desc;
        }

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    }
  },
  components: { cFoot, loading, qrCode }
};
</script>
<style lang="scss" rel="stylesheet/scss">
/*@import "assets/iconfont/iconfont.css";*/
@import "assets/css/font-awesome.min.css";
@import "assets/css/app.scss";
@import "layout";

// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
//   #app {
//     box-sizing: border-box;
//     padding-bottom: 34px;
//     &:after {
//       content: "";
//       z-index: 9998;
//       position: fixed;
//       left: 0;
//       bottom: 0;
//       width: 100%;
//       height: 34px;
//       background: #fff;
//     }
//   }
// }
// ----- #appMain.pcStyle 用于pc端样式适配
#appMain.pcStyle {
  .mint-header {
    width: 375px;
    margin: 0px auto;
  }
  .mint-popup-4,
  .mint-navbar {
    width: 375px;
  }
  .mint-navbar {
    margin: 0 auto;
  }
  .yd-popup {
    width: 375px !important;
    right: 50%;
    margin-right: -187.5px;
  }
  // .yd-popup-right {
  //   right: 0 !important;
  //   margin-right: 0 !important;
  // }
  .yd-popup-show,
  .van-popup,
  .yd-navbar,
  .yd-actionsheet {
    width: 375px !important;
  }
  .yd-navbar,
  .yd-actionsheet {
    left: auto;
  }

  .set-pc-styleLeft {
    width: 375px !important;
    left: 50% !important;
    margin-left: -187.5px;
  }
  .set-pc-style {
    width: 375px !important;
    left: auto !important;
  }
}

.g-fix-ios-prevent-scroll {
  position: static;
}

.el-cascader-menus .el-cascader-menu {
  // 供应商选择分类
  min-width: 115px;
  .el-cascader-menu__item {
    width: 115px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.mint-indicator-wrapper {
  z-index: 2000;
}
#returnLiveBtn{
  position: fixed;
  bottom: 35%;
  display: flex;
  align-items: center;
  justify-content:center;
  left: 9;
  width: 4.5rem;
  height: 3rem;
  line-height: 3rem;
  background: #04BE02;
  color: #fff;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  z-index: 999;
  i{
    font-size: 1rem;
  }
  .rlbtext{
    width: 2rem;
    line-height: 1rem;
    display: inline-block;
    margin: 0 0.5rem 0 0.25rem;
    font-size: 0.875rem;
    position: relative;
    .clone_btn_style{
      font-size: 1rem;
      padding: 0.5rem;
      color: #333;
      position: absolute;
      top: -1rem;
      right: -2.875rem;
    }
  }
}
#aggregate {
  .add_photo {
    overflow: hidden;
    input {
      height: 5rem !important;
      margin: 0;
    }
  }
}
</style>
