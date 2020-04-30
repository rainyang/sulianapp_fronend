import {
  Field,
  Button,
  Toast
} from 'mint-ui';
import {
  MessageBox
} from 'mint-ui';
import {
  CheckBox,
  CheckBoxGroup
} from 'vue-ydui';
import cTitle from 'components/title';
//diy--------diy
// import District from 'ydui-district/dist/gov_province_city_area_id';

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//diy--------diy

export default {
  data() {
    return {
      isset: '',
      protocol_content: "",
      show2: false,

      imgcode: "",

      agreementStatus: false,
      agreementCB: true,

      start1: false,
      form: {
        country: '86',
        mobile: '',
        mobileErr: '',
        password: '',
        passwordErr: '',
        confirm_password: '',
        confirm_passwordErr: '',
        captcha: '',
        invite_code: ''
      },

      //diy--------diy
      diyStatus: 0,
      form_id: "",
      pickerValue: '2017-09-27',
	    startDate:new Date('1900'),
      showCity: false,
      district: district,
      currentDateKey: '',
      currentCityKey: '',
      checks: [],
      isValidation: true,
      diyform: {},
      diydata: [],
      types: {
        "0": 'diyinput',
        "1": 'diytextarea',
        "3": 'diycheckbox',
        "4": 'diyradio',
        "2": 'diyselect',
        "7": 'diydate',
        "9": 'diycity',
      },
      invite: '',
      isrequired: '',
      country_code: 0,
      //diy--------diy
    }
  },


  mounted() {
    this.isset = sessionStorage.getItem("isset")
    var dataSource = {}
    if (this.isset) {
      sessionStorage.removeItem("isset")
      dataSource = {
        close: 1
      }
    }
    // 判断是否显示邀请码字段
    $http.get('member.register.getInviteCode', dataSource).then((res) => {
      // console.log(res)
      // 判断是否扫码进入商城首页并且判断有没有开启强制绑定手机
      // if (this.fun.getWebEnv() == false && res.data.status !== 1) {
      //   this.invite = true
      //   this.isrequired = res.data.required
      //   return
      // }
      // 登录是否是微信登录
      // if (this.fun.isWeiXin() == true) {
      //   this.invite = false
      //   return
      // }
      if(res.result == 1){
        this.country_code = res.data.country_code;
      }
      if (res.data.status == 1) {
        this.invite = res.data.status;
        this.isrequired = res.data.required;
        this.form.invite_code = res.data.invitation_code.invite_code
        return
      }
    })
  },

  methods: {

    init() {
      this.agreementCB = true;

      this.start1 = false;
      this.form = {
        country: '86',
        mobile: '',
        mobileErr: '',
        password: '',
        passwordErr: '',
        confirm_password: '',
        confirm_passwordErr: '',
        close: 1
      };


      this.diyStatus = 0;
      this.form_id = "";
      this.pickerValue = '2017-09-27';
      this.showCity = false;

      this.currentDateKey = '';
      this.currentCityKey = '';
      this.checks = [];
      this.isValidation = true;
      this.diyform = {};
      this.diydata = [];

      this.show2 = false;
    },


    //获取是否开启协议
    getProtocolStatus() {
      var that = this;
      $http.get('setting.get-member-protocol', {}).then((response) => {
        if (response.result == 1) {
          that.agreementStatus = response.data.protocol == "0" ? false : true;
          that.protocol_content = response.data.content;
        } else {
          that.agreementStatus = false;
        }
      }, (response) => {
        console.log(response.msg);
        that.agreementStatus = false;
      });

    },


    //获取diy 状态信息
    getDiyFormStatus() {
      var that = this;
      $http.get('setting.get-register-diy-form', {}).then((response) => {
        if (response.result == 1) {
          if (response.data.status == 1) {
            that.diyStatus = 1;
            that.form_id = response.data.form_id;
            that.getDiyFormInfo(response.data.form_id);
          } else {
            that.diyStatus = 0;
          }
        } else {
          that.diyStatus = 0;
        }
      }, (response) => {
        console.log(response.msg);
        that.diyStatus = 0;
      });
    },


    //获取diy 信息
    getDiyFormInfo(id) {
      var that = this;
      $http.get('plugin.diyform.api.diy-form.get-diy-form-by-id', {
        form_id: id
      }).then((response) => {
        if (response.result == 1) {
          that.diyform = response.data;
          var fields = that.diyform.fields;

          console.log(fields, 456)

          for (var field in fields) {
            if (that.types[fields[field].data_type] == 'diycheckbox') {
              var f = {
                name: field,
                data: fields[field],
                value: [],
                type: that.types[fields[field].data_type],
              }
            } else if (that.types[fields[field].data_type] == 'diydate') {
              var f = {
                name: field,
                data: fields[field],
                value: '',
                type: that.types[fields[field].data_type],
              }

            } else {
              var f = {
                name: field,
                data: fields[field],
                value: '',
                type: that.types[fields[field].data_type],
              }
            }

            that.diydata.push(f);
          }

        } else {

        }
      }, (response) => {
        console.log(response.msg);

      });
    },


    //发送验证码
    verificationCode() {
      let that = this;
      if (this.fun.isTextEmpty(this.form.country)) {
        Toast('请输入国际区号');
        return;
      }
      if (this.fun.isTextEmpty(this.form.mobile)) {
        Toast('请填写手机号');
        return;
      }

      if (this.fun.isMoblie(this.form.mobile)) {
        Toast('请填写正确的手机号');
        return;
      }

      if (this.fun.isTextEmpty(this.form.captcha) && this.imgcode) {
        Toast('请填图形验证码')
      } else {
        this.$yddialog.loading.open('发送中...');
        // 发送获取验证码的请求
        $http.get('member.register.sendCodeV2', {
          mobile: this.form.mobile,
          state: this.form.country,
          captcha: this.form.captcha,
          code: this.form.code
        }).then((response) => {
          this.$yddialog.loading.close();
          if (response.result == 1) {
            that.sendCodeAnimation();
          } else {
            Toast(response.msg);
            //刷新图形验证码
            this.form.captcha = '';
            this.getimgdata();
          }
        }, (response) => {
          console.log(response.msg)
        });
      }
    },

    //发送验证码 倒计时
    sendCodeAnimation() {

      setTimeout(() => {
        this.start1 = true;
        this.$yddialog.loading.close();
        Toast('已发送');
      }, 1000);
    },

    //跳转
    login() {
      this.$router.push(this.fun.getUrl('login'));
    },

    goAgreement() {
      //this.$router.push(this.fun.getUrl('registerAgreement', {}));
      this.show2 = true;
    },

    //注册
    register() {

      let that = this;

      if (this.fun.isTextEmpty(this.form.country)) {
        Toast('请输入国际区号');
        return;
      }

      if (this.fun.isTextEmpty(this.form.mobile)) {
        Toast('请填写手机号');
        return;
      }

      if (this.form.country == "86" && this.fun.isMoblie(this.form.mobile)) {
        Toast('请填写正确的手机号');
        return;
      }

      if (this.fun.isTextEmpty(this.form.code)) {
        Toast('请填验证码');
        return;
      }

      if (this.fun.isTextEmpty(this.form.password)) {
        Toast('请填写密码');
        return;
      }

      if (this.isrequired == 1) {
        if (this.fun.isTextEmpty(this.form.invite_code)) {
          Toast('请填写邀请码')
          return
        }
      }

      if (this.fun.isTextEmpty(this.form.password)) {
        Toast('请填写确认密码');
        return;
      }

      if (this.form.password != this.form.confirm_password) {
        Toast('两次密码不一致');
        return;

      }

      if (this.imgcode) {
        if (this.fun.isTextEmpty(this.form.captcha)) {
          Toast('图形验证码不能为空');
          return;
        }
      }

      // 位置调整
      if (this.diyStatus == 1) {
        this.validation();

        if (!this.isValidation) {
          return;
        }
      }

      if (this.agreementStatus) {
        if (!this.agreementCB) {
          Toast('请同意注册协议');
          return;
        }
      }
      //判断是否从设置页面跳转
      if (!this.isset) {
        const {close, ...formData} = this.form;
        this.form = formData;
      }
      $http.post('member.member.bindMobile', this.form, "绑定中...").then((response) => {

        if (response.result == 1) {
          if (this.diyStatus == 0) {
            this.$dialog.alert({
              message: "绑定成功",
            });
              if (this.isset==1) {
              sessionStorage.removeItem("isset")
              this.$router.push(this.fun.getUrl('home'));
            } else if(window.localStorage.is_force_mobile && window.localStorage.is_force_mobile == 999) {
              that.$router.push(
                that.fun.getUrl("RegisterGuide", {
                  type:'2'
                })
              );
            }
            else{
              that.$router.go(-1);
            }

          } else if (this.diyStatus == 1) {
            //去提交diy
            this.postDiy();
          }
        } else {
          this.$dialog.alert({
            message: response.msg
          });
        }
      }, (response) => {
        this.$dialog.alert({
          message: response.msg
        });
      });
    },

    //获取图片验证码
    getimgdata() {
      $http.get('home-page.getCaptcha').then((res) => {
        this.imgcode = res.data.captcha.img
      }).catch(error => {
        console.log(error);
      })
    },

    //diy--------diy

    postDiy() {
      var that = this;
      var formData = [];
      var formObject = {};
      this.diydata.forEach(item => {
        formObject[item.name] = item.value;
      });
      formData.push(formObject);

      let json = {
        form_data: formData,
        form_id: this.form_id,
        "form_type": "register"
      };
      $http.post('plugin.diyform.api.diy-form.save-diy-form-data', json, "提交中...").then((response) => {

        if (response.result == 1) {
          this.$dialog.alert({
            message: "绑定成功",
          });
          that.$router.go(-1);
        } else {
          console.log(this.isrequired != 0)
          if (this.isrequired != 0) {
            this.$dialog.alert({
              message: response.msg
            })
          }
          this.$dialog.alert({
            message: response.msg
          });
        }
      }, (response) => {
        this.$dialog.alert({
          message: response.msg
        });
      });
    },

    setCity(ret) {
      var retCity = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      console.log('retCity', retCity);
      console.log('currentCityKey', this.currentCityKey);
      this.diydata.forEach(item => {
        if (item.name == this.currentCityKey) {
          this.$set(item, 'value', retCity);
        }
      });
    },
    openPicker(name) {
      this.currentDateKey = name;
      console.log('name', name);
      this.$refs.picker.open();
    },
    setDate(ret) {
      console.log(ret.Format("yyyy-MM-dd"));
      this.diydata.forEach(item => {
        if (item.name == this.currentDateKey) {
          this.$set(item, 'value', ret.Format("yyyy-MM-dd"));
        }
      });
    },
    openCity(name) {
      this.currentCityKey = name;
    },

    //验证参数
    validation() {
      this.isValidation = true;
      console.log(this.diydata,33)
      this.diydata.forEach(item => {
        if (item.data.tp_must == 1 && !item.value && item.type) {
          console.log(item.data.tp_name, item.value);
          Toast(item.data.tp_name + '必须填写哦');

          this.isValidation = false;
        }

        if (item.type == 'diycheckbox' && item.value.length == 0) {
          console.log(item.data.tp_name, item.value);
          Toast(item.data.tp_name + '必须选择哦');
          this.isValidation = false;
        }
      });
    },
    //diy--------diy

    popClose() {
      this.show2 = false;
    },
  },
  activated() {

    // console.log(this.$route.params.num);
    this.init();
    this.form.mobile = this.$route.params.num;
    this.getDiyFormStatus();
    this.getProtocolStatus();
    this.getimgdata();
  },

  components: {
    cTitle,
    CheckBox
  }


}
