import cTitle from "components/title";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      item: "",
      //余额字样
      balanceLang: this.fun.getBalanceLang()
    };
  },
  methods: {},
  activated() {
    this.toi = this.fun.getKeyByI();
    this.item = this.$route.params.item;
    this.fun.setWXTitle(this.balanceLang+'详情');
  },
  components: { cTitle }
};
