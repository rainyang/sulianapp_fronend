<template>
  <div
    id="love_list"
    style="overflow:scroll;height:50.875rem;-webkit-overflow-scrolling: touch;"
  >
    <c-title :hide="false" :text="love_name + '明细'"></c-title>

    <div style="height: 40px;"></div>

    <mt-navbar v-model="selected">
      <mt-tab-item id="0" @click.native="switchItem">全部</mt-tab-item>
      <mt-tab-item id="1" @click.native="switchItem">{{income_name_text}}</mt-tab-item>
      <mt-tab-item id="2" @click.native="switchItem">支出</mt-tab-item>
    </mt-navbar>

    <mt-loadmore
      v-if="goload"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="coupon_loadmore"
      bottomPullText=""
      bottomDropText="上拉加载..."
      bottomLoadingText=""
      :autoFill="false"
      id="olis"
    >
      <mt-tab-container v-model="selected">
        <div class="coupon_card">
          <mt-tab-container-item id="0">
            <!--全部-->
            <div class="tbs" v-for="(item, index) in allData" :key='index'>
              <div class="left titles">{{ item.source_name }}</div>
              <div class="right reds">
                {{ item.change_value }}
                <small></small>
              </div>
              <div class="left">{{ item.created_at }}</div>
              <div class="right">{{ item.value_type_name }}</div>
            </div>
          </mt-tab-container-item>

          <mt-tab-container-item id="1">
            <!--收入-->
            <div class="tbs" v-for="(item, index) in incomeData" :key='index'>
              <div class="left titles">{{ item.source_name }}</div>
              <div class="right reds">
                {{ item.change_value }}
                <small></small>
              </div>
              <div class="left">{{ item.created_at }}</div>
              <div class="right">{{ item.value_type_name }}</div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!--支出-->
            <div class="tbs" v-for="(item, index) in expendData" :key='index'>
              <div class="left titles">{{ item.source_name }}</div>
              <div class="right reds">
                {{ item.change_value }}
                <small></small>
              </div>
              <div class="left">{{ item.created_at }}</div>
              <div class="right">{{ item.value_type_name }}</div>
            </div>
          </mt-tab-container-item>
        </div>
      </mt-tab-container>
    </mt-loadmore>
  </div>
</template>
<script>
  import love_list_controller from "./love_list_controller";

  export default love_list_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/love_list.scss";
</style>
