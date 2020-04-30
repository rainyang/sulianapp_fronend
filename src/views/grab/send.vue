<template>
  <div id="send_goods">
    <c-title :hide="false" text='发货'></c-title>
    <div style="height:40px;"></div>
    <div id="content">
      <div class="addressee">
        <h1>收件人信息</h1>
        <ul class="info">
          <li>
            <span>收件人：</span>
            <span>{{address.realname}} ({{address.mobile}})</span>
          </li>
          <li>
            <span>收货地址：</span>
            <span>{{address.address}}</span>
          </li>
        </ul>
      </div>
      <ul class="company">
        <li @click="show1 = true">
          <span>快递公司：</span>
          <!--<yd-input type="text" @click.native="show1 = true"  placeholder="请选择"></yd-input>-->
          <input type="text" placeholder="请选择" disabled v-model="express">
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
      <!-- 弹窗-选择快递公司 -->
      <yd-popup v-model="show1" position="bottom" height="60%">
        <div id="popup">
          <h2>快递公司</h2>
          <ul class="select">
            <li v-for="(item,i) in express_companies" :key='i' @click.stop="chooseDelivery(item)">{{item.name}}</li>
          </ul>
        </div>
      </yd-popup>
      <div class="number">
        <span>快递单号：</span>
        <input type="text" v-model="express_sn" placeholder="请输入快递单号">
      </div>
      <div class="footer" v-show="!isResize">
        <span @click="back">取消</span>
        <span @click="send">确定</span>
      </div>
    </div>

  </div>
</template>
<script>
  import send_controller from './send_controller';

  export default send_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #send_goods {
    #content {
      .addressee {
        background-color: #fff;
        padding-top: 0.625rem;
        h1 {
          // background-color: #f5f5f5;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          padding-left: 0.875rem;
          height: 2.25rem;
          line-height: 2.25rem;
        }
        .info {
          padding: 0.625rem 0;
          li {
            display: flex;
            line-height: 1.875rem;
            font-size: 14px;
            span:first-child {
              padding-left: 1.25rem;
              padding-right: .5rem;
              display: inline-block;
              min-width: 7.25rem;
              text-align: left;
            }
            span:last-child {
              /*width: 17.1875rem;*/
              padding-right: 1.25rem;
              display: inline-block;
              font-weight: bold;
              text-align: left;
            }
          }
        }
      }
      .company {
        background-color: #fff;
        margin-top: 0.625rem;
        li {
          height: 2.8125rem;
          line-height: 2.8125rem;
          display: flex;
          position: relative;
          font-size: 16px;
          span {
            display: inline-block;
            width: 6.25rem;
            padding-left: 0.875rem;
            text-align: left;
          }
          i {
            position: absolute;
            right: 0.875rem;
            font-size: 1.5rem;
            color: #c9c9c9;
            line-height: 2.8125rem;
          }
          input {
            border: none;
            width: 15.5rem;
          }
        }
      }
      // 弹窗1
      #popup {
        h2 {
          background-color: #fff;
          z-index: 10;
          width: 100%;
          position: fixed;
          top: 0;
          height: 2.75rem;
          line-height: 2.75rem;
          font-size: 14px;
          border-bottom: solid 0.0625rem #ebebeb;
        }
        .select {
          margin-top: 2.75rem;
          padding: 0.625rem 0.875rem;
          li {
            line-height: 2.25rem;
            text-align: left;
            font-size: 14px;
          }
        }
      }
      .number {
        background-color: #fff;
        margin-top: 0.625rem;
        padding-top: 0.625rem;
        padding-bottom: 1.25rem;
        span {
          display: block;
          height: 1.875rem;
          line-height: 1.875rem;
          font-size: 16px;
          text-align: left;
          padding-left: 0.875rem;
        }
        input {
          width: 20rem;
          height: 3rem;
          padding: 0 0.625rem;
          margin-top: 0.625rem;
          border: none;
          background: #f5f5f5;
          border-radius: 0.3125rem;
          font-size: 20px;
        }
      }
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2.8125rem;
        line-height: 2.8125rem;
        display: flex;
        span {
          display: inline-block;
          width: 50%;
          color: #fff;
          font-size: 16px;
        }
        span:last-child {
          background-color: #f15353;
        }
        span:first-child {
          background-color: #ccc;
        }
      }
    }
  }
</style>