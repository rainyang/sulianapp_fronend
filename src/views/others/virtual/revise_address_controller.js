import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      start: false,
      newAddress: "",
      is_default: false,
      mobile: "",
      id: "",
      oldAddress: "",
      code: "",
      imgCode: "",
      captcha: "",
      qr: ""
    };
  },
  activated() {
    this.inniData();
    this.id = this.$route.params.id;
    this.getMobbile();
  },
  methods: {
    inniData() {
      this.start = false;
      this.newAddress = "";
      this.is_default = false;
      this.mobbile = "";
      this.id = "";
      this.oldAddress = "";
      this.code = "";
      this.imgCode = "";
      this.captcha = "";
      this.qr = "";
    },
    changeImg() {
      this.getMobbile();
    },
    afterRead(e) {
      let fd = new FormData();
      fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      var That = this;
      this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
      axios
        .post(this.uploadUrl, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.qr = response.data.data.img_url;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMobbile() {
      let json = {
        address_id: this.id
      };
      $http
        .get(
          "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.fillInAddress",
          json
        )
        .then(response => {
          if (response.result == 1) {
            if (this.fun.isTextEmpty(response.data.mobile)) {
              Toast(response.msg);
              this.$router.push(this.fun.getUrl("editmobile"));
              return;
            } else {
              this.mobile = response.data.mobile;
              this.imgCode = this.fun.isTextEmpty(response.data.captcha)
                ? ""
                : response.data.captcha.img;
              this.oldAddress = response.data.address;
              this.qr = response.data.qr;
              this.is_default = response.data.is_default == 1 ? true : false;
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendCode() {
      let json = {
        mobile: this.mobile,
        captcha: this.captcha
      };
      if (
        this.fun.isTextEmpty(this.captcha) &&
        !this.fun.isTextEmpty(this.imgCode)
      ) {
        Toast("请输入图形验证码");
        return;
      }
      $http
        .get(
          "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.sendNewCode",
          json
        )
        .then(response => {
          if (response.result == 1) {
            Toast(response.msg);
            setTimeout(() => {
              this.start = true;
              this.$yddialog.loading.close();
            }, 1000);
            return;
          } else {
            this.getMobbile();
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    revise() {
      let myreg = /^0x((?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,62}$)/;
      if (this.fun.isTextEmpty(this.code)) {
        Toast("请输入验证码");
        return;
      }
      if (!myreg.test(this.newAddress) && this.newAddress.length > 0) {
        Toast("请输入以0x开头加字母和数字组合的新提币地址");
        return;
      }
      {
        let json = {
          address_id: this.id,
          address:
            this.newAddress.length > 0 ? this.newAddress : this.oldAddress,
          is_default: this.is_default === true ? 1 : 0,
          code: this.code,
          mobile: this.mobile,
          qr: this.qr
        };
        $http
          .get(
            "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.updateAddress",
            json,
            "提交中"
          )
          .then(response => {
            if (response.result == 1) {
              Toast(response.msg);
              this.$router.push(this.fun.getUrl("addressManage"));
            } else {
              Toast(response.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  components: { cTitle }
};
