<template>
  <div id="microhomepage">
    <!-- <c-title :hide="false" text='个人主页'></c-title> -->
    <div style="height: 20px;display: block;background: #fff;"></div>
    <div class="header">
      <div class="header_content">
        <div class="header_left">
          <img :src="homepageData.avatar"
               alt="">
        </div>
        <div class="headet_right">
          <div class="headet_right_top">
            <div class="name">{{homepageData.nickname}}</div>
            <div v-if="homepageData.is_own!=1"
                 class="attention"
                 @click="attentionBtn">{{homepageData.is_follow?'已关注':'+关注'}}</div>
          </div>
          <div class="bottom"
               @click="introductionInp"
               v-if="homepageData.is_own==1">
            <template v-if="homepageData.signature"> {{homepageData.signature}}</template>
            <template v-else>
              <div class="b_left">个性签名</div>
              <div class="b_right"><img src="../../assets/images/micro_communities/home_autograph@2x.png"></div>
            </template>
          </div>
          <div class="headet_right_bottom"
               v-if="homepageData.is_own!=1">{{homepageData.signature}}</div>
        </div>
      </div>
    </div>
    <div class="display_page">
      <div class="page_nav">
        <ul>
          <li>
            <div class="left"
                 @click="gotoFanList()">关注</div>
            <div class="right">{{homepageData.follow_num}}</div>
          </li>
          <li>
            <div class="left"
                 @click="gotoFanList()">粉丝</div>
            <div class="right">{{homepageData.fans_num}}</div>
          </li>
          <li>
            <div class="left">获赞</div>
            <div class="right">{{homepageData.harvest_num}}</div>
          </li>
        </ul>
      </div>
      <div v-if="homepageData.is_own!=1"
           class="page_nav_content">
        <ul class="nav_label">
          <li>全部帖子({{homepageData.trick_num}})</li>
        </ul>
        <div class="video_list">
          <c-flow :list='catelist' :showLoading="showLoading"></c-flow>
          <!-- ==================================================== -->
          <!-- <ul v-if="false">
            <li v-for="(item,index) in catelist"
                @click="jumpDetails(item.has_many_image[0].stick_id)">
              <div class="top">
                <img :src="item.has_many_image[0].url"
                     alt="">
              </div>
              <div class="bottom">
                <div class="title">{{item.title}}</div>
                <div class="content">
                  <div class="headmessage">
                    <div class="left">
                      <img :src="item.has_one_stick_user.avatar"
                           alt="">
                    </div>
                    <div class="name">{{item.has_one_stick_user.nickname}}</div>
                  </div>
                  <div class="thumbup">
                    <div class="right">
                      <img src="../../assets/images/micro_communities/detail_praise@2x.png"
                           alt="">
                    </div>
                    <div class="num">{{item.praise_num}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul> -->
        </div>
      </div>
      <van-tabs v-if="homepageData.is_own==1"
                v-model="active"
                @change="getClassificationBtn"
                style="background:#f9f5f5;"
                sticky
                swipeable>
        <van-tab :title="'帖子('+homepageData.trick_num+')'">
          <div class="video_list">
            <c-flow :list='catelist_1'
                    v-if="active=='0'" :showLoading="showLoading_1"></c-flow>
            <!-- ==================================================== -->
            <!-- <ul v-if="false">
              <li v-for="(item,index) in catelist_1"
                  @click="jumpDetails(item.has_many_image[0].stick_id)">
                <div class="top">
                  <img :src="item.has_many_image[0].url"
                       alt="">
                </div>
                <div class="bottom">
                  <div class="title">{{item.title}}</div>
                  <div class="content">
                    <div class="headmessage">
                      <div class="left">
                        <img :src="item.has_one_stick_user.avatar"
                             alt="">
                      </div>
                      <div class="name">{{item.has_one_stick_user.nickname}}</div>
                    </div>
                    <div class="thumbup">
                      <div class="right">
                        <img src="../../assets/images/micro_communities/detail_praise@2x.png"
                             alt="">
                      </div>
                      <div class="num">{{item.praise_num}}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul> -->
          </div>
        </van-tab>
        <van-tab :title="'赞过('+homepageData.praise_num+')'">
          <div class="video_list">
            <c-flow :list='catelist_2'
                    v-if="active=='1'" :showLoading="showLoading_2"></c-flow>
            <!-- ==================================================== -->
            <!-- <ul v-if="false">
              <li v-for="(item,index) in catelist_2"
                  @click="gomicrocommentdetails(item.has_many_image[0].stick_id)">
                <div class="top">
                  <img :src="item.has_many_image[0].url"
                       alt="">
                </div>
                <div class="bottom">
                  <div class="title">{{item.title}}</div>
                  <div class="content">
                    <div class="headmessage">
                      <div class="left">
                        <img :src="item.has_one_stick_user.avatar"
                             alt="">
                      </div>
                      <div class="name">{{item.has_one_stick_user.nickname}}</div>
                    </div>
                    <div class="thumbup">
                      <div class="right">
                        <img src="../../assets/images/micro_communities/detail_praise@2x.png"
                             alt="">
                      </div>
                      <div class="num">{{item.praise_num}}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul> -->
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="mainCommentShow"
               position="bottom"
               :overlay="true">
      <div class="replyMainComment">
        <div class="left">
          <input type="text"
                 v-model="maincomment"
                 placeholder="请留下你的简介吧">
        </div>
        <div class="right"
             @click="subMainBtn">发送</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import microhomepage_controller from "./microhomepage_controller";
export default microhomepage_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#microhomepage {
  .header {
    padding-top: 0.94rem;
    padding-bottom: 0.63rem;
    .header_content {
      width: 21.94rem;
      height: 6.25rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
      padding-left: 0.63rem;
      padding-right: 0.66rem;
      display: flex;
      justify-content: space-between;
      padding-top: 1.25rem;
      .header_left {
        width: 3.75rem;
        height: 3.75rem;
        margin-right: 0.66rem;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .headet_right {
        flex: 1;
        .headet_right_top {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.66rem;
          .name {
            font-size: 1rem;
            height: 1.63rem;
            line-height: 1.63rem;
            color: #333333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 8rem;
            text-align: left;
          }
          .attention {
            width: 5rem;
            height: 1.63rem;
            background-color: #f15353;
            border-radius: 0.81rem;
            line-height: 1.63rem;
            font-size: 0.88rem;
            color: #fff;
          }
        }
        .headet_right_bottom {
          width: 100%;
          font-size: 0.88rem;
          line-height: 0.75rem;
          color: #999999;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }
        .bottom {
          display: flex;
          align-items: center;
          .b_left {
            color: #999999;
            font-size: 0.88rem;
          }
          .b_right {
            width: 0.9rem;
            height: 0.9rem;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
  .display_page {
    .page_nav {
      background: #fff;
      border-bottom: 0.06rem solid #e5e5e5;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 1.34rem;
        padding-right: 1.34rem;
        li {
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }
      }
    }
    .page_nav_content {
      .nav_label {
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-left: 0.75rem;
        padding-top: 0.63rem;
        padding-right: 0.75rem;
        li {
          background-color: #f9f9f9;
          border-radius: 0.75rem;
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 0.88rem;
          padding-left: 0.63rem;
          padding-right: 0.63rem;
          margin-bottom: 0.63rem;
          margin-right: 0.63rem;
        }
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
  }
  .replyMainComment {
    display: flex;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 1rem;
    .left {
      width: 18.13rem;
      height: 1.88rem;
      background-color: #f5f5f5;
      border-radius: 0.94rem;
      input {
        border: none;
        height: 100%;
        width: 100%;
        padding-left: 1rem;
      }
    }
    .right {
      width: 3rem;
      height: 1.88rem;
      font-size: 0.94rem;
      line-height: 1.88rem;
      color: #333333;
    }
  }
}
</style>
