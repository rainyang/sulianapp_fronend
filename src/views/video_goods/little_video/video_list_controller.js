import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      videoList: [],
      bannerList: [],
      newArray1: [],
      newArray2: [],
      showLoading: false,

      //more
      isLoadMore: false,
      page: 1,
      total_page: 0
    };
  },
  activated() {
    if (this.$route.params.from === "release") {
      this.getData();
    } else {
      if (window.location.href.indexOf("#/videoList") > -1) {
        setTimeout(() => {
          window.scrollTo(0, window.videoScrollTop);
        }, 200);
      }
    }
  },
  mounted() {
    window.videoScrollTop = 0;
    if (this.$route.params.from !== "release") {
      this.getBanner();
      this.getData();
    }
  },
  beforeRouteLeave(to, from, next) {
    window.videoScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  methods: {
    my() {
      this.$router.push(this.fun.getUrl("myVideo"));
    },
    getBanner() {
      //获取幻灯片海报
      $http
        .get("plugin.video-share.frontend.set.getSlide", {}, " ")
        .then(response => {
          if (response.result === 1) {
            this.bannerList = response.data.slide;
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 图片加载完回调
    getImg(url, callback, callback2) {
      let img = new Image();
      img.src = url;
      //如果图片被缓存，则直接返回缓存数据
      if (img.compltet) {
        /* callback(img.width, img.height); */
        callback(img.width, img.height, Number(img.height) / Number(img.width));
      } else {
        //完全加载完毕的事件
        img.onload = function() {
          /* callback(img.width, img.height); */
          callback(
            img.width,
            img.height,
            Number(img.height) / Number(img.width)
          );
        };

        img.onerror = function() {
          callback2();
        };
      }
    },
    getData() {
      this.videoList = [];
      this.page = 1;
      this.isLoadMore = false;
      this.showLoading = false;
      $http
        .get(
          "plugin.video-share.frontend.video.getList",
          { page: this.page },
          "load"
        )
        .then(response => {
          if (response.result === 1) {
            this.total_page = response.data.list.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            if (this.total_page === 0) {
              this.showLoading = true;
            }
            this.videoList = response.data.list.data;
            this.newArray1 = [];
            this.newArray2 = [];
            this.sort(0, this.videoList);
          } else {
            Toast(response.msg);
            this.page = this.page - 1;
            this.isLoadMore = false;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    sort(arg, list) {
      let that = this;
      let index = arg || 0;
      if (list.length > index) {
        that.getImg(
          list[index].cover,
          function(w, h, r) {
            let boxA = 0;
            let boxB = 0;

            if (document.getElementsByClassName("zq-waterfall-left")[0]) {
              boxA = document.getElementsByClassName("zq-waterfall-left")[0]
                .clientHeight;
            }

            if (document.getElementsByClassName("zq-waterfall-right")[0]) {
              boxB = document.getElementsByClassName("zq-waterfall-right")[0]
                .clientHeight;
            }

            if (boxA <= boxB) {
              that.newArray1.push(list[index]);
              that.$nextTick(() => {
                that.sort(index + 1, list); //加载完再递归
              });
            } else {
              that.newArray2.push(list[index]);
              that.$nextTick(() => {
                that.sort(index + 1, list);
              });
            }
          },
          function() {
            list[index].cover = "https://www.yunzmall.com/addons/yun_shop/static/app/img/agreen_video@2x.png";
            that.$nextTick(() => {
              that.sort(index, list);
            });
          }
        );
      }
      if (list.length - 1 == index) {
        this.isLoadMore = true;
        this.showLoading = true;
      }
    },
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      this.showLoading = false;
      if (this.page >= this.total_page) {
        this.showLoading = true;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.video-share.frontend.video.getList",
            {
              page: that.page
            },
            "加载中"
          )
          .then(
            response => {
              if (response.result === 1) {
                let myData = response.data.list.data;
                let oldLength = that.videoList.length;
                that.videoList = that.videoList.concat(myData); //数组拼接
                that.sort(oldLength, that.videoList);
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    toVideo(item) {
      let page = this.videoList.findIndex((value, index, arr) => {
        return value.id === item.id;
      });
      //页数
      page = Math.ceil((page + 1) / 15);
      this.$router.push(
        this.fun.getUrl("VideoDetail", {}, { vid: item.id, page: page })
      );
    }
  },
  components: { cTitle }
};
