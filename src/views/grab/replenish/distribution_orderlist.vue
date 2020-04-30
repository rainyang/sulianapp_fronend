<template>
  <div id="shop-order">
    <c-title :hide="false" text='铺货单'></c-title>
    <!--补货商的铺货单-->
    <div style="height:40px;"></div>
    <div id="order-box">
      <mt-navbar v-model="activeName">
        <mt-tab-item id="-1"  @click.native="getRebate">全部</mt-tab-item>
        <mt-tab-item id="1" @click.native="getRebate">待发货</mt-tab-item>
        <mt-tab-item id="2"  @click.native="getRebate">待收货</mt-tab-item>
        <mt-tab-item id="3"  @click.native="getRebate">已完成</mt-tab-item>
      </mt-navbar>
      <!--<el-tabs v-model="activeName" @tab-click="getRebate">-->
      <mt-tab-container v-model="activeName">
        <mt-tab-container-item name="-1">
        <!--<el-tab-pane label="全部" name="-1">-->
          <div class="order" v-if="!status">
            <div class="goods-list" :key="index" v-for="(good,index) in list" @click="toDetail(good.id)">
              <h1>订单号：{{good.order_sn}}<span>{{good.status_name}}</span></h1>
              <div class="goods" v-for="(item,i) in good.order_goods" :key='i'>
                <div class="img">
                  <img :src="item.thumb">
                </div>
                <ul class="info">
                  <li>
                    <span class="goods-name" style="-webkit-box-orient: vertical;">{{item.title}}</span>
                    <span>¥{{(Number(item.goods_price)/item.total).toFixed(2)}}</span>
                  </li>
                  <li class="standard">
                    <span v-show="!item.goods_option_id"></span>
                    <span v-show="item.goods_option_id">规格：{{item.goods_option_title}}</span>
                    <span>×{{item.total}}</span>
                  </li>
                </ul>
              </div>
              <div class="price">
                <h2><span>共{{good.goods_total}}件商品  实付：</span>¥{{good.price}}</h2>
              </div>
              <div class="btn" v-if="good.button_models && good.button_models.length > 0">
                <span v-for="(btn,i) in good.button_models" :key='i' @click.stop="operation(btn,good)">{{btn.name}}</span>
              </div>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
        <mt-tab-container-item name="1">
        <!--<el-tab-pane label="待发货" name="1">-->
          <div class="order" v-if="status === '1'">
            <div class="goods-list" v-for="(good,index) in list" :key='index' @click="toDetail(good.id)">
              <h1>订单号：{{good.order_sn}}<span>{{good.status_name}}</span></h1>
              <div class="goods" v-for="(item,i) in good.order_goods" :key='i'>
                <div class="img">
                  <img :src="item.thumb">
                </div>
                <ul class="info">
                  <li>
                    <span class="goods-name" style="-webkit-box-orient: vertical;">{{item.title}}</span>
                    <span>¥{{(Number(item.goods_price)/item.total).toFixed(2)}}</span>
                  </li>
                  <li class="standard">
                    <span v-show="!item.goods_option_id"></span>
                    <span v-show="item.goods_option_id">规格：{{item.goods_option_title}}</span>
                    <span>×{{item.total}}</span>
                  </li>
                </ul>
              </div>
              <div class="price">
                <h2><span>共{{good.goods_total}}件商品  实付：</span>¥{{good.price}}</h2>
              </div>
              <div class="btn" v-if="good.button_models && good.button_models.length > 0">
                <span v-for="(btn,i) in good.button_models" :key='i' @click.stop="operation(btn,good)">{{btn.name}}</span>
              </div>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
        <mt-tab-container-item name="2">
        <!--<el-tab-pane label="待收货" name="2">-->
          <div class="order" v-if="status === '2'">
            <div class="goods-list" v-for="(good,index) in list" :key='index' @click="toDetail(good.id)">
              <h1>订单号：{{good.order_sn}}<span>{{good.status_name}}</span></h1>
              <div class="goods" v-for="(item,i) in good.order_goods" :key='i'>
                <div class="img">
                  <img :src="item.thumb">
                </div>
                <ul class="info">
                  <li>
                    <span class="goods-name" style="-webkit-box-orient: vertical;">{{item.title}}</span>
                    <span>¥{{(Number(item.goods_price)/item.total).toFixed(2)}}</span>
                  </li>
                  <li class="standard">
                    <span v-show="!item.goods_option_id"></span>
                    <span v-show="item.goods_option_id">规格：{{item.goods_option_title}}</span>
                    <span>×{{item.total}}</span>
                  </li>
                </ul>
              </div>
              <div class="price">
                <h2><span>共{{good.goods_total}}件商品  实付：</span>¥{{good.price}}</h2>
              </div>
              <div class="btn" v-if="good.button_models && good.button_models.length > 0">
                <span v-for="(btn,i) in good.button_models" :key='i' @click.stop="operation(btn,good)">{{btn.name}}</span>
              </div>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
        <mt-tab-container-item name="3">
        <!--<el-tab-pane label="已完成" name="3">-->
          <div class="order" v-if="status === '3'">
            <div class="goods-list" v-for="(good,index) in list" :key='index' @click="toDetail(good.id)">
              <h1>订单号：{{good.order_sn}}<span>{{good.status_name}}</span></h1>
              <div class="goods" v-for="(item,i) in good.order_goods" :key='i'>
                <div class="img">
                  <img :src="item.thumb">
                </div>
                <ul class="info">
                  <li>
                    <span class="goods-name" style="-webkit-box-orient: vertical;">{{item.title}}</span>
                    <span>¥{{(Number(item.goods_price)/item.total).toFixed(2)}}</span>
                  </li>
                  <li class="standard">
                    <span v-show="!item.goods_option_id"></span>
                    <span v-show="item.goods_option_id">规格：{{item.goods_option_title}}</span>
                    <span>×{{item.total}}</span>
                  </li>
                </ul>
              </div>
              <div class="price">
                <h2><span>共{{good.goods_total}}件商品  实付：</span>¥{{good.price}}</h2>
              </div>
              <div class="btn" v-if="good.button_models && good.button_models.length > 0">
                <span v-for="(btn,i) in good.button_models" :key='i' @click.stop="operation(btn,good)">{{btn.name}}</span>
              </div>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
      </mt-tab-container>
      <!--</el-tabs>-->
    </div>

  </div>
</template>
<script>
  import distribution_orderlist_controller from './distribution_orderlist_controller';

  export default distribution_orderlist_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #shop-order {
    #order-box {
      .order {
        .goods-list {
          border-top: solid 0.0625rem #ebebeb;
          border-bottom: solid 0.0625rem #ebebeb;
          background-color: #fff;
          margin-bottom: 0.625rem;
          h1 {
            font-weight: normal;
            font-size: 14px;
            padding: 0 0.875rem;
            height: 2.25rem;
            line-height: 2.25rem;
            text-align: left;
            span {
              color: #f15353;
              position: absolute;
              right: 0.875rem;
            }
          }
          .goods {
            background-color: #fafafa;
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
          .price {
            height: 2.25rem;
            line-height: 2.25rem;
            text-align: right;
            font-size: 18px;
            padding: 0 0.875rem;
            span {
              font-weight: normal;
              font-size: 14px;
            }
          }
          .btn {
            border-top: solid 0.0625rem #ebebeb;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 2.875rem;
            padding: 0 0.875rem;
            span {
              padding: 0.25rem 0.625rem;
              border-radius: 0.1875rem;
              border: solid 0.0625rem #666;
              font-size: 12px;
              text-align: center;
              margin-left: 0.625rem;
            }
          }
        }
      }
    }
  }

</style>