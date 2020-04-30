<template>
  <div id="register">
    <c-title :hide="false" text="绑定手机"></c-title>
    <!-- <div style="height:40px;"></div> -->
    <img
      style="width:20%;height:40px;position:absolute;display:block;left:74%;z-index:999"
      :style="{top:country_code==1?'8rem':'6rem'}"
      :src="imgcode"
      @click="getimgdata"
      v-if="imgcode"
    />
    <!-- 新页面 -->
    <div id="content">
      <ul class="area_number">
        <li v-if="country_code==1">
          <div class="must">*</div>
          <span>国家区号</span>
          <!-- <input type="text" placeholder="+86" v-model.trim="form.country"> -->
          <yd-input
            slot="right"
            v-model.trim="form.country"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="+86"
          ></yd-input>
        </li>
      </ul>
      <ul class="login_info">
        <li v-if="imgcode">
          <div class="must">*</div>
          <!-- <input type="text" placeholder="请输入右侧图形验证码" v-model.trim="form.captcha"> -->
          <yd-input
            slot="right"
            v-model.trim="form.captcha"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入右侧图形验证码"
            ></yd-input>
        </li>
        <li>
          <div class="must">*</div>
          <!-- <input type="text" placeholder="请输入手机号" v-model.trim="form.mobile"> -->
          <yd-input
            slot="right"
            v-model.trim="form.mobile"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入手机号码"
          ></yd-input>
        </li>
        <li class="code">
          <div class="must">*</div>
          <!-- <input type="text" placeholder="请输入验证码" v-model.trim="form.code"> -->
          <yd-input
            slot="right"
            v-model.trim="form.code"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入验证码"
          ></yd-input>
          <!-- <button type="button">获取验证码</button> -->
          <!-- ↓↓关键代码是这里↓↓ -->
          <yd-sendcode
            slot="right"
            v-model="start1"
            @click.native="verificationCode"
            type="warning"
          ></yd-sendcode>
          <!-- ↑↑关键代码是这里↑↑ -->
        </li>
        <li class="invitCode" v-if="invite">
          <div class="must" v-if="isrequired">*</div>
          <!-- <input  type="text" placeholder="请输入邀请码" v-model.trim="form.invite_code"> -->
          <yd-input
            slot="right"
            v-model.trim="form.invite_code"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            placeholder="请输入邀请码"
          ></yd-input>
        </li>
        <li>
          <div class="must">*</div>
          <!-- <input type="password" placeholder="设置密码" v-model.trim="form.password"> -->
          <yd-input
            slot="right"
            type="password"
            v-model.trim="form.password"
            placeholder="设置密码"
          ></yd-input>
        </li>
        <li>
          <div class="must">*</div>
          <!-- <input type="password" placeholder="确认密码" v-model.trim="form.confirm_password"> -->
          <yd-input
            slot="right"
            type="password"
            v-model.trim="form.confirm_password"
            placeholder="确认密码"
          ></yd-input>
        </li>
      </ul>
      <div class="agreement" v-if="agreementStatus">
        <van-checkbox
          v-model="agreementCB"
          checked-color="#f15353"
          shape="square"
          >&nbsp;</van-checkbox
        >
        <!--<el-checkbox v-model="agreementCB">&nbsp;</el-checkbox>-->
        <span
          slot="right"
          style="font-size: 16px; text-decoration:underline;"
          @click="goAgreement"
          >注册协议</span
        >
      </div>
      <!-- <div class="btn">
				<button type="button" @click="register">绑定</button>
			</div>  -->
    </div>
    <!-- <div class="city-info">
				<mt-header fixed title="协议">
					<mt-button icon="back" @click="popClose" slot="left"></mt-button>
				</mt-header>
		</div> -->
    <!-- css -->
    <!-- <div class="lin">
			<img style='width:20%;height:2.5rem;position:absolute;display:block;left:74%;top:8rem;z-index:999' :src="imgcode" @click='getimgdata' v-if='imgcode'>
			<yd-cell-group> -->
    <!-- <yd-cell-item>
					<span slot="left">国际区号：</span>
					<input slot="right" type="number" placeholder="请输入国际区号" v-model.trim="form.country">
				</yd-cell-item> -->

    <!-- <yd-cell-item v-if='imgcode'>

					<span slot="left">图形验证码：</span>
					<input type="text" slot="right" placeholder="请输入右侧图形验证码" v-model.trim="form.captcha">
				</yd-cell-item> -->
    <!-- <yd-cell-item> -->
    <!-- <span slot="left">手机号：</span> -->

    <!-- <input type="tel" slot="right" placeholder="请输入手机号码" v-model.trim="form.mobile"> -->

    <!-- ↓↓关键代码是这里↓↓ -->
    <!-- <yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode> -->
    <!-- ↑↑关键代码是这里↑↑ -->

    <!-- </yd-cell-item> -->

    <!-- <yd-cell-item>
					<span slot="left">验证码：</span>
					<input slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
				</yd-cell-item> -->

    <!-- <yd-cell-item>
					<span slot="left">设置密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.password">
				</yd-cell-item> -->

    <!-- <yd-cell-item>
					<span slot="left">确认密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.confirm_password">
				</yd-cell-item> -->

    <!-- 邀请码 -->
    <!-- <yd-cell-item v-if="invite">
					<span slot="left">邀请码：</span>
					<input slot="right" type="text" placeholder="请输入邀请码" v-model.trim="form.invite_code">
				</yd-cell-item> -->
    <!-- </yd-cell-group> -->

    <div class="diyform">
      <template v-for="(item,i) in diydata">
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

    <!-- <template v-if="agreementStatus">
				<div class="agreement">
					<el-checkbox v-model="agreementCB">&nbsp;</el-checkbox>
					<span slot="right" style="font-size: 16px; text-decoration:underline;margin-left: -0.5rem;" @click="goAgreement">注册协议</span>
				</div>

			</template> -->

    <!-- <yd-button-group>
				<yd-button size="large" type="primary" @click.native="register">绑定</yd-button>
			</yd-button-group> -->
    <div class="btn">
      <button type="button" @click="register">绑定</button>
    </div>

    <!-- </div> -->

    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="startDate"
      @confirm="setDate"
      v-model="pickerValue"
    >
    </mt-datetime-picker>

    <yd-cityselect
      v-model="showCity"
      :callback="setCity"
      :items="district"
    ></yd-cityselect>

    <!-- <mt-popup v-model="show2" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">
		<mt-popup v-model="show2" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">
	 <mt-popup v-model="show2" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">

			<div class="city-info">
				<mt-header fixed title="协议">
					<mt-button icon="back" @click="popClose" slot="left"></mt-button>
				</mt-header>
				</div>

					<div style="height: 2.5rem;clear: both;"></div>

					<div id="a_content" v-html='protocol_content'></div> -->

    <div>
      <!-- <div style="height: 2.5rem;clear: both;"></div>

					<div id="a_content" v-html='protocol_content'></div> -->
    </div>

    <!-- <div style="height: 2.5rem;clear: both;"></div>

					<div id="a_content" v-html='protocol_content'></div>  -->

    <!-- </mt-popup> -->
    <mt-popup
      v-model="show2"
      class="mint-popup-3"
      position="right"
      closeOnClickModal="true"
      modal="false"
      style="z-index:2004;"
    >
      <div class="city-info">
        <mt-header fixed title="协议">
          <mt-button icon="back" @click="popClose" slot="left"></mt-button>
        </mt-header>
        <div>
          <div style="height: 2.5rem;clear: both;"></div>

          <div id="a_content" v-html="protocol_content"></div>
        </div>
      </div>
    </mt-popup>

    <div style="height: 2.5rem;clear: both;"></div>
  </div>
</template>

<script>
import member_editmobile_v2_controller from "./member_editmobile_v2_controller";
export default member_editmobile_v2_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
  .must {
    color: #f15353;
    align-self: center;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  // 	overflow: hidden;
  //   #agreement {
  //     height: 1.875rem;
  //     line-height: 1.875rem;
  //     .span {
  //       text-align: center;
  //       font-size: 20px;
  //     }
  //   }
  //   .city-info {
  //     overflow-y: scroll;
  //     width: 100vw;
  //     height: 100vh;
  //     background: #fff;
  //   }
  //   .mint-header {
  //     background: none;
  //     color: #666;
  //   }

  //   .is-fixed .mint-header-title {
  //     font-weight: bold;
  //   }

  //   .mint-header.is-fixed {
  //     border-bottom: 0.0625rem solid #e8e8e8;
  //     background: #fff;
  //     z-index: 99;
  //   }
  //   #lin {
  //     margin-bottom: 1.25rem;
  //   }
  //   width: 100%;
  //   #code {
  //     background: #ccc;
  //     padding: 0.1875rem 0.3125rem;
  //     border-radius: 0.1875rem;
  //   }
  //   h1 {
  //     color: #42b983;
  //   }
  //   .mint-button--large {
  //     margin-top: 0.625rem;
  //   }
  //   #bts {
  //     margin: auto 0.3125rem;
  //     .mint-button--default {
  //       background-color: #13ce66;
  //       color: #fff;
  //     }
  //   }
  //   .forget {
  //     color: #999;
  //     float: right;
  //   }
  // 新css
  #content {
    background-color: #fff;
    // height: 627px;
    overflow-y: hidden;
    .area_number {
      padding-top: 1.25rem;
      font-size: 18px;
      color: #333;
      margin-bottom: 1.875rem;
      li {
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 1.25rem;
        display: flex;
        justify-content: space-between;
        span {
          width: 5.75rem;
          text-align: left;
        }
        .yd-input {
          border: none;
          border-bottom: solid 0.0625rem #ccc;
          width: 15rem;
        }
      }
    }
    .login_info {
      li {
        margin: 1.25rem auto 0 auto;
        width: 20.625rem;
        display: flex;
        font-size: 16px;
        height: 2.5rem;
        line-height: 2.5rem;
        /*border-bottom: solid 0.0625rem #ccc;*/
        position: relative;
        input {
          width: 14.625rem;
          border: none;
        }
        span {
          font-size: 14px;
          position: absolute;
          right: 0;
          color: #333;
        }
        .img {
          width: 2.5rem;
          overflow: hidden;
          img {
            margin-top: 26%;
            width: 48%;
          }
        }
      }
      .code {
        justify-content: space-between;
        button {
          border: none;
          background-color: #ebebeb;
          color: #f15353;
          font-size: 14px;
          border-radius: 1.875rem;
          padding: 0 0.625rem;
          height: 1.875rem;
          line-height: 1.875rem;
          margin-top: 0.25rem;
        }
      }
    }
    .agreement {
      margin-top: 0.625rem;
      height: 2.25rem;
      line-height: 2.25rem;
      text-align: left;
      padding: 0 1.25rem;
      display: flex;
      .span {
        text-align: center;
        font-size: 20px;
        margin-left: 0.375rem;
        display: block;
      }
    }
    .btn {
      margin-top: 2.5rem;
      button {
        width: 20.625rem;
        height: 2.8125rem;
        font-size: 16px;
        margin-bottom: 1.25rem;
        border-radius: 1.875rem;
        border: none;
        background-color: #f15353;
        color: #fff;
      }
    }
  }

  #agreement {
    height: 1.875rem;
    line-height: 1.875rem;
    .span {
      text-align: center;
      font-size: 20px;
    }
  }
  .city-info {
    overflow-y: scroll;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
  .mint-header {
    background: none;
    color: #666;
  }

  .is-fixed .mint-header-title {
    font-weight: bold;
  }

  .mint-header.is-fixed {
    border-bottom: 0.0625rem solid #e8e8e8;
    background: #fff;
    z-index: 99;
  }
  #lin {
    margin-bottom: 1.25rem;
  }
  margin-top: 3.125rem;
  width: 100%;
  #code {
    background: #ccc;
    padding: 0.1875rem 0.3125rem;
    border-radius: 0.1875rem;
  }
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 0.625rem;
  }

  //   #bts {
  //     margin: auto 0.3125rem;
  //     .mint-button--default {
  //       background-color: #13ce66;
  //       color: #fff;
  //     }
  .btn {
    margin-top: 2.5rem;
    button {
      width: 20.625rem;
      height: 2.8125rem;
      font-size: 16px;
      margin-bottom: 1.25rem;
      border-radius: 1.875rem;
      border: none;
      background-color: #f15353;
      color: #fff;
    }
  }

  #bts {
    margin: auto 0.3125rem;
    .mint-button--default {
      background-color: #13ce66;
      color: #fff;
    }
  }
  .forget {
    color: #999;
    float: right;
  }
}
</style>
