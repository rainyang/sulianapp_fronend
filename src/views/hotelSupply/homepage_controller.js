import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

export default {
  data() {
    return {
      data_info: {},
      id:'',
      //定位
      location: {},
    };
  },

  activated() {
    this.id = this.$route.params.id;
    this.location = this.$store.state.o2oLocation;
    // this.id =  1162 ;
    // this.location = {
    //   city: "上海市",
    //   province: "上海市",
    //   point: {
    //     lat:'28.65119',
    //     lng:"115.887208"
    //   }
    // }
    if (this.fun.isTextEmpty(this.location.point)) {
      this.getLocation();
    } else {
      this.getData();
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getLocation() {
      var that = this;
      var myLocation = this.$store.state.o2oLocation;
      console.log("route.name", this.$route);

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
        console.log("objjjjj", obj);
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
        let point = {
          lat: position[1],
          lng: position[0]
        };
        let address = obj.formattedAddress;
        let title = obj.formattedAddress;
        let city = !that.fun.isTextEmpty(obj.addressComponent.city)
          ? obj.addressComponent.city
          : obj.addressComponent.province;
        let province = obj.addressComponent.province?obj.addressComponent.province:'';
        var pos = {
          address: obj.formattedAddress,
          city: city,
          title: obj.formattedAddress,
          province:province,
          point: point
        };
        console.log("test pos", pos);
        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        that.location = pos;
        that.getData();
      }

      function onError(obj) {
        //alert(obj.info + '--' + obj.message);
        //alert.log(obj.info);
        Toast("定位失败,请手动切换位置");
      }
    },
    getData() {
      let p = this.fun.bd_encrypt(this.location.point.lng, this.location.point.lat);
      let json = {
        lng: p.lng,
        lat: p.lat,
        hotel_id:this.id
      };
      $http
        .post("plugin.hotel-supply.frontend.home.get-hotel", json)
        .then(res => {
          if (res.result == 1) {
            this.data_info = res.data;
          }else{
            MessageBox.alert(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToAdress(lng, lat) {
      let point = this.fun.bd_decrypt(
        // this.location.point.lng,
        // this.location.point.lat
        lng,
        lat
      );
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, this.$route.query);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${
          point.lat
          }&destName=${
          this.data_info.name
          }&key=43de56d8e65fe042493541213d9ad7b0`;
      }
    },
    goToWXAdress(point, store) {
      var that = this;
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
                      name: that.data_info.hotel_name, // 位置名
                      address: "详细地址", // 地址详情说明
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
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    gotoGoods(id) {
      let hotel_id =this.id;
      this.$router.push(this.fun.getUrl('hotelSupplyGoods',{hotel_id:hotel_id,id:id}));
    },
  },
  components: { cTitle}
};
