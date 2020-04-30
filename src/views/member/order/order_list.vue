<template>
  <div id="payment">
    <c-title :hide="false" text="我的订单"></c-title>
    <div style="height: 40px;"></div>
    <div style="height: 2.75rem;"></div>
    <mt-navbar
      v-model="selected"
      style="z-index:98;height:2.75rem;line-height:2.75rem;"
      fixed
    >
      <!--
      mt-tab-item：导航栏列表,通过判断orderType设置不同的setNavList，setNavList为vue计算属性返回
      -->
      <!-- 绑定一个子组件调用的事件 -->
      <mt-tab-item
        v-for="(item, index) in setNavList"
        :key="index"
        :id="index.toString()"
        @click.native="swichTabTItem()"
        >{{ item }}</mt-tab-item
      >
    </mt-navbar>
    <mt-loadmore
      :top-method="loadTop"
      ref="loadmore"
      topDropText="释放刷新"
      id="olis"
    >
      <mt-tab-container v-model="selected">
        <mt-tab-container-item
          v-for="(items, key, indexs) in dataList"
          :key="indexs"
          :id="indexs.toString()"
        >
          <cOrderList
            v-on:ConfrimOrderNotification="cofirmOrderAction"
            v-on:ToDetailNotification="toDetail"
            v-on:MultiplePayNotification="multiplePayAction"
            ref="mychild"
            :datasource="items"
            :orderType="orderType"
            :detailUrl="detailUrl"
            :status="indexs.toString()"
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
import orderListController from "./order_listController";
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
