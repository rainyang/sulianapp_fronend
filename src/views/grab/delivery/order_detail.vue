<template>
  <div id="shop_detail">
    <c-title :hide="false" :text='text'></c-title>
    <!--配送站的订单详情-->
    <div style="height:40px;"></div>
    <div id="content">
      <div class="add">
        <div class="add_left">
          <i class="iconfont icon-icon_location"></i>
        </div>
        <ul class="add_center">
          <li>收件人：{{address.realname}} ({{address.mobile}})</li>
          <li v-if="address.distributor_address">{{address.distributor_address.replace(/\/+/g, " ")}}</li>
          <li v-if="address.address">{{address.address.replace(/\/+/g, " ")}}</li>
        </ul>
        <!--<div class="add_right">-->
        <!--<i class="fa fa-angle-right"></i>-->
        <!--</div>-->
      </div>
      <div class="goods_list">
        <div class="goods" v-for="(order,i) in order_list" :key='i'>
          <div class="img">
            <img :src="order.thumb">
          </div>
          <ul class="info">
            <li>
              <span class="goods-name"
                    style="-webkit-box-orient: vertical;">{{order.title}}</span>
              <span>¥{{(Number(order.goods_price)/order.total).toFixed(2)}}</span>
            </li>
            <li class="standard">
              <span v-if="!order.goods_option_title"></span>
              <span v-if="order.goods_option_title">规格：{{order.goods_option_title}}</span>
              <span>×{{order.total}}</span>
            </li>
          </ul>
        </div>
      </div>
      <ul class="order_info number" v-if="orderType !=='robbing'">
        <li>
          <span>订单编号：</span>
          <span>{{order_info.order_sn}}</span>
        </li>
        <li>
          <span>交易状态：</span>
          <span>{{order_info.status_name}}</span>
        </li>
      </ul>
      <ul class="order_info">
        <!--<li>-->
        <!--<span>单品满额优惠：</span>-->
        <!--<span>¥0.00</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<span>全场满额优惠：</span>-->
        <!--<span>¥50.00</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<span>优惠券优惠：</span>-->
        <!--<span>¥0.00</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<span>抵扣金额：</span>-->
        <!--<span>¥0.00</span>-->
        <!--</li>-->
        <li v-if="orderType ==='robbing'">
          <span>配送{{income_name_text}}：</span>
          <span v-if="order_distributor">¥{{order_distributor.dividend}}</span>
        </li>

        <h1 v-if="orderType !=='robbing'">实付款：<span><small>¥</small>{{order_info.price}}</span></h1>
      </ul>
      <div style="height: 3.0625rem;"></div>

      <div class="footer footer_btn"
           v-if="order_info.button_models && order_info.button_models.length > 0 && orderType !=='robbing'">
        <span v-for="(btn,i) in order_info.button_models" :key='i' @click="operation(btn,order_info)">{{btn.name}}</span>
      </div>

      <div class="footer footer_btn"
           v-if="order_distributor && orderType ==='robbing'">
      <span v-if="order_distributor.button_models"
            @click.stop="operation2(order_distributor.button_models,order_info.id)">{{order_distributor.button_models.name}}</span>
      </div>

    </div>
  </div>
</template>
<script>
  import order_detail_controller from './order_detail_controller';

  export default order_detail_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #shop_detail {
    #content {
      .add {
        background-color: #fff;
        display: flex;
        padding: 0.625rem 0.875rem;
        text-align: left;
        .add_left {
          width: 1.5rem;
          i {
            font-size: 1.125rem;
            line-height: 1.75rem;
            text-align: center;
            color: #666;
          }
        }
        .add_center {
          line-height: 1.625rem;
          font-size: 14px;
          li:first-child {
            font-weight: bold;
          }
        }
        .add_right {
          width: 1.5rem;
          position: absolute;
          right: 0;
          i {
            font-size: 1.5rem;
            line-height: 3.25rem;
            text-align: center;
            color: #c9c9c9;
          }
        }
      }
      .goods_list {
        margin-top: 0.625rem;
        background-color: #fff;
        .goods {
          // background-color: #fafafa;
          padding: 0.75rem;
          display: flex;
          .img {
            width: 4rem;
            height: 4rem;
            background: #fff;
            overflow: hidden;
            margin-right: 0.75rem;
            img {
              width: 100%;
            }
          }
          .info {
            width: 17.1875rem;
            font-size: 14px;
            position: relative;
            li:last-child {
              width: 100%;
              position: absolute;
              bottom: 0rem;
              color: #8c8c8c;
            }
            li {
              display: flex;
              justify-content: space-between;
              span:first-child {
                width: 11.25rem;
                text-align: left;
                line-height: 1.25rem;
              }
              .goods-name {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      .order_info {
        background-color: #fff;
        margin-top: 0.625rem;
        font-size: 14px;
        padding: 0.625rem 0 0;
        li {
          padding: 0 0.875rem;
          display: flex;
          justify-content: space-between;
          line-height: 1.875rem;
        }
        h1 {
          /*margin-top: 0.625rem;*/
          height: 2.5rem;
          line-height: 2rem;
          padding: 0 0.875rem;
          /*border-top: solid 0.0625rem #ebebeb;*/
          text-align: right;
          font-size: 14px;
          font-weight: normal;
          span {
            color: #f15353;
            font-size: 18px;
          }
        }
      }
      .number {
        padding: 0.625rem 0;
      }
      .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 3.0625rem;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
        .price {
          font-size: 16px;
          line-height: 3.0625rem;
          padding-right: 0.625rem;
          .price_b {
            color: #f15353;
          }
        }
        .btn {
          width: 5.9375rem;
          line-height: 3.0625rem;
          background-color: #f15353;
          color: #fff;
          font-size: 16px;
        }
      }
      .footer_btn {
        display: flex;
        justify-content: flex-end;
        height: 3.0625rem;
        line-height: 3.0625rem;
        padding: 0 0.875rem;
        border-top: solid 0.0625rem #ebebeb;
        span {
          margin-top: 0.6875rem;
          width: 4.375rem;
          height: 1.625rem;
          line-height: 1.625rem;
          border: solid 0.0625rem #666;
          font-size: 12px;
          border-radius: 0.1875rem;
          margin-left: 0.625rem;
        }
      }
    }
  }

</style>