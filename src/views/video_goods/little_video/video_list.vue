<template>
  <div id="video-list">
    <c-title :hide="false"
             :text="'视频列表'"
             :url="'member'">
    </c-title>
    <div style="height: 40px"></div>

    <div class="banner">
      <yd-slider autoplay="3000">
        <yd-slider-item v-for="(bannerItem,i) in bannerList"
                        :key='i'>
          <a :href="bannerItem.url">
            <img class="banner-item"
                 :src="bannerItem.img">
          </a>
        </yd-slider-item>
      </yd-slider>
    </div>

    <div class="video-list">
      <ul ref="newArray1"
          class="zq-waterfall-left">
        <li @click="toVideo(item)"
            v-for="(item,i) in newArray1"
            :key='i'>
          <img class="video-img"
               :src="item.cover"
               alt="">
          <p>{{item.title}}</p>
          <div class="people"
               v-if="item.member">
            <img :src="item.member.avatar"
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
        <li @click="toVideo(item)"
            v-for="(item,i) in newArray2"
            :key='i'>
          <img class="video-img"
               :src="item.cover"
               alt="">
          <p>{{item.title}}</p>
          <div class="people"
               v-if="item.member">
            <img :src="item.member.avatar"
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

    <!-- 页面底部的导航栏 -->
    <div class="footer"
         :style="{width:(this.fun.getPhoneEnv() == 3?'375px':'100%')}">
      <ul>
        <router-link :to="fun.getUrl('home')">
          <li class="na">
            <i class="fa fa-home"></i>
            <p>首页</p>
          </li>
        </router-link>

        <router-link :to="fun.getUrl('category',{fromHome: 1})">
          <li class="na">
            <i class="fa fa-th-large"></i>
            <p>分类</p>
          </li>
        </router-link>

        <router-link :to="fun.getUrl('videoAgreement')">
          <li class="button"
              style="width: 3.5rem;margin: -.8rem .47rem 0 .47rem;">
            <img src="../../../assets/images/home_bot_but@2x.png"
                 alt="">
          </li>
        </router-link>

        <router-link :to="fun.getUrl('cart')">
          <li class="na righ">
            <i class="fa fa-cart-plus"></i>
            <p>购物车</p>
          </li>
        </router-link>

        <router-link :to="fun.getUrl('member')">
          <li class="na righ">
            <i class="fa fa-user"></i>
            <p>我的</p>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="btn"
         @click="my">
      我的<br>发布
    </div>
  </div>
</template>

<script>
import video_list_controller from "./video_list_controller";

export default video_list_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#video-list {
  .load {
    text-align: center;
    img {
      width: 3rem;
    }
  }
  .banner {
    width: 100%;
    height: 10rem;
    img {
      width: 100%;
      height: 10rem;
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
  .button {
    height: 3.5rem;
    z-index: 2001;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0rem;
    width: 100%;
    height: 3.125rem;
    background: #fff;
    box-sizing: border-box;
    z-index: 100;
    ul {
      box-sizing: border-box;
      width: 100%;
      height: 3.125rem;
      padding: 0.5rem;
      li {
        width: 20%;
        float: left;
        font-size: 12px;
        color: #828282;
        i {
          font-size: 1.25rem;
        }
      }
      .openMyShop {
        width: 3.4375rem;
        height: 3.4375rem;
        background: #f15353;
        border-radius: 50%;
        line-height: 1.25rem;
        padding-top: 0.5rem;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        font-size: 16px;
        box-shadow: 0 0 0 0.375rem #e6e6e6;
        position: relative;
        bottom: 1.125rem;
        font-size: 14px;
        z-index: 100;
        margin: 0 auto;
      }
    }
  }
  .btn {
    width: 3.375rem;
    height: 3.0625rem;
    border-radius: 0.625rem;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 12%;
    right: 0.5rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
