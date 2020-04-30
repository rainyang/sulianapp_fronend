import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多

export default {
  mixins: [scrollMixin],
  data() {
    return {
      info: [],
      active: "a",
      //more
      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0 //总页数
    };
  },
  activated() {
    this.init();
    this.getData(0);
  },
  methods: {
    init() {
      this.info = {};
      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
    },
    getData() {
      let that = this;
      let json = {};
      this.info = [];
      if (this.active == "a") {
        json.team_status = 1; //正在拼团
      } else if (this.active == "b") {
        json.team_status = 2; //拼团成功
      } else if (this.active == "c") {
        json.team_status = 3; //拼团失败
      }
      $http
        .get(
          "plugin.fight-groups.frontend.controllers.fight-groups.get-member-join-teams",
          json,
          ""
        )
        .then(
          response => {
            if (response.result === 1) {
              that.isLoadMore = true;
              that.total_page = response.data.last_page;
              if (!that.total_page) {
                that.total_page = 0;
              }
              that.info = response.data.data;
              if (that.fun.isTextEmpty(response.data.data)) {
                Toast({
                  message: "暂无数据！",
                  duration: 800
                });
              }
            } else {
              Toast(response.msg);
            }
          },
          response => {}
        );
    },
    gotoOrder(order_id) {
      this.$router.push(
        this.fun.getUrl("groupDetail", {
          order_id: order_id,
          orderType: "groups"
        })
      );
    },
    gotoGroup(id) {
      this.$router.push(
        this.fun.getUrl("GroupDetail", {
          id: id
        })
      );
    },
    //获取更多数据，加载更多
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      let json = {};
      let url =
        "plugin.fight-groups.frontend.controllers.fight-groups.get-member-join-teams";

      if (that.active == "a") {
        json.team_status = 1; //正在拼团
      } else if (that.active == "b") {
        json.team_status = 2; //拼团成功
      } else if (that.active == "c") {
        json.team_status = 3; //拼团失败
      }

      if (that.page >= that.total_page) {
        return;
      } else {
        that.page += 1;
        json.page = that.page;

        $http
          .get(url, json, "加载中")
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
      //console.log("触发下拉", this.active);
      this.init();
      this.getData(this.active);
      this.$refs.loadmore.onTopLoaded();
    }
  },
  components: { cTitle },
  filters: {
    startTimes(t) {
      // let unixTimestamp = new Date(t * 1000);
      // return unixTimestamp.toLocaleString();
      let date = new Date(t * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
