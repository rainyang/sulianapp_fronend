import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

const RECORD_URL =
  "plugin.scoring-dividend.api.scoring-dividend.scoring-record";

export default {
  data() {
    return {
      //全部
      all_arr: [],
      //待审核
      auditing_arr: [],
      //通过
      pass_arr: [],
      //驳回
      reject_arr: [],

      page: 1,
      total_page: 0,
      isLoading: false,
      isAllLoaded: false,
      status: "",

      current_index: 0
    };
  },

  activated() {
    this.initData();
    this.getList();
  },

  mounted() {},
  methods: {
    tabHandel(index) {
      console.log(index);
      if (this.current_index == index) {
        return;
      } else {
        this.current_index = index;
        switch (index) {
          case 0:
            this.status = "";
            break;
          case 1:
            this.status = "0";
            break;
          case 2:
            this.status = "1";
            break;
          case 3:
            this.status = "-1";
            break;
          default:
            break;
        }
        this.initPageData();
        this.getList();
      }
    },
    initData() {
      this.all_arr = [];
      this.auditing_arr = [];
      this.pass_arr = [];
      this.reject_arr = [];
      this.page = 1;
      this.total_page = 0;
      this.isLoading = false;
      this.isAllLoaded = false;
      this.status = "";
      this.current_index = 0;
    },

    initPageData() {
      this.page = 1;
      this.total_page = 0;
      this.isLoading = false;
      this.isAllLoaded = false;
    },

    getList() {
      $http
        .get(RECORD_URL, { page: this.page, status: this.status }, "...加载中")
        .then(res => {
          if (res.result == 1) {
            switch (this.status) {
              case "":
                this.all_arr = res.data.data;
                break;
              case "0":
                this.auditing_arr = res.data.data;
                break;
              case "1":
                this.pass_arr = res.data.data;
                break;
              case "-1":
                this.reject_arr = res.data.data;
                break;
              default:
                break;
            }

            this.isLoading = false;
            if (this.page == res.data.last_page) {
              this.isAllLoaded = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getMoreList() {
      if (this.isAllLoaded) {
        return;
      }

      this.page = this.page + 1;

      $http
        .get(RECORD_URL, { status: this.status, page: this.page }, "加载中...")
        .then(res => {
          if (res.result == 1) {
            switch (this.status) {
              case "":
                this.all_arr = this.all_arr.concat(res.data.data);
                break;
              case "0":
                this.auditing_arr = this.auditing_arr.concat(res.data.data);
                break;
              case "1":
                this.pass_arr = this.pass_arr.concat(res.data.data);
                break;
              case "-1":
                this.reject_arr = this.reject_arr.concat(res.data.data);
                break;
              default:
                break;
            }
            this.isLoading = false;
            if (this.page == res.data.last_page) {
              this.isAllLoaded = true;
            }
          } else {
            this.page = this.page - 1;
            this.isLoading = false;
            this.isAllLoaded = false;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getStatus(value) {
      let status = "";
      switch (value) {
        case 0:
          status = "待审核";
          break;
        case 1:
          status = "已审核";
          break;
        case -1:
          status = "已驳回";
          break;
        default:
          break;
      }
      return status;
    }
  },
  components: { cTitle }
};
