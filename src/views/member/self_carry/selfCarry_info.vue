<!-- 自提点 列表 -->
<template>
  <div id="selfCarry_info">
    <div class="top-nav">
      <div class="location"
           @click="showAddress">
        <i class="iconfont icon-icon_location"></i>
        <span class="cityClass">{{ city }}</span>
        <i class="iconfont icon-member-bottom"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <form @submit.prevent
              action="#">
          <input type="search"
                 v-model="keyword"
                 title="搜索"
                 :placeholder="`输入${deliverName}名称`"
                 @keypress="search" />
        </form>
      </div>
    </div>
    <ul>
      <li class="radio_main"
          v-for="item in info"
          :key="item.id"
          @click.stop="gotoDetail(item.id)">
        <div class="title">
          <span class="text">{{ item.deliver_name }}</span>
          <span class="btn1">查看</span>
        </div>
        <div class="address">
          {{ item.distance }}{{ item.unit }} | {{ item.full_address }}
        </div>
        <div>
          营业时间：{{ item.business_hours_start }} -
          {{ item.business_hours_end }}
        </div>
      </li>
    </ul>
    <p v-if="positongIng"
       style="padding:1rem 0;">正在定位中，请稍等</p>
    <div v-if="LocationError"
         style="padding:1rem 0;">
      定位失败,请手动<span style="color:#f15353"
            @click.stop="toGeolocation">切换位置</span>
    </div>
    <div v-if="fun.isTextEmpty(info) && !positongIng && !LocationError">
      <img src="../../../assets/images/blank.png"
           alt=""
           style="margin-top:2rem;width:5rem;" />
      <p style="color:#999999;">抱歉，该地区暂无{{deliverName}}~</p>
    </div>
    <yd-cityselect v-model="addressShow"
                   :callback="addressCallback"
                   :items="district"></yd-cityselect>
    <van-popup v-model="show"
               position="bottom">
      <div id="selfCarry_detail">
        <van-nav-bar :title="`${deliverName}详情`"
                     right-text="取消"
                     @click-right="show = false" />
        <div class="top_main">
          <div class="title">{{ detailInfo.deliver_name }}</div>
          <div class="other">
            营业时间：{{ detailInfo.business_hours_start }}-{{
              detailInfo.business_hours_end
            }}
          </div>
          <div class="tel">
            <span>联系电话：{{ detailInfo.deliver_mobile }}</span><a @click.stop
               :href="'tel:' + detailInfo.deliver_mobile"
               style="">
              <yd-icon slot="icon"
                       name="phone2"
                       size="1.2rem"
                       color="#00c25e"></yd-icon>
            </a>
          </div>
          <div class="other">详细地址：{{ detailInfo.full_address }}</div>
        </div>
        <div class="bottom_box">
          <div>图片</div>
          <div class="img_box">
            <img :src="item"
                 alt=""
                 v-for="(item, index) in detailInfo.thumb"
                 :key="index" />
          </div>
        </div>
        <div class="btn"
             @click.stop="gotoOrder">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多
import { Toast } from "mint-ui";

var myLocation = null;
export default {
  mixins: [scrollMixin],
  data() {
    return {
      selectId: null, //点前选中的自提点id
      show: false,
      city: "正在定位",
      addressShow: false,
      positongIng: false, //当前是否正在定位中
      district: district, // 地址本地数据
      info: [], //自提点列表
      detailInfo: {},
      LocationError: false, //是否定位失败
      keyword: "",
      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0, //总页数
      deliverName:''//自提点自定义名称
    };
  },

  activated() {
    myLocation = this.$store.state.o2oLocation;
    this.init();
    this.getLocation();
  },
  components: {},

  computed: {},

  // mounted() {},

  methods: {
    init() {
      this.selectId = null;
      this.positongIng = false;
      this.addressShow = false;
      this.LocationError = false;
      this.info = [];
      this.detailInfo = {};
      this.city = "正在定位";
      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
      this.deliverName = '';
      this.show = false;
    },
    showAddress() {
      if (this.positongIng) {
        Toast("正在定位中，请稍等");
        return;
      } else if (this.LocationError) {
        Toast("定位失败,请手动切换位置");
        return;
      } else {
        this.addressShow = true;
      }
    },
    // 地址回调
    addressCallback(obj) {
      this.city = obj.itemName2;
      this.getList(this.city, myLocation.point.lat, myLocation.point.lng, "");
    },
    getLocation() {
      var that = this;
      if (!myLocation.point) {
        that.positongIng = true;
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
          that.positongIng = false;
          that.$store.commit("updateLocation", pos);
          that.$store.commit("setLocation", pos);
          that.city = pos.city;
          myLocation = pos;
          that.getList(pos.city, that.point.lat, that.point.lng, "");
        }

        function onError(obj) {
          Toast("定位失败,请手动切换位置");
          that.positongIng = false;
          that.LocationError = true;
          that.city = "定位失败";
        }
      } else {
        console.log("有地址信息，直接请求列表");
        that.city = myLocation.city;
        that.getList(
          myLocation.city,
          myLocation.point.lat,
          myLocation.point.lng,
          ""
        );
      }
    },
    getList(city, lat, lng, kwd) {
      let that = this;
      let p = this.fun.bd_encrypt(lng, lat);
      let json = {
        city_name: city,
        lat: p.lat,
        lng: p.lng,
        kwd: kwd
      };
      $http.get("plugin.package-deliver.frontend.deliver.getList", json).then(
        function(response) {
          if (response.result === 1) {
            that.fun.setWXTitle(response.data.name);
            that.isLoadMore = true;
            that.total_page = response.data.list.last_page;
            if (!that.total_page) {
              that.total_page = 0;
            }
            that.deliverName = response.data.name;
            that.info = response.data.list.data;
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //获取更多数据，加载更多
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      if (that.page >= that.total_page) {
        return;
      } else {
        that.page += 1;
        let p = this.fun.bd_encrypt(myLocation.point.lng, myLocation.point.lat);
        let json = {
          city_name: that.city,
          lat: p.lat,
          lng: p.lng,
          kwd: that.keyword,
          page: that.page
        };
        $http
          .get("plugin.package-deliver.frontend.deliver.getList", json)
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.list.data;
              that.info = that.info.concat(nextPageData); //进行数组拼接
            } else {
              that.page = that.page - 1;
              that.isLoadMore = false;
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    search(event) {
      if (event.keyCode === 13) {
        //如果按的是enter键  event.target.value
        event.preventDefault();
        this.getList(
          this.city,
          myLocation.point.lat,
          myLocation.point.lng,
          this.keyword
        );
      }
    },
    toGeolocation() {
      let that = this;
      if (this.$route.params.tag == "goodsDetail") {
        this.$router.push(
          this.fun.getUrl(
            "o2oLocation_loc",
            {
              tag: that.$route.params.tag,
              goodsId: that.$route.params.goodsId
            },
            { tag: "goodsDetail" }
          )
        );
      } else {
        this.$router.push(
          this.fun.getUrl(
            "o2oLocation_loc",
            {
              tag: that.$route.params.tag,
              goodsId: that.$route.params.goodsId,
              optionsId: that.$route.params.optionsId,
              total: that.$route.params.total,
              cart_ids: that.$route.params.cart_ids,
              store_id:that.$route.params.store_id
            },
            { tag: "selfCarry" }
          )
        );
      }
    },
    gotoDetail(_id) {
      let that = this;
      if (this.selectId == _id) {
        that.show = true;
        return;
      } else {
        that.selectId = _id;
        that.detailInfo = {};
        $http
          .get("plugin.package-deliver.frontend.deliver.getDeliver", {
            deliver_id: _id
          })
          .then(
            function(response) {
              if (response.result === 1) {
                that.detailInfo = response.data.deliver;
                that.show = true;
              } else {
                Toast(response.msg);
              }
            },
            function(response) {
              console.log(response);
            }
          );
      }
      // this.$router.push(this.fun.getUrl("selfCarry_detail", { id: _id }));
    },
    gotoOrder() {
      let that = this;
      console.log("route", this.$route.params);
      if (this.$route.params.tag == "goodsDetail") {
        that.$router.push(
          that.fun.getUrl("goods", {
            id: that.$route.params.goodsId
          })
        );
      } else {
        var _goodsId = that.$route.params.goodsId;
        var _optionsId = that.$route.params.optionsId;
        var _total = that.$route.params.total;
        var submitActionTag = that.$route.params.tag;
        let changeSelfCarry = {
          deliver_name: that.detailInfo.deliver_name,
          deliver_mobile: that.detailInfo.deliver_mobile,
          full_address: that.detailInfo.full_address,
          id: that.selectId
        };
        that.$router.push(
          that.fun.getUrl("goodsorder", {
            from: 'ziti',
            tag: submitActionTag,
            goodsId: _goodsId,
            optionsId: _optionsId,
            total: _total,
            cart_ids: that.$route.params.cart_ids,
            store_id:that.$route.params.store_id,
            changeSelfCarry: JSON.stringify(changeSelfCarry)
          })
        );
      }
      that.addressShow = false;
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#selfCarry_info {
  background: #ffffff;
  padding-top: 3rem;
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 3rem;
    line-height: 3rem;
    align-items: center;
    justify-content: space-around;
    padding: 0 0.625rem;
    background: #ffffff;
    .location {
      .cityClass {
        display: inline-block;
        max-width: 3.5rem;
        height: 1.85rem;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
    }
    .search {
      box-shadow: 0rem 0rem 1rem 0rem rgba(92, 92, 92, 0.1);
      border-radius: 1rem;
      height: 2rem;
      line-height: 2rem;
      display: flex;
      flex: 1;
      margin-left: 0.625rem;
      i {
        padding-left: 0.5rem;
      }
      input {
        padding: 0 0.5rem;
        border: none;
        flex: 1;
      }
    }
  }
  .radio_main {
    width: 100%;
    padding: 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #666666;
    font-size: 12px;
    border-bottom: 0.026667rem /* 1/37.5 */ solid #dedede;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      flex: 1;
      height: 1rem;
      line-height: 1rem;
      margin-bottom: 0.5rem;
      .text {
        color: #333333;
        flex: 1;
      }
      .btn1 {
        color: #f15353;
      }
    }
    .address {
      margin-bottom: 0.25rem;
      line-height: 1rem;
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /*规定段落中的文本不进行换行 */
    }
  }
  #selfCarry_detail {
    .top_main {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 1rem;
      overflow: hidden;
      justify-content: space-between;
      background: #ffffff;
      color: #999999;
      font-size: 0.75rem;
      .title {
        font-size: 1rem;
        color: #333333;
        margin-bottom: 0.625rem;
      }
      .other {
        margin-bottom: 0.5rem;
      }
      .tel {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
    }
    .bottom_box {
      margin-top: 0.625rem;
      padding: 0.8rem 1.4rem;
      background: #ffffff;
      text-align: left;
      .img_box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.625rem;
        img {
          width: 6.25rem;
          height: 6.25rem;
          margin: 0 0.625rem 0.8rem 0;
        }
      }
    }
    .btn {
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 1.13rem;
      text-align: center;
      color: #ffffff;
      background: #f15353;
    }
  }
  // .radio_scope {
  //   .van-radio {
  //     display: flex;
  //     align-items: center;
  //     padding: 1rem;
  //     .radio_main {
  //       text-align: left;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: space-between;
  //       color: #666666;
  //       font-size: 12px;
  //       .title {
  //         display: flex;
  //         justify-content: space-between;
  //         font-size: 1rem;
  //         flex: 1;
  //         height: 1rem;
  //         line-height: 1rem;
  //         margin-bottom: 0.5rem;
  //         .text {
  //           color: #333333;
  //         }
  //         .btn1 {
  //           color: #f15353;
  //         }
  //       }
  //       .address {
  //         margin-bottom: 0.25rem;
  //         width: 19rem;
  //         line-height: 1rem;
  //         overflow: hidden; /*超出部分隐藏*/
  //         text-overflow: ellipsis; /* 超出部分显示省略号 */
  //         white-space: nowrap; /*规定段落中的文本不进行换行 */
  //       }
  //     }
  //   }
  // }
}
</style>
