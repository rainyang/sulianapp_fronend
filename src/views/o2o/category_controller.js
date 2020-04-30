import {
  mapState,
  mapMutations
} from "vuex";
import cStoreList from "components/storeList";
import {
  Indicator,
  Toast
} from 'mint-ui';
import cTitle from 'components/title';
//import BMap from 'BMap';
export default {
  data() {
    return {
      title: "搜索",
      inputs: "",
      amout: false,
      order_by: "",
      order_field: "",
      id: "",

      stores: [],
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,

      point: {}
    };
  },
  activated() {
    // console.log("point");
    // this.id = this.$route.params.id;
    this.initData();
    this.getStoresByCategoryId();
  },

  mounted() {
    //this.slider();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getStoresByCategoryId() {

      var that = this;
      this.myLocation = this.$store.state.o2oLocation;
      if (!this.myLocation.point) {
        var mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
        });

        function onComplete(obj) {
          var res = '经纬度：' + obj.position +
            '\n精度范围：' + obj.accuracy +
            '米\n定位结果的来源：' + obj.location_type +
            '\n状态信息：' + obj.info +
            '\n地址：' + obj.formattedAddress +
            '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
          //alert(res);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");

          that.city = !that.fun.isTextEmpty(obj.addressComponent.city) ? obj.addressComponent.city : obj.addressComponent.province;
          that.point = {
            lat: position[1],
            lng: position[0],
            city: that.city,
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = !that.fun.isTextEmpty(obj.addressComponent.city) ? obj.addressComponent.city : obj.addressComponent.province;

          var pos = {
            address: obj.formattedAddress,
            city: that.city,
            title: obj.formattedAddress,
            point: that.point,
          };

          this.myLocation = pos;
          that.getStoresByCategoryIdLngAndLat(this.myLocation);

        }

        function onError(obj) {
          //alert(obj.info + '--' + obj.message);
          console.log(obj);
        }
      } else {
        that.getStoresByCategoryIdLngAndLat(this.myLocation);
      }
    },

    getStoresByCategoryIdLngAndLat(r) {
      var that = this;
      let json = {
        category_id: this.id,
        // lng: 113.273289,
        // lat: 23.15729,
        // city_name: '广州市',
        lng: r.point.lng,
        lat: r.point.lat,
        city_name: r.city,
        page: this.page
      };
      // var that = this;
      // let json = {
      //   category_id: this.id,
      //   lng: r.position.getLng(),
      //   lat: r.position.getLat(),
      //   city_name: r.addressComponent.city,
      //   page: this.page
      // };
      $http.get("plugin.store-cashier.frontend.store.store.get-store-list-by-category-id-to-page", json, "").then(response => {
        if (response.result == 1) {
          console.log("store", response);
          that.stores = response.data.data;
          if (response.data.last_page) {
            that.total_page = response.data.last_page;
          } else if (response.data.lastPage) {
            that.total_page = response.data.lastPage;
          }
        } else {
          that.stores = [];
          Toast(response.msg);
        }
      }).catch(error => {
        console.log(error);
      });
    },


    getMoreData(r) {
      let that = this;
      console.log(r);
      if (this.page == this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        that.loading = true;
        that.allLoaded = true;
        return;
      } else {
        this.page = this.page + 1;
        let json = {
          category_id: this.id,
          lng: r.point.lng,
          lat: r.point.lat,
          city_name: r.city,
          page: this.page
        };
        // let json = {
        //   category_id: this.id,
        //   lng: r.position.getLng(),
        //   lat: r.position.getLat(),
        //   city_name: r.addressComponent.city,
        //   page: this.page
        // };
        $http.get('plugin.store-cashier.frontend.store.store.get-store-list-by-category-id-to-page', json, '正在获取更多...').then(function (response) {

          if (response.result == 1) {

            that.loading = false;
            that.allLoaded = false;
            that.stores = that.stores.concat(response.data.data); //数组拼接

          } else {
            that.page = that.page - 1;
            that.loading = true;
            that.allLoaded = true;
            that.isLoadMore = false;
            return;
          }
        }, function (response) {
          // error callback
        });

      }
    },
    //更新
    loadTop() {
      this.initData();
      this.getStoresByCategoryId();
      this.$refs.loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {

      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
      if (this.isLoadMore) {
        this.getMoreData(this.myLocation);

        this.$refs.loadmore.onBottomLoaded();

      } else {
        console.log('没有更多数据');
      }

    },
    changList() {
      this.getMoreData(this.myLocation);
    },

    initData() {
      this.id = this.$route.params.id;
      this.stores = [];
      this.page = 1;
      this.goload = true;
      this.total_page = 0;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
      this.point = {};
    },

    // onComplete(data) {
    //   this.$yddialog.loading.close();
    //   console.log(111);
    //   console.log(data.addressComponent.city);
    //   this.point = data;
    //
    //   this.getStoresByCategoryIdLngAndLat(data);
    // },
    //
    // onError(error) {
    //   Toast(error.message);
    // }
  },

  components: {
    cStoreList,
    cTitle
  }
};
