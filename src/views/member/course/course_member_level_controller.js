import { Field, Button } from "mint-ui";
import { MessageBox } from "mint-ui";
import { CheckBox, CheckBoxGroup } from "vue-ydui";
import cTitle from "components/title";

export default {
  data() {
    return {
      course_goods:{},
      level_data: [],
      level_type:'',
    };
  },

  mounted() {},

  methods: {
    //获取会员升级商品信息
    getMemberUpdate() {
      $http
        .get("plugin.video-demand.api.watch-level.condition", {
          goods_id: this.$route.params.goods
        })
        .then(response => {
          if (response.result == 1) {
            if (!this.fun.isTextEmpty(response.data)) {
              this.course_goods = response.data.course_goods;
              this.level_data = response.data.level_data;
              this.level_type = response.data.level_type;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goto(){
      this.$router.push(this.fun.getUrl("home"));
    },
    gotoBuy(id) {
      this.$router.push(this.fun.getUrl("goods", { id: id }));
    }
  },
  activated() {
    this.course_goods = {};
    this.level_data=[];
    this.level_type='';
    this.getMemberUpdate();
  },

  components: { cTitle, CheckBox }
};
