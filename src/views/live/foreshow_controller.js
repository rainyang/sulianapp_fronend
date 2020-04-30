import { Toast, MessageBox } from "mint-ui";
import html2canvas from "html2canvas";

let timefore = null;

var innerHeight = document.body.clientHeight;
export default {
  data() {
    return {
      innerHeight: innerHeight,
      star_time:null,
      time: "",
      Day: "01", //剩余天
      Hour: "03", //剩余小时
      Min: "32", //剩余分钟
      Sec: "34", //剩余秒
      stop: false, //判断活动是否结束
      show: false,
      loadingImg: true,
      dataURL: "",
      info:{
        avatar:null,
        nickname: null,
        qr_code:null,
        cover:null
      },
      isSetNotice: false,
      end: null,
      PosterData:{}
    };
  },
  activated() {
    this.getData();
    this.getPoster();
  },
  methods: {
    initData() {
      this.time = "";
      this.Day = ""; //剩余天
      this.Hour = ""; //剩余小时
      this.Min = ""; //剩余分钟
      this.Sec = ""; //剩余秒
      this.show = false;
    },
    getData(){
      $http
      .post('plugin.room.frontend.live-list.room-notice',{id: this.$route.params.id},"").then(response => {
        if (response.result === 1) {
          if(response.data.status == 3){
            Toast("已开播，正在为您跳至直播间！");
            this.$router.push(this.fun.getUrl("livePage", {id:this.$route.params.id, type:'livePlay'}));
            return;
          }
          if(response.data.status == 4){
            Toast("直播已结束，正在为您跳至主播页面！");
            this.$router.push(this.fun.getUrl("anchorDetail", {id:this.info.anchor_member_id}));
            return;
          }
          this.info = response.data;
          this.end = response.data.live_time;//开播时间
          this.isSetNotice = response.data.notice == 1?true:false;//是否已订阅开播提醒
          this.countdown();
          this.initShare();
        } else {
          Toast(response.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    getPoster(){
      let that =this;
      $http
      .post('plugin.room.frontend.live-list.room-post',{id: this.$route.params.id,shareType:'foreshow'},"").then(response => {
        if (response.result === 1) {
          this.PosterData = response.data;
          this.$nextTick(()=>{
            setTimeout(()=>{
              that.saveImg();
            },1000);
            setTimeout(()=>{
              that.loadingImg = false;
            },3000);
          });
        } else {
          Toast(response.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    showPoster(){
      let that = this;
      if(!this.loadingImg&&this.dataURL) {
        this.show = true;
      }else{
        Toast("正在为您生成海报中...");
        setTimeout(()=>{
          that.show = true;
        },1800);
      }
      // if(!this.dataURL) {
      //   setTimeout(()=>{
      //     that.saveImg();
      //   },500);
      //   setTimeout(()=>{
      //     that.loadingImg = false;
      //   },2500);
      // }
    },
    cancelNotice() {
      $http
      .post('plugin.room.frontend.live-list.cancel-notice',{id: this.$route.params.id},"").then(response => {
        if (response.result === 1) {
          Toast("已取消开播提醒");
          this.isSetNotice = false;
        } else {
          Toast(response.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    showToast() {
      // if(this.isSetNotice){
      //   Toast("您已设置开播提醒，无需重复订阅！");
      //   return;
      // }
      $http
      .post('plugin.room.frontend.live-list.play-notice',{id: this.$route.params.id},"").then(response => {
        if (response.result === 1) {
          Toast("提醒成功");
          this.isSetNotice = true;
        } else {
          Toast(response.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    shareMessage() {
      if (this.fun.getTyep() == 5) {
      }
      MessageBox.alert("请生成海报或点击右上角分享");
    },
    //初始化分享设置
    initShare() {
      let json = {
        url:this.fun.isIosOrAndroid() === "android"? window.location.href: window.initUrl};
      $http.post("member.member.wxJsSdkConfig", json).then(
        response => {
          if (response.result === 1) {
            // var cs = data.shop.cservice;
            if (response.data.config) {
              this.share(response.data);
            }
          } else {
            console.error(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = that.PosterData.nickname;
        let _imgUrl = that.PosterData.cover;
        let _desc = "邀请您进入直播间";

        let _link = document.location.href;
        _link = that.fun.isMid(_link, data.info.uid);

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    },
    saveImg() {
      var content = document.getElementById("code_box");
      const that = this;
      html2canvas(content, {
        backgroundColor: null // 解决生成的图片有白边
      }).then(canvas => {
        that.dataURL = canvas.toDataURL("image/png"); //创建base64图片
        document.getElementById("thecanvas").setAttribute("src", that.dataURL);
      });
    },
    comeLive(){
      this.$router.push(this.fun.getUrl("livePage", {id:this.$route.params.id, type:'livePlay'}));
    },
    //活动倒计时
    countdown() {
      // 当前时间戳
      let that = this;
      let now = null;
      now = Date.parse(new Date()) / 1000;
      if (this.end - now <= 0) {
        this.stop = true;
        clearTimeout(timefore);
        console.log("已开播。。。。。");
        return;
      }

      let msec = 0;
      // if (now >= this.star_time) {
        // 相差的秒数
        msec = this.end - now;
      //   console.log("已开播");
      // } else {
      //   msec = this.star_time - now;
      // }


      // 计算的时间
      let day = parseInt(msec / 60 / 60 / 24);

      let hr = parseInt((msec / 60 / 60) % 24);
      let min = parseInt((msec / 60) % 60);
      let sec = parseInt(msec % 60);
      // 个位数前补零
      day = day > 9 ? day : "0" + day;
      hr = hr > 9 ? hr : "0" + hr;
      min = min > 9 ? min : "0" + min;
      sec = sec > 9 ? sec : "0" + sec;
      // 控制台打印
      // this.time=`${day}天 ${hr}小时 ${min}分钟 ${sec}秒`
      (this.Day = day), (this.Hour = hr), (this.Min = min), (this.Sec = sec);
      // 一秒后递归
      timefore = setTimeout(() => {
        that.countdown();
      }, 1000);
    },
    gotoAnchor(){
      if(!this.info.anchor_member_id){
        return;
      }
      this.$router.push(this.fun.getUrl("anchorDetail", {id:this.info.anchor_member_id}));
    },
    goto() {
      // if (window.history.length <= 1) {
      //   this.$router.push(this.fun.getUrl("home", {}));
      // } else {
      //   this.$router.go(-1);
      // }
      this.$router.push(this.fun.getUrl("liveList", {}));
    }
  },
  computed:{
    nameEllipsis(){
      if(this.PosterData.m_nickname){
        return this.PosterData.m_nickname.length>4?this.PosterData.m_nickname.substring(0,4)+'...':this.PosterData.m_nickname;
      }
    }
  },
  components: {}
};
