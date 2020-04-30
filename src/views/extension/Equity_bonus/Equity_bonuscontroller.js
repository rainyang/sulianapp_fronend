import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      current: 0,
      bonus: {},
      dividend: [],
      care: [],
      isLoadMore: true,
      page: 1,
      total_page: 0,
      carePage: 1,
      care_total_page: 0,
      iscareMore: true
    };
  },
  activated() {
    this.initData();
    this.initCare();
    this.current = 0;
    this.getData();
  },
  mounted() {},
  methods: {
    loadTop() {
      this.initData();
      this.getData();
      this.$refs.award_loadmore.onTopLoaded();
    },
    careTop() {
      this.initCare();
      this.getData();
      this.$refs.care_loadmore.onTopLoaded();
    },
    change(item) {
      item.status = !item.status;
    },
    changeCare(list) {
      list.status = !list.status;
    },
    initData() {
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.dividend = [];
    },
    initCare() {
      this.carePage = 1;
      this.care_total_page = 0;
      this.iscareMore = true;
      this.care = [];
    },
    getData() {
      let that = this;
      let url =
        this.current == 0
          ? "plugin.interests-dividend.api.dividend.index"
          : "plugin.interests-dividend.api.dividend.care";
      let json = {
        page: this.current == 0 ? this.page : this.carePage
      };
      $http.get(url, json, "获取中").then(
        response => {
          if (response.result == 1) {
            if (url === "plugin.interests-dividend.api.dividend.index") {
              that.bonus = response.data;
              this.fun.setWXTitle(that.bonus.plugin_name);
            }
            that.current == 0
              ? (that.isLoadMore = true)
              : (that.iscareMore = true);
            that.current == 0
              ? (that.total_page = response.data.dividend.last_page)
              : (that.care_total_page = response.data.last_page);

            if (that.current == 0 && !that.total_page) {
              that.total_page = 0;
            } else if (that.current == 1 && !that.care_total_page) {
              that.care_total_page = 0;
            }
            if (that.current == 0) {
              if (response.data.dividend.data.length > 0) {
                let arr = [];
                response.data.dividend.data.map((item, index, key) => {
                  arr.push(Object.assign({}, item, { status: false }));
                });
                that.dividend = arr;
              }
            } else if (that.current == 1) {
              if (response.data.data.length > 0) {
                let arr = [];
                response.data.data.map((item, index, key) => {
                  arr.push(Object.assign({}, item, { status: false }));
                });
                that.care = arr;
              }
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    getMoreData(page) {
      let that = this;
      let url =
        this.current == 0
          ? "plugin.interests-dividend.api.dividend.index"
          : "plugin.interests-dividend.api.dividend.care";
      if (this.current == 0) {
        if (this.page === this.total_page) {
          return;
        }
        if (this.page >= this.total_page) {
          return;
        } else {
          this.page = this.page + 1;
          let json = {
            page: this.page
          };
          this.page = this.page + 1;
          $http.get(url, json, "加载中").then(
            function(response) {
              if (response.result === 1) {
                that.total_page = response.data.dividend.last_page;
                let arr = [];
                response.data.dividend.data.map((item, index, key) => {
                  arr.push(Object.assign({}, item, { status: false }));
                });
                that.dividend = that.dividend.concat(arr);
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
      } else if (this.current == 1) {
        console.log(this.care_total_page);
        if (this.carePage === this.care_total_page) {
          return;
        }
        if (this.carePage >= this.care_total_page) {
          return;
        } else {
          this.carePage = this.carePage + 1;
          let json = {
            page: this.carePage
          };

          $http.get(url, json, "加载中").then(
            function(response) {
              if (response.result === 1) {
                that.care_total_page = response.data.last_page;
                let arr = [];
                response.data.data.map((item, index, key) => {
                  arr.push(Object.assign({}, item, { status: false }));
                });
                that.care = that.care.concat(arr);
              } else {
                that.carePage = that.carePage - 1;
                that.iscareMore = false;
                return;
              }
            },
            function(response) {
              // error callback
            }
          );
        }
      }
    },
    onClick(index) {
      if (index == 0) {
        this.initData();
      } else if (index == 1) {
        this.initCare();
      }
      let tab = document.getElementById("tabs");
      let tabChild = tab.getElementsByClassName("tab");
      this.current = tabChild[index].getAttribute("id");
      this.getData();
    }
  },
  components: {
    cTitle
  }
};
