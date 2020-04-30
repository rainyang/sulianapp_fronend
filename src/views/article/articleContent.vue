<template>
  <div id="articleContent">
    <c-title :hide="false" :text="title"></c-title>
    <div style="height: 40px;"></div>
    <h4>{{ dataInfo.title }}</h4>
    <div class="time">
      {{
        $vueIsTextEmpty(dataInfo.virtual_at)
          ? dataInfo.updated_at
          : dataInfo.virtual_at
      }}
      {{ dataInfo.author }}
    </div>
    <div class="content">
      <div v-html="content" id="con"></div>
    </div>
    <div class="foot_advs" @click="toAdvs()" v-if="is_advs_type">
      <p class="advs_title">{{ dataInfo.advs_title }}</p>
      <div class="advs_img_bg" v-if="dataInfo.advs_img">
        <img class="advs_img" :src="dataInfo.advs_img" />
      </div>
      <div class="advs_img_bg" v-if="!dataInfo.advs_img">
        <img class="advs_img" src="../../assets/images/img_default.png" />
      </div>
      <div class="advs_desc">{{ dataInfo.advs_title_footer }}</div>
    </div>
    <div class="foot">
      <div>
        <h4 class="read">阅读 {{ read_num }}</h4>
        <h4 class="like" @click="like(like_num)">
          {{ is_liked ? "已点赞" : "点赞" }} {{ like_num }}
        </h4>
      </div>
      <div v-if="is_report_enabled">
        <h4 class="report" @click="report()">举报</h4>
      </div>
      <div v-if="is_link">
        <h4 class="link" @click="link()">阅读原文</h4>
      </div>
    </div>

    <div class="qrCode" v-if="codeUrl">
      <h3>【二维码】</h3>
      <div class="code">
        <span>长按识别二维码</span>
        <div class="img">
          <img :src="codeUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import articleContent_controller from "./articleContent_controller";
export default articleContent_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#articleContent {
  padding: 0.625rem;
  background: #fff;
  .foot_advs {
    margin-bottom: 1.25rem;
    background: #fff;
    height: auto;
    border: 0.0625rem solid #dddddd;
    padding: 0.3125rem;
    background: #fff;
    width: 100%;
    border-radius: 0px;
  }
  .qrCode {
    background: #fff;
    margin-top: 0.625rem;
    padding-bottom: 1.25rem;
    h3 {
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 16px;
      text-align: left;
      padding: 0 0.875rem;
    }
    .code {
      span {
        color: #8c8c8c;
      }
      .img {
        width: 7.5rem;
        height: 7.5rem;
        overflow: hidden;
        background: #f5f5f5;
        margin: 0.625rem auto;
        img {
          width: 100%;
        }
      }
    }
  }
  .foot {
    height: 1.875rem;
  }
  h4 {
    text-align: left;
    font-size: 18px;
  }
  h4.like {
    float: left;
    color: #8a8a8a;
    text-align: left;
    font-size: 16px;
  }
  h4.read {
    padding-right: 0.625rem;
    float: left;
    color: #8a8a8a;
    text-align: left;
    font-size: 16px;
  }
  h4.report {
    padding-right: 0.625rem;
    float: right;
    color: #8a8a8a;
    text-align: left;
    font-size: 16px;
  }
  h4.link {
    padding-right: 0.625rem;
    float: right;
    color: #8a8a8a;
    text-align: left;
    font-size: 16px;
  }
  h4.copy {
    padding-right: 0.625rem;
    float: left;
    color: #8a8a8a;
    text-align: left;
    font-size: 16px;
  }
  .time {
    font-size: 14px;
    color: #8a8a8a;
    text-align: left;
    line-height: 1.5625rem;
    height: 1.5625rem;
  }
  .content {
    width: 100%;
    font-size: 16px;
    text-align: left;
    padding-top: 0.625rem;
    padding-bottom: 1.875rem;
    img {
      width: 100%;
    }
  }
  .advs_img_bg {
    width: 100%;
    margin-bottom: 0.625rem;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
  }
  .advs_img {
    width: 100%;
  }
  p.advs_title {
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    text-align: left;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  .advs_desc {
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    text-align: left;
    font-size: 14px;
    color: #8a8a8a;
  }
}
</style>
