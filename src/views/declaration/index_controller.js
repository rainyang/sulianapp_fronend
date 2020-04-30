
import cTitle from 'components/title'
import { Toast } from "mint-ui";

export default {
    data() {
        return {
            show1: false,
            info:{
                setting:{
                    declaration_name: '未定义标题',
                    banner: ''
                },
                agent_level_list: [],
                member_info: {
                    uid: ''
                }
            },
            realname:'',//会员姓名
            nickname: '',//会员昵称
            leve_id: '',//分销商等级ID 页面中传回来的值
            country: '86',//区号
            mobile: '',
            password: '',
            confirm_password: '',//确认密码
            code: '',
            start1: false,
            captcha: '',
            imgcode: '',
            leve_name: ''
        }
    },
    activated() {
        this.getData();
        this.getimgdata();
        this.init();
    },
    methods: {
        init(){
            this.show1 = false,
            this.info = {
                setting:{
                    declaration_name: '未定义标题',
                    banner: ''
                },
                agent_level_list: [],
                member_info: {
                    uid: ''
                }
            }
            this.realname = '',//会员姓名
            this.nickname = '',//会员昵称
            this.leve_id = '',//分销商等级ID 页面中传回来的值
            this.country = '86'//区号
            this.mobile = ''
            this.password = ''
            this.confirm_password = ''//确认密码
            this.code = ''
            this.start1 = false,
            this.captcha = ''
            this.imgcode = ''
            this.leve_name = ''
        },
        getData(){
            $http.get('plugin.declaration.api.index.index', {}, "加载中").then(res => {
                if (res.result == 1) {
                    this.info=res.data;
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //关闭弹窗
        close(){
            this.show1=false;
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
        //发送验证码
        verificationCode() {
            let that = this;
            if (this.fun.isTextEmpty(this.country)) {
              Toast("请输入国际区号");
                return;
              }
            if (this.fun.isTextEmpty(this.mobile)) {
                Toast("请填写手机号");
                return;
            }

            if (this.fun.isMoblie(this.mobile)) {
                Toast("请填写正确的手机号");
                return;
            }

            if (this.fun.isTextEmpty(this.captcha) && this.imgcode) {
                Toast("请填图形验证码");
            } else {
                this.$yddialog.loading.open("发送中...");
                //发送获取验证码的请求
                $http
                    .get("member.register.sendCodeV2", {
                        mobile: this.mobile,
                        state: this.country,
                        captcha: this.captcha,
                        code: this.code,
                        sms_type: 1
                        })
                        .then(
                        response => {
                            console.log(response);

                            this.$yddialog.loading.close();
                            if (response.result == 1) {
                            that.sendCodeAnimation();
                            } else {
                            //刷新图形验证码
                            Toast(response.msg);
                            this.captcha = "";
                            this.getimgdata();
                            }
                        },
                        response => {
                            console.log(response.msg);
                        }
                    );
                }
        },
        //发送验证码 倒计时
        sendCodeAnimation() {
            setTimeout(() => {
            this.start1 = true;
            this.$yddialog.loading.close();
            Toast("已发送");
            }, 1000);
        },
        //等级弹窗的值变化时 触发
        change(e){
            var that = this;
            //用于弹窗的val 值（id）与 input的level_name对应，ydui组件显示的是val值
            var arr1 = this.info.agent_level_list.filter(function(v){
                 return that.leve_id == v.id // 利用filter方法来遍历是否有相同的元素
                //console.log(v.id)
            })
           this.leve_name= arr1.map(function (user) { return user.name; });
        },
        //确认注册
        btnChooseVip(){
            if (this.fun.isTextEmpty(this.nickname)) {
                Toast("请输入会员昵称");
                return;
            }

            if (this.fun.isTextEmpty(this.realname)) {
                Toast("请输入会员姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.country)) {
                Toast("请输入国际区号");
                return;
              }

              if (this.fun.isTextEmpty(this.mobile)) {
                Toast("请填写手机号");
                return;
              }

              if (this.country == "86" && this.fun.isMoblie(this.mobile)) {
                Toast("请填写正确的手机号");
                return;
              }

              if (this.fun.isTextEmpty(this.code)) {
                Toast("请填验证码");
                return;
              }

              if (this.fun.isTextEmpty(this.password)) {
                Toast("请填写密码");
                return;
              }

              if (this.fun.isTextEmpty(this.confirm_password)) {
                Toast("请填写确认密码",);
                return;
              }

              if (this.password != this.confirm_password) {
                Toast("两次密码不一致");
                return;
              }

              if (this.imgcode) {
                if (this.fun.isTextEmpty(this.captcha)) {
                  Toast("图形验证码不能为空");
                  return;
                }
              }

              this.$yddialog.loading.open("发送中...");
              let json = {
                mobile: this.mobile,
                password: this.password,
                confirm_password: this.confirm_password,
                nickname: this.nickname,
                realname: this.realname,
                leve_id: this.leve_id,
                //captcha: this.captcha,
                code: this.code
              }
                $http.post("plugin.declaration.api.register.store", json).then(
                    response => {
                        this.$yddialog.loading.close();
                        if (response.result == 1) {
                            this.$dialog.alert({
                                mes: "注册成功",
                                callback: () => {}
                            });
                            this.init();
                            this.getData();
                        } else {
                            this.$dialog.alert({ mes: response.msg });
                        }
                    },
                    response => {
                        this.$dialog.alert({ mes: response.msg });
                        this.$yddialog.loading.close();
                    }
                );
        },
    },
    components: {cTitle  }
}
