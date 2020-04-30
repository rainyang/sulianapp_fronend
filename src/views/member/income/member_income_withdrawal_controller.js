import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";

export default {
  data() {
    return {
      selectBol: true,
      isCheckAll: false,
      checkAll: false,
      checkList: [],
      allCheckList: [],
      unAllCheckList: [],
      datasource: [],

      // 是否提现到微信
      withdrawToWechat: 0,
      // 是否提现到支付宝
      withdrawToAlipay: 0,
      // 提现总金额
      totalwithdrawal: 0.0,
      // 手续费
      poundage: 0.0,
      // 劳务税
      servicetax: 0.0,

      // alipay
      isAlipay: false,
      alipay: {},

      // wechat
      isWechat: false,
      wechat: {},

      // yop_pay
      isyop_pay: false,
      yop_pay: {},

      // balance
      isBalance: false,
      balance: {},

      // manual
      isManual: false,
      manual: {},

      // 是否开启劳务税 手续费 单独费率
      balance_special: false,
      // special_type: "",
      // 单独劳务费
      independent_special: 0.0,
      // 单独手续费
      independent_poundage: 0.0,

      action: "",

      msg: "",

      notice: "",

      popupVisible: false,

      isHx: false,

      huanxun: {},
      converge_pay: {}, // 汇聚

      isEup: false,

      eup: {},
      show1: false,
      pay_type: "",
      clicktag: 0, // 防止快速点击
      //  汇聚需要的数据
      converge_pay_json: {},
      isHj: false,
      special_service_tax_text: "", // 自定义劳务税
      service_switch: 0, // 劳务税开关
      show2: false, // 判断
      show3: false, // 银行卡列表
      withList: [], // 银行卡列表
      checkObj: {}, // 选中的银行卡
      poundage_hj: "", // 汇聚提现手续费
      actual_amount: "", // 实际到账金额

      poundage_name:'',//手续费字样
    };
  },

  activated() {
    this.selectBol = true;
    this.clicktag = 0;
    this.show1 = false;
    this.checkAll = false;
    this.checkList = [];
    this.allCheckList = [];
    this.unAllCheckList = [];
    this.datasource = [];
    this.totalwithdrawal = "0.00";
    this.poundage = "0.00";
    this.servicetax = "0.00";
    this.service_switch = 0;

    this.balance_special = false;
    // this.special_type = ""
    this.independent_special = "0.00";
    this.independent_poundage = "0.00";
    this.poundage_hj = "0.00";
    this.actual_amount = "0.00";
    
    this.getData(); // 初始化数据
    this.getWithdrawType(); // 获取提现方式

    this.initHxpay();
    this.customizeIncome();
  },

  methods: {
    // 单选
    selectBolfun(num) {
      num == 1 ? (this.selectBol = true) : (this.selectBol = false);
    },

    // 获取提现方式
    getWithdrawType() {
      var that = this;
      $http.get("finance.income.get-income-withdraw-mode", {}).then(
        function(response) {
          if (response.result === 1) {
            that.initWithdrawType(response.data);
          } else {
            console.log(response.msg);
          }
        },
        function(response) {
          // Toast(response.msg)
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
              if (res.data.length == 0) {
                MessageBox.alert("请先去添加银行卡", "提示");
                setTimeout(() => {
                  this.$router.push(this.fun.getUrl("bankCardInformation"));
                }, 2000);
              }
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
      item.check = !item.check;
      this.withList.map(val => {
        if (val.id == item.id) {
          val.check = !item.check;
        } else {
          val.check = false;
        }
      });
      if (item.check == true) {
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
    // 初始化提现方式
    initWithdrawType(data) {
      this.service_switch = data.service_switch;
      // 支付宝
      this.initAlipay(data);
      // 微信
      this.initWechat(data);
      // 余额
      this.initBalance(data);
      // 手动打款
      this.initManual(data);
      // 环迅支付
      this.initHxbtn(data);

      // eup支付
      this.initEup(data);
      // 初始化易宝
      this.inityop_pay(data);
      // 提现到汇聚
      this.initconverge_pay(data);
    },

    // 支付宝
    initAlipay(data) {
      if (!data.alipay) {
        this.isAlipay = false;
        return;
      }
      this.isAlipay = true;
      this.alipay = data.alipay;
    },

    // 微信
    initWechat(data) {
      if (!data.wechat) {
        this.isWechat = false;
        return;
      }
      this.isWechat = true;
      this.wechat = data.wechat;
    },

    // 易宝
    inityop_pay(data) {
      if (!data.yop_pay) {
        this.isyop_pay = false;
        return;
      }
      this.isyop_pay = true;
      this.yop_pay = data.yop_pay;
    },

    // 余额
    initBalance(data) {
      if (!data.balance) {
        this.isBalance = false;
        return;
      }
      this.isBalance = true;
      this.balance = data.balance;
    },

    // 手动打款
    initManual(data) {
      if (!data.manual) {
        this.isManual = false;
        return;
      }
      this.isManual = true;
      this.manual = data.manual;
    },

    // eup支付
    initEup(data) {
      if (!data.eup_pay) {
        this.isEup = false;
        return;
      }
      this.isEup = true;
      this.eup = data.eup_pay;
    },

    // 环迅支付提现
    initHxbtn(data) {
      if (!data.huanxun) {
        this.isHx = false;
        return;
      }
      this.isHx = true;
      this.huanxun = data.huanxun;
    },
    // 提现汇聚
    initconverge_pay(data) {
      if (!data.converge_pay) {
        this.isHj = false;
        return;
      }
      this.isHj = true;
      this.converge_pay = data.converge_pay;
    },
    // 汇聚提现
    PayWayHj() {
      if (!this.fun.isTextEmpty(this.checkObj.bankName)) {
        this.getTp();
      } else {
        MessageBox.alert("请选择银行卡", "提示");
      }
    },
    // 提交银行卡的东西
    getTp() {
      console.log(this.checkObj);

      $http
        .post(
          "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.set-bank-card",
          { set: this.checkObj }
        )
        .then(res => {
          if (res.result == 1) {
            var type = "converge_pay";
            this.withdrawToBalance(type);
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        });
    },
    getGconverge_pay(val) {
      $http
        .get(
          "plugin.converge_pay.frontend.controllers.converge-pay-bank-card.get-bank-card"
        )
        .then(res => {
          console.log(res.data, "res");
          if (res.result == "1") {
            this.converge_pay_json = res.data;
            console.log(res.data, "默认银行卡数据");
            this.show2 = true;
            this.show1 = false;
            this.checkObj = res.data;
            this.checkObj.bankName =
              res.data.bankName +
              "(" +
              res.data.receiverAccountNoEnc.substring(
                res.data.receiverAccountNoEnc.length - 4
              ) +
              ")";
            this.getwithList(); // 获取银行卡列表
          } else {
            MessageBox.alert(res.msg);
            setTimeout(() => {
              this.$router.push(this.fun.getUrl("bankCardInformation"));
            }, 2000);
          }
        });
    },
    // 初始化数据
    getData() {
      var that = this;
      $http
        .get(
          "finance.income-withdraw.get-withdraw",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "正在获取列表"
        )
        .then(
          function(response) {
            if (response.result === 1) {
              var mydata = response.data;
              console.log(mydata, "数据");
              that.balance_special = response.data.setting.balance_special;
              that.special_type = response.data.special_type;
              that.datasource = response.data.data;
              that.allCheckListInit(response.data.data); // 初始化全选数据
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    },

    // 初始化全选数据
    allCheckListInit(data) {
      // this.allCheckList = data
      for (let i = 0; i < data.length; i++) {
        if (!data[i].can) {
          this.unAllCheckList.push(data[i]);
        } else {
          this.allCheckList.push(data[i]);
        }
      }
      // 判断全选状态
      this.isCheckAll = !(
        this.unAllCheckList.length === this.datasource.length
      );
    },

    // 全选监听
    allSelectHandle(value) {
      if (!this.selectBol) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.allCheckList.length;
        // 计算总价格
        this.countTotalPrice();
      }
    },

    // 全选
    allSelect(event) {
      if (this.selectBol) {
        console.log("全选");
        // this.checkList = event.target.checked ? this.allCheckList : []
        // 因为改变组件
        this.checkList = event ? this.allCheckList : [];
        // 计算总价格
        this.countTotalPrice();
      }
    },

    // 计算总价格
    countTotalPrice() {
      // 提现总金额
      this.totalwithdrawal = 0.0; // 初始化
      // 手续费
      this.poundage = 0.0; // 初始化
      // 劳务费手续费
      this.servicetax = 0.0; // 初始化
      // 单独劳务税
      this.independent_special = 0.0; // 初始化
      // 单独手续费
      this.independent_poundage = 0.0; // 初始化
      this.actual_amount = 0.0; // 初始化
      for (var i = 0; i < this.checkList.length; i++) {
        // this.totalwithdrawal += (this.checkList[i].income)
        // this.poundage += (this.checkList[i].goods.poundage)
        this.totalwithdrawal = this.floatAdd(
          this.totalwithdrawal,
          this.checkList[i].income
        );
        this.poundage = this.floatAdd(
          this.poundage,
          this.checkList[i].poundage
        );
        this.poundage_hj = this.poundage;
        this.actual_amount = this.floatAdd(
          this.actual_amount,
          this.checkList[i].actual_amount
        );
        // console.log(this.actual_amount, "实际到账金额");
        //
        // console.log(this.poundage, "手续费");

        this.servicetax = this.floatAdd(
          this.servicetax,
          this.checkList[i].servicetax
        );

        // 是否有单独余额劳务费
        if (this.balance_special) {
          if (this.special_type == "1") {
            // 最新
            this.independent_special = this.floatAdd(
              this.independent_special,
              this.checkList[i].special_service_tax
            );
            this.independent_poundage = this.floatAdd(
              this.independent_poundage,
              this.checkList[i].special_poundage_rate
            );
          } else {
            this.independent_special = this.floatAdd(
              this.independent_special,
              this.checkList[i].special_service_tax
            );
            this.independent_poundage = this.floatAdd(
              this.independent_poundage,
              this.checkList[i].special_poundage
            );
          }
        }
      }

      this.totalwithdrawal = Number(this.totalwithdrawal.toString()).toFixed(2);
      this.poundage = Number(this.poundage.toString()).toFixed(2);
      this.servicetax = Number(this.servicetax.toString()).toFixed(2);

      // 是否有单独余额劳务费
      if (this.balance_special) {
        // 最新
        if (this.special_type == "1") {
          this.independent_special = Number(
            this.independent_special.toString().match(/^\d+(?:\.\d{0,2})?/)
          );
          this.independent_poundage = Number(
            this.independent_poundage.toString().match(/^\d+(?:\.\d{0,2})?/)
          );
        } else {
          this.independent_special = Number(
            this.independent_special.toString().match(/^\d+(?:\.\d{0,2})?/)
          );
          this.independent_poundage = Number(
            this.independent_poundage.toString().match(/^\d+(?:\.\d{0,2})?/)
          );
        }
      }
    },

    // 浮点数加法运算
    floatAdd(arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (arg1 * m + arg2 * m) / m;
    },

    // 浮点数减法运算
    floatSub(arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // 动态控制精度长度
      n = (r1 = r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    // 验证手动打款的 设置 微信 支付 银行卡 是否完善
    checkManual(type) {
      // 验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }
      var that = this;
      $http.post("finance.manual-type.is-can-submit", {}, "").then(
        function(response) {
          that.clicktag = 0;
          if (response.result === 1) {
            if (response.data.status) {
              that.withdrawToBalance(type); // 提现
            } else {
              that.setManualInfo(type, response.data.manual_type);
            }
          } else {
            MessageBox("提示", response.msg);
          }
        },
        function(response) {
          that.clicktag = 0;
          MessageBox("提示", response);
        }
      );
    },
    // 验证易宝是否注册
    checkyop_pay(type) {
      // 验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }
      var that = this;
      $http.get("plugin.yop-pay.api.yop-verification", {}, "").then(
        function(response) {
          that.clicktag = 0;
          if (response.result === 1) {
            that.withdrawToBalance(type); // 提现
          } else {
            MessageBox("提示", response.msg);
            that.$router.push(that.fun.getUrl("info", {}));
          }
        },
        function(response) {
          that.clicktag = 0;
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

      // let that = this

      MessageBox("提示", msg).then(action => {
        this.$router.push(this.fun.getUrl(routerPath));
      });
    },

    // 验证是否选择提现数据
    checkWithdrawToBalance() {
      if (
        parseFloat(this.totalwithdrawal) <= 0 ||
        this.totalwithdrawal == null
      ) {
        this.clicktag = 0;
        MessageBox.alert(`${this.fun.initWithdrawal()}金额不能等于0`);
        return false;
      } else {
        return true;
      }
    },

    // 提现网络操作
    withdrawToBalance(type) {
      // 验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }

      if (this.checkList.length > 0) {
        var data = {
          total: {
            amounts: this.totalwithdrawal,
            poundage: this.poundage,
            pay_way: type
          },
          withdrawal: this.checkList
        };
        var that = this;
        // finance.Income-withdraw.save-withdraw
        $http.post("withdraw.apply.index", { data: data }, "正在提交数据").then(
          response => {
            this.clicktag = 0;
            if (response.result === 1) {
              MessageBox("提示", response.msg);
              this.show2 = false;
              that.$router.go(-1);
            } else {
              MessageBox("提示", response.msg).then(action => {
                if (response.data.status === 0) {

                } else {
                  this.$router.push(this.fun.getUrl("info"));
                }
              });
            }
            setTimeout(() => {
              that.clicktag = 0;
            }, 1000);
          },
          function(response) {
            this.clicktag = 0;
            MessageBox("提示", response);
            setTimeout(() => {
              that.clicktag = 0;
            }, 1000);
          }
        );
      } else {
        this.clicktag = 0;
        MessageBox("提示", `${this.fun.initWithdrawal()}数据不可为空`);
        that.clicktag = 0;
      }
    },

    checkEup(type) {
      // 验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }
      var that = this;
      $http.post("plugin.eup-pay.api.account.pi-account", {}, "").then(
        response => {
          this.clicktag = 0;
          if (response.result == 1) {
            if (response.data.bool == 1) {
              that.withdrawToBalance(type); // 提现
            }
          } else if (response.result == 0) {
            // MessageBox('提示', response.msg)
            if (response.data.bool == 0) {
              // let msg = response.msg
              MessageBox("提示", response.msg).then(action => {
                this.$router.push(this.fun.getUrl("info"));
              });
            }
          }
        },
        function(response) {
          this.clicktag = 0;
          MessageBox("提示", response);
        }
      );
    },

    // 环迅支付
    checkHxpay(type) {
      this.initHxpay();
      $http
        .get(
          "plugin.huanxun.frontend.controllers.withdrawals.qualifications",
          {},
          " "
        )
        .then(response => {
          this.clicktag = 0;
          if (response.result == 1) {
            // 有资格提现
            this.withdrawToBalance(type);
          } else if (response.result == 0) {
            if (response.data.result == 0) {
              // 未开户
              // let that = this

              MessageBox("提示", response.msg).then(action => {
                this.$router.push(this.fun.getUrl("AccoutInfo"));
              });
            } else if (
              response.data.result == 22 ||
              response.data.result == 25
            ) {
              // 未实名,未绑定银行卡
              this.clicktag = 0;
              this.popupVisible = true;

              this.notice = response.msg;

              this.action = response.data.link;

              this.msg = response.data.ipsRequest;
            }
          }
        })
        .catch(error => {
          this.clicktag = 0;
          console.log(error);
        });
    },
    initHxpay() {
      this.action = "";
      this.msg = "";
      this.notice = "";
    },
    checkPayWay() {
      if (!this.pay_type) {
        return;
      }
      if (this.pay_type == "converge_pay" && this.clicktag == 1) {
        // 再次调用汇聚提现
        this.getGconverge_pay(this.yop_pay);
      }
      if (this.clicktag === 0) {
        this.clicktag = 1;
        switch (this.pay_type) {
          case "balance":
            this.withdrawToBalance(this.pay_type);
            break;
          case "wechat":
            this.withdrawToBalance(this.pay_type);
            break;
          case "manual":
            this.checkManual(this.pay_type);
            break;
          case "huanxun":
            this.checkHxpay(this.pay_type);
            break;
          case "alipay":
            this.withdrawToBalance(this.pay_type);
            break;
          case "eup":
            this.checkEup(this.pay_type);
            break;
          case "yop_pay":
            this.checkyop_pay(this.pay_type);
            break;
          case "converge_pay":
            this.getGconverge_pay(this.yop_pay);
            break;
          default:
            // this.checkEup(this.pay_type);
            Toast("请选择提现方式");
            break;
        }
      }
    },
    // 自定义提现收入语言
    customizeIncome() {
      let mailLanguage = this.fun.initMailLanguage();
      //自定义劳务税字段
      this.special_service_tax_text = mailLanguage.income.special_service_tax;
      //自定义收入字段
      this.income_name_text = mailLanguage.income.income_name;
      //自定义手续费字段
      this.poundage_name = this.fun.initMailLanguage().income.poundage_name;
      this.fun.setWXTitle(
        `${this.income_name_text}${this.fun.initWithdrawal()}`
      );
    }
  },

  components: { cTitle }
};
