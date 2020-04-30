<template>
  <div id="aftersales">
    <c-title :hide="false" text="售后详情"></c-title>
    <div class="bar-header">
      <span class="title">退款</span>
    </div>

    <div class="section">
      <div class="close">
        <div class="state">
          <!--<button class="icon false lf"></button>-->
          <b>{{ status_name }}</b>
          <p v-if="reject_reason">
            驳回原因:<span>{{ reject_reason }}</span>
          </p>
        </div>
        <div class="flow">
          <h2>退款申请流程：</h2>
          <ul>
            <li>1、发起退款申请</li>
            <li>2、商家确认后退款到您的账户</li>
            <li><p>如果商家未处理：请及时与商家联系</p></li>
          </ul>
        </div>

        <!--<p><b>时间:</b><span>{{refund_time}}</span></p>-->
      </div>
      <div class="address" v-if="address.contact">
        <dl>
          <dt>退货地址信息</dt>
          <dd>收件人：{{ address.contact }}</dd>
          <dd>联系电话：{{ address.mobile }}</dd>
          <dd>
            退货地址：{{ address.province_name }} {{ address.city_name }}
            {{ address.district_name }} {{ address.street_name }}
            {{ address.address }}
          </dd>
        </dl>
      </div>
      <div class="line"></div>
      <div class="consult-detail">
        <h1>协商详情</h1>
        <ul class="list">
          <li>
            <span>售后类型：</span> <b> {{ refund_type_name }}</b>
          </li>
          <li>
            <span>退款金额：</span> <b> ¥ {{ price }}</b>
          </li>
          <li>
            <span>退款原因：</span> <b> {{ reason }}</b>
          </li>
          <li>
            <span>退款说明：</span> <b> {{ content }}</b>
          </li>
          <!-- <li><span>售后说明：</span> <b> 测试</b></li>
                    <li><span>售后编号：</span> <b> {{alipay_batch_sn}}</b></li> -->
          <li>
            <span>申请时间：</span> <b> {{ create_time }}</b>
          </li>
          <li>
            <span>卖家留言：</span> <b v-if="remark.length > 0">{{ remark }}</b
            ><b v-else>无</b>
          </li>
        </ul>
      </div>

      <div id="bt" v-for="(button,i) in button_models" :key='i'>
        <button @click="opration(button)">{{ button.name }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import order_aftersalescontroller from "./order_aftersalescontroller";
export default order_aftersalescontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#aftersales {
  .address {
    box-sizing: border-box;
    background: #fff;
    padding: 0 0.3125rem;
    margin-top: 0.9375rem;
    text-align: left;
    dt {
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 16px;
      border-bottom: solid 0.0625rem #ccc;
      text-indent: 0.3125rem;
    }
    dd {
      line-height: 1.875rem;
      font-size: 15px;
      text-indent: 0.9375rem;
    }
  }
  #list {
    margin-top: 3.25rem;
    i {
      background: #dadada;
      border-radius: 1rem;
      padding: 0.125rem 0.625rem;
      font-size: 12px;
    }
    p {
      text-align: left;
    }
    .mytall {
      position: relative;
      width: 80%;
      background: #dbd9b7;
      margin: 0.3125rem auto;
      border-radius: 0.25rem;
      padding: 0.625rem;
      margin-bottom: 0.9375rem;
      h4 {
        margin: 0;
        line-height: 1.7rem;
        text-align: left;
        border-bottom: #fff 0.0625rem solid;
      }
      .atte {
        position: absolute;
        left: -0.5625rem;
        display: block;
        width: 0;
        height: 0;
        top: 10%;
        border-top: 0.625rem solid transparent;
        border-right: 0.625rem solid #dbd9b7;
        border-bottom: 0.625rem solid transparent;
      }
    }
    .you {
      background: #b3d1c1;
      .attes {
        position: absolute;
        right: -0.5625rem;
        display: block;
        width: 0;
        height: 0;
        top: 10%;
        border-top: 0.625rem solid transparent;
        border-left: 0.625rem solid #b3d1c1;
        border-bottom: 0.625rem solid transparent;
      }
    }
  }
}

.lf {
  float: left;
}

.rt {
  float: right;
}

a {
  text-decoration: none;
  color: #222222;
}

li,
ul,
dl,
dd,
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
  display: list-item;
  text-align: -webkit-match-parent;
}

.bar-header {
  width: 100%;
  height: 2.5rem;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.bar-header .title {
  display: inline-block;
  line-height: 2.75rem;
  font-size: 20px;
}

.section {
  margin-bottom: 1.25rem;
  width: 100%;
}

.section .close:after {
  display: table;
  content: "";
  clear: both;
}

.section .close {
  background: #fff;
}
.state {
  background-color: #f15353;
  color: #fff;
  height: 4.25rem;
  padding: 1rem 0.875rem;
  text-align: left;
  b {
    font-size: 16px;
    margin-bottom: 0.625rem;
    display: block;
  }
}
.flow {
  text-align: left;
  h2 {
    line-height: 2.25rem;
    border-bottom: solid 0.0625rem #ebebeb;
    margin-left: 0.875rem;
    font-weight: normal;
    font-size: 14px;
  }
  ul {
    font-size: 12px;
    padding: 0.625rem 0.875rem;
  }
  li {
    line-height: 1.75rem;
    p {
      color: #8c8c8c;
      display: inline-block;
    }
  }
}

.section .close p {
  line-height: 1.125rem;
  text-align: left;
}

.section .close p b {
  padding-right: 0.5rem;
}

.section .close p span {
  color: #aaa;
}

// .section .line {
//     background: url(../../../assets/images/wave.png) repeat;
//     width: 100%;
//     height: 5px;
// }
.consult-detail {
  background-color: #fff;
  margin: 0.625rem 0 0.9375rem 0;
  h1 {
    margin-left: 0.875rem;
    padding-right: 0.875rem;
    line-height: 2.25rem;
    border-bottom: solid 0.0625rem #ebebeb;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
  }
  ul {
    padding: 0.625rem 0.875rem;
    font-size: 12px;
  }
  li {
    display: flex;
    line-height: 1.75rem;
    span {
      color: #8c8c8c;
    }
    b {
      margin-left: 0.625rem;
      font-weight: normal;
    }
  }
}

.section .back {
  width: 100%;
  height: 1.25rem;
}

.section .detail {
  line-height: 2.5rem;
  font-weight: bold;
  background: #fff;
  font-size: 16px;
  margin-bottom: 1.25rem;
  padding-left: 1.25rem;
}

.section .list {
  text-align: left;
}

.section .list > div {
  line-height: 2.5rem;
  background: #fff;
  border: 0.0625rem solid #aaa;
  border-bottom: 0;
  border-radius: 0.1875rem;
  padding-left: 0.9375rem;
}

.section .list > div:first-child {
  margin-bottom: 1.25rem;
  border: 0.0625rem solid #aaa;
}

.section .list > div:last-child {
  border-bottom: 0.0625rem solid #aaa;
}

.section .list > div span {
  color: #888;
}

.section .list > p {
  text-align: right;
  padding-right: 0.625rem;
}

.section .list .question {
  display: inline-block;
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 50%;
  border: 0.0625rem solid #aaa;
  margin: 0 0.3125rem;
  text-align: center;
}

/*图标*/

button.icon {
  background: url(../../../assets/images/icon.png) no-repeat;
  width: 3.125rem;
  height: 2.75rem;
  border: 0;
  outline: 0;
}

button.chevron-left {
  background-position: 0.125rem 0.25rem;
}

button.share {
  background-position: 0 -2.5rem;
}

button.more {
  background-position: 0 -4.8125rem;
}

button.false {
  background-position: -3.25rem 0.75rem;
  height: 100%;
}

button.server {
  background-position: -3.375rem -3.9375rem;
}

#bt {
  display: flex;
  button {
    font-size: 16px;
    height: 2.875rem;
    background: #f15353;
    border: none;
    color: #fff;
    border-radius: 0.25rem;
    width: 90%;
    margin: 0 auto 0.75rem;
  }
}
</style>
