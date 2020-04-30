import cTitle from "components/title";
import { Indicator, Toast } from "mint-ui";
import { scrollMixin } from "../../../../utils/mixin";
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      activeName: "first",
      first_content: [],
      second_content: [],

      alreadyReturn: 0.0,
      each_return_rate: 0,
      order_return_rate: 0,
      returnAmountTotal: 0.0,
      notReturn: 0.0,
      isLoadMore: true, //判断是否能够加载更多
      last_page: 0, //总页数
      isShowNoTest: false //无数据时的判断
    };
  },

  mounted() {},

  activated() {
    this.initData(); //初始化参数
    this.getData(); //初始化数据
    //this.setDataByTabIndex();
  },

  methods: {
    //初始化参数
    initData() {
      currentTabIndex = "0";
      is_first_content = false;
      is_second_content = false;

      this.activeName = "first";

      this.first_content = [];
      this.second_content = [];

      this.alreadyReturn = 0.0;
      this.each_return_rate = 0;
      this.order_return_rate = 0;
      this.returnAmountTotal = 0.0;
      this.notReturn = 0.0;
      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
    },

    //初始化数据
    getData() {
      let that = this;
      $http
        .get("plugin.consume-return.frontend.list.index", { page: 1 }, "")
        .then(
          function(response) {
            console.log("AAAAA:", response);
            if (response.result == 1) {
              that.isLoadMore = true;
              that.total_page = response.data.list.last_page;
              if (!that.total_page) {
                that.total_page = 0;
              }
              that.alreadyReturn = response.data.finish;
              that.returnAmountTotal = response.data.total;
              that.notReturn = response.data.surplus;
              that.first_content = response.data.list.data;
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
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
            "plugin.consume-return.frontend.list.index",
            { page: that.page },
            "加载中..."
          )
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.list.data;
              that.first_content = that.first_content.concat(nextPageData); //进行数组拼接
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

    //消费返现队列详情
    toReturnInfo(id) {
      this.$router.push(
        this.fun.getUrl("consume_return_list_info", { id: id })
      );
    },

    //获取返现
    getReturnListInfo() {
      let that = this;
      $http
        .get(
          "plugin.single-return.api.single-return.get-single-return-log",
          {},
          ""
        )
        .then(
          function(response) {
            if (response.result == 1) {
              that.second_content = response.data;
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    },

    //设置选择后的数据
    setDataByTabIndex() {
      if (currentTabIndex == "0" && !is_first_content) {
        is_first_content = true;
        this.getReturnList(); //获取返现队列
      } else if (currentTabIndex == "1" && !is_second_content) {
        is_second_content = true;
        this.getReturnListInfo(); //获取返现详情
      }
    },

    //tab 点击
    handleClick(tab, event) {
      //点击同tab 不刷新界面
      // if (currentTabIndex == tab.index) {
      //     return;
      // } else {
      //     currentTabIndex = tab.index;
      // }
      //因为修改组建改方法
      if (currentTabIndex == tab) {
        return;
      } else {
        currentTabIndex = tab;
      }
      //this.setDataByTabIndex();
    }
  },
  components: { cTitle }
};
