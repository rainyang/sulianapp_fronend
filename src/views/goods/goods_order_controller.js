import cTitle from "components/title";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast, Navbar, TabItem } from "mint-ui";
import { Switch } from "mint-ui";

import { Field } from "mint-ui";
import { Picker } from "mint-ui";
import { MessageBox } from "mint-ui";
// import District from "src/gov_province_city_area_id";
import cDyPopup from './diyFormPopup';

const TAG_ACTION_BUY = "-2"; // 直接购买
const TAG_ACTION_CART = "-1"; // 1购物车结算
var _root_tag = ""; // 0 直接购买 1购物车结算
var _goodsId = "";
var _optionsId = "";
var _total = 1;
var currentAddId = "";
var currentAddress = {};
var _cart_ids = [];
var _packagJson = {};

var clicktag = 0;
var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')

export default {
  data() {
    return {
      orderFirst: 0,
      radio1: "1",
      show1: false,
      order_data: "",
      integral: window.localStorage.integral,
      onclast: false,
      goodsInfo: {},
      order: {},
      realname: "", // 收件人
      mobile: "",
      address: "",
      goods: [],
      goods_price: 0,
      dispatch_price: 0,
      price: 0,
      discount_price: 0,
      popupSpecs: false,
      addressData: [],

      // 优惠券
      popupCouponSpecs: false,
      coupon_size: 0,
      checkCouponList: [],
      use_coupon_size: 0,

      // 积分抵扣 其他抵扣
      checkDeductionList: [],

      // 新增地址v2------------------------------------------------新增地址v2//
      form: {
        username: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        street: "",
        address: "",
        isDefault: false
      },
      district: district, // 地址本地数据
      popAddAddress: false,
      addressShow: false,
      addressName: "", // 地址区域
      strShow: false, // 街道显示
      streetShow: false, // 街道pop
      // 新增地址v2------------------------------------------------新增地址v2//

      // 跨境
      isTaxGoods: false,
      member_name: "",
      member_card: "",
      popupMemberSpecs: false,
      explain_title: "",
      explain_content: "",

      // O2O部分
      storeCarts: [],
      store_id: 0,
      selected: 0,
      store_info: {},
      linkinfo: {
        mobile: "",
        name: ""
      },
      dispatch: [],

      // 个人信息和修改
      myRealname: "",
      myIdcard: "",
      showMyinfo: false,

      // 租赁商品标识
      isRent: false,

      // 权益商品选择列表
      checkList: [],

      // 是否选择权益商品
      isRightChoose: false,

      // 租期
      rentTime: [],

      // 可以免租的件数
      rentFree: "",

      // 是否开启会员权益开关
      isOpenRight: false,

      currentIndex: "999",

      // 同意租赁协议
      agreement: false,

      agreementShow: false,

      // 是否显示支付协议
      AgreementPay: "",
      // 同意支付协议
      agreementPay: false,
      // 支付协议
      agreementPayShow: false,

      // 租赁协议
      agreeCon: {},

      // 免押件数
      rent_deposit_free: 0,

      // 免租件数

      rent_free: 0,

      // 优惠券标识

      cup_notice: true,
      submit_active: true,
      isResize: false,

      defaultAddress: {},
      create: true,

      // 留言
      note: [],

      // 发票
      isShowInvoice: true,
      // showInvoiceTitle: '',
      // invoicename: '',
      // companyname: '',
      invoice_status: true,
      papery_status: "",
      electron_status: "",
      person_status: true,
      unit_status: false,
      iscur: true,
      iscur_b: false,
      iscur_c: true,
      iscur_d: false,
      // invoiceType: "",
      invoice_list: {
        call: "",
        company_number: ""
      },
      show_address: true,
      recipient_name: "",
      recipient_mobile: "",

      // 续费商品
      goods_id: "",
      // 添加的name
      priceInfo: {},
      dispatchInfo: {},
      deductionInfo: {},
      total_items: [],
      discount_amount_items: [],
      popupDistribution: false, //配送站弹窗是否显示

      //判断是否已经请求了支付协议接口
      isGetAgreementPay: false,

      //服务费
      service: {},

      isShowDistributionStation: false, //是否显示配送站模块
      DistributionSelect: "6",
      DistributionInfo: [], //配送站列表
      DistributionModel: {
        delivery_name: "",
        has_one_member: {
          mobile: ""
        },
        full_address: "",
        address: "",
        method_name: [
          { name: "送货上门", code: "6" },
          { name: "到店自提", code: "5" }
        ]
      }, //配送站弹窗选中
      distributionUserName: "",
      distributionUserMobile: "",

      isReplensishment: false, //是否为配送站的补货订单

      isOpenTeam: false, //是否为一键开团
      isJoinTeam: false, //是否为去参团

      pdOrderType: [{ name: "自用", code: "1" }], //pending_order_type使用类型：0：零售 1：自用
      POChooseType: "1",

      isPhoto: false, //开启相册商品，true为相册商品
      fileList1: [], //相册路径链接
      fileList2: [],
      show: false, //图片预览组件为true显示
      imgIndex: 1, //相册图片预览起始位置
      checkedImg: true, //true为开启微信相册
      max_count: 9, //最大上传张数
      min_count: 1, //最小上传张数
      photosize: 1024 * 1024 * 30,
      storeNo_photo: false,

      is_open_package_deliver: false, //是否开启自提点（杨朗）
      selfCarrySelected: "",
      selfCarryType: [],
      defaultSelfCarry: "",
      isQuest_ing: true, //是否正在请求数据中
      isShowDiyForm: false, //是否开启自定义表单
      diyform_id: 0,
      form_data_id: "", //提交自定义表单后返回的表单id，
      diyTitle: "", //自定义表单名称
      deliverName:'',//自提点自定义名称

      dyFormPopup: false,
      dfData:{},
      goodDYDormID: null,
      activeDYGoodID:null,
      activeFormDataID: null,
      dyDescription: null,
      dyTiitle: '',
      dyThumb:null//表单图片
    };
  },

  activated() {
    this.initData();
    // 接收参数
    _root_tag = this.$route.params.tag;

    this.isReplensishment =
      this.$route.params.isReplensishment == "1" ? true : false; //配送站的补货订单

    this.isOpenTeam = !this.fun.isTextEmpty(this.$route.params.level_id); //是否为一键开团
    this.isJoinTeam = !this.fun.isTextEmpty(this.$route.params.team_id); //是否为去参团
    if (
      JSON.parse(window.localStorage.getItem("globalParameter"))
        .is_open_photo_order == "1" &&
      _root_tag == TAG_ACTION_BUY
    ) {
      //需求：商城商品、供应商商品立即购买和门店商品下单才能使用相册上传模块，且一个下单的商品id（新需求去掉购物车，不能使用相册）
      console.log("开启相册上传模块");
      this.isPhoto = true; //开启相册上传模块
      this.setPhotoNum();
    }

    //获取配送站开关
    if (this.isReplensishment || this.isOpenTeam || this.isJoinTeam || this.is_open_package_deliver) {
      this.isShowDistributionStation = false; //配送站的补货订单时，配送站模块关闭
    } else if (JSON.parse(window.localStorage.getItem("globalParameter")).is_open_package_deliver == "1"&&this.$route.params.tag != "store") {
      this.is_open_package_deliver = true; //开启自提点（杨朗）PS：分期购车下单走分期购车下单接口，注意选择自提时需要传自提id
      this.selfCarryType = [
        { name: "快递", id: "1" },
        { name: "上门自提", id: "8" }
      ];
      // this.selfCarrySelected = '1';
      let fromChange = this.$route.params.changeSelfCarry
        ? JSON.parse(this.$route.params.changeSelfCarry)
        : null;
      if (fromChange) {
        //从更换自提点列表页面选择后返回
        this.defaultSelfCarry = fromChange;
      } else {
        //第一次进入
        this.getLocation();
      }

      // 默认导航两种选择方式：快递||上门自提（PS:和到店自提又不一样，害~）
      //请求自提点列表
    } else if (this.$route.params.tag != "fromExchange" && this.$route.params.tag != "store" && JSON.parse(window.localStorage.getItem("globalParameter")).is_open_delivery_station == "1" && JSON.parse(window.localStorage.getItem("globalParameter")).is_open_package_deliver == "0") {
      this.isShowDistributionStation = true; //开启配送站
    } else {
      this.isShowDistributionStation = false;
    }

    console.log("_root_tag", _root_tag);
    if (this.fun.isTextEmpty(_root_tag)) {
      // 为空跳回
      this.$router.push(this.fun.getUrl("home", {}));
    }

    if (_root_tag == TAG_ACTION_BUY ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
      _goodsId = this.$route.params.goodsId;
      _optionsId = this.$route.params.optionsId;
      _total = this.$route.params.total;
      this.getDataActionBuy(); // 直接购买
    } else if (_root_tag == TAG_ACTION_CART) {
      _cart_ids = this.$route.params.cart_ids;
      this.getDataActionCart(); // 购物车结算
    } else if (_root_tag == "store") {
      this.store_id = this.$route.params.store_id;
      // this.getDataActionStoreCart();//门店结算
      if (this.$route.params.isCash === 1) {
        this.getCashGood();
      } else {
        this.initStore();
      }
    } else if (_root_tag == "rentCartBuy") {
      // 租赁购物车
      this.currentIndex = "999";

      _cart_ids = this.$route.params.cart_ids;

      this.isRent = true;

      this.getRentDataActionCart([], []);

      this.getRentTimeList();

      this.judgeIsRight();
    } else if (_root_tag == "rentBuy") {
      this.currentIndex = "999";

      this.isRent = true;

      _goodsId = this.$route.params.goodsId;
      _optionsId = this.$route.params.optionsId;
      _total = this.$route.params.total;

      this.getRentDataActionCart([], []);

      this.getRentTimeList();

      this.judgeIsRight();
    } else if (_root_tag == "packagBuy") {
      // 套餐购买
      _packagJson = this.$route.params.packagJson;
      _cart_ids = this.$route.params.cart_ids;
      this.goPackagBuy();
    } else if (_root_tag == "POrder") {
      //挂单商品
      this.getPendingOrder_type(); //批发区下单页类型判断,即导航栏判断
      _goodsId = this.$route.params.goodsId;
      _optionsId = this.$route.params.optionsId;
      _total = this.$route.params.total;
      this.getDataActionBuy(); // 直接购买
    } else if (_root_tag == "fromExchange") {
      //会员中心-兑换中心-去兑换（商城商品）
      _goodsId = this.$route.params.goodsId;
      this.getExchangeData();
    } else if (_root_tag == "buyCar") {
      _goodsId = this.$route.params.goodsId;
      _optionsId = this.$route.params.optionsId;
      _total = this.$route.params.total;
      this.getDataCarBuy(); // 直接购买
      this.getDiyform(); //是否开启自定义表单
      this.form_data_id = this.$route.params.form_data_id;
    }

    //不是门店，可以判断是否开启配送站
    if (
      _root_tag != "fromExchange" &&
      _root_tag != "store" &&
      this.isShowDistributionStation
    ) {
      this.getLocation();
    }

    this.getParams();
    // this.getAgreementPay();
    // this.checkTaxGoods();
    // this.getIvoice();
    this.isTaxGoods = false;
    this.ImgBtnMethob();
  },

  mounted() {
    this.popupSpecs = false;
  },
  methods: {
    ImgBtnMethob() {
      // this.checkedImg = false;
      if (this.fun.isWeiXin() && this.fun.getPhoneEnv() == "2") {
      // if (this.fun.isWeiXin()) {
        //当前使用环境为安卓机的微信app下，即使用微信SDK提供的接口调用微信相册实现图片多选上传功能（注：微信官方一次最多只能9张）
        //因ios与h5自身通过设置input属性为multiple可实现多选，暂无调用微信接口上传
        this.checkedImg = true;
      } else {
        this.checkedImg = false;
      }
    },
    //弃用微信接口原因：当选择微信原图上传时微信还是会进行压缩(任务编号: 33970又改了回来。。。)
    // 相关问题链接：https://developers.weixin.qq.com/community/develop/doc/00088493fb47182c6e27b681b54c00
    chooseImage() {
      let that = this;
      let wxChooseNum = this.max_count - this.fileList1.length;
      wx.chooseImage({
        count: wxChooseNum, // 默认9
        sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(req) {
          var localIds = req.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          for (let j = 0; j < localIds.length; j++) {
            wx.getLocalImgData({
              localId: req.localIds[j].toString(),
              success: function(res) {
                const localData = res.localData;
                let imageBase64 = "";
                if (localData.indexOf("data:image") == 0) {
                  //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                  imageBase64 = localData;
                } else {
                  //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换,M~M~P~~~
                  //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                  imageBase64 =
                    "data:image/jpeg;base64," + localData.replace(/\n/g, "");
                }
                that.onRead_1(imageBase64);
              },
              fail(res) {
                console.log("getLocalImgData::error");
                alert("getLocalImgData::error", res);
              }
            });
          }
        },
        fail() {
          console.log("chooseImage::error");
          alert("chooseImage::error", res);
        }
      });
    },
    dataURItoBlob(dataURI) {
      // 图片转成Buffer---------------------------------
      let byteString = atob(dataURI.split(",")[1]);
      let mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    /*vant图片上传*/
    onRead(e, flag) {
      Indicator.open("上传中");
      let fd = new FormData();

      if (flag === true) {
        fd.append("file", e); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      } else {
        fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      var That = this;
      axios
        .post(this.fun.getRealUrl("upload.uploadPic"), fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result === 1) {
            Indicator.close();
            if (flag === true) {
              That.imageUrl = URL.createObjectURL(e);
            } else {
              That.imageUrl = URL.createObjectURL(e.file);
            }
            That.form.card_avatar = responseData.data.img_url;
          } else {
            Indicator.close();
            Toast(responseData.msg);
          }
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
        });
    },
    // 判断多图上传，循环onRead_1方法
    multipleMethod_1(e, flag) {
      let isSlice = this.fileList1.length + e.length - this.max_count;
      console.log(isSlice);
      let _data = e;
      if (isSlice > 0) {
        _data.splice(-isSlice, isSlice);
        MessageBox.alert(`(＞﹏＜)哎呦，您不小心选多了${isSlice}张！`);
      }

      if (_data && _data.length) {
        for (let i = 0; i < _data.length; i++) {
          this.onRead_1(_data[i], flag);
        }
      } else {
        this.onRead_1(_data, flag);
      }
    },
    // vant 多图片上传
    onRead_1(e, flag) {
      var That = this;
      Indicator.open("上传中");
      let fd = new FormData();
      if (this.checkedImg) {
        fd.append("file", That.dataURItoBlob(e));
      } else {
        if (flag === true) {
          fd.append("file", e);
        } else {
          fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        }
      }
      axios
        .post(this.fun.getRealUrl("upload.uploadPic"), fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result === 1) {
            Indicator.close();
            if (!That.checkedImg) {
              if (flag === true) {
                That.fileList2.push({
                  url: URL.createObjectURL(e)
                });
              } else {
                That.fileList2.push({
                  url: URL.createObjectURL(e.file)
                });
              }
            }
            That.fileList1.push(responseData.data.img_url);
          } else {
            Indicator.close();
            Toast(responseData.msg);
          }
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
        });
    },
    showimg(ind) {
      this.imgIndex = ind;
      this.show = true;
    },
    removeImg: function(delIndex) {
      this.fileList1.splice(delIndex, 1);
      console.log(this.fileList1.length);
      return this.fileList1;
    }, //================================相册上传 end===================================
    setPhotoNum() {
      //设置相册上传数量，当接口返回result==1时，即当前商品设置了独立的相册数量设置；返回result==0时，即采用插件设置的公共限制数量
      let that = this;
      $http
        .get(
          "plugin.photo-order.api.photo-goods.getPhotoGoods",
          { goods_id: that.$route.params.goodsId },
          ""
        )
        .then(function(response) {
          console.log(response.data);
          if (response.result == 1) {
            let _max = response.data.goods_max_photo;
            let _min = response.data.goods_min_photo;
            if (_max != 0 && _max >= _min) {
              that.max_count = _max;
            } else {
              that.max_count =
                Number(_min) >=
                Number(
                  JSON.parse(window.localStorage.getItem("globalParameter"))
                    .photo_order_max_pohot
                )
                  ? _min
                  : Number(
                      JSON.parse(window.localStorage.getItem("globalParameter"))
                        .photo_order_max_pohot
                    );
            }
            that.min_count = _min
              ? _min
              : Number(
                  JSON.parse(window.localStorage.getItem("globalParameter"))
                    .photo_order_min_pohot
                );
            console.log("独立的相册数量设置", that.max_count, that.min_count);
          } else {
            that.max_count = Number(
              JSON.parse(window.localStorage.getItem("globalParameter"))
                .photo_order_max_pohot
            ); //最大上传张数
            that.min_count = Number(
              JSON.parse(window.localStorage.getItem("globalParameter"))
                .photo_order_min_pohot
            )
              ? Number(
                  JSON.parse(window.localStorage.getItem("globalParameter"))
                    .photo_order_min_pohot
                )
              : 1; //最小上传张数
            console.log("公共限制数量", that.max_count, that.min_count);
          }
          if (!that.max_count) {
            that.isPhoto = false;
            console.log("没有设置相册最大上传张数，关闭相册上传");
          }
        });
    },
    //初始化数据
    initData() {
      if (this.$route.params.from != 'ziti'){
        this.orderFirst = 0;
      }

      this.submit_active = true;
      //地址清空
      this.realname = "";
      this.mobile = "";
      this.address = "";

      this.linkinfo = {
        mobile: "",
        name: ""
      };

      this.order_data = [];
      this.defaultAddress = {};

      this.store_info = {};
      this.storeCarts = [];
      this.store_id = 0;
      this.selected = 0;
      this.popupSpecs = false;
      this.goodsInfo = {};
      this.order = {};
      this.dispatch = [];
      this.addressData = [];
      this.isResize = false;

      this.isRent = false;
      this.AgreementPay = "";

      this.checkList = [];

      this.isRightChoose = false;

      this.rentTime = [];

      this.rentFree = "";

      this.isOpenRight = false;

      this.agreement = false;
      this.agreementPay = false;

      this.agreementShow = false;
      this.agreementPayShow = false;

      this.agreeCon = {};

      this.note = [];

      // 优惠券
      this.popupCouponSpecs = false;
      this.coupon_size = 0;
      this.use_coupon_size = 0;
      this.checkCouponList = [];
      this.coupons = [];

      // 抵扣
      this.checkDeductionList = [];

      // 新增地址v2------------------------------------------------新增地址v2//
      this.popAddAddress = false;
      this.addressShow = false;
      this.strShow = false;
      this.addressName = "";
      this.streetShow = false;
      // 新增地址v2------------------------------------------------新增地址v2//

      this.dispatch = [];
      this.dispatchName = {
        1: "快递",
        2: "上门自提",
        3: "送货上门"
      };

      // 续费商品
      this.goods_id = "";

      this.isGetAgreementPay = false;

      currentAddId = "";
      currentAddress = {};

      _cart_ids = [];

      this.isShowDistributionStation = false; //是否显示配送站模块
      this.DistributionSelect = "6";
      this.DistributionInfo = []; //配送站列表
      this.DistributionModel = {
        delivery_name: "",
        has_one_member: {
          mobile: ""
        },
        full_address: "",
        address: "",
        method_name: [
          { name: "送货上门", code: "6" },
          { name: "到店自提", code: "5" }
        ]
      }; //配送站弹窗选中
      this.distributionUserName = this.$route.params.distributionUserName
        ? this.$route.params.distributionUserName
        : "";
      this.distributionUserMobile = this.$route.params.distributionUserMobile
        ? this.$route.params.distributionUserMobile
        : "";

      this.isReplensishment = false;
      this.isOpenTeam = false;
      this.isJoinTeam = false;

      this.pdOrderType = [{ name: "自用", code: "1" }];
      this.POChooseType = "1";

      this.fileList1 = []; //相册
      this.fileList2 = []; //相册
      this.show = false;
      this.imgIndex = 1; //相册图片预览起始位置
      this.isPhoto = false;
      this.checkedImg = true; //true为开启微信相册

      this.is_open_package_deliver = false;
      this.isShowDiyForm = false;
      this.diyform_id = 0;
      this.form_data_id = "";
      this.diyTitle = "";
    },

    changeDistribution() {
      if (_root_tag == TAG_ACTION_BUY ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        this.getDataActionBuy(); // 直接购买
      } else if (_root_tag == TAG_ACTION_CART) {
        this.getDataActionCart(); // 购物车结算
      }
    },

    // 整合了发票、是否显示个人信息接口
    getParams(cart_ids) {
      let json = {};
      if (_root_tag == "store" && !cart_ids) {
        return;
      } else if (_root_tag == "store" && cart_ids) {
        _cart_ids = cart_ids;
      }

      if (_root_tag == TAG_ACTION_BUY || _root_tag == "buyCar" ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        _goodsId = this.$route.params.goodsId;
        _cart_ids.push(_goodsId);
        // goods_id: _goodsId
      } else if (_root_tag == TAG_ACTION_CART) {
        _cart_ids = this.$route.params.cart_ids;
      } // 加入租赁商品
      else if (_root_tag == "rentCartBuy") {
        _cart_ids = this.$route.params.cart_ids;
      } // 加入租赁立即租
      else if (_root_tag == "rentBuy") {
        _goodsId = this.$route.params.goodsId;
        _cart_ids.push(_goodsId);
      } else if (_root_tag == "POrder") {
        _goodsId = this.$route.params.goodsId;
        _cart_ids.push(_goodsId);
      }
      json = {
        goods_ids: JSON.stringify(_cart_ids),
        mid: this.fun.getKeyByMid()
      };
      $http
        .get("from.div-from.get-params", json, " ")
        .then(
          response => {
            if (response.result === 1) {
              this.isGetAgreementPay = true;
              this.AgreementPay = response.data.getPayProtocol;
              this.checkTaxGoods(response.data.isDisplay);
              this.getMemberInfo(response.data.getMemberInfo);
              this.getExplain(response.data.explain);
              this.getIvoice(response.data.sinvoice);
            } else {
              this.isGetAgreementPay = false;
              console.log(response.msg);
            }
          },
          function(response) {
            this.isGetAgreementPay = false;
            console.log(response);
          }
        )
        .catch(err => {
          this.isGetAgreementPay = false;
          console.log(err);
        });
    },

    // 获取是否显示支付协议
    getAgreementPay() {
      $http.get("shop.index.getPayProtocol", {}, " ").then(
        response => {
          if (response.result === 1) {
            this.AgreementPay = response.data;
          } else {
            console.log(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    // 获取是否显示自定义表单（分期购车）
    getDiyform() {
      $http
        .get(
          "plugin.staging-buy-car.frontend.staging-buy-car.diy-form",
          {},
          " "
        )
        .then(
          response => {
            if (response.result === 1) {
              this.isShowDiyForm = response.data.diyform_id > 0 ? true : false;
              if (this.isShowDiyForm) {
                this.diyform_id = response.data.diyform_id;
                this.diyTitle = response.data.name;
              }
            } else {
              this.isShowDiyForm = false;
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    gotoDiyform() {
      let that = this;
      this.$router.push(
        this.fun.getUrl("GoodsOrderDiyForm", {
          tag: that.$route.params.tag,
          goodsId: that.$route.params.goodsId,
          optionsId: that.$route.params.optionsId,
          total: that.$route.params.total,
          id: that.diyform_id,
          form_data_id: that.form_data_id,
          changeSelfCarry: JSON.stringify(that.defaultSelfCarry),
          distributionUserName: that.distributionUserName,
          distributionUserMobile: that.distributionUserMobile
        })
      );
    },

    //是否海外商品
    checkTaxGoods(data) {
      // if (_root_tag == TAG_ACTION_BUY) {
      //   _goodsId = this.$route.params.goodsId;
      //   _cart_ids.push(_goodsId);
      // } else if (_root_tag == TAG_ACTION_CART) {
      //   _cart_ids = this.$route.params.cart_ids;
      // } // 加入租赁商品
      // else if (_root_tag == "rentCartBuy") {
      //   _cart_ids = this.$route.params.cart_ids;
      // } // 加入租赁立即租
      // else if (_root_tag == "rentBuy") {
      //   _goodsId = this.$route.params.goodsId;
      //   _cart_ids.push(_goodsId);
      // }
      //
      // let that = this;
      //
      // let json = {
      //   goods_ids: JSON.stringify(_cart_ids),
      //   mid: this.fun.getKeyByMid()
      // };
      //
      // $http.get("from.div-from.isDisplay", json, "添加中").then(
      //   function(response) {
      //     if (response.result === 1) {
      if (data.status) {
        this.isTaxGoods = true;
        // this.getMemberInfo();
        // 显示个人信息
        this.showMyinfo = data.status;
      } else {
        this.isTaxGoods = false;
        // 隐藏个人信息
        this.showMyinfo = false;
      }
      //     } else {
      //       console.error(response);
      //     }
      //   },
      //   function(response) {
      //     console.log(response);
      //   }
      // );
    },

    // 修改用户信息
    saveInfo() {
      let that = this;
      console.log("route", this.$route.params);
      var _goodsId = this.$route.params.goodsId;
      var _optionsId = this.$route.params.optionsId;
      var _total = this.$route.params.total;
      var submitActionTag = this.$route.params.tag;
      if (submitActionTag == "cart") {
        that.addCartReq(_goodsId, _optionsId, _total);
        return;
      }
      let json = {
        member_name: this.member_name,
        member_card: this.member_card
      };
      $http.get("from.div-from.updateMemberInfo", json, "添加中").then(
        function(response) {
          if (response.result === 1) {
            Toast("更新成功");
            that.popupMemberSpecs = false;
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    open() {
      MessageBox.alert({
        title: this.explain_title,
        message: this.explain_content
      }).then(() => {
        // on close
      });
    },

    // 配置用户信息
    getMemberInfo(data) {
      // let that = this;
      // $http.get("from.div-from.getMemberInfo", {}, "生成中").then(
      //   function(response) {
      //     if (response.result === 1) {
      this.member_name = data.realname;
      this.member_card = data.idcard;
      // this.getExplain();
      // 个人信息
      this.myRealname = data.realname;
      this.myIdcard = data.idcard;
      //     } else {
      //       Toast(response.msg);
      //     }
      //   },
      //   function(response) {
      //     console.log(response);
      //   }
      // );
    },

    getExplain(data) {
      // let that = this;
      // $http.get("from.div-from.explain", {}, "添加中").then(
      //   function(response) {
      //     if (response.result === 1) {
      this.explain_title = data.explain_title;
      this.explain_content = data.explain_content;
      //     } else {
      //       Toast(response.msg);
      //     }
      //   },
      //   function(response) {
      //     console.log(response);
      //   }
      // );
    },

    //获取门店信息
    // getStoreInfo() {
    //   let that = this;
    //   this.recipient_name = "";
    //   this.recipient_mobile = "";
    //   $http
    //     .get(
    //       "plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id",
    //       {
    //         store_id: that.store_id
    //       },
    //       ""
    //     )
    //     .then(
    //       function(response) {
    //         if (response.result === 1) {
    //           that.store_info = response.data;
    //           that.dispatch = response.data.dispatch_type;
    //
    //           //  if (!that.selected) {
    //           //     that.selected = that.dispatch[0]
    //           //  }
    //
    //           if (that.dispatch.length > 0) {
    //             if (!that.selected) {
    //               that.selected = that.dispatch[0].toString();
    //             }
    //           } else {
    //             that.selected = that.dispatch[0].toString();
    //           }
    //           console.log("dispatch::::", that.dispatch);
    //           that.recipient_name = response.data.store_carry.name;
    //           that.recipient_mobile = response.data.store_carry.number;
    //         } else {
    //           Toast(response.msg);
    //           that.$router.go(-1);
    //         }
    //       },
    //       function(response) {
    //         console.log(response);
    //       }
    //     );
    // },

    // 发票数据
    getIvoice(data) {
      // $http.get("from.div-from.isinvoice", { goods_id: _goodsId }).then(res => {
      //   if (res.result === 1) {
      this.papery_status = parseInt(data.invoice.papery);
      this.electron_status = parseInt(data.invoice.electron);
      if (!this.papery_status && !this.electron_status) {
        this.isShowInvoice = false;
      }
      //   }
      // });
    },

    invoice_type() {
      if (this.iscur_c) {
        this.iscur_c = false;
        this.iscur_d = true;
      } else {
        this.iscur_c = true;
        this.iscur_d = false;
      }
    },

    invoice_title() {
      // 清空填写
      this.invoice_list.call = "";
      this.invoice_list.company_number = "";
      if (this.iscur) {
        this.iscur = false;
        this.iscur_b = true;
        this.person_status = false;
        this.unit_status = true;
      } else {
        this.iscur = true;
        this.iscur_b = false;
        this.person_status = true;
        this.unit_status = false;
      }
    },

    Subinvoice() {
      if (this.fun.isTextEmpty(this.invoice_list.call)) {
        MessageBox.alert("请填写抬头");
        return;
      }
      if (
        this.iscur_b &&
        this.fun.isTextEmpty(this.invoice_list.company_number)
      ) {
        MessageBox.alert("请添加纳税人识别号");
        return;
      }
      // 页面回显
      this.invoicename = this.iscur_c ? "电子" : "纸质";
      this.companyname = this.iscur ? "个人" : "单位";
      this.showInvoiceTitle = this.invoice_list.call;

      this.show1 = false;
    },

    closePopup() {
      this.show1 = false;
    },
    // 套餐购买
    goPackagBuy() {
      let that = this;
      let json = {
        package_id: _packagJson.package_id,
        goods: JSON.stringify(_packagJson.goods_list),
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress),
        dispatch_type_id: 1
      };
      if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
        json.dispatch_type_id = 8;
      }
      $http
        .get(
          "plugin.goods-package.frontend.package.package-buy.index",
          json,
          "生成中"
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.goodsInfo = response.data;
              that.cup_notice = true;
              that.setViewData(response.data); // 设置界面
              that.setAddressViewData(
                response.data.dispatch.default_member_address
              ); // 设置地址界面
              that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
              if (that.is_open_package_deliver) {
                that.selfCarryType = response.data.dispatch.delivery_method;
              }
              if(that.selfCarryType.length > 0){
                for(let i = 0;i<that.selfCarryType.length;i++){
                  that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
                }
                if(that.orderFirst == 0) {
                  that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                  that.orderFirst = 1;
                }
              }
            } else {
              Toast(response.msg);
              that.$router.go(-1);
              that.cup_notice = true;
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    // 分期购车(逻辑和直接购买一样)
    getDataCarBuy() {
      let that = this;
      let json = {
        goods_id: _goodsId,
        total: _total,
        option_id: _optionsId,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress),
        dispatch_type_id: 1,
        mark: this.$route.params.mark ? this.$route.params.mark : 0
      };

      //自提点开启
      if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
        json.dispatch_type_id = this.selfCarrySelected;
      }

      let _URL_DataActionBuy = "plugin.staging-buy-car.frontend.goods-buy.index";

      $http.get(_URL_DataActionBuy, json, "生成中").then(
        function(response) {
          if (response.result === 1) {
            that.goodsInfo = response.data;
            that.cup_notice = true;
            that.setViewData(response.data); // 设置界面
            that.setAddressViewData(
              response.data.dispatch.default_member_address
            ); // 设置地址界面
            that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
            if (that.is_open_package_deliver) {
              that.selfCarryType = response.data.dispatch.delivery_method;
            }
            if(that.selfCarryType.length > 0){
              for(let i = 0;i<that.selfCarryType.length;i++){
                that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
              }
              if(that.orderFirst == 0) {
                that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                that.orderFirst = 1;
              }
            }
          } else {
            Toast(response.msg);
            that.$router.go(-1);
            that.cup_notice = true;
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    // 直接购买
    getDataActionBuy() {
      let that = this;
      let json = {
        goods_id: _goodsId,
        total: _total,
        option_id: _optionsId,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress),
        dispatch_type_id: 1,
        mark: this.$route.params.mark ? this.$route.params.mark : 0
      };

      //自提点开启
      if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
        json.dispatch_type_id = this.selfCarrySelected;
      }

      let _URL_DataActionBuy = "";
      if (this.isOpenTeam) {
        console.log("一键开团，leveid", this.isOpenTeam);
        json.option_level_id = this.$route.params.option_level_id; //规格层级id
        json.level_id = this.$route.params.level_id; //一键开团 拼团层级id
        _URL_DataActionBuy =
          "plugin.fight-groups.frontend.controllers.team.pre-open-team";
      } else if (this.isJoinTeam) {
        console.log("去参团", this.isJoinTeam);
        json.team_id = this.$route.params.team_id; //一键开团 拼团层级id
        json.option_level_id = this.$route.params.option_level_id; //规格层级id
        _URL_DataActionBuy =
          "plugin.fight-groups.frontend.controllers.team.pre-join-team";
      } else if (this.isShowDistributionStation) {
        //开启配送站
        json.delivery_id = that.DistributionModel.id || "0"; //配送站ID
        json.dispatch_type_id = that.DistributionSelect;
        _URL_DataActionBuy = "plugin.delivery-station.frontend.goods-buy.index";
      } else if (that.$route.params.tag == "POrder") {
        //挂单商品
        json.pending_order_type = that.POChooseType; //批发订单使用类型
        _URL_DataActionBuy = "plugin.pending-order.frontend.goods-buy.index";
      } else {
        _URL_DataActionBuy = "order.goods-buy";
      }

      $http.get(_URL_DataActionBuy, json, "生成中").then(
        function(response) {
          if (response.result === 1) {
            that.goodsInfo = response.data;
            that.cup_notice = true;
            // Indicator.close()
            // that.order = response.data.order
            // that.dispatch = response.data.dispatch
            that.setViewData(response.data); // 设置界面
            that.setAddressViewData(
              response.data.dispatch.default_member_address
            ); // 设置地址界面
            that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息

            if (that.is_open_package_deliver) {
              //ps::后续的插件都应该让后端返回这个的导航栏，前端循环渲染
              that.selfCarryType = response.data.dispatch.delivery_method;
            }
            if(that.selfCarryType.length > 0){
              for(let i = 0;i<that.selfCarryType.length;i++){
                that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
              }
              if(that.orderFirst == 0) {
                that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                that.orderFirst = 1;
              }
            }
          } else {
            Toast(response.msg);
            that.$router.go(-1);
            that.cup_notice = true;
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //兑换中心进入兑换商品下单页调用
    getExchangeData(_id) {
      let that = this;
      let json = {
        goods_id: _goodsId,
        total: _total,
        option_id: _optionsId,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress),
        dispatch_type_id: 1,
        mark: this.$route.params.mark ? this.$route.params.mark : 0
      };

      if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
        json.dispatch_type_id = 8;
      }

      let _URL_DataActionBuy = "";
      //兑换中心商品
      let _exchangeData = that.$route.params.exchangeData;
      (json.data = _exchangeData), (json.is_exchange = _id == 0 ? 0 : 1);

      if (that.$route.params.store_id !== undefined) {
        json.store_id = that.$route.params.store_id;
        _URL_DataActionBuy =
          "plugin.store-cashier.frontend.store.exchange-center";
      } else {
        _URL_DataActionBuy = "coupon.exchange-center.exchange-buy";
      }
      $http.post(_URL_DataActionBuy, json, "").then(
        function(response) {
          if (response.result === 1) {
            that.goodsInfo = response.data;
            that.cup_notice = true;
            that.setViewData(response.data); // 设置界面
            that.setAddressViewData(
              response.data.dispatch.default_member_address
            ); // 设置地址界面
            that.DefaultSelectCoupon(response.data.discount.member_coupons); // 设置优惠券信息
          } else {
            Toast(response.msg);
            that.$router.go(-1);
            that.cup_notice = true;
          }
        },
        function(response) {
          console.log(response);
        }
      );
      return;
    },

    // 购物车结算
    getDataActionCart() {
      let that = this;
      let json = {
        cart_ids: _cart_ids,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress),
        dispatch_type_id: 1
      };

      if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
        json.dispatch_type_id = 8;
      }

      let _URL_ActionCart = "";
      if (this.isReplensishment) {
        //从配送站的“我要补货”进入
        _URL_ActionCart = "plugin.service-station.frontend.cart-buy.index";
        json.service_id = this.$route.params.service_id;
      } else if (this.isShowDistributionStation) {
        //开启配送站
        json.delivery_id = that.DistributionModel.id || "0"; //配送站ID
        json.dispatch_type_id = that.DistributionSelect;
        _URL_ActionCart = "plugin.delivery-station.frontend.cart-buy.index";
      } else {
        _URL_ActionCart = "order.cart-buy";
      }

      $http.get(_URL_ActionCart, json, "生成中").then(
        function(response) {
          if (response.result === 1) {
            that.goodsInfo = response.data;
            that.cup_notice = true;
            // that.order = response.data.order
            // that.dispatch = response.data.dispatch
            that.setViewData(response.data); // 设置界面
            that.setAddressViewData(
              response.data.dispatch.default_member_address
            ); // 设置地址界面
            that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
            if (that.is_open_package_deliver) {
              that.selfCarryType = response.data.dispatch.delivery_method;
            }
            if(that.selfCarryType.length > 0){
              for(let i = 0;i<that.selfCarryType.length;i++){
                that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
              }
              if(that.orderFirst == 0) {
                that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                that.orderFirst = 1;
              }
            }
          } else {
            Toast(response.msg);
            that.$router.go(-1);

            that.cup_notice = true;
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    // 门店购物车商品
    getDataActionStoreCart() {
      let that = this;
      // if (this.$route.params.isCash !== 1) {
      //   that.getStoreInfo();
      // }
      $http
        .get("plugin.store-cashier.frontend.shoppingCart.member-cart.index", {
          store_id: that.store_id
        })
        .then(
          response => {
            if (response.result === 1) {
              // that.storeCarts = response.data
              that.cup_notice = true;
              that.storeCarts = [];
              response.data.forEach(item => {
                that.storeCarts.push(item.id);
              });
              if (!that.isGetAgreementPay) {
                that.getParams(that.storeCarts);
              }
              that.getStoreCartBuy(that.storeCarts);
              if (
                JSON.parse(window.localStorage.getItem("globalParameter"))
                  .is_open_photo_order == "1" &&
                that.storeCarts.length == 1
              ) {
                //门店商品仅单个商品下单才可进行上传相册,多个商品购物车结算不开启
                console.log("开启相册上传模块");
                that.isPhoto = true; //开启相册上传模块
                that.max_count = Number(
                  JSON.parse(window.localStorage.getItem("globalParameter"))
                    .photo_order_max_pohot
                ); //最大上传张数
                that.min_count = Number(
                  JSON.parse(window.localStorage.getItem("globalParameter"))
                    .photo_order_min_pohot
                )
                  ? Number(
                      JSON.parse(window.localStorage.getItem("globalParameter"))
                        .photo_order_min_pohot
                    )
                  : 1; //最小上传张数
              } else if (
                JSON.parse(window.localStorage.getItem("globalParameter"))
                  .is_open_photo_order == "1"
              ) {
                that.storeNo_photo = true;
              }
            } else {
              that.cup_notice = true;
              alert("无商品");
            }
          },
          response => {}
        );
    },

    // 门店结算
    getStoreCartBuy(cart_ids) {
      var that = this;
      let json = {
        cart_ids: cart_ids,
        store_id: that.store_id,
        dispatch_type_id: this.selected,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        address: JSON.stringify(currentAddress)
      };

      $http
        .get("plugin.store-cashier.frontend.store.cart-buy", json, "生成中")
        .then(
          function(response) {
            if (response.result === 1) {
              that.goodsInfo = response.data;
              // that.order = response.data.order
              // that.dispatch = response.data.dispatch
              that.setViewData(response.data); // 设置界面
              that.setAddressViewData(
                response.data.dispatch.default_member_address
              ); // 设置地址界面
              that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
              if (that.is_open_package_deliver) {
                that.selfCarryType = response.data.dispatch.delivery_method;
              }
              if(that.selfCarryType.length > 0){
                for(let i = 0;i<that.selfCarryType.length;i++){
                  that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
                }
                if(that.orderFirst == 0) {
                  that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                  that.orderFirst = 1;
                }
              }
            } else {
              Toast(response.msg);
              // that.$router.go(-1)
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    // 设置界面
    setViewData(data) {
      // console.log(data, '参数data')
      this.service = data.fee_items;

      this.order_data = data.orders;
      this.show_address = data.orders[0].need_address;
      var amount_items = data.amount_items;
      this.price = data.total_price; // 设置总价格（合计）
      // amount_items.forEach(item => {
      //   if (item.code == 'total_goods_price') {
      //     this.goods_price = item.amount; // 设置商品总价格
      //     this.priceInfo = item
      //     // this.price = item.amount; // 设置总价格（合计）
      //   } else if (item.code == 'total_dispatch_price') {
      //     this.dispatchInfo = item
      //     this.dispatch_price = item.amount ; // 设置总运费价格
      //   } else if (item.code == 'total_deduction_price') {
      //     this.deductionInfo = item
      //     this.deduction_price = item.amount; // 设置总抵扣价格
      //   }
      // })
      this.total_items = data.amount_items;
      var discount_amount_items = data.discount_amount_items;
      this.discount_amount_items = data.discount_amount_items;

      discount_amount_items.forEach(items => {
        var totalPrice = 0;
        totalPrice += parseInt(items.amount);
        this.discount_price = totalPrice; // 设置总优惠价格
      });

      // this.discount_price = data.total_discount_price;

      // this.goods = data.order.order_goods
      // this.goods_price = data.order.goods_price
      // this.dispatch_price = data.order.dispatch_price
      // this.price = data.order.price

      // if(_root_tag == 'store' && this.price == "0.00"){
      //     this.$router.push(this.fun.getUrl('o2oHome', {}))
      //     MessageBox.alert("下单错误")
      // }

      if (_root_tag == "store" && this.price < 0) {
        this.$router.push(this.fun.getUrl("o2oHome", {}));
        MessageBox.alert("下单错误");
      }
    },

    // 设置地址界面
    setAddressViewData(model) {
      if (model == undefined || model == "" || model == []) {
        return;
      }

      // 设置地址id
      currentAddId = model.id;
      currentAddress = model;

      this.realname = this.fun.isTextEmpty(model.username)
        ? ""
        : model.username;
      this.mobile = this.fun.isTextEmpty(model.mobile) ? "" : model.mobile;
      this.address = this.fun.isTextEmpty(model.province)
        ? ""
        : model.province +
          " " +
          model.city +
          " " +
          model.district +
          " " +
          (this.fun.isTextEmpty(model.street) ? "" : model.street + " ") +
          model.address;
    },

    // 选择地址后重新计算数据
    requestByAddress() {
      // 重新计算
      if (_root_tag == TAG_ACTION_BUY ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        this.order_data = "";
        this.getDataActionBuy(); // 直接购买
      } else if (_root_tag == "fromExchange") {
        this.order_data = "";
        this.getExchangeData(0); // 兑换中心
      } else if (_root_tag == TAG_ACTION_CART) {
        this.order_data = "";
        this.getDataActionCart(); // 购物车结算
      } else if (_root_tag == "store") {
        this.getDataActionStoreCart(); // 门店结算
      } else if (_root_tag == "rentCartBuy" || _root_tag == "rentBuy") {
        this.rentGoodBuy();
      } else if (_root_tag == "packagBuy") {
        // 套餐购买
        this.order_data = "";
        this.goPackagBuy();
      } else if (_root_tag == "buyCar") {
        // 分期购车
        this.order_data = "";
        this.getDataCarBuy();
      }
    },

    //显示地址pop
    showDistribution() {
      //获取配送站信息
      this.popupDistribution = true;
    },

    //显示地址pop
    showAddress() {
      // 获取收货地址
      this.getAddress();
    },

    // 获取收货地址
    getAddress() {
      this.addressData = [];
      let that = this;
      let json = {
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };
      $http.get("member.member-address.index", json, "获取中").then(
        function(response) {
          if (response.result === 1) {
            that.popupSpecs = true;
            that.addressData = response.data;
            that.defaultAddress = response.data.filter(function(item) {
              return item.isdefault === 1;
            });
          } else {
            MessageBox.alert("response.msg", "错误提示");
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    // 选择地址
    selectAddress(item) {
      // console.log(item)
      this.setAddressViewData(item); // 更新界面 & ID
      this.requestByAddress(); // 选择地址后重新计算
      // 关闭 地址栏
      this.popupSpecs = false;
    },

    // 设置地址
    editAddress() {
      this.popupSpecs = false;
      this.create = false;
      this.popAddAddress = true;
      this.getStreet(this.defaultAddress[0].district_id);
      this.form.address_id = this.defaultAddress[0].id;
      this.form.username = this.defaultAddress[0].username;
      this.form.mobile = this.defaultAddress[0].mobile;
      this.form.province = this.defaultAddress[0].province;
      this.form.city = this.defaultAddress[0].city;
      this.form.district = this.defaultAddress[0].district;
      this.form.address = this.defaultAddress[0].address;
      this.form.street = this.defaultAddress[0].street;
      this.form.isDefault =
        this.defaultAddress[0].isDefault === 0 ? false : true;
      this.addressName =
        this.form.province + " " + this.form.city + " " + this.form.district;
    },

    // 跳转到新增地址
    addAddress() {
      // this.$router.push(this.fun.getUrl('appendAddress', {fromGood: 1}))

      // 关闭 地址栏
      this.popupSpecs = false;
      // this.$router.push({ name: "appendAddress", params: {}, query: { i: this.toi } })

      // 新增地址 本地处理
      this.showAddAddress();
    },

    // 门店商品提交
    submitStore() {
      if (
        this.store_info.delivery_information == null ||
        this.store_info.delivery_information == 0
      ) {
        if (this.isShowDistributionStation || this.is_open_package_deliver) {
          if (this.DistributionSelect == "5" || this.selfCarrySelected == "8") {
            if (this.is_open_package_deliver && !this.defaultSelfCarry.id) {
              Toast("请选择自提点");
              this.submit_active = true;
              return;
            }
            if (this.fun.isTextEmpty(this.distributionUserName)) {
              Toast("请填写提货人姓名");
              this.submit_active = true;
              return;
            }
            if (this.fun.isTextEmpty(this.distributionUserMobile)) {
              Toast("请输入提货人手机");
              this.submit_active = true;
              return;
            }
          } else if (this.DistributionSelect == "6" || this.selfCarrySelected == "1") {
            if (!this.order_data[0].need_address) {
              if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                this.submit_active = true;
                return;
              }
            }
          }
        }
        if(!this.isShowDistributionStation && !this.is_open_package_deliver) {
          if ((this.selected == "1" || this.selected == "3") && this.fun.isTextEmpty(currentAddId)) {
            if (!this.order_data[0].need_address) {
              Toast("请选择收货地址");
              this.submit_active = true;
              return;
            }
          }
        }



        let that = this;

        let json = {
          dispatch_type_id: this.selected,
          store_id: this.store_id,
          mobile: this.store_info.store_mobile,
          realname: this.store_info.store_name,
          address: JSON.stringify(currentAddress),
          goods: JSON.stringify(this.assembleGoods()),
          cart_ids: JSON.stringify(this.storeCarts),
          member_coupon_ids: JSON.stringify(this.assembleCoupons()),
          orders: JSON.stringify(this.assembleDeduction()),
          // 发票
          invoice_type: this.iscur_c ? 0 : 1,
          rise_type: this.iscur ? 1 : 0,
          call: this.invoice_list.call,
          company_number: this.invoice_list.company_number
        };

        if(this.$store.state.liveRoomID){
          json.room_id = this.$store.state.liveRoomID;
        }

        if (clicktag === 0) {
          clicktag = 1;
          $http
            .post("plugin.store-cashier.frontend.store.create", json, "提交中")
            .then(
              function(response) {
                if (response.result === 1) {
                  that.$router.push(
                    that.fun.getUrl("orderpay", {
                      status: "2",
                      order_ids: response.data.order_ids
                    })
                  );
                } else {
                  Toast(response.msg);
                }
                setTimeout(function() {
                  clicktag = 0;
                }, 1000);
              },
              function(response) {
                console.log(response);
              }
            )
            .catch(err => {
              console.log(err);
            });
        }
      } else if (this.store_info.delivery_information == 1) {
        if (this.isShowDistributionStation || this.is_open_package_deliver) {
          if (this.DistributionSelect == "5" || this.selfCarrySelected == "8") {
            if (this.is_open_package_deliver && !this.defaultSelfCarry.id) {
              Toast("请选择自提点");
              this.submit_active = true;
              return;
            }
            if (this.fun.isTextEmpty(this.distributionUserName)) {
              Toast("请填写提货人姓名");
              this.submit_active = true;
              return;
            }
            if (this.fun.isTextEmpty(this.distributionUserMobile)) {
              Toast("请输入提货人手机");
              this.submit_active = true;
              return;
            }
          } else if (this.DistributionSelect == "6" || this.selfCarrySelected == "1") {
            if (!this.order_data[0].need_address) {
              if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                this.submit_active = true;
                return;
              }
            }
          }
        }
        if(!this.isShowDistributionStation && !this.is_open_package_deliver) {

          if (this.selected == "2" && (this.fun.isTextEmpty(this.linkinfo.name) || this.fun.isTextEmpty(this.linkinfo.mobile))) {
            Toast("请输入提货人信息");
            return;
          }

          if ((this.selected == "1" || this.selected == "3") && this.fun.isTextEmpty(currentAddId)) {
            if (!this.order_data[0].need_address) {
              Toast("请选择收货地址");
              this.submit_active = true;
              return;
            }
          }

          if (this.selected == "2" && this.fun.isMoblie(this.linkinfo.mobile)) {
            MessageBox.alert("请输入正确的手机号", "提示");
            return;
          }
        }

        let that = this;
        let json = this.assembleJson();
        if (clicktag === 0) {
          clicktag = 1;
          $http
            .post("plugin.store-cashier.frontend.store.create", json, "提交中")
            .then(
              function(response) {
                if (response.result === 1) {
                  that.$router.push(
                    that.fun.getUrl("orderpay", {
                      status: "2",
                      order_ids: response.data.order_ids
                    })
                  );
                } else {
                  Toast(response.msg);
                }
                setTimeout(function() {
                  clicktag = 0;
                }, 1000);
              },
              function(response) {
                console.log(response);
              }
            )
            .catch(err => {
              console.log(err);
            });
        }
      }
    },

    // 普通商品提交订单
    submit() {
      console.log("state===res", this.submit_active);
      if (this.isPhoto) {
        //相册模块开启下单时判断 是否符合条件
        if (this.fileList1.length < this.min_count) {
          MessageBox.alert(`上传图片张数不应少于${this.min_count}张`);
          return;
        }
      }

      if (this.submit_active == true) {
        this.submit_active = false;
        if(this.isAllDFOk()){
          Toast("请填写表单！");
          this.submit_active = true;
          return;
        }
        if (this.AgreementPay && !this.isRent) {
          if (!this.agreementPay) {
            Toast("请勾选支付协议");
            this.submit_active = true;
            return;
          }
        }
        if (this.isShowDiyForm && this.fun.isTextEmpty(this.form_data_id)) {
          //分期购车自定义表单
          Toast("请填写会员资料！");
          return;
        }

        if (this.isRent) {
          if (this.store_id) {
            this.submitStore();
            this.submit_active = true;
            return;
          }
          if (!this.isShowDistributionStation) {
            if (!this.order_data[0].need_address && this.POChooseType != "0") {
              if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                this.submit_active = true;
                return;
              }
            }
          }

          if (!this.agreement) {
            Toast("请勾选租赁协议");
            this.submit_active = true;
            return;
          }

          if (this.isShowDistributionStation || this.is_open_package_deliver) {
            if (this.DistributionSelect == "5" || this.selfCarrySelected == "8") {
              if (this.is_open_package_deliver && !this.defaultSelfCarry.id) {
                Toast("请选择自提点");
                this.submit_active = true;
                return;
              }
              if (this.fun.isTextEmpty(this.distributionUserName)) {
                Toast("请填写提货人姓名");
                this.submit_active = true;
                return;
              }
              if (this.fun.isTextEmpty(this.distributionUserMobile)) {
                Toast("请输入提货人手机");
                this.submit_active = true;
                return;
              }
            } else if (this.DistributionSelect == "6" || this.selfCarrySelected == "1") {
              if (!this.order_data[0].need_address) {
                if (this.fun.isTextEmpty(currentAddId)) {
                  Toast("请选择收货地址");
                  this.submit_active = true;
                  return;
                }
              }
            }
          }

          let that = this;
          let json = this.assembleJson();
          if (clicktag === 0) {
            clicktag = 1;
            let orderCreate = "";
            if (this.isPhoto) {
              orderCreate = "plugin.photo-order.api.create";
            } else if (this.isShowDistributionStation) {
              orderCreate = "plugin.delivery-station.frontend.create.index";
            } else if (_root_tag == "POrder") {
              orderCreate = "plugin.pending-order.frontend.create.index";
            } else if (_root_tag == "appointment_goods") {
              orderCreate = "plugin.appointment.frontend.order.create";
            } else if (_root_tag == "yun_sign_goods") {
              orderCreate = "plugin.yun-sign.frontend.order.create";
            } else {
              orderCreate = "plugin.lease-toy.api.order.create";
            }
            $http
              .post(orderCreate, json, "提交中")
              .then(
                function(response) {
                  if (response.result === 1) {
                    that.clearStorage();
                    that.$router.push(
                      that.fun.getUrl("orderpay", {
                        status: "2",
                        order_ids: response.data.order_ids
                      })
                    );
                  } else {
                    Toast(response.msg);
                  }
                  that.submit_active = true;
                  setTimeout(function() {
                    clicktag = 0;
                  }, 1000);
                },
                function(response) {
                  that.submit_active = true;
                  console.log(response);
                }
              )
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          if (this.store_id) {
            this.submitStore();
            this.submit_active = true;
            return;
          }

          if (this.isShowDistributionStation || this.is_open_package_deliver) {
            if (this.DistributionSelect == "5" || this.selfCarrySelected == "8") {
              if (this.is_open_package_deliver && !this.defaultSelfCarry.id) {
                Toast("请选择自提点");
                this.submit_active = true;
                return;
              }
              if (this.fun.isTextEmpty(this.distributionUserName)) {
                Toast("请填写提货人姓名");
                this.submit_active = true;
                return;
              }
              if (this.fun.isTextEmpty(this.distributionUserMobile)) {
                Toast("请输入提货人手机");
                this.submit_active = true;
                return;
              }
            } else if (this.DistributionSelect == "6" || this.selfCarrySelected == "1") {
              if (!this.order_data[0].need_address) {
                if (this.fun.isTextEmpty(currentAddId)) {
                  Toast("请选择收货地址");
                  this.submit_active = true;
                  return;
                }
              }
            }
          } else {
            if (!this.order_data[0].need_address && this.POChooseType != "0") {
              if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                this.submit_active = true;
                return;
              }
            }
          }
          let that = this;
          let json = this.assembleJson();
          if (clicktag === 0) {
            clicktag = 1;

            let orderCreates = "";
            if (this.isPhoto) {
              orderCreates = "plugin.photo-order.api.create";
            } else if (this.isReplensishment) {
              orderCreates = "plugin.service-station.frontend.create.index";
            } else if (this.isOpenTeam || this.isJoinTeam) {
              orderCreates =
                "plugin.fight-groups.frontend.controllers.create.index";
            } else if (this.isShowDistributionStation) {
              orderCreates = "plugin.delivery-station.frontend.create.index";
            } else if (_root_tag == "POrder") {
              orderCreates = "plugin.pending-order.frontend.create.index";
            } else if (_root_tag == "buyCar") {
              orderCreates = "plugin.staging-buy-car.frontend.create.index";
            }else if (_root_tag == "appointment_goods") {
              orderCreates = "plugin.appointment.frontend.order.create";
            } else if (_root_tag == "yun_sign_goods") {
              orderCreates = "plugin.yun-sign.frontend.order.create";
            } else {
              orderCreates = "order.create";
            }

            $http
              .post(orderCreates, json, "提交中")
              .then(
                function(response) {
                  if (response.result === 1) {
                    //that.$router.push({ name: "orderlist", params: { status: "1" }, query: { i: that.toi } });
                    //status:"2" 合并支付
                    //that.$router.push({ name: "orderpay", params: { status: "2", order_ids: response.data.order_ids }, query: { i: that.toi } });
                    that.deleteAddressData();
                    that.$router.push(
                      that.fun.getUrl("orderpay", {
                        status: "2",
                        order_ids: response.data.order_ids
                      })
                    );
                  } else {
                    Toast(response.msg);
                  }
                  that.submit_active = true;
                  setTimeout(function() {
                    clicktag = 0;
                  }, 1000);
                },
                function(response) {
                  that.submit_active = true;
                  console.log(response);
                }
              )
              .catch(err => {
                that.submit_active = true;
                console.log(err);
              });
          }
        }
      }
    },
    //删除那个区域代理的地址id
    deleteAddressData() {
      window.localStorage.removeItem("level");
      window.localStorage.removeItem("province_id");
      window.localStorage.removeItem("city_id");
      window.localStorage.removeItem("district_id");
      window.localStorage.removeItem("street_id");
    },
    // 组装json数据
    assembleJson() {
      let json = {
        //公共数据
        address: JSON.stringify(currentAddress),
        goods: JSON.stringify(this.assembleGoods()),
        member_coupon_ids: JSON.stringify(this.assembleCoupons()),
        orders: JSON.stringify(this.assembleDeduction()),
        // 发票
        invoice_type: this.iscur_c ? 0 : 1,
        rise_type: this.iscur ? 1 : 0,
        call: this.invoice_list.call,
        company_number: this.invoice_list.company_number
      };

      if(this.hasGoodOpenDF()){
        //有商品开启自定义表单
        console.log("有商品开启自定义表单");
        json.order_goods = JSON.stringify(this.assembleGoodsDFData())
      }

      if (_root_tag == TAG_ACTION_BUY || _root_tag == "buyCar" ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        json.dispatch_type_id = 1;
        json.mark = this.$route.params.mark;
        //isOpenTeam 一键开团
        if (this.isOpenTeam) {
          json.level_id = this.$route.params.level_id;
          json.option_level_id = this.$route.params.option_level_id;
        } else if (this.isJoinTeam) {
          json.team_id = this.$route.params.team_id;
          json.option_level_id = this.$route.params.option_level_id;
        }
      } else if (_root_tag == TAG_ACTION_CART) {
        json.dispatch_type_id = 1;
        json.cart_ids = JSON.stringify(_cart_ids);
      } else if (_root_tag == "store") {
        json.dispatch_type_id = this.selected;
        json.store_id = this.store_id;
        json.mobile = this.linkinfo.mobile;
        json.realname = this.linkinfo.name;
        json.cart_ids = JSON.stringify(this.storeCarts);
      } else if (_root_tag == "rentCartBuy" || _root_tag == "rentBuy") {
        let right = window.localStorage.getItem("rentTimeRight");

        let choose = window.localStorage.getItem("rentTimeChoose");

        let self = window.localStorage.getItem("rentTimeSelf");

        let r = this.fun.isTextEmpty(right) == null ? [] : right;

        let assem = {};

        if (!this.fun.isTextEmpty(choose)) {
          assem = choose;
        } else if (!this.fun.isTextEmpty(self)) {
          assem = self;
        } else {
          assem = {};
        }

        json.lease_rights = r;
        json.lease_term = assem;
        json.dispatch_type_id = 1;
        json.cart_ids = JSON.stringify(_cart_ids);
        json.mark = this.$route.params.mark;
      } else if (_root_tag == "packagBuy") {
        // 套餐购买
        json.package_id = _packagJson.package_id;
        json.dispatch_type_id = 1;
      } else if (_root_tag == "POrder") {
        json.dispatch_type_id = 1;
        json.mark = this.$route.params.mark;
        json.pending_order_type = this.POChooseType;
      } else if (_root_tag == "fromExchange") {
        // 兑换中心
        json.dispatch_type_id = 1;
        json.mark = this.$route.params.mark;
      }

      if (this.isPhoto) {
        //相册参数
        json.thumbs = this.fileList1;
        json.is_open_photo_order = 1;
      }

      if (this.isShowDiyForm) {
        json.diyform_id = this.form_data_id; //自定义表单
      }

      if (this.is_open_package_deliver && this.selfCarrySelected == "8") {
        json.dispatch_type_id = 8;
        json.package_deliver_id = this.defaultSelfCarry.id;
        json.realname = this.distributionUserName;
        json.mobile = this.distributionUserMobile;
        delete json.address;
      }
      if (this.isReplensishment) {
        json.service_id = this.$route.params.service_id;
      } else if (this.isShowDistributionStation) {
        json.delivery_id = this.DistributionModel.id;
        json.dispatch_type_id = this.DistributionSelect;
        if (this.DistributionSelect == "5") {
          json.realname = this.distributionUserName;
          json.mobile = this.distributionUserMobile;
          delete json.address;
        }
      }

      if(this.$store.state.liveRoomID){
        json.room_id = this.$store.state.liveRoomID;
      }
      return json;
    },

    // 组装商品信息
    assembleGoods() {
      let newGoods = [];

      for (let j = 0; j < this.goodsInfo.orders.length; j++) {
        for (let i = 0; i < this.goodsInfo.orders[j].order_goods.length; i++) {
          let model = {};
          model.goods_id = this.goodsInfo.orders[j].order_goods[i].goods_id;
          model.total = this.goodsInfo.orders[j].order_goods[i].total;
          model.option_id = this.goodsInfo.orders[j].order_goods[
            i
          ].goods_option_id;
          newGoods.push(model);
        }
      }
      return newGoods;
    },
    assembleGoodsDFData(){
      //组装商品自定义表单信息
      let that = this;
      let newGoodsDF = [];
      for (let j = 0; j < this.goodsInfo.orders.length; j++) {
        for (let i = 0; i < this.goodsInfo.orders[j].order_goods.length; i++) {
          if(that.goodsInfo.orders[j].order_goods[i].diy_form){
            let modelDF = {};
            modelDF.pre_id = this.goodsInfo.orders[j].order_goods[i].pre_id;
            modelDF.diyform_data_id = this.goodsInfo.orders[j].order_goods[i].diy_form.diyform_data_id;
            newGoodsDF.push(modelDF);
          }
        }
      }
      return newGoodsDF;
    },

    // 组装优惠券json信息
    assembleCoupons() {
      let coupons = [];

      for (let i = 0; i < this.checkCouponList.length; i++) {
        coupons.push(this.checkCouponList[i].id);
      }

      return coupons;
    },
    // 组装优惠抵扣信息
    assembleDeduction() {
      let deductions = [];

      // this.checkDeductionList[i].note = this.note[this.checkDeductionList[i].pre_id]

      for (let i = 0; i < this.checkDeductionList.length; i++) {
        // this.checkDeductionList[i].deduction_ids = this.checkDeductionList[i].deduction_ids.join(',')
        deductions.push(this.checkDeductionList[i]);
      }
      return deductions;
    },

    // 初始化优惠券
    initCoupon(coupon) {
      this.coupon_size = coupon.length;
      this.coupons = coupon;
    },

    //初始化带有默认选中优惠券
    DefaultSelectCoupon(coupon) {
      this.coupon_size = coupon.length;
      this.coupons = coupon;
      this.checkCouponList = [];
      coupon.forEach((item, ind) => {
        if (item.checked == true) {
          this.checkCouponList.push(item);
        }
      });
      this.use_coupon_size = this.checkCouponList.length;
    },

    // 优惠券
    showCoupon() {
      if (this.coupon_size == 0) {
        Toast("暂无优惠券使用");
        return;
      }
      this.popupCouponSpecs = true;
    },

    // 选择优惠券
    selectCoupon(value, valObj) {
      // 处理选择
      // this.screenCoupon(value)
      // 因为换了组件改调用方法
      this.screenCoupon(value, valObj);
      // 设置已经使用多少优惠券
      this.use_coupon_size = this.checkCouponList.length;

      // 重新计算
      if (_root_tag == TAG_ACTION_BUY ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        this.getDataActionBuy(); // 直接购买
      } else if (_root_tag == "fromExchange") {
        this.getExchangeData(0); // 兑换中心
      } else if (_root_tag == TAG_ACTION_CART) {
        this.getDataActionCart(); // 购物车结算
      } else if (_root_tag == "store") {
        this.getDataActionStoreCart(); // 门店结算
      } else if (_root_tag == "rentCartBuy" || _root_tag == "rentBuy") {
        this.rentGoodBuy();
      } else if (_root_tag == "packagBuy") {
        // 套餐购买
        this.goPackagBuy();
      } else if (_root_tag == "buyCar") {
        // 分期购车
        this.getDataCarBuy();
      }
    },
    chooseCoupon(index) {
      this.coupons[index].checked = true;
    },

    // 筛选数据优惠券状态
    screenCoupon(value, valObj) {
      var tarValue = valObj;
      console.log("选中优惠券", value, valObj);
      // if (value.target.checked)//选中添加
      // {
      //
      //   this.cup_notice = false
      //   if (this.checkCouponList.length > 0) {
      //     for (let i = 0; i < this.checkCouponList.length; i++) {
      //       if (this.checkCouponList[i].id == value.target._value.id) {
      //         this.checkCouponList.splice(i, 1)
      //       }
      //     }
      //     this.checkCouponList.push(value.target._value)
      //   } else {
      //     this.checkCouponList.push(value.target._value)
      //   }
      //
      // } else {//取消选中
      //
      //   this.cup_notice = true
      //
      //   if (this.checkCouponList.length > 0) {
      //     for (let i = 0; i < this.checkCouponList.length; i++) {
      //       if (this.checkCouponList[i].id == value.target._value.id) {
      //         this.checkCouponList.splice(i, 1)
      //       }
      //     }
      //   }
      // }
      if (value.target.checked) {
        // 选中添加
        this.cup_notice = false;
        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == tarValue.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
          this.checkCouponList.push(tarValue);
        } else {
          this.checkCouponList.push(tarValue);
        }
      } else {
        // 取消选中

        this.cup_notice = true;

        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == tarValue.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
        }
      }
    },

    // 抵扣选择响应
    discountHandle(item, value) {
      this.screenDiscount(item, value);
      this.discount_price = 0;
      // 重新计算
      if (_root_tag == TAG_ACTION_BUY || _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        this.getDataActionBuy(); // 直接购买
      } else if (_root_tag == "fromExchange") {
        this.getExchangeData(0); // 直接购买
      } else if (_root_tag == TAG_ACTION_CART) {
        this.getDataActionCart(); // 购物车结算
      } else if (_root_tag == "store") {
        this.getDataActionStoreCart(); // 门店结算
      } else if (_root_tag == "rentCartBuy" || _root_tag == "rentBuy") {
        this.rentGoodBuy();
      } else if (_root_tag == "packagBuy") {
        // 套餐购买
        this.goPackagBuy();
      } else if (_root_tag == "buyCar") {
        // 分期购车
        this.getDataCarBuy();
      }
    },

    // 发票触发抵扣事件
    noteHandle(event, item) {
      if (!item.order_deductions[0]) {
        // 临时数据
        let _deductionItem = {};
        let tempDeduction_ids = [];
        if (this.checkDeductionList.length > 0) {
          for (let i = 0; i < this.checkDeductionList.length; i++) {
            if (this.checkDeductionList[i].pre_id == item.pre_id) {
              // 先获取回来
              if (
                this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)
              ) {
                tempDeduction_ids = [];
              } else {
                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
              }
              this.checkDeductionList.splice(i, 1);
              break;
            }
          }

          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }
        } else {
          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }
        }
      } else {
        this.screenDiscount(item, item.order_deductions[0]);
      }

      console.log("this.checkDeductionList::::", this.checkDeductionList);
    },

    // 筛选抵扣
    screenDiscount(item, value) {
      // console.log("value::::", value)

      // 临时数据
      let _deductionItem = {};
      let tempDeduction_ids = [];

      if (value.checked) {
        // 选中添加

        if (this.checkDeductionList.length > 0) {
          for (let i = 0; i < this.checkDeductionList.length; i++) {
            if (this.checkDeductionList[i].pre_id == item.pre_id) {
              // 先获取回来
              if (
                this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)
              ) {
                tempDeduction_ids = [];
              } else {
                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
              }

              this.checkDeductionList.splice(i, 1);
              break;
            }
          }

          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) <= 0) {
          //     tempDeduction_ids.push(value.code)
          //     _deductionItem.deduction_ids = tempDeduction_ids
          //     _deductionItem.pre_id = item.order.pre_id
          //     this.checkDeductionList.push(_deductionItem)
          //     console.log("LengthPush:",_deductionItem)
          // }
        } else {
          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            tempDeduction_ids.push(value.code);
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) <= 0) {
          //     tempDeduction_ids.push(value.code)
          //     _deductionItem.deduction_ids = tempDeduction_ids
          //     _deductionItem.pre_id = item.order.pre_id
          //     this.checkDeductionList.push(_deductionItem)
          //     console.log("LengthPush:", _deductionItem)
          // }
        }
      } else {
        // 取消选中
        if (this.checkDeductionList.length > 0) {
          for (let i = 0; i < this.checkDeductionList.length; i++) {
            if (this.checkDeductionList[i].pre_id == item.pre_id) {
              // 先获取回来
              if (
                this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)
              ) {
                tempDeduction_ids = [];
              } else {
                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
              }
              this.checkDeductionList.splice(i, 1);
              break;
            }
          }

          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }

          // if (tempDeduction_ids.indexOf(value.code) > -1) {
          //     tempDeduction_ids.removeByValue(value.code)
          //     _deductionItem.deduction_ids = tempDeduction_ids
          //     _deductionItem.pre_id = item.order.pre_id
          //     this.checkDeductionList.push(_deductionItem)
          //     console.log("LengthPush:", _deductionItem)
          // }
        } else {
          if (tempDeduction_ids.length > 0) {
            for (let j = 0; j < tempDeduction_ids.length; j++) {
              if (tempDeduction_ids[j] == value.code) {
                tempDeduction_ids.splice(j, 1);
              }
            }

            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          } else {
            // tempDeduction_ids.push(value.code)
            _deductionItem.deduction_ids = tempDeduction_ids;
            _deductionItem.pre_id = item.pre_id;
            _deductionItem.note = this.note[item.pre_id];
            this.checkDeductionList.push(_deductionItem);
          }
          // if (tempDeduction_ids.indexOf(value.code) > -1) {
          //     tempDeduction_ids.removeByValue(value.code)
          //     _deductionItem.deduction_ids = tempDeduction_ids
          //     _deductionItem.pre_id = item.order.pre_id
          //     this.checkDeductionList.push(_deductionItem)
          //     console.log("LengthPush:", _deductionItem)
          // }
        }
      }

      // console.log('checkList:', this.checkDeductionList)
    },

    // 新增地址v2----------------------------------------------新增地址v2//
    // 显示增加地址
    showAddAddress() {
      this.form = {
        username: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        street: "",
        address: "",
        isDefault: false
      };
      this.addressName = "";
      this.popAddAddress = true;
      this.create = true;
    },

    // 关闭增加地址
    popAddressClose() {
      this.popAddAddress = false;
    },

    // 地址回调
    addressCallback(obj) {
      this.form.street = "";
      this.districtVal = "";
      this.addressName =
        obj.itemName1 + " " + obj.itemName2 + " " + obj.itemName3;
      this.form.province = obj.itemName1;
      this.form.city = obj.itemName2;
      this.form.district = obj.itemName3;
      this.getStreet(obj.itemValue3);
    },

    // 获取街道
    getStreet(param) {
      $http
        .get("member.memberAddress.street", {
          district_id: param
        })
        .then(response => {
          if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
            if (
              !this.fun.isTextEmpty(response.data) &&
              response.data.length > 0
            ) {
              this.districtVal = response.data;
              this.strShow = true;
            } else {
              this.strShow = false;
            }
          } else {
            this.strShow = false;
          }
        })
        .catch(error => {
          this.strShow = false;
          console.log(error);
        });
    },

    streetChoose() {
      if (this.fun.isTextEmpty(this.addressName)) {
        MessageBox.alert("请先选择所在地区");
      } else {
        this.streetShow = true;
      }
    },

    streetConfirm(name) {
      this.form.street = name;
      this.streetShow = false;
    },

    // 增加/修改地址
    appendAddress(str) {
      var that = this;

      if (this.fun.isTextEmpty(this.form.username)) {
        MessageBox.alert("请输入收货人姓名");
        return;
      }

      if (this.fun.isTextEmpty(this.form.mobile)) {
        MessageBox.alert("请输入联系电话");
        return;
      }
      if (!/^[0-9]{1,}$/.test(this.form.mobile)) {
        MessageBox.alert("请输入正确的联系电话");
        return;
      }

      // if (this.fun.isMoblie(this.form.mobile)) {
      //   MessageBox.alert("请输入正确的手机号");
      //   return;
      // }

      if (this.fun.isTextEmpty(this.addressName)) {
        MessageBox.alert("请选择所在区域");
        return;
      }

      if (this.strShow && this.fun.isTextEmpty(this.form.street)) {
        MessageBox.alert("请选择所在街道");
        return;
      }

      if (this.fun.isTextEmpty(this.form.address)) {
        MessageBox.alert("请输入详细地址");
        return;
      }

      let json = {};
      if (this.strShow) {
        json = {
          username: this.form.username,
          mobile: this.form.mobile,
          province: this.form.province,
          city: this.form.city,
          district: this.form.district,
          street: this.form.street,
          address: this.form.address,
          isdefault: this.form.isDefault ? 1 : 0,
          address_id: this.form.address_id
        };
      } else {
        json = {
          username: this.form.username,
          mobile: this.form.mobile,
          province: this.form.province,
          city: this.form.city,
          district: this.form.district,
          address: this.form.address,
          isdefault: this.form.isDefault ? 1 : 0,
          address_id: this.form.address_id
        };
      }

      let api = "";
      if (str === "update") {
        api = "member.member-address.update";
      } else {
        api = "member.member-address.store";
      }

      $http.post(api, json, "").then(
        function(response) {
          if (response.result == 1) {
            MessageBox.alert(response.msg);
            that.popAddressClose();
            that.setAddressViewData(response.data);
            that.requestByAddress(); // 选择地址后重新计算
            that.form = {
              username: "",
              mobile: "",
              province: "",
              city: "",
              district: "",
              street: "",
              address: "",
              isDefault: false
            };
            that.addressName = "";
          } else {
            MessageBox.alert(response.msg);
          }
        },
        function(response) {
          // error callback
        }
      );
    },
    // 新增地址v2----------------------------------------------新增地址v2//

    alertMyInfo() {
      this.$router.push(
        this.fun.getUrl("myinfo", {
          tag: this.$route.params.tag,
          goodsId: this.$route.params.goodsId,
          optionsId: this.$route.params.optionsId,
          total: this.$route.params.total
        })
      );
    },
    //更换自提点 （杨朗）
    replaceZT() {
      let that = this;
      this.$router.push(
        that.fun.getUrl("SelfCarry_info", {
          tag: that.$route.params.tag,
          goodsId: that.$route.params.goodsId,
          optionsId: that.$route.params.optionsId,
          total: that.$route.params.total,
          id: that.diyform_id, //跳转到其他页面的参数传递逻辑太重复了，后期必须优化统一跳转参数。。。。看看上面的跳转返回alertMyInfo
          form_data_id: that.form_data_id,
          cart_ids: that.$route.params.cart_ids,
          store_id:that.$route.params.store_id
        })
      );
    },

    //门店过期商品下单
    getCashGood() {
      $http
        .get("plugin.store-cashier.frontend.store.enter.getSetGoodsId", {}, "")
        .then(
          response => {
            if (response.result === 1) {
              this.goods_id = response.data.goods_id;
              if (!response.data.store) {
                _goodsId = this.goods_id;
                _root_tag = "-2";
                this.store_id = 0;
                this.getDataActionBuy();
              } else {
                _root_tag = "store";

                this.store_info = response.data.store;
                this.dispatch = this.store_info.dispatch_type;

                if (this.dispatch.length > 0) {
                  if (!this.selected) {
                    this.selected = this.dispatch[0].toString();
                  }
                }
                this.getDataActionStoreCart();
              }
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    initStore() {
      const that = this;
      this.recipient_name = "";
      this.recipient_mobile = "";
      $http
        .get(
          "plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id",
          {
            store_id: that.store_id
          },
          " "
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.dispatch = response.data.dispatch_type;

              that.store_info = response.data;

              if (that.dispatch.length > 0) {
                if (!that.selected) {
                  that.selected = that.dispatch[0].toString();
                }
              }
              console.log("dispatch::::", that.dispatch);
              that.recipient_name = response.data.store_carry.name;
              that.recipient_mobile = response.data.store_carry.number;
              that.getDataActionStoreCart();
            } else {
              Toast(response.msg);
              that.$router.go(-1);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    // 租赁购物车结算
    getRentDataActionCart(right, rent) {
      if (_root_tag == "rentCartBuy") {
        let that = this;
        let json = {
          lease_rights: right,
          lease_term: rent,
          cart_ids: _cart_ids,
          member_coupon_ids: this.assembleCoupons(),
          orders: JSON.stringify(this.assembleDeduction()),
          address: JSON.stringify(currentAddress),
          dispatch_type_id: 1,
          mark: this.$route.params.mark
        };

        //自提点开启
        if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
          json.dispatch_type_id = this.selfCarrySelected;
        }

        $http.get("plugin.lease-toy.api.order.cart-buy", json, "生成中").then(
          function(response) {
            if (response.result == 1) {
              that.goodsInfo = response.data;
              that.cup_notice = true;
              // that.order = response.data.order
              // that.dispatch = response.data.dispatch
              that.setViewData(response.data); // 设置界面
              that.setAddressViewData(
                response.data.dispatch.default_member_address
              ); // 设置地址界面
              that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
              if (that.is_open_package_deliver) {
                that.selfCarryType = response.data.dispatch.delivery_method;
              }
              if(that.selfCarryType.length > 0){
                for(let i = 0;i<that.selfCarryType.length;i++){
                  that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
                }
                if(that.orderFirst == 0) {
                  that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                  that.orderFirst = 1;
                }
              }
            } else {
              that.cup_notice = true;
              Toast(response.msg);
              that.$router.go(-1);
            }
          },
          function(response) {
            console.log(response);
          }
        );
      } else if (_root_tag == "rentBuy") {
        let that = this;
        let json = {
          lease_rights: right,
          lease_term: rent,
          goods_id: _goodsId,
          total: _total,
          option_id: _optionsId,
          member_coupon_ids: this.assembleCoupons(),
          orders: JSON.stringify(this.assembleDeduction()),
          address: JSON.stringify(currentAddress),
          dispatch_type_id: 1,
          mark: this.$route.params.mark ? this.$route.params.mark : 0
        };

        //自提点开启
        if (this.is_open_package_deliver && this.selfCarrySelected == "8"){
          json.dispatch_type_id = this.selfCarrySelected;
        }

        $http.get("plugin.lease-toy.api.order.goods-buy", json, "生成中").then(
          function(response) {
            // console.log(response.data)
            if (response.result == 1) {
              that.goodsInfo = response.data;
              that.cup_notice = true;
              // that.order = response.data.order
              // that.dispatch = response.data.dispatch
              that.setViewData(response.data); // 设置界面
              that.setAddressViewData(
                response.data.dispatch.default_member_address
              ); // 设置地址界面
              that.initCoupon(response.data.discount.member_coupons); // 设置优惠券信息
              if (that.is_open_package_deliver) {
                that.selfCarryType = response.data.dispatch.delivery_method;
              }
              if(that.selfCarryType.length > 0){
                for(let i = 0;i<that.selfCarryType.length;i++){
                  that.selfCarryType[i].dispatch_type_id = that.selfCarryType[i].dispatch_type_id.toString();
                }
                if(that.orderFirst == 0) {
                  that.selfCarrySelected = that.selfCarryType[0].dispatch_type_id;
                  that.orderFirst = 1;
                }
              }
            } else {
              Toast(response.msg);
              that.$router.go(-1);
            }
          },
          function(response) {
            console.log(response);
          }
        );
      }
    },

    // 获取租期列表
    getRentTimeList() {
      $http
        .get("plugin.lease-toy.api.lease-term.index", {})
        .then(response => {
          // console.log(response)
          if (response.result == 1) {
            this.rentTime = response.data.list;
            this.rentFree = response.data.level.rent_free;
            this.agreeCon = response.data.lease_toy_set;

            this.rent_deposit_free = response.data.level.deposit_free;

            this.rent_free = response.data.level.rent_free;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 权益商品选择事件
    rentSelect() {
      console.log(this.isOpenRight);
      // 1.判断是否选择权益商品，有则租期按照会员权益日期计算

      this.clearStorage();

      this.judgeIsRight();

      if (this.isOpenRight) {
        let arr = [];

        this.order_data.forEach(val => {
          val.order_goods.forEach(item => {
            // console.log(item)
            let obj = {
              goods_id: item.goods_id,
              total: item.total
            };
            arr.push(obj);
          });
        });

        window.localStorage.setItem("rentTimeRight", JSON.stringify(arr));

        this.getRentDataActionCart(JSON.stringify(arr), []);
      } else if (!this.isOpenRight) {
        this.currentIndex = "999";
        this.getRentDataActionCart([], []);
      } else {
        return;
      }
    },

    // 判断是否选择权益商品
    judgeIsRight() {
      if (this.isOpenRight) {
        this.isRightChoose = false;
      } else {
        this.isRightChoose = true;
      }
    },

    // 选择租期
    rentTimeChoose(item, index) {
      if (this.currentIndex == index) {
        this.currentIndex = "999";

        this.clearStorage();

        this.getRentDataActionCart([], []);
      } else {
        this.clearStorage();

        this.currentIndex = index;

        let obj = {
          days: 0,
          lease_term_id: item.id
        };

        window.localStorage.setItem("rentTimeChoose", JSON.stringify(obj));

        this.getRentDataActionCart([], JSON.stringify(obj));
      }
    },

    // 选择自定义租期
    rentSelfChoose() {
      this.clearStorage();

      this.currentIndex = "999";

      MessageBox.prompt("请输入租期")
        .then(({ value, action }) => {
          // console.log(value)

          if (this.fun.isTextEmpty(value)) {
            MessageBox.alert("租期不能为空");
            return;
          }

          let obj = {
            days: value,
            lease_term_id: 0
          };

          window.localStorage.setItem("rentTimeSelf", JSON.stringify(obj));

          this.getRentDataActionCart([], JSON.stringify(obj));
        })
        .catch(error => {
          console.log("取消自定义租期！！！");
        });
    },

    //租赁商品下单
    rentGoodBuy() {
      if (this.isOpenRight) {
        this.getRentDataActionCart(
          window.localStorage.getItem("rentTimeRight"),
          []
        );
      } else {
        if (this.currentIndex == "999") {
          if (
            !this.fun.isTextEmpty(window.localStorage.getItem("rentTimeSelf"))
          ) {
            let val = window.localStorage.getItem("rentTimeSelf");
            this.getRentDataActionCart([], val);
          } else {
            this.getRentDataActionCart([], []);
          }
        } else {
          if (
            !this.fun.isTextEmpty(window.localStorage.getItem("rentTimeChoose"))
          ) {
            let param = window.localStorage.getItem("rentTimeChoose");
            this.getRentDataActionCart([], param);
          }
        }
      }
    },

    // 清除localstorage
    clearStorage() {
      window.localStorage.removeItem("rentTimeSelf");
      window.localStorage.removeItem("rentTimeChoose");
      window.localStorage.removeItem("rentTimeRight");
    },

    showAgreement() {
      this.agreementShow = true;
    },

    showPay() {
      this.agreementPayShow = true;
    },

    getLocation() {
      var that = this;
      var myLocation = this.$store.state.o2oLocation;

      if (!myLocation.point) {
        var mapObj = new AMap.Map("iCenter");
        mapObj.plugin("AMap.Geolocation", function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
        });

        function onComplete(obj) {
          var res =
            "经纬度：" +
            obj.position +
            "\n精度范围：" +
            obj.accuracy +
            "米\n定位结果的来源：" +
            obj.location_type +
            "\n状态信息：" +
            obj.info +
            "\n地址：" +
            obj.formattedAddress +
            "\n地址信息：" +
            JSON.stringify(obj.addressComponent, null, 4);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");
          that.point = {
            lat: position[1],
            lng: position[0]
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
            ? obj.addressComponent.city
            : obj.addressComponent.province;

          var pos = {
            address: obj.formattedAddress,
            city: that.city,
            title: obj.formattedAddress,
            point: that.point
          };
          console.log("test pos", pos);
          if (that.is_open_package_deliver) {
            that.getList(pos);
          } else if (that.isShowDistributionStation) {
            that.getDeliveryStationList(pos);
          }
          that.$store.commit("updateLocation", pos);
          that.$store.commit("setLocation", pos);
        }

        function onError(obj) {
          Toast("定位失败,请手动切换位置");
          that.isQuest_ing = false;
        }
      } else {
        if (that.is_open_package_deliver) {
          that.getList(myLocation);
        } else if (that.isShowDistributionStation) {
          that.getDeliveryStationList(myLocation);
        }
      }
    },
    //获取自提点列表（杨朗）
    getList(_data) {
      let that = this;
      let p = this.fun.bd_encrypt(_data.point.lng, _data.point.lat);
      let json = {
        city_name: _data.city,
        lat: p.lat,
        lng: p.lng,
        kwd: ""
      };
      this.isQuest_ing = true;
      $http.get("plugin.package-deliver.frontend.deliver.getList", json).then(
        function(response) {
          that.isQuest_ing = false;
          if (response.result === 1) {
            that.deliverName = response.data.name;
            that.defaultSelfCarry = response.data.list.data[0]
              ? response.data.list.data[0]
              : ""; //取第一个为默认自提点。。。
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          that.isQuest_ing = false;
          console.log(response);
        }
      );
    },
    //获取配送站列表
    getDeliveryStationList(posData) {
      let that = this;
      let json = {
        lng: posData.point.lng,
        lat: posData.point.lat,
        city_name: posData.city
      };
      $http
        .get(
          "plugin.delivery-station.frontend.delivery-station.get-list",
          json,
          "获取配送站信息"
        )
        .then(response => {
          // console.log(response)
          if (response.result == 1) {
            that.DistributionInfo = response.data.data;
            that.DistributionModel = that.DistributionInfo[0];
          } else {
            Toast(response.msg);
            that.isShowDistributionStation = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    isFocus() {
      this.isResize = true;
    },
    isBlur() {
      this.isResize = false;
    },
    getPendingOrder_type() {
      //获取批发区下单页类型判断
      let that = this;
      $http
        .get(
          "plugin.pending-order.frontend.wholesale-area.pending-order-type",
          {},
          ""
        )
        .then(response => {
          // console.log(response)
          if (response.result == 1) {
            if (response.data.status == 0) {
              that.pdOrderType = [
                { name: "零售", code: "0" },
                { name: "自用", code: "1" }
              ];
              that.POChooseType = "0";
            } else {
              that.pdOrderType = [{ name: "自用", code: "1" }];
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    POChangeType(_id) {
      //挂单导航栏改变
      console.log(this.POChooseType);
      this.getDataActionBuy();
    },
    hasGoodOpenDF(){
      let that  = this;
      for (let j = 0; j < this.goodsInfo.orders.length; j++) {
        for (let i = 0; i < that.goodsInfo.orders[j].order_goods.length; i++) {
          if(that.goodsInfo.orders[j].order_goods[i].diy_form){
            console.log("有商品开启自定义表单！！！")
            return true;
          }
        }
      }
    },
    isAllDFOk(){
      //判断是否有商品开启自定义表单但是没有提交的，没提交过的diyform_data_id为0
      let that = this;
      for (let j = 0; j < this.goodsInfo.orders.length; j++) {
        for (let i = 0; i < that.goodsInfo.orders[j].order_goods.length; i++) {
          if(that.goodsInfo.orders[j].order_goods[i].diy_form&&that.goodsInfo.orders[j].order_goods[i].diy_form.diyform_data_id == 0){
            console.log("有未填写的表单！！！")
            return true;
          }
        }
      }
    },
    dfsave(_dyData){
      console.log("diyFormPopup组件它点击提交了,这是它的数据",_dyData);
      let that = this;
      console.log('safsfsafdsafa',that.activeDYGoodID)
      for (let j = 0; j < this.goodsInfo.orders.length; j++) {
        for (let i = 0; i < that.goodsInfo.orders[j].order_goods.length; i++) {
          if(that.goodsInfo.orders[j].order_goods[i].goods_id == that.activeDYGoodID){
            that.goodsInfo.orders[j].order_goods[i].diy_form.diyform_data_id = _dyData;
            console.log("设置that.goodsInfo",that.goodsInfo);
            this.dyFormPopup =false;
            return;
          }
        }
      }
    },
    getGoodDFData(_gID,_dyID,_fDataID){
      console.log("表单id;;;;;",_gID,_dyID,_fDataID);
      this.goodDYDormID = _dyID;
      this.activeDYGoodID = _gID;
      this.activeFormDataID = _fDataID;
      let that = this;
      let _json = {
        form_id: _dyID
      }
      if(_fDataID){
        _json.form_data_id = _fDataID;
      }
      $http.get("plugin.diyform.api.diy-form.getSingleFormData", _json).then(function(response) {
        if (response.result === 1) {
          that.dfData = response.data;
          that.dyFormPopup=true;
          that.dyThumb = response.data.thumb?response.data.thumb:null;
          that.dyDescription = response.data.description?response.data.description:null;
          that.dyTiitle = response.data.title?response.data.title:'表单信息';
        } else {
          MessageBox.alert(response.msg)
        }
      },
      function(response) {
        console.log(response);
      });
    }
  },
  components: {
    cTitle,cDyPopup
  },
  watch: {
    DistributionModel(val) {
      this.DistributionModel = val;
      this.DistributionSelect = this.DistributionModel.method_name[0].code;
      if (_root_tag == TAG_ACTION_BUY ||  _root_tag == "appointment_goods" ||  _root_tag == "yun_sign_goods") {
        this.getDataActionBuy(); // 直接购买
      } else if (_root_tag == TAG_ACTION_CART) {
        this.getDataActionCart(); // 购物车结算
      }
    }
  }
};
