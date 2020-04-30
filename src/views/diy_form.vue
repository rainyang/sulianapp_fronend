<template>
  <div id="all" v-show="loading">
    <c-title :hide="false" :text="diyform.title"></c-title>
    <div style="height: 40px;"></div>

    <div id="member">
      <div id="tool" style="">
        <dt v-if="thumb">
          <img :src="thumb" style="width: 100% ;height: 9.675rem;"/>
        </dt>
      </div>
      <div style="height: 0.005rem;clear: both;"></div>
      <div class="diyform" v-if="status === 0">
        <template v-for="item in diydata">
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

          <template v-if="item.type == 'diypwd'">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">{{ item.data.tp_name }}：</span>
                <yd-input
                    v-if="item.data.tp_must == 1"
                    slot="right"
                    type="password"
                    required
                    v-model="item.value"
                    v-bind:placeholder="item.data.placeholder"
                ></yd-input>
                <yd-input
                    v-if="item.data.tp_must == 0"
                    slot="right"
                    type="password"
                    v-model="item.value"
                    v-bind:placeholder="item.data.placeholder"
                ></yd-input>
              </yd-cell-item>
            </yd-cell-group>
          </template>

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
              <yd-cell-item type="checkbox" v-for="(ck,index) in item.data.tp_text" :key="ck">
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
                  <option :value="sitem" :key="sitem" v-for="sitem in item.data.tp_text">{{
                    sitem
                    }}
                  </option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyradio'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="radio" :key="ritem" v-for="ritem in item.data.tp_text">
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

          <template v-if="item.type == 'diyimg'">
            <yd-cell-group :title="item.data.tp_name">
              <div
                  class="clearfloat"
                  style="width:100%;text-align:left;line-height:5rem;"
              >
                <template v-for="(val, index) in item[item.name + 'Value2']">
                  <div class="photobox" style="float:left;max-width: 25%;">
                    <img :src="val.url" style="max-width:5rem"/>
                    <van-icon
                        @click="removeImg_1(item, index)"
                        name="close"
                        style="width: 1.2rem;height: 1.2rem;position: absolute;top: 0.1rem;right: 0.1rem;color:red;font-weight:900;"
                    />
                  </div>
                </template>
                <div @click="chooseUpload(item.name)">
                  <van-uploader
                      :disabled="
                      item[item.name + 'Length'].length >= item.data.tp_max
                    "
                      :after-read="onRead_2"
                  >
                    <div
                        style="padding-left:1rem;padding-top:1rem;width: 5rem;height: 5rem; border: 1px dashed #c0ccda;"
                    >
                      <img
                          :src="require('../assets/images/up_icon.png')"
                          style="max-height:3rem;"
                          class="avatar"
                      />
                    </div>
                  </van-uploader>
                </div>
              </div>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycity'">
            <div>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left">{{ item.data.tp_name }}：</span>
                  <input
                      slot="right"
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
        </template>
      </div>
      <div class="diyform" v-if="status === 1">
        <yd-cell-group
            v-for="(item,j) in datas"
            :key="j"
            :title="
            item.data_type != '1' && item.data_type != '5' ? '' : item.title
          "
        >
          <yd-cell-item v-if="item.data_type != '1' && item.data_type != '5'">
            <span slot="left">{{ item.title }}</span>
            <span slot="right">{{ item.value }}</span>
          </yd-cell-item>
          <yd-cell-item v-if="item.data_type == '1'">
            <yd-textarea
                slot="right"
                v-model="item.value"
                readonly="readonly"
            ></yd-textarea>
          </yd-cell-item>
          <yd-cell-item v-if="item.data_type == '5'">
            <template
                slot="right"
                style="width:100%;text-align:left;"
                v-for="(item1, index1) in item.value"
            >
              <div
                  class="photobox"
                  style="float:left;max-width: 25%;margin-top:.5rem"
              >
                <img :src="item1" style="max-width:5rem;"/>
              </div>
            </template>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <mt-datetime-picker
          ref="picker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="setDate"
          v-model="pickerValue"
      >
      </mt-datetime-picker>

      <yd-cityselect
          v-model="showCity"
          :callback="setCity"
          :items="district"
      ></yd-cityselect>

      <div style="height: 0.625rem;clear: both;"></div>
      <div style="width:90%; margin:0 auto;padding-bottom:1.5rem">
        <yd-button
            size="large"
            @click.native="submit"
            type="primary"
            v-if="status === 0"
        >提交
        </yd-button >
        <yd-button size="large" type="danger" v-if="status === 1"
        >已提交
        </yd-button>
      </div>
      <div
          style="width:100%;padding:.5rem .5rem 5rem .5rem;background-color: #fff;"
      >
        <div v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import diyform from "./diy_form_controller";

  export default diyform;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #all .yd-cityselect {
    bottom: 3.0625rem;
  }
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
  }

  .yd-cell-box {
    margin-bottom: 0 !important;
  }

  .yd-btn-block {
    margin-top: 0.1875rem;
  }

  .introTitle {
    border-top: 0.0625rem solid #dedddd;
  }

  .yd-checkbox {
    padding-bottom: 0.625rem;
  }

  .intro {
    padding: 1.25rem;
  }

  .checkbox {
    background: #fff;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    border-bottom: 0.0625rem solid #ece9e9;
    text-align: left;
    padding-left: 0.75rem;
  }

  .photobox {
    position: relative;
    width: 5rem;
    height: 5rem;
    border: 1px dashed #c0ccda;
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
</style>
