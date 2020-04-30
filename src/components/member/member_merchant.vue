<template>
  <div
    v-if="(Order.part && Order.part.length > 0) || (Order.more && Order.more.length > 0)"
    id="templet_box"
    class="member-designer"
    :style="{
      backgroundColor: Params.merchantbgcolor,
      backgroundImage:
        'url(' + (Params.merchantbg == '2' ? Params.bgimg : '') + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <div
      class="extension_plate"
      v-if="Params.merchantstyle == 1
      "
    >
      <h1 :style="{ color: Params.merchanttitlecolor }">
        <div class="spare"></div>
        {{ Params.merchanttitle }}
      </h1>
      <ul class="box" id="template02">
        <template v-if="Order.part && Order.part.length > 0" v-for="item in Order.part">
          <li
            @click="pluginGoto(item)"
          >
            <i class="iconfont" :class="item.class"></i>
            <span>{{ item.title }}</span>
          </li>
        </template>
        <li v-for="item in Order.more" v-if="Order.more && Order.more.length > 0" @click="gotoUrl(item)">
          <img class="imgurl" :src="item.imgurl" alt="" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>

    <template v-if="Params.merchantstyle == 2">
      <van-collapse v-model="activeNames">
        <van-collapse-item
          name="1"
          v-if="Order.part && Order.part.length > 0"
        >
          <div slot="title" class="title">
            <div class="spare"></div>
            <h3 :style="{ color: Params.merchanttitlecolor }">
              {{ Params.merchanttitle }}
            </h3>
          </div>

          <div class="cart">
            <template v-if="Order.part && Order.part.length > 0" v-for="item in Order.part" >
              <div
                  class="list1"
                  @click="pluginGoto(item)"
              >
                <yd-icon
                    slot="icon"
                    :class="item.class"
                    custom
                    size="1.625rem"
                    color="#f15353"
                    style="margin-right:0.375rem"
                ></yd-icon>
                <span slot="text">{{ item.title }}</span>
                <i class="fa fa-angle-right"></i>
              </div>
            </template>
            <div
              class="list1"
              v-if="Order.more && Order.more.length > 0"
              v-for="item in Order.more"
              @click="gotoUrl(item)"
            >
              <i class="more-icon" :class="item.icon"></i>
              <span slot="text">{{ item.title }}</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </template>
  </div>
</template>

<script>
export default {
  props: ["Order", "Params", "member_item"],
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    gotoUrl(item) {
      if(item.hrefurl){
        window.location.href = item.hrefurl;
      }
    },
    pluginGoto(item) {
      if (item.name == "article") {
        this.$router.push(
          this.fun.getUrl(item.url, {
            id: "0"
          })
        );
      } else if (item.name == "courier") {
        window.localStorage.setItem("couriername", item.title);
        this.$router.push(this.fun.getUrl(item.url));
      } else if (item.name == "supplier") {
        this.$router.push(
          this.fun.getUrl(item.url, {
            uid: this.member_item.uid
          })
        );
      } else {
        this.$router.push(this.fun.getUrl(item.url));
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.tool-box {
  display: -webkit-box;
  display: -webkit-flex;
}
.more-icon{
  font-size: 1.3rem;
  color: rgb(241, 83, 83);
  margin-left: 0.1rem;
  margin-right: 0.375rem;
  line-height: 2.75rem;
}
#template02 {
  .iconfont {
    display: inline-block;
    font-size: 1.75rem;
    color: rgb(241, 83, 83);
  }
  .icon-member-apply1 {
    background: url("../../assets/images/member/member_a(9).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-apply1:before {
    content: "";
  }
  .icon-member-supplier {
    background: url("../../assets/images/member/member_a(53).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-supplier:before {
    content: "";
  }
  .icon-member-replenishment {
    background: url("../../assets/images/member/member_a(67).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-replenishment:before {
    content: "";
  }
  .icon-member-express-list {
    background: url("../../assets/images/member/member_a(68).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-express-list:before {
    content: "";
  }
  .icon-member_hotel {
    background: url("../../assets/images/member/member_a(56).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member_hotel:before {
    content: "";
  }
  .icon-member-hotel-apply {
    width: 1.75rem;
    height: 1.75rem;
    margin-bottom: .11em;
  }
  .icon-member-store-apply1 {
    background: url("../../assets/images/member/member_a(27).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-store-apply1:before {
    content: "";
  }
  .icon-member_store {
    background: url("../../assets/images/member/member_a(26).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member_store:before {
    content: "";
  }
  .icon-member-cashier {
    background: url("../../assets/images/member/member_a(34).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-cashier::before{
    content:"";
  }
  .icon-member-mendian1 {
    background: url("../../assets/images/member/member_a(40).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member-mendian1:before {
    content: "";
  }
  .icon-delivery_order{
    width: 1.75rem;
    height: 1.75rem;
    margin-bottom: .11em;
  }
  .icon-service_station{
    width: 1.75rem;
    height: 1.75rem;
    margin-bottom: .11em;
  }
  .icon-member_voice_center {
    background: url("../../assets/images/member/member_a(75).png") no-repeat
    center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-member_voice_center:before {
    content: "";
  }
}
</style>
