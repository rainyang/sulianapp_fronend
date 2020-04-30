<template>
  <div id="all">
    <c-title :hide="false"
             text="商家"></c-title>
    <div style="width:100%;height:40px;"></div>
     <div v-show="!isShow">
      <loading :show="true"></loading>
    </div>
    <div id="home_seller" v-show="false">
      <div class="banner">
        <img :src="
            mainInfo.store_barnner_thumb
              ? mainInfo.store_barnner_thumb
              : require('../../assets/images/loading.jpg')
          " />
      </div>
      <div class="header_box">
        <div class="img">
          <img :src="
              mainInfo.store_thumb
                ? mainInfo.store_thumb
                : require('../../assets/images/loading.jpg')
            " />
        </div>
        <ul class="name">
          <li>{{ mainInfo.store_name }}</li>
        </ul>
        <div class="btn"
             @click="goToCrash"
             v-if="mainInfo.is_open_cashier == 1">
          <button type="button">优惠买单</button>
        </div>
      </div>
      <div class="top">
        <ul class="item">
          <li @click="goToAdress">
            <i class="iconfont icon-seller-position"></i>
            <span style="width:100%;">{{ mainInfo.store_address }}</span>
          </li>
          <li>
            <i class="iconfont icon-seller_phone"></i>
            <a :href="telephone"
               slot="left">{{ mainInfo.store_mobile }}</a>
          </li>
        </ul>
      </div>
      <ul class="into_store">
        <li @click="goToShop">
          <i class="iconfont icon-seller-car"></i>
          <span>进店选购</span>
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
      <ul class="store_time">
        <li>
          <i class="iconfont icon-seller-time"></i>
          <span>营业时间：{{ mainInfo.business_hours }}</span>
        </li>
      </ul>

      <c-comment :commentInfo='commentList.new_comment'
                 v-on:RouterTo="FromTo"
                 :type=2
                 :score="commentList.average_score"
                 :total='commentList.comment_total'></c-comment>
      <div class="store_info">
        <div class="introduce">
          <ul class="text">
            <li>
              <i class="iconfont icon-seller-home"></i>
              <span>门店简介：</span>
              <p>{{ mainInfo.store_introduce }}</p>
            </li>
          </ul>
        </div>
        <div class="detail">
          <div class="detail_a">
            <i class="iconfont icon-seller-detail"></i>
            <span>商家详情：</span>
          </div>
          <p v-if="!infoShow" style="margin-left: 2rem;">暂无详情...</p>
          <p v-if="infoShow" v-html="info"></p>
        </div>
      </div>
    </div>

    <!-- new -->
    <div id="home_seller2" v-show="isShow">
      <div class="header_box">
        <div class="img">
          <img
            :src="mainInfo.store_thumb? mainInfo.store_thumb: require('../../assets/images/loading.jpg')"
          />
        </div>
        <ul class="name">
          <li>{{ mainInfo.store_name }}</li>
          <li class="tel"><a :href="telephone">店铺咨询： {{ mainInfo.store_mobile }}</a></li>
        </ul>
        <div
          class="btn"
          @click="goToCrash"
          v-if="mainInfo.is_open_cashier == 1"
        >
          <button type="button">优惠买单</button>
        </div>
      </div>
      <ul class="tab-box">
        <li v-for="(item, index) in tabList" :key="index" :class="tabIndex == item ? 'choose' : ''" @click="chooseTab(item)">{{item}}</li>
      </ul>
      <div class="detail-box" v-if="tabIndex == '店铺详情'">
        <div class="detail-item">
          <p class="detail-title">营业时间</p>
          <p class="time">{{ mainInfo.business_hours }}</p>
        </div>
        <div class="detail-item">
          <p style="display: flex"><span class="detail-title">门店地址</span><i @click="goToAdress"
                                                                            class="iconfont icon-all_daohang"></i></p>
          <p>{{ mainInfo.store_address }}</p>
        </div>
        <c-comment :commentInfo='commentList.new_comment'
                 v-on:RouterTo="FromTo"
                 :type=2
                 :score="commentList.average_score"
                 :total='commentList.comment_total'></c-comment>
        <div class="detail-item">
          <p class="detail-title">门店简介</p>
          <p>{{ mainInfo.store_introduce }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">门店详情介绍</p>
          <p v-if="!infoShow" style="margin-left: 2rem;">暂无详情...</p>
          <p v-if="infoShow" v-html="info"></p>
        </div>
        <div class="detail-item" v-if="get_recommend_goods && get_recommend_goods.length > 0">
          <p class="detail-title">推荐商品</p>
          <div class="goods-box">
            <div class="good-item" v-for="(good, i) in get_recommend_goods" :key="i" @click.stop="toGood(good.goods_id)">
              <div class="good-img">
                <img :src="good.change_thumb" alt="">
              </div>
              <p class="good-title">{{good.title}}</p>
              <p class="good-price">￥{{good.price}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="community-box" v-if="tabIndex == '门店微贴'">
        <c-flow :showLoading="cisLoadMore" @loadMore="loadMore" :list='nearbyClassification'></c-flow>
      </div>
      <div class="live-box" v-if="tabIndex == '门店直播'">
        <c-live :recordsList='store_room' :showtitle="false"></c-live>
        <!--<div class="live-item">-->
          <!--<div class="live-img-box">-->
            <!--<img :src="mainInfo.store_thumb" alt="">-->
            <!--<div class="left-top"><span class="status gray">回放</span><span>238观看</span></div>-->
            <!--<div class="right-top"><i class="iconfont icon-zb_goods"></i><span class="goods-num">222</span></div>-->
            <!--<div class="bottom-title">2020春季时尚穿搭20202020春季时尚穿搭20202020春季时尚穿搭2020</div>-->
          <!--</div>-->
          <!--<div class="title-box">时尚穿搭博主-TIYA时尚穿搭博主-TIYA</div>-->
          <!--<div class="member-img">-->
            <!--<img :src="mainInfo.store_thumb" alt="">-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="member-box" v-if="tabIndex == '门店员工'">
        <div class="member-item" v-for="(member, index) in store_member" :key="index">
          <div class="img-box" @click="toCard(member.card_id)">
            <img :src="member.avatar" alt="">
          </div>
          <div class="text-box" @click="toCard(member.card_id)">
            <p class="name">{{member.realname}}</p>
            <p>联系方式：{{member.phone}}</p>
            <p>微信号：{{member.wechat || '无'}}</p>
          </div>
          <div class="phone-box">
            <a :href="'tel:'+ member.phone" style="display: flex;align-self: center">
              <div class="icon-box">
                <i class="iconfont icon-all_phone"></i>
                <!--<p>拨电话</p>-->
              </div>
            </a>
            <div class="icon-box" style="margin-left: 0.5rem;" v-clipboard:copy="member.wechat"
                 v-clipboard:success="onCopy"
                 v-clipboard:error="onError">
              <i class="iconfont icon-card_weixin1"></i>
              <!--<p>添加微信</p>-->
            </div>
            <i class="iconfont icon-advertise-next" @click="toCard(member.card_id)"></i>
          </div>
        </div>
        <div class="blank"  v-if="store_member.length<=0">
          <img src="../../assets/images/blank.png">
          <span>暂无信息</span>
        </div>
      </div>

      <div class="fixed-box" @click="goToShop">
        <span class="red-box">进店选购</span>
      </div>
    </div>
    <!--new end-->
  </div>
</template>

<script>
  import home from "./home_seller_controller";

  export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #all {
    background: #FFFFFF;
  }

  .border-bottom {
    position: relative;
    border-top: none !important;
  }

  .border-bottom::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.0625rem;
    background-color: #ccc;
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
  }

  /* 2倍屏 */
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .border-bottom::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  /* 3倍屏 */
  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    .border-bottom::after {
      -webkit-transform: scaleY(0.33);
      transform: scaleY(0.33);
    }
  }

  #home_seller {
    .banner {
      height: 8.75rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 8.75rem;
      }
    }
    .header_box {
      margin: auto;
      width: 21.25rem;
      display: flex;
      background-color: #fff;
      border-radius: 0.375rem;
      padding: 0.875rem;
      margin-top: -3.125rem;
      position: relative;
      box-shadow: 0 0.25rem 0.5625rem 0.0625rem rgba(0, 0, 0, 0.06);
      .img {
        width: 3rem;
        height: 3rem;
        border-radius: 0.125rem;
        overflow: hidden;
        margin-right: 0.625rem;
        img {
          width: 100%;
        }
      }
      .name {
        flex: 1;
        li {
          font-size: 16px;
          font-weight: bold;
          line-height: 1.5rem;
          text-align: left;
        }
      }
      .btn {
        flex: 0 0 6rem;
        button {
          border-radius: 1rem;
          border: solid 0.0625rem #22ac38;
          color: #22ac38;
          padding: 0.25rem 0.625rem;
        }
      }
    }
    .top {
      background-color: #fff;
      padding-top: 0.625rem;
      .item {
        // padding-left:0.875rem;
        // padding-top: 0.5rem;
        padding: 0.5rem 0 0.5rem 0.875rem;
        li {
          padding-right: 0.875rem;
          line-height: 1.8125rem;
          padding-top: 0.5rem;
          text-align: left;
          border-bottom: solid 0.0625rem #ebebeb;
          display: flex;
          i {
            font-size: 28px;
            color: #666;
            margin-right: 0.375rem;
          }
          a {
            font-size: 16px;
          }
        }
        li:last-child {
          border: none;
        }
      }
    }
    .into_store,
    .store_time {
      background: #fff;
      margin: 0.625rem 0;
      padding: 0 0.875rem;
      li {
        line-height: 2.8125rem;
        display: flex;
        position: relative;
        i:first-child {
          font-size: 28px;
          color: #666;
          margin-right: 0.375rem;
        }
        span {
          font-size: 16px;
        }
        i:last-child {
          position: absolute;
          right: 0rem;
          font-size: 1.5rem;
          line-height: 2.8125rem;
          color: #c9c9c9;
        }
      }
    }
    .store_info {
      background: #fff;
      padding: 0 0.875rem;
      text-align: left;
      .introduce {
        border-bottom: solid 0.0625rem #ebebeb;
        .text {
          padding: 0.625rem 0;
          li {
            display: flex;
            i {
              font-size: 28px;
              color: #666;
            }
            span {
              font-size: 16px;
              width: 5.375rem;
              margin-left: 0.375rem;
              line-height: 32px;
            }
            p {
              font-size: 14px;
              width: 14.375rem;
              line-height: 1.25rem;
              padding-top: 0.375rem;
            }
          }
        }
      }
      .detail {
        padding-top: 0.625rem;
        .detail_a {
          display: flex;
          i {
            font-size: 28px;
            color: #666;
          }
          span {
            font-size: 16px;
            margin-left: 0.375rem;
            line-height: 2rem;
          }
        }
        .img {
          height: 7.5rem;
          overflow: hidden;
          margin: 0.625rem 0;
          img {
            width: 100%;
            height: 7.5rem;
          }
        }
        p {
          font-size: 14px;
        }
      }
    }
  }

  #home_seller2 {
    .header_box {
      width: 100%;
      display: flex;
      background-color: #fff;
      padding: 0.5rem 0.8rem;
      margin: 0 auto;
      position: relative;
      .img {
        flex: 0 0 3rem;
        width: 3rem;
        height: 3rem;
        border-radius: 0.125rem;
        overflow: hidden;
        margin-right: 0.625rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        flex: 1;
        li {
          font-size: 16px;
          font-weight: bold;
          line-height: 1.5rem;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 13rem;
        }
        .tel {
          font-size: 13px;
        }
      }
      .btn {
        flex: 0 0 85px;
        display: flex;
        button {
          align-self: center;
          justify-self: center;
          border-radius: 1rem;
          border: solid 0.0625rem #ff2c29;
          color: #ff2c29;
          padding: 0.25rem 0.625rem;
        }
      }
    }
    .tab-box {
      padding: 0.5rem 0.8rem;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 0.2rem 0.5rem;
        color: #999999;
        margin: 0 0.5rem 0.3rem 0;
        font-weight: bold;
      }
      .choose {
        background-image: linear-gradient(#ff2c29, #ff2c29),
        linear-gradient(#ff7747, #ff7747);
        color: #FFFFFF;
        border-radius: 0.875rem;
      }
    }
    .detail-box {
      padding: 0.5rem 0.8rem;
      text-align: left;
      .detail-item {
        margin-bottom: 0.5rem;
      }
      .detail-title {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .icon-all_daohang {
        flex: 0 0 1rem;
        font-size: 26px;
        color: #ff2c29;
      }
      .time {
        font-weight: bold;
        font-size: 16px;
        color: #ff2c29;
      }
    }
    .goods-box {
      display: flex;
      flex-wrap: wrap;
      .good-item {
        width: 48.5%;
        margin-bottom: 0.5rem;
        font-size: 15px;
        .good-img {
          width: 100%;
          height: 10rem;
          border-radius: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .good-title {
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .good-price {
          color: #ff2c29;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .good-item:nth-child(odd){
        margin: 0 0.5rem 0.5rem 0;
      }
    }
    .live-box {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem 0.8rem;
      .live-item {
        width: 48.5%;
        margin-bottom: 0.5rem;
        position: relative;
        padding-bottom: 1rem;
        .live-img-box {
          position: relative;
          width: 100%;
          height: 12rem;
          color: #FFFFFF;
          img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
          }
          .left-top {
            position: absolute;
            left: 0.5rem;
            top: 0.5rem;
            font-size: 12px;
            .status {
              background: #ff2c29;
              border-radius: 5px;
              padding: 2px 3px;
            }
            .gray {
              background: #999999;
            }
          }
          .right-top {
            position: absolute;
            top: 0.3rem;
            right: 1rem;
            .icon-zb_goods {
              font-size: 28px;
              color: #ffa303;
            }
            .goods-num {
              position: absolute;
              top: 3px;
              right: -10px;
              font-size: 10px;
              color: #ff2c29;
              background: #FFFFFF;
              border-radius: 9px;
              padding: 1px 2px;
            }
          }
          .bottom-title {
            position: absolute;
            bottom: 1rem;
            left: 0.5rem;
            text-align: left;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .title-box {
          width: 80%;
          position: absolute;
          bottom: 0;
          right: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .member-img {
          width: 1.75rem;
          height: 1.75rem;
          background-color: #ffffff;
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          left: 0;
          img {
            margin-top: 0.12rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
          }
        }
      }
      .live-item:nth-child(odd){
        margin: 0 0.5rem 0.5rem 0;
      }
    }
    .member-box {
      padding: 0.5rem 0.8rem;
      .member-item {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        padding: 0.5rem 0;
        .img-box {
          flex: 0 0 3rem;
          width: 3rem;
          height: 3rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .text-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
          margin-left: 0.5rem;
          font-size: 12px;
          .name {
            font-weight: bold;
            font-size: 14px;
          }
        }
        .phone-box {
          display: flex;
          margin-left: 0.5rem;
          flex: 0 0 7rem;
          font-size: 12px;
          .icon-box {
            align-items: center;
            display: flex;
          }
          .icon-all_phone, .icon-card_weixin1 {
            color: #ff2c29;
            font-size: 28px;
          }
          .icon-advertise-next {
            display: flex;
            align-self: center;
            font-size: 20px;
          }
        }
      }
    }
    .fixed-box {
      position: fixed;
      bottom: 4rem;
      right: 0;
      background: #ffca9b;
      width: 56px;
      height: 44px;
      border-radius: 20px 0 0 20px;
      .red-box {
        font-size: 12px;
        display: inline-block;
        padding: 3px;
        margin-top: 2px;
        margin-left: -8px;
        width: 40px;
        height: 40px;
        background: #ff2c29;
        color: #FFFFFF;
        border-radius: 50%;
      }
    }
  }
</style>
