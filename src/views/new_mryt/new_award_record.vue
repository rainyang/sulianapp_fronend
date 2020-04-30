<template>
  <div id="new_award_record">
    <c-title :hide="false"
             :text="WXtitle"></c-title>
    <div id="content">
      <div class="info_box">
        <div class="info">
          <ul>
            <li>{{rewardsData.today}}</li>
            <li>今日</li>
          </ul>
          <ul>
            <li>{{rewardsData.yesterday}}</li>
            <li>昨日</li>
          </ul>
          <ul>
            <li>{{rewardsData.week}}</li>
            <li>本周</li>
          </ul>
          <ul>
            <li>{{rewardsData.month}}</li>
            <li>本月累计分红</li>
          </ul>
        </div>
        <div class="img">
          <img src="../../assets/images/sale_img.png">
        </div>
      </div>
      <div class="award_box">
        <mt-loadmore :top-method="loadTop"
                     ref="loadmore"
                     bottomPullText=''
                     bottomDropText='下拉加载...'
                     bottomLoadingText=''
                     :autoFill='false'
                     id='olis'>
          <div class="list_box">
            <ul v-for="(item,i) in recordsList"
                @click="toDetail(item)"
                :key='i'>
              <li>
                <span v-if="item.log_id">销售佣金ID：{{item.log_id}}</span>
                <span v-if="!item.log_id">{{item.has_one_member.nickname}}</span>
                <span>{{item.actual_amount}}</span>
              </li>
              <li>
                <span>{{item.created_at}}</span>
                <span>已发放</span>
              </li>
            </ul>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import new_award_record_controller from "./new_award_record_controller";
export default new_award_record_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#new_award_record {
  padding-top: 40px;
  #content {
    .info_box {
      position: relative;
      .info {
        background-color: #fff;
        padding: 0.75rem 0;
        display: flex;
        ul:first-child,
        ul:nth-child(2),
        ul:nth-child(3) {
          width: 5.125rem;
          li {
            line-height: 1.875rem;
          }
          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }
          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }
        ul:last-child {
          width: 8.0625rem;
          li {
            line-height: 1.875rem;
          }
          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }
          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }
      }
      .img {
        position: absolute;
        bottom: 0.625rem;
        right: 7.625rem;
        height: 3.75rem;
        img {
          height: 100%;
        }
      }
    }
    .award_box {
      margin-top: 0.625rem;
      .list_box {
        margin-top: 0.375rem;
        background-color: #fff;
        ul {
          padding: 0.625rem 0.875rem;
          border-bottom: solid 0.0625rem #ebebeb;
          li:first-child {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            font-size: 16px;
            span:last-child {
              color: #f15353;
            }
          }
          li:last-child {
            display: flex;
            justify-content: space-between;
            line-height: 1.5rem;
            font-size: 16px;
            span:first-child {
              font-size: 14px;
              color: #8c8c8c;
            }
          }
        }
      }
    }
  }
}
</style>