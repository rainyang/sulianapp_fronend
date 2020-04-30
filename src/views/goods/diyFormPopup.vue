<template>
  <div id="diy-form">
    <div id="member">
      <div class="form"
           :class="[index != 0 ? 'formMargin' : '']" v-if="status">
        <div v-if="thumb">
          <img :src="thumb" alt="" style="width:100%;">
        </div>
        <template v-for="item in diydata">
          <template v-if="item.type == 'diyinput'">
            <yd-cell-group>
              <yd-cell-item style="border:solid 0.0625rem #ebedf0;border-radius:4px;">
                <span slot="left">{{
                  item.data.tp_name === ""
                    ? "输入框："
                    : `${item.data.tp_name}：`
                }}</span>
                <yd-input v-if="item.data.tp_must == 1"
                          slot="right"
                          required
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"></yd-input>
                <yd-input v-if="item.data.tp_must == 0"
                          slot="right"
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <!--setting sun-->

          <template v-if="item.type == 'diyimg'">
            <yd-cell-group :title="item.data.tp_name === '' ? '图片：' : `${item.data.tp_name}：`" class="blcok">
              <div class="clearfloat"
                   style="width:100%;text-align:center;line-height:5rem;padding:1rem;border:solid 0.0625rem #ebedf0;border-radius:4px;display: flex;flex-wrap: wrap;">
                <template v-for="val in item[item.name + 'Value1']">
                  <div class="photobox"
                       style="float:left;max-width: 25%;" @click="chooseUpload(item.name)">
                    <img :src="val.url"
                         style="max-width:5rem" />
                    <van-icon @click.stop="removeImg_1(item, index)"
                              name="close"
                              style="width: 1.5rem;height: 1.5rem;position: absolute;top: 0.1rem;right: 0.1rem;color:red;font-weight:900;" />
                  </div>
                </template>
                <div @click="chooseUpload(item.name)">
                  <van-uploader :disabled="
                      item[item.name + 'Length'].length >= item.data.tp_max
                    "
                                style="display:block;"
                                :after-read="onRead_2">
                    <div style="display:flex;align-items:center;justify-content:center;width: 5rem;height: 5rem; border: 0.0625rem dashed #ebedf0;">
                      <img :src="require('../../assets/images/up_icon.png')"
                           style="max-height:3rem;"
                           class="avatar" />
                    </div>
                  </van-uploader>
                </div>
              </div>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diytextarea'">
            <yd-cell-group :title="item.data.tp_name === '' ? '文本框' : item.data.tp_name">
              <yd-cell-item style="border:solid 0.0625rem #ebedf0;border-radius:4px; ">
                <yd-textarea slot="right"
                             v-model="item.value"
                             :placeholder="item.data.placeholder"
                             maxlength="100"></yd-textarea>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycheckbox'">
            <yd-cell-group :title="item.data.tp_name === '' ? '复选框' : item.data.tp_name">
              <yd-cell-item type="checkbox"
                            v-for="(ck, i) in item.data.tp_text"
                            :key="i"
                            style="border-bottom:solid 0.0625rem #ebedf0">
                <span slot="left">{{ ck }}</span>
                <input slot="right"
                       type="checkbox"
                       :value="ck"
                       v-model="item.value" />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyselect'">
            <yd-cell-group>
              <yd-cell-item arrow
                            type="label"
                            style="border:solid 0.0625rem #ebedf0;border-radius:4px;">
                <span slot="left">{{
                  item.data.tp_name === ""
                    ? "下拉框:"
                    : `${item.data.tp_name}：`
                }}</span>
                <select slot="right"
                        v-model="item.value">
                  <option value="">请选择{{ item.data.tp_name }}</option>
                  <option :value="sitem"
                          v-for="(sitem, i) in item.data.tp_text"
                          :key="i">{{ sitem }}</option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyradio'">
            <yd-cell-group :title="item.data.tp_name === '' ? '单选框' : item.data.tp_name"
                           style="padding:0.5rem 0;">
              <yd-cell-item type="radio"
                            v-for="(ritem, i) in item.data.tp_text"
                            :key="i"
                            style="border-bottom:solid 0.0625rem #ebedf0">
                <span slot="left">{{ ritem }}</span>
                <input slot="right"
                       type="radio"
                       :value="ritem"
                       v-model="item.value" />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycity'">
            <div>
              <yd-cell-group>
                <yd-cell-item arrow style="border:solid 0.0625rem #ebedf0;border-radius:4px;">
                  <span slot="left">{{
                    item.data.tp_name === ""
                      ? "城市："
                      : `${item.data.tp_name}：`
                  }}</span>
                  <input slot="right"
                         style="width:74%;"
                         type="text"
                         @click.stop="showCity = true"
                         @click="openCity(item.name)"
                         v-model="item.value"
                         readonly
                         :placeholder="item.data.tp_name" />
                </yd-cell-item>
              </yd-cell-group>
            </div>
          </template>

          <template v-if="item.type == 'diydate'">
            <yd-cell-group>
              <yd-cell-item @click.native="openPicker(item.name)"
                            style="border:solid 0.0625rem #ebedf0;border-radius:4px;"
                            arrow>
                <span slot="left">{{
                  item.data.tp_name === "" ? "日期：" : `${item.data.tp_name}：`
                }}</span>
                <span slot="right">{{ item.value }}</span>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyusername'">
            <yd-cell-group>
              <yd-cell-item style="border:solid 0.0625rem #ebedf0;border-radius:4px;">
                <span slot="left">{{
                  item.data.tp_name === "" ? "账号:" : `${item.data.tp_name}：`
                }}</span>
                <yd-input v-if="item.data.tp_must == 1"
                          slot="right"
                          required
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"></yd-input>
                <yd-input v-if="item.data.tp_must == 0"
                          slot="right"
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>
          <template v-if="item.type == 'diypwd'">
            <yd-cell-group>
              <yd-cell-item style="border:solid 0.0625rem #ebedf0;border-radius:4px;">
                <span slot="left">{{
                  item.data.tp_name === "" ? "密码:" : `${item.data.tp_name}：`
                }}</span>
                <yd-input v-if="item.data.tp_must == 1"
                          slot="right"
                          required
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"
                          type="password"></yd-input>
                <yd-input v-if="item.data.tp_must == 0"
                          slot="right"
                          v-model="item.value"
                          v-bind:placeholder="item.data.placeholder"
                          type="password"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>
        </template>

        <mt-datetime-picker ref="picker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            @confirm="setDate"
                            v-model="pickerValue"
                            :startDate="startDate">
        </mt-datetime-picker>

        <yd-cityselect v-model="showCity"
                       :callback="setCity"
                       :items="district"></yd-cityselect>

        <yd-cityselect v-model="showCity1"
                       :callback="setCity1"
                       :items="district"></yd-cityselect>
        <div style="width:90%; margin:0 auto;padding-bottom:0.875rem">
          <yd-button size="large"
                     @click.native="submit"
                     type="primary">提交</yd-button>
        </div>
        <div v-if="description" style="padding-bottom:0.875rem;">
          <div v-html="description"></div>
        </div>
      </div>

      <!-- 这是查看 -->
      <div class="form"
           v-if="loading&&!status">
        <yd-cell-group v-for="(item, i) in diydata" :key="i" :title="item.data_type != 'diyduoxingwenben' &&item.data_type != 'diyduoxing' && item.data_type != 'diytupian' ? '' : item.title
          ">
          <yd-cell-item v-if="item.data_type != 'diyduoxingwenben'&&item.data_type != 'diyduoxing' && item.data_type != 'diytupian'"
                        style="border:solid 1px #ccc;border-radius:4px;">
            <span slot="left">{{ item.title }}</span>
            <span slot="right">{{ item.value }}</span>
          </yd-cell-item>
          <yd-cell-item v-if="item.data_type == 'diyduoxing'||item.data_type == 'diyduoxingwenben'"
                        style="border:solid 1px #ccc;border-radius:4px;">
            <yd-textarea slot="right"
                         v-model="item.value"
                         readonly="readonly"></yd-textarea>
          </yd-cell-item>
          <yd-cell-item v-if="item.data_type == 'diytupian'"
                        style="border:solid 1px #ccc;border-radius:4px;">
            <template slot="right"
                      style="width:100%;text-align:left;"
                      v-for="item1 in item.value">
              <div class="photobox"
                   style="float:left;max-width: 25%;margin-top:.5rem">
                <img :src="item1"
                     style="max-width:5rem;" />
              </div>
            </template>
          </yd-cell-item>
        </yd-cell-group>

        <mt-datetime-picker ref="picker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            @confirm="setDate"
                            v-model="pickerValue"
                            :startDate="startDate">
        </mt-datetime-picker>

        <yd-cityselect v-model="showCity"
                       :callback="setCity"
                       :items="district"></yd-cityselect>

        <yd-cityselect v-model="showCity1"
                       :callback="setCity1"
                       :items="district"></yd-cityselect>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
var haveShop = false;

export default {
  props: ["datas", "form_id", "form_data_id","status","thumb","description"],
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
      Backdata: [], // 已提交表单后,回显遍历的数组
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
      conference: {},
      intro: false,
      thumb: this.thumb,
      description: "", // 详情信息
      loading: false,
    };
  },

  methods: {
    showIntro() {
      console.log(this.intro);
      this.intro = true;
    },
    setCity(ret) {
      var retCity = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
      this.diydata.forEach(item => {
        if (item.name == this.currentCityKey) {
          this.$set(item, "value", retCity);
        }
      });
    },
    openPicker(name) {
      this.currentDateKey = name;
      console.log("name", name);
      this.$refs.picker.open();
    },
    setDate(ret) {
      console.log(ret.Format("yyyy-MM-dd"));
      this.diydata.forEach(item => {
        if (item.name == this.currentDateKey) {
          this.$set(item, "value", ret.Format("yyyy-MM-dd"));
        }
      });
    },
    // 获得具体表单的名字
    chooseUpload(name) {
      this.upload_name = name;
      console.log(this.upload_name,this.diydata);
      return true;
    },
    // vant 多其他图片上传
    onRead_2(e, flag) {
      console.log("s看见傻傻的封杀空间", this.diydata)
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
          console.log(real_name);
          index = i;
          max_length = this.diydata[i].data.tp_max;
          real_list1 = this.diydata[i][real_name + "Value1"];
          real_list2 = this.diydata[i][real_name + "Value2"];
          console.log(this.diydata[i][real_name + "Value1"]);
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
              url: responseData.data.img_url
            });
            console.log(this.diydata[index][real_name + "Value1"]);

            // if (flag === true) {
            //   this.diydata[index][real_name + "Value2"].push({
            //     url: URL.createObjectURL(e)
            //   });
            // } else {
            //   this.diydata[index][real_name + "Value2"].push({
            //     url: URL.createObjectURL(e.file)
            //   });
            // }
            // console.log("Value2:::::::",this.diydata[index][real_name + "Value2"]);
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
      console.log(item);
      var index = 0;
      var real_name = "";
      for (let i = 0; i < this.diydata.length; i++) {
        if (item.name == this.diydata[i].name) {
          real_name = this.diydata[i].name;
          console.log(real_name);
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
          console.log(item.data.tp_name, item.value);

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
      console.log("submit");
      console.log(this.upload_name);
      this.validation();
      console.log(this.diydata);
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
      formData.push(formObject);
      console.log("这是diyFormPopup最终的数据==========",formData);
      // this.$emit("submitsave",formData);
      $http
        .post('plugin.diyform.api.diy-form.saveDiyFormData', {
          form_data: formData,
          form_id: this.form_id
        })
        .then(
          function(response) {
            if (response.result == 1) {
              console.log(response);
              Toast("提交成功");
              that.$emit("submitsave", response.data.form_data_id);
              return
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            alert("fail");
          }
        );
    },
    getData(_data){
      let that = this;
      if(this.status){
        console.log("提交或编辑");
        var fields = _data.fields;
        console.log("父组件传过来的自定义表单数据",fields);
        for (var field in fields) {
          if(fields.hasOwnProperty(field)){
            if (that.types[fields[field].data_type] == "diycheckbox") {
              var f = {
                name: field,
                data: fields[field],
                value: fields[field].value?fields[field].value:[],
                type: that.types[fields[field].data_type]
              };
            } else if (that.types[fields[field].data_type] == "diydate") {
              var f = {
                name: field,
                data: fields[field],
                value: fields[field].value,
                type: that.types[fields[field].data_type]
              };
              if(!this.form_data_id){
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
              }
            } else if (that.types[fields[field].data_type] == "diyimg") {
              var f = {
                name: field,
                data: fields[field],
                value: '',
                type: that.types[fields[field].data_type]
              };
              f[field + "Length"] = 0;
              f[field + "Value1"] = [];
              f[field + "Value2"] = [];
              if(this.form_data_id){
                let srcVal = fields[field].value;
                let bb = []
                srcVal.forEach((v, i) => {
                    bb.push({
                        url: v
                    })
                })
                f[field + "Value1"] = bb;
                f[field + "Value2"] = bb;
              }
            } else {
              var f = {
                name: field,
                data: fields[field],
                value: fields[field].value,
                type: that.types[fields[field].data_type]
              };
            }
            that.diydata.push(f);
          }
        }
      }else{
        //这是编辑
        console.log("这是查看已提交");
        var fields = _data;
        console.log("父组件传过来的自定义表单数据",fields);
        for (let field in fields) {
          if(fields.hasOwnProperty(field)){
            var list = {
            title: fields[field].title,
            value: fields[field].content,
            data_type: fields[field].type,
          };
          if (list.data_type == "diyduoxuan"||list.data_type == "diyduoxuankuang") {
            list.value = fields[field].content.join(",");
          }
          that.diydata.push(list);
          }
        }
        that.loading = true;
        console.log( that.diydata)
      }
    }
  },
  activated() {
    this.datas = {
      params: { bgcolor: "#fff" },
        data: {
          form_id: ""
        }
    }
    this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
  },
  created() {},
  mounted() {
    this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
    this.diydata = [];
    this.getData(this.datas);
  }
};
</script>
<style>
/* #diy-form .yd-cityselect {
  bottom: 3.0625rem;
} */
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
/* @import "../assets/css/member.scss"; */

#tool ul li {
  width: 100% !important;
  padding-left: 0.75rem !important;
}

.yd-cell-title {
  height: 2.5rem !important;
  line-height: 2.5rem !important;
  color: #000 !important;
}
.yd-cell-item {
  .yd-cell-left {
    color: #000 !important;
  }
}
.yd-btn-block {
  margin-top: 0.1875rem;
}

.introTitle {
  border-top: 0.0625rem solid #ebedf0;
}

.yd-checkbox {
  padding-bottom: 0.625rem;
}

.intro {
  padding: 1.25rem;
}
.form {
  padding: 3.25rem 0.5rem 0;
  background: #fff;
}
// .formMargin {
//   margin-top: 1rem;
// }
.checkbox {
  background: #fff;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border-bottom: 0.0625rem solid #ebedf0;
  text-align: left;
  padding-left: 0.75rem;
}
.photobox {
  position: relative;
  width: 5rem;
  height: 5rem;
  border: 1px dashed #ebedf0;
  /*float: left;*/
  margin-right: 0.2rem;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  img {
    width: 100%;
    height: 100%;
  }
}
/*清除浮动代码*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #333;
}

input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #333;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */

  color: #333;
}

input::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #333;
}
.bgNone {
  background-color: none;
}
</style>
