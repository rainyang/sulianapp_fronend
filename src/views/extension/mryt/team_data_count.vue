<template>
  <div id="award_detail">
    <!-- <c-title :hide="false" :text="'直推会员'"></c-title> -->
    <div id="title">
        <i class="fa fa-angle-left" @click="goBack"></i>
        <p>{{title}}<span>(合计：{{total_num}}人)</span></p>
    </div>
    <div style="height:40px"></div>
    <div id="content">
        <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
            <div class="list" v-for="(item,i) in member_arr" :key='i'>
                <div class="img">
                    <img :src="item.has_one_member.avatar?item.has_one_member.avatar:require('../../../assets/images/photo-mr.jpg')">
                </div>
                <ul class="name">
                    <li>
                        <span>{{item.has_one_member.nickname}}</span>
                        <span>ID:{{item.has_one_member.uid}}</span>
                    </li>
                </ul>
            </div>
        </mt-loadmore>
        <!-- <div class="list">
            <div class="img">
                <img src="../../../assets/images/photo-mr.jpg">
            </div>
            <ul class="name">
                <li>
                    <span>碳酸果汁</span>
                    <span>ID:123456</span>
                </li>
            </ul>
        </div>
        <div class="list">
            <div class="img">
                <img src="../../../assets/images/photo-mr.jpg">
            </div>
            <ul class="name">
                <li>
                    <span>碳酸果汁</span>
                    <span>ID:123456</span>
                </li>
            </ul>
        </div>
        <div class="list">
            <div class="img">
                <img src="../../../assets/images/photo-mr.jpg">
            </div>
            <ul class="name">
                <li>
                    <span>碳酸果汁</span>
                    <span>ID:123456</span>
                </li>
            </ul>
        </div> -->
    </div>
  </div>
</template>

<script>
  import controller from "./team_data_count_controller";

  export default controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #award_detail{
    background: #fff;
    #title{
      // padding: 0 10px;
      position: fixed;
      top: 0;
      background: #fff;
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom:solid 0.0625rem #ebebeb;
      display: flex;
      i{
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.5rem;
        color:#666;
        line-height: 2.5rem;
      }
      p{
        font-weight: bold;
        font-size:16px;
        color:#333;
        span{
          font-weight: normal;
          color:#8c8c8c;
          margin-left: 0.625rem;
          font-size: 14px;
        }
      }
    }
    #content{
      background: #fff;
      .list{ 
        display: flex;
        align-items: center;
        padding-left:0.875rem;
        .img{
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 2rem;
          border:solid 0.0625rem #f5f5f5;
          overflow: hidden;
          img{
            width: 100%;
          }
        }
        .name{
          width: 19.6875rem;
          margin-left: 0.625rem;
          border-bottom: solid 0.0625rem #ebebeb;
          li{
            line-height: 3.75rem;
            display: flex;
            justify-content: space-between;
            font-size:18px;
            padding-right: 0.875rem;
            span:first-child{
              max-width: 12.25rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space:nowrap;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>