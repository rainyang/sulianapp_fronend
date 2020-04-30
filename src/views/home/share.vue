<template>
  <div id="share">
    <div class="content" :style="{width: fun.getPhoneEnv() == 3 ? '375px': ''}">
      <div class="ImgBg">
        <div class="top"></div>
        <div class="poster">
          <img v-if="share_poster.app_share_show==1 && is_loaded==true" :src="share_poster.PosterUrl" style="width:100%;height:100%;border-radius:0.5rem">
          <img v-if="share_poster.app_share_show==0 && is_loaded==true" src="../../assets/images/share_pic_normal@2x.png" alt="" style="width:100%;height:100%;border-radius:0.5rem">
        </div>
        <div class="button">
          <yd-button type="hollow" shape="circle" @click.native="save()" v-if="share_poster.app_share_show==1">
            <img src="../../assets/images/share_pic@2x.png" class="icon">
            保存图片
          </yd-button>
          <yd-button type="hollow" shape="circle" @click.native="share_btn('1')">
            <img src="../../assets/images/share_link@2x.png" class="icon">
            分享链接
          </yd-button>
          <yd-button type="hollow" shape="circle" @click.native="share_btn('2')" v-if="share_poster.app_share_show==1">
            <img src="../../assets/images/share_posters@2x.png" class="icon">
            分享海报
          </yd-button>
          <yd-button type="hollow" shape="circle" @click.native="siteBack()" v-if="share_poster.app_share_show!=1">
            返回
          </yd-button>
        </div>
        <!-- 分享说明 -->
        <div class="content-text" v-if="share_poster.app_share_show==1">
          <div class="title">
            <div class="line">&nbsp;</div>
            <div class="text">分享说明</div>
            <div class="line">&nbsp;</div>
          </div>
          <!-- 自定义内容 -->
          <div v-html="explain" style="margin-bottom:50px;text-align:left;padding:0 0.75rem">
            
          </div>
        </div>
        <div>
          <a href="#" ref="alink" download="w3c"></a>
        </div>
      </div>


    </div>

    <!-- <mt-button class="share_btn" type="danger" @click="share_btn" size="large"
      >分享
    </mt-button>
    <mt-button class="black_btn" type="default" @click="siteBack" size="large"
      >返回
    </mt-button> -->
  </div>
</template>


<script>
var site_uniacid = 0;
var site_type = 0;
import { Indicator, Toast } from "mint-ui";
import {MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      sharetitle: "",
      sharedesc: "",
      shareimg: "",
      sharelink: "",
      share_poster:{
        PosterUrl: "",
        app_share_show: 0,
        qrUrl:'',
      },
      explain:'',
      is_loaded:false,
    };
  },
    
  mounted() {},
  methods: {
    save() {
      let that = this;
      MessageBox.alert("请长按海报保存");
      // var alink = document.createElement("a");
      // alink.href = "https://dev4.yunzmall.com/addons/yun_shop/storage/app/public/goods/9/9-398-7540.png";
      // alink.download = "";
      // alink.click();
    },
    share_btn(x) {
      this.Sharesinit(x);
    },
    //获取分享数据
    Sharesinit(x) {
      var that = this;
      var _url = document.location.href;
      var json = {
        url: _url,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result == 1) {
            that.Shares(response.data,x);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //设置分享内容
    Shares(data,x) {
      var that = this;
      var prrtocol = document.location.protocol;
      var domain = window.location.host;
      var sharedata = data.share;

      if (sharedata) {
        that.sharetitle = that.fun.isTextEmpty(sharedata.title)
          ? data.shop.shop.name
          : data.share.title;
        that.shareimg = that.fun.isTextEmpty(sharedata.icon)
          ? data.shop.shop.logo
          : data.share.icon;
        that.sharedesc = that.fun.isTextEmpty(sharedata.desc)
          ? data.shop.shop.name
          : data.share.desc;
      } else if(data.shop.shop){
        that.sharetitle = data.shop.shop.name;
        that.shareimg = data.shop.shop.logo;
        that.sharedesc = data.shop.shop.name;
      } else {
        that.sharetitle ="";
        that.shareimg = "";
        that.sharedesc = "";
      }
      //判断分享链接还是分享海报
      if(x==1) {
        that.sharelink =
        prrtocol +
        "//" +
        domain +
        "/addons/yun_shop/?#"+window.localStorage.getItem("share_path")+"?i=" +
        this.fun.getKeyByI() +
        "&type=" +
        this.fun.getTyep() +
        "&mid=" +
        data.info.uid +
        "&shop_id=";

      } else {
        that.sharelink = that.share_poster.qrUrl;
      }
      console.log(that.sharelink);
      YDB.Share(
        that.sharetitle,
        that.sharedesc,
        that.shareimg,
        that.sharelink,
        "Sharesback"
      );
    },
    //分享回调
    Sharesback(state) {
      if (state == "success") {
        Toast("分享成功");
      } else if (state == "fail") {
        Toast("分享失败");
      } else {
        Toast("分享取消");
      }
      this.siteBack();
    },
    //返回前一页面
    siteBack() {
      this.$router.go(-1);
    },
    //获得APP分享海报数据
    getSharePoster() {
      var that = this;
      $http.post("plugin.app-set.frontend.app-poster.createAppPoster", {}).then(
        function(response) {
          if (response.result == 1) {
            that.share_poster.PosterUrl = response.data.PosterUrl;
            that.share_poster.app_share_show = response.data.app_share_show?response.data.app_share_show:0;
            that.share_poster.qrUrl = response.data.qrUrl;
            that.is_loaded = true;
            if(that.share_poster.app_share_show == 1) {
              console.log("hahahahaha");
              that.getShareExplain();
            }
          }
          else {
            MessageBox.alert(response.msg)
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    // 获得APP分享说明
    getShareExplain() {
      var that = this;
      $http.post("plugin.app-set.frontend.app-poster.getAppShareExplain", {}).then(
        function(response) {
          if (response.result == 1) {
            that.explain = response.data.share_explain;
          }
          else {
            MessageBox.alert(response.msg)
          }
        },
        function(response) {
          console.log(response);
        }
      );
    }
  },
  activated() {
    site_uniacid = this.fun.getKeyByI();
    site_type = this.fun.getTyep();
    // this.Sharesinit();
    this.getSharePoster(); // 获得分享
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#share {
  background: #fb4937;
  color:#fff;
  margin-bottom: 2rem;
  min-height: 100vh;
  .ImgBg {
    background: url("../../assets/images/share_bg@2x.png") no-repeat;
    min-height: 100vh;
    .top {
      width: 100%;
      height:2.5rem;
    }
    .poster {
      margin: 0 auto;
      margin-bottom:2.5rem;
      width: 273px;
      height:456px;
      border-radius: 0.5rem;
      border:#fff 1px solid;
    }
    .button {
      width: 293px;
      margin: 0 auto;
      padding:1rem 0;
      .icon {
        width:14px;
        height:14px;
        position: relative;
        top: 2px;
      }
    }
    .content-text {
      margin-top:1rem;
      .title {
        display: flex;
        height: 2rem;
        width: 100%;
        flex-direction:row;
        padding: 0 0.75rem;
        .line{
          flex:1;
          height: 2px;
          position: relative;
          top: 50%;
          background: #fff; 
        }
        .text{
          line-height: 1.5rem;
          flex:1;
          font-size:1.5rem;
          font-weight: 800;
        }
      }
    }
  }

}
// .share_btn {
//   position: fixed;
//   bottom: 8.125rem;
//   left: calc(5%)
// }
// .black_btn {
//   position: fixed;
//   bottom: 5rem;
//   left: calc(5%)
// }
</style>
