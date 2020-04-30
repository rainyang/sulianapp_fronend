import cTitle from "components/title";
import loading from "components/loading";
import cLive from "components/goods/children/liveList";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "utils/mixin";
import cFlow from "components/Waterfalls_flow";
import cComment from "components/comment";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      tabIndex: '店铺详情',
      tabList: ['店铺详情','门店员工'],
      micro_communities: [],
      get_recommend_goods: [],
      store_member: [],
      store_room: [],//直播间列表
      nearbyClassification: [],
      isShow: false,
      category: [],
      mainInfo: {},
      telephone: "",
      info: {},
      infoShow: false,

      //more
      isLoadMore: true,

      cisLoadMore: true,
      cPage: 1,
      cTotal_page: 0,

      roomisLoadMore: true,
      roomPage: 1,
      roomTotal_page: 0,

      commentList: []
    };
  },
  //computed: mapState(['mailInfo']),
  mounted() {},
  created() {},
  activated() {
    this.init();
    this.getStoreInfo();
    // this.getStoresCategory();
    // this.getStore();
  },
  methods: {
    toCard(id) {
      if(id) {
        this.$router.push(this.fun.getUrl("BusinessCard",{},{mark_id: id, mark:'card'}));
      }
    },
    onCopy: function(e) {
      Toast({
        message: "复制成功",
        duration: 1000
      });
    },
    onError: function(e) {
      Toast({
        message: "复制失败",
        duration: 1000
      });
    },
    chooseTab(tab) {
      this.tabIndex = tab;
      if(this.tabIndex == '门店微贴' && this.micro_communities.length <= 0) {
        this.getStoreCommunities();
      }else if(this.tabIndex == '门店直播') {
        if(this.store_room.length <= 0) {
          this.getStoreRooms();
        }
      }else if(this.tabIndex == '门店员工') {
        if(this.store_member.length <= 0) {
          this.getStoreMember();
        }
      }
      this.isLoadMore = true;
    },
    loadMore() {
      this.cisLoadMore = true;
    },
    toGood(id) {
      this.$router.push(this.fun.getUrl("goods", { id: id}))
    },
    getStoreMember() {
      $http
        .get(
          "plugin.store-cashier.frontend.store.get-store-info.get-store-staff",
          { store_id: this.$route.params.store_id }
        )
        .then(response => {
          if (response.result == 1) {
            this.store_member = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStoreRooms() {
      this.roomisLoadMore = false;
      $http
        .get(
          "plugin.store-cashier.frontend.store.get-store-info.get-room",
          { store_id: this.$route.params.store_id, page: 1 }
        )
        .then(response => {
          if (response.result == 1) {
            this.roomTotal_page = response.data.last_page;
            if (this.roomTotal_page === 0) {
              this.roomisLoadMore = true;
            }
            this.store_room = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStoreCommunities() {
      this.cisLoadMore = false;
      $http
        .get(
          "plugin.store-cashier.frontend.store.get-store-info.get-micro-communities",
          { store_id: this.$route.params.store_id, page: 1 }
        )
        .then(response => {
          if (response.result == 1) {
            this.cTotal_page = response.data.last_page;
            if (this.cTotal_page === 0) {
              this.cisLoadMore = true;
            }
            this.micro_communities = response.data.data;
            this.setCommunities();
          }
        })
        .catch(error => {
          this.cisLoadMore = false;
          console.log(error);
        });
    },
    setCommunities() {
      let arr = [];
      this.micro_communities.map(item => {
        arr.push(
          {
            id: item.id,
            title: item.title,
            praise_num: item.praise_num,
            has_one_stick_user: {
              avatar: item.user_avatar,
              nickname: item.user_nickname,
            },
            has_many_image: [{
              url: item.image,
              stick_id: item.id
            }]
          }
        );
      });
      this.nearbyClassification = arr;
    },
    getStoreInfo() {
      $http
        .post(
          "plugin.store-cashier.frontend.store.get-store-info.get-the-provider",
          {
            store_id: this.$route.params.store_id,
            url:
              this.fun.isIosOrAndroid() === "android"
                ? window.location.href
                : window.initUrl
          }, "loading"
        )
        .then(response => {
          this.isShow = true;
          if (response.result === 1) {
            this.initShare();
            this.getStore(response.data.store_info);
            this.get_recommend_goods = response.data.get_recommend_goods;
            if(response.data.is_micro_communities == 1) {
              this.tabList =  ['店铺详情','门店微贴','门店员工']
            }
            if(response.data.is_room == 1) {
              this.tabList =  ['店铺详情','门店直播','门店员工']
            }
            if(response.data.is_room == 1 && response.data.is_micro_communities == 1){
              this.tabList =  ['店铺详情','门店微贴','门店直播','门店员工']
            }

            if (!this.fun.isTextEmpty(response.data.store_information)) {
              this.info = response.data.store_information;
              this.infoShow = true;
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取页面主要信息
    getStore(data) {
      // $http
      //   .get(
      //     "plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id",
      //     { store_id: this.$route.params.store_id }
      //   )
      //   .then(response => {
      // console.log(response.data);
      // if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
      this.mainInfo = data;
      this.telephone = "tel:" + data.store_mobile;
      this.commentList = data.comment;
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    getMoreData() {
      this.cisLoadMore = false;
      this.isLoadMore = false;
      this.roomisLoadMore = false;
      let flag = false;
      let url = '';
      let json = {
        store_id: this.$route.params.store_id
      };

      if (this.tabIndex == '门店微贴') {
        url = 'plugin.store-cashier.frontend.store.get-store-info.get-micro-communities';
        if (this.cPage >= this.cTotal_page ) {
          this.cisLoadMore = true;
          this.isLoadMore = true;
        } else {
          this.cPage = this.cPage + 1;
          json.page = this.cPage;
          flag = true;
        }
      } else {
        url = 'plugin.store-cashier.frontend.store.get-store-info.get-room';
        if(this.roomPage >= this.roomTotal_page) {
          this.isLoadMore = true;
          this.roomisLoadMore = true;
        }else {
          this.roomPage = this.roomPage + 1;
          json.page = this.roomPage;
          flag = true;
        }
      }

      if(flag) {
        $http
          .post(url, json, "加载中")
          .then((response)=> {
              if (response.result === 1) {
                let myData = response.data.data;
                this.isLoadMore = true;
                if (this.tabIndex == '门店微贴') {
                  this.micro_communities = this.micro_communities.concat(myData);
                  this.setCommunities();
                } else {
                  this.store_room = this.store_room.concat(myData);
                }
              } else {
                this.cPage = this.cPage - 1;
                this.isLoadMore = false;
                this.cisLoadMore = false;
                this.roomisLoadMore = false;
              }
            },
            response => {
              // error callback
            }
          ).catch(err=>{
            console.log(err);
        });
      }
    },
    goToShop() {
      this.$router.push(
        this.fun.getUrl("o2oStore_v2", {
          store_id: this.$route.params.store_id,
          fromHome: 1
        })
      );
    },

    goToDetail() {
      this.$router.push(
        this.fun.getUrl("HomeSellerDetail", {
          store_id: this.$route.params.store_id
        })
      );
    },

    goToAdress() {
      let point = this.fun.bd_decrypt(this.mainInfo.lng, this.mainInfo.lat);
      //window.location.href="http://api.map.baidu.com/marker?location="+this.mainInfo.lat+","+this.mainInfo.lng+"&title=商家位置&content="+this.mainInfo.store_name+"&output=html";
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, this.mainInfo);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${
          point.lat
        }&destName=${
          this.mainInfo.store_name
        }&key=43de56d8e65fe042493541213d9ad7b0`;
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
                      address: "门店地址", // 地址详情说明
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

    goToCrash() {
      this.$router.push(
        this.fun.getUrl("cashier_pay", {
          store_id: this.$route.params.store_id
        })
      );
    },

    init() {
      this.isShow = false;
      this.category = [];
      this.mainInfo = {};
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },

    //分享

    initShare() {
      let that = this;
      let _url = document.location.href;
      let json = { url: _url };
      $http
        .post("member.member.wxJsSdkConfig", json)
        .then(response => {
          if (response.result == 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    share(data) {
      let that = this;

      wx.config(data.config);
      wx.ready(function() {
        let _title = that.fun.isTextEmpty(that.mainInfo.store_name)
          ? data.share.title
          : that.mainInfo.store_name;

        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        let _imgUrl = that.fun.isTextEmpty(that.mainInfo.store_thumb)
          ? data.share.icon
          : that.mainInfo.store_thumb;
        let _desc = that.fun.isTextEmpty(that.mainInfo.store_introduce)
          ? data.share.desc
          : that.mainInfo.store_introduce;

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
    }
  },
  components: { cTitle, cFlow, loading , cLive, cComment},
  compiled() {}
};
