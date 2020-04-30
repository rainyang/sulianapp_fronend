import cTitle from "components/title";
import { mapState, mapMutations } from "vuex";
import { MessageBox } from "mint-ui";
import Fun from "../../../fun";
import { Indicator, Toast } from "mint-ui";
import Vue from "vue";

var self = null;
export default {
  beforeRouteLeave: function(to, from, next) {
    if (to.name == "HotelGoodsOrder") {
      MessageBox.confirm("您还没完成支付，确认离开?").then(action => {
        if (action == "confirm") {
          self.$router.push(self.fun.getUrl("home", {}));
          next();
        } else {
          next(false);
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      qrcode: "",
      showQR: false,
      balance: 0,
      payParams: "",
      info_form: {},
      order_sn: "",
      money: "",
      buttons: [],
      typename: "",
      pay_sn: "订单编号",
      order_pay_id: "",
      uid: "",

      popupSpecs: false,

      huanxun_form_quick: 18,
      huanxun_form_wx: 22,
      huanxun_form_action: "",
      huanxun_form_input: "",
      huanxun_input_name: "",

      // usdt
      usdt_value: 27,
      usdt_action: "",
      usdt_form: {},

      // 余额字样
      balanceLang: this.fun.getBalanceLang()
    };
  },
  methods: {
    getIconUrl(item) {
      let icon_url = "";
      switch (item.code) {
        case "wechatPay":
        case "cloudPayWechat":
        case "wechatApp":
        case "yunPayWechat":
        case "wftPay":
        case "huanxunWx":
        case "yop":
        case "convergePayWechat":
        case "WechatScan":
        case "WechatFace":
        case "WechatJsapi":
          icon_url = "icon-pay_wechat";
          break;
        case "alipay":
        case "cloudPayAlipay":
        case "alipayApp":
        case "yunPayAlipay":
        case "wftAlipay":
        case "convergePayAlipay":
        case "yopAlipay":
        case "AlipayScan":
        case "AlipayFace":
        case "AlipayJsapi":
          icon_url = "icon-pay_alipay";
          break;
        case "balance":
        case "MemberCard":
          icon_url = "icon-pay_yue";
          break;
        case "remittance":
          icon_url = "icon-pay_remittance";
          break;
        case "anotherPay":
          icon_url = "icon-pay_otherpay";
          break;
        case "UsdtPay":
          icon_url = "icon-pay_utsd";
          break;
        case "DepositPay":
          icon_url = "icon-pay_prepay";
          break;
        default:
          icon_url = "icon-pay_default";
          break;
      }
      return icon_url;
    },

    init() {
      this.popupSpecs = false;
      this.showQR = false;
      // alert(window.isMiniprogram)
    },
    confirm(btn) {
      var that = this;
      let type = btn.value;
      // type-1 微信, type-2 支付宝,type-7 APP微信, type-8 APP支付宝 ,type-6 云收银支付,type-3 余额支付 type 28 微信支付-汇聚 type 29 支付宝支付-汇聚

      if (type == 1) {
        that.getWeChatPayParams();
      } else if (type == 2) {
        // order.pay.alipay , order_id
        that.$router.push(
          that.fun.getUrl("alipay", {
            status: 2,
            recharge_money: this.money,
            order_pay_id: that.order_pay_id,
            uid: that.uid,
            pid: this.$route.query.pid ? this.$route.query.pid : that.uid
          })
        );
      } else if (type == 9) {
        that.appWeiPay();
      } else if (type == 10) {
        that.appAliPay();
      } else if (type == 6) {
        that.getWeChatPayParams2();
      } else if (type == 3) {
        // 是否开启余额密码支付
        if (btn.need_password == 1) {
          this.showPwdPop();
        } else {
          that.balancePay(""); // 无密码
        }
      } else if (type == 12) {
        // 新版微信支付
        this.newWechatPay();
      } else if (type == 11) {
        // 现金支付
        this.cashPay();
      } else if (type == 7) {
        // 云收银支付宝
        this.cloudAlipay();
      } else if (type == 14) {
        that.$router.push(
          that.fun.getUrl("PayAnother", { order_id: this.order_ids })
        );
      } else if (type == 15) {
        this.yunPayAlipay();
      } else if (type == 18) {
        this.huanxunQuick();
      } else if (type == 16) {
        this.transferAccounts();
      } else if (type == 17) {
        this.payMoney();
      } else if (type == 20) {
        this.alipayPayment();
      } else if (type == 21) {
        this.alipayMoney();
      } else if (type == 22) {
        this.huanxunWx();
      } else if (type == 24) {
        this.dianBangScan();
      } else if (type == 26) {
        this.yihepay();
      } else if (type == 27) {
        this.usdtPay();
      } else if (type == 28) {
        this.getwechatPay();
      } else if (type == 29) {
        this.getwechatPayAili();
      } else if (type == 31) {
        this.getadvancedeposit();
      } else if (type == 32) {
        this.yiBaoAlipay();
      } else if (type == 33) {
        this.jueqiAlipay();
      } else if (type == 42) {
        this.judge(type);
      } else if (type == 43) {
        this.judge(type);
      } else if (type == 48) {
        this.wechatJsapiPay(type);
      } else if (type == 49) {
        this.$router.push(
          this.fun.getUrl("alipay", {
            status: 49,
            recharge_money: 22,
            order_pay_id: this.order_pay_id,
            uid: this.uid,
            pid: this.uid
          })
        );
      } else if (type == 60) {
        this.yiBaoProWechat();
      } else if (type == 61) {
        this.yiBaoProAlipay();
      } else if (type == 56) {
        this.HKWechatPay();
      }
    },
    judge(type) {
      let that = this;
      $http
        .get("plugin.dragon-deposit.frontend.lcg-merchant.merchant-exist")
        .then(
          function(response) {
            if (response.result == 1) {
              if (type == 42) {
                that.walletPay();
              } else if (type == 43) {
                that.cardPay();
              }
            } else {
              that.$dialog.alert({
                message: response.msg
              });
              this.$router.push(this.fun.getUrl("myWallet"));
            }
          },
          function(response) {}
        );
    },
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
    //龙存管公共支付方法
    dragonPay(item) {
      let obj = item.form_data;
      var form = document.createElement("form");
      form.method = "post";
      form.setAttribute("action", item.action_url);
      let arr = ["INFO", "BODY", "SIGN", "CONTENTTYPE"];
      for (let i of arr) {
        let a = document.createElement("input");
        a.setAttribute("name", i);
        a.setAttribute("value", obj[i]);
        form.appendChild(a);
      }
      document.body.appendChild(form);
      form.style.display = "none";
      form.submit();
      return form;
    },
    walletPay() {
      let that = this;
      $http
        .get("order.merge-pay.lcg-balance", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.dragonPay(response.data);
            } else {
              that.$dialog.alert({
                message: response.msg
              });
            }
          },
          function(response) {}
        );
    },
    cardPay() {
      let that = this;
      $http
        .get("order.merge-pay.lcg-bank-card", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.dragonPay(response.data);
            } else {
              that.$dialog.alert({
                message: response.msg
              });
            }
          },
          function(response) {}
        );
    },
    jueqiAlipay() {
      let that = this;
      $http
        .get("order.merge-pay.wechat-pay-jueqi", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              window.location.href = response.data.url;
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    //易宝支付宝支付
    yiBaoAlipay() {
      let that = this;
      $http
        .get("order.merge-pay.yop-alipay", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              window.location.href = response.data.resultData;
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    // 微信支付（服务商）
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

    //预存款支付
    getadvancedeposit() {
      let that = this;
      $http
        .post("plugin.team-rewards.frontend.controllers.deposit-pay.index", {
          order_pay_id: that.order_pay_id
        })
        .then(
          function(response) {
            if (response.result === 1) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert(response.msg, "提示");
              that.$dialog.alert({
                message: response.msg
              });
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    // usdt支付
    usdtPay() {
      var that = this;
      $http
        .get("order.merge-pay.usdt-pay", { order_pay_id: that.order_pay_id })
        .then(
          response => {
            if (response.result === 1) {
              this.usdt_action = response.data.url;
              this.usdt_form = response.data.content;
              that.$nextTick(function() {
                document.getElementById("usdtubmit").submit();
              });
            } else {
              // MessageBox.alert(response.msg, "提示");
              that.$dialog.alert({
                message: response.msg
              });
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    },
    // 货到付款
    payMoney() {
      var that = this;
      var json = { order_pay_id: that.order_pay_id };
      $http.get("order.mergePay.COD", json).then(
        function(response) {
          if (response.result == 1) {
            if (that.fun.isTextEmpty(response.data.redirect)) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert(response.msg, "提示");
              that.$dialog.alert({
                message: response.msg
              });
            } else {
              // window.location.href = response.data.redirect;
              // MessageBox.alert(response.msg, "提示");
              if (
                response.data.redirect &&
                response.data.redirect.indexOf("showBalances") > -1
              ) {
                that.$dialog.alert({
                  message: response.msg
                });
                that.goShowBalances();
              } else {
                that.$dialog.alert({
                  mes: response.msg
                });
              }
            }
          } else {
            MessageBox.alert(response.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(response) {
          Toast(response.msg);
        }
      );
    },
    // 第三方转微信-威富通支付
    alipayPayment() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get("order.merge-pay.wft-wechat", json).then(
        function(response) {
          if (response.result == 1) {
            // that.newWXPay(response.data.pay_info,response.data.token_id)
            that.newWXPay(response.data.pay_info);
          } else {
            // MessageBox.alert(response.msg, "提示");
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
    // 第三方支付 微信支付-汇聚
    getwechatPay() {
      const that = this;
      let json = { order_pay_id: this.order_pay_id };
      $http.get("order.merge-pay.wechat-pay-hj", json).then(
        res => {
          if (res.result == 1) {
            let info = JSON.parse(res.data.data.rc_Result);
            // let response = {
            //   appId: info.appId,
            //   timestamp: info.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //   nonceStr: info.nonceStr, // 支付签名随机串，不长于 32 位
            //   package: info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            //   signType: info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //   paySign: info.paySign, // 支付签名
            // }
            console.log(info, "545454545454");

            this.newWXPay(info);
            // window.location.href = res.data.data.rc_Result
          } else {
            // MessageBox.alert(res.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(res) {
          // MessageBox.alert(res.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    // 第三方支付 支付宝-汇聚
    getwechatPayAili() {
      const that = this;
      let json = { order_pay_id: this.order_pay_id };
      $http.get("order.merge-pay.alipay-pay-hj", json).then(
        res => {
          if (res.result == 1) {
            window.location.href = res.data.data.rc_Result;
          } else {
            // MessageBox.alert(res.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(res) {
          // MessageBox.alert(res.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    // 支付宝
    alipayMoney() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get("order.merge-pay.wft-alipay", json).then(
        function(response) {
          console.log(response);
          if (response.result == 1) {
            if (that.fun.isTextEmpty(response.data.code_url)) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert(response.msg, "提示");
              that.$dialog.alert({
                message: response.msg
              });
            } else {
              // that.$router.push(that.fun.getUrl('alipay', { status: "10", recharge_money: response.data.code_url,order_pay_id: that.order_pay_id, uid: that.uid,pid:that.$route.query.pid?that.$route.query.pid:that.uid }))
              if (response.data.status == 200) {
                if (!that.fun.isWeiXin()) {
                  that.$router.push(
                    that.fun.getUrl("wft_balance_recharge", {
                      status: "12",
                      url: response.data.code_url
                    })
                  );
                } else {
                  that.$router.push(
                    that.fun.getUrl("wft_balance_recharge_copy", {
                      url: response.data.code_url,
                      code_url: response.data.code_img_url
                    })
                  );
                }
              } else {
                // MessageBox.alert(response.msg, "提示");
                that.$dialog.alert({
                  message: response.msg
                });
              }
            }
          } else {
            // MessageBox.alert(response.msg, "提示");
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
    // 云收银支付宝
    cloudAlipay() {
      var that = this;
      let json = {
        order_pay_id: that.order_pay_id,
        pid: this.$route.query.pid ? this.$route.query.pid : that.uid
      };
      $http.get("order.merge-pay.cloudAliPay", json, "").then(
        function(response) {
          if (response.result == 1) {
            that.$router.push(
              that.fun.getUrl("alipayCloud", {
                status: "6",
                url: response.data
              })
            );
          } else {
            // MessageBox.alert(response.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(response) {
          // error callback
          // MessageBox.alert(response.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    yunPayAlipay() {
      var that = this;
      let json = {
        order_pay_id: that.order_pay_id,
        pid: this.$route.query.pid ? this.$route.query.pid : that.uid
      };
      $http.get("order.merge-pay.yunPayAlipay", json, "").then(
        function(response) {
          if (response.result == 1) {
            that.$router.push(
              that.fun.getUrl("alipayCloud", {
                status: "6",
                url: response.data
              })
            );
          } else {
            console.log(response);
            // MessageBox.alert(response.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(response) {
          // error callback
          // MessageBox.alert(response.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    newWechatPay() {
      var that = this;
      let json = {
        order_pay_id: that.order_pay_id,
        pid: this.$route.query.pid ? this.$route.query.pid : that.uid
      };
      $http.get("order.merge-pay.yunPayWechat", json, "").then(
        function(response) {
          if (response.result == 1) {
            // wx.config(response.data.js)
            that.newWXPay(response.data, response.data.redirect);
          } else {
            // MessageBox.alert(response.msg, "提示");
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

    balancePay(password) {
      var that = this;
      let json = {
        order_pay_id: that.order_pay_id,
        i: that.fun.getKeyByI(),
        type: that.fun.getTyep(),
        pid: this.$route.query.pid ? this.$route.query.pid : that.uid
      };

      if (!this.fun.isTextEmpty(password)) {
        json = {
          order_pay_id: that.order_pay_id,
          i: that.fun.getKeyByI(),
          type: that.fun.getTyep(),
          payment_password: password,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        };
      }

      $http.get("order.credit-merge-pay.credit2", json, "").then(
        function(response) {
          if (response.result == 1) {
            // MessageBox.alert(response.msg, '提示')
            // that.$router.go(-1)
            if (that.fun.isTextEmpty(response.data.redirect)) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert(response.msg, "提示");
              that.$dialog.alert({
                message: response.msg
              });
            } else {
              // MessageBox.alert(response.msg, "提示");
              if (
                response.data.redirect &&
                response.data.redirect.indexOf("showBalances") > -1
              ) {
                that.$dialog.alert({
                  message: response.msg
                });
                that.goShowBalances();
              } else {
                that.$yddialog.toast({
                  mes: response.msg,
                  timeout: 1000,
                  icon: "success",
                  callback: () => {
                    window.location.href = response.data.redirect;
                  }
                });
              }
            }
          } else {
            // MessageBox.alert(response.msg, "提示");
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
    appWeiPay() {
      var that = this;
      $http
        .get("order.merge-pay.wechatAppPay", {
          order_pay_id: that.order_pay_id,
          i: that.fun.getKeyByI(),
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              YDB.SetWxpayInfo(
                that.$store.state.temp.mailInfo.name,
                "订单号：" + that.order_sn,
                that.money,
                that.order_sn,
                that.fun.getKeyByI()
              );
            } else {
              // MessageBox.alert(response.msg, "提示");
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

    cashPay() {
      this.$router.push(
        this.fun.getUrl("orderCash", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : this.uid
        })
      );
    },
    appAliPay() {
      var that = this;
      $http
        .get("order.merge-pay.alipayAppRay", {
          order_pay_id: that.order_pay_id,
          i: that.fun.getKeyByI(),
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              if (response.data.isnewalipay == 1) {
                YDB.SetRSA2AlipayInfo(
                  that.$store.state.temp.mailInfo.name,
                  that.fun.getKeyByI(),
                  that.money,
                  response.data.order_sn
                );
              } else {
                YDB.SetAlipayInfo(
                  that.$store.state.temp.mailInfo.name,
                  that.fun.getKeyByI(),
                  that.money,
                  that.order_sn
                );
              }
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    // 多订单合并支付获取信息接口方法
    getMultipleOrderInfo() {
      // order.pay.wechatPay
      var that = this;
      $http
        .get("order.merge-pay", {
          order_ids: this.order_ids,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.order_sn = response.data.order_pay.pay_sn;
              that.balance = Number(response.data.member.credit2).toFixed(2);
              that.money = Number(response.data.order_pay.amount).toFixed(2);
              that.uid = response.data.order_pay.uid;
              that.order_pay_id = response.data.order_pay.id; // 支付id
              that.buttons = response.data.buttons;
              that.typename = response.data.typename;
            } else {
              MessageBox({
                title: "提示",
                message: response.msg,
                showCancelButton: true
              }).then(action => {
                if (action == "confirm") {
                  that.$router.push(that.fun.getUrl("home"));
                }
              });
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    // //单个订单支付获取信息接口方法
    // getOrderInfo() {
    //   //order.pay.wechatPay
    //   var that = this
    //   $http.get('order.pay', { order_id: this.$route.params.order_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {
    //     if (response.result == 1) {
    //       that.order_sn = response.data.order.order_sn
    //       that.balance = response.data.member.credit2
    //       that.money = response.data.order.price
    //       that.buttons = response.data.buttons
    //     } else {
    //       MessageBox.alert(response.msg)

    //     }
    //   }, function (response) {
    //     // error callback
    //   })
    // },
    getWeChatPayParams() {
      // order.pay.wechatPay
      var that = this;

      if (window.isMiniprogram) {
        this.getMiniWeChatPayParams();
        return;
      }
      $http
        .get("order.merge-pay.wechatPay", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              wx.config(response.data.js);
              that.WXPay(response.data.config, response.data.redirect);
            } else {
              // MessageBox.alert(response.msg, "提示");
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

    getMiniWeChatPayParams() {
      // order.pay.wechatPay
      var that = this;
      $http
        .get("order.merge-pay.wechatPay", {
          app_type: "wechat",
          client_type: 2,
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              // wx.config(response.data.js)
              var pay_data = response.data.config;
              console.log("ressss::::", pay_data);
              var payParams = {
                timeStamp: pay_data.timestamp,
                nonceStr: pay_data.nonceStr,
                package: pay_data.package,
                signType: pay_data.signType,
                paySign: pay_data.paySign
              };
              // console.log("payParams::::", payParams)

              that.miniWxPay(payParams);

              // that.WXPay(response.data.config)
            } else {
              // MessageBox.alert(response.msg, "提示");
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

    getWeChatPayParams2() {
      var that = this;
      $http
        .get("order.merge-pay.cloudWechatPay", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              window.location.href = response.data;
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    initHtml() {
      this.balance = this.$store.state.balance;
    },
    goShowBalances() {
      this.$router.push(
        this.fun.getUrl("showBalances", {
          pay_sn: this.order_sn,
          pay_type: "pay"
        })
      );
    },
    WXPay(payParams, cbHref) {
      // alert(document.location.href)
      // console.log(""+payParams.timestamp)
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
            // that.$router.go(-1)
            // MessageBox.alert('支付成功', '提示')

            if (that.fun.isTextEmpty(cbHref)) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert("支付成功", "提示");
              that.$dialog.alert({
                message: "支付成功"
              });
            } else {
              if (cbHref && cbHref.indexOf("showBalances") > -1) {
                that.goShowBalances();
              } else {
                window.location.href = cbHref;
                // MessageBox.alert("支付成功", "提示");
                that.$dialog.alert({
                  message: "支付成功"
                });
              }
            }
          } else {
            // MessageBox.alert("支付失败", "提示");
            that.$dialog.alert({
              message: "支付失败"
            });
            console.log(payParams, "支付失败参数咋样");
          }
        },
        cancel: function(res) {
          // 支付取消
        },
        fail: function(res) {
          // MessageBox.alert("支付失败，请返回重试", "提示");
          that.$dialog.alert({
            message: "支付失败，请返回重试"
          });
        }
      });
    },

    miniWxPay(payParams) {
      // alert(document.location.href)
      // console.log(""+
      var params =
        "?timestamp=" +
        payParams.timeStamp +
        "&nonceStr=" +
        payParams.nonceStr +
        "&package=" +
        encodeURIComponent(payParams.package) +
        "&signType=" +
        payParams.signType +
        "&paySign=" +
        payParams.paySign;
      // 定义path 与小程序的支付页面的路径相对应
      var path = "/pages/pay/orderPay" + params;
      // 通过JSSDK的api使小程序跳转到指定的小程序页面
      wx.miniProgram.navigateTo({ url: path });
    },

    newWXPay(payParams, cbHref) {
      console.log("调用 啊啊啊啊");

      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payParams.appId, // 公众号名称，由商户传入
          timeStamp: payParams.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: payParams.nonceStr, // 随机串
          package: payParams.package,
          signType: payParams.signType, // 微信签名方式：
          paySign: payParams.paySign // 微信签名
        },

        function(res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // that.$router.go(-1)
            // MessageBox.alert('支付成功', '提示')

            if (that.fun.isTextEmpty(cbHref)) {
              that.$router.push(that.fun.getUrl("home"));
              // MessageBox.alert("支付成功", "提示");
              that.$dialog.alert({
                message: "支付成功"
              });
            } else {
              window.location.href = cbHref;
              // MessageBox.alert("支付成功", "提示");
              that.$dialog.alert({
                message: "支付成功"
              });
            }
          } else {
            // MessageBox.alert("支付失败", "提示");
            that.$dialog.alert({
              message: "支付失败"
            });
          }
        }
      );
    },
    huanxunQuick() {
      var that = this;

      $http
        .get("order.merge-pay.huanxunQuick", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.huanxun_input_name = "pGateWayReq";
              that.huanxun_form_action = response.data["url"];
              that.huanxun_form_input = response.data["content"];

              that.$nextTick(function() {
                document.getElementById("ipspaysubmit").submit();
              });
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    huanxunWx() {
      var that = this;

      $http
        .get("order.merge-pay.huanxunWx", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              that.huanxun_input_name = "wxPayReq";
              that.huanxun_form_action = response.data["url"];
              that.huanxun_form_input = response.data["content"];

              that.$nextTick(function() {
                document.getElementById("ipspaysubmit").submit();
              });
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    // 易合支付
    yihepay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get("order.merge-pay.yop-pay", json, "").then(
        function(response) {
          if (response.result == 1) {
            that.newWXPay(response.data.resultData);
          } else {
            console.log(response);
            // MessageBox.alert(response.msg, "提示");
            that.$dialog.alert({
              message: response.msg
            });
          }
        },
        function(response) {
          // error callback
          // MessageBox.alert(response.msg, "提示");
          that.$dialog.alert({
            message: response.msg
          });
        }
      );
    },
    dianBangScan() {
      var that = this;

      $http
        .get("order.merge-pay.dianBangScan", {
          order_pay_id: this.order_pay_id,
          pid: this.$route.query.pid ? this.$route.query.pid : that.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              if (response.data["code_url"]) {
                location.href = response.data["code_url"];
              }
            } else {
              // MessageBox.alert(response.msg, "提示");
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
    btnclass(type) {
      if (type == 1 || type == 6 || type == 9 || type == 20 || type == 22 || type == 60 || type == 56) {
        return "bg_wechat";
      } else if (type == 2 || type == 10 || type == 7 || type == 21 || type == 61) {
        return "bg_ali";
      } else if (type == 14) {
        return "bg_payanother";
      } else if (type == 18 || type == 24) {
        return "bg_quick";
      } else {
        return "bg_alipay";
      }
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

    // 验证密码
    getVerifyPassword(pwd) {
      // order.pay.wechatPay
      var that = this;
      $http.get("payment.password.check", { password: pwd }, "").then(
        function(response) {
          if (response.result == 1) {
            that.balancePay(pwd);
          } else {
            MessageBox({
              title: "提示",
              message: response.msg,
              showCancelButton: true
            }).then(action => {
              if (action == "confirm") {
                if (response.data.code == 2001) {
                  // 商城支付密码设置未开启
                  // that.$router.go(-1)
                } else if (response.data.code == 2002) {
                  // 用户未设置支付密码
                  // 去设置密码
                  that.$router.push(
                    that.fun.getUrl("set_balance_password", {})
                  );
                } else if (response.data.code == 2003) {
                  // 支付密码错误
                }
              } else if (action == "cancel") {
                if (response.data.code == 2001) {
                  // 商城支付密码设置未开启
                } else if (response.data.code == 2002) {
                  // 用户未设置支付密码
                } else if (response.data.code == 2003) {
                  // 支付密码错误
                }
              }
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
    // 转账支付
    transferAccounts() {
      this.$router.push(
        this.fun.getUrl("TransferAccount", {
          id: this.order_pay_id,
          order_ids: this.$route.params.order_ids,
          status: "2"
        })
      );
    }
  },
  activated() {
    this.init();
    if (this.$route.params.status == 2) {
      this.order_ids = decodeURI(this.$route.params.order_ids); // JSON.parse(this.$route.params.order_ids)
    } else {
      this.order_ids = this.$route.params.order_ids;
    }
    this.getMultipleOrderInfo();

    self = this;
    // if(this.$route.params.type == 1)
    // {
    //   this.getOrderInfo()

    // }else
    // {
    //   this.getMultipleOrderInfo()
    // }
    // this.initHtml()
  },
  components: {
    cTitle
  }
};
