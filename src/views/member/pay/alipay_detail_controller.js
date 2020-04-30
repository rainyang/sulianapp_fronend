import cTitle from "components/title";
import { MessageBox,Toast } from "mint-ui";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      alipay_url: "",
      uid: ""
    };
  },
  methods: {
    webToPay() {
      if (!this.fun.isWeiXin()) {
        document.location.href = this.alipay_url;
      } else {
        if (this.fun.getPhoneEnv() == "1") {
          window.location = window.location;
        }
      }
    },
    //余额充值
    toPay() {
      var that = this;
      $http
        .get(
          "finance.balance.alipay",
          {
            order_sn: this.$route.params.order_pay_id,
            uid: this.$route.params.uid,
            pay_type: 2,
            recharge_money: this.$route.params.recharge_money
          },
          "正在充值"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data;
              //alert(response.data);
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //订单支付
    toPayOrder() {
      var that = this;
      var payUrl = "";
      if (that.$route.params.money) {
        payUrl = "order.merge-pay.wft-alipay";
      } else {
        payUrl = "order.merge-pay.alipay";
      }
      $http
        .get(
          payUrl,
          {
            pid: this.$route.query.pid
              ? this.$route.query.pid
              : window.localStorage.getItem("uid"),
            uid: this.$route.params.uid,
            order_pay_id: this.$route.params.order_pay_id,
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "loading"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              if (that.$route.params.money) {
                that.alipay_url = response.data.code_url;
              } else {
                that.alipay_url = response.data;
              }

              that.webToPay(response.data);
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    //金币充值
    toPayByGold() {
      var that = this;
      let json = {
        pay_type: 2,
        change_value: this.$route.params.recharge_money,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep(),
        uid: this.$route.params.uid
      };
      $http
        .get("plugin.gold.frontend.controllers.recharge", json, "正在充值")
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data;
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
            MessageBox.alert(response.msg, "提示");
          }
        );
    },

    //押金充值 租赁
    toPayByCash() {
      var that = this;
      let json = { payment: 2, order_sn: this.$route.params.order_pay_id };
      $http
        .get(
          "plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.pay",
          json,
          "正在充值"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data;
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
            MessageBox.alert(response.msg, "提示");
          }
        );
    },

    //打卡支付
    toPayClockin() {
      var that = this;
      this.alipay_url = this.$route.params.url;
      that.webToPay();

      // var that = this;
      // let json = { "pay_method": "2", "amount": "1" };
      // $http.get('plugin.clock-in.api.clock-in-pay.run-clock-pay', json, '支付中').then(function (response) {
      //     if (response.result == 1) {
      //         that.alipay_url = response.data;
      //         that.webToPay();
      //     } else {
      //         MessageBox.alert(response.msg, '提示');
      //     }
      // }, function (response) {
      //     // error callback
      //     MessageBox.alert(response.msg, '提示');
      // });
    },

    //云收银 支付宝支付
    toPayCloud() {
      var that = this;
      this.alipay_url = this.$route.params.url;
      that.webToPay();
    },

    //云收银 支付宝支付
    toPayCloudByBalance() {
      var that = this;
      this.alipay_url = this.$route.params.url;
      that.webToPay();
    },

    //冻结币 支付宝支付
    toFrozen() {
      var that = this;
      $http
        .get(
          "plugin.froze.Frontend.Modules.Froze.Controllers.recharge.alipay",
          { order_sn: this.$route.params.order_pay_id },
          "正在充值"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data;
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //爱心值 支付宝支付
    toLove() {
      var that = this;
      $http
        .get(
          "plugin.love.Frontend.Modules.Love.Controllers.recharge.alipay",
          { order_sn: this.$route.params.order_pay_id },
          "正在充值"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data;
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    //威富通支付宝
    toWftPay() {
      $http
        .get(
          "order.merge-pay.wft-alipay",
          {
            pid: this.$route.query.pid
              ? this.$route.query.pid
              : window.localStorage.getItem("uid"),
            uid: this.$route.params.uid,
            order_pay_id: this.$route.params.order_pay_id
          },
          "loading"
        )
        .then(
          response => {
            if (response.result == 1) {
              if (response.data.status == 200) {
                this.alipay_url = response.data.code_url;
                this.webToPay();
              }
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    //威富通支付宝余额充值
    toWftBalancePay() {
      var that = this;
      $http
        .get(
          "finance.balance.alipay",
          { order_sn: this.$route.params.order_pay_id },
          "正在充值"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.alipay_url = response.data.code_url;
              that.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //爱心值支付宝充值
    toLoveRecharge() {
      console.log(this.$route.params.order_pay_id);
      $http
        .get(
          "plugin.love.Frontend.Modules.Love.Controllers.recharge.alipay",
          { order_sn: this.$route.params.pay_id },
          "正在充值"
        )
        .then(res => {
          if (res.result == 1) {
            this.alipay_url = res.data;
            this.webToPay();
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 支付宝支付（服务商）
    alipayapiPay() {
      $http
        .get("order.merge-pay.alipay-jsapi-pay", {
          order_pay_id: this.$route.params.order_pay_id,
          pid: this.$route.params.uid
        })
        .then( (response)=> {
            if (response.result === 1) {
              this.alipay_url = response.data;
              this.webToPay();
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    },

    toWftBalancePay1() {
      this.alipay_url = this.$route.params.url;
      console.log(this.alipay_url);
      this.webToPay();
    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    console.log(this.$route.params.status);
    if (!this.fun.isWeiXin()) {
      if (this.$route.params.status == "2") {
        //订单支付
        this.toPayOrder();
      } else if (this.$route.params.status == "1") {
        if (this.$route.params.tag == "frozen") {
          console.log("冻结币执行了");
          this.toFrozen();
        } else if (this.$route.params.tag == "love") {
          console.log("爱心值执行了");
          this.toLove();
        } else {
          //余额充值
          console.log("余额充值执行了");
          this.toPay();
        }
      } else if (this.$route.params.status == "3") {
        //金币充值
        this.toPayByGold();
      } else if (this.$route.params.status == "4") {
        //押金充值
        this.toPayByCash();
      } else if (this.$route.params.status == "5") {
        //打卡
        this.toPayClockin();
      } else if (this.$route.params.status == "6") {
        //云收银 支付宝支付
        this.toPayCloud();
      } else if (this.$route.params.status == "7") {
        //第三方 支付宝 余额充值
        this.toPayCloudByBalance();
      } else if (this.$route.params.status == "8") {
        //云收银 支付宝支付 收银台支付
        this.toPayCloud();
      } else if (this.$route.params.status == "9") {
        //云收银 支付宝支付 视频打赏
        this.toPayCloud();
      } else if (this.$route.params.status == "10") {
        //威富通支付宝支付
        this.toWftPay();
      } else if (this.$route.params.status == "12") {
        //威富通支付宝余额支付
        this.toWftBalancePay1();
      } else if (this.$route.params.status == "11") {
        //爱心值支付宝充值
        this.toLoveRecharge();
      } else if(this.$route.params.status == "49"){
        // 支付宝支付（服务商）
        this.alipayapiPay();
      }
    }
  },
  components: { cTitle },
  created() {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
      location.href =
        document.location.protocol +
        "//" +
        window.location.host +
        "/addons/yun_shop/" +
        "?menu#" +
        this.$route.fullPath;
    }
    // window.location.href = window.location.href;
    // console.log("ssssssssssss", window.location.href, this.$route);
  }
};
