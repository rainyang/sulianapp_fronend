import {Loadmore} from 'mint-ui';
import {Indicator, Toast} from 'mint-ui';
import {MessageBox} from 'mint-ui';
import cTitle from 'components/title';

const documentElement = document.documentElement;
const body = document.body;

export default {
  data() {
    return {
      list: [],
      status: '',
      activeName: '-1',
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
    }
  },
  activated() {
    this.initData();
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(function () {
      window.location = window.location;
    }, 20);
  },
  deactivated() {
    this.activeName = '-1';
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    toDetail(id) {
      this.$router.push(this.fun.getUrl('DeliveryOrderDetail', {}, {id: id, name: 'DeliveryOrder'}));
    },
    //点击按钮的操作
    operation(btn, order) {
      // btn = {name: "关闭订单", value: 10, api: "plugin.kingtimes.frontend.distributor.evaluation.subEvaluation"};
      if (btn.value === 8) {
        this.checklogistics(order, btn);
      } else if (btn.value === 2) {
        this.confirmOrder(order, btn);
      } else if (btn.value === -1) {
        this.cancleOrder(order, btn);
      } else if (btn.value === 10) {
        this.evaluate(order, btn);
      }
    },

    //取消订单
    cancleOrder(item, btn) {
      MessageBox({
        title: "提示",
        message: "确定取消此订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //删除当前选中的地址
          this.list.splice(this.list.indexOf(item), 1);
          this.sentRequest(btn.api, {
            distributor_order_id: item.id
          }, false);
        }
      });
    },
    sentRequest(action, params, isIndicator) {
      var that = this;
      $http.get(action, params, "").then(
        function (response) {
          console.log('显示', response);
          if (response.result === 1) {
            MessageBox.alert(response.msg, "提示");
            that.getData(that.status);
            // if (window.history.length <= 1) {
            //   that.$router.push(that.fun.getUrl("home", {}));
            // } else {
            //   // that.$router.go(-1);
            // }
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function (response) {
          // error callback
        }
      );
    },

    //查看物流
    checklogistics(item, btn) {
      this.$router.push(this.fun.getUrl("logistics", {
        order: item,
        fromGrab: 1,
        api: btn.api
      }));
    },


    // 评价
    evaluate(order, btn) {
      this.$router.push(this.fun.getUrl('DeliveryEvaluate', {order_id: order.id, api: btn.api, name: 'delivery'}));
    },

    //确认收货
    confirmOrder(item, btn) {
      const that = this;
      MessageBox({
        title: "提示",
        message: "您确定收到货物?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //this.$emit('ConfrimOrderNotification');
          //调用接口通知服务器收到货物请求
          var that = this;
          $http.get(btn.api, {
            distributor_order_id: item.id
          }, "操作中...").then(
            function (response) {
              if (response.result === 1) {
                that.getData(that.status);
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function (response) {
              // error callback
            }
          );
        } else {
        }
      });
    },

    initData() {
      this.activeName = '-1';
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.list = [];
    },
    getRebate(tab) {
      // 赋值
      // let status = tab.name;
        //因组件修改，修改获取方法
      let status = this.activeName;
      this.list = [];
      documentElement.scrollTop = 0;
      if (status > 0) {
        this.getData(status);
      } else {
        this.getData();
      }
    },
    checkStatus(status) {
      if (status === '1') {
        this.api = 'plugin.kingtimes.frontend.distributor.distributorOrderList.waitSend';
      } else if (status === '2') {
        this.api = 'plugin.kingtimes.frontend.distributor.distributorOrderList.waitReceive';
      } else if (status === '3') {
        this.api = 'plugin.kingtimes.frontend.distributor.distributorOrderList.completed';
      } else {
        this.api = 'plugin.kingtimes.frontend.distributor.distributorOrderList.index';
      }
    },
    //获取数据
    getData(status) {
      let data = {pagesize: 10};
      if (status > 0) {
        this.status = status;
      } else {
        this.status = null;
      }
      let that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      that.checkStatus(status);
      that.page = 1;
      $http.get(that.api, data, "加载中...").then(function (response) {
        if (response.result === 1) {
          that.isLoadMore = true;
          that.total_page = response.data.last_page;
          if (!that.total_page) {
            that.total_page = 0;
          }
          that.list = response.data.data;
        } else {
          Toast(response.msg);
          that.$router.push(that.fun.getUrl('member', {}));
        }
      }, function (response) {
        console.log(response)
      });
    },
    //获取更多数据
    getMoreData() {
      const that = this;
      that.isLoadMore = false;  // 防止多次请求分页数据
      that.checkStatus(this.status);
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http.get(that.api, {
          page: that.page,
          pagesize: 10
        }, '加载中...').then(function (response) {
          that.isLoadMore = true;
          if (response.result === 1) {
            var myData = response.data.data;
            that.list = that.list.concat(myData);//数组拼接

          } else {
            that.page = that.page - 1;
            that.isLoadMore = false;
            return;
          }
        }, function (response) {
          // error callback
        });

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
        clientHeight = Math.min(body.clientHeight, documentElement.clientHeight);
      } else {
        clientHeight = Math.max(body.clientHeight, documentElement.clientHeight);
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },

    handleScroll() {
      //滚动事件触发
      if ((this.getScrollTop() + this.getClientHeight() + 5) > this.getScrollHeight()) {
        // console.log('下拉刷新了')
        //此处发起请求
        if (this.isLoadMore) {
          this.getMoreData();
        } else {
          console.log('没有更多数据');
        }
      }
    },
  },
  components: {cTitle}
}