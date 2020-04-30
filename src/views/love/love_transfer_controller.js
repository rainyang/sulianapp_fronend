import cTitle from "components/title";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      // bool	转让倍数，为1则不限制
      transfer_multiple: 0,
      // 转让最小额，为0则不限制
      transfer_fetter: 0,
      //爱心转账值
      recharge_value: undefined,
      //爱心会员ID
      recharge_id: undefined,
      //输入搜索值
      recharge_search: "",
      // 转让手续费比率
      ratio: 0,
      // 实际到账数
      arrival_count: 0,
      buttonOff: true, //默认禁止提交
      love_name: "", //爱心值自定义名称
      usable: 0, // 登陆会员可用爱心值
      showSearch: false,
      search_list: "", //搜索会员ID结果
      timeoutId: null,
      memberInfo: {
        nickname: "",
        realname: ""
      }
    };
  },
  methods: {
    checkTransfer() {
      let num = 0;
      if (!Number(this.transfer_multiple)) {
        num = 1;
      } else {
        num = Number(this.transfer_multiple);
      }
      if (this.recharge_value < Number(this.transfer_fetter)) {
        MessageBox.alert("转账值不能小于" + Number(this.transfer_fetter));
      } else if (Number(this.recharge_value) % num !== 0) {
        console.log(
          Number(this.recharge_value),
          Number(this.transfer_multiple)
        );
        MessageBox.alert("转账值需要为" + this.transfer_multiple + "整数倍！");
      }
    },
    throttleFn(event) {
      // clearTimeout方法，以便控制连续触发带来的无用调用
      if (this.timeoutId) {
        clearTimeout(this.timeoutId); // 先清除之前的延时，并在下面重新开始计算时间
      }
      let that = this;
      this.timeoutId = setTimeout(function() {
        // 100毫秒以后执行方法
        that.searchTransfer(event);
      }, 500); // 如果还没有执行就又被触发，会根据上面的clearTimeout来清除并重新开始计算
    },
    searchTransfer(event) {
      var reSearch = event.target.value;
      this.recharge_id = "";
      if (reSearch) {
        $http
          .get(
            "plugin.love.Frontend.Controllers.team-dividend-search.index",
            { search: reSearch },
            "数据加载中"
          )
          .then(response => {
            var searchList = [];
            this.search_list = "";
            if (response.result === 1) {
              var data = response.data[0];
              if (data) {
                this.memberInfo.nickname = data.username ? data.username : "";
                this.memberInfo.realname = data.nickname ? data.nickname : "";
                this.recharge_id = reSearch;
                this.showSearch = false;
                return;
              }
              // searchList = data.map(function(val, idx) {
              //   return {
              //     nickname: val.nickname,
              //     id: val.uid
              //   };
              // });
              this.showSearch = true;
              // this.search_list = searchList;
            } else {
              this.showSearch = true;
              this.search_list = response.msg;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.showSearch = false;
        this.search_list = [];
      }
    },
    searchTransfer_1() {
      var reSearch = this.recharge_search;
      this.recharge_id = "";
      if (reSearch) {
        $http
          .get(
            "plugin.love.Frontend.Controllers.team-dividend-search.index",
            { search: reSearch },
            "数据加载中"
          )
          .then(response => {
            var searchList = [];
            if (response.result === 1) {
              var data = response.data[0];
              if (data) {
                this.memberInfo.nickname = data.username ? data.username : "";
                this.memberInfo.realname = data.nickname ? data.nickname : "";
                this.recharge_id = reSearch;
                this.showSearch = false;
                return;
              }
              // searchList = data.map(function(val, idx) {
              //   return {
              //     nickname: val.nickname,
              //     id: val.uid
              //   };
              // });
              this.showSearch = true;
              // this.search_list = searchList;
            } else {
              this.showSearch = true;
              this.search_list = response.msg;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.showSearch = false;
        this.search_list = [];
      }
    },
    makeTransfer(event) {
      var jid = event.target.dataset.jid;
      var name = event.target.dataset.name;
      this.recharge_id = jid;
      this.recharge_search = name;
      this.showSearch = false;
    },
    initData() {
      this.recharge_id = "";
      this.recharge_search = "";
      this.recharge_value = "";
      this.usable = 0;
      this.showSearch = false;
      this.search_list = [];
      this.memberInfo = {
        nickname: "",
        realname: ""
      };
    },

    getUsable() {
      $http
        .get("plugin.love.Frontend.Controllers.page.index", {}, "加载中")
        .then(
          response => {
            if (response.result === 1) {
              this.usable = response.data.usable;
              this.love_name = response.data.love_name;
              this.ratio = response.data.transfer_proportion;
              this.transfer_multiple = response.data.transfer_multiple;
              this.transfer_fetter = response.data.transfer_fetter;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response);
          }
        );
    },

    getBalance() {
      let that = this;
      //recipient 被转让者ID
      //change_value 转让爱心值
      if (!this.recharge_search) {
        Toast("请输入会员ID/手机号/昵称");
        return;
      }
      if (!this.recharge_value) {
        Toast("请输入您要转账的数额");
        return;
      }
      $http
        .get(
          "plugin.love.Frontend.Modules.Love.Controllers.transfer.index",
          {
            recipient: this.recharge_id,
            change_value: this.recharge_value
          },
          "加载中"
        )
        .then(
          response => {
            if (response.result === 1) {
              MessageBox.alert(response.msg);
              that.$router.go(-1);
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            MessageBox.alert(response);
          }
        );
    }
  },

  watch: {},
  activated() {
    this.getUsable();
    this.initData();
  },
  components: { cTitle }
};
