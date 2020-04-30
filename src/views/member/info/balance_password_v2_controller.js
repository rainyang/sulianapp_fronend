import { Field } from "mint-ui";
import { Picker,Toast } from "mint-ui";
import { DatetimePicker } from "mint-ui";
import addre from "assets/address/addressinfo";
import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";

const address = addre;
export default {
  data() {
    return {
      isOldShowKeyboard: false,
      isNewShowKeyboard: false,
      mobile: "",

      code: "",
      // oldPwd: "",//旧密码
      newPwd: "", //新密码
      captcha: "",

      startCode: false,
      imgcode: ""
    };
  },

  methods: {
    initData() {
      this.isOldShowKeyboard = false;
      this.isNewShowKeyboard = false;
      this.startCode = false;
      this.mobile = "";
      this.captcha = "";
      // if (JSON.parse(window.localStorage.getItem("tempIndex")).captcha) {
      //   this.imgcode = JSON.parse(
      //     window.localStorage.getItem("tempIndex")
      //   ).captcha.img;
      // }
      this.getimgdata();

      this.code = "";
      // this.oldPwd = "";
      this.newPwd = "";
    },

    // showOldKeyboard() {
    //   this.isOldShowKeyboard = true;
    // },
    //
    // hideOldKeyboard() {
    //   this.isOldShowKeyboard = false;
    // },

    showNewKeyboard() {
      this.isNewShowKeyboard = true;
    },

    hideNewKeyboard() {
      this.isNewShowKeyboard = false;
    },

    // oldKeyboardDone(val) {
    //   this.oldPwd = val;
    //
    //   this.hideOldKeyboard();
    // },

    newKeyboardDone(val) {
      this.newPwd = val;
      this.hideNewKeyboard();
    },

    //发送验证码
    verificationCode() {
      if (this.fun.isTextEmpty(this.mobile) || this.fun.isMoblie(this.mobile)) {
        Toast("手机号数据错误");
        return;
      }
      if (this.fun.isTextEmpty(this.captcha) && this.imgcode) {
        Toast("请填图形验证码");
      } else {
        this.$yddialog.loading.open("发送中...");
        //发送获取验证码的请求
        $http
          .get("member.balance-password.send-code", {
            mobile: this.mobile,
            captcha: this.captcha
          })
          .then(
            response => {
              this.$yddialog.loading.close();
              if (response.result === 1) {
                this.sendCodeAnimation();
              } else {
                Toast(response.msg);
                this.getimgdata();
              }
            },
            response => {
              this.$yddialog.loading.close();
              console.log(response.msg);
            }
          );
      }
    },

    //发送验证码 倒计时
    sendCodeAnimation() {
      setTimeout(() => {
        this.startCode = true;
        this.$yddialog.loading.close();
        Toast("已发送");
      }, 1000);
    },
    //获取图片验证码
    getimgdata() {
      $http
        .get("home-page.getCaptcha")
        .then(res => {
          this.imgcode = res.data.captcha.img;
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitInfo() {
      if (this.fun.isTextEmpty(this.code)) {
        Toast("验证码不能为空");
        return;
      }

      if (this.fun.isTextEmpty(this.newPwd)) {
        Toast("新密码不能为空");
        return;
      }

      let that = this;
      let json = { password: this.newPwd, code: this.code , mobile: this.mobile};
      $http
        .get("member.balance-password.update-password", json, "提交中")
        .then(
          function(response) {
            if (response.result === 1) {
              MessageBox.alert("成功");
              that.$router.go(-1);
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response.msg);
          }
        );
    },

    //余额支付密码设置 手机号是否绑定
    getBalancePwdInfo() {
      let that = this;
      $http.get("member.balance-password.is-has-password", {}, "").then(
        function(response) {
          if (response.result == 1) {
            if (response.data.is_has) {
              that.mobile = response.data.mobile;
            } else {
              that.$router.go(-1);
            }
          } else {
            MessageBox.alert(response.msg);
          }
        },
        function(response) {
          MessageBox.alert(response.msg);
        }
      );
    }
  },
  //计算属性，更新数据
  computed: {},
  mounted() {},
  activated() {
    this.initData();
    this.getBalancePwdInfo();
    this.fun.setWXTitle('修改'+this.fun.getBalanceLang()+'支付密码');
  },
  components: { cTitle }
};
