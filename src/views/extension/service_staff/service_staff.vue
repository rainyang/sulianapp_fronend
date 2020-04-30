<template>
  <div>
    <c-title :hide="false" :text="integral ? integral : '服务人员'"> </c-title>
    <div class="contaier">
      <div class="box">
        <div class="header">
          <div class="image">
            <img
              v-if="member.avatar"
              :src="member.avatar"
              alt=""
              style="width:5rem;height:5rem"
            />
          </div>
          <div class="nickname">
            {{ member.actual_name }}
          </div>
          <div class="area">
            {{ member.full_address }}
          </div>
        </div>
        <div class="content">
          <mt-navbar v-model="activeName">
            <mt-tab-item id="0" @click.native="chooseActive('0')"
              >接单池</mt-tab-item
            >
            <mt-tab-item id="1" @click.native="chooseActive('1')"
              >上牌中</mt-tab-item
            >
            <mt-tab-item id="2" @click.native="chooseActive('2')"
              >已上牌</mt-tab-item
            >
            <mt-tab-item id="3" @click.native="chooseActive('3')"
              >交车中</mt-tab-item
            >
            <mt-tab-item id="4" @click.native="chooseActive('4')"
              >已交车</mt-tab-item
            >
          </mt-navbar>
          <mt-loadmore
            :top-method="loadTop"
            topDropText="释放刷新"
            ref="loadmore"
          >
            <div class="first" v-for="(item, index) in list" :key="index">
              <div class="sn" @click="gotoDetail(item.id)">
                <div class="num">订单编号：{{ item.order_sn }}</div>
                <div class="status" v-if="activeName == 1 || activeName == 2">
                  {{ item.status_name }}
                </div>
                <div class="status" v-if="activeName == 3 || activeName == 4">
                  {{ item.send_status_name }}
                </div>
                <div class="status" v-if="activeName == 0">
                  {{
                    item.status == 2 ? item.send_status_name : item.status_name
                  }}
                </div>
              </div>
              <div
                class="content"
                v-for="(item1, index1) in item.has_one_order
                  .has_many_order_goods"
                :key="item1.id"
                @click="gotoDetail(item.id)"
              >
                <div class="image">
                  <img
                    :src="item1.thumb"
                    alt=""
                    style="width:4.5rem;height:4.5rem"
                  />
                </div>
                <div style="flex:0 0 0.5rem"></div>
                <div class="text">
                  <div class="title">
                    {{ item1.title }}
                  </div>
                  <div class="price">
                    <div class="money">￥{{ item1.goods_price }}</div>
                    <div class="num">x{{ item1.total }}</div>
                  </div>
                  <div class="type">
                    规格：{{
                      item1.goods_option_title ? item1.goods_option_title : "-"
                    }}
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="detail">
                  共 {{ item.has_one_order.goods_total }} 辆汽车，实付：￥{{
                    item.has_one_order.price
                  }}
                </div>
                <div class="option">
                  <yd-button
                    type="danger"
                    shape="circle"
                    size="mini"
                    v-if="activeName == '0' && item.status == 0"
                    @click.native="options(0, item)"
                    >上牌接单</yd-button
                  >
                  <yd-button
                    type="danger"
                    shape="circle"
                    size="mini"
                    v-if="activeName == '1'"
                    @click.native="options(1, item)"
                    >完成</yd-button
                  >
                  <yd-button
                    type="danger"
                    shape="circle"
                    size="mini"
                    v-if="activeName == '0' && item.status == 2"
                    @click.native="options(2, item)"
                    >交车接单</yd-button
                  >
                  <yd-button
                    type="danger"
                    shape="circle"
                    size="mini"
                    v-if="activeName == '3'"
                    @click.native="options(3, item)"
                    >完成</yd-button
                  >
                  <van-popup v-model="showVoucher">
                    <div class="voucherDiv">
                      <h2>上传凭证</h2>
                      <div class="Imgbox">
                        <template v-for="(val, index) in fileList1">
                          <div class="photoBox" :key="index">
                            <img
                              :src="val"
                              style="width: 100%"
                              @click="showimg(index)"
                            />
                            <i @click="removeImg(index)"></i>
                          </div>
                        </template>
                        <van-uploader
                          :after-read="multipleMethod_1"
                          multiple
                          :max-size="photosize"
                          @oversize="onphotosize"
                        >
                          <van-icon name="photograph" />
                        </van-uploader>
                      </div>
                      <span class="submit1" @click.stop="submitVoucher(item.id)"
                        >完成</span
                      >
                    </div>
                  </van-popup>
                </div>
              </div>
            </div>

            <!-- <p style="margin:1.5rem 0;color:#9e9e9e;"
                v-if="isNoMore">没有更多</p> -->
            <img
              src="../../../assets/images/blank.png"
              alt=""
              v-if="list.length <= 0"
              style="width:5rem;margin-top:5rem;"
            />
          </mt-loadmore>
        </div>
      </div>
    </div>

    <van-image-preview
      v-model="show"
      :images="fileList1"
      :start-position="imgIndex"
    >
    </van-image-preview>
  </div>
</template>

<script>
import service_staff_controller from "./service_staff_controller";

export default service_staff_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.van-popup {
  border-radius: 1rem;
  .voucherDiv {
    width: 18.75rem;
    height: 20rem;
    z-index: 999;
    overflow: hidden;
    position: relative;
    padding: 0 1.25rem;
    text-align: center;
    h2 {
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 1rem;
    }
    .Imgbox {
      height: 12rem;
      display: flex;
      flex-wrap: wrap;
      overflow: scroll;
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
    .submit1 {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      margin-left: -6rem;
      display: block;
      width: 12rem;
      height: 2.25rem;
      line-height: 2.25rem;
      background: #ef0500;
      border-radius: 0.625rem;
      color: #ffffff;
    }
  }
}
.contaier {
  margin-top: 2.5rem;
  .box {
    width: 90%;
    margin: 3rem 5% 1.5rem 5%;
    background: #ffffff;
    border-radius: 0.5rem;
    min-height: 90vh;
    .header {
      min-height: 11.375rem;
      padding: 1rem 0;
      .image {
        border-radius: 50%;
        img {
          border-radius: 50%;
        }
      }
      .nickname {
        line-height: 2.5rem;
        font-weight: 800;
        font-size: 1.25rem;
      }
      .area {
        display: inline-block;
        background: #ffefef;
        color: #ef0500;
        padding: 0.25rem 0.75rem;
        border-radius: 2rem;
      }
    }
    .content {
      .first {
        box-shadow: 0px 0px 5px #ebebeb;
        margin: 2.5%;
        width: 95%;
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        border-radius: 0.5rem;
        .sn {
          height: 2rem;
          line-height: 2rem;
          display: flex;
          .num {
            flex: 4;
            text-align: left;
            color: #d1d1d1;
          }
          .status {
            text-align: right;
            flex: 1;
            color: #ef0500;
            font-weight: 800;
          }
        }
        .content {
          display: flex;
          .image {
            flex: 0 0 4.5rem;
          }
          .text {
            flex: 0 0 calc(100% - 5rem);
            .title {
              width: 14rem;
              height: 2rem;
              line-height: 2rem;
              overflow: hidden;
              text-align: left;
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
          .detail {
            flex: 4;
            text-align: left;
          }
          .option {
            flex: 1;
            align-self: center;
            line-height: 1.3rem;
            text-align: right;
          }
        }
      }
    }
  }
  .yd-btn-mini {
    padding: 0 15px;
  }
}
</style>
