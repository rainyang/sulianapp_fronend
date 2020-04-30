import cTitle from "components/title";
import { Indicator, Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      money: "",
      info: ""
    };
  },

  activated() {
    this.getData();
  },

  methods: {
    //龙存管公共支付方法
    dragonPay(item) {
      let obj = item.form_data;
      var form = document.createElement("form");
      form.method = "post";
      form.setAttribute("action", item.action_url);
      let arr = ["INFO", "BODY", "SIGN", "CONTENTTYPE"];
      for (let i of arr) {
        let a = document.createElement("input");
        a.setAttribute("name", i);
        a.setAttribute("value", obj[i]);
        form.appendChild(a);
      }
      document.body.appendChild(form);
      form.style.display = "none";
      form.submit();
      return form;
    },
    getData() {
      $http
        .get("plugin.dragon-deposit.frontend.withdraw.apply", {}, " ")
        .then(response => {
          if (response.result === 1) {
            this.info = response.data.amount;
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //确认提现
    confirm() {
      var that = this;
      if (parseFloat(this.money) > parseFloat(this.info)) {
        MessageBox.alert("提现金额不可大于您的余额", "提示");
        return;
      }
      if (this.money == undefined || this.money <= 1) {
        MessageBox.alert("提现金额不可低于1元", "提示");
        return;
      }
      $http
        .post("plugin.dragon-deposit.frontend.withdraw.index", {
          amount: this.money
        })
        .then(
          function(response) {
            if (response.result === 1) {
              that.dragonPay(response.data);
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    }
  },
  components: { cTitle }
};
