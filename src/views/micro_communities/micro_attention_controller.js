import { Toast, Loadmore } from "mint-ui";
import { scrollMixin } from "../../utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      bannerindex: 1,
      info: {},
      mainCommentShow: false,
      maincomment: "",
      uName: null, //当前用户名称，用于发表评论时
      commentId: null,
      activeTid: null, //当前点击的帖子id
      isUnsubscribe: false, //取消关注弹窗
      UnsubscribeId: null, //要取消关注的用户id
      //more
      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0, //总页数

      isNOMore: false //没有更多文本显示
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      $http
        .get("plugin.micro-communities.api.trick.getFollowTrick", {})
        .then(response => {
          if (response.result == 1) {
            this.isLoadMore = true;
            this.total_page = response.data.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            this.uName = response.data.uName;
            this.info = response.data.data;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showUnsubscribe(_id) {
      this.UnsubscribeId = _id;
      this.isUnsubscribe = true;
    },
    UnsubscribeMethob() {
      $http
        .get("plugin.micro-communities.api.user.delFollow", {
          uid: this.UnsubscribeId
        })
        .then(response => {
          if (response.result == 1) {
            Toast("已取消关注");
            this.isUnsubscribe = false;
            this.getData();
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoMicrocommentdetails(_id) {
      this.$router.push(
        this.fun.getUrl("microCommentDetails", {
          stickId: _id
        })
      );
    },
    selectLike(_id, status, ind) {
      let that = this;
      if (status == 1) {
        $http
          .get("plugin.micro-communities.api.trick.cancelPraise", {
            tid: _id
          })
          .then(response => {
            if (response.result == 1) {
              that.info[ind].is_praise = 0;
              Toast("取消点赞");
            } else {
              Toast(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        $http
          .get("plugin.micro-communities.api.trick.givePraise", {
            tid: _id
          })
          .then(response => {
            if (response.result == 1) {
              that.info[ind].is_praise = 1;
              this.$set(that.info);
              Toast("点赞成功");
            } else {
              Toast(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    sidingsImg(index) {
      this.bannerindex = index + 1;
    },
    subMainCommentBtn(_id, _ind) {
      this.commentId = _id;
      this.maincomment = "";
      this.activeTid = _ind;
      this.mainCommentShow = true;
    },
    subMainBtn() {
      if (!this.maincomment) {
        Toast("请输入你的精彩评论");
        return;
      }
      this.mainCommentShow = false;
      this.getReplyComments();
    },
    getReplyComments() {
      let that = this;
      let dataJson = {
        tid: that.commentId,
        content: that.maincomment
      };
      $http
        .post("plugin.micro-communities.api.trick.comments", dataJson)
        .then(response => {
          if (response.result == 1) {
            that.info[this.activeTid].comment.unshift({
              content: that.maincomment,
              uname: that.uName
            });
            this.$set(that.info);
            Toast(response.msg);
          } else {
            Toast(response.msg);
          }
        });
    },
    gotoHome(_ids) {
      this.$router.push(this.fun.getUrl("microhomepage", {}, { micuid: _ids }));
    },
    //获取更多数据，加载更多
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      if (that.page >= that.total_page) {
        this.isNOMore = true;
        return;
      } else {
        that.page += 1;
        $http
          .get(
            "plugin.micro-communities.api.trick.getFollowTrick",
            { page: that.page },
            "加载中..."
          )
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.data;
              that.info = that.info.concat(nextPageData); //进行数组拼接
              that.signNumber = res.data.total;
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
      this.initPageData();
      this.getData();
      this.$refs.loadmore.onTopLoaded();
    },
    // 初始化数据
    initPageData() {
      this.info = [];
      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
      this.isNOMore = false;
    }
  },
  filters: {
    setLength: function(value) {
      if (!value) return "0";
      return value.length;
    },
    timeSlice: function(setdateTimeStamp) {
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let halfamonth = day * 15;
      let month = day * 30;

      let dateTimeStamp = new Date(setdateTimeStamp);
      let now = new Date().getTime();
      let diffValue = now - dateTimeStamp;
      if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        return "结束日期不能小于开始日期！";
      }
      let monthC = diffValue / month;
      let weekC = diffValue / (7 * day);
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      let result = null;
      if (monthC >= 1 && monthC <= 3) {
        result = setdateTimeStamp.substr(5, 11);
      } else if (weekC >= 1 && weekC <= 3) {
        result = setdateTimeStamp.substr(5, 11);
      } else if (dayC >= 1 && dayC <= 6) {
        result = setdateTimeStamp.substr(5, 11);
      } else if (hourC >= 1 && hourC <= 23) {
        result = parseInt(hourC) + "小时前";
      } else if (minC >= 1 && minC <= 59) {
        result = "今天" + parseInt(minC) + "分钟前";
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚";
      } else result = setdateTimeStamp.substr(5, 11);
      return result;
    }
  }
};
