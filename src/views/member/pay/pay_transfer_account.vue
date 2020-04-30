<template>
  <div id="transfer-accounts">
    <c-title :hide="false" text="转账"></c-title>
    <div class="pay-info">
      <ul>
        <h1>上传付款凭证</h1>
        <li>订单：{{ pay_info }}</li>
        <li>金额：{{ amount_info }}元</li>
        <div class="accounts-box">
          <!-- <yd-icon class="iconfont icon-plus" custom size="2.25rem" color="#c9c9c9"></yd-icon> -->
          <!-- setting sun -->
          <div>
            <van-uploader
              :after-read="onRead"
              :max-size="photosize"
              @oversize="onphotosize"
            >
              <!--<el-upload :action="uploadUrl" :on-preview="handlePreview" :limit="1" list-type="picture-card" :show-file-list="false" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleStoreSuccess">-->
              <div
                style="padding: 1rem;  width: 10rem;height: 10rem; border: 1px dashed #333;margin: 0 auto"
              >
                <img
                  :src="
                    imageUrl
                      ? imageUrl
                      : require('../../../assets/images/up_icon.png')
                  "
                  style="width: 100%"
                  class="avatar"
                />
              </div>
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
              <!--<i v-else class="el-icon-plus"></i>-->
              <!--</el-upload>-->
            </van-uploader>
          </div>
        </div>
        <li>如是在没有凭证请联系发货方对账后再点击确认</li>
      </ul>
    </div>
    <div class="btn">
      <!-- <yd-button type="button">确认已经汇款</yd-button> -->
      <!-- <yd-button type="button" @click.native="show1 = true">在线付款</yd-button> -->
      <!-- setting sun -->
      <!--<el-row>-->
      <van-row>
        <!--<el-button type="success" @click="confirmEvent">确认已经汇款</el-button>-->
        <van-button
          type="primary"
          style="width: 80%; margin-bottom: 0.4rem;"
          @click="confirmEvent"
          >确认已经汇款</van-button
        >
      </van-row>
      <!--</el-row>-->
    </div>

    <div>
      <!--<el-row>-->
      <van-row>
        <van-button type="danger" style="width: 80%;" @click="onLine"
          >在线付款</van-button
        >
        <!--<el-button type="danger" @click="onLine">在线付款</el-button>-->
      </van-row>
      <!--</el-row>-->
    </div>
    <section id="prompt-box">
      <div id="prompt-info">
        <!-- <div class="info-title">
                    <h1>温馨提示:</h1>
                    <div class="icon" @click="closeTip"><yd-icon class="iconfont icon-guanbi" custom size="1.125rem" color="#c9c9c9"></yd-icon></div>

                </div> -->

        <h2>注意事项：汇款时请注意以下信息，请牢记！</h2>
        <!-- <ul v-for="item in matter_data">
                    <li>开户行：{{item.branch}}</li>
                    <li>开户支行：{{item.bank}}</li>
                    <li>开户名：{{item.company}}</li>
                    <li>开户账号：{{item.account}}</li>
                </ul> -->
        <ul>
          <li v-for="(item, index) in bank_info"
		  :key='i'>
            {{ item.title }}: {{ item.text }}
          </li>
        </ul>

        <h2>注意事项：汇款时请注意以下信息，请牢记！</h2>
        <ul class="prompt-a">
          <li>
            1.线下公司转账订单，一个识别码对应一个订单和相应的金额，请勿多转账或者少转账。
          </li>
          <li>
            2.请在7天内付清款项，超过10天未对账系统自动会取消订单，到账周期为3个工作起。
          </li>
        </ul>
        <!-- <button type="button" @click="confirmTip">确认</button> -->
      </div>
    </section>

    <!-- <yd-popup v-model="show1" position="bottom" height="60%" style="position:relative">
            <div id="prompt-info">
                <div class="info-title">
                    <h1>温馨提示:</h1>
                    <div class="icon" @click="closeTip"><yd-icon class="iconfont icon-guanbi" custom size="1.125rem" color="#c9c9c9"></yd-icon></div>

                </div>

                <h2>注意事项：汇款时请注意一下信息，请牢记！</h2>
                <ul class="prompt-a">
                    <li>1.线下公司转账订单，一个识别码对应一个订单和相应的金额，请勿多转账或者少转账。</li>
                    <li>2.请在7天内付清款项，超过10天未对账系统自动会取消订单，到账周期为3个工作起。</li>
                </ul>
                <h2>注意事项：汇款时请注意一下信息，请牢记！</h2>
                <ul>
                    <li>开户行：民生银行广州机场路支行</li>
                    <li>开户支行：民生银行</li>
                    <li>开户名：广州芸众信息科技有限公司</li>
                    <li>开户账号：201806121046</li>
                </ul>
                <button type="button" @click="confirmTip">确认</button>
            </div>
        </yd-popup> -->
  </div>
</template>

<script>
import pay_transfer_account_controller from "./pay_transfer_account_controller";
export default pay_transfer_account_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
// setting sun
.avatar {
  width: 100%;
  height: 100%;
}
.el-button--success {
  width: 80%;
  height: 2.875rem;
  margin-bottom: 0.75rem;
}
.el-button--danger {
  width: 80%;
  height: 2.875rem;
}

#transfer-accounts {
  padding-bottom: 20px;
  background-color: #fff;
  color: #333;
  padding-top: 2.5rem;
  .pay-info {
    h1 {
      font-size: 20px;
      line-height: 2.5rem;
      margin: 1.25rem 0;
    }
    .accounts-box {
      -border: dashed 0.0625rem #ebebeb;
      -background-color: #fafafa;
      -display: flex;
      justify-content: center;
      margin: 0.625rem auto;
      // i{
      //     line-height: 7.5rem;
      // }
    }
    ul {
      li {
        line-height: 1.5rem;
        font-size: 16px;
      }
      li:last-child {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  .btn {
    margin-top: 1rem;
    font-size: 16px;
    // button{
    //     padding:0;
    //     border:none;
    //     font-size:16px;
    //     width:80%;
    //     color:#fff;
    //     height:2.875rem;
    //     border-radius: 0.25rem;
    //     margin-bottom:0.75rem;
    // }
    // button:first-child{
    //     background-color:#09bb07;
    // }
    // button:last-child{
    //     background-color:#f15353;
    // }
  }
  #prompt-box {
  }
  #prompt-box {
    margin-top: 1.25rem;
  }
  #prompt-info {
    z-index: 20;
    height: 100%;
    // padding-top:2.5rem;
    padding-bottom: 0.625rem;
    background-color: #fafafa;
    margin: 0 0.625rem;
    border-radius: 0.25rem;
    .info-title {
      width: 100%;
      position: fixed;
      top: 0;
      padding: 0 0.875rem;
      display: flex;
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom: solid 0.0625rem #ebebeb;
      justify-content: center;
      background-color: #fff;
      .icon {
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        right: 0rem;
        line-height: 2.5rem;
      }
    }
    h1 {
      font-size: 16px;
      text-align: center;
    }
    h2 {
      line-height: 2.5rem;
      padding: 0 0.875rem;
      font-size: 14px;
      text-align: left;
      color: #333;
    }
    .prompt-a li {
      text-indent: -0.625rem;
      margin-left: 0.625rem;
    }
    ul {
      margin: 0 0.875rem;
      li {
        padding: 0 0.625rem;
        line-height: 1.5rem;
        font-size: 14px;
        color: #8c8c8c;
        text-align: left;
        text-indent: 0.625rem;
      }
    }
    button {
      width: 21.6875rem;
      margin: 0 0.875rem;
      border: none;
      background-color: #f15353;
      height: 2.875rem;
      border-radius: 0.25rem;
      color: #fff;
      font-size: 16px;
      margin-top: 1.25rem;
    }
  }
}
</style>
