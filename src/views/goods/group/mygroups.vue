<!-- 我的拼团组件 -->
<template>
  <div id="mygroups">
    <c-title :hide="false"
             text="我的拼团"></c-title>
    <div class="content">
      <van-tabs v-model="active"
                @change="getData"
                sticky>
        <van-tab title="正在拼团"
                 name="a">
          <mt-loadmore :top-method="loadTop"
                       topDropText="释放刷新"
                       ref="loadmore">
            <div class="list_box">
              <div class="list"
                   v-for="(item, index) in info"
                   :key="index">
                <div class="time_state">
                  <span class="time">开团:{{ item.has_one_team.start_time | startTimes }}</span>
                  <span class="state">拼单中,还差{{
                      item.has_one_level.member_num -
                        item.has_one_team.has_many_success_member_count
                    }}人</span>
                </div>
                <div class="goods_box">
                  <div class="goods_img">
                    <img :src="!fun.isTextEmpty(item.has_one_goods) ? item.has_one_goods.thumb : ''" />
                  </div>
                  <ul class="goods_name">
                    <li class="name_price">
                      <h2 class="name"
                          style="-webkit-box-orient: vertical;">
                        {{ item.has_one_goods
                            ? item.has_one_goods.title
                            : "" }}
                      </h2>
                    </li>
                    <li class="option">
                      <span>¥{{ item.total_price }}</span>
                      <span style="color:#000000;">还剩:<yd-countdown :time="item.has_one_team.end_time"
                                      timetype="timestamp">
                        </yd-countdown></span>
                    </li>
                  </ul>
                </div>
                <div class="allbt">
                  <button type="button"
                          @click="gotoOrder(item.order_id)">
                    订单详情
                  </button>
                  <button type="button"
                          @click="gotoGroup(item.team_id)">
                    拼团详情
                  </button>
                </div>
              </div>
              <img src="../../..//assets/images/blank.png"
                   alt=""
                   v-if="fun.isTextEmpty(info)"
                   style="width:5rem;padding-top:5rem">
            </div>

          </mt-loadmore>
        </van-tab>
        <van-tab title="拼团成功"
                 name="b">
          <mt-loadmore :top-method="loadTop"
                       topDropText="释放刷新"
                       ref="loadmore">
            <div class="list_box">
              <div class="list"
                   v-for="(item, index) in info"
                   :key="index">
                <div class="time_state">
                  <span class="time">开团：{{ item.has_one_team.start_time | startTimes }}</span>
                  <span class="state">拼团成功</span>
                </div>
                <div class="goods_box">
                  <div class="goods_img">
                    <img :src="!fun.isTextEmpty(item.has_one_goods) ? item.has_one_goods.thumb : ''" />
                  </div>
                  <ul class="goods_name">
                    <li class="name_price">
                      <h2 class="name"
                          style="-webkit-box-orient: vertical;">
                        {{
                          item.has_one_goods
                            ? item.has_one_goods.title
                            : ""
                        }}
                      </h2>
                    </li>
                    <li class="option">
                      <span>¥{{ item.total_price }}</span>
                      <!-- <span style="color:#000000;">还剩:<yd-countdown :time="item.has_one_team.end_time"
                                    timetype="timestamp">
                      </yd-countdown></span> -->
                    </li>
                  </ul>
                </div>
                <div class="allbt">
                  <button type="button"
                          @click="gotoOrder(item.order_id)">
                    订单详情
                  </button>
                  <button type="button"
                          @click="gotoGroup(item.team_id)">
                    拼团详情
                  </button>
                </div>
              </div>
              <img src="../../..//assets/images/blank.png"
                   alt=""
                   v-if="fun.isTextEmpty(info)"
                   style="width:5rem;padding-top:5rem">
            </div>
          </mt-loadmore>
        </van-tab>
        <van-tab title="拼团失败"
                 name="c">
          <mt-loadmore :top-method="loadTop"
                       topDropText="释放刷新"
                       ref="loadmore">
            <div class="list_box">
              <div class="list"
                   v-for="(item, index) in info"
                   :key="index">
                <div class="time_state">
                  <span class="time">开团：{{ item.has_one_team.start_time | startTimes }}</span>
                  <span class="state">拼团失败</span>
                </div>
                <div class="goods_box">
                  <div class="goods_img">
                    <img :src="!fun.isTextEmpty(item.has_one_goods) ? item.has_one_goods.thumb : ''" />
                  </div>
                  <ul class="goods_name">
                    <li class="name_price">
                      <h2 class="name"
                          style="-webkit-box-orient: vertical;">
                        {{ !fun.isTextEmpty(item.has_one_goods) ? item.has_one_goods.title : '' }}
                      </h2>
                    </li>
                    <li class="option">
                      <span>¥{{ item.total_price }}</span>
                      <!-- <span style="color:#000000;">拼团失败</span> -->
                    </li>
                  </ul>
                </div>
                <div class="allbt">
                  <button type="button"
                          @click="gotoOrder(item.order_id)">
                    订单详情
                  </button>
                  <button type="button"
                          @click="gotoGroup(item.team_id)">
                    拼团详情
                  </button>
                </div>
              </div>
              <img src="../../..//assets/images/blank.png"
                   alt=""
                   v-if="fun.isTextEmpty(info)"
                   style="width:5rem;padding-top:5rem">
            </div>
          </mt-loadmore>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import mygroups_controller from "./mygroups_controller";

export default mygroups_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#mygroups {
  .content {
    padding-top: 40px;
    .list_box {
      min-height: 100vh;
      .list {
        background: #fff;
        margin-top: 0.625rem;
        .time_state {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          height: 2.5rem;
          line-height: 2.5rem;
          padding: 0 0.875rem;
          .state {
            color: #f15353;
          }
        }
        .goods_box {
          // background: #fafafa;
          border-top: solid 0.0625rem #ebebeb;
          padding: 0.625rem 0.875rem;
          display: flex;
          .goods_img {
            width: 5.625rem;
            height: 5.625rem;
            overflow: hidden;
            background: #f2f2f2;
            border-radius: 0.25rem;
            margin-right: 0.625rem;
            img {
              width: 100%;
            }
          }
          .goods_name {
            width: 15.4375rem;
            position: relative;
            .name_price {
              display: flex;
              justify-content: space-between;
              .name {
                width: 100%;
                font-size: 14px;
                line-height: 1.25rem;
                max-height: 2.5rem;
                text-align: left;
                font-weight: normal;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .price {
                font-size: 14px;
                text-align: right;
                line-height: 1.25rem;
                span {
                  color: #8c8c8c;
                }
              }
            }
            .option {
              width: 100%;
              display: flex;
              justify-content: space-between;
              color: #f15353;
              font-size: 14px;
              margin-top: 0.625rem;
              text-align: left;
              position: absolute;
              bottom: 0.625rem;
            }
          }
        }
        .all_price {
          height: 2.5rem;
          line-height: 2.5rem;
          padding: 0 0.875rem;
          text-align: right;
          font-size: 14px;
          font-weight: normal;
          span {
            font-weight: bold;
            font-size: 18px;
          }
        }
        .allbt {
          border-top: solid 0.0625rem #ebebeb;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0.5rem 0.875rem;
          button {
            border-radius: 0.1875rem;
            border: solid 0.0625rem #666;
            font-size: 12px;
            padding: 0.25rem 0.625rem;
            margin-left: 0.625rem;
          }
        }
      }
    }
  }
}
</style>
