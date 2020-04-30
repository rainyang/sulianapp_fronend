import cTitle from "components/title";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      // 登陆会员冻结爱心值
      froze: 0,
      //爱心值自定义名称
      love_name: "",
      // 登陆会员可用爱心值
      usable: 0,
      // 转让开关是否开启
      transfer_status: false,
      // 转让开关是否开启
      trading_status: false,
      //待用爱心值
      recharge: 0,
      //是否可提现
      withdraw_status: false,
      //是否可以
      recharge_status: false
    };
  },
  methods: {
    makeTransfer() {
      $http
        .post(
          "plugin.love.Frontend.Controllers.page.is-team-dividend",
          {},
          "加载中"
        )
        .then(
          response => {
            if (response.result === 1) {
              if (response.data.flag) {
                this.$router.push(this.fun.getUrl("love_transfer"));
              } else {
                MessageBox.alert("你还不是经销商，不能进行转让");
              }
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response);
          }
        );
    },
    getBalance() {
      $http
        .get("plugin.love.Frontend.Controllers.page.index", {}, "加载中")
        .then(
          response => {
            if (response.result === 1) {
              this.froze = response.data.froze;
              this.love_name = response.data.love_name;
              window.localStorage.love_name = this.love_name;
              //设置微信title
              this.fun.setWXTitle(this.love_name);
              this.usable = response.data.usable;
              this.transfer_status = response.data.transfer_status;
              this.trading_status = response.data.trading_set.trading;
              this.no_recharge = response.data.no_recharge;
              this.withdraw_status = response.data.withdraw_status;
              this.recharge_status = response.data.recharge_status;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response);
          }
        );
    },
    gotoPage(url) {
      this.$router.push(this.fun.getUrl(url));
    }
  },
  activated() {
    this.getBalance();
  },
  components: { cTitle }
};
