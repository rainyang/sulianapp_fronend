import cTitle from "components/title";
import { error } from "util";
import { MessageBox } from "mint-ui";
export default {
  components: { cTitle },
  data() {
    return {
      val: 0
    };
  },

  activated() {
    //this.initData();
    this.getData();
    this.fun.setWXTitle(this.fun.initWithdrawal());
  },
  methods: {
    //获取数据
    getData() {
      $http
        .get("plugin.froze.Frontend.Controllers.page.index", {}, "加载中")
        .then(res => {
          if (res.result === 1) {
            this.val = res.data.thaw;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    submit() {
      $http
        .get(
          "plugin.froze.Frontend.Modules.Froze.Controllers.withdraw.index",
          { change_value: this.val },
          `${this.fun.initWithdrawal()}中`
        )
        .then(res => {
          if (res.result === 1) {
            MessageBox.alert(res.msg, "提示").then(() => {
              this.$router.push(this.fun.getUrl("withdrawal"));
            });
          } else {
            MessageBox.alert(res.msg, "提示");
            this.$router.go(-1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
