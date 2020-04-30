<template>
  <div>
    <div class="top-box">
      <div class="title">个人中心</div>
      <div class="member-box">
        <div class="left">
          <img :src="Member.avatar" alt="">
        </div>
        <div class="right">
          <p class="name">{{Member.nickname}}</p>
          <p>{{Member.name}} <span class="tag" v-if="Member.status == 1">已认证</span></p>
          <p class="company">{{Member.company_name}} <span class="tag" v-if="Member.company_status == 1">已认证</span></p>
          <div><span class="tag" v-if="Member.company_status != 1 && Member.status == 1"  @click="toSign">企业未认证</span></div>
          <div style="margin-top: 10px"><span class="tag" v-if="Member.company_status != 1 && Member.status != 1"  @click="toSign">未认证</span></div>
        </div>
      </div>
    </div>
    <div class="content" :class="[fun.getPhoneEnv() == 3 ? 'pcStyle' : '']">
      <div class="file-box">
        <p class="enable">合同数量（份）</p>
        <div class="buy"><span style="flex: 1;font-size: 18px;font-weight: bold">{{Member.contract_num_sum}}</span><span class="buy-btn" @click="toGoodList">购买</span></div>
      </div>
      <div class="file-box">
        <p class="enable">已用合同数量（份）</p>
        <div class="buy"><span style="flex: 1;font-size: 18px;font-weight: bold">{{Member.use_num_sum}}</span></div>
      </div>
      <div class="file-box">
        <p class="enable">剩余合同数量（份）</p>
        <div class="buy"><span style="flex: 1;font-size: 18px;font-weight: bold">{{Member.rest_num_sum}}</span></div>
      </div>
      <div class="item" @click="toBills">
        <div class="img-box"><img src="../../../assets/images/yht_icon_zhandan@2x.png" alt=""></div>
        <p class="item-title">合同账单</p>
        <i class="iconfont icon-advertise-next"></i>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast, MessageBox } from "mint-ui";

  export default {
    data() {
      return {
        Member: {},
      };
    },
    activated() {
      this.geData();
    },
    methods: {
      toSign() {
        this.$router.push(this.fun.getUrl("signGuide",{show: 'identify'}));
      },
      toBills() {
        this.$router.push(this.fun.getUrl("contractBills"));
      },
      toGoodList() {
        this.$router.push(this.fun.getUrl("searchAll"));
      },
      geData() {
        $http
          .get("plugin.yun-sign.frontend.h5.member.get-info", {}, "...").then(response => {
            if (response.result === 1) {
              this.Member = response.data;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      },
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .top-box {
    background-image: linear-gradient(-27deg, #3679ff 0%, #7ec8ff 100%);
    height: 20rem;
    color: #FFFFFF;
    .title {
      padding: 10px 0 20px 0;
      font-size: 20px;
    }
  }

  .member-box {
    display: flex;
    margin: 0 20px;
    .left {
      flex: 0 0 4rem;
      width: 4rem;
      height: 4rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-left: 10px;
      justify-content: center;
      .company {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p {
        display: flex;
      }
    }
    .tag {
      background-color: rgba(255, 255, 255, 0.28);
      border-radius: 15px;
      font-size: 12px;
      padding: 2px 7px;
      margin-left: 5px;
    }
    .name {
      font-size: 16px;
    }
  }

  .content {
    position: fixed;
    width: 100%;
    height: 76%;
    background: #FFFFFF;
    bottom: 0;
    left: 0;
    border-radius: 20px 20px 0 0;
    padding: 15px;
    .file-box {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    .enable {
      color: #999999;
    }
    .buy {
      display: flex;
      color: #367aff;
      padding: 10px;
    }
    .buy-btn {
      color: #FFFFFF;
      background-color: #367aff;
      border-radius: 10px;
      font-size: 12px;
      padding: 2px 15px;
    }
    .item {
      display: flex;
      align-self: center;
      justify-self: center;
      .item-title {
        font-weight: bold;
        flex: 1;
        text-align: left;
        display: flex;
        align-self: center;
      }
      .icon-advertise-next {
        display: flex;
        align-self: center;
      }
      .img-box {
        width: 1.75rem;
        height: 1.75rem;
        flex: 0 0 1.75rem;
        img {
          width: 100%;
        }
      }
    }
  }
  .pcStyle{
    width: 376px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
