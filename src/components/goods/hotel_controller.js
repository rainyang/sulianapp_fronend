import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

const DETAIL_URL =
  "plugin.hotel.frontend.hotel.goods.get-goods-detail-by-goods-id";

export default {
  props: ["goods_id", "goods_type", "goods_info_hotel"],
  data() {
    return {
      goods_info: {
        thumb_url: []
      },
      hotel_info: {},
      comment_data: [],
      posterShow: false,
      posterImg: {},
      isGoods: false,
      favorite: false,
      cservice: "",
      PageNameList: {}, //自定义标题
      showGood: false,
      clientWidths: ""
    };
  },

  activated() {
    // console.log(this.$route.params.id);
    // this.getData();
    this.showGood = false;
    this.getGoodsPage(this.goods_info_hotel);
    // this.isFavorite();

    this.getCustomizeHotelHead();
  },

  mounted() {
    this.clientWidths = document.body.clientWidth;
  },
  methods: {
    //获取酒店自定义字段
    getCustomizeHotelHead() {
      var isQuestHotel = localStorage.getItem("customizeHotelHead");
      if (!this.fun.isTextEmpty(isQuestHotel)) {
        this.PageNameList = JSON.parse(
          localStorage.getItem("customizeHotelHead")
        );
        this.fun.setWXTitle(this.PageNameList.goods_details);
      } else {
        $http
          .get(
            "plugin.hotel.frontend.hotel.get-hotel-info.get-custom-name",
            {},
            "加载中"
          )
          .then(response => {
            if (response.result == 1) {
              this.PageNameList = response.data;
              this.fun.setWXTitle(response.data.goods_details);
              localStorage.setItem(
                "customizeHotelHead",
                JSON.stringify(response.data)
              );
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getGoodsPage(data) {
      // let json = {
      //   id: this.$route.params.id,
      //   mark: this.fun.getKey("mark"),
      //   mark_id: this.fun.getKey("mark_id"),
      //   enter_at: this.$route.query.start || "",
      //   leave_at: this.$route.query.end || "",
      //   url:
      //     this.fun.isIosOrAndroid() === "android"
      //       ? window.location.href
      //       : window.initUrl
      // };
      // $http
      //   .post("goods.goods.get-goods-page", json, "加载中")
      //   .then(response => {
      //     if (response.result === 1) {
            this.getData(data.get_hotel_info);
            this.showGood = true;
            // this.initShare(response.data.wx_js_sdk_config);
      if(data.is_favorite) {
        this.favorite = data.is_favorite.status == 1 ? true : false;
      }
        //   } else {
        //     console.log(response.msg);
        //     this.isGoods = false;
        //     MessageBox("提示", response.msg);
        //     this.$router.go(-1);
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    },

    getData(data) {
      // let json = {
      //   goods_id: this.$route.params.id,
      //   enter_at: this.$route.query.start || "",
      //   leave_at: this.$route.query.end || ""
      // };
      // $http
      //   .get(DETAIL_URL, json, "加载中...")
      //   .then(res => {
      //     if (res.result === 1) {
      this.goods_info = data.goods;
      this.hotel_info = data.hotel;
      this.isGoods = true;
      //   } else {
      //     this.isGoods = false;
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    //获取评论数据
    getCommentData() {
      let that = this;
      let json = {
        goods_id: this.$route.params.id,
        page: 1
      };
      console.log(json);
      $http.get("goods.comment.get-comment", json, "获取中").then(
        function(response) {
          // console.log(response.data)
          if (response.result === 1) {
            that.comment_data = response.data.data;
          } else {
          }
        },
        function(response) {
          //is_third_content = false;//复位
          console.log(response);
        }
      );
    },

    itemClick(index) {
      if (index == "用户评价") {
        this.getCommentData();
      }
    },
    //分享
    shareWeixin() {
      console.log("share");
      //不是微信端 不访问
      if (this.fun.getTyep() == 5) {
        return;
      } else if (this.fun.getTyep() == 7) {
        this.appSharesinit();
        return;
      }
      MessageBox({
        title: "提示",
        message: "请点击右上角微信分享",
        showCancelButton: true
      });
    },
    //app获取分享数据
    appSharesinit() {
      var that = this;
      var _url = document.location.href;
      var json = {
        url: _url,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result == 1) {
            that.appShare(response.data);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //app分享设置
    appShare(data) {
      var that = this;
      var _title = that.fun.isTextEmpty(
        that.goods_info.has_one_share.share_title
      )
        ? that.goods_info.title
        : that.goods_info.has_one_share.share_title;
      var _link = document.location.href + "&share_tag=2";
      _link = that.fun.isMid(_link, data.info.uid);

      var _imgUrl = that.fun.isTextEmpty(
        that.goods_info.has_one_share.share_thumb
      )
        ? that.goods_info.thumb
        : that.goods_info.has_one_share.share_thumb;
      var _desc = that.fun.isTextEmpty(that.goods_info.has_one_share.share_desc)
        ? data.shop.shop.name
        : that.goods_info.has_one_share.share_desc;
      YDB.Share(_title, _desc, _imgUrl, _link, "Sharesback");
    },

    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = "";
        let _imgUrl = "";
        let _desc = "";
        if (that.fun.isTextEmpty(that.goodsInfo.has_one_share)) {
          //返回的goodsInfo.has_one_share：null ,数据中没有相应对象,报错，后期后端会修复
          _title = that.goodsInfo.title;
          _imgUrl = that.goodsInfo.thumb;
          _desc = data.shop.shop.name;
        } else {
          _title = that.fun.isTextEmpty(
            that.goodsInfo.has_one_share.share_title
          )
            ? that.goodsInfo.title
            : that.goodsInfo.has_one_share.share_title;
          _imgUrl = that.fun.isTextEmpty(
            that.goodsInfo.has_one_share.share_thumb
          )
            ? that.goodsInfo.thumb
            : that.goodsInfo.has_one_share.share_thumb;
          _desc = that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_desc)
            ? data.shop.shop.name
            : that.goodsInfo.has_one_share.share_desc;
        }

        //let _link = document.location.href + "&mid=" + data.info.uid + "&share_tag=2";
        //let _link = location.protocol+'//'+location.host+location.pathname +'?i='+ that.fun.getKeyByI() +"&type=" +that.fun.getTyep()+ "&mid=" + data.info.uid + "&share_tag=2";

        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

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

        // if(that.fun.getWechatVersion()){
        //   wx.updateTimelineShareData({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       //Toast("分享成功");
        //     },
        //     // cancel: function () {
        //     //   Toast("取消分享");
        //     // }
        //   });

        //   wx.updateAppMessageShareData({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     //type: 'link', // 分享类型,music、video或link，不填默认为link
        //     //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       //Toast("分享成功");
        //     },
        //     // cancel: function () {
        //     //   Toast("取消分享");
        //     // }
        //   });
        // }else{
        //   wx.onMenuShareTimeline({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });

        //   wx.onMenuShareAppMessage({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     type: 'link', // 分享类型,music、video或link，不填默认为link
        //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });
        // }
      });
    },

    //海报生成
    postShow() {
      if(!this.fun.isTextEmpty(this.posterImg.base64Image)){
        this.posterShow = true;
      }else{
        let toastPoster = Toast({
          duration: -1, // 持续展示 toast
          message: '正在为您生成海报中'
        });
        $http
          .get(
            "goods.goods-poster.generate-goods-poster",
            { id: this.$route.params.id, hotel_id: this.goods_info.hotel_id },
            "...加载中"
          )
          .then(response => {
            toastPoster.close();
            if (response.result == 1) {
              this.posterImg = response.data;
              this.posterShow = true;
            } else {
              this.posterShow = false;
              MessageBox("提示", response.msg);
            }
          })
          .catch(error => {
            toastPoster.close();
            console.log(error);
          });
      }
    },

    //判断是否收藏
    isFavorite() {
      let that = this;
      let json = {
        goods_id: this.$route.params.id,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep(),
        mid: this.fun.getKeyByMid()
      };
      $http.get("member.member-favorite.isFavorite", json).then(
        function(response) {
          // console.log(response)
          if (response.result == 1) {
            //已收藏
            that.favorite = response.data.status == 1 ? true : false;
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //收藏操作
    onFavorite(isFavorite) {
      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }
      isFavorite ? this.removeFavorite() : this.addFavorite();
      console.log(isFavorite);
    },

    //添加收藏
    addFavorite() {
      let that = this;
      let json = {
        goods_id: this.$route.params.id,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep(),
        mid: this.fun.getKeyByMid()
      };
      $http.get("member.member-favorite.store", json, "处理中...").then(
        function(response) {
          // console.log(response)
          if (response.result == 1) {
            that.favorite = true;
            Toast("操作成功");
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //移除收藏
    removeFavorite() {
      let that = this;
      let json = {
        goods_id: this.$route.params.id,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep(),
        mid: this.fun.getKeyByMid()
      };
      $http.get("member.member-favorite.destroy", json, "处理中...").then(
        function(response) {
          // console.log(response)
          if (response.result == 1) {
            that.favorite = false;
            Toast("操作成功");
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //初始化客服参数
    initCservice(newCservice) {
      if (!this.fun.isTextEmpty(newCservice)) {
        this.cservice = newCservice;
        return;
      }
      if (
        !this.fun.isTextEmpty(this.$store.state.temp.mailInfo) &&
        !this.fun.isTextEmpty(this.$store.state.temp.mailInfo.cservice)
      ) {
        this.cservice = this.$store.state.temp.mailInfo.cservice;
        return;
      }
    },

    gotoService() {
      if (this.fun.isTextEmpty(this.hotel_info.cservice)) {
        Toast("请设置客服");
      }
      window.location.href = this.hotel_info.cservice;
    },

    order() {
      this.$router.push(
        this.fun.getUrl("HotelGoodsOrder", {
          end: this.$route.query.end,
          start: this.$route.query.start,
          id: this.goods_info.hotel_id,
          goods_id: this.$route.params.id
        })
      );
    },

    goBack() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("home", {}));
      } else {
        this.$router.go(-1);
      }
    },

    gotoHome() {
      this.$router.push(this.fun.getUrl("home", {}));
    },

    gotoMember() {
      this.$router.push(this.fun.getUrl("member", {}));
    },
    //跳转优惠券领取
    gotoCoupon() {
      this.$router.push(
        this.fun.getUrl("hotelCoupon", {
          id: this.goods_info.hotel_id
        })
      );
    }
  },
  components: { cTitle }
};
