<!-- 微社区父组件入口 -->
<template>
  <div id="Microhome">
    <ul class="nav-class set-pc-style">
      <!-- 底部导航栏 -->
      <router-link :to="fun.getUrl('MicroIndex',{})"
                   tag="li"><span class="home-icon"></span>首页</router-link>
      <router-link :to="fun.getUrl('microAttention',{})"
                   tag="li"><span class="attention-icon"></span>关注</router-link>
      <router-link :to="fun.getUrl('microRelease',{})"
                   tag="li"><img style="width:2.25rem;"
             src="../../assets/images/micro_communities/tab_addition.png"
             alt=""></router-link>
      <router-link :to="fun.getUrl('microhomepage',{})"
                   tag="li"><span class="user-icon"></span>我的主页</router-link>
      <router-link :to="fun.getUrl('member',{})"
                   tag="li"><span class="member-icon"></span>会员中心</router-link>
    </ul>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
#Microhome {
  background: #ffffff;
  min-height: 100vh;
  padding-bottom: 40px;
  .nav-class {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 2.875rem;
    line-height: 2.875rem;
    background: #ffffff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    box-shadow: 0px -2px 4px 0px rgba(146, 146, 146, 0.1);
    li {
      height: 100%;
      width: 20%;
      display: flex;
      flex-direction: column;
      line-height: 1rem;
      font-size: 10px;
      justify-content: center;
      align-items: center;
      span {
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        background-size: 1.25rem 1.25rem;
        background-repeat: no-repeat;
      }
      .home-icon {
        background-image: url("../../assets/images/micro_communities/tab_index_normal.png");
      }
      .attention-icon {
        background-image: url("../../assets/images/micro_communities/tab_focous_normal.png");
      }
      .user-icon {
        background-image: url("../../assets/images/micro_communities/tab_my_normal.png");
      }
      .member-icon {
        background-image: url("../../assets/images/micro_communities/tab_member_normal.png");
      }
    }
    .active {
      color: #e35151;
      .home-icon {
        background-image: url("../../assets/images/micro_communities/tab_index_active.png");
      }
      .attention-icon {
        background-image: url("../../assets/images/micro_communities/tab_focus_active.png");
      }
      .user-icon {
        background-image: url("../../assets/images/micro_communities/tab_my_active.png");
      }
      .member-icon {
        background-image: url("../../assets/images/micro_communities/tab_member_active.png");
      }
    }
  }
}
</style>
