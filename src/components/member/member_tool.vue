<template>
  <div v-if="Order.part && Order.part.length > 0 || Order.more && Order.more.length > 0"
       id="tool"
       class="member-designer"
       :style="{
      backgroundColor: Params.toolbgcolor,
      backgroundImage:
        'url(' + (Params.toolbg == '2' ? Params.bgimg : '') + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }">
    <div class="title"
         v-if="Params.toolstyle == 1">
      <div class="spare"></div>
      <h3 :style="{ color: Params.tooltitlecolor }">{{ Params.tooltitle }}</h3>
    </div>

    <ul class="tool-box"
        id="template02"
        v-if="Params.toolstyle == 1">
      <!--<li>-->
      <!--<router-link :to="fun.getUrl('collection', { selected: '1' })">-->
      <!--<i class="iconfont icon-shoucang"></i>-->
      <!--<div>收藏</div>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link :to="fun.getUrl('footprint', { selected: '1' })">-->
      <!--<i class="iconfont icon-zuji"></i>-->
      <!--<div>足迹</div>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link :to="fun.getUrl('address', { selected: '1' })">-->
      <!--<i class="iconfont icon-dizhi"></i>-->
      <!--<div>地址管理</div>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link :to="fun.getUrl('info', { item: member_item })">-->
      <!--<i class="iconfont icon-shezhi"></i>-->
      <!--<div>设置</div>-->
      <!--</router-link>-->
      <!--</li>-->

      <li v-for="item in Order.part"
          v-if="Order.part && Order.part.length > 0">
        <router-link :to="fun.getUrl(item.url)">
          <i class="iconfont"
             :class="item.class"></i>
          <div>{{ item.title }}</div>
        </router-link>
      </li>

      <li v-for="item in Order.more"
          v-if="Order.more && Order.more.length > 0"
          @click="gotoUrl(item)">
        <img class="imgurl"
             :src="item.imgurl"
             alt="" />
        <div>{{ item.title }}</div>
      </li>

      <li v-if="fun.isApp()">
        <router-link :to="fun.getUrl('message', { selected: '1' })">
          <i class="iconfont icon-icon"></i>
          <div>消息通知</div>
        </router-link>
      </li>
    </ul>

    <template v-if="Params.toolstyle == 2">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title"
               class="title"
               id="template">
            <div class="spare"></div>
            <h3 :style="{ color: Params.tooltitlecolor }">
              {{ Params.tooltitle }}
            </h3>
          </div>

          <div class="cart">
            <!--<router-link :to="fun.getUrl('collection', { selected: '1' })">-->
            <!--<div class="list1">-->
            <!--<yd-icon-->
            <!--slot="icon"-->
            <!--class="icon-shoucang"-->
            <!--custom-->
            <!--size="1.3rem"-->
            <!--color="#f15353"-->
            <!--style="margin-right:0.375rem"-->
            <!--&gt;</yd-icon>-->
            <!--<span slot="text">收藏</span>-->
            <!--<i class="fa fa-angle-right"></i>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--<router-link :to="fun.getUrl('footprint', { selected: '1' })">-->
            <!--<div class="list1">-->
            <!--<yd-icon-->
            <!--slot="icon"-->
            <!--class="icon-zuji"-->
            <!--custom-->
            <!--size="1.3rem"-->
            <!--color="#f15353"-->
            <!--style="margin-right:0.375rem"-->
            <!--&gt;</yd-icon>-->
            <!--<span slot="text">足迹</span>-->
            <!--<i class="fa fa-angle-right"></i>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--<router-link :to="fun.getUrl('address', { selected: '1' })">-->
            <!--<div class="list1">-->
            <!--<yd-icon-->
            <!--slot="icon"-->
            <!--class="icon-dizhi"-->
            <!--custom-->
            <!--size="1.3rem"-->
            <!--color="#f15353"-->
            <!--style="margin-right:0.375rem"-->
            <!--&gt;</yd-icon>-->
            <!--<span slot="text">地址管理</span>-->
            <!--<i class="fa fa-angle-right"></i>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--<router-link :to="fun.getUrl('info', { item: member_item })">-->
            <!--<div class="list1">-->
            <!--<yd-icon-->
            <!--slot="icon"-->
            <!--class="icon-shezhi"-->
            <!--custom-->
            <!--size="1.3rem"-->
            <!--color="#f15353"-->
            <!--style="margin-right:0.375rem"-->
            <!--&gt;</yd-icon>-->
            <!--<span slot="text">设置</span>-->
            <!--<i class="fa fa-angle-right"></i>-->
            <!--</div>-->
            <!--</router-link>-->
            <router-link v-if="fun.isApp()"
                         :to="fun.getUrl('message', { selected: '1' })">
              <div class="list1">
                <yd-icon slot="icon"
                         class="icon-icon"
                         custom
                         size="1.3rem"
                         color="#f15353"
                         style="margin-right:0.375rem"></yd-icon>
                <span slot="text">消息通知</span>
                <i class="fa fa-angle-right"></i>
              </div>
            </router-link>
            <template v-if="Order.part && Order.part.length > 0"
                      v-for="item in Order.part">
              <div class="list1"
                   @click="pluginGoto(item)">
                <yd-icon slot="icon"
                         :class="item.class"
                         custom
                         size="1.3rem"
                         color="#f15353"
                         style="margin-right:0.375rem"></yd-icon>
                <span slot="text">{{ item.title }}</span>
                <i class="fa fa-angle-right"></i>
              </div>
            </template>
            <div class="list1"
                 v-if="Order.more && Order.more.length > 0"
                 v-for="(item,i) in Order.more"
                 :key='i'
                 @click="gotoUrl(item)">
              <i class="more-icon"
                 :class="item.icon"></i>
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
  props: ["member_item", "Order", "Params"],
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    gotoUrl(item) {
      if (item.hrefurl) {
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
        this.$router.push(this.fun.getUrl(item.url, { selected: "1" }));
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
.more-icon {
  font-size: 1.3rem;
  color: rgb(241, 83, 83);
  margin-right: 0.375rem;
  line-height: 2.8rem;
}
#template02 {
  .iconfont {
    display: inline-block;
    font-size: 1.75rem;
    color: rgb(241, 83, 83);
  }
  // 工具图标
  .icon-shoucang {
    background: url("../../assets/images/member/tool_a(6).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-shoucang:before {
    content: "";
  }
  .icon-zuji {
    background: url("../../assets/images/member/tool_a(8).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-zuji:before {
    content: "";
  }
  .icon-guanxi {
    background: url("../../assets/images/member/tool_a(3).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-guanxi:before {
    content: "";
  }
  .icon-dizhi {
    background: url("../../assets/images/member/tool_a(1).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-dizhi:before {
    content: "";
  }
  .icon-shezhi {
    background: url("../../assets/images/member/tool_a(5).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-shezhi:before {
    content: "";
  }
  .icon-icon {
    background: url("../../assets/images/member/tool_a(9).png") no-repeat center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-icon:before {
    content: "";
  }
  .icon-shenghuojiaofei {
    background: url("../../assets/images/member/member_a(49).png") no-repeat
      center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-shenghuojiaofei:before {
    content: "";
  }
  .icon-yinhangqia {
    background: url("../../assets/images/member/tool_a(10).png") no-repeat
      center;
    background-size: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
  }
  .icon-yinhangqia:before {
    content: "";
  }
  .icon-member_pospay_validation {
    background: url("../../assets/images/member/member_a(82).png") no-repeat
      center;
    background-size: 2.5rem;
  }
  .icon-member_pospay_validation:before {
    content: "";
  }
  .icon-member_advertise_market {
    background: url("../../assets/images/member/member_a(84).png") no-repeat
      center;
    background-size: 2.5rem;
  }
  .icon-member_advertise_market:before {
    content: "";
  }
  .icon-member_posvip_cardnum {
    background: url("../../assets/images/member/member_a(83).png") no-repeat
      center;
    background-size: 2.5rem;
  }
  .icon-member_posvip_cardnum:before {
    content: "";
  }
}
</style>
