import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "utils/mixin";
const documentElement = document.documentElement;
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      type: "",
      rewardsData: {},
      recordsList: [],
      WXtitle: "",
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  created() {},
  activated() {
    this.type = this.$route.query.name;
    this.WXtitle = this.$route.query.reward_name;
    if (this.$route.params.fromHome === 1) {
      //保持原来状态
      this.initData();
      this.getData();
    }
  },
  methods: {
    loadTop() {
      this.initData();
      this.getData();
      this.$refs.loadmore.onTopLoaded();
    },
    toDetail(item) {
      this.$router.push(
        this.fun.getUrl("newAwardDetail", {}, { id: item.id, name: this.type })
      );
    },
    initData() {
      this.rewardsData = {};
      this.recordsList = [];
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.fun.setWXTitle(this.WXtitle);
    },
    //获取数据
    getData() {
      this.isLoadMore = false;
      this.page = 1;
      $http
        .get(
          "plugin.ozy.frontend.index.getData",
          { status: this.type, page: this.page },
          "加载中"
        )
        .then(
          response => {
            if (response.result === 1) {
              this.isLoadMore = true;
              this.total_page = response.data.record.last_page;
              if (!this.total_page) {
                this.total_page = 0;
              }
              this.rewardsData = response.data;
              this.recordsList = response.data.record.data;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            console.log(response);
          }
        )
        .catch(err => {
          console.error(err);
        });
    },
    //获取更多数据
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.ozy.frontend.index.getData",
            {
              status: this.type,
              page: this.page
            },
            "加载中"
          )
          .then(
            response => {
              this.isLoadMore = true;
              if (response.result === 1) {
                let myData = response.data.record.data;
                this.recordsList = this.recordsList.concat(myData); //数组拼接
              } else {
                this.page = this.page - 1;
                this.isLoadMore = false;
              }
            },
            response => {
              // error callback
            }
          )
          .catch(err => {
            console.error(err);
          });
      }
    }
  },
  components: { cTitle }
};
