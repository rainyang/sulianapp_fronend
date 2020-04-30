<template>
<div class="fe-mod fe-mod-1" :style="{'color':datas.params.color,'backgroundColor':datas.params.bgcolor}">
    <a :href="datas.params.noticehref|| '#'">
        <div class="scroll-notice" style="line-height: 2rem;height:2rem;overflow: hidden; white-space: nowrap; text-overflow: ellipsis; content:'...';" v-show="datas.params.scroll == 1">
            <van-notice-bar  :background="datas.params.bgcolor" :color="datas.params.color">
               <div :style="{minWidth:noticeWidth}">
                 {{datas.params.notice|| '请填写内容,可设置是否滚动显示'}}
               </div>
            </van-notice-bar>
<!--            <marquee  scrollamount="3" :style="{'color':datas.params.color}">{{datas.params.notice|| '请填写内容,可设置是否滚动显示'}}</marquee>-->
        </div>
        <div class="scroll-notice" :style="{'overflow': 'hidden','color':datas.params.color}" v-show="datas.params.scroll == 0">{{datas.params.notice|| '请填写内容,可设置是否滚动显示'}}</div>
    </a>
</div>
</template>
<script>
  export default {
    props: ['datas'],
    data() {
      return {
        noticeWidth:"100%"
      };
    },
    mounted(){
      //添加宽度，让文字满足滚动
      var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.noticeWidth = w+'px'
    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.scroll-notice{
  line-height: 2rem;
  .van-notice-bar{
    height: auto;
    line-height:2rem;
  }
}
</style>
