<template>
  <div class="form">
    <c-title :hide="false" :text="showPhone? '个人手机号认证':'个人银行卡号认证'">
    </c-title>
    <div style="height: 40px"></div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.id_no"
          name="身份证号"
          label="身份证号"
          placeholder="身份证号"
          :rules="[{ required: true, message: '请填写身份证号' }]"
        />
        <van-field
          v-if="!showPhone"
          v-model="bank_no"
          name="个人银行卡号"
          label="个人银行卡号"
          placeholder="个人银行卡号"
          :rules="[{ required: true, message: '请填写个人银行卡号' }]"
        />
        <van-field
          v-model="form.tel"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="authcode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" round plain type="info" @click="sureIdentify" v-show="this.count<= 0">
            发送验证码
          </van-button>
          <van-button slot="button" size="small" round plain type="info" disabled v-show="this.count> 0">
            {{count}}秒后重新获取
          </van-button>
        </van-field>

      </van-form>
    </div>
    <div class="btn" @click="sendCode">立即认证</div>
    <p class="blue-txt" v-if="!showPhone" @click="clear">使用手机号码认证</p>
    <p class="blue-txt" v-if="showPhone" @click="clear">使用银行卡认证</p>
  </div>
</template>

<script>
  import cTitle from "components/title";
  import { Toast, MessageBox } from "mint-ui";

  export default {
    data() {
      return {
        showPhone: false,
        form: {
          name: "",
          id_no: "",
          tel: ""
        },
        authcode: "",
        bank_no: "",
        flow_id: "",
        count: "",
        timer: null
      };
    },
    activated() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    methods: {
      clear() {
        this.form = {
          name: "",
          id_no: "",
          tel: ""
        };
        this.authcode = "";
        this.bank_no = "";
        this.flow_id = "";
        this.count = 0;
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.showPhone = !this.showPhone;
      },
      onSubmit() {
        console.log("submit", this.form);
      },
      sureIdentify() {
        let url = "";
        let json = {};
        const TIME_COUNT = 60;
        if (this.showPhone) {
          url = "plugin.yun-sign.frontend.person.auth-tel";
          json = this.form;
        } else {
          url = "plugin.yun-sign.frontend.person.auth-bank-card";
          this.form.bank_no = this.bank_no;
          json = this.form;
        }
        $http
          .post(url, json, "...").then(response => {
            if (response.result === 1) {
              Toast("已发送");
              this.flow_id = response.data.data.flowId;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      },
      sendCode() {
        if (!this.flow_id) {
          Toast("请先获取验证码");
          return;
        }
        let url = "";
        let json = {};
        if (this.showPhone) {
          url = "plugin.yun-sign.frontend.person.check-tel-sms-code";
          json = {
            flow_id: this.flow_id,
            authcode: this.authcode
          };
        } else {
          url = "plugin.yun-sign.frontend.person.check-bank-sms-code";
          this.form.bank_no = this.bank_no;
          json = {
            flow_id: this.flow_id,
            authcode: this.authcode
          };
        }
        $http
          .post(url, json, "...").then(response => {
            if (response.result === 1) {
              MessageBox.alert(response.msg);
              this.$router.push(this.fun.getUrl("signCompany"));
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      }
    },
    components: { cTitle }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .form {
    background: #FFFFFF;
    height: 100vh;
  }

  .btn {
    margin: 20px auto;
    color: #FFFFFF;
    width: 18.75rem;
    height: 2.25rem;
    line-height: 2.25rem;
    background-color: #377aff;
    border-radius: 20px;
  }

  .blue-txt {
    text-align: center;
    color: #377aff;
  }
</style>
