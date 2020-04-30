<template>
  <div>
    <c-title :hide="false"
             text="订单详情"> </c-title>
    <div class="contair">
      <div class="user">
        <div class="image">
          <img src="../../../assets/images/detial_receive@2x.png"
               alt=""
               style="width:2.5rem;height:2.5rem" />
        </div>
        <div class="info">
          <div class="name">
            <span class="name1">{{ address.realname }}</span>&nbsp;&nbsp;&nbsp;
            <span class="mobile">{{ address.mobile }}</span>
          </div>
          <div class="area">
            {{ address.address }}
          </div>
        </div>
      </div>
      <div class="goods">
        <div class="content"
             v-for="(item, index) in has_many_order_goods">
          <div class="image">
            <img :src="item.thumb"
                 alt=""
                 style="width:4.5rem;height:4.5rem" />
          </div>
          <div style="flex:0 0 0.5rem"></div>
          <div class="text">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="price">
              <div class="money">￥{{ item.goods_price }}</div>
              <div class="num">x{{ item.total }}</div>
            </div>
            <div class="type">
              规格：{{
                item.goods_option_title ? item.goods_option_title : "-"
              }}
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="detail">
            订单编号:
          </div>
          <div class="option">
            {{ datas.order_sn }}
          </div>
        </div>
        <div class="bottom"
             style="border:0px;">
          <div class="detail">
            上牌状态:
          </div>
          <div class="option">
            {{ datas.status_name }}
          </div>
        </div>
        <div class="bottom"
             style="border:0px;">
          <div class="detail">
            交车状态:
          </div>
          <div class="option">
            {{ datas.send_status_name }}
          </div>
        </div>
      </div>
      <div class="imgs"
           v-if="datas.status != 0">
        <h2>上牌凭证</h2>
        <div class="Imgbox">
          <template v-for="(val, index) in fileList1">
            <div class="photoBox"
                 :key="index">
              <img :src="val"
                   style="width: 100%"
                   @click="showimg(index, 1)" />
              <i @click="removeImg(index, 1)"
                 v-if="datas.status == 1"></i>
            </div>
          </template>
          <van-uploader :after-read="multipleMethod_1"
                        multiple
                        :max-size="photosize"
                        @oversize="onphotosize"
                        v-if="datas.status == 1">
            <van-icon name="photograph" />
          </van-uploader>
        </div>
      </div>
      <div class="imgs"
           v-if="
          datas.send_status == 5 ||
            (datas.status == 2 && datas.send_status == 4)
        ">
        <h2>交车凭证</h2>
        <div class="Imgbox">
          <template v-for="(val, index) in fileList2">
            <div class="photoBox"
                 :key="index">
              <img :src="val"
                   style="width: 100%"
                   @click="showimg(index, 2)" />
              <i @click="removeImg(index, 2)"
                 v-if="datas.status == 3"></i>
            </div>
          </template>
          <van-uploader :after-read="multipleMethod_1"
                        multiple
                        :max-size="photosize"
                        @oversize="onphotosize"
                        v-if="datas.status == 2 && datas.send_status == 4">
            <van-icon name="photograph" />
          </van-uploader>
        </div>
      </div>
    </div>
    <van-image-preview v-model="show"
                       :images="showImgArr"
                       :start-position="imgIndex">
    </van-image-preview>
    <div class="button">
      <yd-button type="danger"
                 shape="circle"
                 size="large"
                 v-if="datas.status == 0"
                 @click.native="options(0)">上牌接单</yd-button>
      <yd-button type="danger"
                 shape="circle"
                 size="large"
                 v-if="datas.status == 1"
                 @click.native="options(1)">确认上牌</yd-button>
      <yd-button type="danger"
                 shape="circle"
                 size="large"
                 v-if="datas.status == 2 && datas.send_status == 3"
                 @click.native="options(2)">交车接单</yd-button>
      <yd-button type="danger"
                 shape="circle"
                 size="large"
                 v-if="datas.status == 2 && datas.send_status == 4"
                 @click.native="options(3)">交车完成</yd-button>
    </div>
  </div>
</template>

<script>
import order_detail_controller from "./order_detail_controller";

export default order_detail_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.contair {
  padding-top: 2.5rem;
  width: 90%;
  margin: 0 5%;
  .user {
    margin: 1.5rem 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.75rem;
    .image {
      flex: 0 0 3.75rem;
    }
    .info {
      text-align: left;
      flex: 0 0 calc(100% - 3.75rem);
      .name {
        font-size: 0.875rem;
        line-height: 1.75rem;
        height: 1.75rem;
        padding-bottom: 0.5rem;
        .name1 {
          font-size: 1rem;
        }
        .mobile {
          color: #999;
        }
      }
      .area {
        line-height: 1rem;
      }
    }
  }
  .goods {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0.75rem;
    border-radius: 0.75rem;
    .content {
      display: flex;
      // flex:1;
      width: 100%;
      .image {
        flex: 0 0 4.5rem;
      }
      .text {
        flex: 0 0 calc(100% - 5rem);
        .title {
          text-align: left;
          width: 14rem;
          height: 2rem;
          line-height: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          color: #000;
          font-size: 0.875rem;
        }
      }
      .price {
        display: flex;
        height: 2rem;
        line-height: 2rem;
        .money {
          text-align: left;
          flex: 1;
        }
        .num {
          text-align: right;
          flex: 1;
        }
      }
      .type {
        color: #c7c7c7;
        text-align: left;
        font-size: 0.75rem;
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
    .bottom {
      display: flex;
      height: 2rem;
      line-height: 2rem;
      border-top: 1px solid #fafafa;
      width: 100%;
      color: #999;
      .detail {
        flex: 1;
        text-align: left;
      }
      .option {
        flex: 2;
        text-align: right;
      }
    }
  }
  .imgs {
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem 0.75rem 0.75rem;
    border-radius: 0.75rem;
    margin-top: 0.825rem;
    h2 {
      line-height: 1.8rem;
    }
    .Imgbox {
      display: flex;
      flex-wrap: wrap;
      .photoBox {
        position: relative;
        width: 4.5rem;
        height: 4.5rem;
        border: 1px dashed #c0ccda;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
        margin-bottom: 0.2rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        i {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          background: url("../../../assets/images/close_iocn.png");
          background-size: 100%;
        }
      }
      .van-uploader {
        width: 4.5rem;
        height: 4.5rem;
        overflow: hidden;
        background: #f3f3f3;
        border: 1px dashed #c0ccda;
        margin-left: 0.2rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        .van-icon {
          font-size: 24px;
          line-height: 4.5rem;
          color: #666;
        }
      }
    }
  }
}
.button {
  width: 85%;
  margin: 2rem auto;
}
</style>
