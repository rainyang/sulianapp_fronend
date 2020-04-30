import {Loadmore} from 'mint-ui';
import {Indicator, Toast} from 'mint-ui';
import {MessageBox} from 'mint-ui';
import cTitle from 'components/title';


export default {
  data() {
    return {
      text: '',
      order_info: {},
      address: {},
      distributor: {},
      order_list: [],
    }
  },

  activated() {
    this.init();
    this.getData();
  },
  deactivated() {
  },
  mounted() {

  },
  methods: {
    //点击按钮的操作
    operation(btn, order) {
      // btn = {name: "关闭订单", value: 1, api: "plugin.kingtimes.frontend.provider.distributorOrderOperation.send"};
      if (btn.value === 8) {
        this.checklogistics(order, btn);
      } else if (btn.value === 2) {
        this.confirmOrder(order, btn);
      } else if (btn.value === -1) {
        this.cancleOrder(order, btn);
      } else if (btn.value === 1) {
        this.send(order, btn);
      }
    },
    //取消订单
    cancleOrder(item, btn) {
      const that = this;
      MessageBox({
        title: "提示",
        message: "确定取消此订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          this.sentRequest(btn.api, that.data, false);
        }
      });
    },
    sentRequest(action, params, isIndicator) {
      var that = this;
      $http.get(action, params, "").then(
        function (response) {
          console.log('显示', response);
          if (response.result === 1) {
            MessageBox.alert(response.msg, "提示");
            if (window.history.length <= 1) {
              that.$router.push(that.fun.getUrl("home", {}));
            } else {
              that.$router.go(-1);
            }
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function (response) {
          // error callback
        }
      );
    },

    // 查看物流
    checklogistics(item, btn) {
      this.$router.push(this.fun.getUrl("logistics", {
        order: item,
        fromGrab: 1,
        api: btn.api
      }));
    },

    // 确认发货
    send(order, btn) {
      this.$router.push(this.fun.getUrl('Send', {id: order.id, name: 'replenish'}));
    },

    //确认收货
    confirmOrder(item, btn) {
      const that = this;
      MessageBox({
        title: "提示",
        message: "您确定收到货物?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //this.$emit('ConfrimOrderNotification');
          //调用接口通知服务器收到货物请求
          var that = this;
          $http.get(btn.api, that.data, "操作中...").then(
            function (response) {
              if (response.result === 1) {
                that.getData();
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function (response) {
              // error callback
            }
          );
        } else {
        }
      });
    },
    init() {
      this.order_info = {};
      this.address = {};
      this.distributor = {};
      this.order_list = [];
      this.orderID = this.$route.query.id;

      if (!this.orderID) {
        this.$router.push(this.fun.getUrl('member', {}));
      }

      if (this.$route.query.name === 'distribution') {
        this.text = '铺货单详情';
        this.data = {provider_order_id: this.orderID};
        this.api = 'plugin.kingtimes.frontend.providerOrder.detail';
      } else if (this.$route.query.name === 'replenish') {
        this.text = '补货单详情';
        this.data = {distributor_order_id: this.orderID};
        this.api = 'plugin.kingtimes.frontend.provider.distributorOrderDetail';
      } else {
        this.text = '订单详情';
      }

    },
    getData() {
      const that = this;
      $http.get(that.api, that.data, "加载中...").then(function (response) {
        if (response.result === 1) {
          that.order_info = response.data;
          that.order_list = that.order_info.order_goods;
          that.address = that.order_info.address;
          that.distributor = that.order_info.distributor;
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response)
      });
    }
  },
  components: {cTitle}
}