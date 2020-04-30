import cTitle from "components/title";
import date from "../date/member_date";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      sign_status: "", //签到状态
      sign_total: "", //累计签到天数
      continue_days: "", //连续签到天数
      cumulative: "", //累计奖励
      sign_log: "", //签到天数
      sign_name: "", //签到名字
      sharedata: {},
      signnowBol:false
    };
  },
  methods: {
    signnow() {
      let that = this;
      if(this.signnowBol){
        return false
      }
      this.signnowBol = true;
      $http
        .get("plugin.sign.Frontend.Modules.Sign.Controllers.sign.sign", {}, " ")
        .then(res => {
          if (res.result === 1) {
            var reslink = res.data.success_url;
            MessageBox.alert(res.msg)
              .then(res => {
                this.getSign();
              })
              .then(() => {
                window.location.href = reslink;
              });
          } else {
            Toast(res.msg);
          }
          // that.signnowBol = false;
        });
    },
    getData() {
      let that = this;
      $http
        .get("plugin.sign.Frontend.Controllers.share.index", {}, " ")
        .then(function(response) {
          if (response.result === 1) {
            that.sharedata = response.data.share;
            that.initShare();
          }
        });
    },
    initShare() {
      let that = this;
      let _url = document.location.href;
      $http.post("member.member.wxJsSdkConfig", { url: _url }).then(
        function(response) {
          if (response.result === 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    share(data) {
      let that = this;
      wx.config(data.config);
      let datas = data;
      wx.ready(function() {
        let _title = that.sharedata.share_title
          ? that.sharedata.share_title
          : datas.shop.name;
        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);
        let _imgUrl = that.sharedata.share_icon
          ? that.sharedata.share_icon
          : datas.shop.logo;
        let _desc = that.sharedata.share_desc
          ? that.sharedata.share_desc
          : datas.shop.copyright;
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

        // if(that.fun.getWechatVersion()){
        //   wx.updateTimelineShareData({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       //Toast("分享成功");
        //     },
        //     // cancel: function () {
        //     //   Toast("取消分享");
        //     // }
        //   });
        //   wx.updateAppMessageShareData({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     //type: 'link', // 分享类型,music、video或link，不填默认为link
        //     //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });
        // }else{
        //   wx.onMenuShareTimeline({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });
        //   wx.onMenuShareAppMessage({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     type: 'link', // 分享类型,music、video或link，不填默认为link
        //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });
        // }
      });
    },
    getSign() {
      $http
        .get(
          "plugin.sign.Frontend.Modules.Sign.Controllers.sign-log.index",
          {},
          "loading"
        )
        .then(res => {
          this.sign_status = res.data.sign_status;
          this.sign_total = res.data.sign_total;
          this.continue_days = res.data.continue_days;
          this.cumulative =
            window.localStorage.integral + res.data.cumulative.substr(2);
          this.sign_log = res.data.sign_log;
          this.sign_name = res.data.sign_name;
        });
    }
  },
  created() {
    this.getSign();
    this.getData();
    this.fun.setWXTitle(this.sign_name);
  },
  components: { cTitle, date }
};
