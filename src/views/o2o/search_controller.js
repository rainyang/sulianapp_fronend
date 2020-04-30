import { mapState, mapMutations } from "vuex";
import cStoreList from "components/storeList";

export default {
  data() {
    return {
      title: "搜索",
      inputs: "",
      amout: false,
      loading: false,
      allLoaded: true,
      goload: false,
      stores: [],
      order_by: "",
      order_field: ""
    };
  },
  activated() {
    this.city = this.$route.params.city;
    console.log(this.$route.params.city);
    console.log(this.$route.params.point);
    this.point = JSON.parse(this.$route.params.point);
    console.log(JSON.parse(this.$route.params.point).lat);
    this.search();
  },
  computed: mapState(["view"]),
  ...mapMutations(["views"]),
  mounted() {
    this.slider();
  },
  methods: {
    enterSearch(event) {
      if (event.keyCode === 13) {
        //如果按的是enter键
        event.preventDefault();
        this.search();
      }
    },
    search() {
      this.gotoSearch();
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
    // 加载更多
    loadBottom() {
      console.log("加载更多启动");
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },
    goback() {
      this.$router.go(-1);
    },
    gotoSearch() {
      const that = this;
      let p = this.fun.bd_encrypt(JSON.parse(this.$route.params.point).lng, JSON.parse(this.$route.params.point).lat);
      let json = {
        kwd: this.inputs,
        lng: p.lng,
        lat: p.lat,
        city_name: this.$route.params.city
      };
      $http
        .get(
          "plugin.store-cashier.frontend.store.goods.get-store-goods-by-title",
          json
        )
        .then(response => {
          if (response.result === 1) {
            // console.log("store-goods", response);
            that.stores = response.data;
          } else {
            that.stores = [];
          }
        });
    }
  },

  components: { cStoreList }
};
