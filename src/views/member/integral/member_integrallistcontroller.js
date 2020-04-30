import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
import {scrollMixin} from "utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      toi: this.fun.getKeyByI(),
      selected: '',
      all: [],
      //收入积分
      income: [],
      //消费积分
      out: [],
      recordsList:[],

      integral:window.localStorage.integral,

      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
    };
  },
  methods: {
    initData() {
      this.selected = "";
      this.isLoadMore = true;
      this.page = 1;
      this.total_page = 0;
      this.recordsList = [];
    },
    swichTabTItem() {
      this.getIntegralInfo(this.selected);
    },
    getIntegralInfo(type) {
      //finance.point-summary 
      var that = this;
      this.isLoadMore = true;
      this.page = 1;
      this.total_page = 0;
      this.recordsList = [];
      $http.get('finance.point-info ', { status: type}, '正在获取...').then(function (response) {

        if (response.result == 1) {
          console.log(response.data);
          that.page = 1;
          that.total_page = response.data.list.last_page;
          that.recordsList = response.data.list.data;
          // if (type == 1) {
          //   that.income = response.data.list;

          // } else if (type == -1) {
          //   that.out = response.data.list;
          // } else {
          //   that.all = response.data.list;
          // }

        }
      }, function (response) {
        // error callback
      });
    },
    
    //获取更多数据
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http.get('finance.point-info', {
          page: this.page,
          status: this.selected,
        }, '加载中').then(response => {
          this.isLoadMore = true;
          if (response.result === 1) {
            var myData = response.data.list.data;
            this.recordsList = this.recordsList.concat(myData); //数组拼接
          } else {
            this.page = this.page - 1;
            this.isLoadMore = false;
          }
        }, function (response) {
          // error callback
        });

      }
    },

  },
  activated() {
    this.initData();
    this.toi = this.fun.getKeyByI();
    this.getIntegralInfo();
    this.fun.setWXTitle(this.integral+'列表');
  },
  components: { cTitle }
}