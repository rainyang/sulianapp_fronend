import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      active: 0,
      // 当前显示详情的会员ID
      amount_id: "",
      memberData: {},
      integralList: [],
      currentURL: "",
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  activated() {
    this.initData();
    this.getMemberDate();
    this.tabHandel(0);
  },
  methods: {
    initData() {
      this.active = 0;
      this.amount_id = "";
      this.integralList = [];
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
    },
    showMore(obj) {
      if (obj.show && this.amount_id === obj.amount_id) {
        obj.show = false;
        return;
      }
      this.amount_id = obj.amount_id;
      this.$set(obj, "show", true);
    },
    getMemberDate() {
      $http.get("plugin.global-dividend.api.global-dividend", {}, " ").then(
        response => {
          if (response.result === 1) {
            this.memberData = response.data;
            this.fun.setWXTitle(this.memberData.plugin_name);
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    tabHandel(index) {
      this.active = index;
      switch (index) {
        case 0:
          this.currentURL =
            "plugin.global-dividend.api.global-dividend.global-dividend";
          break;
        case 1:
          this.currentURL =
            "plugin.global-dividend.api.global-dividend.global-reward";
          break;
        case 2:
          this.currentURL =
            "plugin.global-dividend.api.global-dividend.global-shareholder";
          break;
        default:
          break;
      }
      this.integralList = [];
      this.getData();
    },
    getData() {
      $http
        .get(this.currentURL, { page: 1 }, " ")
        .then(response => {
          if (response.result === 1) {
            this.isLoadMore = true;
            this.page = 1;
            this.total_page = response.data.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            this.integralList = response.data.data;
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
      this.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(this.currentURL, { page: this.page }, " ")
          .then(
            response => {
              this.isLoadMore = true;
              if (response.result === 1) {
                let myData = response.data.data;
                this.integralList = this.integralList.concat(myData);
              } else {
                this.page = this.page - 1;
                this.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          )
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  components: { cTitle }
};
