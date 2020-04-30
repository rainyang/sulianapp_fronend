import cTitle from "components/title";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      order_id: 0,
      progressData: {},
      isTime: 0,
      loan_info: [],
      insurance_info: [],
      shang_pai_info: [],
      jiao_che_info: [],
      isVoucher: false,
      Voucherinfo: {},
      show: false,
      imgIndex: 1
    };
  },
  activated() {
    this.order_id = this.$route.params.id;
    this.loan_info = [];
    this.insurance_info = [];
    this.shang_pai_info = [];
    this.jiao_che_info = [];
    this.Voucherinfo = {};
    this.show = false;
    this.isVoucher = false;
    this.getData();
  },
  methods: {
    showimg(ind) {
      this.imgIndex = ind;
      this.show = true;
    },
    showVoucher(data, tag) {
      this.isVoucher = true;
      this.Voucherinfo = data;
      switch (tag) {
        case 2:
          this.Voucherinfo.text = "买保险";
          break;
        case 3:
          this.Voucherinfo.text = "放款";
          break;
        case 5:
          this.Voucherinfo.text = "上牌";
          break;
        case 6:
          this.Voucherinfo.text = "交车";
          break;
        default:
          this.Voucherinfo.text = "";
      }
    },
    getData() {
      $http
        .get(
          "plugin.staging-buy-car.frontend.order-operation.schedule",
          { order_id: this.order_id },
          "提交中"
        )
        .then(
          response => {
            if (response.result === 1) {
              this.progressData = response.data;
              if (this.progressData.pay_at) {
                this.isTime = 1;
              }
              if (this.progressData.loan_at) {
                this.isTime = 2;
              }
              if (this.progressData.insurance_at) {
                this.isTime = 3;
              }
              if (this.progressData.take_car_at) {
                this.isTime = 4;
              }
              if (this.progressData.delivery_at) {
                this.isTime = 5;
              }
              if (this.progressData.complete_at) {
                this.isTime = 6;
              }

              console.log(this.isTime, " this.isTime");
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
    gotoPage() {
      this.$router.push(
        this.fun.getUrl(
          "InstallmentRecord",
          {},
          { sbc_order_id: this.progressData.sbc_order_id }
        )
      );
    }
  },
  components: { cTitle }
};
