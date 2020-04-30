import cTitle from "components/title";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      sbc_order_id: 0,
      singleDetail: [],
      orderList: []
    };
  },
  activated() {
    if ((this.sbc_order_id = this.$route.query.sbc_order_id)) {
      this.sbc_order_id = this.$route.query.sbc_order_id;
      this.getsingleData();
    } else {
      this.getData();
    }
  },
  methods: {
    getsingleData() {
      $http
        .get(
          "plugin.staging-buy-car.frontend.staging-buy-car.loan-detail",
          { sbc_order_id: this.sbc_order_id },
          "提交中"
        )
        .then(
          response => {
            if (response.result === 1) {
              this.singleDetail = response.data;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            console.log(response);
          }
        )
        .catch(err => {
          console.error(err);
        });
    },
    showMore(obj) {
      if (obj.show == 2) {
        obj.show = 1;
        return;
      }
      this.$set(obj, "show", 2);
    },
    getData() {
      $http
        .get(
          "plugin.staging-buy-car.frontend.staging-buy-car.loan-order",
          { order_id: this.order_id },
          "提交中"
        )
        .then(
          response => {
            if (response.result === 1) {
              this.orderList = response.data;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            console.log(response);
          }
        )
        .catch(err => {
          console.error(err);
        });
    }
  },
  components: { cTitle }
};
