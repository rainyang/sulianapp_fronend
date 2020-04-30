import cTitle from "components/title";
import { Toast } from "mint-ui";
const URL_MEMBER = "plugin.ozy.frontend.index.getMember";
import { scrollMixin } from "../../utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      title: "",
      url: "",
      member_arr: [],
      total_num: 0,
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  activated() {
    this.initData();
    this.getData();
  },
  methods: {
    goBack() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("home", {}));
      } else {
        this.$router.go(-1);
      }
    },
    initData() {
      this.title = "";
      this.url = "";
      this.loading = false;
      this.allLoaded = false;
      this.goload = true;
      this.total_num = 0;
      this.page = 1;
      this.isLoadMore = true;
      this.total_page = 0;
      this.member_arr = [];
    },
    getData() {
      $http
        .get(
          URL_MEMBER,
          {
            page: this.page,
            team: this.$route.params.team,
            direct: this.$route.params.direct
          },
          "加载中..."
        )
        .then(res => {
          if (res.result == 1) {
            this.member_arr = res.data.res.data;
            this.total_page = res.data.res.last_page;
            this.title = res.data.level_name;
            this.total_num = res.data.res.total ? res.data.res.total : 0;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMoreData() {
      if (this.page == this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        this.loading = true;
        this.allLoaded = true;
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            URL_MEMBER,
            {
              page: this.page,
              team: this.$route.params.team,
              direct: this.$route.params.direct
            },
            "加载中..."
          )
          .then(res => {
            if (res.result == 1) {
              //var myData = response.data.data;
              this.loading = false;
              this.allLoaded = false;
              //this.histroyInfo = that.histroyInfo.concat(myData);//数组拼接
              this.member_arr = this.member_arr.concat(res.data.res.data);
            } else {
              this.page = this.page - 1;
              this.loading = true;
              this.allLoaded = true;
              this.isLoadMore = false;
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    loadTop() {
      this.initData();
      this.getData();
      this.$refs.team_loadmore.onTopLoaded();
    }
  },
  components: { cTitle }
};
