<template>
  <div
    id="hotel_goods"
    v-show="showGood"
    :class="[this.fun.getPhoneEnv() == 3 ? 'pcStyle' : '']"
  >
    <c-title :hide="false" :text="PageNameList.goods_details"></c-title>
    <div id="content">
      <div class="scroll_banner" v-if="goods_info.thumb_url">
        <viewer :images="goods_info.thumb_url">
          <img
            :src="goods_info.thumb"
            v-if="
              !goods_info.thumb_url ||
                goods_info.thumb_url == null ||
                goods_info.thumb_url == ''
            "
          />
          <van-swipe
            :autoplay="3000"
            style="width:100%;height:100%"
            :width="fun.getPhoneEnv() == 3 ? 375 : clientWidths"
          >
            <van-swipe-item
              v-for="(image, index) in goods_info.thumb_url"
              :key="index"
            >
              <img :src="image" />
            </van-swipe-item>
          </van-swipe>
        </viewer>
      </div>
      <div class="banner_top">
        <div id="hoid" @click="goBack">
          <div id="back">
            <i class="mintui mintui-back"></i>
          </div>
        </div>
        <div id="cart" @click="gotoHome">
          <div id="back">
            <i class="iconfont icon-ai-home"></i>
          </div>
        </div>
        <div id="member" @click="gotoMember">
          <div id="back">
            <i class="iconfont icon-wode-wode"></i>
          </div>
        </div>
      </div>
      <div class="info_a">
        <div class="title-box">
          <h1 style=" -webkit-box-orient: vertical;">
            {{ goods_info.title | escapeTitle }}
          </h1>
          <i class="iconfont icon-erweima" @click="postShow"></i>
          <i class="iconfont icon-fenxiang" @click="shareWeixin"></i>
        </div>
        <ul class="price">
          <li>
            <span
              >¥<font>{{ goods_info.price }}</font></span
            >房价以当天价格为准
          </li>
        </ul>
      </div>
      <ul class="info_b">
        <li>
          <i class="iconfont icon-service_l"></i>
          <span>{{ hotel_info.hotel_name }}</span>
        </li>
        <li>
          <i class="iconfont icon-service_m"></i>
          <span
            >联系{{ PageNameList.hotels }}:{{ hotel_info.hotel_mobile }}</span
          >
        </li>
      </ul>
      <div class="act-box">
        <div>
          <ul class="coupon" @click="gotoCoupon">
            <li class="">领券</li>
            <li>
              <span>优惠券</span>
            </li>
            <i class="fa fa-angle-right"></i>
          </ul>
        </div>
      </div>
      <div class="info_c">
        <yd-tab :callback="itemClick">
          <yd-tab-panel :label="PageNameList.goods_presentation">
            <div v-html="goods_info.content"></div>
          </yd-tab-panel>
          <yd-tab-panel :label="PageNameList.goods_parameters" v-if="goods_info.has_many_params">
            <div class="parameter"
                 v-for="(item,i) in goods_info.has_many_params" :key='i'>
              <div class="par-info">
                <span class="name">{{ item.title }}</span>
                <span class="value">{{ item.value }}</span>
              </div>
            </div>
          </yd-tab-panel>
          <yd-tab-panel :label="PageNameList.user_evaluation">
            <div style="margin-bottom: 3.125rem;">
              <div class="pj" v-for="(n, i) in comment_data" :key="i">
                <div layout="row" layout-align="start center" id="user">
                  <div>
                    <img :src="n.head_img_url" />
                  </div>
                  <div>{{ n.nick_name }}</div>
                  <div>{{ n.created_at }}</div>
                </div>
                <div style="width: 100%;text-align: left;">
                  <van-rate v-model="n.level"
                            style="text-align:left;"
                            disabled-color="#ff9900"
                            disabled />
                </div>
                <!--<el-rate v-model="n.level" disabled show-text text-color="#ff9900" text-template="{value}">-->
                <!--</el-rate>-->
                <p>{{ n.content }}</p>
                <div style="text-align:left;margin:5px 0;" v-show="n.images.length > 0">
                  <div style="margin-left:.5rem;">晒图：</div>
                  <viewer :images="n.images">
                    <img :src="item"
                         v-for="(item, index) in n.images"
                         style="width:5rem!important;height:5rem!important;margin-left:.5rem;display:inline-block;"
                         alt=""
                         :key="index" />
                  </viewer>
                </div>
                <div v-if="n.append">
                  <p class="last_day">
                    追评
                    <span>{{ n.append.created_at }}</span>
                  </p>
                  <p class="">{{ n.append.content }}</p>
                </div>
                <div class="comment">
                  <span @click="toContentInfo(n)"
                    >评论数:{{ n.reply_count }}</span
                  >
                </div>
              </div>
            </div>
          </yd-tab-panel>
        </yd-tab>
      </div>
      <!-- 底部菜单 -->
      <div
        class="goods_foot"
        :style="{ width: this.fun.getPhoneEnv() == 3 ? '375px' : '' }"
      >
        <ul class="foot_a">
          <li>
            <i
              class="iconfont icon-collect-active"
              @click="onFavorite(favorite)"
              v-if="favorite"
            ></i>
            <i
              class="iconfont icon-goods_collect"
              @click="onFavorite(favorite)"
              v-if="!favorite"
            ></i>
            <span>{{ favorite ? "已收藏" : "未收藏" }}</span>
          </li>
          <!-- <li v-if="false">
                        <i class="iconfont icon-collect-active"></i>
                        <span>已收藏</span>
                    </li> -->
        </ul>
        <ul class="foot_a">
          <li>
            <i class="iconfont icon-goods_kefu" @click="gotoService"></i>
            <span>客服</span>
          </li>
        </ul>
        <button type="button" @click="order">立即预定</button>
      </div>
    </div>
    <mt-popup
      v-model="posterShow"
      closeOnClickModal="true"
      style="width:17.8125rem;height:34.5rem;padding:0;background:none;"
    >
      <div style="width:100%;height:100%;overflow:hidden;border-radius:0.375rem;" class="code_box">
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
  </div>
</template>

<script>
import controller from "./hotel_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#hotel_goods {
  padding-top: 40px;
  padding-bottom: 60px;
  #content {
    position: relative;
    .scroll_banner {
      background: #f8f8f8;
      overflow: hidden;
      height: 12.5rem;
      img {
        width: 100%;
      }
    }
    .banner_top {
      position: absolute;
      top: 0;
      #hoid {
        padding: 0.3125rem;
        width: 1.6rem;
        position: fixed;
        z-index: 2;
      }
      #cart {
        padding: 0.3125rem;
        width: 1.6rem;
        position: fixed;
        z-index: 2;
        box-sizing: content-box;
      }
      #member {
        padding: 0.3125rem;
        width: 1.6rem;
        position: fixed;
        z-index: 2;
        box-sizing: content-box;
      }
      #cart {
        right: 0;
      }
      #member {
        right: 2rem;
      }
      #hoid.hoet {
        transition: 0.1s;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
      }
      #back {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 100%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        text-indent: 0rem;
        line-height: 1.7rem;
        overflow: hidden;
      }
    }
    .info_a {
      background: #fff;
      padding: 0.625rem 0.875rem;
      .title-box {
        display: flex;
        h1 {
          flex: 3;
          text-align: left;
          color: #333;
          font-size: 16px;
          font-weight: normal;
          line-height: 1.5rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-weight: bold;
        }
        i {
          font-size: 1.125rem;
          color: #666;
          margin-left: 1rem;
          line-height: 1.5rem;
        }
      }
      .price {
        li {
          font-size: 14px;
          color: #8c8c8c;
          text-align: left;
          line-height: 1.875rem;
          margin-top: 0.625rem;
          span {
            color: #f15353;
            margin-right: 0.625rem;
            font-weight: bold;
            font {
              font-size: 20px;
            }
          }
        }
      }
    }
    .info_b {
      background: #fff;
      padding-left: 0.875rem;
      margin-top: 0.625rem;
      li {
        height: 2.75rem;
        line-height: 2.75rem;
        border-bottom: solid 0.0625rem #ebebeb;
        padding-right: 0.875rem;
        display: flex;
        i {
          font-size: 1.5rem;
          color: #666;
          margin-right: 0.625rem;
        }
        span {
          font-size: 16px;
        }
      }
      li:last-child {
        border: none;
      }
    }
    .act-box {
      font-size: 14px;
      background-color: #fff;
      margin-top: 0.625rem;
      color: #333;
      ul:first-child,
      ul:nth-child(2) {
        border-bottom: solid 0.0625rem #e2e2e2;
      }
      .coupon,
      .vip,
      .act {
        height: 2.75rem;
        padding-right: 0.75rem;
        margin-left: 0.75rem;
        line-height: 2.75rem;

        li {
          float: left;
          height: 2.75rem;
          text-align: left;
        }

        i {
          text-align: right;
          float: right;
          line-height: 2.75rem;
          font-size: 20px;
          color: #c9c9c9;
          margin-left: 0.375rem;
        }
      }
      .coupon li:first-child {
        margin-right: 1.25rem;
      }
      .coupon li:nth-child(2),
      .coupon li:nth-child(3) {
        span {
          background-color: #f15353;
          color: #fff;
          padding: 0.125rem 0.625rem;
          border-radius: 0.1875rem;
          font-size: 12px;
          margin-right: 0.625rem;
          border: solid 0.0625rem #f15353;
        }
      }
      .coupon li:nth-child(4) {
        position: absolute;
        right: 1.875rem;
        color: #8c8c8c;
        font-size: 12px;
      }
    }
    .info_c {
      margin-top: 0.625rem;
      .parameter {
        //height: 100%;
        background: #fff;
        padding: 0.625rem 0.625rem 0 0.625rem;
        text-align: left;
        font-size: 14px;
        display: flex;
        .par-info {
          display: flex;
          width: 100%;
          padding-bottom: 0.625rem;
          border-bottom: 0.0625rem solid #f1f1f1;
          .name {
            color: #999;
            width: 25%;
            padding-right: 0.625rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .value {
            color: #333;
            width: 75%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .pj {
        background: #fff;
        padding: 0 0.625rem 2.5rem;
        margin-bottom: 0.3125rem;
        .el-rate {
          text-align: left;
          margin-bottom: 0.625rem;
        }
        .el-rate__item i.el-rate__icon.el-icon-star-on {
          font-size: 14px;
          margin-right: 0.375rem;
        }
        p {
          text-align: left;
          margin: 0;
          padding-bottom: 0.625rem;
        }
        img {
          width: 100%;
        }
        .last_day {
          color: #f15335;
          font-size: 8px;
          padding-top: 1.25rem;
          span {
            float: right;
            color: #908a8a;
            padding-right: 0.3125rem;
          }
        }
        .comment > span {
          display: block;
          width: 4.6875rem;
          height: 1.125rem;
          line-height: 1.125rem;
          border-radius: 0.5rem;
          border: 0.0625rem solid #aaa;
          color: #666;
          float: right;
          font-size: 14px;
        }
      }
    }
    .goods_foot {
      background: #fff;
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 3.0625rem;
      .foot_a {
        width: 25%;
        li {
          // padding: 0.25rem 0;
          border-top: solid 0.0625rem #ebebeb;
          i {
            font-size: 1.375rem;
            color: #666;
          }
          .icon-collect-active {
            color: #f7ba2a;
          }
          span {
            display: block;
            font-size: 12px;
            color: #666;
          }
        }
      }
      button {
        width: 50%;
        background: #f15353;
        color: #fff;
        font-size: 16px;
        border: none;
      }
    }
  }
}
.code_box {
  position: relative;

  .icon_close {
    position: absolute;
    bottom: 0px;
    right: 50%;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: -1.25rem;
    border: 1px solid #fff;
    border-radius: 100%;
    i {
      line-height: 2.5rem;
      font-size: 1.125rem;
      color: #fff;
    }
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
}
</style>
