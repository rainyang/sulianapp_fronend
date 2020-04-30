<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false" text="供应商申请"></c-title>
      <div style="height:40px;"></div>
      <div class="banner">
        <img src="../../../assets/images/supplier.png" />
      </div>

      <div class="main" v-if="supplier_status == 1 && !isDiyForm">
        <!--申请   -->
        <div class="welcome">
          <div class="text">
            <p>请填写申请信息</p>
          </div>
          <div class="info">
            <input
              type="text"
              placeholder="设置账号"
              class="inp"
              v-model="applyModel.username"
            />
            <input
              type="password"
              placeholder="设置密码"
              class="inp"
              v-model="applyModel.password"
            />
            <span id="tips" v-if="pass_safe == 1">密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符</span>
            <input
              type="text"
              placeholder="请填写真实姓名"
              class="inp"
              v-model="applyModel.realname"
            />
            <input
              type="number"
              placeholder="请填写手机号码"
              class="inp"
              v-model="applyModel.mobile"
            />
            <input
              type="text"
              placeholder="请填写产品类型"
              class="inp"
              v-model="applyModel.product"
            />
            <input
              type="text"
              placeholder="请选择地址"
              class="inp1"
              v-model="fullAddress"
              readonly
              @click="showCity1 = true"
            />
            <!--<el-input type="textarea" :rows="2" placeholder="备注" v-model="applyModel.remark">-->
            <!--</el-input>-->
            <van-cell-group>
              <van-field
                v-model="applyModel.remark"
                type="textarea"
                placeholder="备注"
                rows="2"
              />
            </van-cell-group>

            <input
              type="submit"
              value="申请"
              class="btn"
              @click="setApplyData"
            />
          </div>
        </div>

        <!--文字说明；后台设置-->
        <div
          class="vip_main"
          v-if="
            !(
              supplier_info == null ||
              supplier_info == '' ||
              supplier_info == undefined
            )
          "
        >
          <div class="title">供应商说明</div>
          <div class="vip">
            <div class="text">
              <div class="t1" v-html="supplier_info"></div>
              <!--<div class="t2">拥有专属推广二维码，用于推广客户；</div>-->
            </div>
          </div>
        </div>
      </div>

      <div class="main" v-if="supplier_status == 2 && isDiyForm">
        <yd-cell-group>
          <yd-cell-item class="introTitle">
            <span slot="left"> 请填写申请信息</span>
          </yd-cell-item>
        </yd-cell-group>

        <!--<div class="add-preview" v-show="isPreview" @click="closePreview">
      <img :src="previewImg">
      </div>-->
        <!--<yd-button @click.native="saveImage()" size="large">上传</yd-button>-->
        <template v-for="(item, index) in diydata">
          <template v-if="item.type == 'diyinput'">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">{{ item.data.tp_name }}：</span>
                <yd-input
                  v-if="item.data.tp_must == 1"
                  slot="right"
                  required
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                ></yd-input>
                <yd-input
                  v-if="item.data.tp_must == 0"
                  slot="right"
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                ></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <!--setting sun-->

          <div class="image-list" v-if="item.type == 'diyimage'">
            <!-- 上传图片 -->
            <section class="otherphoto">
              <div
                style="height:50px;text-align:left;padding-left:13px;line-height:50px;"
              >
                <span style="font-size:15px;">{{ item.data.tp_name }}：</span>
              </div>
              <div>
                <div class="imgflex">
                  <!--<el-upload class="upload-demo" :on-change="handleChange" :action="uploadUrl"-->
                  <!--:data="{'attach':item.name}" :on-preview="handlePreview" :on-remove="handleAptiRemove"-->
                  <!--:file-list="fileList1" list-type="picture-card" :on-exceed="handleExceed"-->
                  <!--:before-upload="beforeUpload" :on-success="handleAptiSuccess">-->

                  <!--<div style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: relative;">-->
                  <!--<i class="el-icon-plus"></i>-->
                  <!--<div-->
                  <!--style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: absolute;left: 0px;top:0px;z-index: 99;"-->
                  <!--@click.stop="occlusion()" v-if="upNumMax>=item.data.tp_max">-->
                  <!--</div>-->
                  <!--</div>-->

                  <!--</el-upload>-->
                  <template v-for="(val, index_1) in item.imgUrls">
                    <div class="photobox">
                      <img :src="val" style="width: 100%" />
                      <i @click="removeImg(index_1, index)"></i>
                    </div>
                  </template>
                  <div @click="setIndex(item.name)">
                    <van-uploader
                      :after-read="onRead_1"
                      :max-size="photosize"
                      @oversize="onphotosize"
                    >
                      <div
                        style="padding: 1rem;  width: 5rem;height: 5rem; border: 1px dashed #c0ccda;margin-left: 0.2rem;margin-right: 0.2rem;"
                      >
                        <img
                          :src="require('../../../assets/images/up_icon.png')"
                          style="width: 100%"
                          class="avatar"
                        />
                      </div>
                    </van-uploader>
                  </div>
                </div>
              </div>
            </section>

            <!--<div class="list-default-img">
              <span>{{item.data.tp_name}}：</span>
              <input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange($event, item)">
            </div>

              <ul class="list-ul">
              <li class="list-li" v-for="(iu, index) in item.imgUrls"  style="overflow: hidden;position: relative">
                <a class="list-link">
                  <img :src="iu">
                </a>
                <div class="delimg" @click="delImage(item.imgUrls, index)" size="large">删除</div>
              </li>
            </ul>-->
          </div>

          <template v-if="item.type == 'diytextarea'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item>
                <yd-textarea
                  slot="right"
                  v-model="item.value"
                  :placeholder="item.data.placeholder"
                  maxlength="100"
                ></yd-textarea>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycheckbox'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="checkbox" v-for="(ck,i) in item.data.tp_text" :key='i'>
                <span slot="left">{{ ck }}</span>
                <input
                  slot="right"
                  type="checkbox"
                  :value="ck"
                  v-model="item.value"
                />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyselect'">
            <yd-cell-group>
              <yd-cell-item arrow type="label">
                <span slot="left">{{ item.data.tp_name }}：</span>
                <select slot="right" v-model="item.value">
                  <option value="">请选择{{ item.data.tp_name }}</option>
                  <option :value="sitem" v-for="(sitem,i) in item.data.tp_text" :key='i'>{{
                    sitem
                  }}</option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyradio'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="radio" v-for="(ritem,i) in item.data.tp_text" :key='i'>
                <span slot="left">{{ ritem }}</span>
                <input
                  slot="right"
                  type="radio"
                  :value="ritem"
                  v-model="item.value"
                />
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycity'">
            <div>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left">{{ item.data.tp_name }}：</span>
                  <input
                    slot="right"
                    style="width:74%;"
                    type="text"
                    @click.stop="showCity = true"
                    @click="openCity(item.name)"
                    v-model="item.value"
                    readonly
                    :placeholder="item.data.tp_name"
                  />
                </yd-cell-item>
              </yd-cell-group>
            </div>
          </template>

          <template v-if="item.type == 'diydate'">
            <yd-cell-group>
              <yd-cell-item @click.native="openPicker(item.name)">
                <span slot="left">{{ item.data.tp_name }}</span>
                <span slot="right">{{ item.value }}</span>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyusername'">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">{{ item.data.tp_name }}：</span>
                <yd-input
                  v-if="item.data.tp_must == 1"
                  slot="right"
                  required
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                ></yd-input>
                <yd-input
                  v-if="item.data.tp_must == 0"
                  slot="right"
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                ></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>
          <template v-if="item.type == 'diypassword'">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">{{ item.data.tp_name }}：</span>
                <yd-input
                  v-if="item.data.tp_must == 1"
                  slot="right"
                  required
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                  type="password"
                ></yd-input>
                <yd-input
                  v-if="item.data.tp_must == 0"
                  slot="right"
                  v-model="item.value"
                  v-bind:placeholder="item.data.placeholder"
                  type="password"
                ></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>
        </template>
        <template>
          <yd-button-group>
            <yd-button size="large" @click.native="submit" type="primary"
              >提交申请</yd-button
            >
          </yd-button-group>
        </template>
      </div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setDate"
        v-model="pickerValue"
        :startDate="startDate"
      >
      </mt-datetime-picker>

      <yd-cityselect
        v-model="showCity"
        :callback="setCity"
        :items="district"
      ></yd-cityselect>

      <yd-cityselect
        v-model="showCity1"
        :callback="setCity1"
        :items="district"
      ></yd-cityselect>

      <!--申请后展示-->
      <div class="success" v-if="supplier_status == 0">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您的申请已经提交，请等待审核！</div>
        <a @click="goHome()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>

      <!--审核通过后展示，文字后台设置 -->
      <div class="success" v-if="supplier_status == -1">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您已通过审核</div>
        <a @click="goHome()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import supplier_controller from "./supplier_controller";

export default supplier_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #tips {
    text-align: left;
    color: #ff5d5c;
    font-size: 12px;
    display: inline-block;
    padding-left: 12px;
  }

.el-input__icon.el-icon-caret-top {
  color: #b8b8b8;
}

.el-input__inner {
  border: 0.0625rem solid #b8b8b8;
  font-size: 12px;
}

.el-select {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2rem;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  outline: none;
}

.delimg {
  position: absolute;
  top: 0rem;
  right: 0rem;
  height: 1.25rem;
  width: 1.875rem;
  color: #fff;
  background-color: red;
}

#income {
  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 0 0.625rem;
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    height: 2rem;
    box-sizing: border-box;
    line-height: 2rem;
    span {
      color: #999;
    }
  }
}

a {
  text-decoration: none;
  color: #222;
}

input {
  border-width: 0;
  position: absolute;
  right: 0px;
}

.list-ul img {
  width: 80%;
  height: 80%;
}

.list-ul {
  display: flex;
  flex-direction: column;
}

.image-list {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0.75rem 0;
  margin-top: -0.625rem;
  .otherphoto {
    .photobox {
      position: relative;
      width: 5rem;
      height: 5rem;
      border: 1px dashed #c0ccda;
      margin-right: 0.2rem;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        background: url("../../../assets/images/close_iocn.png");
        background-size: 100%;
      }
    }
  }
}

.list-default-img {
  height: 3.125rem;
  text-align: left;
  padding-left: 0.75rem;
}

.supplier .banner img {
  width: 100%;
}

.supplier .main {
  position: relative;
  top: -0.25rem;
}

.welcome {
  padding: 0.625rem;
  background: #ffffff;
  .text {
    p {
      font-size: 12px;
      color: #666;
      line-height: 1.2rem;
      margin-top: 0;
      span {
        color: #f55955;
      }
    }
  }
  .info {
    margin-top: 0.625rem;
    input {
      position: relative;
      display: block;
      margin-bottom: 0.5rem;
      width: 100%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      outline: none;
    }

    .inp1 {
      border: 0.0625rem solid #b8b8b8;
    }

    .inp {
      border: 0.0625rem solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 0.5rem;
      width: 100%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      line-height: 2rem;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
  }
}

.supplier .main .vip_main {
  background: #ffffff;
  margin: 0.9375rem 0;
  .title {
    padding: 0.625rem;
    font-size: 12px;
    border-bottom: 0.0625rem solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 0.9375rem 0.625rem;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 100%;
      .t1 {
        font-size: 16px;
        color: #333;
        margin-bottom: 0.3125rem;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 2.25rem;
      width: 2.25rem;
      border-radius: 1.125rem;
      color: #fff;
      text-align: center;
      line-height: 2.375rem;
      font-size: 1.25rem;
    }
  }
  .vip1 {
    border-bottom: 0.0625rem solid #eeeeee;
  }
}

.supplier .success {
  height: 12.5rem;
  padding-top: 4.0625rem;
  background: #ffffff;
  .ico {
    height: 4.0625rem;
    width: 4.0625rem;
    margin: auto;
    border: 0.1875rem solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 2.3rem;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 1.875rem;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 1.25rem auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 14px;
    margin-bottom: 1.25rem;
  }
  a .sub:focus {
    background: #d8403c;
  }
}
.imgflex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
