import { mapState, mapMutations } from "vuex";
import cTitle from "../../components/title";
import { Loadmore } from "mint-ui";
import { Lazyload, Button } from "mint-ui";
import { MessageBox } from "mint-ui";

var haveShop = false;

var intervalid;

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      myType: window.localStorage.type,
      store: {
        name: "",
        thumb: ""
      },
      income: {
        money_total: 0.0,
        sure_withdraw_money: 0.0
      },
      store_set: {
        is_cash_pay: "",
        is_open_cashier: "",
        is_write_information: ""
      },

      title: "",

      vedioSrc: ""
    };
  },

  mounted() {
    console.log("mounted");
    this.toi = this.fun.getKeyByI();
    this.getStoreInfo();
    this.initData();
  },
  methods: {
    toPage(str,query={}) {
      if (str === "cashierOrderlist") {
        this.$router.push(
          this.fun.getUrl(str, { status: "0", orderType: "cashier" })
        );
        return;
      }
      this.$router.push(this.fun.getUrl(str,{},query));
    },
    goback() {
      this.$router.go(-1);
    },

    // autoPlay(){
    //   var bgAudio = document.getElementById('yp');
    //   bgAudio.load();
    //   bgAudio.play();
    //   document.addEventListener("WeixinJSBridgeReady", function () {
    //     bgAudio.load();
    //     bgAudio.play();
    //   }, false);

    // },

    getStoreInfo() {
      var that = this;
      $http
        .get("plugin.store-cashier.frontend.cashier.center.index", {
          i: this.fun.getKeyByI(),
          type: this.fun.getTyep()
        })
        .then(
          function(response) {
            console.log("cashier::", response);
            if (response.result == 1) {
              console.log("cashier::", response.data);
              that.store = response.data.store;
              that.income = response.data.income;
              that.store_set = response.data.store_set;

              //that.openTime(response.data.store.store_id);
              //that.credit = myData.credit;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    openTime(id) {
      intervalid = setInterval(() => {
        this.vedioSrc = "";
        $http
          .get("plugin.store-cashier.frontend.cashier.voice-broadcast.index", {
            store_id: id
          })
          .then(res => {
            if (res.result == 1) {
              var that = this;
              this.vedioSrc = res.data.url;
              //wx.config(res.data.config);
              //this.autoPlay();
              // wx.config({
              //   debug : false, // 这里为false
              //   appId : '', // 以下随意填写即可
              //   timestamp : (new Date()).getTime(),
              //   nonceStr : '',
              //   signature : '',
              //   jsApiList : ['checkJsApi']
              // });

              // wx.ready(function () {
              //   if(!that.fun.isTextEmpty(that.vedioSrc)){
              //     var bgAudio = document.getElementById('yp');
              //     console.log(bgAudio);
              //     bgAudio.play();
              //   }
              // })

              this.wxPlay(this.vedioSrc);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, 5000);
    },

    wxPlay(src) {
      var that = this;
      let json = {
        url: document.location.href
      };
      $http
        .post("member.member.wxJsSdkConfig", json)
        .then(res => {
          if (res.result == 1) {
            wx.config(res.data.config);
            wx.ready(function() {
              var isPageHide = false;
              window.addEventListener("pageshow", function() {
                if (isPageHide) {
                  window.location.reload();
                  if (!that.fun.isTextEmpty(src)) {
                    var bgAudio = document.getElementById("yp");
                    console.log(bgAudio);
                    bgAudio.play();
                  }
                }
              });
              window.addEventListener("pagehide", function() {
                isPageHide = true;
                if (!that.fun.isTextEmpty(src)) {
                  var bgAudio = document.getElementById("yp");
                  console.log(bgAudio);
                  bgAudio.play();
                }
              });

              if (!that.fun.isTextEmpty(src)) {
                var bgAudio = document.getElementById("yp");
                console.log(bgAudio);
                bgAudio.play();
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    closeTimeInterval() {
      console.log("dsdsdsdsds");
      clearInterval(intervalid);
    },

    initData() {
      this.title = "收银台";
    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getStoreInfo();
    this.initData();
  },
  created() {
    this.toi = this.fun.getKeyByI();
  },

  beforeDestroy() {
    console.log("破坏了哈哈哈");
    this.closeTimeInterval();
  },

  watch: {
    // $route(to, from) {
    //   console.log(this.$route);
    //   console.log(to);
    //   if(to.name!="cashier"){
    //     this.closeTimeInterval();
    //   }
    // }
  },

  // beforeRouteLeave(){
  //   this.closeTimeInterval();
  // },
  components: { cTitle, Loadmore }
};
