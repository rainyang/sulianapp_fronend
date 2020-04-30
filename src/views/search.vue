<template>
  <div id="search-box-first"
       transition="fadeInLeft">
    <div id="soso"
         class="uou"
         :class="[{mout: amout}, this.fun.getPhoneEnv() == 3?'pcStyle':'']">
      <div class="search">
        <div class="back"
             @click="goback"><i class="fa fa-angle-left"></i></div>
        <div class="search-box">
          <form @submit.prevent
                action="#">
            <input type="search"
                   placeholder="请输入内容"
                   @keypress="enterSearch"
                   v-model="inputs"
                   @click.native.focus="hidebox" />
          </form>
          <i class="iconfont icon-sousuo1"
             style="color: #ccc;"
             @click="search"></i>
        </div>
        <div style="position:absolute;right: 1rem;">
          <i class="fa fa-th-large"
             v-show="view"
             @click="$store.commit('views')"></i>
          <i class="fa fa-th-list"
             v-show="!view"
             @click="$store.commit('views')"></i>
        </div>
      </div>
      <c-sort :goods="goods"
              :show="true"
              v-on:sortIn="sortOut"
              v-on:showscreen="showbox"
              text="搜索结果"></c-sort>
    </div>
    <div style="height: 5.375rem;display: block;"></div>
    <mt-loadmore v-if="goload"
                 :top-method="loadTop"
                 topDropText="释放刷新"
                 :bottom-all-loaded="allLoaded"
                 ref="loadmore"
                 bottomPullText=""
                 bottomDropText="下拉加载"
                 bottomLoadingText=""
                 :autoFill="true">
      <c-goodsList :goods="goods"
                   text="搜索结果"
                   class="osll"
                   :loading="loading"></c-goodsList>
    </mt-loadmore>

    <yd-popup v-model="show"
              position="right"
              @touchMove.stop>
      <div class="screening">
        <span class="tabs"
              @click="changetype(0)">{{ screentitle[0] }} </span>
        <div id="div1">
          <div v-for="(val, key) in brand" :key="key"
               @click="screenbrand(val.id)">
            <img :src="val.logo" />
            <span>{{ val.name }}</span>
          </div>
        </div>
        <span class="tabs"
              @click="changetype(1)">{{ screentitle[1] }} </span>
        <div id="div2">
          <van-collapse v-model="activeNames"
                        accordion>
            <div v-for="(val, key) in classification1" :key="key"
                 @click="classificationtype(val.id, key)">
              <van-collapse-item v-show="val.name"
                                 :title="val.name"
                                 :name="key"
                                 :is-link="val.son.length > 0"
                                 :icon="classificationkey == key ? 'passed' : ''">
                <div class="classify">
                  <div v-for="(val1, key1) in val.son" :key="key1"
                       class="divbox1"
                       :class="{ m100: classificationkey1 == key1 }">
                    <p :class="{ chooseFir: classificationkey1 == key1 }"
                       @click.stop="classificationtype1(val1.id, key1)"
                       v-show="classificationkey1 == key1">
                      <span class="none-choose"
                            :class="{ color1: classificationkey1 != key1 }">
                        <img class="img-box"
                             src="../assets/images/current@3x.png"
                             alt="" />
                      </span>
                      <span>{{ val1.name }}</span>
                    </p>

                    <p :class="{ chooseFir: classificationkey1 == key1 }"
                       @click.stop="classificationtype1(val1.id, key1)"
                       v-show="classificationkey1 == null">
                      <span class="none-choose"
                            :class="{ color1: classificationkey1 != key1 }">
                        <img class="img-box"
                             src="../assets/images/current@3x.png"
                             alt="" />
                      </span>
                      <span>{{ val1.name }}</span>
                    </p>

                    <div class="box-second">
                      <div v-for="(val2, key2) in val1.has_many_children" :key="key2"
                           @click.stop="classificationtype2(val2.id, key2)"
                           v-show="classificationkey1 == key1"
                           class="divbox2">
                        <p :class="{
                            'choose-third': classificationkey2 == key2
                          }">
                          <span>{{ val2.name }}</span>
                          <span :class="{ color1: classificationkey2 != key2 }">
                            <img class="img-box2"
                                 src="../assets/images/cur@3x.png"
                                 alt="" /></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </van-collapse-item>
            </div>
          </van-collapse>
        </div>
        <span class="tabs"
              @click="changetype(2)">{{ screentitle[2] }} </span>
        <div id="div3">
          <p v-for="(val, key) in attr" :key="key"
             @click="selectattr(key, val)">
            <span class="title">{{ val.name }}</span>
            <span class="choose"
                  :class="{ color1: val.show }">
              <img class="img-box"
                   src="../assets/images/current@3x.png"
                   alt="" />
            </span>
          </p>
        </div>

        <span class="tabs"
              @click="changetype(3)">{{ screentitle[3] }} </span>
        <div id="div4">
          <dl v-for="(val, key) in tagname" :key="key">
            <dt>
              {{ val.name }}
              <span @click="showtagname(key)"
                    v-if="val.value.length > 4">{{ showtagnamekey != key ? "更多" : "收起" }}
                <span class="icon"
                      :class="{ icon1: showtagnamekey == key }"></span>
              </span>
            </dt>
            <dd :class="{ color2: showtagnamekey != key }"
                class="div4-dd">
              <span v-for="(val1, key1) in val.value" :key="key1"
                    @click="selectname($event, val1.id, key, key1)"
                    :class="{ color: val1.record == 2 }"
                    :data="val1.id">{{ val1.name }}
              </span>
            </dd>
          </dl>
        </div>
        <div class="button">
          <div class="btn"
               @click="resetnames">重置</div>

          <div class="btn"
               @click="screen">确定</div>
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import cGoodsList from "components/goodsList";
import cSort from "components/sort";
import { scrollMixin } from "../utils/mixin";

var n = 1;
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      title: "搜索",
      //inputs: this.$route.params.kyes,
      inputs: "",
      amout: false,
      loading: false,
      allLoaded: true,
      goload: false,
      goods: [],
      order_by: "",
      order_field: "",
      screentitle: ["品牌", "分类", "属性", "高级选项"], //筛选标题
      show: false,
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      select: "",
      brand: {},
      attr: [
        {
          name: "推荐商品",
          show: true
        },

        {
          name: "新品上市",
          show: true
        },

        {
          name: "热卖商品",
          show: true
        },

        {
          name: "促销商品",
          show: true
        },

        {
          name: "限时抢购",
          show: true
        }
      ],
      attrstr: [],
      attrkey: [],
      classification1: [],
      classification2: [],
      classificationkey: null,
      classificationkey1: null,
      classificationkey2: null,
      typestring: "", //搜索分类id
      namestring: "",
      namekey: null,
      classificationshow: false,
      tagname: [],
      showtagnamekey: null,
      more_show: false,
      shownum: 9000,
      show5: true,

      brandId: "",

      filterId: [],

      nameNotice: false,

      tag: null,
      activeNames: null,

      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0 //总页数
    };
  },
  computed: {
    ...mapState(["view"]),
    zoneId() {
      if (this.$store.state.zoneId == "") {
        this.$store.commit("setZoneId", window.localStorage.getItem("zoneId"));
      }
      return this.$store.state.zoneId;
    }
  },
  mounted() {
    window.searchScrollTop = 0;
    this.slider();
  },
  beforeRouteLeave(to, from, next) {
    window.searchScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  methods: {
    ...mapMutations(["views"]),
    lastScrollHeight() {
      if (window.location.href.indexOf("#/search?") > -1) {
        setTimeout(() => {
          window.scrollTo(0, window.searchScrollTop);
        }, 200);
      }
    },
    //通用功能
    showbox() {
      this.show = !this.show;
    },
    hidebox() {
      this.show = false;
    },
    enterSearch(event) {
      if (event.keyCode === 13) {
        //如果按的是enter键
        event.preventDefault();
        this.search();
      }
    },
    screen() {
      this.goods = [];

      this.goload = true;
      this.hidebox();
      this.gotoSearch();
    },
    changetype(key) {
      this.select = key;
      this.resetselect();
      switch (key) {
        case 0:
          this.show1 = true;
          break;
        case 1:
          this.show2 = true;
          break;
        case 2:
          this.show3 = true;
          break;
        case 3:
          this.show4 = true;
          break;
        default:
          break;
      }
    },
    resetselect() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
    },
    //品牌相关的功能
    getbrand() {
      $http.post("goods.brand.get-brand").then(res => {
        this.brand = res.data.data;
      });
    },
    screenbrand(id) {
      this.goods = [];
      this.brandId = id;
      this.goload = true;
      this.hidebox();
      this.gotoSearch();
    },
    //分类相关的功能
    getclassification() {
      $http
        .get("goods.category.search-goods-category")
        .then(res => {
          this.classification1 = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    classificationtype(id, key) {
      this.classification2 = [];
      this.typestring = id;

      if (this.classificationkey == key) {
        this.classificationkey = null;
        return;
      } else {
        this.classificationkey = key;
      }
      this.classificationkey1 = null;
      this.classificationkey2 = null;
      this.classificationshow = false;
    },
    classificationtype1(id, key) {
      this.typestring = id;

      this.classificationshow = true;

      if (this.classificationkey1 == key) {
        this.classificationkey1 = null;
      } else {
        this.classificationkey1 = key;
      }

      this.classificationkey2 = null;
    },
    classificationtype2(id, key) {
      if (this.typestring == id) {
        this.typestring = "";
      } else {
        this.typestring = id;
      }

      if (this.classificationkey2 == key) {
        this.classificationkey2 = null;
      } else {
        this.classificationkey2 = key;
      }
    },
    resettypes() {
      this.classification2 = [];
      this.typestring = "";
      this.classificationkey = null;
      this.classificationkey1 = null;
      this.classificationkey2 = null;
    },
    searchsure() {
      let data = {
        "&search[category]": this.typestring
      };
      this.screen(data);
    },
    //属性相关的功能
    findstr(attrstr, key) {
      let index = this.attrstr.indexOf(attrstr);
      index + 1 ? this.attrstr.splice(index, 1) : this.attrstr.push(attrstr);
      let index1 = this.attrkey.indexOf(key);
      index1 + 1 ? this.attrkey.splice(index1, 1) : this.attrkey.push(key);
    },
    resetattrs() {
      this.attrstr = [];
      this.attrkey = [];
    },
    suresearch() {
      let data = {
        "search[product_attr]": this.attrstr.join(",")
      };
      this.screen(data);
    },
    selectattr(key, val) {
      //属性选择项
      switch (key) {
        case 0:
          this.findstr("is_recommand", key);
          break;
        case 1:
          this.findstr("is_new", key);
          break;
        case 2:
          this.findstr("is_hot", key);
          break;
        case 3:
          this.findstr("is_comment", key);
          break;
        case 4:
          this.findstr("limit_buy", key);
          break;
      }
      if (!val.show) {
        this.$set(val, "show", true);
      } else {
        this.$set(val, "show", false);
      }
    },
    //标签组相关功能
    showtagname(key) {
      if (key == this.showtagnamekey) {
        this.showtagnamekey = null;
        return;
      } else {
        this.showtagnamekey = key;
      }
    },
    getname() {
      $http
        .get("goods.filtering.index")
        .then(res => {
          if (res.result == 1) {
            this.tagname = res.data;
            for (let i = 0; i < this.tagname.length; i++) {
              for (let y = 0; y < this.tagname[i].value.length; y++) {
                this.tagname[i].value[y].record = 1;
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectname(e, id, key1, key2) {
      if (e.target.className.indexOf("color") == -1) {
        e.target.className = "color"; //切换按钮样式
        if (this.filterId.includes(id)) {
          return;
        } else {
          this.filterId.push(id);
        }

        //写逻辑 增加name
      } else {
        e.target.className = ""; //切换按钮样式
        let index = this.filterId.indexOf(id);
        this.filterId.splice(index, 1);
        //写逻辑 减少name
      }

      if (this.tagname[key1].value[key2].record == 1) {
        this.$set(this.tagname[key1].value[key2], "record", 2);
      } else {
        this.$set(this.tagname[key1].value[key2], "record", 1);
      }

      //console.log(this.filterId);
    },
    resetnames() {
      this.namestring = null;
      this.showtagnamekey == null;
      this.namekey = null;

      this.brandId = "";

      this.attrstr = [];

      this.filterId = [];

      this.typestring = "";

      this.removeClass();

      this.attr = [
        {
          name: "推荐商品",
          show: true
        },

        {
          name: "新品上市",
          show: true
        },

        {
          name: "热卖商品",
          show: true
        },

        {
          name: "促销商品",
          show: true
        },

        {
          name: "限时抢购",
          show: true
        }
      ];

      this.classificationkey = null;

      this.classificationkey1 = null;
      this.classificationkey2 = null;

      this.brandId = "";
    },

    removeClass() {
      var dd = document.getElementsByClassName("div4-dd");

      for (let i = 0; i < dd.length; i++) {
        var span = dd[i].getElementsByTagName("span");

        for (let y = 0; y < span.length; y++) {
          span[y].setAttribute("class", "");
        }
      }
      for (let i = 0; i < this.tagname.length; i++) {
        for (let y = 0; y < this.tagname[i].value.length; y++) {
          if (this.tagname[i].value[y].record == 2) {
            this.tagname[i].value[y].record = 1;
          }
        }
      }

      console.log(this.filterId);
    },

    suretagname() {
      let data = {
        "search[filtering]": this.namestring,
        "search[product_attr]": this.attrstr.toString(),
        "search[keyword]": this.inputs,
        "search[category]": ""
      };
      this.screen(data);
    },
    sortOut(e) {
      this.hidebox();
      console.log("得到的信息", e);
      if (this.goods.length == 0) {
        return;
      }
      n = 1;
      this.goods = [];
      this.order_field = e.order_field;
      this.order_by = e.order_by;
      this.gotoSearch(n);
    },
    search() {
      n = 1;
      this.goods = [];
      this.goload = true;
      this.gotoSearch();
    },
    slider() {
      let that = this;
      window.onscroll = function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        top < 80 ? (that.amout = false) : (that.amout = true);
      };
    },
    loadTop() {
      n = 1;
      this.goods = [];
      this.gotoSearch(n);
      this.$refs.loadmore.onTopLoaded();
    },
    // 加载更多 废弃loadBottom（）=========
    loadBottom() {
      console.log("加载更多启动");
      n++;
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },
    getMoreData() {
      console.log("加载更多启动");
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      if (that.page >= that.total_page) {
        that.loading = true;
        return;
      } else {
        that.page += 1;
        let json = {
          "search[keyword]": this.inputs,
          page: that.page,
          order_field: this.order_field,
          order_by: this.order_by,
          "search[couponid]": this.$route.params.coupon,
          "search[as_id]": this.zoneId,
          "search[brand_id]": this.brandId,
          "search[product_attr]": this.attrstr.toString(),
          "search[filtering]": this.filterId.toString(),
          "search[category]": this.typestring
        };
        let _url = "";
        if (
          !this.fun.isTextEmpty(this.$route.query.fromPage) &&
          this.$route.query.fromPage == 1
        ) {
          _url = "plugin.pending-order.frontend.wholesale-area.goods-list";
        } else {
          _url = "goods.goods.search-goods";
        }
        $http
          .get(_url, json)
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.data;
              that.goods = that.goods.concat(nextPageData); //进行数组拼接
            } else {
              that.page = that.page - 1;
              that.isLoadMore = false;
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    goback() {
      this.$router.go(-1);
    },
    gotoSearch(page = 1) {
      let json = {
        "search[keyword]": this.inputs,
        page: page,
        order_field: this.order_field,
        order_by: this.order_by,
        "search[couponid]": this.$route.params.coupon,
        "search[as_id]": this.zoneId,
        "search[brand_id]": this.brandId,
        "search[product_attr]": this.attrstr.toString(),
        "search[filtering]": this.filterId.toString(),
        "search[category]": this.typestring
      };
      let _url = "";
      if (
        !this.fun.isTextEmpty(this.$route.query.fromPage) &&
        this.$route.query.fromPage == 1
      ) {
        _url = "plugin.pending-order.frontend.wholesale-area.goods-list";
      } else {
        _url = "goods.goods.search-goods";
      }
      $http.get(_url, json).then(json => {
        if (json.result == 1) {
          this.isLoadMore = true;
          this.total_page = json.data.last_page;
          if (!this.total_page) {
            this.total_page = 0;
          }
          this.loading = false;
          this.allLoaded = false;
          // 搜索结果为空
          if (json.data.total.length <= 0) {
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
          this.goods.push(...json.data.data);
          console.log("商品内容", this.goods);
          if (json.data.data.length < 20) {
            this.loading = true;
            this.allLoaded = true;
            return;
          }
        } else {
          this.doException(json);
        }
      });
    },
    doException(json) {
      console.log(json.msg);
    }
    // searchAgain(json) {
    //   $http.get('goods.goods.search-goods', json).then((json) => {
    //     if (json.result == 1) {
    //       n++;
    //       this.loading = false;
    //       this.allLoaded = false;
    //       // 搜索结果为空
    //       if (json.data.total.length <= 0) {
    //         this.loading = true;
    //         this.allLoaded = true;
    //         return;
    //       }
    //       // 如果当前页数大于总页数 就不加载了
    //       if (json.data.current_page > json.data.last_page) {
    //         this.loading = true;
    //         this.allLoaded = true;
    //         return;
    //       }
    //       this.goods.push(...json.data.data);
    //       console.log('商品内容again', this.goods);
    //       if (json.data.data.length < 20) {
    //         this.loading = true;
    //         this.allLoaded = true;
    //         return;
    //       }
    //     } else {
    //       this.doException(json);
    //     }
    //   });
    // }
  },
  created() {
    // this.search();
    if (this.$route.params.fromHome !== 1) {
      n = 1;
      this.goods = [];
      this.inputs = "";
      this.getclassification();
      this.getname();
      this.getbrand();
      this.search();
    }
    // if (this.$route.params.coupon || this.$route.params.kyes) {
    //   console.log("created-----------------------");
    //   this.search(n);
    // }
  },
  activated() {
    this.amout = false;
    this.show = false;
    if (this.$route.params.coupon || this.$route.params.kyes) {
      console.log("activated-----------------------");
      this.search(n);
    }else if (this.$route.params.fromHome === 1) {
      n = 1;
      this.goods = [];
      this.inputs = "";
      this.getclassification();
      this.getname();
      this.getbrand();
      this.search();
    }else {
      this.lastScrollHeight();
      // let json = JSON.parse(window.localStorage.getItem('searchBrandJSON'));
      // let key = window.localStorage.getItem('searchBrandKey');
      // this.searchAgain(json);
      // this.inputs = key;
      // 不是从上一级点进的不清空
    }

    //this.gotoSearch(n);
  },
  components: {
    cGoodsList,
    cSort
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search-box-first {
  width: 100%;
  .screening {
    width: 18rem;
    height: 100%;
    background: #fff;
    .tabs {
      font-weight: bold;
      font-size: 16px;
      display: block;
      margin: 0.5rem 0.5rem 0 0.5rem;
      text-align: left;
      /*width: 30%;*/
      /*background: #f5f5f5;*/
      line-height: 1.6875rem;
      border-radius: 0.1875rem;
    }
    #div1 {
      display: flex;
      flex-wrap: wrap;
      div {
        padding-top: 0.625rem;
        width: 25%;
        img {
          display: block;
          width: 4rem;
          height: 4rem;
        }
        span {
          display: inline-block;
          margin-top: 0.625rem;
        }
      }
    }
    .classify {
      display: flex;
      flex-wrap: wrap;
    }
    .m100 {
      width: 100%;
    }
    .divbox1 {
      margin: 0.2rem 0.5rem;
      p {
        display: inline-block;
        font-size: 15px;
        text-align: center;
        line-height: 2rem;
        /*width: 5rem;*/
        padding: 0 0.5rem;
        height: 2rem;
        border-radius: 5px;
        position: relative;
        background-color: #eeeeee;
        .none-choose {
          height: 1rem;
          vertical-align: center;
        }
        .img-box {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          vertical-align: center;
        }
      }
      .chooseFir {
        border: solid 1px #e60012;
        color: #e60012;
        background-color: #fff;
      }
      .box-second {
        display: flex;
        flex-wrap: wrap;
      }
      .divbox2 {
        /*width: 100%;*/
        font-size: 15px;
        text-align: center;
        line-height: 2rem;
        /*text-indent: 3.125rem;*/
        color: rgba(0, 0, 0, 0.5);
        /*border-bottom: solid 0.0625rem #ebebeb;*/
        margin: 0.3rem;
        p {
          /*width: 5rem;*/
          height: 2rem;
          position: relative;
        }
        .choose-third {
          border: solid 1px #e60012;
          background-color: #fef5f6;
        }
        .img-box2 {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
    #div2 {
      /*padding-left: 0.875rem;*/
      .van-collapse-item__content {
        padding: 0;
      }
      #divbox {
        box-sizing: border-box;
        & > p {
          /*width: 100%;*/
          font-size: 15px;
          text-align: left;
          line-height: 2.5rem;
          height: 2.5rem;
          font-weight: bold;
          /*text-indent: 0.625rem;*/
          border-bottom: solid 0.0625rem #ebebeb;
          position: relative;
        }
      }
      footer {
        div {
          width: 3.5rem;
          line-height: 1.5rem;
          text-align: center;
          border-radius: 0.1875rem;
          float: left;
          &:nth-of-type(1) {
            border: solid 0.0625rem #f15353;
            background: #f15353;
            color: #fff;
            margin: 1rem 0 0 60%;
          }
          &:nth-of-type(2) {
            border: solid 0.0625rem #f15353;
            color: #f15353;
            background: #fff;
            margin: 1rem 0 0 5%;
          }
        }
      }
    }
    #div3 {
      box-sizing: border-box;
      padding-left: 0.875rem;
      p {
        font-size: 15px;
        text-align: left;
        line-height: 2.5rem;
        height: 2.5rem;
        /*text-indent: 0.625rem;*/
        border-bottom: solid 0.0625rem #ebebeb;
        position: relative;
        display: flex;
        .title {
          flex: 1;
        }
        .choose {
          flex: 0 0 2rem;
        }
        .img-box {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
        }
        /*span {
          position: absolute;
          right: 1rem;
          top: 1rem;
          display: block;
          width: 1.25rem;
          height: 0.625rem;
          border: solid 0.1875rem #f15353;
          border-top: transparent;
          border-right: transparent;
          transform: rotate(-45deg);
        }*/
      }
      div {
        width: 3.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 0.1875rem;
        float: left;
        &:nth-of-type(1) {
          border: solid 0.0625rem #f15353;
          background: #f15353;
          color: #fff;
          margin: 1rem 0 0 60%;
        }
        &:nth-of-type(2) {
          border: solid 0.0625rem #f15353;
          color: #f15353;
          background: #fff;
          margin: 1rem 0 0 5%;
        }
      }
    }
    #div4 {
      dl {
        box-sizing: border-box;
        padding: 0 0.875rem;
        font-size: 15px;
        dt {
          text-align: left;
          line-height: 2.5rem;
          text-indent: 0.9375rem;
          font-weight: bold;
          span {
            float: right;
            font-size: 13px;
            color: #c9c9c9;
            font-weight: normal;
            .icon {
              width: 0.4375rem;
              height: 0.4375rem;
              margin: 0.9375rem 0.9375rem 0 0.3125rem;
              border: solid 0.0625rem #c9c9c9;
              border-left: transparent;
              border-top: transparent;
              transform: rotate(45deg);
            }
            .icon1 {
              width: 0.4375rem;
              height: 0.4375rem;
              margin: 0.9375rem 0.9375rem 0 0.3125rem;
              border: solid 0.0625rem #c9c9c9;
              border-left: transparent;
              border-top: transparent;
              transform: rotate(225deg);
            }
          }
        }
        dd {
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          border-bottom: solid 0.0625rem #ebebeb;
          span {
            display: block;
            background: #f5f5f5;
            width: 4.9375rem;
            line-height: 1.875rem;
            height: 1.875rem;
            float: left;
            margin: 0 0.625rem 0.75rem 0;
            border-radius: 0.1875rem;
            padding: 0 0.125rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  .button {
    width: 100%;
    height: 3rem;
    line-height: 2rem;
    display: flex;
    background: #fff;
    padding: 0 0.5rem 0.5rem 0;
    div {
      width: 3.5rem;
      line-height: 2rem;
      text-align: center;
      border-radius: 0.1875rem;
      &:nth-of-type(1) {
        border: solid 0.0625rem #f15353;
        background: #f15353;
        color: #fff;
        margin: 0.5rem 0 0 50%;
      }
      &:nth-of-type(2) {
        border: solid 0.0625rem #f15353;
        color: #f15353;
        background: #fff;
        margin: 0.5rem 0 0 5%;
      }
    }
    .btn {
      flex: 1;
    }
  }
  .color {
    color: #f15353;
    background: #fff !important;
    border: solid 0.0625rem #f15353;
  }
  .color1 {
    display: none !important;
  }
  .color2 {
    max-height: 2.625rem;
  }
  .fade1-enter-active {
    transition: 0.3s;
  }
  .fade1-enter,
    .fade1-leave-to /* .fade-leave-active below version 2.1.8 */
 {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateX(100%);
  }
  .osll {
    min-height: 100vh;
    overflow: scroll;
  }
  .uou {
    position: fixed;
    z-index: 99;
    top: 0rem;
    transition: 0.2s;
    -webkit-transition: 0.2s;
  }
  .mout {
    top: -2.25rem;
  }
}

#search-box-first {
  .osll {
    min-height: 100vh;
    overflow: scroll;
  }

  .uou {
    width: 100%;
    position: fixed;
    z-index: 99;
    top: 0px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
  }
  .pcStyle {
    width: 375px;
  }
  #sort {
    line-height: 2.5rem;
    font-size: 14px;
  }
  .mout {
    top: -2.25rem;
  }
}

.search {
  height: 2.8125rem;
  line-height: 2.8125rem;
  position: relative;
  display: flex;
  overflow: hidden;
  background: #fff;
  border-bottom: 0.0625rem solid #f5f5f5;
  .back {
    width: 2.8125rem;
    i {
      line-height: 2.8125rem;
      font-size: 1.5rem;
    }
  }
  .search-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin-top: 0.5rem;
    padding: 0 0.625rem;
    background-color: #f2f2f2;
    height: 1.75rem;
    line-height: 1.75rem;
    border-radius: 0.875rem;
    input {
      flex: 1;
      line-height: 1.75rem;
      border: none;
      color: #333;
    }
    i {
      position: absolute;
      right: 1rem;
      flex: 0 0 1.5rem;
    }
  }
}
</style>
