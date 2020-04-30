<template>
  <div id="payment">
    <c-title :hide="false" text="网约车订单"></c-title>
    <div style="height: 40px;"></div>
    <div style="height: 2.75rem;"></div>
    <mt-navbar
      v-model="selected"
      style="z-index:98;height:2.75rem;line-height:2.75rem;"
      fixed
    >
      <mt-tab-item id="0" @click.native="swichTabTItem">全部</mt-tab-item>
      <mt-tab-item id="1" @click.native="swichTabTItem"> 待支付</mt-tab-item>
      <mt-tab-item id="2" @click.native="swichTabTItem">待审核</mt-tab-item>
      <mt-tab-item id="3" @click.native="swichTabTItem"> 贷款中</mt-tab-item>
      <mt-tab-item id="4" @click.native="swichTabTItem">待提车</mt-tab-item>
      <mt-tab-item id="5" @click.native="swichTabTItem">待审牌</mt-tab-item>
      <mt-tab-item id="6" @click.native="swichTabTItem"> 已完成</mt-tab-item>
    </mt-navbar>
    <mt-loadmore
      v-if="goload"
      :top-method="loadTop"
      :topDistance="5"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      bottomPullText=""
      bottomDropText="上拉加载..."
      bottomLoadingText=""
      :autoFill="true"
      id="olis"
    >
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="orderList"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="0"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            v-on:MultiplePayNotification="multiplePayAction"
            :datasource="waitPayList"
            ref="mychild"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="1"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="waitSendList"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="2"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="waitReceiveList"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="3"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="waitCompleteList"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="4"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="waitRefund"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="5"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
        <mt-tab-container-item id="6">
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            :datasource="alreadyComplete"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="6"
            class="osll"
          ></cOrderList>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
    <div class="contes" v-if="isMultiplePay">
      <button @click="toMultiplePay">合并支付</button>
    </div>
  </div>
</template>
<script>
import orderListController from "./order_list_controller";
export default orderListController;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.osll {
  min-height: 100vh;
}
.contes {
  z-index: 98;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.8125rem;
  background: #fff;
  line-height: 2.8125rem;
  border-top: #e2e2e2 solid 0.0625rem;
  text-align: right;
  button {
    border: solid 0.0625rem #f15353;
    background: #f15353;
    border-radius: 0.1875rem;
    margin-right: 0.875rem;
    color: #fff;
    padding: 0.25rem 0.625rem;
  }
}
.loadNomore img {
  width: 20%;
}
#payment {
  .mint-navbar.is-fixed {
    top: 40px;
  }
}
</style>
