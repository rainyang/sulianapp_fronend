<template>
  <div>
    <div style="height:0.625rem"></div>
    <div class="my-value">
      <van-cell-group>
        <van-field
          style="border: 1px solid #bfcbd9;"
          v-model="expressName"
          placeholder="请选择快递公司"
          readonly
          @click.native="companyShow = true"
        />
      </van-cell-group>
    </div>
    <div style="height:10px"></div>
    <van-cell-group>
      <van-field
        style="border: 1px solid #bfcbd9;"
        v-model="form.express_sn"
        placeholder="请输入快递单号"
      />
    </van-cell-group>
    <div style="height:40px"></div>
    <van-button
      type="default"
      size="large"
      style="width: 100%; background:#20a0ff;color: #fff;"
      @click="submitInfo"
      >提交信息</van-button
    >
    <yd-popup v-model="companyShow" position="right" width="100%">
      <yd-navbar title="选择快递" height="40px" fontsize="14px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="companyShow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:40px;"></div>

      <yd-cell-item
        arrow
        v-for="(item,i) in express"
		:key='i'
        @click.native="companyConfirm(item)"
      >
        <span slot="left">{{ item.name }}</span>
      </yd-cell-item>
    </yd-popup>
  </div>
</template>
<script>
import order_after_express_info_controller from "./order_after_express_info_controller";
export default order_after_express_info_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#refund {
  text-align: left;
  font {
    background: #fff;
    display: block;
    color: #f15353;
    line-height: 2rem;
    padding: 0 0.625rem;
    font-size: 12px;
  }
  .my_wrapper {
    background: #fff;
    overflow: hidden;
    display: flex;
    padding: 0.625rem;
    align-items: center;
    span {
      width: 6.5625rem;
      flex: none;
      font-size: 16px;
      line-height: 1;
    }
    .my-value {
      flex: 2;
      text-align: left;
      span {
        color: red;
      }
    }
    .mint-popup {
      width: 100%;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
