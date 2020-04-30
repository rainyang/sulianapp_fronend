import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";

let initWithdrawal = "";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      // 是否提现到微信
      withdrawToWechat: 0,
      // 是否提现到支付宝
      withdrawToAlipay: 0,
      withdrawToManual: 0,
      supplier: "",
      balance: 0,
      service_money: 0,
      withdrawType: {}, // 提现方法
      info_form: {
        balance_money: ""
      },
      withdraw_multiple: 1, //余额提现倍数

      // 选择提现方法
      pay_type: "",

      eupshow: false,

      popupVisible: false,

      hxShow: false,
      action: "",

      msg: "",

      notice: "",
      service_type: 0,

      // 余额字样
      balanceLang: this.fun.getBalanceLang(),
      converge_pay: false, // 汇聚按钮的显示
      show2: false, // 判断
      show3: false, // 银行卡列表
      withList: [], // 银行卡列表
      checkObj: {}, // 选中的银行卡
      actual_amount: "", // 实际到账金额
      poundageHj: "", // 手续费
      cost_money: "", // 提现金额
      poundage_name:'',//手续费字样
    };
  },
  activated() {
    this.supplier = this.$route.params.supplier;
    this.initData();
    this.toi = this.fun.getKeyByI();
    // 获取数据
    if (this.supplier === "supplier") {
      this.getData2();
    } else {
      this.getData();
    }
    initWithdrawal = this.fun.initWithdrawal();
    this.fun.setWXTitle(initWithdrawal);
  },
  methods: {
    initData() {
      this.eupshow = false;
      this.popupVisible = false;
      this.hxShow = false;
      this.action = "";
      this.msg = "";
      this.notice = "";
      this.pay_type = "";
      this.info_form.balance_money = "";
      this.withdraw_multiple = 1;
      this.show2 = false;
      this.show3 = false;
      //自定义手续费字段
      this.poundage_name = this.fun.initMailLanguage().income.poundage_name;
    },
    // 获取数据
    getData() {
      let that = this;
      let json = {};
      $http.get("finance.balance-withdraw.page", json, "获取中").then(
        function(response) {
          if (response.result === 1) {
            that.balance = response.data.balance;
            that.withdrawToAlipay = response.data.alipay;
            that.withdrawToWechat = response.data.wechat;
            that.withdrawToManual = response.data.manual;
            that.poundage = response.data.poundage;
            that.withdraw_multiple = Number(response.data.withdraw_multiple);

            that.eupshow = response.data.eup_pay;

            that.hxShow = response.data.huanxun;
            console.log(response.data.converge_pay, response.data, "数据");

            that.converge_pay = response.data.converge_pay;
          } else {
            console.log(response.msg);
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
          Toast(response);
        }
      );
    },
    // 获取银行卡列表
    getwithList() {
      $http
        .get(
          "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.get-bank-card-list"
        )
        .then(res => {
          if (res.result == 1) {
            res.data.map(item => {
              item.check = false;
              if (
                item.receiverAccountNoEnc != "" &&
                item.receiverAccountNoEnc != null
              ) {
                item.bankName +=
                  "(" +
                  item.receiverAccountNoEnc.substring(
                    item.receiverAccountNoEnc.length - 4
                  ) +
                  ")";
              }
            });
            this.withList = res.data;
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        });
    },
    checkOut(item) {
      // item.check = !item.check;
      this.withList.map(val => {
        if (val.id == item.id) {
          // val.check = !item.check;
        } else {
          val.check = false;
        }
      });
      //运行机制：先执行该函数，再双向绑定
      if (item.check == false) {
        this.show3 = false;
        this.show2 = true;
        this.checkObj = item;
      }
    },
    backTap() {
      this.show2 = false;
      this.show1 = true;
      this.show3 = false;
    },
    gotoList() {
      this.show2 = false;
      this.show1 = false;
      this.show3 = true;
    },
    getData2() {
      let that = this;
      let json = { member_id: this.$route.params.member_id };
      $http.get("plugin.supplier.frontend.withdraw.index", json, "获取中").then(
        function(response) {
          if (response.result === 1) {
            that.balance = response.data.cost_money;
            that.service_money = response.data.service_money;
            that.service_type = response.data.service_type;

            that.withdrawType = response.data.type;
          } else {
            console.log(response.msg);
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    btnclass(type) {
      if (type == 1) {
        return "icon-balance_h";
      } else if (type == 2) {
        return "icon-balance_i";
      } else {
        return "icon-balance_j";
      }
    },
    // 提交银行卡的东西
    getTp() {
      console.log(this.checkObj, "选中的参数");

      $http
        .post(
          "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.set-bank-card",
          { set: this.checkObj }
        )
        .then(res => {
          if (res.result == 1) {
            console.log(this.supplier, "判断是什么");
            if (this.supplier == "supplier") {
              this.towithdrawalHj(5);
            } else {
              this.confirmPost(this.pay_type);
            }
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        });
    },
    suppierGotiem() {
      this.getTp();
    },
    towithdrawal(type) {
      if (this.withdraw_multiple != 1 && this.service_type == 0) {
        if (this.info_form.balance_money % this.withdraw_multiple != 0) {
          MessageBox.alert(
            `提现金额需要是${this.withdraw_multiple}的整倍数`,
            "提示"
          );
          return;
        }
      }
      if (type == 5) {
        $http
          .get(
            "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.get-bank-card"
          )
          .then(res => {
            if (res.result == 1) {
              // this.towithdrawalHj(type)
              this.show2 = true;
              this.checkObj = res.data;
              this.checkObj.bankName =
                res.data.bankName +
                "(" +
                res.data.receiverAccountNoEnc.substring(
                  res.data.receiverAccountNoEnc.length - 4
                ) +
                ")";
              this.getwithList();
              this.getCartWith("suppier");
              return;
            } else {
              if (res.data.status == -1) {
                this.$router.push(this.fun.getUrl("bankCardInformation"));
              }
              MessageBox.alert(res.msg, "提示");
              return;
            }
          });
        return;
      }
      this.towithdrawalHj(type);
    },
    // 获取手续费
    getCartWith(type) {
      console.log(type, "类型");

      let url = "";
      let money = "";
      if (type == "suppier") {
        url = "plugin.supplier.frontend.withdraw.converge-withdraw";
      } else {
        url = "finance.balance-withdraw.converge-withdraw";
        money = this.info_form.balance_money;
      }
      $http.get(url, { withdraw_money: money }).then(res => {
        console.log(res, "数据");

        if (res.result == 1) {
          this.poundageHj = res.data.poundage;
          this.actual_amount = res.data.actual_amount;
          this.cost_money = res.data.cost_money;
        } else {
          MessageBox.alert(res.msg, "提示");
        }
      });
    },
    // 提现方法提共
    towithdrawalHj(type) {
      this.pay_type = type;
      const that = this;
      console.log(this.balance);
      if (this.balance == undefined || this.balance <= 0 || this.balance == 0) {
        MessageBox.alert(`${initWithdrawal}金额不可低于0元`, "提示");
        return;
      }

      $http
        .get(
          "plugin.supplier.frontend.withdraw.withdraw",
          {
            apply_type: this.pay_type,
            member_id: that.$route.params.member_id
          },
          "正在提交数据"
        )
        .then(
          function(response) {
            if (response.result === 1) {
              MessageBox.alert(response.msg, "提示");
              that.$router.go(-1);
              this.show2 = false;
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    confirmPost(type) {
      // withdraw_money
      var that = this;
      if (parseFloat(this.info_form.balance_money) > parseFloat(this.balance)) {
        MessageBox.alert(`${initWithdrawal}金额不可大于您的余额`, "提示");
        return;
      }

      if (
        this.info_form.balance_money == undefined ||
        this.info_form.balance_money <= 0 ||
        this.info_form.balance_money == 0
      ) {
        MessageBox.alert(`${initWithdrawal}金额不可低于0元`, "提示");
        return;
      }

      $http
        .get(
          "finance.balance-withdraw.withdraw",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep(),
            withdraw_type: type,
            withdraw_money: this.info_form.balance_money
          },
          "正在提交数据"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              that.show2 = false;
              that.$router.go(-1);
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    confirm(type) {
      if (this.withdraw_multiple != 1 && this.service_type == 0) {
        if (this.info_form.balance_money % this.withdraw_multiple != 0) {
          MessageBox.alert(
            `提现金额需要是${this.withdraw_multiple}的整倍数`,
            "提示"
          );
          return;
        }
      }
      this.pay_type = type;
      switch (this.pay_type) {
        case "1":
          this.confirmPost(this.pay_type);
          break;
        case "2":
          this.confirmPost(this.pay_type);
          break;
        case "3":
          this.manualVerify(this.pay_type);
          break;
        case "4":
          this.checkEup(this.pay_type);
          break;
        case "5":
          this.checkHx(this.pay_type);
          break;
        case "6":
          if (this.info_form.balance_money == "") {
            MessageBox.alert("请输入提现金额", "提示");
          } else {
            this.checkHJ(this.pay_type);
          }

          break;
        default:
          break;
      }
    },

    // 手动提现验证
    manualVerify(type) {
      var that = this;

      if (parseFloat(this.info_form.balance_money) > parseFloat(this.balance)) {
        MessageBox.alert(`${initWithdrawal}金额不可大于您的余额`, "提示");
        return;
      }

      if (
        this.info_form.balance_money == undefined ||
        this.info_form.balance_money <= 0 ||
        this.info_form.balance_money == 0
      ) {
        MessageBox.alert(`${initWithdrawal}金额不可低于0元`, "提示");
        return;
      }

      $http.post("finance.balance-withdraw.is-can-submit", {}, "").then(
        response => {
          if (response.result === 1) {
            if (response.data.status) {
              that.confirmPost(type); // 提现
            } else {
              that.setManualInfo(type, response.data.manual_type);
            }
          } else {
            MessageBox("提示", response.msg);
          }
        },
        function(response) {
          MessageBox("提示", response);
        }
      );
    },

    setManualInfo(type, manual_type) {
      let msg = "";
      let routerPath = "";

      switch (manual_type) {
        case "bank":
          msg = "请先填写银行卡信息";
          routerPath = "memberBank";
          break;
        case "wechat":
          msg = "请先填写微信信息";
          routerPath = "info";
          break;
        case "alipay":
          msg = "请先填写支付宝信息";
          routerPath = "info";
          break;
        default:
          break;
      }

      let that = this;

      this.$dialog.confirm({
        title: "提示",
        message: msg,
      }).then(() => {
        // on confirm
        that.$router.push(that.fun.getUrl(routerPath, {}));
      }).catch(() => {
        // on cancel
      });
    },

    checkEup(type) {
      var that = this;
      $http.post("plugin.eup-pay.api.account.pi-account", {}, "").then(
        function(response) {
          if (response.result == 1) {
            if (response.data.bool == 1) {
              that.confirmPost(type); // 提现
            }
          } else if (response.result == 0) {
            // MessageBox('提示', response.msg)
            if (response.data.bool == 0) {
              let msg = response.msg;
              that.$dialog.confirm({
                title: "提示",
                message: msg,
              }).then(() => {
                // on confirm
                that.$router.push(that.fun.getUrl("info", {}));
              }).catch(() => {
                // on cancel
              });
            }
          }
        },
        function(response) {
          MessageBox("提示", response);
        }
      );
    },

    checkHx(type) {
      this.action = "";
      this.msg = "";
      this.notice = "";
      $http
        .get(
          "plugin.huanxun.frontend.controllers.withdrawals.qualifications",
          {},
          "..."
        )
        .then(response => {
          if (response.result == 1) {
            // 有资格提现
            // this.withdrawToBalance(type)
            this.confirmPost(type);
          } else if (response.result == 0) {
            if (response.data.result == 0) {
              // 未开户
              let that = this;

              let msg = response.msg;
              this.$dialog.confirm({
                title: "提示",
                message: msg,
              }).then(() => {
                // on confirm
                that.$router.push(that.fun.getUrl("AccoutInfo", {}));
              }).catch(() => {
                // on cancel
              });

            } else if (
              response.data.result == 22 ||
              response.data.result == 25
            ) {
              // 未实名,未绑定银行卡

              this.popupVisible = true;

              this.notice = response.msg;

              this.action = response.data.link;

              this.msg = response.data.ipsRequest;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    withGotiem() {
      this.getTp();
    },
    // 第三方汇聚提现
    checkHJ(type) {
      $http
        .get(
          "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.get-bank-card"
        )
        .then(res => {
          if (res.result == 1) {
            // console.log(res, '54545')
            this.show2 = true;
            this.checkObj = res.data;
            this.checkObj.bankName =
              res.data.bankName +
              "(" +
              res.data.receiverAccountNoEnc.substring(
                res.data.receiverAccountNoEnc.length - 4
              ) +
              ")";
            this.getwithList();
            this.getCartWith();
          } else {
            if (res.data.status == -1) {
              this.$router.push(this.fun.getUrl("bankCardInformation"));
            }
            MessageBox("提示", res.msg);
          }
        });
    }
  },

  components: { cTitle }
};
