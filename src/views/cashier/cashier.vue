<template>
  <div id="all">
    <div id="member">
      <c-title :hide="false"
               :text="title"></c-title>
      <div style="width:100%;height:40px;"></div>
      <div class="header">
        <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
        <div class="user">
          <div class="user-head">
            <img :src="store.thumb" />
          </div>
          <div data-v-21e0c5a4=""
               class="cashier-name"
               style="">
            {{ store.name }}
          </div>
          <div class="user-info">
            <router-link :to="fun.getUrl('withdrawal')">
              <div class="user-name">
                <div class="b-tixian">{{this.fun.initWithdrawal()}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div id="userinfo">
        <ul>
          <li>
            <span>￥{{ income.money_total }}</span>
            <br />累计实收金额
          </li>

          <li>
            <span>￥{{ income.sure_withdraw_money }}</span>
            <br />可{{this.fun.initWithdrawal()}}金额
          </li>
        </ul>
      </div>

      <div class="cart">
        <!--<router-link to="/member/marketing">
                    <div class="list1" ><div class="ico marketing"></div>
                        营销工具
                        <i class="fa fa-angle-right" ></i></div>
                </router-link>-->
        <!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->

        <div class="list1"
             style="border:none"
             @click="toPage('cashier_qr')">
          <yd-icon class="iconfont icon-member-receipt-code1"
                   custom
                   size="1.625rem"
                   color="#f15353"
                   style="margin-right:0.375rem;"></yd-icon>
          <span>收款二维码</span>
          <i class="fa fa-angle-right"></i>
        </div>

        <div class="list1"
             @click="toPage('cashierOrderlist')">
          <yd-icon class="iconfont icon-member-order4"
                   custom
                   size="1.625rem"
                   color="#f15353"
                   style="margin-right:0.375rem;"></yd-icon>
          <span>我的订单</span>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="list1"
             @click="toPage('presentationRecord',{from: 'store_cashier'})">
          <yd-icon class="iconfont icon-member-withdrawals1"
                   custom
                   size="1.625rem"
                   color="#f15353"
                   style="margin-right:0.375rem;"></yd-icon>
          <span>我的提成</span>
          <i class="fa fa-angle-right"></i>
        </div>

        <div class="list1"
             @click="toPage('cashier_stat')">
          <yd-icon class="iconfont icon-member-manage1"
                   custom
                   size="1.625rem"
                   color="#f15353"
                   style="margin-right:0.375rem;"></yd-icon>
          <span>统计结算</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div style="height: 2.5rem;clear: both;"></div>
      <mt-button type="primary"
                 size="large"
                 @click="outInfo($event)"
                 v-if="myType == 5">退出登录</mt-button>

      <div style="height: 3.75rem;clear: both;"></div>
    </div>
    <div id="ewm"
         ref="hook"
         @click="openQrCode('none')">
      <div class="pic">
        <img :src="poster"
             alt="" />
      </div>
    </div>
    <div id="jpg"></div>
  </div>
</template>

<script>
import cashier from "./cashier_controller";

export default cashier;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cashier.scss";

.clearfix {
  clear: both;
}
</style>
