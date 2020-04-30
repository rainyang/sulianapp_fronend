<template>
  <div id="search" transition="fadeInLeft">
    <div id="soso" class="uou" :class="{ mout: amout }">
      <div class="search">
        <mt-button
          slot="prepend"
          icon="back"
          style="background: #fff;box-shadow: none;"
          @click="goback"
        ></mt-button>
        <div class="searchBox">
          <form @submit.prevent action="#">
            <input
              type="search"
              placeholder="请输入内容"
              @keypress="enterSearch"
              v-model="inputs"
            />
          </form>
          <div class="img-icon" @click="search">
            <div class="img-icon-btn"></div>
          </div>
        </div>
      </div>
      <c-storeList :stores="stores" text="附近的店铺"></c-storeList>
    </div>
    <div style="height: 3.4375rem;display: block;"></div>
  </div>
</template>

<script>
import search_controller from "./search_controller";
export default search_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
  .osll {
    min-height: 100vh;
    overflow: scroll;
  }
  .uou {
    // position: fixed;
    // z-index: 99;
    // top: 0px;
    // transition: 0.2s;
    // -webkit-transition: 0.2s;
    width: 100%;
  }
  .mout {
    top: -2.25rem;
  }
}
.search {
  overflow: hidden;
  background: #fff;
  border-bottom: 0.0625rem solid #f5f5f5;
  width: 100%;
  /*.el-button.el-button--default {*/
  /*float: left;*/
  /*width: 10%;*/
  /*border: none;*/
  /*padding-top: 1rem;*/
  /*}*/
  .mint-button.mint-button--default {
    float: left;
    width: 10%;
    border: none;
    padding-top: 0;
    box-shadow: none;
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
  .searchBox {
    position: relative;
    font-size: 14px;
    display: inline-table;
    float: left;
    width: 80%;
    margin-left: 2%;
    height: 2.8125rem;
    input {
      vertical-align: middle;
      border: none;
      background: #f2f2f2 none;
      box-sizing: border-box;
      outline: 0;
      padding: 0.1875rem 0.625rem;
      padding-right: 2.625rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin-top: 0.5rem;
      color: #8c8c8c;
      font-size: 14px;
      width: 17.75rem;
      border-radius: 0.9375rem;
      z-index: 10;
    }
    .img-icon {
      border: none;
      color: #a9a9a9;
      display: table-cell;
      position: relative;
      border-radius: 0;
      height: 1.875rem;
      top: 0.0625rem;
      opacity: 2;
      left: -2.25rem;
      .img-icon-btn {
        position: absolute;
        z-index: 12;
        width: 1rem;
        height: 1rem;
        top: 50%;
        left: 50%;
        margin-left: -0.5rem;
        margin-top: -0.5rem;
        background: url("../../assets/images/search.png") no-repeat center
          center;
        background-size: 80% 80%;
      }
    }
  }
}
</style>
