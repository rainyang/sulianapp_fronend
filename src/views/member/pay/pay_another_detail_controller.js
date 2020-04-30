import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";

export default {
  data() {
    return {
      qrcode: "",
      showQR: false,
      payerImg: "",
      payerName: "",
      goodList: [],
      totalNum: 0,
      totalPrice: 0,
      btns: [],
      //支付id
      payId: "",
      order_sn: "",

      popupSpecs: false,
      isMiniprogram: false

    };
  },
  methods: {
    // 微信香港钱包(扫码支付)
    HKWechatPay() {
      let that = this;
      $http
        .get("order.merge-pay.hk-scan-pay", {
          order_pay_id: that.order_pay_id
        },"loading")
        .then(
          function(response) {
            if (response.result == 1) {
              that.qrcode = response.data.qrcode;
              that.showQR = true;
            } else {
              that.$dialog.alert({
                message: response.msg
              });
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //获取代付会员信息和支付信息
    getPayerInfo() {
      $http.get("order.merge-pay.anotherPayOrder", {
        order_ids: this.$route.query.order_ids,
        mid: this.$route.query.mid,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }).then(response => {
        if (response.result == 1) {
          this.payerImg = response.data.member.avatar;
          this.payerName = response.data.member.nickname;
          this.btns = response.data.buttons;
          this.payId = response.data.order_pay.id;
          this.totalPrice = response.data.order_pay.amount;
        } else if (response.result == 0) {
          MessageBox.alert(response.msg, "提示");
          this.$router.push(this.fun.getUrl("home"));
        } else {
          return;
        }
      }).catch(error => {
        console.log(error);
      });
    },

    //获取订单详情
    getOrderDetail() {
      $http.get("order.another-pay-detail", {
        order_id: this.$route.query.order_ids,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }).then(response => {
        console.log(response);
        if (response.result == 1) {
          this.goodList = response.data;
          //this.totalNum=response.data.goods_total;
          //this.totalPrice=response.data.goods_price;


          let numSum = 0;

          response.data.forEach(val => {

            return numSum += val.goods_total;
          });

          this.totalNum = numSum;


          this.order_sn = response.data.order_sn;


        } else {
          MessageBox.alert(response.msg, "提示");
          this.$router.push(this.fun.getUrl("home"));
        }
      }).catch(error => {
        console.log(error);
      });
    },

    //支付按钮class
    btnclass(type) {
      if (type == 1 || type == 6 || type == 9 || type == 12|| type == 56) {
        return "wei-btn";
      } else if (type == 2 || type == 10 || type == 7) {
        return "zhi-btn";
      } else {
        return "yu-btn";
      }
    },

    //小程序跳转到小程序端支付
    miniPay() {
      MessageBox.alert("请点击右上角分享！");
    },

    //确认支付 type-1 微信, type-2 支付宝,type-9 APP微信, type-10 APP支付宝 ,type-7 云收银支付,type-3 余额支付,type-12 新版微信支付，type-11 现金支付
    confirmPay(btn) {
      var that = this;
      let type = btn.value;
      switch (type) {
        case 1:
          this.getWeChatPayParams();
          break;
        case 2:
          this.$router.push(this.fun.getUrl("alipay", {
            status: 2,
            recharge_money: this.totalPrice,
            order_pay_id: this.payId,
            uid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid"),
            pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
          }));
          break;
        case 9:
          this.appWeiPay();
          break;
        case 10:
          this.appAliPay();
          break;
        case 6:
          this.getWeChatPayParams2();
          break;
        case 3:
          //是否开启余额密码支付
          if (btn.need_password) {
            this.showPwdPop();
          } else {
            this.balancePay("");//无密码
          }
          break;
        case 12:
          this.newWechatPay();
          break;
        case 11:
          this.cashPay();
          break;
        case 7:
          this.cloudAlipay();
          break;
        case 28: // 汇聚微信支付
          this.hjWxPay();
          break;
        case 48: // 微信支付（服务商）
          this.wechatJsapiPay();
          break;
        case 49: // 支付宝支付（服务商）
          this.$router.push(
            this.fun.getUrl("alipay", {
              status: 49,
              recharge_money: 22,
              order_pay_id: this.order_pay_id,
              uid: this.uid,
              pid: this.uid
            })
          );
          break;
        case 60: // 易宝Pro微信支付
          this.yiBaoProWechat();
          break;
        case 61: // 易宝Pro支付宝支付
          this.yiBaoProAlipay();
          break;
        case 56:
          this.HKWechatPay();
          break;
        default:
          break;
      }
    },
    wechatJsapiPay() {
      var that = this;
      if (window.isMiniprogram) {
        this.getMiniWeChatPayParams();
        return;
      }
      $http
        .get("order.merge-pay.wechat-jsapi-pay", {
          order_pay_id: this.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.newWXPay(response.data.config, response.data.redirect);
            } else {
              MessageBox.alert(response.msg, "提示");
              that.$router.push(
                that.fun.getUrl("orderdetail", { order_id: that.order_pay_id })
              );
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    //易宝Pro微信支付
    yiBaoProWechat() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get("order.merge-pay.yop-pro-wechat", json, "").then(
        function(response) {
          if (response.result == 1) {
            that.newWXPay(response.data.resultData);
          } else {
            console.log(response);
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(response) {
          // MessageBox.alert(response.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    //易宝Pro支付宝支付
    yiBaoProAlipay() {
      let that = this;
      $http
        .get("order.merge-pay.yop-pro-alipay", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              window.location.href = response.data.resultData;
            } else {
              that.$dialog.alert({
                message: response.msg
              });
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    // 第三方支付 微信支付-汇聚
    hjWxPay() {
      let json = { order_pay_id: this.payId };
      $http.get("order.merge-pay.wechat-pay-hj", json).then( res => {
          if (res.result == 1) {
            let info = JSON.parse(res.data.data.rc_Result);

            this.newWXPay(info);
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        },
        function(res) {
          MessageBox.alert(res.msg, "提示");
        }
      );
    },

    //微信支付
    getWeChatPayParams() {
      var json = {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      };
      if (window.isMiniprogram) {
        var json = {
          order_pay_id: this.payId,
          client_type: 2,
          pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
        };
      }
      $http.get("order.merge-pay.wechatPay", json).then(response => {
        if (response.result == 1) {
          if (window.isMiniprogram) {
            this.miniWxPay(response.data.config);
          } else {
            wx.config(response.data.js);
            this.WXPay(response.data.config, response.data.redirect);
          }
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }).catch(error => {
        console.log(error);
      });
    },

    miniWxPay(payParams) {
      //alert(document.location.href);
      //console.log(""+
      var params = "?timestamp=" + payParams.timestamp + "&nonceStr=" + payParams.nonceStr + "&package=" + encodeURIComponent(payParams.package) + "&signType=" + payParams.signType + "&paySign=" + payParams.paySign;
      //定义path 与小程序的支付页面的路径相对应
      var path = "/pages/pay/orderPay" + params;
      //通过JSSDK的api使小程序跳转到指定的小程序页面
      wx.miniProgram.navigateTo({ url: path });
    },

    WXPay(payParams, cbHref) {
      //alert(document.location.href);
      //console.log(""+payParams.timestamp);
      var that = this;
      wx.chooseWXPay({
        appId: payParams.appId,
        timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
        package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payParams.paySign, // 支付签名
        success: function(res) {
          // 支付成功后的回调函数
          if (res.errMsg == "chooseWXPay:ok") {

            //  that.$router.push(that.fun.getUrl('home'));
            //  MessageBox.alert('支付成功', '提示');

            if (that.fun.isTextEmpty(cbHref)) {
              that.$router.push(that.fun.getUrl("home"));
              MessageBox.alert("支付成功", "提示");
            } else {
              window.location.href = cbHref;
              MessageBox.alert("支付成功", "提示");
            }

          } else {
            MessageBox.alert("支付失败", "提示");
          }
        },
        cancel: function(res) {
          //支付取消
        },
        fail: function(res) {
          MessageBox.alert("支付失败，请返回重试", "提示");
        }
      });
    },

    appWeiPay() {
      var that = this;
      $http.get("order.merge-pay.wechatAppPay", {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }).then(function(response) {
        if (response.result == 1) {
          YDB.SetWxpayInfo(that.$store.state.temp.mailInfo.name, "订单号：" + that.order_sn, that.totalPrice, that.order_sn, that.fun.getKeyByI());
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
      });


    },

    appAliPay() {
      var that = this;
      $http.get("order.merge-pay.alipayAppRay", {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }).then(function(response) {
        if (response.result == 1) {
          YDB.SetAlipayInfo(that.$store.state.temp.mailInfo.name, that.fun.getKeyByI(), that.totalPrice, that.order_sn);
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
      });

    },


    getWeChatPayParams2() {
      var that = this;
      $http.get("order.merge-pay.cloudWechatPay", {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }).then(function(response) {
        if (response.result == 1) {
          window.location.href = response.data;
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
      });
    },


    showPwdPop() {
      this.popupSpecs = true;
    },

    hidePwdPop() {
      this.popupSpecs = false;

    },

    keyboardDone(val) {
      this.hidePwdPop();
      this.getVerifyPassword(val);

    },


    //验证密码
    getVerifyPassword(pwd) {
      //order.pay.wechatPay
      var that = this;
      $http.get("payment.password.check", { password: pwd }, "").then(function(response) {
        if (response.result == 1) {
          that.balancePay(pwd);

        } else {
          MessageBox({
            title: "提示",
            message: response.msg,
            showCancelButton: true
          }).then(action => {
            if (action == "confirm") {
              if (response.data.code == 2001)//商城支付密码设置未开启
              {
                //that.$router.go(-1);
              } else if (response.data.code == 2002)//用户未设置支付密码
              {
                //去设置密码
                that.$router.push(that.fun.getUrl("set_balance_password", {}));
              } else if (response.data.code == 2003) {//支付密码错误

              }
            } else if (action == "cancel") {
              if (response.data.code == 2001)//商城支付密码设置未开启
              {

              } else if (response.data.code == 2002)//用户未设置支付密码
              {

              } else if (response.data.code == 2003) {//支付密码错误

              }
            }
          });
        }
      }, function(response) {
        MessageBox.alert(response.msg, "提示");
      });
    },


    balancePay(password) {
      var that = this;
      let json = {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      };

      if (!this.fun.isTextEmpty(password)) {
        json = {
          order_pay_id: this.payId,
          payment_password: password,
          pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
        };
      }


      $http.get("order.credit-merge-pay.credit2", json, "").then(function(response) {
        if (response.result == 1) {
          // MessageBox.alert(response.msg, '提示');
          // that.$router.push(that.fun.getUrl('home'));
          if (that.fun.isTextEmpty(response.data.redirect)) {
            that.$router.push(that.fun.getUrl("home"));
            MessageBox.alert(response.msg, "提示");
          } else {
            window.location.href = response.data.redirect;
            MessageBox.alert(response.msg, "提示");
          }
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
      });
    },

    cashPay() {
      this.$router.push(this.fun.getUrl("orderCash", {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      }));
    },


    //云收银支付宝
    cloudAlipay() {
      var that = this;
      let json = {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      };
      $http.get("order.merge-pay.cloudAliPay", json, "").then(function(response) {
        if (response.result == 1) {
          that.$router.push(that.fun.getUrl("alipayCloud", { status: "6", url: response.data }));
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
        MessageBox.alert(response.msg, "提示");
      });
    },


    //初始化数据
    init() {
      this.payerImg = "";
      this.goodList = [];
      this.payerName = "";
      this.totalNum = 0;
      this.totalPrice = 0;
      this.btns = [];
      this.payId = "";
      this.popupSpecs = false;
      this.showQR = false;
    },

    newWechatPay() {
      var that = this;
      let json = {
        order_pay_id: this.payId,
        pid: this.$route.query.pid ? this.$route.query.pid : window.localStorage.getItem("uid")
      };
      $http.get("order.merge-pay.yunPayWechat", json, "").then(function(response) {
        if (response.result == 1) {
          //wx.config(response.data.js);
          that.newWXPay(response.data, response.data.redirect);
        } else {
          MessageBox.alert(response.msg, "提示");
        }
      }, function(response) {
        // error callback
      });
    },

    newWXPay(payParams, cbHref) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest", {
          "appId": payParams.appId,     //公众号名称，由商户传入
          "timeStamp": payParams.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": payParams.nonceStr, //随机串
          "package": payParams.package,
          "signType": payParams.signType,         //微信签名方式：
          "paySign": payParams.paySign //微信签名
        },

        function(res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // that.$router.go(-1);
            // MessageBox.alert('支付成功', '提示');

            if (that.fun.isTextEmpty(cbHref)) {
              that.$router.push(that.fun.getUrl("home"));
              MessageBox.alert("支付成功", "提示");
            } else {
              window.location.href = cbHref;
              MessageBox.alert("支付成功", "提示");
            }
          } else {
            MessageBox.alert("支付失败", "提示");
          }
        }
      );
    }

  },
  activated() {
    if (window.isMiniprogram) {
      this.isMiniprogram = true;
    }
    this.init();
    this.getPayerInfo();
    this.getOrderDetail();
  },
  components: { cTitle }
};
