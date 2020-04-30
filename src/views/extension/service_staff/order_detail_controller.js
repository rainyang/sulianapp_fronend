import cTitle from "components/title";
import { Toast, Indicator } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多

export default {
  mixins: [scrollMixin],
  data() {
    return {
      member: {},
      datas: {},
      order_id: "",
      address: {}, //收货信息
      has_many_order_goods: [],
      fileList1: [],
      fileList2: [],
      showImgArr: [],
      imgIndex: 1,
      show: false,
      photosize: 1024 * 1024 * 20
    };
  },
  activated() {
    this.order_id = this.$route.params.order_id;
    console.log(this.order_id);
    this.into();
    this.getData();
  },
  methods: {
    into() {
      this.member = {};
      this.datas = {};
      this.address = {}; //收货信息
      this.fileList1 = [];
      this.fileList2 = [];
      this.showImgArr = [];
      this.imgIndex = 1;
      this.show = false;
    },
    showimg(ind, tag) {
      if (tag == 1) {
        this.showImgArr = this.fileList1;
      } else {
        this.showImgArr = this.fileList2;
      }
      this.imgIndex = ind;
      this.show = true;
    },
    getData() {
      let that = this;
      $http
        .get("plugin.staging-buy-car.frontend.ser-order.detail", {
          id: that.order_id
        })
        .then(
          response => {
            if (response.result === 1) {
              that.datas = response.data;
              that.address = that.datas.has_one_order.address;
              that.has_many_order_goods =
                that.datas.has_one_order.has_many_order_goods;
              that.fileList2 = response.data.send_voucher
                ? response.data.send_voucher
                : []; //已交车才会有交车凭证
              that.fileList1 = response.data.on_car_voucher
                ? response.data.on_car_voucher
                : [];
            } else {
              Toast({
                message: response.msg,
                duration: 800
              });
              that.$router.go(-1);
            }
          },
          response => {
            console.log(response.msg);
          }
        );
    },
    // 判断多图上传，循环onRead_1方法
    multipleMethod_1(e, flag) {
      if (e && e.length) {
        for (let i = 0; i < e.length; i++) {
          this.onRead_1(e[i], flag);
        }
      } else {
        this.onRead_1(e, flag);
      }
    },
    // vant 多图片上传
    onRead_1(e, flag) {
      // console.log(e.file)
      let That = this;
      Indicator.open("上传中");
      let fd = new FormData();
      if (flag === true) {
        fd.append("file", e);
      } else {
        fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      axios
        .post(this.fun.getRealUrl("upload.uploadPic"), fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result === 1) {
            Indicator.close();
            if (That.datas.status == 1) {
              That.fileList1.push(responseData.data.img_url);
            } else if (That.datas.status == 2 && That.datas.send_status == 4) {
              That.fileList2.push(responseData.data.img_url);
            }
          } else {
            Indicator.close();
            Toast(responseData.msg);
          }
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
        });
    },
    onphotosize(e) {
      this.imgPreview(e.file, 2);
    },
    imgPreview(file, callback) {
      let self = this;
      // 判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片转成base64格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
            // 最大尺寸限制
            var maxWidth = 400,
              maxHeight = 400;
            // 目标尺寸
            var targetWidth = originWidth,
              targetHeight = originHeight;
            // 图片尺寸超过400x400的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
              if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(
                  maxWidth * (originHeight / originWidth)
                );
              } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(
                  maxHeight * (originWidth / originHeight)
                );
              }
            }

            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            // canvas转为blob并上传
            canvas.toBlob(function(blob) {
              // 图片ajax上传
              if (callback === 1) {
                self.onRead(blob, true);
              } else {
                // self.onRead_1(blob, true)
                self.multipleMethod_1(blob, true);
              }
            }, file.type || "image/png");
          };
        };
      }
    },
    removeImg: function(delIndex, tag) {
      if (tag == 1) {
        this.fileList1.splice(delIndex, 1);
      } else {
        this.fileList2.splice(delIndex, 1);
      }
    },
    options(x) {
      let that = this;
      let _url = "";
      let json = {
        id: that.order_id
      };
      if (x == 0) {
        _url = "plugin.staging-buy-car.frontend.ser-order.order-taking";
      }
      if (x == 1) {
        if (that.fileList1.length == 0) {
          Toast({
            message: "请上传上牌凭证！",
            duration: 800
          });
          return;
        }
        json.voucher = that.fileList1;
        _url = "plugin.staging-buy-car.frontend.ser-order.shang-pai";
      }
      if (x == 3) {
        if (that.fileList2.length == 0) {
          Toast({
            message: "请交车上传凭证！",
            duration: 800
          });
          return;
        }
        json.voucher = that.fileList2;
        _url = "plugin.staging-buy-car.frontend.ser-order.jiao-che";
      }
      if (x == 2) {
        _url = "plugin.staging-buy-car.frontend.ser-order.get-jiao-che";
      }
      $http.post(_url, json).then(
        response => {
          if (response.result === 1) {
            // this.isLoadMore = true;
            Toast({
              message: response.msg,
              duration: 800
            });
            that.into();
            that.getData();
          } else {
            Toast({
              message: response.msg,
              duration: 3000
            });
          }
        },
        response => {
          console.log(response.msg);
        }
      );
    }
  },
  components: { cTitle }
};
