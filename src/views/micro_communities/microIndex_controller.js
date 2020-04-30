import { Indicator, Toast } from "mint-ui";
import cTitle from "components/title";
import { scrollMixin } from "utils/mixin";
import cFlow from "components/Waterfalls_flow";

//import BMap from 'BMap';
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      active: 0,
      topContent: {},
      bannerContent: {},
      functionList: {},
      cate: [],
      cateList: [],
      newClassification: "",
      nearbyClassification: "",
      address: "",
      city: "",
      point: "",
      poster: "",
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
      getMoreDataType: "newClassification",
      cateMoreData: {},
      showLoading: false,

      newArray1: [],
      newArray2: []
    };
  },
  deactivated() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  activated() {
    this.getHomePageData();
    this.getClassification("newClassification");
    let myLocation = this.$store.state.o2oLocation;
    if (myLocation.point) {
      this.address = myLocation.title;
      this.city = myLocation.city;
      this.point = myLocation.point;
      //初始化数据
    } else {
      this.getLocation();
    }
  },

  mounted() {},
  methods: {
    getHomePageData() {
      let that = this;
      $http.get("plugin.micro-communities.api.index.index").then(
        function(response) {
          if (response.result == 1) {
            if (response.data.set) {
              that.topContent = {
                micro_top: response.data.set.micro_top,
                micro_top_jump: response.data.set.micro_top_jump,
                browse_num: response.data.browse_num,
                trick_num: response.data.trick_num
              };
              that.bannerContent = {
                micro_home_one: response.data.set.micro_home_one,
                micro_home_one_jump: response.data.set.micro_home_one_jump,
                micro_home_two: response.data.set.micro_home_two,
                micro_home_two_jump: response.data.set.micro_home_two_jump,
                micro_home_three: response.data.set.micro_home_three,
                micro_home_three_jump: response.data.set.micro_home_three_jump
              };
              that.functionList = {
                show_sign: response.data.set.show_sign == 1 ? true : false,
                show_clock: response.data.set.show_clock == 1 ? true : false,
                show_video: response.data.set.show_video == 1 ? true : false,
                show_qr: response.data.set.show_qr == 1 ? true : false
              };
            }
            that.cate = response.data.cate;
            for (let i = 0; i < that.cate.length; i++) {
              that.cateList.push([]);
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          // error callback
        }
      );
    },
    jumpAddress(url) {
      if (url) {
        window.location.href = url;
      }
    },
    goClassification(id) {
      this.$router.push(
        this.fun.getUrl("microClassification", {
          cateId: id
        })
      );
    },
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
      }

      function onError(obj) {
        console.log(obj);
      }
    },
    getClassificationBtn(index, title) {
      if (title == "最新") {
        this.getClassification("newClassification");
        this.getMoreDataType = "newClassification";
      } else if (title == "附近") {
        this.getClassification("nearbyClassification");
        this.getMoreDataType = "nearbyClassification";
      } else {
        let indexData = index - 2;
        this.getClassification("", this.cate[indexData].id, indexData);
        this.getMoreDataType = "cate";
        this.cateMoreData = {
          type: "",
          id: this.cate[indexData].id,
          index: indexData
        };
      }
    },
    getClassification(type, id, index) {
      let that = this;
      let dataJson = {};
      this.showLoading = false;
      this.isLoadMore = false;
      that.pageInit();
      if (id) {
        dataJson.cat_id = id;
      } else {
        if (type == "newClassification") {
          dataJson.trick_new = 1;
        } else if (type == "nearbyClassification") {
          let p = this.fun.bd_encrypt(this.point.lng, this.point.lat);
          dataJson.lng = p.lng;
          dataJson.lat = p.lat;
          dataJson.city_name = this.city;
          dataJson.address = this.city;
        }
      }
      $http
        .post("plugin.micro-communities.api.index.getStick", dataJson, "")
        .then(response => {
          if (response.result == 1) {
            that.total_page = response.data.last_page;
            if (that.total_page === 0) {
              this.showLoading = true;
            }
            if (id) {
              that.cateList.splice(index, 1, response.data.data);
            } else {
              if (type == "newClassification") {
                that.newClassification = response.data.data;
              } else if (type == "nearbyClassification") {
                that.nearbyClassification = response.data.data;
              }
            }
          } else {
            Toast(response.msg);
            this.isLoadMore = false;
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
    jumpToSearch() {
      this.$router.push(this.fun.getUrl("microSearchIndex"));
    },
    goToUrl(name) {
      this.$router.push(this.fun.getUrl(name));
    },
    openQrCode(e) {
      if (!this.poster && e !== "none") {
        if (!this.timer) {
          this.getPoster(e);
          this.timer = setInterval(() => {
            this.getPoster(e);
          }, 3000);
        } else {
          this.$refs.hook.style.display = e;
        }
      } else {
        this.$refs.hook.style.display = e;
        clearInterval(this.timer);
      }
    },
    getPoster(e) {
      $http.get("member.poster").then(
        response => {
          if (response.result === 1) {
            this.poster = response.data.image_url;
            this.$refs.hook.style.display = e;
            if (this.poster && this.timer) {
              clearInterval(this.timer);
            }
          } else {
            Toast(response.msg);
            if (this.timer) {
              clearInterval(this.timer);
            }
          }
        },
        response => {
          console.log(response.msg);
          if (this.timer) {
            clearInterval(this.timer);
          }
        }
      );
    },
    pageInit() {
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.newClassification = [];
    },
    loadMore() {
      this.isLoadMore = true;
    },
    //获取更多数据
    getMoreData() {
      const that = this;
      this.showLoading = false;
      let json = {};
      if (this.getMoreDataType == "newClassification") {
        json.trick_new = 1;
      } else if (this.getMoreDataType == "nearbyClassification") {
        let p = this.fun.bd_encrypt(this.point.lng, this.point.lat);
        json.lng = p.lng;
        json.lat = p.lat;
        json.city_name = this.city;
        json.address = this.city;
      } else {
        json.cat_id = that.cateMoreData.id;
      }
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        this.showLoading = true;
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
              if (response.result === 1) {
                var myData = response.data.data;
                if (that.getMoreDataType == "newClassification") {
                  that.newClassification = that.newClassification.concat(
                    myData
                  );
                } else if (that.getMoreDataType == "nearbyClassification") {
                  that.nearbyClassification = that.nearbyClassification.concat(
                    myData
                  );
                } else {
                  that.cateList[that.cateMoreData.index] = that.cateList[
                    that.cateMoreData.index
                  ].concat(myData);
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
    }
  },
  components: {
    cTitle,
    cFlow
  }
};
