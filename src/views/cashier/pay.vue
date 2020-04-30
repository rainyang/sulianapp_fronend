<template>
  <div id="goodsinfo">
    <c-title :hide="false"
             text="收银台"></c-title>
    <div style="height: 40px;"></div>
    <div v-if="!showPage">
      <loading :show="true"></loading>
    </div>
    <!-- new页面 -->
    <div class="cashier" v-if="showPage">
      <div class="header">
        <div class="img">
          <img :src="store.thumb" />
        </div>
        <span>{{ store.name }}</span>
      </div>
      <div class="pay">
        <span>付款金额</span>
        <span><i>¥</i>{{ payMuch }}</span>
      </div>
      <div class="btn">
        <ul class="btn_box">
          <li class="line_one">
            <yd-button @click.native="_handleKeyPress('1')"
                       type="primary">1
            </yd-button>
            <yd-button @click.native="_handleKeyPress('2')"
                       type="primary">2
            </yd-button>
            <yd-button @click.native="_handleKeyPress('3')"
                       type="primary">3
            </yd-button>
            <yd-button @click.native="_handleKeyPress('D')"
                       type="primary"><i class="iconfont icon-seller-del"></i>
            </yd-button>
          </li>
          <li class="btn_bottom">
            <ul class="line_two">
              <li class="line-left">
                <ul class="line_box">
                  <li class="line_two">
                    <yd-button @click.native="_handleKeyPress('4')"
                               type="primary">4
                    </yd-button>
                    <yd-button @click.native="_handleKeyPress('5')"
                               type="primary">5
                    </yd-button>
                    <yd-button @click.native="_handleKeyPress('6')"
                               type="primary">6
                    </yd-button>
                  </li>
                  <li class="line_three">
                    <yd-button @click.native="_handleKeyPress('7')"
                               type="primary">7
                    </yd-button>
                    <yd-button @click.native="_handleKeyPress('8')"
                               type="primary">8
                    </yd-button>
                    <yd-button @click.native="_handleKeyPress('9')"
                               type="primary">9
                    </yd-button>
                  </li>
                  <li class="line_four">
                    <yd-button type="primary"></yd-button>
                    <yd-button @click.native="_handleKeyPress('0')"
                               type="primary">0
                    </yd-button>
                    <yd-button @click.native="_handleKeyPress('.')"
                               type="primary">.
                    </yd-button>
                  </li>
                </ul>
              </li>
              <li class="line-right">
                <yd-button type="primary"
                           @click.native="_handleKeyPress('S')">优惠<br />买单</yd-button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <yd-popup v-model="show1"
                position="right"
                height="60%"
                width="100%">
        <div class="popup">
          <div class="text_box">
            <span>去支付</span>
            <i @click="show1 = false"
               class="iconfont icon-back"></i>
          </div>
          <div style="height:40px"></div>
          <ul class="popup_pay">
            <li>待付款金额</li>
            <li>
              <span>¥</span>
              <span>{{ payMuch }}</span>
            </li>
          </ul>
          <!-- 可用 -->
          <div class="tbs"
               v-if="loadDiscount && order_data[0].order_deductions">
            <div class="list">
              <div class="score"
                   v-for="(d,i) in order_data[0].order_deductions"
                   :key='i'>
                <div class="left">
                  可用{{ parseFloat(d.coin).toFixed(2) }}{{ d.name }}
                  <span>{{ d.amount }}元</span>
                </div>
                <div class="right">
                  <mt-switch v-model="d.checked"
                             @change="discountHandle(order_data[0], d)"></mt-switch>
                </div>
              </div>
            </div>
          </div>

          <div class="tbs"
               v-if="loadDiscount && order_data[0].order_coin_exchanges">
            <div class="list">
              <div class="score"
                   v-for="(d,i) in order_data[0].order_coin_exchanges"
                   :key='i'>
                <div class="left">
                  可用{{ parseFloat(d.coin).toFixed(2) }}{{ d.name }}
                  <span>{{ d.amount }}元</span>
                </div>
                <div class="right">
                </div>
              </div>
            </div>
          </div>
          <!-- 优惠券 -->
          <div class="tbs coupon-list"
               @click="showCoupon"
               v-if="cashier_type == 'store'||cashier_type == 'hotel'">
            <div class="couponss list">
              <div class="left ">
                优惠券
                <span>{{ coupon_size }}张可用</span>
              </div>
              <div class="right">
                <font color="#E84E40">
                  <span>{{
                    use_coupon_size == 0
                      ? "未使用"
                      : "已使用" + use_coupon_size + "张"
                  }}</span>
                </font>
              </div>
            </div>
          </div>

          <div class="tbs coupon-list"
               style="padding:0"
               v-if="store_set.is_write_information == 1">
            <div class="coupon list"
                 id="phone">
              <mt-field label="联系人"
                        v-model="form.realname"
                        placeholder="请输入联系人:"
                        type="text"
                        :attr="{ maxlength: 30 }"></mt-field>
              <mt-field label="电话"
                        v-model="form.mobile"
                        placeholder="请输入电话:"
                        type="tel"
                        :attr="{ maxlength: 11 }"></mt-field>
            </div>
          </div>

          <div class="tbs">
            <!--<div class="price list">-->
            <!--<div class="left ">会员折扣</div>-->
            <!--<div class="right">-->
            <!--<div class="right">-->
            <!--<font color="#E84E40">￥{{goods_price}}</font>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!-- <div class="price list"  v-if="cashier_type == 'store'">
              <div class="left ">总优惠</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40">-￥{{ discount_price }}</font>
                </div>
              </div>
            </div>

            <div class="price list">
              <div class="left ">总抵扣</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40">-￥{{ deduction_price }}</font>
                </div>
              </div>
            </div> -->
            <div class="price list"
                 v-for="(item,index) in datas.amount_items"
                 :key="index">
              <div class="left ">{{item.name}}</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40"><span v-if="item.code=='total_deduction_price'">-</span>￥{{ item.amount }}</font>
                </div>
              </div>
            </div>

            <div class="price list"
                 v-for="(item,index) in datas.discount_amount_items"
                 :key='index'>
              <div class="left ">{{item.name}}</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40">-￥{{ item.amount }}</font>
                </div>
              </div>
            </div>

            <div class="price list"
                 v-for="(item,i) in service"
                 :key='i'>
              <div class="left ">{{item.name}}</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40">￥{{ item.amount }}</font>
                </div>
              </div>
            </div>

            <div class="price list">
              <div class="left ">实付金额</div>
              <div class="right">
                <div class="right">
                  <font color="#E84E40">￥{{ price }}</font>
                </div>
              </div>
            </div>
          </div>

          <div class="agreement"
               v-if="agreementPayData">
            <div class="right">
              <van-checkbox v-model="agreementPay"
                            checked-color="#f15353"
                            shape="square"></van-checkbox>
            </div>
            <div class="left ">
              <span style="color:red;line-height: 1.8rem"
                    @click="showPay">《支付协议》
              </span>
            </div>
          </div>

          <!-- <div class="popup_btn">
            <span class="text">去付款</span>
            <button type="button"
                    v-for="(btn,i) in payType"
                    :key='i'
                    @click="submit(btn)">
              <div class="icon_bg"
                   :style="'background:' + [btnstyle(btn.value)]">
                <i class="iconfont"
                   :class="[btnclass(btn.value)]"></i>
              </div>
              <span>{{ btn.name }}</span>
            </button>

            <!-- 环迅支付 -->
            <!-- <div
              class="price list"
              v-for="(btn,i) in payType" :key='i'
			v-if="
                huanxun_form_quick == btn.value || huanxun_form_wx == btn.value
              ">
              <form id="ipspaysubmit"
                    method="post"
                    :action="huanxun_form_action">
                <input type="hidden"
                       :name="huanxun_input_name"
                       v-model="huanxun_form_input" />
              </form>
            </div> -->

            <!--usdt支付-->
            <!-- <div v-for="(btn,i) in payType" :key='i' v-if="usdt_value == btn.value">
              <form id="usdtubmit" method="post" :action="usdt_action">
                <template v-for="(item, index) in usdt_form">
                  <input type="hidden"
                         :name="index"
                         :value="item" />
                </template>
              </form>
            </div>
          </div> -->
          <div id="payBtnList">
            <div class="title">
              <span class="line"></span>
              <span>支付方式</span>
            </div>
            <div class="mod_btns"
                 v-for="(btn,i) in payType"
                 :key='i'>
              <a @click="submit(btn)"
                 class="mod_btn"
                 > <i class="iconfont"
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
        </div>
      </yd-popup>
    </div>

    <mt-popup v-model="popupCouponSpecs"
              position="bottom"
              class="mint-popup-4"
              closeOnClickModal="true">
      <div class="add-info">
        <div class="coupon-list-info"
             v-for="(coupon,i) in coupons"
             :key='i'>
          <div class="checkList"
               style="float: left;">
            <yd-checkbox checked-color="#f15353"
                         shape="square"
                         v-model="coupon.checked"
                         :disabled="!coupon.valid"
                         :name="coupon"
                         @change.native="selectCoupon($event, coupon)">&nbsp;</yd-checkbox>
          </div>
          <div :class="{
              coupon_voucher_main: coupon.valid,
              coupon_voucher_gray: !coupon.valid
            }">
            <div class="coupon_voucher_left">
              <div v-if="coupon.belongs_to_coupon.coupon_method == 1">
                <p class="coupon_voucher_amount type_large">
                  {{ coupon.belongs_to_coupon.deduct }}
                </p>
                <p class="coupon_voucher_limit">
                  满{{ coupon.belongs_to_coupon.enough }}立减
                </p>
              </div>
              <div v-else>
                <p class="coupon_voucher_amount type_large">
                  {{ coupon.belongs_to_coupon.discount }}折
                </p>
                <p class="coupon_voucher_limit">
                  满{{ coupon.belongs_to_coupon.enough }}立享
                </p>
              </div>

              <!--<p class="coupon_voucher_amount type_large">20</p><p class="coupon_voucher_limit">满{{coupon.enough}}元可用</p>-->
            </div>
            <div class="coupon_voucher_hr"></div>
            <div class="coupon_voucher_right">
              <p class="coupon_voucher_range">
                {{ coupon.belongs_to_coupon.name }}
              </p>
              <p class="coupon_voucher_period">
                {{ coupon.time_start }}-{{ coupon.time_end }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button class=" sure"
              @click="popupCouponSpecs = fales">确认</button>
      <button class="close"
              @click="popupCouponSpecs = fales">取消</button>
    </mt-popup>

    <!--支付密码-->
    <mt-popup v-model="popupSpecs"
              position="bottom"
              closeOnClickModal="true">
      <div class="pay-psw-info">
        <div class="pay_content_title">
          支付密码
        </div>
        <div class="pay_content">
          <div class="pay_content_view">
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw1 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw2 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw3 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw4 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw5 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
            <div class="ipt_pay">
              <div class="ipt_pay_p">{{ pw6 | pwd_filter }}</div>
              <!-- <input type="password" maxlength="1" disabled> -->
            </div>
          </div>
        </div>
        <footer style="position:inherit;">
          <ul class="pay_btn">
            <li @click="onPassword('1')">1</li>
            <li @click="onPassword('2')">2</li>
            <li @click="onPassword('3')">3</li>
            <li @click="onPassword('4')">4</li>
            <li @click="onPassword('5')">5</li>
            <li @click="onPassword('6')">6</li>
            <li @click="onPassword('7')">7</li>
            <li @click="onPassword('8')">8</li>
            <li @click="onPassword('9')">9</li>
            <li class="b9"></li>
            <li @click="onPassword('0')">0</li>
            <li class="b9"
                @click="pwdDelete">删除</li>
          </ul>
        </footer>
      </div>
    </mt-popup>

    <!-- 支付协议 -->
    <yd-popup v-model="agreementPayShow"
              position="right"
              width="100%">
      <yd-navbar title="支付协议"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="agreementPayShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <div>
        <p v-html="agreementPayData"></p>
      </div>
    </yd-popup>


    <van-popup v-model="showQR" :style="{ width: '80%' }">
      <img style="width: 15rem;height: 15rem;padding: 1rem;" :src="qrcode" alt="">
      <p style="font-weight: bold;font-size: 16px;padding-bottom: 0.5rem">请用微信识别二维码支付</p>
    </van-popup>
  </div>
</template>

<script>
import pay_controller from "./pay_controller";

export default pay_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.mod_btns {
  margin: 0.625rem 0;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 16px;
  .mod_btn {
    display: block;
    width: 96%;
    margin: 0.9375rem 2%;
    border-radius: 0.3125rem;
  }
}

// new
#goodsinfo {
  /*height: 100%;*/
  .cashier {
    /*height: 33.375rem;*/
    /*position: relative;*/
    .header {
      margin: 1.875rem auto;
      display: flex;
      justify-content: center;
      .img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 1.25rem;
        overflow: hidden;
        margin-right: 0.625rem;
        img {
          width: 100%;
        }
      }
      span {
        line-height: 2.5rem;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .pay {
      width: 20.625rem;
      height: 5rem;
      line-height: 5rem;
      background: #fff;
      border: solid 0.0625rem #999;
      border-radius: 0.375rem;
      margin: 0 auto;
      padding: 0 0.875rem;
      display: flex;
      justify-content: space-between;
      span:first-child {
        line-height: 5rem;
        font-size: 16px;
        color: #8c8c8c;
      }
      span:last-child {
        font-size: 36px;
        max-width: 13rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          font-size: 16px;
        }
      }
    }
    .btn {
      background: #fff;
      position: absolute;
      bottom: 0;
      .btn_box {
        border-top: solid 0.0625rem #ccc;
        .line_one {
          display: flex;
          button {
            width: 5.8125rem;
            height: 3.9375rem;
            font-size: 36px;
            background: none;
            color: #333;
            border-radius: 0;
            padding: 0;
            border-right: solid 0.0625rem #ccc;
            i {
              font-size: 3rem;
              color: #666;
            }
          }
          button:last-child {
            border-right: none;
          }
        }
        .btn_bottom {
          .line_two {
            display: flex;
            .line-left {
              .line_box {
                .line_two {
                  display: flex;
                  border-top: solid 0.0625rem #ccc;
                  button {
                    width: 5.8125rem;
                    height: 3.9375rem;
                    font-size: 36px;
                    background: none;
                    color: #333;
                    border-radius: 0;
                    padding: 0;
                    border-right: solid 0.0625rem #ccc;
                  }
                  button:last-child {
                    border-right: none;
                  }
                }
                .line_three {
                  border-top: solid 0.0625rem #ccc;
                  display: flex;
                  button {
                    width: 5.8125rem;
                    height: 3.9375rem;
                    font-size: 36px;
                    background: none;
                    color: #333;
                    border-radius: 0;
                    padding: 0;
                    border-right: solid 0.0625rem #ccc;
                  }
                  button:last-child {
                    border-right: none;
                  }
                }
                .line_four {
                  display: flex;
                  border-top: solid 0.0625rem #ccc;
                  button {
                    width: 5.8125rem;
                    height: 3.9375rem;
                    font-size: 36px;
                    background: none;
                    color: #333;
                    border-radius: 0;
                    padding: 0;
                    border-right: solid 0.0625rem #ccc;
                  }
                  button:last-child {
                    border-right: none;
                  }
                }
              }
            }
            .line-right {
              button {
                width: 5.875rem;
                height: 12rem;
                padding: 0;
                border-radius: 0;
                font-size: 18px;
              }
            }
          }
        }
      }
    }
    // 弹窗
    .popup {
      background: #f5f5f5;
      .text_box {
        position: fixed;
        top: 0;
        z-index: 10;
        background: #fff;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom: solid 0.0625rem #ebebeb;
        span {
          font-weight: bold;
          font-size: 15px;
          color: #666;
        }
        i {
          position: absolute;
          line-height: 2.5rem;
          font-size: 1rem;
          color: #999;
          left: 0.625rem;
        }
        .icon-back:before {
          padding: 0.5rem;
        }
      }
      .popup_pay {
        margin-top: 0.625rem;
        background: #fff;
        text-align: center;
        padding: 0.625rem 0;
        li:first-child {
          color: #8c8c8c;
          font-size: 16px;
          line-height: 2.5rem;
        }
        li:last-child {
          span:first-child {
            font-size: 16px;
          }
          span:last-child {
            font-size: 36px;
          }
        }
      }
      .popup_btn {
        padding-bottom: 1.25rem;
        .text {
          display: block;
          line-height: 2.5rem;
          padding-left: 1.25rem;
          font-size: 16px;
          text-align: left;
          font-weight: bold;
          color: #666;
        }
        button {
          width: 21.5625rem;
          padding: 0 0.625rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 2.625rem;
          border-radius: 0.375rem;
          background: #fff;
          border: solid 0.0625rem #dedede;
          margin: 0 auto 0.625rem;
          .icon_bg {
            width: 2.25rem;
            height: 1.5rem;
            border-radius: 0.1875rem;
            line-height: 1.5rem;
            i {
              color: #fff;
              font-size: 1.5rem;
            }
            .card {
              display: inline-block;
              width: 2rem;
              height: 1.5rem;
              background-image: url("../../assets/images/pay_e.png");
              background-size: 2rem 2rem;
              background-position: center;
            }
          }
          span {
            color: #333;
            font-size: 16px;
            margin-left: 0.625rem;
          }
        }
      }
    }
  }
}

#goodsinfo {
  overflow: scroll;
  .onclast {
    position: relative;
    top: -18.125rem;
  }
  .goods-shop {
    background: #fff;
    line-height: 1.875rem;
    border-bottom: #e8e8e8 solid 0.0625rem;
    margin-top: 0.625rem;
    p {
      text-align: left;
      margin: 0;
      padding: 0 0 0 0.625rem;
      font-size: 12px;
      color: #555;
    }
  }
  .add-info {
    overflow-y: scroll;
    width: 100%;
    background: #fff;
    max-height: 50vh;
    padding-top: 0.625rem;
  }
  .mint-popup-4 {
    width: 100%;

    .sure {
      background: #f15353;
      height: 2.5rem;
      line-height: 2.5rem;
      color: #fff;
      width: 50%;
      border: 0;
      float: left;
    }
    .close {
      background: #eee;
      height: 2.5rem;
      line-height: 2.5rem;
      color: #333;
      width: 50%;
      border: 0;
      float: left;
    }
    .address-plus {
      background: #f15353;
      height: 2.5rem;
      line-height: 2.5rem;
      color: #fff;
      width: 100%;
      border: 0;
    }

    ul {
      overflow-y: scroll;
    }
    li {
      padding: 0.625rem 0;
      display: flex;
      position: relative;
      .liia {
        flex: 9;
        text-align: left;
        padding-left: 1.25rem;
        .name {
          font-size: 18px;
          color: #222;
          line-height: 2rem;
        }
        .address {
          font-size: 12px;
          color: #666;
          line-height: 2rem;
        }
      }
      i {
        flex: 1;
      }
    }
  }
  .addr {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background: #fff;
    padding: 0.625rem 0;
    i {
      flex: 1;
      font-size: 20px;
      color: #888888;
    }
    .el-icon-arrow-right {
      font-size: 0.9rem;
    }
    p {
      flex: 6;
      text-align: justify;
      font-weight: bold;
      line-height: 1.5rem;
      padding-right: 1rem;
      color: #333333;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #666;
      }
    }
  }
  .tbs.coupon-list {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    .couponss {
      .left {
        font-size: 16px;
        color: #333;
      }
    }
  }
  .couponss.list {
    .left span {
      color: #fff;
      background: #f15353;
      font-size: 12px;
      height: 1.25rem;
      padding: 0.25rem 0.3125rem;
      border-radius: 0.1875rem;
      margin-left: 0.3125rem;
    }
    .right font span {
      font-size: 12px;
    }
    .right font i {
      font-size: 0.8rem;
      color: #999;
    }
  }
  .tbs {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    flex-flow: row wrap;
    padding: 0.625rem;
    line-height: 1.875rem;
    font-size: 14px;
    margin-top: 0.625rem;
    .list {
      width: 100%;
      // padding-bottom: 0.625rem;
    }
    .list:nth-last-child(1) {
      padding-bottom: 0;
    }
    .score {
      display: flex;
      width: 100%;
      height: 2rem;
      clear: both;
      .left {
        flex: 1;
        align-self: center;
      }
      .right {
        flex: 0 0 2rem;
        align-self: center;
      }
    }
    .left {
      text-align: left;
      float: left;
      span {
        font-size: 14px;
      }
    }
    .right {
      text-align: right;
      float: right;
    }
    p {
      text-align: left;
      margin: 0;
      padding-right: 0.625rem;
      line-height: 2rem;
      width: 100%;
      span {
        color: #858585;
        font-size: 12px;
        float: right;
      }
    }
  }
  .agreement {
    background: #ffffff;
    width: 100%;
    padding: 0 0.5rem;
    text-align: left;
    display: flex;
    .right {
      line-height: 1.7rem;
    }
    a {
      color: #f15353;
    }
    .checkbox {
      z-index: 88;
      border-radius: 50%;
    }
    .el-checkbox {
      float: none;
    }
  }
  .detail_pay {
    text-align: left;
    height: 3rem;
    width: 100%;
    background: #fff;
    padding: 0 0 0 2%;
    margin-top: 1.875rem;
    border-top: 0.0625rem solid #eaeaea;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    line-height: 3rem;
    .order_delete {
      height: 3rem;
      width: auto;
      background: #f15353;
      padding: 0 0.9375rem;
      color: #fff;
      line-height: 3rem;
      float: right;
      border: 0.0625rem solid #f15353;
    }
  }
  // span {
  //     color: #f15353;
  //     font-size: 18px;
  // }
}

.checkList {
  position: relative;
  top: 1.875rem;
  left: 0.1875rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.el-checkbox {
  float: left;
  margin-left: 0.3125rem;
}

.coupon-list-info {
  width: 99.5vw;
}

.coupon_voucher_main {
  position: relative;
  padding-left: 6.375rem;
  height: 5rem;
  margin-left: 2.25rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  .coupon_voucher_left {
    position: absolute;
    top: 0;
    left: 0;
    width: 6.375rem;
    height: 100%;
    color: #fff;
    border-radius: 0.25rem 0 0 0.25rem;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #47c1c4;
    .coupon_voucher_amount.type_large {
      margin: 0;
      font-size: 22px;
    }
    .coupon_voucher_amount {
      position: relative;
      font-family: helvet;
      font-size: 36px;
      line-height: 1;
    }
    .coupon_voucher_amount:before {
      content: "\00A5";
      font-size: 16px;
      display: inline-block;
      vertical-align: text-top;
      margin-right: 0.1875rem;
      line-height: 1;
    }
    .coupon_voucher_limit {
      font-size: 12px;
      line-height: 1;
      margin-top: 0.9375rem;
      margin-bottom: 0;
    }
  }

  .coupon_voucher_hr {
    position: absolute;
    top: 0;
    left: 6.0625rem;
    width: 0.375rem;
    overflow: hidden;
    height: 100%;
  }
  .coupon_voucher_hr:after {
    box-sizing: border-box;
    position: absolute;
    top: -0.1875rem;
    right: -0.1875rem;
    bottom: 0;
    content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
    line-height: 0.625rem;
    width: 0.4375rem;
    color: #f8fbfb;
    font-size: 18px;
    overflow: hidden;
    z-index: 1;
  }
  .coupon_voucher_right {
    box-sizing: border-box;
    padding: 0.9375rem 0.9375rem 0.9375rem 0.625rem;
    height: 100%;
    border-radius: 0 0.25rem 0.25rem 0;
    background-color: #e5f3f3;
    color: #666;
    .coupon_voucher_range {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
      text-align: left;
      margin: 0;
      padding: 0;
      vertical-align: baseline;
    }
    .coupon_voucher_period {
      color: #999;
      font-size: 12px;
      position: absolute;
      bottom: 0;
    }
  }
}

.coupon_voucher_gray {
  position: relative;
  padding-left: 6.375rem;
  height: 5rem;
  margin-left: 2.25rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  .coupon_voucher_left {
    position: absolute;
    top: 0;
    left: 0;
    width: 6.375rem;
    height: 100%;
    color: #fff;
    border-radius: 0.25rem 0 0 0.25rem;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ccc;
    .coupon_voucher_amount.type_large {
      margin: 0;
      font-size: 22px;
    }
    .coupon_voucher_amount {
      position: relative;
      font-family: helvet;
      font-size: 36px;
      line-height: 1;
    }
    .coupon_voucher_amount:before {
      content: "\00A5";
      font-size: 16px;
      display: inline-block;
      vertical-align: text-top;
      margin-right: 0.1875rem;
      line-height: 1;
    }
    .coupon_voucher_limit {
      font-size: 12px;
      line-height: 1;
      margin-top: 0.9375rem;
      margin-bottom: 0;
    }
  }

  .coupon_voucher_hr {
    position: absolute;
    top: 0;
    left: 6.0625rem;
    width: 0.375rem;
    overflow: hidden;
    height: 100%;
  }
  .coupon_voucher_hr:after {
    box-sizing: border-box;
    position: absolute;
    top: -0.1875rem;
    right: -0.1875rem;
    bottom: 0;
    content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
    line-height: 0.625rem;
    width: 0.4375rem;
    color: #f8fbfb;
    font-size: 18px;
    overflow: hidden;
    z-index: 1;
  }
  .coupon_voucher_right {
    box-sizing: border-box;
    padding: 0.9375rem 0.9375rem 0.9375rem 0.625rem;
    height: 100%;
    border-radius: 0 0.25rem 0.25rem 0;
    background-color: #eee;
    color: #666;
    .coupon_voucher_range {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
      text-align: left;
      margin: 0;
      padding: 0;
      vertical-align: baseline;
    }
    .coupon_voucher_period {
      color: #999;
      font-size: 12px;
      position: absolute;
      bottom: 0;
    }
  }
}

.mint-header {
  background: none;
  color: #666;
}

.is-fixed .mint-header-title {
  font-weight: bold;
}

.mint-header.is-fixed {
  border-bottom: 0.0625rem solid #e8e8e8;
  background: #fff;
  z-index: 99;
}

.is-right a {
  font-size: 12px;
}

.address_addnav {
  width: 100%;
  padding: 0 3% 0 6% !important;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #f15353 !important;
  color: #fff !important;
  text-align: center;
  height: 2.75rem !important;
  line-height: 2.75rem !important;
}

.popup-con {
  width: 100%;
}

#goodsinfo .animation {
  top: 0;
  header {
    display: flex;
  }
  .address_addnav {
    display: block;
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
  height: 3.125rem; // margin-left: 0.125rem;
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
#payBtnList {
  width: 21.5625rem;
  padding-top: 0.75rem;
  background-color: #fff;
  border-radius: 0.4375rem;
  margin: 0 auto;
  margin-bottom: 2.5625rem;
  margin-top:1rem;
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
.fa-angle-right {
  flex: 0 0 1rem;
}
</style>
