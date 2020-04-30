import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";

export default {
  data() {
    return {
      name: "",
      img: "",
      mid: "",
      title: "",
      parent_id: "",
      is_bind_invite: 0
    };
  },
  mounted() {
    this.getUserinfo();
    this.showName();
  },
  activated() {},
  methods: {
    affirm() {
      sessionStorage.setItem("isset", 1);
      if (this.$route.query.fromGood == 1) {
        //商品下单判断是否需要邀请码
        $http.get("member.member.confirmGoods", {}).then(
          response => {
            if (response.result === 1) {
              this.$router.go(-1);
            } else {
              MessageBox.alert(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      } else {
        $http.get("member.member.update-member-invite",{parent_id: this.parent_id}).then(res => {
          if (res.result === 1) {
            this.$store.commit("setInviter", 1);
            //商城登录输入邀请码
            this.$router.push(this.fun.getUrl("editmobile"));
          } else {
            Toast({
              message: res.msg,
              duration: 1500
            });
          }
        });
      }
    },
    error(event) {
      sessionStorage.setItem("isset", 1);
      if (this.$route.query.fromGood == 1) {
        let subStr = new RegExp("inviter");
        let result = window.location.href.replace(subStr, "input_visit");
        event.preventDefault();
        location.replace(result);
      } else {
        this.$router.push(this.fun.getUrl("InputVisit"));
      }
    },
    showName() {
      $http.get("member.member.getShopSet").then(res => {
        if (res.result === 1) {
          this.title = res.data;
        } else {
          Toast({
            message: res.msg,
            duration: 1500
          });
        }
      });
    },
    getUserinfo() {
      this.mid = this.$route.query.mid;
      $http
        .get("member.member.getUserInfo", { mid: this.mid }, "加载中...")
        .then(res => {
          if (res.result === 1) {
            this.parent_id = res.data.yz_member.parent_id;
            this.name = res.data.referral.nickname;
            this.img = res.data.referral.avatar;
            this.is_bind_invite = res.data.is_bind_invite
          }
        });
    }
  },
  components: {
    cTitle
  }
};
