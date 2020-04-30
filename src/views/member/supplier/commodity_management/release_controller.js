import cTitle from "components/title";
// 上传图片弹信息
import { Indicator,Toast, Field } from "mint-ui";
import BasicInformation from "./children/basicInformation";
import Permissions from "./children/Permissions";
import Discounts from "./children/discount";

export default {
  components: { cTitle ,BasicInformation,Permissions,Discounts},
  data() {
    return {
      DataInfo: [],//数据
      isQuesetOk: false,//数据获取成功
      GoodSetData: [],//获取门店商品相关信息

      postJson: {},//请求参数

      titleTest: '商品发布',
      isType: false,//是否为商品发布
      showCoverLayer: false,//是否显示遮盖层

      Signthree: 0,

      //选择分类
      options: [],
      selectedOptions3: [],
      sectionOptions: [],
      jumpState: true,
      number: 1,

	    show1: false,
	    show2: false,
	    checkbox3: ['2'],
	    radio1: 1,
	    radio: '1',
	    list: ['a', 'b', 'c'],   //引用组件,
      result: ['a', 'b'],

      isShowprivilege: false,
      isShowdiscount: false,
    };
  },
  activated() {
    this.init();
    //this.getGoodSetting();
    this.isType = this.fun.isTextEmpty(this.$route.params.goods_id);//return true为商品发布
    this.getGoodsJson();
    this._setTitle();
  },
  mounted(){
    if(this.$route.params.store == 'store'){
      let mainHight = document.body.clientHeight;
      document.getElementById('navContetH').style.height = (mainHight-40) + 'px'
      document.getElementById('navId').style.height = (mainHight-40) + 'px'
    }
  },
  updated(){
    // console.log("进入updated",this.isShowprivilege,this.isShowdiscount)
  },
  methods: {
     //初始数据
     init() {
       this.DataInfo = []
       this.GoodSetData = []
       this.isQuesetOk = false
       this.postJson = {}
    },
    //设置标题
    _setTitle() {
      if (!this.isType){
        this.fun.setWXTitle("商品编辑");
        this.titleTest = "编辑";
      }else {
        this.titleTest = "发布";
      }
    },
    //显示遮盖层
    isCoverLayer(data) {
      this.showCoverLayer = data;
    },
    //合并子组件json
    getChildoneData(json){
      this.postJson = Object.assign(this.postJson, json);
    },
    //获取数据
    getGoodsJson() {
      let that = this;
      var urls = "";
      var json = {};
      if (!that.isType){
        //console.log('不为空，当前为编辑，goods_id：',that.$route.params.goods_id)
        if (that.$route.params.store == "store") {
          urls = "plugin.store-cashier.frontend.store.goods.get-goods-detail";
          json = { goods_id: that.$route.params.goods_id };
        } else if (that.$route.params.store == "supplier") {
          urls = "plugin.supplier.frontend.goods.goods-detail";
          json = { goods_id: that.$route.params.goods_id };
        }

        $http.post(urls, json,"加载中").then(
          function(response) {
            if (response.result === 1) {
              that.DataInfo = response.data;
              //console.log(that.isQuesetOk)
              if(that.$route.params.store == "store"){
                that.getGoodSetting();
              }else{
                that.isQuesetOk = true;
              }
              //that.isQuesetOk = true;
              //console.log('获取商品编辑数据',that.isQuesetOk,that.DataInfo)
            } else {
              that.$notify(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        )
      } else {
        if(that.$route.params.store == "store"){
          that.getGoodSetting();
        }else{
          that.isQuesetOk = true;
        }
        console.log('goods_id为空，当前为商品发布')
      }
    },
    // 获取权限与折扣的开启，会员等级/分组
    getGoodSetting(){
      let that = this;
      $http.post('plugin.store-cashier.frontend.store.goods.get-store-goods-setting', {},"加载中").then(
        function(response) {
          if (response.result === 1) {
            that.isQuesetOk = true;
            that.GoodSetData = response.data;

            if(response.data.goods_widgets.tab_privilege =='1'){
              that.isShowprivilege = true
            }
            if(response.data.goods_widgets.tab_discount =='1'){
              that.isShowdiscount = true
            }
            // console.log("getGoodSetting Data",response.data)
          } else {
            // console.log("getGoodSetting error",response.msg)
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    getSignthree(a){
      this.Signthree=a
    },
    //确认发布/编辑按钮
    publishEvent() {
      let that = this;
      let urls = "";
      let json = {};

      that.$refs.mychild.parentHandleclick();
      if(that.$route.params.store == "store"){
        if(that.isShowprivilege){
          that.$refs.mychildTwo.PermissionsJson();
        }
        if(that.isShowdiscount){
          that.$refs.mychildThree.DiscountJson();
        }

      }
      json = that.postJson
      // let PARAMS_OK = this.Signone&&this.Signtwo&&this.Signthree;
      if(this.fun.isTextEmpty(json.title)){
        Toast('请填写商品名称')
        return
      }
      if(this.fun.isTextEmpty(json.sku)){
        Toast('请填写商品单位')
        return
      }
      if(this.fun.isTextEmpty(json.category_cid )){
        Toast('请填写商品分类')
        return
      }
      if(this.fun.isTextEmpty(json.thumb)){
        Toast('请上传商品图片')
        return
      }
      if(this.fun.isTextEmpty(json.good_content)){
        if(this.isType){
          Toast('请上传商品详情图片')
          return
        }
      }
      if(this.fun.isTextEmpty(json.thumb_url)){
        Toast('请上传商品其他图片')
        return
      }
      if(this.fun.isTextEmpty(json.price)){
        Toast('请填写商品现价')
        return
      }
      if(this.fun.isTextEmpty(json.market_price)){
        Toast('请填写商品原价')
        return
      }
      if(this.fun.isTextEmpty(json.cost_price)){
        Toast('请填写商品成本价')
        return
      }
      if(this.fun.isTextEmpty(json.stock)){
        Toast('请填写库存')
        return
      }

      if(that.$route.params.store == "store"){
        if(that.isShowprivilege){
          if(this.fun.isTextEmpty(json.show_levels)){
            Toast('请选择会员等级浏览权限')
            return
          }
          if(this.fun.isTextEmpty(json.buy_levels)){
            Toast('请选择会员等级购买权限')
            return
          }
          if(this.fun.isTextEmpty(json.show_groups)){
            Toast('请选择会员组浏览权限')
            return
          }
          if(this.fun.isTextEmpty(json.buy_groups)){
            Toast('请选择会员组购买权限')
            return
          }
          if(this.fun.isTextEmpty(json.once_buy_limit)){
            Toast('请输入每次限购数量')
            return
          }
          if(this.fun.isTextEmpty(json.total_buy_limit)){
            Toast('请输入会员限购总数')
            return
          }
          if(this.fun.isTextEmpty(json.day_buy_limit)){
            Toast('请输入会员每天限购总数')
            return
          }
          if(this.fun.isTextEmpty(json.week_buy_limit)){
            Toast('请输入会员每周期限购数量')
            return
          }
          if(this.fun.isTextEmpty(json.month_buy_limit)){
            Toast('请输入会员每月限购数量')
            return
          }
        }
        if(that.isShowdiscount){
          //console.log("折扣测试",Object.keys(json.discount_value).length)
          if(Object.keys(json.discount_value).length=='0'){
            Toast('请填写各等级折扣')
            return
          }
          if(Object.keys(json.discount_value).length< this.Signthree) {
            Toast('等级折扣填写不完整')
            return
          }
        }
      }

      if(this.isType) {
        //商品发布的提交 GET
        if (that.$route.params.store == "store") {
          urls = "plugin.store-cashier.frontend.store.goods.add-goods";
        }else if(that.$route.params.store == "supplier"){
          urls = "plugin.supplier.frontend.goods.add-goods";
        }
      }else {
        //商品编辑的提交 POST
        json.goods_id = that.$route.params.goods_id;
        if (that.$route.params.store == "store") {
          urls = "plugin.store-cashier.frontend.store.goods.edit-goods";
        }else if(that.$route.params.store == "supplier"){
          urls = "plugin.supplier.frontend.goods.edit-goods";
        }
      }
      // console.log("这是总的json",json)
      $http.post(urls, json,'正在上传中').then(
        function(response) {
          if (response.result === 1) {
            Indicator.close();
            that.$router.go(-1);
            that.$notify({
              // background: "#f0f9eb",
              message: "上传成功",
              // color: "#67c23a"
            });
          } else {
            that.$notify(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    }
   },
}
