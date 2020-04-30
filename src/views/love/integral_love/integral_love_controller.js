import cTitle from "components/title";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      integral: 0,
      transfer_set: 1,
      withdraw_set_title: 1,
      name: "",
      manual_withdraw_set_switch: 1,
      is_recharge: "1",
      pop: {}
    };
  },
  activated() {
    this.pop = {};
    this.integral = 0;
    this.transfer_set = 1;
    this.withdraw_set_title = 1;
    this.is_recharge = "1";
    this.name = "";
    this.pop = this.$store.state.pop;
    this.getName();
    this.getData();
  },
  methods: {
    cancel() {
      this.pop.show = false;
      this.$store.commit("savePop", this.pop);
    },
    getName() {
      $http
        .get("plugin.integral.Frontend.Controllers.page.get-name", {}, " ")
        .then(response => {
          if (response.result === 1) {
            this.name = response.data;
            this.fun.setWXTitle(this.name);
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      $http
        .get("plugin.integral.Frontend.Controllers.Page.index", {}, " ")
        .then(response => {
          if (response.result === 1) {
            this.integral = response.data.member_integral;
            this.transfer_set = response.data.transfer_set;
            this.withdraw_set_title = response.data.withdraw_set_title;
            this.manual_withdraw_set_switch =
              response.data.manual_withdraw_set_switch;
            this.is_recharge = response.data.is_recharge.is_recharge;
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toPage(url) {
      this.$router.push(this.fun.getUrl(url));
    }
  },
  components: { cTitle }
};
