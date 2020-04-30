import cTitle from 'components/title';
import {
  MessageBox
} from 'mint-ui';
// import { resolve } from 'dns';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      value: null,
      orderOn: false,
      status_name: "",
      //退款说明
      content: "",
      //退款原因
      remark: "",
      reason: "",
      refund_time: "",
      refund_type_name: "",
      alipay_batch_sn: "",
      operate_time: "",
      price: "",
      create_time: "",
      refund_sn: "",
      button_models: "",
      reject_reason: null,
      address: "",
      datas: "",
      is_plugin: "",
      supplier_id: "",
      store_id: ""
    };
  },
  methods: {
    //refund.detail
    //发起http请求
    getNetData() {
      var that = this;
      $http
        .get(
          "refund.detail",
          {
            refund_id: this.refund_id,
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "正在获取..."
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.button_models = response.data.button_models;
              that.price = response.data.price;
              that.content = response.data.content;
              that.status_name = response.data.status_name;
              that.reason = response.data.reason;
              that.refund_time = response.data.refund_time;
              that.refund_type_name = response.data.refund_type_name;
              that.alipay_batch_sn = response.data.alipay_batch_sn;
              that.create_time = response.data.create_time;
              that.remark = response.data.remark;
              that.refund_sn = response.data.refund_sn;
              that.reject_reason = response.data.reject_reason;
              that.is_plugin = response.data.is_plugin
                ? response.data.is_plugin
                : null;
              that.store_id = response.data.store_id
                ? response.data.store_id
                : null;
              that.supplier_id = response.data.supplier_id
                ? response.data.supplier_id
                : null;
              that.plugin_id = response.data.plugin_id
                ? response.data.plugin_id
                : null;
              that.getaddress();
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    cancleRefund() {
      //refund.cancel
      var that = this;
      $http
        .get(
          "refund.operation.cancel",
          {
            refund_id: this.refund_id,
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "提交申请..."
        )
        .then(
          function(response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              that.$router.go(-1);
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    opration(btn) {
      if (btn.value == 2) {
        this.$router.push(
          this.fun.getUrl("express", { refund_id: this.refund_id })
        );
      } else if (btn.value == 1) {
        this.$router.push(
          this.fun.getUrl("refund", { order_id: this.refund_id, type: 2 })
        );
      } else if (btn.value == 3) {
        //确认收货
        this.confirm();
      } else {
        //取消申请
        this.cancleRefund();
      }
    },
    //换货确认收货
    confirm() {
      var that = this;
      $http
        .get(
          "refund.operation.complete",
          {
            refund_id: this.refund_id,
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep()
          },
          "提交申请..."
        )
        .then(
          function(response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              that.$router.go(-1);
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    getaddress() {
      $http
        .get("order.refund.return-address", {
          refund_id: this.refund_id,
          plugins_id: this.is_plugin == 1 ? this.is_plugin : this.plugin_id,
          store_id: this.store_id,
          supplier_id: this.supplier_id
        })
        .then(res => {
          this.address = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.refund_id = this.$route.params.refund_id;
    this.getNetData();
    //setTimeout(()=>{this.getaddress()},1500)
  },
  components: { cTitle }
};
