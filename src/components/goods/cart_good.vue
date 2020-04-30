<template>
  <transition name="fade2">
    <div id="goods"
         v-show="showGood"
         :class="[fun.getPhoneEnv() == 3 ? 'pcStyle' : '']">
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
      </div>
      <div id="hoid"
           @click="goto"
           :class="{ hoet: hoet }"
           v-if="isCup">
        <div id="back">
          <i class="mintui mintui-back"></i>
        </div>
      </div>
      <div id="cart"
           @click="gotoCart"
           :class="{ hoet: hoet }"
           v-if="isCup">
        <div id="back">
          <i class="iconfont icon-ai-home"></i>
        </div>
      </div>
      <div id="member"
           @click="gotoMember"
           :class="{ hoet: hoet }"
           v-if="isCup">
        <div id="back">
          <!-- <i class="fa fa-user"></i> -->
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
            <c-myswipe :style="{ height:fun.getPhoneEnv() == 3 ? '375px' : '100vw' }"
                       :pagination-visible="true"
                       :slides="goodsInfo.thumb_url"
                       :repeating="true"
                       :auto="0"
                       class="banner_pcStyle">
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
                <!--<template v-if='!ithumb'>-->
                <!--<img src="../../assets/images/img_default.png" width="100%">-->
                <!--</template>-->
              </div>
            </c-myswipe>
          </viewer>
          <div class="rob-time"
               v-if="(isBuy &&(isTime||isBegTime))">
            <!-- <div class="img">
          <img src="../../assets/images/rob-time.png"
               width="16%;" />
        </div> -->
            <ul class="price">
              <li class="text">
                限 时 购
              </li>
              <!-- <li class="none-line"><small>￥</small><b>3.2</b>&nbsp;/天</li>
          <li class="middle-line"><small>￥</small><b>3.2</b>&nbsp;/天</li> -->
            </ul>
            <div class="time"
                 v-if="!isBegTime">
              <span class="text">距离结束还有:</span>
              <yd-countdown slot="right"
                            :time="endTimeStr"
                            class="bottom_time">
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;">{%d1} <em>{%d2}</em> </em
                >天
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%h1}
                  <em>{%h2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%m1}
                  <em>{%m2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%s1}
                  <em>{%s2}</em>
                </em>
              </yd-countdown>
            </div>
            <div class="time" v-if="isBuy &&  isBegTime">
              <span class="text">距开始还剩：</span>
              <yd-countdown slot="right" :time="begTimeStr" class="bottom_time" :callback="begTimeBtn">
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%d1} <em>{%d2}</em> </em
                > 天
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%h1}
                  <em>{%h2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%m1}
                  <em>{%m2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.25rem 0.125rem;border-radius:0.125rem;"
                >{%s1}
                  <em>{%s2}</em>
                </em>
              </yd-countdown>
            </div>
          </div>
          <van-row>
            <!--<el-row>-->
            <div class="info-box">
              <div class="title-box">
                <!-- 天天兑价 -->
                <div class="DpBox" v-if="isGoodsLove">
                  <div class="daydayPrice">
                    天天兑价 <span>￥{{goods_love_cash + "+" + goods_love_deduction + goods_love_name}}</span>
                  </div>
                </div>
                <h2>
                  <van-col :span="24" id="price" v-if="!isGoodsLove">
                    ￥
                    <span id="price-num" class="price-num1" v-if="goodsInfo.vip_level_status && goodsInfo.vip_level_status.status==1" style="font-size: 14px;font-weight: 500;">
                          {{ goodsInfo.vip_level_status.word }}
                        </span>
                    <span id="price-num" v-else>{{
                          goodsInfo.has_option == 1
                            ? goodsInfo.min_price == goodsInfo.max_price
                              ? goodsInfo.max_price
                              : goodsInfo.min_price + "-" + goodsInfo.max_price
                            : goodsInfo.price
                        }}<em v-if="isRent">/天</em></span>
                    <del
                      id="original-del"
                      v-if="!this.fun.isTextEmpty(goodsInfo.market_price)"
                    ><span class="original-price"
                    >原价:￥{{ goodsInfo.market_price }}</span
                    ></del>
                  </van-col>
                  <!-- 天天兑价 -->
                  <van-col :span="24" id="price" v-if="isGoodsLove">
                    ￥<span id="price-num" v-if="goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1" :class="[goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?'pricePower':'']">{{ goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:goodsInfo.price }}<em v-if="isRent">/天</em></span>
                    <span id="price-num" v-else>{{
                          goodsInfo.has_option == 1
                            ? goodsInfo.min_price == goodsInfo.max_price
                              ? goodsInfo.max_price
                              : goodsInfo.min_price + "-" + goodsInfo.max_price
                            : goodsInfo.price
                        }}<em v-if="isRent">/天</em></span>
                    <del
                      id="original-del"
                      v-if="!this.fun.isTextEmpty(goodsInfo.market_price)"
                    ><span class="original-price"
                    >原价:￥{{ goodsInfo.market_price }}</span
                    ><em v-if="isRent">/天</em></del
                    >
                  </van-col>
                </h2>
                <i class="iconfont icon-erweima" @click="postShow()"></i>
                <i class="iconfont icon-fenxiang" @click="shareWeixin()"></i>
              </div>
              <van-col :span="24" id="titleBox">
                <van-col :span="19" class="title"><h1 style="-webkit-box-orient:vertical;">{{ goodsInfo.title | escapeTitle }}</h1></van-col>
                <van-col :span="5" class="coupon" v-if="isCup"><span @click="gotoCoupon" v-if="goodsInfo.availability == 1 ? true : false"> 领券 <i class="fa fa-angle-right"></i></span></van-col>
              </van-col>
            </div>
          </van-row>
          <van-row v-if="goodsInfo.love_shoppin_gift">
            <van-col
              :span="24"
              id="price"
              class="price_box"
              v-if="goodsInfo.love_shoppin_gift"
            >
                  <span style="text-align: left;width: 100%">{{
                    goodsInfo.love_shoppin_gift
                  }}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col :span="24" id="stockcontainer">
              <van-col :span="12"> 库存:{{ goodsInfo.stock }} </van-col>
              <van-col :span="12" class="sale">
                {{ isRent ? "租赁次数" : "销量" }}:{{
                goodsInfo.show_sales + goodsInfo.virtual_sales
                }}
              </van-col>
            </van-col>
          </van-row>
          <div @click="gotoMemberGradeList(goodsInfo.member_discount.display_page)">
            <van-row style="background:#f5f5f5;" >
              <van-col :span="24" id="memberBox" style="padding:0.3rem 0;" v-if="openVip == '1'" >
                <van-col :span="5" class="img"> <img src="../../assets/images/goods/member@2x.png" alt=""> </van-col>
              <van-col :span="14" class="vipBox"  v-if="goodsInfo.member_discount && goodsInfo.member_discount.discount_value">
                      <div style="font-size:12px;">{{ goodsInfo.member_discount.level_name }}专享价￥{{ goodsInfo.member_discount.discount_value }}<span v-if="isRent">/天</span></div>
                      <div style="font-size:12px;margin-top:0.3rem;color:#a77b00;" v-if="goodsInfo.member_discount.next_level_price!=goodsInfo.member_discount.discount_value&&goodsInfo.member_discount.next_level_price>0.00">加入{{ goodsInfo.member_discount.next_level_name }}专享价￥{{ goodsInfo.member_discount.next_level_price }}<span v-if="isRent">/天</span></div>
                    </van-col>
                <van-col :span="5" class="sale" v-if="goodsInfo.member_discount.display_page=='1'"><i class="fa fa-angle-right"  style="width:100%;"></i></van-col>
              </van-col>
            </van-row>
          </div>

          <div v-if="!this.fun.isTextEmpty(goodsInfo.has_one_brand)">
            <div
              class="brand"
              @click="toBrandDetail(goodsInfo.has_one_brand.id)"
              v-if="isCup"
            >
              <ul class="logo">
                <li>
                  <img :src="goodsInfo.has_one_brand.logo" alt="" class="logo_img">
                  <span>{{goodsInfo.has_one_brand.name}}</span>
                </li>
                <li class="return">
                  品牌介绍
                </li>
              </ul>
            </div>
          </div>

          <div
            class="member-box"
            v-if="!isRent && isGoods && goodsInfo.has_option != 1 && goodsInfo.is_added==1"
            @click="buyNow"
          >
            <span id="optiondiv" v-if="goodsCount > 0">已选 <em style="padding-left:0.625rem;color:#333333;">{{goodsCount + goodsInfo.sku}}</em></span>
            <span id="optiondiv" v-else>请选择商品数量</span>
            <i class="fa fa-angle-right"></i>
          </div>
          <div class="act-box">
            <ul class="fee" v-if="goodsInfo.fee">
              <li>
                <span>{{goodsInfo.fee.name}}</span>
              </li>
              <li style="margin-left:0.5rem;color:#f15353">
                <span>￥{{ goodsInfo.fee.money }}</span>
              </li>
            </ul>
            <!--<ul class="act" @click="activityShowFun" v-if="activitySwitch">-->
              <!--<li class="act1" style="color:#999999;">活动</li>-->
              <!--<li class="act2">-->
                <!--<span>{{ firstActivityBtn }}</span>-->
              <!--</li>-->
              <!--<li class="act3">-->
                <!--<span>{{ firstActivityCon }}</span>-->
              <!--</li>-->
              <!--<i class="fa fa-angle-right"></i>-->
            <!--</ul>-->
            <ul class="act" @click="showParameter = true">
              <li class="act1" style="color:#999999;">参数</li>
              <li class="act2">商品参数详情</li>
              <li class="act3"><span></span></li>
              <i class="fa fa-angle-right"></i>
            </ul>
            <!--<ul class="iconBox" v-if="!fun.isTextEmpty(labelList)&&labelList.is_label == '1'">-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_1)"><img :src="labelList.label_pic_1" alt="">{{labelList.paperwork_1}}</li>-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_2)"><img :src="labelList.label_pic_2" alt="">{{labelList.paperwork_2}}</li>-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_3)"><img :src="labelList.label_pic_3" alt="">{{labelList.paperwork_3}}</li>-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_4)"><img :src="labelList.label_pic_4" alt="">{{labelList.paperwork_4}}</li>-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_5)"><img :src="labelList.label_pic_5" alt="">{{labelList.paperwork_5}}</li>-->
              <!--<li v-if="!fun.isTextEmpty(labelList.label_pic_6)"><img :src="labelList.label_pic_6" alt="">{{labelList.paperwork_6}}</li>-->
            <!--</ul>-->
          </div>

          <div class="act-box hot-item" style="padding-bottom: 0.8rem;">
            <div class="title">热门方案 <span class="gray">根据个人信用评估首付比例不同</span></div>
            <div class="hot-money">
              <div>
                <!--<span class="heng">{{staging_buy_car_goods.down_payment}}万</span>-->
                <p>首付 </p>
                <p><span class="hot-red">{{staging_buy_car_goods.down_payment}}</span>元</p>
              </div>
              <div>
                <p>月供</p>
                <p><span class="hot-red">{{staging_buy_car_goods.monthly_supply}}</span>元</p>
              </div>
              <div>
                <p>期数</p>
                <p><span class="hot-red">{{staging_buy_car_goods.period_number}}</span>期</p>
              </div>
            </div>

            <div class="tips" v-if="staging_buy_car_goods.attach_set == 0">
              <p class="gray" v-for="(item, i) in staging_buy_car_goods.attach_content" :key="i"><span class="icon-item">{{item.name}}</span>{{item.content}})</p>
            </div>

            <div class="gray" style="line-height: 1.4rem;" v-for="(item, j) in staging_buy_car_goods.titles" :key="j">{{item}}</div>
          </div>

          <c-comment class="section" :commentInfo='commentLimit?commentLimit.data:[]' :tatal='commentLimit?commentLimit.total:0' :rate='favorable_rate' :goods_id='this.$route.params.id' :isCup="this.isCup" v-on:RouterTo="FromTo"></c-comment>

          <div class="act-box" v-if="help_center_enabled == 1">
            <div class="evaTop">
              <div class="evaTitle">常见问题</div>
              <div class="evaTo" style="color:#ed0606;" @click="gotoHelp()">更多问题&nbsp;
                <i class="fa fa-angle-right" style="font-size:20px;"></i>
              </div>
            </div>
            <div class="question-box">
              <div v-for="(item, i) in questionTitle" v-if="i<5" :key="i"><span @click="gotoHelp(i)" class="question">{{item}}</span></div>
            </div>
          </div>

          <div class="act-box" v-if="package_deliver_enable == 1">
            <div class="evaTop">
              <div class="evaTitle">附近{{deliverName}}</div>
              <div class="evaTo" style="color:#ed0606;" @click="gotoCommentList">更多{{deliverName}}&nbsp;
                <i class="fa fa-angle-right" style="font-size:20px;"></i>
              </div>
            </div>
            <div>
              <p v-if="positongIng" style="padding:1rem 0;">正在定位中，请稍等</p>
              <div v-if="LocationError" style="padding:1rem 0;">
                定位失败,请手动<span style="color:#f15353" @click.stop="gotoCommentList"
                  >切换位置</span
                >
              </div>
              <div v-if="fun.isTextEmpty(info) && !positongIng && !LocationError">
                <img
                  src="../../assets/images/blank.png"
                  alt=""
                  style="margin-top:2rem;width:5rem;"
                />
                <p style="color:#999999;">抱歉，该地区暂无{{deliverName}}~</p>
              </div>
              <div class="take-item" v-for="item in info" :key="item.id">
                <!-- <img
                  :src="item.thumb?item.thumb[0]:'../../assets/images/loading.jpg'"
                  alt=""> -->
                <div class="right">
                  <p class="first">{{item.deliver_name}}</p>
                  <p class="gray">距离 {{ item.distance }}{{ item.unit }} | {{ item.full_address }}</p>
                  <div class="third">
                    <div class="button"><a @click.stop :href="'tel:' + item.deliver_mobile"><i class="iconfont icon-dianhua1"></i>联系商家</a></div>
                    <!-- <div class="button"><p><i class="iconfont icon-linedesign-20"></i>联系客服</p></div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pullUp" v-if="!showPageB"><img src="../../assets/images/goods/pull_up@2x.png" alt="" id="imgs" :class="[isPullUp?'rotateImg':'normalImg']"><i id="loadMore">{{isPullUp?'释放展开图文详情':'上拉展开图文详情'}}</i> </div>
          <span v-if="!showPageB" style="display: inline-block;width:100%;height: 1rem;"></span>
          <div
            id="shopInfo"
            ref="goodinfo"
            class="section"
            :class="{ goodTop: goodTop == true, bottomMargin: isMarginBottom, }"
            v-if="showPageB"
          >
            <p style="" class="title-text">商品详情</p>
            <div id="tabs">
              <div ref="goodPage" id="goodPage">
                <div>
                  <div id="goods_content" v-html="goodDetail.content"></div>
                  <p v-if="fun.isTextEmpty(goodDetail.content)" style="color:#666666;">暂无该商品详情 ~</p>
                  <div
                    class="like-list"
                    v-if="this.fun.isTextEmpty(goodDetail.show_push) ? false : true"
                  >
                    <div class="box06">
                      <div class="img">
                        <img src="../../assets/images/goods/like@2x.png" />
                      </div>
                      <h3 class="like">猜您喜欢</h3>
                    </div>
                    <div class="like-box">
                      <div
                        class="box"
                        v-for="item in goodDetail.show_push" :key="item.id"
                        @click="pushGoodGoto(item)"
                      >
                        <div class="goods-img">
                          <img :src="item.thumb" style="width:100%;height:100%;" />
                        </div>
                        <ul class="goods-info">
                          <li class="name" style=" -webkit-box-orient: vertical;">
                            {{ item.title | escapeTitle }}
                          </li>
                          <li class="pay">
                            <div class="left left1" v-if="item.vip_level_status&&item.vip_level_status.status==1">
                              <small style="color:red">￥</small>
                              <span>{{ item.vip_level_status.word }}</span>
                            </div>
                            <div class="left" v-else>
                              <small>￥</small>
                              {{ item.price }}
                            </div>
                            <div class="right" v-if="item.price != item.market_price">
                              <small>￥</small>{{ item.market_price }}</div
                            >
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="cloud">
                      <div class="img"><img src="../../assets/images/cloud.png" /></div>
                      <h4>没有更多了</h4>
                    </div>
                  </div>
                  <span style="display: inline-block;width:100%;height: 3rem;background-color:#f5f5f5;padding:1.5rem 0;"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mt-popup
        v-model="popupSpecs"
        position="bottom"
        class="mint-popup-4 pcStyle_mint"
        closeOnClickModal="true"
      >
        <div class="specifications">
          <div class="icon_close" @click="popupSpecs = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <div class="shopimg">
            <div id="chooser_img">
              <img
                :src="
                  popThumb == null || popThumb == '' || popThumb == undefined
                    ? goodsInfo.thumb
                    : popThumb
                "
              />
            </div>
            <div class="right">
              <div class="price">
                ￥
                <span id="option_price">{{ popPrice }}</span>
                <span v-if="isRent">/天</span>
              </div>
              <div class="option">库存{{ popStock }}{{ goodsInfo.sku }}</div>
              <div class="option">{{ goodsDescription }}</div>
            </div>
          </div>

          <div class="shopinfo noVantRadio">
            <dl v-for="(specs,i) in goodsInfo.has_many_specs" :key='i'>
              <dt>{{ specs.title }}</dt>
              <dd>
                <van-radio-group
                  v-model="specs.description"
                  checked-color="#f15353"
                  @change="selectSpecs"
                >
                  <van-radio
                    :class="{ vantRadioshow: specs.description == specitem }"
                    :disabled="specitem.c"
                    v-for="(specitem,i) in specs.specitem"
                    :name="specitem" :key='i'
                  >
                    {{ specitem.title }}
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
          </div>
          <div v-if="!isRent">
            <van-row>
              <van-col :span="12" id="num">
                购买数量：
              </van-col>
              <van-col :span="11">
                <div class="num">
                  <div class="leftnav" @click="reduceGoods">-</div>
                  <!-- <input type="text" disabled=false class="shownum" v-model='goodsCount'> -->
                  <input
                    type="number"
                    class="shownum"
                    v-model.lazy="goodsCount"
                  />
                  <div class="rightnav" @click="addGoods">+</div>
                  <!-- <input type="number" class="shownum" v-model.lazy='goodsCount'> -->
                </div>
              </van-col>
            </van-row>
          </div>
          <van-button
            type="danger"
            size="small"
            id="btsmall"
            @click="submitAction"
            v-show="popStock>=1" >
            确认
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

      <mt-popup
        v-model="popupSpecs2"
        position="bottom"
        class="mint-popup-4 pcStyle_mint"
        closeOnClickModal="true"
      >
        <div class="specifications">
          <div class="shopimg">
            <div id="chooser_img">
              <img :src="popThumb" />
            </div>
            <div class="right">
              <div class="price">
                ￥
                <span id="option_price">{{ popPrice }}</span>
                <span v-if="isRent">/天</span>
              </div>
              <div class="option">库存{{ popStock }}{{ goodsInfo.sku }}</div>
              <div class="option">{{ goodsDescription }}</div>
            </div>
          </div>

          <div v-if="!isRent">
            <van-row>
              <van-col :span="12" id="num">
                购买数量：
              </van-col>
              <van-col :span="11">
                <div class="num">
                  <div class="leftnav" @click="reduceGoods">-</div>
                  <!-- <input type="text" disabled=false class="shownum" v-model='goodsCount'> -->
                  <input
                    type="number"
                    class="shownum"
                    v-model.lazy="goodsCount"
                  />
                  <div class="rightnav" @click="addGoods">+</div>
                  <!-- <input type="number" class="shownum" v-model.lazy='goodsCount' > -->
                </div>
              </van-col>
            </van-row>
          </div>
          <!-- 关闭图标 -->
          <div class="icon_close" @click="popupSpecs2 = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <!--  -->
          <van-button
            size="small"
            id="btsmall"
            type="danger"
            v-show="popStock>=1"
            @click="buyNowNew"
          >
            确认
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

      <mt-popup
        v-model="posterShow"
        closeOnClickModal="true"
        style="width:17.8125rem;height:34.5rem;padding:0;background:none;"
      >
        <div style="width:100%;height:100%;overflow:hidden;" class="code_box">
          <div style="width:100%;height:31.25rem;border-radius:0.375rem;">
            <img
              :src="'data:' + posterImg.mime + ';base64,' + posterImg.base64Image"
              v-if="posterImg.base64Image"
              style="width:100%;border-radius:0.375rem;"
            />
            <!-- <img
              src="../../assets/images/img_default.png"
              v-if="!posterImg.base64Image"
              style="width:100%;height:100%;object-fit: contain;border-radius:0.375rem;"
            /> -->
          </div>
          <!-- 关闭图标 -->
          <div class="icon_close" @click="posterShow = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <!--  -->
        </div>
      </mt-popup>
      <!-- 评价 -->
      <mt-popup
        v-model="popupVisible"
        position="right">

      </mt-popup>

      <yd-popup v-model="activityShow" position="bottom" height="60%">
        <yd-navbar
          title="活动"
          height="2.8125rem"
          fontsize="16px"
          color="#333"
          fixed
          class="pcStyle_ydT"
        >
          <span slot="right">
            <i
              class="iconfont icon-close11"
              style="color:#666;size:1.25rem;"
              @click="activityShow = false"
            ></i>
          </span>
        </yd-navbar>
        <div style="clear:both;margin-top:2.8125rem;" class="pcStyle_ydC">
          <yd-cell-group>

            <yd-cell-item v-for="(item,i) in activityArr" :key='i'>
              <div
                slot="left"
                style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;"
              >
                {{ item.name }}
              </div>
              <span slot="right" v-if="item.type == 'string'">{{
                item.value
              }}</span>
              <!-- <span slot="right" v-if="item.type == 'array'" v-for="value in item.value">{{value}}</span> -->
              <span slot="right" v-if="item.type == 'array'">
                <span>
                  <span v-for="(value,i) in item.value" :key='i'>{{ value }}<br /></span>
                </span>
              </span>
            </yd-cell-item>
          </yd-cell-group>
        </div>
      </yd-popup>
      <yd-popup v-model="showParameter" position="bottom" height="60%">
        <yd-navbar
          title="商品参数"
          height="2.8125rem"
          fontsize="16px"
          color="#333"
          fixed
          class="pcStyle_ydT"
        >
          <span slot="right">
            <i
              class="iconfont icon-close11"
              style="color:#666;size:1.25rem;"
              @click="showParameter = false"
            ></i>
          </span>
        </yd-navbar>
        <div style="clear:both;margin-top:2.8125rem;" class="pcStyle_ydC">
          <ul class="parameterClass">
            <li v-for="items in goodsInfo.has_many_params">
              <span class="leftb">{{items.title}}</span>
              <span class="rightb">{{items.value}}</span>
            </li>
            <p class="notext" v-if="fun.isTextEmpty(goodsInfo.has_many_params)">
              <br>抱歉，暂无该商品参数 ~
            </p>
          </ul>
        </div>
      </yd-popup>
      <yd-popup v-model="showComment" position="right" height="100%" width="100%">
        <yd-navbar title="全部评价" fixed>
          <span slot="left">
              <yd-navbar-back-icon @click.native="CloseComment"></yd-navbar-back-icon>
          </span>
        </yd-navbar>
        <!-- 商品评价 -->
        <c-commentlist v-on:clickMore="getCommentData" :list='third_content' :noMoreComment='noMoreComment' :isCup='isCup' v-if="showComment"></c-commentlist>
      </yd-popup>
      <div v-if="isCup">
        <div v-if="isRent">
          <div
            class="but"
            v-if="isRentBuyShow"
            @click="toRentBuy(goodsInfo.lease_toy.immed_goods_id)"
          >
            <button>立即<br />购买</button>
          </div>
        </div>
      </div>

      <div id="foot">
        <div
          class="addfav"
          :class="{ nocar: !isGoods }"
          type="info"
          v-if="!is_o2o"
        >
          <template v-if="!favorite">
            <!-- <i class="fa fa-star normal" @click="onFavorite(favorite)"></i> -->
            <ul>
              <li>
                <i
                  class="iconfont icon-goods_collect normal"
                  @click="onFavorite(favorite)"
                ></i>
              </li>
              <li>收藏</li>
            </ul>
          </template>
          <template v-if="favorite">
            <!-- <i class="fa fa-star active" @click="onFavorite(favorite)"></i> -->
            <ul>
              <li>
                <i
                  class="iconfont icon-collect-active active"
                  @click="onFavorite(favorite)"
                ></i>
              </li>
              <li>已收藏</li>
            </ul>
          </template>
        </div>

        <div class="cart-btn"><a :href="cservice"><span class="white">立即咨询</span></a></div>
        <div class="cart-btn">
          <span v-if="!isBuy" class="red" @click="buyNow">
            立即购买
          </span>
          <span v-if="isBuy && !isBegTime" class="red" @click="buyNow">立即购买</span>
          <div
            class="time"
            style="line-height: 1rem;"
            v-if="isBuy && isBegTime"
          >
            <div class="text" style="padding-top: 0.5rem;">距开始还剩</div>
            <yd-countdown slot="right" :time="begTimeStr" class="bottom_time">
              <em>{%d1} <em>{%d2}</em> </em>天
              <em
              >{%h1}
                <em>{%h2}</em>
              </em>
              <b>:</b>
              <em
              >{%m1}
                <em>{%m2}</em>
              </em>
              <b>:</b>
              <em
              >{%s1}
                <em>{%s2}</em>
              </em>
            </yd-countdown>
          </div>
        </div>

      </div>
      <div
        style="height: 0;"
        v-if="this.fun.isTextEmpty(goodsInfo.show_push) ? false : true"
      ></div>
      <div
        style="height: 3.125rem;"
        v-if="this.fun.isTextEmpty(goodsInfo.show_push)"
      ></div>
    </div>
  </transition>
</template>

<script>
import cart_good_controller from "./cart_good_controller";

export default cart_good_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/goods.scss";

.evaTop {
  padding: 0 0.75rem;
  height: 2.375rem;
  line-height: 2.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .evaTo {
    display: flex;
    align-items: center;
  }
}

.gray {
  font-size: 10px;
  color: #999999;
}

.hot-item {
  text-align: left;
  .title {
    font-size: 14px;
    line-height: 2.5rem;
  }
  .hot-money {
    display: flex;
    text-align: center;
    font-size: 10px;
    background-color: #fafafa;
    border-radius: 2.5px;
    padding: 1rem 0;
    margin-bottom: 0.7rem;
    div {
      flex: 1;
      p:first-child {
        margin-bottom: 0.8rem;
      }
    }
    .heng {
      text-decoration: line-through;
    }
    .hot-red {
      font-size: 18px;
      font-weight: bold;
      color: #e31717;
      word-break: break-all;
    }
  }
  .tips {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.7rem;
    p {
      margin-bottom: 0.5rem;
      width: 50%;
    }
    .icon-item {
      display: inline-block;
      background-color: #fc7e7e;
      border-radius: 50%;
      color: #ffffff;
      padding: 0.1rem 0.2rem;
    }
  }
}

.question-box {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0 0.8rem;
  div {
    margin-bottom: 0.8rem;
  }
  .question {
    background-color: rgba(253, 137, 0, 0.11);
    border-radius: 12px;
    color: #fd8900;
    font-size: 10px;
    display: inline-block;
    padding: 0.2rem 0.6rem;
  }
}

.take-item {
  display: flex;
  // padding: 0.5rem 0;
  margin-bottom: 0.8rem;
  box-shadow: 2px 2px 5px #b2b2b2;
  img {
    flex: 0 0 5rem;
    width: 5rem;
    height: 5rem;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.5rem;
  }
  .first {
    font-weight: bold;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .third {
    display: flex;
    margin-top: 0.5rem;
    i {
      color: #ed0606;
      margin-right: 0.3rem;
    }
    .button {
      flex: 1;
      display: flex;
      a {
        border-radius: 10px;
        border: solid 0.5px #feebeb;
        font-size: 10px;
        color: #999999;
        padding: 0.1rem 0.4rem;
      }
    }
  }
}

.cart-btn {
  flex: 3;
  .red,
  .white {
    padding: 0.5rem 2rem;
    border-radius: 20px;
    display: inline-block;
  }
  .red {
    background-color: #ed0606;
    color: #ffffff;
  }
  .white {
    border: 1px solid #ed0606;
    color: #ed0606;
  }
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
    font-weight: 400 !important;
  }
}

.pcStyle {
  #hoid {
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
  .pcStyle_activity {
    .yd-popup-show {
      width: 375px !important;
      right: 50%;
      margin-right: -187.5px;
    }
  }
  .pcStyle_mint {
    width: 375px !important;
    box-sizing: border-box !important;
    #chooser_img {
      width: 5.81rem !important;
    }
    .right {
      margin-left: 8rem !important;
    }
  }
  .pcStyle_width {
    width: 375px !important;
  }
  .banner_pcStyle {
    height: 375px !important;
  }
  .pcStyle_ydT {
    width: 375px;
    left: 50% !important;
    margin-left: -187.5px;
  }
  .pcStyle_ydC {
    width: 375px;
    margin: 0 auto;
  }
  #foot {
    width: 375px !important;
  }
}
.price-num1 {
  background: #f15353;
  color: white;
  padding: 0.2rem 0.5rem;

  border-top-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
