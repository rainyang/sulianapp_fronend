<template>
  <div class="cart"
       id="cart"
       :class="[this.fun.getPhoneEnv() == 3?'pcStyleCart':''] ">
    <c-title :hide="false"
             text="购物车">
      <template slot="edit"
                v-if="tabActive==='rent'&&isShowListRent">
        <div class="to-edit"
             @click="onRentCartDelete">
          {{ !rentDelete ? "编辑" : "完成" }}
        </div>
      </template>
      <template slot="edit"
                v-if="tabActive==='pay'&& isShowList">
        <div class="to-edit"
             @click="onCartDelete">
          {{ !cartDelete ? "编辑" : "完成" }}
        </div>
      </template>
    </c-title>
    <div style="height:40px;"></div>
    <mt-navbar v-model="tabActive"
               style="margin-bottom:0.625rem;">
      <mt-tab-item id="rent"
                   v-if="isRentTab">租赁</mt-tab-item>
      <mt-tab-item id="pay"
                   v-if="isRentTab">购买</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="tabActive">
      <mt-tab-container-item id="rent"
                             v-if="isRentTab">
        <div class="rent-box">
          <!--<div class="edit" @click="onRentCartDelete" v-if="isShowListRent">-->
          <!--<i class="fa fa-pencil-square-o"></i>-->
          <!--<span>{{ !rentDelete ? "编辑" : "完成" }}</span>-->
          <!--</div>-->
          <div v-if="isShowListRent"
               class="rent_main">
            <van-checkbox-group v-model="rentCheckList"
                                @change="rentAllSelectHandle">
              <div class="rent-one"
                   v-for="(item,i) in rentGoods" :key='i'
                   @click.stop="selectBolfun(0)">
                <template v-if="item.goods.stock_status == 0 || rentDelete">
                  <van-checkbox checked-color="#f15353"
                                :key="item"
                                :name="item"
                                @change="selectGood">&nbsp;</van-checkbox>
                </template>
                <template v-else-if="item.goods.stock_status == 2">
                  <span class="gray">下架</span>
                </template>
                <template v-else>
                  <span class="gray">失效</span>
                </template>

                <div class="info-box">
                  <div class="img"
                       @click="toRentDetail(item)">
                    <img :src="item.goods.thumb" />
                  </div>
                  <div class="info">
                    <h1 @click="toRentDetail(item)"
                        style="-webkit-box-orient: vertical;">
                      {{ item.goods.title }}
                    </h1>
                    <template v-if="item.goods.stock_status == 0">
                      <ul class="day"
                          v-if="item.has_one_lease_goods">
                        <li>
                          吊牌价：￥{{ item.goods.market_price }}元
                        </li>
                        <li v-if="
                            item.has_one_lease_goods.is_rights == 1
                          ">
                          <i class="iconfont icon-rent"></i>
                        </li>
                      </ul>
                      <div class="bottom_sum">
                        <ul class="member">
                          <li>
                            <small>￥</small>
                            <b>{{ item.goods.price }}</b>&nbsp;<small>/天</small>
                          </li>
                        </ul>
                        <div class="num">
                          <div class="leftnav"
                               @click="rentDeleteNumber(item)">
                            -
                          </div>
                          <input type="text"
                                 disabled="false"
                                 class="shownum"
                                 v-model="item.total" />
                          <div class="rightnav"
                               @click="rentAddNumber(item)">
                            +
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div style="text-align: left;color: #999999;">该商品已不能租赁</div>
                    </template>
                  </div>
                </div>
              </div>
            </van-checkbox-group>
            <div class="recommend-box"
                 v-if="!this.fun.isTextEmpty(hotRentList)">
              <h1>近期热租</h1>
              <div class="line"></div>
              <h2>看看其他宝宝都再想什么</h2>
            </div>
            <div class="box"
                 v-if="!this.fun.isTextEmpty(hotRentList)">
              <div class="left"
                   v-for="(item,i) in hotRentList" :key='i'
                   @click="gotoHotRentDetail(item.id)">
                <div class="goods-box">
                  <div class="img"><img :src="item.thumb"
                         lazy="loaded" /></div>
                  <div class="text">
                    <span><small>￥</small>
                      {{ item.price }}
                      <small>/天起</small>
                    </span>
                    <ul class="sum">
                      <li>吊牌价：￥{{ item.market_price }}元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart_pay"
                 v-show="!rentDelete">
              <div class="all">
                <div class="checkall"
                     @click.stop="selectBolfun(1)">
                  <van-checkbox name="全选"
                                checked-color="#f15353"
                                @change="rentAllSelect"
                                v-model="rentCheckAll">全选</van-checkbox>
                </div>
              </div>

              <ul class="text">
                <li class="freight">
                  <span style="color:#999; font-size:12px;">(不含运费)</span>
                </li>
                <li>
                  合计：<span style="font-size:14px;color:#f15353">￥</span><span class="totalprice">{{ rentTotal }}</span>
                </li>
              </ul>
              <div class="paysub "
                   @click="rentSubmitGoods">
                结算
                <small class="total"
                       style="font-size:12px">({{ rentCount }})
                </small>
              </div>
            </div>
          </div>
        </div>
        <!--合计  -->
        <div class="cart_del"
             v-show="rentDelete">
          <div class="checkall"
               @click.stop="selectBolfun(1)">
            <van-checkbox name="全选"
                          checked-color="#f15353"
                          @change="rentAllSelect"
                          v-model="rentCheckAll">全选</van-checkbox>
          </div>
          <span @click="rentDeleteGoods">删除</span>
        </div>
        <div id="nocard"
             v-if="!isShowListRent">
          <div class="card_no">
            <img src="../../assets/images/cart.png"
                 style="width: 6.25rem;height: 6.25rem"
                 alt="购物车">
            <!--<i class="fa fa-shopping-cart" style="font-size:6.25rem;"></i>-->
            <br />
            <span style="line-height:1.125rem; font-size:16px;">
              购物车快饿瘪了
            </span>
            <br />主人快去给我找点东西吧
          </div>
          <div class="card_no_menu">
            <router-link :to="fun.getUrl('member', {})">
              <div class="card_no_nav">个人中心</div>
            </router-link>
            <router-link :to="fun.getUrl('home', {})">
              <div class="card_no_nav togo">去逛逛</div>
            </router-link>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="pay">
        <!--<div id="edit" @click="onCartDelete" v-if="isShowList">-->
        <!--<i class="fa fa-pencil-square-o"></i>-->
        <!--<p>{{ !cartDelete ? "编辑" : "完成" }}</p>-->
        <!--</div>-->
        <div class="cart_main"
             v-if="isShowList">
          <van-checkbox-group v-model="checkList"
                              @change="allSelectHandle">
            <div class="cart_good"
                 v-for="(good, index) in goods"
                 v-if="good.goods"
                 @click.stop="selectBolfun(0)" :key='index'>
              <div class="ico"
                   v-show="edit">
                <i class="fa fa-trash-o"></i>
              </div>
              <template v-if="good.goods.stock_status == 0 || cartDelete">
                <van-checkbox checked-color="#f15353"
                              :key="good"
                              :name="good"
                              @change="selectGood">&nbsp;</van-checkbox>
              </template>
              <template v-else-if="good.goods.stock_status == 2">
                <span class="gray">下架</span>
              </template>
              <template v-else>
                <span class="gray">失效</span>
              </template>

              <div class="right">
                <div class="img"
                     @click="toGoodsInfo(good)">
                  <img :src="good.goods.thumb" />
                </div>
                <div class="info">
                  <ul class="inner">
                    <h1 class="name"
                        @click="toGoodsInfo(good)"
                        style="-webkit-box-orient: vertical;">
                      {{ good.goods.title|escapeTitle }}
                    </h1>
                    <li class="introduction">{{ good.option_str }}</li>
                  </ul>
                  <template v-if="good.goods.stock_status == 0">
                    <div class="other">
                      <div class="price">
                        ￥<span>{{ good.goods.price }}</span>
                      </div>
                      <div class="num">
                        <div class="leftnav"
                             @click.stop="numberLeft(index)">
                          -
                        </div>
                        <input type="number"
                               class="shownum"
                               v-model.lazy="good.total"
                               @blur="changeCount(good.id, good.total, index)" />
                        <div class="rightnav"
                             @click.stop="numberRight(index)">
                          +
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div style="text-align: left;color: #999999;">该商品已不能购买</div>
                  </template>
                </div>
              </div>
            </div>
          </van-checkbox-group>
          <div class="cart_pay"
               v-show="!cartDelete">
            <div class="all"
                 sel="1">
              <div class="checkall"
                   @click.stop="selectBolfun(1)">
                <van-checkbox checked-color="#f15353"
                              v-model="checkAll"
                              :checked="checkAll"
                              name="全选"
                              @change="allSelect">全选</van-checkbox>
                <span class="t"></span>
              </div>
            </div>
            <ul class="text">
              <li class="freight">
                <span style="color:#999; font-size:12px;">(不含运费)</span>
              </li>
              <li>
                合计：<span style="font-size:14px;color:#f15353;">￥</span><span class="totalprice">{{ total }}</span>
              </li>
            </ul>
            <div class="paysub "
                 @click="submitGoods">
              结算<small class="total"
                     style="font-size:12px">({{ count }})</small>
            </div>
          </div>
        </div>
        <div class="cart_del"
             v-show="cartDelete">
          <div class="checkall"
               @click.stop="selectBolfun(1)">
            <van-checkbox checked-color="#f15353"
                          v-model="checkAll"
                          :checked="checkAll"
                          name="全选"
                          @change="allSelect">全选
            </van-checkbox>
          </div>
          <span @click="deleteGoods">删除</span>
        </div>
        <div id="nocard"
             v-if="!isShowList">
          <div class="card_no">
            <img src="../../assets/images/cart.png"
                 style="width: 6.25rem;height: 6.25rem"
                 alt="购物车">
            <!--<i class="fa fa-shopping-cart" style="font-size:6.25rem;"></i>-->
            <br /><span style="line-height:1.125rem; font-size:16px;">购物车快饿瘪了</span>
            <br />主人快去给我找点东西吧
          </div>
          <div class="card_no_menu">
            <router-link :to="fun.getUrl('member', {})">
              <div class="card_no_nav">个人中心</div>
            </router-link>
            <router-link :to="fun.getUrl('home', {})">
              <div class="card_no_nav togo">去逛逛</div>
            </router-link>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <div style="height:6.13rem;"></div>
  </div>
</template>

<script>
import cart from "./cart_controller";
export default cart;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cart.scss";
.cart_main {
  background: #fff;
}
</style>
