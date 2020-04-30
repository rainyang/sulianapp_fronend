<template>
  <div id="inputvisit">
    <c-title
      :hide="false"
      text='邀请码'
      class="hidden"
    ></c-title>
    <div id="content">
      <p class="content_a">请输入邀请码</p>
      <input
        type="text"
        placeholder="请输入邀请码"
        v-model="invite_code"
      >
      <button
        type="button"
        class="btn_b"
        @click='submit'
      >确定</button>
      <p class="content_b">“邀请码是{{title}}为会员用户提供的专属编码，普通用户需要有会员的推荐方可在商城内购买商品，快去找您身边的{{title}}会员吧”</p>
    </div>
  </div>
</template>
<script>
    import inputVisit_Controller from "./inputVisit_Controller";

    export default inputVisit_Controller;
</script>
<style lang="scss" rel="stylesheet/scss" >
#inputvisit {
  padding-top: 40px;
  background: #fff;
  min-height: 41.25rem;
  #content {
    .content_a {
      font-size: 18px;
      font-weight: bold;
      margin: 2.5rem auto;
    }
    input {
      width: 18.75rem;
      border: none;
      border-bottom: solid 0.0625rem #ebebeb;
      line-height: 3.125rem;
      height: 3.125rem;
      font-size: 18px;
      margin: 1.25rem auto;
    }
    button {
      width: 16.875rem;
      height: 2.8125rem;
      border-radius: 1.875rem;
      color: #fff;
      background: #ccc;
      margin: 1.25rem auto;
      border: none;
      font-size: 18px;
    }
    .btn_b {
      background: #f15353;
    }
    .content_b {
      margin: 0 auto;
      width: 16.875rem;
      font-size: 14px;
      color: #8c8c8c;
    }
  }
}
</style>