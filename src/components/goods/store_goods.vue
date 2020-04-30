<template>
  <transition name="fade2">
    <div id="goods"
         v-show="showGood"
         :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
      <div id="navTab"
           :class="{ hoet: hoet }">
        <a class="nav1"
           :class="{ current: currentClass ==0 }"
           @click.stop="jump(0)">商品</a>
        <a class="nav1"
           :class="{ current: currentClass ==1 }"
           @click.stop="jump(1)">评价</a>
        <a class="nav1"
           :class="{ current: currentClass ==2 }"
           @click.stop="jump(2)">详情</a>
        <a class="nav1"
           :class="{ current: currentClass ==3 }"
           @click.stop="jump(3)" v-if="is_room == 1&&!fun.isTextEmpty(recordsList)">直播</a>
      </div>
      <div id="hoid"
           @click="goto"
           :class="{ hoet: hoet }">
        <div id="back">
          <i class="mintui mintui-back"></i>
        </div>
      </div>
      <div id="cart"
           @click="gotoCart"
           :class="{ hoet: hoet }"
           v-if="is_o2o">
        <div id="back">
          <i class="iconfont icon-ai-home"></i>
        </div>
      </div>
      <div id="member"
           @click="gotoMember"
           :class="{ hoet: hoet }">
        <div id="back">
          <i class="iconfont icon-wode-wode"></i>
        </div>
      </div>
      <div ref="onePage"
           id="onePage"
           style="overflow:hidden;">
        <div style="-webkit-overflow-scrolling: touch;"
             id="main">
          <viewer :images="goodsInfo.thumb_url"
                  style="background-color:#333;"
                  class="section">
            <c-myswipe v-if="goodsInfo.thumb_url"
                       :style="{height:(this.fun.getPhoneEnv() == 3?'375px':'100vw')}"
                       :pagination-visible="true"
                       :slides="goodsInfo.thumb_url"
                       :repeating="true"
                       :auto="0">
              <div v-if="!fun.isTextEmpty(goodsInfo.goods_video)">
                <video id="goods_vedio"
                       style="width:100%;height:100%;object-fit:scale-down"
                       :poster="goodsInfo.video_image"
                       :src="goodsInfo.goods_video"
                       controls
                       webkit-playsinline="true"
                       playsinline="true"
                       x5-playsinline="true"
                       x-webkit-airplay="true"
                       x5-video-ignore-metadata="true"
                       width="100%"
                       height="100%">
                  <source :src="goodsInfo.goods_video" />
                </video>
              </div>
              <div v-if="!goodsInfo.thumb_url || goodsInfo.thumb_url == null">
                <img :src="goodsInfo.thumb"
                     width="100%" />
              </div>
              <div v-for="(ithumb, index) in goodsInfo.thumb_url"
                   :key="index">
                <template v-if="ithumb">
                  <img :src="ithumb"
                       width="100%" />
                </template>
                <!--<template v-if="!ithumb">-->
                <!--<img src="../../assets/images/img_default.png">-->
                <!--</template>-->
              </div>
            </c-myswipe>
          </viewer>
          <div v-if="!goodsInfo.thumb_url"
               style="width: 100%;height: 23rem">
            <img :src="goodsInfo.thumb"
                 style="width: 100%;height: 100%" />
          </div>

          <div id="goodsInfo_box">
            <van-row id="nameInfo">
              <!-- 天天兑价 -->
              <div class="DpBox"
                   v-if="isGoodsLove">
                <div class="daydayPrice">
                  天天兑价 <span> ￥{{goods_love_cash + "+" + goods_love_deduction + goods_love_name}} </span>
                </div>
              </div>
              <van-col id="price"
                       class="price_sum"
                       v-if="!isGoodsLove"
                       style="flex:1;">
                ￥
                <span id="price-num"
                      class="price-num1"
                      v-if="goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1"
                      style="font-size: 14px;font-weight: 500;">
                  {{ goodsInfo.vip_level_status.word }}
                </span>
                <span id="price-num"
                      class="sum"
                      v-else>{{
              goodsInfo.has_option == 1
                ? goodsInfo.min_price + "-" + goodsInfo.max_price
                : goodsInfo.price
            }}</span>
                <del id="original-del"
                     v-if="!this.fun.isTextEmpty(goodsInfo.market_price)"><span class="original-price">原价:{{ goodsInfo.market_price }}</span><em v-if="isRent">/天</em></del>
              </van-col>
              <!-- 天天兑价 -->
              <van-col :span="24"
                       id="price"
                       v-if="isGoodsLove">
                ￥<span id="price-num"
                      style="font-weight: 600;"
                      v-if="goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1"
                      :class="[goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?'pricePower':'']">{{ goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:goodsInfo.price }}</span>
                <span id="price-num"
                      v-else>{{
                          goodsInfo.has_option == 1
                            ? goodsInfo.min_price == goodsInfo.max_price
                              ? goodsInfo.max_price
                              : goodsInfo.min_price + "-" + goodsInfo.max_price
                            : goodsInfo.price
                        }}<em v-if="isRent">/天</em></span>
                <del id="original-del"
                     v-if="!this.fun.isTextEmpty(goodsInfo.market_price)"><span class="original-price">原价:{{ goodsInfo.market_price }}</span><em v-if="isRent">/天</em></del>
              </van-col>
              <van-col>
                <i class="iconfont icon-erweima"
                   @click="postShow"></i>
              </van-col>
              <van-col>
                <div id="share"
                     @click="shareWeixin()">
                  <i class="iconfont icon-fenxiang"
                     aria-hidden="true"></i>
                  <!-- <br />
              <span>分享</span> -->
                </div>
              </van-col>
            </van-row>
            <van-row class="info-box">
              <van-col :span="24"
                       id="titleBox">
                <van-col :span="19"
                         class="title">
                  <h1 style="-webkit-box-orient:vertical;">{{ goodsInfo.title | escapeTitle }}</h1>
                </van-col>
                <van-col :span="5"
                         class="coupon"
                         v-if="isCup"><span @click="gotoCoupon"
                        v-if="goodsInfo.availability && goodsInfo.availability == 1 ? true : false"> 领券 <i class="fa fa-angle-right"></i></span></van-col>
              </van-col>

              <van-col :span="24"
                       id="price"
                       class="price_box"
                       v-if="goodsInfo.love_shoppin_gift && (!goodsInfo.vip_level_status || goodsInfo.vip_level_status.status==0)">
                <span style="text-align: left;width: 100%">{{goodsInfo.love_shoppin_gift}}</span>
              </van-col>
              <!-- <van-col :span="24"
                   id="price"
                   style="background: #fff;"
                   v-if="isGoodsLove&&(goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1)">
            <div id="price-num"
                 style="font-size: 0.75rem;font-weight: 600;display:inline-block;">
              ￥
              <span style="color:white;padding: .2rem .5rem;border-top-left-radius: 0.5rem;border-bottom-right-radius: 0.5rem;background:#f15353;">
                {{ goodsInfo.vip_level_status.word }}
              </span>
            </div>

            <div id="price-num"
                 style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000;display:inline-block;">
              原价:￥{{ goodsInfo.market_price }}
            </div>
          </van-col>
          <van-col :span="24"
                   id="price"
                   style="background: #f2efef;"
                   v-if="isGoodsLove&&(!goodsInfo.vip_level_status||goodsInfo.vip_level_status.status==0)">
            <van-col :span="5"
                     style="background: #ffe000;padding: 0.5rem;color: #000;">
              <div id="price-num"
                   style="font-size: 0.8rem;font-weight: 600;text-align: center;">
                天天兑价
              </div>
              <div id="price-num"
                   style="font-size: 0.8rem;font-weight: 600;text-align: center;">
                ￥{{ goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:goodsInfo.price }}
              </div>
            </van-col>
            <van-col :span="19"
                     class="sale"
                     style="text-align:left;padding-left:0.625rem;">
              <div id="price-num"
                   style="font-size: 0.8rem;font-weight: 600;text-align: left;    margin-bottom: 0.3125rem;margin-top: 0.3125rem;"
                   v-if="!goodsInfo.vip_level_status || goodsInfo.vip_level_status.status==0">
                ￥{{
                  goods_love_cash +
                    " + " +
                    goods_love_deduction +
                    goods_love_name
                }}
              </div>
              <div id="price-num"
                   style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000">
                原价:￥{{ goodsInfo.market_price }}
              </div>
            </van-col>
          </van-col> -->
              <van-col :span="24"
                       id="stockcontainer">
                <van-col :span="12"> 库存:{{ goodsInfo.stock }} </van-col>
                <van-col :span="12"
                         class="sale">
                  销量:{{salesCount}}
                </van-col>
              </van-col>
              <van-col :span="24"
                       v-if="is_o2o"
                       style="position: relative;padding:0 0.75rem;">
                <div id="select"
                     v-if="o2oCount > 0 && goods_info.has_option !== 1">
                  <div id="left"
                       @click="updateCart(goodsInfo.id, -1)"
                       v-if="o2oCount > 0">
                    -
                  </div>
                  <!-- <span style="width:1.25rem;font-size:20px;">{{ o2oCount }}</span> -->
                  <input type="number"
                         style="width:1.25rem;font-size:20px;flex:2;text-align:center;"
                         v-model.lazy="o2oCount"
                         @focus="clickCount(o2oCount)"
                         @change="changeCount(o2oCount, goodsInfo.id)"
                         @click.stop />
                  <div id="right"
                       @click="addCart1(goodsInfo)">+</div>
                </div>

                <div class="spec_btn"
                     :style="{bottom: isGoodsLove ? '2.3rem':'0.3rem'}"
                     v-if="o2oCount >= 0 && goods_info.has_option === 1">
                  <span class="goods-num"
                        :class="goodsCarts[goods_info.id] ? 'show' : 'hide'"
                        v-if="goodsCarts[goods_info.id]&&(!goods_info.vip_level_status||goods_info.vip_level_status.status==0)">{{ goodsCartsTotal[goods_info.id].total }}</span>
                  <yd-button type="danger"
                             @click.native="addGood()"
                             v-if="!goods_info.vip_level_status||goods_info.vip_level_status.status==0">选规格
                  </yd-button>
                </div>
                <div v-if="o2oCount <= 0 && goods_info.has_option !== 1">
                  <div>
                    <van-button type="danger"
                                style="height:2.25rem;padding: 0 15px;float: right;"
                                @click="addCart1(goodsInfo)"
                                v-if="showDis">加入购物车
                    </van-button>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
          <div @click="gotoMemberGradeList(goodsInfo.member_discount.display_page)">
            <van-row style="background:#f5f5f5;">
              <van-col :span="24"
                       id="memberBox"
                       style="padding:0.3rem 0;"
                       v-if="openVip == '1'">
                <van-col :span="5"
                         class="img"> <img src="../../assets/images/goods/member@2x.png"
                       alt=""> </van-col>
                <van-col :span="14"
                         class="vipBox"
                         v-if="goodsInfo.member_discount && goodsInfo.member_discount.discount_value">
                  <div style="font-size:12px;">{{ goodsInfo.member_discount.level_name }}专享价￥{{ goodsInfo.member_discount.discount_value }}<span v-if="isRent">/天</span></div>
                  <div style="font-size:12px;margin-top:0.3rem;color:#a77b00;"
                       v-if="goodsInfo.member_discount.next_level_price!=goodsInfo.member_discount.discount_value&&goodsInfo.member_discount.next_level_price>0.00">加入{{ goodsInfo.member_discount.next_level_name }}专享价￥{{ goodsInfo.member_discount.next_level_price }}<span v-if="isRent">/天</span></div>
                </van-col>
                <van-col :span="5"
                v-if="goodsInfo.member_discount.display_page=='1'"
                         class="sale"><i class="fa fa-angle-right"
                     style="width:100%;"></i></van-col>
              </van-col>
            </van-row>
          </div>

          <!-- //门店购物车 -->
          <!-- <div id="foot1" v-if="is_o2o">
          <div style="background: url(//static-o2o.360buyimg.com/daojia/new/images/minicart/cart.png) 10px 5px no-repeat;width:80px;top: -13px;height: 58px;background-position: 10px -70px;background-size: 50px 125px;margin-bottom:15px;"@click="goShowCart">
              <i style=" position: absolute;top: 5px;left: 55px;padding: 0 5px;height: 15px;line-height: 15px;overflow: hidden;text-align: center;color: #fff;background-color: #ff5d5c;border-radius: 7px;font-size: 10px">{{goodsCount}}</i>
          </div>

          <div id="balance" style="position: absolute;z-index: 40;right: 0;width: 115px;text-align: center;color: #fff;line-height: 48px;background-color: #47b34f"  @click="o2oGotoOrder">
              去结算
          </div>
      </div> -->
          <div id="store-position">
            <div class="store-box"
                 v-if="is_o2o"
                 @click="gotoList">
              <div class="store-name">
                <i class="iconfont icon-dianpu"></i><span>门店名称</span>
              </div>
              <div style="color:#8c8c8c" class="flexName">{{ o2oName }}</div>
            </div>

            <div class="contact-box"
                 v-if="is_o2o">
              <div class="contact">
                <a :href="o2oPhone"><i class="iconfont icon-dianhua1"></i><span>联系商家</span></a>
              </div>
              <div style="cursor: pointer"
                   v-if="store_service">
                <a :href="store_service"> <i class="iconfont icon-service_shop"></i> <span>客服</span></a>
              </div>
              <div class="position"
                   @click="goToAdress">
                <i class="iconfont icon-dingwei"></i>
              </div>
            </div>
          </div>

          <div class="act-box">
            <ul class="fee"
                v-if="goodsInfo.fee">
              <li>
                <span>{{goodsInfo.fee.name}}</span>
              </li>
              <li style="margin-left:0.5rem;color:#f15353">
                <span>￥{{ goodsInfo.fee.money }}</span>
              </li>
            </ul>
            <ul class="act"
                @click="activityShowFun"
                v-if="activitySwitch && (!goodsInfo.vip_level_status || goodsInfo.vip_level_status.status==0)">
              <li class="act1"
                  style="color:#999999;">活动</li>
              <li class="act2">
                <span>{{ firstActivityBtn }}</span>
              </li>
              <li class="act3">
                <span>{{ firstActivityCon }}</span>
              </li>
              <i class="fa fa-angle-right"></i>
            </ul>
            <ul class="act"
                @click="showParameter = true">
              <li class="act1"
                  style="color:#999999;">参数</li>
              <li class="act2">商品参数详情</li>
              <li class="act3"><span></span></li>
              <i class="fa fa-angle-right"></i>
            </ul>
            <ul class="iconBox"
                v-if="!fun.isTextEmpty(labelList)&&labelList.is_label == '1'">
              <li v-if="!fun.isTextEmpty(labelList.label_pic_1)"><img :src="labelList.label_pic_1"
                     alt="">{{labelList.paperwork_1}}</li>
              <li v-if="!fun.isTextEmpty(labelList.label_pic_2)"><img :src="labelList.label_pic_2"
                     alt="">{{labelList.paperwork_2}}</li>
              <li v-if="!fun.isTextEmpty(labelList.label_pic_3)"><img :src="labelList.label_pic_3"
                     alt="">{{labelList.paperwork_3}}</li>
              <li v-if="!fun.isTextEmpty(labelList.label_pic_4)"><img :src="labelList.label_pic_4"
                     alt="">{{labelList.paperwork_4}}</li>
              <li v-if="!fun.isTextEmpty(labelList.label_pic_5)"><img :src="labelList.label_pic_5"
                     alt="">{{labelList.paperwork_5}}</li>
              <li v-if="!fun.isTextEmpty(labelList.label_pic_6)"><img :src="labelList.label_pic_6"
                     alt="">{{labelList.paperwork_6}}</li>
            </ul>
          </div>
          <c-comment class="section"
                     :commentInfo='commentLimit?commentLimit.data:[]'
                     :tatal='commentLimit?commentLimit.total:0'
                     :rate='favorable_rate'
                     :goods_id='this.$route.params.id'
                     :isCup="this.isCup"
                     v-on:RouterTo="FromTo"></c-comment>
          <div class="pullUp"
               v-if="!showPageB"><img src="../../assets/images/goods/pull_up@2x.png"
                 alt=""
                 id="imgs"
                 :class="[isPullUp?'rotateImg':'normalImg']"><i id="loadMore">{{isPullUp?'释放展开图文详情':'上拉展开图文详情'}}</i> </div>
          <span v-if="!showPageB"
                style="display: inline-block;width:100%;height: 1rem;"></span>
          <div id="shopInfo"
               ref="goodinfo"
               class="section"
               :class="{ goodTop: goodTop == true, bottomMargin: isMarginBottom, }"
               v-if="showPageB">
            <p style=""
               class="title-text">商品详情</p>
            <div id="tabs">
              <div ref="goodPage"
                   id="goodPage">
                <div>
                  <div id="goods_content"
                       v-html="goodDetail.content"></div>
                  <p v-if="fun.isTextEmpty(goodDetail.content)"
                     style="color:#666666;">暂无该商品详情 ~</p>
                  <div class="like-list"
                       v-if="false">
                    <!-- 门店猜你喜欢 原版没有，后续可能添加，只需改v-if条件就行 -->
                    <div class="box06">
                      <div class="img">
                        <img src="../../assets/images/goods/like@2x.png" />
                      </div>
                      <h3 class="like">猜您喜欢</h3>
                    </div>
                    <div class="like-box">
                      <div class="box"
                           v-for="item in goodDetail.show_push"
                           :key="item.id"
                           @click="pushGoodGoto(item)">
                        <div class="goods-img">
                          <img :src="item.thumb"
                               style="width:100%;height:100%;" />
                        </div>
                        <ul class="goods-info">
                          <li class="name"
                              style=" -webkit-box-orient: vertical;">
                            {{ item.title | escapeTitle }}
                          </li>
                          <li class="pay">
                            <div class="left left1"
                                 v-if="goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1">
                              <small style="color:red">￥</small>
                              <span>{{ goodsInfo.vip_level_status.word }}</span>
                            </div>
                            <div class="left"
                                 v-else>
                              <small>￥</small>
                              {{ item.price }}
                            </div>
                            <div class="right"
                                 v-if="item.price != item.market_price">
                              <small>￥</small>{{ item.market_price }}</div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="cloud">
                      <div class="img"><img src="../../assets/images/cloud.png" /></div>
                      <h4>没有更多了</h4>
                    </div>
                  </div>
                  <div class="live_list_div section" v-if="is_room == 1&&!fun.isTextEmpty(recordsList)">
                    <c-live :recordsList='recordsList' :showtitle="true"></c-live>
                    <span class="live_more_btn" v-if="showMoreLive" @click.stop="getLiveList(true)">加载更多</span>
                    <span style="display: inline-block;width:100%;height: 25rem;background-color:#f5f5f5;padding:1.5rem 0;"></span>
                  </div>
                  <span style="display: inline-block;width:100%;height: 3rem;background-color:#f5f5f5;padding:1.5rem 0;"></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div id="foot"
           v-if="!is_o2o">
        <div class="addfav"
             :class="{ nocar: !isGoods }"
             type="info"
             v-if="!is_o2o">
          <template v-if="!favorite">
            <ul>
              <li>
                <i class="fa fa-star normal normal"
                   @click="onFavorite(favorite)"></i>
              </li>
              <li>收藏</li>
            </ul>
          </template>
          <template v-if="favorite">
            <ul>
              <li>
                <i class="fa fa-star active active"
                   @click="onFavorite(favorite)"></i>
              </li>
              <li>已收藏</li>
            </ul>
          </template>
        </div>
        <div class="addfav"
             type="info"
             v-if="!is_o2o">
          <template>
            <ul>
              <li>
                <i class="fa fa-cart-plus active"
                   @click="gotoCart1()"></i>
              </li>
              <li>购物车</li>
            </ul>
          </template>
        </div>
        <template v-if="!isMiniApp">
          <div class="cservice"
               v-if="!is_o2o && cservice">
            <a :href="cservice">{{ isMiniApp }}
              <ul>
                <li><i class="iconfont icon-kefu"></i></li>
                <li>客服</li>
              </ul>
            </a>
          </div>
        </template>
        <div class="cservice"
             v-if="!is_o2o && cservice && isMiniApp">
          <div @click="gotoMiniAppCs">
            <ul>
              <li><i class="iconfont icon-kefu"></i></li>
              <li>客服</li>
            </ul>
          </div>
        </div>

        <div :class="{ cart: true, cell: true, nocar: !isGoods || !isAddCart }"
             @click="addCart">
          加入购物车
        </div>
        <div class="buy cell"
             :class="{ nocar: !isGoods }"
             v-if="!is_o2o"
             @click="buyNow">
          立即购买
        </div>
      </div>
      <mt-button class="good_speci"
                 v-if="!is_o2o && isGoods && goodsInfo.has_option != 1 && goodsInfo.is_added==1"
                 @click="buyNow">
        <span id="optiondiv">{{
          goodsCount > 0
            ? "已添加" + goodsCount + goodsInfo.sku
            : "请选择商品数量"
        }}</span>
        <i class="fa fa-angle-right"
           style="margin-right:0rem;float:right; line-height:2.75rem; font-size:1.625rem; color: #666;"></i>
      </mt-button>

      <mt-popup v-model="popupSpecs"
                position="bottom"
                class="mint-popup-4"
                closeOnClickModal="true">
        <div class="specifications">
          <div class="shopimg">
            <div id="chooser_img">
              <img :src="popThumb" />
            </div>
            <div class="right">
              <div class="price">
                ￥
                <span id="option_price">{{ popPrice }}</span>
              </div>
              <div class="option">库存{{ popStock }}{{ goodsInfo.sku }}</div>
              <div class="option">{{ goodsDescription }}</div>
            </div>
          </div>

          <div class="shopinfo noVantRadio">
            <dl v-for="(specs,i) in goodsInfo.has_many_specs"
                :key='i'>
              <dt>{{ specs.title }}</dt>
              <dd>
                <van-radio-group v-model="specs.description"
                                 checked-color="#f15353"
                                 @change="selectSpecs">
                  <van-radio :class="{ vantRadioshow: specs.description == specitem }"
                             :disabled="specitem.c"
                             v-for="(specitem,i) in specs.specitem"
                             :name="specitem"
                             :key='i'>
                    {{ specitem.title }}
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
          </div>

          <van-row>
            <van-col :span="12"
                     id="num">
              购买数量：
            </van-col>
            <van-col :span="11">
              <div class="num">
                <div class="leftnav"
                     @click="reduceGoods">-</div>
                <input type="text"
                       disabled="false"
                       class="shownum"
                       v-model="goodsCount" />
                <div class="rightnav"
                     @click="addGoods">+</div>
              </div>
            </van-col>
          </van-row>
          <van-button size="small"
                      id="btsmall"
                      type="danger"
                      v-show="popStock>=1"
                      @click="submitAction">确认
          </van-button>
          <van-button
            type="danger"
            color="#999999"
            size="small"
            disabled
            id="btsmall"
            v-show="popStock<=0" >
            确认
          </van-button>
        </div>
      </mt-popup>

      <mt-popup v-model="popupSpecs2"
                position="bottom"
                class="mint-popup-4"
                closeOnClickModal="true">
        <div class="specifications">
          <div class="shopimg">
            <div id="chooser_img">
              <img :src="popThumb" />
            </div>
            <div class="right">
              <div class="price">
                ￥
                <span id="option_price">{{ popPrice }}</span>
              </div>
              <div class="option">库存{{ popStock }}{{ goodsInfo.sku }}</div>
              <div class="option">{{ goodsDescription }}</div>
            </div>
          </div>

          <van-row>
            <van-col :span="12"
                     id="num">
              购买数量：
            </van-col>
            <van-col :span="11">
              <div class="num">
                <div class="leftnav"
                     @click="reduceGoods">-</div>
                <input type="text"
                       disabled="false"
                       class="shownum"
                       v-model="goodsCount" />
                <div class="rightnav"
                     @click="addGoods">+</div>
              </div>
            </van-col>
          </van-row>
          <van-button size="small"
                      id="btsmall"
                      type="danger"
                      v-show="popStock>=1"
                      @click="buyNowNew">确认
          </van-button>
          <van-button
            type="danger"
            color="#999999"
            size="small"
            disabled
            id="btsmall"
            v-show="popStock<=0" >
            确认
          </van-button>
        </div>
      </mt-popup>
      <yd-popup v-model="activityShow"
                position="bottom"
                height="60%">
        <yd-navbar title="活动"
                   height="2.8125rem"
                   fontsize="16px"
                   color="#333"
                   fixed>
          <span slot="right">
            <i class="iconfont icon-close11"
               style="color:#666;size:1.25rem;"
               @click="activityShow = false"></i>
          </span>
        </yd-navbar>
        <div style="clear:both;margin-top:2.8125rem;">
          <yd-cell-group>
            <yd-cell-item v-for="(item,i) in activityItem.sale"
                          :key='i'>
              <div slot="left"
                   style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">
                {{ item.name }}
              </div>
              <span slot="right"
                    v-if="item.type == 'string'">{{
                item.value
              }}</span>
              <!-- <span slot="right" v-if="item.type == 'array'" v-for="value in item.value">{{value}}</span> -->
              <span slot="right"
                    v-if="item.type == 'array'">
                <span>
                  <span v-for="(value,i) in item.value"
                        :key='i'>{{ value }}<br /></span>
                </span>
              </span>
            </yd-cell-item>
          </yd-cell-group>
        </div>
      </yd-popup>

      <!-- 选规格 -->
      <yd-popup v-model="show2"
                position="center"
                class="spec_popup"
                style="z-index:101">
        <div class="spec_box">
          <h3 id="h3_class">
            {{ popTitle
            }}<i @click.stop="close"
               class="iconfont icon-close11"></i>
          </h3>
          <div style="height:2.5rem;"></div>
          <div class="spec_a"
               v-for="(spec,i) in goodsInfo.has_many_specs"
               :key='i'>
            <h5>{{ spec.title }}</h5>
            <ul class="option">
              <li @click.stop="selectSpecs1(item, item.id)"
                  v-for="(item,i) in spec.specitem"
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
                <span v-show="!popNum&&popStock>=1" @click.stop="submitAction1">加入购物车</span>
                <span v-show="popStock<=0" style="background:#999999;">库存不足</span>
              </li>
              <div class="Box"
                   v-show="popNum >= 1">
                <i class="iconfont icon-store_reduceLine"
                   @click.stop="updateCart1(popCard.id, -1)"></i>
                <label class="show">{{ popNum }}</label>
                <i class="iconfont icon-store_plus"
                   @click.stop="updateCart1(popCard.id, 1)"></i>
              </div>
            </ul>
          </div>
        </div>
      </yd-popup>
      <!--  -->

      <yd-popup v-model="showParameter"
                position="bottom"
                height="60%">
        <yd-navbar title="商品参数"
                   height="2.8125rem"
                   fontsize="16px"
                   color="#333"
                   fixed
                   class="pcStyle_ydT">
          <span slot="right">
            <i class="iconfont icon-close11"
               style="color:#666;size:1.25rem;"
               @click="showParameter = false"></i>
          </span>
        </yd-navbar>
        <div style="clear:both;margin-top:2.8125rem;"
             class="pcStyle_ydC">
          <ul class="parameterClass">
            <li v-for="items in goodsInfo.has_many_params">
              <span class="leftb">{{items.title}}</span>
              <span class="rightb">{{items.value}}</span>
            </li>
            <p class="notext"
               v-if="fun.isTextEmpty(goodsInfo.has_many_params)">
              <br>抱歉，暂无该商品参数 ~
            </p>
          </ul>
        </div>
      </yd-popup>
      <yd-popup v-model="showComment"
                position="right"
                height="100%"
                width="100%">
        <yd-navbar title="全部评价"
                   fixed>
          <span slot="left">
            <yd-navbar-back-icon @click.native="CloseComment"></yd-navbar-back-icon>
          </span>
        </yd-navbar>
        <!-- 商品评价 -->
        <c-commentlist v-on:clickMore="getCommentData"
                       :list='third_content'
                       :noMoreComment='noMoreComment'
                       :isCup='isCup'
                       v-if="showComment"></c-commentlist>
      </yd-popup>

      <!-- 未添加商品 -->
      <div class="Go_settle"
           v-show="carts.length === 0 && showDis && !notLogin">
        <i class="iconfont"
           @click="trggleCart"></i>
        <p>购物车是空的</p>
        <button type="button"
                @click.stop="goodsOrder(goodsCarts)">
          请选择商品
        </button>
      </div>
      <!-- 已添加商品 -->
      <div class="Go_settle complete"
           v-show="carts.length > 0  && showDis && !notLogin">
        <span class="number"
              v-show="!this.showCart">{{cartsNum}}</span>
        <i :style="minicartStyle"
           class="iconfont"
           @click="trggleCart"></i>
        <p :style="leftPrice"><span>¥</span>{{ cartsTotal }}</p>
        <button @click.stop="goodsOrder(goodsCarts)"
                type="button">
          去结算
        </button>
      </div>
      <yd-popup v-model="showCart"
                position="bottom"
                width="100%"
                max-height="60%">
        <div class="top">
          <!--<van-checkbox v-model="checked"-->
          <!--&gt;全选<span class="select">(已选{{ cartsNum }}件) </span>-->
          <!--</van-checkbox>-->
          <div style="display: flex">
            <i class="cartIcon"
               @click="trggleCart"></i>
            <span class="select">(已选{{ cartsNum }}件) </span>
          </div>
          <div class="clear_car"
               @click.stop="clearCart">
            <i class="iconfont icon-delete"></i>
            <span>清空购物车</span>
          </div>
        </div>
        <div class="carPopup"
             ref="cartWrapper">
          <div>
            <div class="goodsList">
              <div class="goods"
                   v-for="(item, index) in carts"
                   @click.stop="goToGoodsO2O(item)"
                   :key='index'>
                <!--<van-checkbox v-model="checked"></van-checkbox>-->
                <div class="goods_img">
                  <img :src="item.goods.thumb" />
                </div>
                <ul class="goodsName">
                  <li class="name">
                    {{ item.goods.title }}
                    <span v-if="item.option_str">({{ item.option_str }})</span>
                  </li>
                  <li class="price">¥{{ item.goods.price }}</li>
                </ul>
                <div class="addBtn">
                  <i v-if="goods_info.has_option !== 1"
                     class="iconfont icon-store_reduceLine"
                     @click.stop="updateCart(item.goods_id, -1)"></i>
                  <i v-if="goods_info.has_option === 1"
                     class="iconfont icon-store_reduceLine"
                     @click.stop="updateCart1(item.id, -1)"></i>
                  <input v-if="goods_info.has_option !== 1"
                         type="number"
                         v-model.lazy="item.total"
                         @focus="clickCount(item.total)"
                         @blur="changeCount(item.total, item.goods_id)"
                         @click.stop />
                  <input v-if="goods_info.has_option == 1"
                         type="number"
                         v-model.lazy="item.total"
                         @focus="clickCount(item.total)"
                         @blur="changeCount(item.total, item.id)"
                         @click.stop />
                  <i v-if="goods_info.has_option !== 1"
                     class="iconfont icon-store_plus"
                     @click.stop="updateCart(item.goods_id, 1)"></i>
                  <i v-if="goods_info.has_option === 1"
                     class="iconfont icon-store_plus"
                     @click.stop="updateCart1(item.id, 1)"></i>
                </div>
              </div>
            </div>
            <div style="height: 3.5rem;"></div>
          </div>
        </div>
      </yd-popup>

      <mt-popup v-model="posterShow"
                closeOnClickModal="true"
                style="width:17.8125rem;height:34rem;padding:0;background:none;">
        <div style="width:100%;height:100%;overflow:hidden;"
             class="code_box">
             <div style="width:100%;height:31.25rem;border-radius:0.375rem;">
              <img :src="'data:'+posterImg.mime+';base64,'+posterImg.base64Image"
                  v-if="posterImg.base64Image"
                  style="width:100%;border-radius:0.375rem;" />
              <!-- <img src="../../assets/images/img_default.png"
                  v-if="!posterImg.base64Image"
                  style="width:100%;height:100%;object-fit: contain;border-radius:0.375rem;" /> -->
             </div>
          <!-- 关闭图标 -->
          <div class="icon_close"
               @click="posterShow = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <!--  -->
        </div>
      </mt-popup>
      <!-- 过期 -->
      <yd-popup v-model="show8"
                position="center"
                width="80%">
        <div style="background-color:#fff;border-radius:10px;">
          <p class="tips">
            该商家已过期，去看看其他的吧
          </p>
          <p style="text-align: center;line-height: 2.5rem;">
            <yd-button @click.stop.native="goTOHome"
                       style="width:60px;border-radius:4px;">我知道了</yd-button>
          </p>
        </div>
      </yd-popup>
    </div>
  </transition>
</template>

<script>
import goods from "./store_good_controller";
export default goods;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/goods.scss";
#goods {
  .tips {
    line-height: 3.5rem;
  }
  #code_box {
    img {
      width: 85%;
    }
  }
  .Go_settle {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.125rem;
    background: #666;
    display: flex;
    justify-content: space-between;
    z-index: 999;
    .iconfont {
      background: url(../../assets/images/store_car1.png) no-repeat center;
      background-size: 4rem;
      width: 4rem;
      height: 4rem;
      line-height: 4rem;
      color: #aaaaaa;
      font-size: 4rem;
      position: absolute;
      left: 0.625rem;
      bottom: -0.1rem;
      transition: transform 0.4s ease-out 0s;
    }
    p {
      font-size: 16px;
      color: #aaaaaa;
      padding-left: 5rem;
      line-height: 3.125rem;
    }
    button {
      width: 6.875rem;
      background: rgba(255, 255, 255, 0.1);
      color: #aaaaaa;
      font-size: 16px;
    }
  }
  .complete {
    .number {
      position: absolute;
      top: -0.5rem;
      left: 3.3rem;
      z-index: 10;
      padding: 0 0.3125rem;
      height: 0.9375rem;
      line-height: 0.9375rem;
      border-radius: 0.4375rem;
      text-align: center;
      font-size: 10px;
      background: #fff;
      color: #f15353;
    }
    .iconfont {
      background: url(../../assets/images/store_car2.png) no-repeat center;
      background-size: 4rem;
      width: 4rem;
      height: 4rem;
      line-height: 4rem;
      color: #aaaaaa;
      font-size: 4rem;
      //position: absolute;
      //left: 0.625rem;
      //bottom: -0.1rem;
      transition: transform 0.4s ease-out 0s;
    }
    p {
      color: #ffffff;
      transition: transform 0.4s ease-out 0s;
    }
    button {
      width: 6.875rem;
      background: #f15353;
      color: #fff;
      font-size: 16px;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 0.875rem;
    align-items: center;
    height: 2.5rem;
    font-size: 16px;
    border-bottom: solid 0.0625rem #ebebeb;
    .cartIcon {
      display: block;
      background: url(../../assets/images/store_car2.png) no-repeat center;
      background-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      color: #aaaaaa;
      font-size: 2.5rem;
    }
    .select {
      font-size: 16px;
      color: #8c8c8c;
      margin-left: 0.25rem;
      line-height: 2.5rem;
    }
    .clear_car {
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 1.125rem;
        color: #666;
        margin-right: 0.25rem;
      }
    }
  }
  .carPopup {
    max-height: 22rem;
    overflow: hidden;
    .goodsList {
      padding: 0 0.875rem;
      .goods {
        border-bottom: solid 0.0625rem #ebebeb;
        display: flex;
        position: relative;
        padding: 0.625rem 0;
        align-items: center;
        .goods_img {
          width: 3.375rem;
          height: 3.375rem;
          border-radius: 0.125rem;
          overflow: hidden;
          background: #f2f2f2;
          margin-right: 0.625rem;
          margin-left: 0.625rem;
          img {
            width: 100%;
          }
        }
        .goodsName {
          width: 13.75rem;
          text-align: left;
          .name {
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            color: #f15353;
            font-size: 16px;
            margin-top: 0.625rem;
          }
        }
        .addBtn {
          position: absolute;
          bottom: 0.625rem;
          right: 0;
          display: flex;
          .iconfont {
            width: 1.75rem;
            height: 1.75rem;
            line-height: 1.75rem;
            font-size: 1.625rem;
            color: #f15353;
          }
          .icon-store_reduceLine {
            color: #aaaaaa;
          }
          input {
            width: 2rem;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
  #goodsInfo_box {
    padding: 0.875rem 0rem;
    background: #fff;
    #nameInfo {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.75rem;
      .DpBox {
        width: 100%;
        margin-bottom: 0.25rem;
        .daydayPrice {
          display: block;
          height: 2rem;
          line-height: 2rem;
          background: #ffe000;
          padding-left: 0.5rem;
          overflow: hidden;
          color: #333333;
          font-weight: bold;
          float: left;
          clear: both;
          span {
            background: #f2efef;
            height: 100%;
            padding-right: 0.5rem;
            display: inline-block;
            color: #333333;
          }
        }
      }
      #price {
        flex: 1;
      }
      #tilie {
        flex: 3;
        font-size: 16px;
        text-align: left;
        line-height: 1.5rem;
        max-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: bold;
      }
      .iconfont {
        font-size: 18px;
        color: #666;
        margin-left: 1rem;
        line-height: 1.5rem;
      }
    }
    .price_sum {
      font-weight: bold;
      .sum {
        font-weight: bold;
      }
      .price-num1 {
        background: #f15353;
        color: white;
        padding: 0.2rem 0.5rem;
        border-top-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
    #stockcontainer {
      padding: 0 0.75rem;
    }
    .van-button {
      line-height: 2.25rem;
      border-radius: 0.25rem;
      margin: 0;
    }
  }
  #store-position {
    .contact-box {
      .position {
        .iconfont {
          font-size: 20px;
          padding-left: 10px;
          border-left: solid 1px #ebebeb;
        }
      }
    }
  }
  .minicart-content {
    .a3b {
      .a3v {
        width: 2rem;
        height: 2rem;
        background-position: center -4.8rem;
        top: 1.8rem;
        right: 4.8125rem;
      }
      .a3w {
        width: 2rem;
        height: 2rem;
        top: 1.8rem;
        background-position: center 0.2rem;
      }
      input {
        height: 2rem;
        top: 1.8rem;
        border-bottom: solid 0.0625rem #d9d9d9;
      }
    }
  }
}
.a37 {
  top: 0.3rem;
}
.spec_btn {
  float: right;
}
.spec_btn .goods-num {
  position: absolute;
  z-index: 10;
  border-radius: 0.6rem;
  padding: 0 0.3125rem;
  top: -12px;
  right: -9px;
  background: #fff;
  color: #f15353;
}
.spec_btn button {
  width: 3.25rem;
  height: 1.4375rem;
  border-radius: 1rem;
  color: #fff;
  background-color: #ff5d5c;
  padding: 0.3rem;
  font-size: 12px;
}
.spec_box {
  background: #fff;
  width: 20.625rem;
  height: 24.375rem;
  border-radius: 0.625rem;
  padding-bottom: 3.4375rem;
}
.spec_box h3 {
  border-radius: 0.625rem 0.625rem 0 0;
  width: 100%;
  background-color: #fff;
  position: fixed;
  line-height: 2.75rem;
  border-bottom: solid 0.0625rem #ebebeb;
  font-size: 16px;
}
.spec_box h3 i {
  position: absolute;
  right: 0.875rem;
  line-height: 2.75rem;
  color: #999;
  font-size: 18px;
}
.spec_a {
  margin-top: 0.625rem;
  background: #fff;
}
.spec_a h5 {
  display: block;
  line-height: 2.5rem;
  text-align: left;
  padding-left: 1.25rem;
}
.option {
  display: flex;
  padding: 0 1.25rem;
  flex-wrap: wrap;
}
.option .cur {
  border: solid 0.0625rem #ff5d5c;
  background: #faf0f0;
}
.option li {
  cursor: pointer;
  padding: 0 6px;
  min-height: 1.875rem;
  line-height: 1.875rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  background: #f5f5f5;
  border: solid 0.0625rem #ebebeb;
  border-radius: 0.1875rem;
}
.skuClass{
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #fff;
  position: fixed;
  bottom: 3.4375rem;
  padding:0 0.875rem;
  color: #f15353;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
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
}
.car_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.875rem;
}
.car_btn .left {
  color: #f15353;
  font-size: 16px;
  text-align: left;
  flex: 0 0 13rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.car_btn .left span {
  font-size: 16px;
}
.car_btn .right span {
  display: block;
  width: 5.5625rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-radius: 1rem;
  background: #f15353;
  color: #fff;
  font-size: 14px;
}
.spec_btn button {
  width: 5.25rem;
  height: 1.5rem;
}
.spec_btn .goods-num {
  top: -2px;
  right: 6px;
}
.minicart-content {
  max-height: 28.75rem;
}
#h3_class {
  color: #333333;
  margin-left: 0;
}
.option {
  padding: 0 1.25rem;
}
.car_btn {
  padding: 0 0.875rem;
}
.Box {
  position: absolute;
  right: 0;
  bottom: 2.625rem;
}
.Box {
  position: absolute;
  bottom: 0.625rem;
  right: 0.625rem;
  display: flex;
  .iconfont {
    width: 1.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: 26px;
    color: #f15353;
  }
  .icon-store_reduceLine {
    color: #aaaaaa;
  }
  input {
    width: 2rem;
    text-align: center;
    font-size: 12px;
  }
}
.Box label {
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
  -webkit-background-origin: content-box;
  background-origin: content-box;
  background-color: transparent;
}
.Box span {
  position: absolute;
  right: 3.25rem;
  box-sizing: content-box;
  padding: 0.375rem;
  text-indent: -6249.9375rem;
  background-image: url("//static-o2o.360buyimg.com/daojia/new/images/icon/addNumSprite.png");
  background-repeat: no-repeat;
  -webkit-background-size: 400% 100%;
  background-size: 400% 100%;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: top;
  border: 0 none;
  -webkit-background-origin: content-box;
  background-origin: content-box;
}
.zx .Box span {
  background-color: transparent;
}
.Box .hide {
  display: none;
}
.Box .show {
  display: inline-block;
}
.Box span.add {
  background-position: 0 0;
  right: 0;
}
.Box span.reduce {
  background-position: -2.625rem 0;
}
.Box span.linksMark {
  background-position: -4.625rem 0;
  padding-right: 0.625rem;
}
.noVantRadio {
  .van-radio-group {
    display: flex;
    flex-wrap: wrap;
    .van-radio {
      margin-right: 0.3125rem;
      margin-bottom: 0.3125rem;
      background: #fff;
      border: 1px solid #bfcbd9;
      text-align: center;
      box-sizing: border-box;
      border-radius: 0.25rem;
    }
    .vantRadioshow {
      background-color: rgb(241, 83, 83);
      border-color: rgb(241, 83, 83);
      box-shadow: rgb(241, 83, 83) -1px 0px 0px 0px;
    }
  }
}
#original-del {
  color: #8c8c8c;
  .original-price {
    font-size: 12px;
    margin-left: 12px;
    color: #8c8c8c;
  }
}
.pcStyle {
  #hoid,
  .Go_settle {
    width: 375px !important;
  }
  #cart {
    right: 50% !important;
    margin-right: -186px;
  }
  #member {
    right: 50% !important;
    margin-right: -150px;
  }
  #foot {
    width: 375px !important;
  }
}
</style>
