import cTitle from "components/title";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      show: false,
      redData: {},
      red_packet: "",
      shareData: {}
    };
  },
  activated() {
    this.getData();
    this.getShare();
  },
  methods: {
    goback(){
        if (window.history.length <= 1) {
          this.$router.push(this.fun.getUrl("home", {}));
        } else if (this.url) {
          // this.$router.push(this.fun.getUrl(this.url));
        } else {
          this.$router.go(-1);
        }
    },
    getShare() {
      $http
        .get(
          "plugin.red-packet.api.red-packet-logs.share",
          {},
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.shareData = response.data;
            this.initShare();
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initShare() {
      let json = {
        url: this.fun.isIosOrAndroid() === "android"
          ? window.location.href
          : window.initUrl
      };
      $http
        .post("member.member.wxJsSdkConfig", json)
        .then(response => {
          if (response.result === 1) {
            if (response.data.config) {
              this.share(response.data);
            }
          }
        })
        .catch(error => {
        });
    },

    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = that.fun.isTextEmpty(that.shareData.share_title)
          ? data.share.title
          : that.shareData.share_title;

        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        let _imgUrl = that.fun.isTextEmpty(that.shareData.share_pictures)
          ? data.share.icon
          : that.shareData.share_pictures;
        let _desc = that.fun.isTextEmpty(that.shareData.share_content)
          ? data.share.desc
          : that.shareData.share_content;

        wx.showOptionMenu();

        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    },
    getData() {
      $http
        .get(
          "plugin.red-packet.api.red-packet-logs.index",
          {},
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.redData = response.data;
            this.amount = response.data.amount;
            this.receive_log = response.data.receive_log;
            this.bjcolor = response.data.color;
            this.receive_color = response.data.receive_color;
            this.amount_color = response.data.amount_color;
            this.out_color = response.data.out_color;
            this.red_packet_color = response.data.red_packet_color;
            this.fun.setWXTitle(this.redData.red_packet_title);

            
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toPage(str) {
      this.$router.push(this.fun.getUrl(str));
    },
    sureGet() {
      let usid = localStorage.getItem('uid')
      $http
        .get(
          "plugin.red-packet.api.red-packet-logs.memberAmount",
          { red_packet_id: this.redData.amount.id ,uid:usid},
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.red_packet = response.data.toFixed(2);
            this.show = true;
            this.getData()
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toGood(id) {
      this.$router.push(
        this.fun.getUrl("goods", {
          id: id
        })
      );
    }
  },
  components: { cTitle }
};
