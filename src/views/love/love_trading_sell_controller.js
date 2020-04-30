import cTitle from "components/title";
import { MessageBox, Toast } from "mint-ui";

var isclick = true;

export default {
  data() {
    return {
      //爱心转账值
      sell_value: "",
      //爱心会员ID
      sell_id: "",
      // 转让手续费比率
      poundage: 0,
      trading_limit: 0,
      trading_fold: 0,

      love_name: "", //爱心值自定义名称
      usable: 0, // 登陆会员可用爱心值
      rate: 0,

      isTransformLoveV: false, //判断是否为转化爱心值
      balanceLang: "" //金额自定义
    };
  },
  methods: {
    getUsable() {
      if (this.isTransformLoveV) {
        $http
          .get("plugin.love.Frontend.Controllers.page.index", {}, "加载中")
          .then(
            response => {
              if (response.result === 1) {
                this.usable = response.data.usable;
                this.love_name = response.data.love_name;

                this.fun.setWXTitle(this.love_name + "出售");
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function(response) {
              MessageBox.alert(response);
            }
          );
      } else {
        $http.get("finance.balance.conver", {}, "加载中").then(
          response => {
            if (response.result === 1) {
              this.usable = response.data.credit2;
              this.rate = response.data.rate;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response);
          }
        );
      }
    },
    getLove() {
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("tempIndex")).designer.love_name
        )
      ) {
        this.love_name = JSON.parse(
          localStorage.getItem("tempIndex")
        ).designer.love_name; //获取爱心值自定义  I don't know why he want to return globally...
        this.fun.setWXTitle("转化" + this.love_name);
      }

      if (this.isTransformLoveV) {
        $http
          .get(
            "plugin.love.Frontend.Modules.Trading.Controllers.trading.get-sell-love",
            {},
            "加载中"
          )
          .then(
            response => {
              if (response.result === 1) {
                this.usable = response.data.love.usable;
                this.poundage = response.data.set.poundage;
                this.trading_limit = response.data.set.trading_limit;
                this.trading_fold = response.data.set.trading_fold;
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function(response) {
              MessageBox.alert(response);
            }
          );
      }
    },
    saleBalance() {
      if (this.isTransformLoveV && !this.sell_value) {
        Toast("请输入您要出售的数额");
        return;
      }
      if(isclick) {
        isclick= false;
        if (this.isTransformLoveV) {
          $http
            .get(
              "plugin.love.Frontend.Modules.Trading.Controllers.trading.save-sell-love",
              {
                amount: this.sell_value
              },
              "加载中"
            )
            .then(
              response => {
                setTimeout(function(){
                  isclick = true;
                }, 1000);
                if (response.result === 1) {
                  MessageBox.alert(response.msg);
                  this.sell_value = "";
                  this.getLove();
                } else {
                  MessageBox.alert(response.msg);
                }
              },
              function(response) {
                setTimeout(function(){
                  isclick = true;
                }, 1000);
                MessageBox.alert(response);
              }
            );
        } else {
          $http
            .get(
              "finance.balance.convert-love-value",
              {
                convert_amount: this.sell_value
              },
              "加载中"
            )
            .then(
              response => {
                setTimeout(function(){
                  isclick = true;
                }, 1000);
                if (response.result === 1) {
                  MessageBox.alert(response.msg);
                  this.sell_value = "";
                  this.getUsable();
                } else {
                  MessageBox.alert(response.msg);
                }
              },
              function(response) {
                setTimeout(function(){
                  isclick = true;
                }, 1000);
                MessageBox.alert(response);
              }
            );
        }
      }

    }
  },
  activated() {
    this.balanceLang = this.fun.getBalanceLang(); //获取金额自定义
    this.isTransformLoveV = this.$route.name != "transformLoveV" ? true : false;
    this.getUsable();
    this.getLove();
  },
  components: { cTitle }
};
