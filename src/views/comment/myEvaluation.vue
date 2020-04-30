<template>
  <div id="detailed">
    <c-title :hide="false"
             text='我的评价'></c-title>
    <div style="height: 40px;"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0"
                   @click.native="swichTabTItem">待评价
      </mt-tab-item>
      <mt-tab-item id="1"
                   @click.native="swichTabTItem">已评价
      </mt-tab-item>
      <!-- <mt-tab-item id="2"
                     @click.native="swichTabTItem">评价回复</mt-tab-item> -->
    </mt-navbar>

    <div style="width:100%;height:0.0625rem;"></div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" style="margin-top:0.625rem;">

      <mt-tab-container-item id="0" class="orderhoet">
        <div v-for="(item,i) in wait" class="listWarp" :key='i'>

          <div class="goods" v-for="(good,i) in item.has_many_order_goods" :key='i'>
            <div class="titleID">订单号：{{item.order_sn}}</div>
            <div class="product">
              <div class="img">
                <img :src="good.thumb">
              </div>
              <div class="warp">
                <ul class="inner">
                  <li class="name">{{good.title|escapeTitle}}</li>
                  <li class="option" v-if="good.goods_option_title">规格: {{good.goods_option_title}}</li>
                </ul>

                <ul class="price">
                  <li class="commodity_price">
                    <small>￥</small>
                    {{good.price}}
                  <li>
                  <li class="option"> ×{{good.total}}</li>
                </ul>
                <!--<span><router-link :to='{name:"evaluate",params:{order_data:1}}' >评价</router-link></span>-->
                <div class="evaluate"><span @click="toComment(item.id,good)">去评价</span></div>

              </div>
            </div>
          </div>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1"
                             class="orderhoet2">
        <div v-for="(item,i) in comment" :key='i'>
          <div class="goodsinfo"
               v-for="(good,i) in item.has_many_order_goods" :key='i'>
            <div class="goods" style="padding-top:0.625rem;">

              <div class="img"><img :src="good.thumb"></div>

              <div class="warp">
                <ul class="inner">
                  <li class="name">{{good.title|escapeTitle}}</li>
                  <li class="option" v-if="good.goods_option_title">规格: {{good.goods_option_title}}</li>
                </ul>

                <ul class="price">
                  <li class="commodity_price">
                    <small>￥</small>
                    {{good.price}}
                  </li>
                  <li class="option"> ×{{good.total}}</li>

                </ul>
              </div>
            </div>
            <div class="butts">
							<span v-for="btn in good.buttons"
                    @click="opration(btn,good)">{{btn.name}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2"
                             class="orderhoet3">
        <div class="pall"
             v-for="(item,i) in other" :key='i'>
          <router-link :to="{name:'othercommentdetails',params:{comment_id:1},query:{i:toi}}">
            <div class="goodsinfo">
              <!--<div class="hrt"></div>-->
              <div class="goods" style="padding-top:0.625rem;">

                <div class="img"><img :src="item.thumb"></div>


                <div class="warp">
                  <div class="inner">
                    <div class="name">
                      {{item.title}}
                    </div>
                    <div class="option2">
                      <font>
                        <small>￥</small>
                        {{item.price}}</font>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </router-link>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import myEvaluation from "./myEvaluation_controller";

  export default myEvaluation;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #detailed {
    a {
      color: #000;
    }
    .butts {
      position: absolute;
      right: 0.75rem;
      text-align: center;
      /*padding-bottom: 10px;*/
      margin-top: -2.25rem;
      color: #333;
      span {
        padding: 0.25rem 0.625rem;
        border-radius: 15px;
        border: solid 0.0625rem #b1a6a6;
        display: inline-block;
      }
    }
    .orderhoet2,
    .orderhoet3 {
      margin-bottom: 0;
    }
    .orderhoet {
      margin-bottom: 0;
      .titleID {
        font-size: 14px;
        text-align: left;
        line-height: 2.25rem;
        padding: 0 0.875rem;
      }
      .listWarp :after {
        content: "";
        display: block;
        clear: both;
      }
    }
    .pj {
      background: #FFF;
      padding: 0 0.625rem;
      p {
        text-align: left;
        margin: 0;
      }
      img {
        width: 100%;
      }
    }
    .pic {
      display: flex;
      align-items: stretch;
      flex-flow: row wrap;
      padding: 0.625rem;
      background: #FFF;
      div {
        flex: 33% 0 0;
        img {
          width: 90%;
        }
      }
    }
    #user {
      div:nth-child(1) {
        flex: 1;
        padding: 0.3125rem 0.125rem;
        img {
          width: 90%;
          border-radius: 50%;
        }
      }
      div:nth-child(2) {
        flex: 5;
        text-align: left;
      }
      div:nth-child(3) {
        color: #908a8a;
        font-size: 12px;
        padding-right: 0.625rem;
      }
    }
    .mint-navbar .mint-tab-item {
      padding: 0.875rem 0;
    }
    .goodsinfo {
      padding: 0;
      background: #FFF;
      .hrt {
        border-top: #e0e0e0 0.0625rem solid;
        margin: 0.625rem 0;
      }
    }
    .goods:after {
      content: "";
      display: block;
      clear: both;
    }
    .goods {
      margin-top: 0;
      border-bottom: solid 0.0625rem #ebebeb;
      text-align: right;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      .product {

      }
      .img {
        /*flex: 1;*/
        width: 6rem;
        height: 6rem;
        margin-left: 0.875rem;
        margin-bottom: 0.625rem;
        margin-right: 0.625rem;
        float: left;
        display: inline-block;
        /*background:blue;*/
        img {
          width: 100%;
          border-radius: 10px;
        }
      }
      .warp {
        width: 68%;
        padding: 0 1rem 0 0;
        float: left;
        display: inline-block;
        .inner {
          width: 70%;
          float: left;
          box-sizing: border-box;
          text-align: left;
          .name {
            text-align: left;
            color: #333333;
            margin-bottom: 0.625rem;
            font-size: 14px;
          }
        }

        .price {
          width: 30%;
          align-items: center;
          text-align: right;
          box-sizing: border-box;
          float: left;
          p {
            margin-top: 0
          }

          .yijp {
            background: #888888;
            padding: 0 0.3125rem;
            color: #FFF;
          }
        }

      }

      .commodity_price {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.625rem;
        font-size: 14px;
      }

      .evaluate span {
        border: solid 0.0625rem #f15353;
        border-radius: 15px;
        padding: 0.25rem 0.625rem;
        text-align: center;
        display: inline-block;
        position: absolute;
        right: 0.75rem;;
        bottom: 0.625rem;
        color: #f15353;
      }

      .option {
        color: #8c8c8c;
        font-size: 12px;
        flex: 1;
      }
      .option2 {
        color: #e84e40;
        font-size: 14px;
        flex: 1;
        width: 100%;
        font {
          float: left;
        }
      }
    }
    .qtpl {
      text-align: right;
      width: 100%;
      span {
        background: #FFF;
        border: #B1A6A6 solid 0.0625rem;
        padding: 0.125rem 1.25rem;
        border-radius: 0.625rem;
      }
    }
    .pall {
      margin-bottom: 0.625rem;
    }
  }
</style>
