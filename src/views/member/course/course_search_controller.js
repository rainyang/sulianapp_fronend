import { Field, Button } from "mint-ui";
import { MessageBox } from "mint-ui";
import { CheckBox, CheckBoxGroup } from "vue-ydui";
import cTitle from "components/title";

export default {
  data() {
    return {
      goodsList: [],
      searchVal: "",
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
      filter_order:'',
      salesBol:true,
      priceBol:true
    };
  },

  mounted() {
    window.courseSearchScrollTop = 0;
  },
  beforeRouteLeave (to, from, next) {
    window.courseSearchScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    next()
  },
  activated() {
    if (this.$route.params.fromHome !== 1) {
      if (window.location.href.indexOf("#/member/coursesearch/") > -1) {
        setTimeout(() => {
          window.scrollTo(0, window.courseSearchScrollTop);
        }, 200);
      }
      // 不是从上一级点进的不清空
    } else {
      window.scrollTo(0, 0);
      this.searchVal = "";
      this.initData();
      this.getData();
    }
  },
  created() {
    if (this.$route.params.fromHome !== 1) {
      this.searchVal = "";
      this.initData();
      this.getData();
    }
  },
  methods: {
    getDataBth(type){
      if(type){
        if("sales" === type){
          this.priceBol=true;
          if(this.salesBol){
            this.salesBol=false;
            this.filter_order = 'sales_asc';
          }else{
            this.salesBol=true;
            this.filter_order = 'sales_desc';
          }
        }else if ("price" === type){
          this.salesBol=true;
          if(this.priceBol){
            this.filter_order = 'price_asc';
            this.priceBol=false;
          }else{
            this.filter_order = 'price_desc';
            this.priceBol=true;
          }
        }
      }else{
        this.salesBol=true;
        this.priceBol=true;
        this.filter_order = '';
      }
      this.initData();
      this.getData()
    },
    //获取搜索内容
    getData() {
      let param = {
        //goods_type:this.$route.params.goods_type?this.$route.params.goods_type:""
        goods_type: this.$route.params.goods_type,
        search: this.searchVal,
        page: this.page,
        filter_order:this.filter_order
      };
      $http
        .get(
          "plugin.video-demand.api.video-course-goods.get-course-goods",
          param
        )
        .then(response => {
          this.goodsList = response.data.data;
          this.total_page = response.data.last_page;
        })
        .catch(error => {
          console.log(error);
        });
    },

    loadTop() {
      this.initData();
      this.getData();
      this.$refs.coupon_loadmore.onTopLoaded();
    },

    loadBottom() {
      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
      if (this.isLoadMore) {
        this.getMoreData(this.page);
        this.$refs.coupon_loadmore.onBottomLoaded();
      } else {
        console.log("没有更多数据");
      }
    },

    getMoreData(page) {
      var that = this;
      if (this.page == this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        that.loading = true;
        that.allLoaded = true;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.video-demand.api.video-course-goods.get-course-goods",
            {
              goods_type: this.$route.params.goods_type,
              page: this.page,
              search: this.searchVal,
              filter_order:this.filter_order
            },
            "加载中..."
          )
          .then(
            function(response) {
              if (response.result === 1) {
                var myData = response.data.data;
                that.loading = false;
                that.allLoaded = false;
                that.goodsList = that.goodsList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.loading = true;
                that.allLoaded = true;
                that.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },

    initData() {
      this.page = 1;
      this.total_page = 0;
      this.goload = true;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
      this.goodsList = [];
    },

    goToDetail(id) {
      this.$router.push(this.fun.getUrl("CourseDetail", { goods_id: id }));
    }

    //搜索
  },

  components: { cTitle, CheckBox }
};
