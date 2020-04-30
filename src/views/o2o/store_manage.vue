<template>
  <div id="all">
    <div id="member">
      <c-title :hide="false" text="门店中心"></c-title>
      <div style="width:100%;height:40px;"></div>
      <div class="header">
        <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
        <div class="user">
          <div class="user-head">
            <img :src="store.thumb" />
          </div>
          <div data-v-21e0c5a4="" class="cashier-name" style="">
            {{ store.name }}
          </div>
          <div class="user-info">
            <router-link :to="fun.getUrl('withdrawal')">
              <div class="user-name">
                <div class="b-tixian">
                  <yd-icon
                    class="iconfont icon-tixian2"
                    custom
                    size="1rem"
                    color="#fff"
                  ></yd-icon>
                  <span>{{this.fun.initWithdrawal()}}</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="youxiao" style="display:flex;"  v-if="status">
        <div class="left_youxiao">
          <i class="iconfont " style="color: #fff;">&#xe692;</i>
          <span class="tian">有效期：{{ store.validity }}</span>
        </div>
        <div class="right_youxiao" @click="getCash">
          <span>续费</span>
        </div>
      </div>
      <div id="userinfo">
        <ul>
          <li>
            <span><small>￥</small>{{ income.money_total }}</span>
            <br />累计实收金额
          </li>

          <li>
            <span><small>￥</small>{{ income.sure_withdraw_money }}</span>
            <br />可{{this.fun.initWithdrawal()}}金额
          </li>
        </ul>
      </div>

      <div class="cart">
        <router-link :to="fun.getUrl('qrCode', { store_id: store.store_id })">
          <div class="list1">
            <yd-icon
              class="iconfont icon-store_code"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>门店二维码</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <router-link
          :to="
            fun.getUrl('storeOrderlist', { status: '0', orderType: 'store' })
          "
        >
          <div class="list1">
            <yd-icon
              class="iconfont icon-member-order4"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>我的门店订单</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <router-link :to="fun.getUrl('presentationRecord',{},{from:'store'})">
          <div class="list1">
            <yd-icon
              class="iconfont icon-member-withdrawals1"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>我的提成</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <!-- 商品管理 -->
        <router-link
          :to="
            fun.getUrl('CommodityManagement', {
              store_id: store.store_id,
              store: 'store'
            })
          "
        >
          <div class="list1">
            <yd-icon
              slot="icon"
              class="icon-goods-manage"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>商品管理</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <!-- 商品分类 -->
        <router-link
          :to="fun.getUrl('GoodsClassify', { store_id: store.store_id })"
        >
          <div class="list1">
            <yd-icon
              slot="icon"
              class="icon-goods-class"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>商品分类</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <router-link
        :to="fun.getUrl('CommodityCoupon', { store_id: store.store_id })"
      >
        <div class="list1">
          <yd-icon
            slot="icon"
            class="icon-member_quan"
            custom
            size="1.5rem"
            color="#f15353"
            style="margin-right:6px"
          ></yd-icon>
          <span>优惠券管理</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </router-link>
        <router-link v-if="cloudHornStatus"
          :to="fun.getUrl('cloudHorn')"
        >
          <div class="list1">
            <yd-icon
              slot="icon"
              class="icon-cloud_horn"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>云喇叭</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
        <div @click="toNear" v-if="nearby">
          <div class="list1">
            <yd-icon
              slot="icon"
              class="icon-shop_side_goods"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>门店附近推荐商品</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
        <router-link v-if="zkzStatus"
                     :to="fun.getUrl('zkzDevice')"
        >
          <div class="list1">
            <yd-icon
              slot="icon"
              class="icon-cloud_horn"
              custom
              size="1.5rem"
              color="#f15353"
              style="margin-right:6px"
            ></yd-icon>
            <span>zkc扫码设备</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </router-link>
      </div>
      <div style="height: 10px;clear: both;"></div>
    </div>
    <div id="ewm" ref="hook" @click="openQrCode('none')">
      <div class="pic">
        <img :src="poster" alt="" />
      </div>
    </div>
    <div id="jpg"></div>
  </div>
</template>

<script>
import store_manage_controller from "./store_manage_controller";
export default store_manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cashier.scss";
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
</style>
