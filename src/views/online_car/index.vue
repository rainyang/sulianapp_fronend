<template>
  <div id="online_car">
    <c-title :hide="false"
             tolink="CarBonus"
             :setParams="{id: this.userType||'3'}"
             :text="headTitles"
             totext="分红明细"></c-title>
    <div id="content">
      <div class="income_info">
        <p class="info_a">昨日收益(元)</p>
        <p class="info_b">{{dataInfo.yesterday_earnings}}</p>
        <p class="info_c">总投资{{showMoney?dataInfo.total_amount:' **** '}}元
          <i class="iconfont icon-onlineCar_f"
             v-if="showMoney"
             @click.stop.prevent="isLook"></i>
          <i class="iconfont icon-onlineCar_g"
             v-if="!showMoney"
             @click.stop.prevent="isLook"></i>
        </p>
        <ul class="info_box">
          <li>
            <span>累计收益(元)</span><br />
            <span>{{dataInfo.cumulative_earnings }}</span>
          </li>
          <li>
            <span>总公里数(里)</span><br />
            <span>{{dataInfo.total_kilometer}}</span>
          </li>
          <li>
            <span>总订单(笔)</span><br />
            <span>{{dataInfo.total_order_num}}</span>
          </li>
        </ul>
      </div>
      <div class="manage_box">
        <!-- 会员端 -->
        <div class="member_manage"
             v-if="this.userType == '3'">
          <ul class="manage_title">
            <li>
              <h1>会员管理</h1>
            </li>
          </ul>
          <ul class="manage_item">
            <li @click.prevent="switchType(1)">
              <i class="iconfont icon-onlineCar_e"></i>
              <span>投资人版</span>
            </li>
            <li @click.prevent="switchType(2)">
              <i class="iconfont icon-onlineCar_d"></i>
              <span>司机版</span>
            </li>
            <router-link :to="this.fun.getUrl('myRelationship')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_c"></i>
              <span>下级会员</span>
            </router-link>
            <router-link :to="this.fun.getUrl('withdrawal')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_b"></i>
              <span>收益{{this.fun.initWithdrawal()}}</span>
            </router-link>
          </ul>
        </div>
        <!-- 司机端 -->
        <div class="member_manage"
             v-if="this.userType == '2'">
          <ul class="manage_title">
            <li>
              <h1>司机端</h1>
            </li>
          </ul>
          <ul class="manage_item">
            <router-link :to="this.fun.getUrl('CarSign',{id: 2})"
                         tag='li'>
              <i class="iconfont icon-onlineCar_a"></i>
              <span>签约汽车</span>
            </router-link>
            <router-link :to="this.fun.getUrl('cityManager')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_i"></i>
              <span>城市经理人</span>
            </router-link>
            <router-link :to="this.fun.getUrl('teamMember')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_j"></i>
              <span>车队成员</span>
            </router-link>
            <router-link :to="this.fun.getUrl('withdrawal')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_b"></i>
              <span>收益{{this.fun.initWithdrawal()}}</span>
            </router-link>
          </ul>
        </div>
        <!-- 投资人端 -->
        <div class="member_manage"
             v-if="this.userType == '1'">
          <ul class="manage_title">
            <li>
              <h1>投资人端</h1>
            </li>
          </ul>
          <ul class="manage_item">
            <router-link :to="this.fun.getUrl('CarSign',{id: 1})"
                         tag='li'>
              <i class="iconfont icon-onlineCar_a"></i>
              <span>签约汽车</span>
            </router-link>
            <router-link :to="this.fun.getUrl('cityManager')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_i"></i>
              <span>城市经理人</span>
            </router-link>
            <router-link :to="this.fun.getUrl('teamMember')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_j"></i>
              <span>车队成员</span>
            </router-link>
            <router-link :to="this.fun.getUrl('withdrawal')"
                         tag='li'>
              <i class="iconfont icon-onlineCar_b"></i>
              <span>收益{{this.fun.initWithdrawal()}}</span>
            </router-link>
          </ul>
        </div>
        <div class="net_manage">
          <ul class="manage_title">
            <li>
              <h1>优选网约车</h1>
              <a :href="dataInfo.jump_url">
                <span>
                  去商城看看<i class="fa fa-angle-right"></i>
                </span>
              </a>
            </li>
          </ul>
          <ul class="manage_item">
            <li class="item_income">{{dataInfo.highest_investor_dividend}}元</li>
            <li class="item_type">
              <span>“网红”网约车</span>
              <span>收益高&nbsp;&nbsp;&nbsp;低风险</span>
            </li>
          </ul>
        </div>
        <div class="driver_manage">
          <ul class="manage_title">
            <li>
              <h1>优选司机</h1>
              <span @click.stop="driverApply()">
                申请加入<i class="fa fa-angle-right"></i>
              </span>
            </li>
          </ul>
          <ul class="manage_item">
            <li class="item_income">{{dataInfo.highest_driver_dividend}}元</li>
            <li class="item_type">
              <span>“网红”优选司机</span>
              <span>收益高&nbsp;&nbsp;&nbsp;低风险</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import controller from "./index_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$color: #4e91ec;
@mixin member_manage {
  width: 21.5625rem;
  padding-bottom: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
@mixin member_title {
  padding: 0 0.625rem;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 0.0625rem #ebebeb;
    line-height: 2.5rem;
    h1 {
      font-size: 16px;
    }
    span {
      color: #ccc;
      i {
        font-size: 1rem;
        color: #c9c9c9;
        margin-left: 0.375rem;
      }
    }
  }
}
#online_car {
  padding-top: 40px;
  #content {
    .income_info {
      background: $color;
      color: #fff;
      padding-bottom: 1.875rem;
      padding-top: 1.25rem;
      .info_a {
        font-size: 14px;
        line-height: 1.5rem;
        opacity: 0.6;
      }
      .info_b {
        font-size: 36px;
      }
      .info_c {
        font-size: 14px;
        line-height: 1.5rem;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        .iconfont {
          margin-left: 10px;
          font-size: 20px;
          margin-left: 0.625rem;
        }
      }
      .info_box {
        display: flex;
        justify-content: space-around;
        margin-top: 1.25rem;
        li {
          line-height: 1.625rem;
          span:first-child {
            font-size: 14px;
            opacity: 0.6;
          }
          span:last-child {
            font-size: 18px;
          }
        }
      }
    }
    .manage_box {
      position: relative;
      top: -1.25rem;
      .member_manage {
        margin: 0 auto;
        @include member_manage;
        .manage_title {
          @include member_title;
        }
        .manage_item {
          display: flex;
          justify-content: space-between;
          padding: 0 0.625rem;
          margin-top: 1rem;
          li {
            i {
              font-size: 2.5rem;
              display: block;
              color: #ed743b;
            }
            span {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
      .net_manage,
      .driver_manage {
        margin: 0.625rem auto;
        @include member_manage;
        .manage_title {
          @include member_title;
        }
        .manage_item {
          display: flex;
          padding: 0 0.625rem;
          margin-top: 1rem;
          justify-content: flex-start;
          .item_income {
            color: #ed743b;
            font-size: 22px;
          }
          .item_type {
            margin-left: 2.5rem;
            span:first-child {
              font-size: 16px;
              font-weight: bold;
              display: block;
              line-height: 1.75rem;
            }
            span:last-child {
              font-size: 14px;
              color: #8c8c8c;
              display: block;
              line-height: 1.75rem;
            }
          }
        }
      }
    }
  }
}
</style>
