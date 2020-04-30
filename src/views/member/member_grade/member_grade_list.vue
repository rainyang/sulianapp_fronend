<template>
  <div id="member-grade">
    <c-title :hide="false"
             text="会员权益"></c-title>
    <div class="header">
      <div class="use-header">
        <div class="img">
          <img :src="memberInfo.avatar" />
        </div>
        <ul>
          <li class="name">{{ memberInfo.nickname }}</li>
          <li>等级名称:{{ memberInfo.level_name }}</li>
        </ul>
        <!-- <div class="button">
                    <input type="button" value="退款迁移"  @click="gotoRefundsMigration"/>
                    <i class="fa fa-angle-right"></i>
                </div> -->
      </div>
      <div class="time"
           v-if="memberInfo.validity == 0 ? false : true">
        <yd-icon class="iconfont icon-naozhong"
                 custom
                 size="1.125rem"
                 color="#f5d59c"></yd-icon>
        <font><span>有效期：</span>{{ memberInfo.validity }}天</font>
      </div>
    </div>
    <div class="current"
         v-if="memberInfo.level_id == 0 ? false : true">
      <div class="title-box">
        <div class="left"></div>
        <span>会员权益</span>
        <div class="right"></div>
      </div>
      <ul>
        <li>
          <div class="circur"></div>
          全场{{ right.discount }}折（特殊商品除外）
        </li>
        <li>
          <div class="circur"></div>
          全场运费减免{{ right.freight_reduction }}%
        </li>
        <li v-if="isNotNull(right.rent_free)">
          <div class="circur"></div>
          租赁商品免租金数量：{{ right.rent_free }}件
        </li>
        <li v-if="isNotNull(right.deposit_free)">
          <div class="circur"></div>
          租赁商品免押金数量：{{ right.deposit_free }}件
        </li>
      </ul>
    </div>
    <div v-for="(item, i) in levelList"
         :key="i">
      <div class="member-box">
        <div class="top">
          <h1>{{ item.level_name }}</h1>
          <button type="button"
                  v-if="level_type==2"
                  class="go_buy"
                  @click="gotoRightGood(item.id)">
            {{ item.id == memberInfo.level_id ? "立即续费" : "立即购买" }}
          </button>
        </div>
        <div class="title-box">
          <div class="left"></div>
          <span>会员权益</span>
          <div class="right"></div>
        </div>
        <ul>
          <li v-if="isNotNull(item.discount)">
            <div class="circur"></div>
            全场{{ item.discount }}折（特殊商品除外）
          </li>
          <li v-if="isNotNull(item.freight_reduction)">
            <div class="circur"></div>
            全场运费减免{{ item.freight_reduction }}%
          </li>
          <li v-if="isNotNull(item.rent_free)">
            <div class="circur"></div>
            租赁商品免租金数量：{{
              isNotNull(item.rent_free) ? item.rent_free : 0
            }}件
          </li>
          <li v-if="isNotNull(item.deposit_free)">
            <div class="circur"></div>
            租赁商品免押金数量：{{
              isNotNull(item.deposit_free) ? item.deposit_free : 0
            }}件
          </li>
          <li v-if="!fun.isTextEmpty(item.description)"
              class="introduce">
            <p v-html="
                !fun.isTextEmpty(item.description)
                  ? replace(item.description)
                  : ''
              "></p>
          </li>
        </ul>
        <!-- <div class="bottom">
                    <span><h1><small>￥</small>{{item.goods.price}}</h1></span>
                    <button type="button" class="btn" @click="buy(item.goods.id)">{{item.id == memberInfo.level_id?"立即续费":"立即购买"}}</button>
                </div> -->
      </div>
    </div>

    <div class="introduce"
         v-if="isNotNull(shopDesc)">
      <h2>【{{ name }}】介绍</h2>
      <p v-html="shopDesc"></p>
    </div>
    <div style="height:2.8125rem;background-color:#f2f2f2"></div>
    <a class="service"
       :href="cservice"
       :style="{ width: this.fun.getPhoneEnv() == 3 ? '375px' : '100%' }">
      <yd-icon class="iconfont icon-wodekefu"
               custom
               size="1.25rem"
               color="#f5d59c"></yd-icon>
      <span>联系客服</span>
    </a>
  </div>
</template>

<script>
import member_grade_list_controller from "./member_grade_list_controller.js";
export default member_grade_list_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#member-grade {
  padding-top: 40px;
  .header {
    width: 100%;
    .use-header {
      background-color: #3b3b4f;
      padding: 1.25rem;
      position: relative;
      display: flex;
      .img {
        width: 3.75rem;
        height: 3.75rem;
        border: solid 0.125rem #fff;
        border-radius: 50%;
        margin-right: 1rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      ul {
        text-align: left;
        li {
          line-height: 1.75rem;
          color: #fff;
          font-size: 14px;
        }
        .name {
          font-weight: bold;
        }
      }
      .button {
        width: 21%;
        height: 1.625rem;
        background-color: #fff;
        border-radius: 0.8125rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
        position: absolute;
        margin-top: 1.0625rem;
        right: 0.625rem;

        input {
          border: none;
          color: #efcb7b;
        }
        i {
          color: #efcb7b;
          font-size: 1.25rem;
          line-height: 1.625rem;
        }
      }
    }
    .time {
      background-color: rgba(59, 59, 79, 0.8);
      text-align: left;
      height: 2.25rem;
      padding: 0 1.25rem;
      display: flex;
      align-items: center;
      font {
        font-size: 14px;
        line-height: 2.25rem;
        color: #f5d59c;
        span {
          font-weight: bold;
        }
      }
      i {
        margin-right: 0.625rem;
      }
    }
  }
  .current {
    background: #fff;
    padding: 1rem 0.875rem;
    margin-bottom: 10px;
    ul {
      padding: 0rem 1rem;
      li {
        line-height: 1.875rem;
        text-align: left;
        display: flex;
        font-size: 14px;
        .circur {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #f5d59c;
          margin-top: 0.6875rem;
          margin-right: 0.625rem;
        }
      }
    }
  }
  .member-box {
    margin: 0 0.875rem 1rem 0.875rem;
    background-color: #fff;
    border-radius: 0.375rem;
    box-shadow: 0rem 0.125rem 0.375rem 0.025rem rgba(0, 0, 0, 0.1);
    padding-bottom: 1rem;
    .introduce {
      text-align: left;
    }
  }
  .top {
    margin-bottom: 0.625rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background: -webkit-linear-gradient(
      left,
      rgba(252, 224, 173, 1),
      rgba(241, 206, 143, 1)
    );
    border-radius: 0.375rem 0.375rem 0 0;
    color: #333;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.625rem;
    h1 {
      text-align: left;
    }
    .go_buy {
      width: 4.5rem;
      height: 1.625rem;
      line-height: 1.625rem;
      border-radius: 2rem;
      font-size: 12px;
      color: #fff;
      border: none;
      background: -webkit-linear-gradient(
        left,
        rgba(68, 68, 88, 1),
        rgba(47, 47, 69, 1)
      );
    }
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    .left {
      margin-left: 0.875rem;
      width: 32%;
      height: 0.0625rem;
      background-color: #ccc;
      margin-top: 0.9375rem;
    }
    span {
      font-size: 16px;
      line-height: 1.875rem;
      font-weight: bold;
    }
    .right {
      width: 32%;
      height: 0.0625rem;
      background-color: #ccc;
      margin-top: 0.9375rem;
      margin-right: 0.875rem;
    }
  }
  .bottom {
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #f5d59c;
    border-radius: 0 0 0.375rem 0.375rem;
    color: #333;
    position: relative;
    h1 {
      font-size: 16px;
      text-align: left;
      margin-left: 0.75rem;
    }
  }
  .btn {
    height: 1.625rem;
    line-height: 1.625rem;
    padding: 0 0.625rem;
    border: none;
    color: #f5d59c;
    background-color: #3b3b4f;
    border-radius: 0.25rem;
    position: absolute;
    right: 0.875rem;
    top: 0.4375rem;
  }
  .member-box {
    ul {
      padding: 0rem 1rem;
      li {
        line-height: 1.875rem;
        text-align: left;
        display: flex;
        font-size: 14px;
        .circur {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #bbb;
          margin-top: 0.6875rem;
          margin-right: 0.625rem;
        }
      }
    }
  }

  .introduce {
    background-color: #fff;
    border-bottom: solid 0.0625rem #e2e2e2;
    h2 {
      margin-left: 0.875rem;
      padding-right: 0.875rem;
      font-size: 16px;
      line-height: 2.25rem;
      border-bottom: solid 0.0625rem #e2e2e2;
      text-align: left;
    }
    p {
      margin: 0 0.875rem;
      line-height: 1.25rem;
      text-align: left;
      padding: 0.625rem 0;
    }
  }
  .service {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.8125rem;
    line-height: 2.8125rem;
    background-color: #3b3b4f;
    display: flex;
    justify-content: center;
    span {
      margin-left: 0.625rem;
      color: #f5d59c;
      font-size: 14px;
    }
  }
}
</style>
