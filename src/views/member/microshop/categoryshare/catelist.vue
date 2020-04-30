<template>
  <div id="search"
       transition="fadeInLeft">
    <div id="soso" class="uou"
         :class="{'mout':amout}" :style="{width: fun.getPhoneEnv() == 3 ? '375px' : ''}">
      <div class="search">
        <mt-button slot="prepend"
                   style="background: #fff;box-shadow: none;"
                   icon="back"
                   @click='goback'></mt-button>
        <div class="searchBox">
          <form @submit.prevent
                action="#">
            <input type="search"
                   placeholder="搜索当前分类商品"
                   @keypress="enterSearch"
                   v-model="inputs">
          </form>
          <div class="img-icon"
               @click='search'>
            <div class="img-icon-btn"></div>
          </div>
        </div>

        <van-col :span="1"
                 style="margin-top: 0.8rem">
          <i class="fa fa-th-large"
             v-show="view"
             @click="$store.commit('views')"></i>
          <i class="fa fa-th-list"
             v-show="!view"
             @click="$store.commit('views')"></i>
        </van-col>
      </div>
      <c-sort :goods='datas'
              v-on:sortIn="sortOut"
              text='搜索结果'></c-sort>

    </div>
    <div style="height: 82px;display: block;"></div>
    <div class="page-loadmore-wrapper"
         ref="wrapper"
         :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method2="loadTop"
                   @top-status-change2="handleTopChange"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   topPullText=''
                   topDropText=''
                   topLoadingText=''
                   bottomPullText=''
                   bottomDropText='下拉加载...'
                   bottomLoadingText=''>
        <c-goodsList :goods='datas'
                     text='搜索结果'
                     class='osll'
                     :loading='loading'></c-goodsList>

      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import cGoodsList from "components/goodsList";
import cSort from "components/sort";
var n = 1;
export default {
  data() {
    return {
      title: "搜索",
      inputs: "",
      amout: false,
      loading: false,
      allLoaded: true,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      order_by: "",
      order_field: "",
      datas: []
    };
  },
  computed: mapState(["message", "blurst", "view"]),
  ...mapMutations(["views"]),
  methods: {
    enterSearch(event) {
      if (event.keyCode === 13) {
        //如果按的是enter键
        event.preventDefault();
        this.search();
      }
    },
    sortOut(e) {
      if (this.datas.length == 0) {
        return;
      }
      console.log("得到的信息", e);
      n = 1;
      this.datas = [];
      this.order_field = e.order_field;
      this.order_by = e.order_by;
      this.gotoSearch(n);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    //更新
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {
      console.log("加载更多启动");
      n++;
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },

    slider() {
      let that = this;
      window.onscroll = function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top < 80) {
          that.amout = false;
        } else {
          that.amout = true;
        }
      };
    },
    goback() {
      this.$router.go(-1);
    },
    search() {
      n = 1;
      this.datas = [];
      this.gotoSearch(n, false);
    },
    gotoSearch(page = 1, j = true) {
      let srtArr = JSON.parse(this.$route.params.id);

      $http
        .get("plugin.micro.frontend.controllers.MicroShop.search-goods", {
          "search[keyword]": this.inputs,
          page: page,
          "search[category]": srtArr,
          order_field: this.order_field,
          order_by: this.order_by,
          "search[couponid]": this.$route.params.coupon
        })
        .then(json => {
          if (json.result == 1) {
            this.loading = false;
            this.allLoaded = false;
            // 搜索结果为空
            if (json.data.data.length <= 0) {
              this.loading = true;
              this.allLoaded = true;
              return;
            }
            // 如果当前页数大于总页数 就不加载了
            if (json.data.current_page > json.data.last_page) {
              this.loading = true;
              this.allLoaded = true;
              return;
            }
            this.datas.push(...json.data.data);

            if (json.data.data.length < 20) {
              this.loading = true;
              this.allLoaded = true;
              return;
            }
          } else {
          }
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    window.MCateScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  activated() {
    let mailLanguage = JSON.parse(localStorage.getItem("mailLanguage"));
    if (mailLanguage.micro) {
      this.fun.setWXTitle(`${mailLanguage.micro.title}商品`);
    } else {
      this.fun.setWXTitle("微店商品");
    }
    this.amout = false;
    this.slider();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top; //keep分类不相同时，重载数据
    if (window.location.href.indexOf("#/microShopShare/micro_share_catelist/") > -1) {
      setTimeout(() => {
        window.scrollTo(0, window.MCateScrollTop);
      }, 200);
    }
    if (this.$route.params.fromHome === 1) {
      this.datas = [];
      this.order_field = "";
      this.order_by = "";
      n = 1;
      this.gotoSearch(n);
    }
  },
  created() {
    let mailLanguage = JSON.parse(localStorage.getItem("mailLanguage"));
    if (mailLanguage.micro) {
      this.fun.setWXTitle(`${mailLanguage.micro.title}商品`);
    } else {
      this.fun.setWXTitle("微店商品");
    }
    if (this.$route.params.fromHome !== 1) {
      this.datas = [];
      this.order_field = "";
      this.order_by = "";
      n = 1;
      this.gotoSearch(n);
    }
  },
  mounted() {
    this.slider();
    window.MCateScrollTop = 0;
  },
  components: {
    cGoodsList,
    cSort
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
  .osll {
    min-height: 100vh;
    margin-top: 1.2vw;
    box-sizing: border-box;
  }
  // @descendent wrapper {
  // 	overflow: scroll;
  // }
  .page-loadmore-wrapper2 {
    height: 100vh;
    overflow: hidden;
  }
  .uou {
    position: fixed;
    z-index: 99;
    top: 0px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    width: 100%;
  }
  .mout {
    top: -2.25rem;
  }
}

.search {
  overflow: hidden;
  background: #fff;
  border-bottom: 0.0625rem solid #f5f5f5;
  width: 100%;
  /*.el-button.el-button--default {*/
  /*float: left;*/
  /*width: 10%;*/
  /*border: none;*/
  /*padding-top: 1rem;*/
  /*}*/
  .mint-button.mint-button--default {
    float: left;
    width: 10%;
    border: none;
    padding-top: 0.4rem;
    box-shadow: none;
  }
  .el-input.el-input-group.el-input-group--append {
    float: left;
    width: 80%;

    margin-left: 2%;
    height: 2.8125rem;
  }
  .el-input-group__append .el-button.el-button--default {
    background: #f2f2f2;
    padding-top: 0.25rem;
    line-height: 1rem;
    padding-right: 1.8125rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-radius: 0 3.125rem 3.125rem 0;
  }
  .el-input.el-input-group.el-input-group--append .el-input-group__append {
    background: #f2f2f2;
  }
  .el-col-1 {
    margin: 0.75rem 0rem;
    color: #666;
    font-size: 16px;
  }
  .searchBox {
    position: relative;
    font-size: 14px;
    display: inline-table;
    float: left;
    width: 80%;
    margin-left: 2%;
    height: 2.8125rem;
    input {
      vertical-align: middle;
      border: none;
      background: #f2f2f2 none;
      box-sizing: border-box;
      outline: 0;
      padding: 0.1875rem 0.625rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin-top: 0.5rem;
      color: #8c8c8c;
      font-size: 14px;
      width: 17.75rem;
      border-radius: 0.9375rem;
      z-index: 10;
    }
    .img-icon {
      border: none;
      color: #a9a9a9;
      display: table-cell;
      position: relative;
      border-radius: 0;
      height: 1.875rem;
      top: 0.0625rem;
      opacity: 2;
      left: -2.25rem;
      .img-icon-btn {
        position: absolute;
        z-index: 12;
        width: 1rem;
        height: 1rem;
        top: 50%;
        left: 50%;
        margin-left: -0.5rem;
        margin-top: -0.5rem;
        background: url("../../../../assets/images/search.png") no-repeat center
          center;
        background-size: 80% 80%;
      }
    }
  }
}
</style>
