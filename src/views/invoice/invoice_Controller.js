import cTitle from "components/title";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      dowm: "",
      list: "",
      invoice_status: false,
      show1: false,
      order_id: "",
      // invoice_status: "",
      invoice_type: "",
      invoice_title: "",
      order_number: "",
      rise_type: ""
    };
  },
  mounted() {
    this.getInvoiceDet();
    this.initDownload();
  },
  methods: {
    checkInvoice() {
      $http
        .get(
          "order.rise.get-invoice",
          {
            order_id: this.$route.params.order_id
          },
          "加载中.."
        )
        .then(res => {
          if (res.result === 1) {
            this.list = res.data.invoice;
            this.show1 = true;
            this.invoice_status = true;
          }
        });
    },
    initDownload() {
      $http
        .get(
          "order.rise.get-invoice",
          {
            order_id: this.$route.params.order_id
          },
          "加载中.."
        )
        .then(res => {
          if (res.result == 1) {
            this.dowm = res.data.invoice;
            console.log(res.data.invoice, "链接");
          }
        });
    },
    getInvoiceDet() {
      $http
        .get(
          "order.detail",
          {
            order_id: this.$route.params.order_id
          },
          "加载中..."
        )
        .then(res => {
          if (res.result == 1) {
            this.invoice_type = res.data.invoice_type ? "纸质发票" : "电子发票";
            this.rise_type = res.data.invoice_state ? "已开票" : "未开票";
            // this.invoice_title = res.data.call;
            this.order_number = res.data.order_sn;
            this.invoice_title = res.data.collect_name;
          }
        });
    },
    // 去掉下载发票按钮
    // exportData() {
    //   if (!this.dowm) {
    //     Toast("访问链接不存在");
    //     return false;
    //   }
    //   //注释掉 time:19-10-08 原因：莫名跳转到下面图片链接地址，不明需求
    //   // location.href = "https://saas.ytbaina.com/attachment/images/73/2019/05/oBX1dxXd1MXthBxxBXl5dHt11jhkK4.jpg";
    // }
  },
  components: {
    cTitle
  }
};
