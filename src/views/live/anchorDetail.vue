<!-- 主播个人中心页 -->
<template>
  <div id="anchorDetail">
    <c-title :hide="false" text="主播页面"></c-title>
    <div style="height: 40px"></div>
    <div class="member-head">
      <div class="left">
        <p class="name-box"><span class="name overflow">{{dataInfo.nickname}}</span><span class="fans">{{dataInfo.fan_count}}粉丝</span></p>
        <!-- <p class="describe">{{dataInfo.sign}}</p> -->
        <p class="describe"></p>
        <div class="focus" v-if="is_concern == 0" @click="addConcern">关注</div>
        <div class="unfocus" v-if="is_concern == 1" @click="cancelConcern">取消关注</div>
      </div>
      <div class="right">
        <img :src="dataInfo.avatar" alt="">
      </div>
    </div>

    <div class="live-list" v-if="!fun.isTextEmpty(roomList)">
      <div class="live-item" v-for="(item, index) in roomList" :key="index" @click="gotoLive(item.status,item.id)">
        <p class="title overflow"><span class="red">{{item.status==3?'正在直播':'预告'}}</span><span>{{item.title}}</span></p>
        <p class="gray" v-if="item.status==3"><span>{{item.view_num}}人观看</span> | <span>{{item.goods_num}}商品</span></p>
        <p class="red-word" v-if="item.status==2"><span style="flex: 1;"><yd-countdown :callback="timeEnd(index)" :time="item.live_time" timetype="timestamp"></yd-countdown></span><span class="button" @click.stop="addNotice(item.notice,item.id,index)">{{item.notice==1?'已订阅':'开播提醒'}}</span></p>
      </div>
      <!-- <div class="live-item">
        <p class="title overflow"><span class="purple">预告</span><span>肖战《陈情令》宣传广州发布会现场直播</span></p>
        <p class="red-word"><span style="flex: 1;">02天12时24分24秒</span><span class="button">开播提醒</span></p>
      </div> -->
    </div>

    <div class="see-back" v-if="dataInfo.is_back">
      <div class="back-head"><i class="iconfont icon-zb_zhiboicon"></i> <span>直播回放</span></div>
      <div class="living-box">
        <div class="living-item" v-for="(item, index) in backList" :key="index" @click="gotoBackPlay(item.id,item.room_id)">
          <div class="bg">
            <img style="width:100%;height:100%;" :src="item.cover" alt="">
          </div>
          <div class="top"><span class="left">{{item.view_num}}人观看 | {{item.goods_num}}商品</span><span class="time">{{item.time}}</span></div>
          <div class="bottom overflow">{{item.title}}</div>
        </div>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem auto;display: block;" v-if="fun.isTextEmpty(backList)">
        <!-- <div class="living-item">
          <img class="bg" src="https://dev4.yunzmall.com/attachment/images/9/2019/09/lpdUPyxD9uXyR2r39rY2Q3D06r2eDZ.jpg" alt="">
          <div class="top"><span class="left">25.4w人观看 | 12商品</span><span class="time">2020.02.03</span></div>
          <div class="bottom overflow">肖战《陈情令》宣传广州发布会现场发布会现</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import anchorDeatil_Controller from "./anchorDeatil_Controller";
export default anchorDeatil_Controller;
</script>
<style lang='scss' scoped>
  .member-head, .see-back, .live-list {
    background: #FFFFFF;
    text-align: left;
  }

  .member-head {
    display: flex;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    .left {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      .name-box, .describe {
        margin-bottom: 0.5rem;
        display: flex;
      }
      .describe {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        max-width: 9.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
      }
      .fans {
        color: #ff6e00;
        font-size: 12px;
        border-radius: 15px;
        border: solid 1px #ff6e00;
        padding: 0.2rem 0.5rem;
        margin-left: 0.5rem;
      }
      .describe {
        font-size: 12px;
        color: #666666;
      }
      .focus, .unfocus {
        width: 5.25rem;
        line-height: 1.5rem;
        color: #FFFFFF;
        background-color: #f60426;
        border-radius: 0.938rem;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
      }
      .unfocus {
        background-color: #666666;
      }
    }
    .right {
      img {
        width: 6.313rem;
        height: 6.313rem;
        border-radius: 50%;
      }
    }
  }

  .live-list {
    padding: 0.5rem 0.8rem 0 0.8rem;
  }
  .live-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eeeeee;
    .title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .red {
      border-radius: 15px;
      text-align: center;
      color: #FFFFFF;
      background-color: #f51534;
      font-size: 12px;
      padding: 0.15rem 0.4rem;
      margin-right: 0.5rem;
    }
    .purple {
      border-radius: 15px;
      text-align: center;
      color: #FFFFFF;
      background-color: #8415f5;
      font-size: 12px;
      padding: 0.15rem 0.4rem;
      margin-right: 0.5rem;
    }
    .gray{
      color: #999999;
      font-size: 12px;
    }
    .red-word {
      font-size: 12px;
      color: #f51534;
      display: flex;
      .button {
        flex: 0 0 4rem;
        border: 1px solid #f51534;
        border-radius: 15px;
        text-align: center;
      }
    }
  }

  .living-box {
    background: #FFFFFF;
    margin: 0 0.8rem;
    padding-bottom: 1rem;
  }
  .back-head {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    padding:0.5rem 0.8rem;
    span {
      display: inline-block;
      align-self: center;
    }
    i {
      color: #ff6e00;
      font-size: 30px;
    }
  }
  .living-item {
    position: relative;
    margin: 0 auto 0.5rem auto;
    .bg {
      width: 21.875rem;
      height: 10rem;
      border-radius: 0.313rem;
      background: #eeeeee;
    }
    .top {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: #FFFFFF;
      display: flex;
      width: 96%;
      .left {
        background-color: rgba(0, 0, 0, 0.4);
        padding: 0.15rem 0.4rem;
        border-radius: 0.625rem 0rem 0.625rem 0rem;
        font-size: 12px;
      }
      .time {
        flex: 1;
        text-align: right;
        line-height: 1.25rem;
        padding: 0.15rem 0.4rem;
      }
    }
    .bottom {
      width: 95%;
      position: absolute;
      bottom: 0.6rem;
      left: 0.5rem;
      font-weight: bold;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
</style>
