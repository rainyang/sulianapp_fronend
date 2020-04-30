<template>
  <div id="all">
    <div id="member">
      <c-title :hide="false"
               text="统计结算"></c-title>
      <div style="width:100%;height:40px;"></div>
      <div class="header">
        <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
        <div class="user">
          <div class="user-head">
            <img :src="store.thumb" />
          </div>
          <ul data-v-21e0c5a4=""
              class="cashier-name"
              style="">
            <li>{{ store.name }}</li>
            <li v-if="this.is_distribution"><span>{{store.full_address}}</span></li>
          </ul>

          <div class="clearfix"></div>
        </div>
      </div>

      <div class="data-btn">
        <yd-button-group>
          <yd-button size="large"
                     @click.native="getStat(1)">查看今日数据</yd-button>
        </yd-button-group>
      </div>
      <!-- 收银台 统计结算 -->
      <div class="cart"
           v-if="!this.is_distribution">
        <!--<router-link to="/member/marketing">
                                <div class="list1" ><div class="ico marketing"></div>
                                    营销工具
                                    <i class="fa fa-angle-right" ></i></div>
                            </router-link>-->
        <!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
        <div class="listStat">
          <div class="ico extension"></div>
          累计订单金额
          <i class="statRight">￥{{ stat.order_price }}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          应收款金额
          <i class="statRight">￥{{ stat.receivable_price }}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          <!--{{is_hotel?"已结算金额":"已提现金额"}}-->
          已结算金额
          <i class="statRight">￥{{ stat.finish_withdraw }}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          未结算金额
          <i class="statRight">￥{{ stat.not_withdraw }}</i>
        </div>

        <div class="listStat">
          <div class="ico extension"></div>
          奖励会员积分数量
          <i class="statRight">{{ stat.remard_buyer_point }}</i>
        </div>
        <div class="listStat"
             v-if="stat.is_open_love">
          <div class="ico extension"></div>
          奖励会员{{ stat.love_name }}数量
          <i class="statRight">{{ stat.remard_buyer_love }}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          奖励商家积分数量
          <i class="statRight">{{ stat.remard_store_point }}</i>
        </div>
        <div class="listStat"
             v-if="stat.is_open_love">
          <div class="ico extension"></div>
          奖励商家{{ stat.love_name }}数量
          <i class="statRight">{{ stat.remard_store_love }}</i>
        </div>
        <div class="listStat"
             v-if="!is_hotel">
          <div class="ico extension"></div>
          奖励会员优惠券数量
          <i class="statRight">{{ stat.remard_buyer_coupon }}</i>
        </div>
        <div class="listStat"
             v-if="!is_hotel">
          <div class="ico extension"></div>
          积分抵扣
          <i class="statRight">￥{{ stat.deduct_point }}</i>
        </div>
        <div class="listStat"
             v-if="stat.is_open_love && !is_hotel">
          <div class="ico extension"></div>
          {{ stat.love_name }}抵扣
          <i class="statRight">￥{{ stat.deduct_love }}</i>
        </div>
        <div class="listStat"
             v-if="!is_hotel">
          <div class="ico extension"></div>
          优惠券抵扣
          <i class="statRight">￥{{ stat.deduct_coupon }}</i>
        </div>
      </div>
      <!-- 配送站 统计结算 -->
      <div class="cart"
           v-if="this.is_distribution">
        <div class="listStat">
          <div class="ico extension"></div>
          累计配送订单金额
          <i class="statRight">￥{{store.order_price}}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          累计配送订单数
          <i class="statRight">{{store.order_num}}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          累计服务津贴
          <i class="statRight">￥{{store.grand_total_amount}}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          已{{this.fun.initWithdrawal()}}服务津贴
          <i class="statRight">￥{{store.available_total_amount}}</i>
        </div>
        <div class="listStat">
          <div class="ico extension"></div>
          未结算服务津贴
          <i class="statRight">￥{{store.wait_amount}}</i>
        </div>
      </div>
      <div style="height: 20px;clear: both;"></div>
      <!-- <mt-button
        type="primary"
        size="large"
        @click="outInfo($event)"
        v-if="myType == 5"
        >退出登录</mt-button
      > -->

      <div style="height: 60px;clear: both;"></div>
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
import stat from "./stat_controller";
export default stat;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cashier.scss";
.clearfix {
  clear: both;
}
#member {
  .header {
    .cashier-name {
      li {
        display: flex;
        span {
          font-size: 12px;
          line-height: 1.25rem;
          display: block;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.125rem 0.5rem;
          border-radius: 0.625rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
