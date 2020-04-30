<template>
  <div>
    <div :class="
        'user_box' +
          Params.memberlevelstyle +
          Params.memberportrait
      ">
      <div class="head-box"
           style="overflow:hidden"
           :style="{
          backgroundColor: Params.memberbgcolor,
          backgroundImage:
            'url(' +
            (Params.memberbg == '2' ? Params.bgimg : '') +
            ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }">
        <div class="user_img user_img_style1">
          <img :src="member_item.avatar"
               alt="头像" />
        </div>
        <ul class="user_name user_name_style1">
          <li class="name">
            <span class="name_a"
                  :style="{ color: Params.membernamecolor }">{{ member_item.nickname }}</span><span class="member_id"
                  v-if="Params.memberID==1">{{
                $store.state.langService.language.langMember.langMemberId
              }}:{{ member_item.uid }}</span>
          </li>
          <li class="code"
              v-if="member_item.is_agent && member_item.inviteCode && member_item.inviteCode.status">
            邀请码：{{ member_item.inviteCode.code
            }}<span v-clipboard:copy="member_item.inviteCode.code"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">复制
            </span>
          </li>
          <li v-else
              style="height: 30px"></li>
        </ul>
      </div>

      <!--	会员等级样式一   -->
      <div class="member_grade1"
           @click="gotoMemberGrade"
           v-if="
          Params.memberlevel == 1 && Params.memberlevelstyle == 1
        ">
        <i class="iconfont icon-member-enter"></i>
        <span :style="{ color: Params.memberlevelcolor }">{{ Params.memberleveltype == '1'? member_item.level_name :Params.levelname }}</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <!--	会员等级样式三   -->
      <div class="member_grade3"
           @click="gotoMemberGrade"
           v-if="
          Params.memberlevel == 1 && Params.memberlevelstyle == 3
        ">
        <div class="grade">
          <i class="iconfont icon-member-enter"></i>
          <span :style="{ color: Params.memberlevelcolor }">
            {{ Params.memberleveltype == '1'? member_item.level_name :Params.levelname }}
          </span>
        </div>
        <div class="member_btn">
          <span>点击查看</span>
          <i class="iconfont icon-member_look"></i>
        </div>
      </div>
    </div>

    <ul class="user_sum user_sum_style1"
        v-if="Params.membercredit||Params.memberpoint ||Params.memberincome||Params.memberwhitelove||Params.memberredlove">
      <li v-if="Params.memberwhitelove && member_item.love_show.unable_love_show==1">
        <router-link :to="fun.getUrl('love_index')">
          <span class="sum"> <small></small>{{ member_item.love_show.unable_data }}</span>
          <br /><span class="text">{{ member_item.love_show.unable_text }}</span>
        </router-link>
      </li>
      <li v-if="Params.memberredlove && member_item.love_show.usable_love_show==1">
        <router-link :to="fun.getUrl('love_index')">
          <span class="sum"> <small></small>{{ member_item.love_show.usable_data }}</span>
          <br /><span class="text">{{ member_item.love_show.usable_text }}</span>
        </router-link>
      </li>
      <li v-if="Params.membercredit && member_item.credit">
        <router-link :to="fun.getUrl('balance')"><span class="sum"><span>¥</span>{{ member_item.credit.data }}</span><br /><span class="text">{{ member_item.credit.text }}</span></router-link>
      </li>
      <li v-if="Params.memberpoint && member_item.integral">
        <router-link :to="fun.getUrl('integral_v2')"><span class="sum">{{ member_item.integral.data }}</span><br /><span class="text">{{ member_item.integral.text }}</span></router-link>
      </li>
      <li v-if="Params.memberincome">
        <router-link :to="fun.getUrl('extension')"><span class="sum"><span>¥</span>{{ member_item.income || "0.00" }}</span><br /><span class="text">{{name_of_withdrawal_text}}</span></router-link>
      </li>
    </ul>

    <!--	会员等级样式二   -->
    <div class="member_grade2"
         v-if="
          Params.memberlevel == 1 && Params.memberlevelstyle == 2
        ">
      <i class="iconfont icon-member-enter"></i>
      <span class="member_name" :style="{ color: Params.memberlevelcolor }">{{ Params.memberleveltype == '1'? member_item.level_name :Params.levelname}}</span>
      <div class="member_btn"
           @click="gotoMemberGrade">
        <span>点击查看</span>
        <i class="iconfont icon-member_look"></i>
      </div>
    </div>

    <div id="orderlist"
         :style="{
        backgroundColor: Params.memberordercolor,
        backgroundImage:
          'url(' +
          (Params.memberorderbg == '2'
            ? Params.memberorderimg
            : '') +
          ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }">
      <div class="ordertltie">
        <router-link :to="fun.getUrl('orderlist', { status: '0' })">
          <div class="spare"></div>
          <div class="ordername">
            {{ Params.memberordername }}
          </div>
          <i class="fa fa-angle-right"></i>
        </router-link>
      </div>
      <div class="order_all">
        <router-link :to="fun.getUrl('orderlist', { status: '1' })">
          <div class="order_pub"
               v-if="Order[0]">
            <div class="badge"
                 v-if="waitPay != 0">{{ waitPay }}</div>
            <img :src="Order[0].imgurl"
                 alt="" />
            <br />{{ Order[0].text }}
          </div>
        </router-link>
        <router-link :to="fun.getUrl('orderlist', { status: '2' })">
          <div class="order_pub"
               v-if="Order[1]">
            <div class="badge "
                 v-if="waitSend != 0">
              {{ waitSend }}
            </div>
            <img :src="Order[1].imgurl"
                 alt="" />
            <br />{{ Order[1].text }}
          </div>
        </router-link>
        <router-link :to="fun.getUrl('orderlist', { status: '3' })">
          <div class="order_pub"
               v-if="Order[2]">
            <div class="badge "
                 v-if="waitReceive != 0">
              {{ waitReceive }}
            </div>
            <img :src="Order[2].imgurl"
                 alt="" />
            <br />{{ Order[2].text }}
          </div>
        </router-link>
        <router-link :to="fun.getUrl('aftersaleslist')">
          <div class="order_pub"
               v-if="Order[3]">
            <div class="badge"
                 v-if="waitrRefund != 0">
              {{ waitrRefund }}
            </div>
            <img :src="Order[3].imgurl"
                 alt="" />
            <br />{{ Order[3].text }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["Params", "Order", "member_item", "member_order", "isClick"],
  data() {
    return {
      waitPay: 0,
      waitSend: 0,
      waitReceive: 0,
      waitrRefund: 0,
      name_of_withdrawal_text: ""
    };
  },
  mounted() {
    if (this.member_order.order) {
      // 0 待付款 1待发货 2待收货 3完成
      this.member_order.order.map(item => {
        if (item.status == 0) {
          this.waitPay = item.total;
        } else if (item.status == 1) {
          this.waitSend = item.total;
        } else if (item.status == 2) {
          this.waitReceive = item.total;
        } else if (item.status == 11) {
          this.waitrRefund = item.total;
        }
      });
    }
    this.customizeIncome();
  },
  watch: {
    member_order: {
      handler(newValue, oldValue) {
        if (this.member_order.order) {
          this.member_order.order.map(item => {
            if (item.status == 0) {
              this.waitPay = item.total;
            } else if (item.status == 1) {
              this.waitSend = item.total;
            } else if (item.status == 2) {
              this.waitReceive = item.total;
            } else if (item.status == 11) {
              this.waitrRefund = item.total;
            }
          });
        }
      },
      deep: true
    }
  },
  methods: {
    gotoMemberGrade() {
      if (this.isClick && this.Params.memberleveltype == '1') {
        this.$router.push(this.fun.getUrl("MemberGradeList"));
      }else if (this.isClick && this.Params.memberleveltype == '2'){
        if(!this.Params.levelname && !this.Params.isagent){
          this.$router.push(this.fun.getUrl("ExtensionApply"));
        }else {
          this.$router.push(this.fun.getUrl("teamAgentCenter"));
        }
      }else if (this.isClick && this.Params.memberleveltype == '3'){
        if(!this.Params.levelname && !this.Params.isagent){
          this.$router.push(this.fun.getUrl("ExtensionApply"));
        }else {
          this.$router.push(this.fun.getUrl("distribution"));
        }
      }
    },
    // 复制邀请码
    onCopy: function(e) {
      Toast({
        message: "复制成功",
        duration: 1000
      });
    },
    //自定义提现收入语言
    customizeIncome() {
      let mailLanguage = this.fun.initMailLanguage();
      //自定义提现字段
      this.name_of_withdrawal_text = mailLanguage.income.name_of_withdrawal;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
//会员中心装修--start
#member-all {
  .user_sum_style1 {
    width: 100%;
    background: #fff;
  }
  .user_box11,
  .user_box12,
  .user_box13,
  .user_box21,
  .user_box22,
  .user_box23,
  .user_box31,
  .user_box32,
  .user_box33 {
    background-color: #fff;
    position: relative;
  }
  .head-box {
    padding-bottom: 10px;
  }
  .user_img {
    width: 64px;
    height: 64px;
    border-radius: 64px;
    overflow: hidden;
    background: #f2f2f2;
    border: solid 2px #ebebeb;
  }
  .user_img img {
    width: 100%;
  }
  .user_name {
    margin-left: 10px;
    margin-top: 10px;
  }
  .user_name .name {
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    text-align: center;
  }
  .name .name_a {
    line-height: 2rem;
    // flex: 0 0 90px;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    font-weight: bold;
    font-size: 16px;
    margin-top: 0;
  }
  .name .member_id {
    padding: 2px 10px;
    font-size: 12px;
    background-color: #f5f5f5;
    border-radius: 16px;
    margin-left: 6px;
    margin-top: 0;
    display: flex;
    align-self: center;
  }
  .user_name .code {
    font-size: 14px;
    margin-top: 10px;
    color: #8c8c8c;
    display: flex;
    display: -webkit-flex;
  }
  .code span {
    padding: 2px 10px;
    font-size: 12px;
    font-weight: normal;
    background-color: #f5f5f5;
    border-radius: 16px;
    margin-left: 6px;
    margin-top: 0;
  }
  .user_sum {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    text-align: center;
    padding: 14px 0;
  }
  .user_sum li {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .user_sum .sum {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 6px;
  }
  .sum span {
    font-size: 12px;
  }
  .user_sum .text {
    color: #8c8c8c;
    font-size: 12px;
  }
  .member_grade1 {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 4px 10px;
    background: -webkit-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #3b3b4f, #9898a4); /* 标准的语法 */
    border-radius: 32px;
    color: #e6c785;
    font-size: 12px;
    position: absolute;
    right: 5px;
    top: 10px;
  }
  .member_grade1 .iconfont {
    font-size: 20px;
    margin-right: 4px;
    color: #e6c785;
  }
  .member_grade2 {
    width: 95%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    border-radius: 8px 8px 0 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    padding: 0 10px;
    background: -webkit-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      to right,
      #3b3b4f,
      #9898a4
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #3b3b4f, #9898a4); /* 标准的语法 */
    overflow: hidden;
    position: relative;
  }
  .member_grade2 .member_name {
    color: #e6c785;
    font-size: 16px;
    font-weight: bold;
    z-index: 1;
  }
  .member_grade2 .member_btn {
    background: -webkit-linear-gradient(
      to right,
      #f2e1aa,
      #e6c785
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      to right,
      #f2e1aa,
      #e6c785
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      to right,
      #f2e1aa,
      #e6c785
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f2e1aa, #e6c785); /* 标准的语法 */
    color: #3c3c50;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    border-radius: 16px;
    font-size: 12px;
  }
  .member_grade2 .member_btn .icon-member_look {
    color: #3c3c50;
    font-size: 10px;
  }
  .member_grade2 .icon-member-enter {
    position: absolute;
    top: -10px;
    left: -20px;
    font-size: 156px;
    color: #333;
    opacity: 0.4;
    z-index: 0;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
  }
  .member_grade3 {
    width: 100px;
    height: 79px;
    padding: 2px 8px;
    background-image: url("../../assets/images/member/grade_bg@2x.png");
    background-repeat: no-repeat;
    background-position: -6px 0;
  }
  .member_grade3 .icon-member-enter {
    font-size: 24px;
    color: #e6c785;
  }
  .member_grade3 .grade {
    margin-top: 10px;
    margin-left: 16px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    color: #e6c785;
    font-size: 10px;
    transform: rotate(10deg);
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
  }
  .member_grade3 .member_btn {
    margin-left: 10px;
    border-radius: 16px;
    font-size: 10px;
    border: solid 1px #e6c785;
    color: #e6c785;
    text-align: center;
    padding: 1px 0;
    width: 80px;
    background: rgba(230, 199, 133, 0.1);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    transform: rotate(10deg);
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
  }
  .member_grade3 .member_btn .icon-member_look {
    font-size: 10px;
    margin-left: 4px;
    color: #e6c785;
  }
  /*样式一居左*/

  .user_box11 {
    .user_img_style1 {
      margin-left: 14px;
      margin-top: 20px;
      float: left;
    }
    .user_name_style1 {
      float: left;
      margin-left: 10px;
      margin-top: 28px;
    }
    .member_grade1 {
      top: 55px;
    }
  }
  /*样式一居中*/
  .user_box12 {
    .head-box {
      padding-top: 20px;
    }
    .member_id {
      line-height: 1.7rem;
    }
    //padding-top: 20px;
    .user_img_style1 {
      margin: 0 auto 10px;
    }
    .name,
    .code {
      justify-content: center;
      -webkit-justify-content: center;
    }
    .user_name_style1 {
      margin: 0 auto;
      text-align: center;
    }
    .member_grade1 {
      top: 20px;
    }
  }

  /*样式一居右*/
  .user_box13 {
    .user_img_style1 {
      position: absolute;
      top: 35px;
      right: 108px;
      float: left;
    }
    .user_name_style1 {
      float: left;
      margin-left: 14px;
      margin-top: 28px;
    }
    .member_grade1 {
      top: 55px;
    }
  }

  /*样式二居左*/
  .user_box21 {
    .user_img_style1 {
      margin-left: 14px;
      margin-top: 20px;
      float: left;
    }
    .user_name_style1 {
      float: left;
      margin-left: 10px;
      margin-top: 28px;
    }
    .member_grade1 {
      top: 40px;
    }
  }

  /*样式二居中*/
  .user_box22 {
    .head-box {
      padding-top: 20px;
    }
    .member_id {
      line-height: 1.7rem;
    }
    //padding-top: 20px;
    .user_img_style1 {
      margin: 0 auto 10px;
    }
    .name,
    .code {
      justify-content: center;
      -webkit-justify-content: center;
    }
    .user_name_style1 {
      margin: 0 auto;
      text-align: center;
    }
    .member_grade1 {
      top: 20px;
    }
  }

  /*样式二居右*/
  .user_box23 {
    .user_img_style1 {
      position: absolute;
      top: 25px;
      right: 45px;
      float: right;
    }
    .user_name_style1 {
      float: left;
      margin-left: 25px;
      margin-top: 28px;
    }
    .member_grade1 {
      top: 40px;
    }
  }

  /*样式三居左*/
  .user_box31 {
    .head-box {
      padding-top: 20px;
    }
    .user_img_style1 {
      margin-left: 14px;
      //margin-top: 20px;
      float: left;
    }
    .user_name_style1 {
      float: left;
      margin-left: 10px;
      //margin-top: 28px;
    }
    .member_grade1 {
      top: 40px;
    }
    .member_grade3 {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  /*样式三居中*/

  .user_box32 {
    .head-box {
      padding-top: 20px;
    }
    .member_id {
      line-height: 1.7rem;
    }
    //padding-top: 20px;
    .user_img_style1 {
      margin: 0 auto 10px;
    }
    .user_name_style1 {
      width: 60%;
      text-align: center;
      margin: 0 auto;
    }
    .member_grade1 {
      top: 40px;
    }
    .member_grade3 {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  /*样式三居右*/

  .user_box33 {
    .user_img_style1 {
      position: absolute;
      top: 20px;
      left: 186px;
      float: left;
    }
    .user_name_style1 {
      float: left;
      margin-left: 14px;
      margin-top: 28px;
    }
    .member_grade1 {
      top: 40px;
    }
    .member_grade3 {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  /*		*/

  .order_box,
  .tool {
    margin-top: 10px;
    background-color: #fff;
  }
  .order_box .title,
  .tool .title {
    padding: 0 14px;
    height: 40px;
    line-height: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .title .icon-member_right {
    font-size: 20px;
    color: #c9c9c9;
  }
  .title .left {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
  .title .left .square {
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #f15353;
    border-radius: 2px;
    margin-right: 6px;
  }
  .title .left h2 {
    font-size: 16px;
  }
  .order_box .state,
  .tool .item {
    display: flex;
    display: -webkit-flex;
    padding: 10px 0;
    text-align: center;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
  }
  .state li,
  .item li {
    width: 25%;
    margin-bottom: 10px;
  }
  .state li .iconfont,
  .item li .iconfont {
    font-size: 24px;
    color: #f15353;
    display: block;
    margin: 0 auto;
  }
  .state,
  li span,
  .item li span {
    font-size: 12px;
    color: #666;
    margin-top: 6px;
  }
}
.order_all {
  display: -webkit-box;
  display: -webkit-flex;
  padding: 0.875rem 0;
  color: #666;
  overflow: hidden;
  display: flex;
  img {
    width: 2.25rem;
    height: 2.25rem;
  }
  a {
    width: 25%;
    -webkit-box-flex: 1;
  }
  .order_pub {
    padding-top: 0.125rem;
    text-align: center;
    color: #666;
    position: relative;
    font-size: 12px;
    i {
      font-size: 24px;
      color: #999;
      display: inline-block;
    }
  }
}
//会员中心装修--end

#orderlist {
  background: #fff;
  margin: 0.625rem 0;
}

.ordertltie {
  text-align: left;
  width: 100%;
  height: 2.5rem;
  // border-bottom: 0.0625rem solid #ebebeb;
  box-sizing: border-box;
  position: relative;
  a {
    display: flex;
    padding: 0 14px;
  }
  .spare {
    width: 0.25rem;
    height: 1rem;
    border-radius: 0.0625rem;
    background-color: #f15353;
    margin-top: 0.75rem;
    margin-right: 0.375rem;
  }
  i {
    line-height: 2.5rem;
    color: #c9c9c9;
    font-size: 1.25rem;
    float: right;
    position: absolute;
    right: 0.875rem;
  }
  a .ordername {
    float: left;
    line-height: 2.5rem;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
}

.order_pub {
  box-sizing: border-box;
  i {
    font-size: 24px;
    color: #999;
  }
}

#orderlist .puball {
  color: #000000;
  border-left: 0.0625rem solid #8f9295;
}

.badge {
  position: absolute;
  left: 56%;
  top: 0.125rem;
  background-color: #fff;
  border-radius: 0.625rem;
  color: #f15353;
  line-height: 0.875rem;
  font-size: 12px;
  padding: 0 0.3125rem;
  border: solid 1px #f15353;
}

.badge-hotel {
  position: absolute;
  left: 56%;
  top: 0.125rem;
  background-color: #fff;
  border: solid 1px #57d5ff;
  border-radius: 0.625rem;
  color: #57d5ff;
  line-height: 0.875rem;
  font-size: 12px;
  padding: 0 0.3125rem;
}

.list1 .ico {
  display: inline-block;
  margin-right: 0.625rem;
  color: #929292;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
  background-size: 1.25rem;
  float: left;
  margin-top: 0.75rem;
}

.list1 .marketing {
  background-image: url(../../assets/images/marketing.png);
}

.list1 .extension {
  background-image: url(../../assets/images/extension.png);
}

.list1 .newsetting {
  background-image: url(../../assets/images/newsetting.png);
}

.allorder {
  float: right;
  color: #909090;
  margin-right: 0.625rem;
  text-decoration: none;
  font-size: 12px;
}

.order {
  width: 100%;
  background: #fff;
  margin-top: 0.625rem;
  border-bottom: 0.0625rem solid #f5f3f3;
}

.order_all {
  display: -webkit-box;
  display: -webkit-flex;
  padding: 0.875rem 0;
  color: #333;
  overflow: hidden;
  display: flex;
  a {
    width: 25%;
    -webkit-box-flex: 1;
  }
}

.order_all a i {
  font-size: 1.625rem;
  margin-bottom: 0.25rem;
  // width: 1.25rem;
  // height: 1.25rem;
  background-size: 1.25rem;
}

.order_all a .money {
  background-image: url(../../assets/images/money.png);
}

.order_all a .box {
  background-image: url(../../assets/images/box.png);
}

.order_all a .car {
  background-image: url(../../assets/images/car.png);
}

.order_all a .refun {
  background-image: url(../../assets/images/refun.png);
}

.order_pub {
  // border-left: 0.0625rem solid #f3f3f3;
  padding-top: 0.125rem;
  text-align: center;
  color: #666;
  position: relative;
  font-size: 12px;
  i {
    font-size: 24px;
    color: #999;
  }
  .icon-stay_pay {
    background: url("../../assets/images/myOrder_a.png") no-repeat center;
    background-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon-stay_pay:before {
    content: "";
  }
  .icon-stay_send {
    background: url("../../assets/images/myOrder_b.png") no-repeat center;
    background-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon-stay_send:before {
    content: "";
  }
  .icon-group_ing {
    background: url("../../assets/images/pintuaning.png") no-repeat center;
    background-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon-group_ing:before {
    content: "";
  }
  .icon-stay_receive {
    background: url("../../assets/images/myOrder_c.png") no-repeat center;
    background-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon-stay_receive:before {
    content: "";
  }
  .icon-stay_refund {
    background: url("../../assets/images/myOrder_d.png") no-repeat center;
    background-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon-stay_refund:before {
    content: "";
  }
}

.order_pub span {
  height: 14px;
  background: #f30;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  right: 6%;
  padding: 0 0.3125rem;
  font-size: 12px;
  color: #fff;
  line-height: 0.875rem;
}

.list1 .ico {
  display: inline-block;
  margin-right: 0.625rem;
  color: #929292;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
  background-size: 1.25rem;
  float: left;
  margin-top: 0.75rem;
}

.list1 .marketing {
  background-image: url(../../assets/images/marketing.png);
}

.list1 .extension {
  background-image: url(../../assets/images/extension.png);
}

.list1 .newsetting {
  background-image: url(../../assets/images/newsetting.png);
}

.allorder {
  float: right;
  color: #909090;
  margin-right: 0.625rem;
  text-decoration: none;
  font-size: 12px;
}

.order {
  width: 100%;
  background: #fff;
  margin-top: 0.625rem;
  border-bottom: 0.0625rem solid #f5f3f3;
}

.order_all {
  display: -webkit-box;
  display: -webkit-flex;
  padding: 0.875rem 0;
  color: #333;
  overflow: hidden;
  display: flex;
  a {
    width: 25%;
    -webkit-box-flex: 1;
  }
}

.order_all a .money {
  background-image: url(../../assets/images/money.png);
}

.order_all a .box {
  background-image: url(../../assets/images/box.png);
}

.order_all a .car {
  background-image: url(../../assets/images/car.png);
}

.order_all a .refun {
  background-image: url(../../assets/images/refun.png);
}

.order_pub {
  // border-left: 0.0625rem solid #f3f3f3;
  padding-top: 0.125rem;
  text-align: center;
  color: #666;
  position: relative;
  font-size: 12px;
}

.order_pub span {
  height: 14px;
  background: #f30;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  right: 6%;
  padding: 0 0.3125rem;
  font-size: 12px;
  color: #fff;
  line-height: 0.875rem;
}

.set a {
  color: #fff;
  font-size: 24px;
}

#ewm {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(140, 140, 140, 0.72);
  z-index: 9;
  display: none;
  padding-top: 14%;
  .pic {
    width: 70%;
    margin: auto;
    background: #fff;
    border-radius: 0.625rem;
    overflow: hidden;
    .title {
      padding: 0.625rem;
      border-bottom: 0.0625rem solid #ebebeb;
      img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        .set a {
          color: #fff;
          font-size: 24px;
        }
        #ewm {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: rgba(140, 140, 140, 0.72);
          z-index: 9;
          display: none;
          padding-top: 14%;
          .pic {
            width: 70%;
            margin: auto;
            background: #fff;
            border-radius: 0.625rem;
            overflow: hidden;
            .title {
              padding: 0.625rem;
              border-bottom: 0.0625rem solid #ebebeb;
              img {
                height: 2.5rem;
                width: 2.5rem;
                border-radius: 50%;
                display: inline-block;
                vertical-align: middle;
              }
              span {
                margin-left: 0.875rem;
                vertical-align: middle;
                font-size: 16px;
              }
            }
            .ewm {
              z-index: 40;
              img {
                width: 50%;
                display: block;
                float: right;
              }
            }
          }
          img {
            width: 100%;
            display: block;
          }
        }
      }
    }
  }
  img {
    width: 100%;
    display: block;
  }
}

.carts {
  h3 {
    font-size: 16px;
    text-align: left;
  }
}
</style>
