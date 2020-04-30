<template>
  <div id="bonus_list">
    <c-title :hide="false" text="分红明细"></c-title>
    <div id="content">
      <ul class="sum_bonus">
        <li>
          <span>累计金额</span>
          <span v-if="amount.length>0">{{amount}}元</span>
        </li>
      </ul>
      <mt-loadmore :top-method="loadTop" ref="bonus_loadmore" id="olis" v-if="!isShowNoTest">
        <div class="bonus_list">
          <ul class="list_box">
            <li class="info_box" v-for="(item,index,key) in bonus" :key="key">
              <div class="info_a">
                <span>{{item.number_plate}}</span>
                <span>¥{{item.dividend_amount}}</span>
              </div>
              <div class="info_b">
                <span>{{item.created_at}}</span>
                <span>{{item.status_name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </mt-loadmore>
      <h2 v-if="isShowNoTest" class="isShowNoTest">暂无数据</h2>
    </div>
  </div>
</template>
<script>
import controller from "./bonus_list_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#bonus_list {
  padding-top: 40px;
  #content {
    .sum_bonus {
      background: #ed743b;
      padding: 0.625rem 0.875rem;
      li {
        display: flex;
        justify-content: space-between;
        line-height: 2.5rem;
        font-size: 16px;
        color: #fff;
      }
    }
    .bonus_list {
      h1 {
        line-height: 1.875rem;
        text-align: left;
        font-size: 16px;
        padding: 0 0.875rem;
        color: #666;
      }
      .list_box {
        background: #fff;
        padding-left: 0.875rem;
        border-bottom: solid 0.0625rem #ebebeb;
        border-top: solid 0.0625rem #ebebeb;
        .info_box {
          padding: 0.625rem 0;
          padding-right: 0.875rem;
          border-bottom: solid 0.0625rem #ebebeb;
          .info_a {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            span {
              font-size: 16px;
            }
            span:last-child {
              color: #ed743b;
            }
          }
          .info_b {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            span:first-child {
              color: #8c8c8c;
              font-size: 14px;
            }
            span:last-child {
              font-size: 15px;
            }
          }
        }
        .info_box:last-child {
          border: none;
        }
      }
    }
    .isShowNoTest{
      color:#666;
      padding:10px;
    }
  }
}
</style>
