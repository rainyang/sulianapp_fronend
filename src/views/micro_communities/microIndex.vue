<template>
  <div id="microIndex">
    <div class="banner">
      <div class="searchcontent"
           @click="jumpToSearch">
        <i class="iconfont iconfont icon-sousuo1"></i>搜索你喜欢的...
      </div>
      <div class="img_contetnt"
           @click="jumpAddress(topContent.micro_top_jump)">
        <img :src="topContent.micro_top"
             alt="">
      </div>
      <div class="bottomcontent">
        <div class="top">
          <div class="left">
            <img src="../../assets/images/micro_communities/home_eye@2x.png"
                 alt="">
          </div>
          <div class="right">{{topContent.browse_num?topContent.browse_num:0}}</div>
        </div>
        <div class="bottom">
          <div class="left">
            <img src="../../assets/images/micro_communities/home_post@2x.png"
                 alt="">
          </div>
          <div class="right">{{topContent.trick_num?topContent.trick_num:0}}</div>
        </div>
      </div>
    </div>
    <div class="milist">
      <ul>
        <li v-if="functionList.show_sign"
            @click="goToUrl('sign')">
          <div class="top">
            <img src="../../assets/images/micro_communities/index_icon_1@2x.png"
                 alt="">
          </div>
          <div class="bottom">签到</div>
        </li>
        <li v-if="functionList.show_clock"
            @click="goToUrl('ClockPunch')">
          <div class="top">
            <img src="../../assets/images/micro_communities/index_icon_2@2x.png"
                 alt="">
          </div>
          <div class="bottom">打卡</div>
        </li>
        <li v-if="functionList.show_video"
            @click="goToUrl('VideoList')">
          <div class="top">
            <img src="../../assets/images/micro_communities/index_icon_3@2x.png"
                 alt="">
          </div>
          <div class="bottom">视频</div>
        </li>
        <li v-if="functionList.show_qr"
            @click="openQrCode('block')">
          <div class="top">
            <img src="../../assets/images/micro_communities/index_icon_4@2x.png"
                 alt="">
          </div>
          <div class="bottom">二维码</div>
        </li>
        <template>
          <li v-for="(item,index) in cate"
		  :key='index'
              @click="goClassification(item.id)">
            <div class="top">
              <img src="../../assets/images/store_into.png"
                   v-if="!item.icon"
                   alt="">
              <img :src="item.icon"
                   v-else
                   alt="">
            </div>
            <div class="bottom">{{item.name}}</div>
          </li>
        </template>
      </ul>
    </div>
    <van-swipe :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-if="bannerContent.micro_home_one">
        <div class="centerbanner"  @click="jumpAddress(bannerContent.micro_home_one_jump)">
            <img :src="bannerContent.micro_home_one" alt="">
        </div>
      </van-swipe-item>
      <van-swipe-item v-if="bannerContent.micro_home_two">
        <div class="centerbanner" @click="jumpAddress(bannerContent.micro_home_two_jump)">
            <img :src="bannerContent.micro_home_two" alt="">
        </div>
      </van-swipe-item>
      <van-swipe-item v-if="bannerContent.micro_home_three">
        <div class="centerbanner" @click="jumpAddress(bannerContent.micro_home_three_jump)">
            <img :src="bannerContent.micro_home_three" alt="">
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active"
              @change="getClassificationBtn"
              style="background:#f9f5f5;"
              sticky
              swipeable>
      <van-tab title="最新">
        <div class="video_list">
          <c-flow :showLoading="showLoading" @loadMore="loadMore" :list='newClassification'
                  v-if="active == '0'"></c-flow>
        </div>
      </van-tab>
      <van-tab title="附近">
        <div class="video_list">
          <c-flow :showLoading="showLoading" @loadMore="loadMore" :list='nearbyClassification'
                  v-if="active == '1'"></c-flow>
        </div>
      </van-tab>
      <template v-for="(item,index) in cate">
        <van-tab :title="item.name">
          <template v-if="cateList[index]&&cateList[index].length>0">
            <div class="video_list">
              <c-flow :showLoading="showLoading" @loadMore="loadMore" :list='cateList[index]'
                      v-if="active == index+2"></c-flow>
            </div>
          </template>
        </van-tab>
      </template>
    </van-tabs>
    <div id="ewm"
         ref="hook"
         @click="openQrCode('none')">
      <div class="pic"
           v-if="poster">
        <img :src="poster"
             alt="二维码" />
      </div>
      <div class="pic"
           style="line-height: 10;margin-top: 9rem;"
           v-if="!poster">
        二维码生成中 请稍候查看
      </div>
    </div>
  </div>
</template>

<script>
import microIndex_controller from "./microIndex_controller";
export default microIndex_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#microIndex {
  .banner {
    position: relative;
    .searchcontent {
      width: 21rem;
      height: 1.88rem;
      line-height: 1.88rem;
      background-color: #f9f9f9;
      border-radius: 0.94rem;
      position: absolute;
      top: 0.5rem;
      left: 50%;
      margin-left: -10.5rem;
      font-size: 0.88rem;
      color: #8c8c8c;
      z-index: 999;
    }
    width: 100%;
    min-height: 11rem;
    position: relative;
    .img_contetnt {
      img {
        width: 100%;
      }
    }
    .bottomcontent {
      position: absolute;
      width: 5rem;
      height: 3rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0.5rem;
      right: 1rem;
      bottom: 1rem;
      .top,
      .bottom {
        display: flex;
        align-items: center;
        height: 1.5rem;
      }
      .left {
        margin-left: 0.75rem;
        margin-right: 0.47rem;
        width: 1rem;
        height: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        font-size: 1rem;
        font-weight: normal;
        line-height: 1rem;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 2.5rem;
      }
    }
  }
  .milist {
    background-color: #ffffff;
    padding-top: 0rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
        margin-bottom: 0.91rem;
        .top {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          margin-bottom: 0.63rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .bottom {
          font-size: 12px;
          line-height: 1.2rem;
          overflow: hidden;
        }
      }
    }
  }
  .centerbanner {
    img {
      width: 100%;
    }
  }
  .video_list {
    ul {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      justify-content: space-between;
      li {
        border-radius: 0.38rem;
        width: 10.59rem;
        background-color: #ffffff;
        padding-bottom: 0.69rem;
        margin-bottom: 0.75rem;
        overflow: hidden;
        .top {
          min-height: 14.06rem;
          img {
            width: 100%;
          }
        }
        .bottom {
          padding-left: 0.59rem;
          .title {
            padding-top: 0.63rem;
            font-size: 0.84rem;
            line-height: 0.84rem;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: left;
            margin-bottom: 0.59rem;
          }
          .content {
            display: flex;
            justify-content: space-between;
            .headmessage {
              display: flex;
              .left {
                width: 1.13rem;
                height: 1.13rem;
                border-radius: 50%;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .name {
                margin-left: 0.31rem;
                height: 1.13rem;
                line-height: 1.13rem;
                text-align: left;
                color: #8c8c8c;
                font-size: 0.69rem;
              }
            }
            .thumbup {
              display: flex;
              padding-top: 0.16rem;
              .right {
                width: 0.81rem;
                height: 0.84rem;
                margin-right: 0.38rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .num {
                min-width: 2rem;
                max-width: 8rem;
                text-align: left;
                color: #333333;
                font-size: 0.75rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
  #ewm {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgba(140, 140, 140, 0.72);
    z-index: 100;
    display: none;
    padding-top: 14%;
    .pic {
      width: 70%;
      margin: auto;
      background: #fff;
      border-radius: 0.625rem;
      overflow: hidden;
      .title {
        padding: 0.625rem;
        border-bottom: 0.0625rem solid #ebebeb;
        img {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          .set a {
            color: #fff;
            font-size: 24px;
          }
          #ewm {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background: rgba(140, 140, 140, 0.72);
            z-index: 9;
            display: none;
            padding-top: 14%;
            .pic {
              width: 70%;
              margin: auto;
              background: #fff;
              border-radius: 0.625rem;
              overflow: hidden;
              .title {
                padding: 0.625rem;
                border-bottom: 0.0625rem solid #ebebeb;
                img {
                  height: 2.5rem;
                  width: 2.5rem;
                  border-radius: 50%;
                  display: inline-block;
                  vertical-align: middle;
                }
                span {
                  margin-left: 0.875rem;
                  vertical-align: middle;
                  font-size: 16px;
                }
              }
              .ewm {
                z-index: 40;
                img {
                  width: 50%;
                  display: block;
                  float: right;
                }
              }
            }
            img {
              width: 100%;
              display: block;
            }
          }
        }
      }
    }
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
