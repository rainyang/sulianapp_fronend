import cTitle from "components/title";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";

//import cOrder from 'components/order';
var intervalid;

export default {
  data() {
    return {
      qrcode: "",
      vedioSrc: "",
      adShow: false
    };
  },

  activated() { },

  mounted() {

    if (this.fun.isTextEmpty(this.$route.params.hotel_id)) {
      this.getQrcode();
    } else {
      this.getHotelData();
    }
  },
  methods: {
    //获取收货地址
    getQrcode() {
      this.addressData = [];
      let that = this;
      let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      $http
        .get("plugin.store-cashier.frontend.cashier.QrCode", json, "获取中...")
        .then(
        function (response) {
          console.log("qrcode:", response.data);
          if (response.result == 1) {
            that.qrcode = response.data.url;
            //that.store_id=response.data.store_id;
            that.adShow = response.data.audio_open == 1 ? true : false;
            if (response.data.audio_open == 1) {
              that.openTime(response.data.store_id);
            }
          } else {
          }
        },
        function (response) {
          console.log(response);
        }
        );
    },

    openTime(id) {
      intervalid = setInterval(() => {
        $http
          .get("plugin.store-cashier.frontend.cashier.voice-broadcast.index", {
            store_id: id
          })
          .then(res => {
            if (res.result == 1) {
              this.vedioSrc = "";
              var that = this;
              this.vedioSrc = res.data.url;
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
            wx.ready(function () {
              var bgAudio = document.getElementById("yp");
              console.log(bgAudio);
              bgAudio.load();
              bgAudio.play();

              WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
                console.log(bgAudio);
                bgAudio.load();
                bgAudio.play();
              });
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

    beforeDestroy() {
      console.log("破坏了哈哈哈");
      this.closeTimeInterval();
    },

    goto() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("home", {}));
      } else {
        clearInterval(intervalid);
        this.$router.go(-1);
      }
    },

    getHotelData() {
      $http.get("plugin.hotel.frontend.cashier.qr-code.index").then(res => {
        if (res.result == 1) {
          this.qrcode = res.data.url;
        }
      }).catch(error => {
        console.log(error);
      })
    }
  },

  watch: {
    $route(to, from) {
      console.log(to);
      if (to.name != "cashier_qr") {
        this.closeTimeInterval();
      }
    }
  },
  components: { cTitle }
};
