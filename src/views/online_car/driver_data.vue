<template>
  <div id="driver_data" :class="{padding:status===999||status===-1}">
    <c-title :hide="false" text="填写资料"></c-title>
    <div id="content">
      <yd-cell-group v-if="status===999||status===-1">
        <yd-cell-item arrow type="a"  @click.native=" show1 =true ">
          <span slot="left">选择城市</span>
          <span slot="right">{{address}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cityselect
        v-model="show1"
        :callback="result1"
        :items="district"
        v-if="status===999||status===-1"
      ></yd-cityselect>
      <yd-cell-group v-if="status===0||status===1">
        <yd-cell-item type="a">
          <span slot="left">选择城市</span>
          <span slot="right">{{address}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <div class="IDimg_box">
        <div class="face_img">
          <p class="title">身份证人面像</p>
          <div
            class="bg_img"
            :style="{backgroundImage: 'url(' + (idImg.length>0 ?  idImg : require('../../assets/images/IDicon_a.png')) + ')'}"
          >
            <van-uploader
              :after-read="IdRead"
              :class="{all:idImg.length>0}"
              :disabled="status===0||status===1"
            >
              <van-icon name="photograph" :class="{hidden:idImg.length>0}"/>
            </van-uploader>
          </div>
        </div>
        <div class="back_img">
          <p class="title">身份证国徽面</p>
          <div
            class="bg_img"
            :style="{backgroundImage: 'url(' + (nationImg.length>0 ?  nationImg : require('../../assets/images/IDicon_b.png')) + ')'}"
          >
            <van-uploader
              :after-read="NationRead"
              :class="{all:nationImg.length>0}"
              :disabled="status===0||status===1"
            >
              <van-icon name="photograph" :class="{hidden:nationImg.length>0}"/>
            </van-uploader>
          </div>
        </div>
      </div>
      <div class="driver_img">
        <div class="face_img">
          <p class="title">驾驶证正面</p>
          <div
            class="bg_img"
            :style="{backgroundImage: 'url(' + (carImg.length>0 ?  carImg : require('../../assets/images/IDicon_c.png')) + ')'}"
          >
            <van-uploader
              :after-read="CarRead"
              :class="{all:carImg.length>0}"
              :disabled="status===0||status===1"
            >
              <van-icon name="photograph" :class="{hidden:carImg.length>0}"/>
            </van-uploader>
          </div>
        </div>
      </div>
      <yd-cell-group>
        <yd-cell-item class="OverFlow">
          <span slot="left">本人姓名</span>
          <input
            slot="right"
            type="text"
            placeholder="请输入"
            v-model="Name"
            :readonly="status===0||status===1"
          >
        </yd-cell-item>
        <yd-cell-item class="OverFlow">
          <span slot="left">身份证号</span>
          <input
            slot="right"
            type="text"
            placeholder="请输入"
            v-model="idNumber"
            :readonly="status===0||status===1"
          >
        </yd-cell-item>
         <yd-cell-item class="OverFlow">
          <span slot="left">手机号码</span>
          <input
            slot="right"
            type="text"
            placeholder="请输入"
            v-model="driver_phone"
            :readonly="status===0||status===1"
          >
        </yd-cell-item>
        <yd-cell-item arrow type="label">
          <span slot="left">身份证有效期</span>
          <yd-datetime type="date" v-model="idTime" slot="right" :readonly="status===0||status===1"></yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">驾驶证领证日期</span>
          <yd-datetime
            type="date"
            v-model="driverTime"
            slot="right"
            :readonly="status===0||status===1"
          ></yd-datetime>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">驾驶证有效期</span>
          <yd-datetime
            type="date"
            v-model="driverEffect"
            slot="right"
            :readonly="status===0||status===1"
          ></yd-datetime>
        </yd-cell-item>
        <yd-cell-item v-if="status===-1" class="overFlow">
          <span slot="left">拒绝申请通过备注</span>
          <span slot="right">{{remark}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <div class="btm_btn" v-if="status===999||status===-1">
        <button type="button" @click.stop="CarInfo" v-if="status===999">提交</button>
        <button type="button" @click.stop="CarInfo" v-if="status===-1">重新提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import controller from "./driver_data_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#driver_data {
  padding-top: 50px;
  #content {
    .IDimg_box,
    .driver_img {
      margin-bottom: 0.625rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0.875rem;
      .face_img,
      .back_img {
        width: 10rem;
        .title {
          text-align: center;
          line-height: 1.875rem;
        }
        .bg_img {
          width: 10rem;
          height: 5.625rem;
          border-radius: 0.375rem;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .back_img {
        .bg_img {
          width: 10rem;
          height: 5.625rem;
          border-radius: 0.375rem;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .driver_img {
      .face_img {
        .bg_img {
          width: 10rem;
          height: 5.625rem;
          border-radius: 0.375rem;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .btm_btn {
      z-index: 10;
      position: fixed;
      bottom: 0;
      background: #fff;
      width: 100%;
      padding: 0.625rem;
      border-top: solid 0.0625rem #ebebeb;
      button {
        width: 21.5625rem;
        height: 2.5rem;
        background: #ed743b;
        color: #fff;
        font-size: 16px;
        border: none;
        border-radius: 0.375rem;
      }
    }
    .OverFlow {
      input {
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    .overFlow {
      span {
        display: -webkit-box;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        /* autoprefixer: off*/
        -webkit-box-orient: vertical;
        /* autoprefixer: on*/
      }
    }
  }
}
.padding {
  padding-bottom: 80px;
}
.hidden {
  visibility: hidden;
}
.all {
  width: 100%;
  height: 100%;
}
.yd-cell-right .yd-datetime-input{
  justify-content: flex-end;
}
</style>
