<template>
  <div id="replenishment">
    <c-title :hide="false" text="我要补货"></c-title>
    <div style="height:40px"></div>
    <div id="content">
      <div
        ref="classifyWrapper"
        class="classify-box"
        style="max-height: 36rem;;overflow:hidden;"
      >
        <ul class="classify">
          <li class="c_child" v-for="(list,i) in dataList" :key='i'>
            <ul class="c_name">
              <li class="class_a">
                <span
                  style="-webkit-box-orient: vertical;"
                  :class="list.id === parentID ? 'current' : ''"
                  @click="chooseCategory(list)"
                  >{{ list.name }}</span
                >
              </li>
              <li
                class="class_b"
                v-show="list.id === parentID"
                v-for="(child,i) in list.childrens" :key='i'
              >
                <span
                  :class="child.id === nowID ? 'addClass' : 'removeClass'"
                  @click.stop="chooseChildCategory(child.id, list.id)"
                  style="-webkit-box-orient: vertical;"
                  >{{ child.name }}</span
                >
              </li>
            </ul>
          </li>
          <li class="space"></li>
        </ul>
      </div>
      <div class="goods">
        <div ref="goodWrapper" style="max-height: 36rem;;overflow:hidden;">
          <div class="goodWrapper">
            <ul
              class="list"
              @click="goToGoodsDetail(good)"
              v-for="(good,i) in goodsList" :key='i'
            >
              <div class="img">
                <img :src="good.thumb" />
              </div>
              <li class="goods-info">
                <ul class="info-class">
                  <li class="info_a" style="-webkit-box-orient: vertical;">
                    {{ good.title|escapeTitle }}
                  </li>
                  <li class="info_b">
                    已售{{ good.show_sales }}{{ good.sku }}
                  </li>
                  <li class="info_c">
                    <span class="price" v-show="!good.has_option"
                      >铺货价<small>¥</small>{{ good.price }}</span
                    >
                    <span class="price" v-show="good.has_option"
                      >铺货价<small>¥</small>{{ good.max_price }}-{{
                        good.min_price
                      }}</span
                    >
                    <!--<small>¥</small>{{good.market_price}}/ <div class="select standard" v-show="false">-->
                    <!--<yd-button @click.native="show1 = true">选规格</yd-button>-->
                    <!--</div>-->
                    <div class="select">
                      <transition name="fade">
                        <i
                          @click.stop="
                            updateCart(
                              goodsCarts[good.id].id,
                              -1,
                              goodsCarts[good.id]
                            )
                          "
                          v-if="goodsCarts[good.id]"
                          class="iconfont icon-life-game-sign"
                        ></i>
                      </transition>
                      <input
                        type="tel"
                        v-if="
                          goodsCarts[good.id] && !goodsCarts[good.id].option_str
                        "
                        title="number"
                        @change="
                          inputChange(
                            goodsCarts[good.id].id,
                            goodsCartsTotal[good.id].total
                          )
                        "
                        @click.stop
                        v-model.lazy="goodsCartsTotal[good.id].total"
                      />
                      <span
                        v-if="
                          goodsCarts[good.id] && goodsCarts[good.id].option_str
                        "
                        @click.stop
                        >{{ goodsCartsTotal[good.id].total }}</span
                      >
                      <i
                        @click.stop="addGood(good)"
                        class="iconfont icon-life-game-plus"
                      ></i>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="space"></div>
          </div>
        </div>
        <!-- 选规格弹窗 -->
        <yd-popup v-model="show1" position="bottom" height="76%">
          <div class="standard-box">
            <div class="goods-img">
              <div class="img">
                <img :src="popThumb" />
              </div>
              <ul class="info">
                <li class="info_a">
                  <!--<small>¥</small>-->
                  <!--{{popmPrice}}/铺货价-->
                  <small>¥</small>
                  {{ popPrice|escapeTitle }}
                </li>
                <li class="info_b">库存{{ popStock }}{{ goodsInfo.sku }}</li>
                <li class="info_c">{{ goodsDescription }}</li>
              </ul>
              <div class="fork" @click.stop="show1 = false">
                <i class="iconfont icon-close11"></i>
              </div>
            </div>
            <ul class="goods-standard">
              <li class="size" v-for="(spec,i) in goodsInfo.has_many_specs" :key='i'>
                <h1>{{ spec.title }}</h1>
                <div class="choice">
                  <span
                    @click.stop="selectSpecs(item, item.id)"
                    v-for="item in spec.specitem"
                    :class="specid.indexOf(item.id) >= 0 ? 'current' : ''"
                    >{{ item.title }}</span
                  >
                </div>
              </li>
            </ul>
            <div class="number">
              <span>购买数量：</span>
              <div class="select">
                <i
                  @click.stop="reduceGoods"
                  class="iconfont icon-life-game-sign"
                ></i>
                <input type="tel" title="数量" v-model="goodsCount" />
                <i
                  @click.stop="addGoods"
                  class="iconfont icon-life-game-plus"
                ></i>
              </div>
            </div>
            <div class="bnt" @click="submitAction">确定</div>
          </div>
        </yd-popup>
      </div>
    </div>

    <div class="a2q" v-show="showGoods">
      <div class="a2w ">
        <div></div>
      </div>
      <div class="a33">
        <p class="a34"></p>
        <ul class="a35"></ul>
      </div>
      <div class="a2z"></div>
      <a
        href="javascript:void 0;"
        @click="goShowCart"
        v-show="!showCart"
        class="a2r outcartcontent show"
        :class="carts.length > 0 ? 'light' : 'dark'"
      >
        <i v-show="carts.length > 0" class="a2s">{{ cartsNum }}</i>
      </a>
      <div class="a2t" :style="leftPrice" pricearea="">
        <div v-show="carts.length > 0" class="">¥{{ cartsTotal }}</div>
        <div v-show="carts.length === 0" class="a2u">购物车是空的</div>
      </div>
      <a
        class="a2v"
        :class="{ disabled: goodsCarts.length === 0 }"
        @click="goodsOrder(goodsCarts)"
        >选好了</a
      >
      <!-- 购物车弹窗 -->
      <div class="minicart-content" :style="minicartStyle">
        <a
          href="javascript:void 0;"
          @click="goShowCart"
          class="a2r incartcontent light"
          :class="showLogo"
        >
          <i class="a2s">{{ cartsNum }}</i>
        </a>
        <i class="a37"></i>
        <div class="scroll">
          <div class="a38 ">
            <span class="a4b a4c checked">全选</span>
            <p class="a4e">(已选{{ cartsNum }}件)</p>
            <a href="javascript:void 0;" class="a39" @click="clearCart"
              >清空购物车</a
            >
          </div>
          <div class="a3b">
            <div class="a3m single">
              <div class="a3r single">
                <span></span>
                <div style="display:none"></div>
              </div>
              <div ref="cartWrapper" style="max-height: 19rem;;overflow:hidden">
                <ul class="minicart-goods-list single">
                  <li class="a3o single" v-for="(item,i) of carts" :key='i'>
                    <span
                      class="a4b a3p checked"
                      @click.stop="delItemByCart(item.id)"
                    ></span>
                    <a class="a3s">
                      <table class="a3t">
                        <tbody>
                          <tr v-if="item.goods">
                            <td style=" width:3.875rem; ">
                              <img class="a3u" :src="item.goods.thumb" />
                            </td>
                            <td>
                              <div class="a3x">
                                {{ item.goods.title }}
                                <span v-if="item.option_str"
                                  >({{ item.option_str }})</span
                                >
                              </div>
                              <div class="a46">
                                <div class="a3q">¥{{ item.goods.price }}</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </a>
                    <a
                      style=""
                      @click.stop="updateCart(item.id, -1)"
                      class="a3v"
                    ></a>
                    <em style="" class="a3y">{{ item.total }}</em>
                    <a @click.stop="updateCart(item.id, 1)" class="a3w"></a>
                  </li>
                </ul>
              </div>
              <div class="a3n single" style=""></div>
            </div>
          </div>
        </div>
        <div style="height:3.0625rem;"></div>
        <div style="display:none" class="a4f"></div>
      </div>

      <div></div>
      <div
        class="a30"
        @click="goShowCart"
        style="display: block;"
        v-if="showCart"
      ></div>
      <div class="a30" v-if="!showCart"></div>
    </div>

    <!--<div id="footer">-->
    <!--<div class="left">-->
    <!--<i class="iconfont icon-shop_car"></i>-->
    <!--<span><small>¥</small>18800.00</span>-->
    <!--</div>-->
    <!--<div class="right">选好了</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import my_replenish_controller from "./my_replenish_controller";

export default my_replenish_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../assets/css/new_grab.scss";

#replenishment {
  #content {
    display: flex;
    top: 40px;
    position: absolute;
    /*min-height: 39.1875rem;*/
    .classify-box {
      color: #666;
      background-color: #ebebeb;
      font-size: 14px;
      width: 5.25rem;
      .classify {
        .c_child {
          .c_name {
            border-bottom: solid 0.0625rem #ebebeb;
            .class_a {
              position: relative;
              .current {
                color: #f15353 !important;
                display: -webkit-box;
                padding: 0 0.25rem 0 0.5rem;
                height: 3.125rem;
                line-height: 1.25rem;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical !important;
                -webkit-box-pack: center;
              }
            }
            .class_b {
              position: relative;
              background-color: #fff;
              .addClass {
                color: #f15353;
              }
              .addClass:before {
                width: 0.125rem;
                height: 3.125rem;
                top: 0;
                border-radius: 0.1875rem;
                background-color: #f15353;
                content: "";
                position: absolute;
                left: 0;
              }
              .removeClass::after {
                height: 3.125rem;
                /*width: 0.0625rem;*/
                background-color: #ebebeb;
                top: 0;
                right: 0;
                content: "";
                position: absolute;
              }
            }
            li {
              span {
                display: -webkit-box;
                padding: 0 0.25rem 0 0.5rem;
                height: 3.125rem;
                line-height: 1.25rem;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical !important;
                -webkit-box-pack: center;
              }
            }
          }
        }
      }
      .classify::after {
        display: block;
        background: transparent;
        content: " ";
        width: 100%;
        height: 3.625rem;
      }
      .space {
        width: 100%;
        height: 3.625rem;
      }
    }
    .goods {
      background-color: #fff;
      width: 18.1875rem;
      padding-left: 0.75rem;
      .goodWrapper::after {
        display: block;
        background: transparent;
        content: " ";
        width: 100%;
        height: 3.625rem;
      }
      .space {
        width: 100%;
        height: 3.625rem;
      }
      .list {
        display: flex;
        padding: 0.75rem 0.75rem 0.75rem 0;
        border-bottom: solid 0.0625rem #ebebeb;
        .img {
          width: 4rem;
          height: 4rem;
          background-color: #ccc;
          overflow: hidden;
          margin-right: 0.625rem;
          img {
            width: 100%;
          }
        }
        .goods-info {
          width: 12.0625rem;
          text-align: left;
          .info-class {
            .info_a {
              margin-bottom: 0.375rem;
              line-height: 1.25rem;
              font-size: 14px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .info_b {
              color: #8c8c8c;
              line-height: 1.25rem;
            }
            .info_c {
              display: flex;
              justify-content: space-between;
              .price {
                color: #f15353;
                font-size: 12px;
                small {
                  font-size: 12px;
                }
              }
              .standard {
                button {
                  height: 1.5rem;
                  width: 2.5rem;
                  background-color: #f15353;
                  border: none;
                  border-radius: 0.75rem;
                  color: #fff;
                }
              }
              .select {
                display: flex;
                span {
                  outline: none;
                  border: none;
                  display: inline-block;
                  width: 1.5rem;
                  height: 1.5rem;
                  line-height: 1.5rem;
                  font-size: 14px;
                  text-align: center;
                }
                input {
                  outline: none;
                  border: none;
                  display: inline-block;
                  width: 1.5rem;
                  height: 1.5rem;
                  line-height: 1.5rem;
                  font-size: 14px;
                  text-align: center;
                }
                i:first-child {
                  background-color: #ccc;
                }
                i:last-child {
                  background-color: #f15353;
                }
                i {
                  width: 1.5rem;
                  height: 1.5rem;
                  text-align: center;
                  line-height: 1.5rem;
                  border-radius: 0.75rem;
                  color: #fff;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
      .standard-box {
        .goods-img {
          z-index: 1502;
          padding: 0.625rem 0.875rem;
          display: flex;
          .img {
            width: 6rem;
            height: 6rem;
            border: solid 0.0625rem #ebebeb;
            overflow: hidden;
            margin-right: 0.75rem;
            border-radius: 0.25rem;
            img {
              width: 100%;
            }
          }
          .info {
            font-size: 16px;
            text-align: left;
            .info_a {
              font-size: 20px;
              color: #f15353;
              line-height: 1.875rem;
              height: 1.875rem;
              margin-bottom: 0.625rem;
              small {
                font-size: 14px;
              }
            }
            .info_b,
            .info_c {
              color: #8c8c8c;
              font-size: 14px;
              line-height: 1.25rem;
            }
          }
          .fork {
            position: absolute;
            right: 0.625rem;
            display: flex;
            i {
              width: 1.75rem;
              height: 1.75rem;
              line-height: 1.75rem;
              color: #c9c9c9;
              font-size: 1rem;
            }
          }
        }
        .goods-standard {
          text-align: left;
          margin: 0 1.25rem;
          border-bottom: solid 0.0625rem #ebebeb;
          .size,
          .color {
            h1 {
              font-size: 14px;
              font-weight: normal;
              line-height: 1.875rem;
            }
            .choice {
              display: flex;
              flex-wrap: wrap;
              .current {
                background-color: #f15353;
                color: #fff;
              }
              span {
                display: inline-block;
                width: 4rem;
                height: 1.625rem;
                line-height: 1.625rem;
                text-align: center;
                border-radius: 0.8125rem;
                background-color: #ebebeb;
                margin: 0 0.625rem 0.625rem;
              }
              span:nth-child(4n) {
                margin-right: 0;
              }
              span:nth-child(4n + 1) {
                margin-left: 0;
              }
            }
          }
        }
        .number {
          display: flex;
          justify-content: space-between;
          margin: 0 1.25rem;
          height: 3.75rem;
          line-height: 3.75rem;
          border-bottom: solid 0.0625rem #ebebeb;
          span {
            font-size: 14px;
          }
          .select {
            display: flex;
            margin-top: 1rem;
            span {
              outline: none;
              border: none;
              width: 1.75rem;
              height: 1.75rem;
              line-height: 1.75rem;
              text-align: center;
            }
            input {
              outline: none;
              border: none;
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              line-height: 1.5rem;
              font-size: 14px;
              text-align: center;
            }
            i {
              width: 1.75rem;
              height: 1.75rem;
              line-height: 1.75rem;
              text-align: center;
              border-radius: 0.125rem;
              background-color: #f5f5f5;
              font-size: 16px;
            }
          }
        }
        .bnt {
          z-index: 2001;
          font-size: 16px;
          width: 100%;
          background-color: #f15353;
          color: #fff;
          height: 3.0625rem;
          line-height: 3.0625rem;
          position: fixed;
          bottom: 0;
        }
      }
    }
  }
  #footer {
    width: 100%;
    height: 3.0625rem;
    line-height: 3.0625rem;
    border-top: solid 0.0625rem #ebebeb;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .left {
      line-height: 3.0625rem;
      padding: 0 1.25rem;
      color: #f15353;
      display: flex;
      i {
        margin-top: 0.375rem;
        width: 2.25rem;
        height: 2.25rem;
        line-height: 2.25rem;
        border-radius: 1.125rem;
        color: #fff;
        background-color: #f15353;
        margin-right: 0.625rem;
        font-size: 24px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
        small {
          font-size: 14px;
        }
      }
    }
    .right {
      width: 7.1875rem;
      background-color: #f15353;
      color: #fff;
      font-size: 16px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s linear;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(15px);
  }
  // 弹窗css
  .a2q {
    .minicart-content {
      max-height: 28.75rem;
      /*overflow: scroll;*/
    }
    .a3v {
      background-image: url(../../../assets/images/goods_minus.png);
    }
    .a3w {
      background-image: url(../../../assets/images/goods_plus.png);
    }
    .a4b {
      background-image: url(../../../assets/images/goods_finish.png);
    }
    .outcartcontent {
      background-image: url(../../../assets/images/goods_car_del.png);
    }
    .a2r.light {
      background-image: url(../../../assets/images/goods_car.png);
    }
  }
}
</style>
