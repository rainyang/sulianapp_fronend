import { Loadmore } from "mint-ui";
import { MessageBox, Toast } from "mint-ui";
import cTitle from "components/title";
import cMyswipe from "components/myswipe";
import cLive from "components/goods/children/liveList";
import cSort from "components/sort";


const INDEX_URL = "plugin.supplier.frontend.shop.index.index";
const GOOD_URL = "plugin.supplier.frontend.shop.index.search-goods";
const ACTIVITY_URL = "plugin.supplier.frontend.shop.index.goods-limit";

const documentElement = document.documentElement;
const body = document.body;

export default {
  data() {
    return {
      //首页数据
      tab: 0,
      sliderShow: false,
      indexData: {},
      supplierInfo: {},
      //商品数据
      goodsArr: [],
      good_isLoadMore: true,
      good_page: 1,
      good_total_page: 0,
      order_field: "",
      order_by: "",
      //活动数据
      actGoodsArr: [],
      act_isLoadMore: true,
      act_page: 1,
      act_total_page: 0,

      //live more
      isLoadMore: true,
      live_page: 1,
      total_page: 0,
      showMoreLive: false,
      recordsList:[],//直播间列表
      is_room: 0
    };
  },
  created() {
    if (this.$route.params.fromHome !== 1) {
      this.initData();
      this.getIndexData();
      this.getGoodsData();
      this.getActivityData();
    }
  },
  activated() {
    if (this.$route.params.fromHome === 1) {
      this.initData();
      this.getIndexData();
      this.getGoodsData();
      //this.getNewGoodsData();
      this.getActivityData();
    } else {
      this.lastScrollHeight();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.SupplierShopScrollTop = 0;
  },
  beforeRouteLeave(to, from, next) {
    window.SupplierShopScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    initData() {
      this.tab = 0;
      this.sliderShow = false;
      this.indexData = {};
      this.supplierInfo = {};

      this.initGoodData();

      this.initActData();

    },
    toggleSlide() {
      this.sliderShow = !this.sliderShow;
    },
    //首页
    getIndexData() {
      $http.get(INDEX_URL, { sid: this.$route.params.id }, "加载中...").then(res => {
        if (res.result == 1) {
          this.indexData = res.data;
          this.supplierInfo = res.data.supplier;
          this.initShare();
          if(res.data.is_room&&res.data.is_room == 1){
            this.is_room = 1;
            this.getLiveList(false)
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    //商品
    getGoodsData() {
      let json = {
        sid: this.$route.params.id,
        page: this.good_page,
        order_field: this.order_field,
        order_by: this.order_by,
        "search[keyword]": ""
      };
      $http.get(GOOD_URL, json, "加载中").then(res => {
        if (res.result == 1) {
          this.goodsArr = res.data.data;
          this.good_total_page = res.data.last_page;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getLiveList(more){
      let that = this;
      if(!this.isLoadMore){
        return;
      }
      this.isLoadMore = false; // 防止多次请求分页数据
      if (more&&this.live_page >= this.total_page) {
        that.showMoreLive = false;
        console.log("没有更多直播间数据！")
        return;
      } else {
        that.live_page = more?that.live_page + 1:1;
        $http.post("plugin.supplier.frontend.shop.index.get-room",{supplier_id:that.$route.params.id,page: that.live_page},"").then(response => {
          if (response.result === 1) {
            that.isLoadMore = true;
            that.total_page = response.data.last_page;
            if (!that.total_page) {
              that.total_page = 0;
            }
            if(!more&&that.total_page>=2){
              that.showMoreLive = true;
            }
            that.recordsList = [...that.recordsList, ...response.data.data];
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    sortOut(e) {
      if (this.goodsArr.length == 0) {
        return;
      }
      this.order_field = e.order_field;
      this.order_by = e.order_by;
      this.goodsArr = [];
      this.getGoodsData();
    },

    getGoodsMoreData() {
      this.good_isLoadMore = false;
      if (this.good_page >= this.good_total_page) {
        return;
      } else {
        this.good_page = this.good_page + 1;
        $http.get(GOOD_URL, {
          sid: this.$route.params.id,
          page: this.good_page,
          order_field: this.order_field,
          order_by: this.order_by
        }, "加载中").then(res => {
          this.good_isLoadMore = true;
          if (res.result == 1) {
            this.goodsArr = this.goodsArr.concat(res.data.data);//数组拼接
          } else {
            this.good_page = this.good_page - 1;
            this.good_isLoadMore = false;
            return;
          }
        }).catch(error => {
          console.log(error);
        });

      }
    },

    initGoodData() {
      this.goodsArr = [];
      this.good_isLoadMore = true;
      this.good_page = 1;
      this.good_total_page = 0;
      // this.order_field='';
      // this.order_by='';
    },


    //活动
    getActivityData() {
      $http.get(ACTIVITY_URL, { sid: this.$route.params.id, page: this.act_page }).then(res => {
        if (res.result == 1) {
          this.actGoodsArr = res.data.list.data;
          this.act_total_page = res.data.list.last_page;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getActivityMoreData() {
      this.act_isLoadMore = false;
      if (this.act_page >= this.act_total_page) {
        return;
      } else {
        this.act_page = this.act_page + 1;
        $http.get(ACTIVITY_URL, { sid: this.$route.params.id, page: this.act_page }, "加载中").then(res => {
          this.act_isLoadMore = true;
          if (res.result == 1) {
            this.actGoodsArr = this.actGoodsArr.concat(res.data.list.data);//数组拼接
          } else {
            this.act_page = this.act_page - 1;
            this.act_isLoadMore = false;
            return;
          }
        }).catch(error => {
          console.log(error);
        });

      }
    },

    initActData() {
      this.actGoodsArr = [];
      this.act_isLoadMore = true;
      this.act_page = 1;
      this.act_total_page = 0;
    },


    //跳转
    goToUrl(href, type) {
      if (type == "href") {
        window.location.href = href;
      } else if (type == "route") {
        if (href == "orderlist") {
          this.$router.push(this.fun.getUrl(href, { status: "0" }));
        } else {
          this.$router.push(this.fun.getUrl(href));
        }

      }
    },

    goToDetail(val) {
      this.$router.push(this.fun.getUrl("goods", { id: val }));
    },

    //返回
    goBack() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("home", {}));
      } else {
        this.$router.go(-1);
      }
    },

    //跳转搜素
    goToSearch() {
      this.$router.push(this.fun.getUrl("SupplierSearch", { sid: this.$route.params.id }));
    },

    //跳转客服
    goToService() {
      window.location.href = this.indexData.supplier_link;
    },
    lastScrollHeight() {
      if (window.location.href.indexOf("#/supplier_shop/") > -1) {
        setTimeout(() => {
          window.scrollTo(0, window.SupplierShopScrollTop);
        }, 200);
      }
    },

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
      if (this.getScrollTop() + this.getClientHeight() + 5 > this.getScrollHeight()) {
        //此处发起请求
        if (this.tab == 1) {
          if (this.good_isLoadMore) {
            this.getGoodsMoreData();
          } else {
            console.log("没有更多数据");
          }
        } else if (this.tab == 2) {
          if (this.act_isLoadMore) {
            this.getActivityMoreData();
          } else {
            console.log("没有更多数据");
          }
        }
      }
    },
    //分享
    initShare() {
      let json = {
        url: this.fun.isIosOrAndroid() === "android"
          ? window.location.href
          : window.initUrl
      };
      $http
        .post("member.member.wxJsSdkConfig", json)
        .then(response => {
          if (response.result === 1) {
            if (response.data.config) {
              this.share(response.data);
            }
          }
        })
        .catch(error => {
        });
    },
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = that.fun.isTextEmpty(that.supplierInfo.store_name)
          ? data.share.title
          : that.supplierInfo.store_name;
        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        let _imgUrl = that.fun.isTextEmpty(that.supplierInfo.logo)
          ? data.share.icon
          : that.supplierInfo.logo;
        let desc = '';
        if(data.shop&&data.shop.share&&data.shop.share.desc) {
          desc = data.shop.share.desc
        }
        let _desc = that.fun.isTextEmpty(data.shop.share.desc)
          ? ''
          : data.shop.share.desc;

        wx.showOptionMenu();

        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    },

  },
  components: { cTitle, cMyswipe, cSort, cLive }
};
