<template>
  <section id="page">
    <c-title :hide="false" text="查看明细"></c-title>
    <mt-navbar v-model="active_tab">
      <mt-tab-item id="all" @click.native="handleClick">全部</mt-tab-item>
      <mt-tab-item id="income" @click.native="handleClick">{{income_name_text}}</mt-tab-item>
      <mt-tab-item id="pay" @click.native="handleClick">支出</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active_tab">
      <mt-tab-container-item id="all">
        <mt-loadmore
          v-if="all_goload"
          :top-method="all_loadTop"
          :bottom-method="all_loadBottom"
          :bottom-all-loaded="all_allLoaded"
          ref="all_loadmore"
          bottomPullText=""
          bottomDropText="下拉加载..."
          bottomLoadingText=""
          :autoFill="false"
        >
          <ul class="list" v-for="(item,i) in all_con" :key='i'>
            <li>
              <span>{{ item.source_name }}</span>
              <span>{{ item.change_value }}</span>
            </li>
            <li>
              <span>{{ item.created_at }}</span>
              <span>{{ item.value_type_name }}</span>
            </li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="income">
        <mt-loadmore
          v-if="income_goload"
          :top-method="income_loadTop"
          :bottom-method="income_loadBottom"
          :bottom-all-loaded="income_allLoaded"
          ref="income_loadmore"
          bottomPullText=""
          bottomDropText="下拉加载..."
          bottomLoadingText=""
          :autoFill="false"
        >
          <ul class="list" v-for="(item,i) in income_con" :key='i'>
            <li>
              <span>{{ item.source_name }}</span>
              <span>{{ item.change_value }}</span>
            </li>
            <li>
              <span>{{ item.created_at }}</span>
              <span>{{ item.value_type_name }}</span>
            </li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="pay">
        <mt-loadmore
          v-if="pay_goload"
          :top-method="pay_loadTop"
          :bottom-method="pay_loadBottom"
          :bottom-all-loaded="pay_allLoaded"
          ref="pay_loadmore"
          bottomPullText=""
          bottomDropText="下拉加载..."
          bottomLoadingText=""
          :autoFill="false"
        >
          <ul class="list" v-for="(item,i) in pay_con" :key='i'>
            <li>
              <span>{{ item.source_name }}</span>
              <span>{{ item.change_value }}</span>
            </li>
            <li>
              <span>{{ item.created_at }}</span>
              <span>{{ item.value_type_name }}</span>
            </li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>

<script>
import look_details_coin_controller from "./look_details_coin_controller.js";
export default look_details_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
#page {
  padding-top: 40px;
  .list {
    border-bottom: solid 0.0625rem #ebebeb;
    background-color: #fff;
    padding: 0.625rem 0.875rem;
    li {
      display: flex;
      justify-content: space-between;
      line-height: 1.5rem;
      font-size: 14px;
    }
    li:first-child {
      span:last-child {
        color: #f15353;
      }
    }
    li:last-child {
      color: #8c8c8c;
    }
  }
}
</style>
