<template>
  <div id="global_dividend">
    <c-title :hide="false" :text="memberData.plugin_name || '分红'"></c-title>
    <div class="header_box">
      <div class="header">
        <img :src="memberData.avatar" />
      </div>
      <ul class="name">
        <li>{{ memberData.member_name }}</li>
        <li class="name_b">{{ memberData.level_name }}</li>
      </ul>
      <ul class="right_sum">
        <li><span>¥</span>{{ memberData.total_dividend || 0 }}</li>
        <li>累计分红</li>
      </ul>
    </div>
    <ul class="info">
      <li>
        <span>{{ memberData.integral || 0 }}</span>
        <span>累计获得权益</span>
      </li>
      <li>
        <span>{{ memberData.return_integral || 0 }}</span>
        <span>已返还权益</span>
      </li>
      <li>
        <span>{{ memberData.noreturn_integral || 0 }}</span>
        <span>待返还权益</span>
      </li>
    </ul>
    <van-tabs v-model="active" @click="tabHandel">
      <van-tab :title="`消费分红(${memberData.dividend_amount || 0})`">
        <ul class="rationList">
          <li class="list" v-for="(item1,i) in integralList" :key='i'>
            <h4>
              分红ID:{{ item1.id }}
              <span>+{{ item1.dividend_amount }}</span>
            </h4>
            <div class="one">
              <div class="time">
                <span class="left">当日累计指定消费金额</span>
                <span class="right">{{ item1.amount }}</span>
              </div>
              <div class="Record">
                <span class="left look">
                  奖励比例：{{ item1.dividend_rate }}%
                </span>
                <span class="right">{{ item1.created_at }}</span>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab :title="`推荐消费奖励(${memberData.recommend_amount || 0})`">
        <div class="reward_box">
          <div class="list_box" v-for="(item2,i) in integralList" :key='i'>
            <ul class="info_box" @click="showMore(item2)">
              <li class="info_a">
                <span>消费分红ID:{{ item2.amount_id }}</span>
                <span class="sum">+{{ item2.dividend_amount }}</span>
              </li>
              <li class="info_b">
                <span>{{ item2.amount }}元</span>
                <span class="time">{{ item2.created_at }}</span>
              </li>
            </ul>
            <!-- 显示/隐藏 -->
            <div
              class="show_hide"
              v-if="amount_id == item2.amount_id && item2.show"
            >
              <div class="show_hide_a">
                <div class="header" v-if="item2.has_one_child">
                  <img :src="item2.has_one_child.avatar_image" />
                </div>
                <ul class="name">
                  <li>{{item2.username}}</li>
                </ul>
              </div>
              <ul class="show_hide_b">
                <li>
                  <span>奖励比例</span>
                  <span>{{ item2.dividend_rate }}%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="`股东分红(${memberData.shareholder_amount || 0})`">
        <ul class="rationList">
          <li class="list" v-for="(item3,i) in integralList" :key='i'>
            <h4>
              分红ID:{{ item3.id }}
              <span>+{{ item3.dividend_amount }}</span>
            </h4>
            <div class="one">
              <div class="time">
                <span class="left">商城销售总额：{{ item3.amount }}</span>
                <span class="right">奖励比例：{{ item3.dividend_rate }}%</span>
              </div>
              <div class="Record">
                <span class="left look"
                  >奖励人数：{{ item3.people_number }}</span
                >
                <span class="right">{{ item3.created_at }}</span>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import global_dividend_controller from "./global_dividend_controller";

export default global_dividend_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#global_dividend {
  padding-top: 40px;
  .header_box {
    background: #f15353;
    color: #fff;
    padding: 1.25rem;
    display: flex;
    .header {
      width: 3.25rem;
      height: 3.25rem;
      border: solid 0.125rem #fff;
      margin-right: 0.625rem;
      overflow: hidden;
      border-radius: 3.75rem;
      background: #f2f2f2;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      width: 11.25rem;
      li:first-child {
        text-align: left;
        font-size: 16px;
        line-height: 1.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name_b {
        font-size: 14px;
        line-height: 1.375rem;
        text-align: left;
      }
    }
    .right_sum {
      width: 5.8125rem;
      text-align: right;
      li:first-child {
        font-size: 18px;
        line-height: 1.875rem;
        span {
          font-size: 12px;
        }
      }
      li:last-child {
        font-size: 14px;
        line-height: 1.375rem;
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 1.25rem 0;
    margin-bottom: 0.625rem;
    li {
      span:first-child {
        font-size: 16px;
        display: block;
        margin-bottom: 0.375rem;
      }
      span:last-child {
        font-size: 12px;
        display: block;
        color: #8c8c8c;
      }
    }
  }
  .rationList {
    .list {
      margin: 0.375rem 0rem;
      background-color: #fff;
      h4 {
        line-height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.875rem;
        line-height: 2.5rem;
        height: 2.5rem;
        text-align: left;
        color: #333;
        font-size: 14px;
        border-bottom: 0.0625rem solid #ebebeb;
        span {
          display: inline-block;
          font-size: 14px;
          font-weight: normal;
          color: #f15353;
          float: right;
        }
      }
      .one {
        padding: 0 0.875rem;

        .time {
          width: 100%;
          line-height: 1.625rem;
          margin-top: 0.625rem;
          display: flex;
          justify-content: space-between;
        }
        .Record {
          width: 100%;
          line-height: 2.75rem;
          display: flex;
          justify-content: space-between;
          .right {
            color: #8c8c8c;
          }
        }
        .left {
          font-size: 14px;
        }
        .look {
          color: #333;
        }
        .right {
          font-size: 14px;
        }
      }
      ul:after {
        content: "";
        display: block;
        clear: both;
      }
      ul {
        width: 100%;
        padding: 0.625rem 0rem;
        li {
          width: 33%;
          float: left;
          font-size: 12px;
          color: #8c9295;
          line-height: 1.375rem;
          span {
            color: #333;
            font-size: 14px;
          }
        }
      }
      p {
        color: #aab2b9;
        text-align: left;
        box-sizing: border-box;
        padding: 0rem 1.25rem 0.9375rem;
        span {
          color: #728ae3;
          float: right;
        }
      }
    }

    .recordList {
      padding: 0.9375rem;
      font-size: 14px;
      line-height: 1.125rem;
      color: #333;
      text-align: left;
      background-color: #fff;
      margin: 0.125rem;
      span {
        font-size: 14px;
        float: right;
      }
    }
  }
  .rationList:after {
    content: "";
    display: block;
    clear: both;
  }
  .reward_box {
    .list_box {
      margin-bottom: 0.375rem;
      .info_box {
        background: #fff;
        padding: 0.625rem 0.875rem;
        .info_a,
        .info_b {
          display: flex;
          justify-content: space-between;
          line-height: 1.875rem;
          font-size: 14px;
          .sum {
            color: #f15353;
          }
          .time {
            color: #8c8c8c;
            font-size: 14px;
          }
        }
      }
      .show_hide {
        background: #fff;
        border-top: solid 0.0625rem #ebebeb;
        padding: 0.625rem 0.875rem;
        .show_hide_a {
          display: flex;
          .header {
            width: 2.5rem;
            height: 2.5rem;
            background: #f2f2f2;
            border-radius: 3.75rem;
            overflow: hidden;
            margin-right: 0.625rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            text-align: left;
            li:first-child {
              font-size: 14px;
              line-height: 1.5rem;
            }
            li:last-child {
              font-size: 12px;
              color: #8c8c8c;
            }
          }
        }
        .show_hide_b {
          padding: 0.625rem 0;
          li {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            line-height: 1.875rem;
          }
        }
      }
    }
  }
}
</style>
