import cTitle from "components/title";
import { scrollMixin } from "../../utils/mixin"; //引入加载更多
import { Toast, MessageBox } from "mint-ui";

export default {
  mixins: [scrollMixin],
  data() {
    return {
      show1: false,
      sort: "asc",
      category: {},
      name: "",
      // more
      isLoadMore: true,
      page: 1,
      total_page: 0,
      titleInfo: "", // 标题
      commentList: [],
      CategoryList: []
    };
  },
  activated() {
    this.init();
    this.search();
    this.getCategoryList();
  },
  methods: {
    init() {
      this.category = {};
      this.name = "";
      this.sort = "asc";
      this.show1 = false;
      this.page = 1;
      this.isLoadMore = true;
      this.total_page = 0;
      this.commentList = [];
    },
    getCategoryList() {
      $http
        .get(
          "plugin.appointment.frontend.project-category.get-list",
          {},
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.CategoryList = response.data;
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectionBtn(item) {
      if (!item.name) {
        this.category = {};
      } else {
        this.category = item;
      }

      this.page = 1;
      this.isLoadMore = true;
      this.total_page = 0;
      this.search();
      this.show1 = false;
    },
    goProjectDetails(id) {
      this.$router.push(
        this.fun.getUrl("ProjectDetails", { project_id: id })
      );
    },
    enterSearch(event) {
      if (event.keyCode === 13) {
        console.log(111);
        //如果按的是enter键
        event.preventDefault();
        this.page = 1;
        this.isLoadMore = true;
        this.total_page = 0;
        this.search();
      }
    },
    search(page) {
      if (page) {
        this.page = page;
        this.isLoadMore = true;
        this.total_page = 0;
      }
      $http
        .get(
          "plugin.appointment.frontend.project.get-list",
          {
            sort: this.sort,
            category_id: this.category.id,
            name: this.name,
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
            this.commentList = response.data.data;
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showClass() {
      this.show1 ? this.show1 = false : this.show1 = true;
    },
    evaluateBtn() {
      if (this.sort == "asc") {
        this.sort = "desc";
      } else {
        this.sort = "asc";
      }
      this.show1 = false;
      this.page = 1;
      this.isLoadMore = true;
      this.total_page = 0;
      this.search();
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
            "plugin.appointment.frontend.project.get-list",
            {
              sort: this.sort,
              category_id: this.category.id,
              name: this.name,
              page: this.page
            },
            "加载中"
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.data;
                that.commentList = that.commentList.concat(myData); //数组拼接
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
    }
  },
  components: { cTitle }
};
