<template>
  <div id="rewards_record">
      <c-title :hide="false" :text="name.plugin_name"></c-title>
      <div class="header_box" v-if="member.member">
          <div class="header">
              <img :src="member.member.avatar_image">
          </div>
          <ul class="name">
              <li>{{member.member.nickname}}[会员ID：{{member.member.uid}}]</li>
              <li v-if="member.level">{{member.level.level_name}}</li>
          </ul>
          <div class="task" @click="toPage">任务中心</div>
      </div>
<!--      <div class="info_box" v-if="member.level">-->
<!--          <ul class="left">-->
<!--              <li>-->
<!--                  <span>{{member.level.service_charge}}</span>-->
<!--                  <font>元</font>-->
<!--              </li>-->
<!--              <li>{{name.service_charge}}</li>-->
<!--          </ul>-->
<!--          <ul class="right">-->
<!--              <li>-->
<!--                  <span>{{member.level.difference_award}}</span>-->
<!--                  <font>元</font>-->
<!--              </li>-->
<!--              <li>{{name.difference_award}}</li>-->
<!--          </ul>-->
<!--      </div>-->
      <div class="rew_detail" @click="goRewardsRecordDetail">
          <div class="left">
               我的{{name.deposit}}
          </div>
          <div class="right" style="color: #f15353">
              ￥{{member.deposit}}
          </div>
      </div>
      <div>
          <ul class="today_bonus">
              <li class="date">
                  <span>{{rewards.today}}</span>
                      <br>
                      <b>今日</b>
              </li>
              <li class="date">
                  <span>{{rewards.yesterday}}</span>
                      <br>
                      <b>昨日</b>
              </li>
              <li class="date">
                  <span>{{rewards.week}}</span>
                      <br>
                      <b>本周</b>
              </li>
              <li class="mounth">
                  <span>{{rewards.month}}</span>
                      <br>
                      <b>本月累计{{rewards_type === 1 ? name.service_charge : name.difference_award}}</b>
              </li>
              <li class="line">
                  <div class="careat"></div>
              </li>
          </ul>
      </div>
      <div class="money">
          <ul class="gongge">
            <li>
              <i class="iconfont icon-weitixian"></i>
              <span>未发放奖励</span>
              <b
                >{{rewards.wait}}<em>元</em>
              </b>
            </li>
            <li>
              <i class="iconfont icon-yijiesuan"></i>
              <span>已发放奖励</span>
              <b
                >{{rewards.complate}}<em>元</em>
              </b>
            </li>
          </ul>
      </div>
      <van-tabs v-model="active" @click="tabHandel">
        <van-tab :title="name.service_charge">
          <div class="list_box">
              <ul class="box" v-for="(item,i) in recordsList" :key='i'>
                  <li @click.stop="showDetail(item)">
                      <span class="order">订单号：{{item.order_sn}}</span>
                      <span class="sum">{{item.reward_price}}</span>
                  </li>
                  <li @click.stop="showDetail(item)">
                      <span class="time">时间：{{item.created_at}}</span>
                      <span class="state">{{item.status_name}}</span>
                  </li>
                  <!-- 显示/隐藏 -->
                  <div class="show_hide_box" v-if="item.show">
                      <div class="user_a" v-if="item.order && item.order.belongs_to_member">
                          <div class="header">
                              <img :src="item.order.belongs_to_member.avatar_image">
                          </div>
                          <ul class="name">
                              <li>{{item.order.belongs_to_member.nickname}}</li>
                          </ul>
                      </div>
                      <div class="goods_a" v-for="(good,i) in item.goods_arr" :key='i'>
                          <div class="goods">
                              <img :src="good.thumb">
                          </div>
                          <ul class="name" style="-webkit-box-orient: vertical;">
                              <li>{{good.title}}</li>
                          </ul>
                          <ul class="price">
                              <li>¥{{good.price}}</li>
                              <li>×{{good.num}}</li>
                              <li class="big">¥{{good.all_price}}</li>
                          </ul>
                      </div>
                  </div>
              </ul>
          </div>
        </van-tab>
        <van-tab :title="name.difference_award">
          <div class="list_box">
              <ul class="box" v-for="(item,i) in recordsList" :key='i'>
                  <li @click.stop="showDetail(item)">
                      <span class="order">订单号：{{item.order_sn}}</span>
                      <span class="sum">{{item.reward_price}}</span>
                  </li>
                  <li @click.stop="showDetail(item)">
                      <span class="time">时间：{{item.created_at}}</span>
                      <span class="state">{{item.status_name}}</span>
                  </li>
                  <!-- 显示/隐藏 -->
                  <div class="show_hide_box" v-if="item.show">
                      <div class="user_a" v-if="item.order && item.order.belongs_to_member">
                          <div class="header">
                              <img :src="item.order.belongs_to_member.avatar_image">
                          </div>
                          <ul class="name">
                              <li>{{item.order.belongs_to_member.nickname}}</li>
                          </ul>
                      </div>
                      <div class="goods_a" v-for="(good,i) in item.goods_arr" :key='i'>
                          <div class="goods">
                              <img :src="good.thumb">
                          </div>
                          <ul class="name" style="-webkit-box-orient: vertical;">
                              <li>{{good.title}}</li>
                          </ul>
                          <ul class="price">
                              <li>¥{{good.price}}</li>
                              <li>×{{good.num}}</li>
                              <li class="big">¥{{good.all_price}}</li>
                          </ul>
                      </div>
                  </div>
              </ul>
          </div>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
	import rewards_record_controller from "./rewards_record_controller";

	export default rewards_record_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rewards_record{
    padding-top: 40px;
    .header_box{
        background: #f15353;
        color:#fff;
        padding: 1.25rem 0.875rem;
        display: flex;
        align-items: center;
        .header{
            width: 3.25rem;
            height: 3.25rem;
            border:solid 0.125rem #fff;
            margin-right: 0.625rem;
            overflow: hidden;
            border-radius: 3.75rem;
            background: #f2f2f2;
            img{
                width: 100%;
            }
        }
        .name{
            width: 12.5rem;
            text-align: left;
            li:first-child{
                text-align: left;
                font-size: 16px;
                line-height: 1.875rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .name_b{
                font-size: 14px;
                line-height: 1.375rem;
                text-align: left;
            }
        }
        .task{
            font-size: 13px;
            background: rgba(0,0,0,0.2);
            position: absolute;
            right: 0.875rem;
            padding: 0.25rem 0.625rem;
            border-radius: 1rem;
        }
    }
    .info_box{
        background: #fff;
        display: flex;
        .left,.right{
            width: 50%;
            padding: 0.625rem 0.875rem;
            li{
                line-height: 1.5rem;
                text-align: left;
                font-size: 14px;
                span{
                    font-size: 24px;
                }
            }
            li:last-child{
                color:#8c8c8c;
            }
        }
    }
    .rew_detail{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        padding: 0.4rem;
        font-size: 18px;
        background: #fff;
    }
    .today_bonus {
        margin-top: 0.625rem;
            width: 100%;
            height: 5.125rem;
            background: #fff;
            padding: 1rem 0;
            box-sizing: border-box;
            position: relative;
            li.line {
                position: absolute;
                width: 0.0625rem;
                height: 3.25rem;
                background: #ddd;
                top: 1rem;
                right: 34%;

                .careat {
                    width: 0.375rem;
                    height: 0.375rem;
                    border: 0.0625rem solid #ddd;
                    border-left: 0;
                    border-bottom: 0;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    background: #fff;
                    position: absolute;
                    top: 1.4375rem;
                    right: -0.1875rem;
                }
            }
            li {

                text-align: center;
                float: left;

                span {

                    font-size: 17px;
                    line-height: 1.625rem;
                    margin-bottom:0.625rem;
                    display: inline-block;
                }
                b {
                    font-size: 11px;
                    color: #333;
                }
            }

            .date {
                width: 22%;

                span {
                    color: #ffa800;
                }
            }
            li:first-child,
            li:nth-child(2) {
                border-right: 0.0625rem solid #e2e2e2;
            }

            .mounth {
                width: 33%;

                span {
                    color: #fc6a70;
                }
            }
    }
    .money{
        margin-top: 0.625rem;
        margin-bottom: 0.625rem;
        .gongge {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: #fff;
            column-count: 3;
            padding-bottom: 0.625rem;
            padding-top: 0.625rem;
            li {
              width: 50%;
              display: flex;
              flex-direction: column;
              text-align: center;
              font-size: 12px;
              i {
                flex: 0 0 1.75rem;
                font-size: 26px;
                color: #999;
                display: inline-block;
                margin-bottom: 0.375rem;
                width: 100%;
              }
              span {
                flex: 0 0 1.4rem;
                color: #333;
                font-size: 12px;
              }
              b {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #f15353;
                font-size: 16px;
              }
            }
          }
    }
    .list_box{
      .box{
          background: #fff;
          padding: 0.625rem 0;
          border-bottom: solid 0.0625rem #ebebeb;
          li{
              line-height: 1.875rem;
              display: flex;
              justify-content: space-between;
              padding: 0 0.875rem;
              font-size: 15px;
              .order{

              }
              .sum{
                  color:#f15353;
              }
              .time{
                  font-size: 12px;
                  color:#8c8c8c;
              }
              .state{

              }
          }
      }
      .show_hide_box{
          padding: 0 0.875rem;
          background: #fff;
          margin-bottom: 0.625rem;
          .user_a{
              padding: 0.625rem 0;
              border-bottom:solid 0.0625rem #ebebeb;
              display: flex;
              .header{
                  width: 2.5rem;
                  height: 2.5rem;
                  overflow: hidden;
                  background: #f2f2f2;
                  margin-right: 10px;
                  img{
                      width: 100%;
                  }
              }
              .name{
                  text-align: left;
                  li{
                      line-height: 1.25rem;
                  }
                  li:last-child{
                      color:#8c8c8c;
                      font-size: 12px;
                  }
              }
          }
          .goods_a{
              padding: 0.625rem 0;
              display: flex;
              .goods{
                  width: 3.75rem;
                  height: 3.75rem;
                  overflow: hidden;
                  background: #f2f2f2;
                  margin-right: 0.625rem;
                  img{
                      width: 100%;
                  }
              }
              .name{
                  width: 12.5rem;
                  text-align: left;
                  max-height: 2.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp:2;
              }
              .price{
                  width: 4.75rem;
                  text-align: right;
                  font-size: 12px;
                  color:#8c8c8c;
                  .big{
                      color:#333;
                      font-size: 15px;
                      margin-top: 0.375rem;
                  }
              }
          }
      }
    }
}
</style>
