import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';

const STORE_INFO_URL = "plugin.store-cashier.frontend.boss.child-store.index";
const STORE_ORDER_URL = "plugin.store-cashier.frontend.boss.child-store.getStoreOrderList";
const CASHIER_ORDER_URL = "plugin.store-cashier.frontend.boss.child-store.getCashierOrderList";
const AUDIO_IS_OPEN = "plugin.store-cashier.frontend.boss.voice-broadcast.verifyOpenAudio";
const GET_AUDIO_URL = "plugin.store-cashier.frontend.boss.voice-broadcast.index";
var intervalid;

export default {
  data() {
    return {
      store_info: {},
      store_count: {},
      tabArr: [
        "门店订单",
        "收银台订单"
      ],
      currentIndex: 0,
      store_order_show: true,
      cashier_order_show: false,

      //门店订单
      storeList: [],
      store_loading: false,
      store_allLoaded: false,
      store_goload: true,
      store_isLoadMore: true,
      store_page: 1,
      store_total_page: 0,

      //收银台订单
      cashierList: [],
      cashier_loading: false,
      cashier_allLoaded: false,
      cashier_goload: true,
      cashier_isLoadMore: true,
      cashier_page: 1,
      cashier_total_page: 0,

      //语音播报
      vedioSrc: "",
      income_name_text: "",
    }
  },

  activated() {
    this.initData();
    this.getStoreInfo();
    this.getStoreList();
    this.isOpenAudio();
    this.customizeIncome();
    this.$nextTick(() => {
      //this.audioPlay();

      this.autoClick();
    })

  },

  mounted() {

  },
  deactivated() {
    this.closeTimeInterval();
  },
  methods: {

    initData() {
      this.currentIndex = 0;
      this.store_order_show = true;
      this.cashier_order_show = false;
      this.store_info = {};
      this.store_count = {};
      this.tabArr = ["门店订单", "收银台订单"];
      this.vedioSrc = "";
      this.initStoreData();
      this.initCashierData();
    },
    getStoreInfo() {
      $http.get(STORE_INFO_URL, { store_id: this.$route.params.id }, "加载中...").then(res => {
        if (res.result == 1) {
          this.store_info = res.data.store;
          this.store_count = res.data.statistics;
          this.getCashierList(this.store_info.cashier_id);
        }
      }).catch(error => {
        console.log(error);
      })
    },

    toggle(index) {
      this.currentIndex = index;
      if (index == 0) {
        this.store_order_show = true;
        this.cashier_order_show = false;
      } else {
        this.store_order_show = false;
        this.cashier_order_show = true;
      }

    },

    //门店
    initStoreData() {
      this.storeList = [];
      this.store_loading = false;
      this.store_allLoaded = false;
      this.store_goload = true;
      this.store_isLoadMore = true;
      this.store_page = 1;
      this.store_total_page = 0;
    },

    getStoreList() {
      $http.get(STORE_ORDER_URL, { store_id: this.$route.params.id, page: this.store_page }).then(res => {
        if (res.result == 1) {
          console.log(res);
          this.storeList = res.data.data;
          this.store_total_page = res.data.last_page;
        }
      }).catch(error => {
        console.log(error);
      })
    },

    getMoreStoreList() {
      if (this.store_page == this.store_total_page) {
        return;
      }
      if (this.store_page >= this.store_total_page) {
        this.store_loading = true;
        this.store_allLoaded = true;
        return;
      } else {
        this.store_page = this.store_page + 1;
        $http.get(STORE_ORDER_URL, { store_id: this.$route.params.id, page: this.store_page }, '加载中...').then(res => {
          if (res.result == 1) {
            this.store_loading = false;
            this.store_allLoaded = false;
            this.storeList = this.storeList.concat(res.data.data);//数组拼接

          } else {
            this.store_page = this.store_page - 1;
            this.store_loading = true;
            this.store_allLoaded = true;
            this.store_isLoadMore = false;
            return;
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    storeLoadTop() {
      this.initStoreData();
      this.getStoreList();
      this.$refs.store_loadmore.onTopLoaded();
    },

    storeLoadBottom() {
      if (this.store_isLoadMore) {
        this.getMoreStoreList();
        this.$refs.store_loadmore.onBottomLoaded();
      } else {
        console.log('没有更多数据');
      }
    },

    //收银台
    initCashierData() {
      this.cashierList = [];
      this.cashier_loading = false;
      this.cashier_allLoaded = false;
      this.cashier_goload = true;
      this.cashier_isLoadMore = true;
      this.cashier_page = 1;
      this.cashier_total_page = 0;
    },
    getCashierList(id) {
      $http.get(CASHIER_ORDER_URL, { cashier_id: id, page: this.cashier_page }).then(res => {
        if (res.result == 1) {
          console.log(res);
          // res.data.data.forEach(element => {
          //   this.cashierList.push(element.order);
          // });
          this.cashierList = res.data.data;
          console.log(this.cashierList);
          this.cashier_total_page = res.data.last_page;
        }
      }).catch(error => {
        console.log(error);
      })
    },

    getMoreCashierList() {
      if (this.cashier_page == this.cashier_total_page) {
        return;
      }
      if (this.cashier_page >= this.cashier_total_page) {
        this.cashier_loading = true;
        this.cashier_allLoaded = true;
        return;
      } else {
        this.cashier_page = this.cashier_page + 1;
        $http.get(CASHIER_ORDER_URL, { cashier_id: this.store_info.cashier_id, page: this.cashier_page }, '加载中...').then(res => {
          if (res.result == 1) {
            this.cashier_loading = false;
            this.cashier_allLoaded = false;
            this.cashierList = this.cashierList.concat(res.data.data);//数组拼接

          } else {
            this.cashier_page = this.cashier_page - 1;
            this.cashier_loading = true;
            this.cashier_allLoaded = true;
            this.cashier_isLoadMore = false;
            return;
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    cashierLoadTop() {
      this.initCashierData();
      this.getCashierList(this.store_info.cashier_id);
      this.$refs.cashier_loadmore.onTopLoaded();
    },

    cashierLoadBottom() {
      if (this.cashier_isLoadMore) {
        this.getMoreCashierList();
        this.$refs.cashier_loadmore.onBottomLoaded();
      } else {
        console.log('没有更多数据');
      }
    },

    //语音播报
    isOpenAudio() {
      $http.get(AUDIO_IS_OPEN, { store_id: this.$route.params.id }).then(res => {
        if (res.result == 1) {
          if (res.data.audio_open == 1) {
            this.getAudio();
          }
        } else {
          MessageBox.alert(res.msg);
        }
      }).catch(error => {
        console.log(error);
      })
    },

    getAudio() {
      intervalid = setInterval(() => {
        $http.get(GET_AUDIO_URL, { store_id: this.$route.params.id }).then(res => {
          if (res.result == 1) {
            this.vedioSrc = res.data.url;
            this.$nextTick(() => {
              this.audioPlay();
            })
          }
        }).catch(error => {
          console.log(error);
        })
      }, 5000)

    },

    audioPlay() {
      var that = this;
      let json = {
        url: document.location.href
      }
      $http.post('member.member.wxJsSdkConfig', json).then(res => {
        if (res.result == 1) {

          // var bgAudio = document.getElementById('yp');
          // console.log(bgAudio);
          // bgAudio.load();
          // bgAudio.play();
          wx.config(res.data.config);
          wx.ready(function () {
            var bgAudio = document.getElementById('yp');
            bgAudio.load();
            bgAudio.play();

            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
              bgAudio.load();
              bgAudio.play();
            });

          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    closeTimeInterval() {
      console.log("dsdsdsdsds");
      clearInterval(intervalid)
    },

    autoClick() {
      if (document.all) {
        document.getElementById("chain_shop").click();
      } else {// 其它浏览器
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", false, true);
        document.getElementById("chain_shop").dispatchEvent(e);
      }
    },

    show() {
      var bgAudio = document.getElementById('yp');
      bgAudio.load();
      bgAudio.play();
    },
    //自定义提现收入语言
    customizeIncome(){
      let mailLanguage = this.fun.initMailLanguage()
      //自定义收入字段
      this.income_name_text = mailLanguage.income.income_name;
    }
  },
  components: { cTitle }
}