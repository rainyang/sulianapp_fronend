<template>
  <div id="shopOrder_detail">
    <c-title :hide="false" text='订单详情'></c-title>
    <div style="height:40px"></div>
    <div id="content">
      <div class="add" @click="showAddress">
        <div class="add_left">
          <i class="iconfont icon-icon_location"></i>
        </div>
        <ul class="add_center">
          <li>收件人：{{realname}} {{mobile}}</li>
          <li>{{address}}</li>
        </ul>
        <div class="add_right">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="goods_list">
        <!--<h1>店铺名称：小胖的潮流前沿</h1>-->
        <div class="goods" v-for="(order,i) in order_data" :key='i'>
          <div class="img">
            <img :src="order.thumb">
          </div>
          <ul class="info">
            <li>
              <span class="goods-name"
                    style="-webkit-box-orient: vertical;">{{order.title}}</span>
              <span>¥{{(Number(order.goods_price)/order.total).toFixed(2)}}</span>
            </li>
            <li class="standard">
              <span v-show="!order.goods_option_id"></span>
              <span v-show="order.goods_option_id">规格：{{order.goods_option_title}}</span>
              <span>×{{order.total}}</span>
            </li>
          </ul>
        </div>
        <ul class="goods_count">
          <li>
            <span>商品金额</span>
            <span>¥{{order_goods_price}}</span>
          </li>
          <!--<li>-->
          <!--<span>运费</span>-->
          <!--<span>¥20.00</span>-->
          <!--</li>-->
          <!--<li>-->
          <!--<span>可用**积分抵扣20.00元</span>-->
          <!--<yd-switch v-model="switch1"></yd-switch>-->
          <!--</li>-->
        </ul>
      </div>
      <!--<ul class="coupon">-->
      <!--<li>-->
      <!--<span>优惠券<small>0张可用</small></span>-->
      <!--<span>未使用</span>-->
      <!--</li>-->
      <!--</ul>-->
      <!--<ul class="order_info">-->
      <!--<li>-->
      <!--<span>订单金额</span>-->
      <!--<span>¥3720.00</span>-->
      <!--</li>-->
      <!--<li>-->
      <!--<span>总运费</span>-->
      <!--<span>¥0.00</span>-->
      <!--</li>-->
      <!--<li>-->
      <!--<span>总优惠</span>-->
      <!--<span>¥10.00</span>-->
      <!--</li>-->
      <!--<li>-->
      <!--<span>总抵扣</span>-->
      <!--<span>¥0.00</span>-->
      <!--</li>-->
      <!--</ul>-->
      <div class="footer">
        <div class="price">
          <span class="price_a">合计：</span>
          <span class="price_b">¥{{price}}</span>
        </div>
        <div class="btn" @click="submit">提交订单</div>
      </div>
    </div>

    <mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
      <div class="add-info">
        <ul>

          <li v-for="(item,i) in addressData" :key='i' @click="selectAddress(item)">
            <div class="liia">
              <span class="name" style="">{{item.username+" "+item.mobile}}</span>
              <br/>
              <p class="address" style="" v-if="item.street">
                {{item.province+" "+item.city+" "+item.district+" "+item.street}} {{item.address}}
              </p>
              <p class="address" style="" v-else>{{item.province+" "+item.city+" "+item.district}} {{item.address}}
              </p>
            </div>
            <!--<i class="fa fa-trash-o"></i>-->
          </li>

        </ul>
      </div>
      <button class="address-plus" type="button" @click="addAddress">新增地址</button>

    </mt-popup>

    <yd-popup v-model="popAddAddress" position="right" width="100%">
      <div style="background: #eee;">
        <mt-header fixed title="添加地址">
          <mt-button icon="back" @click="popAddressClose" slot="left"></mt-button>
        </mt-header>
        <div style="height: 3.75rem;"></div>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">收件人：</span>
            <yd-input slot="right" v-model="form.username" max="20" placeholder="请输入收件人"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">联系电话：</span>
            <yd-input slot="right" v-model="form.mobile" placeholder="请输入联系电话" type="tel"></yd-input>
          </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">设置默认地址：</span>
            <span slot="right"><mt-switch v-model="form.isDefault"></mt-switch></span>
          </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
          <yd-cell-item arrow>
            <span slot="left">所在地区：</span>
            <input slot="right" type="text" @click.stop="addressShow = true" v-model="addressName" readonly
                   placeholder="请选择收货地址">
          </yd-cell-item>
          <yd-cell-item arrow v-if="strShow">
            <span slot="left">街道：</span>
            <input slot="right" type="text" @click.stop="streetChoose" v-model="form.street" readonly
                   placeholder="请选择街道">
          </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group>
          <yd-cell-item>
            <yd-textarea slot="right" placeholder="请输入详细地址" v-model="form.address" maxlength="100"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>


        <div class="address_addnav" @click="appendAddress">
          <i class="fa fa-plus-circle"></i>
          <span>保存</span>
        </div>
        <yd-cityselect v-model="addressShow" :callback="addressCallback" :items="district"></yd-cityselect>
      </div>
    </yd-popup>


    <yd-popup v-model="streetShow" position="right" width="100%">

      <yd-navbar title="选择街道" height="2.5rem" fontsize="14px" fixed>
				<span slot="left">
					<yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
				</span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>

      <yd-cell-item arrow v-for="(item,i) in districtVal" :key='i' @click.native="streetConfirm(item.areaname)">
        <span slot="left">{{item.areaname}}</span>
      </yd-cell-item>

    </yd-popup>

  </div>
</template>
<script>
  import distribution_orderlist_detail_controller from './distribution_orderlist_detail_controller';

  export default distribution_orderlist_detail_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #shopOrder_detail {
    #content {
      padding-bottom: 3.75rem;
      .add {
        background-color: #fff;
        display: flex;
        padding: 0.625rem 0.875rem;
        text-align: left;
        .add_left {
          width: 1.5rem;
          i {
            font-size: 1.125rem;
            line-height: 1.75rem;
            text-align: center;
            color: #666;
          }
        }
        .add_center {
          line-height: 1.625rem;
          font-size: 14px;
          li:first-child {
            font-weight: bold;
          }
        }
        .add_right {
          width: 1.5rem;
          position: absolute;
          right: 0;
          i {
            font-size: 1.5rem;
            line-height: 3.25rem;
            text-align: center;
            color: #c9c9c9;
          }
        }
      }
      .goods_list {
        margin-top: 0.625rem;
        background-color: #fff;
        h1 {
          border-bottom: solid 0.0625rem #ebebeb;
          line-height: 2.25rem;
          padding: 0 0.875rem;
          font-weight: normal;
          font-size: 14px;
          text-align: left;
        }
        .goods {
          // background-color: #fafafa;
          padding: 0.75rem;
          display: flex;
          .img {
            width: 4rem;
            height: 4rem;
            background: #fff;
            overflow: hidden;
            margin-right: 0.75rem;
            img {
              width: 100%;
            }
          }
          .info {
            width: 17.1875rem;
            font-size: 14px;
            position: relative;
            li:last-child {
              width: 100%;
              position: absolute;
              bottom: 0rem;
              color: #8c8c8c;
            }
            li {
              display: flex;
              justify-content: space-between;
              span:first-child {
                width: 11.25rem;
                text-align: left;
                line-height: 1.25rem;
              }
              .goods-name {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .goods_count {
          border-top: solid 0.0625rem #ebebeb;
          background-color: #fff;
          padding: 0.625rem 0.875rem;
          font-size: 14px;
          li {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            span:last-child {
              color: #f15353;
            }
          }
        }
      }
      .coupon {
        margin-top: 0.625rem;
        line-height: 2.8125rem;
        background-color: #fff;
        padding: 0 0.875rem;
        font-size: 14px;
        li {
          display: flex;
          justify-content: space-between;
          span:first-child {
            small {
              background: #f15353;
              color: #fff;
              font-size: 12px;
              border-radius: .1875rem;
              padding: 0 0.3125rem;
              margin-left: 0.375rem;
            }
          }
          span:last-child {
            color: #f15353;
          }
        }
      }
      .order_info {
        background-color: #fff;
        margin-top: 0.625rem;
        font-size: 14px;
        padding: 0.625rem 0.875rem;
        li {
          display: flex;
          justify-content: space-between;
          line-height: 1.875rem;
        }
      }
      .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 3.0625rem;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
        .price {
          text-align: right;
          width: 17.5rem;
          border-top: solid 0.0625rem #ebebeb;
          font-size: 16px;
          line-height: 3.0625rem;
          padding-right: 0.625rem;
          .price_b {
            color: #f15353;
          }
        }
        .btn {
          width: 5.9375rem;
          line-height: 3.0625rem;
          background-color: #f15353;
          color: #fff;
          font-size: 16px;
        }
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
          width: 100%;
          padding-right: 1.25rem;
          flex: 9;
          text-align: left;
          padding-left: 1.25rem;
          .name {
            font-size: 18px;
            color: #222;
            line-height: 2rem;
          }
          .address {
            word-break: break-word;
            width: 100%;
            font-size: 12px;
            color: #666;
            line-height: 1.2rem;
          }
        }
        i {
          flex: 1;
        }
      }
    }
    .addr {
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      align-items: center;
      background: #fff;
      padding: 0.625rem 0.875rem;
      .icon {
        display: flex;
        i {
          line-height: 1.5rem;
          margin-right: 0.625rem;
        }
      }
      i {
        font-size: 16px;
        color: #333;
      }
      .fa-angle-right {
        font-size: 24px;
        color: #c9c9c9;
      }
      p {
        flex: 6;
        text-align: justify;
        font-weight: bold;
        line-height: 1.5rem;
        padding-right: 1rem;
        color: #333333;
        font-size: 14px;
        span {
          font-weight: normal;
          color: #666;
        }
      }
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
    .mint-header {
      background: #ffffff !important;
      color: #666;
    }
  }

</style>