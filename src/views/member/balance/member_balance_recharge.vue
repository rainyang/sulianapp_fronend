<template>
  <div id="balance_recharge">
    <c-title :hide="false" text="充值"></c-title>
    <div style="height: 50px;"></div>
    <!-- 优化 -->
    <div class="content">
      <ul class="transfer_info">
        <li class="info_a">
          <span>当前{{ balanceLang }}：</span>
          <span>{{ credit2 }}</span>
        </li>
      </ul>
      <div class="transfer_sum">
        <span>充值金额</span>
        <div class="sum">
          ¥<input type="number" v-model.trim="money" placeholder="0.00" />
        </div>
      </div>
      <div class="recharge_way" v-if="recharge == 1">
        <h1>充值方式</h1>
        <ul class="choose_box">
          <li @click="confirm(btn.value)" v-for="(btn,i) in buttons" :key='i'>
            <i class="iconfont" :class="[btnclass(btn.value)]"> </i>
            {{ btn.name }}{{ typename }}
            <div
              v-if="
                huanxun_form_quick == btn.value || huanxun_form_wx == btn.value
              "
            >
              <form
                id="ipspaysubmit"
                method="post"
                :action="huanxun_form_action"
              >
                <input
                  type="hidden"
                  :name="huanxun_input_name"
                  v-model="huanxun_form_input"
                />
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import member_balance_recharge from "./member_balance_rechargecontroller";
export default member_balance_recharge;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
  .content {
    padding-bottom: 5rem;
    .transfer_info {
      background: #fff;
      padding-left: 0.875rem;
      font-size: 16px;
      .info_a,
      .info_b {
        line-height: 2.875rem;
        border-bottom: solid 0.0625rem #ebebeb;
        display: flex;
        justify-content: flex-start;
        span:first-child {
          width: 6.875rem;
          display: block;
          text-align: left;
        }
        input {
          border: none;
          width: 15.625rem;
        }
      }
    }
    .transfer_sum {
      background: #fff;
      padding: 0.625rem 0.875rem;
      span {
        display: block;
        font-size: 16px;
        line-height: 2.5rem;
        text-align: left;
      }
      .sum {
        text-align: left;
        font-size: 24px;
        input {
          margin-left: 0.375rem;
          line-height: 3.75rem;
          width: 90%;
          font-size: 36px;
          border: none;
        }
      }
    }
    .recharge_way {
      background: #fff;
      margin-top: 0.625rem;
      h1 {
        line-height: 2.5rem;
        text-align: left;
        padding: 0 0.875rem;
        font-size: 16px;
      }
      li {
        position: relative;
        display: flex;
        align-items: center;
        line-height: 3.5rem;
        font-size: 16px;
        margin-left: 1.25rem;
        padding-right: 1.25rem;
        border-bottom: solid 0.0625rem #ebebeb;
        .iconfont_bg {
          background: #f15353;
          width: 2.25rem;
          height: 1.5rem;
          border-radius: 0.1875rem;
          display: flex;
          align-items: center;
          margin-right: 0.625rem;
        }
        .icon-balance_d {
          color: #00908c;
        }
        .icon-balance_e {
          color: #64b42e;
        }
        .icon-balance_f {
          color: #fac337;
        }
        .icon-balance_g {
          color: #00508e;
        }
        .icon-balance_h {
          color: #fac337;
        }
        .icon-balance_i {
          color: #64b42e;
        }
        .icon-balance_j {
          color: #069ce7;
        }
        .icon-balance_z {
          background-image: url(../../../assets/images/pay_e.png);
        }
        .iconfont {
          font-size: 2rem;
          margin-right: 0.625rem;
        }
      }
      li:last-child {
        border: none;
      }
    }
    .bottom_btn {
      width: 100%;
      background: #fff;
      padding: 0.625rem 0;
      position: fixed;
      bottom: 0;
      border-top: solid 0.0625rem #ebebeb;
      .btn {
        width: 21.5625rem;
        margin: 0 auto;
        height: 2.875rem;
        border-radius: 0.25rem;
        font-size: 16px;
        color: #fff;
        background: #f15353;
        border: none;
      }
    }
  }
  .my_wrapper {
    background: #fff;
    overflow: hidden;
    display: flex;
    padding: 0 14px;
    line-height: 3.0625rem;
    height: 3.0625rem;
    span {
      text-align: left;
      font-size: 16px;
      line-height: 3.0625rem;
    }
    .my-value {
      flex: 2;
      text-align: left;
      span {
        color: #f15353;
      }
    }
  }
}
.mint-field .mint-cell-title {
  width: 5rem;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  text-align: left;
  margin-left: 0.9375rem;
}
</style>
