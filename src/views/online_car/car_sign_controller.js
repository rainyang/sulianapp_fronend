import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";
import {scrollMixin} from "../../utils/mixin";//引入加载更多

const CAR_SIGN_URL = "plugin.net-car.frontend.car.index";
//获取签约汽车位置
const CAR_POSITION_URL = 'plugin.net-car.frontend.car.get-car-position';

export default {
    mixins: [scrollMixin],
    data() {
        return {
            signNumber: '0',//签约汽车数量
            //more
            signInfo: [],//签约汽车信息
            page: 1,//分页数，当前页数
            isLoadMore: true,//判断是否要加载更多的标志
            total_page: 0,//总页数
        };
    },

    activated() {
        this.getSignData();
     },

    mounted() { },
    methods: {
        //获取签约汽车数据
        getSignData() {
            let json = {
                port_type: this.$route.params.id,
                page : 1
            }
            $http.get(CAR_SIGN_URL, json, "加载中...").then(res => {
                if (res.result == 1) {
                    this.isLoadMore = true;
                    this.total_page = res.data.last_page;
                    if(!this.total_page) {
                        this.total_page = 0;
                    }
                    this.signInfo = res.data.data;
                    this.signNumber = res.data.total;
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //车辆位置
        goToAdress(carNun) {
          let that = this;
            $http.get(CAR_POSITION_URL, {number_plate: carNun}, "加载中...").then(res => {
                if (res.result == 1) {
                    let CarPoint = that.fun.bd_decrypt(res.data.jd,res.data.wd);
                    console.log("网约车转化地图坐标",CarPoint)
                    // this.CarLng = res.data.jd;
                    // this.CarLat = res.data.wd;
                    if (this.fun.isWeiXin()) {
                        this.goToWXAdress(CarPoint);
                      } else {
                        window.location.href = `https://m.amap.com/navi/?dest=${CarPoint.lng},${CarPoint.lat}&destName=车辆当前位置&hideRouteIcon=1&key=43de56d8e65fe042493541213d9ad7b0`;
                      }

                }
            }).catch(error => {
                console.log(error);
            })
        },
        goToWXAdress(CarPoint) {
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
                            latitude: CarPoint.lng, // 纬度，浮点数，范围为90 ~ -90
                            longitude: CarPoint.lat, // 经度，浮点数，范围为180 ~ -180。
                            name: '车辆当前位置', // 位置名
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
        //获取更多数据，加载更多
        getMoreData() {
            this.isLoadMore = false; // 防止多次请求分页数据
            const that = this;
            if(that.page >= that.total_page) {
                return;
            }else {
                that.page += 1;
                $http.get(CAR_SIGN_URL, {port_type: that.$route.params.id, page: that.page}, "加载中...").then(res => {
                    that.isLoadMore = true;
                    if (res.result == 1) {
                        var nextPageData = res.data.data
                        that.signInfo = that.signInfo.concat(nextPageData);//进行数组拼接
                        that.signNumber = res.data.total;
                    }else {
                        that.page = that.page - 1;
                        that.isLoadMore = false;
                        return;
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        //下拉刷新
        loadTop() {
            //console.log('触发下拉');
            this.initPageData();
            this.getSignData();
            this.$refs.loadmore.onTopLoaded();
        },
        // 初始化数据
        initPageData(){
            this.signInfo=[],
            this.isLoadMore=true,
            this.total_page=0,
            this.page=1
        },
    },
    components: { cTitle }
};
