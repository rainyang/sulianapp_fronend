import cTitle from "components/title";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";
import { Switch } from "mint-ui";

import { Field } from "mint-ui";
import { Picker } from "mint-ui";
import { MessageBox } from "mint-ui";
// import District from "src/gov_province_city_area_id";

const TAG_ACTION_BUY = "-2"; //直接购买
const TAG_ACTION_CART = "-1"; //1购物车结算
var _root_tag = ""; //0 直接购买 1购物车结算
var _goodsId = "";
var _optionsId = "";
var _total = 1;
var currentAddId = "";
var currentAddress = {};
var _cart_ids = [];

export default {
  data() {
    return {
      switch1: false,
      order_data: [],
      integral: window.localStorage.integral,
      onclast: false,
      toi: this.fun.getKeyByI(),
      goodsInfo: {},
      order: {},
      dispatch: {},
      realname: "", //收件人
      mobile: "",
      address: "",
      goods: [],
      order_goods_price: 0,
      price: 0,
      popupSpecs: false,
      addressData: [],

      //新增地址v2------------------------------------------------新增地址v2//
      form: {
        username: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        street: "",
        address: "",
        isDefault: false
      },
      district: district, //地址本地数据
      popAddAddress: false,
      addressShow: false,
      addressName: "", //地址区域
      strShow: false, //街道显示
      streetShow: false, //街道pop
      //新增地址v2------------------------------------------------新增地址v2//

      submit_active: true //提交标识
    };
  },

  activated() {
    this.cartIDs = this.$route.params.cartIDs;
    if (!this.cartIDs) {
      this.$router.push(this.fun.getUrl("member", {}));
      return;
    }
    this.init();
    this.getData();
  },

  mounted() {},
  methods: {
    //设置界面数据
    setViewData(data) {
      this.order_data = data.order_goods;

      this.order_goods_price = data.order_goods_price; //设置商品总价格
      this.price = data.price; //设置总价格（合计）
      currentAddId = data.order_address.province_id;
      currentAddress = data.order_address;
      this.realname = data.order_address.realname;
      this.address = data.order_address.address;
      this.mobile = data.order_address.mobile;

      if (this.price < 0) {
        this.$router.push(this.fun.getUrl("home", {}));
        MessageBox.alert("下单错误");
      }
    },

    //设置地址界面
    setAddressViewData(model) {
      if (model == undefined || model == "" || model == []) {
        return;
      }

      //设置地址id
      currentAddId = model.id;
      currentAddress = model;

      this.realname = this.fun.isTextEmpty(model.username)
        ? ""
        : model.username;
      this.mobile = this.fun.isTextEmpty(model.mobile) ? "" : model.mobile;
      this.address = this.fun.isTextEmpty(model.province)
        ? ""
        : model.province +
          " " +
          model.city +
          " " +
          model.district +
          " " +
          (this.fun.isTextEmpty(model.street) ? "" : model.street + " ") +
          model.address;
    },

    //显示地址pop
    showAddress() {
      //获取收货地址
      this.getAddress();
    },

    //获取收货地址
    getAddress(str) {
      this.addressData = [];
      let len;
      let that = this;
      let json = { i: this.fun.getKeyByI(), type: this.fun.getTyep() };
      $http.get("member.member-address.index", json, "获取中...").then(
        function(response) {
          if (response.result === 1) {
            that.addressData = response.data;
            len = that.addressData.length;
            if (str) {
              that.setAddressViewData(that.addressData[len - 1]);
            } else {
              that.popupSpecs = true;
            }
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //选择地址
    selectAddress(item) {
      // console.log(item);
      this.setAddressViewData(item); //更新界面 & ID
      //关闭 地址栏
      this.popupSpecs = false;
    },

    //跳转到新增地址
    addAddress() {
      //关闭 地址栏
      this.popupSpecs = false;

      //新增地址 本地处理
      this.showAddAddress();
    },

    //提交订单
    submit() {
      console.log("state===res", this.submit_active);
      if (this.submit_active === true) {
        this.submit_active = false;

        if (this.fun.isTextEmpty(currentAddId)) {
          Toast("请选择收货地址");
          this.submit_active = true;
          return;
        }

        let that = this;
        let json = this.assembleJson();
        $http.post(that.submitApi, json, "提交中...").then(
          function(response) {
            that.submit_active = true;
            if (response.result === 1) {
              that.$router.push(
                that.fun.getUrl(that.toOrderList, { order_ids: 1 })
              );
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

    //组装提交的json数据
    assembleJson() {
      let json = {};
      let address = {};
      if (currentAddress.id) {
        address = {
          address: this.address,
          city_id: currentAddress.city_id,
          district_id: currentAddress.district_id,
          mobile: this.mobile,
          province_id: currentAddress.province_id,
          realname: this.realname,
          street_id: currentAddress.street_id
        };
      } else {
        address = currentAddress;
      }

      json = {
        address: JSON.stringify(address),
        cart_ids: this.cartIDs
      };
      return json;
    },

    //新增地址v2----------------------------------------------新增地址v2//
    //显示增加地址
    showAddAddress() {
      this.popAddAddress = true;
    },

    //关闭增加地址
    popAddressClose() {
      this.popAddAddress = false;
    },

    //地址回调
    addressCallback(obj) {
      this.form.street = "";
      this.districtVal = "";
      this.addressName =
        obj.itemName1 + " " + obj.itemName2 + " " + obj.itemName3;
      this.form.province = obj.itemName1;
      this.form.city = obj.itemName2;
      this.form.district = obj.itemName3;
      this.getStreet(obj.itemValue3);
    },

    //获取街道
    getStreet(param) {
      $http
        .get("member.memberAddress.street", { district_id: param })
        .then(response => {
          console.log(response);
          if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
            if (
              !this.fun.isTextEmpty(response.data) &&
              response.data.length > 0
            ) {
              this.districtVal = response.data;
              this.strShow = true;
            } else {
              this.strShow = false;
            }
          } else {
            this.strShow = false;
          }
        })
        .catch(error => {
          this.strShow = false;
          console.log(error);
        });
    },

    streetChoose() {
      if (this.fun.isTextEmpty(this.addressName)) {
        MessageBox.alert("请先选择所在地区");
      } else {
        this.streetShow = true;
      }
    },

    streetConfirm(name) {
      this.form.street = name;
      this.streetShow = false;
    },

    //增加地址
    appendAddress() {
      var that = this;

      if (this.fun.isTextEmpty(this.form.username)) {
        MessageBox.alert("请输入收货人姓名");
        return;
      }

      if (this.fun.isTextEmpty(this.form.mobile)) {
        MessageBox.alert("请输入手机机号");
        return;
      }
      if(!/^[0-9]{1,}$/.test(this.form.mobile)) {
        MessageBox.alert("请输入正确的联系电话");
        return;
      }

      // if (this.fun.isMoblie(this.form.mobile)) {
      //   MessageBox.alert("请输入正确的手机号");
      //   return;
      // }

      if (this.fun.isTextEmpty(this.addressName)) {
        MessageBox.alert("请选择所在区域");
        return;
      }

      if (this.strShow && this.fun.isTextEmpty(this.form.street)) {
        MessageBox.alert("请选择所在街道");
        return;
      }

      if (this.fun.isTextEmpty(this.form.address)) {
        MessageBox.alert("请输入详细地址");
        return;
      }

      let json = {};
      if (this.strShow) {
        json = {
          username: this.form.username,
          mobile: this.form.mobile,
          province: this.form.province,
          city: this.form.city,
          district: this.form.district,
          street: this.form.street,
          address: this.form.address,
          isdefault: this.form.isDefault ? 1 : 0
        };
      } else {
        json = {
          username: this.form.username,
          mobile: this.form.mobile,
          province: this.form.province,
          city: this.form.city,
          district: this.form.district,
          address: this.form.address,
          isdefault: this.form.isDefault ? 1 : 0
        };
      }

      $http.post("member.member-address.store", json, "").then(
        function(response) {
          if (response.result == 1) {
            MessageBox.alert(response.msg);
            that.popAddressClose();
            that.getAddress("add");
            that.form = {
              username: "",
              mobile: "",
              province: "",
              city: "",
              district: "",
              street: "",
              address: "",
              isDefault: false
            };
            that.addressName = "";
          } else {
            MessageBox.alert(response.msg);
          }
        },
        function(response) {
          // error callback
        }
      );
    },
    //新增地址v2----------------------------------------------新增地址v2//

    getData() {
      const that = this;
      $http
        .get(that.api, { cart_ids: that.cartIDs }, " ")
        .then(response => {
          if (response.result === 1) {
            that.setViewData(response.data);
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    init() {
      this.order_data = [];
      this.order_goods_price = 0;
      this.price = 0;
      this.realname = "";
      this.address = "";
      this.mobile = "";
      //新增地址v2------------------------------------------------新增地址v2//
      this.popAddAddress = false;
      this.addressShow = false;
      this.strShow = false;
      this.addressName = "";
      this.streetShow = false;
      //新增地址v2------------------------------------------------新增地址v2//

      // 判断是从哪个页面过来
      this.type = this.$route.query.name;
      if (this.type === "replenish") {
        // 补货商
        this.api = "plugin.kingtimes.frontend.providerOrder.cartBuy";
        this.submitApi = "plugin.kingtimes.frontend.providerOrder.create";
        this.toOrderList = "DistributionOrderList";
        this.getData();
      } else if (this.type === "delivery") {
        // 配送站
        this.api = "plugin.kingtimes.frontend.distributorOrder.cartBuy";
        this.submitApi = "plugin.kingtimes.frontend.distributorOrder.create";
        this.toOrderList = "ReplenishOrder";
        this.getData();
      } else {
        this.$router.push(this.fun.getUrl("home"));
      }
    }
  },
  components: { cTitle }
};
