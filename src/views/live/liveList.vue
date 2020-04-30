<!-- 直播列表页 -->
<template>
  <div id="liveList">
    <div class="search_box">
      <ul class="search">
        <li class="left">
          <i  style="padding-right: 0.5rem" class="iconfont icon-back" @click.stop="gotoMember"></i>
          <span>首页</span>
        </li>
        <li class="right">
          <!-- <input
            v-model="kwd"
            type="text"
            title="搜索"
            placeholder="请输入主播/直播内容"
          /> -->
          <form action="/">
            <van-search
              v-model="kwd"
              shape='round'
              input-align="center"
              placeholder="请输入主播/直播内容"
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
          <!-- <i class="iconfont icon-sousuo" ></i> -->
        </li>
      </ul>
    </div>
    <van-swipe
        :autoplay="4000"
        indicator-color="#f15353"
        :width="fun.getPhoneEnv() == 3 ? 375 : clientWidth"
        v-if="!fun.isTextEmpty(liveBanner)">
        <van-swipe-item
          v-for="(slide, index) in liveBanner"
          :key="index" v-if="slide.is_show"
        >
          <a :href="slide.url" style="display: block;background:#fff;">
            <img style="height:11.25rem;padding:0.5rem 0.875rem;border-radius:1.5rem;width:100%;" :src="slide.image" />
          </a>
        </van-swipe-item>
      </van-swipe>
    <van-tabs v-model="active" swipeable sticky style="background: #FFFFFF" @change="getData">
      <van-tab title="我的关注" name='0'>
        <template v-if="active == 0">
          <div class="living-box">
            <ul ref="newArray1"
              class="zq-waterfall-left living-item">
                <li class="" v-for="(item, index) in newArray1" :key="index" @click="gotoAnchor(0,item.anchor_member_id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top" v-if="item.status == 1"><span class="red">直播中</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon" v-if="item.status == 1"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
            <ul ref="newArray2"
              class="zq-waterfall-right living-item">
                <li class="" v-for="(item, index) in newArray2" :key="index" @click="gotoAnchor(0,item.anchor_member_id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top" v-if="item.status == 1"><span class="red">直播中</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon" v-if="item.status == 1"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
          </div>
        </template>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="推荐" name='4'>
        <template v-if="active == 4">
          <div class="living-box">
            <ul ref="newArray1"
              class="zq-waterfall-left living-item">
                <li class="" v-for="(item, index) in newArray1" :key="index" @click="gotoAnchor_1(item.play_type,null,item.room_id,item.back_id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red" :class="item.play_type =='1'?'':'huifan_color'">{{item.play_type =='1'?"直播中":"回放"}}</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
            <ul ref="newArray2"
              class="zq-waterfall-right living-item">
                <li class="" v-for="(item, index) in newArray2" :key="index" @click="gotoAnchor_1(item.play_type,null,item.room_id,item.back_id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red" :class="item.play_type =='1'?'':'huifan_color'">{{item.play_type =='1'?"直播中":"回放"}}</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
          </div>
        </template>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="直播中" name='1'>
        <template v-if="active == 1">
          <div class="living-box">
            <ul ref="newArray1"
              class="zq-waterfall-left living-item">
                <li class="" v-for="(item, index) in newArray1" :key="index" @click="gotoAnchor(1,null,item.id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red">直播中</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
            <ul ref="newArray2"
              class="zq-waterfall-right living-item">
                <li class="" v-for="(item, index) in newArray2" :key="index" @click="gotoAnchor(1,null,item.id)">
                  <div class="bg">
                    <img :src="item.cover" alt="">
                  </div>
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red">直播中</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
          </div>
        </template>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="预告" name='2'>
        <template v-if="active == 2">
          <div class="living-box">
            <ul ref="newArray1"
              class="zq-waterfall-left living-item">
                <li class="" v-for="(item, index) in newArray1" :key="index" @click="gotoAnchor(2,null,item.id)">
                  <img class="bg" :src="item.cover" alt="">
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red">预告</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
            <ul ref="newArray2"
              class="zq-waterfall-right living-item">
                <li class="" v-for="(item, index) in newArray2" :key="index" @click="gotoAnchor(2,null,item.id)">
                  <img class="bg" :src="item.cover" alt="">
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red">预告</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
          </div>
        </template>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="精彩回放" name='3' v-if="isShowBack">
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
        <template v-if="active == 3">
          <div class="living-box">
            <ul ref="newArray1"
              class="zq-waterfall-left living-item">
                <li class="" v-for="(item, index) in newArray1" :key="index" @click="gotoAnchor(3,null,item.room_id,item.id)">
                  <img class="bg" :src="item.cover" alt="">
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red huifan_color">回放</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
            <ul ref="newArray2"
              class="zq-waterfall-right living-item">
                <li class="" v-for="(item, index) in newArray2" :key="index" @click="gotoAnchor(3,null,item.room_id,item.id)">
                  <img class="bg" :src="item.cover" alt="">
                  <div class="title">
                    <img :src="item.avatar" alt="">
                    <span class="name">{{item.nickname}}</span>
                  </div>
                  <div class="top"><span class="red huifan_color">回放</span>{{item.view_num}}人观看</div>
                  <div class="goods_icon"><i class="iconfont icon-zb_goods"></i><span>{{item.goods_num}}</span></div>
                  <div class="bottom overflow1">{{item.title}}</div>
                </li>
            </ul>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import liveList_Controller from "./liveList_Controller";

  export default liveList_Controller;
</script>
<style lang='scss' scoped>
  .search_box {
    .search {
      height: 2.75rem;
      line-height: 2.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.875rem;
      background-color: #ffffff;
      .left {
        font-size: 16px;
        display: flex;
        font-weight: bold;
        i {
          color: #333333;
          font-size: 1rem;
        }
        span {
          display: block;
          margin: 0 0.25rem;
          max-width: 5.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333333;
          font-size: 1rem;
        }
        i:last-child {
          font-size: 1.125rem;
        }
      }
      .right {
        display: flex;
        border-radius: 1rem;
        font-size: 14px;
        color: #c9c9c9;
        // width: 12.375rem;
        // height: 1.875rem;
        // background: #f8f8f8;
        // display: flex;
        // line-height: 1.875rem;
        // border-radius: 1rem;
        // padding: 0 0.625rem;
        // font-size: 14px;
        // flex: 1;
        // margin: 0 1rem;
        // color: #c9c9c9;
        // i {
        //   font-size: 1.125rem;
        //   margin-right: 0.375rem;
        // }
        // input {
        //   border: none;
        //   width: 100%;
        //   text-align: center;
        // }
        // input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        //   color: #c9c9c9;
        // }
      }
    }
  }

  .attention-box {
    background: #FFFFFF;
    margin: 0.8rem;
    padding-bottom: 1rem;
  }
  .attention-item {
    display: flex;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0rem 0rem 0.469rem 0rem rgba(0, 0, 0, 0.09);
    border: 1px solid #eeeeee;
    border-radius: 5px;
    .left{
      flex: 0 0 3.75rem;
      width: 3.75rem;
      height: 3.75rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .middle {
      margin-left: 1rem;
      text-align: left;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        line-height: 2rem;
        width: 11rem;
      }
      .gray {
        color: #999999;
        font-size: 12px;
      }
    }
    .right {
      flex: 0 0 5.5rem;
      display: flex;
      align-self: center;
      justify-self: center;
      color: #e90505;
      line-height: 34px;
      i {
        font-size: 30px;
      }
    }
  }

  .living-box {
    background: #FFFFFF;
    margin: 0.8rem;
    padding-bottom: 1rem;
  }
  .living-item {
    margin: 0 ;
    margin-bottom: 0.875rem;
    width: 48%;
    overflow: hidden;
    vertical-align: top;
    display: inline-block;
    li{
      margin-bottom: 0.875rem;
      position: relative;
    }
    .bg {
      width: 100%;
      // height: 13.125rem;
      border-radius: 0.313rem;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title {
      display: flex;
      img {
        flex: 0 0 1.656rem;
        width: 1.656rem;
        height: 1.656rem;
        border-radius: 50%;
        margin-top: -0.625rem;
        border: 0.125rem solid #fff;
      }
      .name {
        display: inline-block;
        flex: 1;
        text-align: left;
        line-height: 1rem;
        margin-left: 0.25rem;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
      }
    }
    .top {
      position: absolute;
      top: 0.5rem;
      left: 0.25rem;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 0.15rem;
      color: #FFFFFF;
      padding:0 0.15rem 0 0;
      font-size: 12px;
      height: 1.25rem;
      line-height: 1.25rem;
      .red {
        background-color: #f10303;
        border-radius: 0.15rem;
        padding:0 0.25rem;
        margin-right: 0.2rem;
        display: inline-block;
        height: 100%;
      }
      .huifan_color{
        background-color: #999999;
      }
    }
    .goods_icon{
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 12px;
      height: 1.25rem;
      line-height: 1.25rem;
      i{
        font-size: 1.625rem;
        color: #ffa303;
      }
      span{
        background-color: #ffffff;
	      border-radius: 0.266rem;
        color: #ff0000;
        position: absolute;
        right: -4px;
        height: 0.875rem;
        line-height: 0.875rem;
        font-size: 0.625rem;
        padding: 0 0.15rem;
      }
    }
    .bottom {
      width: 100%;
      height: 2.5rem;
      line-height: 1.25rem;
      position: absolute;
      bottom: 1.875rem;
      left: 0rem;
      font-weight: bold;
      font-size: 0.875rem;
      color: #FFFFFF;
      text-align: left;
      padding: 0 0.5rem;
      // background: rgba(0, 0, 0, 0.4);
    }
    .overflow1{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

    }
    .purple {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: #FFFFFF;
      font-size: 12px;
      background-color: #8415f5;
      border-radius: 0.625rem 0rem 0.625rem 0rem;
      padding: 0.2rem 0.6rem;
    }
    .gray {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: #FFFFFF;
      font-size: 12px;
      background-color: #999999;
      border-radius: 0.625rem 0rem 0.625rem 0rem;
      padding: 0.2rem 0.6rem;
    }
  }
  .zq-waterfall-left {
    margin-right: 0.5rem;
  }
</style>
