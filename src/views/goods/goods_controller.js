import { mapState } from "vuex";
import cGoods from "components/goods/goods";
import storeGoods from "components/goods/store_goods";
import courseGoods from "components/goods/course";
import supplierGoods from "components/goods/supplier_goods";
import hotelGoods from "components/goods/hotel";
import groupGoods from "components/goods/group_good";
import voiceGoods from "../goods/voice_good/good_detail";
import cartGoods from "components/goods/cart_good";
import { Indicator, Toast, MessageBox } from "mint-ui";
let self = null;

//wx.config(response.data.js); 微信认证
export default {
  data() {
    return {
      goods_info: {},
      is_room: 0,//是否开启直播间推荐
      goods_type: "",
      goods_id: "",
      cGoods: "cGoods",
      storeGoods: "storeGoods",
      courseGoods: "courseGoods",
      supplierGoods: "supplierGoods",
      groupGoods: "groupGoods",
      voiceGoods: "voiceGoods",
      cartGoods: "cartGoods",
      goodsInfo: {
        thumb_url: []
      },
      show8: false, //商家过期显示
      store_id: "", //门店id
      showDis: true, //控制加购的显示
      isComment: false //控制详情页评论组件弹窗显示时，点击or操作物理返回键关闭弹窗（避免直接关闭详情页跳转,因为子组件无法进行路由导航相关操作。。。）
    };
  },
  created() {
    console.log("goods_id:::", this.$route.params.id);
    this.toi = this.fun.getKeyByI();
    this.goods_id = this.$route.params.id;
    // if (this.$route.query.name == "group") {
    //   this.goods_type = "group_goods";
    // } else {
    // this.getData(); //获取数据
    // }
    self = this;
    this.isComment = false;
  },
  activated() {
    console.log("g_active_goods_id:::", this.$route.params.id);
    this.getData();//获取数据
    //区分是否首页跳转进来
    this.isset = localStorage.getItem("isset");
    localStorage.removeItem("isset");
    // this.getCatchHome();
    self = this;
    this.isComment = false;
    if(this.$route.query.liveRoomId){
      //直播间进入
      this.FormLiveRoom(this.$route.query.liveRoomId);
      this.$store.commit("setLiveRoomID", this.$route.query.liveRoomId);
    }
  },
  mounted() {
    console.log("g_mounted");
    console.log("g_mounted_goods_id:::", this.$route.params.id);
    //this.getData();//获取数据
    console.log(this.$route.params, "路由参数");
    this.store_id = this.$route.params.store_id;
    self = this;
    this.isComment = false;
  },
  beforeRouteLeave(to, from, next) {
    // 注意：从商品详情页跳转到商品详情页不触发，to、from不变
    if (self.isComment) {
      if(to.name=='CommentDetails'){
        next();
      }else{
        self.isComment = false;
        next(false);
      }
    } else {
      next();
    }
  },
  methods: {
    //获取数据
    getData() {
      let that = this;
      console.log("goods_id1:::", this.$route.params.id);
      let json = {
        id: this.$route.params.id,
        mid: this.fun.getKeyByMid(),
        mark: this.fun.getKey("mark"),
        mark_id: this.fun.getKey("mark_id"),
        enter_at: this.$route.query.start || "",
        leave_at: this.$route.query.end || "",
        // store_id: this.$route.params.store_id
      };
      $http.post("goods.goods.get-goods-page", json, " ").then(
        function(res) {
          if (res.result === 1) {
            that.goods_type = res.data.goods_type.goods_type;
            if(that.goods_type =="hotelGoods"){
              if( !that.$route.query.start){
                MessageBox({
                  title: "提示",
                  message: "选择入住酒店的时间?",
                  showCancelButton: true
                }).then(action => {
                  if (action == "confirm") {
                    if(res.data.get_hotel_info.goods.hotel_id){
                      that.$router.push(
                        that.fun.getUrl("HotelHome", { id: res.data.get_hotel_info.goods.hotel_id, fromHome: 1 })
                      );
                    }
                  }
                });
              }
            }
            if (res.data.store_id) {
              that.store_id = res.data.goods_type.store_id;
            }
            that.goods_info = res.data;
            that.is_room = res.data.is_room?res.data.is_room:0;
            // let goodsInfo = res.data;
            // that.goods_info = goodsInfo;
            // console.log("goodsInfo9", res.data);
            // console.log("goodsInfo8.store_goods", goodsInfo.store_goods);
            // if (goodsInfo.is_course == 1) {
            //   that.goods_type = "course";
            // } else if (goodsInfo.store_goods) {
            //   that.goods_type = "store_goods";
            // } else if (!that.fun.isTextEmpty(goodsInfo.supplier)) {
            //   that.goods_type = "supplierGoods";
            // } else if (goodsInfo.is_hotel == 1) {
            //   that.goods_type = "hotelGoods";
            // } else {
            //   that.goods_type = "goods";
            //   console.log("111111");
            // }
            console.log("goods_type", that.goods_type);
          } else {
            if (res.msg == "该商家已过期,去看看其他的吧") {
              this.showDis = false;
              this.show8 = true;
            }
            if (!window.firstLogin) {
              MessageBox("提示", res.msg);
              that.$router.go(-1);
            }
          }
        },
        function(res) {
          console.log(res);
        }
      );
    },
    FormLiveRoom(_id){
      $http.post("plugin.room.frontend.live.check-goods",{goods_id:this.$route.params.id,room_id: _id},"").then(response => {
          if (response.result === 1) {
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showCom(data) {
      this.isComment = data;
    }
  },

  watch: {},

  components: {
    cGoods,
    storeGoods,
    courseGoods,
    supplierGoods,
    hotelGoods,
    groupGoods,
    voiceGoods,
    cartGoods
  },

  computed: {}
};
