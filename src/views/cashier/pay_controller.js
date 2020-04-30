import cTitle from "components/title";
import loading from "components/loading";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";

import { Field } from "mint-ui";
import { Button } from "mint-ui";

import { Picker, Switch } from "mint-ui";
import { MessageBox } from "mint-ui";
import Fun from "../../fun";

var clicktag = 0;

//import cOrder from 'components/order';

const TAG_ACTION_BUY = "-2"; //直接购买
const TAG_ACTION_CART = "-1"; //1购物车结算
var _root_tag = ""; //0 直接购买 1购物车结算
var _goodsId = "";
var _optionsId = "";
var _total = 1;
var currentAddId = "";
var currentAddress = {};
var _cart_ids = [];
var isClick = 0;
export default {
  data() {
    return {
      showPage: false,
      qrcode: "",
      showQR: false,
      show1: false,
      onclast: false,
      goodsInfo: {},
      order: {},
      dispatch: {},
      realname: "", //收件人
      mobile: "",
      address: "",
      goods: [],
      goods_price: 0.0,
      dispatch_price: 0.0,
      price: 0.0,
      discount_price: 0,
      addressData: [],
      payPrice: 0,
      loadDiscount: false,

      // 订单数据
      datas: {},
      //优惠券
      popupCouponSpecs: false,
      coupon_size: 0,
      checkCouponList: [],
      use_coupon_size: 0,

      //积分抵扣 其他抵扣
      checkDeductionList: [],
      deductionItem: {},

      //支付
      order_ids: "",
      balance: 0,
      payParams: "",
      info_form: {},
      order_sn: "",
      money: "",
      buttons: [],
      pay_sn: "订单编号",
      order_pay_id: "",
      uid: "",
      isdisabled: false,

      payType: [],
      confirmOrderStatus: false,

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
      form: {
        mobile: "",
        realname: ""
      },
      typename: "",

      popupSpecs: false,
      pwds: [],
      pwd: "",
      pw1: "",
      pw2: "",
      pw3: "",
      pw4: "",
      pw5: "",
      pw6: "",

      huanxun_form_quick: 18,
      huanxun_form_wx: 22,
      huanxun_form_action: "",
      huanxun_form_input: "",
      huanxun_input_name: "",

      // usdt
      usdt_value: 27,
      usdt_action: "",
      usdt_form: {},

      payMuch: "0",
      //是否显示支付协议
      agreementPayData: "",
      agreementPay: false,
      agreementPayShow: false,

      cashier_type: ""
    };
  },

  activated() {
    this.showQR = false;
    this.showPage = false;
    //优惠券
    this.popupCouponSpecs = false;
    this.coupon_size = 0;
    this.use_coupon_size = 0;
    this.checkCouponList = [];
    this.coupons = [];
    this.show1 = false;
    this.agreementPay = false;
    this.agreementPayShow = false;
    this.agreementPayData = "";
    this.cashier_type = "";
    if (this.fun.isTextEmpty(this.$route.params.hotel_id)) {
      this.cashier_type = "store";
    } else {
      this.cashier_type = "hotel";
    }
    this.init();
    // this.getAgreementPay();
    //抵扣
    this.checkDeductionList = [];

    // this.initStore();
    this.getCenter();
    //this.initPayType();
  },
  mounted() {
    this.popupSpecs = false;
  },
  computed: {},
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
        case "HkScanPay":
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
    getCenter() {
      let json = {};
      if (this.cashier_type === "hotel") {
        json = {
          hotel_id: this.$route.params.hotel_id
        };
      } else {
        json = {
          store_id: this.$route.params.store_id
        };
      }
      $http
        .get(
          "plugin.store-cashier.frontend.cashier.center.get-center-page",
          json,
          " "
        )
        .then(
          response => {
            this.showPage = true;
            if (response.result === 1) {
              if (this.cashier_type === "hotel") {
                this.initStore(response.data.get_hotel_info);
              } else {
                this.initStore(response.data.get_store_info);
              }

              this.agreementPayData = response.data.get_pay_protocol;
            } else {
              if (response.data && response.data.login_status !== 0) {
                Toast(response.msg);
              }
            }
          },
          function(response) {
            console.log(response);
          }
        )
        .catch(err => {
          console.log(err);
        });
    },
    showPay() {
      this.agreementPayShow = true;
    },
    //获取是否显示支付协议
    getAgreementPay() {
      $http.get("shop.index.getPayProtocol", {}, " ").then(
        response => {
          if (response.result === 1) {
            this.agreementPayData = response.data;
          } else {
            console.log(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //处理按键
    _handleKeyPress(num) {
      //不同按键处理逻辑
      // -1 代表无效按键，直接返回
      if (num == -1) return false;
      switch (String(num)) {
        //小数点
        case ".":
          this._handleDecimalPoint();
          break;
        //删除键
        case "D":
          this._handleDeleteKey();
          break;
        //确认键
        case "S":
          this._handleConfirmKey();
          break;
        default:
          this._handleNumberKey(num);
          break;
      }
    },
    //处理数字
    _handleNumberKey(num) {
      let S = this.payMuch;
      //如果有小数点且小数点位数不小于2
      if (S.indexOf(".") > -1 && S.substring(S.indexOf(".") + 1).length < 2)
        this.payMuch = S + num;
      //没有小数点
      if (!(S.indexOf(".") > -1)) {
        //如果第一位是0，只能输入小数点
        if (num == 0 && S.length == 0) this.payMuch = "0.";
        else {
          if (S.length && Number(S.charAt(0)) === 0) {
            this.payMuch = num;
            return;
          }
          this.payMuch = S + num;
        }
      }
    },
    _handleConfirmKey() {
      let S = this.payMuch;
      //未输入
      if (!S.length || Number(S) === 0) {
        Toast("您目前未输入!");
        return false;
      }
      //将 8. 这种转换成 8.00
      if (S.indexOf(".") > -1 && S.indexOf(".") === S.length - 1)
        S = Number(S.substring(0, S.length - 1)).toFixed(2);
      //保留两位
      S = Number(S).toFixed(2);
      this.confirmOrder();
    },
    //处理小数点函数
    _handleDecimalPoint() {
      //如果包含小数点，直接返回
      if (this.payMuch.indexOf(".") > -1) return false;
      //如果小数点是第一位，补0
      if (!this.payMuch.length) this.payMuch = "0.";
      //如果不是，添加一个小数点
      else this.payMuch = this.payMuch + ".";
    },
    //处理删除键
    _handleDeleteKey() {
      let S = this.payMuch;
      //如果没有输入，直接返回
      if (S.length <= 1) return (this.payMuch = "0");
      //否则删除最后一个
      this.payMuch = S.substring(0, S.length - 1);
    },
    init() {
      this.popupSpecs = false;
      this.initPop();
    },
    initStore(data) {
      this.confirmOrderStatus = false;
      this.payMuch = "0";
      this.realname = "";
      this.mobile = "";
      this.popupCouponSpecs = false;
      this.order_ids = "";
      // let url = "",
      //   json = {};
      // if (this.cashier_type === "hotel") {
      //   url = "plugin.hotel.frontend.cashier.center.index";
      //   json = {
      //     hotel_id: this.$route.params.hotel_id
      //   };
      // } else {
      //   url = "plugin.store-cashier.frontend.cashier.center.index";
      //   json = {
      //     store_id: this.$route.params.store_id
      //   };
      // }
      //
      // $http.get(url, json).then(
      //   response => {
      //     if (response.result === 1) {
      if (this.cashier_type === "hotel") {
        this.store = data.hotel;
        this.store_set = data.hotel_set;
      } else {
        this.store = data.store;
        this.store_set = data.store_set;
      }
      this.income = data.income;
      //that.credit = myData.credit;
      // } else {
      //   MessageBox.alert(response.msg);
      // }
      //   },
      //   function(response) {
      //     // error callback
      //   }
      // );
    },
    initPayType(price) {
      let that = this;
      let url = "",
        json = {};
      if (this.cashier_type === "hotel") {
        url = "plugin.hotel.frontend.payment.list";
        json = {
          hotel_id: this.$route.params.hotel_id,
          price: price
        };
      } else {
        url = "plugin.store-cashier.frontend.payment.list";
        json = {
          store_id: this.$route.params.store_id,
          price: price
        };
      }

      $http.get(url, json, "生成中").then(
        function(response) {
          if (response.result === 1) {
            that.payType = response.data;
            var typrArr = [];
            for (var i = 0; i < that.payType.length; i++) {
              typrArr.push(that.payType[i]);
            }
            that.payType = typrArr;
            that.typename = "支付";
            that.show1 = true;
            //that.order = response.data.order;
            //that.dispatch = response.data.dispatch;
            /*
					 that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面*/
          } else {
            Toast(response.msg);
            // that.$router.go(-1);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //直接购买
    preGoodsBuy() {
      let that = this;
      let url = "",
        json = {};
      if (this.cashier_type == "hotel") {
        url = "plugin.hotel.frontend.Order.goods-buy";
        json = {
          price: this.payPrice,
          hotel_id: this.$route.params.hotel_id,
          member_coupon_ids: this.assembleCoupons(),
          orders: JSON.stringify(this.assembleDeduction()),
          mobile: this.form.mobile,
          realname: this.form.realname
        };
      } else {
        url = "plugin.store-cashier.frontend.Order.goods-buy";
        json = {
          price: this.payPrice,
          store_id: this.$route.params.store_id,
          member_coupon_ids: this.assembleCoupons(),
          orders: JSON.stringify(this.assembleDeduction()),
          mobile: this.form.mobile,
          realname: this.form.realname
        };
      }

      if (isClick === 0) {
        isClick = 1;
        $http
          .get(url, json, "生成中")
          .then(
            function(response) {
              if (response.result === 1) {
                //that.order = response.data.order;
                //that.dispatch = response.data.dispatch;
                that.setViewData(response.data); //设置界面
                /*that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面*/
                that.initCoupon(response.data.discount.member_coupons); //设置优惠券信息

                that.initPayType(response.data.total_price);
              } else {
                Toast(response.msg);
                // that.$router.go(-1);
              }
              setTimeout(() => {
                isClick = 0;
              }, 500);
            },
            function(response) {
              console.log(response);
            }
          )
          .catch(err => {
            console.log(err);
          });
      }
    },

    //设置界面
    setViewData(data) {
      this.datas = data;
      this.service = data.fee_items;
      this.order_data = data.orders;
      this.loadDiscount = true;
      this.goods_price = data.total_goods_price; //设置商品总价格
      this.dispatch_price = data.total_dispatch_price; //设置总运费价格
      if (this.cashier_type != "hotel") {
        this.discount_price = data.total_discount_price; //设置总优惠价格
      }
      // this.deduction_price = data.total_deduction_price; //设置总抵扣价格
      this.deduction_price = 0.0; //初始化总抵扣价格

      this.price = data.total_price; //设置总价格（合计）
      // this.goods = data.order.order_goods;
      // this.goods_price = data.order.goods_price;
      // this.dispatch_price = data.order.dispatch_price;
      // this.price = data.order.price;
    },

    //提交订单
    submit(val) {
      console.log(val, "判断是否是汇聚");
      let json = {};
      if (val.value == 28 || val.value == 29) {
        json = this.assembleJson(val.value);
      } else {
        json = this.assembleJson();
      }
      let that = this;

      let url = "";
      if (this.cashier_type == "hotel") {
        url = "plugin.hotel.frontend.Order.create";
      } else {
        url = "plugin.store-cashier.frontend.Order.create";
      }

      if (clicktag == 0) {
        clicktag = 1;
        if (this.agreementPayData) {
          if (!this.agreementPay) {
            clicktag = 0;
            MessageBox.alert("请先勾选支付协议");
            return;
          }
        }
        $http.get(url, json, "提交中").then(
          function(response) {
            //$http.get('plugin.store-cashier.frontend.cashier.center.index', json, "提交中...").then(function (response) {
            if (response.result === 1) {
              that.order_ids = response.data.order_ids;

              that.getMultipleOrderInfo(val);
              setTimeout(function() {
                clicktag = 0;
              }, 1000);
              //that.$router.push({ name: "orderlist", params: { status: "1" }});
              //status:"2" 合并支付
              //that.$router.push({ name: "orderpay", params: { status: "2", order_ids: response.data.order_ids }});
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
      }
    },

    //组装json数据
    assembleJson(val) {
      let json = {};

      if (this.cashier_type == "hotel") {
        json = {
          price: this.payPrice,
          hotel_id: this.$route.params.hotel_id,
          member_coupon_ids: JSON.stringify(this.assembleCoupons()),
          orders: "",
          mobile: this.form.mobile,
          realname: this.form.realname
        };
      } else if (val) {
        json = {
          price: this.payPrice,
          store_id: this.$route.params.store_id,
          member_coupon_ids: JSON.stringify(this.assembleCoupons()),
          orders: JSON.stringify(this.assembleDeduction()),
          mobile: this.form.mobile,
          realname: this.form.realname
        };
      } else {
        json = {
          price: this.payPrice,
          store_id: this.$route.params.store_id,
          member_coupon_ids: JSON.stringify(this.assembleCoupons()),
          orders: JSON.stringify(this.assembleDeduction()),
          mobile: this.form.mobile,
          realname: this.form.realname
        };
      }
      return json;
    },
    //组装商品信息
    assembleGoods() {
      let newGoods = [];

      for (let j = 0; j < this.goodsInfo.order_data.length; j++) {
        for (
          let i = 0;
          i < this.goodsInfo.order_data[j].order.order_goods.length;
          i++
        ) {
          let model = new Object();
          model.goods_id = this.goodsInfo.order_data[j].order.order_goods[
            i
          ].goods_id;
          model.total = this.goodsInfo.order_data[j].order.order_goods[i].total;
          model.option_id = this.goodsInfo.order_data[j].order.order_goods[
            i
          ].goods_option_id;
          newGoods.push(model);
        }
      }
      return newGoods;
    },

    //组装优惠券json信息
    assembleCoupons() {
      let coupons = [];

      for (let i = 0; i < this.checkCouponList.length; i++) {
        coupons.push(this.checkCouponList[i].id);
      }

      return coupons;
    },
    //组装优惠抵扣信息
    assembleDeduction() {
      let deductions = [];

      for (let i = 0; i < this.checkDeductionList.length; i++) {
        //this.checkDeductionList[i].deduction_ids = this.checkDeductionList[i].deduction_ids.join(',');
        deductions.push(this.checkDeductionList[i]);
      }

      return deductions;
    },

    //初始化优惠券
    initCoupon(coupon) {
      if (coupon != undefined && coupon != "" && coupon != null) {
        this.coupon_size = coupon.length;
      }
      this.coupons = coupon;
    },

    //优惠券
    showCoupon() {
      if (this.coupon_size == 0) {
        Toast("暂无优惠券使用");
        return;
      }
      this.popupCouponSpecs = true;
    },

    //选择优惠券
    selectCoupon(value, valObj) {
      //处理选择
      // this.screenCoupon(value);
      //因为换了组件改调用方法
      this.screenCoupon(value, valObj);
      //设置view
      this.setCouponView();

      //重新计算
      this.preGoodsBuy(); //直接购买
    },

    //筛选数据优惠券状态
    screenCoupon(value, valObj) {
      var tarValue = valObj;
      // if (value.target.checked)//选中添加
      // {
      //   if (this.checkCouponList.length > 0) {
      //     for (let i = 0; i < this.checkCouponList.length; i++) {
      //       if (this.checkCouponList[i].id == value.target._value.id) {
      //         this.checkCouponList.splice(i, 1);
      //       }
      //     }
      //     this.checkCouponList.push(value.target._value);
      //   } else {
      //     this.checkCouponList.push(value.target._value);
      //   }
      //
      // } else {//取消选中
      //   if (this.checkCouponList.length > 0) {
      //     for (let i = 0; i < this.checkCouponList.length; i++) {
      //       if (this.checkCouponList[i].id == value.target._value.id) {
      //         this.checkCouponList.splice(i, 1);
      //       }
      //     }
      //   }
      // }
      //因为换了组件改调判断
      if (value.target.checked) {
        //选中添加
        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == tarValue.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
          this.checkCouponList.push(tarValue);
        } else {
          this.checkCouponList.push(tarValue);
        }
      } else {
        //取消选中
        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == tarValue.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
        }
      }
    },
    // 汇聚支付微信
    getHjweappy(id) {
      $http
        .get("order.merge-pay.wechat-pay-hj", { order_pay_id: id })
        .then(res => {
          if (res.result == 1) {
            let json = JSON.parse(res.data.data.rc_Result);
            this.newWXPay(json);
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        });
    },
    // 汇聚支付支付宝
    getHjApply(id) {
      $http
        .get("order.merge-pay.alipay-pay-hj", { order_pay_id: id })
        .then(res => {
          if (res.result == 1) {
            window.href = res.data.data.rc_Result;
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        });
    },
    //设置view
    setCouponView() {
      this.use_coupon_size = this.checkCouponList.length;
    },

    //抵扣选择响应
    discountHandle(item, value) {
      //处理选择
      this.screenDiscount(item, value);

      //重新计算
      this.preGoodsBuy(); //直接购买
    },

    //筛选抵扣
    screenDiscount(item, value) {
      //临时数据
      let _deductionItem = new Object();
      let tempDeduction_ids = [];

      if (value.checked) {
        //选中添加
        if (this.checkDeductionList.length > 0) {
          for (let i = 0; i < this.checkDeductionList.length; i++) {
            if (this.checkDeductionList[i].pre_id == item.pre_id) {
              //先获取回来
              if (
                this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)
              ) {
                tempDeduction_ids = [];
              } else {
                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
              }

              this.checkDeductionList.splice(i, 1);
              break;
            }
          }

          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          } else {
            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) <= 0) {
          //     tempDeduction_ids.push(value.code);
          //     _deductionItem.deduction_ids = tempDeduction_ids;
          //     _deductionItem.pre_id = item.order.pre_id;
          //     this.checkDeductionList.push(_deductionItem);
          //     console.log("LengthPush:",_deductionItem);
          // }
        } else {
          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }
            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          } else {
            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) <= 0) {
          //     tempDeduction_ids.push(value.code);
          //     _deductionItem.deduction_ids = tempDeduction_ids;
          //     _deductionItem.pre_id = item.order.pre_id;
          //     this.checkDeductionList.push(_deductionItem);
          //     console.log("LengthPush:", _deductionItem);
          // }
        }
      } else {
        //取消选中
        if (this.checkDeductionList.length > 0) {
          for (let i = 0; i < this.checkDeductionList.length; i++) {
            if (this.checkDeductionList[i].pre_id == item.pre_id) {
              //先获取回来
              if (
                this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)
              ) {
                tempDeduction_ids = [];
              } else {
                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
              }
              this.checkDeductionList.splice(i, 1);
              break;
            }
          }

          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            //tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          } else {
            //tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) > -1) {
          //     tempDeduction_ids.removeByValue(value.code);
          //     _deductionItem.deduction_ids = tempDeduction_ids;
          //     _deductionItem.pre_id = item.order.pre_id;
          //     this.checkDeductionList.push(_deductionItem);
          //     console.log("LengthPush:", _deductionItem);
          // }
        } else {
          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            //tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          } else {
            //tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            this.checkDeductionList.push(_deductionItem);
          }
          // if (tempDeduction_ids.indexOf(value.code) > -1) {
          //     tempDeduction_ids.removeByValue(value.code);
          //     _deductionItem.deduction_ids = tempDeduction_ids;
          //     _deductionItem.pre_id = item.order.pre_id;
          //     this.checkDeductionList.push(_deductionItem);
          //     console.log("LengthPush:", _deductionItem);
          // }
        }
      }
      // console.log('checkList:', this.checkDeductionList);
    },

    //支付部分
    confirm(btn) {
      let type = btn.value;
      //type-1 微信, type-2 支付宝 ,type-6 云收银支付
      if (type == 1) {
        this.getWeChatPayParams();
      } else if (type == 2) {
        //order.pay.alipay , order_id
        this.$router.push(
          this.fun.getUrl("alipay", {
            status: 2,
            recharge_money: 22,
            order_pay_id: this.order_pay_id,
            uid: this.uid,
            pid: this.uid
          })
        );
      } else if (type == 9) {
        this.appWeiPay();
      } else if (type == 10) {
        this.appAliPay();
      } else if (type == "cashPay") {
        this.cashPay();
      } else if (type == 6) {
        this.getWeChatPayParams2();
      } else if (type == 3) {
        //是否开启余额密码支付
        if (btn.need_password == 1) {
          this.showPwdPop();
        } else {
          this.balancePay(""); //无密码
        }
      } else if (type == 12) {
        this.newWechatPay();
      } else if (type == 7) {
        //云收银支付宝
        this.cloudAlipay();
      } else if (type == 18) {
        this.huanxunQuick();
      } else if (type == 22) {
        this.huanxunWx();
      } else if (type == 24) {
        this.dianBangScan();
      } else if (type == 26) {
        this.yihepay();
      } else if (type == 27) {
        this.usdtPay();
      } else if (type == 32) {
        this.yiBaoAlipay();
      } else if (type == 33) {
        this.jueqiAlipay();
      } else if (type == 48) {
        this.wechatJsapiPay();
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    goShowBalances() {
      this.$router.push(
        this.fun.getUrl("showBalances", {
          pay_sn: this.order_sn,
          pay_type: "cashier"
        })
      );
    },
    //usdt支付
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    },

    //云收银支付宝
    cloudAlipay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id, pid: this.uid };
      $http.get("order.merge-pay.cloudAliPay", json, "").then(
        function(response) {
          if (response.result == 1) {
            that.$router.push(
              that.fun.getUrl("alipayCloud", {
                status: "8",
                url: response.data
              })
            );
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
    //易合支付
    yihepay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get("order.merge-pay.yop-pay", json, "").then(
        function(response) {
          if (response.result === 1) {
            that.newWXPay(response.data.resultData);
          } else {
            console.log(response);
            MessageBox.alert(response.msg, "提示");
          }
        },
        function(response) {
          // error callback
          MessageBox.alert(response.msg, "提示");
        }
      );
    },
    balancePay(password) {
      var that = this;
      let json = {
        order_pay_id: that.order_pay_id,
        pid: this.uid
      };

      if (!this.fun.isTextEmpty(password)) {
        json = {
          order_pay_id: that.order_pay_id,
          payment_password: password,
          pid: this.uid
        };
      }
      $http.get("order.credit-merge-pay.credit2", json, "loading").then(
        response => {
          if (response.result == 1) {
            if (that.fun.isTextEmpty(response.data.redirect)) {
              that.$router.push(that.fun.getUrl("home"));
              MessageBox.alert(response.msg, "提示");
            } else {
              if (
                response.data.redirect &&
                response.data.redirect.indexOf("showBalances") > -1
              ) {
                MessageBox.alert(response.msg, "提示");
                that.goShowBalances();
              } else {
                window.location.href = response.data.redirect;
                MessageBox.alert(response.msg, "提示");
              }
            }
          } else {
            MessageBox.alert(response.msg, "提示");
            this.payMuch = "0";
            this.show1 = false;
            this.init();
          }
        },
        function(response) {
          console.log(response.msg);
        }
      );
    },
    cashPay() {
      var that = this;
      $http
        .get("plugin.store-cashier.frontend.payment.cashPay.cashPay", {
          order_pay_id: this.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              that.$router.push(that.fun.getUrl("member"));
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

    //12新版微信
    newWechatPay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id, pid: this.uid };
      $http.get("order.merge-pay.yunPayWechat", json, "").then(
        function(response) {
          if (response.result == 1) {
            //wx.config(response.data.js);
            that.newWXPay(response.data, response.data.redirect);
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function(response) {
          // error callback
        }
      );
    },
    newWXPay(payParams, cbHref) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payParams.appId, //公众号名称，由商户传入
          timeStamp: payParams.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: payParams.nonceStr, //随机串
          package: payParams.package,
          signType: payParams.signType, //微信签名方式：
          paySign: payParams.paySign //微信签名
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
              if (cbHref && cbHref.indexOf("showBalances") > -1) {
                MessageBox.alert("支付成功", "提示");
                that.goShowBalances();
              } else {
                window.location.href = cbHref;
                MessageBox.alert("支付成功", "提示");
              }
            }
          } else {
            MessageBox.alert("支付失败", "提示");
          }
        }
      );
    },

    appWeiPay() {
      var that = this;
      $http
        .get("order.merge-pay.wechatAppPay", {
          order_pay_id: that.order_pay_id,
          pid: this.uid
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    appAliPay() {
      var that = this;
      $http
        .get("order.merge-pay.alipayAppRay", {
          order_pay_id: that.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              if (response.data.isnewalipay == 1) {
                YDB.SetRSA2AlipayInfo(
                  that.$store.state.temp.mailInfo.name,
                  that.fun.getKeyByI(),
                  that.money,
                  that.order_sn
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //多订单合并支付获取信息接口方法
    getMultipleOrderInfo(val) {
      //order.pay.wechatPay
      var that = this;

      $http
        .get(
          "order.merge-pay",
          {
            order_ids: this.order_ids,
            pid: this.uid
          },
          "loading"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.order_sn = response.data.order_pay.pay_sn;
              that.balance = response.data.member.credit2;
              that.money = response.data.order_pay.amount;
              that.uid = response.data.order_pay.uid;
              that.order_pay_id = response.data.order_pay.id; //支付id
              that.buttons = response.data.buttons;
              that.confirm(val);
              if (val.value == 28) {
                that.getHjweappy(response.data.order_pay.id);
              } else if (val.value == 29) {
                that.getHjApply(response.data.order_pay.id);
              }
              let isApp = Fun.isApp();
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

    //
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
              MessageBox.alert(response.msg, "提示");
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

    getWeChatPayParams() {
      //order.pay.wechatPay
      var that = this;
      if (window.isMiniprogram) {
        this.getMiniWeChatPayParams();
        return;
      }
      $http
        .get("order.merge-pay.wechatPay", {
          order_pay_id: this.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              wx.config(response.data.js);
              that.WXPay(response.data.config, response.data.redirect);
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
    getMiniWeChatPayParams() {
      //order.pay.wechatPay
      var that = this;
      $http
        .get("order.merge-pay.wechatPay", {
          app_type: "wechat",
          client_type: 2,
          type: this.fun.getTyep(),
          order_pay_id: this.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              //wx.config(response.data.js);
              var pay_data = response.data.config;
              var payParams = {
                timeStamp: pay_data.timestamp,
                nonceStr: pay_data.nonceStr,
                package: pay_data.package,
                signType: pay_data.signType,
                paySign: pay_data.paySign
              };
              //console.log("payParams::::", payParams);

              that.miniWxPay(payParams);

              //that.WXPay(response.data.config);
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
    miniWxPay(payParams) {
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
      //定义path 与小程序的支付页面的路径相对应
      var path = "/pages/pay/orderPay" + params;
      //通过JSSDK的api使小程序跳转到指定的小程序页面
      wx.miniProgram.navigateTo({ url: path });
    },
    getWeChatPayParams2() {
      //order.pay.wechatPay
      var that = this;
      $http
        .get("order.merge-pay.cloudWechatPay", {
          order_pay_id: this.order_pay_id,
          pid: this.uid
        })
        .then(
          function(response) {
            if (response.result == 1) {
              console.error(666666666, response.data);
              window.location.href = response.data;

              //wx.config(response.data.js);
              //that.WXPay(response.data.config);
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
    initHtml() {
      this.balance = this.$store.state.balance;
    },
    changePayStatus() {
      if (this.confirmOrderStatus) {
        this.confirmOrderStatus = false;
        this.isdisabled = false;
      }
    },
    confirmOrder() {
      var val = this.payMuch;
      if (val && val > 0) {
        this.payPrice = val;
        this.preGoodsBuy();
        this.confirmOrderStatus = true;
        this.isdisabled = true;
      } else {
        MessageBox.alert("请输入正确的付款金额！");
        this.confirmOrderStatus = false;
        this.isdisabled = false;
      }
    },
    WXPay(payParams, cbHref) {
      //alert(document.location.href);
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
            // that.$router.push(that.fun.getUrl('member'));

            // MessageBox.alert('支付成功', '提示');

            if (that.fun.isTextEmpty(cbHref)) {
              that.$router.push(that.fun.getUrl("home"));
              MessageBox.alert("支付成功", "提示");
            } else {
              if (cbHref && cbHref.indexOf("showBalances") > -1) {
                MessageBox.alert("支付成功", "提示");
                that.goShowBalances();
              } else {
                window.location.href = cbHref;
                MessageBox.alert("支付成功", "提示");
              }
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
              MessageBox.alert(response.msg, "提示");
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
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    btnclass(type) {
      if (
        type == 1 ||
        type == 6 ||
        type == 9 ||
        type == 12 ||
        type == 20 ||
        type == 22 ||
        type == 48 ||
        type == 60||
        type == 56
      ) {
        return "icon-pay_b";
      } else if (
        type == 2 ||
        type == 7 ||
        type == 10 ||
        type == 15 ||
        type == 21 ||
        type == 61
      ) {
        return "icon-pay_c";
      } else if (type == 3) {
        return "icon-pay_d";
      } else if (type == 14) {
        return "icon-pay_f";
      } else if (type == 18) {
        return "card";
      } else {
        return "icon-pay_a";
      }
    },
    btnstyle(type) {
      if (
        type == 1 ||
        type == 6 ||
        type == 9 ||
        type == 12 ||
        type == 20 ||
        type == 22 ||
        type == 48 ||
        type == 60||
        type == 56
      ) {
        return "#64b42e";
      } else if (
        type == 2 ||
        type == 7 ||
        type == 10 ||
        type == 15 ||
        type == 21 ||
        type == 61
      ) {
        return "#069ce7";
      } else if (type == 3) {
        return "#fc992c";
      } else if (type == 14) {
        return "#e36724";
      } else if (type == 18) {
        return "#dedede";
      } else {
        return "#fac337";
      }
    },

    //初始化pop
    initPop() {
      this.pwds = [];
      this.pwd = "";
      this.pw1 = "";
      this.pw2 = "";
      this.pw3 = "";
      this.pw4 = "";
      this.pw5 = "";
      this.pw6 = "";
    },

    showPwdPop() {
      this.initPop();
      this.popupSpecs = true;
    },

    hidePwdPop() {
      this.popupSpecs = false;
    },

    //密码组装
    onPassword(value) {
      if (this.pwd.length < 6) {
        this.pwd = this.pwd + value;
        this.setPwdView(); //设置密码显示
      }
      if (this.pwd.length == 6) {
        this.hidePwdPop();
        this.getVerifyPassword(this.pwd); //请求密码验证接口
        this.pwd = ""; //复位
      }
    },

    //设置密码 view显示
    setPwdView() {
      let pwdLength = this.pwd.length;
      if (pwdLength <= 0) {
        return;
      }
      switch (pwdLength) {
        case 1:
          this.pw1 = this.pwd.substring(0, 1);
          break;
        case 2:
          this.pw2 = this.pwd.substring(1, 2);
          break;
        case 3:
          this.pw3 = this.pwd.substring(2, 3);
          break;
        case 4:
          this.pw4 = this.pwd.substring(3, 4);
          break;
        case 5:
          this.pw5 = this.pwd.substring(4, 5);
          break;
        case 6:
          this.pw6 = this.pwd.substring(5, 6);
          break;
        default:
          break;
      }
    },

    //删除密码
    pwdDelete() {
      let pwdLength = this.pwd.length;
      if (pwdLength <= 0) {
        return;
      }
      let that = this;

      switch (pwdLength) {
        case 1:
          this.pwd = this.pwd.substring(0, 0);
          this.pw1 = "";
          break;
        case 2:
          this.pwd = this.pwd.substring(0, 1);
          this.pw2 = "";
          break;
        case 3:
          this.pwd = this.pwd.substring(0, 2);
          this.pw3 = "";
          break;
        case 4:
          this.pwd = this.pwd.substring(0, 3);
          this.pw4 = "";
          break;
        case 5:
          this.pwd = this.pwd.substring(0, 4);
          this.pw5 = "";
          break;
        case 6:
          this.pwd = this.pwd.substring(0, 5);
          this.pw6 = "";
          break;
        default:
          break;
      }
    },

    //验证密码
    getVerifyPassword(pwd) {
      //order.pay.wechatPay
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
                  //商城支付密码设置未开启
                  //that.$router.go(-1);
                } else if (response.data.code == 2002) {
                  //用户未设置支付密码
                  //去设置密码
                  that.$router.push(
                    that.fun.getUrl("set_balance_password", {})
                  );
                } else if (response.data.code == 2003) {
                  //支付密码错误
                }
              } else if (action == "cancel") {
                if (response.data.code == 2001) {
                  //商城支付密码设置未开启
                } else if (response.data.code == 2002) {
                  //用户未设置支付密码
                } else if (response.data.code == 2003) {
                  //支付密码错误
                }
              }
            });
          }
        },
        function(response) {
          MessageBox.alert(response.msg, "提示");
        }
      );
    }
  },
  watch: {},
  components: { cTitle, loading }
};
