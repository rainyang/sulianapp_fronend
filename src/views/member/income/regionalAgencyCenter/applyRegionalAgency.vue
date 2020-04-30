<template>
  <div id="areaAgent">
    <div class="banner">
      <img src="../../../../assets/images/applyRegionalAgency.jpg" />
    </div>

    <!--可申请-->
    <div class="content" v-if="apply == '1'">
      <input v-model="name" type="text" placeholder="请填写姓名" class="inp" />
      <input
        v-model="phone"
        type="number"
        placeholder="请填写手机号"
        class="inp"
      />
      <input
        v-model="username"
        type="text"
        placeholder="请填写登录账号"
        class="inp"
      />
      <input
        v-model="password"
        type="text"
        placeholder="请填写登录密码"
        class="inp"
      />
      <!-- <el-select v-model="selectLevel" placeholder="代理等级">
          <el-option v-for="item in level" :label="item.name" :value="item"></el-option>
      </el-select>

      <el-select class="select1" v-model="provicevalue" @change="selectProviceHandle" placeholder="省级区域">
          <el-option v-for="item in provinceoptions" :label="item.areaname" :value="item"></el-option>
      </el-select>

      <el-select v-model="cityvalue" @change="selectCityHandle" placeholder="市级区域">
          <el-option v-for="item in cityoptions" :label="item.areaname" :value="item">
          </el-option>
      </el-select>

      <el-select v-model="regionvalue" placeholder="区/县级区域" @change="selectRegionHandle">
          <el-option v-for="item in regionoptions" :label="item.areaname" :value="item">
          </el-option>
      </el-select> -->

      <input
        v-model="selectLevel.name"
        type="text"
        placeholder="代理等级"
        class="inp"
        readonly
        @click="selshow = true"
      />

      <input
        v-model="provicevalue"
        type="text"
        placeholder="省级区域"
        class="inp"
        readonly
        @click="proshow = true"
        v-if="prozoneshow"
      />

      <input
        v-model="cityvalue"
        type="text"
        placeholder="市级区域"
        class="inp"
        readonly
        @click="showCity"
        v-if="cityzoneshow"
      />

      <input
        v-model="regionvalue"
        type="text"
        placeholder="区/县级区域"
        class="inp"
        readonly
        @click="showReg"
        v-if="regzoneshow"
      />

      <input
        type="text"
        placeholder="街道/乡镇区域"
        class="inp"
        v-model="streetvalue"
        v-if="strshow"
        @click="showStr"
      />
      <div class="agreement" v-if="is_open_agreement==1">
        <van-checkbox
          checked-color="#f15353"
          shape="square"
          v-model="is_agreement"
        >
        </van-checkbox>

        <span
          slot="right"
          style="font-size: 16px; text-decoration:underline;"
          @click="goAgreement"
        >
          申请协议</span>
      </div>
      <button type="button" @click="submit(false)" class="submit">提 交</button>
    </div>

    <!--驳回再次提交审核-->
    <div class="content" v-if="apply == '2'">
      <input v-model="name" type="text" placeholder="请填写姓名" class="inp" />
      <input
        v-model="phone"
        type="number"
        placeholder="请填写手机号"
        class="inp"
      />
      <input
        v-model="username"
        type="text"
        placeholder="请填写登录账号"
        class="inp"
      />
      <input
        v-model="password"
        type="text"
        placeholder="请填写登录密码"
        class="inp"
      />

      <!-- <el-select v-model="selectLevel" placeholder="代理等级">
          <el-option v-for="item in level" :label="item.name" :value="item"></el-option>
      </el-select>

      <el-select class="select1" v-model="provicevalue" @change="selectProviceHandle" placeholder="省级区域">
          <el-option v-for="item in provinceoptions" :label="item.areaname" :value="item"></el-option>
      </el-select>

      <el-select v-model="cityvalue" @change="selectCityHandle" placeholder="市级区域">
          <el-option v-for="item in cityoptions" :label="item.areaname" :value="item">
          </el-option>
      </el-select>

      <el-select v-model="regionvalue" placeholder="区/县级区域" @change="selectRegionHandle">
          <el-option v-for="item in regionoptions" :label="item.areaname" :value="item">
          </el-option>
      </el-select> -->

      <input
        v-model="selectLevel.name"
        type="text"
        placeholder="代理等级"
        class="inp"
        readonly
        @click="selshow = true"
      />

      <input
        v-model="provicevalue"
        type="text"
        placeholder="省级区域"
        class="inp"
        readonly
        @click="proshow = true"
        v-if="prozoneshow"
      />

      <input
        v-model="cityvalue"
        type="text"
        placeholder="市级区域"
        class="inp"
        readonly
        @click="showCity"
        v-if="cityzoneshow"
      />

      <input
        v-model="regionvalue"
        type="text"
        placeholder="区/县级区域"
        class="inp"
        readonly
        @click="showReg"
        v-if="regzoneshow"
      />

      <input
        type="text"
        placeholder="街道/乡镇区域"
        class="inp"
        v-model="streetvalue"
        v-if="strshow"
        @click="showStr"
      />
      <div class="agreement" v-if="is_open_agreement==1">
        <van-checkbox
          checked-color="#f15353"
          shape="square"
          v-model="is_agreement"
        >
        </van-checkbox>

        <span
          slot="right"
          style="font-size: 16px; text-decoration:underline;"
          @click="goAgreement"
        >
          申请协议</span>
      </div>
      <button type="button" @click="submit(true)" class="submit">提 交</button>

      <!--<div class="ico">
              <i class="fa fa-check"></i>
          </div>
          <div class="text">{{tipMsg}}</div>
          <a @click="submitAgain()">
              <div class="sub">再次提交审核</div>
          </a>-->
    </div>

    <!--待审核-->
    <div class="success" v-if="apply == '0'">
      <div class="ico">
        <i class="fa fa-check"></i>
      </div>
      <div class="text">{{ tipMsg }}</div>
      <a @click="goHome()">
        <div class="sub">去商城逛逛</div>
      </a>
    </div>

    <!--申请被驳回不可再申请-->
    <div class="success" v-if="apply == '3'">
      <div class="ico">
        <i class="fa fa-check"></i>
      </div>
      <div class="text">{{ tipMsg }}</div>
      <a @click="goHome()">
        <div class="sub">去商城逛逛</div>
      </a>
    </div>

    <div class="vip_main" v-if="!isCheck">
      <div class="title">推广特权</div>
      <div class="vip vip1">
        <div class="ico1">
          <i class="fa fa-qrcode"></i>
        </div>
        <div class="text">
          <div class="t1">专属二维码</div>
          <div class="t2">拥有专属推广二维码，用于推广客户；</div>
        </div>
      </div>
      <div class="vip">
        <div class="ico2">
          <i class="fa fa-cny"></i>
        </div>
        <div class="text">
          <div class="t1">推广{{ income_name_text }}</div>
          <div class="t2">
            推广的客户购买商品后，您将获得相应的推广{{ income_name_text }}；
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->

    <mt-popup
      v-model="selshow"
      position="left"
      style="width:100%;height:100%;padding-top:2.5rem;"
      popup-transition="popup-fade"
    >
      <yd-navbar title="代理等级" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="selshow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <!-- <div style="clear:both;margin-top:40px;"></div> -->
      <yd-cell-item
        arrow
        v-for="(item,i) in level"
        :key='i'
        @click.native="selConfirm(item)"
      >
        <span slot="left">{{ item.name }}</span>
      </yd-cell-item>
    </mt-popup>

    <mt-popup
      v-model="proshow"
      position="left"
      style="width:100%;height:100%;padding-top:2.5rem;"
      popup-transition="popup-fade"
    >
      <yd-navbar title="省级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="proshow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <!-- <div style="clear:both;margin-top:40px;"></div> -->
      <div class="scroll">
        <yd-cell-item
          arrow
          v-for="(item,i) in provinceoptions"
          :key='i'
          @click.native="selectProviceHandle(item)"
        >
          <span slot="left">{{ item.areaname }}</span>
        </yd-cell-item>
      </div>
    </mt-popup>

    <mt-popup
      v-model="cityshow"
      position="left"
      style="width:100%;height:100%;padding-top:2.5rem;"
      popup-transition="popup-fade"
    >
      <yd-navbar title="市级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="cityshow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <!-- <div style="clear:both;margin-top:40px;"></div> -->
      <div class="scroll">
        <yd-cell-item
          arrow
          v-for="(item,i) in cityoptions"
          :key='i'
          @click.native="selectCityHandle(item)"
        >
          <span slot="left">{{ item.areaname }}</span>
        </yd-cell-item>
      </div>
    </mt-popup>

    <mt-popup
      v-model="regshow"
      position="left"
      style="width:100%;height:100%;padding-top:2.5rem;"
      popup-transition="popup-fade"
    >
      <yd-navbar title="区/县级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="regshow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <!-- <div style="clear:both;margin-top:40px;"></div> -->
      <div class="scroll">
        <yd-cell-item
          arrow
          v-for="(item,i) in regionoptions"
          :key='i'
          @click.native="selectRegionHandle(item)"
        >
          <span slot="left">{{ item.areaname }}</span>
        </yd-cell-item>
      </div>
    </mt-popup>

    <mt-popup
      v-model="streetshow"
      position="left"
      style="width:100%;height:100%"
      popup-transition="popup-fade"
    >
      <yd-navbar title="街道/乡镇区域" height="2.5rem" fontsize="14px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
            @click.native="streetshow = false"
          ></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <div style=" height: 90%;overflow-y: scroll;">
        <yd-cell-item
          arrow
          v-for="(item,i) in stroptions"
          :key='i'
          @click.native="selectStrionHandle(item)"
        >
          <span slot="left">{{ item.areaname }}</span>
        </yd-cell-item>
      </div>
    </mt-popup>

    <!-- 申请协议 -->
    <mt-popup
        v-model="show2"
        class="mint-popup-3"
        position="right"
        closeOnClickModal="true"
        modal="false"
        style="z-index:2004;"
      >
        <div class="city-info">
          <mt-header fixed title="申请协议">
            <mt-button icon="back" @click="show2 = false" slot="left"></mt-button>
          </mt-header>
          <div>
            <div style="height: 2.5rem;clear: both;"></div>

            <div id="a_content" v-html="protocol_content"></div>
          </div>
        </div>
      </mt-popup>
  </div>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
  #areaAgent {
    .m_header {
      width: 100%;
      height: 2.8125rem;
      color: #000;
      text-align: center;
      span {
        width: 9.375rem;
        line-height: 2.8125rem;
        font-size: 16px;
      }
    }
    .content {
      width: 100%;
      padding: 0.9375rem;
      box-sizing: border-box;
      background: #fff;
      .el-select {
        width: 100%;
        height: 2.5rem;
        margin-bottom: 0.625rem;
        .el-input__inner {
          color: #000 !important;
          font-size: 16px !important;
          border: 0.0625rem solid #b8b8b8;
        }
      }

      .submit {
        width: 100%;
        height: 2.5rem;
        border-radius: 0.25rem;
        background-color: #f15353;
        text-align: center;
        line-height: 2.5rem;
        color: #fff;
        border: 0;
        outline: 0;
        font-size: 16px;
        font-weight: bold;
        margin-top: 0.625rem;
      }
      input {
        display: block;
        margin-bottom: 0.8125rem;
        width: 100%;
        border-radius: 0.3125rem;
        padding: 0 0.3125rem;
        box-sizing: border-box;
        outline: none;
        font-size: 16px;
        height: 2.25rem;
        line-height: 1;
      }

      .inp {
        border: 0.0625rem solid #b8b8b8;
      }
      .inp:focus {
        border-color: #f55955;
        box-sizing: border-box;
      }
    }

    .banner {
      width: 100%;
      background: #fff;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .vip_main {
      background: #ffffff;
      margin: 0.9375rem 0;
      margin-top: 3.125rem;
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
          width: 85%;
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
          font-size: 20px;
        }
      }
      .vip1 {
        border-bottom: 0.0625rem solid #eeeeee;
      }
    }

    .scroll {
      height: 100%;
      overflow-y: scroll;
    }
  }

  #areaAgent .success {
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
      font-size: 36px;
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
  .agreement {
    margin-top: 0.625rem;
    height: 2.25rem;
    line-height: 2.25rem;
    text-align: left;
    // padding: 0 1.25rem;
    display: flex;
    span {
      text-align: center;
      font-size: 20px;
      margin-left: 1rem;
      display: block;
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
  #a_content{
    text-align:left;
    img{
      width:100%;
    }
  }
</style>

<script>
  import apply_regional_agency_controller from "./apply_regional_agency_controller";

  export default apply_regional_agency_controller;
</script>




























