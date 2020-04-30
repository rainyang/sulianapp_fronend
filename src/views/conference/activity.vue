<template>
  <div id="all">
    <c-title :hide="false"
             :text="conference.title"></c-title>
    <div style="height: 40px;"></div>

    <div id="member">
      <div id="tool">
        <div v-if="thumb"
             class="thumb"
             style="width: 100% ;height: 7.25rem;">
          <img :src="thumb" />
        </div>
      </div>
      <div style="height: 0.625rem;clear: both;"></div>

      <yd-cell-group>
        <yd-cell-item class="introTitle"
                      arrow
                      @click.native="showIntro">
          <span slot="left"> 活动介绍</span>
          <span slot="right">查看详情</span>
        </yd-cell-item>
      </yd-cell-group>
      <div style="height: 0.625rem;clear: both;"></div>
      <yd-popup v-model="intro"
                position="left"
                height="100%"
                width="100%">
        <yd-navbar height="2.5rem"
                   fontsize="16px"
                   title="活动详情">
          <span slot="right"
                @click="intro = false">
            <yd-icon class="iconfont icon-close11"
                     custom
                     size="1rem"></yd-icon>
          </span>
        </yd-navbar>
        <yd-layout class="intro">
          <div v-html="conference.content"
               style="text-align:left;"></div>
        </yd-layout>
      </yd-popup>
      <!-- 组件部分 -->
      <div class="diyform">
        <template v-for="item in diydata">
          <template v-if="item.type == 'diyinput'">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">{{ item.data.tp_name }}：</span>
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

          <template v-if="item.type == 'diytextarea'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item>
                <yd-textarea slot="right"
                             v-model="item.value"
                             :placeholder="item.data.placeholder"
                             maxlength="100"></yd-textarea>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diycheckbox'">
            <!-- <div  class="checkbox">
										<label class="yd-checkbox" v-for="ck in item.data.tp_text">
											<input type="checkbox" v-model="item.value" :value="ck">
											<span class="yd-checkbox-icon" style="width: 20px; height: 20px; color: rgb(76, 216, 100);">
												<i style="width: 6px; height: 12px;"></i>
											</span>
											<span class="yd-checkbox-text">{{ck}}</span>
										</label>
									</div> -->
            <!-- <div class="checkbox">
								    <yd-checkbox-group v-model="checks">
								        <yd-checkbox v-for="ck in item.data.tp_text" :val="ck"></yd-checkbox>
								    </yd-checkbox-group>
									</div> -->
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="checkbox"
                            v-for="(ck,i) in item.data.tp_text" :key='i'>
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
                            type="label">
                <span slot="left">{{ item.data.tp_name }}：</span>
                <select slot="right"
                        v-model="item.value">
                  <option value="">请选择{{ item.data.tp_name }}</option>
                  <option :value="sitem"
                          v-for="(sitem,i) in item.data.tp_text" :key='i'>{{
                    sitem
                  }}</option>
                </select>
              </yd-cell-item>
            </yd-cell-group>
          </template>

          <template v-if="item.type == 'diyradio'">
            <yd-cell-group :title="item.data.tp_name">
              <yd-cell-item type="radio"
                            v-for="(ritem,i) in item.data.tp_text" :key='i'>
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
                <yd-cell-item arrow>
                  <span slot="left">{{ item.data.tp_name }}：</span>
                  <input slot="right"
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
              <yd-cell-item @click.native="openPicker(item.name)">
                <span slot="left">{{ item.data.tp_name }}</span>
                <span slot="right">{{ item.value }}</span>
              </yd-cell-item>
            </yd-cell-group>
          </template>
        </template>
      </div>

      <mt-datetime-picker ref="picker"
                          type="date"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="setDate"
                          v-model="pickerValue">
      </mt-datetime-picker>

      <yd-cityselect v-model="showCity"
                     :callback="setCity"
                     :items="district"></yd-cityselect>

      <div style="height: 0.625rem;clear: both;"></div>
      <div style="width:90%; margin:0 auto;">
        <yd-button size="large"
                   @click.native="submit"
                   type="primary"
                   v-if="!is_enrol">提交</yd-button>
        <yd-button size="large"
                   @click.native="onActivityInfo()"
                   type="primary"
                   v-if="is_enrol">已报名，查看报名信息</yd-button>
      </div>
    </div>
  </div>
</template>

<script>
import activity from "./activity_controller";
export default activity;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/member.scss";

#tool {
  width: 100% !important;
  /*padding-left: 0.75rem !important;*/
  img {
    width: 100%;
    height: 100%;
  }
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
</style>
