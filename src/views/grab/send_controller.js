import {Loadmore} from 'mint-ui';
import {Indicator, Toast} from 'mint-ui';
import {MessageBox} from 'mint-ui';
import cTitle from 'components/title';

export default {
  data() {
    return {
      show1: false,
      express_sn: '',
      express_code: '',
      express: '',
      express_companies: [],
      address: {},
      type: '',

      //防止按钮随安卓软键盘弹起
      isResize: false,
    }
  },

  activated() {
    this.initData();
    this.id = this.$route.params.id;
    this.type = this.$route.params.name;
    if (!this.id) {
      this.$router.push(this.fun.getUrl('ReplenishOrderlist', {}));
    }
    if (this.type === 'delivery') { // 配送站配送
      this.api = 'plugin.kingtimes.frontend.distributor.orderSend.index';
      this.sendapi = 'plugin.kingtimes.frontend.distributor.orderOperation.send';
      this.data = {order_id: this.id};
    } else if (this.type === 'replenish') { // 补货商补货
      this.api = 'plugin.kingtimes.frontend.provider.distributorOrderSend';
      this.sendapi = 'plugin.kingtimes.frontend.provider.distributorOrderOperation.send';
      this.data = {distributor_order_id: this.id};
    }
    this.getDelivery();
  },
  mounted() {
    let windowInnerHeight = window.innerHeight;
    const that = this;
    window.onresize = function () {
      let newHeight = window.innerHeight;

      if (newHeight < windowInnerHeight) {
        that.isResize = true;
      } else {
        that.isResize = false;
      }
    }
  },
  methods: {
    initData() {
      this.express_sn = '';
      this.express_code = '';
      this.express = '';
      this.address = {};
    },
    chooseDelivery(item) {
      this.express_code = item.value;
      this.express = item.name;
      this.show1 = false;
    },
    getDelivery() {
      var that = this;
      $http.get(that.api, that.data, "").then(
        function (response) {
          if (response.result === 1) {
            that.address = response.data.address;
            that.express_companies = response.data.express_companies;
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function (response) {
          // error callback
        }
      );
    },
    send() {
      var that = this;
      let json = {
        express_code: this.express_code,
        express_sn: this.express_sn,
      };
      if (this.type === 'delivery') {
        json.order_id = this.id;
      } else if (this.type === 'replenish') {
        json.distributor_order_id = this.id;
      }
      $http.get(that.sendapi, json, "").then(
        function (response) {
          if (response.result === 1) {
            MessageBox.alert(response.msg, "提示");
            that.$router.push(that.fun.getUrl('member', {}));
            that.express_sn = '';
            that.express_code = '';
            that.express = '';
            that.address = {};
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function (response) {
          // error callback
        }
      );
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("member", {}));
      } else {
        this.$router.go(-1);
      }
    }
  },
  components: {cTitle}
}