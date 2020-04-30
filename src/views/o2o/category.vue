<template>
  <div id="search" transition="fadeInLeft">
    <c-title :hide="false" text='搜索'></c-title>
    <div style="height: 40px;display: block;"></div>
    <div id="soso" class="uou" :class="{'mout':amout}">
      <mt-loadmore v-if="goload"
                   :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   bottomPullText=''
                   bottomDropText='下拉加载...'
                   bottomLoadingText=''
                   :autoFill='true'
                   id='olis'>
        <c-storeList :stores='stores' @changList="changList" text='搜索店铺' :page="page" :totalPage='total_page'></c-storeList>
      </mt-loadmore>
    </div>
    <div style="height: 3.4375rem;display: block;"></div>
    <!--<mt-loadmore v-if="goload" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true'>
      <c-goodsList :goods='goods' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
    </mt-loadmore>-->

  </div>
</template>

<script>
  import category_controller from "./category_controller";

  export default category_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #search {
    .osll {
      min-height: 100vh;
      overflow: scroll;
    }
    .uou {
      z-index: 99;
      top: 0px;
      transition: 0.2s;
      -webkit-transition: 0.2s;
    }
    .mout {
      top: -2.25rem;
    }
  }

  .search {
    overflow: hidden;
    background: #fff;
    border-bottom: 0.0625rem solid #f5f5f5;
    .el-button.el-button--default {
      float: left;
      width: 10%;
      border: none;
      padding-top: 1rem;
    }
    .el-input.el-input-group.el-input-group--append {
      float: left;
      width: 80%;

      margin-left: 2%;
      height: 2.8125rem;
    }
    .el-input-group__append .el-button.el-button--default {
      background: #f5f5f5;
      padding-top: 0.5625rem;
      line-height: 1rem;
      padding-right: 1.8125rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .el-input.el-input-group.el-input-group--append .el-input-group__append {
      background: #f5f5f5;
    }
    .el-col-1 {
      margin: 0.75rem 0rem;
      color: #666;
      font-size: 16px;
    }
  }
</style>