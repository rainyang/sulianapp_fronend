<template>
  <div>
    <mt-header fixed
               :title="text"
               v-if="!hide"
               :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
      <mt-button icon="back"
                 @click="goto"
                 slot="left"
                 v-if="!goback"></mt-button>
      <template v-if="tolink">
        <router-link :to="fun.getUrl(tolink,setParams,setQuery)"
                     slot="right"
                     style="font-size:0.9rem">{{totext}}</router-link>
      </template>
      <slot name="edit"
            slot="right"></slot>
    </mt-header>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: [
    "text",
    "hide",
    "totext",
    "tolink",
    "goback",
    "url",
    "setParams",
    "setQuery",
    'nopay'
  ],
  data() {
    return {
      toi: this.fun.getKeyByI()
    };
  },
  activated() {
  },
  mounted: function() {
    //this.tempInfo();
  },
  methods: {
    goto() {
      if (window.history.length <= 1) {
        this.$router.push(this.fun.getUrl("home", {}));
      } else if (this.url) {
        this.$router.push(this.fun.getUrl(this.url));
      }else if(this.nopay){
        this.$router.push(this.fun.getUrl("notice"));
      }else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.mint-header {
  background: none;
  color: #666;
}
.is-fixed .mint-header-title {
  font-weight: bold;
}
.mint-header.is-fixed {
  border-bottom: 0.0625rem solid #e8e8e8;
  background: #fff;
  z-index: 99;
}
.is-right a {
  font-size: 10px;
}
.pcStyle {
  width: 375px;
  margin: 0 auto;
}
</style>
