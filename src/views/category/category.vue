<template>
  <div id="category">
    <!-- <c-title :hide="true" text=''></c-title> -->
    <div class="search-box">
      <div class="search-content"
           style="height:4.2vh;"
           @click="gotosearch">
        <i class="iconfont icon-sousuo1"></i>
        搜索商品
      </div>
    </div>
    <div id="category-content"
         ref="menucontent"
         v-if="!fun.isTextEmpty(list)"
         :style="{overflow:(this.category_template == '01'?'hidden':'scroll')}">
      <div id="err"
           v-if="err">未检测到子分类数据!</div>
      <c-carcontent hide="true"
                    :list='contentlist_one'
                    v-if='!err&&category_template=="02"'>
      </c-carcontent>

      <div id="carcontent2"
           v-if='!err&&category_template=="01"'>

        <div class="branch"
             ref="imgBox"
             v-show="!fun.isTextEmpty(ADImg)">
          <a :href="ADUrl | href_filters">
            <img style="width:100%;max-height:40vh;" :src="ADImg" />
          </a>
        </div>
        <!-- 分类下拉框 -->
        <div class="catagoryBox">
          <van-collapse v-model="activeName">
            <van-collapse-item name="1">
              <div slot="title"
                   class="activetitle">
                <!-- 自定义标题 -->
                <dl v-show="!fun.isTextEmpty(showTitle)">
                  <dt v-for="(o,index) in showTitle"
                      :key="index"
                      :class="o.id == secondaryId ? 'addClass' : 'removeClass'"
                      @click.stop="clickActive(o)">
                    {{ o.name }}
                  </dt>
                </dl>
                <span v-show="fun.isTextEmpty(showTitle)">选择分类</span>
              </div>
              <div style="overflow-y: scroll;max-height: 32vh;">
                <dl>
                  <dt v-for="(Secondary, index) in list.recommend"
                      :key="index"
                      :class="
                    Secondary.id == secondaryId ? 'addClass' : 'removeClass'
                  "
                      @click.stop="chooseSecondary(Secondary)">
                    {{ Secondary.name }}
                  </dt>
                </dl>
                <template v-if="list.set.cat_level == '3' && !fun.isTextEmpty(threeInfo)">
                  <p class="threeTitle">三级分类</p>
                  <dl>
                    <dt v-for="(three, indexs) in threeInfo"
                        :key="indexs"
                        :class="three.id == threeId ? 'addClass' : 'removeClass'"
                        @click="chooseThree(three.id)">
                      {{ three.name }}
                    </dt>
                  </dl>
                </template>
              </div>

              <p v-if="fun.isTextEmpty(list.recommend)">暂无其他分类</p>
            </van-collapse-item>
          </van-collapse>
        </div>

        <div class="goodsList"
             ref="goodsWrapper"
             style="overflow:hidden;">
          <div class="coverLayer"
               v-if="this.activeName == '1'"
               @click="change"></div>
          <div>
            <div class="goodWrapper"
                 v-if="!this.fun.isTextEmpty(foodInfo)">
              <ul class="list"
                  v-for="(good, indexs) in foodInfo"
                  :key="indexs"
                  @click="gotoGoods(good.goods_id)">
                <div class="img">
                  <img :src="good.thumb" />
                </div>
                <li class="goods-info">
                  <ul class="info-class">
                    <li class="info_a"
                        style="-webkit-box-orient: vertical;">
                      {{ good.title | escapeTitle }}
                    </li>
                    <li class="info_b">
                      已售{{ good.show_sales + good.virtual_sales}}{{ good.sku }}
                    </li>
                    <li class="info_c">
                      <span class="price"
                            v-show="!good.has_option"><small>¥</small>{{ good.vip_level_status&&good.vip_level_status.status==1?good.vip_level_status.word:good.price }}</span>
                      <span class="price"
                            v-show="good.has_option && (!good.vip_level_status || good.vip_level_status.status == 0)"><small>¥</small>
                            <small v-if="good.max_price!=good.min_price">{{ good.max_price }}-{{
                              good.min_price}}</small>
                            <small v-if="good.max_price==good.min_price">{{ good.max_price }}</small>
                        </span>
                      <span class="price"
                            v-if="good.has_option && (good.vip_level_status && good.vip_level_status.status == 1)"><small>¥</small>
                        {{good.vip_level_status.word}}
                      </span>
                      <div class="select"
                           v-if="good.has_option != 1 && good.plugin_id != 40">
                        <transition name="fade">
                          <i v-if="goodsCarts[good.id]"
                             class="iconfont icon-life-game-sign"
                             @click.stop="numberLeft(good.id)"></i>
                        </transition>
                        <input type="tel"
                               title="number"
                               v-if="
                            goodsCarts[good.id] &&
                              !goodsCarts[good.id].option_str
                          "
                               @click.stop
                               v-model.lazy="goodsCartsTotal[good.id].total"
                               @focus="clickCount(goodsCartsTotal[good.id].total)"
                               @blur="
                            changeCount(
                              goodsCarts[good.id].id,
                              goodsCartsTotal[good.id].total,0,good
                            )
                          " />
                        <span v-if="
                            goodsCarts[good.id] &&
                              goodsCarts[good.id].option_str
                          "
                              @click.stop>{{ goodsCartsTotal[good.id].total }}</span>
                        <i @click.stop="numberRight(good.id,good.stock,good)"
                           class="iconfont icon-life-game-plus"></i>
                      </div>
                      <!-- 分类页返回了plugin_id:0||商城商品，plugin_id：40||租赁，plugin_id：92||供应商商品 -->
                      <div class="select optionClass leaseBox"
                           v-if="good.has_option == 1 && good.plugin_id != 40">
                        <p @click.stop="addGood(good)">选规格</p>
                        <i v-if="!fun.isTextEmpty(goodsCartsTotal[good.id])">{{
                          goodsCartsTotal[good.id].total
                        }}</i>
                      </div>
                      <span class="select leaseBox"
                            v-if="good.plugin_id == 40">
                        去租赁
                      </span>
                    </li>
                    <div class="price"
                         v-show="good.is_open_micro==1">会员价:￥{{good.price_level==1?good.vip_price:good.vip_next_price}}</div>
                  </ul>
                </li>
              </ul>
              <div class="space">{{ LoadMoreTest }}</div>
            </div>
            <div v-if="this.fun.isTextEmpty(foodInfo)">
              <img src="../../assets/images/no-more-product.png"
                   alt=""
                   style="width:5rem;margin-top:6rem;" />
            </div>
            <span id="loadMore"
                  style="display: inline-block;width:100%;height: 5rem;"></span>
          </div>
        </div>
      </div>
    </div>
    <div id="rootlists"
         ref="menu">
      <ul id="rootList"
          v-if="onelist">
        <li @click="bpfun"
            v-if="brandShow=='0'"><span>推荐品牌</span></li>
        <li @click="allList"
            v-if="categoryShow=='0'"
            :class="{ active: active2 }">
          <span>推荐分类</span>
        </li>
        <li v-for="(item, index) in onelist"
            :key='index'
            :class="{ active: active == index }"
            @click="tabsa(index, item)">
          <span>{{ item.name }}</span>
        </li>
        <div style="height: 3.125rem;"></div>
      </ul>
    </div>
    <!--选规格-->
    <yd-popup v-model="show2"
              position="center">
      <div class="spec_box q5"
           :style="{width: fun.getPhoneEnv() == 3 ? '375px' : ''}">
        <h3>
          {{ popTitle }}
          <i @click.stop="close"
             class="iconfont icon-close11"></i>
        </h3>
        <div style="height:2.5rem;"></div>
        <div class="spec_a"
             v-for="(spec,i) in goodsInfo.has_many_specs"
             :key='i'>
          <h5>{{ spec.title }}：</h5>
          <ul class="option">
            <li @click.stop="selectSpecs(item, item.id)"
                v-for="(item,i) in spec.has_many_specs_item"
                :key='i'
                :class="specid.indexOf(item.id) >= 0 ? 'cur' : ''">
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div style="height:3.4375rem;"></div>
        <div class="add_car">
          <ul class="car_btn">
            <li class="left"><span>¥</span>{{ popPrice }}</li>
            <li class="right">
              <span v-show="!popNum&&popStock>=1" @click.stop="submitAction">加入购物车</span>
              <span v-show="popStock<=0" style="background:#999999;">库存不足</span>
            </li>
            <div class="Box"
                 v-show="popNum >= 1">
              <i class="iconfont icon-store_reduceLine"
                 @click.stop="changeCount(popCard.id, popNum - 1, -1)"></i>
              <label class="show">{{ popNum }}</label>
              <i class="iconfont icon-store_plus"
                 @click.stop="changeCount(popCard.id, popNum + 1, 1)"></i>
            </div>
          </ul>
        </div>
      </div>
    </yd-popup>
    <div style="height: 2.8125rem;"></div>
  </div>
</template>

<script>
import category from "./category_controller";
export default category;
</script>

<style lang="scss" rel="stylesheet/scss">
#category {
  .catagoryBox {
    .van-cell__title {
      overflow: hidden;
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/category.scss";
#category {
  #rootlists,
  #category-content {
    height: 92vh;
  }
  .spec_box {
    background: #fff;
    width: 20.625rem;
    height: 24.375rem;
    border-radius: 0.625rem;
    padding-bottom: 3.4375rem;
    h3 {
      border-radius: 0.625rem 0.625rem 0 0;
      width: 100%;
      background-color: #fff;
      position: fixed;
      line-height: 2.75rem;
      border-bottom: solid 0.0625rem #ebebeb;
      font-size: 16px;
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /*规定段落中的文本不进行换行 */
      padding-right: 15%;
      padding-left: 5%;
      text-align: left;
      i {
        position: absolute;
        right: 0.875rem;
        line-height: 2.75rem;
        color: #999;
        font-size: 1.125rem;
      }
    }
    .spec_a {
      margin-top: 0.625rem;
      background: #fff;
      h5 {
        display: block;
        line-height: 2.5rem;
        text-align: left;
        padding-left: 1.25rem;
      }
      .option {
        display: flex;
        padding: 0 1.25rem;
        flex-wrap: wrap;
        .cur {
          border: solid 0.0625rem #f15353;
          background: #faf0f0;
        }
        li {
          padding: 0 6px;
          min-height: 1.875rem;
          line-height: 1.875rem;
          margin-right: 0.625rem;
          margin-bottom: 0.625rem;
          background: #f5f5f5;
          border: solid 0.0625rem #ebebeb;
          border-radius: 0.1875rem;
        }
      }
    }
    .add_car {
      width: 100%;
      height: 3.4375rem;
      line-height: 3.4375rem;
      background-color: #fff;
      border-top: solid 0.0625rem #ebebeb;
      position: fixed;
      bottom: 0;
      border-radius: 0 0 0.625rem 0.625rem;
      .car_btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.875rem;
        .left {
          color: #f15353;
          font-size: 16px;
          text-align: left;
          flex: 0 0 13rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            font-size: 16px;
          }
        }
        .right span {
          display: block;
          width: 5.5625rem;
          height: 1.875rem;
          line-height: 1.875rem;
          border-radius: 1rem;
          background: #f15353;
          color: #fff;
          font-size: 14px;
        }
        .Box {
          position: absolute;
          bottom: 0.625rem;
          right: 0.625rem;
          display: flex;
          i {
            font-size: 26px;
            width: 28px;
            height: 1.75rem;
            line-height: 1.75rem;
            font-size: 26px;
            color: #f15353;
          }
          .icon-store_reduceLine {
            color: #aaaaaa;
          }
          label {
            right: 2.1875rem;
            color: #333333;
            font-size: 12px;
            padding: 0;
            width: 1.5rem;
            height: 1.75rem;
            overflow: hidden;
            display: inline-block;
            text-align: center;
            line-height: 1.75rem;
            vertical-align: top;
            background-origin: content-box;
            background-color: transparent;
          }
        }
      }
    }
  }
  #carcontent2 {
    color: #686868;
    margin-bottom: 3.75rem;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .branch {
      margin: 0 8px;
      a {
        display: inline-block;
        height: 100%;
      }
    }
    .catagoryBox {
      position: relative;
      height: 2.8125rem;
      z-index: 999;
      .threeTitle {
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: left;
      }
      dl {
        display: flex;
        flex-wrap: wrap;
        dt {
          height: 2.1875rem;
          line-height: 2.1875rem;
          padding: 0 1rem;
          border: solid 0.0625rem rgb(229, 229, 229);
          border-radius: 0.25rem;
          margin-right: 0.625rem;
          margin-bottom: 0.625rem;
        }
        .addClass {
          border: solid 0.0625rem rgb(255, 73, 73);
          color: #f15353;
        }
        // dt:first-of-type {
        //   margin-left: 0;
        // }
      }
      .activetitle {
        overflow-x: auto;
        dl {
          flex-wrap: nowrap;
          dt {
            flex-shrink: 0;
            margin-bottom: 0;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
    .goodsList {
      background: #fff;
      position: relative;
      flex: 1;
      .coverLayer {
        //遮盖层
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        z-index: 99;
      }
      .goodWrapper {
        height: 100%;
        padding-left: 0.75rem;
      }
      .goodWrapper::after {
        display: block;
        background: transparent;
        content: " ";
        width: 100%;
        height: 3.625rem;
      }
      .space {
        width: 100%;
        height: 8.625rem;
        margin-top: 0.5rem;
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
          // margin-right: 0.625rem;
          img {
            width: 100%;
          }
        }
        .goods-info {
          width: 12.0625rem;
          text-align: left;
          padding-left: 0.625rem;
          .info-class {
            .info_a {
              margin-bottom: 0.25rem;
              line-height: 1.25rem;
              font-size: 0.9375rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              color: #000000;
            }
            .info_b {
              color: #8c8c8c;
              line-height: 1.25rem;
              // margin-bottom: 0.125rem;
            }
            .info_c {
              display: flex;
              justify-content: space-between;
              .price {
                color: #f15353;
                font-size: 14px;
                font-weight: bold;
                line-height: 1.5rem;
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
              .leaseBox {
                padding: 0 0.5rem;
                background: #f15353;
                color: #ffffff;
                line-height: 1.5rem;
                border-radius: 1rem;
                font-size: 12px;
              }
              .optionClass {
                position: relative;
                i {
                  width: 1rem;
                  height: 1rem;
                  line-height: 1rem;
                  font-size: 12px;
                  position: absolute;
                  top: -8px;
                  right: -5px;
                  background-color: #ff5d5c !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
