<template>
  <div id="address-add">
    <c-title :hide="false"
             :text="'新增提币地址'"></c-title>
    <div class="content">
      <div class="top">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">手机号：</span>
            <input slot="right"
                   type="number"
                   placeholder="请输入手机号"
                   readonly="readonly"
                   v-model="mobile">
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
                   placeholder="请输入验证码"
                   v-model="code">
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
          <yd-cell-item>
            <span slot="left">提币地址：</span>
            <input slot="right"
                   v-model="address"
                   type="text"
                   placeholder="请输入提币地址">
          </yd-cell-item>
          <div class="qr-code">
            <div>上传提币二维码:</div>
            <van-uploader class="up-photo"
                          :after-read="afterRead">
              <img src="../../../assets/images/up_icon.png"
                   v-if="fun.isTextEmpty(qr)"
                   class="up_icon">
              <img :src="qr"
                   v-if="!fun.isTextEmpty(qr)"
                   class="show">
            </van-uploader>
            <div>注:提币地址错误，将无法找回，请认真核对，不要填错了</div>
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
           @click="add">
        <span class="btn">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
import address_add_controller from "./address_add_controller";
export default address_add_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#address-add {
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
      .yd-cell-item:last-child {
        border-bottom: none;
      }
      .qr-code {
        text-align: left;
        padding: 1rem 0;
        color: #555;
        margin-left: 12px;
        border-bottom: solid 1px #ebebeb;
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
