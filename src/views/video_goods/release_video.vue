<!-- 发布商品小视频组件 -->
<template>
  <div id="releaseVideo">
    <c-title :hide="false"
             text="发布视频"
             :url="'VideoList'"></c-title>
    <div class="content">
      <van-cell-group class="settitle">
        <van-field v-model.trim="title"
                   placeholder="标题：请输入标题，4-18个字"
                   maxlength="18" />
      </van-cell-group>
      <div class="video-wrap">
        <video preload="metadata"
               controlslist="nodownload"
               width="100%"
               height="100%"
               custom-cache="false"
               controls
               ref="video"
               webkit-playsinline="true"
               x5-video-player-type="h5"
               playsinline
               x5-playsinline=""
               x5-video-orientation="portrait"
               x5-video-player-fullscreen=""
               autoplay="autoplay"
               :src="videoUrl"
               id="video"
               v-show="videoUrl"
               style="background:#ffffff">
          <source :src="videoUrl"
                  type="video/ogg">
          <source :src="videoUrl"
                  type="video/mp4">
          你的浏览器不支持video标签！
        </video>
        <img src="../../assets/images/agreen_video@2x.png"
             alt=""
             class="back_img"
             v-show="!videoUrl">
        <!-- <p class="video-guide"
           v-show="!videoUrl">点击上传视频</p> -->
        <input class="video-input"
               type="file"
               id="file"
               accept="video/*"
               v-show="!videoUrl"
               @change="onReadVideo">
      </div>
      <p style="margin: 0.25rem 1rem;text-align:left;color:#757575;">视频时长不应超过<small style="color:#FFC107;font-size:14px;">{{limit}}</small>秒</p>
      <span class="changeGoodClass"
            v-if="!this.fun.isTextEmpty(this.chooseGoods)"
            @click="gotoAdd">更换商品</span>
    </div>
    <div class="goood-class"
         v-if="!this.fun.isTextEmpty(this.chooseGoods)">
      <img :src="chooseGoods.thumb"
           alt="">
      <div class="right-class">
        <p>{{chooseGoods.title|escapeTitle}}</p>
        <div class="price">
          <span class="now-price">￥{{chooseGoods.price}}</span>
          <span class="old-price">原价：¥{{chooseGoods.market_price}}</span>
        </div>
      </div>
    </div>
    <div style="height: 2.8125rem;"></div>
    <div class="bottomBtn"
         :style="{width:(this.fun.getPhoneEnv() == 3?'375px':'100%')}">
      <span @click="BtnMethos"
            v-show="!showUploadBtn&&!uploadIng">{{this.fun.isTextEmpty(this.chooseGoods)?"添加商品":"确认发布"}}
      </span>
      <span @click="play_Upload"
            v-show="showUploadBtn">上传视频</span>
      <span style="background-color: #7d7e80;"
            v-show="!showUploadBtn&&uploadIng">视频上传中...
      </span>
    </div>
  </div>
</template>

<script>
import release_video_controller from "./release_video_controller";
export default release_video_controller;
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
#releaseVideo {
  .content {
    padding-top: 40px;
    background: #ffffff;
    padding-bottom: 1rem;
    overflow: hidden;
    .settitle {
      margin: 1rem 0;
    }
    .settitle::after {
      border: none;
    }
    .video-wrap {
      width: 90%;
      height: 14.19rem;
      position: relative;
      display: flex;
      margin: 0 auto;
      background: #fafafa;
      // background-image: url(../../assets/images/agreen_video@2x.png);
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .back_img {
        width: 5rem;
        height: 5rem;
      }
      .video-guide {
        position: absolute;
        color: #ffffff;
      }
      .video-input {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
      }
    }
    .changeGoodClass {
      display: inline-block;
      width: 14.38rem;
      height: 2.5rem;
      font-size: 1rem;
      color: #f15353;
      line-height: 2.5rem;
      margin-top: 1.88rem;
      border-radius: 0.25rem;
      border: solid 0.0625rem #f15353;
    }
  }
  .goood-class {
    // width: 100%;
    display: flex;
    margin: 0.63rem 0.94rem 3.94rem;
    background: #ffffff;
    img {
      width: 3.75rem;
      height: 3.75rem;
      margin: 0.63rem;
    }
    .right-class {
      flex: 1;
      overflow: hidden;
      padding: 0.63rem 0.63rem 0.63rem 0;
      p {
        overflow: hidden;
        text-overflow: ellipsis; //超出部分以省略号显示
        white-space: nowrap;
        width: 100%;
        text-align: left;
        margin-bottom: 0.81rem;
        color: #333333;
        font-size: 15px;
      }
      .price {
        display: flex;
        align-items: center;
        .now-price {
          font-size: 1rem;
          color: #f15353;
          margin-right: 1.19rem;
        }
        .old-price {
          font-size: 0.75rem;
          color: #8c8c8c;
        }
      }
    }
  }
  .bottomBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.31rem;
    background: #ffffff;
    border-top: solid 0.0625rem #ebebeb;
    display: flex;
    span {
      display: inline-block;
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #f15353;
      border-radius: 0.25rem;
      margin: 0.34rem 0.94rem;
      box-sizing: border-box;
      font-size: 1rem;
      color: #ffffff;
    }
  }
}
</style>
