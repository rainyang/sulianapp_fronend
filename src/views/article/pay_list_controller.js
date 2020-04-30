import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      id: "",
      dataInfo: {},
      rewardPayshow: false,
      btnData: [],
      isclick:true,
      nopay:false,
      goback:false
    };
  },
  activated() {
    this.initData();
    this.id = this.$route.params.id;
    if(this.$route.params.nopay=='1'){
        this.nopay=true;
    }
    if(this.$route.params.home=='1'){
        this.goback=true;
    }
    this.getData();
  },
  deactivated() {
   
  },
  mounted() {},

  methods: {
    initData(){
        this.id="";
        this.dataInfo={};
        this.rewardPayshow=false;
        this.btnData=[];
        this.isclick=true;
        this.nopay=false;
        this.goback=false;
    },
    payBtn(type, name) {
        if(type==3&&!this.isclick){
                return 
        }
      let that = this;
      let json = {
          pay_id:type,
          money:this.dataInfo.money,
          pay_name:name,
          id:this.id,
          art:'pay'
      };
      $http
          .post(
              "plugin.article-pay.api.index.orderPay",
              json,
              "支付中..."
          )
          .then(response => {
              that.rewardPayshow = false
              if (response.result == 1) {
                  switch (type) {
                      case 1: //微信
                          wx.config(response.data.js);
                          that.WXPay(response.data.config);
                          break;
                      case 2: //支付宝
                          that.$router.push(
                              that.fun.getUrl("alipayCourse", {
                                  status: "9",
                                  url: response.data
                              })
                          );
                          break;
                      case 3: //余额
                          if(that.isclick){
                            Toast(response.msg);
                            that.isclick=false;
                            if(that.goback){
                                that.$router.push(that.fun.getUrl("home"));
                            }else{
                                that.$router.push(that.fun.getUrl("notice"));
                            }
                          }
                          break;
                      case 6: //新版微信 link
                          window.location.href = response.data;
                          break;
                      case 12: //芸支付 微信
                          that.newWXPay(response.data.config);
                          break;
                      case 7: //云收银支付宝
                          that.$router.push(
                              that.fun.getUrl("alipayCourse", {
                                  status: "9",
                                  url: response.data
                              })
                          );
                          break;
                      case 9: //微信app
                          YDB.SetWxpayInfo(
                              that.$store.state.temp.mailInfo.name,
                              "订单号：" + response.data.order_sn,
                              that.rewardMoney,
                              response.data.order_sn,
                              that.fun.getKeyByI()
                          );
                          break;
                      default:
                          break;
                  }
              } else {
                  MessageBox.alert(response.msg);
              }
          })
          .catch(error => {
              MessageBox.alert(error);
          });
  },
  //旧版微信支付参数
  WXPay(payParams) {
      var that = this;
      wx.chooseWXPay({
          appId: payParams.appId,
          timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
          package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payParams.paySign, // 支付签名
          success: function (res) {
              // 支付成功后的回调函数
              if (res.errMsg == "chooseWXPay:ok") {
                  that.$router.go(-1);
                  MessageBox.alert("支付成功", "提示");
                  that.getCurrentPayStatus(); //重新获取
                  that.getTodayPay();
              } else {
                  MessageBox.alert("支付失败", "提示");
              }
          },
          cancel: function (res) {
              //支付取消
          },
          fail: function (res) {
              MessageBox.alert("支付失败，请返回重试", "提示");
          }
      });
  },
  //新版微信支付参数
  newWXPay(payParams) {
      var that = this;
      WeixinJSBridge.invoke(
          "getBrandWCPayRequest", {
              appId: payParams.appId, //公众号名称，由商户传入
              timeStamp: payParams.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: payParams.nonceStr, //随机串
              package: payParams.package,
              signType: payParams.signType, //微信签名方式：
              paySign: payParams.paySign //微信签名
          },

          function (res) {
              that.b = res;
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                  MessageBox.alert("支付成功", "提示");
                  that.getCurrentPayStatus(); //重新获取
                  that.getTodayPay();
              } else {
                  MessageBox.alert("支付失败", "提示");
              }
          }
      );
  },
      confirm(){
        this.getPayData();
      },
      rewardPayCancelBtn() {
          this.rewardPayshow = false;
      },
      //获取支付类型参数
      getPayData() {
          this.actionSheetItems = [];
          $http
              .get("plugin.article-pay.api.index.getPayType", {})
              .then(response => {
                  if (response.result == 1) {
                      let btnData = response.data.buttons;
                      this.btnData = btnData;
                      this.rewardPayshow = true;
                  } else {

                  }
              })
              .catch(error => {
                  console.log(error);
              });
      },
    //日期转化
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = this.change(date.getDate()) + " ";
      return Y + M + D;
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    getData() {
      $http.get("plugin.article-pay.api.index.articlePayData", {id:this.id,art:'detail'}, "获取中").then(
        response => {
          if (response.result === 1) {
            this.dataInfo=response.data.payDetail;
          } else {
            
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
  },
  components: { cTitle }
};
