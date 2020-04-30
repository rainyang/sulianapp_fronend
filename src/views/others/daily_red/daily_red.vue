<template>
  <div id="daily_red">
    <div
      class="content"
      :style="{ width: fun.getPhoneEnv() == 3 ? '375px' : '' }"
    >
      <div class="headImg">
        <div
          class="header"
          :style="{ width: fun.getPhoneEnv() == 3 ? '375px' : '' }"
        >
          <i class="iconfont icon-back" @click="goback"></i>
          <span>{{ redData.red_packet_title }}</span>
        </div>
        <img :src="redData.thumb" alt="" />
      </div>
      <div class="ImgBg" :style="{ backgroundColor: bjcolor }">
        <div class="red-box">
          <div class="head">
            <span>今日红包</span>
            <div v-if="Boolean(redData.redPacket) == false " class="get-gray" :style="{backgroundColor:red_packet_color}">
              <em>暂无红包</em>
            </div>
            <div
              class="get-red"
              v-if="
                this.redData.receive_one == 0 &&
                  !this.fun.isTextEmpty(this.redData.redPacket) &&
                  Number(receive_log.amount_sum) -
                    Number(receive_log.receive_amount) >
                    0
              "
              @click="sureGet"
              :style="{ backgroundColor: redData.receive_color }"
            >
              <em>立即领取</em>
            </div>
            <div
              v-if="
                Number(receive_log.amount_sum) -
                  Number(receive_log.receive_amount) <=
                  0 &&
                  redData.receive_one == 0 &&
                  !this.fun.isTextEmpty(this.redData.redPacket)
              "
              class="get-gray"
              :style="{ backgroundColor: amount_color }"
            >
              <em>额度不足</em>
            </div>
            <div v-if="Number(amount.number_sum) - Number(amount.totle) <= 0 && redData.receive_one == 1" class="get-gray" :style="{backgroundColor:out_color}">
              <em>红包已领完</em>
            </div>
            <div v-if="false || redData.receive_one == 1" class="red-color">
              <em>{{ redData.receive_amount_sum.receive_amount }}</em
              ><span>元</span>
            </div>
          </div>
          <div class="red-number">
            <div class="red-Vdi">
              <span>今日红包总额</span>
              <span>{{ !fun.isTextEmpty(amount.amount) ? amount.amount :'0.00'}}</span>
            </div>
            <div class="red-Vdi">
              <span>今日红包总量</span>
              <span>{{  !fun.isTextEmpty(amount.number_sum) ? amount.number_sum :'0'}}</span>
            </div>
            <div class="red-Vdi">
              <span>剩余数量</span>
              <span v-if="!fun.isTextEmpty(amount.amount)&&!fun.isTextEmpty(amount.number_sum)">{{redPacket == false ? '' :  Number(amount.number_sum) - Number(amount.totle) }}</span>
              <span v-else>{{redPacket == false ? '' :  Number(amount.number_sum) - Number(amount.totle) }}</span>
            </div>
          </div>
          <div style="margin-top: 0.6rem;">
            <span style="font-size:14px">个人额度</span>
          </div>
          <div class="process">
            <span
              class="bar"
              :style="{
                width:
                  (Number(receive_log.receive_amount) /
                    Number(receive_log.amount_sum).toFixed(2)) *
                    100 +
                  '%'
              }"
            ></span>
          </div>
          <div class="much">
            <div class="num" style="text-align: left">
              <span>已领取</span>
              <span>￥{{ redData.receive_log.receive_amount.toFixed(2) }}</span>
            </div>
            <div class="num" style="text-align: right">
              <span>剩余</span>
              <span
                >￥{{
                  (receive_log.amount_sum - receive_log.receive_amount).toFixed(
                    2
                  )
                }}</span
              >
            </div>
          </div>

          <div class="get-ab">
            <div class="gray" @click="toPage('GetRedRecord')">领取记录</div>
            <div class="orange" @click="toPage('RedAmount')">我的额度</div>
          </div>
        </div>

        <div class="list-box">
          <div class="title">
            <span>今日领取记录</span>
            <span class="gray-text">有{{ redData.amount.totle }}人已领取</span>
          </div>
          <ul>
            <van-swipe
              vertical
              height="65"
              :loop="true"
              :autoplay="4000"
              :initial-swipe="0"
              :show-indicators="false"
              :touchable="false"
              ref="swipe"
              @change="swipeToTop"
              :width="fun.getPhoneEnv() == 3 ? 375 : clientWidths"
            >
              <van-swipe-item
                v-for="(item, index) in redData.receive_log.list"
                :key="index"
              >
                <li>
                  <div class="left" v-if="item.belongs_to_member">
                    <img :src="item.belongs_to_member.avatar_image" alt="" />
                  </div>
                  <div class="right">
                    <div class="right-box">
                      <span class="name" v-if="item.belongs_to_member">{{
                        item.belongs_to_member.username
                      }}</span>
                      <span class="price">{{ item.receive_amount }}元</span>
                    </div>
                    <div class="right-box">
                      <span class="time" style="text-align: left;">{{
                        item.created_at
                      }}</span>
                      <span class="time">已领取</span>
                    </div>
                  </div>
                </li>
              </van-swipe-item>
            </van-swipe>
          </ul>
        </div>

        <div class="text-box">
          <div class="title">活动介绍</div>
          <div
            style="margin: 0.5rem 1rem;text-align: left;font-size: 12px;color: #333333;"
          >
            {{ redData.content }}
          </div>
        </div>

        <div class="good-box">
          <div class="title">红包商品</div>
          <ul class="goods">
            <li
              @click="toGood(item.id)"
              v-for="item in redData.goods_list"
              :key="item.id"
            >
              <div class="good-img">
                <img :src="item.thumb" alt="" />
              </div>
              <div class="good-title" style="-webkit-box-orient: vertical;">
                {{ item.title }}
              </div>
              <span
                class="amount"
                v-if="!fun.isTextEmpty(item.quota_proportion)"
                >红包额度:{{ item.quota_proportion }}%</span
              >
              <div class="buy">
                <span>￥{{ item.price }}</span>
                <span class="red-buy">立即抢购</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <van-popup v-model="show" :overlay="true">
      <div class="red-popup">
        <img src="../../../assets/images/bg_redenvelope@2x.png" alt="" />
        <div class="pop-text">
          <span class="money">￥{{ red_packet }}</span>
          <span class="tip">恭喜您成功领取到红包！</span>
          <span class="sure-btn" @click="show = false">确定</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import daily_red_controller from "./daily_red_controller";

export default daily_red_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#daily_red {
  background: #f70034;
  margin-bottom: 2rem;
  .headImg {
    width: 100%;
    .header {
      color: white;
      font-weight: bold;
      line-height: 22px;
      font-size: 18px;
      position: absolute;
      top: 0;
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
    }
    .icon-back {
      position: absolute;
      left: 1.5rem;
      font-weight: bolder;
    }
    img {
      width: 100%;
    }
  }
  .ImgBg {
    padding: 1rem 0;
    margin-top: -1rem;
    /*background: url("/addons/yun_shop/static/img/bg_2@2x.png") no-repeat;*/
  }
  .red-box,
  .list-box,
  .text-box,
  .good-box {
    margin: 0 auto 1rem auto;
    padding-bottom: 1rem;
    width: 22rem;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .title {
    font-size: 14px;
    color: #fd2352;
    font-weight: bold;
    padding: 0.8rem;
    margin: 0 1rem;
    border-bottom: 0.01rem solid #dcdbdb;
  }
  .list-box {
    overflow: hidden;
    .title {
      display: flex;
      flex-direction: column;
    }
    .gray-text {
      font-size: 12px;
      color: #6e6e6e;
    }
    ul {
      margin: 0.5rem 1rem;
      max-height: 16rem;
      li {
        display: flex;
      }
      .left {
        flex: 0 0 2.5rem;
        align-self: center;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
      }
      .right-box {
        display: flex;
        .name {
          flex: 1;
          text-align: left;
        }
        .price {
          flex: 1;
          text-align: right;
          color: #ff2a50;
        }
        .time {
          flex: 1;
          text-align: right;
          color: #999999;
        }
      }
    }
  }
  .red-Vdi {
    display: flex;
    flex-direction: column;
  }
  .red-box {
    position: relative;
    .head {
      padding: 0.5rem;
    }
    .red-color {
      font-size: 46px;
      color: #fe3055;
      margin: 1rem;
      span {
        color: #fe3055;
      }
    }
    .get-red,
    .get-gray {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      color: #ffffff;
      text-align: center;
      margin: 0.5rem auto 0 auto;
      em {
        line-height: 100px;
        font-size: 18px;
      }
    }
    .get-red {
      // background-image: linear-gradient(0deg, #ff3961 0%, #ffb65a 100%),
      // linear-gradient(#ff3255, #ff3255);
      background-blend-mode: normal, normal;
    }
    .get-gray {
      background-color: #e1e1e1;
    }
    .red-number {
      display: flex;
      div {
        flex: 1;
      }
    }
    .process {
      width: 20rem;
      height: 6px;
      background-color: #dfdfdf;
      border-radius: 3px;
      margin: 1rem auto;
      margin-top: 0.5rem;
      position: relative;
      .bar {
        position: absolute;
        left: 0;
        height: 6px;
        border-radius: 3px;
        background-color: #fd2352;
      }
    }
    .much {
      display: flex;
      width: 20rem;
      margin: 0 auto;
      .num {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
    span {
      font-size: 12px;
      color: #666666;
    }
  }
  .get-ab {
    position: absolute;
    top: 1rem;
    right: 0;
    font-size: 12px;
    color: #ffffff;
  }
  .gray {
    padding: 0.1rem 0.5rem;
    background-color: #d8d8d8;
    border-radius: 8px 0px 0px 8px;
    margin-bottom: 0.5rem;
  }
  .orange {
    padding: 0.1rem 0.5rem;
    background-color: #ff9f59;
    border-radius: 8px 0px 0px 8px;
  }
  .good-box {
    .goods {
      margin: 0.5rem 1rem;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 48%;
        text-align: left;
        font-size: 12px;
        margin-bottom: 0.5rem;
      }
      li:nth-child(odd) {
        margin-right: 0.7rem;
      }
      .good-img {
        width: 9.6rem;
        height: 9.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .good-title {
        word-break: break-all;
        color: #333333;
        min-height: 2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .amount {
        color: #fd2352;
        border: 1px solid #fd2352;
        line-height: 2rem;
        padding: 0.2rem;
        border-radius: 3px;
      }
      .buy {
        display: flex;
        font-size: 14px;
        span:first-child {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .red-buy {
        flex: 0 0 4rem;
        margin-left: 0.4rem;
        font-size: 12px;
        background-color: #fd2352;
        border-radius: 7px;
        color: #ffffff;
        padding: 0.1rem 0.3rem;
      }
    }
  }
  .red-popup {
    width: 17rem;
    margin: 0 auto;
    position: relative;
    .pop-text {
      color: #ffffff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3rem;
      display: flex;
      flex-direction: column;
      width: 90%;
    }
    .money {
      font-size: 44px;
    }
    .tip {
      font-size: 12px;
      margin: 1rem;
    }
    .sure-btn {
      background-color: #ffc900;
      border-radius: 20px;
      padding: 0.5rem;
      font-size: 20px;
    }
    img {
      width: 100%;
    }
  }
  .van-popup {
    background-color: transparent;
  }
}
</style>
