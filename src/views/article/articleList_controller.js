import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

export default {
  data() {
    return {
      //obj:{},
      article_data: [],
      title: ""
    };
  },

  computed: {},

  activated() {
    this.initData();

    if (localStorage.getItem("showheadline")) {
      let obj = JSON.parse(localStorage.getItem("showheadline"));
      this.article_data = obj.data;
      this.title = obj.params.toptitle;
    }

    // if (window.localStorage.getItem("tempIndex")) {
    //   let obj = JSON.parse(window.localStorage.getItem("tempIndex")).item.data;
    //   obj.forEach(e => {
    //     if (e.temp == "showheadline") {
    //       this.article_data = e.data;
    //       this.title = e.params.toptitle;
    //     }
    //   });
    //   console.log(this.article_data);
    // } else {
    //   this.tempInfo();
    // }

    this.fun.setWXTitle("");
  },

  mounted() {
  },
  methods: {
    // tempInfo() {
    //   $http.get("home-page.index", {}, "加载中").then(
    //     response => {
    //       if (!response) return;
    //       if (response.result == 1) {
    //         let obj = response.data.item.data;
    //         obj.forEach(e => {
    //           if (e.temp == "showheadline") {
    //             this.article_data = e.data;
    //             this.title = e.params.toptitle;
    //           }
    //         });
    //       } else {
    //         console.log(response.msg);
    //       }
    //     },
    //     response => {
    //       MessageBox.alert(response);
    //     }
    //   );
    // },

    //跳转
    gotoArticle(item) {
      if(item.has_one_article_pay){
        if(item.has_one_record){
          this.$router.push(this.fun.getUrl("articleContent", { id: item.articleid,home:'1' }));
        }else{
          this.$router.push(this.fun.getUrl("payList", { id: item.articleid,home:'1' }));
          return 
        }
      }else{
        this.$router.push(this.fun.getUrl("articleContent", { id: item.articleid,home:'1' }));
        return 
      }
    },

    //初始化数据
    initData() {
      this.article_data = [];
      this.title = "";
    }
  },
  components: { cTitle }
};
