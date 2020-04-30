<template>
  <div>
    <!--<c-title :hide="false" :text="title">-->
    <!--</c-title>-->
    <!--<div style="height: 40px"></div>-->
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
  import cTitle from "components/title";
  import { Toast } from "mint-ui";

  export default {
    data() {
      return {
        content: "",
        title: ""
      };
    },
    activated() {
      this.getData();
      if (this.$route.query.show === "agreement") {
        this.title = "用户协议";
      } else {
        this.title = "隐私政策";
      }
      this.fun.setWXTitle(this.title);
    },
    methods: {
      getData() {
        let that = this;
        $http
          .get("plugin.app-set.frontend.set.index", {}, "加载中")
          .then(
            function(response) {
              if (response.result === 1) {
                if (that.$route.query.show === "agreement") {
                  that.content = response.data.agreement;
                } else {
                  that.content = response.data.privacy;
                }
              } else {
                Toast(response.msg);
              }
            },
            function(response) {
              console.log(response);
            }
          );
      }
    },
    components: {
      cTitle
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .content {
    padding: 1rem;
  }
</style>
