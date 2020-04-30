import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";

export default {
  data() {
    return {
      invite_code: "",
      name: "",
      img: "",
      title: ""
    };
  },
  mounted() {
    this.showName();
  },
  methods: {
    submit() {
      if (this.fun.isTextEmpty(this.invite_code)) {
        Toast({
          message: "请输入邀请码",
          duration: 1500
        });
        return;
      }
      if (this.fun.getKey("fromGood")) {
        $http
          .get("member.member.refuseGoods", { invite_code: this.invite_code })
          .then(
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
        $http
          .get(
            "member.member.member-invite-validate",
            { invite_code: this.invite_code },
            "加载中"
          )
          .then(
            res => {
              if (res.result === 1) {
                this.name = res.data.has_one_member.nickname;
                this.img = res.data.has_one_member.avatar_image;
                sessionStorage.setItem("isset", 1);

                this.$store.commit("setInviter", 1);
                this.$router.push(this.fun.getUrl("editmobile"));
              } else {
                Toast({
                  message: res.msg,
                  duration: 1500
                });
              }
            },
            res => {
              MessageBox.alert(res.msg);
            }
          );
      }
    },
    showName() {
      $http.get("member.member.getShopSet").then(res => {
        if (res.result === 1) {
          this.title = res.data;
        } else {
          Toast({
            message: res.msg,
            position: "bottom",
            duration: 1500
          });
        }
      });
    }
  },
  components: {
    cTitle
  }
};
