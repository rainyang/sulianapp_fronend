import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      recordsList: [],
      receive_logs: {},
      memberData: {},

      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      $http
        .get(
          "plugin.red-packet.api.logs.quotaLogs",
          { page: 1 },
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.receive_logs = response.data.receive_logs;
            this.memberData = response.data.member;
            this.isLoadMore = true;
            this.total_page = response.data.quotaLogs.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            this.recordsList = response.data.quotaLogs.data;
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
            "plugin.red-packet.api.logs.quotaLogs",
            {
              page: that.page
            },
            "加载中"
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.quotaLogs.data;
                that.recordsList = that.recordsList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
                return;
              }
            },
            function(response) {
              console.error(response.msg)
            }
          );
      }
    },
  },
  components: { cTitle }
};
