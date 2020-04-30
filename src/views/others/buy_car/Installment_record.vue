<template>
  <div>
    <c-title :hide="false"
             :text="'分期记录'">
    </c-title>
    <div style="height: 40px"></div>

    <div class="main"
         v-if="sbc_order_id">
      <div class="bottom">
        <p class="black">分期记录({{singleDetail.length}}期)</p>
        <ul>
          <li class="pay"
              :class="{'over': item.status != 0}"
              v-for="(item, i) in singleDetail"
              :key="i">
            <span class="first">{{item.period_name}}</span>
            <span class="second">{{item.staging_amount}}元<em style="color:#cab44c"
                  v-if="item.status == 2">(代还:{{item.company}}元)</em></span>
            <span class="third">{{item.status_name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="main"
         v-else>
      <div class="item"
           v-for="(order, j) in orderList"
           :key="j">
        <div class="head">
          <div class="left">
            <p class="black">订单号：{{order.order_sn}}</p>
            <p>时间：{{order.loan_at || "还未放款"}}</p>
          </div>
          <div class="right"
               @click="showMore(order)">
            展开详情
          </div>
        </div>
        <div v-show="order.show == 2">
          <div class="middle">
            <div class="imgBox"><img :src="order.goods_thumb"
                   alt=""></div>
            <div class="detail">
              <p class="title">{{order.goods_name}}</p>
              <div class="price">
                <span style="color: #e31717">￥{{order.goods_price}}</span>
                <span style="text-align: right">x{{order.goods_total}}</span>
              </div>
              <span class="gray">规格：{{order.goods_option_title}}</span>
            </div>
          </div>
          <div class="bottom"
               v-if="order.has_many_loan && order.has_many_loan.length > 0">
            <p class="black">分期记录({{order.period_number}}期)</p>
            <ul>
              <li class="pay"
                  :class="{'over': item.status != 0}"
                  v-for="(item, i) in order.has_many_loan"
                  :key="i">
                <span class="first">{{item.period_name}}</span>
                <span class="second">{{item.staging_amount}}元<em style="color:#cab44c"
                      v-if="item.status == 2">(代还:{{item.company}}元)</em></span>
                <span class="third">{{item.status_name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="blank"
           v-if="orderList.length<=0">
        <img src="../../../assets/images/blank.png">
        <span>还没有记录哦</span>
      </div>
    </div>
  </div>
</template>

<script>
import Installment_record_controller from "./Installment_record_controller";

export default Installment_record_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.main {
  background: #ffffff;
  margin-top: 10px;
}
.item {
  margin: 10px;
  position: relative;
  border-bottom: 0.031rem solid #f6f6f6;
}
.black {
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  height: 1.5rem;
}
.head {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 0.031rem solid #f6f6f6;
  .left {
    color: #cccccc;
    font-size: 12px;
  }
  .right {
    position: absolute;
    right: 0;
    top: 1rem;
    width: 4.75rem;
    height: 1.469rem;
    background-color: #ffe3e3;
    border-radius: 0.734rem 0 0 0.734rem;
    color: #e31717;
    text-align: right;
    line-height: 1.469rem;
    padding-right: 0.3rem;
    margin-right: -10px;
  }
}
.middle {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 0.031rem solid #f6f6f6;
  display: flex;
  .imgBox {
    flex: 0 0 5rem;
    width: 4rem;
    height: 4rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 1.5rem;
  }
  .title {
    font-weight: bold;
    max-height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    display: flex;
    line-height: 2rem;
    span {
      flex: 1;
    }
  }
  .gray {
    font-size: 10px;
    color: #cfcfcf;
  }
}
.bottom {
  padding: 0.8rem;
  text-align: left;
  ul {
    margin-top: 0.5rem;
  }
  .pay {
    display: flex;
    height: 2rem;
  }
  .first {
    flex: 0 0 4rem;
  }
  .second {
    flex: 1;
  }
  .third {
    flex: 0 0 5rem;
    text-align: right;
  }
  .over {
    color: #cccccc;
  }
}
</style>
