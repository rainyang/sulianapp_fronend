//window.localStorage.isWeiXin
import { mapState, mapMutations } from "vuex";
import { Field, Button } from "mint-ui";
import { Toast } from "mint-ui";
import cTitle from "components/title";
export default {
  //name: 'login',
  data() {
    return {
      eye_open: false,
      eye_close: true,
      type: "password",
      form: {
        mobile: "",
        mobileErr: "",
        password: "",
        passwordErr: "",
        uuid: 0,
        mid: 0,
        code: "",
        captcha: ""
      },
      mydata: "",
      isApp: false,
      apptoken: "",
      wetach_login: false,
      appShow: true,
      start1: false,
      mobile_login_code: 0,
      imgcode: "",
      loading: false
    };
  },
  components: {
    cTitle
  },
  mounted() {
    this.start1 = false;
    // if (JSON.parse(window.localStorage.getItem("tempIndex")).system) {
    //   this.mobile_login_code = JSON.parse(
    //     window.localStorage.getItem("tempIndex")
    //   ).system.mobile_login_code;
    // }
    // if (JSON.parse(window.localStorage.getItem("tempIndex")).captcha) {
    //   this.imgcode = JSON.parse(
    //     window.localStorage.getItem("tempIndex")
    //   ).captcha.img;
    // }
    this.getLoginMode();
  },
  methods: {
    getLoginMode() {
      var that = this;
      $http.get("member.login.login-mode", {}).then(response => {
        console.log(response);
        if (response.result === 1) {
          this.loading = true;
          this.mobile_login_code = response.data.mobile_login_code;
          if (response.data.sms.captcha.status == "1") {
            this.imgcode = response.data.sms.captcha.img;
          }
        } else {
          this.loading = true;
          Toast(response.msg);
        }
      });
    },
    login(data) {
      var that = this;
      $http.post("member.login.index", data, "").then(response => {
        console.log(response);
        if (response.result === 1) {
          window.localStorage.myuserinfo = response.data;
          console.info("--会员信息--");
          console.info(response.msg);
          that.$store.commit("setLoginStatus", response.data.status);
          if (that.fun.isApp()) {
            if (response.msg.uid) {
              YDB.SetUserRelationForPush(response.msg.uid);
            } else {
              YDB.SetUserRelationForPush(response.msg.member_id);
            }
          }
          if (response.data.url) {
            window.location.href = response.data.url;
          } else {
            that.$router.push(this.fun.getUrl("home"));
          }
        } else {
          that.$store.commit("alerts", response.msg);
        }
      });
    },
    //获取图片验证码
    getimgdata() {
      $http
        .get("home-page.getCaptcha")
        .then(res => {
          if (res.data.captcha) {
            this.imgcode = res.data.captcha.img;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    mobile_login() {
      if (this.fun.isTextEmpty(this.form.mobile)) {
        Toast("请填写手机号");
        return;
      }

      if (this.mobile_login_code != 1) {
        if (this.fun.isTextEmpty(this.form.password)) {
          Toast("请填写密码");
          return;
        }
        delete this.form.code;
      }

      this.form.uuid = 0;

      this.form.mid =
        this.fun.isTextEmpty(window.localStorage.getItem("mid")) == null
          ? 0
          : window.localStorage.getItem("mid");

      this.form.is_sms = this.mobile_login_code;
      if (this.mobile_login_code != 1) {
        delete this.form.code;
      }

      // console.log(this.form);
      this.login(this.form);
    },
    //发送验证码
    verificationCode() {
      let that = this;
      if (this.fun.isTextEmpty(this.form.mobile)) {
        Toast("请填写手机号");
        return;
      }

      if (this.fun.isMoblie(this.form.mobile)) {
        Toast("请填写正确的手机号");
        return;
      }
      if (this.fun.isTextEmpty(this.form.captcha) && this.imgcode) {
        Toast("请先填图形验证码");
        return;
      }

      this.$yddialog.loading.open("发送中");
      //发送获取验证码的请求
      $http
        .get("member.register.alySendCode", {
          mobile: this.form.mobile,
          captcha: this.form.captcha,
          sms_type: 1
        })
        .then(
          response => {
            this.$yddialog.loading.close();
            if (response.result === 1) {
              that.sendCodeAnimation();
            } else {
              //刷新图形验证码
              Toast(response.msg);
              this.form.captcha = "";
              this.getimgdata();
            }
          },
          response => {
            console.log(response.msg);
          }
        );
    },
    //发送验证码 倒计时
    sendCodeAnimation() {
      setTimeout(() => {
        this.start1 = true;
        this.$yddialog.loading.close();
        Toast("已发送");
      }, 1000);
    },
    register() {
      $http
        .get("member.register.chk-register")
        .then(res => {
          if (res.result === 1 && res.data.state == 0) {
            this.$router.push(this.fun.getUrl("register"));
          }
          if (res.result === 0 && res.data.state == 1) {
            Toast(res.data.reason);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    weixin() {
      var that = this;
      var i = that.fun.getKeyByI();
      var mid = that.fun.getKeyByMid();
      var type = that.fun.getTyep();
      var accessUrl =
        that.fun.getSiteRoot() +
        "/addons/yun_shop/api.php?i=" +
        i +
        "&mid=" +
        mid +
        "&type=" +
        type +
        "&route=member.login.index&uuid=" +
        YDB_UUID;
      YDB.WXLogin(0, accessUrl);
    },
    init_login() {
      var that = this;
      if (!that.fun.isApp()) {
        return;
      }
      if (!YDB_isWXApp) {
        return;
      }
      if (that.apptoken) {
        that.login({
          apptoken: this.apptoken
        });
      } else {
        $http
          .get("member.login.index", {
            show_wechat_login: true
          })
          .then(response => {
            console.log(response);
            if (response.result == 1) {
              that.wetach_login = parseInt(response.data.wetach_login);
            }
          });
      }
    },
    //跳转修改密码
    gotoPwd() {
      this.$router.push(this.fun.getUrl("findpwd"));
    },

    isAppLogin() {
      $http
        .post("member.login.phoneSetGet", {})
        .then(response => {
          // console.log(response);
          if (response.result == 1) {
            // if(response.data.phone_oauth == '1'){
            // 	this.appShow=true;
            // }else if(response.data.phone_oauth == '0' ){
            // 	this.appShow=false;
            // }else{
            // 	return;
            // }
            this.appShow = parseInt(response.data.phone_oauth);
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击切换password显示
    isShowpsd() {
      this.eye_open = this.eye_open == false ? true : false;
      this.eye_close = this.eye_close == true ? false : true;
      this.type = this.type == "password" ? "text" : "password";
    }
  },
  activated() {
    let app = this.fun.getTyep();

    if (app == "7") {
      this.isAppLogin();
    } else {
      this.appShow = true;
    }

    this.apptoken = this.$route.query.apptoken;
    this.init_login();
  }
};
