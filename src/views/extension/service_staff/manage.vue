<template>
  <div id="all">
    <div id="member">
      <c-title :hide="false"
               text="分期购车"></c-title>
      <div style="width:100%;height:40px;"></div>
      <div class="header">
        <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
        <div class="user">
          <div class="user-head">
            <img :src="avatar_image" />
          </div>
          <div data-v-21e0c5a4=""
               class="cashier-name"
               style="">
            {{ username }}
          </div>
          <div class="user-info">
            <router-link :to="fun.getUrl('withdrawal')">
              <div class="user-name">
                <div class="b-tixian">
                  <yd-icon class="iconfont icon-tixian2"
                           custom
                           size="1rem"
                           color="#fff"></yd-icon>
                  <span>{{this.fun.initWithdrawal()}}</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <!-- <div class="youxiao" style="display:flex;"  v-if="status">
        <div class="left_youxiao">
          <i class="iconfont " style="color: #fff;">&#xe692;</i>
          <span class="tian">有效期：{{ store.validity }}天</span>
        </div>
        <div class="right_youxiao" @click="getCash">
          <span>续费</span>
        </div>
      </div> -->
      <!-- <div id="userinfo">
        <ul>
          <li>
            <span><small>￥</small>123232323</span>
            <br />累计收入金额
          </li>

          <li>
            <span><small>￥</small>456456</span>
            <br />可{{this.fun.initWithdrawal()}}金额
          </li>
        </ul>
      </div> -->

      <div class="cart">
        <router-link :to="fun.getUrl('orderlist',{status:'0',orderType: 'hireCar'})">
          <div class="list1">
            <yd-icon class="iconfont icon-car_installment_order"
                     custom
                     size="1.5rem"
                     color="#f15353"
                     style="margin-right:6px"></yd-icon>
            <span>分期购车订单</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <router-link :to="fun.getUrl('InstallmentRecord')">
          <div class="list1">
            <yd-icon class="iconfont icon-member_installment_record"
                     custom
                     size="1.5rem"
                     color="#f15353"
                     style="margin-right:6px"></yd-icon>
            <span>分期记录</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <a @click="gotoStaff()">
          <div class="list1">
            <yd-icon class="iconfont icon-member_service_person"
                     custom
                     size="1.5rem"
                     color="#f15353"
                     style="margin-right:6px"></yd-icon>
            <span>服务人员</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </a>
        <router-link :to="fun.getUrl('Dividend')">
          <div class="list1">
            <yd-icon class="iconfont icon-car_bonus_reward"
                     custom
                     size="1.5rem"
                     color="#f15353"
                     style="margin-right:6px"></yd-icon>
            <span>分红奖励</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
      </div>
      <div style="height: 10px;clear: both;"></div>
    </div>
  </div>
</template>

<script>
import manage_controller from "./manage_controller";
export default manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
// @import "../../../assets/css/cashier.scss";
.header {
  height: auto;
  background: #f15353;
  background-size: 100% 100%;
  padding: 1.25rem;
  position: relative;
  .user {
    display: flex;
    text-align: center;
    .cashier-name {
      text-align: left;
      flex: 2;
      margin-left: 0.625rem;
      line-height: 1.875rem;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
    }
    .user-head {
      height: 3.25rem;
      width: 3.25rem;
      background: #fff;
      border-radius: 50%;
      border: 0.125rem solid #fff;
      box-sizing: border-box;
      float: left;
      overflow: hidden;
    }
    .user-head img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .user-info {
      margin-top: 0.6875rem;
      float: left;
      color: #fff;
    }
    .set {
      position: absolute;
      right: 0.625rem;
      top: 0.625rem;
      color: #fff;
      font-size: 14px;
    }
    .user-info .user-name {
      width: auto;
      font-size: 14px;
      .b-tixian {
        display: flex;
        justify-content: center;
        width: 4.75rem;
        margin-top: 0.5rem;
        margin: 0 auto;
        padding: 0.3125rem;
        border-radius: 1.125rem;
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
      }
    }
    .user-info .user-other {
      height: 1.25rem;
      width: auto;
      font-size: 0.643em;
      line-height: 1.25rem;
      opacity: 0.8;
    }
  }
  .user-gold {
    height: 2.1875rem;
    width: 94%;
    padding: 0.3125rem 3%;
    border-bottom: 0.0625rem solid #f5f3f3;
    background: #fff;
    font-size: 12px;
    line-height: 2.1875rem;
  }
  .user-gold .title {
    height: 2.1875rem;
    width: auto;
    float: left;
    color: #666;
  }
  .user-gold .num {
    height: 2.1875rem;
    width: auto;
    float: left;
    color: #f90;
  }
  .user-gold .draw {
    width: 5rem;
    height: 1.875rem;
    background: #6c9;
    float: right;
  }
  .user-op {
    height: 2.1875rem;
    width: 94%;
    padding: 0.3125rem 3%;
    border-bottom: 0.0625rem solid #f5f3f3;
    background: #fff;
    font-size: 12px;
    line-height: 2.1875rem;
  }
}
i:first-child {
  margin-right: 0.375rem;
  color: #f15353;
  font-size: 18px;
}
.clearfix {
  clear: both;
}
.youxiao {
  left: 0px;
  top: 11.13rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 23.44rem;
  height: 2.5rem;
  line-height: 1.25rem;
  background-color: rgba(244, 118, 119, 1);
  text-align: center;
}
.left_youxiao {
  .tian {
    left: 4.06rem;
    top: 11.63rem;
    width: 5.44rem;
    height: 1.31rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.81rem;
    text-align: left;
    margin-right: 5rem;
    font-family: SourceHanSansSC-regular;
  }
}
.right_youxiao {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    left: 17.56rem;
    display: block;
    top: 11.56rem;
    width: 4.38rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 0.81rem;
    background-color: rgba(241, 83, 83, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
  }
}

.cart {
  height: auto;
  width: 100%;
  background: #fff;
  margin-top: 0.5rem;
}
.list1 {
  height: 2.75rem;
  background: #fff;
  padding-right: 0.875rem;
  margin-left: 0.875rem;
  border-top: 0.0625rem solid #ebebeb;
  font-size: 16px;
  line-height: 2.75rem;
  color: #333;
  text-align: left;
  display: flex;
  position: relative;
}

.list1 i.fa.fa-angle-right {
  float: right;
  line-height: 2.75rem;
  display: inline-block;
  font-size: 1.5rem;
  color: #c9c9c9;
  text-align: center;
  background-size: 1.25rem;
  position: absolute;
  right: 0.875rem;
}
#userinfo {
  background: #fff;
  margin-bottom: 0.625rem;
  ul {
    padding: 1rem 0;
    li a {
      color: #8c8c8c;
      text-align: center;
      display: block;
    }
    li a span {
      color: #222;
      font-size: 14px;
    }
    li:first-child {
      border-right: solid 0.0625rem #ebebeb;
    }
    li {
      box-sizing: border-box;
      flex: 1;
      width: 33%;
      float: left;
      width: 50%;
      box-sizing: border-box;
      border: 0;
      span {
        color: #f15353;
        font-size: 18px;
        display: inline-block;
        margin-bottom: 0.375rem;
        font-weight: bold;
      }
      small {
        font-weight: normal;
        font-size: 12px;
      }
    }
    li:last-child {
      border: 0;
    }
    li a {
      color: #8c8c8c;
      text-align: center;
      display: block;
    }
    li a span {
      color: #222;
      font-size: 16px;
      margin-bottom: 0.3125rem;
      display: inline-block;
    }
    li a {
      color: #8c8c8c;
      font-size: 12px;
    }
    li:after {
      content: "";
      display: block;
      clear: both;
    }
  }
  ul:after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
