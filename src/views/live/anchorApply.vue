<!-- 主播申请 -->
<template>
  <div id="AnchorApply">
    <c-title :hide="false" text="主播申请"></c-title>
    <div class="banner">
      <img :src="bannerSrc">
    </div>
      <div class="main">
        <yd-cell-group class="store_apply">
          <yd-cell-item class="otherTitle">
            <span slot="left">申请信息</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left"
                  class="dd">姓名 <em>*</em></span>
            <input slot="right"
                   type="text"
                   placeholder="姓名"
                   v-model="realname" />
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号 <em>*</em></span>
            <input slot="right"
                   type="number"
                   placeholder="手机号"
                   v-model="mobile" />
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">所在城市 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click="addressShows = true"
                   v-model="addressName"
                   readonly
                   placeholder="请选择城市">
          </yd-cell-item>
          <yd-cell-item arrow v-if="strShow">
            <span slot="left">所在街道 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click.stop="streetShow = true"
                   v-model="street"
                   readonly
                   placeholder="请选择街道">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">详细地址 <em>*</em></span>
            <yd-input slot="right"
                      type="text"
                      class="dd"
                      v-model="address"
                      placeholder="街道楼排号等"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group class="store_apply">
          <yd-cell-item class="otherTitle">
            <span slot="left">备注信息</span>
          </yd-cell-item>
          <yd-cell-item style="padding-bottom:0.625rem;">
            <yd-textarea slot="right"
                         placeholder="填写备注信息"
                         maxlength="100"
                         v-model="applyModel"
                         style="background-color: #f8f8f8;border-radius: 0.469rem;padding:10px;"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <div style="display:flex;padding: 0 0.625rem;">
          <van-checkbox v-model="agreementChoose"
                        checked-color="#f15353"></van-checkbox>&nbsp;&nbsp;阅读并同意<i style="color:#ff5959;" @click="showAreement=true">《申请协议》</i>
        </div>
        <div class="submit" @click="submitApply">提交</div>
      </div>
    <!-- 街道地址 -->
    <yd-cityselect v-model="addressShows" :callback="addressCallback" :items="area"></yd-cityselect>
    <yd-popup v-model="streetShow"
              position="right"
              width="100%">
      <yd-navbar title="选择街道"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item :key='i'
                    arrow
                    v-for="(item,i) in districtVal"
                    @click.native="streetConfirm(item)">
        <span slot="left">{{item.areaname}}</span>
      </yd-cell-item>
    </yd-popup>
    <van-popup v-model="showAreement" round closeable :close-on-click-overlay="false">
      <div class="popupClass1">
        <div class="title">申请协议</div>
        <div class="text" v-html="agreement"></div>
      </div>
    </van-popup>
    <van-popup v-model="showPopup" round :close-on-click-overlay="false">
      <div class="popupClass">
        <img src="../../assets/images/addcheck.png" alt="">
        <h2>提交成功</h2>
        <h3>请等待管理员审核！</h3>
        <span class="btn" @click="gotoLiveHome">去直播首页逛逛</span>
      </div>
    </van-popup>
    <van-popup v-model="showVeriVfy" round :close-on-click-overlay="false">
      <div class="popupClass">
        <img src="../../assets/images/addcheck.png" alt="">
        <h2>审核通过</h2>
        <h3>恭喜您成为主播！</h3>
        <span class="btn" @click="gotoLiveHome">去直播首页逛逛</span>
      </div>
    </van-popup>
    <van-popup v-model="showDissatisfy" round :close-on-click-overlay="false">
      <div class="popupClass2">
        <img src="../../assets/images/material_close.png" alt="">
        <h2>申请条件不满足</h2>
        <h3>您不满足申请条件，不能申请成为主播！</h3>
        <div class="getCondition">
          <div class="warnTitle">获取申请资格</div>
          <div class="list" v-if="conditionss.agent">
            <div>成为推广员</div>
            <div class="DissatisfyBtn" @click="gotoGetCondition(1)">前往</div>
          </div>
          <div class="list" v-if="conditionss.store">
            <div>成为门店店主/店员</div>
            <div class="DissatisfyBtn" @click="gotoGetCondition(2)">前往</div>
          </div>
          <div class="list" v-if="conditionss.supplier">
            <div>成为供应商</div>
            <div class="DissatisfyBtn" @click="gotoGetCondition(3)">前往</div>
          </div>
          <div class="list" v-if="conditionss.hotel">
            <div>成为酒店</div>
            <div class="DissatisfyBtn" @click="gotoGetCondition(4)">前往</div>
          </div>
          <div class="warnTitle1">满足其中一种身份即可申请</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import anchorApply_Controller from "./anchorApply_Controller";
export default anchorApply_Controller;
</script>
<style lang="scss" rel="stylesheet/scss" >
#AnchorApply{
  padding: 40px 0;
  background: #ffffff;
  .banner{
    background: #ffffff;
   img {
      width: 94%;
      overflow: hidden;
      border-radius: 0.375rem;
      display: block;
      margin: 0 auto;
    }
  }
  .main {
    .submit{
      width: 20.594rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #ef3e3e;
      border-radius: 1.25rem;
      margin: 0.875rem auto 0;
      color: #ffffff;
    }
    .store_apply {
      background: #ffffff;
      .yd-cell-item {
        .yd-cell-left {
          span {
            font-weight: bold;
            color: #333;
          }
          em {
            color: #f86e6e;
            font-size: 18px;
          }
        }
        .yd-cell-right {
          justify-content: flex-end;
        }
        .yd-cell-right input {
          text-align: right;
          color: #333;
        }
        .yd-cell-right .addressDiv {
          width: 10rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 18px;
        }
      }
      .otherTitle {
        border: none;
        .yd-cell-left {
          flex: 1;
          span {
            color: #f86e6e;
            font-weight: bold;
            line-height: 0.875rem;
            font-size: 0.875rem;
            border-left: 0.2rem solid #f86e6e;
            padding-left: 0.5rem;
          }
        }
        .yd-cell-right {
          width: auto;
          flex: 0;
          span {
            width: 1.25rem;
            height: 1.25rem;
            border: 1px solid #f86e6e;
            border-radius: 100%;
            text-align: center;
            i {
              color: #f86e6e;
            }
          }
        }
      }
      .otherTitle::after {
        width: 0%;
      }
      h3 {
        background: #ffffff;
        color: #999;
      }
    }
    .btn {
      width: 100%;
      background: #f55955;
      color: #ffffff;
      height: 3rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      text-align: center;
      font-size: 16px;
      line-height: 3rem;
    }
    .apply {
      line-height: 2.75rem;
      margin: 0 0.75rem 0 0.75rem;
      display: flex;
      .text {
        font-size: 14px;
        .red {
          color: #f15353;
        }
      }
    }
    .otherphoto {
      .photobox {
        position: relative;
        width: 5rem;
        height: 5rem;
        border: 1px dashed #c0ccda;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
        i {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          background: url("../../assets/images/close_iocn.png");
          background-size: 100%;
        }
      }
    }
  }
  .popupClass,.popupClass2{
    width: 18rem;
    img {
      width: 3.469rem;
      height: 3.469rem;
      display: block;
      margin-top: 1.375rem;
    }
    h2{
      font-size: 1.5rem;
      font-weight: bold;
      color: #000;
      height: 3.594rem;
      line-height: 3.594rem;
    }
    h3{
      font-size: .875rem;
      color: #999999;
      font-weight: 400;
    }
    .btn{
      height: 2.835rem;
      line-height: 2.835rem;
      background: #fe8a02;
      font-size: 1.125rem;
      color: #ffffff;
      padding:0 1.25rem;
      border-radius: 1.375rem;
      display: inline-block;
      margin: 2.656rem auto 1.5rem;
    }
    .getCondition{
      border-top: 0.0625rem solid #e6e6e6;
      margin-top: 1rem;
      padding-top: 1rem;
      .warnTitle{
        color: #ef3e3e;
      }
      .warnTitle1{
        color: #b9b9b9;
        font-size: 0.75rem;
        text-align: left;
        padding: 0.875rem;
      }
      .list{
        display: flex;
        justify-content:space-between;
        padding: 0.875rem 1.25rem 0;
        .DissatisfyBtn{
          padding: 0 0.5rem;
          color: #ffffff;
          font-size: 0.75rem;
          height: 1.375rem;
          line-height: 1.375rem;
          background: #f49f19;
          border-radius: 0.75rem;
        }
      }
    }
  }
  .popupClass1{
    width: 20rem;
    padding: 0 1rem 1rem;
    .title{
      font-size: 1.125rem;
      color: #000000;
      font-weight: bold;
      height: 2.875rem;
      line-height: 2.875rem;
    }
    .text{
      max-height: 22rem;
      overflow: scroll;
      line-height: 1.5rem;
      font-size: 0.875rem;
    }
  }
}
</style>
