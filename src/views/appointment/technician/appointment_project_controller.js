import cTitle from "components/title";
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多
import { Toast, MessageBox } from "mint-ui";

export default {
  mixins: [scrollMixin],
  data() {
    return {
      active: 0,
      url: "",
      projectList: [],

      // more
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  activated() {
    if (this.$route.query.name === "store") {
      this.url = "plugin.appointment.frontend.appointment-service.get-list-by-store";
    } else {
      this.url = "plugin.appointment.frontend.appointment-service.get-list-by-worker";
    }
    this.active = 0;
    this.init();
    this.getData();
  },
  methods: {
    init() {
      this.page = 1;
      this.isLoadMore = true;
      this.total_page = 0;
      this.projectList = [];
    },
    sure(id) {
      MessageBox.confirm("您确定要取消此预约吗?").then(action => {
        if (action == "confirm") {
          this.cancelDate(id);
        }
      }).catch(() => {
        console.log("cancel");
      });
    },
    cancelDate(id) {
      $http
        .get(
          "plugin.appointment.frontend.appointment-service.cancel-service",
          {
            id: id
          },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            Toast(response.msg);
            this.getData();
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectTab(e) {
      this.getData();
    },
    getData() {
      this.init();
      $http
        .get(
          this.url,
          {
            status: this.active,
            page: this.page
          },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.isLoadMore = true;
            this.total_page = response.data.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
            this.projectList = response.data.data;
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            this.url,
            {
              status: this.active,
              page: this.page
            },
            "加载中"
          )
          .then((response) => {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.data;
                that.projectList = that.projectList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    }
  },
  components: { cTitle }
};
