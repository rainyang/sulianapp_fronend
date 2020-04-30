import cTitle from "../components/title";
// import District from "ydui-district/dist/gov_province_city_area_id";
import { Indicator, Toast } from "mint-ui";

export default {
  data() {
    var now = new Date();
    var year = now.getFullYear(); // 年
    var month = now.getMonth() + 1; // 月
    var day = now.getDate(); // 日
    let today = year + "-" + month + "-" + day;
    return {
      diyform: {},
      diydata: [],
      upload_name: "", // 点击上传图片的名字
      datas: [], // 已提交表单后,回显遍历的数组
      share_description: "", // 分享描述
      uploadUrl: "",
      status: 0, // 是否已提交
      types: {
        "0": "diyinput",
        "1": "diytextarea",
        "3": "diycheckbox",
        "4": "diyradio",
        "5": "diyimg",
        "2": "diyselect",
        "7": "diydate",
        "9": "diycity",
        "99": "diypwd",
        "88": "diyusername"
      },
      pickerValue: today,
      showCity: false,
      district: district,
      currentDateKey: "",
      currentCityKey: "",
      checks: [],
      isValidation: true,
      activity_id: "",
      form_id: "",
      conference: {},
      intro: false,
      thumb: "",
      description: "", // 详情信息

      loading: false,
      goodsId: "",
      optionsId: "",
      total: ""
    };
  },

  mounted() {},
  methods: {
    showIntro() {
      this.intro = true;
    },
    setCity(ret) {
      var retCity = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
      // console.log("retCity", retCity);
      // console.log("currentCityKey", this.currentCityKey);
      this.diydata.forEach(item => {
        if (item.name == this.currentCityKey) {
          this.$set(item, "value", retCity);
        }
      });
    },
    openPicker(name) {
      this.currentDateKey = name;
      this.$refs.picker.open();
    },
    setDate(ret) {
      // console.log(ret.Format("yyyy-MM-dd"));
      this.diydata.forEach(item => {
        if (item.name == this.currentDateKey) {
          this.$set(item, "value", ret.Format("yyyy-MM-dd"));
        }
      });
    },
    // 获得具体表单的名字
    chooseUpload(name) {
      this.upload_name = name;
      // console.log(this.upload_name);
      return true;
    },
    // vant 多其他图片上传
    onRead_2(e, flag) {
      if (flag !== true) {
        if (e.file.size > this.photosize) {
          this.imgPreview(e.file, 3);
          return false;
        }
      }
      var That = this;
      var real_length = 0;
      var max_length = 0;
      var real_list1 = [];
      var real_list2 = [];
      var index = 0;
      var real_name = "";
      for (let i = 0; i < this.diydata.length; i++) {
        if (this.upload_name == this.diydata[i].name) {
          real_name = this.diydata[i].name;
          // console.log(real_name);
          index = i;
          max_length = this.diydata[i].data.tp_max;
          real_list1 = this.diydata[i][real_name + "Value1"];
          real_list2 = this.diydata[i][real_name + "Value2"];
          // console.log(this.diydata[i][real_name + "Value1"]);
          break;
        }
      }
      let fd = new FormData();
      if (
        this.diydata[index][real_name + "Length"] ==
          this.diydata[index].data.tp_max ||
        this.diydata[index][real_name + "Length"] >=
          this.diydata[index].data.tp_max
      ) {
        this.$notify({
          background: "#fef0f0",
          message: "图片数量已达到上限",
          color: "#f56c6c"
        });
        return false;
      }
      if (flag === true) {
        fd.append("file", e);
      } else {
        fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      fd.append("attach", "upload");

      // 添加加载提示
      Indicator.open(" ");
      axios
        .post(this.uploadUrl, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData.result == 1) {
            this.diydata[index][real_name + "Length"]++;
            this.diydata[index][real_name + "Value1"].push({
              url: responseData.data.img
            });
            // console.log(this.diydata[index][real_name + "Value1"]);

            if (flag === true) {
              this.diydata[index][real_name + "Value2"].push({
                url: URL.createObjectURL(e)
              });
            } else {
              this.diydata[index][real_name + "Value2"].push({
                url: URL.createObjectURL(e.file)
              });
            }
            Indicator.close();
          } else {
            Toast(responseData.msg);
            Indicator.close();
          }
        })
        .catch(error => {
          console.log(error);
          Indicator.close();
        });
    },
    removeImg_1: function(item, delIndex) {
      // console.log(item);
      var index = 0;
      var real_name = "";
      for (let i = 0; i < this.diydata.length; i++) {
        if (item.name == this.diydata[i].name) {
          real_name = this.diydata[i].name;
          // console.log(real_name);
          index = i;
          break;
        }
      }
      this.diydata[index][real_name + "Value1"].splice(delIndex, 1);
      this.diydata[index][real_name + "Value2"].splice(delIndex, 1);
      this.diydata[index][real_name + "Length"] = this.diydata[index][
        real_name + "Value1"
      ].length;
    },
    openCity(name) {
      this.currentCityKey = name;
    },
    goback() {
      this.$router.go(-1);
    },
    validation() {
      this.isValidation = true;
      this.diydata.forEach(item => {
        if (item.data.tp_must == 1 && !item.value && item.type != "diyimg") {
          // console.log(item.data.tp_name, item.value);
          Toast(item.data.tp_name + "必须填写哦");
          this.isValidation = false;
        }
        if (item.data.tp_must == 1 && item.type == "diyimg") {
          if (item[item.name + "Length"] <= 0) {
            this.isValidation = false;
            Toast(item.data.tp_name + "必须填写哦");
          }
        }
        if (item.type == "diycheckbox" && item.value.length == 0) {
          console.log(item.data.tp_name, item.value);

          Toast(item.data.tp_name + "必须填写哦");
          this.isValidation = false;
        }
      });
    },
    submit() {
      // console.log("submit");
      // console.log(this.upload_name);
      this.validation();
      // console.log(this.diydata);
      if (!this.isValidation) {
        return;
      }

      this.submitConference();
    },

    submitConference() {
      var that = this;
      var formData = [];
      var formObject = {};
      this.diydata.forEach(item => {
        if (item.type == "diyimg") {
          var arr = [];
          for (let i = 0; i < item[item.name + "Value1"].length; i++) {
            arr.push(item[item.name + "Value1"][i].url);
          }
          formObject[item.name] = arr;
        } else {
          formObject[item.name] = item.value;
        }
      });

      // console.log("formObject", formObject);
      formData.push(formObject);
      console.log(formData);
      $http
        .post("plugin.diyform.api.diy-form.save-form-data", {
          form_data: formData,
          form_id: that.form_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              Toast("提交成功");
              if (that.goodsId) {
                that.$router.push(
                  that.fun.getUrl("goodsorder", {
                    tag: "-2", //立即购买,
                    goodsId: that.goodsId,
                    optionsId: that.optionsId,
                    total: that.total
                  })
                );
              } else {
                that.getDiyForm();
              }
            } else {
              Toast(response.msg);
              if (that.goodsId) {
                that.fun.getUrl("activityDiyForm", {
                  id: that.form_id,
                  goodsId: that.goodsId,
                  optionsId: that.optionsId,
                  total: that.total
                });
              } else {
                that.getDiyForm();
              }
              return;
            }
          },
          function(response) {
            alert("fail");
          }
        );
    },

    getDiyForm() {
      var that = this;
      $http
        .get("plugin.diyform.api.diy-form.getDiyFormTypeMemberData", {
          form_id: this.form_id
        })
        .then(
          function(response) {
            if (response.result === 1) {
              that.loading = true;
              if (response.data.status === 1) {
                that.status = response.data.status;
                that.diyform = response.data;
                that.thumb = response.data.thumb;
                that.share_description = response.data.share_description;
                that.description = response.data.description;
                const fields = that.diyform.fields;
                for (let field in fields) {
                  var list = {
                    title: fields[field].tp_name,
                    value: fields[field].value,
                    data_type: fields[field].data_type
                  };
                  if (list.data_type == "3") {
                    list.value = fields[field].value.join(",");
                  }
                  that.datas.push(list);
                }
                return 0;
              }
              that.diyform = response.data;
              var fields = that.diyform.fields;
              that.thumb = response.data.thumb;
              that.share_description = response.data.share_description;
              that.description = response.data.description;
              that.status = response.data.status;
              for (var field in fields) {
                // console.log(fields);
                // console.log(fields[field].data_type);
                // console.log(that.types[fields[field].data_type]);
                if (that.types[fields[field].data_type] == "diycheckbox") {
                  var f = {
                    name: field,
                    data: fields[field],
                    value: [],
                    type: that.types[fields[field].data_type]
                  };
                } else if (that.types[fields[field].data_type] == "diydate") {
                  var f = {
                    name: field,
                    data: fields[field],
                    value: "",
                    type: that.types[fields[field].data_type]
                  };
                  if (f.data.default_time_type === 1) {
                    var now = new Date();
                    var year = now.getFullYear(); // 年
                    var month = now.getMonth() + 1; // 月
                    var day = now.getDate(); // 日
                    var today = year + "-" + month + "-" + day;
                    f.value = today;
                  } else if (f.data.default_time_type === 2) {
                    f.value = f.data.default_time;
                  }
                } else if (that.types[fields[field].data_type] == "diyimg") {
                  var f = {
                    name: field,
                    data: fields[field],
                    value: "",
                    type: that.types[fields[field].data_type]
                  };
                  f[field + "Length"] = 0;
                  f[field + "Value1"] = [];
                  f[field + "Value2"] = [];
                } else {
                  var f = {
                    name: field,
                    data: fields[field],
                    value: "",
                    type: that.types[fields[field].data_type]
                  };
                }

                that.diydata.push(f);
              }
            } else {
              Toast(response.msg)
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    // 初始化分享设置
    initShare() {
      let that = this;
      let _url = document.location.href;
      let json = {
        url: _url,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep(),
        mid: this.fun.getKeyByMid()
      };
      $http.post("member.member.wxJsSdkConfig", json).then(
        function(response) {
          if (response.result == 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          } else {
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    // 组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        let _title = that.fun.isTextEmpty(that.diyform.title)
          ? data.shop.name
          : that.diyform.title;
        let _link = that.fun.isMid(document.location.href, data.info.uid);
        let _imgUrl = that.fun.isTextEmpty(that.thumb)
          ? data.shop.icon
          : that.thumb;
        let _desc = that.fun.isTextEmpty(that.share_description)
          ? data.shop.name
          : that.share_description;

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          desc: _desc,
          success: function() {
            // Toast("分享成功")
          }
          // cancel: function () {
          //   Toast("取消分享")
          // }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          // type: 'link', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // Toast("分享成功")
          }
          // cancel: function () {
          //   Toast("取消分享")
          // }
        });
      });
    }
  },
  activated() {
    this.diydata = [];
    this.datas = [];
    this.form_id = this.$route.params.id;
    this.goodsId = this.$route.params.goodsId;
    this.optionsId = this.$route.params.optionsId;
    this.total = this.$route.params.total;
    if (!this.form_id) {
      Toast("该表单不存在！");
      this.$router.push(this.fun.getUrl("member"));
    }
    this.getDiyForm();
    this.initShare();
    this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
  },
  created() {},
  components: { cTitle }
};
