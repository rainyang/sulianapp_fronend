<template>
  <div>
    <div id="position">
      <div class="left"
           @click="showCitys">
        <i class="iconfont icon-icon_location"></i>
        <span>{{ city }}</span>
      </div>
      <div class="search_box">
        <i class="iconfont icon-sousuo1"></i>
        <input type="text"
               v-model="address_detail"
               id="suggestId"
               name="address_detail"
               placeholder="输入您所在的地点" />
      </div>
      <div class="right"
           @click="goback">
        <span>取消</span>
      </div>
    </div>

    <ul class="address-list">
      <li @click="goToSelect(item)" class="address-list-item" v-for="(item,index) in addressList" v-show="item.location" :key='index'>
        {{item.name}} --- {{item.address}}
      </li>
    </ul>

    <div id="allmap"
         style="width: 100%;"></div>
  </div>
</template>

<script>
//import BMap from 'BMap';
import AMap from "AMap";

export default {
  components: {},
  data: () => ({
    headerData: {
      title: "办公地址",
      toLink: ""
    },
    address_detail: null, // 详细地址
    userlocation: { lng: "", lat: "" },
    stores: [],
    city: "广州",
    citys: [],
    isShowCitys: true,
    addressList: [],
  }),
  created() {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMap();
  },
  mounted() {
    // this.getCity();
    this.city = this.$route.query.city;
  },
  activated() {
    this.address_detail = "";
    this.city = this.$route.query.city;
    this.ready();
  },
  methods: {
    goToSelect(item) {
      let point = {
        lat: item.location.lat,
        lng: item.location.lng
      };
      let pos = {
        address: item.address,
        city: this.city,
        title: item.name,
        point: point
      };

      this.$store.commit("setSwitchCity", true);
      this.$store.commit("updateLocation", pos);
      this.$store.commit("setLocation", pos);
      if (this.$route.query.tag == "hotel") {
        this.$router.push(this.fun.getUrl("HotelIndex"));
      }else if (this.$route.query.tag == "appointment") {
        this.$router.push(this.fun.getUrl("Appointment"));
      }else if (this.$store.state.referer) {
        window.location.href = this.$store.state.referer;
      } else {
        this.$router.push(this.fun.getUrl("o2oHome",{fromHome:1}));
      }
    },
    loadMap: function() {
      // setTimeout(this.ready, 0)
    },
    goback() {
      this.$router.go(-1);
    },
    ready: function() {
      var th = this;
      var that = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      //输入提示
      var auto = new AMap.Autocomplete({
        input: "suggestId",
        city: that.city
      });

      let auto2 = new AMap.Autocomplete({
        city: that.city
      });

      auto2.search(that.city, function(status, result) {
        that.addressList = result.tips;
      });

      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
      function select(e) {

        AMap.plugin("AMap.Geocoder", function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: that.city
          });

          //var lnglat = [116.396574, 39.992706]
          geocoder.getAddress(e.poi.location, function(status, result) {
            if (status === "complete" && result.info === "OK") {
              // result为对应的地理位置详细信息
              var point = {
                lat: e.poi.location.lat,
                lng: e.poi.location.lng
              };
              console.log("write9999999", result);
              let pos = {};
              if (result.regeocode.addressComponent.city == "") {
                pos = {
                  address: e.poi.address,
                  // city:result.regeocode.addressComponent.district,
                  city: result.regeocode.addressComponent.province,
                  title: e.poi.name,
                  point: point
                };
              } else {
                pos = {
                  address: e.poi.address,
                  city: result.regeocode.addressComponent.city,
                  title: e.poi.name,
                  point: point
                };
              }

              th.$store.commit("setSwitchCity", true);
              th.$store.commit("updateLocation", pos);
              th.$store.commit("setLocation", pos);

              if (th.$route.query.tag == "hotel") {
                th.$router.push(th.fun.getUrl("HotelIndex"));
              }else if(th.$route.query.tag == "appointment"){
                th.$router.push(th.fun.getUrl('Appointment'));
              } else if (th.$store.state.referer) {
                //th.$router.push(th.$store.state.referer);
                window.location.href = th.$store.state.referer;
              } else {
                th.$router.push(th.fun.getUrl("o2oHome", { fromHome: 1 }));
              }
            }
          });
        });
      }
    },

    showCitys() {
      if (this.isShowCitys) {
        this.isShowCitys = false;
      } else {
        this.isShowCitys = true;
      }
    }

    // setCity(areaname) {
    //   this.city = areaname;
    //   this.isShowCitys = false;
    //   this.address_detail = '';
    //   console.log(areaname);
    //   this.ready();
    // },

    // getCity() {
    //   let that = this;
    //   $http.get('plugin.store-cashier.frontend.store.city.get-citys', this.form).then((response) => {
    //
    //     if (response.result == 1 && response.data.length > 0) {
    //       that.city = response.data[0].areaname;
    //       that.citys = response.data;
    //       that.ready();
    //     } else {
    //
    //     }
    //   }, (response) => {
    //     // error callback
    //   })
    // },
  }
};
</script>

<style>
/* 去掉地图左下角的百度LOGO */
.anchorBL {
  display: none;
}

.mint-cell-wrapper {
  text-align: left !important;
}

.mint-cell-value {
  width: 0 !important;
}

.xk {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow: hidden;
}

.xl {
  position: relative;
  font-size: 14px;
  color: #b0b0b0;
  text-align: center;
  line-height: 2.5rem;
  margin: 0 0.625rem;
}

.xl:before {
  content: "";
  height: 0;
  border-top: 0.0625rem dashed #b0b0b0;
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -0.0625rem;
  left: 0;
}

.xl span {
  background-color: #f4f4f4;
  display: inline-block;
  padding: 0 0.375rem;
  position: relative;
  z-index: 1;
}

.xm {
  padding: 0.625rem;
  width: 125%;
  box-sizing: border-box;
  padding-right: 3.875rem;
}

.xm li {
  display: inline-block;
  padding: 0.625rem 0;
  border: 0.0625rem solid #dddddd;
  background: #ffffff;
  color: #333333;
  margin: 0 0.625rem 0.625rem 0rem;
  width: 20%;
  text-align: center;
  float: left;
}

.xm li.curr {
  border: 0.0625rem solid #d0d0d0;
  background: #f3f3f3;
}

#position {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  height: 2.8125rem;
  align-items: center;
  padding: 0 0.625rem;
}

#position .left {
  display: flex;
}

#position .left i {
  color: #666;
  font-size: 1rem;
  margin-right: 0.25rem;
}

#position .left span {
  font-size: 14px;
  width: 4rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#position .search_box {
  display: flex;
  justify-content: flex-start;
  padding: 0 0.625rem;
  width: 12.5rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-radius: 1rem;
  background-color: #f5f5f5;
}

.search_box input {
  border: none;
  margin-left: 0.625rem;
  max-width: 11.25rem;
}

.search_box i {
  color: #999;
  font-size: 1rem;
}

#position .right {
  line-height: 2.8125rem;
  min-width: 2.5rem;
  font-size: 15px;
  color: #8c8c8c;
}

.address-list {
  background: #fff;
  text-align: left;
  padding: .3rem .5rem;
}

.address-list-item {
  min-height: 2rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid #eee;
}

.address-list-item:hover {
  background: #eee;
}
</style>
