<template>
  <div>
    <div v-show="template">
      <c-title :hide="true"
               text="我的推广"></c-title>

      <!-- 优化推广中心 -->
      <div id="extension-box">
        <div id="header">
          <div class="top">
            <div class="img">
              <img :src="userInfo.avatar"
                   style="width:100%;height:100%;" />
            </div>
            <ul class="header-info">
              <li class="header-name">{{ userInfo.nickname }}</li>
              <li>
                <span>[会员ID：{{ userInfo.member_id }}]</span>
              </li>
            </ul>
            <div class="share"
                 @click="toPage('MyIncome')"
                 v-if="shareShow">
              <i class="iconfont icon-extension_code"></i>
              <span>{{income_name_text}}分享</span>
            </div>
          </div>
          <div class="income">
            <ul>
              <li class="header-top">累计{{income_name_text}}</li>
              <li>
                <small>￥</small>
                {{ userInfo.grand_total }}
              </li>
            </ul>
            <ul class="right">
              <li class="header-top">可{{this.fun.initWithdrawal()}}{{income_name_text}}</li>
              <li>
                <small>￥</small>
                {{ userInfo.usable_total }}
              </li>
            </ul>
            <div class="btn"
                 @click="gotoIncome"
                 v-if="userInfo.auto_withdraw == 0"
                 style="position: relative;">
              <button type="button">
                去{{this.fun.initWithdrawal()}}<i class="fa fa-angle-right"></i>
              </button>
            </div>
            <div class="btn"
                 v-else>
              <button type="button"
                      style="background-color:#ccc;">
                {{ userInfo.auto_withdraw }}日自动{{this.fun.initWithdrawal()}}
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>

        <ul id="detail">
          <li @click="toPage('myEarnings')"
              v-if="showEarning">
            <i class="iconfont icon-extension_receive"></i>
            <span>领取收益</span>
            <i class="fa fa-angle-right"></i>
          </li>
          <li @click="toPage('incomedetails')">
            <i class="iconfont icon-member_integral_1"></i>
            <span>{{income_name_text}}明细</span>
            <i class="fa fa-angle-right"></i>
          </li>
          <li @click="toPage('presentationRecord')">
            <i class="iconfont icon-member-withdrawals1"></i>
            <span>{{this.fun.initWithdrawal()}}明细</span>
            <i class="fa fa-angle-right"></i>
          </li>
          <li @click="toPage('Performance')"
              v-if="is_show_performance">
            <i class="iconfont icon-extension_collect"></i>
            <span>营业额</span>
            <i class="fa fa-angle-right"></i>
          </li>
        </ul>

        <!-- 权限插件模版 -->
        <div id="power">
          <div class="title">
            <div class="spare"></div>
            <h1>权限</h1>
          </div>

          <!--  模板2 -->
          <div class="plugg"
               v-if="template === '02'">
            <div class="plug-list"
                 v-for="(item,i) in extension"
                 @click="gotoPage(item)" :key='i'>
              <i class="iconfont"
                 :class="item.icon"></i>
              <ul class="left">
                <li class="left_a">{{ item.title }}</li>
                <li class="left_b"
                    v-if="
                  item.level == null ||
                  item.level == '' ||
                  item.level == undefined
                    ? false
                    : true
                ">
                  {{ item.level }}
                </li>
                <li class="left_b"
                    v-if="
                  item.level == null ||
                  item.level == '' ||
                  item.level == undefined
                    ? true
                    : false
                "></li>
                <li class="left_c"><span>¥</span>{{ item.value }}</li>
              </ul>
            </div>
          </div>
          <!-- 模板2end -->

          <div class="plugg"
               v-if="template !== '02'">
            <div class="plug-list"
                 v-for="(item,i) in extension"
                 @click="gotoPage(item)"
				 :key='i'>
              <ul class="left">
                <li class="icon">
                  <yd-icon class="iconfont"
                           custom
                           size="2.5rem"
                           color="#f15353"
                           :class="item.icon"></yd-icon>
                </li>
                <li class="info">
                  <div class="top">
                    <span class="name">{{ item.title }}</span>
                  </div>
                  <div class="grade">
                    <span v-if="
                      item.level == null ||
                      item.level == '' ||
                      item.level == undefined
                        ? false
                        : true
                    ">{{ item.level }}</span>
                  </div>
                  <div class="money">
                    <small>￥</small>
                    {{ item.value }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 更多权限插件模版 -->
        <div id="more-power" v-if="is_show_unable==1">
          <div class="title">
            <div class="spare"></div>
            <h1>更多权限</h1>
          </div>

          <!-- 模板2 -->
          <div class="plugg"
               v-if="template === '02'">
            <div class="plug-list"
                v-for="(item,i) in unextension"
                @click="gotoPage(item)" 
                :key='i'>
              <i class="iconfont"
                 :class="item.icon"></i>
              <ul class="left">
                <li class="left_a">{{ item.title }}</li>
                <li class="left_b"></li>
                <li class="left_c"><span>¥</span>{{ item.value }}</li>
              </ul>
            </div>
          </div>
          <!-- 模板2end -->

          <div class="plugg"
               v-if="template !== '02'">
            <div class="plug-list"
                v-for="(item,i) in unextension"
                @click="gotoPage(item)"
                :key='i'>
              <ul class="left">
                <li class="icon">
                  <yd-icon class="iconfont"
                           custom
                           size="2.5rem"
                           color="#f15353"
                           :class="item.icon"></yd-icon>
                </li>
                <li class="info">
                  <div class="top">
                    <span class="name">{{ item.title }}</span>
                  </div>
                  <div class="money">
                    <small>￥</small>
                    {{ item.value }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 连锁店页面入口
        <div @click="gotoChainShop">
          <span>连锁店入口</span>
        </div> -->
      </div>

      <div style="height:6.25rem"></div>
    </div>
    <!--<div class="wait-loader loader-smartphone is-wait-active" data-screen="加载中" v-show="!template"></div>-->
  </div>
</template>

<script>
import index_controller from "./index_controller";

export default index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@font-face {
  font-family: "iconfont";
  /* project id 432132 */
  src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot");
  src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.woff") format("woff"),
    url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.svg#iconfont")
      format("svg");
}
</style>
