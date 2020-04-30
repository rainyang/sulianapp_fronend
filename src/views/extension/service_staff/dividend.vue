<!-- 分期购车 分红奖励 -->
<template>
  <div id="dividend">
    <c-title :hide="false"
             :text="'奖励记录'"> </c-title>
    <div style="height: 40px"></div>

    <div class="head">
      <div class="background">
        <div class="user">
          <div class="user-head">
            <img :src="memberData.avatar_image" />
          </div>
          <div class="user-name">{{ memberData.username }}</div>
        </div>
      </div>
      <div class="absolute-block">
        <div class="right">
          <span class="first"><b>累计奖励</b></span>
          <span class="second">￥{{ memberData.amount_total }}</span>
        </div>
        <div class="line"></div>
        <div class="right">
          <span class="first"><b>待奖励</b></span>
          <span class="second">￥{{ memberData.amount_wait }}</span>
        </div>
      </div>
    </div>

    <div class="blank"
         v-if="recordsList.length <= 0">
      <img src="../../../assets/images/blank.png" />
      <span>还没有记录哦</span>
    </div>

    <div class="content"
         v-if="recordsList.length > 0">
      <ul>
        <li v-for="(item, index) in recordsList"
            :key="index">
          <div class="block">
            <div class="left">
              <div>
                推广组：{{ item.id
                }}<i class="stateClass">{{ item.status_name }}</i>
              </div>
              <div class="date">{{ item.created_at }}</div>
            </div>
            <div class="right"
                 @click="gotoDetail(item.id)">
              <span>查看详情 <i class="fa fa-angle-right"></i></span>
            </div>
          </div>

          <div class="bottom_main">
            <div class="list">
              <div class="child">{{ item.condition_count }}</div>
              <div class="child">推广条件</div>
            </div>
            <div class="list">
              <div class="child">{{ item.finish_count }}</div>
              <div class="child">已推广数量</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dividend_controller from "./dividend_controller";

export default dividend_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#dividend {
  .head {
    color: #ffffff;
    .background {
      width: 100%;
      height: 10rem;
      background: #f15353;
      display: flex;
      padding-top: 1rem;
      justify-content: center;
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-head {
          height: 4rem;
          width: 4rem;
          background: #fff;
          border-radius: 50%;
          border: 0.125rem solid #fff;
          box-sizing: border-box;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .user-head img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .user-name {
          font-size: 16px;
          color: #fff;
          width: 8.5rem;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
      }
    }
    .absolute-block {
      width: 22rem;
      background-color: #ffffff;
      border-radius: 0.5rem;
      margin: 0 auto;
      transform: translateY(-40%);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0.8rem 1rem;
      .top_left {
        width: 50%;
        text-align: left;
        color: #999999;
        margin-bottom: 0.625rem;
      }
      .top_right {
        width: 50%;
        text-align: right;
        color: #999999;
        margin-bottom: 0.625rem;
      }
      .left {
        width: 33%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 14px;
          color: #333;
        }
      }
      .right {
        width: 49%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 12px;
          color: #333;
        }
      }
      .line {
        height: 3rem;
        width: 1px;
        background-color: #d1d1d1;
      }
    }
  }
  .blank {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 6rem;
      height: 6rem;
    }
    span {
      margin-top: 15px;
      color: #fff;
      font-size: 14px;
    }
  }
  .content {
    background: #ffffff;
    li {
      padding: 0.625rem 1.5rem;
      border-bottom: 0.0625rem solid #d1d1d1;
      .block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          text-align: left;
          .stateClass {
            border: 1px solid #ff6000;
            color: #ff6000;
            border-radius: 0.438rem;
            font-size: 12px;
            padding: 0 0.25rem;
            margin-left: 0.25rem;
          }
          .date {
            color: #c1c1c1;
            font-size: 12px;
            margin-top: 0.35rem;
          }
        }
        .right {
          font-size: 14px;
          color: #f15353;
        }
      }

      .bottom_main {
        display: flex;
        .list {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          .child {
            width: 100%;
          }
        }
      }
    }
  }
  .title {
    display: flex;
    span {
      flex: 1;
      color: #666666;
    }
  }
}
</style>
