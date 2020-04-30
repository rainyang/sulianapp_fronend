<template>
  <div class="form">
    <c-title :hide="false" :text="'企业认证'">
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
          v-model="form.org_code"
          name="企业证件号"
          label="企业证件号"
          placeholder="企业证件号"
          :rules="[{ required: true, message: '请填写企业证件号' }]"
        />
        <van-field
          v-model="form.legal_name"
          name="法人姓名"
          label="法人姓名"
          placeholder="法人姓名"
          :rules="[{ required: true, message: '请填写法人姓名' }]"
        />
        <van-field
          v-model="form.legal_idNo"
          name="法人证件号"
          label="法人证件号"
          placeholder="法人证件号"
          :rules="[{ required: true, message: '请填写法人证件号' }]"
        />
      </van-form>
    </div>
    <div class="btn" @click="sureIdentify">立即认证</div>
  </div>
</template>

<script>
  import cTitle from "components/title";
  import { Toast, MessageBox } from "mint-ui";

  export default {
    data() {
      return {
        form: {
          name: "",
          org_code: "",
          legal_name: "",
          legal_idNo: ""
        }
      };
    },
    activated() {
      this.form = {
        name: "",
        org_code: "",
        legal_name: "",
        legal_idNo: ""
      };
    },
    methods: {
      onSubmit() {
        console.log('submit', this.form);
      },
      sureIdentify() {
        $http
          .post("plugin.yun-sign.frontend.company.auth-company", this.form, "...").then(response => {
            if (response.result === 1) {
              MessageBox.alert(response.msg);
              this.$router.push(this.fun.getUrl("signIndex"));
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
</style>
