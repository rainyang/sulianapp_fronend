<template>
  <div id="details">
    <c-title :hide="false" text="详情"></c-title>
    <div style="height: 40px;"></div>
    <div id="tbs">
      <div class="left">订单编号</div>
      <div class="right">{{ item.serial_number }}</div>
      <div class="left">金额</div>
      <div class="right">{{ item.change_money }}</div>
      <div class="left">业务类型</div>
      <div class="right">{{ item.service_type_name }}</div>
      <div class="left">{{ balanceLang }}</div>
      <div class="right">{{ item.new_money }}</div>
    </div>
  </div>
</template>
<script>
import member_balance_detailscontroller from "./member_balance_detailscontroller";
export default member_balance_detailscontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#details {
  #tbs {
    display: flex;
    align-items: center;
    background: #fff;
    flex-flow: row wrap;
    padding: 0.625rem 0.875rem;
    line-height: 1.875rem;
    font-size: 12px;
    .left {
      text-align: left;
      flex: 50%;
      color: #8c8c8c;
    }
    .right {
      text-align: right;
      flex: 50%;
    }
  }
}
</style>
