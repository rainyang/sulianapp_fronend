import {
  mapState,
  mapMutations
} from "vuex";
import cTitle from "components/title";
import {
  Loadmore
} from "mint-ui";
import {
  Lazyload,
  Button
} from "mint-ui";
import {
  MessageBox
} from "mint-ui";

export default {
  data() {
    return {
      member:{},
      avatar_image:'',
      username:'',

    };
  },

  mounted() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },

    getData() {
      var that = this;
      $http
        .get("plugin.staging-buy-car.frontend.index.home", {}, "").then(
          function (response) {
            if (response.result === 1) {
              that.avatar_image = response.data.avatar_image;
              that.username = response.data.username;
              that.member = response.data.ser_per;
            } else {
              if (response.data.url) {
                window.location.href = response.data.url;
                return;
              }
              MessageBox.alert(response.msg);
            }
          },
          function (response) {
            // error callback
          }
        );
    },
    gotoStaff() {
      let that = this;
      if(that.member == '{}' || !that.member || that.member == null) {
        MessageBox.alert("您还不是服务人员，请联系管理员添加");
        return false;
      }
      that.$router.push(
        that.fun.getUrl('serviceStaff')
      )
    },
   
   
  },
  activated() {
    // this.toi = this.fun.getKeyByI();
    this.getData();
  },
  created() {
    // this.toi = this.fun.getKeyByI();
  },
  components: {
    cTitle,
    Loadmore
  }
};
