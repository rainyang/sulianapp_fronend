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
    window.addEventListener('scroll', this.handleScroll);
  },
  deactivated() {
    this.activeName = '-1';
    window.removeEventListener('scroll', this.handleScroll);
  },
  // 选项卡默认位置
  created() {
  },
  methods: {
    initData() {
      this.activeName = '-1';
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.list = [];
      // 判断是从哪个页面过来
      this.type = this.$route.query.name;
      if (this.type === 'replenish') {
        // 补货商
        this.api = 'plugin.kingtimes.frontend.providerRebate.manage.manage';
        this.getData(-1);
      } else if (this.type === 'delivery') {
        // 配送站
        this.api = 'plugin.kingtimes.frontend.distributorRebate.manage.manage';
        this.getData(-1);
      } else {
        this.$router.push(this.fun.getUrl('home'));
      }
    },
    getRebate(tab) {
      // 赋值
      // let status = tab.name;
        //因组件修改，修改获取方法
        let status = this.activeName;
      this.list = [];
      documentElement.scrollTop = 0;
      this.getData(status);
    },
    //获取数据
    getData(status) {
      let data = {status: status};
      let that = this;
      that.isLoadMore = false;
      that.status = status;
      that.page = 1;
      $http.get(that.api, data, "加载中...").then(function (response) {
        if (response.result === 1) {
          that.isLoadMore = true;
          that.total_page = response.data.last_page;
          if (!that.total_page) {
            that.total_page = 0;
          }
          that.list = response.data.data;
          // console.log(response.data.data);
        } else {
          Toast(response.msg);
          that.$router.push(that.fun.getUrl('ReplenishmentApply', {}));
        }
      }, function (response) {
        console.log(response)
      });
    },
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http.post(that.api, {
          page: that.page,
          status: that.status
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