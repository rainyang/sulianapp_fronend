<template>
  <!-- 拼团-商品详情页面- 组件 -->
  <div id="group_good">
    <div class="content"
         :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
      <div id="navTab"
           :class="{ hoet: hoet }">
        <a class="nav1"
           :class="{ current: currentClass ==0 }"
           @click.stop="jump(0)">商品</a>
        <a class="nav1"
           :class="{ current: currentClass ==1 }"
           @click.stop="jump(1)">评价</a>
        <a class="nav1"
           :class="{ current: currentClass ==2 }"
           @click.stop="jump(2)">详情</a>
      </div>
      <div id="hoid"
           @click="goto"
           :class="{ hoet: hoet }">
        <div class="back">
          <i class="mintui mintui-back"></i>
        </div>
      </div>
      <div id="cart"
           @click="gotoHome"
           :class="{ hoet: hoet }">
        <div class="back">
          <i class="iconfont icon-ai-home"></i>
        </div>
      </div>
      <div id="member"
           @click="gotoMember"
           :class="{ hoet: hoet }">
        <div class="back">
          <!-- <i class="fa fa-user"></i> -->
          <i class="iconfont icon-wode-wode"></i>
        </div>
      </div>
      <div ref="onePage"
           id="onePage"
           style="overflow:hidden;">
        <div style="-webkit-overflow-scrolling: touch;"
             id="main">
          <viewer :images="goodsInfo.thumb_url"
                  style="background-color:#333;"
                  class="section">
            <c-myswipe :style="{height:(this.fun.getPhoneEnv() == 3?'375px':'100vw')}"
                       :pagination-visible="true"
                       :slides="goodsInfo.thumb_url"
                       :repeating="true"
                       :auto="0"
                       class="banner_pcStyle">
              <div v-if="!fun.isTextEmpty(goodsInfo.goods_video)">
                <video id="goods_vedio"
                       style="width:100%;height:100%;object-fit:scale-down"
                       :poster="goodsInfo.video_image"
                       :src="goodsInfo.goods_video"
                       controls
                       webkit-playsinline="true"
                       playsinline="true"
                       x5-playsinline="true"
                       x-webkit-airplay="true"
                       x5-video-ignore-metadata="true"
                       width="100%"
                       height="100%">
                  <source :src="goodsInfo.goods_video" />
                </video>
              </div>
              <div v-if="!goodsInfo.thumb_url || goodsInfo.thumb_url == null">
                <img :src="goodsInfo.thumb"
                     width="100%" />
              </div>
              <div v-for="(ithumb, index) in goodsInfo.thumb_url"
                   :key="index">
                <template v-if="ithumb">
                  <img :src="ithumb"
                       width="100%" />
                </template>
                <template v-if='!ithumb'>
                  <img src="../../assets/images/img_default.png"
                       width="100%">
                </template>
              </div>
            </c-myswipe>
          </viewer>
          <div class="price_time">
            <div class="img">
              <img src="../../assets/images/rob-time.png"
                   width="16%;" />
            </div>
            <span class="text">超值<br />开团</span>
            <span class="price">¥<font>{{goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:group_price}}</font>起</span>
            <div class="time"
                 v-if="!this.fun.isTextEmpty(gooddatas.end_time)">
              <span>截至倒计时：</span>
              <yd-countdown slot="right"
                            timetype="timestamp"
                            :time="gooddatas.end_time"
                            class="bottom_time"
                            :callback="timeEnd">
                <em style="padding:0.125rem;border-radius:0.125rem;">{%d1} <em>{%d2}</em> </em>天
                <em style="padding:0.125rem;border-radius:0.125rem;">{%h1}
                  <em>{%h2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.125rem;border-radius:0.125rem;">{%m1}
                  <em>{%m2}</em>
                </em>
                <b>:</b>
                <em style="padding:0.125rem;border-radius:0.125rem;">{%s1}
                  <em>{%s2}</em>
                </em>
              </yd-countdown>
            </div>
          </div>
          <div class="title_number">
            <div class="title_Main">
              <h1 style="-webkit-box-orient: vertical;">{{gooddatas.title}}</h1>
              <i class="iconfont icon-erweima"
                @click="postShow()"></i>
              <i class="iconfont icon-fenxiang"
                @click="shareWeixin()"></i>
            </div>
            <ul class="number">
              <li>
                <span>库存{{ gooddatas.stock }}</span>
                <span>销量{{ goodsInfo.show_sales }}件</span>
              </li>
            </ul>
          </div>
          <div class="group_play">
            <h2>拼团玩法</h2>
            <ul class="play">
              <li>
                <span>1</span>
                <span>选择商品付款开团/参团</span>
              </li>
              <li>
                <span>2</span>
                <span>邀请并等好友支付参团</span>
              </li>
              <li>
                <span>3</span>
                <span>达到人数顺利成团</span>
              </li>
            </ul>
          </div>
          <div class="group_into"
              v-if="!this.fun.isTextEmpty(gooddatas.display_team)">
            <h2>以下小伙伴拼团中，可直接参与</h2>
            <div class="more">
              <span @click="showGroupMore()">查看更多</span>
              <i class="fa fa-angle-right"></i>
            </div>
            <div class="into_user">
              <div class="user">
                <img :src="gooddatas.display_team.has_one_leader.avatar_image">
              </div>

              <ul class="time">
                <li class="time_a">{{gooddatas.display_team.has_one_leader.username}} 开{{gooddatas.display_team.has_one_level.member_num}}人团</li>
                <li class="time_b">剩余<span>
                    <yd-countdown :time="gooddatas.display_team.end_time"
                                  timetype="timestamp"
                                  :callback="hideIdexaa">
                    </yd-countdown>

                  </span>结束，仅差<span>{{gooddatas.display_team.has_one_level.member_num - gooddatas.display_team.has_many_success_member_count}}</span>人</li>
              </ul>
              <button type="button"
                      @click="clickAdd(gooddatas.display_team.is_team_leader,gooddatas.display_team.id)">{{gooddatas.display_team.is_team_leader == '0'?"加入该团":"邀请好友"}}</button>
            </div>
          </div>
          <div class="act-box">
            <ul class="act" @click="showParameter = true">
              <li class="act1" style="color:#999999;">参数</li>
              <li class="act2">商品参数详情</li>
              <li class="act3"><span></span></li>
              <i class="fa fa-angle-right"></i>
            </ul>
          </div>

          <c-comment class="section" :commentInfo='commentLimit' :tatal='commentLimit.length' :rate='favorable_rate' :goods_id='this.$route.params.id' :isCup="this.isCup" v-on:RouterTo="FromTo"></c-comment>
          <div class="pullUp" v-if="!showPageB"><img src="../../assets/images/goods/pull_up@2x.png" alt="" id="imgs" :class="[isPullUp?'rotateImg':'normalImg']"><i id="loadMore">{{isPullUp?'释放展开图文详情':'上拉展开图文详情'}}</i> </div>
          <span v-if="!showPageB" style="display: inline-block;width:100%;height: 1rem;"></span>
          <div
            id="shopInfo"
            ref="goodinfo"
            class="section isMarginBottom"
            :class="{ goodTop: goodTop == true}"
            v-if="showPageB"
          >
            <p style="" class="title-text">商品详情</p>
            <div id="tabs">
              <div ref="goodPage" id="goodPage">
                <div>
                    <div id="goods_content" v-html="first_content"></div>
                    <p v-if="fun.isTextEmpty(first_content)" style="color:#666666;">暂无该商品详情 ~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="group_btn">
        <ul class="item">
          <li class="item_a"
              @click="gotoHome()">
            <i class="iconfont icon-info_store"></i>
            <span>主页</span>
          </li>
          <template v-if="this.gooddatas.status == '1'">
            <li class="item_b"
                v-if="showOpeonBtn"
                @click="openGroup">
              <span>¥<font>{{goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:group_price}}</font>起</span>
              <span>一键开团</span>
            </li>
            <li class="item_c"
                @click="showGroupMore()">
              <span>¥<font>{{goodsInfo.vip_level_status&&goodsInfo.vip_level_status.status==1?goodsInfo.vip_level_status.word:group_price}}</font>起</span>
              <span>去参团</span>
            </li>
          </template>
          <template v-else-if="this.gooddatas.status != '1'">
            <li class="item_c endClass"
                style="display: flex;align-items: center;justify-content: center;">
              <h2 style="font-size:18px;">{{showStatusText}}</h2>
            </li>
          </template>
        </ul>
      </div>

      <yd-popup v-model="showParameter" position="bottom" height="60%">
        <yd-navbar
          title="商品参数"
          height="2.8125rem"
          fontsize="16px"
          color="#333"
          fixed
          class="pcStyle_ydT"
        >
          <span slot="right">
            <i
              class="iconfont icon-close11"
              style="color:#666;size:1.25rem;"
              @click="showParameter = false"
            ></i>
          </span>
        </yd-navbar>
        <div style="clear:both;margin-top:2.8125rem;" class="pcStyle_ydC">
          <ul class="parameterClass">
            <li v-for="(items,index) in goodsInfo.has_many_params" :key="index">
              <span class="leftb">{{items.title}}</span>
              <span class="rightb">{{items.value}}</span>
            </li>
            <p class="notext" v-if="fun.isTextEmpty(goodsInfo.has_many_params)">
              <br>抱歉，暂无该商品参数 ~
            </p>
          </ul>
        </div>
      </yd-popup>
      <yd-popup v-model="showComment" position="right" height="100%" width="100%">
        <yd-navbar title="全部评价" fixed>
          <span slot="left">
              <yd-navbar-back-icon @click.native="showComment =false"></yd-navbar-back-icon>
          </span>
        </yd-navbar>
      <!-- 商品评价 -->
        <c-commentlist v-on:clickMore="getCommentData" :list='third_content' :noMoreComment='noMoreComment' :isCup='isCup' v-if="showComment"></c-commentlist>
      </yd-popup>
      <!-- 商品分享二维码 -->
      <mt-popup v-model="posterShow"
                closeOnClickModal="true"
                style="width:17.8125rem;height:34.5rem;padding:0;background:none;">
        <div style="width:100%;height:100%;overflow:hidden;"
             class="code_box">
          <img :src="posterImg"
               v-if="posterImg"
               style="width:98%;border-radius:0.375rem;" />
          <!-- <img src="../../assets/images/img_default.png"
               v-if="!posterImg"
               style="width:95%;height:80%;border-radius:0.375rem;" /> -->
          <!-- 关闭图标 -->
          <div class="icon_close"
               @click="posterShow = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <!--  -->
        </div>
      </mt-popup>
      <!-- 一键开团 -->
      <mt-popup v-model="showOpenGroup"
                position="bottom"
                class="mint-popup-4"
                closeOnClickModal="true">
        <div class="one_open">
          <div class="img_price">
            <div class="goods">
              <img :src="goodsInfo.thumb">
            </div>
            <ul class="price">
              <li class="price_a">¥{{popPrice}}</li>
              <li class="price_b">库存：{{popStock}}件</li>
              <li class="price_b">{{ goodsDescription }}</li>
            </ul>
          </div>
          <div class="icon_close"
               @click="showOpenGroup = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <!-- 规格 -->
          <div class="shopinfo noVantRadio">
            <dl v-for="(specs,i) in goodsInfo.has_many_specs" :key="i">
              <dt>{{ specs.title }}</dt>
              <dd>
                <van-radio-group v-model="specs.description"
                                 checked-color="#f15353"
                                 @change="selectSpecs">
                  <van-radio :class="{ vantRadioshow: specs.description == specitem }"
                             :disabled="specitem.c"
                             v-for="(specitem,i) in specs.specitem"
                             :name="specitem" :key='i'>
                    {{ specitem.title }}
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
          </div>
          <!-- 拼团层级 -->
          <div class="select_box noVantRadio"
               v-if="!this.fun.isTextEmpty(gooddatas.has_many_level)">
            <van-radio-group v-model="groupModel"
                             checked-color="#f15353"
                             @change="selectGroup"
                             class="select">
              <van-radio :class="{ vantRadioshow: groupModel == item.id }"
                         v-for="(item,i) in gooddatas.has_many_level"
                         :name="item.id" :key='i'>
                <div style="padding: 0.25rem 0.8rem;">
                  <p>¥{{item.min_price}} 起</p>
                  <p>{{item.member_num}}人团</p>
                </div>
              </van-radio>
            </van-radio-group>
          </div>
          <div class="buy_number">
            <span>购买数量：</span>
            <div class="num">
              <div class="leftnav"
                   @click="reduceGoods">-</div>
              <input type="number"
                     class="shownum"
                     placeholder=""
                     v-model.lazy="goodsCount"
                     @blur="changeCount()" />
              <div class="rightnav"
                   @click="addGoods">+</div>
            </div>
          </div>
          <button type="button"
                  @click="openTeam()"
                  class="btn">确定</button>
        </div>
      </mt-popup>
      <yd-popup v-model="show2"
                position="center"
                :style="{width:(this.fun.getPhoneEnv() == 3?'375px':'88%')}">
        <div class="open_group">
          <p>以下小伙伴拼团中，可直接参与</p>
          <div class="icon_close"
               @click="show2 = false">
            <i class="iconfont icon-close11"></i>
          </div>
          <div class="setMaxH">
            <div class="into_user"
                 v-for="(item,index) in gooddatas.has_many_team"
                 :key="index">
              <div class="user">
                <img :src="item.has_one_leader.avatar_image">
              </div>
              <ul class="time">
                <li class="time_a">{{item.has_one_leader.username}} 开{{item.has_one_level.member_num}}人团</li>
                <li class="time_b">剩余<span>
                    <yd-countdown :time="item.end_time"
                                  timetype="timestamp"
                                  :callback="hideIdexbb"></yd-countdown>
                  </span>结束，仅差<span>{{item.has_one_level.member_num-item.has_many_success_member_count}}</span>人</li>
              </ul>
              <button @click="clickAdd(0,item.id)"
                      type="button">加入该团</button>
            </div>
          </div>
        </div>
      </yd-popup>
    </div>
  </div>
</template>

<script>
import group_good_controller from "./group_good_controller";

export default group_good_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// @import "../../assets/css/goods.scss";

#group_good {
  padding-bottom: 60px;
  #navTab {
    position: fixed;
    z-index: 999;
    width: 12rem;
    left: 50%;
    margin-left: -6rem;
    display: none;
    background: #fdfdfd;
    a {
      padding: 0 0.8rem;
      height: 2.25rem;
      line-height: 2.25rem;
    }
    .current {
      color: #1f1f1f;
      font-weight: bold;
      border-bottom: 0.1875rem transparent solid;
      border-width: 100%;
      border-color: #f15353;
    }
  }
  #navTab .current {
    color: #1f1f1f;
    font-weight: bold;
    border-bottom: 0.1875rem transparent solid;
    border-width: 100%;
    border-color: #f15353;
  }
  #navTab.hoet {
    display: flex;
    justify-content: space-around;
  }
  .act-box {
    height: 2.625rem;
    line-height: 2.625rem;
    font-size: 14px;
    background-color: #fff;
    margin-top: 0.625rem;
    padding: 0 0.75rem;
    color: #333;
    .act {
      display: flex;
    }
    .act1 {
      margin-right: 1.25rem;
    }
    .act3 {
      flex: 2.5;
      margin-left: 0.625rem;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      text-align: right;
      float: right;
      line-height: 2.75rem;
      font-size: 20px;
      color: #999999;
    }
  }
  .content {
    position: relative;
    #hoid {
      padding: 0.3125rem;
      width: 1.6rem;
      position: fixed;
      z-index: 2;
    }

    #cart {
      padding: 0.3125rem;
      width: 1.6rem;
      position: fixed;
      z-index: 2;
      box-sizing: content-box;
    }

    #member {
      padding: 0.3125rem;
      width: 1.6rem;
      position: fixed;
      z-index: 2;
      box-sizing: content-box;
    }

    #cart {
      right: 0;
    }

    #member {
      right: 2rem;
    }

    #hoid.hoet {
      background: #fdfdfd;
      width: 100%;
      color: #1f1f1f;
    }

    .back {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      text-indent: 0rem;
      line-height: 1.7rem;
      overflow: hidden;
    }

    .hoet .back {
      transition: 0.1s;
      background-color: rgba(237, 237, 237, 0);
      color: #1f1f1f;
    }
    .goods_img {
      width: 23.4375rem;
      height: 23.4375rem;
      background: #f2f2f2;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .price_time {
      width: 100%;
      height: 3.125rem;
      background: #f15353;
      position: absolute;
      top: 20.3125rem;
      display: flex;
      align-items: center;
      .img {
        width: 10%;
        img {
          width: 60%;
        }
      }
      .text {
        width: 10%;
        color: #fff;
        font-size: 14px;
      }
      .price {
        width: 40%;
        font-size: 14px;
        color: #fff;
        padding-left: 0.875rem;
        text-align: left;
        font {
          font-size: 22px;
        }
      }
      .time {
        width: 40%;
        span {
          color: #fff;
          font-size: 12px;
          display: inline-block;
          margin-bottom: 0.25rem;
        }
        em {
          background-color: #fff;
          color: #333;
        }
      }
    }
    .title_number {
      background: #fff;
      padding: 0.875rem;
      .title_Main {
        display: flex;
        h1 {
          flex: 3;
          font-size: 16px;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        i {
          font-size: 1.125rem;
          color: #666;
          margin-left: 1rem;
          line-height: 1.5rem;
        }
      }
      .number {
        margin-top: 0.5rem;
        li {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 12px;
            color: #8c8c8c;
          }
        }
      }
    }
    .group_play {
      margin-top: 0.625rem;
      background: #fff;
      padding: 0.875rem;
      h2 {
        font-weight: normal;
        font-size: 15px;
        margin-bottom: 0.625rem;
        text-align: left;
      }
      .play {
        background: #fafafa;
        display: flex;
        padding: 0.375rem;
        li {
          width: 33.3%;
          margin-right: 0.25rem;
          color: #8c8c8c;
          text-align: left;
          display: flex;
          align-items: center;
          span:first-child {
            display: inline-table;
            width: 1rem;
            height: 1rem;
            color: #fff;
            font-size: 12px;
            border-radius: 1rem;
            background: #8c8c8c;
            text-align: center;
            margin-right: 0.375rem;
          }
          span:last-child {
            width: 5.625rem;
          }
        }
        li:last-child {
          margin: 0;
        }
      }
    }
    .group_into {
      background: #fff;
      margin: 0.625rem 0;
      padding: 0.875rem;
      position: relative;
      h2 {
        font-weight: normal;
        font-size: 15px;
        margin-bottom: 0.625rem;
        text-align: left;
      }
      .more {
        position: absolute;
        top: 0.875rem;
        right: 0.875rem;
        display: flex;
        color: #8c8c8c;
        font-size: 12px;
        .fa {
          font-size: 1rem;
          margin-left: 0.375rem;
        }
      }
      .into_user {
        display: flex;
        align-items: center;
        .user {
          width: 2.25rem;
          height: 2.25rem;
          background: #f2f2f2;
          border-radius: 2rem;
          overflow: hidden;
          margin-right: 0.625rem;
          img {
            width: 100%;
          }
        }
        .time {
          width: 14.3125rem;
          text-align: left;
          .time_a {
            font-size: 14px;
          }
          .time_b {
            font-size: 12px;
            color: #8c8c8c;
            span {
              color: #f15353;
            }
          }
        }
        button {
          border: none;
          background: #f15353;
          color: #fff;
          width: 4.5rem;
          height: 1.625rem;
          border-radius: 0.25rem;
          font-size: 12px;
        }
      }
    }
    .group_detail {
      margin-top: 0.625rem;
      background: #fff;
    }
    .group_btn {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 3.125rem;
      background: #fff;
      border-top: solid 0.0625rem #ebebeb;
      .item {
        height: 3.125rem;
        display: flex;
        .item_a {
          width: 3.75rem;
          padding: 0.1875rem 0;
          .iconfont {
            color: #666;
            font-size: 1.5rem;
          }
          span {
            color: #666;
            font-size: 12px;
            display: block;
          }
        }
        .item_b {
          width: 9.8438rem;
          padding: 0.1875rem 0;
          background: rgba(241, 83, 83, 0.6);
          color: #fff;
          font-size: 14px;
          span {
            display: block;
          }
          font {
            font-size: 18px;
          }
        }
        .item_c {
          // width: 9.8438rem;
          padding: 0.1875rem 0;
          background: #f15353;
          color: #fff;
          font-size: 14px;
          flex: 1;
          span {
            display: block;
          }
          font {
            font-size: 18px;
          }
        }
        .endClass {
          background: #c9c9c9 !important;
        }
      }
    }
    .mint-popup-4 {
      width: 100%;
    }
    .one_open {
      padding-bottom: 3.75rem;
      .img_price {
        display: flex;
        padding: 0.875rem;
        .goods {
          width: 5.875rem;
          height: 5.875rem;
          background: #f2f2f2;
          border: solid 0.0625rem #ebebeb;
          overflow: hidden;
          border-radius: 0.1875rem;
          position: absolute;
          top: -1.875rem;
          img {
            width: 100%;
          }
        }
        .price {
          margin-left: 6.875rem;
          text-align: left;
          .price_a {
            color: #f15353;
            font-size: 18px;
          }
          .price_b {
            color: #8c8c8c;
            font-size: 12px;
          }
        }
      }
      .icon_close {
        position: absolute;
        top: 0.25rem;
        right: 0;
        width: 2.5rem;
        height: 2.5rem;

        .iconfont {
          line-height: 2.5rem;
          font-size: 1.125rem;
          color: #999;
        }
      }
      .select_box {
        padding: 0.875rem 0.875rem 0 0.875rem;
        .select {
          border-top: solid 0.0625rem #ebebeb;
          display: flex;
          flex-wrap: wrap;
          padding: 0.875rem 0;
          li {
            width: 6.75rem;
            padding: 0.625rem 0;
            border: solid 0.0625rem #ebebeb;
            border-radius: 0.25rem;
            margin-right: 0.625rem;
            margin-bottom: 0.625rem;
            span {
              display: block;
              font-size: 14px;
              font {
                font-size: 18px;
              }
            }
          }
          li:nth-child(3n) {
            margin-right: 0;
          }
          .current {
            border: solid 0.0625rem #f15353;
            color: #f15353;
          }
        }
        .van-radio-group {
          display: flex;
          flex-wrap: wrap;
          .van-radio {
            margin-right: 0.3125rem;
            margin-bottom: 0.3125rem;
            background: #fff;
            border: 1px solid #bfcbd9;
            text-align: center;
            box-sizing: border-box;
            border-radius: 0.25rem;
          }
          .vantRadioshow {
            background-color: rgb(241, 83, 83);
            border-color: rgb(241, 83, 83);
            box-shadow: rgb(241, 83, 83) -1px 0px 0px 0px;
          }
        }
      }
      .noVantRadio {
        padding: 0 1.25rem;
        .van-radio-group {
          .van-radio__label {
            padding: 2rem !important;
          }
        }
        dl {
          margin-bottom: 0.8rem;
          text-align: left;
          dt {
            margin-bottom: 0.5rem;
          }
          .van-radio-group {
            display: flex;
            flex-wrap: wrap;
            .van-radio {
              margin-right: 0.3125rem;
              margin-bottom: 0.3125rem;
              background: #fff;
              border: 1px solid #bfcbd9;
              text-align: center;
              box-sizing: border-box;
              border-radius: 0.25rem;
            }
            .vantRadioshow {
              background-color: rgb(241, 83, 83);
              border-color: rgb(241, 83, 83);
              box-shadow: rgb(241, 83, 83) -1px 0px 0px 0px;
            }
          }
        }
      }

      .buy_number {
        margin: 0 0.875rem;
        height: 3.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: solid 0.0625rem #ebebeb;
        border-bottom: solid 0.0625rem #ebebeb;
        .num {
          border-radius: 0.1875rem;
          float: right;
          background-color: #fff;
          .leftnav {
            height: 1.75rem;
            width: 1.75rem;
            float: left;
            background-color: #f2f2f2;
            color: #999;
            text-align: center;
            border-radius: 0.1875rem;
            line-height: 1.75rem;
            font-size: 18px;
            font-weight: bold;
          }
          .shownum {
            height: 1.75rem;
            width: 2.25rem;
            float: left;
            border: 0rem;
            margin: 0rem;
            padding: 0rem;
            text-align: center;
            color: #333;
          }
          .rightnav {
            height: 1.75rem;
            width: 1.75rem;
            float: right;
            background-color: #f2f2f2;
            color: #999;
            text-align: center;
            border-radius: 0.1875rem;
            line-height: 1.75rem;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
      .btn {
        background: #f15353;
        height: 3.125rem;
        width: 100%;
        color: #fff;
        font-size: 16px;
        position: fixed;
        bottom: 0;
        left: 0;
        border: none;
      }
    }
    .open_group {
      background: #fff;
      padding: 0.625rem;
      border-radius: 0.5rem;
      p {
        font-size: 14px;
        margin-bottom: 0.625rem;
      }
      .icon_close {
        position: absolute;
        top: 0.25rem;
        right: 0;
        width: 2.5rem;
        height: 2.5rem;

        .iconfont {
          line-height: 2.5rem;
          font-size: 0.875rem;
          color: #999;
        }
      }
      .setMaxH {
        max-height: 12rem;
        overflow: scroll;
        .into_user {
          display: flex;
          align-items: center;
          border-bottom: solid 0.0625rem #ebebeb;
          padding: 0.625rem 0;
          .user {
            width: 2.25rem;
            height: 2.25rem;
            background: #f2f2f2;
            border-radius: 2rem;
            overflow: hidden;
            margin-right: 0.625rem;
            img {
              width: 100%;
            }
          }
          .time {
            width: 11.5rem;
            text-align: left;
            .time_a {
              font-size: 14px;
            }
            .time_b {
              font-size: 12px;
              color: #8c8c8c;
              span {
                color: #f15353;
              }
            }
          }
          button {
            border: none;
            background: #f15353;
            color: #fff;
            width: 4.5rem;
            height: 1.625rem;
            border-radius: 0.25rem;
            font-size: 12px;
          }
        }
      }
    }
    .icon_close {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    .parameterClass {
      li {
        width: 100%;
        display: flex;
        text-align: left;
        padding: 0.75rem 0.75rem;
        position: relative;
        .leftb {
          flex: 0 0 20%;
          margin-right: 1.25rem;
          font-size: 12px;
          color: #000000;
        }
        .rightb {
          flex: 1;
          font-size: 14px;
          color: #5d5d5d;
        }
      }
      .notext {
        color: #fd8900;
        line-height: 1.8rem;
      }
      li:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -11rem;
        width: 22rem;
        height: 1px;
        background: #e4e4e4;
      }
    }
    .isMarginBottom {
      margin-top: 0.625rem;
      .title-text {
        display: block;
        position: relative;
        color: #999999;
        text-align: center;
        font-weight: 400;
        padding: 0.875rem 5rem;
        background: #fff;
      }
      .title-text:before,
      .title-text:after {
        content: "";
        position: absolute; /*定位背景横线的位置*/
        top: 50%;
        background: #ccced0; /*背景横线颜色*/
        width: 20%; /*单侧横线的长度*/
        height: 1px;
      }
      .title-text:before {
        left: 15%; /*调整背景横线的左右距离*/
      }
      .title-text:after {
        right: 15%;
      }
    }
    .pullUp {
      display: flex;
      height: 3.125rem;
      line-height: 3.125rem;
      justify-content: center;
      align-items: center;
      color: #666;
      background: #fff;
      margin: 0.75rem 0 0rem;
      img {
        width: 1rem;
        height: 1rem !important;
        margin: 0 0.5rem 0 0;
      }
      .rotateImg {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transition: transform 0.5s;
      }
      .normalImg {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: transform 0.5s;
      }
    }
  }
  .code_box {
    position: relative;
    .icon_close {
      position: absolute;
      bottom: 0px;
      top: auto;
      right: 50%;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: -1.25rem;
      border: 1px solid #fff;
      border-radius: 100%;
      i {
        line-height: 2.5rem;
        font-size: 1.125rem;
        color: #fff;
      }
    }
  }
  .pcStyle {
    #hoid {
      width: 375px !important;
    }
    #cart {
      right: 50%;
      margin-right: -186px;
    }
    #member {
      right: 50%;
      margin-right: -150px;
    }
    .banner_pcStyle {
      height: 375px !important;
    }
    .mint-popup-4 {
      width: 375px;
    }
    .group_btn {
      width: 375px;
    }
  }
}
</style>
