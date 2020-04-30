import cTitle from "components/title";
import { MessageBox, Toast } from "mint-ui";

export default {
  data() {
    return {
      file: "",
      title: "",
      videoUrl: "",
      isVideo: true,
      realVideo: "",
      coverUrl: "",
      duration: 0, //视频时长
      chooseGoods: null, //商品信息
      videoPath: "", //视频链接参数
      videoCover: "", //封面图片参数
      limit: null, //视频限制时长
      uploadIng: false, //正在上传中
      videoProgress: 0,
      showUploadBtn: false, //是否显示确认上传按钮引导用户上传（解决ios无法自动播放）
      isRirst: true //避免重复上传
    };
  },
  activated() {
    this.init();
    this.getList();
    this.getPermission();
    if (
      !this.fun.isTextEmpty(JSON.parse(localStorage.getItem("shareVideoPath")))
    ) {
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("shareVideoPath")).title
        )
      ) {
        this.title = JSON.parse(localStorage.getItem("shareVideoPath")).title;
      }
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("shareVideoPath")).videoUrl
        )
      ) {
        this.videoUrl = JSON.parse(
          localStorage.getItem("shareVideoPath")
        ).videoUrl;
      }
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("shareVideoPath")).videoUrl
        )
      ) {
        this.videoPath = JSON.parse(
          localStorage.getItem("shareVideoPath")
        ).videoUrl;
      }
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("shareVideoPath")).videoCover
        )
      ) {
        this.videoCover = JSON.parse(
          localStorage.getItem("shareVideoPath")
        ).videoCover;
      }
      if (
        !this.fun.isTextEmpty(
          JSON.parse(localStorage.getItem("shareVideoPath")).file_name
        )
      ) {
        this.file = JSON.parse(
          localStorage.getItem("shareVideoPath")
        ).file_name;
      }
    }

    if (
      this.$route.query.goods_id !== undefined &&
      this.$route.query.goods_id !== null
    ) {
      this.getGoodsById();
    }
  },
  mounted() {
    // this.autoPlayAudio2();
  },
  deactivated() {},
  methods: {
    init() {
      this.title = "";
      this.file = "";
      this.videoUrl = "";
      this.isVideo = true;
      this.coverUrl = "";
      this.duration = 0;
      this.chooseGoods = null;
      this.realVideo = "";
      this.videoPath = "";
      this.videoCover = "";
      this.limit = null;
      this.uploadIng = false;
      this.showUploadBtn = false;
      this.isRirst = true;
      document.getElementById("file").value = null;
    },
    getList() {
      //获取限制时长
      let that = this;
      $http.get("plugin.video-share.frontend.set.getLimit").then(res => {
        if (res.result == 1) {
          if (!this.fun.isTextEmpty(res.data.limit)) {
            that.limit = res.data.limit;
          } else {
            that.limit = 60;
          }
        } else {
          MessageBox.alert(res.msg);
        }
      });
    },
    getGoodsById() {
      $http
        .get("plugin.video-share.frontend.goods.getGoodsById", {
          goods_id: this.$route.query.goods_id
        })
        .then(res => {
          if (res.result == 1) {
            this.chooseGoods = res.data.goods;
          } else {
            MessageBox.alert(res.msg);
          }
        });
    },
    gotoAdd() {
      this.$router.push(this.fun.getUrl("addVideoGood", {}));
    },
    //验证会员发布权限
    getPermission() {
      let that = this;
      $http.get("plugin.video-share.frontend.permission.verify").then(res => {
        if (res.result == 1) {
          if (!res.data.ret) {
            that.$router.push(that.fun.getUrl("VideoList", {}));
            MessageBox.alert(res.msg);
          }
        } else {
          MessageBox.alert(res.msg);
        }
      });
    },
    onReadVideo(e) {
      console.log(e);
      let that = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.realVideo = files[0];

      // if (files[0].type != "video/mp4") {
      //   MessageBox.alert("请上传MP4格式视频！");
      //   return;
      // }

      this.videoUrl = null;
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(files[0]); //类型1
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(files[0]); //类型2
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(files[0]); //类型3
      }
      this.videoUrl = url;
      if (this.fun.isIosOrAndroid() == "ios") {
        that.showUploadBtn = true;
      } else {
        this.getDuration();
      }
    },
    play_Upload() {
      let v = this.$refs.video;
      v.play();
      this.showUploadBtn = false;
      this.getDuration();
    },
    getDuration() {
      //获取视频或者音频时长
      let that = this;
      let v = this.$refs.video;
      v.src = this.videoUrl;
      v.addEventListener("loadedmetadata", function(_event) {
        that.duration = v.duration;
        if (that.duration < 1) {
          that.videoUrl = null;
          MessageBox.alert("视频时长太短了！");
          return;
        } else if (that.duration > Number(that.limit) + 1) {
          that.videoUrl = null;
          MessageBox.alert(`视频时长不能超过${that.limit}秒`);
          return;
        } else {
          //调用设置视频封面
          that.setSrcAndCaptureImage();
          return;
        }
      });
    },
    //获取视频封面
    setSrcAndCaptureImage() {
      let that = this;
      let v = this.$refs.video;
      v.addEventListener("loadeddata", captureImage);
      function captureImage() {
        let scale = 1;
        let canvas = document.createElement("canvas");
        canvas.width = v.videoWidth * scale;
        canvas.height = v.videoHeight * scale;
        canvas.getContext("2d").drawImage(v, 0, 0, canvas.width, canvas.height);
        that.coverUrl = canvas.toDataURL("image/png");
        console.log("肯德基", that.coverUrl);
        that.uploadAudioM(); //上传视频 --------------
        that.uploadImageM(); //上传封面 -----------------
        v.removeEventListener("loadeddata", captureImage);
      }
    },
    autoPlayAudio2() {
      let videos = this.$refs.video;
      videos.play();
      wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: "",
        timestamp: 1,
        nonceStr: "",
        signature: "",
        jsApiList: []
      });
      wx.ready(function() {
        videos.play();
      });
    },
    BtnMethos() {
      let that = this;
      if (this.fun.isTextEmpty(this.chooseGoods)) {
        //商品为空，则跳转到商品搜索页添加商品
        //本地保存标题、视频链接--------------
        let hasData = {
          title: this.title,
          videoUrl: this.videoPath,
          videoCover: this.videoCover,
          file_name: this.file
        };
        localStorage.setItem("shareVideoPath", JSON.stringify(hasData));
        this.$router.push(this.fun.getUrl("addVideoGood", {}));
      } else {
        //商品不为空，而且视频、标题已添加，则进行发布
        if (this.fun.isTextEmpty(this.title)) {
          Toast("请输入4-18个字标题");
          return;
        }
        if (this.title.length < 4) {
          MessageBox.alert("标题不小于4个字");
          return;
        }
        if (this.fun.isTextEmpty(this.videoUrl)) {
          Toast("请选择视频进行上传！");
          return;
        }
        if (!this.isRirst) {
          return;
        }
        this.isRirst = false;
        let json = {
          goods_id: this.$route.query.goods_id,
          title: this.title,
          video: this.videoPath,
          cover: this.videoCover,
          file_name: this.file
        };
        $http.post("plugin.video-share.frontend.video.sub", json).then(
          function(response) {
            if (response.result === 1) {
              that.isRirst = true;
              MessageBox.alert(response.msg);
              localStorage.removeItem("shareVideoPath");
              that.$router.push(
                that.fun.getUrl("VideoList", { from: "release" })
              );
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
    uploadAudioM() {
      //视频上传
      this.uploadIng = true;
      let that = this;
      let uploadAudio = this.fun.getRealUrl(
        "plugin.video-share.frontend.upload.uploadAudio",
        {}
      );
      let fd = new FormData();
      fd.append("file", this.realVideo); //进度百分比

      // var config = {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   onUploadProgress: progressEvent => {
      //     var complete =
      //       ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      //     this.videoProgress = complete / 100;
      //     console.log("sssssssssssssss", this.videoProgress);
      //   }
      // };
      axios
        .post(uploadAudio, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.result == 1) {
            that.videoPath = response.data.data.audio_url;
            that.file = response.data.data.file_name;
            //初始化vedio监听事件
            // that.removeListenVideo();
            //监听video
            // that.listenVideo();
            that.uploadIng = false;
            //本地保存标题、视频链接--------------
            let hasData = {
              title: that.title,
              videoUrl: that.videoPath,
              videoCover: that.videoCover,
              file_name: that.file
            };
            localStorage.setItem("shareVideoPath", JSON.stringify(hasData));
          } else {
            that.uploadIng = false;
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          that.uploadIng = false;
          console.log(error);
        });
    },
    uploadImageM() {
      //图片上传
      let that = this;
      let uploadImage = this.fun.getRealUrl(
        "plugin.video-share.frontend.upload.upload",
        {}
      );
      let fd = new FormData();
      console.log("麦当劳", this.dataURItoBlob(this.coverUrl));
      fd.append("file", this.dataURItoBlob(this.coverUrl));
      axios
        .post(uploadImage, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.result == 1) {
            that.videoCover = response.data.data.img_url;
          } else {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataURItoBlob(dataURI) {
      // 图片转成Buffer---------------------------------
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  },

  components: { cTitle }
};
