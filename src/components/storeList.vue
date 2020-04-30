<template>
  <div id="goodslist">
    <!--<h3>-->
      <!--<span class="title">{{ text | escapeTitle }}</span>-->
      <!--<span class="spas"></span>-->
    <!--</h3>-->
    <p class="component-title">{{ text | escapeTitle }}</p>
    <div class="store">
      <div @click="toRouter(items)" v-for="(items,i) in stores" :key='i'>
        <div class="list">
          <div style="flex: 0 0 4rem">
            <div class="store-img">
              <a class="store-logo">
                <span class="img-mask"  v-if="items.operating_state === 1"></span>
                <span class="img-text"  v-if="items.operating_state === 1">商家休息中</span>
                <img :src="items.thumb" />
              </a>
            </div>
            <div class="classify" v-if="items.has_one_category">
            <span @click.stop="toClassify(items.has_one_category.id)">
              {{ items.has_one_category.name }}
            </span>
            </div>
            <div class="classify" v-if="!items.has_one_category">
              <span>暂无分类</span>
            </div>
          </div>

          <!--new-->
          <div class="store-intro2">
            <h2>{{ items.store_name }}</h2>
            <div class="score-box">
              <div class="score-left">
                <i class="iconfont icon-card_collect_b"></i><span>{{items.average_score}}分</span><span style="margin-left: 0.5rem">月售{{ items.order_total }}单</span>
              </div>
              <div class="score-right" @click.stop="goToAdress(items)">{{ items.distance }}{{ items.unit }}</div>
            </div>
            <div class="discount-box">
              <p class="discount-item" v-if="items.has_many_coupon && items.has_many_coupon.length > 0">
                <span class="red">优惠</span>
                <span style="margin-left: 0.5rem" v-for="(coupon,index) in items.has_many_coupon" :key="index" v-if="index <=2">{{ coupon.name }}</span>
              </p>
              <p class="discount-item" v-if="items.store_point.point_switch != 0 || items.store_love.award == 1">
                <span class="red">赠送</span>
                <span style="margin-left: 0.5rem" v-if="items.store_point.point_switch == 0 ? false : true">{{ items.store_point.point }}</span>
                <span style="margin-left: 0.5rem" v-if="items.store_love.award == 1 ? true : false">{{ items.store_love.award_proportion }}</span>
              </p>
              <p class="discount-item" v-if="items.store_point.point_deduct_switch != 0 || items.store_love.deduction == 1">
                <span class="red">抵扣</span>
                <span style="margin-left: 0.5rem" v-if="items.store_love.deduction == 1 ? true : false">{{ items.store_love.deduction_proportion }}</span>
                <span style="margin-left: 0.5rem" v-if="items.store_point.point_deduct_switch == 0 ? false : true">{{ items.store_point.max_point_deduct }}</span>
              </p>
            </div>
            <div class="dispatch-box" v-if="items.dispatchs">
              <span v-for="dispatch in items.dispatchs" :key="dispatch">{{dispatch}}</span>
            </div>
            <div class="goods-box" v-if="items.recommend_goods && items.recommend_goods.length > 0">
              <div class="good-item" v-for="(good, i) in items.recommend_goods" :key="i" @click.stop="toGood(good.goods_id)">
                <div class="good-img">
                  <img :src="good.thumb" alt="">
                </div>
                <p class="good-title">{{good.title}}</p>
                <p class="good-price">￥{{good.price}}</p>
              </div>
            </div>
          </div>
          <!--new end-->

          <div class="store-intro" v-if="false">
            <div class="a8q">
              <h2 class="">{{ items.store_name }}</h2>
              <div class="store_honor_box">
                <span class="store_honor_icon"
                  >距离{{ items.distance }}{{ items.unit }}</span
                >
              </div>
            </div>
            <div
              style="float:right;display:block;z-index:9999;"
              @click.stop="goToAdress(items)"
            >
              <yd-icon
                slot="icon"
                name="location"
                size="1.125rem"
                color="#00c25e"
              ></yd-icon>
            </div>
            <a
              @click.stop
              :href="'tel:' + items.mobile"
              style="float:right;display:block;z-index:9999;margin-right: 1.5rem"
            >
              <yd-icon
                slot="icon"
                name="phone2"
                size="1.2rem"
                color="#00c25e"
              ></yd-icon>
            </a>
            <div class="a06 a8r">
              <strong class="i8">
                <span class="da">{{
                  items.dispatchs.substring(0, items.dispatchs.length - 1)
                }}</span>
              </strong>
            </div>
            <div class="a8v">
              <cStar :score="items.average_score"></cStar>
              <p class="a8w">
                <span class="line_split"></span>月售{{ items.order_total }}单
              </p>
            </div>

            <div class="discount">
              <p>
                <span
                  style="margin-right:0.625rem;"
                  v-if="items.store_point.point_switch == 0 ? false : true"
                  >{{ items.store_point.point }}
                </span>
                <span
                  v-if="
                    items.store_point.point_deduct_switch == 0 ? false : true
                  "
                  >{{ items.store_point.max_point_deduct }}
                </span>
              </p>
              <p>
                <span
                  style="margin-right:0.625rem;"
                  v-if="items.store_love.award == 1 ? true : false"
                  >{{ items.store_love.award_proportion }}
                </span>
                <span v-if="items.store_love.deduction == 1 ? true : false">
                  {{ items.store_love.deduction_proportion }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;height: 50px;line-height: 50px;" v-if="!show">
        没有更多喽~
      </div>
      <div
        style="width: 100%;height: 50px;line-height: 50px;"
        v-if="show"
        @click="getMoreStores"
      >
        加载更多
      </div>
    </div>
  </div>
</template>

<script>
import { Lazyload } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
import { Toast, MessageBox } from "mint-ui";
import { mapState } from "vuex";
import cStar from "components/star";

export default {
  components: { cStar },
  props: ["stores", "text", "loading", "totalPage", "page", "isLoadMore"],
  data() {
    return {
      list: [],
      toi: this.fun.getKeyByI(),
      types: this.fun.getTyep(),
      show: false
    };
  },
  mounted() {
    this.show = this.isLoadMore;
  },
  watch: {
    totalPage(newVal, oldVal) {
      this.page >= this.totalPage ? (this.show = false) : (this.show = true);
    },
    page(newVal) {
      this.page >= this.totalPage ? (this.show = false) : (this.show = true);
    }
  },
  activated() {},
  methods: {
    toGood(id) {
      this.$router.push(this.fun.getUrl("goods", { id: id}))
    },
    goToAdress(items) {
      let point = this.fun.bd_decrypt(items.longitude, items.latitude);
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, items);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${point.lat}&destName=${items.store_name}&key=43de56d8e65fe042493541213d9ad7b0`;
      }
    },
    goToWXAdress(point, store) {
      $http
        .post(
          "member.member.wxJsSdkConfig",
          {
            url:
              this.fun.isIosOrAndroid() === "android"
                ? window.location.href
                : window.initUrl
          },
          " "
        )
        .then(
          response => {
            if (response.result === 1) {
              wx.config({
                debug: false,
                appId: response.data.config.appId,
                nonceStr: response.data.config.nonceStr,
                timestamp: response.data.config.timestamp,
                url: response.data.config.url,
                signature: response.data.config.signature,
                jsApiList: ["checkJsApi", "openLocation", "getLocation"]
              });

              wx.checkJsApi({
                jsApiList: ["getLocation"],
                success: function(res) {
                  if (res.checkResult.getLocation == false) {
                    alert(
                      "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
                    );
                  }
                }
              });
              wx.ready(function() {
                wx.getLocation({
                  type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function(res) {
                    wx.openLocation({
                      latitude: point.lat, // 纬度，浮点数，范围为90 ~ -90
                      longitude: point.lng, // 经度，浮点数，范围为180 ~ -180。
                      name: store.store_name, // 位置名
                      address: store.address.detailed_address, // 地址详情说明
                      scale: 20 // 地图缩放级别,整形值,范围从1~28。默认为最大
                    });
                  },
                  cancel: function(res) {
                    alert("用户拒绝授权获取地理位置");
                  }
                });
              });

              wx.error(function(response) {
                console.log(response);
              });
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    toSeller(id) {
      this.$router.push({
        name: "HomeSeller",
        params: { store_id: id },
        query: { i: this.toi }
      });
    },

    toRouter(item) {
      if (item.specify_show == 1) {
        this.$router.push(
          this.fun.getUrl("o2oStore_v2", { store_id: item.id, fromHome: 1 })
        );
      } else {
        this.$router.push(this.fun.getUrl("HomeSeller", { store_id: item.id }));
      }
    },

    //跳转至分类
    toClassify(id) {
      this.$router.push(this.fun.getUrl("o2oCategory", { id: id }));
    },

    getMoreStores() {
      this.$emit("changList");
    }
  },
  computed: mapState(["view"])
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#goodslist {
  background: #f5f5f5;
  .loadNomore img {
    width: 20%;
  }
  h3 {
    width: 65%;
    position: relative;
    margin: 0 auto 0.9375rem;
    height: 1.25rem;
    padding: 0.625rem 0 0;
    span {
      display: block;
    }
    .title {
      width: 48%;
      text-align: center;
      padding: 0 0.625rem;
      background: #f5f5f5;
      position: absolute;
      z-index: 9;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 14px;
      color: #666;
    }
    .spas {
      border-bottom: 0.0625rem solid #d9d9d9;
      position: absolute;
      z-index: 5;
      top: 1.25rem;
      width: 100%;
    }
  }
  .component-title{
    background: #FFFFFF;
    padding: 0.625rem;
    text-align: left;
    font-weight: bold;
    font-size: 18px;
  }
  .store {
    height: auto;
    width: 100%;
    background: #fff;
    /*margin-top: 0.625rem;*/
    border-bottom: 0.0625rem solid #f5f3f3;
    .list {
      position: relative;
      padding: 12px;
      /*border-top: 0.0625rem solid #e7e9e4;*/
      background: #fff;
      font-size: 14px;
      color: #333;
      text-align: left;
      display: flex;
      .store-img {
        position: relative;
        .store-logo {
          position: absolute;
          top: 0;
          bottom: 0;
          float: none;
          width: 4rem;
          height: 4rem;
        }
        .img-mask {
          position: relative;
          top: 60%;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 40%;
          border: 0.0625rem solid #e8e8e8;
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 12px;
          background-color: #3b4043;
          opacity: 0.6;
        }
        .img-text {
          position: relative;
          top: 20%;
          left: 3%;
          z-index: 15;
          width: 100%;
          height: 40%;
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 12px;
          color: white;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5;
          width: 100%;
          height: 100%;
          border: 0.0625rem solid #e8e8e8;
          display: inline-block;
          margin-right: 0.5rem;
          border-radius: 50%;
        }
      }
      .store-intro {
        width: 275px;
        position: relative;
        margin-left: 0.75rem;
        .a8v {
          // height: 0.875rem;
          margin-top: 0.5rem;
          overflow: hidden;
          font-size: 0;
          .a8d {
            height: 0.75rem;
            padding-top: 0.125rem;
            overflow: hidden;
            display: inline-block;
            position: relative;
            .a79 {
              display: inline-block;
              font-size: 0;
              i {
                display: inline-block;
                width: 0.625rem;
                height: 0.625rem;
                background-position: 0 0;
                background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
                background-repeat: no-repeat;
                background-size: auto 0.625rem;
                margin-right: 0.0625rem;
              }
              .zo {
                background-position: -0.625rem 0;
              }
            }
          }
          .a8w {
            font-size: 11px;
            line-height: 0.875rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #999;
            display: inline-block;
            .line_split {
              display: inline-block;
              width: 0.5rem;
              height: 0.625rem;
              background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg)
                no-repeat center 0.125rem;
            }
          }
        }
        .a8r {
          font-size: 0;
          padding-top: 0.625rem;
          overflow: hidden;
          width: 10.25rem;
          .i8 {
            display: inline-block;
            background-color: #f5f5f5;
            font-size: 0;
            border-radius: 0.125rem;
            color: #00c25e;
            font-weight: normal;
            line-height: 0;
            // height: 0.9375rem;
            overflow: hidden;
            .da {
              display: inline-block;
              line-height: 1;
              padding: 0.125rem;
              font-size: 10px;
            }
            .db {
              line-height: 1;
              font-size: 10px;
            }
            .a9a {
              display: inline-block;
              padding: 0.125rem;
              line-height: 1;
              font-size: 10px;
            }
          }
        }
        .a8q {
          height: 1.25rem;
          line-height: 1.25rem;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          flex: 1;
          h2 {
            max-width: 10rem;
            font-size: 16px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            margin-top: 0;
            font-weight: bold;
            flex: 1;
          }
          .store_honor_icon {
            display: inline-block;
            width: 5.5rem;
            height: 1.25rem;
            font-size: 12px;
            text-align: right;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 1rem auto;
            color: #8c8c8c;
          }
        }
        .discount {
          margin-top: 0.3125rem;
          p {
            font-size: 11px;
            line-height: 0.875rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #999;
          }
        }
      }

      /*new*/
      .store-intro2 {
        flex: 1;
        position: relative;
        margin-left: 0.75rem;
        display: flex;
        flex-direction: column;
        h2 {
          max-width: 17rem;
          font-size: 16px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          margin-top: 0;
          font-weight: bold;
          flex: 1;
        }
        .score-box {
          display: flex;
          width: 100%;
          color: #666666;
          padding: 0.2rem 0;
          .score-left{
            flex: 1;
            align-self: center;
            justify-self: center;
            .icon-card_collect_b {
              color: #ffba00;
            }
          }
          .score-right {
            color: #ff2c29;
            flex: 0 0 4rem;
            text-align: right;
          }
        }
        .discount-box {
          display: flex;
          flex-direction: column;
          .red {
            color: #ff2c29;
          }
        }
        .dispatch-box {
          display: flex;
          padding: 0.5rem 0;
          span {
            margin-right: 0.4rem;
            padding: 0 0.3rem;
            color: #666666;
            border-radius: 10px;
            border: solid 1px #ff8400;
          }
        }
        .goods-box {
          display: flex;
          width: 17.4rem;
          overflow-x: scroll;
          .good-item {
            width: 6.875rem;
            margin-right: 0.5rem;
            font-size: 15px;
            .good-img {
              width: 6.875rem;
              height: 6.875rem;
              border-radius: 5px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .good-title{
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
        }
      }
      /*new end*/
    }
  }

  .classify {
    float: left;
    margin-top: 4.375rem;
    span {
      width: 4rem;
      height: 1.25rem;
      display: block;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      line-height: 1.25rem;
      cursor: pointer;
      background-color: #ff6333;
      border-radius: 0.313rem;
      color: #FFFFFF;
    }
  }
}
</style>
