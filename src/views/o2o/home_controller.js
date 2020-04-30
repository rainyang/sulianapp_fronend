import { mapState } from "vuex";
import cTitle from "components/title";
import cMent from "components/o2oment";
import cStoreList from "components/storeList";
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
import shownotice from "components/temp/notice";
import showbusiness from "components/temp/business";

import cMyswipe from "components/myswipe";
import { Swipe, SwipeItem } from "components/meswipe";
import { Indicator, Toast } from "mint-ui";
import { Loadmore } from "mint-ui";

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
      address: "",
      point: {},
      stores: [],
      city: "",
      carousels: [],
      moreNum: 1,
      topStatus: "",
      bottomStatus: "",
      getAllLoaded: false,
      isLoadMore: true,
      page: 1,
      total_page: 0,

      // 选项卡
      shop: "",
      is_open: 0,
      clientWidths: ""
    };
  },
  //computed: mapState(['mailInfo']),
  //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
  computed: {},
  mounted() {
    this.clientWidths = document.body.clientWidth;
  },
  deactivated() {
    window.removeEventListener("scroll", this.slider);
  },
  created() {
    this.clientWidths = document.body.clientWidth;
    if (this.$route.params.fromHome !== 1) {
      this.ready();
    }
  },
  activated() {
    window.addEventListener("scroll", this.slider);
    this.clientWidths = document.body.clientWidth;
    //this.guideFollow();
    if (this.$route.params.fromHome === 1) {
      this.ready();
    }

    // this.indexData();
    this.$store.commit("setReferer", "");
  },
  methods: {
    getShopData(data) {
      // $http
      // 	  .get(
      // 			  "plugin.store-cashier.frontend.store.aggregate-page.get-tab",
      // 			  {},
      // 			  " "
      // 	  )
      // 	  .then(res => {
      // 		  if (res.result === 1) {
      this.shop = data;
      for (let val of this.shop) {
        if (val.is_open) {
          this.is_open = val.is_open;
          return;
        }
      }
      // }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },
    getStorePage() {
      this.page = 1;
      let p = this.fun.bd_encrypt(this.point.lng, this.point.lat);
      $http
        .get(
          "plugin.store-cashier.frontend.store.store.get-store-page",
          {
            kwd: "",
            lng: p.lng,
            lat: p.lat,
            city_name: this.city,
            page: this.page
          },
          " "
        )
        .then(
          response => {
            if (response.result === 1) {
              if (response.data.store_list) {
                this.getStores(response.data.store_list);
              }
              this.category = response.data.category_list;
              this.indexData(response.data.get_default);
              this.getShopData(response.data.get_tab);
            } else {
              this.stores = [];
              this.page = 1;
              Toast(response.msg);
              console.log(response.msg);
            }
          },
          response => {
            //alert('网络错误，请稍后再试！')
          }
        )
        .catch(err => {
          console.log(err);
        });
    },
    ready() {
      let myLocation = this.$store.state.o2oLocation;
      this.initData();

      if (myLocation.point) {
        this.address = myLocation.title;
        this.city = myLocation.city;
        this.point = myLocation.point;
        //this.$store.commit('updateLocation', myLocation);
        //this.$store.commit('setLocation', myLocation);
        //初始化数据
        this.getStorePage();
        // this.getStores();
      } else {
        console.log("location不存在");
        this.getLocation();
      }
    },
    initData() {
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
    },
    //更新
    // loadTop() {
    //   this.initData();
    //   var myLocation = this.$store.state.o2oLocation;
    //   if (myLocation.point) {
    //     this.address = myLocation.title;
    //     this.city = myLocation.city;
    //     this.point = myLocation.point;
    //
    //     //初始化数据
    //     this.getStorePage();
    //     // this.getStores();
    //   } else {
    //     // console.log("location不存在");
    //     this.getLocation();
    //   }
    //   this.$refs.loadmore.onTopLoaded();
    // },
    // // 加载更多
    // loadBottom() {
    //   if (this.isLoadMore) {
    //     console.log("加载更多");
    //
    //     this.getMoreData(this.page);
    //     this.$refs.loadmore.onBottomLoaded();
    //   } else {
    //     console.log("没有更多数据");
    //   }
    // },

    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        var res =
          "经纬度：" +
          obj.position +
          "\n精度范围：" +
          obj.accuracy +
          "米\n定位结果的来源：" +
          obj.location_type +
          "\n状态信息：" +
          obj.info +
          "\n地址：" +
          obj.formattedAddress +
          "\n地址信息：" +
          JSON.stringify(obj.addressComponent, null, 4);
        //alert(res);
        //alert(JSON.stringify(obj.addressComponent, null, 4));
        var position = obj.position.toString().split(",");
        that.point = {
          lat: position[1],
          lng: position[0]
        };
        that.address = obj.formattedAddress;
        that.title = obj.formattedAddress;
        that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
          ? obj.addressComponent.city
          : obj.addressComponent.province;

        var pos = {
          address: obj.formattedAddress,
          city: that.city,
          title: obj.formattedAddress,
          point: that.point
        };
        console.log("test pos", pos);
        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        window.localStorage.setItem("myLocation", JSON.stringify(pos));
        that.getStorePage();
        // that.getStores();
      }

      function onError(obj) {
        console.log(obj);
      }
    },

    getStores(data) {
      // this.getStoresCategory();
      // $http
      //   .get(
      //     "plugin.store-cashier.frontend.store.store.get-store-list-to-page",
      //     {
      //       kwd: "",
      //       lng: this.point.lng,
      //       lat: this.point.lat,
      //       city_name: this.city,
      //       page: this.page
      //     },
      //     ""
      //   )
      //   .then(
      //     response => {
      //       if (response.result === 1) {

      this.total_page = data.last_page;
      if (!this.total_page) {
        this.total_page = 0;
      }

      if (data.total <= 0 || data.current_page == data.last_page) {
        this.isLoadMore = false;
      }
      this.stores = data.data;

      // } else {
      //   that.stores = [];
      //   console.log(response.msg);
      // }
      //   },
      //   response => {
      //     console.log(response.msg);
      //     //alert('网络错误，请稍后再试！')
      //   }
      // )
      // .catch(err => {
      //   console.log(err);
      // });
    },

    tosearch() {
      // console.log(this.point);
      if (!this.city) {
        Toast({
          message: "请先选择城市",
        });
        return;
      }
      this.$router.push(
        this.fun.getUrl("o2oSearch", {
          city: this.city,
          point: JSON.stringify(this.point)
        })
      );
      //this.$router.push('/search');
    },

    tolocation() {
      this.$router.push(this.fun.getUrl("o2oLocation"));
    },

    slider() {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top < 50) {
        this.amout = false;
      } else {
        this.amout = true;
      }
    },
    //默认首页数据
    indexData(data) {
      // let that = this;
      // $http
      //   .get("plugin.store-cashier.frontend.store.get-default.get-index-data")
      //   .then(
      //     function(response) {
      //alert(response.data)
      // if (response.result === 1) {
      // console.log("index::::", response);
      this.bannerData = data.banner;
      this.carousels = data.carousels;
      this.ads = data.advs;
      // console.log("ads:", that.ads);
      //     } else {
      //       console.log(response.msg);
      //     }
      //   },
      //   function(response) {
      //     console.log(response);
      //   }
      // );
    },

    // //获取商城信息
    // getMailInfo() {
    //   let that = this;
    //
    //   $http.get("setting.get").then(
    //     function(response) {
    //       console.log(response);
    //       if (response.result == 1) {
    //         that.fun.setWXTitle(response.data.name);
    //       } else {
    //       }
    //     },
    //     function(response) {
    //       // error callback
    //     }
    //   );
    // },
    //banner点击
    bannerClick(item) {
      // console.log("bannerClick", item);
      if (!this.fun.isTextEmpty(item.link)) {
        window.location.href = item.link; //跳转
      }
    },

    getMoreData(page) {
      const that = this;
      that.isLoadMore = false;

      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        let p = this.fun.bd_encrypt(this.point.lng, this.point.lat);
        $http
          .get(
            "plugin.store-cashier.frontend.store.store.get-store-list-to-page",
            {
              kwd: "",
              lng: p.lng,
              lat: p.lat,
              city_name: this.city,
              page: this.page
            },
            "获取更多门店"
          )
          .then(
            response => {
              that.isLoadMore = true;
              if (response.result === 1) {
                let myData = response.data;

                that.stores = that.stores.concat(myData.data); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
            },
            function(response) {
              console.error(response);
            }
          );
      }
    }
  },

  components: {
    cTitle,
    cMent,
    cStoreList,
    banner,
    showbanner,
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
    shownotice,
    cMyswipe,
    Swipe,
    SwipeItem,
    showbusiness
  },
};
