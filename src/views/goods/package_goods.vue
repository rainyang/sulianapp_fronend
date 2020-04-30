<template>
  <div id="package_goods">
    <c-title :hide="false" :text="packageTitle"></c-title>
    <div id="content">
      <div class="content_a">
        <div class="banner">
          <van-swipe
            :autoplay="3000"
            indicator-color="white"
            :width="fun.getPhoneEnv() == 3 ? 375 : clientWidths"
          >
            <van-swipe-item v-for="(item, index) in carousels" :key="index">
              <a :href="item.carousel_link">
                <img :src="item.carousel_thumb" alt="" />
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="rob-time" v-if="limit_time_status">
          <div class="img">
            <img src="../../assets/images/rob-time.png" width="16%;" />
          </div>
          <ul class="price">
            <li class="text">
              <span>限时<br />购买</span>
            </li>
            <!-- <li class="none-line"><small>￥</small><b>3.2</b>&nbsp;/天</li>
                        <li class="middle-line"><small>￥</small><b>3.2</b>&nbsp;/天</li> -->
          </ul>
          <div class="time">
            <span class="text">截至倒计时：</span>
            <yd-countdown
              slot="right"
              :time="endTimeStr"
              class="bottom_time"
              :callback="salePriceTime"
            >
              <em style="padding:0.125rem;border-radius:0.125rem;"
                >{%d1} <em>{%d2}</em> </em
              >天
              <em style="padding:0.125rem;border-radius:0.125rem;"
                >{%h1}
                <em>{%h2}</em>
              </em>
              <b>:</b>
              <em style="padding:0.125rem;border-radius:0.125rem;"
                >{%m1}
                <em>{%m2}</em>
              </em>
              <b>:</b>
              <em style="padding:0.125rem;border-radius:0.125rem;"
                >{%s1}
                <em>{%s2}</em>
              </em>
            </yd-countdown>
          </div>
        </div>
        <h1>{{ packageTitle }}</h1>
      </div>
      <div class="content_b">
        <div class="user">
          <div class="header">
            <img :src="description_thumb" />
          </div>
          <h2>{{ description_title }}</h2>
        </div>
        <p class="detail">
          {{ description_desc }}
        </p>
      </div>
      <!-- 上边固定导航 -->
      <div class="content_nav" style="height: 44px;">
        <van-tabs
          id="categoryhei"
          :class="{ show: vanShow }"
          v-model="category_idex"
          @click="categoriesbtn"
          :style="{ width: this.fun.getPhoneEnv() == 3 ? '375px' : '' }"
        >
          <van-tab
            v-for="(item, i) in categories"
            :key="i"
            :title="item.category_names"
          ></van-tab>
        </van-tabs>
      </div>
      <!-- 现代简约 -->
      <template v-for="(cateitem, cateidex) in categories">
        <div :id="'cate_' + cateidex" class="content_c">
          <h3>
            <div class="line-left"></div>
            {{ cateitem.category_names }}
            <div class="line_right"></div>
          </h3>
          <div class="c_box">
            <div
              class="goods_box"
              v-for="(goodsitem, goodsidex) in cateitem.goods_list"
              :key="goodsidex"
            >
              <div class="select">
                <van-checkbox v-model="goodsitem.checked" @change="categydbtn"
                  >&nbsp</van-checkbox
                >
              </div>
              <div class="goods_info">
                <div class="info_a">
                  <div class="img" @click="gogoodsDetailBtn(goodsitem.id)">
                    <img
                      :src="
                        goodsitem.popThumb
                          ? goodsitem.popThumb
                          : goodsitem.thumb
                      "
                    />
                  </div>
                  <ul class="info">
                    <li class="name" style="-webkit-box-orient:vertical;">
                      {{ goodsitem.title }}
                    </li>
                    <li class="price">
                      <span class="left"
                        ><font>¥</font>{{ goodsitem.popPrice }}</span
                      ><span class="right">¥{{ goodsitem.market_price }}</span>
                    </li>
                    <li class="member">
                      <span>数量</span
                      ><van-stepper
                        v-model="goodsitem.goodsnum"
                        :max="goodsitem.popStock"
                        @change="addnum"
                        @blur="addnum"
                      />
                    </li>
                  </ul>
                </div>
                <template
                  v-if="goodsitem.has_option == 1"
                  v-for="(specsitem, specsidex) in goodsitem.has_many_specs"
                >
                  <div class="spe_a">
                    <h4>{{ specsitem.title }}</h4>
                    <div class="spe_box">
                      <span
                        :data-specid="specdataitem.id"
                        v-for="(specdataitem, speidex) in specsitem.specitem"
                        @click="secbtn($event, specdataitem)"
                        :data-cateidex="cateidex"
                        :data-goodsidex="goodsidex"
                        :data-specsidex="specsidex"
                        :class="{
                          cur: specdataitem.id == specsitem.speshow,
                          disspec: specdataitem.dispec
                        }"
                        :key="speidex"
                        >{{ specdataitem.title }}</span
                      >
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 黑科技 -->
      <!--<div id="cate_1" class="content_c">-->
      <!--<h3><div class="line-left"></div>黑科技风<div class="line_right"></div></h3>-->
      <!--<div class="c_box">-->
      <!--<div class="goods_box">-->
      <!--<div class="select">-->
      <!--<el-checkbox >&nbsp;</el-checkbox>-->
      <!--</div>-->
      <!--<div class="goods_info">-->
      <!--<div class="info_a">-->
      <!--<div class="img">-->
      <!--<img src="../../assets/images/photo-mr.jpg">-->
      <!--</div>-->
      <!--<ul class="info">-->
      <!--<li class="name" style="-webkit-box-orient:vertical;"> B.FRIENDit 巧克力键盘 超薄静音有线键盘usb台式电脑...</li>-->
      <!--<li class="price"><span class="left"><font>¥</font>9800.00</span><span class="right">¥9800.00</span></li>-->
      <!--<li class="member"><span>数量</span><van-stepper v-model="value" /></li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="spe_a">-->
      <!--<h4>颜色</h4>-->
      <!--<div class="spe_box">-->
      <!--<span class="cur">黑色</span>-->
      <!--<span>灰色</span>-->
      <!--<span>白色</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="spe_a">-->
      <!--<h4>大小</h4>-->
      <!--<div class="spe_box">-->
      <!--<span>大号</span>-->
      <!--<span>中号</span>-->
      <!--<span>小号</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!-- 掌柜推荐 -->
      <!--<div id="cate_2" class="content_c">-->
      <!--<h3><div class="line-left"></div>掌柜推荐<div class="line_right"></div></h3>-->
      <!--<div class="c_box">-->
      <!--<div class="goods_box">-->
      <!--<div class="select">-->
      <!--<el-checkbox >&nbsp;</el-checkbox>-->
      <!--</div>-->
      <!--<div class="goods_info">-->
      <!--<div class="info_a">-->
      <!--<div class="img">-->
      <!--<img src="../../assets/images/photo-mr.jpg">-->
      <!--</div>-->
      <!--<ul class="info">-->
      <!--<li class="name" style="-webkit-box-orient:vertical;"> B.FRIENDit 巧克力键盘 超薄静音有线键盘usb台式电脑...</li>-->
      <!--<li class="price"><span class="left"><font>¥</font>9800.00</span><span class="right">¥9800.00</span></li>-->
      <!--<li class="member"><span>数量</span><van-stepper v-model="value" /></li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="spe_a">-->
      <!--<h4>颜色</h4>-->
      <!--<div class="spe_box">-->
      <!--<span class="cur">黑色</span>-->
      <!--<span>灰色</span>-->
      <!--<span>白色</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="spe_a">-->
      <!--<h4>大小</h4>-->
      <!--<div class="spe_box">-->
      <!--<span>大号</span>-->
      <!--<span>中号</span>-->
      <!--<span>小号</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!-- 其他推荐 -->
      <div class="content_d" v-if="other_packages.length > 0">
        <h5>其他推荐</h5>
        <div class="d_box">
          <template v-for="(otherpitem, otherpidex) in other_packages">
            <div class="goods_box" @click="gopackgoods(otherpitem.id)">
              <div class="img">
                <img :src="otherpitem.thumb" />
              </div>
              <ul class="info">
                <li class="info_a">{{ otherpitem.title }}</li>
                <li class="info_b">
                  推荐价：<span>¥</span>{{ otherpitem.price_sum }}
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
      <!-- 底部 -->
      <div class="fixed">
        <span class="favourable" v-if="sale_priceshow && on_sale_price"
          >已优惠¥{{ on_sale_price }}</span
        >
        <p class="price">
          合计：<span><font>¥</font>{{ zongjiage }}</span>
        </p>
        <button type="button" @click="submitGoods">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import package_goods_controller from "./package_goods_controller";

export default package_goods_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#package_goods {
  padding-top: 40px;
  padding-bottom: 60px;
  #content {
    .content_a {
      background: #fff;
      .banner {
        width: 100%;
        height: 11.75rem;
        overflow: hidden;
        background: #f5f5f5;
        img {
          width: 100%;
        }
      }
      .rob-time {
        display: flex;
        height: 3.0625rem;
        background-color: #f15353;
        .img {
          width: 10%;
          img {
            width: 60%;
          }
        }
        .price {
          text-align: left;
          width: 10%;
          display: flex;
          color: #fff;

          .text {
            font-size: 14px;
            margin-top: 0.4375rem;
            margin-left: -0.125rem;
          }
          .none-line {
            line-height: 3.0625rem;
            font-size: 18px;
            margin-left: 0.625rem;
          }
          .middle-line {
            line-height: 3.0625rem;
            font-size: 14px;
            text-decoration: line-through;
            color: #dbdbdb;
            margin-left: 0.625rem;
          }
        }
        .time {
          flex: 80%;
          text-align: left;
          line-height: 3.0625rem;
          padding-left: 1.25rem;
          .text {
            font-size: 14px;
            line-height: 1.5rem;
          }
          span {
            color: #fff;
            font-size: 14px;
          }
          em {
            background-color: #fff;
            color: #333;
          }
          .bottom {
            margin-top: 0.125rem;
          }
        }
      }
      h1 {
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: left;
        padding: 0 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
      }
    }
    .content_b {
      background: #fff;
      margin-top: 0.625rem;
      padding: 1rem 0.625rem;
      margin-bottom: 0.625rem;
      .user {
        display: flex;
        align-items: center;
        position: relative;
        .header {
          width: 2.625rem;
          height: 2.625rem;
          border-radius: 1.875rem;
          overflow: hidden;
          margin-right: 0.625rem;
          background: #f5f5f5;
          img {
            width: 100%;
          }
        }
        h2 {
          font-size: 15px;
        }
        .describe {
          position: absolute;
          right: 0.25rem;
          color: #8c8c8c;
          i {
            font-size: 1.125rem;
            margin-left: 0.375rem;
          }
        }
      }
      .detail {
        margin-top: 0.625rem;
        font-size: 14px;
        color: #333;
        text-align: left;
        word-break: break-all;
      }
    }
    .content_nav {
      background: #fff;
      border-bottom: solid 0.0625rem #ebebeb;
      .nav {
        display: flex;
        height: 2.625rem;
        line-height: 2.625rem;
        li {
          font-size: 16px;
          margin: 0 0.75rem;
          font-weight: bold;
        }
        .cur {
          color: #f15353;
          border-bottom: solid 0.125rem #f15353;
        }
      }
    }
    .content_c {
      background: #fff;
      margin-bottom: 0.625rem;
      h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 18px;
        text-align: center;
        .line-left {
          margin-right: 0.875rem;
          width: 3.75rem;
          border: dashed 0.0625rem #ebebeb;
        }
        .line_right {
          margin-left: 0.875rem;
          width: 3.75rem;
          border: dashed 0.0625rem #ebebeb;
        }
      }
      .c_box {
        .goods_box {
          display: flex;
          padding: 0.875rem 0.625rem;
          border-bottom: solid 0.0625rem #ebebeb;
          .select {
            width: 2.125rem;
          }
          .goods_info {
            .info_a {
              display: flex;
              .img {
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                background: #f5f5f5;
                margin-right: 0.625rem;
                img {
                  width: 100%;
                }
              }
              .info {
                width: 13.4375rem;
                text-align: left;
                .name {
                  font-size: 16px;
                  max-height: 2.5rem;
                  line-height: 1.25rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .price {
                  line-height: 1.875rem;
                  .left {
                    color: #f15353;
                    font-size: 18px;
                    margin-right: 0.625rem;
                    font {
                      font-size: 12px;
                    }
                  }
                  .right {
                    color: #8c8c8c;
                    font-size: 12px;
                    text-decoration: line-through;
                  }
                }
                .member {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
            .spe_a {
              margin-top: 0.625rem;
              h4 {
                font-size: 14px;
                line-height: 1.875rem;
                text-align: left;
              }
              .spe_box {
                display: flex;
                flex-wrap: wrap;
                span {
                  padding: 0.25rem 1rem;
                  border-radius: 1.875rem;
                  font-size: 12px;
                  border: solid 0.0625rem #f15353;
                  margin: 0 0.625rem 0.5rem 0;
                  color: #666;
                }
                .cur {
                  background: #f15353;
                  color: #fff;
                }
                .disspec {
                  opacity: 0.5;
                  border: solid #666 0.0625rem;
                }
              }
            }
          }
        }
      }
    }
    .content_d {
      margin-top: 0.625rem;
      background: #fff;
      h5 {
        line-height: 2.5rem;
        height: 2.5rem;
        text-align: left;
        font-size: 16px;
        padding: 0 0.875rem;
      }
      .d_box {
        .goods_box {
          border-bottom: solid 0.0625rem #ebebeb;
          padding: 0.875rem 0.625rem;
          display: flex;
          .img {
            width: 6rem;
            height: 6rem;
            overflow: hidden;
            background: #f5f5f5;
            margin-right: 0.625rem;
            img {
              width: 100%;
            }
          }
          .info {
            width: 15rem;
            text-align: left;
            .info_a {
              font-size: 16px;
              max-height: 2.5rem;
              line-height: 1.25rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .info_b {
              font-size: 16px;
              color: #f15353;
              margin-top: 0.625rem;
            }
          }
        }
      }
    }
    .fixed {
      position: fixed;
      bottom: 0;
      width: 23.4375rem;
      height: 3.0625rem;
      line-height: 3.0625rem;
      background: #fff;
      box-shadow: 0 -0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-end;
      .favourable {
        position: absolute;
        left: 0.625rem;
        font-size: 14px;
      }
      button {
        width: 6.875rem;
        border: none;
        background: #f15353;
        font-size: 18px;
        color: #fff;
      }
      .price {
        padding-right: 0.625rem;
        font-size: 14px;
        span {
          font-size: 18px;
          color: #f15353;
          font {
            font-size: 14px;
          }
        }
      }
    }
    .van-tabs--line.show {
      position: fixed;
      top: 0;
      z-index: 99;
      width: 100%;
    }
  }
}
</style>
