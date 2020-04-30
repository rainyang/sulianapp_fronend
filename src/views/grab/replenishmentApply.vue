<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false"
               :text="apply_status===3?'补货商':'补货商申请'"></c-title>
      <div style="height: 40px;"></div>
      <!--中心页面  -->
      <div v-if="apply_status===3"
           id="dpt-home">
        <div class="header-box">
          <div class="header">
            <img v-if="provider.has_one_member"
                 :src="provider.has_one_member.avatar">
          </div>
          <ul class="name">
            <li><span>{{provider.realname}}</span></li>
            <li><span>{{provider.provider_address}}</span></li>
          </ul>
        </div>
        <div class="withdraw">
          <ul class="left">
            <li>¥{{provider.finish_order_price_total}}</li>
            <li>销售额</li>
          </ul>
          <ul class="right">
            <li>¥{{provider.finish_withdraw_amount_total}}</li>
            <li>利润额</li>
          </ul>
          <div class="btn">
            <button type="button"
                    @click="goMemberWithdrawal">{{this.fun.initWithdrawal()}}</button>
          </div>
        </div>
        <div class="function-box">
          <ul class="function">
            <li @click="gotoMyDistribution">
              <div class="icon">
                <img src="../../assets/images/rob-f.png">
              </div>
              <span>我要铺货</span>
            </li>
            <li @click="gotoDistributionOrder">
              <div class="icon">
                <img src="../../assets/images/rob-b.png">
              </div>
              <span>铺货单</span>
            </li>
            <li @click="gotoReplenishOrder">
              <div class="icon">
                <img src="../../assets/images/rob-d.png">
              </div>
              <span>补货单</span>
            </li>
            <li @click="gotoRebate('replenish')">
              <div class="icon">
                <img src="../../assets/images/rob-e.png">
              </div>
              <span>返利记录</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="banner"
           v-if="apply_status===1 || apply_status===2">
        <img src="../../assets/images/replenish_apply.png">
      </div>
      <div class="main"
           v-if="apply_status===1">
        <!-- 填写申请信息 -->
        <yd-cell-group title="申请信息">
          <yd-cell-item>
            <span slot="left">姓名：</span>
            <input slot="right"
                   type="text"
                   placeholder="请填写真实姓名"
                   v-model="applyModel.realname" />
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号：</span>
            <input slot="right"
                   type="number"
                   placeholder="请填写手机号码"
                   v-model="applyModel.mobile" />
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">单位名称：</span>
            <input slot="right"
                   type="text"
                   placeholder="请填写单位名称"
                   v-model="applyModel.company_name">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">负责人：</span>
            <input slot="right"
                   type="text"
                   placeholder="请填写负责人"
                   v-model="applyModel.owner_name">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">身份证：</span>
            <input slot="right"
                   type="text"
                   placeholder="请填写身份证"
                   v-model="applyModel.card_no">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">担保人：</span>
            <input slot="right"
                   type="text"
                   placeholder="请填写担保人"
                   v-model="applyModel.guarantor_name">
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">代理地区：</span>
            <input slot="right"
                   type="text"
                   @click.stop="addressShow = true"
                   v-model="addressName"
                   readonly
                   placeholder="请选择城市">
          </yd-cell-item>
          <yd-cell-item arrow
                        v-if="strShow">
            <span slot="left">街道：</span>
            <input slot="right"
                   type="text"
                   @click.stop="streetShow = true"
                   v-model="street"
                   readonly
                   placeholder="请选择街道">
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">所在地区：</span>
            <input slot="right"
                   type="text"
                   @click.stop="pAddressShow = true"
                   v-model="pAddressName"
                   readonly
                   placeholder="请选择城市">
          </yd-cell-item>
          <yd-cell-item arrow
                        v-if="pStrShow">
            <span slot="left">街道：</span>
            <input slot="right"
                   type="text"
                   @click.stop="pStreetShow = true"
                   v-model="pStreet"
                   readonly
                   placeholder="请选择街道">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">详细地址：</span>
            <yd-input slot="right"
                      type="text"
                      v-model="applyModel.address"
                      placeholder="街道楼排号等"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <div style="clear:both;margin-top:0.9375rem;"></div>
        <input type="submit"
               value="申请"
               class="btn"
               @click="setApplyData">
      </div>
      <!--申请后展示-->
      <div class="success"
           v-if="apply_status==2">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您的申请已经提交，请等待审核！</div>
        <a @click="goHome()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>
      <!--审核通过后展示，文字后台设置 -->
      <div class="success"
           v-if="false">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您已通过审核</div>
        <a @click="goHome()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>
    </div>
    <!-- 街道地址 -->
    <yd-cityselect v-model="addressShow"
                   :callback="addressCallback"
                   :items="area"></yd-cityselect>
    <yd-popup v-model="streetShow"
              position="right"
              width="100%">
      <yd-navbar title="选择街道"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item arrow
                    v-for="(item,i) in districtVal"
					:key='i'
                    @click.native="streetConfirm(item)">
        <span slot="left">{{item.areaname}}</span>
      </yd-cell-item>
    </yd-popup>
    <yd-cityselect v-model="pAddressShow"
                   :callback="pAddressCallback"
                   :items="area"></yd-cityselect>
    <yd-popup v-model="pStreetShow"
              position="right"
              width="100%">
      <yd-navbar title="选择街道"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="pStreetShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item arrow
                    v-for="(item,i) in pDistrictVal"
					:key='i'
                    @click.native="pStreetConfirm(item)">
        <span slot="left">{{item.areaname}}</span>
      </yd-cell-item>
    </yd-popup>
  </div>
</template>
<script>
import replenishmentApply_controller from "./replenishmentApply_controller";

export default replenishmentApply_controller;
</script>
<style lang="scss" rel="stylesheet/scss">
//中心样式
#dpt-home {
  .header-box {
    background-color: #f15353;
    padding: 1.25rem 0.875rem;
    display: flex;
    .header {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1.75rem;
      border: solid 0.125rem #fff;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .name {
      color: #fff;
      text-align: left;
      margin-left: 0.75rem;
      li:first-child {
        line-height: 1.875rem;
        font-size: 16px;
        font-weight: bold;
      }
      li:nth-child(2n) {
        font-size: 12px;
        span {
          display: block;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.125rem 0.5rem;
          border-radius: 0.625rem;
        }
      }
    }
  }
  .withdraw {
    padding: 1rem 0;
    background-color: #fff;
    display: flex;
    color: #333;
    .left {
      flex: 1;
      li:first-child {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.5rem;
      }
      li:last-child {
        font-size: 14px;
        line-height: 1.5rem;
      }
    }
    .right {
      flex: 1;
      border-right: solid 0.0625rem #ebebeb;
      li:first-child {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.5rem;
      }
      li:last-child {
        font-size: 14px;
        line-height: 1.5rem;
      }
    }
    .btn {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      button {
        width: 3.75rem;
        height: 1.875rem;
        border-radius: 0.25rem;
        background-color: #f15353;
        border: none;
        font-size: 14px;
        color: #fff;
        margin-right: 0.875rem;
        margin-top: 0.5625rem;
      }
    }
  }
  .function-box {
    height: 27.5625rem;
    background-color: #fff;
    margin-top: 0.625rem;
    h1 {
      font-size: 16px;
      height: 2.5rem;
      line-height: 2.5rem;
      padding-left: 0.875rem;
      border-bottom: solid 0.0625rem #ebebeb;
      text-align: left;
    }
    .function {
      padding-top: 1.25rem;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 33.3%;
        margin-bottom: 0.625rem;
        .icon {
          img {
            width: 2.5rem;
          }
        }
        span {
          line-height: 1.25rem;
        }
      }
    }
  }
}

.el-upload-list__item {
  padding: 0 !important;
}

.el-input__icon.el-icon-caret-top {
  color: #b8b8b8;
}

.avatar {
  width: 100%;
  height: 100%;
}

.imageRight {
  justify-content: flex-start;
  padding-left: 0.625rem;
  text-align: left !important;
}

.el-input__inner {
  border: 0.0625rem solid #b8b8b8;
  font-size: 12px;
}

.el-select {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2rem;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  outline: none;
}

#income {
  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 0 0.625rem;
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    height: 2rem;
    box-sizing: border-box;
    line-height: 2rem;
    span {
      color: #999;
    }
  }
}

a {
  text-decoration: none;
  color: #222;
}

input {
  border-width: 0;
}

.supplier .banner img {
  width: 100%;
}

.supplier .main {
  position: relative;
  top: -0.25rem;
}

.welcome {
  padding-bottom: 0.625rem;
  .text {
    line-height: 2.25rem;
    height: 2.25rem;
    background-color: #fff;
    h1 {
      font-size: 14px;
    }
  }
  .info {
    .info-btn {
      padding: 0.625rem;
      background-color: #fff;
      input {
        display: block;
        margin-bottom: 0.5rem;
        width: 90%;
        height: 2rem;
        border-radius: 0.3125rem;
        padding: 0 0.3125rem;
        box-sizing: border-box;
        outline: none;
        margin: 0.625rem auto;
      }
    }
    .inp {
      border: 0.0625rem solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 0.5rem;
      width: 90%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      line-height: 2rem;
      margin: 0 auto;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
    .info-box {
      background-color: #fff;
      padding-bottom: 1.25rem;
      margin-top: 0.625rem;
      padding-left: 0.875rem;
      margin-bottom: 1.25rem;
      ul {
        display: flex;
        line-height: 2.75rem;
        height: 2.75rem;
        font-size: 14px;
        border-bottom: solid 0.0625rem #e2e2e2;
        .left {
          width: 20%;
          font-size: 14px;
        }
        .right {
          width: 80%;
          font-size: 14px;
          color: #8c8c8c;
        }
      }
      ul:last-child {
        border: none;
      }
      .name {
        .right {
          padding-right: 0.875rem;
          text-align: left;
          input {
            width: 100%;
          }
        }
      }
      .picture {
        .right {
          padding-right: 0.875rem;
          text-align: right;
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .city {
        display: flex;
        line-height: 2.75rem;
        padding-right: 0.875rem;
        .btn {
          font-size: 14px;
          padding: 0;
          height: 2.6875rem;
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          width: 79%;
          line-height: 2.75rem;
          input {
            flex: 2;
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
        .left {
          width: 21%;
        }
      }
      .time {
        padding-right: 0.875rem;
        display: flex;
        height: 2.75rem;
        line-height: 2.75rem;
        .left {
          width: 21%;
        }
        .right {
          width: 79%;
          display: flex;
          justify-content: space-between;
          input {
            flex: 2;
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .select {
        padding-right: 0.875rem;
        .left {
          width: 21%;
        }
        .right {
          width: 79%;
          display: flex;
          justify-content: space-between;
          select {
            color: #8c8c8c;
            flex: 2;
            border: none;
            border-radius: 0.25rem;
            option {
              color: #333;
            }
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .remarks {
        display: flex;
        padding-right: 0.875rem;
        width: 100%;
        margin-top: 0.625rem;
        span {
          width: 21%;
          font-size: 14px;
          color: #333;
        }
        textarea {
          width: 79%;
          height: 3rem;
          padding: 0.25rem;
          border: solid 0.0625rem #e2e2e2;
          background-color: #fafafa;
          border-radius: 0.25rem;
        }
      }
    }
  }
}

.supplier .main .vip_main {
  background: #ffffff;
  margin: 0.9375rem 0;
  .title {
    padding: 0.625rem;
    font-size: 12px;
    border-bottom: 0.0625rem solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 0.9375rem 0.625rem;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 100%;
      .t1 {
        font-size: 16px;
        color: #333;
        margin-bottom: 0.3125rem;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 2.25rem;
      width: 2.25rem;
      border-radius: 1.125rem;
      color: #fff;
      text-align: center;
      line-height: 2.375rem;
      font-size: 18px;
    }
  }
  .vip1 {
    border-bottom: 0.0625rem solid #eeeeee;
  }
}

.main {
  padding-bottom: 1.125rem;
  padding-top: 1.125rem;
  .btn {
    width: 90%;
    background: #f55955;
    color: #ffffff;
    height: 2rem;
    border-radius: 0.25rem;
    padding: 0 0.3125rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    line-height: 2rem;
    margin: 0 0.75rem;
  }
  .apply {
    line-height: 2.75rem;
    margin: 0 0.75rem 0 0.75rem;
    display: flex;
    .text {
      font-size: 14px;
      .red {
        color: #f15353;
      }
    }
  }
}

.supplier .success {
  height: 12.5rem;
  padding-top: 4.0625rem;
  background: #ffffff;
  .ico {
    height: 4.0625rem;
    width: 4.0625rem;
    margin: auto;
    border: 0.1875rem solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 36px;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 1.875rem;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 1.25rem auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 14px;
    margin-bottom: 1.25rem;
  }
  a .sub:focus {
    background: #d8403c;
  }
  .avatar-uploader .el-upload {
    border: 0.0625rem dashed #d9d9d9;
    border-radius: 0.375rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 11.125rem;
    height: 11.125rem;
    line-height: 11.125rem;
    text-align: center;
  }
  .avatar {
    width: 11.125rem;
    height: 11.125rem;
    display: block;
  }
  .el-upload-list__item .is-success {
    width: 80%;
    height: 6.25rem;
  }
}
</style>

