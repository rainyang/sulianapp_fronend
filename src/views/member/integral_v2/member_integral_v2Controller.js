import cTitle from "components/title";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      credit1: 0.0,
      transfer: false, //是否开启转账
      integral: window.localStorage.integral,
      activity: false //是否开启积分活动
    };
  },
  methods: {
    //转账的响应方法
    transferHandel() {
      if (this.transfer) {
        this.$router.push({
          name: "integral_v2_transfer",
          params: { integral: this.credit1 },
          query: { i: this.toi }
        });
      } else {
        MessageBox.alert("您的转账功能未开启");
      }
    },
    toIntegral() {
      this.$router.push(
        this.fun.getUrl("IntegralActivity", {
          integral: this.credit1,
          i: this.toi
        })
      );
    },

    getIntegral() {
      var that = this;
      $http
        .get(
          "finance.point-page.index",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "加载中"
        )
        .then(
          function(response) {
            if (response.result == 1) {
              console.log(response.data);
              that.credit1 = response.data.credit1;
              that.transfer = response.data.transfer;
              if (response.data.activity == 1) {
                that.activity = true;
              } else {
                that.activity = false;
              }
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
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getIntegral();
    this.fun.setWXTitle(this.integral);
  },
  components: { cTitle }
};
