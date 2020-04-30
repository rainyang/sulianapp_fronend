import cTitle from "components/title";
import { Loadmore } from "mint-ui";
import cOrderList from "components/orderList";
import { InfiniteScroll } from "mint-ui";
const documentElement = document.documentElement;
const body = document.body;
import { scrollMixin } from "../../../utils/mixin"; // 引入加载更多

export default {
  data() {
    return {
      // 当前的订单状态
      selected: 0,
      // 上一次的订单状态
      last_status: 0,
      dataList: {
        // 全部订单
        orderList: [],
        // 待付款
        waitPayList: [],

        waitSendList: [],
        waitReceiveList: [],
        waitCompleteList: [],
        waitRefund: [],
        alreadyComplete: []
      },
      action: "",
      // 待付款-多订单合并付款的订单id数组
      order_ids: [],
      checkList: [],
      // 是否开启合并支付
      isMultiplePay: false,

      detailUrl: "orderdetail",

      // shop 商城，cashier 收银台 store 门店
      orderType: "shop",

      // 顶部导航栏列表
      NavList: [],
      overSelected: [],

      // more
      page0: 1,
      total_page0: 0,
      isLoadMore0: true,

      page1: 1,
      total_page1: 0,
      isLoadMore1: true,

      page2: 1,
      total_page2: 0,
      isLoadMore2: true,

      page3: 1,
      total_page3: 0,
      isLoadMore3: true,

      page4: 1,
      total_page4: 0,
      isLoadMore4: true,

      page5: 1,
      total_page5: 0,
      isLoadMore5: true,

      page6: 1,
      total_page6: 0,
      isLoadMore6: true
    };
  },
  methods: {
    swichTabTItem() {
      // this.initData();
      window.scrollTo(0, 0);
      this.getOrderList(this.selected);
    },
    initData() {
      this.overSelected = [];
      this.page0 = 1;
      this.total_page0 = 0;
      this.isLoadMore0 = true;

      this.page1 = 1;
      this.total_page1 = 0;
      this.isLoadMore1 = true;

      this.page2 = 1;
      this.total_page2 = 0;
      this.isLoadMore3 = true;

      this.page3 = 1;
      this.total_page3 = 0;
      this.isLoadMore3 = true;

      this.page4 = 1;
      this.total_page4 = 0;
      this.isLoadMore4 = true;

      this.page5 = 1;
      this.total_page5 = 0;
      this.isLoadMore5 = true;

      this.page6 = 1;
      this.total_page6 = 0;
      this.isLoadMore6 = true;

      this.dataList = {
        // 全部订单
        orderList: [],
        // 待付款
        waitPayList: [],

        waitSendList: [],
        waitReceiveList: [],
        waitCompleteList: [],
        waitRefund: [],
        alreadyComplete: []
      };
    },
    // 更新
    loadTop() {
      this.initData();
      this.getOrderList(this.selected);
      this.$refs.loadmore.onTopLoaded();
    },
    getOrderList(index, str) {
      if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "cashier"
      ) {
        this.orderType = "cashier";
        this.detailUrl = "cashierOrderdetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "store"
      ) {
        this.orderType = "store";
        this.detailUrl = "storeOrderdetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "hotel"
      ) {
        this.orderType = "hotel";
        this.detailUrl = "HotelOrderDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "onlineCar"
      ) {
        this.orderType = "onlineCar";
        this.detailUrl = "netCarDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "hotel_center"
      ) {
        this.orderType = "hotel_center";
        this.detailUrl = "HotelCenterOrderDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "hotelcashier"
      ) {
        this.orderType = "hotelcashier";
        this.detailUrl = "HotelCashierOrderDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "DeliveryS" // 配送站-配送订单
      ) {
        this.orderType = "DeliveryS";
        this.detailUrl = "deliveryStationOrderDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "DeliveryReplenish" // 配送站-补货单
      ) {
        this.orderType = "DeliveryReplenish";
        this.detailUrl = "DeliveryReplenishDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "serviceReplenish" // 服务站-补货单
      ) {
        this.orderType = "serviceReplenish";
        this.detailUrl = "serviceReplenishDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "groups" //服务站-补货单
      ) {
        this.orderType = "groups";
        this.detailUrl = "groupDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "lease_toy"
      ) {
        // 判断是否租凭订单
        this.orderType = "lease_toy";
        // 详情的路径
        this.detailUrl = "LeaseToyOrderDetail";
      } else if (
        this.$route.params.orderType &&
        this.$route.params.orderType == "hireCar"
      ) {
        // 分期购车订单
        this.orderType = "hireCar";
        this.detailUrl = "hireCarOrderDetail";
      }
      console.log(this.orderType, "判断是否成功");
      console.log("list:::", this.orderType);
      // this.action
      if (index == 0) {
        this.action = "order.list";
        if (this.orderType == "cashier") {
          this.action = "plugin.store-cashier.frontend.Order.list";
        } else if (this.orderType == "store") {
          this.action =
            "plugin.store-cashier.frontend.store.center.order-list.index";
        } else if (this.orderType == "supplier") {
          this.action = "plugin.supplier.frontend.order.index";
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list"; // 全部
        } else if (this.orderType == "hotel_center") {
          this.action = "plugin.hotel.frontend.hotel.center.order-list";
        } else if (this.orderType == "hotelcashier") {
          this.action = "plugin.hotel.frontend.Order.list";
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.index"; //网约车
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.index"; // 租凭 全部
        } else if (this.orderType == "DeliveryS") {
          this.action = "plugin.delivery-station.frontend.order.list.index"; //配送站-配送订单
        } else if (this.orderType == "DeliveryReplenish") {
          this.action =
            "plugin.delivery-station.frontend.purchase.order-list.index"; //配送站-补货单
        } else if (this.orderType == "serviceReplenish") {
          this.action = "plugin.service-station.frontend.order-list.index"; //服务站-补货单
        } else if (this.orderType == "groups") {
          this.action =
            "plugin.fight-groups.frontend.controllers.list.grouping"; //拼团的正在拼团
        } else if (this.orderType == "hireCar") {
          this.action = "plugin.staging-buy-car.frontend.order-list.index"; //分期购车
        }
      } else if (index == 1) {
        this.action = "order.list.waitPay";
        if (this.orderType == "cashier") {
          this.action = "plugin.store-cashier.frontend.Order.list.waitPay";
        } else if (this.orderType == "store") {
          this.action =
            "plugin.store-cashier.frontend.store.center.order-list.waitPay";
        } else if (this.orderType == "supplier") {
          this.action = "plugin.supplier.frontend.order.wait-pay";
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list.wait-pay"; // 待付款
        } else if (this.orderType == "hotel_center") {
          this.action =
            "plugin.hotel.frontend.hotel.center.order-list.wait-pay";
        } else if (this.orderType == "hotelcashier") {
          this.action = "plugin.hotel.frontend.Order.list.waitPay";
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.wait-pay";
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.wait-pay"; // 租凭 待支付
        } else if (this.orderType == "DeliveryS") {
          this.action = "plugin.delivery-station.frontend.order.list.wait-pay"; //配送站-配送订单
        } else if (this.orderType == "DeliveryReplenish") {
          this.action =
            "plugin.delivery-station.frontend.purchase.order-list.wait-pay"; //配送站-补货单
        } else if (this.orderType == "serviceReplenish") {
          this.action = "plugin.service-station.frontend.order-list.wait-pay"; //服务站-补货单
        } else if (this.orderType == "groups") {
          this.action = "plugin.fight-groups.frontend.controllers.list.waitPay"; //拼团的待付款
        } else if (this.orderType == "hireCar") {
          this.action = "plugin.staging-buy-car.frontend.order-list.waitPay"; //分期购车
        }
      } else if (index == 2) {
        this.action = "order.list.waitSend";
        if (this.orderType == "cashier") {
          this.action = "plugin.store-cashier.frontend.Order.list.Completed";
        } else if (this.orderType == "store") {
          this.action =
            "plugin.store-cashier.frontend.store.center.order-list.waitSend";
        } else if (this.orderType == "supplier") {
          this.action = "plugin.supplier.frontend.order.wait-send";
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list.wait-send"; // 待确认
        } else if (this.orderType == "hotel_center") {
          this.action =
            "plugin.hotel.frontend.hotel.center.order-list.wait-send";
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.loan-review";
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.wait-send"; // 租凭 待发货
        } else if (this.orderType == "DeliveryS") {
          this.action =
            "plugin.delivery-station.frontend.order.list.wait-order"; //配送站-配送订单
        } else if (this.orderType == "DeliveryReplenish") {
          this.action =
            "plugin.delivery-station.frontend.purchase.order-list.wait-send"; //配送站-补货单
        } else if (this.orderType == "serviceReplenish") {
          this.action = "plugin.service-station.frontend.order-list.wait-send"; //服务站-补货单
        } else if (this.orderType == "groups") {
          this.action =
            "plugin.fight-groups.frontend.controllers.list.waitSend"; //拼团的待发货
        } else if (this.orderType == "hireCar") {
          this.action = "plugin.staging-buy-car.frontend.order-list.waitSend"; //分期购车
        }
      } else if (index == 3) {
        this.action = "order.list.waitReceive";
        if (this.orderType == "store") {
          this.action =
            "plugin.store-cashier.frontend.store.center.order-list.waitReceive";
        } else if (this.orderType == "supplier") {
          this.action = "plugin.supplier.frontend.order.wait-receive";
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list.wait-enter"; // 待入住
        } else if (this.orderType == "hotel_center") {
          this.action =
            "plugin.hotel.frontend.hotel.center.order-list.wait-enter";
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.loan";
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.wait-receive"; // 租凭 待收货
        } else if (this.orderType == "DeliveryS") {
          this.action = "plugin.delivery-station.frontend.order.list.wait-send"; //配送站-配送订单
        } else if (this.orderType == "DeliveryReplenish") {
          this.action =
            "plugin.delivery-station.frontend.purchase.order-list.wait-receive"; //配送站-补货单
        } else if (this.orderType == "serviceReplenish") {
          this.action =
            "plugin.service-station.frontend.order-list.wait-receive"; //服务站-补货单
        } else if (this.orderType == "groups") {
          this.action =
            "plugin.fight-groups.frontend.controllers.list.waitReceive"; //拼团的待收货
        } else if (this.orderType == "hireCar") {
          this.action =
            "plugin.staging-buy-car.frontend.order-list.waitReceive"; //分期购车
        }
      } else if (index == 4) {
        this.action = "order.list.Completed";
        if (this.orderType == "cashier") {
          this.action = "plugin.store-cashier.frontend.Order.list.Completed";
        } else if (this.orderType == "store") {
          this.action =
            "plugin.store-cashier.frontend.store.center.order-list.Completed";
        } else if (this.orderType == "supplier") {
          this.action = "plugin.supplier.frontend.order.completed";
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list.completed"; // 已完成
        } else if (this.orderType == "hotel_center") {
          this.action =
            "plugin.hotel.frontend.hotel.center.order-list.completed";
        } else if (this.orderType == "hotelcashier") {
          this.action = "plugin.hotel.frontend.Order.list.Completed";
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.pick-car";
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.wait-refund"; // 租凭 待归还
        } else if (this.orderType == "DeliveryS") {
          this.action =
            "plugin.delivery-station.frontend.order.list.wait-receive"; //配送站-配送订单
        } else if (this.orderType == "DeliveryReplenish") {
          this.action =
            "plugin.delivery-station.frontend.purchase.order-list.completed"; //配送站-补货单
        } else if (this.orderType == "serviceReplenish") {
          this.action = "plugin.service-station.frontend.order-list.completed"; //服务站-补货单
        } else if (this.orderType == "groups") {
          this.action =
            "plugin.fight-groups.frontend.controllers.list.completed"; //拼团的已完成
        } else if (this.orderType == "hireCar") {
          this.action = "plugin.staging-buy-car.frontend.order-list.completed"; //分期购车
        }
      } else if (index == 5) {
        if (this.orderType == "hotel_center") {
          this.action =
            "plugin.hotel.frontend.hotel.center.order-list.check-out"; // 待退房
        } else if (this.orderType == "hotel") {
          this.action = "plugin.hotel.frontend.hotel.list.check-out"; // 待退房
        } else if (this.orderType == "onlineCar") {
          this.action = "plugin.net-car.frontend.order-list.license-number";
        } else if (this.orderType == "lease_toy") {
          this.action = "plugin.lease-toy.api.order.order-list.completed"; // 租凭 已完成
        } else if (this.orderType == "DeliveryS") {
          this.action = "plugin.delivery-station.frontend.order.list.completed"; // 配送站-配送订单
        }
      } else {
        this.action = "plugin.net-car.frontend.order-list.completed"; // 网约车的已完成订单
      }

      // 酒店
      //加多了cofirmtype,组件更新点击了安钮需要更新下状态
      if (this.overSelected.indexOf(this.selected) < 0) {
        this.overSelected.push(this.selected);
        this.getNetData(this.action, index);
      }
      if (str === "refresh") {
        this.getNetData(this.action, index);
      }
    },
    toDetail(order) {
      this.$router.push(
        this.fun.getUrl("orderdetail", {
          order_id: order.id,
          isDetail: true,
          orderType: "supplier"
        })
      );
    },
    // 确认收货订单
    cofirmOrderAction(order) {
      if (this.selected == 0) {
        // 全部订单列表
        this.getOrderList(this.selected, "refresh");
      } else if (order == "pay") {
        this.getOrderList(this.selected, "refresh");
      } else {
        this.dataList.waitReceiveList.splice(
          this.dataList.waitReceiveList.indexOf(order),
          1
        );
      }
    },
    // 待付款状态下-多订单合并支付,order_ids-订单id数组
    toMultiplePay() {
      // type-1订单支付，type-2订单合并支付

      this.$router.push(
        this.fun.getUrl("orderpay", {
          status: 2,
          order_ids: encodeURI(this.order_ids)
        })
      );
      var child = this.$refs.mychild;
      // 调用子组件的方法
      // child.setCheckList();
      this.isMultiplePay = false;
    },
    // 接收到合并多订单支付的通知方法
    multiplePayAction(order_ids) {
      this.order_ids = order_ids;
      if (order_ids.length > 0) {
        this.isMultiplePay = true;
      } else {
        this.isMultiplePay = false;
      }
    },
    // 发起http请求
    getNetData(api, index) {
      var that = this;

      if (this.orderType == "supplier") {
        $http
          .post(
            api,
            {
              page: 1
            },
            "正在获取订单"
          )
          .then(
            function(response) {
              if (response.result === 1) {
                that[`isLoadMore${index}`] = true;
                var myData = response.data;

                that[`total_page${index}`] = response.data.last_page;
                if (!that[`total_page${index}`]) {
                  that[`total_page${index}`] = 0;
                }
                that.selectIndexData(index, myData.data);
              } else {
                // 判断权限
                if (response.data.url) {
                  that.$notify(response.msg);
                  window.location.href = response.data.url;
                  return 0;
                }
              }
            },
            function(response) {
              // error callback
            }
          );
      } else if (
        this.orderType == "hotel" ||
        this.orderType == "hotel_center"
      ) {
        $http
          .get(api, { page: 1 }, "正在获取订单")
          .then(response => {
            if (response.result === 1) {
              that[`isLoadMore${index}`] = true;
              var myData = response.data;

              that[`total_page${index}`] = response.data.last_page;
              if (!that[`total_page${index}`]) {
                that[`total_page${index}`] = 0;
              }

              that.selectIndexData(index, myData.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        $http
          .get(
            api,
            {
              page: 1
            },
            "正在获取订单"
          )
          .then(
            function(response) {
              if (response.result === 1) {
                that[`isLoadMore${index}`] = true;
                var myData = response.data;

                that[`total_page${index}`] = response.data.last_page;
                if (!that[`total_page${index}`]) {
                  that[`total_page${index}`] = 0;
                }

                that.selectIndexData(index, myData.data);
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    // 选择对应index进行赋值
    selectIndexData(index, setData) {
      var that = this;
      if (index == 0) {
        that.dataList.orderList = setData;
      } else if (index == 1) {
        that.dataList.waitPayList = setData;
      } else if (index == 2) {
        that.dataList.waitSendList = setData;
      } else if (index == 3) {
        that.dataList.waitReceiveList = setData;
      } else if (index == 4) {
        that.dataList.waitCompleteList = setData;
      } else if (index == 5) {
        that.dataList.waitRefund = setData;
      } else if (index == 6) {
        that.dataList.alreadyComplete = setData;
      } else {
        console.log("error: selectIndexData()");
      }
    },

    getMoreData() {
      const that = this;
      that[`isLoadMore${that.selected}`] = false; // 防止多次请求分页数据

      if (that[`page${that.selected}`] >= that[`total_page${that.selected}`]) {
        return;
      } else {
        that[`page${that.selected}`] = that[`page${that.selected}`] + 1;
        $http
          .get(
            this.action,
            {
              page: that[`page${that.selected}`]
            },
            "正在获取更多订单"
          )
          .then(
            function(response) {
              that[`isLoadMore${that.selected}`] = true;
              if (response.result == 1) {
                var myData = response.data;

                if (that.selected == 0) {
                  that.dataList.orderList = that.dataList.orderList.concat(
                    myData.data
                  ); // 数组拼接
                } else if (that.selected == 1) {
                  that.dataList.waitPayList = that.dataList.waitPayList.concat(
                    myData.data
                  );
                } else if (that.selected == 2) {
                  that.dataList.waitSendList = that.dataList.waitSendList.concat(
                    myData.data
                  );
                } else if (that.selected == 3) {
                  that.dataList.waitReceiveList = that.dataList.waitReceiveList.concat(
                    myData.data
                  );
                } else if (that.selected == 4) {
                  that.dataList.waitCompleteList = that.dataList.waitCompleteList.concat(
                    myData.data
                  );
                } else if (that.selected == 5) {
                  that.dataList.waitRefund = that.dataList.waitRefund.concat(
                    myData.data
                  );
                } else if (that.selected == 6) {
                  that.dataList.alreadyComplete = that.dataList.alreadyComplete.concat(
                    myData.data
                  );
                } else {
                  console.log("数组拼接报错");
                }
              } else {
                that[`page${that.selected}`] = that[`page${that.selected}`] - 1;
                that[`isLoadMore${that.selected}`] = false;
                return;
              }
            },
            function(response) {
              console.log(response.msg);
            }
          );
      }
    },
    // 获取酒店自定义字段
    getCustomizeHotelHead() {
      if (this.$route.params.orderType == "hotel") {
        console.log("这是酒店的订单");
        var isQuestHotel = localStorage.getItem("customizeHotelHead");
        if (!this.fun.isTextEmpty(isQuestHotel)) {
          var setHotelHead = JSON.parse(
            localStorage.getItem("customizeHotelHead")
          );
          this.fun.setWXTitle(setHotelHead.hotels + "订单");
        } else {
          $http
            .get(
              "plugin.hotel.frontend.hotel.get-hotel-info.get-custom-name",
              {},
              "加载中..."
            )
            .then(response => {
              if (response.result == 1) {
                this.fun.setWXTitle(response.data.hotels + "订单");
                localStorage.setItem(
                  "customizeHotelHead",
                  JSON.stringify(response.data)
                );
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
      return;
    },
    //获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (documentElement && documentElement.scrollTop) {
        scrollTop = documentElement.scrollTop;
      } else if (body) {
        scrollTop = body.scrollTop;
      }
      return scrollTop;
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(
          body.clientHeight,
          documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          body.clientHeight,
          documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },
    handleScroll() {
      //滚动事件触发
      if (
        this.getScrollTop() + this.getClientHeight() + 5 >
        this.getScrollHeight()
      ) {
        //此处发起请求
        if (this[`isLoadMore${this.selected}`]) {
          this.getMoreData();
        } else {
          console.log("没有更多数据");
        }
      }
    }
  },
  computed: {
    // 返回的顶部导航栏列表
    setNavList() {
      if (this.orderType == "cashier") {
        this.NavList = ["全部", "待付款", "已完成"];
      } else if (this.orderType == "hotel") {
        this.NavList = [
          "全部",
          "待付款",
          "待确认",
          "待入住",
          "已完成",
          "待退房"
        ];
      } else if (this.orderType == "onlineCar") {
        this.NavList = [
          "全部",
          "待支付",
          "待审核",
          "贷款中",
          "待提车",
          "待审牌",
          "已完成"
        ];
      } else if (this.orderType == "lease_toy") {
        // 租凭导航
        this.NavList = [
          "全部",
          "待支付",
          "待发货",
          "待收货",
          "待归还",
          "已完成"
        ];
      } else if (this.orderType == "DeliveryS") {
        this.NavList = [
          "全部",
          "待支付",
          "待接单",
          "待发货",
          "待收货",
          "已完成"
        ];
      } else if (this.orderType == "DeliveryReplenish") {
        this.NavList = ["全部", "待支付", "待发货", "待收货", "已完成"];
      } else if (this.orderType == "serviceReplenish") {
        this.NavList = ["全部", "待支付", "待发货", "待收货", "已完成"];
      } else if (this.orderType == "groups") {
        this.NavList = ["拼团中", "待付款", "待发货", "待收货", "已完成"];
      } else {
        this.NavList = ["全部", "待付款", "待发货", "待收货", "已完成"];
      }
      return this.NavList;
    }
  },
  created() {
    this.last_status = this.selected;
  },

  mounted() {},
  updated() {
    //  window.scrollTo(0, 0);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  activated() {
    this.getCustomizeHotelHead();
    window.addEventListener("scroll", this.handleScroll);

    console.log("ccccc::", this.$route.params);
    if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "cashier"
    ) {
      this.orderType = "cashier";
      this.detailUrl = "cashierOrderdetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "store"
    ) {
      this.orderType = "store";
      this.detailUrl = "storeOrderdetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "supplier"
    ) {
      this.orderType = "supplier";
      this.detailUrl = "supplierOrderdetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "hotel"
    ) {
      this.orderType = "hotel";
      this.detailUrl = "HotelOrderDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "hotel_center"
    ) {
      this.orderType = "hotel_center";
      this.detailUrl = "HotelCenterOrderDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "onlineCar"
    ) {
      this.orderType = "onlineCar";
      this.detailUrl = "netCarDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "DeliveryS"
    ) {
      this.orderType = "DeliveryS";
      this.detailUrl = "deliveryStationOrderDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "hotelcashier"
    ) {
      this.orderType = "hotelcashier";
      this.detailUrl = "HotelCashierOrderDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "DeliveryReplenish"
    ) {
      this.orderType = "DeliveryReplenish";
      this.detailUrl = "DeliveryReplenishDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "serviceReplenish"
    ) {
      this.orderType = "serviceReplenish";
      this.detailUrl = "serviceReplenishDetail";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "groups"
    ) {
      this.orderType = "groups";
      this.detailUrl = "groupDetail";
    } else {
      this.orderType = "shop";
      this.detailUrl = "orderdetail";
    }

    this.initData();
    window.scrollTo(0, 0);
    this.selected = this.$route.params.status; // this.$store.state.status
    this.getOrderList(this.selected);
  },
  components: {
    cTitle,
    cOrderList
  }
};
