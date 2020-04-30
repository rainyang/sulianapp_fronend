<template>
  <div id="notice">
    <c-title :hide="false"
             :text="title"></c-title>
    <div style="height: 40px;"></div>
    <!-- 优化 -->
    <div class="content">
      <div class="tab_box">
        <ul class="tab_list">
          <van-tabs v-model="active"
                    @click="onClick"
                    id="tab">
            <van-tab title="全部分类"
                     :id="0"
                     class="tabChild"></van-tab>
            <van-tab :title="item.name"
                     v-for="(item,i) in categories"
                     :id="item.id" :key='i'
                     class="tabChild"></van-tab>
          </van-tabs>
        </ul>
      </div>
      <ul class="new_box">
        <li class="new_list"
            v-for="(item,i) in datas" :key='i'
            @click="toNoticeInfo(item)">
          <div class="title">
              <div class="title_a"
              style="-webkit-box-orient: vertical;"><span class="pay-money" v-if="item.has_one_article_pay">付费</span><span>{{item.title}}</span></div>

            <div class="title_b">
              <span class="sort">{{item.author}}</span>
              <span class="time">{{fun.isTextEmpty(item.virtual_at)? item.updated_at: item.virtual_at}}</span>
            </div>
          </div>
          <div class="img"
               v-if="item.thumb">
            <img :src="item.thumb">
          </div>
          <div class="img"
               v-if="!item.thumb">
            <img src="../../assets/images/img_default.png">
          </div>
        </li>
      </ul>
      <p v-if="noNotice"
         class="noNotice">该分类下暂无数据</p>
    </div>
    <!--  -->
    <!-- <div ref="coupon_loadmore">
      <div v-if="banner"><img class="banner" :src="banner" /></div>
      <div class="item" v-for="item in datas">
        <div class="item_bg">
          <p class="item_title" @click="toNoticeInfo(item)">{{ item.title }}</p>
          <div class="item_lin">
            <p class="item_time" @click="toNoticeInfo(item)">
              {{
                $vueIsTextEmpty(item.virtual_at)
                  ? item.updated_at
                  : item.virtual_at
              }}
            </p>
            <p
              class="item_category"
              @click="toNoticeByCategory(item.belongs_to_category.id)"
            >
              {{ item.belongs_to_category.name }}
            </p>
          </div>
          <div
            class="item_img_bg"
            @click="toNoticeInfo(item)"
            v-if="item.thumb"
          >
            <img class="item_img" :src="item.thumb" />
          </div>
          <div
            class="item_img_bg"
            @click="toNoticeInfo(item)"
            v-if="!item.thumb"
          >
            <img class="item_img" src="../../assets/images/img_default.png" />
          </div>
          <div class="item_desc" @click="toNoticeInfo(item)">
            {{ item.desc }}
          </div>
        </div>
      </div>
    </div>-->
    <div class="btn" @click="toEssay" v-if="article_pay">
        <i class="iconfont icon-wz_payed"></i>
        <div>已付费</div>
      </div>  
  </div>
</template>
<script>
import noticecontroller from "./notice_controller";

export default noticecontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#notice {
  .content {
    .tab_box {
      background: #fff;
      position: relative;
      .tab_list {
        height: 44px;
        line-height: 44px;
        border-bottom: solid 1px #ebebeb;
        // overflow-x: scroll;
        overflow-x: hidden;
        overflow-y: hidden;
        transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        transition-duration: 300ms;
        font-size: 18px;
      }
    }
    .new_box {
      background: #fff;
      padding: 0 0.9375rem;
      .new_list {
        border-bottom: solid 0.0625rem #ebebeb;
        padding: 0.9375rem 0;
        display: flex;
        position: relative;
        justify-content: space-between;
        .title {
          width: 13.5625rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title_a {
            font-size: 18px;
            line-height: 1.75rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .pay-money{
              width: 2.125rem;
              height: 1.125rem;
              border-radius: 0.3125rem;
              border: solid 0.0625rem #ff2c29;
              display: inline-block;
              text-align: center;
              line-height: 1.125rem;
              vertical-align: text-top;
              font-size: 12px;
              color:#ff2c29;
            }
          }
          .title_b {
            font-size: 14px;
            color: #8c8c8c;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .sort {
              text-overflow: ellipsis;
              overflow: hidden;
              width: 8rem;
              white-space: nowrap;
            }
          }
        }
        .img {
          width: 7.0625rem;
          height: 5.5rem;
          background: #f2f2f2;
          overflow: hidden;
          background-size: cover;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  // .banner {
  //   height: auto;
  //   max-height: 25rem;
  //   width: 100%;
  // }
  // .item {
  //   margin: 0.3125rem;
  // }
  // .item_lin {
  //   height: 1.875rem;
  //   background: #fff;
  // }
  // .item_bg {
  //   border: 0.0625rem solid #ebebeb;
  //   padding: 0.3125rem;
  //   background: #fff;
  //   width: 100%;
  //   border-radius: 0px;
  // }

  // .item_img_bg {
  //   width: 100%;
  //   margin-bottom: 0.625rem;
  //   padding-top: 0.3125rem;
  //   padding-bottom: 0.3125rem;
  // }
  // .item_img {
  //   width: 100%;
  //   max-height: 25rem;
  // }
  // p.item_title {
  //   padding-left: 0.3125rem;
  //   padding-right: 0.3125rem;
  //   text-align: left;
  //   height: 1.875rem;
  //   line-height: 1.875rem;
  //   font-size: 15px;
  //   overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  //   font-weight: bold;
  // }
  // p.item_time {
  //   width: 50%;
  //   float: left;
  //   padding-left: 0.3125rem;
  //   padding-right: 0.3125rem;
  //   text-align: left;
  //   height: 1.875rem;
  //   line-height: 1.875rem;
  //   font-size: 12px;
  //   color: #8a8a8a;
  // }
  // p.item_category {
  //   width: 50%;
  //   float: left;
  //   padding-left: 0.3125rem;
  //   padding-right: 0.3125rem;
  //   text-align: right;
  //   height: 1.875rem;
  //   line-height: 1.875rem;
  //   font-size: 14px;
  //   color: #f15353;
  //   font-weight: bold;
  // }
  // .item_desc {
  //   padding-left: 0.3125rem;
  //   padding-right: 0.3125rem;
  //   text-align: left;
  //   font-size: 14px;
  //   color: #8a8a8a;
  // }
  .noNotice {
    padding: 20px 0;
  }
  .btn{
    width: 4.5rem;
    height: 4.5rem;
    background-color: #ff2c29;
    box-shadow: 0rem 0rem 0.5rem 0rem 
      rgba(237, 11, 11, 0.48);
    border: solid 0.0625rem #f51f27;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size:12px;
    position: fixed;
    right:1rem;
    bottom:15%;
    border-radius: 50%;
    padding:0 0.5rem;
    i{
      font-size:36px;
    }
  }

}
</style>
