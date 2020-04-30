<template>
  <div id="revise-address">
    <c-title :hide="false"
             :text="'修改提币地址'"></c-title>
    <div class="content">
      <div class="top">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">手机号：</span>
            <input slot="right"
                   type="number"
                   readonly="readonly"
                   v-model="mobile"
                   placeholder="请输入手机号">
          </yd-cell-item>
          <yd-cell-item v-if="imgCode">
            <input type="text"
                   slot="left"
                   class="imgInput"
                   placeholder="请输入图形验证码"
                   v-model="captcha">
            <img :src="imgCode"
                 @click="changeImg"
                 slot="right">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">验证码：</span>
            <input slot="right"
                   type="number"
                   v-model="code"
                   placeholder="请输入验证码">
            <yd-sendcode slot="right"
                         v-model="start"
                         @click.native="sendCode"
                         second="60"
                         type="warning"></yd-sendcode>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div class="bottom">
        <yd-cell-group>
          <div class="origin">
            <div>原提币地址：</div>
            <div class="text">{{oldAddress}}</div>
          </div>
          <div class="new">
            <div>新提币地址：</div>
            <input type="text"
                   placeholder="请输入新的提币地址"
                   v-model="newAddress">
          </div>
          <div class="new">
            <div>原提币二维码(可修改)：</div>
            <van-uploader class="up-photo"
                          :after-read="afterRead">
              <img :src="qr"
                   v-if="!fun.isTextEmpty(qr)"
                   class="show">
            </van-uploader>
          </div>
          <yd-cell-item>
            <span slot="left">设置默认地址：</span>
            <span slot="right">
              <mt-switch v-model="is_default"></mt-switch>
            </span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div class="confirm"
           @click="revise">
        <span class="btn">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
import revise_address_controller from "./revise_address_controller";
export default revise_address_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#revise-address {
  padding-top: 40px;
  .content {
    .yd-cell-item {
      padding-left: 0;
      margin-left: 12px;
      border-bottom: solid 1px #ebebeb;
      .yd-cell-left {
        .imgInput {
          outline: none;
          border: none;
        }
      }
      .yd-cell-right {
        img {
          margin: 0;
        }
      }
    }
    .top {
      .yd-btn-warning {
        background-color: #f15353;
        border-radius: 4px;
      }
      .yd-cell-item:last-child {
        border-bottom: none;
      }
    }
    .bottom {
      margin-top: 1rem;
      .origin {
        text-align: left;
        padding: 10px 0;
        margin-left: 12px;
        border-bottom: solid 1px #ebebeb;
        font-size: 14px;
        .text {
          margin-top: 5px;
          word-break: break-word;
        }
      }
      .new {
        text-align: left;
        padding: 10px 0;
        margin-left: 12px;
        border-bottom: solid 1px #ebebeb;
        font-size: 14px;
        input {
          outline: none;
          margin-top: 5px;
          width: 100%;
          border: none;
        }
        .up-photo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 6rem;
          height: 6rem;
          overflow: hidden;
          margin: 0 auto;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          border: dashed 1px #ccc;
          border-radius: 0.125rem;
          position: relative;
          .up_icon {
            width: 2rem;
            height: 2rem;
          }
          .show {
            width: 100%;
            height: 100%;
          }
        }
      }
      .yd-cell-item:last-child {
        border-bottom: none;
      }
    }
    .confirm {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .btn {
        border-radius: 0.5rem;
        width: 90%;
        height: 40px;
        font-size: 16px;
        text-align: center;
        color: #fff;
        background-color: #f15353;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
