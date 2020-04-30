<template>
  <div id="all">
    <c-title
      hide="true"
      text="home"
      :eteos="fun.setWXTitle($store.state.temp.item.janst)"
    ></c-title>
    <section class="current">
      <article class="scrolling">
        <div class="content scroller">
          <div
            class="storeHomeNew  store-industry-1"
            style="min-height: 40.5625rem;"
            :style="{ position: showStoreInfo ? 'relative' : 'fixed' }"
          >
            <div class="yq clearfix" @click.stop>
              <img class="qy" :src="store.store_thumb" />
              <div class="qz">
                <div class="a1r clearfix">
                  <h2 class="r0">{{ store.store_name }}</h2>
                </div>
                <p class="yr">{{ store.dispatch }}</p>
                <p class="yr" style="margin-top: 0.3125rem;">
                  <span class="a25">{{ store.business_hours }}</span>
                </p>
              </div>
              <div class="a02 " data-focus="0">
                <!--<i class="a03 "></i>-->
              </div>
              <div
                class="yy yz cashier-buy"
                @click.stop="goBuy"
                style=""
                v-if="store.is_open_cashier == 1"
              >
                <i class="fa fa-money" aria-hidden="true"></i>
                <span style="margin-left:0.125rem">买单</span>
              </div>
              <!-- 优惠券 -->
              <div class="header_coupon" @click.stop="gotoCupcon">
                <div class="left">
                  <span class="name">券</span>
                </div>
                <div class="right">
                  <span>去领券</span>
                </div>
                <i class="fa fa-angle-right"></i>
              </div>
              <div class="a0v">
                <ul class="dh">
                  <li class="dj a18" v-if="store.affiche">
                    <i class="ji" style="background:#5FBC65">公告</i>
                    <span class="di">{{ store.affiche }}</span>
                  </li>
                </ul>
                <div class="vo" @click.stop="showStore">
                  <span>查看店铺</span><i class="a0w yj"></i>
                </div>
              </div>
              <!--<div class="a01">
                  <div class="noticeTips" clstag="pageclick|keycount|store_status_click_20160729|1">
                      <i>公告</i>
                      <div class="tipsAuto">
                          <div class="tipsFont">14天包退，生鲜无农药残留，购物无忧。</div>
                      </div>
                  </div>
              </div>-->
            </div>
            <div class="zr">
              <!--<div class="store-new-sales-warp">
                  <div class="yt"><h2 class="ys">店铺优惠券</h2></div>
                  <div class="z0">
                      <div class="z1">
                          <ul class="a0b">
                              <li class="   clearfix" _type="storeHomeInfo">
                                  <div class="a9d">
                                      <div class="a0f">
                                          <div class="a24">
                                              <div class="a9e">
                                                  <var class="a9g">满29~100元享折扣</var>
                                              </div>
                                              <div class="a9f">2017.09.01-2017.09.30</div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="a0g">
                                      <span>
                                          <var class="a0x">9.5</var>
                                          <span class="a0y">折</span>
                                      </span>
                                  </div>
                                  <div class="a0e">
                                      <div class="a0d">
                                          <div class="a16">领券</div>
                                      </div>
                                  </div>
                              </li>
                              <li class="clearfix">
                                  <div class="a9d">
                                      <div class="a0f">
                                          <div class="a24">
                                              <div class="a9e">
                                                  <var class="a9g">满30~100元享折扣</var>
                                              </div>
                                              <div class="a9f">2017.09.14-2017.09.30</div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="a0g">
                                      <span>
                                          <var class="a0x">8.8</var>
                                          <span class="a0y">折</span>
                                      </span>
                                  </div>
                                  <div class="a0e">
                                      <div class="a0d">
                                          <div class="a16">领券</div>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>-->
              <div class="yu yw" v-if="store.comment.new_comment">
                <div class="yt">
                  <h2 class="ys">店铺评价</h2>
                </div>
                <ul class="ym a2">
                  <li>
                    <div class="a2 commentWrap clearfix">
                      <dl class="scoreWrap k">
                        <dt>{{ store.comment.average_score }}</dt>
                        <dd>综合评分</dd>
                      </dl>
                      <dl class="numberWrap" style="">
                        <dt>{{ store.comment.comment_total }}</dt>
                        <dd>评论数</dd>
                      </dl>
                    </div>
                  </li>
                  <li class="yx clearfix">
                    <ul class="evaluateListWrap">
                      <li class="list_li">
                        <div class="headerPic">
                          <img
                            :src="store.comment.new_comment.head_img_url"
                            class="pic"
                          />
                        </div>
                        <dl class="evaluateList">
                          <dt>
                            <div class="pName">
                              {{ store.comment.new_comment.nick_name }}
                            </div>
                            <span class="DateTime">
                              {{ store.comment.new_comment.created_at }}
                            </span>
                          </dt>
                          <dd>
                            <span class="a79 clearfix">
                              <cStar
                                :score="store.comment.average_score"
                              ></cStar>
                            </span>
                            <div class="h5">
                              <i class="peisongMark"></i>
                              <div class="serviceWrap">
                                <span class="pieceFont">
                                  {{ store.comment.new_comment.content }}
                                </span>
                              </div>
                            </div>
                            <!--<div class="productWrap">
                                <i class="fingerMark"></i>
                                <div class="singleProWrap">
                                    <a class="singlePro">NFC 100%鲜果冷鲜压榨橙汁 300ml</a>
                                    <a  class="singlePro">乐事无限组合包104克3罐(原味+黄瓜+青柠)312g/罐</a>
                                    <a  class="singlePro">ViTa/维他 柠檬味茶饮料 250ml*6盒</a>
                                    <a  class="singlePro">进口超甜蕉 &gt;=700g</a>
                                    <a  class="singlePro">Great Value/惠宜 罐装腰果 280g</a>
                                    <a  class="singlePro">益力多 乳酸菌乳饮品 500ml（100ml*5瓶）</a>
                                    <a href="#goodsDetails/skuId:2003117737/storeId:11647212/orgCode:81372" class="singlePro">香满园 御品国珍五常香米 10kg</a>
                                    <a href="#goodsDetails/skuId:2003117410/storeId:11647212/orgCode:81372" class="singlePro">Great Value/惠宜 咸味花生 350g</a>
                                </div>
                            </div>-->
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="yu">
                <div class="yt"><h2 class="ys">店铺信息</h2></div>
                <ul class="ym a2">
                  <!--<li class="a0o">
                      <div class="a2 clearfix a0t">
                          <a class="a0p honor-box-1 k " style="background-image:url('https://img30.360buyimg.com/mobilecms/jfs/t5653/276/1587557694/3331/3623265f/5927cbe7N6bb0cdbe.png')">
                              <span class="r9">14天包退</span>
                          </a>
                      </div>
                  </li>-->
                  <li class="yv clearfix">
                    <div class="a0u clearfix">
                      <span class="yn">商品数量：</span
                      ><var class="yo">{{ store.goods_total }}件</var>
                    </div>
                    <div class="a0u clearfix">
                      <span class="yn">月销单量：</span
                      ><var class="yo">{{ store.order_count }}单</var>
                    </div>
                    <div class="a0u clearfix">
                      <span class="yn">营业时间：</span
                      ><var class="yo">{{ store.business_hours }}</var>
                    </div>
                    <div class="a0u clearfix">
                      <span class="yn">门店地址：</span
                      ><var class="yo">{{ store.store_address }}</var>
                    </div>
                    <div class="a0u clearfix">
                      <span class="yn">门店电话：</span
                      ><a @click.stop="tel" class="telPhone">
                        {{ store.store_mobile }}
                      </a>
                    </div>
                  </li>
                  <!--<li class="yv zt h clearfix"><a class="clearfix zv"><span class="yn a20">商家资质</span><strong class="zu yj"></strong></a></li>-->
                  <!--<li class="yv zt h clearfix"><a class="clearfix zv"><span class="yn">举报商家得红包</span>最高奖100元<strong class="zu yj"></strong></a></li>-->
                </ul>
              </div>
            </div>
          </div>

          <div class="z4 z5" v-show="showGoods">
            <!-- 样式一 -->
            <div class="uw vr" @click.stop="searchJump" v-if="false">
              <div class="vs">
                <i class="iconfont icon-sousuo"></i>
                <span class="w0">搜索店内商品</span>
              </div>
              <div class="car-btn">
                <i class="iconfont icon-card_cap"></i>
                <button type="button">一卡通</button>
              </div>
            </div>
            <!-- 样式二 -->
            <div class="uw vr" @click.stop="searchJump">
              <div class="vs search_b">
                <i class="iconfont icon-sousuo"></i>
                <span class="w0">搜索店内商品</span>
              </div>
            </div>
            <!-- ====== 商品列表 ==== -->
            <div class="goods">
              <div class="menu-wrapper" ref="menuWrapper">
                <ul style="overflow:hidden;padding-bottom: 60px;">
                  <li
                    class="z7 menu-item"
                    v-for="(items, index) in category"
                    :class="{ current_menu: index === currentCategoryIndex }"
                    ref="list_li_menulist"
                    :key="items.id"
                  >
                    <strong
                      class="za a2 k"
                      v-if="items.enabled"
                      @click.stop="selectCategoryMenu(items, $event)"
                    >
                      <em
                        class="yj z8"
                        v-if="currentCategoryIndex == index"
                      ></em>
                      <var class="zg" style="margin-left:6px;">
                        {{ items.name }}
                      </var>
                    </strong>

                    <strong
                      class="zd"
                      style="height:auto;width:84px;"
                      v-if="currentCategoryIndex == index"
                    >
                      <span
                        @click.stop="selectMenu(item.id, $event)"
                        class="zc h ze white"
                        :class="{ active: item.id == currentIndex }"
                        v-for="(item,i) in items.childrens"
						:key='i'
                        >{{ item.name }}
                      </span>
                    </strong>
                  </li>
                </ul>
                <div style="height: 30px"></div>
              </div>

              <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
                <ul>
                  <li class="food-list" :key='i' v-for="(good,i) in goods">
                    <div v-for="(item,i) in good" class="food-list-hook" :key='i'>
                      <h1 class="food_list_title">
                        {{ item.name }}({{ item.goods.length }})
                      </h1>
                      <!-- 标题 -->
                      <ul>
                        <li
                          class="food-item"
                          v-for="(food,i) in item.goods" :key='i'
                          @click.stop="goToGoodsO2O(food)"
                        >
                          <div class="icon">
                            <img width="57" height="57" :src="food.thumb" />
                          </div>
                          <div class="content" style="margin-left:10px;">
                            <p class="description">{{ food.title }}</p>
                            <div class="sell-info">
                              <span class="sellCount"
                                >已售{{ food.show_sales+food.virtual_sales}}{{ food.sku }}</span
                              >
                            </div>
                            <div class="price" style="margin-top:7px;">
                              <span class="newPrice">
                                <span class="unit">￥</span
                                >{{ food.price }}</span
                              >
                            </div>
                          </div>
                          <!-- ============================ -->
                          <!-- <a class="linksGoods a2">
                              <span class="a9l" @click.stop="goToGoodsO2O(food)">
                                <img style="width:65px;height:65px;display:block;" :src="food.thumb" class="pic" />
                              </span>
                              <dl @click.stop="goToGoodsO2O(food)">
                                <dt>{{ food.title }}</dt>
                                <dd class="a9n">
                                  <strong class="line_pre"
                                    >已售{{ food.show_sales }}{{ food.sku }}
                                  </strong>
                                </dd>
                                <dd></dd>
                                <dd class="a11">
                                  <label><em>￥</em>{{ food.price }}</label>
                                </dd>
                              </dl>
                            </a> -->
                          <!-- ===================== -->
                          <!-- 选规格 -->
                          <div class="spec_btn" v-if="food.has_option === 1">
                            <span
                              class="goods-num"
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              v-if="goodsCarts[food.id]"
                              >{{ goodsCartsTotal[food.id].total }}</span
                            >
                            <yd-button
                              type="primary"
                              @click.stop.native="addGood(food)"
                              >选规格
                            </yd-button>
                          </div>
                          <div
                            class="Box"
                            v-if="
                              !store.operating_state &&
                                showDis &&
                                food.has_option !== 1
                            "
                            @click.stop
                          >
                            <!-- <span
                              class="reduce"
                              @click.stop="updateCart(goodsCarts[food.id].id, -1)"
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              >减
                            </span> -->
                            <span
                              class="reduce"
                              @click.stop="numberLeft(food,goodsCarts[food.id])"
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              >减
                            </span>
                            <!-- <label
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              v-if="goodsCarts[food.id]"
                              >{{ goodsCarts[food.id].total }}
                            </label> -->
                            <input
                              :id="`goodsInputs${food.id}`"
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              v-if="goodsCarts[food.id]"
                              type="number"
                              class="goodsNumber"
                              v-model.lazy="goodsCarts[food.id].total"
                              @focus="clickCount(goodsCarts[food.id])"
                              @blur="changeCount(goodsCarts[food.id],food)"
                            />
                            <span class="add" @click.stop="numberRight(food,goodsCarts[food.id])"
                              >加
                            </span>
                          </div>
                        </li>
                        <!--<div v-if="item.isshow" style="margin:50px;">该分类下没有商品~~</div>-->
                      </ul>
                    </div>
                  </li>

                  <div
                    class="loadNomore"
                    v-if="loading"
                    style="margin: 0 auto 2.5rem;text-align: center;width: 100%;height: 5.625rem;"
                  >
                    <img
                      style="width: 5rem;height: 3.75rem;"
                      src="../../../assets/images/no-more-product.png"
                    />
                  </div>
                  <div style="height:70px;"></div>
                </ul>
              </div>
            </div>
            <!-- =======商品列表底部======= -->
          </div>
        </div>
      </article>

      <div
        class="z2"
        @click.stop="showGoodsInfo"
        v-show="showStoreInfo && !store.operating_state && showDis"
      >
        <i class="yj z3"></i><span>点击继续购物</span>
      </div>
      <div class="a2q" v-show="showGoods && !store.operating_state && showDis">
        <div class="a2w">
          <div></div>
        </div>
        <div class="a33">
          <p class="a34"></p>
          <ul class="a35"></ul>
        </div>
        <div class="a2z" v-show="!store.operating_state && showDis"></div>
        <a
          href="javascript:void 0;"
          @click.stop="goShowCart"
          v-show="!showCart"
          class="a2r show "
          :class="{ light: carts.length > 0 }"
        >
          <i v-show="carts.length > 0" class="a2s">{{ cartsNum }}</i>
        </a>
        <div class="a2t" :style="leftPrice">
          <div v-show="carts.length > 0">￥{{ cartsTotal }}</div>
          <div v-show="carts.length == 0" class="a2u">购物车是空的</div>
        </div>
        <a
          class="a2v"
          :class="{ disabled: goodsCarts.length == 0 }"
          @click.stop="goodsOrder(goodsCarts)"
          >去结算
        </a>
        <div class="minicart-content" :style="minicartStyle">
          <a
            href="javascript:void 0;"
            @click.stop="goShowCart"
            class="a2r incartcontent light"
            :class="showLogo"
          >
            <i class="a2s">{{ cartsNum }}</i>
          </a>
          <i class="a37"></i>
          <div class="a38 ">
            <span class="a4b a4c checked" @click.stop="lg">全选</span>
            <p class="a4e">(已选{{ cartsNum }}件)</p>
            <a href="javascript:void 0;" class="a39" @click.stop="clearCart"
              >清空购物车
            </a>
          </div>
          <div class="a3b">
            <div class="a3m single">
              <div class="a3r single">
                <span></span>
                <div style="display:none"></div>
              </div>
              <div
                ref="cartWrapper"
                style="max-height: 19rem;overflow: hidden;"
              >
                <ul class="minicart-goods-list single">
                  <li class="a3o single" v-for="(item,index) in carts" :key='index'>
                    <span
                      class="a4b a3p checked"
                      @click.stop="checkCart(item.id)"
                    ></span>
                    <a class="a3s">
                      <table class="a3t">
                        <tbody>
                          <tr>
                            <td
                              style="width:3.875rem;"
                              @click.stop="goToGoodsO2O(item)"
                            >
                              <img class="a3u" :src="item.goods.thumb" />
                            </td>
                            <td>
                              <div class="a3x" @click.stop="goToGoodsO2O(item)">
                                {{ item.goods.title }}
                                <span v-if="item.option_str"
                                  >({{ item.option_str }})
                                </span>
                              </div>
                              <div class="a46" @click.stop="goToGoodsO2O(item)">
                                <!--<span class="a41" style="background-color:#fecc32">直降</span>-->
                                <div class="a3q">￥{{ item.goods.price }}</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </a>
                    <!-- <a
                      style=""
                      @click.stop="updateCart(item.id, -1)"
                      class="a3v"
                    ></a> -->
                    <a style="" @click.stop="numberLeft1(item,index)" class="a3v"></a>
                    <!-- <em style="" class="a3y">{{ item.total }}</em> -->
                    <input
                      type="number"
                      class="a3y"
                      :id="`itemIputs${index}`"
                      v-model="carts[index].total"
                      @focus="clickCount(item)"
                      @blur="changeCount(item)"
                      @click.stop
                    />
                    <!-- <a @click.stop="updateCart(item.id, 1)" class="a3w"></a> -->
                    <a @click.stop="numberRight1(item,index)" class="a3w"></a>
                  </li>
                </ul>
              </div>
              <div class="a3n single" style=""></div>
            </div>
          </div>
          <div style="height:3.0625rem;"></div>
          <div style="display:none" class="a4f"></div>
        </div>
        <div></div>
        <div
          class="a30"
          @click.stop="goShowCart"
          style="display: block;"
          v-if="showCart"
        ></div>
        <!-- <div class="a30" v-if="!showCart"></div> -->
      </div>
    </section>
    <div class="y5" @click.stop="showToolbar" style="bottom: 7.1875rem;">
      <div class="y6" v-show="toolbar">
        <router-link class="y8" :to="fun.getUrl('home')">
          首页
        </router-link>
        <!--<router-link class="ya" :to="fun.getUrl('cart')">
            购物车
        </router-link> -->
        <router-link class="yb" :to="fun.getUrl('orderlist', { status: '0' })">
          订单
        </router-link>
        <router-link class="yc" :to="fun.getUrl('member')">
          我的
        </router-link>
        <i class="yd"></i>
      </div>
    </div>

    <yd-popup v-model="show1" position="center" width="80%">
      <div style="background-color:#fff;">
        <p class="tips">
          商家休息中，暂不接受新订单
        </p>
        <p style="text-align: center;line-height: 2.5rem;">
          <yd-button @click.stop.native="show1 = false">我知道了</yd-button>
        </p>
      </div>
    </yd-popup>
    <!-- 过期 -->
    <yd-popup
      v-model="show8"
      close-on-masker="false"
      position="center"
      width="80%"
    >
      <div style="background-color:#fff;">
        <p class="tips">
          该商家已过期，去看看其他的吧
        </p>
        <p style="text-align: center;line-height: 2.5rem;">
          <yd-button @click.stop.native="goTOHome">我知道了</yd-button>
        </p>
      </div>
    </yd-popup>
    <!-- 选规格 -->
    <yd-popup
      v-model="show2"
      position="center"
      class="spec_popup"
      style="z-index:101"
    >
      <div class="spec_box q5" :style="{width: fun.getPhoneEnv() == 3 ? '375px' : ''}">
        <h3>
          {{ popTitle }}
          <i @click.stop="close" class="iconfont icon-close11"></i>
        </h3>
        <div style="height:2.5rem;"></div>
        <div class="spec_a" v-for="(spec,i) in goodsInfo.has_many_specs" :key='i'>
          <h5>{{ spec.title }}：</h5>
          <ul class="option">
            <li
              @click.stop="selectSpecs(item, item.id)"
              v-for="(item,i) in spec.specitem" :key='i'
              :class="specid.indexOf(item.id) >= 0 ? 'cur' : ''"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div style="height:3.4375rem;"></div>
        <div class="add_car">
          <ul class="car_btn">
            <li class="left"><span>¥</span>{{ popPrice }}</li>
            <li class="right" @click.stop="submitAction">
              <span v-show="!popNum">加入购物车</span>
            </li>
            <div class="Box" v-show="popNum >= 1">
              <span class="reduce show" @click.stop="updateCart(popCard.id, -1)"
                >减</span
              >
              <label class="show">{{ popNum }}</label>
              <span
                class="add"
                ref="spans"
                @click.stop="updateCart(popCard.id, 1)"
                >加</span
              >
            </div>
          </ul>
        </div>
      </div>
    </yd-popup>
    <!--  -->
  </div>
</template>

<script>
import home from "./store_controller";

export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../assets/css/new_store.css";

.coupon_box {
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0.625rem;
  overflow-x: scroll;
}
.box-left {
  position: relative;
  width: 10.625rem;
  height: 4.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #fff;
  margin-right: 0.625rem;
  display: inline-table;
}

.minicart-content {
  max-height: 28.75rem;
}

.tips {
  line-height: 3.5rem;
}
.box-left {
  position: relative;
  width: 10.625rem;
  height: 4.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #fff;
  margin-right: 0.625rem;
  display: inline-table;
}
.minicart-content {
  max-height: 28.75rem;
}

.search_b {
  width: 22.1875rem;
}

.list_box {
  overflow: hidden;
  height: 32.5rem;
}

.z6 {
  overflow-y: scroll;
}
.z8 {
  position: absolute;
  left: -5px;
  top: 0.6rem;
  width: 1.5rem;
  height: 1.375rem;
  background-position: -0.625rem -11.6875rem;
  transform: scale(0.9);
}
// better-scorll的css
.menu-item-selected {
  background: white;
  font-weight: 700;
  margin-top: -1px;
}
// .menu-item,
// .menu-item-selected {
//   position: relative;
//   display: table;
//   height: 54px;
//   line-height: 14px;
//   width: 56px;
//   padding: 0 12px;

//   &:last-child:after {
//     content: none;
//   }
// }
// .menu-item:after {
//   position: absolute;
//   content: "";
//   left: 12px;
//   width: 56px;
//   bottom: 0;
//   border-bottom: 1px solid rgba(7, 17, 27, 0.1);
// }
.text {
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 100;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: normal;
  line-height: 14px;
}
.iconMap {
  vertical-align: middle;
}
.foods-wrapper {
  flex: 1;
  background-color: #fff;
  margin-top: 0;
}
.food-list > h1 {
  height: 26px;
  line-height: 26px;
  padding-left: 12px;
  font-size: 14px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
  border-left: 2px solid #d9dde1;
}
.food-item {
  position: relative;
  display: flex;
  padding: 0.625rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.icon {
  flex: 0 0 57px;

  &:last-child {
    border-bottom: none;
  }
}
.content {
  flex: 1;
  // padding-left: 10px;
}
.content > h2 {
  margin: 2px 0 8px 0;
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
}
.sell-info,
.description {
  font-size: 14px;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 0.3125rem;
  max-height: 2.625rem;
  line-height: 1.3125rem;
  -webkit-line-clamp: 2;
  // color: rgb(147, 153, 159);
  // line-height: 10px;
}
.sellCount {
  margin-right: 4px;
  color: #999;
  font-size: 11px;
}
.price {
  font-size: 10px;
  font-weight: 700;
  line-height: 24px;
}
.newPrice {
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.unit {
  font-size: 10px;
  font-weight: normal;
}
.oldPrice {
  text-decoration: line-through;
  color: rgb(147, 153, 159);
  padding-left: 4px;
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;
  z-index: 20;
}
.goods {
  display: flex;
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 80px;
  width: 84px;
  background: #f3f5f7;
  height: 100%;
}
.menu-item {
  // display: table;
  // height: 54px;
  // width: 56px;
  // padding: 0 12px;
  // line-height: 14px;
}
.current_menu {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  color: #47b34f;
  background: #fff;
  font-weight: 700;
}
.foods-wrapper {
  flex: 1;
}
.goodsNumber{
  right: 2.1875rem;
  color: #333333;
  font-size: 12px;
  margin: 0.5625rem 0;
  //margin-top: 0.375rem;
  width: 2rem;
  height: 1.125rem;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  line-height: 1.125rem;
  vertical-align: top;
  -webkit-background-origin: content-box;
  background-origin: content-box;
  background-color: transparent;
  box-sizing: content-box;
  border-bottom: solid 0.0625rem #d9d9d9;
}
#all{
  .minicart-content{
    .a3b{
      .a3v{
        width: 2rem;
        height: 2rem;
        background-position: center -4.8rem;
        top: 1.8rem;
        right: 4.8125rem;
      }
      .a3w{
        width: 2rem;
        height: 2rem;
        top: 1.8rem;
        background-position: center 0.2rem;
      }
      input{
        height: 2rem;
        top: 1.8rem;
        border-bottom: solid 0.0625rem #d9d9d9;
      }
    }
  }
}
</style>
