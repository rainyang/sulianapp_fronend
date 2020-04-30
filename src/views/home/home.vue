<template>
  <div id="all">
    <div class="cover">
      <div v-show="advertisement.rule===0&&advertisement.switch&&fullShow"
           class="fullScreen">
        <div class="full-image">
          <img :src="advertisement.image">
          <span class="close"><span class="skip">跳过</span>{{advertisement.time}}</span>
        </div>
      </div>
      <div class="mask"
           v-show="advertisement.Midswitch">
        <div class="mask-blank">
          <div class="pop"
               v-if="advertisement.Midrule===0&&advertisement.Midswitch&&popShow">
            <div class="pop-image">
              <img :src="advertisement.Midimage"
                   @click="turnTo">
              <div class="icon_close">
                <i class="iconfont icon-close11"
                   @click="closePop"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <mt-loadmore :top-method="loadTop"
                 topDropText='释放刷新'
                 ref="loadmore"
                 > -->
    <div :class="{ scroll: !search_show, 'fibben-scroll': search_show }"
         v-show="!fullShow">
      <c-title hide="true"
               text="home"
               :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>
      <header :class="{ amout }"
              v-if="isfollow">
        <!--用户进入商城，判断是否关注公众号-->
        <div class="attention">
          <img :src="follow_mode.logo" />
          <!--用户分享时显示用户头像，不是分享进入页面显示商城logo-->
          <div class="text">
            <p>
              来自<span>{{ follow_mode.text }}</span>的推荐
            </p>
            <!--用户分享时显示用户名；不是分享进入页面时，显示商城名-->
            <p>关注公众号，享专属服务</p>
          </div>
          <button><a :href="follow_mode.url"> 立即关注</a></button>
          <!--跳转至后台设置页面-->
        </div>
      </header>
      <div class="home"
           v-if="$store.state.temp.default">
        <div :class="{ search: 'ture', mout: amout, isfollow }"
             id="d1"
             :style="{width:(fun.getPhoneEnv() == 3?'375px':'100%')}">
          <div class="search-form-box"
               @click="tosearch">
            <i class="iconfont icon-sousuo1"></i>
            {{ $store.state.langService.language.langHome.search }}
          </div>
        </div>

        <!--区域分站开始-->

        <div id="home">
          <div class="banner">
            <c-myswipe :pagination-visible="true"
                       :slides="$store.state.temp.default.ads"
                       :repeating="true"
                       :auto="3000"
                       v-if="$store.state.temp.default"
                       :style="{height:(fun.getPhoneEnv() == 3?'9.875rem':'38vw')}">
              <div v-for="(slide, index) in $store.state.temp.default.ads"
                   :key="index"
                   @click="bannerClick(slide)"
                   :style="{height:(fun.getPhoneEnv() == 3?'9.875rem':'38vw')}">
                <img width="100%"
                     height="100%"
                     :src="slide.thumb" />
              </div>

              <div :style="{height:(fun.getPhoneEnv() == 3?'9.875rem':'38vw')}"
                   v-if="this.fun.isTextEmpty($store.state.temp.default.ads)">
                <img width="100%"
                     height="100%"
                     src="../../assets/images/loading.jpg" />
              </div>
            </c-myswipe>
          </div>
          <div style="clear:both;"></div>
          <div id="function-area">
            <div class="ment"
                 v-if="$store.state.temp.default">
              <c-ment :datas="fun.chunk($store.state.temp.default.category, 10)"></c-ment>
            </div>
          </div>
          <div id="goods-image"
               v-if="!this.fun.isTextEmpty($store.state.temp.default.advs)">
            <div class="top">
              <ul class="left">
                <li @click="gotoAdvs($store.state.temp.default.advs[0].link)">
                  <img :src="
                      $store.state.temp.default.advs[0]
                        ? $store.state.temp.default.advs[0].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>
              </ul>
              <ul class="right">
                <li @click="gotoAdvs($store.state.temp.default.advs[1].link)">
                  <img :src="
                      $store.state.temp.default.advs[1]
                        ? $store.state.temp.default.advs[1].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>

                <li @click="gotoAdvs($store.state.temp.default.advs[2].link)">
                  <img :src="
                      $store.state.temp.default.advs[2]
                        ? $store.state.temp.default.advs[2].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>
              </ul>
            </div>
            <div class="bottom_img">
              <!-- <ul v-if="$store.state.temp.default.advs.slice(2,6)">
                <li v-for="item in $store.state.temp.default.advs.slice(2,6)" ><img :src="item.img?item.img:require('../../assets/images/loading.jpg')"></li>
              </ul> -->

              <ul>
                <li @click="gotoAdvs($store.state.temp.default.advs[3].link)">
                  <img :src="
                      $store.state.temp.default.advs[3]
                        ? $store.state.temp.default.advs[3].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>

                <li @click="gotoAdvs($store.state.temp.default.advs[4].link)">
                  <img :src="
                      $store.state.temp.default.advs[4]
                        ? $store.state.temp.default.advs[4].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>

                <li @click="gotoAdvs($store.state.temp.default.advs[5].link)">
                  <img :src="
                      $store.state.temp.default.advs[5]
                        ? $store.state.temp.default.advs[5].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>

                <li @click="gotoAdvs($store.state.temp.default.advs[6].link)">
                  <img :src="
                      $store.state.temp.default.advs[6]
                        ? $store.state.temp.default.advs[6].img
                        : require('../../assets/images/loading.jpg')
                    "
                       alt=""
                       style="width:100%;height:100%;" />
                </li>
              </ul>
            </div>
          </div>
          <div id="brand-box"
               v-if="!this.fun.isTextEmpty($store.state.temp.default.brand)">
            <div class="title">
              <!-- <yd-icon class="icon-member-logo" custom size="24px" color="#ff9800"></yd-icon> -->
              <div class="img">
                <img src="../../assets/images/member-logo.png" />
              </div>
              <h1>品牌优选</h1>
            </div>
            <ul>
              <li v-for="(item,i) in $store.state.temp.default.brand"
			  :key='i'
                  @click="gotoBrand(item)">
                <div class="img"><img :src="item.logo" /></div>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>

          <div id="limit-time"
               v-if="!this.fun.isTextEmpty($store.state.temp.default.time_goods)">
            <div class="title-box">
              <ul>
                <li class="main-title">
                  <!-- <yd-icon class="icon-member-time1" custom size="24px" color="#f96587"></yd-icon> -->
                  <div class="img">
                    <img src="../../assets/images/member-time03.png" />
                  </div>
                  <h2>限时优惠</h2>
                </li>
                <li class="vice-title">用最低价格买好物</li>
              </ul>
            </div>
            <div class="goods-box">
              <div class="goods"
                   v-for="(item,i) in $store.state.temp.default.time_goods"
				   :key='i'
                   @click="gotoTimeGood(item.id)">
                <div class="left">
                  <img :src="item.thumb"
                       style="width:100%;height:100%;" />
                </div>

                <ul>
                  <li class="title">
                    <h3>{{ item.title }}</h3>
                  </li>
                  <li class="price">
                    限时价：￥<span>{{ item.vip_level_status&&item.vip_level_status.status==1?item.vip_level_status.word:item.price }}</span>
                    <font>￥{{ item.market_price }}</font>
                  </li>
                  <li class="time">
                    <yd-icon class="icon-member-time"
                             custom
                             size="1.625rem"
                             color="#f96587"></yd-icon>
                    <!-- <span>还剩2天20:00:59</span> -->
                    <yd-countdown slot="right"
                                  :time="item.has_one_goods_limit_buy.end_time"
                                  class="bottom_time">
                      <em style="padding:0.125rem;border-radius:0.125rem;">{%d}</em
                      >天
                      <em style="padding:0.125rem;border-radius:0.125rem;"
                        >{%h}</em
                      ><b>:</b>
                      <em style="padding:0.125rem;border-radius:0.125rem;"
                        >{%m}</em
                      ><b>:</b>
                      <em style="padding:0.125rem;border-radius:0.125rem;"
                        >{%s}</em
                      >
                    </yd-countdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            id="pop-recommend"
            v-if="!this.fun.isTextEmpty($store.state.temp.default.goods)"
          >
            <div class="title-box">
              <ul>
                <li class="main-title">
                  <div class="img">
                    <img src="../../assets/images/member-hot.png" />
                  </div>
                  <h2>人气推荐</h2>
                </li>
                <li class="vice-title">精选最适合您的商品</li>
              </ul>
            </div>

            <div class="goodsList" v-if="$store.state.temp.default && $store.state.temp.default.goods">
              <c-goodsList
                :goods="$store.state.temp.default.goods.data"
                :last_page="$store.state.temp.default.goods.last_page"
                :isDefault="1"
                text="推荐商品"
              ></c-goodsList>
            </div>
          </div>
        </div>

        <!--区域分站结束-->
      </div>

      <div class="temp" v-if="$store.state.temp.item">
        <div
          class="search_nav"
          v-if="sliderNav.isshow ? sliderNav.isshow : false"
          :style="{
            width: fun.getPhoneEnv() == 3 ? '375px':'',
            'background-color': sliderNav.params.bgcolor,
            opacity: sliderNav.params.bgalpha,
            border:
              sliderNav.params.showborder == 1
                ? '1px solid' + sliderNav.params.bordercolor
                : 'none',
            top:isfollow?`2.75rem`:`0px`
          }"
        >
          <div class="search_box3" @click="tosearch">
            <input
              type="text"
              title="搜索"
              readonly="readonly"
              :placeholder="sliderNav.params.searchword"
            />
            <i class="iconfont icon-sousuo1"></i>
            <!--<span>搜索</span>-->
          </div>
          <div class="nav_box" style="height:2.75rem">
            <ul class="nav">
              <li v-for="(item,i) in sliderNav.menus" @click="gotoAdvs(item.url)"
			  :key='i'>
                <span :style="{ color: sliderNav.params.textcolor }">
                  {{ item.title }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div
          style="height:5.5rem;"
          v-if="sliderNav.isshow ? sliderNav.isshow : false"
        ></div>
        <div class="home" v-if="$store.state.temp.item.pageinfo">
          <template v-if="$store.state.temp.item.pageinfo.temp == 'topbar'">
            <!-- 浮动按钮 -->
            <div
              class="fe-floatico"
              v-if="$store.state.temp.item.pageinfo.params.floatico == 1"
              :style="{
                position: 'fixed',
                width: $store.state.temp.item.pageinfo.params.floatwidth,
                top: $store.state.temp.item.pageinfo.params.floattop
              }"
              :class="{
                'fe-floatico-right':
                  $store.state.temp.item.pageinfo.params.floatstyle == 'right'
              }"
            >
              <a v-if="isMiniApp" @click="this.fun.gotoMiniAppCs">
                <img
                  :src="$store.state.temp.item.pageinfo.params.floatimg"
                  style="height:100%; width: 100%;"
              /></a>
              <a
                v-if="!isMiniApp"
                :href="$store.state.temp.item.pageinfo.params.floathref"
                ><img :src="$store.state.temp.item.pageinfo.params.floatimg"
                  style="height:100%; width: 100%;"
              /></a>
            </div>
          </template>
          <div class="home" v-if="$store.state.temp.item.data && !isInDiy">
            <template v-for="(item, index) in $store.state.temp.item.data">
              <component :is="item.temp" :datas="item" :home="true" :index="index" :all="$store.state.temp.item.data.length">
              </component>
            </template>
            <div style="height: 3.3125rem;"></div>
          </div>
        </div>
      </div>
      <mt-popup
        v-model="search_show"
        popup-transition="fade"
        position="right"
        style="width:100%;height:100%;z-index:10000;background-color:#f5f5f5;"
      >
        <mt-header
          fixed
          title="选择区域"
          style="background:#fff;color:#333;border-bottom:0.0625rem solid #e8e8e8;"
        >
          <mt-button
            icon="back"
            @click="search_show = false"
            slot="left"
          ></mt-button>
        </mt-header>
        <div style="height:2.875rem;clear:both;"></div>

        <div id="popup">
          <!-- <div id="search-box">
            <div id="search">
              <yd-icon class="iconfont icon-sousuo1" custom size="16px" color="#999"></yd-icon>
              <input type="text" placeholder="请输入城市名">
            </div>
          </div> -->
          <div class="current-area">
            当前区域：{{ currentCity }}-{{ currentZone }}
          </div>
          <h1>已开放城市</h1>
          <div class="city-list">
            <div class="current-city">
              <div v-for="(item, index) in province" :key='index'>
                <div class="tbs" @click.stop="toggle($event, index)">
                  <div class="li2">
                    <div class="icon">
                      <yd-icon
                        class="iconfont icon-icon_location"
                        custom
                        size="1rem"
                        color="#ff9800"
                      ></yd-icon>
                    </div>
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div class="li4">
                    <span>选择城市</span>
                    <i
                      class="fa"
                      :class="{
                        'fa-angle-down': sort == index,
                        'fa-angle-right': sort != index
                      }"
                    ></i>
                  </div>
                </div>
                <transition name="fade">
                  <div class="tbs3" v-show="sort == index">
                    <div
                      v-for="(val, i) in item.item"
					  :key='i'
                      style="line-height:1.875rem;border-bottom:0.0625rem;"
                    >
                      <div class="tbs1" @click.stop="toggle1($event, i)">
                        <div class="li2">
                          <!-- <div class="icon"><yd-icon class="iconfont icon-icon_location" custom size="16px" color="#ff9800"></yd-icon></div> -->
                          <div class="name">
                            <span>{{ val.name }}</span>
                          </div>
                        </div>
                        <div class="li4">
                          <i
                            class="fa"
                            :class="{
                              'fa-angle-down': sort1 == i,
                              'fa-angle-right': sort1 != i
                            }"
                          ></i>
                        </div>
                      </div>
                      <transition name="fade">
                        <div class="tbs3-1" v-show="sort1 == i">
                          <!-- <button type="button">白云区</button>-->
                          <button
                            type="button"
                            v-for="(val1,i) in val.district"
							:key='i'
                            @click.prevent="zoneSearch(val.name, val1.name)"
                          >
                            {{ val1.name }}
                          </button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
    <!--</mt-loadmore>-->
  </div>
</template>

<script>
import home from "./home_controller";

export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/index.scss"; //弹窗样式
#popup {
  overflow: auto;
  height: 43rem;
  background-color: #f5f5f5;
  text-align: left;
  #search-box {
    background-color: #fff;
    height: 2.8125rem;
    padding: 0 0.875rem;
    margin-bottom: 0.625rem;
    padding-top: 0.5625rem;
    #search {
      display: flex;
      border: solid 0.0625rem #ebebeb;
      height: 1.75rem;
      line-height: 1.75rem;
      border-radius: 0.875rem;
      padding: 0 0.625rem;
      background-color: #fafafa;
    }
    input {
      line-height: 1.75rem;
      border: none;
      color: #333;
      margin-left: 0.375rem;
    }
  }
  .current-area {
    background-color: #fff;
    line-height: 2.8125rem;
    padding: 0 0.875rem;
    color: #333;
    font-size: 14px;
  }
  h1 {
    line-height: 1.875rem;
    padding: 0 0.875rem;
    color: #999;
  }
  .city-list {
    position: relative;
    .left,
    .other-area {
      i {
        position: absolute;
        left: 0.875rem;
      }
    }
    .current-city {
      background-color: #fafafa;
      .level-pro {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        line-height: 2.5rem;
        padding: 0 0.875rem 0 2.25rem;
        font-size: 14px;
        color: #333;
        border-bottom: solid 0.0625rem #ebebeb;
        .right {
          span {
            color: #999;
          }
          i {
            color: #999;
            font-size: 18px;
            margin-left: 0.375rem;
          }
        }
      }
      .level-city {
        display: flex;
        justify-content: space-between;
        background-color: #fafafa;
        line-height: 2.5rem;
        padding: 0 0.875rem 0 2.25rem;
        font-size: 14px;
        border-bottom: solid 0.0625rem #ebebeb;
        i {
          color: #999;
          font-size: 1.125rem;
        }
      }
      .level-area {
        padding: 0.625rem 0.875rem 1.25rem 0.875rem;
        border-bottom: solid 0.0625rem #ebebeb;
        button {
          width: 32%;
          margin-right: 1%;
          height: 1.875rem;
          border: solid 0.0625rem #ebebeb;
          border-radius: 0.25rem;
          margin-top: 0.75rem;
          background-color: #fff;
        }
        button:nth-child(3n) {
          margin: 0;
        }
      }
    }
    .other-area {
      background-color: #fff;
      line-height: 2.5rem;
      border-bottom: solid 0.0625rem #ebebeb;
      padding: 0 0.875rem 0 2.25rem;
      font-size: 14px;
    }
  }
  .tbs {
    position: relative;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: #e8e8e8 0.0625rem solid;
    height: 2.8125rem;
    line-height: 2.8125rem;
    float: left;
    width: 100%;
    font-size: 14px;
    padding: 0 0.875rem;
    .left {
      font-size: 12px;
      box-sizing: border-box;
      width: 50%;
      text-align: left;
      height: 2.8125rem;
      line-height: 2.8125rem;
      float: left;
      img {
        width: 30%;
        float: left;
      }
    }
    .right {
      width: 50%;
      text-align: right;
    }
    a {
      color: #000;
    }
    .relation {
      color: #666;
    }
    .id,
    .level {
      font-size: 14px;
      line-height: 2.8125rem;
    }
    .fa.fa-search {
      color: #999;
      font-size: 1.25rem;
    }
    i {
      font-size: 1.5rem;
    }
    .img {
      margin: 0.625rem 0;
    }
    .li1 {
      width: 3.125rem;
      height: 3.125rem; // margin-top:10px;
      // margin-left:10px;
      float: left;
      line-height: 3.125rem;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li2 {
      width: 50%;
      display: flex;
      float: left;
      position: relative;
      p {
        margin-top: 0.4375rem;
        margin-left: 0.625rem;
        text-align: left;
      }
      .name {
        position: absolute;
        left: 1.625rem;
      }
    }
    .li3 {
      flex: 30%;
      width: 30%;
      span {
        border: #b1a6a6 solid 0.0625rem;
        padding: 0.3125rem 1.25rem;
        border-radius: 0.4375rem;
        display: none;
      }
    }
    .li4 {
      // flex: 5%;
      // width: 5%;
      float: right;
      text-align: right;
      i {
        color: #999;
        font-size: 1.125rem;
      }
      span {
        color: #999;
        margin-right: 0.375rem;
      }
    }
  }
  .tbs3 {
    .left {
      width: 46%;
      text-align: left;
      height: 2.8125rem;
      display: inline-block;
      line-height: 2.8125rem;
      img {
        width: 30%;
      }
    }
    .left1 {
      width: 100%;
      text-align: left;
      height: 2.8125rem;
      padding-left: 0.8125rem;
      display: inline-block;
      line-height: 2.8125rem;
      img {
        width: 30%;
      }
    }
    .right {
      width: 46%;
      display: inline-block;
      text-align: right;
      height: 2.8125rem;
      line-height: 2.8125rem;
    }
  }
  .tbs1 {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: #e8e8e8 0.0625rem solid;
    padding: 0rem 0.875rem;
    float: left;
    width: 100%;
    background: #fafafa;
    line-height: 2.8125rem;
    font-size: 14px;
    .left {
      font-size: 12px;
      box-sizing: border-box;
      width: 50%;
      text-align: left;
      height: 2.8125rem;
      line-height: 2.8125rem;
      float: left;
      img {
        width: 30%;
        float: left;
      }
    }
    .right {
      width: 50%;
      text-align: right;
    }
    a {
      color: #000;
    }
    .relation {
      color: #666;
    }
    .id,
    .level {
      font-size: 14px;
      line-height: 2.8125rem;
    }
    .fa.fa-search {
      color: #999;
      font-size: 1.25rem;
    }
    i {
      font-size: 1.5rem;
    }
    .img {
      margin: 0.625rem 0;
    }
    .li1 {
      width: 3.125rem;
      height: 3.125rem; // margin-top:10px;
      // margin-left:10px;
      float: left;
      line-height: 3.125rem;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li2 {
      width: 50%;
      display: flex;
      float: left;
      position: relative;
      p {
        margin-top: 0.4375rem;
        margin-left: 0.625rem;
        text-align: left;
      }
      .name {
        position: absolute;
        left: 1.625rem;
      }
    }
    .li3 {
      flex: 30%;
      width: 30%;
      span {
        border: #b1a6a6 solid 0.0625rem;
        padding: 0.3125rem 1.25rem;
        border-radius: 0.4375rem;
        display: none;
      }
    }
    .li4 {
      // flex: 5%;
      // width: 5%;
      float: right;
      text-align: right;
      i {
        color: #999;
        font-size: 1.125rem;
      }
    }
  }
  .tbs3-1 {
    padding: 0 0.875rem 1.25rem 0.875rem;
    border-bottom: solid 0.0625rem #ebebeb;
    .left {
      width: 46%;
      text-align: left;
      height: 2.8125rem;
      display: inline-block;
      line-height: 2.8125rem;
      img {
        width: 30%;
      }
    }
    .left1 {
      width: 100%;
      text-align: left;
      height: 2.8125rem;
      padding-left: 0.8125rem;
      display: inline-block;
      line-height: 2.8125rem;
      img {
        width: 30%;
      }
    }
    .right {
      width: 46%;
      display: inline-block;
      text-align: right;
      height: 2.8125rem;
      line-height: 2.8125rem;
    }
    button {
      width: 32%;
      margin-right: 1%;
      height: 1.875rem;
      border: none;
      border-radius: 0.25rem;
      margin-top: 0.75rem;
      background-color: #ebebeb;
      color: #333;
    }
    button:nth-child(3n) {
      margin: 0;
    }
  }
}

.scroll {
  position: static;
}

.fibben-scroll {
  position: fixed;
  z-index: 2001;
}
.cover .fullScreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.cover .fullScreen .full-image {
  position: relative;
  width: 100%;
  height: 100%;
}
.cover .fullScreen .full-image img {
  width: 100%;
  height: 100%;
}
.cover .fullScreen .full-image .close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #fff;
  font-size: 16px;
}
.cover .fullScreen .full-image .close .skip {
  margin-right: 0.5rem;
}
.cover .mask-blank .pop {
  width: 65%;
  position: fixed;
  z-index: 8888;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.cover .mask-blank .pop .pop-image {
  position: relative;
}
.cover .mask-blank .pop .pop-image img {
  width: 100%;
  height: 100%;
}
.cover .mask-blank .pop .pop-image .icon_close {
  top: 0;
  right: 0;
  position: absolute;
  background-color: #333;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -0.75rem;
  margin-right: -0.75rem;
  border-radius: 50%;
}
.cover .mask-blank .pop .pop-image .icon_close {
  color: #fff;
}
</style>
