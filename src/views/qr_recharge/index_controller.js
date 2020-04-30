//window.localStorage.isWeiXin
import { mapState, mapMutations } from "vuex";
import { Field, Button } from "mint-ui";
import cTitle from "components/title";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      code: "",
      type_name: "",
      price: "",
      isShowType: false,
      isDisabled: false
    };
  },

  components: {
    cTitle
  },
  mounted() {},

  methods: {
    //验证
    verifyCode() {
      if (this.fun.isTextEmpty(this.code)) {
        Toast("请填写充值码");
        return;
      }

      var that = this;
      $http
        .get(
          "plugin.recharge-code.frontend.code.get-recharge-code",
          { code_key: this.code },
          "验证中..."
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.isShowType = true;
              that.type_name = response.data.recharge_code.type_name;
              that.price = response.data.recharge_code.price;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            // error callback
          }
        );
    },

    //提交
    submit() {
      if (this.fun.isTextEmpty(this.code)) {
        Toast("请填写充值码");
        return;
      }

      var that = this;
      $http
        .get(
          "plugin.recharge-code.frontend.code.recharge",
          { code_key: this.code },
          "充值中..."
        )
        .then(
          function(response) {
            that.isDisabled = true;
            if (response.result == 1) {
              MessageBox.alert(response.msg);
              if (response.data.jump_url && response.data.jump_url.length > 0) {
                window.location.href = response.data.jump_url;
              } else {
                that.$router.push(that.fun.getUrl("home", {}));
              }
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            // error callback
          }
        );
    }
  },
  activated() {
    this.code = this.$route.params.qrCode;
  }
};
