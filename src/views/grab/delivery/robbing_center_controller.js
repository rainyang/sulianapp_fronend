import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

const documentElement = document.documentElement;
const body = document.body;

export default {
  data() {
    return {
      robbingList: [],
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
      income_name_text: "",
    };
  },

  activated() {
    this.initData();
    this.getData();
    this.customizeIncome();
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {},
  methods: {
    operation(btn, id) {
      var that = this;
      if (btn.value === "1") {
        $http
          .get(btn.api, {
            order_id: id
          })
          .then(
            function(response) {
              if (response.result === 1) {
                MessageBox.alert(response.msg, "提示");
                // that.$router.push(this.fun.getUrl("DeliveryTerminalApply", {id: id, name: 'robbing'}));
                that.$router.go(-1);
                // that.getData();
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    toRobbingDetail(id) {
      this.$router.push(
        this.fun.getUrl("DeliveryOrderDetail", {}, { id: id, name: "robbing" })
      );
    },
    initData() {
      this.robbingList = [];
      this.isLoadMore = true;
      this.page = 1;
      this.total_page = 0;
    },
    //获取更多数据
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.kingtimes.frontend.distributor.competeOrderList",
            {
              page: that.page,
              pagesize: 10
            },
            "加载中..."
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.data;
                that.list = that.list.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
                return;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    //获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (documentElement && documentElement.scrollTop) {
        scrollTop = documentElement.scrollTop;
      } else if (body) {
        scrollTop = body.scrollTop;
      }
      return scrollTop;
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(
          body.clientHeight,
          documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          body.clientHeight,
          documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },

    handleScroll() {
      //滚动事件触发
      if (
        this.getScrollTop() + this.getClientHeight() + 5 >
        this.getScrollHeight()
      ) {
        // console.log('下拉刷新了')
        //此处发起请求
        if (this.isLoadMore) {
          this.getMoreData();
        } else {
          console.log("没有更多数据");
        }
      }
    },
    getData() {
      var that = this;
      $http
        .get("plugin.kingtimes.frontend.distributor.competeOrderList", {
          page: 1
        })
        .then(
          function(response) {
            if (response.result === 1) {
              that.robbingList = response.data;
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    //自定义提现收入语言
    customizeIncome(){
      let mailLanguage = this.fun.initMailLanguage()
      //自定义收入字段
      this.income_name_text = mailLanguage.income.income_name;
    }
  },
  components: { cTitle }
};
