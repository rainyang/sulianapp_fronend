<template>
  <div id="banner">
    <div class="m-swipe">
      <div style="line-height: 9.375rem; text-align: center; color: #999; font-size: 16px;"
           v-if="datas.data == ''">一个轮播都没有...
      </div>
      <!--<c-myswipe-->
      <!--    :pagination-visible="true"-->
      <!--    :slides="datas.data"-->
      <!--    :repeating="true"-->
      <!--    :auto="3000" v-if="datas.data != ''">-->
      <!--    <div v-for="(slide,index) in datas.data" :key="index">-->
      <!--        <a :href="slide.hrefurl|href_filters" v-if="slide.imgurl" style="height:38vw">-->
      <!--          <img width="100%" :src="slide.imgurl" />-->
      <!--        </a>-->

      <!--         <a href="javascript:;" v-if="!slide.imgurl" style="height:38vw">-->
      <!--          <img width="100%" src="../../assets/images/img_default.png" />-->
      <!--        </a>-->
      <!--    </div>-->
      <!--</c-myswipe>-->
      <!--<yd-slider autoplay="3000"-->
                 <!--pagination-activecolor="#ffffff"-->
                 <!--v-if="datas.data != ''">-->
        <!--<yd-slider-item v-for="(slide,index) in datas.data"-->
                        <!--:key="index">-->
          <!--<a :href="slide.hrefurl|href_filters" v-if="slide.imgurl">-->
            <!--<img style="width: 100%;" :src="slide.imgurl"/>-->
          <!--</a>-->
          <!--<a href="javascript:;" v-if="!slide.imgurl">-->
            <!--<img style="width: 100%;" src="../../assets/images/img_default.png"/>-->
          <!--</a>-->
        <!--</yd-slider-item>-->
      <!--</yd-slider>-->

      <template v-if="datas.data != ''">
        <van-swipe
          :autoplay="4000"
          indicator-color="white"
          :width="fun.getPhoneEnv() == 3 ? 375 : clientWidths"
        >
          <van-swipe-item v-for="(slide,index) in datas.data" v-if="slide.imgurl" :key="index">
            <a :href="slide.hrefurl|href_filters"
               style="height:38vw">
              <img style="width: 100%;" :src="slide.imgurl"/>
            </a>
            <!--没必要-->
            <!--<a href="javascript:;"-->
               <!--v-if="!slide.imgurl"-->
               <!--style="height:38vw">-->
              <!--<img style="width: 100%;" src="../../assets/images/img_default.png"/>-->
            <!--</a>-->
          </van-swipe-item>
        </van-swipe>
      </template>

      <!--<mt-swipe :auto="4000" v-if="datas.data != ''">
			<mt-swipe-item v-for="item in datas.data"><a :href="item.hrefurl|| 'javascript:;'"><img :src="item.imgurl"></a></mt-swipe-item>
		</mt-swipe>-->
    </div>
  </div>
</template>
<script>
  import cMyswipe from "components/myswipe";
  import { Swipe, SwipeItem } from "mint-ui";
  import { Slider, SliderItem } from "mint-ui";

  export default {
    props: ["datas"],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {},
    components: { cMyswipe }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .yd-slider {
    .yd-slider-pagination {
      .yd-slider-pagination-item-active {
        background-color: rgb(255, 255, 255) !important;
        width: 6px;
      }
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  .m-swipe {
    img {
      width: 100%;
    }
  }
</style>
