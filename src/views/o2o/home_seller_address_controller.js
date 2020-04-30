import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";

export default {
  data() {
    return {
      //经度
      lng: 0,
      //纬度
      lat: 0,
      city: "",
      storeName: ""
    };
  },

  mounted() {
    this.init();
    this.getAddress();
  },
  created() {},
  activated() {},
  methods: {
    createMap() {
      var map = new BMap.Map("map");
      var point = new BMap.Point(this.lng, this.lat);
      var marker = new BMap.Marker(point);

      map.centerAndZoom(point, 15);
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(this.lng, this.lat), 100);
      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl());
      // 设置地图显示的城市 此项是必须设置的
      map.setCurrentCity(this.city);
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);

      marker.addEventListener("touch", goTO);

      map.addOverlay(marker);

      function goTO() {
        if (this.fun.isWeiXin()) {
          this.goToWXAdress(items);
        } else {
          window.location.href = `https://m.amap.com/navi/?dest=${this.lng},${
            this.lat
          }&destName=${this.storeName}&key=43de56d8e65fe042493541213d9ad7b0`;
        }
        // window.location.href="http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title=商家位置&content="+this.storeName+"&output=html";
      }
    },
    goToWXAdress() {
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
                      latitude: this.lat, // 纬度，浮点数，范围为90 ~ -90
                      longitude: this.lng, // 经度，浮点数，范围为180 ~ -180。
                      name: this.storeName, // 位置名
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
    getAddress() {
      $http
        .get(
          "plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id",
          { store_id: this.$route.params.store_id }
        )
        .then(response => {
          if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
            this.lat = parseFloat(response.data.lat);
            this.lng = parseFloat(response.data.lng);
            this.storeName = response.data.store_name;
            this.city = response.data.store_address.slice(0, 2);
            this.createMap();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    init() {
      this.lng = 0;
      this.lat = 0;
      this.store_name = "";
    }
  },

  components: { cTitle },

  compiled() {}
};
