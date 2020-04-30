<template>
  <div id="course"
       v-show="showGood"
       :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
    <c-title :hide="false"
             text="课程详情"></c-title>
    <div :class="[actionSheetShow || rewardMoneyBtn || rewardShow?'noScroll':'']">
      <div class="spare"></div>
      <div class="course-div">
        <div class="box01"
             v-if="is_show">
          <ul class="title"
              style="padding-top:1.25rem;">
            <li style="margin-bottom:0.625rem;">{{ goodTit }}</li>
            <li>售价¥ {{ vip_level_status&&vip_level_status.status==1?vip_level_status.word:goodPrice }}</li>
          </ul>
          <div class="watch"
               @click="study()"
               v-if="isLook">
            <span style="line-height:1.875rem;color:white;">立即观看</span>
          </div>
          <div class="watch"
               @click="buy()"
               v-if="!isLook">
            <span style="line-height:1.875rem;color:white;">立即购买</span>
          </div>
        </div>
        <div class="box-con set-pc-style"
             v-if="is_vshow" style="width:100%;">
          <iframe :src="vedioSrc"
                  frameborder="0"
                  allowfullscreen
                  height="200"
                  width="100%"
                  v-if="!isVideo"
                  style="width:100%;height:12.5rem"
          >
          </iframe>
          <div v-if="isVideo"
               style="position: relative;width:100%;height:12.5rem">
            <!-- <video
              preload="true"
              controlslist="nodownload"
              width="100%"
              height="100%"
              controls
              ref="video"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-ignore-metadata="true"
              x5-video-orientation="landscape"
            >
              <source :src="vedioSrc" />
            </video> -->
            <video preload="true"
                   controlslist="nodownload"
                   style="width: 100%; height: 100%; object-fit: fill;"
                   width="100%"
                   height="100%"
                   controls
                   ref="video"
                   webkit-playsinline="true"
                   playsinline="true"
                   x5-playsinline="true"
                   x-webkit-airplay="true"
                   x5-video-ignore-metadata="true"
                   :poster="video_image"
                   :src="vedioSrc">
              <source :src="vedioSrc"/>
            </video>
            <div style="position: absolute; left: 41.5%; top: 50%;height:4rem;width:4rem;margin-top:-2rem;"
                 v-if="isVideoOn">
              <img src="../../assets/images/play-btn.png"
                   style="height:100%;width:100%;"
                   @click="videoClick"/>
            </div>
          </div>
        </div>
        <div id="zhibo" v-if="is_zhibo" style="width:100%;;height:12.5rem;width:100%;;height:12.5rem;">
          <div id="player" style="width:100%;;height:12.5rem;" v-if="is_zhibo"></div>
        </div> 
        <div class="course_details" :class="is_vshow ? 'course-title-mar course-title' : 'course-title'">
          <div class="course_details_top">
            <div class="lecturer">
              <div class="lecturer_left">
                <img :src="teacherImg" alt="">
              </div>
              <div class="lecturer_right">讲师:{{ teacherName }}</div>
            </div>
            <div class="reward" @click="moneyShow" v-if="rewardBtnShow"><i class="iconfont icon-kc_gift"></i> 打赏</div>
          </div>
          <div class="course_details_bottom">
            <div class="course_details_name"> 课程名称：{{ goodTit }}</div>
            <div class="course_details_message">
              <div class="pitch_number">共{{chapterNum}}节</div>
              <div class="price">￥{{goodPrice}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--    <div class="course-title">-->
      <!--      <h1>-->
      <!--        课程名称：<span>{{ goodTit }}</span>-->
      <!--      </h1>-->
      <!--    </div>-->
      <!-- <div class="box02">
              <div style="font-size:15px;line-height:2.25rem;margin-left:0.75rem;margin-right:0.75rem;">
                  <span style="text-align:left;font-weight:bold;">目录摘要</span><span style="margin-left:0.25rem;">共{{chapterNum}}节</span>
              </div>
              <div style="width:calc(100% - 0.75rem);height:0.0625rem;background-color:#ebebeb;margin-left:0.75rem;"></div>
              <ul style="margin-left:0.75rem;margin-right:0.75rem;font-size:14px;padding-top:0.625rem;padding-bottom:0.625rem;">
                  <li style="line-height:2.25rem;" v-for="(item,index) in chapterList" @click="viewPermission(item.id,index,item.video_address,item.course_id,item.is_audition)">
                      <yd-icon slot="icon" class="icon-bofang" custom size="1.25rem" :class='{iconBofang:index==active}'></yd-icon>
                      <span :class="{iconword:index==active}">第{{index+1}}节&nbsp;&nbsp;{{item.chapter_name}}</span><span slot="right" style="color:green" v-if="item.is_audition==0?false:true">【免费试听】</span>
                  </li>
              </ul>
          </div> -->
      <!--    <div class="box03">-->
      <!--      <div class="left">-->
      <!--        <div class="touxiang">-->
      <!--          <img :src="teacherImg"-->
      <!--               style="width:100%;height:100%;border-radius:1.5rem;" />-->
      <!--        </div>-->
      <!--        <ul style="float:left;">-->
      <!--          <li style="font-size:15px;margin-bottom:0.5rem;color:#f15353;">-->
      <!--            主讲-->
      <!--          </li>-->
      <!--          <li>{{ teacherName }}</li>-->
      <!--        </ul>-->
      <!--      </div>-->
      <!--      <div class="anniu">-->
      <!--        <div @click="moneyShow"-->
      <!--             v-if="rewardBtnShow">-->
      <!--          <yd-button class="button">-->
      <!--            <span class="dashang">打赏</span></yd-button>-->
      <!--          &lt;!&ndash; <yd-icon-->
      <!--            slot="icon"-->
      <!--            class="icon-giftfill"-->
      <!--            color="#ffcd00"-->
      <!--            custom-->
      <!--            size="1.25rem"-->
      <!--            style="position:relative;left:-3.4375rem;top:0.125rem;"-->
      <!--          ></yd-icon> &ndash;&gt;-->
      <!--          <yd-icon slot="icon"-->
      <!--                   class="icon-giftfill"-->
      <!--                   color="#ffcd00"-->
      <!--                   custom-->
      <!--                   size="1.25rem"-->
      <!--                   style="position:relative;left: -3.3rem;top: 0.18rem;vertical-align: center"></yd-icon>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="clearfix"></div>-->
      <!--    </div>-->
      <!-- // -->
      <div class="zhibo_title" v-if="live&&live_title">
        <div style="flex:1;">{{live_title}}</div>
        <div class="btn" @click="addzhibo">进入直播</div>
      </div> 
      <div id="tabs">
        <mt-navbar v-model="tabActive">
          <mt-tab-item id="second">课程简介</mt-tab-item>
          <mt-tab-item id="first">课程目录</mt-tab-item>
        </mt-navbar>
        <!--<el-tabs v-model="tabActive">-->
        <mt-tab-container v-model="tabActive">
          <mt-tab-container-item id="first">
            <div class="course_catalogue">
              <div class="course_catalogue_message">
                <h3><i class="iconfont icon-kc_mulu"></i>目录</h3>
                <yd-accordion accordion>
                  <yd-accordion-item v-for="(digListitem, digListindex) in chapterdigList"
                                     :title="digListitem.chapter_name"
                                     :key='digListindex'
                                     open>
                    <ul class="course_catalogue_list">
                      <li
                        v-for="(item, index) in digListitem.has_many_chapter"
                        :key='index'
                        @click="
                              viewPermission(
                                item.id,
                                index,
                                item.course_id,
                                item.is_audition,
                                digListindex
                              )
                             ">
                        <span
                          :class="{ iconword: (digListindex == first_active&&index == active) }">第{{ index + 1 }}节</span>
                        <yd-icon slot="icon"
                                 class="icon-kc_play"
                                 custom
                                 size="1.25rem"
                                 :class="{ iconBofang: (digListindex == first_active&&index == active) }"></yd-icon>
                        <span :class="{ iconBofang: (digListindex == first_active&&index == active) }" style="line-height: 1.1rem;white-space:pre-wrap;" :style="(item.is_audition == 0)?'width: 15rem;':'width: 9.8rem;'">{{item.chapter_name}}</span>
                        <span slot="right" style="color:green" v-if="item.is_audition == 0 ? false : true">【免费试听】
                        </span>
                      </li>
                    </ul>
                  </yd-accordion-item>
                </yd-accordion>
              </div>
            </div>
            <!--<el-tab-pane label="目录" name="first">-->
            <!--          <div class="box02">-->
            <!--            &lt;!&ndash; <div style="font-size:15px;line-height:2.25rem;margin-left:0.75rem;margin-right:0.75rem;">-->
            <!--                            <span style="text-align:left;font-weight:bold;">目录摘要</span><span style="margin-left:0.25rem;">共{{chapterNum}}节</span>-->
            <!--                        </div> &ndash;&gt;-->
            <!--            <div style="width:calc(100% - 0.75rem);height:0.0625rem;background-color:#ebebeb;margin-left:0.75rem;"></div>-->
            <!--            <yd-accordion accordion>-->
            <!--              <yd-accordion-item v-for="(digListitem, digListindex) in chapterdigList"-->
            <!--                                 :key="digListindex"-->
            <!--                                 :title="digListitem.chapter_name"-->
            <!--                                 open>-->
            <!--                <ul style="margin-left:0.75rem;margin-right:0.75rem;font-size:14px;padding-top:0.625rem;padding-bottom:0.625rem;">-->
            <!--                  <li style="line-height:2.25rem;"-->
            <!--                      v-for="(item, index) in digListitem.has_many_chapter"-->
            <!--                      :key="index"-->
            <!--                      @click="-->
            <!--                      viewPermission(-->
            <!--                        item.id,-->
            <!--                        index,-->
            <!--                        item.course_id,-->
            <!--                        item.is_audition-->
            <!--                      )-->
            <!--                    ">-->
            <!--                    <yd-icon slot="icon"-->
            <!--                             class="icon-bofang"-->
            <!--                             custom-->
            <!--                             size="1.25rem"-->
            <!--                             :class="{ iconBofang: index == active }"></yd-icon>-->
            <!--                    <span :class="{ iconword: index == active }">第{{ index + 1 }}节&nbsp;&nbsp;{{ item.chapter_name }}</span><span slot="right"-->
            <!--                          style="color:green"-->
            <!--                          v-if="item.is_audition == 0 ? false : true">【免费试听】</span>-->
            <!--                  </li>-->
            <!--                </ul>-->
            <!--              </yd-accordion-item>-->
            <!--            </yd-accordion>-->
            <!--          </div>-->
            <!--</el-tab-pane>-->
          </mt-tab-container-item>
          <mt-tab-container-item id="second">
            <!--<el-tab-pane label="课程介绍" name="second">-->
            <!--          <div class="box04"-->
            <!--               v-if="contentShow">-->
            <!--            &lt;!&ndash; <div class="jieshao">课程介绍</div> &ndash;&gt;-->
            <!--            <div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>-->
            <!--            <p style="margin-right:0.75rem;margin-top:0.625rem;"-->
            <!--               v-html="goodsContent"></p>-->
            <!--          </div>-->
            <!--</el-tab-pane>-->
            <div class="course_introduction">
              <h3><i class="iconfont icon-kc_detail"></i> 课程介绍</h3>
              <p style="margin-right:0.75rem;margin-top:0.625rem;" v-html="goodsContent"></p>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <!--</el-tabs>-->
      </div>
      <!-- // -->
      <!-- <div class="box04" v-if="contentShow">
              <div class="jieshao">课程介绍</div>
              <div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>
              <p style="margin-right:0.75rem;margin-top:0.625rem;" v-html="goodsContent">
              </p>
          </div> -->
      <div v-if="pushShow"
           style="margin-bottom:3.125rem;background:#fff;">
        <div class="box06">
          <div class="like">猜你喜欢</div>
          <div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>
        </div>
        <!-- <div class="like-box">
                          <div style="float:left;text-align:center;width:20%;margin-left:2.5%;margin-right:2.5%;margin-top:10px;" v-for="item in pushGoodList" @click="pushGoodGoto(item)">
                              <div style="width:100%;height:68px;">
                                  <img :src="item.thumb" style="width:100%;height:100%;">
                              </div>
                              <div style="width:100%;"><span style="margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;height:20px;display:block;">{{item.title}}</span></div>
                              <span style="color:#f15353;margin-top:6px;">￥{{item.price}}</span>

                          </div>
                      </div> -->
        <div class="like-box"
             v-for="(item,i) in pushGoodList"
             @click="pushGoodGoto(item)"
             :key='i'>
          <div style="margin-left:2.5%;margin-right:2.5%;margin-top:0.625rem;display:flex;">
            <div style="height:4.25rem;flex:1.1">
              <img :src="item.thumb"
                   style="width:100%;height:100%;"/>
            </div>
            <div style="flex:5;margin-left:0.3125rem;">
              <div style="width:100%;float:left">
                <span style="margin-top:0.375rem;width:100%;display:block;word-wrap:break-word;overflow:hidden;">{{ item.title }}</span>
              </div>
              <span style="color:#f15353;margin-top:1.6875rem;float:right;">
              ￥
              <span v-if="item.vip_level_status&&item.vip_level_status.status==1"
                    style="color:#fff;background:#f15353; padding: .2rem .5rem; border-top-left-radius: 0.5rem;border-bottom-right-radius: 0.5rem;">
                {{ item.vip_level_status.word }}
              </span>
              <span v-else>
                {{ item.price }}
              </span>
            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="box05">
        <!-- <div style="flex:1;width:100%;" v-if="is_study">
                          <yd-button type="primary" style="width:100%;height:44px;padding:0px;" @click.native="study">立即学习</yd-button>
                      </div> -->
        <div class="my"
             @click="toMyCourse">
          <yd-icon class="iconfont icon-gerenzhongxin"
                   custom
                   size="1.125rem"
                   color="#f7ba2a"
                   style="display:block;margin:0.3125rem 0;"></yd-icon>
          我的
        </div>
        <div class="kefu"
             v-if="cservice">
          <a :href="cservice">
            <yd-icon class="iconfont icon-kefu"
                     custom
                     size="1.125rem"
                     color="#b7b7b7"
                     style="display:block;margin:0.3125rem 0;"></yd-icon>
            客服
          </a>
        </div>
        <div style="flex:3;"
             v-if="is_update"
             class="update"
             @click="update">
          <button type="danger"
                  style="width:100%;">升级会员
          </button>
        </div>
        <div style="flex:3;"
             v-if="is_buy"
             class="buy"
             @click="buy">
          <button type="warning"
                  style="width:100%;">单次购买
          </button>
        </div>
      </div>
    </div>
    <yd-popup v-model="rewardShow"
              position="bottom"
              height="11rem">
      <yd-cell-group title="打赏金额"
                     style="padding-top:0.3125rem;background-color:#f5f5f5;">
        <yd-cell-item>
          <span slot="left">¥&nbsp;</span>
          <input slot="right" v-model="rewardMoney" @blur="clearSrcoll()" type="number" placeholder="请输入打赏金额" />
          <!--<yd-input slot="right"-->
                    <!--v-model="rewardMoney"-->
                    <!--required-->
                    <!--@blur="clearSrcoll()"-->
                    <!--:show-success-icon="false"-->
                    <!--:show-error-icon="false"-->
                    <!--type="number"-->
                    <!--placeholder="请输入打赏金额"></yd-input>-->
        </yd-cell-item>
      </yd-cell-group>
      <yd-button-group>
        <yd-button type="primary"
                   size="large"
                   style="height:2.75rem;"
                   @click.native="confirmReward">确定打赏
        </yd-button>
      </yd-button-group>
    </yd-popup>

    <!-- // -->
    <yd-popup v-model="rewardMoneyBtn"
              position="bottom"
              height="11rem">
      <yd-cell-group title="打赏金额"
                     style="padding-top:0.3125rem;background-color:#f5f5f5;">
        <div style="margin:0.625rem 0.625rem 0.75rem 0.625rem;">
          <span
            style="display:block;float:left;width: 4rem;height: 2.25rem;border:0.0625rem solid #ff3824;border-radius:0.375rem;margin:0.625rem;line-height:2.25rem;"
            v-for="(item, index) in rewardArr"
            :key="index"
            :class="{ moneyActive: index == moneyActiveClass }"
            @click="chooseMoney(item.value, index)">{{ item.name }}</span>
        </div>
      </yd-cell-group>

      <yd-button-group>
        <yd-button type="primary"
                   size="large"
                   style="height:2.75rem;"
                   @click.native="confirmReward">确定打赏
        </yd-button>
      </yd-button-group>
    </yd-popup>

    <yd-actionsheet :items="actionSheetItems"
                    v-model="actionSheetShow"
                    class="actionsheet"
                    cancel="取消"
                    size="large"></yd-actionsheet>
  </div>
</template>

<script>
  import course_controller from "./course_controller";

  export default course_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #course {
    padding-bottom: 3.125rem;
  }
  .noScroll {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    right:0;
    left:0;
    overflow: hidden;
  }

  .icon-bofang {
    color: #ccc;
  }

  .spare {
    width: 100%;
    height: 2.5rem;
  }

  .course_catalogue_list {
    li {
      font-size: 0.877rem;
      .iconBofang {
        position: relative;
        top: 0.0625rem;
        color: #ff9600;
      }
      .iconword {
        color: #ff9600;
      }
      display: flex;
      align-items: center;
      /*margin-left: 1.094rem;*/
      margin-right: 1.094rem;
      min-height: 3.031rem;
      /*line-height: 3.031rem;*/
      text-align: left;
      border-bottom: 1px solid #f9f9f9;
      color: #333333;
      .icon-kc_play {
        margin-left: 0.906rem;
        margin-right: 0.656rem;
      }
    }
  }

  .box01 {
    width: 100%;
    height: 12.5rem;
    background-color: green;
    padding-top: 1rem;
  }

  .course-title-mar {
    margin-top: 12.5rem;
  }

  .course-div {
    background: #fff;
    .box-con {
      position: fixed;
      top: 40px;
      z-index: 1000;
      // width: 100%;
    }
    width: 100%;
    z-index: 100;
  }

  .course_details {
    position: relative;
    .course_details_top {
      /*position: absolute;
      z-index: 1000;
      left:50%;
      margin-left:-10.9375rem;*/
      width: 21.875rem;
      height: 2.813rem;
      background-color: #ffffff;
      box-shadow: 0rem 0rem 0.219rem 0rem rgba(133, 133, 133, 0.2);
      border-radius: 0.313rem;
      display: flex;
      justify-content: space-between;
      /*margin-top: -1.4155rem;*/
      .lecturer {
        padding-left: 0.656rem;
        padding-top: 0.469rem;
        display: flex;
        .lecturer_left {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .lecturer_right {
          margin-left: 0.438rem;
          height: 1.75rem;
          line-height: 1.75rem;
          width: 10rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
      }
      .reward {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.625rem;
        width: 3.75rem;
        height: 1.563rem;
        border-radius: 0.781rem;
        border: solid 0.063rem #ff9d27;
        margin-right: 0.75rem;
        line-height: 1.563rem;
        color: #ff9d27;
        font-size: 0.75rem;
      }
    }
    .course_details_bottom {
      /*padding-top:2.306rem;*/
      padding-top: 1rem;
      .course_details_name {
        width: 100%;
        text-align: left;
        font-size: 0.875rem;
        height: 2.5rem;
        line-height: 1.25rem;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-left: 1.094rem;
        padding-right: 1.094rem;
        margin-bottom: 1.938rem;
      }
      .course_details_message {
        display: flex;
        justify-content: space-between;
        padding-left: 1.094rem;
        padding-right: 1.094rem;
        padding-bottom: 0.781rem;
        .pitch_number {
          width: 6rem;
          font-size: 0.875rem;
          line-height: 1.125rem;
          height: 1.125rem;
          color: #999999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          width: 6rem;
          font-size: 0.875rem;
          line-height: 1.125rem;
          height: 1.125rem;
          color: #e20606;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align:right;
        }
      }
    }
  }

  #course .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0.1875rem solid #ff9d27;
    color: #ff9d27;
    margin-bottom: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 0.3125rem;
  }

  .course_introduction {
    min-height: 10rem;
    background: #fff;
    padding-top: 1.313rem;
    padding-left: 1.094rem;
    h3 {
      line-height: 1rem;
      height: 1rem;
      text-align: left;
      font-size: 1rem;
      i {
        padding-right: 0.719rem;
        color: #ad65ff;
      }
    }
  }

  .course-title {
    line-height: 2.5rem;
    background-color: #fff;
    padding-top: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    text-align: left;
    color: #333;
    
    h1 {
      text-overflow: ellipsis;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      font-weight: normal;
      color: #8c8c8c;
    }
  }

  .box02 {
    background-color: white;
    text-align: left;
  }

  .title {
    color: white;
  }

  .watch {
    width: 13.125rem;
    height: 1.875rem;
    background-color: orange;
    margin: 0 auto;
    border-radius: 0.25rem;
    margin-top: 1.25rem;
  }

  .box03 {
    width: 100%;
    background-color: white;
    padding: 1.5rem 0.75rem 1.5rem 0.75rem;
    margin-top: 0.625rem;
  }

  .left {
    float: left;
  }

  .touxiang {
    width: 3rem;
    height: 3rem;
    background-color: #333;
    border-radius: 1.5rem;
    float: left;
    margin-right: 0.625rem;
  }

  .clearfix {
    clear: both;
  }

  .anniu {
    float: right;
  }

  .button {
    width: 4rem;
    height: 2.25rem;
    background-color: #ff3824;
    border-radius: 0.375rem;
    margin-top: 0.375rem;
    margin-right: -1.25rem;
  }

  .dashang {
    margin-left: 1.875rem;
  }

  .course_catalogue {
    background: #fff;
    .course_catalogue_message {
      padding-left: 1.063rem;
      padding-top: 1.313rem;
      h3 {
        text-align: left;
        i {
          margin-right: 0.831rem;
          color: #ff6000;
        }
      }
    }
  }

  .box04 {
    width: 100%;
    background-color: white;
    margin-top: 0.5rem;
    padding-bottom: 1.875rem;
    padding-left: 0.75rem;
    text-align: left;
  }

  .box05 {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    .my {
      height: 3.0625rem;
      flex: 2;
      background-color: #fff;
      font-size: 12px;
      color: #333;
      span {
        width: 100%;
        display: inline-block;
      }
    }
    .kefu {
      height: 3.0625rem;
      flex: 2;
      background-color: #fff;
      font-size: 12px;
      color: #333;
      span {
        display: inline-block;
        width: 100%;
      }
    }
    .update {
      height: 3.0625rem;
      line-height: 3.0625rem;
      background-color: #ff9500;
      font-size: 15px;
      button {
        border: none;
        color: #fff;
      }
    }
    .buy {
      height: 3.0625rem;
      line-height: 3.0625rem;
      font-size: 15px;
      background-color: #dd2727;
      button {
        border: none;
        color: #fff;
      }
    }
  }

  .like {
    line-height: 2.25rem;
    font-size: 15px;
    text-align: left;
    margin-left: 5%;
  }

  .jieshao {
    line-height: 2.25rem;
    font-size: 15px;
    text-align: left;
  }

  .box06 {
    width: 100%;
    background-color: white;
    margin-top: 0.5rem;
  }

  .like-box {
    width: 100%;
    height: 4.6875rem;
    background-color: white;
    text-align: left;
    margin-bottom: 0.625rem;
  }

  .iconBofang {
    position: relative;
    top: 0.0625rem;
    color: #ff9600;
  }

  .iconword {
    color: #ff9600;
  }

  .moneyActive {
    background-color: #ff3824;
  }

  .pcStyle .box05 {
    width: 375px;
  }
  .zhibo_title{
  width:100%;
  padding:0.5rem 1rem;
  background-color: #f2f2f7;
  text-align: left;
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  .btn{
    width: 4.375rem;
    height: 1.5rem;
    background-color: #ff9719;
    border-radius: 0.75rem;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    box-sizing:border-box;
  }
}
</style>
