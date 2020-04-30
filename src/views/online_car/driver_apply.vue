<template>
  <div id="dirver_apply">
    <c-title :hide="false"
             text="司机申请"></c-title>
    <div id="content">
      <div class="banner">
        <a :href="`https://${apply_url}`">
          <img :src="apply_banner">
        </a>
      </div>
      <div class="select_box">
        <h1>{{apply_title}}</h1>
        <div class="select"
             v-if="is_presence===0">
          <input type="text"
                 @click.stop="show1 = true"
                 v-model="address"
                 readonly
                 placeholder="请选择跑车城市">
          <i class="iconfont icon-up"></i>
        </div>
      </div>
      <yd-cityselect v-model="show1"
                     :callback="result1"
                     :items="district"
                     v-if="show"></yd-cityselect>
      <div class="require_box">
        <div class="title">
          <span class="square"></span>
          <h2>基本要求</h2>
        </div>
        <p class="text">{{apply_base}}</p>
      </div>
      <div class="flow_box">
        <div class="title">
          <span class="square"></span>
          <h2>招募流程</h2>
        </div>
        <div class="text"
             v-html="apply_process"></div>
      </div>
      <div class="more_box">
        <div class="title">
          <span class="square"></span>
          <h2>更多内容</h2>
        </div>
        <p class="text">{{apply_more}}</p>
      </div>
      <div class="btm_btn">
        <button type="button"
                @click.stop="turnTo"
                v-if="is_presence===1">查看详情</button>
        <button type="button"
                @click.stop="turnTo"
                v-else>立即加入</button>
      </div>
    </div>
  </div>
</template>

<script>
import controller from "./dirver_apply_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#dirver_apply {
  padding-top: 40px;
  padding-bottom: 80px;
  #content {
    .banner {
      width: 100%;
      overflow: hidden;
      background: #f2f2f2;
      margin-bottom: 0.625rem;
      a {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    .select_box {
      width: 21.5625rem;
      border-radius: 0.5rem;
      background: #fff;
      margin: 0 auto;
      padding: 0.875rem 0.875rem 1.25rem 0.875rem;
      margin-bottom: 0.625rem;
      h1 {
        font-size: 16px;
        text-align: left;
      }
      .select {
        width: 14.5rem;
        height: 1.875rem;
        border: solid 0.0625rem #ebebeb;
        font-size: 14px;
        border-radius: 0.25rem;
        margin: 1.25rem auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          font-size: 12px;
          border: none;
        }
        i {
          display: block;
          color: #666;
          font-size: 16px;
          transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          -o-transform: rotate(90deg);
        }
      }
    }
    .require_box,
    .flow_box,
    .more_box {
      width: 21.5625rem;
      border-radius: 0.5rem;
      background: #fff;
      margin: 0 auto;
      padding: 0.625rem 0.875rem;
      margin-bottom: 0.625rem;
      .title {
        display: flex;
        line-height: 2.25rem;
        align-items: center;
        .square {
          display: flex;
          width: 0.25rem;
          height: 1rem;
          border-radius: 0.125rem;
          background: #ed743b;
          margin-right: 0.625rem;
        }
        h2 {
          font-size: 16px;
        }
      }
      .text {
        font-size: 14px;
        color: #666;
        text-align: left;
      }
    }
    .btm_btn {
      position: fixed;
      bottom: 0;
      background: #fff;
      width: 100%;
      padding: 0.625rem;
      border-top: solid 0.0625rem #ebebeb;
      button {
        display: block;
        line-height: 2.5rem;
        width: 21.5625rem;
        height: 2.5rem;
        background: #ed743b;
        color: #fff;
        font-size: 16px;
        border: none;
        border-radius: 0.375rem;
      }
    }
  }
}
</style>
