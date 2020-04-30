import cTitle from "components/title";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      rewardDetail: {},
      name: "",
      type: ""
    };
  },
  activated() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.name;
    this.rewardDetail = {};
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      $http
        .get(
          "plugin.ozy.frontend.index.getDetail",
          { rid: this.id }, 
          "加载中..."
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.rewardDetail = response.data;
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    }
  },
  components: { cTitle }
};
