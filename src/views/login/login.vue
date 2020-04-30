<template>
  <div id="login">
    <div style="position: relative">
      <c-title :hide="false" text="用户登录"></c-title>
      <div style="height:20px"></div>
      <img
        style="width:20%;height:40px;position:absolute;display:block;left:74%;top:13rem;z-index:999"
        :src="imgcode"
        @click="getimgdata"
        v-if="imgcode && mobile_login_code == 1"
      />
    </div>

    <div v-show="loading">
      <div id="login_box" v-if="appShow">
        <div class="login_header">
          <img src="../../assets/images/photo-mr.jpg" />
        </div>
        <ul class="login_info">
          <li>
            <yd-input
              type="text"
              slot="right"
              v-model="form.mobile"
              :show-success-icon="false"
              :show-error-icon="false"
              max="20"
              placeholder="请输入手机号"
            ></yd-input>
          </li>
          <li v-if="imgcode && mobile_login_code == 1">
            <yd-input
              slot="right"
              v-model.trim="form.captcha"
              required
              :show-success-icon="false"
              :show-error-icon="false"
              placeholder="请输入右侧图形验证码"
            ></yd-input>
          </li>
          <li class="code" v-if="mobile_login_code == 1">
            <yd-input
              slot="right"
              v-model.trim="form.code"
              required
              :show-success-icon="false"
              :show-error-icon="false"
              regex="mobile"
              placeholder="请输入验证码"
            ></yd-input>
            <yd-sendcode
              slot="right"
              v-model="start1"
              @click.native="verificationCode"
              type="warning"
            ></yd-sendcode>
          </li>
          <li style="display:flex;flex-direction:row;" v-else>
            <yd-input
              type="password"
              slot="right"
              v-model="form.password"
              placeholder="请输入密码"
              @keyup.enter.native="mobile_login"
              style="width:76%"
            ></yd-input>
            <span class="forgetBtn">
              <router-link :to="fun.getUrl('findpwd')">忘记密码</router-link>
            </span>
          </li>
        </ul>
        <div
          style="color: #999999;text-align: left;margin-left: 1.5rem;" v-if="fun.isApp()"
        >
          登录即代表您同意<router-link style="color: #3b73ef"
            :to="fun.getUrl('userAgreement', {}, { show: 'agreement' })"
            >《用户协议》
          </router-link>
          和
          <router-link style="color: #3b73ef"
            :to="fun.getUrl('userAgreement', {}, { show: 'privacy' })"
            >《隐私政策》
          </router-link>
        </div>
        <div class="login_btn">
          <mt-button class="login" @click="mobile_login">登录</mt-button>
          <mt-button class="register" v-if="mobile_login_code != 1" @click="register">注册</mt-button>
        </div>
      </div>
      <!-- <div v-if="appShow">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">手机号：</span>
                        <yd-input slot="right" required v-model="form.mobile" max="20" placeholder="请输入手机号"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">密码：</span>
                        <yd-input slot="right" type="password" v-model="form.password" placeholder="请输入密码"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>

                <yd-button-group>
                    <yd-button size="large" @click.native="mobile_login" type="danger">登录</yd-button>
                    <yd-button size="large" @click.native="register" type="primary">注册</yd-button>
                    <p class="forget" @click="gotoPwd">忘记密码</p>
                </yd-button-group>
            </div> -->
      <!-- <p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p> -->

      <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="form.mobile" :attr="{ maxlength: 11 }" :state='form.mobileErr'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="form.password" :state='form.passwordErr'></mt-field>

            </div>
            <div id="bts">
            <mt-button type="danger" @click="mobile_login" size="large">登录</mt-button>
            <mt-button type="default" @click="register" size="large">注册</mt-button>
            <p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p>
            </div> -->
      <!--<a style="display:inline-block;width: 200px;height: 100px" href="https://dev4.yunzmall.com/addons/yun_shop/static/app/wxlogin.html">微信登录</a>-->
      <div class="vip_main" v-if="wetach_login">
        <div class="title">一键登录</div>
        <div class="weixin vip1" @click="weixin">
          <div class="ico1">
            <i class="fa fa-qrcode"></i>
          </div>
          <div class="text">
            <div class="t1">微信登录</div>
            <div class="t2">微信快捷通道一键登录商城</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login_controller from "./login_controller";
export default login_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#login .forgetBtn {
  position: absolute;
  right: 0.625rem;
  background: #fff;
  display: block;
  width: 4.375rem;
  height: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  margin-top: 0.3125rem;
}
#login {
  // background-color: #fff;
  // height: 600px;
  // // margin-top: 3.125rem;
  overflow: hidden;
  //position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  .code {
    justify-content: space-between;
    button {
      border: none;
      background-color: #ebebeb;
      color: #f15353;
      font-size: 14px;
      border-radius: 1.875rem;
      padding: 0 0.625rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin-top: 0.25rem;
    }
  }
  // 新页面css
  #login_box {
    // height: 39.1875rem;
    background-color: #fff;
    padding-top: 2.5rem;
    padding-bottom: 1.25rem;
    .login_header {
      margin: 0 auto;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 2.25rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .login_info {
      margin: 1.25rem;
      li {
        margin: 0 auto;
        width: 20.625rem;
        display: flex;
        font-size: 16px;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-top: 1.25rem;
        border-bottom: solid 0.0625rem #ccc;
        position: relative;
        input {
          width: 12.5rem;
          border: none;
        }
        span {
          font-size: 14px;
          //position: absolute;
          right: 0;
          color: #333;
        }
        .img {
          width: 2.5rem;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            margin-top: 26%;
            width: 48%;
            left: 0.625rem;
          }
        }
      }
    }
    .login_btn {
      margin-top: 2.5rem;
      button {
        width: 20.625rem;
        height: 2.8125rem;
        font-size: 16px;
        margin-bottom: 1.25rem;
        border-radius: 1.875rem;
      }
      .login {
        background: #f15353;
        color: #fff;
        border: none;
      }
      .register {
        background: #fff;
        color: #f15353;
        border: solid 0.0625rem #f15353;
      }
    }
  }

  // end
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 0.625rem;
  }
  #bts {
    margin: auto 0.3125rem;
  }
  .forget {
    line-height: 2.5rem;
    float: right;
    a {
      color: #999;
    }
  }
  .vip_main {
    background: #ffffff;
    // margin-top: 3.125rem;
    overflow: hidden;
    margin-top: 0;
    .title {
      // padding: 1.625rem;
      font-size: 12px;
      border-bottom: 0.0625rem solid #eeeeee;
      text-align: center;
      padding: 1.625rem 0 0.625rem 0;
    }
    .weixin {
      padding: 0.9375rem 0.625rem;
      overflow: hidden;
      font-size: 12px;
      color: #999;
      .ico1,
      .ico2 {
        width: 15%;
        float: left;
      }
      .ico1 {
        i {
          background: #32cd32;
        }
      }
      .ico2 {
        i {
          background: #fece00;
        }
      }
      .text {
        float: left;
        width: 85%;
        .t1 {
          font-size: 16px;
          color: #333;
          margin-bottom: 0.3125rem;
          text-align: left;
        }
        .t2 {
          text-align: justify;
        }
      }
      i {
        background: #32cd32;
        height: 2.25rem;
        width: 2.25rem;
        border-radius: 1.125rem;
        color: #fff;
        text-align: center;
        line-height: 2.375rem;
        font-size: 18px;
      }
    }
    .vip1 {
      border-bottom: 0.0625rem solid #eeeeee;
    }
  }
}
</style>
