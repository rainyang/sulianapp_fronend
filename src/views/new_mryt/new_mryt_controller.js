import cTitle from "components/title";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      member: {},
      reward: [],
      level: [],
      setLang: "",
      //团队数据
      teamData: [],
      team_cost_count: "",
      direct_cost_count: ""
    };
  },
  activated() {
    this.initData();
    this.getData();
  },
  methods: {
    toReward(item) {
      this.$router.push(
        this.fun.getUrl(
          "newAwardRecord",
          { fromHome: 1 },
          {
            reward_name: item.reward_name,
            name: item.type
          }
        )
      );
    },
    initData() {
      this.member = {};
      this.reward = [];
      this.level = [];
      this.setLang = "";
      //团队数据
      this.teamData = [];
      this.team_cost_count = "";
      this.direct_cost_count = "";
    },
    getData() {
      const that = this;
      $http.get("plugin.ozy.frontend.index.index", {}, "").then(
        function(response) {
          if (response.result === 1) {
            that.level = response.data.level;
            that.member = response.data.member;
            that.reward = response.data.reward;
            //团队数据
            that.teamData = response.data.team;
            that.teamData.forEach((item, index, key) => {
              if (item.hasOwnProperty("level")) {
                item.count = item.level;
                item.name = `团队${item.level_name}`;
              }
              if (item.hasOwnProperty("direct")) {
                item.count = item.direct;
                item.name = `直推${item.level_name}`;
              }
            });
            that.team_cost_count = response.data.all;
            that.direct_cost_count = response.data.direct_all;
            that.setLang = response.data.set_name;
            that.fun.setWXTitle(that.setLang);
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    gotoTeamDataCount(obj) {
      let json;
      if (obj.hasOwnProperty("level")) {
        json = {
          team: obj.level_id,
          direct: 0
        };
      }
      if (obj.hasOwnProperty("direct")) {
        json = {
          team: obj.level_id,
          direct: 1
        };
      }
      this.$router.push(this.fun.getUrl("newTeamDataCount", json));
    },
    toAll() {
      let json = {
        team: -1,
        direct: 0
      };
      this.$router.push(this.fun.getUrl("newTeamDataCount", json));
    },
    toDirect() {
      let json = {
        team: -1,
        direct: 1
      };
      this.$router.push(this.fun.getUrl("newTeamDataCount", json));
    }
  },
  components: { cTitle }
};
