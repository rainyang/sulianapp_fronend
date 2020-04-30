<template>
  <div id="register">
    <div style="position: relative">
      <c-title :hide="false" text="用户注册"></c-title>
      <div style="height:40px;"></div>
      <img
          style="width:20%;height:40px;position:absolute;display:block;left:74%;z-index:999"
          :style="{top:country_code==1?'8rem':'5.5rem'}"
          :src="imgcode"
          @click="getimgdata"
          v-if="imgcode"
      />
    </div>
    <!-- 新页面 -->
    <div id="content">
      <ul class="area_number">
        <li v-if="country_code == 1">
          <div class="must">*</div>
          <span>国家区号</span>
          <!-- <input type="number" placeholder="86" v-model.trim="form.country" /> -->
          <yd-input
            slot="right"
            v-model.trim="form.country"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            regex="mobile"
            placeholder="+86"
          ></yd-input>
        </li>
      </ul>

      <ul class="login_info">
        <li v-if="imgcode">
          <div class="must">*</div>
          <yd-input
            slot="right"
            v-model.trim="form.captcha"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入右侧图形验证码"
          ></yd-input>
          <!-- <input
            type="text"
            placeholder="请输入右侧图形验证码"
            v-model.trim="form.captcha"
          /> -->
        </li>
        <li>
          <div class="must">*</div>
          <yd-input
            slot="right"
            v-model.trim="form.mobile"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            regex="mobile"
            placeholder="请输入手机号码"
          ></yd-input>
          <!-- <input
            type="text"
            placeholder="请输入手机号"
            v-model.trim="form.mobile"
          /> -->
        </li>
        <li class="code">
          <div class="must">*</div>
          <yd-input
            slot="right"
            v-model.trim="form.code"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            regex="mobile"
            placeholder="请输入验证码"
          ></yd-input>
          <!-- <input
            type="text"
            placeholder="请输入验证码"
            v-model.trim="form.code"
          /> -->
          <!-- 获取验证码-->
          <yd-sendcode
            slot="right"
            v-model="start1"
            @click.native="verificationCode"
            type="warning"
          ></yd-sendcode>
        </li>
        <li class="invitCode" v-if="invite">
          <div class="must" v-if="isrequired">*</div>
          <yd-input
            slot="right"
            v-model.trim="form.invite_code"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入邀请码"
          ></yd-input>
          <!-- <input
              type="text"
              placeholder="请输入邀请码"
              v-model.trim="form.invite_code"
            /> -->
        </li>
        <li>
          <div class="must">*</div>
          <yd-input
            slot="right"
            type="password"
            v-model.trim="form.password"
            placeholder="设置密码"
          ></yd-input>
          <!-- <input
            type="password"
            placeholder="设置密码"
            v-model.trim="form.password"
          /> -->
        </li>
        <li>
          <div class="must">*</div>
          <yd-input
            slot="right"
            type="password"
            v-model.trim="form.confirm_password"
            placeholder="确认密码"
          ></yd-input>
          <!-- <input
            type="password"
            placeholder="确认密码"
            v-model.trim="form.confirm_password"
          /> -->
        </li>
      </ul>
      <div class="diyform">
        <template v-for="item in diydata">
          <template v-if="item.type == 'diyinput'">
            <!-- v-if="item.type == 'diyinput'" -->
            <yd-cell-group>
              <yd-cell-item>
                <!-- <span slot="left">{{item.data.tp_name}}：</span> -->
                <yd-input
                  v-if="item.data.tp_must == 1"
                  slot="right"
                  required
                  v-model="item.value"
                  :placeholder="item.data.placeholder || '请填写'"
                ></yd-input>
                <yd-input
                  v-if="item.data.tp_must == 0"
                  slot="right"
                  v-model="item.value"
                  :placeholder="item.data.placeholder || '请填写'"
                ></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diytextarea'">
            <!-- v-if="item.type == 'diytextarea'" -->
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item>
                <yd-textarea
                  slot="right"
                  v-model="item.value"
                  :placeholder="item.data.placeholder"
                  maxlength="100"
                ></yd-textarea>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycheckbox'">
            <!-- v-if="item.type == 'diycheckbox'" -->
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="checkbox" v-for="(ck,i) in item.data.tp_text" :key='i'>
                 <span slot="left">{{ck}}</span>
                <input
                  slot="right"
                  type="checkbox"
                  :value="ck"
                  v-model="item.value"
                />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyselect'">
            <yd-cell-group>
              <yd-cell-item arrow type="label">
                <select slot="right" v-model="item.value">
                  <option value="">请选择{{ item.data.tp_name }}</option>
                  <option :value="sitem" v-for="(sitem,i) in item.data.tp_text" :key='i'>{{
                    sitem
                  }}</option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyradio'">
            <!-- v-if="item.type == 'diyradio'" -->
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="radio" v-for="(ritem,i) in item.data.tp_text" :key='i'>
                <span slot="left">{{ ritem }}</span>
                <input
                  slot="right"
                  type="radio"
                  :value="ritem"
                  v-model="item.value"
                />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycity'">
            <div>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <input
                    slot="right"
                    type="text"
                    @click.stop="showCity = true"
                    @click="openCity(item.name)"
                    v-model="item.value"
                    readonly
                    :placeholder="item.data.tp_name"
                  />
                </yd-cell-item>
              </yd-cell-group>
            </div>
          </template>

          <template v-if="item.type == 'diydate'">
            <yd-cell-group>
              <yd-cell-item @click.native="openPicker(item.name)">
                <span slot="right">{{ item.value }}</span>
              </yd-cell-item>
            </yd-cell-group>
          </template>
        </template>
      </div>

      <div style="color: #999999;text-align: left;margin-left: 1.5rem;" v-if="fun.isApp()">
        注册即代表您同意<router-link style="color: #3b73ef" :to="fun.getUrl('userAgreement',{},{show: 'agreement'})">《用户协议》</router-link>
        和
        <router-link style="color: #3b73ef" :to="fun.getUrl('userAgreement',{},{show: 'privacy'})">《隐私政策》</router-link>
      </div>

      <template>
        <div class="agreement" v-if="agreementStatus">
          <van-checkbox
            checked-color="#f15353"
            shape="square"
            v-model="agreementCB"
          >
          </van-checkbox>

          <span
            slot="right"
            style="font-size: 16px; text-decoration:underline;"
            @click="goAgreement"
          >
            注册协议</span
          >
        </div>
      </template>

      <div class="btn">
        <button type="button" @click="register">注册</button>
      </div>

      <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setDate"
        v-model="pickerValue"
      >
      </mt-datetime-picker>

      <yd-cityselect
        v-model="showCity"
        :callback="setCity"
        :items="district"
      ></yd-cityselect>

      <mt-popup
        v-model="show2"
        class="mint-popup-3"
        position="right"
        closeOnClickModal="true"
        modal="false"
        style="z-index:2004;"
      >
        <div class="city-info">
          <mt-header fixed title="协议">
            <mt-button icon="back" @click="popClose" slot="left"></mt-button>
          </mt-header>
          <div>
            <div style="height: 2.5rem;clear: both;"></div>

            <div id="a_content" v-html="protocol_content"></div>
          </div>
        </div>
      </mt-popup>

      <div style="height: 2.5rem;clear: both;"></div>
    </div>
  </div>
</template>

<script>
import register_v2_controller from "./register_v2_controller";
export default register_v2_controller;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
  .must {
    color: #f15353;
    align-self: center;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  #agreement {
    height: 2.25rem;
    line-height: 2.25rem;
    .span {
      text-align: center;
      font-size: 20px;
    }
  }
  .city-info {
    overflow-y: scroll;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
  .mint-header {
    background: none;
    color: #666;
  }

  .is-fixed .mint-header-title {
    font-weight: bold;
  }

  .mint-header.is-fixed {
    border-bottom: 0.0625rem solid #e8e8e8;
    background: #fff;
    z-index: 99;
  }
  #lin {
    margin-bottom: 1.25rem;
  }
  width: 100%;
  #code {
    background: #ccc;
    padding: 0.1875rem 0.3125rem;
    border-radius: 0.1875rem;
  }
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 0.625rem;
  }
  #bts {
    margin: auto 0.3125rem;
    .mint-button--default {
      background-color: #13ce66;
      color: #fff;
    }
  }
  .forget {
    color: #999;
    float: right;
  }
  // 新css
  #content {
    background-color: #fff;
    /*height: 39.1875rem;*/
    .area_number {
      padding-top: 1.25rem;
      font-size: 18px;
      color: #333;
      margin-bottom: 1.875rem;
      li {
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 1.25rem;
        display: flex;
        justify-content: space-between;
        span {
          width: 5.75rem;
          text-align: left;
        }
        .yd-input {
          border: none;
          border-bottom: solid 0.0625rem #ccc;
          width: 15rem;
        }
      }
    }
    .login_info {
      li {
        margin: 1.25rem auto 0 auto;
        width: 20.625rem;
        display: flex;
        font-size: 16px;
        height: 2.5rem;
        line-height: 2.5rem;
        /*border-bottom: solid 0.0625rem #ccc;*/
        position: relative;
        input {
          width: 14.625rem;
          border: none;
        }
        span {
          font-size: 14px;
          position: absolute;
          right: 0;
          color: #333;
        }
        .img {
          width: 2.5rem;
          overflow: hidden;
          img {
            margin-top: 26%;
            width: 48%;
          }
        }
      }
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
    }
    .agreement {
      margin-top: 0.625rem;
      height: 2.25rem;
      line-height: 2.25rem;
      text-align: left;
      padding: 0 1.25rem;
      display: flex;
      .span {
        text-align: center;
        font-size: 20px;
        margin-left: 0.375rem;
        display: block;
      }
    }
    .btn {
      margin-top: 2.5rem;
      button {
        width: 20.625rem;
        height: 2.8125rem;
        font-size: 16px;
        margin-bottom: 1.25rem;
        border-radius: 1.875rem;
        border: none;
        background-color: #f15353;
        color: #fff;
      }
    }
  }
}
</style>
