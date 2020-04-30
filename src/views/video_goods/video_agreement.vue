<!-- 发现-小视频  用户协议组件 -->
<template>
  <div id="vidaoAreement">
    <div class="image-box">
      <!-- 图片实现等宽高 -->
      <img :src="this.backgroundUrl"
           alt=""
           v-if="!this.fun.isTextEmpty(this.backgroundUrl)"
           class="imgClass">
      <img src="../../assets/images/img_default.png"
           alt=""
           v-if="this.fun.isTextEmpty(this.backgroundUrl)"
           class="imgClass">
    </div>
    <div class="content">
      <img src="../../assets/images/agreen_video@2x.png"
           alt=""
           class="icon_video"
           @click="gotoRelease">
      <p class="text">视频</p>
      <van-checkbox v-model="checked"
                    class="textCheck">阅读并同意<span style="color:#1c96fe;"
              @click.stop="gotoAgreement">《用户协议》</span></van-checkbox>
      <!--<transition name="bounce">-->
        <!--<span class="btnClass"-->
              <!--v-if="isDisagree">请先阅读并同意《用户协议》</span>-->
      <!--</transition>-->
    </div>
    <div style="height: 2.8125rem;"></div>
    <mt-popup v-model="showAgreement"
              class="mint-popup-3"
              position="right"
              closeOnClickModal="true"
              modal="false"
              style="z-index:9999;">
      <div class="city-info">
        <mt-header fixed
                   title="协议">
          <mt-button icon="back"
                     @click="popClose"
                     slot="left">
          </mt-button>
        </mt-header>
        <div>
          <div style="height: 2.5rem;clear: both;"></div>

          <div id="a_content"
               v-html="protocol_content">
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      backgroundUrl: "",
      checked: true,
      isDisagree: false,
      showAgreement: false,
      protocol_content: ""
    };
  },
  activated() {
    this.init();
    this.getBackground();
    this.getAgreement();
  },
  computed: {},
  methods: {
    init() {
      this.checked = true;
      this.backgroundUrl = "";
      this.isDisagree = false;
      this.showAgreement = false;
      this.protocol_content = "";
    },
    //获取背景图
    getBackground() {
      $http.get("plugin.video-share.frontend.set.getBackground").then(res => {
        if (res.result === 1) {
          this.backgroundUrl = res.data.background;
        } else {
          console.log(res.msg);
        }
      });
    },
    getAgreement() {
      $http.get("plugin.video-share.frontend.set.getAgreement").then(res => {
        if (res.result == 1) {
          this.protocol_content = res.data.agreement;
        } else {
          this.protocol_content = res.msg;
        }
      });
    },
    gotoRelease() {
      if (this.checked) {
        localStorage.removeItem("shareVideoPath");
        this.$router.push(this.fun.getUrl("releaseVideo", {}));
      } else {
        Toast("请先勾选阅读并同意《用户协议》");
        this.isDisagree = false;
        setTimeout(() => {
          this.isDisagree = true;
        }, 0);
      }
    },
    gotoAgreement() {
      this.showAgreement = true;
    },
    popClose() {
      this.showAgreement = false;
    }
  },
  watch: {
    checked(val) {
      if (val) {
        this.isDisagree = false;
      }
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
#vidaoAreement {
  .image-box {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    .imgClass {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .icon_video {
      width: 5rem;
      height: 5rem;
      margin-top: 1.6rem;
    }
    .text {
      font-size: 1rem;
      margin: 0.59rem auto 1rem;
    }
    .textCheck {
      color: #999999;
      margin: 0 auto;
    }
    .bounce-enter-active {
      animation: bounce-in 0.2s;
    }
    .bounce-leave-active {
      animation: bounce-in 0.2s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    .btnClass {
      display: block;
      width: 15rem;
      height: 2rem;
      background-color: #dddddd;
      border-radius: 0.25rem;
      color: #333333;
      line-height: 2rem;
      text-align: center;
      margin: 0.75rem auto 0;
    }
  }
  .city-info {
    overflow-y: scroll;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
  .mint-header {
    background: none;
    color: #666;
    border-bottom: 0.0625rem solid #e8e8e8;
  }
  #a_content {
    margin: 0 20px;
  }
}
</style>
