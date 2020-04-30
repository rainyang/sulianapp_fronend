import { Indicator, Toast } from "mint-ui";
import cTitle from "../../components/title";

import Vue from "vue";

// import District from "src/gov_province_city_area_id";

import { DateTime } from "vue-ydui";

// Vue.component(DateTime.name, DateTime);

export default {
  data() {
    return {
      apply_status: "",
      applyModel: {
        realname: "",
        mobile: "",
        company_name: "",
        owner_name: "",
        card_no: "",
        guarantor_name: "",
        address: "",
        status: 0,
        level_id: 0
      },

      addressShow: false,
      pAddressShow: false,

      streetShow: false,
      pStreetShow: false,

      addressName: "",
      pAddressName: "",

      //街道
      area: district,

      strShow: false,
      pStrShow: false,

      distributor: "",

      isDeliveryStation: true, //是否为营销互动进去的配送站，区分于商家管理的 配送站中心
      deliveryInfo: {}
    };
  },

  // 初始
  activated() {
    this.isDeliveryStation =
      this.$route.name != "deliveryStation" ? true : false;

    if (this.isDeliveryStation) {
      this.getData(); //配送站中心
    } else {
      this.apply_status = 3;
      this.getDeliveryStation(); //配送站
    }
  },
  mounted() {},

  methods: {
    //获取配送站中心数据
    getData() {
      let that = this;
      let json = {};

      $http
        .get(
          "plugin.kingtimes.frontend.distributor.apply.verify-apply-status",
          json,
          ""
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.apply_status = response.data.status;
              if (that.apply_status === 3) {
                // 请求接口
                that.getCenterData();
              }
            } else {
              Toast(response.msg);
              that.$router.go(-1);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    //获取配送站数据
    getDeliveryStation() {
      let that = this;
      $http
        .get("plugin.delivery-station.frontend.delivery-station.index", {}, "")
        .then(
          function(response) {
            if (response.result === 1) {
              that.deliveryInfo = response.data;
            } else {
              Toast(response.msg);
              that.$router.go(-1);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    //提交数据
    setApplyData() {
      console.log(this.applyModel);

      if (this.fun.isTextEmpty(this.applyModel.realname)) {
        Toast("请填写真实姓名");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.mobile)) {
        Toast("请填写手机号码");
        return;
      }

      if (this.fun.isMoblie(this.applyModel.mobile)) {
        Toast("请输入正确的手机号");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.company_name)) {
        Toast("请填写公司名称");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.owner_name)) {
        Toast("请填写负责人");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.card_no)) {
        Toast("请填写身份证号");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.guarantor_name)) {
        Toast("请填写担保人");
        return;
      }

      if (
        this.fun.isTextEmpty(this.applyModel.agent_province_id) ||
        this.fun.isTextEmpty(this.applyModel.agent_city_id) ||
        this.fun.isTextEmpty(this.applyModel.agent_district_id)
      ) {
        Toast("请选择代理省市区");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.agent_street_id)) {
        Toast("请选择代理街道");
        return;
      }

      if (
        this.fun.isTextEmpty(this.applyModel.province_id) ||
        this.fun.isTextEmpty(this.applyModel.city_id) ||
        this.fun.isTextEmpty(this.applyModel.district_id)
      ) {
        Toast("请选择所在省市区");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.street_id)) {
        Toast("请选择所在街道");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.address)) {
        Toast("请填写详细地址");
        return;
      }

      let that = this;

      let json = { apply: JSON.stringify(this.applyModel) };

      $http
        .post(
          "plugin.kingtimes.frontend.distributor.apply.sub-apply",
          json,
          "提交中..."
        )
        .then(
          function(response) {
            console.log(response.data);
            if (response.result == 1) {
              Toast({
                message: response.msg,
                duration: 1000
              });

              setTimeout(function() {
                that.goHome();
              }, 1100);
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    //去商城
    goHome() {
      this.$router.push(this.fun.getUrl("home"));
    },

    //地址回调
    addressCallback(obj) {
      this.addressName =
        obj.itemName1 + " " + obj.itemName2 + " " + obj.itemName3;

      this.applyModel.agent_province_id = obj.itemValue1;

      this.applyModel.agent_city_id = obj.itemValue2;

      this.applyModel.agent_district_id = obj.itemValue3;

      this.getStreet(obj.itemValue3);
    },
    pAddressCallback(obj) {
      this.pAddressName =
        obj.itemName1 + " " + obj.itemName2 + " " + obj.itemName3;

      this.applyModel.province_id = obj.itemValue1;

      this.applyModel.city_id = obj.itemValue2;

      this.applyModel.district_id = obj.itemValue3;

      this.getpStreet(obj.itemValue3);
    },

    streetConfirm(item) {
      this.street = item.areaname;
      this.applyModel.agent_street_id = item.id;
      console.log(this.applyModel.agent_street_id);
      this.streetShow = false;
    },
    pStreetConfirm(item) {
      this.pStreet = item.areaname;
      this.applyModel.street_id = item.id;
      this.pStreetShow = false;
    },

    //获取街道
    getStreet(param) {
      $http
        .get("member.memberAddress.street", { district_id: param })
        .then(response => {
          console.log(response);
          if (response.result == 1) {
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
          console.log(error);
        });
    },
    getpStreet(param) {
      $http
        .get("member.memberAddress.street", { district_id: param })
        .then(response => {
          if (response.result == 1) {
            if (
              !this.fun.isTextEmpty(response.data) &&
              response.data.length > 0
            ) {
              this.pDistrictVal = response.data;
              this.pStrShow = true;
            } else {
              this.pStrShow = false;
            }
          } else {
            this.pStrShow = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取数据
    getCenterData() {
      let that = this;
      let json = {};

      $http
        .get(
          "plugin.kingtimes.frontend.distributor.center.index",
          json,
          "加载中..."
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.distributor = response.data;
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    goMemberWithdrawal() {
      this.$router.push(this.fun.getUrl("withdrawal"));
    },
    gotoRobbingCenter() {
      this.$router.push(this.fun.getUrl("RobbingCenter"));
    },

    gotoDeliveryOrder() {
      this.$router.push(
        this.fun.getUrl("DeliveryOrderList", {
          status: "0",
          orderType: "DeliveryS"
        })
      );
    },

    gotoDistributorOrder() {
      this.$router.push(this.fun.getUrl("distributorOrderList"));
    },

    gotoMyReplenish() {
      this.$router.push(
        this.fun.getUrl("MyReplenishment", { fromDistribution: 1 })
      );
    },

    gotoWantReplenishmenth() {
      this.$router.push(
        this.fun.getUrl("WantReplenishment", { fromDistribution: 1 })
      );
    },

    gotoReplenishOrder() {
      this.$router.push(this.fun.getUrl("ReplenishOrder"));
    },

    gotoDistribution_ReplenishOrder() {
      //配送站的补货单
      this.$router.push(
        this.fun.getUrl("DeliveryReplenish", {
          status: "0",
          orderType: "DeliveryReplenish"
        })
      );
    },

    gotoRebate(str) {
      this.$router.push(this.fun.getUrl("ReplenishRebate", {}, { name: str }));
    },

    gotoDistributionStat() {
      this.$router.push(this.fun.getUrl("distribution_stat", {}));
    },
    gotoPresentationRecord() {
      this.$router.push(
        this.fun.getUrl("CommissionList", { orderType: "delivery_station" })
      );
    }
  },
  components: { cTitle }
};
