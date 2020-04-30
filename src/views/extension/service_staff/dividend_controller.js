import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      recordsList: [],
      memberData: {
        amount_total: "",
        amount_wait: ""
      },

      //more
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  activated() {
    this.getData();
    this.getInfo();
  },
  methods: {
    getData() {
      $http
        .get(
          "plugin.instalments-award.frontend.recomment.getInfo",
          {},
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.memberData = response.data.member;
            this.memberData.amount_total = response.data.amount_total;
            this.memberData.amount_wait = response.data.amount_wait;
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInfo() {
      $http
        .get(
          "plugin.instalments-award.frontend.recomment.getList",
          { page: 1 },
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.isLoadMore = true;
            this.total_page = response.data.recomments.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            this.recordsList = response.data.recomments.data;
            // this.recordsList = [
            //   {
            //     id: 1,
            //     uniacid: 3,
            //     uid: 1,
            //     condition_count: 6,
            //     finish_count: 5,
            //     status: 0,
            //     created_at: "2019-11-21 16:04:21",
            //     updated_at: "2019-11-21 16:04:21",
            //     deleted_at: null,
            //     status_name: "推广中"
            //   }
            // ];
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
            "plugin.instalments-award.frontend.recomment.getList",
            {
              page: that.page
            },
            "加载中"
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.recomments.data;
                that.recordsList = that.recordsList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
                return;
              }
            },
            function(response) {
              console.error(response.msg);
            }
          );
      }
    },
    gotoDetail(_id) {
      this.$router.push(this.fun.getUrl("dividendDetail", { id: _id }));
    }
  },
  components: { cTitle }
};
