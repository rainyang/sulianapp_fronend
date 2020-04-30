<template>
  <div id="replenish_detail">
    <c-title :hide="false" :text=text></c-title>
    <!--补货商的订单详情-->
    <div style="height:40px;"></div>
    <div id="content">
      <div class="add" v-if="distributor">
        <div class="add_left">
          <i class="iconfont icon-icon_location"></i>
        </div>
        <ul class="add_center">
          <li>配送站：{{distributor.realname}} {{distributor.mobile}}</li>
          <li v-if="distributor.distributor_address">{{distributor.distributor_address.replace(/\/+/g, " ")}}</li>
        </ul>
      </div>
      <div class="add line">
        <div class="add_left">
          <i class="iconfont icon-dingwei"></i>
        </div>
        <ul class="add_center">
          <li>收件人：{{address.realname}} ({{address.mobile}})</li>
          <li>{{address.address}}</li>
        </ul>
        <!-- <div class="add_right">
          <i class="fa fa-angle-right"></i>
        </div> -->
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
        <!-- <ul class="goods_count">
          <li>
            <span>商品金额</span>
            <span>¥3720.00</span>
          </li>
          <li>
            <span>运费</span>
            <span>¥20.00</span>
          </li>
          <li>
            <span>可用**积分抵扣20.00元</span>
            <yd-switch v-model="switch1"></yd-switch>
          </li>
        </ul> -->
      </div>
      <!-- <ul class="coupon">
        <li>
          <span>优惠券<small>0张可用</small></span>
          <span>未使用</span>
        </li>
      </ul> -->
      <ul class="order_info order_number">
        <li>
          <span>订单编号</span>
          <span>{{order_info.order_sn}}</span>
        </li>
        <li>
          <span>交易状态</span>
          <span>{{order_info.status_name}}</span>
        </li>
        <li>
          <span>总共{{order_info.goods_total}}件商品</span>
          <span>{{order_info.price}}</span>
        </li>
      </ul>
      <div class="footer footer_btn" v-if="order_info.button_models && order_info.button_models.length > 0">
        <span v-for="(btn,i) in order_info.button_models" :key='i' @click="operation(btn,order_info)">{{btn.name}}</span>
      </div>
      <!--<div class="footer footer_btn">-->
      <!--<span @click="operation(btn,order_info)">测试</span>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import replenish_orderlist_detail_controller from './replenish_orderlist_detail_controller';

  export default replenish_orderlist_detail_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #replenish_detail {
    #content {
      padding-bottom: 3.75rem;
      .line {
        border-top: solid 0.0625rem #ebebeb;
      }
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
        h1 {
          line-height: 2.25rem;
          padding: 0 0.875rem;
          font-weight: normal;
          font-size: 14px;
          text-align: left;
        }
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
        .goods_count {
          background-color: #fff;
          padding: 0.625rem 0.875rem;
          font-size: 14px;
          li {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            span:last-child {
              color: #f15353;
            }
          }
        }
      }
      .coupon {
        margin-top: 0.625rem;
        line-height: 2.8125rem;
        background-color: #fff;
        padding: 0 0.875rem;
        font-size: 14px;
        li {
          display: flex;
          justify-content: space-between;
          span:first-child {
            small {
              background: #f15353;
              color: #fff;
              font-size: 12px;
              border-radius: .1875rem;
              padding: 0 0.3125rem;
              margin-left: 0.375rem;
            }
          }
          span:last-child {
            color: #f15353;
          }
        }
      }
      .order_number, .order_info {
        background-color: #fff;
        margin-top: 0.625rem;
        font-size: 14px;
        padding: 0.625rem 0.875rem;
        li {
          display: flex;
          justify-content: space-between;
          line-height: 1.875rem;
        }
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
          text-align: right;
          width: 17.5rem;
          border-top: solid 0.0625rem #ebebeb;
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