<template>
  <div id="my-video">
    <c-title :hide="false"
             :text="'我的视频'">
    </c-title>
    <div style="height: 40px"></div>
    <div class="member">
      <div class="member-info">
        <div class="avator">
          <div class="user">
            <div class="user-head">
              <img :src="member.avatar_image">
            </div>
            <ul class="activities-name">
              <li>{{member.nickname}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <van-tabs v-model="activeName"
              @click.native="handleClick">
      <van-tab :title="`已发布(${release})`"
               name="1"></van-tab>
      <van-tab :title="`审核中(${review})`"
               name="0"
               v-if="is_open"></van-tab>
    </van-tabs>
    <div class="video-list">
      <ul ref="newArray1"
          class="zq-waterfall-left">
        <li v-for="(item,i) in newArray1"
            @click="toVideo(item)"
            :key='i'>
          <img class="video-img"
               :src="item.cover"
               alt="">
          <p>{{item.title}}</p>
          <div class="people"
               v-if="item.member">
            <img :src="item.member.avatar_image"
                 alt="">
            <span>{{item.member.nickname}}</span>
          </div>
          <img class="play"
               src="../../../assets/images/home_play@2x.png"
               alt="">
        </li>

      </ul>
      <ul ref="newArray2"
          class="zq-waterfall-right">
        <li v-for="(item,i) in newArray2"
            @click="toVideo(item)"
            :key='i'>
          <img class="video-img"
               :src="item.cover"
               alt="">
          <p>{{item.title}}</p>
          <div class="people"
               v-if="item.member">
            <img :src="item.member.avatar_image"
                 alt="">
            <span>{{item.member.nickname}}</span>
          </div>
          <img class="play"
               src="../../../assets/images/home_play@2x.png"
               alt="">
        </li>
      </ul>
      <div class="load"
           v-if="!showLoading">
        <!--<img src="https://dev6.yunzmall.com/addons/yun_shop/static/app/images/video-loading.gif" alt="">-->
        <img src="../../../assets/images/video-loading.gif"
             alt="loading">
      </div>
      <div style="height: 3rem"></div>
    </div>
  </div>
</template>

<script>
import my_video_controller from "./my_video_controller";

export default my_video_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#my-video {
  .load {
    text-align: center;
    img {
      width: 3rem;
    }
  }
  .member {
    width: 100%;
    background-color: #fff;
    text-align: center;
    padding-top: 1.625rem;
    padding-bottom: 1.625rem;
    .member-info {
      left: 18px;
      margin: 0 auto;
      width: 20.625rem;
      height: 6.25rem;
      border-radius: 0.625rem;
      text-align: center;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0);
      display: flex;
      align-items: center;
      .avator {
        padding-left: 1.0625rem;
        .user {
          display: flex;
          text-align: center;
          align-items: center;
          .activities-name {
            text-align: left;
            flex: 2;
            margin-left: 0.625rem;
            line-height: 1.875rem;
            font-weight: bold;
            font-size: 14px;
          }
          .user-head {
            height: 4rem;
            width: 4rem;
            background: #fff;
            border-radius: 50%;
            border: 0.125rem solid #fff;
            box-sizing: border-box;
            float: left;
            overflow: hidden;
          }
          .user-head img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .video-list {
    margin: 0.5rem 0.5rem 3.5rem 0.5rem;
    text-align: left;
    /*display: flex;*/
    ul {
      vertical-align: top;
      display: inline-block;
      /*display: flex;*/
      /*flex-direction: column;*/
      /*flex-wrap: wrap;*/
      width: 48%;
    }
    li {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      overflow: hidden;
    }
    .play {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    ul:first-child {
      margin-right: 0.5rem;
    }
    p {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      padding: 5px 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .video-img {
      width: 100%;
      height: auto;
    }
    .people {
      display: flex;
      padding: 5px;
      img {
        flex: 0 0 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin: 0 5px;
      }
      span {
        flex: 1;
        line-height: 1.5rem;
        margin: 0 5px;
        font-size: 11px;
        color: #8c8c8c;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
