import { mapState, mapMutations } from "vuex";
import cTitle from "components/title";
import { Loadmore } from "mint-ui";
import { Lazyload, Button } from "mint-ui";
import { MessageBox } from "mint-ui";

var haveShop = false;

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      myType: window.localStorage.type,
      store: {
        name: "",
        thumb: "",
        validity: "", // 有效期
        store_id: ""
      },
      income: {
        money_total: 0.0,
        sure_withdraw_money: 0.0
      },
      goods_id: "", // 商品id
      status: 0,
      cloudHornStatus:false,
      zkzStatus:false,
      nearby:false
    };
  },

  mounted() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    toNear(){
      this.$router.push(
        this.fun.getUrl("introduceNear", {
          store_id: this.store.store_id,
        })
      );
    },
    getStoreInfo() {
      var that = this;
      $http
        .get("plugin.store-cashier.frontend.store.center.index.index", {}, "")
        .then(
          function(response) {
            if (response.result === 1) {
              that.store = response.data.store;
              // that.store.validity = that.store.validity;
              if (response.data.store.validity == 0) {
                that.store.validity = "无限期";
              } else {
                that.initDefaultDate(
                  response.data.store.created_at.date,
                  Number(response.data.store.validity)
                );
              }
              that.income = response.data.income;
              that.nearby=response.data.nearby;
              if(response.data.store.is_open_yun_horn&&(response.data.store.is_open_yun_horn==1)){
                that.cloudHornStatus = true
              }else{
                that.cloudHornStatus = false
              }
              if(response.data.store.is_open_zkc_pay&&(response.data.store.is_open_zkc_pay==1)){
                that.zkzStatus = true
              }else{
                that.zkzStatus = false
              }
            } else {
              if (response.data.url) {
                window.location.href = response.data.url;
                return;
              }
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    // 续费按钮被点击的时候
    getCash() {
      this.$router.push(
        this.fun.getUrl("goodsorder", {
          tag: "store",
          store_id: this.store.store_id,
          isCash: 1
        })
      );
    },
    // 显示续费按钮
    showCash() {
      $http
        .get("plugin.store-cashier.frontend.store.enter.enable")
        .then(res => {
          if (res.result === 1) {
            this.status = res.data.status;
          } else {
            MessageBox.alert(res.msg);
          }
        });
    },
    initDefaultDate(tiem, n) {
      var d2 = new Date(tiem);
      d2.setFullYear(d2.getFullYear() + n);
      d2.setDate(d2.getDate() - 1);
      console.log(
        "开始时间：：",
        d2.toLocaleString("chinese", { hour12: false }).replace(/:d{1,2}$/, " ")
      );
      this.timeFn(
        d2.toLocaleString("chinese", { hour12: false }).replace(/:d{1,2}$/, " ")
      );
    },
    timeFn(d1) {
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateEnd = new Date(); //获取当前时间
      var dateDiff = dateBegin.getTime() - dateEnd.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      this.store.validity = dayDiff >= 0 ? dayDiff + "天 " : "已到期！";
    }
  },
  computed: {},
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getStoreInfo();
    this.showCash();
  },
  created() {
    this.toi = this.fun.getKeyByI();
  },
  components: { cTitle, Loadmore }
};
