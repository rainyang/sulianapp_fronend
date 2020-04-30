<template>
  <div id="goodslist">
    <div class="mai">
      <div class="main"
           v-show="view">
        <dl v-for="(item,i) in goods" :key='i'
            @click.stop.prevent="gotoDetail(item.goods_id)">
          <dt v-if="item.thumb">
            <img :src="item.thumb"  @click.stop.prevent="gotoDetail(item.goods_id)" />
          </dt>
          <dt v-if="!item.thumb">
            <img src="../assets/images/img_default.png" />
          </dt>
          <dd class="m-text"
              style="-webkit-box-orient: vertical;">
            {{ item.title | escapeTitle }}
          </dd>
          <dd class="s3" style="line-height:1.5625rem;
            height:3.125rem;margin: 0.25rem 0.375rem;"
           :class="{'heightAuto':'item.is_open_micro==1'}"
              v-if="!showprice">
            <!-- <p class="s1"> -->

              <div :style="styleCon" class="s3-price">
                <small>￥</small>
                <span class="s3-price-span1" v-if="item.vip_level_status&&item.vip_level_status.status==1">
                  {{ item.vip_level_status.word }}
                </span>
                <span class="s3-price-span2" v-else>
                  {{ item.price }}
                </span>
              </div>
              <div class="s2">￥{{item.market_price }}</div>
              <div style="color: #888;font-size: 12px;" v-show="item.is_open_micro==1">会员价:￥{{item.price_level==1?item.vip_price:item.vip_next_price}}</div>
            <!-- </p> -->
          </dd>
          <!--<dd class="s3" v-if="item.vip_price > 0">-->
          <!--<small></small>-->
          <!--<em>会员价：{{item.vip_price}}</em>-->
          <!--</dd>-->
          <dd class="s3"
              v-if="item.estimated_commission > 0">
            <small>￥</small>
            <em>预估收益：{{ item.estimated_commission }}</em>
          </dd>
        </dl>
      </div>
      <div class="main2"
           v-show="view == false">
        <div class="list"
             v-for="(items,i) in goods" :key='i'
             @click.stop.prevent="gotoDetail(items.goods_id)">
          <div class="imgs">
            <img :src="items.thumb"
                 :key="items.thumb"
                 v-if="items.thumb"
                 @click.stop.prevent="gotoDetail(item.goods_id)" />
            <img src="../assets/images/img_default.png"
                 v-if="!items.thumb" />
          </div>
          <div class="shop_info">
            <ul style="margin-bottom: 1.75rem;">
              <li class="title">
                {{ items.title | escapeTitle }}
              </li>
            </ul>
            <ul>
              <li class="member"
                  v-if="!showprice">
                <small>￥</small>
                <span v-if="items.vip_level_status&&items.vip_level_status.status==1" class="member-span-1">
                  {{ items.vip_level_status.word }}
                </span>
                <span v-else class="member-span-2">
                  {{ items.price }}
                </span>

              </li>

            </ul>
            <!--<dd class="s3" v-if="items.vip_price > 0">-->
            <!--<small></small>-->
            <!--<em>会员价：{{items.vip_price}}</em>-->
            <!--</dd>-->
            <div class="fit"
                 v-if="items.estimated_commission > 0">
              <small>￥</small>
              预估收益：{{ items.estimated_commission }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isDefault==1">
      <div class="loadMore"
           v-if="isLoadMore"
           @click="getMoreData">
        加载更多
      </div>
      <div class="loadMore"
           v-if="!isLoadMore">
        没有更多了~~
      </div>
    </div>

    <div class="loadNomore"
         v-show="loading">
      <img src="../assets/images/no-more-product.png" />
    </div>
  </div>
</template>

<script>
import { Lazyload } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
import { mapState } from "vuex";
import { Indicator, Toast, MessageBox } from "mint-ui";

const documentElement = document.documentElement;
const body = document.body;
var isDone = false;
var isClick = 0;

export default {
  props: [
    "goods",
    "text",
    "loadMore",
    "loading",
    "disabledt",
    "styleCon",
    "jumpSo",
    "storeId",
    "showprice",
    "last_page",
    "isDefault"
  ],
  data() {
    return {
      isLoadMore: false, //true 可以加载更多
      page: 1,

      isMounted: 0 //只触发一次
    };
  },
  mounted() {
    this.isMounted = 1;
    // 判断商品组件mounted的时候是否需要加载更多
    this.isLoadMore = this.last_page > 1;
    if (!isDone && this.isDefault == 1) {
      document.addEventListener("touchmove", this.handleScroll, false);
      isDone = true;
    }
  },
  activated() {
    this.page = 1;
    this.isLoadMore = this.last_page > 1;
    if (!isDone && this.isMounted !== 1 && this.isDefault == 1) {
      document.addEventListener("touchmove", this.handleScroll, false);
      isDone = true;
    }
  },
  deactivated() {
    this.isMounted = 0;
    if (isDone && this.isDefault == 1) {
      document.removeEventListener("touchmove", this.handleScroll, false);
      isDone = false;
    }
  },
  methods: {
    //获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (documentElement && documentElement.scrollTop) {
        scrollTop = documentElement.scrollTop;
      } else if (body) {
        scrollTop = body.scrollTop;
      }
      return scrollTop;
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(
          body.clientHeight,
          documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          body.clientHeight,
          documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },
    handleScroll() {
      //滚动事件触发
      if (
        Number(this.getScrollTop() + this.getClientHeight() + 5) >=
        this.getScrollHeight()
      ) {
        //此处发起请求
        if (this.isLoadMore && isClick === 0) {
          this.getMoreData();
          isClick = 1;
        } else {
          console.log("没有更多数据");
        }
      }
    },
    // 获取更多数据
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.last_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "home-page.get-first-goods-page",
            {
              page: that.page
            },
            "加载中"
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                if (that.page === that.last_page) {
                  that.isLoadMore = false;
                }
                var myData = response.data.data;
                that.$store.commit("setDefaultMoreData", myData);
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
              isClick = 0;
            },
            function(response) {
              console.log(response.msg);
              isClick = 0;
            }
          );
      }
    },
    //跳转至详情
    gotoDetail(id) {
      if (this.jumpSo == true) {
        this.$router.push(
          this.fun.getUrl("goodsO2O", {
            id: id,
            tag: "o2o",
            store_id: this.storeId
          })
        );
      } else {
        if (
          this.$route.name == "paddingOrder_Home" ||
          (!this.fun.isTextEmpty(this.$route.query.fromPage) &&
            this.$route.query.fromPage == 1)
        ) {
          this.$router.push(
            this.fun.getUrl("goods", { id: id }, { kind: "POrder" })
          );
        } else {
          this.$router.push(this.fun.getUrl("goods", { id: id }));
        }

        // $http
        //   .get("goods.goods.get-goods", { id: id }, "加载中")
        //   .then(response => {
        //     if (response.result === 1) {
        //       if (response.data.is_course == 1) {
        //         this.$router.push(
        //           this.fun.getUrl("CourseDetail", { goods_id: id })
        //         );
        //       } else if (response.data.goods_type == 1) {
        //         this.$router.push(
        //           this.fun.getUrl("goodsO2O", {
        //             id: id,
        //             tag: "o2o",
        //             store_id: response.data.store_id
        //           })
        //         );
        //       } else {
        //         this.$router.push(this.fun.getUrl("goods", { id: id }));
        //       }
        //     } else {
        //       MessageBox("提示", response.msg);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      }
    }
  },
  computed: mapState(["view"])
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#goodslist {
  background: #f5f5f5;
  /*padding-bottom: 50px;*/
  a {
    color: #2b2f33;
  }
  .loadMore {
    background: #f5f5f5;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    clear: both;
  }
  .main2 {
    .list {
      display: -webkit-box;
      display: -webkit-flex;
      background: #ffffff;
      border-bottom: solid 0.0625rem #ebebeb;
    }
    .imgs {
      width: 8rem;
      height: 8rem;
      padding: 0.375rem;
      box-sizing: border-box;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .shop_info {
      display: flex;
      flex-direction: column;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      text-align: left;
      padding: 0.625rem 0.75rem;
      ul {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.625rem;
      }
      .title {
        font-size: 14px;
        flex: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height: 48px;
        line-height: 24px;
      }
      .member {
        font-size: 16px;
        color: #f15353;
        flex: 1;
        text-align: right;
        margin-left: 0.625rem;
        .member-span-1{
          font-size:0.75rem;background:#f15353;
          color:white;
          padding: .2rem .5rem;
          border-top-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        a {
          color: #f23030;
          font-weight: bold;
          margin-top: 0.625rem;
        }
      }
    }
    .fit {
      flex: 0 0 1rem;
    }
  }
  .loadNomore img {
    width: 20%;
  }
  h3 {
    width: 65%;
    position: relative;
    margin: 0 auto 1.25rem;
    height: 1.25rem;
    padding: 0.625rem 0 0;
    .title {
      width: 33%;
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
  .mai {
    width: 100%;
    overflow: hidden;
  }
  .main {
    overflow: hidden;
    // margin-right: -0.0625rem;
    margin: 0.5rem 0.75rem;
    background: #f5f5f5;

    dl:nth-child(2n) {
      margin-right: 0;
    }

    dl {
      border-radius: 0.5rem;
      padding: 0;
      /*border-bottom: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;*/
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      float: left;
      margin-bottom: 0.5rem;
      margin-right: 2%;
      background: #fff;
      width: 49%;

      dt {
        height: 50vw;
        line-height: 82vw;
      }
      dt {
        width: 100%;
        height: 0rem;
        padding-bottom: 100%;
        position: relative;
        img {
          width: 100%;
          // top:0.2rem;
          right: 0;
          height: 100%;
          position: absolute;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
      }
      .s3 {
        height: 1.5625rem;
        display: block;
        /* line-height: 30px; */
        text-align: left;
        margin: 0 0.3125rem;
        margin: 0 0.5rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
        // text-overflow: ellipsis;
        /*white-space:nowrap*/
        .s3-price{
          line-height:1.5625rem;
          height:1.5625rem;
          overflow: hidden;
          color:red;
          .s3-price-span1{
            font-size: 12px;
            background:#f15353;
            color:white;
            padding: .2rem .5rem;
            border-top-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          .s3-price-span2{
            font-size: 16px;
          }
        }
      }
      dd {
        margin: 0;
        div{
          line-height:1.5625rem;
          height:1.5625rem;
        }
        em {
          font-size: 16px;
          font-style: normal;
        }
        .s2 {
          text-decoration: line-through;
          vertical-align: middle;
          color: #888;
          font-size: 12px;
          // margin-left: 0.625rem;
        }
      }
      .m-text {
        font-size: 14px;
        // margin: 0.25rem 0.375rem;
        margin: 0.375rem 0.5rem;
        height: 2.625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        overflow: hidden;
        line-height: 1.34rem;
        text-align: justify;
      }
    }
  }
}
.heightAuto{
  height:auto!important;
}
</style>
