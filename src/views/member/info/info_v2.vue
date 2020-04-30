<template>
  <div id="info">
    <c-title :hide="false"
             text="我的信息"></c-title>
    <div style="height: 55px;"></div>
    <yd-cell-group title="基本信息">
      <yd-cell-item>
        <span slot="left">姓名：</span>
        <yd-input slot="right"
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  v-model="info_form.realname"
                  max="10"
                  placeholder="请输入您的姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow
                    @click.native="bindTel">
        <span slot="left">手机号：</span>
        <yd-input slot="right"
                  type="tel"
                  disabled
                  v-model="info_form.mobile"
                  required
                  regex="mobile"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  max="11"
                  placeholder="请输入手机号"></yd-input>
        <span slot="right"
              style="width:100px;">{{ bind_btn }}</span>
      </yd-cell-item>
      <yd-cell-item v-if="false">
        <span slot="left">手机号：</span>
        <yd-input slot="right"
                  type="tel"
                  disabled
                  v-model="info_form.mobile"
                  required
                  regex="mobile"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  max="11"
                  placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow
                    @click.native="showSexInfo"
                    v-if="isShowSex">
        <span slot="left">性别：</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  v-model="sexName"
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder="请选择性别"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow
                    @click.native="openPicker"
                    v-if="isShowBirthday">
        <span slot="left">生日：</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  v-model="info_form.birthday"
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder="请选择性别"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">微信号：</span>
        <yd-input slot="right"
                  v-model="info_form.wx"
                  max="20"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  placeholder="请输入微信号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="支付宝信息">
      <yd-cell-item>
        <span slot="left">支付宝账号：</span>
        <yd-input slot="right"
                  v-model="info_form.alipay"
                  max="40"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  placeholder="请输入支付宝账号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">账号姓名：</span>
        <yd-input slot="right"
                  v-model="info_form.alipay_name"
                  max="20"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  placeholder="请输入支付宝账号姓名"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="所在地信息"
                   v-if="isShowAddress">
      <yd-cell-item arrow>
        <span slot="left">所在地区：</span>
        <input slot="right"
               type="text"
               @click.stop="showAdd = true"
               v-model="districtName"
               readonly
               placeholder="请选择地区" />
      </yd-cell-item>
      <yd-cell-item>
        <yd-textarea slot="right"
                     v-model="info_form.address"
                     placeholder="请输入详细地址"
                     maxlength="100"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="其他信息"
                   v-if="isForm">
      <yd-cell-item v-for="(cItem,i) in customDatas" :key='i'>
        <span slot="left">{{ cItem.name }}：</span>
        <yd-input slot="right"
                  v-model="cItem.value"
                  max="40"
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :placeholder="'请输入' + cItem.name"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="易合支付"
                   v-if="yopshow">
      <yd-cell-item arrow
                    @click.native="aggregBtn">
        <span slot="left">分账入网</span>
        <span slot="right">{{ netEntState }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="易合专业版支付" v-if="yopProshow">
      <yd-cell-item arrow
                    @click.native="aggregProBtn">
        <span slot="left">分账入网</span>
        <span slot="right">{{ netProEntState }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="银行卡信息">
      <yd-cell-item arrow
                    @click.native="editBank">
        <span slot="left">银行卡</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder=""></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="支付密码"
                   v-if="isBalancePwd">
      <yd-cell-item arrow
                    @click.native="editBalancePwd">
        <span slot="left">余额支付密码</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder=""></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group :title="custom_title + '信息'"
                   v-if="is_custom">
      <yd-cell-item arrow
                    @click.native="editCustom">
        <span slot="left">{{ custom_title }}：</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  v-model="custom_value"
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder=""></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-cell-group :title="`银行卡${this.fun.initWithdrawal()}信息`"
                   v-if="isBankRecharge">
      <yd-cell-item arrow
                    @click.native="gotoBankCash">
        <span slot="left">开户信息</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder=""></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="结算账户信息"
                   v-if="is_open_converge_pay">
      <yd-cell-item arrow
                    @click.native="editUSer">
        <span slot="left">账户信息</span>
        <yd-input slot="right"
                  type="text"
                  disabled
                  required
                  :show-success-icon="false"
                  :show-error-icon="false"
                  :show-clear-icon="false"
                  placeholder=""></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <yd-actionsheet :items="sexItems"
                    v-model="showSex"
                    cancel="取消"></yd-actionsheet>
    <yd-cityselect v-model="showAdd"
                   :callback="resultAdd"
                   :items="district"></yd-cityselect>
    <yd-button-group>
      <yd-button size="large"
                 type="danger"
                 @click.native="submitInfo($event)">确认修改</yd-button>
    </yd-button-group>
    <div style="height: 1.875rem;"></div>
    <!--<mt-datetime-picker ref="picker" type="date" :startDate="startDateInfo" :endDate="endDateInfo" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" v-model="pickerValue">-->
    <!--</mt-datetime-picker>-->

    <van-popup v-model="dateshow_1"
               position="bottom"
               :overlay="true">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           :min-date="minDate"
                           @confirm="handleConfirm"
                           @cancel="cancelbtn" />
    </van-popup>
    <!-- 聚合支付入网选择弹框 -->
    <yd-actionsheet :items="aggreItems"
                    v-model="aggreshow"
                    cancel="取消"></yd-actionsheet>
    <yd-actionsheet :items="aggreProItems"
                    v-model="aggreProshow"
                    cancel="取消"></yd-actionsheet>
  </div>
</template>
<script>
import info from "./info_v2_controller";
export default info;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#info span {
  font-size: 14px !important;
}

.list1 {
  margin-top: 0.625rem;
  height: 2.75rem;
  width: 100%;
  background: #fff;
  padding: 0 0 0 3%;
  border-top: 1px solid #e6e1e1;
  font-size: 14px;
  line-height: 2.75rem;
  color: #333;
  text-align: left;
}
.list2 {
  height: 2.75rem;
  width: 100%;
  background: #fff;
  padding: 0 0 0 3%;
  border-top: 0.0625rem solid #e6e1e1;
  font-size: 14px;
  line-height: 2.75rem;
  color: #333;
  text-align: left;
}

.list1 i.fa.fa-angle-right {
  float: right;
  line-height: 2.75rem;
  display: inline-block;
  font-size: 0.9rem;
  margin-right: 0.375rem;
  color: #929292;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
  background-size: 1.25rem;
}

.fa-angle-right {
  color: #999;
  font-size: 1.625rem;
  float: right;
  line-height: 3.125rem;
  margin-left: 0.375rem;
  margin-right: 0.3125rem;
}

.btmobile {
  top: 0rem;
  line-height: 3rem;
  right: 100;
  width: 5rem;
  font-size: 12px;
  color: #f15353;
}

#info .mint-button {
  margin: 0 2%;
}

.maleall {
  background: #fff;
  text-align: left;
}

.males {
  line-height: 3.125rem;
  display: flex;
  border-top: 0.0625rem solid #f3f3f3;
  margin-left: 0.625rem;
}

.maleall span {
  color: #888;
  font-size: 14px;
  vertical-align: middle;
  width: 28%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

#address {
  flex: 1;
  line-height: 3.125rem;
  .mint-button--default {
    line-height: 3.125rem;
    text-align: left;
  }
}

#myimg {
  flex: 1;
  text-align: right;
}

.popup-con {
  width: 100%;
}

.el-upload img {
  width: 30%;
}

.avatar-uploader-icon {
  padding-right: 1.5625rem;
}

.mint-cell-wrapper {
  background: red;
}

.mint-button {
  margin: 0.3125rem 0;
}

#info .mint-cell-wrapper {
  padding: 0;
}
</style>
