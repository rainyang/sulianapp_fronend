<template>
  <div id="balance_recharge">
    <c-title :hide="false"
             text="订单支付"></c-title>
    <div style="height: 40px;"></div>
    <div class="pay-box">
      <!-- 旧支付页面 -->
      <!-- <div class="my_wrapper">
        <div class="left">
          <span>账</span><span>户</span><span>{{ balanceLang }}</span><span>：</span>
        </div>
        <div class="my-value">{{ balance }} 元</div>
      </div>
      <div class="my_wrapper">
        <div class="left">
          <span>支</span><span>付</span><span>流</span><span>水</span><span>号：</span>
        </div>
        <div class="my-value">{{ order_sn }}</div>
      </div>
      <div class="my_wrapper">
        <div class="left">
          <span>支</span><span>付</span><span>金</span><span>额：</span>
        </div>
        <div class="my-value">
          <span>{{ money }} </span> 元
        </div>
      </div> -->
      <!-- 新支付页面 -->
      <div class="account">
        <div class="span-first">
          <span>账</span><span>户</span><span>{{ balanceLang }}</span><span>：</span>
        </div>
        <div class="span-two">
          <span>{{ balance }} </span>
          <span class="b">元</span>
        </div>
      </div>
      <div class="pay-money">
        <div class="top">支付金额:</div>
        <div class="mid"><span class="s">￥</span> <span>{{ money }}</span> </div>
        <div class="bottom">支付流水号:<span>{{ order_sn }}</span></div>
      </div>
    </div>
    <div style="height: 1.25rem;"></div>
    <!-- 旧支付页面 -->
    <!-- <div id="payBtnList">
      <div class="mod_btns"
           v-for="(btn,i) in buttons"
           :key='i'>
        <a @click="confirm(btn)"
           class="mod_btn"
           :class="[btnclass(btn.value)]">{{ btn.name }}{{ typename }}</a>

        <!--环迅支付-->
    <!-- <div v-if="huanxun_form_quick == btn.value || huanxun_form_wx == btn.value">
          <form id="ipspaysubmit"
                method="post"
                :action="huanxun_form_action">
            <input type="hidden"
                   :name="huanxun_input_name"
                   v-model="huanxun_form_input" />
          </form>
        </div> -->

    <!--usdt支付-->
    <!-- <div v-if="usdt_value == btn.value">
          <form id="usdtubmit"
                method="post"
                :action="usdt_action">
            <template v-for="(item, index) in usdt_form">
              <input type="hidden"
                     :name="index"
                     :value="item" />
            </template>
          </form>
        </div>
      </div>
    </div> -->
    <!-- 新支付页面 -->
    <div id="payBtnList">
      <div class="title">
        <span class="line"></span>
        <span>支付方式</span>
      </div>
      <div class="mod_btns"
           v-for="(btn,i) in buttons"
           :key='i'>
        <a @click="confirm(btn)"
           class="mod_btn"
           :class="[btnclass(btn.value)]"> <i class="iconfont"
             :class="getIconUrl(btn)"
            ></i>{{ btn.name }}{{ typename }}</a>
        <i class="fa fa-angle-right"></i>
        <!--环迅支付-->
        <div v-if="huanxun_form_quick == btn.value || huanxun_form_wx == btn.value">
          <form id="ipspaysubmit"
                method="post"
                :action="huanxun_form_action">
            <input type="hidden"
                   :name="huanxun_input_name"
                   v-model="huanxun_form_input" />
          </form>
        </div>
        <div v-if="usdt_value == btn.value">
          <form id="usdtubmit"
                method="post"
                :action="usdt_action">
            <template v-for="(item, index) in usdt_form">
              <input type="hidden"
                     :name="index"
                     :value="item" />
            </template>
          </form>
        </div>
      </div>
    </div>
    <yd-keyboard v-model="popupSpecs"
                 title="安全键盘"
                 input-text="请输入支付密码"
                 :callback="keyboardDone"
                 ref="keyboardDemo1"></yd-keyboard>

    <van-popup v-model="showQR" :style="{ width: '80%' }">
      <img style="width: 15rem;height: 15rem;padding: 1rem;" :src="qrcode" alt="">
      <p style="font-weight: bold;font-size: 16px;padding-bottom: 0.5rem">请用微信识别二维码支付</p>
    </van-popup>
  </div>
</template>
<script>
import order_paymentcontroller from "./order_paymentcontroller";
export default order_paymentcontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
  .pay-box {
    background: #fff;
    width: 21.5625rem;
    border-radius: 0.4375rem;
    margin: 0.5625rem auto;
    .account {
      height: 2.875rem;
      border-bottom: solid 1px #f4f4f4;
      display: flex;
      justify-content: space-between;
      padding: 1rem 0.6875rem;
      .span-first {
        color: #999999;
        font-size: 12px;
      }
      .span-two {
        color: #333;
        font-size: 18px;
        .b {
          display: inline-block;
          font-size: 12px;
          color: #333333;
        }
      }
    }
    .pay-money {
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
      margin: 0 auto;
      .top {
        color: #999999;
        font-size: 12px;
      }
      .mid {
        margin: 1rem 0;
        color: #f76d6d;
        font-size: 24px;
        .s {
          display: inline-block;
          font-size: 18px;
        }
      }
      .bottom {
        font-size: 12px;
        color: #999999;
      }
    }
  }
  // .my_wrapper {
  //   text-align: left;
  //   overflow: hidden;
  //   display: flex;
  //   height: 2.75rem;
  //   line-height: 2.75rem;
  //   .left {
  //     display: flex;
  //     justify-content: space-between;
  //     flex: 0.8;
  //     margin-right: 0.625rem;
  //     color: #8c8c8c;
  //   }
  //   span {
  //     font-size: 16px;
  //     line-height: 2.75rem;
  //   }
  //   .my-value {
  //     line-height: 2.75rem;
  //     text-align: left;
  //     font-size: 16px;
  //     flex: 2;
  //     text-align: left;
  //     span {
  //       color: red;
  //     }
  //   }
  // }
}

// #payBtnList {
//   .mod_btns {
//     margin-bottom: 0.75rem;
//     font-size: 16px;
//     .mod_btn {
//       height: 2.875rem;
//       line-height: 2.875rem;
//       display: block;
//       width: 90%;
//       margin: 0 auto;
//       border-radius: 0.25rem;
//     }
//     .mod_btn.bg_wechat {
//       background: #26ce29;
//       color: #fff;
//     }
//     .mod_btn.bg_alipay {
//       background: #ff6100;
//       color: #fff;
//     }
//     .mod_btn.bg_ali {
//       background: #22aaed;
//       color: #fff;
//     }
//     .mod_btn.bg_cash {
//       background: #fb0207;
//       color: #fff;
//     }
//     //找人代付
//     .mod_btn.bg_payanother {
//       background: #ff6666;
//       color: #fff;
//     }
//     //电子钱包快捷支付
//     .mod_btn.bg_quick {
//       background: #0099ff;
//       color: #fff;
//     }
//   }
// }
#payBtnList {
  width: 21.5625rem;
  padding-top: 0.75rem;
  background-color: #fff;
  border-radius: 0.4375rem;
  margin: 0 auto;
  margin-bottom: 2.5625rem;
  .title {
    color: #f87070;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .line {
      height: 0.875rem;
      width: 0.1875rem;
      background-color: #f87070;
      display: inline-block;
      margin-right: 0.875rem;
    }
  }
  .mod_btns {
    margin: 0 0.3125rem;
    border-bottom: solid 1px #f4f4f4;
    text-align: left;
    padding-bottom: 0.875rem;
    padding-top: 0.875rem;
    padding-left: 0.5625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fa {
      font-size: 18px;
      color: #999999;
    }
    .mod_btn {
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
  .mod_btns:last-child {
    border-bottom: none;
  }
  .icon-pay_alipay {
    color: #29a1f7;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_yue {
    color: #ff7433;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_wechat {
    color: #09bb07;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_otherpay {
    color: #ffba00;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_remittance {
    color: #ff692f;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_utsd {
    color: #9000ff;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_prepay {
    color: #9000ff;
    font-size: 28px;
    margin-right: 1rem;
  }
  .icon-pay_default {
    color: #538ff9;
    font-size: 28px;
    margin-right: 1rem;
  }
}
.pay-psw-info {
  overflow-y: scroll;
  width: 100vw;
  height: auto;
  background: #fff;
  max-height: 80vh;
  padding-top: 0.625rem;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100vw;
  font-weight: 600;
}

.pay_btn {
  border-top: 0.0625rem solid #ddd;
  width: 100vw;
  height: auto;
}

.pay_btn li {
  width: 33%;
  float: left;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #fff;
  font-size: 14px;
  border-right: 0.0625rem solid #ddd;
  border-bottom: 0.0625rem solid #ddd;
}

.pay_btn li:active {
  background: #c2c2c2;
}

.b9:active {
  background: #fff !important;
}

.b9 {
  background: #c2c2c2 !important;
}

.pay_content {
  width: 100vw;
  height: 3.125rem;
  margin-bottom: 0.625rem;
}

.pay_content_title {
  width: 100vw;
  height: 1.875rem;
  line-height: 1.875rem;
  margin-bottom: 0.625rem;
  font-size: 18px;
}

.pay_content_view {
  width: 100vw;
  height: 3.125rem; // margin-left: 2px;
  border-bottom: 0.0625rem solid #ddd;
  border-top: 0.0625rem solid #ddd;
  border-right: 0.0625rem solid #ddd;
}

.ipt_pay_p {
  line-height: 3.125rem;
  height: 3.125rem;
  font-size: 20px;
}

.ipt_pay {
  float: left;
  width: 16.27%;
  height: 3.125rem;
  text-align: center;
  border-left: 0.0625rem solid #ddd;
}
  .fa-angle-right {
    flex: 0 0 1rem;
  }
</style>
