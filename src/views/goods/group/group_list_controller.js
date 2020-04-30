import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多

export default {
  mixins: [scrollMixin],
  data() {
    return {
      info: {},
      shareInfo: {},
      //more
      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0 //总页数
    };
  },
  activated() {
    this.init();
    this.getData();
  },
  methods: {
    init() {
      this.info = {};
      this.shareInfo = {};
      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
    },
    getData() {
      $http
        .get(
          "plugin.fight-groups.frontend.controllers.fight-groups.index",
          {},
          "加载中"
        )
        .then(
          response => {
            if (response.result === 1) {
              this.isLoadMore = true;
              this.total_page = response.data.last_page;
              if (!this.total_page) {
                this.total_page = 0;
              }
              this.info = response.data.data;
              this.shareInfo = response.data.set;
            } else {
              console.log(response.msg);
            }
          },
          response => {}
        )
        .then(v => {
          setTimeout(() => {
            this.share();
          }, 1000);
        });
    },
    //组装分享设置
    share() {
      let shareData = JSON.parse(localStorage.getItem("shareData"));
      let that = this;

      let _link = document.location.href;
      let _titles = this.fun.isTextEmpty(that.shareInfo.share_title)
        ? shareData.title
        : that.shareInfo.share_title;
      let _links = this.fun.isTextEmpty(that.shareInfo.share_url)
        ? _link
        : that.shareInfo.share_url;
      let _imgUrls = this.fun.isTextEmpty(that.shareInfo.share_thumb)
        ? shareData.icon
        : that.shareInfo.share_thumb;
      let _descs = this.fun.isTextEmpty(that.shareInfo.share_desc)
        ? shareData.desc
        : that.shareInfo.share_desc;

      // console.log(_titles, _links, _imgUrls, _descs);

      wx.ready(function() {
        wx.showOptionMenu();

        wx.onMenuShareTimeline({
          title: _titles, // 分享标题
          link: _links, // 分享链接
          imgUrl: _imgUrls, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _titles, // 分享标题
          desc: _descs, // 分享描述
          link: _links, // 分享链接
          imgUrl: _imgUrls, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    },
    goGroup(id) {
      this.$router.push(this.fun.getUrl("GroupGoods", { id: id }));
    },
    goHome() {
      this.$router.push(this.fun.getUrl("home", {}));
    },
    //获取更多数据，加载更多
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      if (that.page >= that.total_page) {
        return;
      } else {
        that.page += 1;
        $http
          .get(
            "plugin.fight-groups.frontend.controllers.fight-groups.index",
            { page: that.page },
            "加载中"
          )
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.data;
              that.info = that.info.concat(nextPageData); //进行数组拼接
            } else {
              that.page = that.page - 1;
              that.isLoadMore = false;
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //下拉刷新
    loadTop() {
      //console.log('触发下拉');
      this.init();
      this.getData();
      this.$refs.loadmore.onTopLoaded();
    }
  },
  components: { cTitle }
};
