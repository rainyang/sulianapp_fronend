import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin"; //引入加载更多
import { Indicator } from "mint-ui";

export default {
  mixins: [scrollMixin],
  data() {
    return {
      activeName: "0",
      member: {},
      list: [],
      isNO: false,
      index: "",
      fileList1: [], //凭证

      //more
      page: 1, //分页数，当前页数
      isLoadMore: true, //判断是否要加载更多的标志
      total_page: 0, //总页数

      showVoucher: false, //上传凭证弹窗
      photosize: 1024 * 1024 * 5,
      imgIndex: 1,
      show: false

      // isNoMore: false
    };
  },
  activated() {
    this.activeName = "0";
    // this.isNO = false;
    this.initPageData();
    this.getMemberData();
    this.chooseActive(this.activeName);
  },
  methods: {
    getMemberData() {
      let that = this;
      $http.get("plugin.staging-buy-car.frontend.ser-order.index").then(
        response => {
          if (response.result === 1) {
            // this.isLoadMore = true;
            that.member = response.data;
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
    chooseActive(e, type) {
      let that = this;
      if (type != "refresh") {
        if (that.index == that.activeName) {
          return false;
        }
      }
      that.list = [];
      let _url = "";
      if (e == 0) {
        _url = "plugin.staging-buy-car.frontend.ser-order.wait";
      }
      if (e == 1) {
        _url = "plugin.staging-buy-car.frontend.ser-order.under-way";
      }
      if (e == 2) {
        _url = "plugin.staging-buy-car.frontend.ser-order.yi-shang-pai";
      }
      if (e == 3) {
        _url = "plugin.staging-buy-car.frontend.ser-order.jiao-che-zhong";
      }
      if (e == 4) {
        _url = "plugin.staging-buy-car.frontend.ser-order.end";
      }
      $http.get(_url).then(
        response => {
          if (response.result === 1) {
            that.isLoadMore = true;
            that.total_page = response.data.last_page;
            if (!that.total_page) {
              that.total_page = 0;
            }
            that.page = response.data.current_page;
            that.list = response.data.data;
          } else {
            Toast({
              message: response.msg,
              duration: 800
            });
          }
        },
        response => {
          console.log(response.msg);
        }
      );
      that.index = that.activeName;
    },
    options(x, item) {
      let that = this;
      let _url = "";
      if (x == 0) {
        _url = "plugin.staging-buy-car.frontend.ser-order.order-taking";
      }
      if (x == 1 || x == 3) {
        this.fileList1 = []; //清除缓存
        this.showVoucher = true; //上传凭证
        return;
      }
      if (x == 2) {
        _url = "plugin.staging-buy-car.frontend.ser-order.get-jiao-che";
      }
      $http.post(_url, { id: item.id }).then(
        response => {
          if (response.result === 1) {
            Toast({
              message: response.msg,
              duration: 800
            });
            that.chooseActive(that.activeName, "refresh");
          } else {
            Toast({
              message: response.msg,
              duration: 1500
            });
          }
        },
        response => {
          console.log(response.msg);
        }
      );
    },
    showimg(ind) {
      this.imgIndex = ind;
      this.show = true;
    },
    initPageData() {
      this.activeName = "0";
      this.index = "";
      this.member = {};
      this.list = [];

      this.isLoadMore = true;
      this.total_page = 0;
      this.page = 1;
      this.isNoMore = false;
    },
    //获取更多数据，加载更多
    getMoreData() {
      this.isLoadMore = false; // 防止多次请求分页数据
      const that = this;
      let _url = "";
      if (that.page >= that.total_page) {
        that.isNoMore = true;
        return;
      } else {
        that.page += 1;
        if (that.activeName == "0") {
          _url = "plugin.staging-buy-car.frontend.ser-order.wait";
        } else if (that.activeName == "1") {
          _url = "plugin.staging-buy-car.frontend.ser-order.under-way";
        } else if (that.activeName == "2") {
          _url = "plugin.staging-buy-car.frontend.ser-order.yi-shang-pai";
        } else if (that.activeName == "3") {
          _url = "plugin.staging-buy-car.frontend.ser-order.jiao-che-zhong";
        } else if (that.activeName == "4") {
          _url = "plugin.staging-buy-car.frontend.ser-order.end";
        }
        $http
          .get(_url, { page: that.page }, "")
          .then(res => {
            that.isLoadMore = true;
            if (res.result == 1) {
              var nextPageData = res.data.data;
              that.list = that.list.concat(nextPageData); //进行数组拼接
            } else {
              that.page = that.page - 1;
              that.isLoadMore = false;
              // that.isNoMore = true;
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //下拉刷新
    loadTop() {
      // this.initPageData();
      this.chooseActive(this.activeName);
      this.$refs.loadmore.onTopLoaded();
    },
    submitVoucher(_id) {
      let that = this;
      let _url = "";
      if (that.fileList1.length <= 0) {
        Toast({
          message: "请上传凭证！",
          duration: 800
        });
        return;
      }
      if (this.activeName == "1") {
        _url = "plugin.staging-buy-car.frontend.ser-order.shang-pai";
      } else if (this.activeName == "3") {
        _url = "plugin.staging-buy-car.frontend.ser-order.jiao-che";
      }
      $http.post(_url, { id: _id, voucher: that.fileList1 }).then(
        response => {
          if (response.result === 1) {
            Toast({
              message: response.msg,
              duration: 800
            });
            that.chooseActive(that.activeName, "refresh");
          } else {
            Toast({
              message: response.msg,
              duration: 1500
            });
          }
        },
        response => {
          console.log(response.msg);
        }
      );
    },
    gotoDetail(id) {
      let that = this;
      that.$router.push(
        that.fun.getUrl("staffOrderDetail", {
          order_id: id
        })
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
      Indicator.open("上传中");
      let fd = new FormData();
      if (flag === true) {
        fd.append("file", e);
      } else {
        fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      var That = this;
      axios
        .post(this.fun.getRealUrl("upload.uploadPic"), fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result === 1) {
            Indicator.close();
            That.fileList1.push(responseData.data.img_url);
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
    removeImg: function(delIndex) {
      this.fileList1.splice(delIndex, 1);
    }
  },
  components: { cTitle }
};
