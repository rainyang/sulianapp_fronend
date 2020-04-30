<template>
  <div id="course">
    <!-- <c-title :hide="false" text='观看历史' tolink="CourseHistory" totext='清除'></c-title> -->
    <mt-header fixed
               title="观看历史">
      <mt-button icon="back"
                 @click="goBack"
                 slot="left"></mt-button>
      <span slot="right"
            @click="clearData()">清除</span>
    </mt-header>
    <div class="noHistory"
         v-if="isShowNoHistory">
      <div class="noImg">
        <img src="../../../assets/images/course_no.png">
      </div>
      <p class="text">暂无历史记录</p>
    </div>
    <mt-loadmore v-if="goload"
                 :top-method="loadTop"
                 :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 ref="coupon_loadmore"
                 bottomPullText=""
                 bottomDropText="下拉加载..."
                 bottomLoadingText=""
                 :autoFill="false"
                 id="olis">
      <div class="content">
        <div class="box"
             v-for="(item,i) in histroyInfo"
			 :key='i'
             @click="gotoDetail(item.course_goods_id)">
          <div class="image">
            <img :src="item.course_thumb" />
          </div>
          <ul class="title">
            <li style="font-size:15px;">课程名称：{{ item.course_title }}</li>
            <li class="jie">
              <yd-icon slot="icon"
                       class="icon-bofang1"
                       custom
                       size="1rem"></yd-icon>
              观看至{{ item.chapter_name }}
            </li>
          </ul>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import course_history_controller from "./course_history_controller";
export default course_history_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#course {
  padding-top: 40px;
  .noHistory {
    margin: 50px auto;
    .noImg {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .text {
      font-size: 14px;
      color: #ccc;
      margin-top: 10px;
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  margin-top: 2.5rem;
  background-color: #fff;
}
.box {
  width: 100%;
  display: flex;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-bottom: solid 0.0625rem #e2e2e2;
  padding-left: 0.75rem;
}
.image {
  width: 6.25rem;
  margin-right: 0.5rem;
  flex: 1;
  height: 4rem;
  background-color: green;
}
.image img {
  width: 100%;
  height: 100%;
}
.title {
  flex: 3;
  text-align: left;
}
.jie {
  color: #8c8c8c;
  margin-top: 0.625rem;
}
.mint-header {
  background: none;
  color: #666;
}
.is-fixed .mint-header-title {
  font-weight: bold;
}
.mint-header.is-fixed {
  border-bottom: 0.0625rem solid #e8e8e8;
  background: #fff;
  z-index: 99;
}
.is-right a {
  font-size: 0.6rem;
}
a {
  color: #333;
}
.mint-navbar {
  margin-bottom: 0.125rem;
}
.mint-navbar .mint-tab-item {
  padding: 0.875rem 0;
}
</style>
