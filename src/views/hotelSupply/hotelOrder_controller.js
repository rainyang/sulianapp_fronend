import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

export default {
  data() {
    return {
      info:'',
      data_info:''
    };
  },

  activated() {
    if (this.fun.isTextEmpty(this.$route.params.id)) {
      this.$router.push(this.fun.getUrl("home", {}));
    }
    this.id = this.$route.params.id
    this.getData()
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getData() {
      $http
        .get("plugin.hotel-supply.frontend.hotel-supply.order-info", {
          order_id:this.id
        })
        .then(res => {
          if (res.result == 1) {
            this.data_info = res.data.has_one_hotel;
            this.info=res.data
          }else{
            MessageBox.alert(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToAdress(lng, lat) {
      let point = this.fun.bd_decrypt(
        // this.location.point.lng,
        // this.location.point.lat
        lng,
        lat
      );
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, this.$route.query);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${
          point.lat
          }&destName=${
          this.data_info.name
          }&key=43de56d8e65fe042493541213d9ad7b0`;
      }
    },
  },
  components: { cTitle}
};
