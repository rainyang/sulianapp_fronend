<template>
  <div id="bankcardinformmationsedit">
    <c-title :hide="false" text="银行卡信息"></c-title>
    <div style="height: 40px;"></div>
    <div class="big_bank_box">
      <ul class="bank_ul">
        <li>
          <div>
            账户类型：
          </div>
          <div class="bank_radio" style="height: 4rem;width: 84%;">
            <yd-radio-group
              v-model="radio"
              style="height:4rem;display:flex;width: 84%;"
              color="#5677fc"
              size="14"
              :callback="changeOut"
            >
              <yd-radio
                val="对公账户"
                style="height:4rem;width:40%;display:flex;align-items: center;line-height: 2rem;"
                v-if="public"
              ></yd-radio>
              <yd-radio
                val="对私账户"
                style="height:4rem;width:50%;display:flex;align-items: center;line-height: 2rem;"
                v-if="private"
              ></yd-radio>
            </yd-radio-group>
          </div>
        </li>
        <li>
          <div>
            银行帐号：
          </div>
          <span v-if="!status">{{receiverAccountNoEnc}}</span>
          <input
            type="text"
            v-if="status === true"
            placeholder="请输入银行卡卡号"
            v-model="receiverAccountNoEnc"
          />
        </li>
        <li>
          <div>
            持卡人：
          </div>
          <input
            type="text"
            :readonly="status ? false : 'readonly'"
            placeholder="请输入持卡人名称"
            v-model="receiverNameEnc"
          />
        </li>
        <li v-if="privateLi">
          <div>
            账户联行号：
          </div>
          <input
            type="text"
            :readonly="status ? false : 'readonly'"
            placeholder="对公账户必须填写"
            v-model="receiverBankChannelNo"
          />
        </li>
        <li style="border:none;">
          <div style="width:6.69rem;">
            设为默认账户：
          </div>
          <div style="text-align:right;" class="bank_swich">
            <yd-switch v-model="switch1" color="#f15353"></yd-switch>
          </div>
        </li>
      </ul>
    </div>
    <div class="bank_butto" @click="change" v-if="!status">
      点击修改
    </div>
    <div class="bank_butto" @click="addTiJiao" v-else>
      确认修改
    </div>
    <div class="bank_button_delete" @click="deleteChange">
      删除账户
    </div>
  </div>
</template>
<script>
  import bankcardinedit_controller from "./bankcardinedit_controller.js";
  export default bankcardinedit_controller;
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
  #bankcardinformmationsedit {
    .big_bank_box {
      left: 0rem;
      top: 5.44rem;
      width: 23.44rem;
      height: 19.31rem;
      line-height: 1.25rem;
      text-align: center;
      .bank_ul {
        padding-left: 5px;
        li {
          height: 4rem;
          line-height: 4rem;
          padding-left: 1rem;
          border-bottom: 1px solid #c6c6c6;

          display: flex;
          text-align: left;
          input {
            border: none;
          }
          div {
            left: 0.81rem;
            top: 6.88rem;
            width: 5.69rem;
            height: 1.38rem;
            color: rgba(16, 16, 16, 1);
            font-size: 0.94rem;
            text-align: left;
            font-family: SourceHanSansSC-regular;
          }
          .bank_swich {
            left: 17.94px;
            top: 21.31px;
            width: 4.69rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            height: 4rem;
            align-items: center;
            margin-left: 10rem;
          }
          .bank_radio {
          }
        }
      }
    }
    .bank_butto {
      left: 0.75rem;
      top: 26.56rem;
      width: 21.88rem;
      height: 2.69rem;
      border-radius: 0.25rem;
      background-color: rgba(37, 155, 36, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 0.88rem;
      text-align: center;
      font-family: Microsoft Yahei;
      margin: 2rem auto;
      line-height: 2.69rem;
    }
    .bank_button_delete {
      left: 0.75rem;
      top: 31.19rem;
      width: 21.88rem;
      height: 2.69rem;
      line-height: 2.69rem;
      border-radius: 0.25rem;
      background-color: rgba(221, 39, 39, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 0.88rem;
      text-align: center;
      font-family: Microsoft Yahei;
      margin: 1rem auto;
    }
  }
</style>
