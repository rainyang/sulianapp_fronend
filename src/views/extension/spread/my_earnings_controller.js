import cTitle from 'components/title';
import {Toast} from 'mint-ui';

export default {
  data() {
    return {
      all_amount: []
    }
  },
  activated() {
    this.getData();
  },
  methods: {
    toEarningList(item) {
      this.$router.push(this.fun.getUrl('earningList', {}, {plugin_type: item.type}));
    },
    getData() {
      const that = this;
      $http.get("finance.plugin-settle.plugin-list", {}, "...").then(response => {
        if (response.result === 1) {
          that.all_amount = response.data;
        }
      }).catch(error => {
        Toast(error);
      })
    },
  },
  components: {cTitle}
}