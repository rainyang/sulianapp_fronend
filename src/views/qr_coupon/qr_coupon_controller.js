//window.localStorage.isWeiXin
import cTitle from "components/title";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      goods:{},
      coupon:{},
      shop_logo:''
    };
  },

  components: {
    cTitle
  },
  mounted() {},

  methods: {
    //日期转化
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = this.change(date.getDate()) + " ";
      let h = this.change(date.getHours()) + ":";
      let m = this.change(date.getMinutes());
      return Y + M + D + h + m;
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
   //获取链接上的某个参数的值
   getQueryString(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
  toDetail(){
    if(this.goods.status==0){
      Toast('商品已下架')
       this.$router.push(this.fun.getUrl("home"));
       return 
    }else{
      this.$router.push(this.fun.getUrl("goods", { id: this.goods.id }));
    }
  },
  //获取数据
  getData() {
    let json = {
      goods_id: this.getQueryString("goods_id"),
      member_coupon_id:this.getQueryString("member_coupon"),
    };
    $http
      .get(
        "plugin.coupon-qr.api.index.index",
        json,
        "获取中"
      )
      .then(response => {
        if (response.result == 1) {
          this.coupon=response.data.coupon;
          this.goods=response.data.goods;
          this.shop_logo=response.data.shop_logo;
          if(this.coupon.coupon_status==1&&this.goods.status==0){
             Toast('商品已下架')
             MessageBox.alert("优惠券已被领取");
             this.$router.push(this.fun.getUrl("home"));
             return 
          }else if(this.coupon.coupon_status==1&&this.goods.status==1){
              Toast('优惠券已被领取')
             this.$router.push(this.fun.getUrl("goods", { id: this.goods.id }));
             return 
          }
        } else {
          Toast(response.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  },
  activated() {
    this.getData();
  }
};
