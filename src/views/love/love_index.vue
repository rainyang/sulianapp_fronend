<template>
  <div id="love_index">
    <c-title :hide="false"
             :text="love_name"
             tolink="love_list"
             totext="查看明细"></c-title>
    <div style="height: 40px;"></div>
    <!-- 优化 -->
    <div class="content">
      <ul class="my_balance">
        <li class="balance_a">
          <i class="iconfont icon-wealth-b"></i><span>{{ love_name }}激活</span>
        </li>
        <li class="balance_b">{{ usable }}</li>
        <li class="balance_c">冻结{{ love_name }}{{ froze }}</li>
        <li class="balance_c"
            v-if="no_recharge > 0">
          待用{{ love_name }}{{ no_recharge }}
        </li>
      </ul>
      <ul class="list_box">
        <li v-if="recharge_status"
            @click="gotoPage('LoveRecharge')">
          <i class="iconfont icon-balance_b"></i>充值
          <i class="fa fa-angle-right"></i>
        </li>
        <li v-if="transfer_status"
            @click="makeTransfer">
          <i class="iconfont icon-balance_c"></i>转账
          <i class="fa fa-angle-right"></i>
        </li>
        <li v-if="withdraw_status"
            @click="gotoPage('loveWithdrawals')">
          <i class="iconfont icon-balance_a"></i>{{this.fun.initWithdrawal()}}
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
      <ul class="list_box_b">
        <li v-if="trading_status == 1"
            @click="gotoPage('love_trading_sell')">
          <i class="iconfont icon-balance_k"></i>{{ love_name }}出售
          <i class="fa fa-angle-right"></i>
        </li>
        <li v-if="trading_status == 1"
            @click="gotoPage('love_trading')">
          <i class="iconfont icon-balance_n"></i>交易中心
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
      <ul class="list_box_b">
        <li @click="gotoPage('love_record')">
          <i class="iconfont icon-balance_m"></i>激活记录
          <i class="fa fa-angle-right"></i>
        </li>
        <!--<li @click="gotoPage('lovePeriod')">-->
          <!--<i class="iconfont icon-rewards_record"></i>周期奖励记录-->
          <!--<i class="fa fa-angle-right"></i>-->
        <!--</li>-->
      </ul>
      <div class="explain">
        <i class="iconfont icon-balance_o"></i>
        <span @click="gotoPage('love_explain')">{{ love_name }}说明</span>
      </div>
    </div>
  </div>
</template>
<script>
import love_index_Controller from "./love_index_Controller";

export default love_index_Controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_index {
  .content {
    .my_balance {
      background: #fff;
      padding: 0.625rem 0;
      .balance_a {
        line-height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-wealth-b {
          background: url("../../assets/images/member/member_a(1).png")
            no-repeat center;
          background-size: 1.125rem;
          width: 1.125rem;
          height: 1.125rem;
          margin-right: 0.375rem;
        }
        .icon-wealth-b:before {
          content: "";
        }
        span {
          font-size: 14px;
        }
      }
      .balance_b {
        line-height: 3.75rem;
        font-size: 36px;
        small {
          font-size: 24px;
        }
      }
      .balance_c {
        font-size: 14px;
        color: #8c8c8c;
      }
    }
    .list_box,
    .list_box_b {
      background: #fff;
      padding-left: 0.875rem;
      border-top: solid 0.0625rem #ebebeb;
      border-bottom: solid 0.0625rem #ebebeb;
      li {
        border-bottom: solid 0.0625rem #ebebeb;
        padding-right: 0.875rem;
        display: flex;
        align-items: center;
        line-height: 2.875rem;
        font-size: 16px;
        position: relative;
        .icon-balance_a {
          color: #6cbf6a;
        }
        .icon-balance_b {
          color: #fac337;
        }
        .icon-balance_c {
          color: #069ce7;
        }
        .icon-balance_l {
          color: #ee4343;
        }
        .icon-balance_m {
          color: #418be0;
        }
        .icon-balance_n {
          color: #ff855c;
        }
        .iconfont {
          font-size: 2rem;
          margin-right: 0.375rem;
        }
        .fa {
          position: absolute;
          top: 0;
          right: 0.875rem;
          font-size: 1.5rem;
          color: #ccc;
          line-height: 2.875rem;
        }
      }
      li:last-child {
        border: none;
      }
    }
    .list_box_b {
      margin-top: 0.625rem;
    }
    .explain {
      width: 100%;
      position: fixed;
      display: flex;
      justify-content: center;
      bottom: 0.625rem;
      i {
        font-size: 1.125rem;
        color: #658299;
        margin-right: 0.375rem;
      }
      span {
        color: #658299;
        font-size: 13px;
      }
    }
  }

  button {
    height: 2.875rem;
    width: 90%;
    margin: 0.3125rem 0.9375rem;
  }
  i {
    font-size: 4.375rem;
    color: #f15353;
  }
  .my-banlance {
    margin: 1.25rem 0;
    font-size: 14px;
    color: #333;
    line-height: 2rem;
  }
  .my-banlance span {
    font-size: 14px;
    color: #333;
    margin-top: 0.625rem;
  }
  .my-banlance span b {
    font-size: 28px;
  }
  #djj {
    margin: 0.9375rem 0;
    font-size: 18px;
  }
  #dyj {
    margin: 0.9375rem 0;
    font-size: 18px;
    color: #f15353;
  }
  #jh {
    margin-bottom: 5rem;
    margin-top: 0.3125rem;
    #jhst {
      border-right: 0.0625rem solid #8c8c8c;
      padding-right: 0.9375rem;
    }
    span {
      padding: 0 0.9375rem;
    }
  }
  #helps {
    position: fixed;
    bottom: 0.625rem;
    left: 0;
    right: 0;
    a {
      color: #607d8b;
      font-size: 12px;
    }
    p {
      background: #f15353;
      color: #fff;
      border-radius: 50%;
      width: 1.25rem;
      height: 1.25rem;
      line-height: 1.25rem;
      margin: 0 auto;
      margin-bottom: 0.25rem;
    }
  }
  .transfer {
    display: inline-block;
    height: 2.875rem;
    width: 90%;
    margin: 0.3125rem 0.9375rem;
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66;
    border-radius: 4px;
    span {
      line-height: 2.875rem;
    }
  }
}
</style>
