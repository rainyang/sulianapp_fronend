import { Indicator, Toast } from "mint-ui";
import cTitle from "components/title";
import { scrollMixin } from "../../utils/mixin";
import cFlow from "components/Waterfalls_flow";

//import BMap from 'BMap';
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      homepageData: {},
      micuid: "",
      catelist: [],
      mainCommentShow: false,
      maincomment: "",
      active: 0,
      catelist_1: [],
      catelist_2: [],
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
      getMoreType: 1,
      showLoading:false,
      showLoading_1:false,
      showLoading_2:false
    };
  },
  activated() {
    if (this.$route.query.micuid) {
      this.micuid = this.$route.query.micuid;
    }
    this.getHomepageData();
  },

  mounted() {},
  methods: {
    pageInit() {
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
    },
    getHomepageData() {
      let that = this;
      let dataJson = {};
      if (this.micuid) {
        dataJson.uid = this.micuid;
      }
      $http
        .post("plugin.micro-communities.api.user.index", dataJson, "")
        .then(response => {
          if (response.result == 1) {
            that.homepageData = response.data;
            that.micuid = that.homepageData.uid;
            that.maincomment = response.data.signature
              ? response.data.signature
              : "";
            that.initShare();
            if (that.homepageData.is_own == 1) {
              this.getMoreType = 1;
              that.getClassification();
            } else {
              this.getMoreType = 3;
              that.getClassification();
            }
          } else {
            Toast(response.msg);
          }
        });
    },
    getClassification() {
      let that = this;
      let dataJson = {};
      that.pageInit();
      if (this.getMoreType == 1) {
        dataJson.uid = that.micuid;
        that.showLoading_1 = false;
      } else if (this.getMoreType == 2) {
        dataJson.is_praise = 1;
        that.showLoading_2 = false;
      } else if (this.getMoreType == 3) {
        dataJson.uid = that.micuid;
        that.showLoading = false;
      }
      $http
        .post("plugin.micro-communities.api.index.getStick", dataJson, "")
        .then(response => {
          if (response.result == 1) {
            that.total_page = response.data.last_page;
            if (this.getMoreType == 3) {
              that.catelist = response.data.data;
              that.showLoading = true;
            } else if (this.getMoreType == 1) {
              that.catelist_1 = response.data.data;
              that.showLoading_1 = true;
            } else if (this.getMoreType == 2) {
              that.catelist_2 = response.data.data;
              that.showLoading_2 = true;
            }
          } else {
            Toast(response.msg);
          }
        });
    },
    jumpDetails(stick_id) {
      this.$router.push(
        this.fun.getUrl("microCommentDetails", {
          stickId: stick_id
        })
      );
    },
    gotoFanList() {
      let that = this;
      this.$router.push(
        this.fun.getUrl("microFanlist", {}, { uid: that.micuid })
      );
    },
    attentionBtn() {
      if (this.homepageData.is_follow) {
        this.cancelAttention();
      } else {
        this.addAttention();
      }
    },
    cancelAttention() {
      let that = this;
      let dataJson = {
        uid: this.micuid
      };
      $http
        .post("plugin.micro-communities.api.user.delFollow", dataJson)
        .then(response => {
          if (response.result == 1) {
            this.$set(this.homepageData, "is_follow", false); //动态添加
            Toast(response.msg);
          } else {
            Toast(response.msg);
          }
        });
    },
    addAttention() {
      let that = this;
      let dataJson = {
        user_id: this.micuid
      };
      $http
        .post("plugin.micro-communities.api.user.addFollow", dataJson)
        .then(response => {
          if (response.result == 1) {
            this.$set(this.homepageData, "is_follow", true); //动态添加
            Toast(response.msg);
          } else {
            Toast(response.msg);
          }
        });
    },
    //初始化分享设置
    initShare() {
      let that = this;
      let json = {
        url:
          this.fun.isIosOrAndroid() === "android"
            ? window.location.href
            : window.initUrl
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result === 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = that.homepageData.nickname + "的微社区"; //微社区名称
        let _link =
          location.protocol +
          "//" +
          window.location.host +
          "/addons/yun_shop/#/microhomepage?mid=" +
          data.info.uid +
          "&i=" +
          data.info.uniacid +
          "&micuid=" +
          that.micuid;
        let _imgUrl = that.homepageData.avatar ? that.homepageData.avatar : ""; //用户头像
        let _desc = that.homepageData.signature
          ? that.homepageData.signature
          : ""; //微社区签名
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
    //获取更多数据
    getMoreData() {
      const that = this;
      let json = {};
      if (this.getMoreType == 1) {
        json.uid = that.micuid;
        that.showLoading_1= false;
      } else if (this.getMoreType == 2) {
        json.is_praise = 1;
        that.showLoading_2= false;
      } else if (this.getMoreType == 3) {
        json.uid = that.micuid;
        that.showLoading= false;
      }
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        json.page = this.page;
        $http
          .post(
            "plugin.micro-communities.api.index.getStick",
            json,
            "加载中..."
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.data;
                if (this.getMoreType == 3) {
                  that.showLoading= true;
                  that.catelist = that.catelist.concat(myData);
                } else if (this.getMoreType == 1) {
                  that.showLoading_1= true;
                  that.catelist_1 = that.catelist_1.concat(myData);
                } else if (this.getMoreType == 2) {
                  that.showLoading_2= true;
                  that.catelist_2 = that.catelist_2.concat(myData);
                }
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
                return;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    subMainBtn() {
      if (!this.maincomment) {
        Toast("请留下你的简介吧");
        return false;
      }
      let that = this;
      let dataJson = {};
      dataJson.contents = this.maincomment;
      $http
        .post("plugin.micro-communities.api.user.upSignature", dataJson, "")
        .then(response => {
          if (response.result == 1) {
            that.$set(that.homepageData, "signature", that.maincomment);
            Toast(response.msg);
            that.mainCommentShow = false;
          } else {
            Toast(response.msg);
            that.mainCommentShow = false;
          }
        });
    },
    getClassificationBtn(e) {
      if (e == 1) {
        this.getMoreType = 2;
        this.getClassification();
      } else {
        this.getMoreType = 1;
        this.getClassification();
      }
    },
    introductionInp() {
      this.mainCommentShow = true;
    }
  },

  components: {
    cTitle,
    cFlow
  }
};
