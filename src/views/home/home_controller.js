import cTitle from "components/title";
import cMent from "components/ment";
import cGoodsList from "components/goodsList";

import banner from "components/temp/banner";
import showbanner from "components/temp/banner";
import showmenu from "components/temp/menu";
import showtitle from "components/temp/title";
import showsearch from "components/temp/search";
import showline from "components/temp/line";
import showblank from "components/temp/blank";
import showrichtext from "components/temp/richtext";
import showpicture from "components/temp/picture";
import showcube from "components/temp/cube";
import showarea from "components/temp/area";
import showshop from "components/temp/shop";
import showgoods from "components/temp/goods";
import shownearbygoods from "components/temp/near_goods";
import shownotice from "components/temp/notice";
import showlocation from "components/temp/location";
import showstore from "components/temp/stores";
import showbusiness from "components/temp/business";
import showvideo from "components/temp/video";
import showdiyform from "components/temp/form";
import cMyswipe from "components/myswipe";
import { Swipe, SwipeItem } from "components/meswipe";
import showsign from "components/temp/showsign";

import showflashsale from "components/time_limit";
import showcoupon from "components/cupcon";

import showarticle from "components/article";

import showheadline from "components/topline";
import showassemble from "components/time_group";

import { MessageBox, Indicator, Toast } from "mint-ui";

var items = [
  {
    id: "M1491471961972",
    temp: "showsearch",
    params: {
      placeholder: "",
      style: "style2",
      color: "#000",
      bgcolor: "#FFF",
      bordercolor: "#fa1f24",
      searchurl: "",
      uniacid: "6"
    },
    data: "",
    other: "",
    content: ""
  }
];

export default {
  data() {
    return {
      address:'',
      city:'',
      point:{},
      fullShow: false,
      popShow: false,
      amout: false,
      index2: 1,
      category: [],
      goodsListData: [],
      ads: [],
      banner: banner,
      bannername: "banner",
      bannerData: [],
      other: "",
      content: "",
      show: true,
      tempData: items,
      oftemp: false,
      dftempData: false,
      follow_mode: {},
      isfollow: false,
      pageinfo: "",
      show1: false,
      isMiniApp: false,
      sliderNav: {},
      advertisement: {},
      isInDiy: 0
    };
  },

  computed: {},

  mounted() {
    localStorage.setItem("isset", 1);
    if (window.isMiniprogram) {
      this.isMiniApp = true;
    }
    window.HomeScrollTop = 0;
    // this.guideFollow();
  },
  created() {
    // this.getAdvertise();
    // this.getParams();
    this.getParams();
  },
  beforeRouteLeave(to, from, next) {
    window.HomeScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  deactivated() {
    window.removeEventListener("scroll", this.slider);
  },
  activated() {
    this.fullShow = false;
    this.popShow = false;
    this.advertisement = {};
    window.addEventListener("scroll", this.slider);

    if (window.location.href.indexOf("#/home?") > -1) {
      setTimeout(() => {
        window.scrollTo(0, window.HomeScrollTop);
      }, 200);
    }


    if (window.__wxjs_environment === "miniprogram") {
      window.isMiniprogram = true;
    }
    if (window.isMiniprogram) {
      this.isMiniApp = true;
    }
    this.fun.setWXTitle(this.$store.state.temp.item.janst);
    wx.miniProgram.postMessage({
      data: { goods_title: this.$store.state.temp.item.janst }
    });
    if (
      this.fun.isTextEmpty(this.$store.state.temp.item.topmenu) &&
      JSON.parse(window.localStorage.getItem("tempIndex")) != null
    ) {
      this.sliderNav = JSON.parse(
        window.localStorage.getItem("tempIndex")
      ).item.topmenu;
    } else {
      this.sliderNav = this.$store.state.temp.item.topmenu;
    }

    window.isInHome = 1; // 判断是否进入了首页
    if (!this.sliderNav) {
      this.sliderNav = {};
      this.tempInfo();
    } else if (window.isInDiy) {
      this.isInDiy = 1;
      window.isInDiy = 0;
      this.tempInfo();
    }

  },
  methods: {
    // loadTop() {
    //   this.guideFollow();
    //   this.getParams();
    //   this.$refs.loadmore.onTopLoaded();
    // },
    getParams() {
      let _url = document.location.href;
      // ,city_name:this.city,lng:p.lng,lat:p.lat
      // 要用post  链接太长
      $http
        .post("home-page.get-params", { url: _url}, " ")
        .then(response => {
          if (response.result === 1) {
            // this.initLanguage(response.data.lang);
            // this.initBalanceLang(response.data.balance);
            // this.getInvite(response.data.page);
            // if (window.homeFirst === 0) {
            //   this.tempInfo(response.data.home);
            // }
            // if (response.data.home.memberinfo) {
            //   window.localStorage.uid = response.data.home.memberinfo.uid;
            // }
            // localStorage.setItem(
            //   "globalParameter",
            //   JSON.stringify(response.data.globalParameter)
            // );
            this.guideFollow(response.data.guide);
            if (response.data.advertisement) {
              this.getAdvertise(response.data.advertisement);
            } else {
              this.$route.meta.foot = false;
              this.$emit("changeFoot", this.$route.meta.foot);
            }

          } else {
            if(response.msg=="站点已关闭"){
              MessageBox.alert(response.msg);
            }
            console.log(response.msg);
          }
        })
        .catch(err => {
          console.error(err, "app");
        });
    },
    // 获取装修或者是默认的数据
    tempInfo(data) {
      var that = this;

      if (data) {
        window.homeFirst = 1;
        if (!data) return;
        window.localStorage.setItem("integral", data.mailInfo.credit1);
        if (!data.default) {
          for (let j of data.item.data) {
            j.temp = "show" + j.temp;
            if (j.temp == "showlocation" || j.temp == "showstore") {
              that.isLocation = true;
            }
          }
          // 设置的标题（装修）
          data.item.janst = data.item.pageinfo.params.title;
        } else {
          // 设置的标题（默认）
          data.item.janst = data.mailInfo.name;
        }
        this.$store.commit("tempIndex", data);
        this.$store.commit("setPlugins", data);
        window.localStorage.setItem("tempIndex", JSON.stringify(data));
        window.localStorage.setItem("setPlugins", JSON.stringify(data));
      } else {
        $http.get("home-page.index", {}, "加载中").then(
          response => {
            if (!response) return;
            if (response.result === 1) {
              that.isInDiy = 0;
              window.localStorage.setItem(
                "integral",
                response.data.mailInfo.credit1
              );
              if (!response.data.default) {
                for (let j of response.data.item.data) {
                  j.temp = "show" + j.temp;
                  if (j.temp == "showlocation" || j.temp == "showstore") {
                    that.isLocation = true;
                  }
                }
                response.data.item.janst =
                  response.data.item.pageinfo.params.title;
              } else {
                response.data.item.janst = response.data.mailInfo.name;
              }
              this.$store.commit("tempIndex", response.data);
              window.localStorage.setItem("tempIndex", JSON.stringify(response.data));
              this.fun.setWXTitle(response.data.item.janst);
              this.sliderNav = response.data.item.topmenu;
            } else {
              console.log(response.msg);
            }
          },
          response => {
            MessageBox.alert(response);
          }
        );
      }
    },
    //关注方法
    guideFollow(data) {
      // $http.get("member.member.guideFollow").then(
      //   response => {
      if (data) {
        this.isfollow = true;
        this.follow_mode = data;
      } else {
        this.follow_mode = false;
      }
      //   },
      //   response => {
      //     console.log(response.msg);
      //   }
      // );
    },
    tosearch() {
      this.$router.push(this.fun.getUrl("search", { fromHome: 1 }));
    },
    slider() {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      top < 50 ? (this.amout = false) : (this.amout = true);
    },
    //banner点击
    bannerClick(item) {
      if (!this.fun.isTextEmpty(item.link)) {
        window.location.href = item.link; //跳转
      }
    },

    //区域分站--方法--开始
    gotoBrand(item) {
      this.$router.push(
        this.fun.getUrl("brandgoods", { id: item.id, fromHome: 1 })
      );
    },
    gotoTimeGood(val) {
      this.$router.push(this.fun.getUrl("goods", { id: val }));
    },
    gotoAdvs(link) {
      if (!this.fun.isTextEmpty(link)) {
        window.location.href = link; //跳转
      }
    },
    //显示首屏广告和弹窗广告
    getAdvertise(data) {
      // $http.get("member.member.getAdvertisement").then(response => {
      if (data.advertisement) {
        this.advertisement = data.advertisement;

        if (this.advertisement.Midswitch) {
          if (this.advertisement.Midrule === 0) {
            // this.$route.meta.foot = false;
            // this.$emit("changeFoot", this.$route.meta.foot);
            this.popShow = true;
          } else {
            // this.$route.meta.foot = false;
            // this.$emit("changeFoot", this.$route.meta.foot);
          }
        }

        if (this.advertisement.switch) {
          if (this.advertisement.rule === 0) {
            this.$route.meta.foot = true;
            this.fullShow = true;
            this.$emit("changeFoot", this.$route.meta.foot);
            this.countDown(this.advertisement.time);
          } else {
            this.$route.meta.foot = false;
            this.$emit("changeFoot", this.$route.meta.foot);
          }
        } else {
          this.$route.meta.foot = false;
          this.$emit("changeFoot", this.$route.meta.foot);
        }

      } else {
        this.$route.meta.foot = false;
        this.$emit("changeFoot", this.$route.meta.foot);
      }
      // });
    },
    closePop() {
      this.popShow = false;
    },
    countDown(num) {
      this.advertisement.time = num;
      --num;
      setTimeout(() => {
        if (num <= 0) {
          this.fullShow = false;
          this.$route.meta.foot = false;
          this.$emit("changeFoot", this.$route.meta.foot);
          return;
        } else {
          this.countDown(num);
        }
      }, 1000);
    },
    turnTo() {
      if (this.advertisement.link) {
        if (this.advertisement.link === window.location.href) {
          this.popShow = false;
        } else {
          window.location.href = this.advertisement.link;
        }
      }
    },
  },

  components: {
    cTitle,
    cMent,
    cGoodsList,
    banner,
    showbanner,
    showsign,
    showmenu,
    showtitle,
    showsearch,
    showline,
    showblank,
    showrichtext,
    showpicture,
    showcube,
    showarea,
    showshop,
    showgoods,
    shownearbygoods,
    shownotice,
    showlocation,
    showstore,
    cMyswipe,
    Swipe,
    SwipeItem,
    showcoupon,
    showheadline,
    showarticle,
    showflashsale,
    showbusiness,
    showassemble,
    showvideo,
    showdiyform
  }
};
