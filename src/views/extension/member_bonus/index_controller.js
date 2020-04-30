import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

const INFO_URL = "plugin.scoring-dividend.api.scoring-dividend.index";
const BONUS_URL =
  "plugin.scoring-dividend.api.scoring-dividend.dividend-record";
const RECORD_URL = "plugin.scoring-dividend.api.scoring-dividend.reward-record";

export default {
  data() {
    return {
      //插件名字
      title: "",
      //头像
      avatar: "",
      //昵称
      nickname: "",
      //等级
      level: "",
      //计分金额
      amount: "",
      //分销佣金
      distribution_commission: "",
      //店补分红
      shop_bonus: "",
      //感恩奖
      thanks_award: "",
      //分销佣金--list
      dc_list: [],
      //店补分红--list
      sb_list: [],
      //感恩奖--list
      ta_list: [],

      tab1_arr: [],
      tab1_arr_index: 0,
      tab2_arr_index: 0,
      bonus_show: true,
      record_show: false,
      type: 1,

      page: 1,
      total_page: 0,
      isLoading: false,
      allLoaded: false,

      record_list: [],
      record_page: 1,
      record_total_page: 0,
      record_isLoading: false,
      record_allLoaded: false
    };
  },

  activated() {
    this.initData();
    this.getInfo();
    this.getBonusList();
    this.getRecordList();
  },

  mounted() {},
  methods: {
    tab1Toggle(index) {
      console.log(index);
      if (this.tab1_arr_index == index) {
        return;
      } else {
        this.tab1_arr_index = index;
        if (index == 0) {
          this.bonus_show = true;
          this.record_show = false;
        } else if (index == 1) {
          this.bonus_show = false;
          this.record_show = true;
        } else {
          return;
        }
      }
    },
    //初始化数据
    initData() {
      this.title = "";
      this.avatar = "";
      this.nickname = "";
      this.level = "";
      this.amount = "";
      this.distribution_commission = "";
      this.shop_bonus = "";
      this.thanks_award = "";
      this.tab1_arr = ["分红记录", "消费奖励"];
      this.tab1_arr_index = 0;
      this.bonus_show = true;
      this.record_show = false;
      this.tab2_arr_index = 0;

      this.dc_list = [];
      this.sb_list = [];
      this.ta_list = [];
      this.type = 1;
      this.page = 1;
      this.total_page = 0;
      this.isLoading = false;
      this.allLoaded = false;

      this.record_list = [];
      this.record_page = 1;
      this.record_total_page = 0;
      this.record_isLoading = false;
      this.record_allLoaded = false;
    },
    tabHandel(index) {
      if (this.tab2_arr_index == index) {
        return;
      } else {
        this.tab2_arr_index = index;
        switch (index) {
          case 0:
            this.type = 1;
            break;
          case 1:
            this.type = 2;
            break;
          case 2:
            this.type = 3;
            break;
          default:
            break;
        }
        this.initListData();
        this.getBonusList();
      }
    },

    getInfo() {
      $http
        .get(INFO_URL, {}, "加载中...")
        .then(res => {
          if (res.result == 1) {
            this.avatar = res.data.member.has_one_member.avatar_image;
            this.nickname = res.data.member.has_one_member.nickname;
            this.level = res.data.member.level_name;
            this.amount = res.data.scoring_amount;
            this.title = res.data.name;
            res.data.dividend_amount.forEach(item => {
              if (item.type == 1) {
                this.distribution_commission = `分销佣金（${
                  item.dividend_amount
                }）`;
              } else if (item.type == 2) {
                this.shop_bonus = `店补分红（${item.dividend_amount}）`;
              } else if (item.type == 3) {
                this.thanks_award = `感恩奖（${item.dividend_amount}）`;
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    initListData() {
      this.page = 1;
      this.total_page = 0;
      this.isLoading = false;
      this.allLoaded = false;
    },

    getBonusList() {
      $http
        .get(BONUS_URL, { type: this.type, page: this.page }, "加载中...")
        .then(res => {
          if (res.result == 1) {
            switch (this.type) {
              case 1:
                this.dc_list = this.handelListData(res.data.data);
                break;
              case 2:
                this.sb_list = this.handelListData(res.data.data);
                break;
              case 3:
                this.ta_list = this.handelListData(res.data.data);
                break;
              default:
                break;
            }
            this.total_page = res.data.last_page;
            this.isLoading = false;
            if (this.page == res.data.last_page) {
              this.allLoaded = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getMoreBonusList() {
      if (this.allLoaded) {
        return;
      }

      this.page = this.page + 1;

      $http
        .get(BONUS_URL, { type: this.type, page: this.page }, "加载中...")
        .then(res => {
          if (res.result == 1) {
            switch (this.type) {
              case 1:
                this.dc_list = this.dc_list.concat(
                  this.handelListData(res.data.data)
                );
                break;
              case 2:
                this.sb_list = this.sb_list.concat(
                  this.handelListData(res.data.data)
                );
                break;
              case 3:
                this.ta_list = this.ta_list.concat(
                  this.handelListData(res.data.data)
                );
                break;
              default:
                break;
            }
            this.isLoading = false;
            if (this.page == res.data.last_page) {
              this.allLoaded = true;
            }
          } else {
            this.page = this.page - 1;
            this.isLoading = false;
            this.allLoaded = false;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    handelListData(arr) {
      arr.forEach(item => {
        item["show"] = false;
      });

      return arr;
    },

    initRecordListData() {
      this.record_page = 1;
      this.record_total_page = 0;
      this.record_isLoading = false;
      this.record_allLoaded = false;
    },

    getRecordList() {
      $http
        .get(RECORD_URL, { page: this.record_page })
        .then(res => {
          if (res.result == 1) {
            this.record_list = res.data.data;
            this.record_total_page = res.data.last_page;
            this.record_isLoading = false;
            if (this.record_page == res.data.last_page) {
              this.record_allLoaded = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getMoreRecordList() {
      $http
        .get(RECORD_URL, { page: this.record_page })
        .then(res => {
          if (res.result == 1) {
            this.record_list = this.record_list.concat(res.data.data);
            this.record_isLoading = false;
            if (this.record_page == res.data.last_page) {
              this.record_allLoaded = true;
            }
          } else {
            this.record_page = this.record_page - 1;
            this.record_isLoading = false;
            this.record_allLoaded = false;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: { cTitle }
};
