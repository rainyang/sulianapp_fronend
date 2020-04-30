import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

export default {
  data() {
    return {
      level_type: "",
      levelList: [],
      //客服
      cservice: "",
      //会员信息
      memberInfo: {},
      right: {},
      shopDesc: "",
      name: ""
    };
  },

  activated() {
    this.init();

    this.getLevelUpData();
  },

  mounted() {},
  methods: {
    replace(item) {
      if (item.indexOf("\n") >= 0) {
        return item.split("\n").join("<br>");
      } else {
        return item;
      }
    },
    //获取升级等级数据
    getLevelUpData() {
      $http
        .get("member.member-level.index")
        .then(response => {
          if (response.result === 1) {
            this.level_type = response.data.level_type;
            this.levelList = response.data.data;
            this.memberInfo = response.data.member_data;
            this.right = response.data.member_data.rights;
            this.cservice = this.fun.isTextEmpty(
              response.data.shop_set.cservice
            )
              ? "javascript:;"
              : response.data.shop_set.cservice;

            this.shopDesc = response.data.shop_description;

            this.name = response.data.shop_set.name;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    isNotNull(data) {
      return !this.fun.isTextEmpty(data);
    },

    // gotoDetail(){
    //   this.$router.push(this.fun.getUrl("MemberGradeListDetail"));
    // },

    // gotoRefundsMigration() {
    //   this.$router.push(this.fun.getUrl("MemberRefundsMigration"));
    // },

    gotoRightGood(id) {
      this.$router.push(this.fun.getUrl("RightGood", { level_id: id }));
    },

    init() {
      this.levelList = [];
      this.cservice = "";
      this.memberInfo = {};
      this.right = {};
      this.shopDesc = "";
      this.name = "";
    },

    buy(val) {
      this.$router.push(this.fun.getUrl("goods", { id: val }));
    }
  },
  components: { cTitle }
};
