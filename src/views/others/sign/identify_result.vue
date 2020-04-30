<template>
  <div class="result">
    <c-title :hide="false" :text="'个人/企业认证结果'">
    </c-title>
    <div style="height: 40px"></div>
    <!--个人认证通过-->
    <div class="content" v-if="show == 'person' && person.status == 'SUCCESS'">
      <img class="img" src="../../../assets/images/yht_success@2x.png" alt="">
      <p style="font-weight: bold">您本次的个人认证已通过</p>
      <div class="btn-box">
        <div class="btn-item" style="margin-right: 0.8rem;">
          <img src="../../../assets/images/yht_behalf@2x.png" alt="">
          <p style="margin: 0.8rem 0 3rem">如果您是公司法定代表人，需要进行企业认证。</p>
          <div class="btn" style="width: 80%;" @click="toSign(1)">企业认证</div>
        </div>
        <div class="btn-item">
          <img src="../../../assets/images/yht_staff@2x.png" alt="">
          <p style="margin: 0.5rem 0 0">如果您是公司员工，请联系公司法定代表人，在本系统中把你添加为企业员工。</p>
          <div class="btn" style="width: 80%;color: #377aff;background: #FFFFFF;border: 1px solid #377aff;" @click="toSign('home')">返回首页</div>
        </div>
      </div>
    </div>
    <!--个人认证通过end-->

    <!--个人认证失败-->
    <div class="content" v-if="show == 'person'&& person.status == 'FAIL'">
      <img class="img" src="../../../assets/images/yht_failed@2x.png" alt="">
      <p style="font-weight: bold">您本次的个人认证未通过</p> <p style="font-size: 13px;margin-top: 0.4rem">请核对信息后继续认证</p>
    </div>
    <div class="btn" @click="toSign" v-if="show == 'person'&& person.status == 'FAIL'">进行个人认证</div>
    <!--个人认证失败end-->

    <!--个人认证审核-->
    <div class="content" v-if="show == 'person'&& person.status == 'ING'">
      <img class="img" src="../../../assets/images/yht_checked@2x.png" alt="">
      <p>您本次的个人认证信息正在审核</p>
    </div>
    <!--个人认证审核end-->

    <!--企业认证通过-->
    <div class="content" v-if="show == 'company' && company.status == 'SUCCESS'">
      <img class="img" src="../../../assets/images/yht_success@2x.png" alt="">
      <p>您本次的企业认证已经通过</p>
    </div>
    <!--企业认证通过end-->

    <!--企业认证失败-->
    <div class="content" v-if="show == 'company'&& company.status == 'FAIL'">
      <img class="img" src="../../../assets/images/yht_failed@2x.png" alt="">
      <p>您本次的企业认证未通过， <br/>请核对信息后继续认证。</p>
    </div>
    <div class="btn" @click="toSign(1)" v-if="show == 'company'&& company.status == 'FAIL'">进行企业认证</div>
    <!--企业认证失败end-->

    <!--企业认证审核-->
    <div class="content" v-if="show == 'company'&& company.status == 'ING'">
      <img class="img" src="../../../assets/images/yht_checked@2x.png" alt="">
      <p>您本次的企业认证信息正在审核 <br/>如有疑问，请联系 <a :href="'tel:'+ company.contact_tel" class="phone">{{company.contact_tel}}</a>
      </p>
    </div>
    <!--企业认证审核end-->
  </div>
</template>

<script>
  import cTitle from "components/title";
  import { Toast, MessageBox } from "mint-ui";

  export default {
    data() {
      return {
        show: '',
        company: {},
        person: {}
      };
    },
    activated() {
      this.show = this.$route.params.show;
      if (this.show == "company") {
        this.getCompanyData();
      } else {
        this.getPersonData();
      }
    },
    methods: {
      toSign(str) {
        if (str == 1) {
          this.$router.push(this.fun.getUrl("signCompany"));
        }else if (str == 'home') {
          this.$router.push(this.fun.getUrl("home"));
        } else {
          this.$router.push(this.fun.getUrl("personBank"));
        }
      },
      getPersonData() {
        $http
          .get("plugin.yun-sign.frontend.person.check-person-approve", {}, "...").then(response => {
            if (response.result === 1) {
              this.person = response.data;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      },
      getCompanyData() {
        $http
          .get("plugin.yun-sign.frontend.company.check-company-approve", {}, "...").then(response => {
            if (response.result === 1) {
              this.company = response.data;
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
  .result {
    background: #FFFFFF;
    height: 100vh;
  }

  .img {
    width: 12rem;
    height: 12rem;
    margin: 40px auto;
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

  .phone {
    color: #0655fe;
  }

  .btn-box {
    display: flex;
    margin: 1rem;
    font-size: 13px;
    .btn-item {
      padding: 0.5rem 0.3rem;
      flex: 1;
      background-color: #f9fbff;
      border-radius: 10px;
      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
</style>
