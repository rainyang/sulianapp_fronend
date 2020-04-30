<template>
  <div id="new_award_detail">
    <c-title :hide="false"
             :text="'分红详情'"></c-title>
    <div id="content">
      <ul class="price">
        <li>{{rewardDetail.reward_money}}<span>元</span></li>
      </ul>
      <ul class="list-info">
        <li>
          <span>类型</span>
          <span>{{rewardDetail.reward_name}}</span>
        </li>
        <li>
          <span>分红时间</span>
          <span>{{rewardDetail.created_at}}</span>
        </li>
        <li v-if="rewardDetail.reward_money">
          <span>奖励来源</span>
          <span>{{rewardDetail.new_user}}</span>
        </li>
        <li>
          <span>状态</span>
          <span>{{rewardDetail.status}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import new_award_detail_controller from "./new_award_detail_controller";
export default new_award_detail_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#new_award_detail {
  padding-top: 40px;
  #content {
    background-color: #fff;
    .price {
      line-height: 4.5rem;
      font-size: 32px;
      font-weight: bold;
      span {
        font-size: 16px;
      }
    }
    .list-info {
      padding: 0.625rem 0.875rem;
      li {
        display: flex;
        justify-content: space-between;
        line-height: 2.25rem;
        font-size: 15px;
        span:first-child {
          color: #8c8c8c;
        }
      }
      li:last-child {
        span:last-child {
          color: #00b566;
        }
      }
    }
  }
}
</style>