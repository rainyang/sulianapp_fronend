<template>
  <div id="group_list">
    <c-title :hide="false"
             :text="'拼团列表'"></c-title>
    <div class="content">
      <mt-loadmore :top-method='loadTop'
                   topDropText="释放刷新"
                   ref="loadmore">
        <div class="goods_box"
             v-for="(item, index) in info"
             :key="index"
             v-if="item.has_one_goods">
          <div class="goods_img">
            <img :src="item.has_one_goods.thumb">
          </div>
          <ul class="goods_info">
            <li class="name"
                style="-webkit-box-orient: vertical;">
              {{item.title}}
            </li>
            <li class="price">
              <span>¥</span>{{item.has_many_option_levels[0].group_price}}&nbsp;<span>¥{{item.has_many_option_levels[0].has_one_fight_groups_option.option_price}}</span>
            </li>
            <li class="number">
              <div class="left">
                <i class="iconfont icon-group_list"></i>
                <span>{{item.has_many_option_levels[0].member_num}}人</span>
              </div>

              <div class="go_group"
                   @click="goGroup(item.id)">
                <span>去开团</span>
                <i class="fa fa-angle-right"></i>
              </div>
            </li>
          </ul>
        </div>
      </mt-loadmore>
    </div>
    <p v-if="this.info.length<1"
       style="padding:1rem 0;color:#ff6600"
       @click="goHome">暂无拼团活动，去商城逛逛吧！</p>
  </div>
</template>

<script>
import group_list_controller from "./group_list_controller";

export default group_list_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#group_list {
  padding-top: 40px;
  background: #fff;
  .content {
    padding-left: 0.625rem;
    .goods_box {
      display: flex;
      padding: 0.625rem 0.625rem 0.625rem 0;
      border-bottom: solid 0.0625rem #ebebeb;
      .goods_img {
        width: 7.5rem;
        height: 7.5rem;
        background: #f2f2f2;
        overflow: hidden;
        border-radius: 0.25rem;
        margin-right: 0.625rem;
        img {
          width: 100%;
        }
      }
      .goods_info {
        width: 14.0625rem;
        text-align: left;
        .name {
          font-size: 14px;
          line-height: 1.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .price {
          font-size: 16px;
          margin-top: 0.375rem;
          color: #f15353;
          span {
            font-size: 12px;
          }
          span:last-child {
            color: #8c8c8c;
            margin-left: 0.625rem;
          }
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.625rem;
          .left {
            display: flex;
            align-items: center;
            .iconfont {
              font-size: 1.5rem;
              color: #f15353;
              margin-right: 0.375rem;
            }
            span {
              color: #f15353;
              font-size: 14px;
              border-left: solid 0.0625rem #ebebeb;
              padding-left: 0.375rem;
            }
          }

          .go_group {
            width: 5rem;
            height: 1.75rem;
            border-radius: 0.25rem;
            background: #f15353;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              color: #fff;
              font-size: 14px;
            }
            .fa {
              color: #fff;
              font-size: 1rem;
              margin-left: 0.625rem;
            }
          }
        }
      }
    }
  }
}
</style>
