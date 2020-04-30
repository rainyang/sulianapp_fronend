import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";

const documentElement = document.documentElement;
const body = document.body;

export default {
  data() {
    return {
      active: "",
      id: "0",
      banner: "",
      title: "",
      datas: [],
      categories: [],
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
      show1: false,
      noNotice: false,
      article_pay:''
    };
  },
  activated() {
    this.initData();
    //获取数据
    this.getNetData();
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    this.activeName = "-1";
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {},

  methods: {
    toEssay(){
      this.$router.push(this.fun.getUrl("payEssay"));
    },
    initData() {
      this.page = 1;
      this.total_page = 0;
      this.goload = true;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
      this.datas = [];
    },

    //获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (documentElement && documentElement.scrollTop) {
        scrollTop = documentElement.scrollTop;
      } else if (body) {
        scrollTop = body.scrollTop;
      }
      return scrollTop;
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (body.clientHeight && documentElement.clientHeight) {
        clientHeight = Math.min(
          body.clientHeight,
          documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          body.clientHeight,
          documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(body.scrollHeight, documentElement.scrollHeight);
    },

    handleScroll() {
      //滚动事件触发
      if (
        this.getScrollTop() + this.getClientHeight() + 5 >
        this.getScrollHeight()
      ) {
        // console.log('下拉刷新了')
        //此处发起请求
        if (this.isLoadMore) {
          this.getMoreData();
        } else {
          console.log("没有更多数据");
        }
      }
    },

    //获取数据
    getNetData() {
      let that = this;
      let json = { category_id: this.id, page: 1 };
      $http.get("plugin.article.api.article.get-articles", json, "获取中").then(
        response => {
          if (response.result == 1) {
            this.noNotice = false;
            that.total_page = response.data.articles.last_page;
            if (!that.total_page) {
              that.total_page = 0;
            }
            if (response.data.categories.length <= 0) {
              this.noNotice = true;
            }
            // that.banner = response.data.banner;
            that.title = response.data.title;
            that.datas = response.data.articles.data;
            that.categories = response.data.categories;
            that.fun.setWXTitle(response.data.title);
            that.article_pay=response.data.article_pay;
          } else {
            this.noNotice = true;
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    getMoreData(page) {
      var that = this;
      if (this.page === this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        console.log("getMoreData", this.total_page);
        that.loading = true;
        that.allLoaded = true;
        return;
      } else {
        this.page = this.page + 1;
        let json = { category_id: this.id, page: this.page };
        $http
          .get("plugin.article.api.article.get-articles", json, "加载中")
          .then(
            function(response) {
              if (response.result === 1) {
                that.total_page = response.data.articles.last_page;
                that.loading = false;
                that.allLoaded = false;

                that.datas = that.datas.concat(response.data.articles.data);
              } else {
                that.page = that.page - 1;
                that.loading = true;
                that.allLoaded = true;
                that.isLoadMore = false;
                return;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },

    toNoticeInfo(item) {
      if(item.has_one_article_pay){
        if(item.has_one_record){
          this.$router.push(this.fun.getUrl("articleContent", { id: item.id }));
        }else{
          this.$router.push(this.fun.getUrl("payList", { id: item.id }));
          return 
        }
      }else{
        this.$router.push(this.fun.getUrl("articleContent", { id: item.id }));
        return 
      }
    },
    onClick(index, title) {
      this.initData();
      let tab = document.getElementById("tab");
      let tabChild = tab.getElementsByClassName("tabChild");
      this.id = tabChild[index].getAttribute("id");
      this.getNetData();
    }
  },
  components: { cTitle }
};
